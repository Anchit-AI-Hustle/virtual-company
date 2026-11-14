(function () {
  'use strict';
  var KEY = 'seatwise.plan.v1';
  var $ = function (id) { return document.getElementById(id); };
  var state = load() || blank();
  var picked = null;
  var nextId = state.guests.reduce(function (m, g) { return Math.max(m, g.id); }, 0) + 1;

  function blank() { return { event: '', guests: [], tables: [] }; }
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && Array.isArray(s.guests) && Array.isArray(s.tables)) return s;
    } catch (e) { /* storage unavailable or corrupt: start fresh */ }
    return null;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode: plan lives in memory only */ }
  }
  function hasPlan() { return state.guests.length > 0 || state.tables.length > 0; }
  function clean(s) { return String(s).replace(/\s+/g, ' ').trim(); }
  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }
  function seatedAt(i) { return state.guests.filter(function (g) { return g.table === i; }); }

  function show(id) {
    ['home', 'setup', 'plan'].forEach(function (s) { $(s).classList.toggle('hidden', s !== id); });
    if (id === 'home') {
      $('homeActions').classList.toggle('hidden', hasPlan());
      $('resumeActions').classList.toggle('hidden', !hasPlan());
    }
    if (id === 'setup') renderSetup();
    if (id === 'plan') renderPlan();
    window.scrollTo(0, 0);
  }

  function parseGuests(text) {
    return String(text).split(/\r?\n/).map(function (line) {
      var parts = line.split(',');
      var name = clean(parts.shift() || '');
      var group = clean(parts.join(','));
      return name ? { name: name.slice(0, 80), group: group.slice(0, 80) } : null;
    }).filter(Boolean);
  }

  function renderSetup() {
    $('eventName').value = state.event || '';
    var n = state.guests.length;
    $('guestCount').textContent = n + (n === 1 ? ' guest' : ' guests');
    if (state.tables.length) {
      $('tableCount').value = state.tables.length;
      $('seatCount').value = state.tables[0].seats;
    }
  }

  function addGuests() {
    var list = parseGuests($('guestInput').value);
    if (!list.length) { $('guestError').textContent = 'Add at least one name.'; return; }
    $('guestError').textContent = '';
    list.forEach(function (g) { state.guests.push({ id: nextId++, name: g.name, group: g.group, table: null }); });
    $('guestInput').value = '';
    save();
    renderSetup();
  }

  function makeTables() {
    var t = parseInt($('tableCount').value, 10), s = parseInt($('seatCount').value, 10);
    if (!(t >= 1 && t <= 200) || !(s >= 1 && s <= 50)) {
      $('tableError').textContent = 'Use 1 to 200 tables and 1 to 50 seats per table.';
      return;
    }
    if (!state.guests.length) { $('tableError').textContent = 'Add your guests first.'; return; }
    $('tableError').textContent = '';
    state.event = clean($('eventName').value).slice(0, 80);
    var old = state.tables;
    state.tables = [];
    for (var i = 0; i < t; i++) state.tables.push({ name: old[i] ? old[i].name : 'Table ' + (i + 1), seats: s });
    state.guests.forEach(function (g) { if (g.table != null && g.table >= t) g.table = null; });
    state.tables.forEach(function (tb, i) {
      seatedAt(i).slice(tb.seats).forEach(function (g) { g.table = null; });
    });
    save();
    show('plan');
  }

  function say(text) { $('planMsg').textContent = text; }

  function seat(gid, ti) {
    var g = state.guests.find(function (x) { return x.id === gid; });
    if (!g) return;
    var tb = state.tables[ti];
    if (seatedAt(ti).length >= tb.seats) { say(tb.name + ' is full'); return; }
    g.table = ti;
    picked = null;
    say(g.name + ' seated at ' + tb.name);
    save();
    renderPlan();
    var next = document.querySelector('#unseated .guest');
    if (next) next.focus();
  }

  function unseat(gid) {
    var g = state.guests.find(function (x) { return x.id === gid; });
    if (!g) return;
    var from = state.tables[g.table] ? state.tables[g.table].name : '';
    g.table = null;
    say(g.name + ' moved back from ' + from);
    save();
    renderPlan();
  }

  function autoSeat() {
    var free = state.tables.map(function (tb, i) { return tb.seats - seatedAt(i).length; });
    var groups = {}, order = [];
    state.guests.forEach(function (g) {
      if (g.table != null) return;
      var key = g.group ? 'g:' + g.group.toLowerCase() : 'p:' + g.id;
      if (!groups[key]) { groups[key] = []; order.push(key); }
      groups[key].push(g);
    });
    order.sort(function (a, b) { return groups[b].length - groups[a].length; });
    var left = 0;
    order.forEach(function (key) {
      var members = groups[key];
      var fit = free.findIndex(function (f) { return f >= members.length; });
      if (fit >= 0) {
        members.forEach(function (g) { g.table = fit; });
        free[fit] -= members.length;
        return;
      }
      members.forEach(function (g) {
        var i = free.findIndex(function (f) { return f > 0; });
        if (i >= 0) { g.table = i; free[i]--; } else left++;
      });
    });
    picked = null;
    save();
    renderPlan();
    say(left ? left + ' guests still need a seat. Add a table or more seats.' : 'Auto-seat done.');
  }

  function renderPlan() {
    var total = state.guests.length;
    var seated = state.guests.filter(function (g) { return g.table != null; }).length;
    $('progress').textContent = seated + ' of ' + total + ' seated';
    var q = clean($('search').value).toLowerCase();
    var list = $('unseated');
    list.textContent = '';
    var unseated = state.guests.filter(function (g) { return g.table == null; });
    if (!unseated.length) {
      list.appendChild(el('li', { class: 'done' }, total ? 'Everyone has a seat.' : 'No guests yet. Tap Edit guests to add them.'));
    }
    unseated.filter(function (g) {
      return !q || g.name.toLowerCase().indexOf(q) >= 0 || (g.group || '').toLowerCase().indexOf(q) >= 0;
    }).forEach(function (g) {
      var li = el('li');
      var b = el('button', { type: 'button', class: 'guest', 'aria-pressed': String(picked === g.id) });
      b.appendChild(el('span', null, g.name));
      if (g.group) b.appendChild(el('small', null, g.group));
      b.addEventListener('click', function () {
        picked = picked === g.id ? null : g.id;
        say(picked ? g.name + ' picked. Now tap a table.' : '');
        renderPlan();
        var again = document.querySelector('#unseated .guest[aria-pressed="true"]');
        if (again) again.focus();
      });
      li.appendChild(b);
      list.appendChild(li);
    });
    $('pickHint').textContent = picked ? 'Now tap a table.' : 'Tap a guest, then tap a table.';

    var wrap = $('tables');
    wrap.textContent = '';
    state.tables.forEach(function (tb, i) {
      var at = seatedAt(i);
      var card = el('div', { class: 'table' + (at.length >= tb.seats ? ' full' : '') });
      var head = el('button', { type: 'button', class: 'table-head', 'aria-label': 'Seat picked guest at ' + tb.name + ', ' + at.length + ' of ' + tb.seats + ' seats taken' });
      head.textContent = tb.name + ' . ' + at.length + ' of ' + tb.seats;
      head.addEventListener('click', function () {
        if (picked == null) { say(at.length >= tb.seats ? tb.name + ' is full' : 'Tap a guest first, then this table.'); return; }
        seat(picked, i);
      });
      card.appendChild(head);
      var ul = el('ul', { class: 'guests' });
      at.forEach(function (g) {
        var li = el('li');
        var b = el('button', { type: 'button', class: 'guest', 'aria-label': 'Move ' + g.name + ' back to unseated' });
        b.appendChild(el('span', null, g.name));
        b.appendChild(el('small', null, 'tap to unseat'));
        b.addEventListener('click', function () { unseat(g.id); });
        li.appendChild(b);
        ul.appendChild(li);
      });
      card.appendChild(ul);
      var tools = el('div', { class: 'table-tools' });
      var nameIn = el('input', { type: 'text', value: tb.name, maxlength: '40', 'aria-label': 'Rename ' + tb.name });
      nameIn.addEventListener('change', function () {
        tb.name = clean(nameIn.value).slice(0, 40) || 'Table ' + (i + 1);
        save(); renderPlan();
      });
      var seatsIn = el('input', { type: 'number', min: '1', max: '50', value: String(tb.seats), inputmode: 'numeric', 'aria-label': 'Seats at ' + tb.name });
      seatsIn.addEventListener('change', function () {
        var n = parseInt(seatsIn.value, 10);
        if (!(n >= at.length && n <= 50)) { say('Seats at ' + tb.name + ' must be between ' + Math.max(1, at.length) + ' and 50.'); seatsIn.value = tb.seats; return; }
        tb.seats = n; save(); renderPlan();
      });
      tools.appendChild(nameIn);
      tools.appendChild(seatsIn);
      card.appendChild(tools);
      wrap.appendChild(card);
    });
  }

  function buildPrint() {
    var v = $('printView');
    v.textContent = '';
    v.appendChild(el('h1', null, state.event || 'Seating chart'));
    state.tables.forEach(function (tb, i) {
      var box = el('div', { class: 'pt' });
      box.appendChild(el('h2', null, tb.name));
      var ul = el('ul');
      seatedAt(i).forEach(function (g) { ul.appendChild(el('li', null, g.name)); });
      box.appendChild(ul);
      v.appendChild(box);
    });
    v.appendChild(el('h2', null, 'Find your seat, A to Z'));
    var az = el('ul', { class: 'az' });
    state.guests.slice().sort(function (a, b) { return a.name.localeCompare(b.name); }).forEach(function (g) {
      az.appendChild(el('li', null, g.name + ' - ' + (g.table != null ? state.tables[g.table].name : 'not seated yet')));
    });
    v.appendChild(az);
  }

  function csvCell(s) { s = String(s == null ? '' : s); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
  function downloadCsv() {
    var rows = ['name,group,table'].concat(state.guests.map(function (g) {
      return [g.name, g.group, g.table != null ? state.tables[g.table].name : ''].map(csvCell).join(',');
    }));
    var blob = new Blob([rows.join('\n') + '\n'], { type: 'text/csv' });
    var a = el('a', { href: URL.createObjectURL(blob), download: 'seating-chart.csv' });
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
    say('CSV downloaded.');
  }

  $('startBtn').addEventListener('click', function () { show('setup'); });
  $('continueBtn').addEventListener('click', function () { show(state.tables.length ? 'plan' : 'setup'); });
  $('resetBtn').addEventListener('click', function () {
    if (!window.confirm('Start over? This clears your guests and tables on this device.')) return;
    state = blank(); picked = null; save(); show('setup');
  });
  $('eventName').addEventListener('input', function () { state.event = clean($('eventName').value).slice(0, 80); save(); });
  $('addGuestsBtn').addEventListener('click', addGuests);
  $('makeTablesBtn').addEventListener('click', makeTables);
  $('autoBtn').addEventListener('click', autoSeat);
  $('printBtn').addEventListener('click', function () { buildPrint(); window.print(); });
  $('csvBtn').addEventListener('click', downloadCsv);
  $('editBtn').addEventListener('click', function () { show('setup'); });
  $('search').addEventListener('input', renderPlan);
  window.addEventListener('beforeprint', buildPrint);

  show('home');
})();
