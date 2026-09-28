/*
 * Bhakt Charitra — comic illustration engine.
 * Draws every panel as inline SVG: a scene, props, characters and effects.
 * Panel coordinates: width 400 (or 800 for wide panels), height 275, ground at y = 250.
 */
const ART = (() => {
  const H = 275, G = 250, INK = '#1b1622';
  let uid = 0;

  const SKIES = {
    day:    ['#8fd0ef', '#fdf3cf'],
    dawn:   ['#f59e6b', '#fde3a6'],
    dusk:   ['#5e3a7a', '#f08a4b'],
    night:  ['#0e1738', '#34407a'],
    divine: ['#ffcf5a', '#fff6d6'],
    storm:  ['#1d2233', '#48506a'],
    indoor: ['#b86b3f', '#e3a36b'],
  };

  /* ---------- small helpers ---------- */
  const f = (n) => Math.round(n * 10) / 10;
  const S = `stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`;
  const s2 = `stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"`;
  function rng(seed) { let x = seed || 7; return () => ((x = (x * 9301 + 49297) % 233280) / 233280); }

  /* ---------- scenes ---------- */
  function sky(time, W, id) {
    const [a, b] = SKIES[time] || SKIES.day;
    let out = `<defs><linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
      <rect x="0" y="0" width="${W}" height="${H}" fill="url(#sk${id})"/>`;
    const r = rng(W + id);
    if (time === 'night' || time === 'storm') {
      if (time === 'night') {
        for (let i = 0; i < W / 14; i++) out += `<circle cx="${f(r() * W)}" cy="${f(r() * 150)}" r="${f(r() * 1.4 + .4)}" fill="#fff8d0" opacity="${f(r() * .6 + .4)}"/>`;
        out += `<circle cx="${W - 60}" cy="48" r="20" fill="#fff4c4" ${s2}/><circle cx="${W - 52}" cy="43" r="17" fill="${a}"/>`;
      }
    } else if (time === 'day' || time === 'dawn') {
      out += `<circle cx="${time === 'dawn' ? 70 : W - 70}" cy="${time === 'dawn' ? 150 : 50}" r="26" fill="#fff1a8" opacity=".9"/>`;
      for (let i = 0; i < W / 180; i++) { const cx = 40 + r() * (W - 80), cy = 30 + r() * 50; out += cloud(cx, cy, .7 + r() * .5); }
    } else if (time === 'divine') {
      out += rays(W / 2, 110, W, '#fff2b0', .55, 24);
    }
    return out;
  }
  function cloud(x, y, s) {
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})" opacity=".92"><path d="M-30,8 Q-34,-6 -18,-8 Q-14,-22 2,-16 Q12,-26 24,-12 Q38,-10 32,8Z" fill="#fff"/></g>`;
  }
  function rays(cx, cy, W, color, op, n) {
    let d = '';
    const R = Math.max(W, 600);
    for (let i = 0; i < n; i++) {
      const a1 = (i / n) * Math.PI * 2, a2 = a1 + Math.PI / n;
      d += `M${cx},${cy} L${f(cx + Math.cos(a1) * R)},${f(cy + Math.sin(a1) * R)} L${f(cx + Math.cos(a2) * R)},${f(cy + Math.sin(a2) * R)}Z `;
    }
    return `<path d="${d}" fill="${color}" opacity="${op}"/>`;
  }
  function ground(W, color, top = G - 10) {
    return `<path d="M0,${top} Q${W / 2},${top - 8} ${W},${top} L${W},${H} L0,${H}Z" fill="${color}" ${S}/>`;
  }
  function tree(x, y, s, c1 = '#2f7a45', c2 = '#245f37') {
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})">
      <path d="M-6,0 L-4,-60 L4,-60 L6,0Z" fill="#6b4226" ${S}/>
      <circle cx="-18" cy="-66" r="22" fill="${c2}" ${S}/><circle cx="16" cy="-70" r="24" fill="${c2}" ${S}/>
      <circle cx="0" cy="-88" r="26" fill="${c1}" ${S}/></g>`;
  }
  function hut(x, y, s, wall = '#c98b52') {
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})">
      <rect x="-34" y="-46" width="68" height="46" fill="${wall}" ${S}/>
      <path d="M-44,-44 L0,-84 L44,-44Z" fill="#b8913e" ${S}/>
      <path d="M-30,-52 L0,-78 M-14,-50 L0,-70 M14,-50 L0,-78 M30,-52 L0,-76" stroke="#8a6a2a" stroke-width="1.5"/>
      <rect x="-10" y="-30" width="20" height="30" fill="#4a2f1c" ${S}/></g>`;
  }
  function shikhara(x, y, s, col = '#e9c9a0') {
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})">
      <rect x="-50" y="-40" width="100" height="40" fill="${col}" ${S}/>
      <path d="M-34,-40 Q-36,-110 0,-140 Q36,-110 34,-40Z" fill="${col}" ${S}/>
      <path d="M-22,-50 Q-22,-104 0,-128 M22,-50 Q22,-104 0,-128 M0,-44 L0,-128" stroke="${INK}" stroke-width="1.2" fill="none" opacity=".5"/>
      <circle cx="0" cy="-144" r="6" fill="#f2c230" ${S}/>
      <path d="M0,-150 L0,-178" ${S}/><path d="M0,-178 L22,-172 L0,-164Z" fill="#e8601e" ${S}/>
      <path d="M-14,0 L-14,-22 Q0,-34 14,-22 L14,0Z" fill="#4a2f1c" ${S}/></g>`;
  }
  function water(W, top, c1 = '#3f86b5', c2 = '#2d6b96') {
    let out = `<rect x="0" y="${top}" width="${W}" height="${H - top}" fill="${c1}" ${S}/>`;
    for (let y = top + 10; y < H; y += 12) {
      let d = '';
      for (let x = (y / 12 % 2) * 20; x < W; x += 44) d += `M${x},${y} q8,-4 16,0 `;
      out += `<path d="${d}" stroke="${c2}" stroke-width="2" fill="none"/>`;
    }
    return out;
  }

  const SCENES = {
    palace(W) {
      let o = `<rect x="0" y="0" width="${W}" height="${G - 8}" fill="#b5463a"/>`;
      for (let x = 20; x < W; x += 90) o += `<path d="M${x},${G - 8} L${x},110 Q${x + 35},60 ${x + 70},110 L${x + 70},${G - 8}Z" fill="#f3d9a4" ${S}/><path d="M${x + 10},${G - 8} L${x + 10},116 Q${x + 35},80 ${x + 60},116 L${x + 60},${G - 8}Z" fill="#7a2a2a" opacity=".35"/>`;
      o += `<rect x="0" y="0" width="${W}" height="26" fill="#f2c230" ${S}/>`;
      for (let x = 10; x < W; x += 30) o += `<circle cx="${x}" cy="13" r="5" fill="#b5463a"/>`;
      o += `<rect x="0" y="${G - 8}" width="${W}" height="${H}" fill="#e8d5b0" ${S}/>`;
      for (let x = 0; x < W; x += 40) o += `<path d="M${x},${G - 8} L${x - 30},${H}" stroke="#c6ae80" stroke-width="1.5"/>`;
      return o;
    },
    court(W) { return SCENES.palace(W); },
    temple(W, t) {
      let o = sky(t, W, uid) + shikhara(W * .5, G - 16, 1.15) + shikhara(W * .14, G - 16, .6, '#f0d6b0') + shikhara(W * .86, G - 16, .6, '#f0d6b0');
      o += `<rect x="0" y="${G - 16}" width="${W}" height="${H}" fill="#d9c09a" ${S}/><path d="M0,${G - 4} L${W},${G - 4}" stroke="${INK}" stroke-width="1.5"/>`;
      return o;
    },
    sanctum(W) {
      let o = `<rect x="0" y="0" width="${W}" height="${H}" fill="#7a2e22"/>`;
      o += `<path d="M${W / 2 - 110},${G - 6} L${W / 2 - 110},90 Q${W / 2},10 ${W / 2 + 110},90 L${W / 2 + 110},${G - 6}Z" fill="#f2c230" ${S}/>`;
      o += `<path d="M${W / 2 - 92},${G - 6} L${W / 2 - 92},98 Q${W / 2},34 ${W / 2 + 92},98 L${W / 2 + 92},${G - 6}Z" fill="#3a1714" ${S}/>`;
      for (let x = 12; x < W; x += 24) o += `<path d="M${x},0 q6,14 0,26" stroke="#f2c230" stroke-width="2" fill="none" opacity=".6"/>`;
      o += `<rect x="0" y="${G - 6}" width="${W}" height="${H}" fill="#c9a36a" ${S}/>`;
      o += prop({ p: 'diya', x: W / 2 - 130 }) + prop({ p: 'diya', x: W / 2 + 130 });
      return o;
    },
    village(W, t) {
      let o = sky(t, W, uid) + `<path d="M0,${G - 40} Q${W * .3},${G - 90} ${W * .6},${G - 50} T${W},${G - 60} L${W},${G} L0,${G}Z" fill="#8fb36a" opacity=".7"/>`;
      o += hut(W * .15, G - 12, .9) + tree(W * .82, G - 10, .9) + (W > 400 ? hut(W * .55, G - 12, .75, '#d49b62') : '');
      return o + ground(W, '#c59a5c');
    },
    hut(W) {
      let o = `<rect x="0" y="0" width="${W}" height="${H}" fill="#c98b52"/>`;
      o += `<path d="M0,0 L${W},0 L${W},30 Q${W / 2},44 0,30Z" fill="#8a5a2b" ${S}/>`;
      o += `<rect x="${W * .7}" y="60" width="54" height="46" fill="#f7d58a" ${S}/><path d="M${W * .7 + 27},60 L${W * .7 + 27},106 M${W * .7},83 L${W * .7 + 54},83" ${S}/>`;
      for (let i = 0; i < W / 60; i++) o += `<path d="M${i * 60 + 12},${140 + (i % 2) * 20} q10,-3 20,0" stroke="#a86f3c" stroke-width="2" fill="none"/>`;
      return o + `<rect x="0" y="${G - 8}" width="${W}" height="${H}" fill="#9c6a3c" ${S}/>`;
    },
    forest(W, t) {
      let o = sky(t, W, uid);
      const r = rng(W * 3);
      for (let x = -20; x < W + 40; x += 55) o += tree(x + r() * 20, G - 20, .8 + r() * .35, '#3b8a50', '#2a6a3d');
      o += ground(W, '#6e9a48');
      for (let x = 10; x < W; x += 34) o += `<path d="M${x},${G + 8} l4,-10 l4,10" stroke="#3f6b2a" stroke-width="2" fill="none"/>`;
      return o;
    },
    river(W, t) {
      let o = sky(t, W, uid) + `<path d="M0,${G - 70} Q${W * .4},${G - 110} ${W},${G - 76} L${W},${G - 50} L0,${G - 50}Z" fill="#6f9b58" opacity=".8"/>`;
      o += tree(W * .12, G - 58, .55) + tree(W * .9, G - 60, .6);
      o += water(W, G - 52);
      o += `<path d="M0,${G - 4} Q${W * .3},${G - 16} ${W * .55},${G - 2} L${W * .55},${H} L0,${H}Z" fill="#c9a266" ${S}/>`;
      return o;
    },
    ghat(W, t) {
      let o = sky(t, W, uid);
      for (let x = 0; x < W; x += 110) o += shikhara(x + 50, 140, .55, '#e8cfa8');
      o += `<rect x="0" y="136" width="${W}" height="30" fill="#d8b98a" ${S}/>`;
      for (let i = 0; i < 5; i++) o += `<rect x="0" y="${164 + i * 12}" width="${W}" height="12" fill="${i % 2 ? '#cfae7c' : '#dcc093'}" ${s2}/>`;
      return o + water(W, 224);
    },
    field(W, t) {
      let o = sky(t, W, uid) + `<path d="M0,150 Q${W * .25},110 ${W * .5},140 T${W},130 L${W},${G} L0,${G}Z" fill="#9fbf6a" ${S}/>`;
      for (let y = 160; y < G; y += 16) o += `<path d="M0,${y} Q${W / 2},${y - 6} ${W},${y}" stroke="#c9b24a" stroke-width="5" fill="none"/>`;
      return o + tree(W * .88, 170, .7) + ground(W, '#b8913e');
    },
    nidhivan(W, t) {
      let o = sky(t, W, uid);
      const r = rng(W + 11);
      for (let x = -10; x < W + 20; x += 36) {
        const h = 60 + r() * 40;
        o += `<path d="M${x},${G} q${6 - r() * 12},-${h / 2} ${10 - r() * 20},-${h}" stroke="#5b3a24" stroke-width="5" fill="none"/>`;
        o += `<circle cx="${x + 4}" cy="${G - h - 8}" r="${18 + r() * 8}" fill="${r() > .5 ? '#2e6b3c' : '#3e7d45'}" ${s2}/>`;
      }
      o += ground(W, '#8a7a4a');
      for (let i = 0; i < 12; i++) o += `<circle cx="${f(r() * W)}" cy="${f(60 + r() * 120)}" r="2" fill="#fff5b0" opacity=".8"/>`;
      return o;
    },
    shop(W, t) {
      let o = sky(t, W, uid) + `<rect x="0" y="70" width="${W}" height="${G - 70}" fill="#d9b27a" ${S}/>`;
      o += `<path d="M-4,70 L${W + 4},70 L${W + 4},100 L-4,100Z" fill="#b8322a" ${S}/>`;
      for (let x = 0; x < W; x += 40) o += `<path d="M${x},100 q20,18 40,0" fill="#f2c230" ${S}/>`;
      o += `<rect x="0" y="${G - 60}" width="${W}" height="14" fill="#8a5a2b" ${S}/>`;
      return o + ground(W, '#a8845a');
    },
    sky(W, t) {
      let o = sky(t || 'divine', W, uid);
      for (let i = 0; i < W / 90; i++) o += cloud(40 + i * 90, 200 + (i % 2) * 30, 1.6);
      return o;
    },
    storm(W) {
      let o = sky('storm', W, uid) + water(W, G - 60, '#2c4a66', '#1c3048');
      o += `<path d="M${W * .7},0 L${W * .64},60 L${W * .7},60 L${W * .6},130" stroke="#fff6a0" stroke-width="4" fill="none"/>`;
      let d = '';
      const r = rng(5);
      for (let i = 0; i < W / 6; i++) { const x = r() * W, y = r() * H; d += `M${f(x)},${f(y)} l-6,16 `; }
      return o + `<path d="${d}" stroke="#b8c8e8" stroke-width="1.4" opacity=".7"/>`;
    },
    well(W, t) { return SCENES.village(W, t); },
    plain(W, t) { return sky(t, W, uid) + ground(W, '#c59a5c'); },
  };

  /* ---------- props ---------- */
  function prop(pr) {
    const x = pr.x, y = pr.y ?? G, s = pr.s || 1;
    const T = (inner) => `<g transform="translate(${f(x)} ${f(y)}) scale(${pr.flip ? -s : s} ${s})">${inner}</g>`;
    switch (pr.p) {
      case 'throne': return T(`<path d="M-40,0 L-40,-70 Q-40,-120 0,-124 Q40,-120 40,-70 L40,0Z" fill="#f2c230" ${S}/><path d="M-26,-40 L-26,-86 Q0,-104 26,-86 L26,-40Z" fill="#b8322a" ${S}/><rect x="-44" y="-44" width="88" height="14" fill="#e0a92a" ${S}/>`);
      case 'pillar': return T(`<rect x="-22" y="-200" width="44" height="200" fill="#cfc2a8" ${S}/><rect x="-30" y="-214" width="60" height="16" fill="#b8a888" ${S}/><rect x="-30" y="-12" width="60" height="12" fill="#b8a888" ${S}/><path d="M-10,-190 L-10,-20 M8,-190 L8,-20" stroke="#9c8e70" stroke-width="2"/>` + (pr.crack ? `<path d="M-8,-150 L4,-130 L-6,-110 L6,-90 L-2,-70" stroke="${INK}" stroke-width="3" fill="none"/>` : ''));
      case 'pillarburst': return T(`${rays(0, -110, 400, '#fff3a8', .8, 18)}<path d="M-34,-20 L-22,-8 L-30,0 L-50,-4Z M30,-24 L46,-10 L38,0 L22,-6Z M-60,-120 L-44,-110 L-52,-96Z M56,-140 L70,-126 L52,-120Z" fill="#cfc2a8" ${S}/>`);
      case 'fire': {
        let o = '';
        for (let i = -3; i <= 3; i++) o += `<path d="M${i * 16 - 12},0 Q${i * 16 - 16},-${40 + Math.abs(3 - Math.abs(i)) * 18} ${i * 16},-${70 + (3 - Math.abs(i)) * 22} Q${i * 16 + 16},-${40 + Math.abs(3 - Math.abs(i)) * 18} ${i * 16 + 12},0Z" fill="${i % 2 ? '#f2a22a' : '#e8501e'}" ${s2}/>`;
        return T(o + `<path d="M-50,0 L50,0" stroke="#5b3a24" stroke-width="8"/>`);
      }
      case 'chulha': return T(`<path d="M-30,0 L-26,-26 L26,-26 L30,0Z" fill="#a8683a" ${S}/><path d="M-10,-6 q10,-24 20,0" fill="#f2a22a" ${s2}/><ellipse cx="0" cy="-40" rx="26" ry="16" fill="#6b3a1e" ${S}/><ellipse cx="0" cy="-52" rx="20" ry="5" fill="#f3e3b0" ${s2}/><path d="M-6,-62 q-4,-10 2,-18 M6,-62 q4,-10 -2,-18" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/>`);
      case 'well': return T(`<rect x="-40" y="-44" width="80" height="44" fill="#9c8e70" ${S}/><ellipse cx="0" cy="-44" rx="40" ry="10" fill="#2a2230" ${S}/><path d="M-36,-44 L-36,-110 L36,-110 L36,-44" fill="none" ${S} stroke-width="5"/><path d="M0,-110 L0,-60" ${s2}/><rect x="-6" y="-62" width="12" height="12" fill="#6b4226" ${s2}/>` + [0, 1, 2].map(i => `<path d="M-40,${-30 + i * 10} L40,${-30 + i * 10}" stroke="#7d7058" stroke-width="1.4"/>`).join(''));
      case 'welltop': return T(`<rect x="-90" y="-120" width="180" height="140" fill="#3a3040" ${S}/>` + [0, 1, 2, 3, 4].map(i => `<path d="M-90,${-110 + i * 26} L90,${-110 + i * 26}" stroke="#56485c" stroke-width="2"/>`).join('') + `<rect x="-90" y="-30" width="180" height="40" fill="#2d5b7a" opacity=".85"/>`);
      case 'shaligram': return T(`<rect x="-16" y="-8" width="32" height="8" fill="#e0a92a" ${s2}/><ellipse cx="0" cy="-16" rx="12" ry="10" fill="#26222c" ${S}/><path d="M-4,-20 q4,-4 8,0" stroke="#fff" stroke-width="1.2" fill="none" opacity=".6"/>` + (pr.glow ? `<circle cx="0" cy="-16" r="22" fill="#fff3a8" opacity=".35"/>` : ''));
      case 'stone': return T(`<ellipse cx="0" cy="-9" rx="13" ry="9" fill="#8c8a8e" ${S}/>`);
      case 'plate': return T(`<ellipse cx="0" cy="-4" rx="22" ry="6" fill="#c9c9c9" ${S}/><ellipse cx="-6" cy="-9" rx="10" ry="4" fill="#d9a55a" ${s2}/><ellipse cx="6" cy="-11" rx="10" ry="4" fill="#e0b46a" ${s2}/>`);
      case 'khichdi': return T(`<ellipse cx="0" cy="-12" rx="22" ry="14" fill="#6b3a1e" ${S}/><ellipse cx="0" cy="-24" rx="18" ry="5" fill="#f2d27a" ${s2}/>`);
      case 'basket': return T(`<path d="M-24,0 L-28,-30 L28,-30 L24,0Z" fill="#c9a266" ${S}/><path d="M-26,-12 L26,-12 M-27,-22 L27,-22" stroke="#8a6a2a" stroke-width="2"/>` + (pr.open ? `<path d="M-20,-34 q20,-26 40,0" fill="none" stroke="#e8501e" stroke-width="5"/><circle cx="-14" cy="-44" r="4" fill="#f2c230"/><circle cx="0" cy="-52" r="4" fill="#e8501e"/><circle cx="14" cy="-44" r="4" fill="#f2c230"/>` + rays(0, -40, 60, '#fff3a8', .5, 10) : `<ellipse cx="0" cy="-32" rx="30" ry="7" fill="#b8913e" ${S}/>`));
      case 'snake': return T(`<path d="M-20,0 q-10,-20 10,-24 q24,-4 14,-22 q-6,-12 6,-18" fill="none" stroke="${INK}" stroke-width="9"/><path d="M-20,0 q-10,-20 10,-24 q24,-4 14,-22 q-6,-12 6,-18" fill="none" stroke="#3f7f3a" stroke-width="6"/><circle cx="12" cy="-66" r="5" fill="#3f7f3a" ${s2}/>`);
      case 'scale': return T(`<path d="M0,0 L0,-80" ${S} stroke-width="4"/><path d="M-40,-78 L40,-78" ${S} stroke-width="4"/><path d="M-40,-78 L-52,-40 M-40,-78 L-28,-40 M40,-78 L28,-44 M40,-78 L52,-44" ${s2}/><path d="M-56,-40 Q-40,-30 -24,-40Z" fill="#c9a266" ${S}/><path d="M24,-44 Q40,-34 56,-44Z" fill="#c9a266" ${S}/><ellipse cx="40" cy="-48" rx="8" ry="6" fill="#26222c" ${s2}/><rect x="-20" y="-4" width="40" height="6" fill="#6b4226" ${s2}/>`);
      case 'books': return T(`<rect x="-24" y="-10" width="48" height="10" fill="#b8322a" ${S}/><rect x="-20" y="-20" width="44" height="10" fill="#f2c230" ${S}/><rect x="-26" y="-30" width="46" height="10" fill="#e8871e" ${S}/>`);
      case 'floatbooks': return T(`${rays(0, -10, 120, '#fff3a8', .5, 14)}<rect x="-40" y="-18" width="30" height="14" fill="#f2c230" ${S} transform="rotate(-8)"/><rect x="-4" y="-22" width="30" height="14" fill="#e8871e" ${S} transform="rotate(6)"/><rect x="28" y="-16" width="26" height="12" fill="#b8322a" ${S} transform="rotate(-4)"/>`);
      case 'loom': return T(`<rect x="-50" y="-90" width="100" height="90" fill="none" ${S} stroke-width="5"/>` + Array.from({ length: 11 }, (_, i) => `<path d="M${-44 + i * 9},-86 L${-44 + i * 9},-30" stroke="#f3efe4" stroke-width="1.4"/>`).join('') + `<rect x="-44" y="-40" width="88" height="20" fill="#e8871e" ${s2}/>`);
      case 'kathauti': return T(`<path d="M-34,-24 Q-30,0 0,0 Q30,0 34,-24Z" fill="#8a5a2b" ${S}/><ellipse cx="0" cy="-24" rx="34" ry="8" fill="${pr.glow ? '#8fd3f4' : '#6d5a44'}" ${S}/>` + (pr.glow ? rays(0, -30, 120, '#dff6ff', .6, 14) + `<path d="M-14,-26 q7,-4 14,0 t14,0" stroke="#fff" stroke-width="2" fill="none"/>` : ''));
      case 'riverhand': return T(`<path d="M-8,0 L-6,-60 Q0,-72 8,-60 L10,0Z" fill="#f0c08a" ${S}/><circle cx="1" cy="-70" r="12" fill="none" stroke="#f2c230" stroke-width="5"/>` + rays(0, -60, 140, '#fff3a8', .45, 14));
      case 'bangle': return T(`<circle cx="0" cy="-10" r="9" fill="none" stroke="${INK}" stroke-width="6"/><circle cx="0" cy="-10" r="9" fill="none" stroke="#f2c230" stroke-width="3.5"/>`);
      case 'diya': return T(`<path d="M-12,0 Q0,8 12,0 L8,-6 L-8,-6Z" fill="#c9733a" ${s2}/><path d="M0,-6 q-6,-8 0,-18 q6,10 0,18Z" fill="#f2c230" ${s2}/><circle cx="0" cy="-12" r="14" fill="#fff3a8" opacity=".3"/>`);
      case 'dog': return T(`<ellipse cx="0" cy="-26" rx="26" ry="12" fill="#b8844e" ${S}/><path d="M-18,-18 L-20,0 M-8,-18 L-8,0 M10,-18 L10,0 M20,-18 L22,0" ${S} stroke-width="5"/><circle cx="28" cy="-38" r="11" fill="#b8844e" ${S}/><path d="M24,-46 L20,-30 L28,-36Z" fill="#7a5530" ${s2}/><circle cx="32" cy="-40" r="1.8" fill="${INK}"/><path d="M-26,-30 q-12,-6 -10,-18" ${S} fill="none"/>` + (pr.roti ? `<ellipse cx="40" cy="-32" rx="8" ry="4" fill="#d9a55a" ${s2}/>` : ''));
      case 'cow': return T(`<rect x="-40" y="-60" width="72" height="34" rx="14" fill="#f5f0e6" ${S}/><path d="M-30,-28 L-30,0 M-16,-28 L-16,0 M14,-28 L14,0 M26,-28 L26,0" ${S} stroke-width="5"/><path d="M30,-62 Q44,-72 50,-56 L48,-40 Q40,-34 32,-42Z" fill="#f5f0e6" ${S}/><path d="M34,-66 q-4,-10 2,-12 M46,-66 q4,-10 -2,-12" ${S} fill="none"/><circle cx="44" cy="-56" r="1.8" fill="${INK}"/><circle cx="-10" cy="-48" r="8" fill="#c9a266" opacity=".7"/><path d="M-40,-50 q-12,10 -8,30" ${S} fill="none"/>`);
      case 'parrot': return T(`<ellipse cx="0" cy="-10" rx="8" ry="12" fill="#3fa34d" ${S}/><circle cx="4" cy="-24" r="6" fill="#3fa34d" ${S}/><path d="M9,-24 q5,2 1,6" fill="#e8501e" ${s2}/><path d="M-4,0 l-8,14" ${S}/><circle cx="5" cy="-26" r="1.2" fill="${INK}"/>`);
      case 'house': return T(`<rect x="-60" y="-200" width="120" height="200" fill="#d9b27a" ${S}/><rect x="-24" y="-170" width="48" height="44" fill="#f7d58a" ${S}/><path d="M0,-170 L0,-126" ${S}/>`);
      case 'snakerope': return T(`<path d="M0,0 q-10,-40 4,-80 q12,-40 -2,-90" fill="none" stroke="${INK}" stroke-width="8"/><path d="M0,0 q-10,-40 4,-80 q12,-40 -2,-90" fill="none" stroke="#3f7f3a" stroke-width="5"/><ellipse cx="-2" cy="-172" rx="6" ry="4" fill="#3f7f3a" ${s2}/>`);
      case 'curtain': return T(`<path d="M-90,-220 L90,-220 L90,0 L-90,0Z" fill="#b8322a" ${S}/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${-80 + i * 20},-216 q-6,108 0,214" stroke="#7a1f1a" stroke-width="3" fill="none"/>`).join('') + `<rect x="-94" y="-226" width="188" height="14" fill="#f2c230" ${S}/>`);
      case 'brick': return T(`<rect x="-24" y="-12" width="48" height="12" fill="#a8683a" ${S}/>`);
      case 'bed': return T(`<rect x="-80" y="-14" width="160" height="14" fill="#8a5a2b" ${S}/><rect x="-80" y="-22" width="160" height="10" fill="#f3efe4" ${S}/>`);
      case 'chandan': return T(`<ellipse cx="0" cy="-6" rx="20" ry="7" fill="#b8a888" ${S}/><rect x="-6" y="-24" width="12" height="16" rx="4" fill="#c9854a" ${s2}/>`);
      case 'coins': return T(`<path d="M-22,0 Q-26,-30 0,-34 Q26,-30 22,0Z" fill="#b8322a" ${S}/><path d="M-10,-34 L10,-34" ${S}/>` + [-10, 0, 10].map((cx, i) => `<circle cx="${cx}" cy="${-40 - i * 3}" r="6" fill="#f2c230" ${s2}/>`).join(''));
      case 'tree': return tree(x, y, s);
      case 'hut': return hut(x, y, s);
      default: return '';
    }
  }

  /* ---------- characters ---------- */
  const TYPES = {
    man:      { skin: '#d9a066', cloth: '#f3efe4', top: '#f3efe4', hair: 'short' },
    villager: { skin: '#c98d56', cloth: '#f3efe4', top: '#f3efe4', hair: 'short', turban: '#e8871e', must: true },
    farmer:   { skin: '#b97a45', cloth: '#f3efe4', top: '#f3efe4', hair: 'short', turban: '#d63a2c', must: true },
    pandit:   { skin: '#e2ae74', cloth: '#fff8e7', top: 'bare', hair: 'shikha', tilak: true, thread: true },
    sadhu:    { skin: '#d49a5e', cloth: '#e8871e', top: 'bare', hair: 'topknot', beard: '#8a8a8a', tilak: true, thread: true },
    oldsadhu: { skin: '#d49a5e', cloth: '#fff8e7', top: 'bare', hair: 'topknot', beard: '#f3f3f3', tilak: true, knot: '#e6e6e6' },
    narad:    { skin: '#e2ae74', cloth: '#fff8e7', top: 'bare', hair: 'topknot', beard: '#e6e6e6', tilak: true, item: 'veena', knot: '#e6e6e6' },
    krishna:  { skin: '#3f6fc2', cloth: '#f2c230', top: 'bare', hair: 'long', crown: 'peacock', garland: true, tilak: true, item: 'flute', pose: 'play' },
    vishnu:   { skin: '#3f6fc2', cloth: '#f2c230', top: 'bare', hair: 'long', crown: 'tall', garland: true, tilak: true, arms4: true, pose: 'bless' },
    ram:      { skin: '#3d7f8f', cloth: '#f2c230', top: 'bare', hair: 'long', crown: 'tall', garland: true, tilak: true, item: 'bow' },
    lakshman: { skin: '#e8b77a', cloth: '#e8871e', top: 'bare', hair: 'long', crown: 'tall', tilak: true, item: 'bow' },
    vitthal:  { skin: '#2b2a36', cloth: '#f2c230', top: 'bare', hair: 'long', crown: 'cap', garland: true, tilak: true, pose: 'hips' },
    seth:     { skin: '#3f6fc2', cloth: '#fff3c4', top: '#fff3c4', hair: 'long', turban: '#d6336c', garland: true, tilak: true, jewel: true },
    king:     { skin: '#d9a066', cloth: '#f2c230', top: '#8e2b2b', hair: 'long', crown: 'tall', must: true, jewel: true },
    asura:    { skin: '#8a3b2b', cloth: '#6b1f1f', top: '#3a1f3f', hair: 'long', crown: 'tall', must: true, fangs: true, face: 'angry', jewel: true },
    narasimha:{ skin: '#e0a040', cloth: '#f2c230', top: 'bare', lion: true, crown: 'tall', garland: true, face: 'angry' },
    hanuman:  { skin: '#d9812f', cloth: '#b8322a', top: 'bare', monkey: true, crown: 'small', item: 'mace', tail: true },
    woman:    { skin: '#e0a877', cloth: '#c2185b', top: '#c2185b', female: true, veil: '#e8871e' },
    queen:    { skin: '#e8b88a', cloth: '#7b1fa2', top: '#7b1fa2', female: true, veil: '#f2c230', crown: 'small', jewel: true },
    oldwoman: { skin: '#c9905c', cloth: '#efe9dc', top: '#efe9dc', female: true, veil: '#e6e0d0', old: true },
    radha:    { skin: '#f0c08a', cloth: '#d81b60', top: '#d81b60', female: true, veil: '#ff8a65', crown: 'small', jewel: true, tilak: true },
    meera:    { skin: '#e8b88a', cloth: '#f7efe0', top: '#f7efe0', female: true, veil: '#e8871e', tilak: true, item: 'ektara' },
    child:    { skin: '#d9a066', cloth: '#fff8e7', top: 'bare', hair: 'shikha', s: .68 },
    butcher:  { skin: '#b97a45', cloth: '#6d4c41', top: '#a1887f', hair: 'short', turban: '#5d4037', must: true, apron: true },
    weaver:   { skin: '#c98d56', cloth: '#f3efe4', top: '#f3efe4', hair: 'short', cap: '#f3efe4', beard: '#3a2a22', tilak: true },
    cobbler:  { skin: '#a8703e', cloth: '#f3efe4', top: 'bare', hair: 'short', turban: '#f2c230', tilak: true },
  };

  const POSES = {
    stand: [[-24, -80, -25, -62], [24, -80, 25, -62]],
    fold:  [[-14, -80, -2, -90], [14, -80, 2, -90]],
    raise: [[-32, -118, -30, -142], [32, -118, 30, -142]],
    offer: [[-6, -80, 18, -86], [26, -84, 36, -90]],
    talk:  [[-24, -80, -25, -62], [30, -90, 42, -108]],
    bless: [[-24, -80, -25, -62], [28, -96, 30, -122]],
    hold:  [[-24, -80, -25, -62], [26, -84, 30, -76]],
    play:  [[-10, -96, 10, -110], [26, -94, 26, -110]],
    hips:  [[-30, -82, -18, -70], [30, -82, 18, -70]],
    run:   [[-20, -84, -34, -92], [26, -86, 36, -102]],
    eat:   [[-24, -80, -25, -62], [22, -96, 8, -112]],
    low:   [[-6, -80, 16, -68], [22, -78, 32, -64]],
    shock: [[-30, -96, -38, -112], [30, -96, 38, -112]],
    cry:   [[-14, -100, -8, -116], [14, -100, 8, -116]],
    reach: [[-24, -80, -25, -62], [30, -100, 50, -104]],
  };

  function face(kind, d) {
    let o = '';
    const e = INK;
    if (d.lion) {
      return `<circle cx="-6" cy="-124" r="3" fill="#fff" ${s2}/><circle cx="6" cy="-124" r="3" fill="#fff" ${s2}/><circle cx="-6" cy="-124" r="1.3" fill="${e}"/><circle cx="6" cy="-124" r="1.3" fill="${e}"/>
        <path d="M-10,-130 L-2,-127 M10,-130 L2,-127" ${s2}/><ellipse cx="0" cy="-112" rx="9" ry="6" fill="#7a1f1a" ${s2}/><path d="M-6,-116 l2,5 l2,-5 M2,-116 l2,5 l2,-5" fill="#fff" ${s2}/><circle cx="0" cy="-119" r="2.4" fill="${e}"/>`;
    }
    switch (kind) {
      case 'closed': o = `<path d="M-9,-120 q4,3 8,0 M1,-120 q4,3 8,0" ${s2} fill="none"/><path d="M-4,-110 q4,2 8,0" ${s2} fill="none"/>`; break;
      case 'joy': o = `<path d="M-9,-119 q4,-4 8,0 M1,-119 q4,-4 8,0" ${s2} fill="none"/><path d="M-6,-112 q6,7 12,0Z" fill="#7a1f1a" ${s2}/>`; break;
      case 'shock': o = `<circle cx="-5" cy="-120" r="3.4" fill="#fff" ${s2}/><circle cx="5" cy="-120" r="3.4" fill="#fff" ${s2}/><circle cx="-5" cy="-120" r="1.2" fill="${e}"/><circle cx="5" cy="-120" r="1.2" fill="${e}"/><ellipse cx="0" cy="-109" rx="3" ry="4" fill="#7a1f1a" ${s2}/>`; break;
      case 'angry': o = `<path d="M-10,-127 L-2,-123 M10,-127 L2,-123" ${S}/><circle cx="-5" cy="-119" r="1.8" fill="${e}"/><circle cx="5" cy="-119" r="1.8" fill="${e}"/><path d="M-5,-109 q5,-4 10,0" ${s2} fill="none"/>`; break;
      case 'sad': case 'cry': o = `<path d="M-9,-126 L-2,-128 M9,-126 L2,-128" ${s2}/><circle cx="-5" cy="-120" r="1.8" fill="${e}"/><circle cx="5" cy="-120" r="1.8" fill="${e}"/><path d="M-5,-108 q5,-4 10,0" ${s2} fill="none"/>` + (kind === 'cry' ? `<path d="M-6,-117 q-2,6 0,8 q2,-2 0,-8Z M6,-117 q-2,6 0,8 q2,-2 0,-8Z" fill="#8fd3f4" ${s2}/>` : ''); break;
      case 'blind': o = `<path d="M-9,-120 L-1,-120 M1,-120 L9,-120" ${s2}/><path d="M-4,-110 q4,3 8,0" ${s2} fill="none"/>`; break;
      default: o = `<circle cx="-5" cy="-120" r="1.9" fill="${e}"/><circle cx="5" cy="-120" r="1.9" fill="${e}"/><path d="M-5,-111 q5,4 10,0" ${s2} fill="none"/>`;
    }
    if (d.monkey) o = `<ellipse cx="0" cy="-112" rx="10" ry="7" fill="#f3c89a" ${s2}/>` + o;
    if (d.fangs) o += `<path d="M-4,-109 l1,4 l1,-4 M2,-109 l1,4 l1,-4" fill="#fff" ${s2}/>`;
    if (d.old) o += `<path d="M-12,-114 q2,2 4,0 M8,-114 q2,2 4,0" stroke="#7a5530" stroke-width="1" fill="none"/>`;
    return o;
  }

  function item(name, hx, hy) {
    switch (name) {
      case 'flute': return `<path d="M${hx - 26},${hy - 3} L${hx + 22},${hy + 4}" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/><path d="M${hx - 26},${hy - 3} L${hx + 22},${hy + 4}" stroke="#c9854a" stroke-width="3" stroke-linecap="round"/>`;
      case 'pot': return `<ellipse cx="${hx + 6}" cy="${hy - 2}" rx="13" ry="11" fill="#b8633a" ${S}/><rect x="${hx}" y="${hy - 17}" width="12" height="6" fill="#b8633a" ${s2}/>`;
      case 'bowl': return `<path d="M${hx - 8},${hy - 6} Q${hx + 6},${hy + 12} ${hx + 20},${hy - 6}Z" fill="#c9c9c9" ${S}/><ellipse cx="${hx + 6}" cy="${hy - 6}" rx="14" ry="3.5" fill="#fffdf4" ${s2}/>`;
      case 'cup': return `<path d="M${hx - 4},${hy - 12} L${hx + 14},${hy - 12} L${hx + 10},${hy} L${hx},${hy}Z" fill="#f2c230" ${S}/><path d="M${hx + 5},${hy} L${hx + 5},${hy + 6} M${hx},${hy + 6} L${hx + 10},${hy + 6}" ${s2}/>`;
      case 'book': return `<rect x="${hx - 2}" y="${hy - 14}" width="22" height="16" fill="#e8871e" ${S}/><path d="M${hx + 9},${hy - 14} L${hx + 9},${hy + 2}" ${s2}/>`;
      case 'stick': return `<path d="M${hx},${hy - 22} L${hx + 6},${-2}" stroke="#6b4226" stroke-width="4" stroke-linecap="round"/>`;
      case 'veena': return `<path d="M${hx - 30},${hy + 20} L${hx + 22},${hy - 40}" stroke="#6b4226" stroke-width="5" stroke-linecap="round"/><circle cx="${hx - 30}" cy="${hy + 22}" r="11" fill="#c9854a" ${S}/><circle cx="${hx + 20}" cy="${hy - 36}" r="8" fill="#c9854a" ${S}/>`;
      case 'ektara': return `<path d="M${hx + 2},${hy + 22} L${hx + 2},${hy - 44}" stroke="#6b4226" stroke-width="4"/><ellipse cx="${hx + 2}" cy="${hy + 22}" rx="10" ry="12" fill="#c9854a" ${S}/><path d="M${hx - 2},${hy - 44} l8,0" ${s2}/>`;
      case 'bow': return `<path d="M${hx + 2},${hy - 46} Q${hx + 26},${hy} ${hx + 2},${hy + 46}" fill="none" stroke="#6b4226" stroke-width="4"/><path d="M${hx + 2},${hy - 46} L${hx + 2},${hy + 46}" stroke="${INK}" stroke-width="1"/>`;
      case 'mace': return `<path d="M${hx},${hy + 4} L${hx + 4},${hy - 40}" stroke="#8a6a2a" stroke-width="4"/><circle cx="${hx + 5}" cy="${hy - 48}" r="11" fill="#f2c230" ${S}/>`;
      case 'kartal': return `<ellipse cx="${hx + 4}" cy="${hy}" rx="6" ry="3" fill="#f2c230" ${s2}/>`;
      case 'broom': return `<path d="M${hx - 6},${hy - 20} L${hx + 14},${-8}" stroke="#8a6a2a" stroke-width="3"/><path d="M${hx + 8},${-12} l12,12 l-18,0Z" fill="#c9b24a" ${s2}/>`;
      case 'roti': return `<ellipse cx="${hx + 6}" cy="${hy - 4}" rx="16" ry="5" fill="#c9c9c9" ${s2}/><ellipse cx="${hx + 6}" cy="${hy - 8}" rx="11" ry="4" fill="#d9a55a" ${s2}/>`;
      case 'berries': return `<ellipse cx="${hx + 6}" cy="${hy - 2}" rx="14" ry="5" fill="#8fb36a" ${s2}/>` + [[0, -6], [6, -8], [12, -6], [3, -10], [9, -11]].map(([a, b]) => `<circle cx="${hx + a}" cy="${hy + b}" r="3" fill="#c0302a" ${s2}/>`).join('');
      case 'scroll': return `<rect x="${hx - 2}" y="${hy - 16}" width="18" height="22" fill="#fff3c4" ${S}/><path d="M${hx + 2},${hy - 10} l10,0 M${hx + 2},${hy - 5} l10,0 M${hx + 2},${hy} l7,0" stroke="${INK}" stroke-width="1"/>`;
      case 'coin': return `<circle cx="${hx + 4}" cy="${hy - 2}" r="6" fill="#f2c230" ${S}/>`;
      case 'garland': return `<path d="M${hx - 6},${hy} q10,26 22,0" fill="none" stroke="#e8501e" stroke-width="5"/>`;
      case 'conch': return `<path d="M${hx - 4},${hy} q8,-18 16,-6 q-4,10 -16,6Z" fill="#fff" ${S}/>`;
      case 'tanpura': return `<path d="M${hx + 2},${hy + 26} L${hx + 2},${hy - 56}" stroke="#6b4226" stroke-width="5"/><ellipse cx="${hx + 2}" cy="${hy + 26}" rx="14" ry="16" fill="#c9854a" ${S}/>`;
      case 'bangle': return `<circle cx="${hx + 4}" cy="${hy - 6}" r="7" fill="none" stroke="#f2c230" stroke-width="3.5"/>`;
      default: return '';
    }
  }

  function person(o) {
    const d = Object.assign({}, TYPES[o.t] || TYPES.man, o);
    const pose = POSES[d.pose] || POSES.stand;
    const sc = (d.s || 1) * (o.scale || 1);
    const flip = o.flip ? -1 : 1;
    const x = o.x ?? 200, y = (o.y ?? G) + (d.lie ? -12 : 0);
    const bodyTop = d.top === 'bare' ? d.skin : d.top;
    const up = d.sit ? 46 : 0;
    let g = '';

    if (d.glow) g += `<circle cx="0" cy="${-90 + up}" r="92" fill="url(#halo)"/>` + `<g transform="translate(0 ${up})"><circle cx="0" cy="-122" r="30" fill="#ffe07a" opacity=".85" stroke="#f2a22a" stroke-width="2"/></g>`;
    // tail (behind)
    if (d.tail) g += `<path d="M-14,${-62 + up} Q-60,${-70 + up} -52,${-120 + up} q4,-14 14,-8" fill="none" stroke="${INK}" stroke-width="7"/><path d="M-14,${-62 + up} Q-60,${-70 + up} -52,${-120 + up} q4,-14 14,-8" fill="none" stroke="${d.skin}" stroke-width="4.5"/>`;
    // hair behind head
    if (d.female && !d.veilOnly) g += `<g transform="translate(0 ${up})"><path d="M-17,-122 Q-20,-96 -12,-86 L12,-86 Q20,-96 17,-122Z" fill="#241a1c"/></g>`;
    if (d.hair === 'long' && !d.lion && !d.monkey) g += `<g transform="translate(0 ${up})"><path d="M-17,-124 Q-22,-96 -14,-90 L14,-90 Q22,-96 17,-124Z" fill="#1d1620"/></g>`;
    if (d.veil) g += `<g transform="translate(0 ${up})"><path d="M-22,-96 Q-26,-142 0,-144 Q26,-142 22,-96 L28,-70 L-28,-70Z" fill="${d.veil}" ${S}/></g>`;

    // lower body
    if (d.sit) {
      g += `<path d="M-36,-2 Q-40,-22 -16,-22 L16,-22 Q40,-22 36,-2 Q0,6 -36,-2Z" fill="${d.cloth}" ${S}/><ellipse cx="-24" cy="-4" rx="7" ry="4" fill="${d.skin}" ${s2}/><ellipse cx="24" cy="-4" rx="7" ry="4" fill="${d.skin}" ${s2}/>`;
    } else if (d.pose === 'run') {
      g += `<path d="M-6,-60 L-30,-4" stroke="${INK}" stroke-width="13" stroke-linecap="round"/><path d="M-6,-60 L-30,-4" stroke="${d.cloth}" stroke-width="9.5" stroke-linecap="round"/><path d="M6,-60 L24,-30 L34,-4" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="M6,-60 L24,-30 L34,-4" fill="none" stroke="${d.cloth}" stroke-width="9.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M-18,-66 L18,-66 L14,-46 L-14,-46Z" fill="${d.cloth}" ${S}/>`;
    } else if (d.female) {
      g += `<path d="M-19,-66 L19,-66 L30,0 L-30,0Z" fill="${d.cloth}" ${S}/><path d="M-24,-20 L26,-20" stroke="#f2c230" stroke-width="3"/><ellipse cx="-10" cy="1" rx="7" ry="3" fill="${d.skin}" ${s2}/><ellipse cx="10" cy="1" rx="7" ry="3" fill="${d.skin}" ${s2}/>`;
    } else {
      g += `<path d="M-18,-64 L18,-64 L22,-4 L-22,-4Z" fill="${d.cloth}" ${S}/><path d="M0,-60 L0,-8" stroke="${INK}" stroke-width="1.4" opacity=".6"/><ellipse cx="-10" cy="-2" rx="8" ry="4" fill="${d.skin}" ${s2}/><ellipse cx="10" cy="-2" rx="8" ry="4" fill="${d.skin}" ${s2}/>`;
      if (d.apron) g += `<path d="M-14,-66 L14,-66 L16,-24 L-16,-24Z" fill="#e8dcc8" ${S}/>`;
    }

    // upper body
    let u = `<rect x="-5" y="-108" width="10" height="10" fill="${d.skin}" ${s2}/>`;
    u += `<path d="M-20,-100 Q0,-108 20,-100 L18,-62 L-18,-62Z" fill="${d.female ? d.top : bodyTop}" ${S}/>`;
    if (d.thread) u += `<path d="M-14,-100 L14,-64" stroke="#fff8e7" stroke-width="2"/>`;
    if (d.garland) u += `<path d="M-14,-102 Q0,-60 14,-102" fill="none" stroke="#e8501e" stroke-width="4" stroke-dasharray="4 2"/>`;
    if (d.jewel) u += `<path d="M-10,-102 Q0,-88 10,-102" fill="none" stroke="#f2c230" stroke-width="3"/>`;
    if (d.female) u += `<path d="M-20,-100 L18,-62" stroke="${d.veil || '#f2c230'}" stroke-width="7" opacity=".9"/>`;
    if (d.top === 'bare') u += `<path d="M-18,-66 L18,-66" stroke="${d.cloth}" stroke-width="5"/>`;
    if (d.lion) u += `<path d="M-18,-66 L18,-66" stroke="#f2c230" stroke-width="5"/>`;

    // arms
    const armCol = d.female ? d.top : bodyTop;
    const arm = ([ex, ey, hx, hy], sh) => `<path d="M${sh},-98 L${ex},${ey} L${hx},${hy}" fill="none" stroke="${INK}" stroke-width="10.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M${sh},-98 L${ex},${ey} L${hx},${hy}" fill="none" stroke="${armCol}" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${hx}" cy="${hy}" r="4.6" fill="${d.skin}" ${s2}/>`;
    if (d.arms4) u += arm([-32, -108, -40, -128], -17) + arm([32, -108, 40, -128], 17) + `<circle cx="-42" cy="-138" r="10" fill="none" stroke="#f2c230" stroke-width="4"/>` + item('conch', 36, -132);
    u += arm(pose[0], -18) + arm(pose[1], 18);
    const [, , hx, hy] = pose[1];
    if (d.item && d.pose === 'play' && d.item === 'flute') u += item('flute', 6, -112);
    else if (d.item) u += item(d.item, hx, hy);

    // head
    if (d.lion) {
      let mane = '';
      for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; mane += `${i ? 'L' : 'M'}${f(Math.cos(a) * 28)},${f(-120 + Math.sin(a) * 28)} L${f(Math.cos(a + .22) * 20)},${f(-120 + Math.sin(a + .22) * 20)} `; }
      u += `<path d="${mane}Z" fill="#b8631e" ${S}/><circle cx="0" cy="-120" r="17" fill="${d.skin}" ${S}/>`;
    } else {
      u += `<circle cx="0" cy="-120" r="16" fill="${d.skin}" ${S}/>`;
      if (d.monkey) u += `<circle cx="-16" cy="-122" r="5" fill="${d.skin}" ${s2}/><circle cx="16" cy="-122" r="5" fill="${d.skin}" ${s2}/>`;
    }
    if (d.hair === 'short' && !d.turban && !d.cap) u += `<path d="M-16,-122 Q-16,-138 0,-138 Q16,-138 16,-122 Q10,-131 0,-131 Q-10,-131 -16,-122Z" fill="#241a1c"/>`;
    if (d.hair === 'long' && !d.crown && !d.turban) u += `<path d="M-16,-122 Q-16,-138 0,-138 Q16,-138 16,-122 Q10,-131 0,-131 Q-10,-131 -16,-122Z" fill="#1d1620"/>`;
    if (d.hair === 'shikha') u += `<path d="M0,-136 q4,-10 10,-8" stroke="#241a1c" stroke-width="3" fill="none"/>`;
    if (d.hair === 'topknot') u += `<path d="M-15,-124 Q-15,-137 0,-137 Q15,-137 15,-124 Q8,-131 0,-131 Q-8,-131 -15,-124Z" fill="${d.knot || '#241a1c'}"/><circle cx="0" cy="-141" r="6.5" fill="${d.knot || '#241a1c'}" ${s2}/>`;
    if (d.female && !d.veil) u += `<path d="M-16,-122 Q-16,-138 0,-138 Q16,-138 16,-122 Q8,-132 0,-130 Q-8,-132 -16,-122Z" fill="#241a1c"/>`;
    if (d.veil) u += `<path d="M-18,-116 Q-20,-140 0,-141 Q20,-140 18,-116 Q14,-133 0,-134 Q-14,-133 -18,-116Z" fill="${d.veil}" ${s2}/>`;
    if (d.beard) u += `<path d="M-15,-118 Q-17,-94 0,-90 Q17,-94 15,-118 Q9,-108 0,-108 Q-9,-108 -15,-118Z" fill="${d.beard}" ${s2}/>`;
    if (d.must) u += `<path d="M-8,-113 q8,-5 16,0" stroke="#241a1c" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    u += face(d.face || 'calm', d);
    if (d.tilak) u += `<path d="M-3,-133 L-2,-125 M3,-133 L2,-125" stroke="#fff8e7" stroke-width="1.8"/><circle cx="0" cy="-127" r="1.5" fill="#d63a2c"/>`;
    if (d.crown === 'tall') u += `<path d="M-14,-133 L-13,-156 L-6,-146 L0,-162 L6,-146 L13,-156 L14,-133Z" fill="#f2c230" ${S}/><circle cx="0" cy="-146" r="2.5" fill="#d63a2c"/>`;
    if (d.crown === 'peacock') u += `<path d="M-14,-133 L-12,-148 L12,-148 L14,-133Z" fill="#f2c230" ${S}/><path d="M6,-148 Q10,-170 20,-174 Q18,-160 10,-148Z" fill="#2e8b57" ${s2}/><ellipse cx="16" cy="-166" rx="3.5" ry="4.5" fill="#1f5fa8" ${s2}/>`;
    if (d.crown === 'small') u += `<path d="M-10,-136 L-8,-148 L-3,-142 L0,-150 L3,-142 L8,-148 L10,-136Z" fill="#f2c230" ${s2}/>`;
    if (d.crown === 'cap') u += `<path d="M-14,-133 L-12,-160 Q0,-166 12,-160 L14,-133Z" fill="#2b2a36" ${S}/><path d="M-13,-150 L13,-150" stroke="#f2c230" stroke-width="2"/>`;
    if (d.turban) u += `<path d="M-17,-124 Q-19,-146 0,-148 Q19,-146 17,-124 Q0,-132 -17,-124Z" fill="${d.turban}" ${S}/><path d="M-12,-140 Q0,-134 14,-142" stroke="${INK}" stroke-width="1.2" fill="none"/>`;
    if (d.cap) u += `<path d="M-15,-126 Q-15,-140 0,-141 Q15,-140 15,-126Z" fill="${d.cap}" ${S}/>`;

    g += `<g transform="translate(0 ${up})">${u}</g>`;
    const rot = d.lie ? ' rotate(-90)' : (d.rot ? ` rotate(${d.rot})` : '');
    return `<g transform="translate(${f(x)} ${f(y)})${rot} scale(${f(sc * flip)} ${f(sc)})">${g}</g>`;
  }

  /* ---------- effects ---------- */
  function fx(e, W) {
    switch (e.fx) {
      case 'rays': return `<g opacity=".9">${rays(e.x, e.y ?? 120, W, e.color || '#fff3a8', e.op ?? .55, 20)}</g>`;
      case 'speed': {
        let d = '';
        const r = rng(13);
        for (let i = 0; i < 18; i++) { const y = 30 + r() * 200, x = r() * W * .7; d += `M${f(x)},${f(y)} l${f(40 + r() * 80)},0 `; }
        return `<path d="${d}" stroke="#fff" stroke-width="2.4" opacity=".8"/>`;
      }
      case 'sparkle': {
        let o = '';
        const r = rng(e.x);
        for (let i = 0; i < 10; i++) { const cx = e.x + (r() - .5) * 140, cy = (e.y ?? 120) + (r() - .5) * 140; o += `<path d="M${f(cx)},${f(cy - 7)} L${f(cx + 2)},${f(cy - 2)} L${f(cx + 7)},${f(cy)} L${f(cx + 2)},${f(cy + 2)} L${f(cx)},${f(cy + 7)} L${f(cx - 2)},${f(cy + 2)} L${f(cx - 7)},${f(cy)} L${f(cx - 2)},${f(cy - 2)}Z" fill="#fff3a8" stroke="#e0a92a" stroke-width="1"/>`; }
        return o;
      }
      case 'dream': return `<g opacity=".95"><ellipse cx="${e.x}" cy="${e.y ?? 110}" rx="${e.rx || 110}" ry="${e.ry || 90}" fill="#efe6ff" stroke="${INK}" stroke-width="2.4" stroke-dasharray="7 5"/></g>`;
      case 'dark': return `<rect x="0" y="0" width="${W}" height="${H}" fill="#0e1738" opacity="${e.op ?? .45}"/>`;
      case 'rain': {
        let d = '';
        const r = rng(3);
        for (let i = 0; i < W / 5; i++) d += `M${f(r() * W)},${f(r() * H)} l-5,14 `;
        return `<path d="${d}" stroke="#b8c8e8" stroke-width="1.3" opacity=".7"/>`;
      }
      default: return '';
    }
  }

  /* ---------- panel ---------- */
  function scene(p, wide) {
    const W = wide ? 800 : 400;
    uid++;
    const id = uid;
    const t = p.time || 'day';
    const make = SCENES[p.bg] || SCENES.plain;
    let o = `<defs><radialGradient id="halo"><stop offset="0" stop-color="#fff6c4" stop-opacity=".95"/><stop offset=".6" stop-color="#ffd76a" stop-opacity=".45"/><stop offset="1" stop-color="#ffd76a" stop-opacity="0"/></radialGradient></defs>`;
    o += make(W, t);
    const layers = [...(p.fx || []).filter(e => !e.front).map(e => fx(e, W)), ...(p.props || []).filter(q => !q.front).map(prop)];
    o += layers.join('');
    o += (p.chars || []).map(person).join('');
    o += (p.props || []).filter(q => q.front).map(prop).join('');
    o += (p.fx || []).filter(e => e.front).map(e => fx(e, W)).join('');
    o += `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#ht${id})" style="mix-blend-mode:multiply"/>`;
    if (p.sfx) {
      const s = p.sfx;
      o += `<text x="${s.x}" y="${s.y}" transform="rotate(${s.r ?? -8} ${s.x} ${s.y})" text-anchor="middle" class="sfx" font-size="${s.size || 42}" fill="${s.color || '#ffd23f'}" stroke="${INK}" stroke-width="3" paint-order="stroke">${s.text}</text>`;
    }
    const htDef = `<defs><pattern id="ht${id}" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.1" fill="#000" opacity=".07"/></pattern></defs>`;
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${(p.alt || '').replace(/"/g, '&quot;')}">${htDef}${o}</svg>`;
  }

  return { scene, W: (wide) => (wide ? 800 : 400) };
})();
