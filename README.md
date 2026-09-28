# भक्त चरित्र · Bhakt Charitra

Stories of the Lord's devotees told as comics. These are the kathas that saints such as Pujya Shri Premanand Ji Maharaj, Pujya Rajendra Das Ji Maharaj and others narrate in satsang. Here they are retold panel by panel, with narration boxes, speech bubbles and sound effects.

Open `index.html` in any browser. There is no build step and nothing to install. It also works as-is on GitHub Pages.

## Stories

| Group | Story | Source |
|---|---|---|
| Puranic | Dhruv | Shrimad Bhagavatam 4.8–9 |
| Puranic | Prahlad | Shrimad Bhagavatam 7.5–10 |
| Puranic | Shabri | Ramcharitmanas, Aranya Kand |
| Sant | Karma Bai ki Khichdi | Puri tradition |
| Sant | Sant Namdev | Varkari tradition, Bhaktamal |
| Sant | Meera Bai | Bhaktamal, Meera's padas |
| Sant | Narsi Mehta ki Hundi | Gujarati tradition, Bhaktamal |
| Sant | Dhanna Jat | Bhaktamal, Guru Granth Sahib |
| Sant | Sadna Kasai | Bhaktamal, Guru Granth Sahib |
| Sant | Sant Tukaram | Varkari tradition |
| Sant | Surdas | Braj tradition |
| Sant | Sant Kabir | Bhaktamal |
| Sant | Sant Raidas | Bhaktamal |
| Sant | Swami Haridas & Banke Bihari | Haridasi tradition |
| Sant | Goswami Tulsidas | Tulsi tradition, Bhaktamal |
| Sant | Gopal Bhatt Goswami & Radharaman ji | Gaudiya tradition |

The dialogue is a dramatised retelling of the traditional katha. It is not a transcript of any saint's pravachan.

## How it works

- `js/art.js` draws every panel as SVG. It includes scenes (temple, ghat, Nidhivan, palace…), characters (Krishna, Vitthal, Narasimha, sadhu, bhakt, mata…), props (shaligram, khichdi, kathauti…) and effects.
- `js/stories.js` holds the stories. Each panel lists its scene, characters, props, narration and dialogue.
- `js/app.js` is the reader. It shows the home shelf, and each story at `index.html#<story-id>`.

## Adding a story

Add an object to `STORIES` in `js/stories.js`:

```js
{
  id: 'gajendra', group: 'puran', title: 'Gajendra', hindi: 'गजेन्द्र मोक्ष',
  tagline: 'The elephant who called out', place: 'Trikut mountain', source: 'Shrimad Bhagavatam 8.2–4',
  cover: { bg: 'river', chars: [{ t: 'vishnu', x: 260, flip: true, glow: true }] },
  panels: [
    { cap: 'Narration text…', bg: 'river', time: 'dawn',
      chars: [{ t: 'sadhu', x: 140, pose: 'fold' }, { t: 'krishna', x: 270, flip: true, glow: true }],
      say: [{ c: 0, text: 'Hari!', kind: 'shout' }] },
  ],
  lesson: 'What the story teaches.',
}
```

The header comment in `js/stories.js` lists the available scenes, characters, poses, props and bubble styles.
