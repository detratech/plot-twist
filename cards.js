'use strict';

const PLOT_TWIST_CARDS = [
  {
    id: 1,
    title: 'TELEPORT SNEEZE',
    vibe: 'chaos',
    scenario: [
      'You get $5 million, tax-free.',
      'Tiny problem: every time you sneeze, you instantly teleport somewhere random within 50 km.'
    ],
    prompt: 'Taking the money?',
    twist: [
      'You cannot carry your phone when you teleport.',
      'Also, allergy season still exists.'
    ],
    afterPrompt: 'Still taking the deal?',
    hostPrompts: ['What is your emergency plan?', 'How many sneezes before you regret this?']
  },
  {
    id: 2,
    title: 'MIND READER',
    vibe: 'wild',
    scenario: [
      'You can read anyone’s mind whenever you want.',
      'No one can hide a thought from you.'
    ],
    prompt: 'Do you want the power?',
    twist: [
      'Everyone can hear your thoughts too.',
      'There is no mute button.'
    ],
    afterPrompt: 'Still worth it?',
    hostPrompts: ['Who lasts longest with this power?', 'What thought gets you in trouble first?']
  },
  {
    id: 3,
    title: 'THE BABY MIX-UP',
    vibe: 'late-night',
    scenario: [
      'A hospital makes a massive mistake.',
      'Four babies go home with completely different families in different parts of the world. They grow up with different traditions, values, habits, assumptions, and ideas about life.',
      'Twenty-five years later, they meet.'
    ],
    prompt: 'How different do you think these four people would be?',
    twist: [
      'Each one is completely convinced that the way they grew up seeing the world is obviously correct.'
    ],
    afterPrompt: 'Could something feel obvious mostly because you have been surrounded by it your whole life?',
    hostPrompts: ['What would be hardest for them to question?', 'Would confidence tell you who is right?']
  },
  {
    id: 4,
    title: 'FREE FOOD FOREVER',
    vibe: 'choices',
    scenario: [
      'Every meal is free for the rest of your life.',
      'Restaurants, groceries, snacks, everything.'
    ],
    prompt: 'Easy yes?',
    twist: [
      'Someone else chooses every single thing you eat.',
      'You can request. They can ignore you.'
    ],
    afterPrompt: 'How much control are you willing to trade for free food?',
    hostPrompts: ['Who would you trust to choose?', 'What food would break the deal?']
  },
  {
    id: 5,
    title: 'THE RED BUTTON',
    vibe: 'mystery',
    scenario: [
      'You find a ridiculous red button in the forest.',
      'A sign says: “Press this and instantly learn the real answer to every major mystery about life.”'
    ],
    prompt: 'Pressing it?',
    twist: [
      'Once you know the answers, you cannot pretend you never knew them.',
      'Some answers may force you to change how you currently live. Something you love doing might turn out to be a terrible idea.'
    ],
    afterPrompt: 'Still pressing it?',
    hostPrompts: ['Would you rather be comfortable or certain?', 'What answer would you be most nervous to learn?']
  },
  {
    id: 6,
    title: 'THE IMPOSSIBLE CABIN',
    vibe: 'mystery',
    scenario: [
      'You hike deep into untouched wilderness. No roads. No tracks. No people.',
      'Then you find an incredible cabin. Fire going. Fresh food. Beds made. Firewood stacked perfectly.',
      'Your names are written on the beds.'
    ],
    prompt: 'What is your first explanation?',
    twist: [
      'One friend shrugs and says: “Nobody prepared it. Given enough time, forests just do weird stuff.”'
    ],
    afterPrompt: 'Buying that explanation?',
    hostPrompts: ['What clues would make you reject an explanation?', 'What actually needs explaining here?']
  },
  {
    id: 7,
    title: 'INVISIBILITY',
    vibe: 'chaos',
    scenario: [
      'You can become invisible whenever you want.',
      'Instantly. No cooldown.'
    ],
    prompt: 'What is the first thing you do?',
    twist: [
      'Your clothes do not become invisible.',
      'Neither do the things you are carrying.'
    ],
    afterPrompt: 'Is this still a useful superpower?',
    hostPrompts: ['Best legal use?', 'Worst possible timing?']
  },
  {
    id: 8,
    title: 'THE ULTIMATE BOSS',
    vibe: 'wild',
    scenario: [
      'Your group has to design the most ridiculously powerful video-game character possible.',
      'This character is supposed to be above everything else in the game.'
    ],
    bullets: [
      'Someone created him',
      'He forgets things',
      'He has to sleep',
      'He can die',
      'Someone stronger exists',
      'He needs something else to survive',
      'Another character can control him',
      'He cannot leave one location'
    ],
    prompt: 'Which weaknesses ruin the idea of an “ultimate” character?',
    twist: [
      'You are allowed to remove only three weaknesses.'
    ],
    afterPrompt: 'Which three absolutely have to go?',
    hostPrompts: ['Which weakness is most damaging?', 'Can the “ultimate” character depend on something else?']
  },
  {
    id: 9,
    title: 'THE THREE MAPS',
    vibe: 'mystery',
    scenario: [
      'You are lost in the woods and find three maps.',
      'One says camp is north. One says camp is south. One says the campsite never existed.'
    ],
    prompt: 'Can all three maps somehow be correct?',
    twist: [
      'All three maps contain some accurate information about the forest.'
    ],
    afterPrompt: 'Does having some correct information make the whole map correct?',
    hostPrompts: ['How would you decide which map to trust?', 'Can contradictory directions both be right in the same sense?']
  },
  {
    id: 10,
    title: 'PERFECT MEMORY',
    vibe: 'choices',
    scenario: [
      'You gain perfect memory.',
      'Names, dates, conversations, directions, everything. You never forget anything again.'
    ],
    prompt: 'Taking it?',
    twist: [
      'You also remember every embarrassing moment with perfect clarity.',
      'Including the ones everyone else forgot ten years ago.'
    ],
    afterPrompt: 'Still taking it?',
    hostPrompts: ['Is forgetting sometimes useful?', 'What memory would you immediately regret keeping perfectly?']
  },
  {
    id: 11,
    title: 'THE MYSTERY BOSS TEXT',
    vibe: 'mystery',
    scenario: [
      'Unknown number texts you:',
      '“Hey. It’s your boss. Don’t come to work for three months. Full pay. Also you’re getting a $50,000 bonus.”'
    ],
    prompt: 'Are you staying home tomorrow?',
    twist: [
      'The number knows your boss’s name.',
      'It uses the company logo.',
      'It knows private workplace details.',
      'It sends a photo from inside the office.'
    ],
    afterPrompt: 'At what point do you trust it, and would you still verify directly?',
    hostPrompts: ['What would count as enough evidence?', 'Does sounding convincing make it genuine?']
  },
  {
    id: 12,
    title: 'THE SECRET SPONSOR',
    vibe: 'late-night',
    scenario: [
      'Someone secretly pays for the entire camping trip.',
      'Gas. Food. Gear. Campsite. Everything.',
      'At the end, another guy who paid for nothing stands up and takes all the credit.'
    ],
    prompt: 'Why does that annoy you?',
    twist: [
      'The person who actually paid for everything says nothing and watches everyone thank the wrong guy.'
    ],
    afterPrompt: 'Would you correct everyone?',
    hostPrompts: ['Why does proper credit matter?', 'Does the real sponsor deserve thanks even if they never ask for it?']
  },
  {
    id: 13,
    title: 'NEVER NEED SLEEP',
    vibe: 'wild',
    scenario: [
      'You never need sleep again.',
      'You stay healthy and fully rested 24/7.'
    ],
    prompt: 'How are you using the extra eight hours?',
    twist: [
      'Everyone else still sleeps.',
      'So every night you are awake alone for eight extra hours while the world is basically closed.'
    ],
    afterPrompt: 'Still the best power ever?',
    hostPrompts: ['Would this make life better or lonelier?', 'How long before 3 a.m. gets boring?']
  },
  {
    id: 14,
    title: 'THE $50,000 MACHINE',
    vibe: 'choices',
    scenario: [
      'You buy a ridiculous $50,000 camping machine.',
      'It purifies water, generates electricity, cooks food, heats your shelter, and does several other complicated things.',
      'The instruction manual is sitting beside it.'
    ],
    prompt: 'Manual first, or figure it out yourself?',
    twist: [
      'Your friend has never seen the machine before.',
      'He says: “Manuals are for idiots. I can feel how this works.”',
      'Five minutes later he is hitting it with a rock. He sounds extremely confident.'
    ],
    afterPrompt: 'Who are you trusting?',
    hostPrompts: ['Does confidence matter here?', 'Who would know the machine better: the maker or the loudest user?']
  },
  {
    id: 15,
    title: 'THE ANIMAL FIGHT',
    vibe: 'chaos',
    scenario: [
      'You have to fight one of these:',
      'One horse-sized duck, or one hundred duck-sized horses.'
    ],
    prompt: 'Pick your opponent.',
    twist: [
      'The tiny horses are organized.',
      'The giant duck has never experienced anger before, but it learns fast.'
    ],
    afterPrompt: 'Changing sides?',
    hostPrompts: ['What is your actual strategy?', 'Who in the group survives longest?']
  },
  {
    id: 16,
    title: 'EVERYONE THINKS YOU’RE WRONG',
    vibe: 'choices',
    scenario: [
      'Pick one:',
      'A: Everyone on Earth agrees with you about something important, but you are wrong.',
      'B: Everyone on Earth thinks you are an idiot, but you are right.'
    ],
    prompt: 'A or B?',
    twist: [
      'In option B, your closest friends and family are against you too.'
    ],
    afterPrompt: 'Still choosing B?',
    hostPrompts: ['How much does social pressure matter?', 'Does agreement change what is actually true?']
  },
  {
    id: 17,
    title: 'FAMOUS FOREVER',
    vibe: 'chaos',
    scenario: [
      'You become world famous overnight.',
      'People recognize you everywhere. You never have to introduce yourself again.'
    ],
    prompt: 'Sounds good?',
    twist: [
      'You are famous for the most embarrassing thing you have ever done.',
      'There are memes.'
    ],
    afterPrompt: 'Still want fame?',
    hostPrompts: ['How much money would make this acceptable?', 'What if your family sees the memes first?']
  },
  {
    id: 18,
    title: 'THE ONE WRONG BELIEF',
    vibe: 'late-night',
    scenario: [
      'A machine scans your brain and announces:',
      '“One major thing you currently believe is completely wrong.”',
      'It refuses to tell you which one.'
    ],
    prompt: 'What part of your life do you investigate first?',
    choices: ['Money', 'Relationships', 'Health', 'Politics', 'Morality', 'Life purpose', 'Something else'],
    twist: [
      'The false belief is one you have had since childhood.'
    ],
    afterPrompt: 'Does that make it easier or harder to question?',
    hostPrompts: ['Which belief would be most costly to discover late?', 'How would you test something you have never seriously questioned?']
  },
  {
    id: 19,
    title: 'THE RESET BUTTON',
    vibe: 'late-night',
    scenario: [
      'You restart your life from age five.',
      'You keep everything you currently know.'
    ],
    prompt: 'What is the first mistake you make sure you never repeat?',
    twist: [
      'You can also reject any belief or habit that was taught to you growing up.'
    ],
    afterPrompt: 'What would you examine before automatically copying again?',
    hostPrompts: ['What would you keep exactly the same?', 'What deserves a fresh look?']
  },
  {
    id: 20,
    title: 'CLONE ROOMMATE',
    vibe: 'wild',
    scenario: [
      'A perfect clone of you appears and needs somewhere to live.',
      'Same memories. Same habits. Same opinions. Same terrible jokes.'
    ],
    prompt: 'Are you letting Clone You move in?',
    twist: [
      'The clone also thinks they are the original.',
      'And they want your bedroom.'
    ],
    afterPrompt: 'Who gets the room?',
    hostPrompts: ['Would you actually get along with yourself?', 'Which habit becomes unbearable first?']
  },
  {
    id: 21,
    title: 'THE LAST 24 HOURS',
    vibe: 'late-night',
    scenario: [
      'You somehow know with absolute certainty that you have exactly 24 hours left.',
      'You feel healthy. Nothing hurts. But tomorrow, you are gone.'
    ],
    prompt: 'What are you doing tonight?',
    twist: [
      'You cannot spend the time trying to prevent it.'
    ],
    afterPrompt: 'What suddenly matters more, and what suddenly seems pointless?',
    hostPrompts: ['Who do you need to speak to?', 'What would you regret spending time on?']
  },
  {
    id: 22,
    title: 'PAUSE BUTTON',
    vibe: 'chaos',
    scenario: [
      'You get a remote that pauses time for everyone except you.',
      'You can walk around normally while the world is frozen.'
    ],
    prompt: 'What is your first use?',
    twist: [
      'You still age while time is paused.',
      'Every hour you steal is one hour only you lose.'
    ],
    afterPrompt: 'How often are you using it now?',
    hostPrompts: ['What is worth spending your own time on?', 'Would you waste it on pranks?']
  },
  {
    id: 23,
    title: 'THE LUCKY HOODIE',
    vibe: 'mystery',
    scenario: [
      'Your friend wears the same hoodie to five hockey games.',
      'Their team wins all five.',
      'He now refuses to watch a game without it because the hoodie is “clearly working.”'
    ],
    prompt: 'Are you letting him call it lucky?',
    twist: [
      'At the sixth game he forgets the hoodie.',
      'The team wins 8–0 anyway.'
    ],
    afterPrompt: 'What would actually show that the hoodie caused anything?',
    hostPrompts: ['How do you separate coincidence from cause?', 'What evidence would change your mind?']
  },
  {
    id: 24,
    title: 'INSTANT EXPERT',
    vibe: 'wild',
    scenario: [
      'You can instantly become world-class at one skill.',
      'Cooking, flying, surgery, music, fighting, coding, anything.'
    ],
    prompt: 'What skill are you taking?',
    twist: [
      'Every time you use the skill, you loudly explain what you are doing like a terrible tutorial video.',
      'You cannot stop narrating.'
    ],
    afterPrompt: 'Same skill?',
    hostPrompts: ['Which skill becomes funniest?', 'Which one becomes impossible to use secretly?']
  }
];

const CAMPFIRE_RUN_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 19, 21];

const CHAOS_MODIFIERS = [
  { name: 'PROVE IT', text: 'How would you actually know that?' },
  { name: 'REVERSE IT', text: 'Would you still say that if you were on the other side?' },
  { name: 'BET ON IT', text: 'Same answer if $10,000 depended on you being right?' },
  { name: 'SWITCH', text: 'Anyone can publicly change their answer. No shame. Defend the new one.' },
  { name: 'NO ESCAPE', text: 'No “it depends.” Pick what you would lean toward.' }
];
