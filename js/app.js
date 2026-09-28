/* Bhakt Charitra — reader: home shelf, story view, hash routing. */
(() => {
  const $ = (s) => document.querySelector(s);
  const app = $('#app');
  const GROUPS = [
    { id: 'puran', title: 'Puranic bhakts', hindi: 'पौराणिक भक्त', blurb: 'Stories from the Bhagavatam and the Ramayan.' },
    { id: 'sant', title: 'Sants of the Bhakti era', hindi: 'भक्तिकाल के संत', blurb: 'Saints remembered in the Bhaktamal and in satsang katha.' },
  ];
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function bubbles(p) {
    if (!p.say || !p.say.length) return '';
    const W = p.wide ? 800 : 400;
    return `<div class="bubbles">${p.say.map((b) => {
      const who = b.c != null ? p.chars[b.c] : null;
      const x = (who ? who.x : b.x ?? W / 2) / W;
      const side = x < .38 ? 'l' : x > .62 ? 'r' : 'c';
      return `<p class="bubble ${b.kind || 'speech'} side-${side}">${esc(b.text)}</p>`;
    }).join('')}</div>`;
  }

  // A narrow panel left alone in its row (before a wide panel, or at the end)
  // is widened so the page has no empty cell. Its art is re-centred on the 800 canvas.
  function layout(panels) {
    const out = [];
    let col = 0;
    panels.forEach((p, i) => {
      const nxt = panels[i + 1];
      if (!p.wide && col === 0 && (!nxt || nxt.wide)) {
        const sh = (o) => ({ ...o, x: (o.x ?? 200) + 200 });
        p = { ...p, wide: true, chars: (p.chars || []).map(sh), props: (p.props || []).map(sh), fx: (p.fx || []).map(sh),
          sfx: p.sfx && { ...p.sfx, x: p.sfx.x + 200 }, say: (p.say || []).map((b) => (b.x != null ? { ...b, x: b.x + 200 } : b)) };
      }
      col = p.wide ? 0 : (col + 1) % 2;
      out.push(p);
    });
    return out;
  }

  function panel(p, i) {
    return `<figure class="panel${p.wide ? ' wide' : ''}">
      ${p.cap ? `<figcaption class="cap"><span class="pn">${i + 1}</span>${esc(p.cap)}</figcaption>` : ''}
      <div class="art${p.wide ? ' art-wide' : ''}">${ART.scene(p, p.wide)}${bubbles(p)}</div>
    </figure>`;
  }

  function home() {
    document.title = 'Bhakt Charitra';
    app.innerHTML = `
      <header class="mast">
        <p class="eyebrow">Katha in panels · कथा चित्रों में</p>
        <h1><span class="deva">भक्त चरित्र</span><span class="latin">Bhakt Charitra</span></h1>
        <p class="lede">Lives of the Lord's devotees, told as comics. These are the kathas that saints such as Pujya Shri Premanand Ji Maharaj, Pujya Rajendra Das Ji Maharaj and many others narrate again and again in satsang, retold here in pictures for children and families.</p>
      </header>
      ${GROUPS.map((g) => `
        <section class="shelf" aria-labelledby="g-${g.id}">
          <div class="shelf-head"><h2 id="g-${g.id}">${g.title} <span class="deva-sm">${g.hindi}</span></h2><p>${g.blurb}</p></div>
          <div class="covers">${STORIES.filter((s) => s.group === g.id).map(cover).join('')}</div>
        </section>`).join('')}
      <aside class="note">
        <h2>About these comics</h2>
        <p>Every story follows the traditional katha as found in the Bhaktamal of Nabhadas, the Bhagavatam, the Ramcharitmanas and the living tradition of the saints. Dialogue is dramatised for the comic format. It is not a word-for-word transcript of any saint's pravachan, and some details differ between tellings. To hear the kathas in full, listen to the saints themselves.</p>
      </aside>`;
    window.scrollTo(0, 0);
  }

  function cover(s) {
    return `<a class="cover" href="#${s.id}">
      <div class="cover-art">${ART.scene(s.cover, false)}</div>
      <div class="cover-band">
        <span class="cover-hi">${esc(s.hindi)}</span>
        <span class="cover-title">${esc(s.title)}</span>
        <span class="cover-tag">${esc(s.tagline)}</span>
        <span class="cover-meta">${s.panels.length} panels · ${esc(s.place)}</span>
      </div>
    </a>`;
  }

  function story(s) {
    const i = STORIES.indexOf(s);
    const prev = STORIES[i - 1], next = STORIES[i + 1];
    document.title = `${s.title} · Bhakt Charitra`;
    app.innerHTML = `
      <nav class="topbar"><a href="#home" class="back">← All stories</a><span>${i + 1} / ${STORIES.length}</span></nav>
      <header class="story-head">
        <p class="eyebrow">${esc(s.place)}</p>
        <h1><span class="deva">${esc(s.hindi)}</span><span class="latin">${esc(s.title)}</span></h1>
        <p class="tagline">${esc(s.tagline)}</p>
        <p class="src">Source: ${esc(s.source)}</p>
      </header>
      <div class="page">${layout(s.panels).map(panel).join('')}</div>
      <section class="lesson"><h2>Katha ki seekh <span class="deva-sm">कथा की सीख</span></h2><p>${esc(s.lesson)}</p><p class="jai">|| Jai Jai Shri Radhe ||</p></section>
      <nav class="pager">
        ${prev ? `<a href="#${prev.id}"><small>Previous</small>${esc(prev.title)}</a>` : '<span></span>'}
        ${next ? `<a href="#${next.id}" class="next"><small>Next story</small>${esc(next.title)}</a>` : `<a href="#home" class="next"><small>Finished</small>Back to all stories</a>`}
      </nav>`;
    window.scrollTo(0, 0);
  }

  function route() {
    const id = location.hash.slice(1);
    const s = STORIES.find((x) => x.id === id);
    s ? story(s) : home();
  }
  window.addEventListener('hashchange', route);
  route();
})();
