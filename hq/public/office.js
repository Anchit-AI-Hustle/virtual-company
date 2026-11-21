// The illustrated office. Every person here is one of the company's AI agents, drawn as an
// original character in an office chair. What each person is doing comes only from what that
// agent logged: typing, a phone call or reading means "working" (picked from the task's words),
// a raised hand means "blocked", stretching means "just finished", a coffee means "idle". Hand-offs fly between desks only for real log events.
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
  var OUTFITS = ['shirt', 'tee', 'hoodie', 'blazer', 'kurta', 'shirt', 'tee', 'polo'];
  function looks(a) {
    var h = hash(a.id + a.name);
    return { skin: pick(SKIN, h, 0), hair: pick(HAIR, h, 3), style: pick(STYLES, h, 6), glasses: (h >>> 9) % 4 === 0, beard: (h >>> 11) % 5 === 0,
      shirt: a.color, sleeve: shade(a.color, 0.86), outfit: pick(OUTFITS, h, 13), phones: (h >>> 17) % 5 === 0, lanyard: (h >>> 19) % 3 === 0, watch: (h >>> 21) % 2 === 0 };
  }

  function hairSvg(style, c) {
    var hi = shade(c, 1.45);
    var base = '<path d="M45.5 40 Q44 22 60 21 Q76 22 74.5 40 Q72 29 60 28.5 Q48 29 45.5 40Z" fill="' + c + '"/>';
    var shine = '<path d="M52 25 Q58 22.5 65 24" stroke="' + hi + '" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".55"/>';
    switch (style) {
      case 'long': return '<path d="M44 34 Q39 58 45 66 L50 46Z M76 34 Q81 58 75 66 L70 46Z" fill="' + c + '"/>' + base + shine;
      case 'bun': return '<circle cx="60" cy="18" r="6.5" fill="' + c + '"/>' + base + shine;
      case 'curly': return '<g fill="' + c + '"><circle cx="48" cy="30" r="6"/><circle cx="54.5" cy="24.5" r="6.5"/><circle cx="62" cy="23" r="6.8"/><circle cx="69.5" cy="26" r="6.3"/><circle cx="73" cy="33" r="5"/><circle cx="46" cy="37" r="4.5"/><circle cx="74.5" cy="39" r="3.8"/></g>';
      case 'quiff': return '<path d="M45.5 39 Q44.5 21 62 19.5 Q79 21.5 74.5 39 Q71 27 54 31Z" fill="' + c + '"/>' + shine;
      case 'buzz': return '<path d="M46.5 36 Q47.5 24.5 60 24.5 Q72.5 24.5 73.5 36 Q70 29.5 60 29.5 Q50 29.5 46.5 36Z" fill="' + c + '" opacity=".88"/>';
      case 'bob': return '<path d="M43.5 48 Q41.5 21 60 21 Q78.5 21 76.5 48 L72 48 Q72.5 31 60 30.5 Q47.5 31 48 48Z" fill="' + c + '"/>' + shine;
      case 'waves': return '<path d="M45 39 Q41 50 45.5 58 Q44 49 48.5 44Z M75 39 Q79 50 74.5 58 Q76 49 71.5 44Z" fill="' + c + '"/>' + base + shine;
      default: return base + shine;
    }
  }

  // One person at one desk, sitting in an office chair, facing the viewer across a laptop,
  // with one thing of their own on the desk.
  var ITEMS = ['mug', 'plant', 'papers', 'phone', 'books', 'none'];
  function deskItem(kind) {
    switch (kind) {
      case 'mug': return '<rect x="94" y="78" width="9" height="10" rx="2" fill="#E9EDF3" stroke="#9AA6BD"/><path d="M103 81 q3 0 3 3 q0 3 -3 3" stroke="#9AA6BD" fill="none"/>';
      case 'plant': return '<path d="M93 80 h12 l-1.5 8 h-9Z" fill="#B86F4C"/><path d="M99 80 Q92 74 94 66 Q98 72 99 80Z M99 80 Q106 73 104 64 Q100 71 99 80Z" fill="#3E8E63"/>';
      case 'papers': return '<rect x="12" y="81" width="20" height="7" rx="1" fill="#F7F8FB" stroke="#B9C2D3" transform="rotate(-6 22 84)"/><rect x="14" y="79" width="20" height="7" rx="1" fill="#FFFFFF" stroke="#B9C2D3"/>';
      case 'phone': return '<rect x="94" y="83" width="12" height="5" rx="1.5" fill="#2B3654"/>';
      case 'books': return '<rect x="12" y="76" width="5" height="12" fill="#6B4E9B"/><rect x="17" y="78" width="5" height="10" fill="#0E6E8C"/><rect x="22" y="75" width="5" height="13" fill="#C27A00"/>';
      default: return '';
    }
  }
  function torso(L) {
    var s = L.shirt, dk = shade(s, 0.72), out = '<path d="M31 97 Q31 66 46 62 L60 60 L74 62 Q89 66 89 97Z" fill="' + s + '"/>' +
      '<path d="M31 97 Q31 70 43 64 Q38 82 40 97Z" fill="#000" opacity=".09"/><path d="M89 97 Q89 70 77 64 Q82 82 80 97Z" fill="#fff" opacity=".06"/>';
    switch (L.outfit) {
      case 'shirt': return out + '<path d="M53 60.5 L60 70 L67 60.5 L64 59 L60 64 L56 59Z" fill="#F4F6FA"/><path d="M60 70 V96" stroke="' + dk + '" stroke-width="1"/><circle cx="60" cy="76" r=".9" fill="' + dk + '"/><circle cx="60" cy="83" r=".9" fill="' + dk + '"/><circle cx="60" cy="90" r=".9" fill="' + dk + '"/>';
      case 'polo': return out + '<path d="M54 60.5 L60 67 L66 60.5" fill="none" stroke="' + dk + '" stroke-width="2.2" stroke-linejoin="round"/><path d="M60 67 V75" stroke="' + dk + '" stroke-width="1.2"/>';
      case 'hoodie': return out + '<path d="M47 63 Q60 54 73 63 Q66 67 60 67 Q54 67 47 63Z" fill="' + dk + '"/><path d="M56.5 66 V76 M63.5 66 V76" stroke="#F4F6FA" stroke-width="1.2" stroke-linecap="round"/><path d="M48 86 H72 V96 H48Z" fill="' + dk + '" opacity=".35"/>';
      case 'blazer': return '<path d="M31 97 Q31 66 46 62 L60 60 L74 62 Q89 66 89 97Z" fill="#2E3A55"/><path d="M52 61 L60 96 L68 61Z" fill="' + s + '"/><path d="M46 62 L52 61 L58 80 L53 72Z M74 62 L68 61 L62 80 L67 72Z" fill="#1F2840"/><path d="M31 97 Q31 70 43 64 Q38 82 40 97Z" fill="#000" opacity=".12"/>';
      case 'kurta': return out + '<path d="M55 60 Q60 62.5 65 60 L65 62.5 Q60 65 55 62.5Z" fill="' + dk + '"/><path d="M60 63 V80" stroke="' + dk + '" stroke-width="1.4"/><circle cx="60" cy="68" r=".9" fill="#E8C468"/><circle cx="60" cy="73" r=".9" fill="#E8C468"/><circle cx="60" cy="78" r=".9" fill="#E8C468"/>';
      default: return out + '<path d="M53 60.8 Q60 66 67 60.8" fill="none" stroke="' + dk + '" stroke-width="2" stroke-linecap="round"/>';
    }
  }
  function hand(x, y, skin, r) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (r || 3.8) + '" ry="' + ((r || 3.8) * 0.8) + '" fill="' + skin + '"/>'; }
  function sleeve(d, L, cls) { return '<path class="arm' + (cls ? ' ' + cls : '') + '" d="' + d + '" stroke="' + (L.outfit === 'blazer' ? '#2E3A55' : L.sleeve) + '" stroke-width="8.5" stroke-linecap="round" fill="none"/>'; }

  // Poses come only from what the agent reported: typing for most work, a phone call for
  // talking, a hand on the chin for reviewing, a stretch for done, a raised hand when stuck.
  function pose(state, task) {
    if (state === 'blocked' || state === 'idle' || state === 'done') return state;
    var t = (task || '').toLowerCase();
    if (/build|code|fix|implement|draft|write|deploy|release|ship|page/.test(t)) return 'type';
    var k = iconFor(task);
    return k === 'talk' ? 'call' : k === 'review' || k === 'research' ? 'read' : 'type';
  }
  function personSvg(a, state, task) {
    var L = looks(a);
    var h = hash(a.id + 'item');
    var sk = L.skin, skinShade = shade(sk, 0.84), p = pose(state, task);
    var watch = L.watch ? '<rect x="45.5" y="80.5" width="5" height="3" rx="1" fill="#2B3654"/>' : '';
    var arms;
    if (p === 'blocked') {
      arms = sleeve('M40 68 Q40 80 50 86', L) + hand(50.5, 86.5, sk) +
        sleeve('M80 66 Q93 52 89 33', L, 'raise') + '<g class="raise"><ellipse cx="89" cy="29" rx="4.2" ry="5.2" fill="' + sk + '"/><path d="M86.5 25 v-4 M89 24.5 v-5 M91.5 25 v-4" stroke="' + sk + '" stroke-width="2" stroke-linecap="round"/></g>';
    } else if (p === 'idle') {
      arms = sleeve('M40 68 Q40 80 50 86', L) + hand(50.5, 86.5, sk) +
        sleeve('M80 68 Q87 80 76 79', L) +
        '<rect x="68" y="69" width="9" height="11" rx="2" fill="#F3F5F9" stroke="#9AA6BD"/><path d="M77 72 q3 0 3 3 q0 3 -3 3" stroke="#9AA6BD" fill="none"/>' + hand(72, 78.5, sk, 3.6) +
        '<g class="steam" stroke="#B8C2D6" stroke-width="1.4" fill="none" stroke-linecap="round"><path d="M70 66 q-2 -4 0 -7"/><path d="M74 66 q2 -4 0 -7"/></g>';
    } else if (p === 'done') {
      arms = sleeve('M40 66 Q30 52 42 40', L, 'stretch') + hand(43.5, 38.5, sk) + sleeve('M80 66 Q90 52 78 40', L, 'stretch') + hand(76.5, 38.5, sk);
    } else if (p === 'call') {
      arms = sleeve('M40 68 Q38 80 49 86', L, 'left') + hand(49.5, 86.5, sk) +
        sleeve('M80 66 Q88 58 77 47', L) + '<rect x="72.5" y="37" width="5" height="12" rx="1.6" fill="#1D2438"/>' + hand(76, 46, sk, 3.6);
    } else if (p === 'read') {
      arms = sleeve('M40 68 Q38 80 49 86', L, 'left') + hand(49.5, 86.5, sk) +
        sleeve('M80 66 Q84 60 70 53', L) + hand(67, 52.5, sk, 3.4);
    } else {
      arms = sleeve('M40 68 Q37 80 49 86', L, 'left') + sleeve('M80 68 Q83 80 71 86', L, 'right') +
        '<g class="arm left">' + hand(49.5, 86.5, sk) + watch + '</g><g class="arm right">' + hand(70.5, 86.5, sk) + '</g>';
    }
    var lookDown = p === 'type' || p === 'read' ? 0.9 : 0;
    var mouth = p === 'blocked' ? '<path d="M56.8 50 Q60 48 63.2 50" stroke="#7A3B30" stroke-width="1.5" fill="none" stroke-linecap="round"/>'
      : p === 'done' ? '<path d="M55.5 48 Q60 53 64.5 48 Q60 50 55.5 48Z" fill="#7A3B30"/><path d="M57 48.6 Q60 49.6 63 48.6" stroke="#fff" stroke-width="1.1" fill="none"/>'
      : p === 'call' ? '<ellipse cx="60" cy="49.5" rx="2.3" ry="1.6" fill="#7A3B30"/>'
      : '<path d="M56.5 48.6 Q60 47.6 63.5 48.6 Q60 50.6 56.5 48.6Z" fill="' + shade(sk, 0.68) + '"/><path d="M56.5 48.6 Q60 49.4 63.5 48.6" stroke="#6A3328" stroke-width=".9" fill="none" opacity=".7"/>';
    var brows = p === 'blocked' ? '<path d="M50.5 35 l6.5 1.8 M69.5 35 l-6.5 1.8" stroke="' + L.hair + '" stroke-width="1.8" stroke-linecap="round"/>'
      : '<path d="M50.8 35.6 q3.4 -1.9 6.6 -.2 M62.6 35.4 q3.2 -1.7 6.6 .2" stroke="' + L.hair + '" stroke-width="1.7" fill="none" stroke-linecap="round"/>';
    var eye = function (x) {
      return '<ellipse cx="' + x + '" cy="40.6" rx="2.7" ry="1.8" fill="#FBFBF8"/><circle cx="' + x + '" cy="' + (40.6 + lookDown) + '" r="1.45" fill="#3A2416"/><circle cx="' + (x + 0.5) + '" cy="' + (40.1 + lookDown) + '" r=".45" fill="#fff"/>' +
        '<path d="M' + (x - 2.9) + ' 40.2 Q' + x + ' 37.9 ' + (x + 2.9) + ' 40.2" stroke="#2A1A12" stroke-width="1" fill="none"/>';
    };
    var glow = state === 'working' && p !== 'call' ? '<path class="glow" d="M46 70 L74 70 L79 88 L41 88Z" fill="#9CF0D6" opacity=".4"/><ellipse class="glow" cx="60" cy="44" rx="13" ry="10" fill="#9CF0D6" opacity=".12"/>' : '';
    var phones = L.phones ? '<path d="M44.5 38 Q44 20 60 19.5 Q76 20 75.5 38" stroke="#2B3654" stroke-width="2.4" fill="none"/><rect x="41.5" y="36" width="5.5" height="9" rx="2.4" fill="#2B3654"/><rect x="73" y="36" width="5.5" height="9" rx="2.4" fill="#2B3654"/>' : '';
    var lanyard = L.lanyard && L.outfit !== 'blazer' ? '<path d="M53 61 L58 78 M67 61 L62 78" stroke="#B8324A" stroke-width="1.3"/><rect x="56" y="77" width="8" height="10" rx="1.2" fill="#F4F6FA" stroke="#9AA6BD" stroke-width=".8"/><rect x="57.5" y="79" width="5" height="2.2" fill="' + L.shirt + '"/>' : '';
    return '<svg viewBox="0 0 120 112" class="person" aria-hidden="true" focusable="false">' +
      '<ellipse cx="60" cy="108" rx="52" ry="4" fill="#000" opacity=".09"/>' +
      // office chair: back and headrest behind the person
      '<rect x="34" y="34" width="52" height="54" rx="12" fill="#2B3654"/><rect x="38" y="38" width="44" height="46" rx="9" fill="#38476E"/><path d="M42 44 h36" stroke="#45568A" stroke-width="2" stroke-linecap="round"/>' +
      '<g class="body">' + torso(L) + lanyard +
      '<path d="M55 50 L55 62 Q60 65 65 62 L65 50Z" fill="' + skinShade + '"/><path d="M55 58 Q60 61 65 58 V62 Q60 65 55 62Z" fill="#000" opacity=".08"/>' +
      '<g class="head"><ellipse cx="44.8" cy="42" rx="2.5" ry="3.8" fill="' + skinShade + '"/><ellipse cx="75.2" cy="42" rx="2.5" ry="3.8" fill="' + skinShade + '"/>' +
      '<path d="M45.5 38 Q45.5 23 60 23 Q74.5 23 74.5 38 Q74.5 50 67 54.5 Q63.5 56.5 60 56.5 Q56.5 56.5 53 54.5 Q45.5 50 45.5 38Z" fill="' + sk + '"/>' +
      '<path d="M46.5 44 Q48.5 53 56 55.8 Q51 51 49.5 44Z" fill="#000" opacity=".07"/>' +
      hairSvg(L.style, L.hair) + phones + brows +
      '<g class="eyes">' + eye(54.5) + eye(65.5) + '</g>' +
      '<path d="M60.3 41.5 Q58.6 45.5 59 46.6 Q60.2 47.3 61.6 46.6" stroke="' + shade(sk, 0.72) + '" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="50.3" cy="46.2" rx="2.6" ry="1.4" fill="#E58C7A" opacity=".18"/><ellipse cx="69.7" cy="46.2" rx="2.6" ry="1.4" fill="#E58C7A" opacity=".18"/>' +
      (L.glasses ? '<g stroke="#2B3654" stroke-width="1.2" fill="#fff" fill-opacity=".1"><rect x="50" y="37.6" width="9" height="6.6" rx="2.4"/><rect x="61" y="37.6" width="9" height="6.6" rx="2.4"/><path d="M59 40 h2 M50 40 l-4.5 -1 M70 40 l4.5 -1" fill="none"/></g>' : '') +
      (L.beard ? '<path d="M46.8 44 Q49 56.5 60 57.6 Q71 56.5 73.2 44 Q70.5 52 64 52.6 Q60 51.2 56 52.6 Q49.5 52 46.8 44Z" fill="' + L.hair + '" opacity=".93"/>' : '') +
      mouth + '</g>' + arms + '</g>' +
      glow +
      '<path d="M44 88 L48 69 L72 69 L76 88Z" fill="#C9D0DC" stroke="#9AA6BD" stroke-width="1"/><path d="M48 69 L72 69 L71.2 72 L48.8 72Z" fill="#B3BCCB"/>' +
      '<path d="M57.6 77 q2.4 -3.4 4.8 0 q-2.4 3.4 -4.8 0Z" fill="' + (state === 'working' ? '#0B7A5E' : '#9AA6BD') + '"/>' +
      '<rect x="2" y="87" width="116" height="8" rx="2.5" fill="#9B7B5F"/><rect x="2" y="87" width="116" height="2.5" rx="1" fill="#C2A386"/><rect x="2" y="93" width="116" height="2" fill="#7E634C"/>' +
      deskItem(pick(ITEMS, h, 2)) +
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
    b.innerHTML = '<span class="bubble"></span>' + personSvg(a, a.state, a.task) + '<span class="tag"><b></b><small></small></span>';
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
    desk.title = desk.querySelector('.tag b').textContent + ': ' + task;
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
    desk.querySelector('.person').outerHTML = personSvg(a, state, text);
    setBubble(desk, state, text, null);
    if (prev && prev.agent !== e.agent && prev.ventureId && prev.ventureId === e.ventureId) handoff(floor, prev.agent, e.agent);
    if (!reduce && desk.scrollIntoView && floor.dataset.follow === '1') desk.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }

  function handoff(floor, fromId, toId) {
    if (reduce) return;
    var from = floor.querySelector('.desk[data-agent="' + fromId + '"] .person');
    var to = floor.querySelector('.desk[data-agent="' + toId + '"] .person');
    if (!from || !to || !floor.animate) return;
    var host = floor.closest ? (floor.closest('.stage') || floor) : floor;
    var box = host.getBoundingClientRect(), f = from.getBoundingClientRect(), t = to.getBoundingClientRect();
    var doc = document.createElement('span');
    doc.className = 'paper';
    host.appendChild(doc);
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



  // India time drives the light: what you see through the windows is the real sky right now.
  function istNow() { var d = new Date(Date.now() + 330 * 60000); return { h: d.getUTCHours(), m: d.getUTCMinutes() }; }
  function daypart() {
    var h = istNow().h;
    return h >= 6 && h < 8 ? 'dawn' : h >= 8 && h < 17 ? 'day' : h >= 17 && h < 19 ? 'dusk' : 'night';
  }
  var SKY = { dawn: ['#F6C6A8', '#BFD9F2'], day: ['#9FD0F5', '#DDF0FC'], dusk: ['#F29E6B', '#7E78B8'], night: ['#16224A', '#2C3B6E'] };
  function windowsSvg(w) {
    var part = daypart(), sky = SKY[part], n = Math.max(2, Math.floor((w - 40) / 120)), out = '';
    var gap = (w - n * 84) / (n + 1);
    for (var i = 0; i < n; i++) {
      var x = gap + i * (84 + gap);
      out += '<g transform="translate(' + x.toFixed(1) + ',3)"><rect width="84" height="22" rx="2" fill="url(#sky-' + part + ')" stroke="#8E9AB0" stroke-width="2.5"/>' +
        '<path d="M42 0 V22" stroke="#8E9AB0" stroke-width="2"/>' +
        (part === 'night' ? '<circle cx="' + (18 + i * 9) % 70 + '" cy="8" r="1" fill="#fff"/><circle cx="' + (52 + i * 13) % 80 + '" cy="14" r=".8" fill="#fff"/>' + (i === 0 ? '<circle cx="66" cy="8" r="4" fill="#F2EBC9"/>' : '')
          : (i === 0 ? '<circle cx="14" cy="9" r="' + (part === 'day' ? 4 : 5) + '" fill="' + (part === 'day' ? '#FFE07A' : '#FFB46B') + '"/>' : '') + '<path d="M50 16 q6 -6 12 -2 q5 -4 10 1" stroke="#fff" stroke-width="2.4" fill="none" opacity=".85"/>') +
        '</g>';
    }
    return '<svg class="windows" viewBox="0 0 ' + w + ' 28" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="sky-' + part + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + sky[0] + '"/><stop offset="1" stop-color="' + sky[1] + '"/></linearGradient></defs>' + out + '</svg>';
  }
  function clockSvg() {
    var t = istNow(), ha = ((t.h % 12) + t.m / 60) * 30, ma = t.m * 6;
    return '<svg class="clock" viewBox="0 0 24 24" role="img" aria-label="Time in India ' + t.h + ':' + (t.m < 10 ? '0' : '') + t.m + '"><circle cx="12" cy="12" r="10.5" fill="#fff" stroke="#2B3654" stroke-width="2"/>' +
      '<path d="M12 12 L12 6.5" stroke="#2B3654" stroke-width="2" stroke-linecap="round" transform="rotate(' + ha + ' 12 12)"/>' +
      '<path d="M12 12 L12 4" stroke="#2B3654" stroke-width="1.4" stroke-linecap="round" transform="rotate(' + ma + ' 12 12)"/><circle cx="12" cy="12" r="1.2" fill="#B8324A"/></svg>';
  }
  function kanbanSvg(d) {
    var cols = [['Ideas', ['idea']], ['Doing', ['validating', 'validated', 'spec', 'building', 'qa']], ['Live', ['live', 'scaling']]];
    var colors = ['#FFE58A', '#A8E6CF', '#A9D1F7'];
    var out = '<rect width="150" height="58" rx="3" fill="#FAFBFD" stroke="#9AA6BD" stroke-width="2"/>';
    cols.forEach(function (c, i) {
      var n = d.ventures.filter(function (v) { return c[1].indexOf(v.stage) > -1; }).length;
      var x = 6 + i * 48;
      out += '<text x="' + (x + 2) + '" y="11" font-size="7.5" font-weight="700" fill="#4A5670" font-family="Instrument Sans, sans-serif">' + c[0] + ' ' + n + '</text>';
      for (var k = 0; k < Math.min(n, 6); k++) out += '<rect x="' + (x + (k % 3) * 14) + '" y="' + (16 + Math.floor(k / 3) * 18) + '" width="12" height="13" rx="1" fill="' + colors[i] + '" transform="rotate(' + ((k * 7) % 9 - 4) + ' ' + (x + (k % 3) * 14 + 6) + ' ' + (22 + Math.floor(k / 3) * 18) + ')"/>';
    });
    return '<svg class="kanban" viewBox="0 0 150 58" role="img" aria-label="Board: ideas, work in progress and live products">' + out + '</svg>';
  }
  function furniture(id, w, h) {
    var out = '';
    // rug under the desks
    if (id !== 'pantry' && id !== 'reception') out += '<rect x="' + (w * 0.08) + '" y="' + (h - 66) + '" width="' + (w * 0.84) + '" height="44" rx="20" fill="' + (id === 'pods' ? '#B9D8C6' : '#D8C3AE') + '" opacity=".55"/>';
    // a plant in a corner of most rooms
    if (id !== 'reception') out += '<g transform="translate(' + (w - 30) + ',' + (h - 52) + ')"><path d="M4 26 h18 l-2.5 16 h-13Z" fill="#B86F4C"/><path d="M13 26 Q0 18 3 4 Q11 13 13 26Z M13 26 Q26 16 23 2 Q15 12 13 26Z" fill="#3E8E63"/><path d="M13 26 Q12 12 13 -2 Q17 12 13 26Z" fill="#4FA877"/></g>';
    if (id === 'strategy') out += '<g transform="translate(6,' + (h - 96) + ')"><rect width="22" height="56" fill="#8C6B4F"/><rect x="2" y="4" width="18" height="2" fill="#6E533D"/><rect x="3" y="7" width="4" height="12" fill="#6B4E9B"/><rect x="8" y="9" width="4" height="10" fill="#0E6E8C"/><rect x="13" y="6" width="5" height="13" fill="#C27A00"/><rect x="2" y="21" width="18" height="2" fill="#6E533D"/><rect x="3" y="24" width="5" height="12" fill="#B8324A"/><rect x="9" y="25" width="4" height="11" fill="#3E8E63"/><rect x="2" y="38" width="18" height="2" fill="#6E533D"/></g>';
    if (id === 'reception') out += '<g transform="translate(14,' + (h - 46) + ')"><rect width="70" height="24" rx="4" fill="#9B7B5F"/><rect width="70" height="5" rx="2" fill="#C2A386"/></g><g transform="translate(' + (w - 96) + ',' + (h - 44) + ')"><rect width="80" height="26" rx="8" fill="#5B6C8F"/><rect x="4" y="-8" width="72" height="14" rx="6" fill="#6E80A6"/></g>';
    if (id === 'pantry') out += '<g transform="translate(' + (w - 34) + ',' + (h - 70) + ')"><rect width="22" height="50" rx="3" fill="#E6EBF2" stroke="#9AA6BD"/><rect x="4" y="-16" width="14" height="18" rx="5" fill="#A9D1F7" opacity=".85"/></g>';
    return '<svg class="furniture" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" aria-hidden="true">' + out + '</svg>';
  }

  // The floor plan: the whole office from above, every room and person, sized to fit the screen.
  var LAYOUTS = {
    wide: { w: 1200, h: 722, rooms: {
      leadership: [16, 38, 300, 210], strategy: [332, 38, 270, 210], product: [618, 38, 270, 210], pantry: [904, 38, 280, 210],
      engineering: [16, 264, 548, 212], market: [580, 264, 308, 212], business: [904, 264, 280, 212],
      pods: [16, 492, 872, 214], reception: [904, 492, 280, 214] } },
    tall: { w: 600, h: 1262, rooms: {
      leadership: [12, 34, 282, 212], strategy: [306, 34, 282, 212],
      product: [12, 258, 282, 212], business: [306, 258, 282, 212],
      engineering: [12, 482, 576, 212], market: [12, 706, 576, 212],
      pods: [12, 930, 576, 212], reception: [12, 1154, 282, 96], pantry: [306, 1154, 282, 96] } }
  };

  function renderPlan(stage, d, opts) {
    stage.textContent = '';
    var layout = stage.clientWidth / Math.max(stage.clientHeight, 1) >= 1.15 ? LAYOUTS.wide : LAYOUTS.tall;
    var plan = document.createElement('div');
    plan.className = 'plan';
    plan.style.width = layout.w + 'px';
    plan.style.height = layout.h + 'px';
    var part = daypart();
    stage.dataset.daypart = part;
    var topRow = Math.min.apply(null, Object.keys(layout.rooms).map(function (k) { return layout.rooms[k][1]; }));
    var names = {};
    d.departments.forEach(function (dep) { names[dep.id] = dep.name; });
    names.pods = names.pods || 'Venture pods';
    Object.keys(layout.rooms).forEach(function (id) {
      var r = layout.rooms[id];
      var room = document.createElement('section');
      room.className = 'proom proom-' + id;
      room.style.left = r[0] + 'px'; room.style.top = r[1] + 'px'; room.style.width = r[2] + 'px'; room.style.height = r[3] + 'px';
      room.insertAdjacentHTML('beforeend', furniture(id, r[2] - 14, r[3] - 14));
      if (r[1] === topRow) room.insertAdjacentHTML('beforeend', windowsSvg(r[2] - 14));
      if (id === 'pantry') {
        room.innerHTML = '<h3 class="plabel">Pantry</h3>' + pantrySvg();
      } else if (id === 'reception') {
        var n = d.approvals ? d.approvals.length : 0;
        room.innerHTML = '<h3 class="plabel">Reception</h3>';
        var board = document.createElement('button');
        board.type = 'button';
        board.className = 'decisions-board' + (n ? ' has' : '');
        board.innerHTML = '<b></b><span></span>';
        board.querySelector('b').textContent = n ? n : 'All clear';
        board.querySelector('span').textContent = n ? (n === 1 ? 'decision waits for you' : 'decisions wait for you') : 'nothing waits for you';
        board.addEventListener('click', function () { opts.onDecisions(); });
        room.appendChild(board);
      } else {
        var people = d.office.filter(function (a) { return a.department === id; });
        var head = document.createElement('button');
        head.type = 'button';
        head.className = 'plabel';
        var busy = people.filter(function (a) { return a.state === 'working'; }).length;
        head.innerHTML = '<span></span><small></small>';
        head.querySelector('span').textContent = names[id] || id;
        head.querySelector('small').textContent = busy ? busy + ' at work' : 'Step inside';
        if (id === 'leadership' || id === 'engineering') head.insertAdjacentHTML('beforeend', clockSvg());
        head.setAttribute('aria-label', 'Step inside ' + (names[id] || id));
        head.addEventListener('click', function () { opts.onRoom(id); });
        room.appendChild(head);
        var row = document.createElement('div');
        row.className = 'prow';
        if (!people.length) {
          var empty = document.createElement('p');
          empty.className = 'pempty';
          empty.textContent = id === 'pods' ? 'No ideas in progress. A lead joins here for each idea the CEO picks.' : 'Nobody here yet';
          row.appendChild(empty);
        }
        people.forEach(function (a) { var el = deskEl(a, opts); el.classList.add('mini'); row.appendChild(el); });
        room.appendChild(row);
        if (id === 'engineering' || (id === 'product' && layout === LAYOUTS.wide)) room.insertAdjacentHTML('beforeend', kanbanSvg(d).replace('class="kanban"', 'class="kanban kanban-' + id + '"'));
      }
      plan.appendChild(room);
    });
    var atWork = d.office.filter(function (a) { return a.state === 'working'; }).length;
    if (atWork) {
      var live = document.createElement('div');
      live.className = 'livepill';
      live.innerHTML = '<i></i><b>Live</b><span></span>';
      live.querySelector('span').textContent = atWork + (atWork === 1 ? ' agent at work' : ' agents at work');
      plan.appendChild(live);
    }
    stage.appendChild(plan);
    fit(stage);
  }

  function fit(stage) {
    var plan = stage.querySelector('.plan');
    if (!plan) return;
    var w = parseFloat(plan.style.width), h = parseFloat(plan.style.height);
    var s = Math.min(stage.clientWidth / w, stage.clientHeight / h);
    plan.style.transform = 'scale(' + s + ')';
    plan.style.left = Math.max(0, (stage.clientWidth - w * s) / 2) + 'px';
    plan.style.top = Math.max(0, (stage.clientHeight - h * s) / 2) + 'px';
  }

  function pantrySvg() {
    return '<svg viewBox="0 0 260 150" class="pantry-art" aria-hidden="true">' +
      '<rect x="10" y="40" width="120" height="16" rx="3" fill="#9B7B5F"/><rect x="10" y="56" width="120" height="60" fill="#B8977A"/>' +
      '<rect x="22" y="14" width="34" height="26" rx="4" fill="#2B3654"/><rect x="28" y="20" width="10" height="8" rx="2" fill="#7FE0C2"/><rect x="34" y="40" width="10" height="0" />' +
      '<rect x="70" y="26" width="10" height="14" rx="2" fill="#F3F5F9" stroke="#9AA6BD"/><rect x="86" y="26" width="10" height="14" rx="2" fill="#F3F5F9" stroke="#9AA6BD"/>' +
      '<circle cx="200" cy="80" r="34" fill="#C3CBD9"/><circle cx="200" cy="80" r="28" fill="#D9DFE8"/>' +
      '<rect x="152" y="66" width="12" height="28" rx="6" fill="#2B3654"/><rect x="236" y="66" width="12" height="28" rx="6" fill="#2B3654"/>' +
      '<path d="M230 28 h14 l-2 14 h-10Z" fill="#B86F4C"/><path d="M237 28 Q228 18 231 8 Q236 16 237 28Z M237 28 Q246 18 244 6 Q238 15 237 28Z" fill="#3E8E63"/>' +
      '</svg>';
  }

  // The back wall of a room: a whiteboard with one sticky note per venture in each column of the
  // real pipeline, a framed print and a shelf, so the room reads as a working office.
  function wallArt(d, depId) {
    var cols = [['Ideas', ['idea']], ['Doing', ['validating', 'validated', 'spec', 'building', 'qa']], ['Live', ['live', 'scaling']]];
    var colors = ['#FFE58A', '#A8E6CF', '#A9D1F7'], notes = '';
    cols.forEach(function (c, i) {
      var n = d.ventures.filter(function (v) { return c[1].indexOf(v.stage) > -1; }).length, x = 14 + i * 78;
      notes += '<text x="' + x + '" y="24" font-size="10" font-weight="700" fill="#4A5670" font-family="Instrument Sans, sans-serif">' + c[0] + ' ' + n + '</text>';
      for (var k = 0; k < Math.min(n, 8); k++) notes += '<rect x="' + (x + (k % 4) * 16) + '" y="' + (32 + Math.floor(k / 4) * 20) + '" width="13" height="15" rx="1" fill="' + colors[i] + '" transform="rotate(' + ((k * 7) % 9 - 4) + ' ' + (x + (k % 4) * 16 + 6) + ' ' + (39 + Math.floor(k / 4) * 20) + ')"/>';
    });
    var hue = depId === 'pods' ? '#3E8E63' : depId === 'engineering' ? '#0E6E8C' : depId === 'leadership' ? '#B8324A' : '#6B4E9B';
    return '<svg class="wallart" viewBox="0 0 600 120" preserveAspectRatio="xMidYMin meet" aria-hidden="true">' +
      '<g transform="translate(40,10)"><rect width="250" height="96" rx="4" fill="#FCFDFE" stroke="#8E9AB0" stroke-width="4"/><rect x="0" y="92" width="250" height="8" rx="2" fill="#B3BCCB"/>' + notes +
      '<path d="M170 70 q12 -14 24 0 t24 0" stroke="#B8324A" stroke-width="2" fill="none" opacity=".6"/></g>' +
      '<g transform="translate(340,14)"><rect width="86" height="66" rx="3" fill="#7E634C"/><rect x="7" y="7" width="72" height="52" fill="#E9F1F7"/>' +
      '<path d="M7 59 L30 30 L46 46 L58 36 L79 59Z" fill="' + hue + '" opacity=".75"/><circle cx="62" cy="20" r="6" fill="#FFE07A"/></g>' +
      '<g transform="translate(456,52)"><rect width="110" height="6" rx="2" fill="#9B7B5F"/><rect x="8" y="-22" width="6" height="22" fill="#6B4E9B"/><rect x="15" y="-18" width="6" height="18" fill="#0E6E8C"/><rect x="22" y="-24" width="6" height="24" fill="#C27A00"/>' +
      '<path d="M78 0 h16 l-2 -12 h-12Z" fill="#B86F4C"/><path d="M86 -12 Q76 -22 80 -34 Q86 -24 86 -12Z M86 -12 Q96 -22 93 -36 Q87 -24 86 -12Z" fill="#3E8E63"/></g></svg>';
  }

  // Inside one room: everyone large, with what they are doing.
  function renderRoom(stage, d, depId, opts) {
    stage.textContent = '';
    var dep = d.departments.filter(function (x) { return x.id === depId; })[0] || { id: depId, name: depId === 'pods' ? 'Venture pods' : depId };
    var people = d.office.filter(function (a) { return a.department === depId; });
    var wrap = document.createElement('div');
    wrap.className = 'roomview';
    render(wrap, Object.assign({}, d, { departments: [dep], office: people }), opts);
    var win = wrap.querySelector('.decor.window');
    if (win) win.outerHTML = '<span class="roomsky">' + windowsSvg(260) + '</span>' + clockSvg();
    var roomEl = wrap.querySelector('.room');
    if (roomEl) roomEl.insertAdjacentHTML('beforeend', wallArt(d, depId));
    stage.dataset.daypart = daypart();
    stage.appendChild(wrap);
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

  window.Office = { daypart: daypart, render: render, renderPlan: renderPlan, renderRoom: renderRoom, fit: fit, play: play, stop: stop, looks: looks, personSvg: personSvg };
})();
