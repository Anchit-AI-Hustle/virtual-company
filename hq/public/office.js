// The illustrated office. Every person here is one of the company's AI agents, drawn as an
// original character. What each person is doing comes only from what that agent logged:
// typing means "working", a raised hand means "blocked", a tick means "just finished",
// a coffee means "idle". Hand-offs fly between desks only for real log events.
(function () {
  var SKIN = ['#8D5524', '#A0663A', '#C68642', '#7A4A2A', '#B97A57', '#D9A066', '#6B3E26', '#E0AC69'];
  var HAIR = ['#1C1A1A', '#2E2220', '#3B2A22', '#4A3428', '#5C4033', '#2A2A35'];
  var STYLES = ['short', 'long', 'bun', 'curly', 'quiff', 'buzz', 'bob', 'waves'];
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function pick(list, h, salt) { return list[(h >>> salt) % list.length]; }
  function shade(hex, f) {
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function c(v) { return Math.max(0, Math.min(255, Math.round(v * f))); }
    return '#' + ((1 << 24) + (c(r) << 16) + (c(g) << 8) + c(b)).toString(16).slice(1);
  }
  function looks(a) {
    var h = hash(a.id + a.name);
    return { skin: pick(SKIN, h, 0), hair: pick(HAIR, h, 3), style: pick(STYLES, h, 6), glasses: (h >>> 9) % 4 === 0, beard: (h >>> 11) % 5 === 0, shirt: a.color, sleeve: shade(a.color, 0.82) };
  }

  function hairSvg(style, c) {
    var base = '<path d="M45 41 Q44 23 60 22 Q76 23 75 41 Q73 31 60 30 Q47 31 45 41Z" fill="' + c + '"/>';
    switch (style) {
      case 'long': return base + '<path d="M45 37 Q41 55 46 62 L50 43Z M75 37 Q79 55 74 62 L70 43Z" fill="' + c + '"/>';
      case 'bun': return base + '<circle cx="60" cy="19" r="6.5" fill="' + c + '"/>';
      case 'curly': return '<g fill="' + c + '"><circle cx="48" cy="31" r="6"/><circle cx="55" cy="25" r="6.5"/><circle cx="64" cy="24.5" r="6.5"/><circle cx="72" cy="30" r="6"/><circle cx="46" cy="38" r="4.5"/><circle cx="74" cy="38" r="4.5"/></g>';
      case 'quiff': return '<path d="M45 40 Q45 22 62 21 Q79 23 75 40 Q71 28 54 32Z" fill="' + c + '"/>';
      case 'buzz': return '<path d="M46 37 Q47 25 60 25 Q73 25 74 37 Q70 30 60 30 Q50 30 46 37Z" fill="' + c + '" opacity=".85"/>';
      case 'bob': return '<path d="M44 46 Q42 22 60 22 Q78 22 76 46 L72 46 Q72 32 60 31 Q48 32 48 46Z" fill="' + c + '"/>';
      case 'waves': return base + '<path d="M45 40 Q42 50 46 56 Q44 48 48 44Z M75 40 Q78 50 74 56 Q76 48 72 44Z" fill="' + c + '"/>';
      default: return base;
    }
  }

  // One person at one desk, facing the viewer across a laptop.
  function personSvg(a, state) {
    var L = looks(a);
    var arms;
    if (state === 'blocked') {
      arms = '<path class="arm" d="M40 68 Q40 80 50 87" stroke="' + L.sleeve + '" stroke-width="8" stroke-linecap="round" fill="none"/>' +
        '<path class="arm raise" d="M80 66 Q92 52 89 34" stroke="' + L.sleeve + '" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="89" cy="31" r="4.6" fill="' + L.skin + '"/>';
    } else if (state === 'idle') {
      arms = '<path class="arm" d="M40 68 Q40 80 50 87" stroke="' + L.sleeve + '" stroke-width="8" stroke-linecap="round" fill="none"/>' +
        '<path class="arm" d="M80 68 Q86 80 76 78" stroke="' + L.sleeve + '" stroke-width="8" stroke-linecap="round" fill="none"/>' +
        '<rect x="68" y="69" width="9" height="11" rx="2" fill="#F3F5F9" stroke="#9AA6BD"/><path d="M77 72 q3 0 3 3 q0 3 -3 3" stroke="#9AA6BD" fill="none"/>' +
        '<g class="steam" stroke="#B8C2D6" stroke-width="1.4" fill="none" stroke-linecap="round"><path d="M70 66 q-2 -4 0 -7"/><path d="M74 66 q2 -4 0 -7"/></g>';
    } else {
      arms = '<path class="arm left" d="M40 68 Q38 80 49 87" stroke="' + L.sleeve + '" stroke-width="8" stroke-linecap="round" fill="none"/>' +
        '<path class="arm right" d="M80 68 Q82 80 71 87" stroke="' + L.sleeve + '" stroke-width="8" stroke-linecap="round" fill="none"/>';
    }
    var mouth = state === 'blocked' ? '<path d="M56.5 49 Q60 46.5 63.5 49" stroke="#3A2418" stroke-width="1.5" fill="none" stroke-linecap="round"/>'
      : state === 'done' ? '<path d="M55.5 46.5 Q60 51.5 64.5 46.5" stroke="#3A2418" stroke-width="1.6" fill="none" stroke-linecap="round"/>'
      : '<path d="M56.5 47.5 Q60 49.5 63.5 47.5" stroke="#3A2418" stroke-width="1.5" fill="none" stroke-linecap="round"/>';
    var screenGlow = state === 'working' ? '<path class="glow" d="M46 70 L74 70 L79 88 L41 88Z" fill="#7FE0C2" opacity=".35"/>' : '';
    return '<svg viewBox="0 0 120 112" class="person" aria-hidden="true" focusable="false">' +
      '<ellipse cx="60" cy="108" rx="50" ry="3.5" fill="#000" opacity=".07"/>' +
      '<rect x="37" y="28" width="46" height="52" rx="12" fill="#2B3654"/>' +
      '<g class="body"><path d="M33 96 Q33 63 60 61 Q87 63 87 96Z" fill="' + L.shirt + '"/>' +
      '<rect x="55.5" y="50" width="9" height="13" rx="3" fill="' + shade(L.skin, 0.9) + '"/>' +
      '<g class="head"><circle cx="60" cy="40" r="15.5" fill="' + L.skin + '"/>' +
      hairSvg(L.style, L.hair) +
      '<g class="eyes" fill="#2A1A12"><circle cx="54.5" cy="41" r="1.7"/><circle cx="65.5" cy="41" r="1.7"/></g>' +
      (L.glasses ? '<g stroke="#2B3654" stroke-width="1.3" fill="none"><circle cx="54.5" cy="41" r="4.2"/><circle cx="65.5" cy="41" r="4.2"/><path d="M58.7 41 h2.6"/></g>' : '') +
      (L.beard ? '<path d="M47 45 Q50 57 60 57 Q70 57 73 45 Q70 52 60 52 Q50 52 47 45Z" fill="' + L.hair + '" opacity=".9"/>' : '') +
      mouth + '</g>' + arms + '</g>' +
      screenGlow +
      '<path d="M44 88 L48 69 L72 69 L76 88Z" fill="#C3CBD9" stroke="#9AA6BD" stroke-width="1"/>' +
      '<circle cx="60" cy="78.5" r="2.4" fill="' + (state === 'working' ? '#0B7A5E' : '#9AA6BD') + '"/>' +
      '<rect x="2" y="87" width="116" height="8" rx="2.5" fill="#9B7B5F"/><rect x="2" y="87" width="116" height="2.5" rx="1" fill="#B8977A"/>' +
      '<rect x="10" y="95" width="5" height="12" fill="#7E634C"/><rect x="105" y="95" width="5" height="12" fill="#7E634C"/>' +
      '</svg>';
  }

  var ICONS = {
    research: '<circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5 L14.5 14.5"/>',
    code: '<path d="M5 4 L1.5 8 L5 12 M11 4 L14.5 8 L11 12"/>',
    review: '<path d="M2 4 h2 M6 4 h8 M2 8 h2 M6 8 h8 M2 12 h2 M6 12 h8"/>',
    ship: '<path d="M8 1.5 Q12.5 5 11 11 L5 11 Q3.5 5 8 1.5Z M5.5 11 L4 14.5 M10.5 11 L12 14.5"/>',
    write: '<path d="M3 2 h7 l3 3 v9 h-10Z M5.5 7.5 h5 M5.5 10.5 h5"/>',
    money: '<path d="M4 3 h8 M4 6 h8 M6 3 q5 0 5 3.5 q0 3 -5 3 L11 14"/>',
    talk: '<path d="M2 3 h12 v8 h-7 l-3 3 v-3 h-2Z"/>'
  };
  function iconFor(text) {
    var t = (text || '').toLowerCase();
    if (/research|search|evidence|source|forum|demand|signal/.test(t)) return 'research';
    if (/deploy|release|vercel|live url|ship|domain|uptime/.test(t)) return 'ship';
    if (/review|test|qa|check|audit|scan|passed|failed/.test(t)) return 'review';
    if (/build|code|fix|implement|engineer/.test(t)) return 'code';
    if (/price|revenue|ledger|fx|rate|money|inr|payment/.test(t)) return 'money';
    if (/spec|write|draft|copy|post|standup|plan/.test(t)) return 'write';
    return 'talk';
  }
  function iconSvg(name) { return '<svg viewBox="0 0 16 16" class="ico" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + ICONS[name] + '</g></svg>'; }

  function decorSvg(kind) {
    if (kind === 'plant') return '<svg viewBox="0 0 30 40" class="decor plant" aria-hidden="true"><path d="M8 28 h14 l-2 11 h-10Z" fill="#B86F4C"/><g fill="#3E8E63"><path d="M15 28 Q4 22 6 10 Q13 17 15 28Z"/><path d="M15 28 Q26 20 24 7 Q16 15 15 28Z"/><path d="M15 28 Q14 14 15 3 Q19 15 15 28Z" fill="#4FA877"/></g></svg>';
    if (kind === 'window') return '<svg viewBox="0 0 60 30" class="decor window" aria-hidden="true"><rect x="1" y="1" width="58" height="28" rx="2" fill="#CFE6F7" stroke="#9AA6BD" stroke-width="2"/><path d="M30 1 V29 M1 15 H59" stroke="#9AA6BD" stroke-width="2"/><path d="M6 24 Q14 16 22 22 Q30 14 38 21" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/></svg>';
    return '';
  }

  // Build the floor: one room per department, one desk per agent.
  function render(floor, d, opts) {
    floor.textContent = '';
    var pending = d.approvals ? d.approvals.length : 0;
    d.departments.forEach(function (dep, i) {
      var people = d.office.filter(function (a) { return a.department === dep.id; });
      var room = document.createElement('div');
      room.className = 'room' + (dep.id === 'pods' ? ' room-pods' : '');
      var wall = document.createElement('div');
      wall.className = 'wall';
      var sign = document.createElement('h3');
      sign.className = 'sign';
      sign.textContent = dep.name;
      wall.appendChild(sign);
      var busy = people.filter(function (a) { return a.state === 'working'; }).length;
      var count = document.createElement('span');
      count.className = 'busy';
      count.textContent = busy ? busy + ' at work' : 'quiet';
      wall.appendChild(count);
      wall.insertAdjacentHTML('beforeend', decorSvg('window'));
      if (dep.id === 'leadership') {
        var board = document.createElement('span');
        board.className = 'board';
        board.textContent = pending ? pending + ' waiting on you' : 'Nothing waiting on you';
        wall.appendChild(board);
      }
      room.appendChild(wall);
      var desks = document.createElement('div');
      desks.className = 'desks';
      people.forEach(function (a) { desks.appendChild(deskEl(a, opts)); });
      room.appendChild(desks);
      if (i % 2 === 0) room.insertAdjacentHTML('beforeend', decorSvg('plant'));
      floor.appendChild(room);
    });
  }

  function deskEl(a, opts) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'desk is-' + a.state;
    b.dataset.agent = a.id;
    b.innerHTML = '<span class="bubble"></span>' + personSvg(a, a.state) + '<span class="tag"><b></b><small></small></span>';
    b.querySelector('.tag b').textContent = a.name;
    b.querySelector('.tag small').textContent = a.title;
    setBubble(b, a.state, a.task, a.ventureTitle);
    b.setAttribute('aria-label', a.name + ', ' + a.title + ', ' + (a.state === 'idle' ? 'idle' : ({ working: 'working on ', done: 'finished ', blocked: 'blocked on ' }[a.state] + (a.task || ''))));
    b.addEventListener('click', function () { opts.onOpen(a.id); });
    return b;
  }

  function setBubble(desk, state, task, ventureTitle) {
    var bub = desk.querySelector('.bubble');
    bub.className = 'bubble b-' + state;
    if (state === 'idle' || !task) { bub.innerHTML = ''; bub.hidden = true; return; }
    bub.hidden = false;
    var icon = state === 'blocked' ? '<svg viewBox="0 0 16 16" class="ico" aria-hidden="true"><path d="M3 15 V2 M3 2 h9 l-2 3 l2 3 h-9" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>'
      : state === 'done' ? '<svg viewBox="0 0 16 16" class="ico" aria-hidden="true"><path d="M2.5 8.5 L6.5 12 L13.5 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      : iconSvg(iconFor(task));
    bub.innerHTML = icon + '<span class="btxt"></span>';
    bub.querySelector('.btxt').textContent = task + (ventureTitle ? ' (' + ventureTitle + ')' : '');
  }

  // Make one person act out a real event for a moment, and fly the hand-off if the
  // previous step on the same venture was someone else's.
  function act(floor, office, e, prev) {
    var desk = floor.querySelector('.desk[data-agent="' + e.agent + '"]');
    if (!desk) return;
    var a = office.filter(function (x) { return x.id === e.agent; })[0];
    var state = e.kind === 'blocked' ? 'blocked' : e.kind === 'start' ? 'working' : 'done';
    var text = e.action.replace(/^(Started|Blocked): /, '');
    desk.className = 'desk is-' + state + ' is-acting';
    desk.querySelector('.person').outerHTML = personSvg(a, state);
    setBubble(desk, state, text, null);
    if (prev && prev.agent !== e.agent && prev.ventureId && prev.ventureId === e.ventureId) handoff(floor, prev.agent, e.agent);
    if (!reduce && desk.scrollIntoView && floor.dataset.follow === '1') desk.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }

  function handoff(floor, fromId, toId) {
    if (reduce) return;
    var from = floor.querySelector('.desk[data-agent="' + fromId + '"] .person');
    var to = floor.querySelector('.desk[data-agent="' + toId + '"] .person');
    if (!from || !to || !floor.animate) return;
    var box = floor.getBoundingClientRect(), f = from.getBoundingClientRect(), t = to.getBoundingClientRect();
    var doc = document.createElement('span');
    doc.className = 'paper';
    floor.appendChild(doc);
    var x0 = f.left - box.left + f.width / 2, y0 = f.top - box.top + f.height * 0.7;
    var x1 = t.left - box.left + t.width / 2, y1 = t.top - box.top + t.height * 0.7;
    var lift = Math.min(y0, y1) - 60;
    var anim = doc.animate([
      { transform: 'translate(' + x0 + 'px,' + y0 + 'px) rotate(0deg) scale(.6)', opacity: 0 },
      { transform: 'translate(' + x0 + 'px,' + y0 + 'px) rotate(-8deg) scale(1)', opacity: 1, offset: 0.12 },
      { transform: 'translate(' + (x0 + x1) / 2 + 'px,' + lift + 'px) rotate(12deg) scale(1.1)', opacity: 1, offset: 0.55 },
      { transform: 'translate(' + x1 + 'px,' + y1 + 'px) rotate(0deg) scale(.7)', opacity: 0 }
    ], { duration: 1100, easing: 'ease-in-out' });
    anim.onfinish = function () { doc.remove(); };
  }

  // Play a list of real events, one after another, then hand back to the live view.
  var timer = null;
  function play(floor, d, events, opts) {
    stop();
    var i = 0, prevByVenture = {};
    function step() {
      if (i >= events.length) { timer = null; if (opts.onEnd) opts.onEnd(); return; }
      var e = events[i++];
      act(floor, d.office, e, e.ventureId ? prevByVenture[e.ventureId] : null);
      if (e.ventureId) prevByVenture[e.ventureId] = e;
      if (opts.onStep) opts.onStep(e, i, events.length);
      timer = setTimeout(step, opts.gap || 1200);
    }
    step();
  }
  function stop() { if (timer) clearTimeout(timer); timer = null; }

  window.Office = { render: render, play: play, stop: stop, looks: looks, personSvg: personSvg };
})();
