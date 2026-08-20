'use strict';

const PLOT_TWIST_CARDS = [
  {
    id: 1,
    title: 'MORPHEUS\' SECOND OFFER',
    vibe: 'mystery',
    scenario: [
      'Morpheus from The Matrix sits across from you. No red pill this time. He gives you one red button.',
      'Press it and you get the correct answer to the biggest questions you have about reality, purpose, death, right and wrong, and what actually matters. No riddles. No hallucination. You will know.'
    ],
    prompt: 'Pressing it?',
    twist: [
      'One answer proves a major belief you have held for years is wrong.',
      'Another means a part of your current lifestyle would be very hard to justify afterward. Nobody will ever know whether you pressed the button.'
    ],
    afterPrompt: 'Do you want the truth just as badly when the truth might cost you something?',
    hostPrompts: ['Which answer would you be most nervous to learn?', 'What would make someone prefer uncertainty over knowing?']
  },
  {
    id: 2,
    title: 'THE FOUR FAMILIES',
    vibe: 'late-night',
    scenario: [
      'Four babies are accidentally switched at birth.',
      'One grows up in a house that feels like The Fresh Prince of Bel-Air. One gets The Simpsons. One gets the Toretto family from Fast & Furious. One gets Harry Potter’s Dursleys.',
      'By 30, each has a completely different idea of what a normal family, successful life, good person, and sensible adult looks like.'
    ],
    prompt: 'How much of “normal” did each person actually choose?',
    twist: [
      'Years later, all four are shown the same strong evidence that challenges one major belief they learned at home.',
      'Three immediately say some version of: “That cannot be right. That is not how I was raised.”'
    ],
    afterPrompt: 'When upbringing and evidence collide, which one should get the final vote?',
    hostPrompts: ['Which beliefs are hardest to recognize as inherited?', 'Does familiarity make a belief more likely to be true?']
  },
  {
    id: 3,
    title: 'THE COUNTER-STRIKE ADMIN',
    vibe: 'mystery',
    scenario: [
      'It is 2009. You and the guys rent a Counter-Strike server.',
      'One admin has every permission players can see. He changes maps, rewrites rules, spawns gear, kicks anyone, bans anyone, and shuts the game down whenever he wants.',
      'He starts calling himself “the highest authority in this world.”'
    ],
    prompt: 'From inside the server, does his claim look reasonable?',
    twist: [
      'The hosting company can reset his password, remove every permission, delete the server, cut the hardware, or stop hosting him completely.',
      'He also has to keep paying them for his “world” to remain online.'
    ],
    afterPrompt: 'Can something be ultimate if its power and continued existence depend on something above it?',
    hostPrompts: ['What one fact settles this?', 'Is massive power the same thing as independence?']
  },
  {
    id: 4,
    title: 'TONY STARK\'S BLACK BOX',
    vibe: 'wild',
    scenario: [
      'Tony Stark drops a strange black box on your table and walks away before explaining it.',
      'You discover it charges a phone, warms a coffee, plays music, and makes a surprisingly good paperweight. Everyone starts arguing about what the box is “for.”'
    ],
    prompt: 'How would you decide its actual purpose?',
    twist: [
      'Tony comes back and says those are accidental side uses.',
      'He built it for one specific job: detecting a deadly gas leak before a human can smell it.'
    ],
    afterPrompt: 'If users can invent a hundred enjoyable uses, does that change what the maker actually designed it for?',
    hostPrompts: ['Can usefulness tell you purpose by itself?', 'Who is in the best position to explain why something was made?']
  },
  {
    id: 5,
    title: 'THE VIRAL CLIP',
    vibe: 'late-night',
    scenario: [
      'A 12-second clip goes viral. A guy you have never met looks arrogant, cruel, and obviously guilty.',
      'Millions of views. Thousands of comments. Your entire group chat agrees: “This guy is trash.”'
    ],
    prompt: 'How confident are you that you know what happened?',
    twist: [
      'The full four-minute video appears the next day.',
      'The 12 seconds were completely real, but the minute immediately before them changes the meaning of what he said.'
    ],
    afterPrompt: 'If every frame was authentic but your conclusion was wrong, what exactly did the viral clip prove?',
    hostPrompts: ['Can true pieces create a false picture?', 'How much should the crowd affect your confidence?']
  },
  {
    id: 6,
    title: 'YOUR ALGORITHM TWIN',
    vibe: 'late-night',
    scenario: [
      'You and a friend disagree about something important. Both of you say, “Bro, the evidence is everywhere.”',
      'You open YouTube, Instagram, Reddit, and Google. Your feeds are packed with people who sound informed and agree with you. His feeds are packed with people who sound informed and agree with him.'
    ],
    prompt: 'Whose internet is showing reality?',
    twist: [
      'You both open the original source everyone has been arguing about instead of clips discussing it.',
      'It turns out several confident creators on both sides left out important parts that hurt their own argument.'
    ],
    afterPrompt: 'When your feed has spent years learning what keeps you watching, what should outrank the feed?',
    hostPrompts: ['How often do you reach the primary source?', 'Could “everyone I see agrees” be a personalized illusion?']
  },
  {
    id: 7,
    title: 'THE BOSS VOICE NOTE',
    vibe: 'mystery',
    scenario: [
      'At 10 p.m. an unknown number sends you a WhatsApp voice note.',
      'It sounds exactly like your boss: “Do not come in tomorrow. Buy $3,000 in gift cards for a client tonight. I will reimburse you in the morning.”'
    ],
    prompt: 'What has to happen before you spend a dollar?',
    twist: [
      'The voice knows your nickname, mentions a private meeting from earlier that day, and sounds perfect.',
      'You also know convincing voice clones exist.'
    ],
    afterPrompt: 'What would actually verify the source instead of merely making the message look more convincing?',
    hostPrompts: ['Would you call a number you already trusted?', 'What makes testimony reliable?']
  },
  {
    id: 8,
    title: 'GOOGLE MAPS VS WAZE VS TOMTOM',
    vibe: 'mystery',
    scenario: [
      'You are driving home from a cabin at night with almost no signal and just enough gas for one wrong detour.',
      'Google Maps says turn north. Waze says south. An old TomTom says the connecting road does not exist.'
    ],
    prompt: 'Can all three directions be correct in the same sense?',
    twist: [
      'All three correctly show your current location, the lake, the highway, and most of the nearby roads.',
      'They still contradict each other on the exact turn that decides whether you get home.'
    ],
    afterPrompt: 'Does being right about many surrounding details erase a contradiction on the point that matters?',
    hostPrompts: ['What would you verify before moving?', 'Can two opposite directions both be right at the same time and in the same sense?']
  },
  {
    id: 9,
    title: 'THE MINECRAFT REDSTONE ROOM',
    vibe: 'wild',
    scenario: [
      'You start a brand-new Minecraft world on a private server nobody else has joined.',
      'Twenty minutes in, you find a giant underground redstone machine. Every circuit works. A sign on the wall has your gamer tag on it.'
    ],
    prompt: 'What is your first serious explanation?',
    twist: [
      'Your friend says: “Maybe the blocks just generated like that. Huge world, enough time, weird things happen.”',
      'You check the world-generation rules. They do not generate working redstone machines or personalized signs.'
    ],
    afterPrompt: 'At what point does appealing to randomness stop explaining what is actually in front of you?',
    hostPrompts: ['Which detail needs a cause beyond normal generation?', 'What would count as an explanation rather than a possibility?']
  },
  {
    id: 10,
    title: 'THE PS5 TEARDOWN',
    vibe: 'mystery',
    scenario: [
      'A hardware engineer tears down a PlayStation 5 and explains everything: the power supply, cooling, memory, processor, data flow, fan control, and exactly what happens when you press the power button.',
      'He can describe the physical mechanism better than anyone in the room.'
    ],
    prompt: 'Has he explained everything there is to explain about the PS5?',
    twist: [
      'You ask, “Why was this machine made in the first place, and who decided what it should do?”',
      'He replies, “I already explained the electricity and components. There is nothing left to ask.”'
    ],
    afterPrompt: 'Does explaining how a system operates automatically answer why it exists or where its purpose came from?',
    hostPrompts: ['Are “how?” and “why?” always the same question?', 'Can a mechanism be complete while a different kind of explanation is still missing?']
  },
  {
    id: 11,
    title: 'MIKE HOLMES VS THE REALTOR',
    vibe: 'choices',
    scenario: [
      'You are about to buy a house. The realtor says it is a steal and warns that ten other buyers are ready to waive inspection.',
      'Then Mike Holmes walks through, points at one foundation crack, and says, “I would not buy this until that is checked.”'
    ],
    prompt: 'Who gets more weight before you sign?',
    twist: [
      'The realtor has hundreds of five-star reviews and has sold houses for 20 years.',
      'Mike shows you moisture readings, movement around the crack, and exactly what he thinks needs testing.'
    ],
    afterPrompt: 'When status, experience, popularity, and evidence point in different directions, what should actually decide?',
    hostPrompts: ['When is expertise legitimate evidence?', 'Would ten competing offers make the crack disappear?']
  },
  {
    id: 12,
    title: 'THE ONE WRONG BELIEF',
    vibe: 'late-night',
    scenario: [
      'A machine scans your brain and prints one sentence:',
      '“One major thing you currently believe is completely wrong.”',
      'It refuses to tell you which belief.'
    ],
    prompt: 'What part of your life are you investigating first?',
    choices: ['Money', 'Marriage', 'Health', 'Politics', 'Parenting', 'Morality', 'Life purpose', 'Something else'],
    twist: [
      'The wrong belief entered your head before age 18.',
      'You cannot remember ever choosing it. You just heard it enough times that eventually it became part of “how the world works.”'
    ],
    afterPrompt: 'How do you test something that has always felt like common sense?',
    hostPrompts: ['What would you use as evidence against yourself?', 'Which beliefs have you never actually had to defend?']
  },
  {
    id: 13,
    title: 'THE COUSIN\'S CIVIC',
    vibe: 'choices',
    scenario: [
      'You are buying a used Civic on Marketplace.',
      'From a stranger, you demand service records, a Carfax, a cold start, an inspection, and a test drive. Fair enough.'
    ],
    prompt: 'Would you use the same checklist if the seller was your cousin?',
    twist: [
      'Your cousin says, “Come on, you know me. I would never screw you.”',
      'Later you learn the check-engine light was disabled before the sale.'
    ],
    afterPrompt: 'Did knowing the seller justify lowering the standard of evidence, or did it only make lowering it feel comfortable?',
    hostPrompts: ['When is trust relevant evidence?', 'Where else do we demand proof from strangers but accept “trust me” from our own side?']
  },
  {
    id: 14,
    title: 'SEAT 1A',
    vibe: 'late-night',
    scenario: [
      'You wake up in a luxury first-class seat on a plane. You do not remember boarding.',
      'The food is amazing. The seat turns into a bed. Your favourite movies are loaded. Wi-Fi works. Everyone keeps telling you to relax and enjoy it.'
    ],
    prompt: 'What are the first three things you would want to know?',
    twist: [
      'Every time you ask where the plane came from, where it is going, why you are on it, or what happens when it lands, someone hands you better food or puts on another movie.',
      'Nobody answers the questions.'
    ],
    afterPrompt: 'Can comfort make questions about origin, purpose, and destination stop mattering?',
    hostPrompts: ['How long would entertainment distract you?', 'Which question becomes impossible to ignore?']
  },
  {
    id: 15,
    title: 'THE FOUR BOSSES',
    vibe: 'wild',
    scenario: [
      'Your life somehow turns into The Office and four people believe they are your boss.',
      'Michael wants you at the party. Dwight wants you on an emergency safety drill. Corporate wants the report finished tonight. Your biggest client says ignore all three and fix his problem now.',
      'Each can reward you, punish you, or make tomorrow painful.'
    ],
    prompt: 'Who are you actually obeying?',
    twist: [
      'David Wallace calls and says only one of those people has final authority over your role. The others matter, but their demands are subordinate to his decision.',
      'Suddenly the conflict becomes much easier to sort.'
    ],
    afterPrompt: 'What happens to a person when several competing things all act like the final boss?',
    hostPrompts: ['What gets your obedience when priorities collide?', 'Can you have several ultimate priorities at once?']
  },
  {
    id: 16,
    title: 'JACK BAUER\'S LAST 24',
    vibe: 'late-night',
    scenario: [
      'You get the Jack Bauer clock: 24:00:00.',
      'You know with absolute certainty that when it hits zero, your life ends. You are healthy, awake, and cannot spend the time trying to stop it.'
    ],
    prompt: 'What are you doing with the first six hours?',
    twist: [
      'Your bank balance, job title, unread emails, online arguments, unfinished shows, and every thing you wanted to buy will still exist tomorrow.',
      'You will not.'
    ],
    afterPrompt: 'What just moved up your priority list, and what suddenly looks embarrassingly small?',
    hostPrompts: ['What would you regret not fixing?', 'Why do some priorities change only when time becomes visible?']
  },
  {
    id: 17,
    title: 'THE TRUMAN SHOW EXIT',
    vibe: 'mystery',
    scenario: [
      'You discover your life has a Truman Show problem. The town is staged, the news is curated, and some people around you have been steering what you believe.',
      'At the edge of the set is one real exit door.'
    ],
    prompt: 'Walking through it?',
    twist: [
      'Life inside is comfortable. Your job is secure. Your friends stay. Your routines stay.',
      'Outside, you get reality, but you may lose status, certainty, and some people who think leaving is stupid.'
    ],
    afterPrompt: 'How much comfort would it take to make you voluntarily stay inside something you knew was false?',
    hostPrompts: ['Does social cost change what is true?', 'Would you rather be comfortable and wrong or unsettled and right?']
  },
  {
    id: 18,
    title: 'THE GROUP CHAT VOTE',
    vibe: 'choices',
    scenario: [
      'A friend leaves his unlocked phone on the table. Someone in the guys’ chat says it is fine to read his messages because “if he has nothing to hide, who cares?”',
      'The group votes 9 to 1 that checking is acceptable.'
    ],
    prompt: 'Does the vote make it okay?',
    twist: [
      'The next week the same group votes 9 to 1 that your phone should be searched because you have been “acting suspicious.”',
      'Everyone repeats the exact argument you accepted last week.'
    ],
    afterPrompt: 'Does a rule become weaker when you are the one underneath it, or did your standard change?',
    hostPrompts: ['Would you accept your own principle from the other side?', 'Can popularity turn a wrong action into a right one?']
  },
  {
    id: 19,
    title: 'THE FORUM LEGEND',
    vibe: 'wild',
    scenario: [
      'Your car has a weird transmission problem. On an old enthusiast forum, a member with 42,000 posts says, “Trust me, these transmissions all do that. Drive it.”',
      'A brand-new account says the opposite.'
    ],
    prompt: 'Whose advice are you following?',
    twist: [
      'The new account posts the factory service manual, the exact pressure specification, a scan log from your model, and measurements showing yours is outside spec.',
      'The forum legend replies: “Bro, I have been here since 2004.”'
    ],
    afterPrompt: 'When does reputation stop being an argument?',
    hostPrompts: ['What should relevant expertise look like?', 'Can accomplishment replace evidence for the exact claim?']
  },
  {
    id: 20,
    title: 'THE LEAFS JERSEY',
    vibe: 'chaos',
    scenario: [
      'Your friend wears the same Leafs jersey during six straight wins.',
      'He now refuses to watch without it because, according to him, “the numbers do not lie.”'
    ],
    prompt: 'Are you letting him say the jersey is helping?',
    twist: [
      'They lose when he wears it: “I washed it wrong.”',
      'They win when he forgets it: “The luck carried over.” Every possible result somehow keeps the jersey theory alive.'
    ],
    afterPrompt: 'If no possible result could prove a claim wrong, what exactly is being tested?',
    hostPrompts: ['What evidence would actually connect the jersey to the score?', 'What would he have to see to change his mind?']
  },
  {
    id: 21,
    title: 'THE GOAT DEBATE',
    vibe: 'chaos',
    scenario: [
      'The room makes the terrible decision to settle the GOAT debate.',
      'One guy says Michael Jordan. One says LeBron. Someone brings up Kobe. Statistics are flying. Nobody is backing down.'
    ],
    prompt: 'What does “greatest” actually mean before the argument starts?',
    twist: [
      'You notice everyone keeps changing the definition whenever his favourite player loses a category.',
      '“Greatest means rings.” Then longevity. Then peak dominance. Then cultural impact. Then back to rings.'
    ],
    afterPrompt: 'Can an argument ever finish if the key word changes meaning every time the conclusion is threatened?',
    hostPrompts: ['What definition would everyone agree to before seeing the numbers?', 'How often do arguments survive only because a word keeps moving?']
  },
  {
    id: 22,
    title: 'THE SIDE HUSTLE',
    vibe: 'choices',
    scenario: [
      'You have spent two years and $20,000 building a side business.',
      'You like the idea. Your friends know about it. You have a logo, website, equipment, and a lot of pride tied to making it work.'
    ],
    prompt: 'How much evidence would you need before admitting the idea itself may be bad?',
    twist: [
      'After six months of proper testing, almost nobody will pay for it. A simpler idea you discovered last week is getting real customers immediately.',
      'The only strong argument for the old project is: “I have already put too much into this to quit.”'
    ],
    afterPrompt: 'Should yesterday’s investment decide tomorrow’s decision?',
    hostPrompts: ['What would you advise a friend in the same position?', 'When does persistence become ego protecting a sunk cost?']
  },
  {
    id: 23,
    title: 'THE SCREEN TIME RECEIPT',
    vibe: 'late-night',
    scenario: [
      'Someone asks what matters most to you. You answer quickly: family, health, becoming better, doing something meaningful with your life.',
      'Fair answer.'
    ],
    prompt: 'What would you expect your actual week to look like if that answer is true?',
    twist: [
      'Your phone prints a receipt for the last 52 weeks: hundreds of hours of short videos, feeds, sports clips, arguments, shows, and random scrolling.',
      'It also prints how much deliberate time went toward the things you said matter most.'
    ],
    afterPrompt: 'When stated beliefs and repeated behaviour disagree, which one better predicts the person you are becoming?',
    hostPrompts: ['What does a habit strengthen over five years?', 'What would have to change if the belief were more than a slogan?']
  },
  {
    id: 24,
    title: 'THE SIMPSONS PREDICTED IT',
    vibe: 'wild',
    scenario: [
      'Your friend sends you another compilation: “The Simpsons predicted the future AGAIN.”',
      'Smartwatches. Presidents. Technology. Weird headlines. The coincidences look creepy when they are edited together.'
    ],
    prompt: 'How strong is the case that the show somehow predicts future events?',
    twist: [
      'You are shown thousands of jokes, scenes, inventions, elections, disasters, products, and predictions from decades of episodes that never happened.',
      'The viral compilation was built only after looking backward and selecting the hits.'
    ],
    afterPrompt: 'How different does a pattern look when you see the misses instead of drawing the target around the hits?',
    hostPrompts: ['Was the pattern predicted first or found afterward?', 'What does the complete dataset do to the claim?']
  }
];

