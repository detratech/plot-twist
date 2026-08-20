'use strict';

const PLOT_TWIST_CARDS = [
  {
    id: 1,
    title: 'JUSTIN HAMMER DEMO NIGHT',
    vibe: 'warm-up',
    scenario: [
      'Justin Hammer has a huge show, a cheering crowd, and a flashy new drone.',
      'Tony Stark shows up with a boring-looking prototype.'
    ],
    prompt: 'Who gets your $1,000 bet: Hammer or Stark?',
    twist: [
      'Hammer’s drone freezes. Tony’s finishes the course.'
    ],
    afterPrompt: 'Did the crowd and confidence prove anything?',
    hostPrompts: ['What should you have looked at instead?', 'How much does confidence fool us?']
  },
  {
    id: 2,
    title: 'HULK\'S PURPLE PANTS',
    vibe: 'warm-up',
    scenario: [
      'Your friend notices Hulk often wears purple pants.',
      'He says the pants must help cause the transformation.'
    ],
    prompt: 'Good theory or bad theory?',
    twist: [
      'Banner wears purple all day and stays calm. The next day he turns into Hulk wearing normal clothes.'
    ],
    afterPrompt: 'Same answer now?',
    hostPrompts: ['What actually caused the change?', 'Can two things happen together without one causing the other?']
  },
  {
    id: 3,
    title: 'LOKI\'S 30 WITNESSES',
    vibe: 'warm-up',
    scenario: [
      'Loki says Thor smashed your car.',
      'Then Loki makes 29 copies of himself. All 30 say Thor did it.'
    ],
    prompt: 'Do you believe the 30 witnesses: yes or no?',
    twist: [
      'Security video shows Loki did it. The 30 witnesses were really one source copied 30 times.'
    ],
    afterPrompt: 'Are 30 copies stronger than one real source?',
    hostPrompts: ['What makes witnesses independent?', 'When is popularity just repetition?']
  },
  {
    id: 4,
    title: 'NICK FURY\'S THREE FILES',
    vibe: 'warm-up',
    scenario: [
      'Nick Fury gives you three versions of the same event: a viral clip, a news summary, and the full security video.'
    ],
    prompt: 'Which do you check first?',
    choices: ['Viral clip', 'News summary', 'Full video'],
    twist: [
      'The first two both cut out details from the full video.'
    ],
    afterPrompt: 'Which source matters most now?',
    hostPrompts: ['Why do people prefer summaries?', 'When should you go straight to the source?']
  },
  {
    id: 5,
    title: 'CAPTAIN AMERICA\'S USB',
    vibe: 'warm-up',
    scenario: [
      'Steve Rogers says: “Do not plug a random USB into Avengers Tower.”',
      'Tony laughs because Steve barely understands modern computers.'
    ],
    prompt: 'Ignore Steve or listen to Steve?',
    twist: [
      'Someone plugs it in. The whole network locks up.'
    ],
    afterPrompt: 'Was the advice wrong because it sounded old-fashioned?',
    hostPrompts: ['Does age decide truth?', 'What should decide whether advice is good?']
  },
  {
    id: 6,
    title: 'STRONGEST AVENGER',
    vibe: 'warm-up',
    scenario: [
      'Thor says he is the strongest Avenger. Hulk disagrees. Tony says brains matter more.'
    ],
    prompt: 'Who is strongest: Thor, Hulk, or Tony?',
    choices: ['Thor', 'Hulk', 'Tony'],
    twist: [
      'JARVIS asks: “Strongest at what?”'
    ],
    afterPrompt: 'Do you need to define “strongest” first?',
    hostPrompts: ['Pick one definition.', 'Did the argument change once the word was defined?']
  },
  {
    id: 7,
    title: 'DOM\'S USED CIVIC',
    vibe: 'evidence',
    scenario: [
      'You would inspect a used Civic from a stranger.',
      'Dom Toretto says this seller is family, so just trust him.'
    ],
    prompt: 'Inspect it or trust family?',
    choices: ['Inspect it', 'Trust family'],
    twist: [
      'The mechanic finds a hidden check-engine problem.'
    ],
    afterPrompt: 'Should your standard change because you like the seller?',
    hostPrompts: ['When is trust enough?', 'Do we go easier on our own side?']
  },
  {
    id: 8,
    title: 'IKEA IRON MAN',
    vibe: 'evidence',
    scenario: [
      'Tony sells an IKEA-style Iron Man suit with 600 parts and a manual.',
      'Your friend says he can build it without reading anything.'
    ],
    prompt: 'Manual or freestyle?',
    choices: ['Read the manual', 'Figure it out'],
    twist: [
      'He gets almost everything right, then installs the power cell wrong.'
    ],
    afterPrompt: 'Do a few good guesses replace the maker’s instructions?',
    hostPrompts: ['Who knows the design best?', 'When should experience give way to instructions?']
  },
  {
    id: 9,
    title: 'INCEPTION CROWD',
    vibe: 'evidence',
    scenario: [
      'Fifty people tell you that you are awake.',
      'Your Inception totem says you are dreaming.'
    ],
    prompt: 'Trust the crowd or the test?',
    choices: ['Crowd', 'Test'],
    twist: [
      'The fifty people were all part of the same dream.'
    ],
    afterPrompt: 'Which should matter more: agreement or an independent test?',
    hostPrompts: ['When is a crowd useful evidence?', 'What makes a test independent?']
  },
  {
    id: 10,
    title: 'HOGWARTS FROM BIRTH',
    vibe: 'evidence',
    scenario: [
      'Imagine babies are assigned a Hogwarts House at birth.',
      'They grow up hearing that their House is obviously the best.'
    ],
    prompt: 'At 30, are most people defending choice or upbringing?',
    choices: ['Choice', 'Upbringing'],
    twist: [
      'A new Sorting Hat puts many adults in a different House.'
    ],
    afterPrompt: 'Can something feel obvious just because you grew up with it?',
    hostPrompts: ['Does inherited mean false?', 'How do you test an inherited belief?']
  },
  {
    id: 11,
    title: 'BARBOSSA\'S RULEBOOK',
    vibe: 'evidence',
    scenario: [
      'Barbossa follows a pirate rule when it helps him.',
      'When the same rule hurts him, he says the rule is flexible.'
    ],
    prompt: 'Fair rule or convenient rule?',
    choices: ['Fair', 'Convenient'],
    twist: [
      'He changes the meaning twice in ten minutes, both times to benefit himself.'
    ],
    afterPrompt: 'Would you accept that standard if it worked against you?',
    hostPrompts: ['What makes an exception fair?', 'Do we change rules when we start losing?']
  },
  {
    id: 12,
    title: 'AVENGERS PRANK VOTE',
    vibe: 'evidence',
    scenario: [
      'The Avengers vote 5–1 to cover Thor in permanent glitter while he sleeps.'
    ],
    prompt: 'Does the vote make it okay: yes or no?',
    twist: [
      'Next week they vote 5–1 to delete your PlayStation saves for a joke.'
    ],
    afterPrompt: 'Same rule when you are the one losing?',
    hostPrompts: ['Does majority decide right and wrong?', 'Would your rule work if you were always the minority?']
  },
  {
    id: 13,
    title: 'THE BATMAN CLIP',
    vibe: 'pressure',
    scenario: [
      'A real video shows Batman throwing a man through a glass door.'
    ],
    prompt: 'Batman looks guilty: yes or no?',
    twist: [
      'The full clip shows the man was about to trigger a bomb.'
    ],
    afterPrompt: 'Can a real clip still give a false picture?',
    hostPrompts: ['What was missing?', 'How much does context matter?']
  },
  {
    id: 14,
    title: 'MORPHEUS\' BUTTONS',
    vibe: 'pressure',
    scenario: [
      'Morpheus gives you three buttons.',
      'Blue: $10,000. Green: settle every sports argument. Red: learn the true answer to one big question about your life.'
    ],
    prompt: 'Blue, green, or red?',
    choices: ['$10,000', 'Sports answers', 'One big truth'],
    twist: [
      'The red answer might prove something you enjoy or believe is wrong.'
    ],
    afterPrompt: 'Still picking the same button?',
    hostPrompts: ['Do you want truth or comfort?', 'Would your answer change if nobody knew?']
  },
  {
    id: 15,
    title: 'JURASSIC PARK PET',
    vibe: 'pressure',
    scenario: [
      'John Hammond offers you one free dinosaur for your backyard.'
    ],
    prompt: 'Take one or say no?',
    choices: ['Take one', 'No chance'],
    twist: [
      'You now need food, fencing, insurance, a vet, and a plan if it escapes.'
    ],
    afterPrompt: 'Possible does not always mean smart. Agree?',
    hostPrompts: ['What consequence matters most?', 'Do people ask “can I?” before “should I?”']
  },
  {
    id: 16,
    title: 'TONY\'S MYSTERY GADGET',
    vibe: 'pressure',
    scenario: [
      'Tony leaves a gadget behind. It charges phones, warms coffee, and opens jars.'
    ],
    prompt: 'Can you tell what Tony made it for: yes or no?',
    twist: [
      'Tony says its real purpose is detecting a deadly gas leak.'
    ],
    afterPrompt: 'Who knows its intended purpose best: user or maker?',
    choices: ['User', 'Maker'],
    hostPrompts: ['Is a useful side effect the same as purpose?', 'Who decides intended purpose?']
  },
  {
    id: 17,
    title: 'GTA GOD MODE',
    vibe: 'pressure',
    scenario: [
      'You turn on every GTA cheat: infinite health, weapons, cars, everything.'
    ],
    prompt: 'Inside GTA, are you basically all-powerful: yes or no?',
    twist: [
      'Your little brother pulls the console plug.'
    ],
    afterPrompt: 'Can you be ultimate if something outside you can shut everything off?',
    hostPrompts: ['Power or independence: which matters more?', 'What were your cheats depending on?']
  },
  {
    id: 18,
    title: 'PS5 EXPERT',
    vibe: 'pressure',
    scenario: [
      'A technician can explain every part of a PS5 and exactly how it works.'
    ],
    prompt: 'Has he explained everything about the PS5: yes or no?',
    twist: [
      'He cannot tell you why Sony chose to make it or what goal the designers had.'
    ],
    afterPrompt: 'Are “how?” and “why?” different questions?',
    hostPrompts: ['Can both questions be valid?', 'What can mechanics explain well?']
  },
  {
    id: 19,
    title: 'TRUMAN SHOW DEAL',
    vibe: 'deeper',
    scenario: [
      'You learn your life is a Truman Show set.',
      'Inside: no mortgage, no traffic, and the Leafs win the Cup every three years. There is one exit to the real world.'
    ],
    prompt: 'Stay or leave?',
    choices: ['Stay', 'Leave'],
    twist: [
      'Outside is normal life: bills, stress, bad weather, and real Leafs hockey.'
    ],
    afterPrompt: 'Would comfort make you stay in something you knew was fake?',
    hostPrompts: ['Does comfort change truth?', 'How much comfort could buy your silence?']
  },
  {
    id: 20,
    title: 'ONE RING FOR A WEEK',
    vibe: 'deeper',
    scenario: [
      'You get the One Ring for seven days, then must destroy it.'
    ],
    prompt: 'Use it or refuse it?',
    choices: ['Use it', 'Refuse it'],
    twist: [
      'Everyone corrupted by the Ring also thought they could handle it.'
    ],
    afterPrompt: 'Is “I know myself” enough evidence?',
    hostPrompts: ['What evidence about yourself matters?', 'Why is bias easier to see in other people?']
  },
  {
    id: 21,
    title: 'DOC BROWN\'S SCREEN TIME',
    vibe: 'deeper',
    scenario: [
      'Doc Brown shows you your phone from ten years in the future.',
      'It says you averaged six hours of screen time every day.'
    ],
    prompt: 'Happy with that future: yes or no?',
    twist: [
      'Doc says nothing forced it. Your current habits simply continued.'
    ],
    afterPrompt: 'If the habit stays, why would the result change?',
    hostPrompts: ['What habit grows quietly?', 'What result do you want without changing the cause?']
  },
  {
    id: 22,
    title: 'THE CLICK REMOTE',
    vibe: 'deeper',
    scenario: [
      'You get the remote from Click. It can skip anything boring.'
    ],
    prompt: 'Use it a lot or barely use it?',
    choices: ['Use it a lot', 'Barely use it'],
    twist: [
      'It starts skipping family moments and hard conversations because you often called them boring.'
    ],
    afterPrompt: 'Are boring and worthless the same thing?',
    hostPrompts: ['What boring thing matters later?', 'Can convenience train bad habits?']
  },
  {
    id: 23,
    title: 'SATURDAY BOSS FIGHT',
    vibe: 'deeper',
    scenario: [
      'Saturday morning: family wants you, work wants you, the gym wants you, and the boys have tickets.'
    ],
    prompt: 'Who gets your Saturday?',
    choices: ['Family', 'Work', 'Gym', 'Boys'],
    twist: [
      'At 4 p.m. you realize your phone got four hours instead.'
    ],
    afterPrompt: 'What actually controlled your day: your priorities or your attention?',
    hostPrompts: ['What steals time without being chosen?', 'What do your actions say matters most?']
  },
  {
    id: 24,
    title: 'TONY\'S $10,000 BET',
    vibe: 'finale',
    scenario: [
      'Tony Stark puts $10,000 on the table.',
      'Pick one opinion you strongly believe.'
    ],
    prompt: 'Can you name one fact that would make you change your mind: yes or no?',
    twist: [
      'If your answer is “nothing,” Tony keeps the money.'
    ],
    afterPrompt: 'Should a strong belief still be allowed to lose?',
    hostPrompts: ['What would actually change your mind?', 'Did any card tonight change an answer?']
  }
];

const CHAOS_MODIFIERS = [
  { name: 'LOKI MODE', text: 'Defend the opposite answer.' },
  { name: 'STARK RECEIPTS', text: 'Give one real piece of evidence.' },
  { name: 'CAP\'S STANDARD', text: 'Would you accept the same logic from the other side?' },
  { name: 'FURY CHECK', text: 'Where did this claim come from?' },
  { name: 'BANNER TEST', text: 'What fact would change your answer?' },
  { name: 'JARVIS', text: 'Define the most important word.' },
  { name: 'HAWKEYE', text: 'What fact would hurt your answer most?' },
  { name: 'BLACK WIDOW', text: 'What do you gain if your answer wins?' },
  { name: 'MJOLNIR', text: 'Give your single best reason.' },
  { name: 'COULSON', text: 'If you are right, what should follow?' }
];
