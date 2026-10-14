/* Shared helpers: theme variables, icons, storage, timer, intro and win screens. */
(function () {
  var T = window.THEME, C = T.colors, root = document.documentElement;
  for (var k in C) root.style.setProperty('--' + k, C[k]);

  var svg = function (inner, vb) { return '<svg viewBox="' + (vb || '0 0 48 48') + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + inner + '</svg>'; };
  var S = 'fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"';

  var SUN = '<circle cx="12" cy="12" r="4.6" fill="currentColor"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
    '<path d="M12 1.8v2.6M12 19.6v2.6M1.8 12h2.6M19.6 12h2.6M4.8 4.8l1.8 1.8M17.4 17.4l1.8 1.8M4.8 19.2l1.8-1.8M17.4 6.6l1.8-1.8"/></g>';
  var MOON = '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" fill="currentColor"/>';
  var CROWN = '<path d="M5 19 3.5 7.5l5.2 4.3L12 4.5l3.3 7.3 5.2-4.3L19 19z" fill="currentColor"/>';
  var HEART = '<path d="M12 21s-7.6-4.7-9.7-9.4C.8 8.2 2.9 4.4 6.6 4.4c2.1 0 3.9 1.1 5.4 3 1.5-1.9 3.3-3 5.4-3 3.7 0 5.8 3.8 4.3 7.2C19.6 16.3 12 21 12 21z" fill="currentColor"/>';
  var STAR = '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="currentColor"/>';

  var ICONS = {
    queens: svg('<path d="M8 37 6 15l10 9 8-14 8 14 10-9-2 22z" fill="currentColor"/><rect x="8" y="39" width="32" height="4" rx="2" fill="currentColor"/>'),
    tango: svg('<g transform="translate(1 4) scale(1.05)" style="color:#e0456f">' + HEART + '</g><g transform="translate(21 19) scale(1.05)" style="color:#e0a82e">' + STAR + '</g>'),
    zip: svg('<path d="M9 38V12h15v18h15V10" ' + S + '/><circle cx="9" cy="38" r="4.5" fill="currentColor"/><circle cx="39" cy="10" r="4.5" fill="currentColor"/>'),
    sudoku: svg('<rect x="6" y="6" width="36" height="36" rx="4" ' + S + ' stroke-width="3"/><path d="M18 6v36M30 6v36M6 18h36M6 30h36" stroke="currentColor" stroke-width="2" fill="none"/><text x="12" y="16" font-size="9" text-anchor="middle" fill="currentColor" font-weight="700">1</text><text x="24" y="28" font-size="9" text-anchor="middle" fill="currentColor" font-weight="700">4</text><text x="36" y="40" font-size="9" text-anchor="middle" fill="currentColor" font-weight="700">6</text>'),
    crossclimb: svg('<path d="M14 6v36M34 6v36M14 14h20M14 24h20M14 34h20" ' + S + '/>'),
    pinpoint: svg('<circle cx="24" cy="24" r="17" ' + S + '/><circle cx="24" cy="24" r="9" ' + S + '/><circle cx="24" cy="24" r="2.5" fill="currentColor"/>'),
    patches: svg('<rect x="6" y="6" width="20" height="20" rx="3" fill="currentColor"/><rect x="30" y="6" width="12" height="20" rx="3" fill="currentColor" opacity=".55"/><rect x="6" y="30" width="12" height="12" rx="3" fill="currentColor" opacity=".55"/><rect x="22" y="30" width="20" height="12" rx="3" fill="currentColor"/>'),
    wend: svg('<path d="M10 34 20 14l9 14 10-18" ' + S + '/><circle cx="10" cy="34" r="4.5" fill="currentColor"/><circle cx="20" cy="14" r="4.5" fill="currentColor"/><circle cx="29" cy="28" r="4.5" fill="currentColor"/><circle cx="39" cy="10" r="4.5" fill="currentColor"/>')
  };

  var store = {
    get: function (key) { try { return JSON.parse(localStorage.getItem('gp:' + key)); } catch (e) { return null; } },
    set: function (key, v) { try { localStorage.setItem('gp:' + key, JSON.stringify(v)); } catch (e) {} },
    clearAll: function () {
      try {
        Object.keys(localStorage).filter(function (k) { return k.indexOf('gp:') === 0; }).forEach(function (k) { localStorage.removeItem(k); });
        Object.keys(sessionStorage).filter(function (k) { return k.indexOf('gp:') === 0; }).forEach(function (k) { sessionStorage.removeItem(k); });
      } catch (e) {}
    }
  };
  function fmt(s) { var m = Math.floor(s / 60), r = s % 60; return m + ':' + (r < 10 ? '0' : '') + r; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function toast(msg) { var t = el('div', 'toast', msg); document.body.appendChild(t); setTimeout(function () { t.remove(); }, 1800); }
  function shake(node) { if (!node) return; node.classList.remove('shake'); void node.offsetWidth; node.classList.add('shake'); }
  function confetti() {
    var box = el('div', 'confetti'), cols = [C.accent, '#f5a623', C.good, '#e0457b', '#5b7bd5'];
    for (var i = 0; i < 36; i++) {
      var p = el('i'); p.style.left = Math.random() * 100 + 'vw'; p.style.background = cols[i % cols.length];
      p.style.animationDelay = (Math.random() * 0.6) + 's'; p.style.animationDuration = (1.8 + Math.random() * 1.2) + 's'; box.appendChild(p);
    }
    document.body.appendChild(box); setTimeout(function () { box.remove(); }, 3600);
  }

  // ---------- leaderboard: the rival always finishes just ahead ----------
  function fmtCs(cs) { var c = cs % 100; return fmt(Math.floor(cs / 100)) + '.' + (c < 10 ? '0' : '') + c; }
  function leaderboardHTML(youVal, rivalVal, precise) {
    var P = T.players, f = precise ? fmtCs : fmt;
    var ph = P.photos || {};
    var rows = [{ name: P.rival, val: rivalVal, you: false, img: ph.rival }, { name: P.you, val: youVal, you: true, img: ph.you }];
    return '<div class="lb"><div class="lbt">Leaderboard</div><ol>' +
      rows.map(function (r, i) {
        return '<li class="' + (r.you ? 'you' : 'first') + '"><span class="rk">' + (i + 1) + '</span>' + (r.img ? '<img class="av" alt="" src="' + r.img + '" onerror="this.remove()">' : '') + '<span class="nm">' + r.name + '</span><span class="tm">' + f(r.val) + '</span></li>';
      }).join('') + '</ol></div>';
  }

  function init(id, opts) {
    opts = opts || {};
    var game = T.games.filter(function (g) { return g.id === id; })[0];
    var idx = T.games.indexOf(game), next = T.games[idx + 1];
    document.title = game.name + ' · ' + T.brand.name;

    var top = document.getElementById('topbar');
    top.className = 'topbar';
    top.innerHTML = '<a class="back" href="index.html" aria-label="Back to games"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></a>' +
      '<div class="ttl">' + game.name + '</div><div class="timer"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9.5 2.5h5"/></svg><span id="tval">0:00</span></div>' +
      '<button class="rst" id="rstbtn" aria-label="Restart puzzle" title="Restart puzzle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 4v6h6"/><path d="M3.5 15a9 9 0 1 0 2.1-9.4L1.5 10"/></svg></button>';
    var tval = document.getElementById('tval');

    var api = { seconds: 0, ms: 0, started: false, done: false, id: id };
    var tick = null, lastTs = 0, elapsed = 0;
    function run() {
      if (tick || api.done || !api.started) return;
      lastTs = performance.now();
      tick = setInterval(function () { api.ms = elapsed + performance.now() - lastTs; api.seconds = Math.floor(api.ms / 1000); tval.textContent = fmt(api.seconds); }, 200);
    }
    function halt() {
      if (tick) { elapsed += performance.now() - lastTs; clearInterval(tick); tick = null; }
      api.ms = elapsed; api.seconds = Math.floor(elapsed / 1000);
    }
    document.addEventListener('visibilitychange', function () { if (document.hidden) halt(); else run(); });

    var prev = store.get('done:' + id);
    var ov = el('div', 'overlay');
    ov.innerHTML = '<div class="sheet"><div class="gicon">' + ICONS[id] + '</div><h1>' + game.name + '</h1><p class="sub">' + game.tag + '</p>' +
      (prev ? '<div class="done-chip">Completed in ' + fmt(prev.time) + '</div>' : '') +
      '<ul>' + game.how.map(function (h) { return '<li>' + h + '</li>'; }).join('') + '</ul>' +
      '<button class="btn block" id="playbtn">' + (prev ? 'Play again' : 'Play') + '</button>' +
      '<div class="stack"><a class="btn ghost block" href="index.html">All games</a></div></div>';
    function begin() { if (ov.parentNode) ov.remove(); api.started = true; run(); if (opts.onStart) opts.onStart(); }
    ov.querySelector('#playbtn').onclick = begin;
    // After a restart the page reloads and starts straight away, skipping the intro screen.
    var auto = false;
    try { auto = sessionStorage.getItem('gp:restart:' + id) === '1'; sessionStorage.removeItem('gp:restart:' + id); } catch (e) {}
    if (auto) setTimeout(begin, 0); else document.body.appendChild(ov);

    function restart() { try { sessionStorage.setItem('gp:restart:' + id, '1'); } catch (e) {} location.reload(); }
    document.getElementById('rstbtn').onclick = function () {
      if (!api.started) return;
      if (api.done) { restart(); return; }
      var m = el('div', 'overlay modal');
      m.innerHTML = '<div class="sheet"><h1 style="font-size:22px;margin-top:0">Restart this puzzle?</h1><p class="sub">Your progress and timer will start over.</p>' +
        '<div class="stack"><button class="btn block" id="rsok">Restart</button><button class="btn ghost block" id="rsno">Keep playing</button></div></div>';
      document.body.appendChild(m);
      document.getElementById('rsok').onclick = restart;
      document.getElementById('rsno').onclick = function () { m.remove(); };
    };

    // win(extra, delayMs): the timer stops immediately; the result sheet appears after delayMs
    // (used by games that want to show a reveal first, like the Patches heart).
    api.win = function (extra, delay) {
      if (api.done) return; api.done = true; halt();
      var t = api.seconds, cs = Math.floor(api.ms / 10);
      var pf = T.players.photoFinish, precise = !!pf && pf.game === id;     // photo finish: compare to the hundredth
      var youVal = precise ? cs : t;
      var rivalVal = precise ? Math.max(0, cs - pf.cs) : Math.max(0, t - (T.players.margin || 1));
      store.set('done:' + id, { time: t, cs: cs, at: Date.now() });
      setTimeout(function () {
        confetti();
        var m = el('div', 'overlay modal');
        m.innerHTML = '<div class="sheet"><div class="gicon">' + ICONS[id] + '</div><div class="sub" style="margin:0">You solved ' + game.name + ' in</div>' +
          '<div class="big">' + (precise ? fmtCs(cs) : fmt(t)) + '</div>' + (extra ? '<p class="extra">' + extra + '</p>' : '') +
          leaderboardHTML(youVal, rivalVal, precise) +
          '<div class="stack">' + (next ? '<a class="btn block" href="' + next.file + '">Next: ' + next.name + '</a>' : '') +
          '<a class="btn ' + (next ? 'ghost ' : '') + 'block" href="index.html">Back to all games</a>' +
          '<button class="btn ghost block" id="viewbtn">View puzzle</button></div></div>';
        document.body.appendChild(m);
        document.getElementById('viewbtn').onclick = function () { m.remove(); };
      }, delay || 0);
    };
    return api;
  }

  window.GP = { T: T, init: init, store: store, fmt: fmt, el: el, toast: toast, shake: shake, icons: ICONS,
    fmtCs: fmtCs,
    HEART: svg(HEART, '0 0 24 24'), STAR: svg(STAR, '0 0 24 24'), CROWN: svg(CROWN, '0 0 24 24') };
})();