const CHAOS_MODIFIERS = [
  {
    name: 'FLIP IT',
    text: 'For 30 seconds, make the strongest possible case against your current answer. No cartoon version of the other side.'
  },
  {
    name: 'PROVE IT',
    text: 'What is the best actual evidence for your current answer? Separate evidence from intuition, popularity, and confidence.'
  },
  {
    name: 'LINE IN THE SAND',
    text: 'Name one specific fact that would make you change your answer. If nothing could, explain why your answer is impossible to test.'
  },
  {
    name: 'SAME STANDARD',
    text: 'Would you accept this exact reasoning if it supported the opposite side? If not, identify the relevant difference.'
  },
  {
    name: 'SOURCE CHECK',
    text: 'What are you trusting here: the claim, the evidence, the person saying it, the crowd repeating it, or the source behind it?'
  },
  {
    name: 'CAUSE CHECK',
    text: 'You have an outcome. What evidence shows the thing you named actually caused it instead of merely appearing beside it?'
  },
  {
    name: 'DEFINE IT',
    text: 'Pick the most important word in the argument. Define it in one sentence and keep that definition fixed for the rest of the card.'
  },
  {
    name: 'NO AUDIENCE',
    text: 'Imagine nobody you respect will ever know your answer. Same answer, or was social pressure doing part of the thinking?'
  },
  {
    name: 'ONE REASON',
    text: 'Delete every weak argument. What is the single strongest reason for your answer?'
  },
  {
    name: 'WHAT FOLLOWS?',
    text: 'Assume your answer is true. What would logically have to change in your behaviour, priorities, or next decision?'
  }
];
