/*
 * Bhakt Charitra — story data.
 *
 * Each story is a list of panels. A panel has:
 *   cap   narration box shown above the art
 *   bg    scene: palace court temple sanctum village hut forest river ghat field nidhivan shop sky storm plain
 *   time  day dawn dusk night divine storm
 *   wide  true = panel spans the full row (art is 800 wide instead of 400)
 *   chars characters: { t: type, x, pose, face, item, flip, glow, sit, lie, scale }
 *   props scene objects: { p: name, x, s, front, ... }
 *   fx    effects: rays, speed, sparkle, dream, dark, rain
 *   say   speech: { c: index of speaking char (or x), text, kind: speech | thought | shout | divine }
 *   sfx   big sound-effect lettering: { text, x, y, size, r }
 *
 * Dialogue is a dramatised retelling of the traditional katha, not a transcript of any pravachan.
 */
const STORIES = [
  /* ================= PURANIC BHAKTS ================= */
  {
    id: 'dhruv', group: 'puran', title: 'Dhruv', hindi: 'ध्रुव', tagline: 'The five-year-old who won the Lord',
    place: 'Madhuvan, on the Yamuna', source: 'Shrimad Bhagavatam, Canto 4, ch. 8–9',
    cover: { bg: 'forest', time: 'dusk', chars: [{ t: 'child', x: 200, pose: 'fold', face: 'closed', sit: true, scale: 1.3 }], fx: [{ fx: 'rays', x: 200, y: 120, op: .4 }] },
    panels: [
      { cap: 'King Uttanapada had two queens, Suniti and Suruchi. One day little Dhruv, son of Suniti, saw his half-brother Uttam sitting on the king\'s lap.', bg: 'court', props: [{ p: 'throne', x: 290 }], chars: [{ t: 'king', x: 290, sit: true, pose: 'stand', flip: true }, { t: 'child', x: 265, y: 208, face: 'joy', flip: true, scale: .8 }, { t: 'child', x: 120, pose: 'reach', face: 'joy' }], say: [{ c: 2, text: 'Pitaji, let me sit on your lap too!' }] },
      { cap: 'Queen Suruchi pulled him away.', bg: 'court', chars: [{ t: 'queen', x: 260, pose: 'talk', face: 'angry', flip: true }, { t: 'child', x: 120, face: 'shock' }], say: [{ c: 0, text: 'You are not born of me! If you want that seat, go and pray to Narayan to be born from my womb!', kind: 'shout' }] },
      { cap: 'Weeping, Dhruv ran to his mother.', bg: 'hut', chars: [{ t: 'woman', x: 250, pose: 'bless', face: 'sad', flip: true }, { t: 'child', x: 150, face: 'cry' }], say: [{ c: 0, text: 'Do not wish ill on anyone, son. Only Shri Hari can give you what you seek. Go to Him.' }] },
      { cap: 'Dhruv set off alone into the forest. On the way, Devarshi Narad tested him.', bg: 'forest', chars: [{ t: 'narad', x: 270, flip: true, pose: 'hold' }, { t: 'child', x: 120, pose: 'fold' }], say: [{ c: 0, text: 'You are only five. Tapasya is hard even for great rishis. Go home, child.' }, { c: 1, text: 'Devarshi, I will not return until I see the Lord!' }] },
      { cap: 'Pleased by his resolve, Narad gave him the twelve-syllable mantra and sent him to Madhuvan on the banks of the Yamuna.', bg: 'river', time: 'dawn', wide: true, chars: [{ t: 'narad', x: 520, flip: true, pose: 'bless', item: null }, { t: 'child', x: 330, pose: 'fold', face: 'closed' }], say: [{ c: 0, text: 'ॐ नमो भगवते वासुदेवाय — Om Namo Bhagavate Vasudevaya', kind: 'divine' }] },
      { cap: 'First month: fruit every third day. Then dry leaves. Then only water. Then only air. When Dhruv stood on one foot holding his breath, the whole universe felt its breath held.', bg: 'forest', time: 'night', chars: [{ t: 'child', x: 200, pose: 'fold', face: 'closed', scale: 1.1 }], fx: [{ fx: 'sparkle', x: 200, y: 130 }] },
      { cap: 'The Lord appeared before him on Garuda. Dhruv could not speak. Shri Hari touched his cheek with His conch, and words of praise poured out.', bg: 'sky', time: 'divine', chars: [{ t: 'vishnu', x: 260, flip: true, glow: true, scale: 1.1 }, { t: 'child', x: 120, pose: 'fold', face: 'joy' }], say: [{ c: 1, text: 'I came looking for a kingdom and found You. I searched for broken glass and found a divine jewel!' }] },
      { cap: 'After a long righteous rule, Dhruv was given a place that never moves. To this day we call the pole star Dhruv Tara.', bg: 'plain', time: 'night', fx: [{ fx: 'rays', x: 200, y: 60, color: '#fff8d0', op: .25 }, { fx: 'sparkle', x: 200, y: 60 }], chars: [] },
    ],
    lesson: 'Bhakti has no age limit. Even a prayer that starts with a worldly wish, if it is steady, reaches the Lord, and His darshan then removes the wish itself.',
  },
  {
    id: 'prahlad', group: 'puran', title: 'Prahlad', hindi: 'प्रह्लाद', tagline: 'The child the fire could not burn',
    place: 'Hiranyakashipu\'s capital', source: 'Shrimad Bhagavatam, Canto 7, ch. 5–10',
    cover: { bg: 'court', wide: false, chars: [{ t: 'narasimha', x: 250, flip: true, glow: true, pose: 'bless' }, { t: 'child', x: 130, pose: 'fold', face: 'joy' }], props: [{ p: 'pillarburst', x: 250 }] },
    panels: [
      { cap: 'The asura king Hiranyakashipu had won a boon that made him almost impossible to kill. Drunk with power, he banned the name of Vishnu.', bg: 'court', chars: [{ t: 'asura', x: 200, pose: 'raise', scale: 1.1 }], say: [{ c: 0, text: 'In my kingdom, only MY name will be worshipped!', kind: 'shout' }] },
      { cap: 'But his own son Prahlad sang the Lord\'s name at school, and taught his classmates too.', bg: 'village', chars: [{ t: 'child', x: 150, pose: 'talk' }, { t: 'child', x: 250, flip: true, face: 'joy', sit: true }, { t: 'child', x: 320, flip: true, sit: true }], say: [{ c: 0, text: 'Friends, childhood is the best time to chant Narayan! Life is short.' }] },
      { cap: 'The king tried everything. Prahlad was thrown from cliffs, trampled by elephants, given poison. Nothing touched him.', bg: 'court', chars: [{ t: 'asura', x: 280, pose: 'talk', flip: true }, { t: 'child', x: 130, pose: 'fold', face: 'closed' }], say: [{ c: 0, text: 'Who protects you?!', kind: 'shout' }, { c: 1, text: 'The same Narayan who gives you your strength, Pitaji.' }] },
      { cap: 'His aunt Holika, who could not be burned, sat in the fire with Prahlad in her lap. Holika burned. Prahlad kept chanting.', bg: 'plain', time: 'night', chars: [{ t: 'child', x: 200, pose: 'fold', face: 'closed', sit: true, scale: 1.25 }], props: [{ p: 'fire', x: 200, front: true, s: .7 }], sfx: { text: 'WHOOSH!', x: 120, y: 70 } },
      { cap: 'At dusk, the king struck a pillar in his hall.', bg: 'court', chars: [{ t: 'asura', x: 110, pose: 'reach', face: 'angry' }, { t: 'child', x: 330, flip: true, pose: 'fold' }], props: [{ p: 'pillar', x: 220, crack: true }], say: [{ c: 0, text: 'If your Hari is everywhere, is He in this pillar?', kind: 'shout' }, { c: 1, text: 'He is in the pillar too.' }] },
      { cap: 'The pillar split with a roar. Out came Shri Narasimha — neither man nor beast — at twilight, neither day nor night.', wide: true, bg: 'court', props: [{ p: 'pillarburst', x: 400 }], chars: [{ t: 'narasimha', x: 400, pose: 'raise', glow: true, scale: 1.15 }, { t: 'asura', x: 180, face: 'shock', pose: 'shock' }], sfx: { text: 'KRRRAAAKK!', x: 560, y: 70, size: 46 } },
      { cap: 'Even Lakshmi and the devas were afraid to go near Him. Only little Prahlad walked up and bowed.', bg: 'court', chars: [{ t: 'narasimha', x: 270, flip: true, pose: 'bless', face: 'calm', glow: true }, { t: 'child', x: 150, pose: 'fold', face: 'joy' }], say: [{ c: 1, text: 'Lord, give me only this: may no desire ever arise in my heart.' }] },
      { cap: 'The Lord\'s anger melted into love. He placed His hand on Prahlad\'s head and blessed his family line for generations.', bg: 'sky', time: 'divine', chars: [{ t: 'narasimha', x: 240, flip: true, pose: 'bless', face: 'joy', glow: true }, { t: 'child', x: 160, pose: 'fold', face: 'closed' }] },
    ],
    lesson: 'The Lord did not come out of the pillar only to kill a demon. He came to prove His devotee\'s words true: "He is everywhere."',
  },
  {
    id: 'shabri', group: 'puran', title: 'Shabri', hindi: 'शबरी', tagline: 'A lifetime of waiting, a basket of berries',
    place: 'Matang Rishi\'s ashram, near Pampa lake', source: 'Ramcharitmanas, Aranya Kand',
    cover: { bg: 'forest', chars: [{ t: 'oldwoman', x: 150, pose: 'offer', item: 'berries', face: 'joy' }, { t: 'ram', x: 270, flip: true, pose: 'bless', glow: true }] },
    panels: [
      { cap: 'Shabri, a Bhil tribal woman, served in the ashram of Matang Rishi. Before leaving his body, the rishi told her:', bg: 'forest', chars: [{ t: 'oldsadhu', x: 270, flip: true, pose: 'bless', sit: true }, { t: 'woman', x: 130, pose: 'fold', veil: '#8a5a2b' }], say: [{ c: 0, text: 'Shabri, Shri Ram Himself will come to this ashram one day. Wait for Him here.' }] },
      { cap: 'Years became decades. Every morning she swept the path and scattered flowers on it.', bg: 'forest', time: 'dawn', chars: [{ t: 'oldwoman', x: 200, pose: 'low', item: 'broom' }], say: [{ c: 0, text: 'Maybe today my Ram will come...', kind: 'thought' }] },
      { cap: 'Other ashram dwellers laughed at her.', bg: 'forest', chars: [{ t: 'pandit', x: 280, flip: true, pose: 'talk', face: 'angry' }, { t: 'oldwoman', x: 120, face: 'calm' }], say: [{ c: 0, text: 'Shri Ram come to a Bhil woman\'s hut? He will come to our ashram, not yours!' }] },
      { cap: 'Every day she picked berries, and tasted each one first, so that no sour berry would reach her Lord.', bg: 'forest', chars: [{ t: 'oldwoman', x: 200, pose: 'eat', face: 'joy' }], props: [{ p: 'basket', x: 280, s: .8 }], say: [{ c: 0, text: 'This one is sour — not for my Ram. This one is sweet!' }] },
      { cap: 'And one day, He came. Shri Ram and Lakshman walked into her ashram. Shabri fell at His feet, weeping.', wide: true, bg: 'forest', chars: [{ t: 'ram', x: 520, flip: true, pose: 'bless', glow: true }, { t: 'lakshman', x: 640, flip: true }, { t: 'oldwoman', x: 360, pose: 'fold', face: 'cry' }], say: [{ c: 2, text: 'Prabhu! My Gurudev\'s words have come true!' }] },
      { cap: 'Ram ate the tasted berries with delight. Lakshman was surprised.', bg: 'forest', chars: [{ t: 'ram', x: 170, pose: 'eat', face: 'joy', sit: true }, { t: 'oldwoman', x: 270, flip: true, pose: 'offer', item: 'berries', sit: true, face: 'joy' }], say: [{ c: 0, text: 'Lakshman, I have never tasted anything so sweet.' }] },
      { cap: 'Then the Lord taught her the nine forms of bhakti, the Navadha Bhakti.', bg: 'forest', time: 'dusk', chars: [{ t: 'ram', x: 250, flip: true, pose: 'bless', glow: true }, { t: 'oldwoman', x: 140, pose: 'fold', face: 'closed', sit: true }], say: [{ c: 0, text: '"कह रघुपति सुनु भामिनि बाता, मानउँ एक भगति कर नाता" — I recognise only one relation: bhakti.', kind: 'divine' }] },
    ],
    lesson: 'The Lord looks at the heart, not at caste, learning or ritual. Waiting for Him with love is itself bhakti.',
  },

  /* ================= SANTS OF THE BHAKTI ERA ================= */
  {
    id: 'karmabai', group: 'sant', title: 'Karma Bai', hindi: 'करमा बाई की खिचड़ी', tagline: 'The khichdi that Jagannath ran for',
    place: 'Jagannath Puri, Odisha', source: 'Bhakt tradition of Puri',
    cover: { bg: 'hut', chars: [{ t: 'oldwoman', x: 260, flip: true, pose: 'offer', item: 'bowl', face: 'joy', sit: true }, { t: 'krishna', x: 140, pose: 'eat', face: 'joy', sit: true, scale: .8 }], props: [{ p: 'chulha', x: 330, front: true }] },
    panels: [
      { cap: 'In Puri lived an old widow, Karma Bai. She loved Jagannath as her own little son.', bg: 'hut', time: 'dawn', chars: [{ t: 'oldwoman', x: 160, pose: 'low', face: 'joy', sit: true }], props: [{ p: 'chulha', x: 250, s: 1.1 }], say: [{ c: 0, text: 'My Lalla will be hungry. First, khichdi!' }] },
      { cap: 'Every morning, before anything else, she cooked khichdi. And every morning the Lord came to eat it.', bg: 'hut', chars: [{ t: 'krishna', x: 150, pose: 'eat', face: 'joy', sit: true, scale: .8 }, { t: 'oldwoman', x: 260, flip: true, pose: 'offer', item: 'bowl', sit: true }], say: [{ c: 0, text: 'Maa, your khichdi is the tastiest in the whole world!' }, { c: 1, text: 'Eat, Lalla, eat. You must be starving.' }] },
      { cap: 'One day a sadhu stayed with her and saw this.', bg: 'hut', chars: [{ t: 'sadhu', x: 270, flip: true, pose: 'talk', face: 'angry' }, { t: 'oldwoman', x: 140, face: 'shock' }], say: [{ c: 0, text: 'Maa! You cook for Bhagavan without bathing, without cleaning the kitchen? That is not proper worship!' }] },
      { cap: 'The next morning Karma Bai followed every rule. She bathed, cleaned, purified... and the khichdi got very late.', bg: 'hut', time: 'dawn', chars: [{ t: 'oldwoman', x: 260, pose: 'low', flip: true }, { t: 'krishna', x: 120, pose: 'stand', face: 'sad', scale: .8 }], say: [{ c: 1, text: 'Maa... I\'m so hungry...', kind: 'thought' }] },
      { cap: 'The Lord gulped the khichdi, heard the temple bells for the morning darshan, and ran — without even washing His mouth!', bg: 'village', time: 'dawn', chars: [{ t: 'krishna', x: 240, pose: 'run', face: 'shock', scale: .85 }], fx: [{ fx: 'speed' }], sfx: { text: 'DHAP DHAP!', x: 300, y: 70, size: 34 } },
      { cap: 'When the temple doors opened, the priests were stunned.', bg: 'sanctum', chars: [{ t: 'krishna', x: 200, glow: true, face: 'joy', pose: 'stand' }, { t: 'pandit', x: 70, face: 'shock', pose: 'shock' }, { t: 'pandit', x: 340, flip: true, face: 'shock' }], say: [{ c: 1, text: 'There is khichdi on Jagannath\'s lips!', kind: 'shout' }] },
      { cap: 'That night, the Lord came in the sadhu\'s dream.', bg: 'hut', time: 'night', chars: [{ t: 'sadhu', x: 250, y: 262, lie: true, face: 'closed' }, { t: 'krishna', x: 260, y: 200, glow: true, pose: 'bless', scale: .62 }], props: [{ p: 'bed', x: 180 }], fx: [{ fx: 'dark', op: .35 }, { fx: 'dream', x: 260, y: 140, rx: 80, ry: 64 }], say: [{ c: 1, text: 'Karma Bai fed Me with love. Your rules left Me hungry. Tell her to cook as before.', kind: 'divine' }] },
      { cap: 'The sadhu fell at Karma Bai\'s feet. To this day, it is said, khichdi is the first bhog offered to Jagannath each morning, in her memory.', bg: 'temple', time: 'dawn', chars: [{ t: 'sadhu', x: 140, pose: 'fold', face: 'sad' }, { t: 'oldwoman', x: 260, flip: true, face: 'joy', pose: 'bless' }], props: [{ p: 'khichdi', x: 340 }] },
    ],
    lesson: 'Rules exist to serve love; love does not exist to serve rules. The Lord accepts bhav, the feeling behind the offering.',
  },
  {
    id: 'namdev', group: 'sant', title: 'Sant Namdev', hindi: 'संत नामदेव', tagline: 'The boy who made Vitthal drink milk',
    place: 'Pandharpur, Maharashtra', source: 'Varkari tradition; Bhaktamal',
    cover: { bg: 'sanctum', chars: [{ t: 'vitthal', x: 250, flip: true, glow: true, pose: 'hips' }, { t: 'child', x: 140, pose: 'offer', item: 'bowl', face: 'joy' }], props: [{ p: 'brick', x: 250 }] },
    panels: [
      { cap: 'Little Namdev\'s father, Damashet, offered milk to Vitthal every day. One day he had to travel.', bg: 'village', chars: [{ t: 'villager', x: 260, flip: true, pose: 'talk' }, { t: 'child', x: 140, face: 'joy' }], say: [{ c: 0, text: 'Namya, today you take the milk to Vitthal.' }] },
      { cap: 'Namdev placed the bowl at the Lord\'s feet and waited.', bg: 'sanctum', chars: [{ t: 'vitthal', x: 260, flip: true, pose: 'hips' }, { t: 'child', x: 140, pose: 'offer', item: 'bowl' }], props: [{ p: 'brick', x: 260 }], say: [{ c: 1, text: 'Vitthala, drink! You drink Baba\'s milk every day!' }] },
      { cap: 'He waited and waited. The idol did not move.', bg: 'sanctum', chars: [{ t: 'vitthal', x: 260, flip: true, pose: 'hips' }, { t: 'child', x: 140, pose: 'cry', face: 'cry' }], props: [{ p: 'brick', x: 260 }], say: [{ c: 1, text: 'If You don\'t drink it, I\'ll break my head on this stone!', kind: 'shout' }] },
      { cap: 'The Lord could not bear it. Vitthal stepped down from His brick and drank the milk.', bg: 'sanctum', chars: [{ t: 'vitthal', x: 240, flip: true, pose: 'eat', item: 'bowl', glow: true, face: 'joy' }, { t: 'child', x: 130, pose: 'raise', face: 'joy' }], props: [{ p: 'brick', x: 290 }], fx: [{ fx: 'sparkle', x: 240, y: 110 }] },
      { cap: 'His father came back.', bg: 'village', chars: [{ t: 'villager', x: 260, flip: true, pose: 'talk', face: 'shock' }, { t: 'child', x: 140, face: 'joy' }], say: [{ c: 0, text: 'The whole bowl is empty? Where did the milk go?' }, { c: 1, text: 'Vitthal drank it all!' }] },
      { cap: 'The next day Damashet hid behind a pillar to watch. He saw the Lord drink from his son\'s hands, and wept.', bg: 'sanctum', chars: [{ t: 'vitthal', x: 250, flip: true, pose: 'eat', item: 'bowl', glow: true }, { t: 'child', x: 160, pose: 'fold', face: 'joy' }, { t: 'villager', x: 50, face: 'cry', pose: 'fold' }], props: [{ p: 'pillar', x: 90, front: true, s: .9 }] },
      { cap: 'Years later, a dog ran off with the rotis Namdev had made. He ran after it — with a bowl of ghee.', wide: true, bg: 'village', chars: [{ t: 'man', x: 300, pose: 'run', face: 'joy', item: 'bowl', tilak: true }], props: [{ p: 'dog', x: 560, roti: true }], fx: [{ fx: 'speed' }], say: [{ c: 0, text: 'Vitthala, wait! The rotis are dry — let me put ghee on them!' }] },
    ],
    lesson: 'Childlike faith moves the Lord. And one who truly sees, sees Vitthal in every being, even in a dog.',
  },
  {
    id: 'meera', group: 'sant', title: 'Meera Bai', hindi: 'मीरा बाई', tagline: 'Poison became nectar',
    place: 'Mewar, Vrindavan and Dwarka', source: 'Bhaktamal; Meera\'s padas',
    cover: { bg: 'palace', chars: [{ t: 'meera', x: 200, pose: 'hold', face: 'joy', scale: 1.1 }], fx: [{ fx: 'sparkle', x: 200, y: 120 }] },
    panels: [
      { cap: 'As a little girl in Merta, Meera saw a wedding procession pass by.', bg: 'palace', chars: [{ t: 'queen', x: 260, flip: true, pose: 'talk' }, { t: 'woman', x: 150, scale: .7, face: 'joy', veil: null }], say: [{ c: 1, text: 'Maa, who will I marry?' }, { c: 0, text: 'Your groom? Your groom is Giridhar Gopal!' }] },
      { cap: 'She took those words as truth for life. Married into the royal house of Mewar, she spent her days singing to Krishna with sadhus.', bg: 'temple', chars: [{ t: 'meera', x: 200, pose: 'hold', face: 'closed' }, { t: 'sadhu', x: 80, sit: true, pose: 'fold' }, { t: 'oldsadhu', x: 330, sit: true, flip: true, pose: 'fold' }], say: [{ c: 0, text: 'मेरे तो गिरधर गोपाल, दूसरो न कोई — I have Giridhar Gopal, no one else.', kind: 'divine' }] },
      { cap: 'The Rana was furious.', bg: 'court', chars: [{ t: 'king', x: 270, flip: true, pose: 'talk', face: 'angry' }, { t: 'meera', x: 130, item: null, pose: 'fold' }], say: [{ c: 0, text: 'A queen dancing with wandering sadhus! You shame the royal house!', kind: 'shout' }] },
      { cap: 'A cup of poison was sent to her, called "charanamrit of the Lord". Meera knew. She drank it anyway.', bg: 'palace', chars: [{ t: 'meera', x: 200, pose: 'eat', item: 'cup', face: 'closed' }], say: [{ c: 0, text: 'If it is my Lord\'s charanamrit, how can I refuse?' }] },
      { cap: 'The poison turned to nectar. Meera went on singing.', bg: 'palace', chars: [{ t: 'meera', x: 200, pose: 'raise', face: 'joy', glow: true, item: null }], fx: [{ fx: 'sparkle', x: 200, y: 110 }] },
      { cap: 'Next came a basket with a cobra inside, sent as "a garland for you". When Meera opened it, she found a garland of flowers.', bg: 'palace', chars: [{ t: 'meera', x: 150, pose: 'low', face: 'joy', item: null }], props: [{ p: 'basket', x: 260, open: true, s: 1.2 }] },
      { cap: 'Meera left the palace for Vrindavan, and later Dwarka. It is said that there, while singing, she merged into the deity of Ranchhodji.', wide: true, bg: 'temple', time: 'dusk', chars: [{ t: 'krishna', x: 480, glow: true, flip: true, scale: 1.1 }, { t: 'meera', x: 330, pose: 'hold', face: 'closed' }], fx: [{ fx: 'rays', x: 480, y: 110, op: .4 }] },
    ],
    lesson: 'When the heart is fully given, even poison becomes nectar. Meera\'s only weapon against the world was kirtan.',
  },
  {
    id: 'narsi', group: 'sant', title: 'Narsi Mehta', hindi: 'नरसी मेहता की हुंडी', tagline: 'The hundi that Shamal Shah cashed',
    place: 'Junagadh and Dwarka, Gujarat', source: 'Gujarati bhakti tradition; Bhaktamal',
    cover: { bg: 'shop', chars: [{ t: 'seth', x: 260, flip: true, pose: 'offer', item: 'coin', glow: true }, { t: 'villager', x: 140, face: 'shock' }], props: [{ p: 'coins', x: 330 }] },
    panels: [
      { cap: 'Narsi Mehta of Junagadh owned nothing but his kartals and his kirtan. Pilgrims going to Dwarka wanted a hundi, a note to collect money there, so they need not carry cash. Some mockers sent them to Narsi.', bg: 'village', chars: [{ t: 'villager', x: 100, face: 'joy', pose: 'talk' }, { t: 'villager', x: 280, flip: true, turban: '#3f7f3a' }], say: [{ c: 0, text: 'Go to Narsi Mehta! He is a very big seth!', kind: 'thought' }] },
      { cap: 'The pilgrims gave Narsi their money. He had no business contacts at all. So he thought of the only one he knew in Dwarka.', bg: 'hut', chars: [{ t: 'oldsadhu', x: 150, item: 'scroll', pose: 'offer', face: 'joy' }, { t: 'villager', x: 280, flip: true }], say: [{ c: 0, text: 'Take this hundi to Shamal Shah Seth in Dwarka. He will pay you.' }] },
      { cap: 'Narsi spent the money feeding sadhus, and then sang to his Lord.', bg: 'temple', time: 'dusk', chars: [{ t: 'oldsadhu', x: 200, pose: 'raise', face: 'closed', item: 'kartal' }], say: [{ c: 0, text: 'Shamaliya, my honour is in Your hands now!' }] },
      { cap: 'In Dwarka the pilgrims searched every market.', bg: 'shop', chars: [{ t: 'villager', x: 140, face: 'sad', pose: 'talk' }, { t: 'man', x: 280, flip: true, turban: '#6d4c41' }], say: [{ c: 0, text: 'Where does Shamal Shah Seth live?' }, { c: 1, text: 'Never heard of him. No such seth in Dwarka!' }] },
      { cap: 'Just as they lost hope, a splendid seth came up to them.', wide: true, bg: 'shop', chars: [{ t: 'seth', x: 480, flip: true, pose: 'offer', item: 'coin', glow: true, face: 'joy' }, { t: 'villager', x: 320, face: 'shock', pose: 'shock' }], props: [{ p: 'coins', x: 580 }], say: [{ c: 0, text: 'I am Shamal Shah. Narsi is my own. Here is your money — with extra!', kind: 'divine' }] },
      { cap: 'The seth vanished. Back in Junagadh, the pilgrims fell at Narsi\'s feet. Narsi wept.', bg: 'village', chars: [{ t: 'oldsadhu', x: 250, flip: true, face: 'cry', item: null }, { t: 'villager', x: 130, pose: 'fold', face: 'joy' }], say: [{ c: 0, text: 'My Lord walked the markets of Dwarka for my honour...' }] },
    ],
    lesson: 'The Lord keeps the word of those who have no support except Him.',
  },
  {
    id: 'dhanna', group: 'sant', title: 'Dhanna Jat', hindi: 'धन्ना जाट', tagline: 'The stone that ate bajra rotis',
    place: 'Dhuan village, Rajasthan', source: 'Bhaktamal; Guru Granth Sahib',
    cover: { bg: 'field', chars: [{ t: 'krishna', x: 250, flip: true, pose: 'eat', glow: true, sit: true }, { t: 'farmer', x: 140, pose: 'offer', item: 'roti', face: 'joy', sit: true }] },
    panels: [
      { cap: 'A pandit came to worship his shaligram at a farmer\'s house. Young Dhanna watched with wide eyes.', bg: 'village', chars: [{ t: 'pandit', x: 260, flip: true, sit: true, pose: 'fold' }, { t: 'child', x: 120, pose: 'talk' }], props: [{ p: 'shaligram', x: 200 }], say: [{ c: 1, text: 'Panditji, give me a Thakurji too!' }] },
      { cap: 'To get rid of him, the pandit picked up an ordinary stone.', bg: 'village', chars: [{ t: 'pandit', x: 250, flip: true, pose: 'offer', face: 'joy' }, { t: 'child', x: 140, pose: 'raise', face: 'joy' }], props: [{ p: 'stone', x: 214, y: 162 }], say: [{ c: 0, text: 'Here, this is Thakurji. Feed Him before you eat.', kind: 'speech' }] },
      { cap: 'Dhanna made bajra rotis and set them before the stone.', bg: 'hut', chars: [{ t: 'farmer', x: 140, sit: true, pose: 'fold', face: 'joy' }], props: [{ p: 'stone', x: 250 }, { p: 'plate', x: 210 }], say: [{ c: 0, text: 'Eat, Thakurji! Then I will eat.' }] },
      { cap: 'The Thakurji did not eat. So Dhanna did not eat either. One day, two days, three days...', bg: 'hut', time: 'night', chars: [{ t: 'farmer', x: 140, sit: true, pose: 'cry', face: 'cry' }], props: [{ p: 'stone', x: 250 }, { p: 'plate', x: 210 }], say: [{ c: 0, text: 'Are my rotis not good enough for You? Then I won\'t eat either!', kind: 'shout' }] },
      { cap: 'The Lord could not hold out against such love. He appeared and ate the rotis.', bg: 'hut', chars: [{ t: 'krishna', x: 250, flip: true, pose: 'eat', glow: true, sit: true, face: 'joy' }, { t: 'farmer', x: 130, pose: 'raise', face: 'joy', sit: true }], props: [{ p: 'plate', x: 200, front: true }], say: [{ c: 0, text: 'Dhanna, your stubborn love has won.', kind: 'divine' }] },
      { cap: 'From then on, the Lord grazed Dhanna\'s cows and worked in his fields.', wide: true, bg: 'field', chars: [{ t: 'krishna', x: 360, glow: true }, { t: 'farmer', x: 200, pose: 'fold', face: 'joy' }], props: [{ p: 'cow', x: 500 }, { p: 'cow', x: 610, flip: true, s: .9 }] },
      { cap: 'When the pandit heard, he came running.', bg: 'village', chars: [{ t: 'farmer', x: 140, pose: 'talk', face: 'joy' }, { t: 'pandit', x: 270, flip: true, face: 'shock', pose: 'shock' }], say: [{ c: 0, text: 'Panditji, the Thakurji you gave me eats my rotis every day!' }, { c: 1, text: 'In all my years of puja, I never saw Him once!' }] },
    ],
    lesson: 'It was not the stone, it was the faith. Dhanna\'s bhav turned a pebble into Bhagavan.',
  },
  {
    id: 'sadna', group: 'sant', title: 'Sadna Kasai', hindi: 'सदना कसाई', tagline: 'The butcher whose weight was a shaligram',
    place: 'Sehwan, Sindh', source: 'Bhaktamal; Guru Granth Sahib',
    cover: { bg: 'shop', chars: [{ t: 'butcher', x: 150, pose: 'fold', face: 'closed' }], props: [{ p: 'scale', x: 270, s: 1.2 }] },
    panels: [
      { cap: 'Sadna was born in a butcher\'s family and did the family trade. But Hari-naam never left his lips.', bg: 'shop', chars: [{ t: 'butcher', x: 150, pose: 'hold', face: 'closed' }], props: [{ p: 'scale', x: 270 }], say: [{ c: 0, text: 'Hari bol... Hari bol...' }] },
      { cap: 'He used a smooth round stone as a weight. A passing sadhu stopped in shock.', bg: 'shop', chars: [{ t: 'sadhu', x: 290, flip: true, pose: 'talk', face: 'shock' }, { t: 'butcher', x: 120 }], props: [{ p: 'scale', x: 200 }], say: [{ c: 0, text: 'Brother! That is a shaligram, Bhagavan Himself! How can you weigh meat with it?' }, { c: 1, text: 'I didn\'t know, Maharaj. Please take Him.' }] },
      { cap: 'The sadhu took the shaligram and worshipped it with full ritual: bath, sandal, tulsi, bhog.', bg: 'sanctum', chars: [{ t: 'sadhu', x: 140, sit: true, pose: 'fold', face: 'closed' }], props: [{ p: 'shaligram', x: 250, glow: true, s: 1.3 }] },
      { cap: 'That night the Lord came in his dream.', bg: 'hut', time: 'night', chars: [{ t: 'sadhu', x: 250, y: 262, lie: true, face: 'closed' }, { t: 'krishna', x: 260, y: 200, glow: true, pose: 'bless', scale: .62 }], props: [{ p: 'bed', x: 180 }], fx: [{ fx: 'dark', op: .35 }, { fx: 'dream', x: 260, y: 140, rx: 80, ry: 64 }], say: [{ c: 1, text: 'Take Me back to Sadna. I loved being weighed while he sang My name.', kind: 'divine' }] },
      { cap: 'The sadhu returned the shaligram and told Sadna everything. Sadna broke down in tears, left his trade and became a wandering bhakt.', bg: 'shop', chars: [{ t: 'sadhu', x: 270, flip: true, pose: 'offer' }, { t: 'butcher', x: 140, pose: 'fold', face: 'cry' }], props: [{ p: 'shaligram', x: 232, y: 164, s: .8 }], say: [{ c: 1, text: 'The Lord loved this sinner\'s naam?' }] },
    ],
    lesson: 'The Lord is bound by love and by His name, not by outer status. Naam purifies whoever chants it.',
  },
  {
    id: 'tukaram', group: 'sant', title: 'Sant Tukaram', hindi: 'संत तुकाराम', tagline: 'The abhangas the river gave back',
    place: 'Dehu, on the Indrayani', source: 'Varkari tradition',
    cover: { bg: 'river', chars: [{ t: 'sadhu', x: 150, cloth: '#fff8e7', pose: 'raise', face: 'joy', item: 'kartal', beard: '#3a2a22', hair: 'short' }], props: [{ p: 'floatbooks', x: 280, y: 232 }] },
    panels: [
      { cap: 'In Dehu, Tukaram sang abhangas to Vitthal. Crowds gathered to hear the grocer-saint.', bg: 'village', chars: [{ t: 'sadhu', x: 200, cloth: '#fff8e7', pose: 'raise', face: 'closed', item: 'kartal', beard: '#3a2a22', hair: 'short' }, { t: 'villager', x: 70, sit: true, pose: 'fold' }, { t: 'woman', x: 330, sit: true, flip: true, pose: 'fold' }], say: [{ c: 0, text: 'Vitthala, Vitthala, Pandurang!' }] },
      { cap: 'A proud scholar, Rameshwar Bhatt, objected.', bg: 'temple', chars: [{ t: 'pandit', x: 280, flip: true, pose: 'talk', face: 'angry' }, { t: 'sadhu', x: 130, cloth: '#fff8e7', beard: '#3a2a22', hair: 'short', pose: 'fold' }], say: [{ c: 0, text: 'A grocer explaining the Vedas? Throw your notebooks into the Indrayani!', kind: 'shout' }] },
      { cap: 'Tukaram quietly sank his notebooks in the river.', bg: 'river', chars: [{ t: 'sadhu', x: 170, cloth: '#fff8e7', beard: '#3a2a22', hair: 'short', pose: 'low', face: 'sad' }], props: [{ p: 'books', x: 260, y: 236 }] },
      { cap: 'Then he sat on the bank without food or water for thirteen days.', bg: 'river', time: 'night', chars: [{ t: 'sadhu', x: 170, cloth: '#fff8e7', beard: '#3a2a22', hair: 'short', sit: true, pose: 'fold', face: 'closed' }], say: [{ c: 0, text: 'Vitthala, if these words were Yours, You protect them.', kind: 'thought' }] },
      { cap: 'On the thirteenth day the notebooks rose to the surface. The villagers pulled them out. Not one page was wet.', wide: true, bg: 'river', time: 'dawn', chars: [{ t: 'villager', x: 200, pose: 'shock', face: 'shock' }, { t: 'woman', x: 110, face: 'joy', pose: 'raise' }], props: [{ p: 'floatbooks', x: 480, y: 232, s: 1.3 }], say: [{ c: 0, text: 'The notebooks are floating! Bone dry!', kind: 'shout' }] },
      { cap: 'Rameshwar Bhatt came and fell at Tukaram\'s feet, and became his disciple.', bg: 'river', chars: [{ t: 'pandit', x: 150, pose: 'fold', face: 'cry' }, { t: 'sadhu', x: 270, flip: true, cloth: '#fff8e7', beard: '#3a2a22', hair: 'short', pose: 'bless', face: 'joy' }] },
    ],
    lesson: 'The Lord protects His devotee\'s words. Tukaram answered insult with patience, and patience won the scholar\'s heart.',
  },
  {
    id: 'surdas', group: 'sant', title: 'Surdas', hindi: 'सूरदास', tagline: 'The blind poet who held Krishna\'s hand',
    place: 'Braj', source: 'Braj tradition; Chaurasi Vaishnavan ki Varta',
    cover: { bg: 'village', chars: [{ t: 'oldsadhu', x: 150, face: 'blind', pose: 'reach', item: null }, { t: 'krishna', x: 250, flip: true, scale: .72, face: 'joy', pose: 'reach', item: null }] },
    panels: [
      { cap: 'Surdas could not see, yet he sang of Krishna\'s childhood as if he watched it every day.', bg: 'village', chars: [{ t: 'oldsadhu', x: 200, face: 'blind', pose: 'hold', item: 'stick' }], say: [{ c: 0, text: 'मैया मोरी, मैं नहिं माखन खायो — Maiya, I didn\'t eat the butter!' }] },
      { cap: 'One day, walking alone, he fell into a dry well.', bg: 'village', chars: [{ t: 'oldsadhu', x: 170, face: 'shock', pose: 'shock', rot: -25 }], props: [{ p: 'well', x: 240, front: true }], sfx: { text: 'DHADAAM!', x: 300, y: 70 } },
      { cap: 'Days passed at the bottom of the well. He called to the only one he knew.', bg: 'plain', time: 'night', props: [{ p: 'welltop', x: 200, y: 250 }], chars: [{ t: 'oldsadhu', x: 200, face: 'blind', pose: 'raise', scale: .9 }], say: [{ c: 0, text: 'Kanha! Save me!', kind: 'shout' }] },
      { cap: 'A small hand reached down and pulled him out. Surdas felt it and knew at once.', bg: 'village', chars: [{ t: 'krishna', x: 250, flip: true, scale: .75, pose: 'reach', face: 'joy', item: null }, { t: 'oldsadhu', x: 150, face: 'joy', pose: 'reach' }], props: [{ p: 'well', x: 60 }], say: [{ c: 1, text: 'This is no ordinary child\'s hand!' }] },
      { cap: 'Surdas gripped tightly. But the child slipped free and ran off laughing. Surdas said:', bg: 'village', chars: [{ t: 'krishna', x: 320, pose: 'run', scale: .75, face: 'joy' }, { t: 'oldsadhu', x: 140, face: 'blind', pose: 'reach' }], fx: [{ fx: 'speed' }], say: [{ c: 1, text: '"बाँह छुड़ाए जात हो, निबल जानि कै मोहि; हिरदै ते जब जाहुगे, सबल बखानौं तोहि" — You free Your hand, knowing I\'m weak. Leave my heart, and I\'ll call You strong!', kind: 'divine' }] },
    ],
    lesson: 'The eyes of the heart see what the eyes of the body cannot. Hold Him in the heart and He cannot leave.',
  },
  {
    id: 'kabir', group: 'sant', title: 'Sant Kabir', hindi: 'संत कबीर', tagline: 'A mantra received on the ghat steps',
    place: 'Kashi (Varanasi)', source: 'Bhaktamal; Kabir tradition',
    cover: { bg: 'ghat', time: 'dawn', chars: [{ t: 'weaver', x: 200, pose: 'fold', face: 'joy' }] },
    panels: [
      { cap: 'Kabir was a weaver in Kashi. His hands worked the loom, his tongue chanted Ram.', bg: 'hut', chars: [{ t: 'weaver', x: 150, sit: true, pose: 'low', face: 'closed' }], props: [{ p: 'loom', x: 270 }], say: [{ c: 0, text: 'Ram... Ram... Ram...' }] },
      { cap: 'He longed to take diksha from Swami Ramanandacharya, but did not think he would be accepted. So he made a plan.', bg: 'hut', time: 'night', chars: [{ t: 'weaver', x: 200, pose: 'fold' }], say: [{ c: 0, text: 'Swamiji bathes at Panchganga Ghat before dawn. I will lie on the steps.', kind: 'thought' }] },
      { cap: 'In the dark before dawn, Ramanandacharya walked down the ghat. His foot touched someone lying on the steps.', wide: true, bg: 'ghat', time: 'night', chars: [{ t: 'oldsadhu', x: 420, flip: true, pose: 'shock', face: 'shock', cloth: '#e8871e' }, { t: 'weaver', x: 320, lie: true, y: 196 }], say: [{ c: 0, text: 'Ram! Ram!', kind: 'shout' }] },
      { cap: 'Kabir got up full of joy.', bg: 'ghat', time: 'dawn', chars: [{ t: 'weaver', x: 200, pose: 'raise', face: 'joy' }], say: [{ c: 0, text: 'Gurudev has given me the mantra: Ram!' }] },
      { cap: 'Once Kabir gave away the cloth he wove to a sadhu in need, and hid, afraid his family would go hungry. That same day, a trader nobody knew delivered sacks of grain to his home.', bg: 'village', chars: [{ t: 'seth', x: 260, flip: true, pose: 'offer', item: 'coin', glow: true }, { t: 'woman', x: 140, face: 'shock', veil: '#6d4c41', cloth: '#8a5a2b', top: '#8a5a2b' }], props: [{ p: 'basket', x: 330 }] },
      { cap: 'Kabir\'s simple dohas still teach the whole country.', bg: 'village', time: 'dusk', chars: [{ t: 'weaver', x: 200, pose: 'bless', face: 'joy' }], say: [{ c: 0, text: '"मोको कहाँ ढूँढे बन्दे, मैं तो तेरे पास में" — Where are you searching for Me? I am right beside you.', kind: 'divine' }] },
    ],
    lesson: 'Where there is longing, the Lord finds a way, even through a footstep on the ghat.',
  },
  {
    id: 'raidas', group: 'sant', title: 'Sant Raidas', hindi: 'संत रैदास', tagline: 'Ganga in a cobbler\'s water bowl',
    place: 'Kashi (Varanasi)', source: 'Bhaktamal; Raidas tradition',
    cover: { bg: 'hut', chars: [{ t: 'cobbler', x: 150, sit: true, pose: 'low', face: 'joy' }], props: [{ p: 'kathauti', x: 260, glow: true, s: 1.3 }] },
    panels: [
      { cap: 'Raidas mended shoes in Kashi. A Brahmin neighbour was going for a festival bath in the Ganga.', bg: 'village', chars: [{ t: 'pandit', x: 270, flip: true, pose: 'talk' }, { t: 'cobbler', x: 130, sit: true, pose: 'low' }], say: [{ c: 0, text: 'Raidas, come bathe in Ganga Maa today!' }, { c: 1, text: 'I promised these shoes today. Take this coin for Ganga Maa — but only if she takes it in her own hand.' }] },
      { cap: 'At the Ganga, the Brahmin held out the coin. A hand rose from the water, took it, and gave back a gold bangle.', wide: true, bg: 'river', chars: [{ t: 'pandit', x: 300, pose: 'reach', face: 'shock' }], props: [{ p: 'riverhand', x: 420, y: 250 }], say: [{ x: 420, text: 'Give this bangle to my Raidas.', kind: 'divine' }] },
      { cap: 'But greed took over. The Brahmin gifted the bangle to the queen himself. She loved it, and wanted the pair.', bg: 'court', chars: [{ t: 'queen', x: 270, flip: true, pose: 'talk', face: 'joy' }, { t: 'pandit', x: 130, face: 'shock' }], say: [{ c: 0, text: 'Bring me the second bangle, or face the king\'s anger!' }] },
      { cap: 'Terrified, the Brahmin ran to Raidas and confessed everything.', bg: 'hut', chars: [{ t: 'pandit', x: 270, flip: true, pose: 'fold', face: 'cry' }, { t: 'cobbler', x: 140, sit: true, face: 'calm' }], props: [{ p: 'kathauti', x: 200 }] },
      { cap: 'Raidas prayed, then dipped his hand into the wooden tub of water he used for soaking leather.', bg: 'hut', chars: [{ t: 'cobbler', x: 140, sit: true, pose: 'low', face: 'joy' }, { t: 'pandit', x: 300, flip: true, face: 'shock', pose: 'shock' }], props: [{ p: 'kathauti', x: 200, glow: true, s: 1.2 }, { p: 'bangle', x: 184, y: 200 }], say: [{ c: 0, text: '"मन चंगा तो कठौती में गंगा" — If the mind is pure, the Ganga is in this tub!', kind: 'divine' }] },
    ],
    lesson: 'A pure heart brings the holy places home. Honest work done with naam is itself pilgrimage.',
  },
  {
    id: 'haridas', group: 'sant', title: 'Swami Haridas', hindi: 'स्वामी हरिदास और बाँके बिहारी', tagline: 'How Banke Bihari appeared in Nidhivan',
    place: 'Nidhivan, Vrindavan', source: 'Haridasi sampradaya tradition',
    cover: { bg: 'nidhivan', time: 'night', chars: [{ t: 'krishna', x: 240, flip: true, glow: true }, { t: 'radha', x: 170, glow: true, pose: 'fold' }] },
    panels: [
      { cap: 'In the groves of Nidhivan, Swami Haridas sang to the Divine Couple. Even Tansen is said to have been his student.', bg: 'nidhivan', time: 'dusk', chars: [{ t: 'oldsadhu', x: 200, sit: true, pose: 'hold', item: 'tanpura', face: 'closed' }], say: [{ c: 0, text: 'Kunj Bihari... Shri Haridas...' }] },
      { cap: 'His disciples begged him.', bg: 'nidhivan', time: 'dusk', chars: [{ t: 'sadhu', x: 280, flip: true, pose: 'fold' }, { t: 'oldsadhu', x: 140, sit: true, item: 'tanpura', pose: 'hold' }], say: [{ c: 0, text: 'Gurudev, let us also see the Divine Couple you see in your heart!' }] },
      { cap: 'Haridas sang with his whole being. The grove filled with light, and Shri Radha and Shri Krishna stood before them.', wide: true, bg: 'nidhivan', time: 'night', chars: [{ t: 'radha', x: 440, glow: true, pose: 'fold' }, { t: 'krishna', x: 520, flip: true, glow: true }, { t: 'oldsadhu', x: 250, sit: true, pose: 'fold', face: 'joy' }, { t: 'sadhu', x: 150, face: 'shock', pose: 'shock' }], fx: [{ fx: 'rays', x: 480, y: 110, op: .35 }] },
      { cap: 'The beauty was too great to bear. Haridas prayed:', bg: 'nidhivan', time: 'night', chars: [{ t: 'oldsadhu', x: 140, pose: 'fold', face: 'cry', sit: true }, { t: 'krishna', x: 280, flip: true, glow: true }], say: [{ c: 0, text: 'Pyare, the world cannot bear this. Become one, like the cloud and the lightning.' }] },
      { cap: 'The two merged into a single form: Shri Banke Bihari ji. He is worshipped in Vrindavan to this day.', bg: 'sanctum', chars: [{ t: 'krishna', x: 200, glow: true, scale: 1.1, garland: true }], fx: [{ fx: 'sparkle', x: 200, y: 120 }] },
      { cap: 'In Bihari ji\'s temple the curtain is drawn again and again during darshan. Devotees say no one can bear His gaze for long.', bg: 'sanctum', props: [{ p: 'curtain', x: 200, s: 1 }], chars: [{ t: 'woman', x: 60, pose: 'fold', face: 'joy' }, { t: 'villager', x: 340, flip: true, pose: 'fold' }] },
    ],
    lesson: 'The Lord appears where bhajan is sung with the whole heart. Rasik saints teach us to serve His joy, not to ask for our own.',
  },
  {
    id: 'tulsidas', group: 'sant', title: 'Goswami Tulsidas', hindi: 'गोस्वामी तुलसीदास', tagline: 'Tilak from Raghubir\'s own hand',
    place: 'Rajapur, Kashi and Chitrakoot', source: 'Tulsi tradition; Bhaktamal',
    cover: { bg: 'ghat', time: 'dawn', chars: [{ t: 'ram', x: 260, flip: true, glow: true, pose: 'reach', item: null, scale: .75 }, { t: 'oldsadhu', x: 150, sit: true, pose: 'low', face: 'joy' }], props: [{ p: 'chandan', x: 200 }, { p: 'parrot', x: 340, y: 120 }] },
    panels: [
      { cap: 'Young Tulsidas loved his wife Ratnavali so much that when she went to her parents\' home, he followed that same stormy night. He swam the flooded river and climbed to her window on what he took for a rope.', bg: 'storm', chars: [{ t: 'man', x: 150, pose: 'raise', face: 'shock', y: 200 }], props: [{ p: 'house', x: 300 }, { p: 'snakerope', x: 290, y: 250 }], sfx: { text: 'KADAK!', x: 110, y: 60 } },
      { cap: 'It was a snake. Ratnavali was ashamed.', bg: 'hut', time: 'night', chars: [{ t: 'woman', x: 260, flip: true, pose: 'talk', face: 'angry' }, { t: 'man', x: 140, face: 'shock' }], say: [{ c: 0, text: 'This body is just bone and skin! If you loved Shri Ram half as much, you would be free of all fear.' }] },
      { cap: 'Those words woke him up. He left home and became a sadhu devoted to Ram. In Kashi he learnt that Hanuman ji came daily to hear Ram-katha, disguised as an old leper.', bg: 'ghat', chars: [{ t: 'oldsadhu', x: 140, pose: 'fold', face: 'joy' }, { t: 'hanuman', x: 280, flip: true, glow: true, pose: 'bless' }], say: [{ c: 0, text: 'I know who You are. Please let me see Shri Ram!' }, { c: 1, text: 'Go to Chitrakoot.' }] },
      { cap: 'At Chitrakoot, two princes rode past him. He did not recognise them until they were gone.', bg: 'forest', chars: [{ t: 'oldsadhu', x: 110, face: 'sad' }, { t: 'ram', x: 260, pose: 'run' }, { t: 'lakshman', x: 350, pose: 'run' }], fx: [{ fx: 'speed' }] },
      { cap: 'One morning at the Chitrakoot ghat, Tulsidas was grinding sandalwood. A young boy asked him for a tilak. A parrot in the tree sang:', wide: true, bg: 'ghat', time: 'dawn', chars: [{ t: 'oldsadhu', x: 320, sit: true, pose: 'low', face: 'joy' }, { t: 'ram', x: 440, flip: true, scale: .75, pose: 'reach', item: null, glow: true }], props: [{ p: 'chandan', x: 380 }, { p: 'parrot', x: 600, y: 110 }], say: [{ x: 600, text: '"चित्रकूट के घाट पर, भइ संतन की भीर; तुलसिदास चंदन घिसें, तिलक देत रघुबीर"', kind: 'divine' }] },
      { cap: 'Tulsidas recognised his Lord and was lost in bliss. Later he gave the world the Ramcharitmanas.', bg: 'hut', chars: [{ t: 'oldsadhu', x: 200, sit: true, pose: 'offer', item: 'book', face: 'joy' }], fx: [{ fx: 'sparkle', x: 200, y: 120 }] },
    ],
    lesson: 'One sharp word, taken to heart, can turn attachment into bhakti. The same love, turned toward Ram, made Tulsidas.',
  },
  {
    id: 'gopalbhatt', group: 'sant', title: 'Gopal Bhatt Goswami', hindi: 'श्री राधारमण प्राकट्य', tagline: 'The shaligram that became Radharaman',
    place: 'Vrindavan', source: 'Gaudiya Vaishnava tradition',
    cover: { bg: 'sanctum', chars: [{ t: 'krishna', x: 250, flip: true, glow: true, scale: .8 }, { t: 'oldsadhu', x: 140, pose: 'fold', face: 'cry', sit: true, cloth: '#e8871e' }] },
    panels: [
      { cap: 'Gopal Bhatt Goswami, a follower of Chaitanya Mahaprabhu, served twelve shaligrams in Vrindavan.', bg: 'sanctum', chars: [{ t: 'sadhu', x: 140, sit: true, pose: 'fold', face: 'closed' }], props: [{ p: 'shaligram', x: 250 }, { p: 'shaligram', x: 290 }] },
      { cap: 'A wealthy devotee gave him fine clothes and ornaments for the Lord. Gopal Bhatt felt sad.', bg: 'sanctum', chars: [{ t: 'sadhu', x: 140, sit: true, pose: 'hold', face: 'sad' }], props: [{ p: 'shaligram', x: 250 }], say: [{ c: 0, text: 'How can I dress round stones? If only You had hands and feet...', kind: 'thought' }] },
      { cap: 'It was Narasimha Chaturdashi. He read how the Lord came out of a pillar for Prahlad.', bg: 'hut', time: 'night', chars: [{ t: 'sadhu', x: 200, sit: true, pose: 'offer', item: 'book', face: 'cry' }], props: [{ p: 'diya', x: 290 }], say: [{ c: 0, text: 'You came out of a pillar for Prahlad. Will You not come out of a shaligram for me?' }] },
      { cap: 'In the morning he opened the basket. One shaligram had become a small, graceful deity with a flute.', wide: true, bg: 'sanctum', chars: [{ t: 'krishna', x: 460, flip: true, glow: true, scale: .8 }, { t: 'sadhu', x: 300, pose: 'shock', face: 'joy', sit: true }], props: [{ p: 'basket', x: 390, open: true }], fx: [{ fx: 'rays', x: 460, y: 140, op: .4 }], sfx: { text: 'JAI!', x: 660, y: 80 } },
      { cap: 'This is Shri Radharaman ji, served in Vrindavan to this day. The temple kitchen fire, it is said, has been kept burning ever since.', bg: 'temple', time: 'dusk', chars: [{ t: 'villager', x: 100, pose: 'fold' }, { t: 'woman', x: 300, pose: 'fold', flip: true }], props: [{ p: 'diya', x: 180 }, { p: 'diya', x: 220 }] },
    ],
    lesson: 'Ask the Lord with a real ache in the heart, and He takes the form His devotee longs to serve.',
  },
];
