'use strict';

const PLOT_TWIST_CARDS = [
  {
    id: 1,
    title: 'JUSTIN HAMMER DEMO NIGHT',
    vibe: 'warm-up',
    scenario: [
      'Justin Hammer rents out Rogers Arena to prove his new combat drone is better than anything Tony Stark built.',
      'There are lasers, dancers, giant screens, a celebrity host, and 18,000 people chanting his name. Tony shows up late with one ugly little prototype that looks like it was assembled in a garage.'
    ],
    prompt: 'You have $1,000 to bet on one machine finishing the test course. Hammer or Stark?',
    twist: [
      'Hammer gives a ten-minute speech about how advanced his drone is. Tony says almost nothing.',
      'The test starts. Hammer’s drone freezes at obstacle two. Tony’s ugly prototype quietly finishes the course.'
    ],
    afterPrompt: 'Before the test, how much did the stage, confidence, crowd, and reputation actually prove?',
    hostPrompts: ['What evidence mattered before the machines moved?', 'Why are confident people so easy to believe?']
  },
  {
    id: 2,
    title: 'HULK\'S PURPLE PANTS THEORY',
    vibe: 'warm-up',
    scenario: [
      'Your friend pauses three different Hulk scenes and announces that he has solved Bruce Banner.',
      'Every time Hulk appears, purple pants are somehow still involved. Your friend says the pants are obviously causing the transformation.'
    ],
    prompt: 'How many Hulk appearances would it take before you start believing the pants are involved?',
    twist: [
      'Banner wears purple sweatpants for an entire peaceful Sunday and nothing happens.',
      'The next day he is wearing a white dress shirt, gets pushed too far, and you already know how that ends.'
    ],
    afterPrompt: 'What would you need before calling the pants a cause instead of a coincidence?',
    hostPrompts: ['What else happened before each transformation?', 'Where do people confuse “happened together” with “caused it”?']
  },
  {
    id: 3,
    title: 'LOKI\'S 30 WITNESSES',
    vibe: 'warm-up',
    scenario: [
      'Loki walks into the room and says Thor smashed your car.',
      'Then Loki creates 29 perfect copies of himself. All 30 Lokis point at Thor and tell the exact same story. Thor is standing alone saying, “It was not me.”'
    ],
    prompt: 'Thirty witnesses against one. How bad does this look for Thor?',
    twist: [
      'Nick Fury pulls up security footage. Loki smashed the car.',
      'The 30 witnesses were never 30 independent sources. They were one source repeated 30 times.'
    ],
    afterPrompt: 'When does “lots of people are saying it” actually become stronger evidence, and when is it just an echo?',
    hostPrompts: ['Would 300 Loki copies improve the evidence?', 'How do you tell many sources from one story repeated many times?']
  },
  {
    id: 4,
    title: 'NICK FURY\'S THREE FILES',
    vibe: 'warm-up',
    scenario: [
      'Nick Fury drops three files on the table about the same incident.',
      'File A is a dramatic 20-second clip with five million views. File B is a confident news breakdown. File C is two hours of ugly raw security footage with timestamps and no commentary.'
    ],
    prompt: 'Which file are you opening first if you actually need to know what happened?',
    twist: [
      'A and B are both based on C.',
      'Both edited out different parts because those parts made their story less dramatic.'
    ],
    afterPrompt: 'When everyone is arguing about a source, how often should you skip the argument and open the source itself?',
    hostPrompts: ['Why are summaries easier to consume than evidence?', 'What should make you trust a secondary source?']
  },
  {
    id: 5,
    title: 'CAPTAIN AMERICA GETS CALLED A BOOMER',
    vibe: 'warm-up',
    scenario: [
      'Someone leaves a mystery USB stick in Avengers Tower labelled “SECRET AVENGERS PAYROLL.”',
      'Steve Rogers says nobody should plug an unknown device into the network. Tony laughs that the guy from 1943 is giving cybersecurity advice.'
    ],
    prompt: 'Does Steve being hilariously behind on technology make his advice weaker?',
    twist: [
      'An intern plugs it in anyway because the label looks official.',
      'Every screen in the building locks and JARVIS spends the afternoon cleaning up the mess.'
    ],
    afterPrompt: 'Should an idea lose points because it sounds old-fashioned, or only because the reasoning behind it is bad?',
    hostPrompts: ['Can old advice survive new technology?', 'When does “that is outdated” actually answer an argument?']
  },
  {
    id: 6,
    title: 'WHO IS THE STRONGEST AVENGER?',
    vibe: 'warm-up',
    scenario: [
      'The argument starts exactly how you would expect.',
      'Thor says he is the strongest Avenger. Hulk looks offended. Tony says strength without intelligence is useless. Steve says the best Avenger is the one you can trust to lead the team.'
    ],
    prompt: 'Who wins the argument?',
    twist: [
      'JARVIS interrupts and asks one annoying question: “What does strongest mean?”',
      'Raw lifting power? Combat ability? Leadership? Intelligence? Durability? Suddenly half the disagreement was about four different definitions using the same word.'
    ],
    afterPrompt: 'How many arguments survive once everyone is forced to define the important word the same way?',
    hostPrompts: ['Pick one definition of strongest and answer again.', 'What words cause arguments because people quietly mean different things?']
  },
  {
    id: 7,
    title: 'DOM TORETTO\'S USED CIVIC',
    vibe: 'evidence',
    scenario: [
      'You are buying a used Civic. From a stranger on Marketplace, you want the Carfax, service records, cold start, inspection, and test drive.',
      'Then Dom Toretto appears, puts a hand on your shoulder, and says the seller is family.'
    ],
    prompt: 'Are you still doing the inspection?',
    twist: [
      'Everyone acts offended that you would inspect a family car.',
      'The mechanic finds a disabled check-engine light and brake work that absolutely should have been disclosed.'
    ],
    afterPrompt: 'Did knowing the seller justify a lower standard, or did it only make a lower standard feel nicer?',
    hostPrompts: ['When should trust change how much evidence you need?', 'Where do we use tougher standards on outsiders than on our own side?']
  },
  {
    id: 8,
    title: 'THE IKEA IRON MAN SUIT',
    vibe: 'evidence',
    scenario: [
      'Tony Stark releases a ridiculous flat-pack Iron Man suit. The box has 600 parts, three Allen keys, and a manual thicker than a phone book.',
      'Your friend says he has built enough IKEA furniture to figure it out without instructions.'
    ],
    prompt: 'How far are you letting him get before grabbing the manual?',
    twist: [
      'Annoyingly, he gets almost everything right.',
      'Then he installs the power cell in the wrong order. The manual has one boring sentence explaining that this exact mistake cooks the gauntlet.'
    ],
    afterPrompt: 'Does being good at figuring things out make the maker’s instructions unnecessary?',
    hostPrompts: ['What kind of knowledge does the maker have that the user may not?', 'When is experience enough, and when should you check the manual?']
  },
  {
    id: 9,
    title: 'INCEPTION: EVERYONE SAYS YOU\'RE AWAKE',
    vibe: 'evidence',
    scenario: [
      'You are sitting in a restaurant and something feels wrong.',
      'Fifty people around you insist you are obviously awake. Your closest friend agrees. The waiter laughs at you. Everyone looks completely sincere.'
    ],
    prompt: 'At what point does the crowd become enough to settle it?',
    twist: [
      'Your personal totem is behaving in the one way you know it should not behave in reality.',
      'Later you learn the fifty people were all part of the same constructed dream.'
    ],
    afterPrompt: 'If the crowd and your independent check disagree, what should decide which one gets more weight?',
    hostPrompts: ['When is consensus powerful evidence?', 'What makes an independent test independent?']
  },
  {
    id: 10,
    title: 'THE HOGWARTS HOUSE EXPERIMENT',
    vibe: 'evidence',
    scenario: [
      'Imagine Hogwarts does something stupid for 30 years: children are assigned a House as babies instead of when they arrive at school.',
      'Gryffindor families raise Gryffindors, Slytherin families raise Slytherins, and every child grows up hearing why their House sees the world correctly.'
    ],
    prompt: 'By age 30, how many people would think they independently figured out that their House is the best?',
    twist: [
      'A new Sorting Hat tests everyone from scratch.',
      'A huge number of adults belong in a different House than the one they spent their whole life defending.'
    ],
    afterPrompt: 'How do you tell the difference between a belief you reached and a belief that reached you first?',
    hostPrompts: ['Which beliefs feel like personality because you learned them early?', 'Does inheriting an idea make it false, true, or simply untested?']
  },
  {
    id: 11,
    title: 'BARBOSSA\'S VERY CONVENIENT CODE',
    vibe: 'evidence',
    scenario: [
      'Captain Barbossa has a pirate rulebook.',
      'Whenever a rule helps him, he treats it like sacred law. Whenever the same rule hurts him, he suddenly explains that the code is flexible and everyone is being too literal.'
    ],
    prompt: 'How many convenient exceptions before you stop calling this a rule?',
    twist: [
      'You catch him using opposite interpretations of the exact same rule within ten minutes.',
      'Both interpretations just happen to benefit Barbossa.'
    ],
    afterPrompt: 'What would a fair standard look like if you had to accept it even when it worked against you?',
    hostPrompts: ['When is an exception legitimate?', 'What rule do people suddenly reinterpret when they are the one losing?']
  },
  {
    id: 12,
    title: 'THE AVENGERS PRANK VOTE',
    vibe: 'evidence',
    scenario: [
      'The Avengers group chat votes 5–1 to replace Thor’s shampoo with permanent glitter dye while he sleeps.',
      'Everyone except Thor thinks it is hilarious. The majority has spoken.'
    ],
    prompt: 'Does a 5–1 vote make the prank fair?',
    twist: [
      'The next week the group votes 5–1 to factory-reset your PlayStation and delete every save file because they think your reaction will be hilarious.',
      'You are the one vote.'
    ],
    afterPrompt: 'If majority approval creates the rule, what argument do you have when the majority turns on you?',
    hostPrompts: ['Does popularity decide what is right?', 'Would your rule survive if you were always in the minority?']
  },
  {
    id: 13,
    title: 'THE DARK KNIGHT CLIP',
    vibe: 'pressure',
    scenario: [
      'A real security clip hits the internet showing Batman throwing a man through a glass door.',
      'No CGI. No deepfake. The clip is authentic. Everyone watching the twelve seconds reaches the same obvious conclusion.'
    ],
    prompt: 'If the video is genuine, how confident are you that the conclusion is genuine too?',
    twist: [
      'The full recording appears.',
      'Seconds earlier, the man grabbed a detonator and was about to trigger something. The twelve-second clip was real and still told a badly incomplete story.'
    ],
    afterPrompt: 'Can every piece of evidence shown to you be true while the picture built from those pieces is false?',
    hostPrompts: ['What was missing: facts or context?', 'How do you notice when someone selected only the part that helps them?']
  },
  {
    id: 14,
    title: 'MORPHEUS\' THREE BUTTONS',
    vibe: 'pressure',
    scenario: [
      'Morpheus puts three buttons on the table.',
      'Blue gives you $10,000. Green permanently settles every sports and movie argument you have ever had. Red gives you the correct answer to one major question about your life that you have never been able to settle.'
    ],
    prompt: 'Which button are you pressing?',
    twist: [
      'The red button comes with one warning: the answer may prove that something you enjoy, defend, or have built part of your identity around is wrong.',
      'Nobody else will ever know what the answer was.'
    ],
    afterPrompt: 'How much easier is truth-seeking when the answer cannot cost you anything?',
    hostPrompts: ['What kind of answer would make the blue button tempting?', 'What is the difference between wanting an answer and wanting your answer confirmed?']
  },
  {
    id: 15,
    title: 'JURASSIC PARK IN YOUR BACKYARD',
    vibe: 'pressure',
    scenario: [
      'John Hammond offers you one cloned dinosaur for free.',
      'Your choice. Triceratops, raptor, T-Rex, whatever. The technology works and the dinosaur is genuinely yours.'
    ],
    prompt: 'What are you picking?',
    twist: [
      'Hammond explains that “we can make it” was the easy question.',
      'Now you need insurance, food, fencing, a veterinarian, neighbours who do not hate you, and a plan for the first time your dinosaur ignores the fence.'
    ],
    afterPrompt: 'How often do people answer “Can we?” and quietly pretend they also answered “Should we?”',
    hostPrompts: ['What consequences should be considered before the exciting part?', 'Can something be possible and still be a terrible idea?']
  },
  {
    id: 16,
    title: 'TONY STARK\'S MYSTERY GADGET',
    vibe: 'pressure',
    scenario: [
      'Tony Stark leaves a strange metal gadget on your kitchen counter without explaining it.',
      'You discover it charges phones, keeps coffee warm, opens stubborn jar lids, and is heavy enough to stop a door. Everyone starts arguing about what Tony made it for.'
    ],
    prompt: 'How would you figure out its actual intended purpose?',
    twist: [
      'Tony returns and says every use you discovered is real but secondary.',
      'He designed the gadget to detect a dangerous gas leak before a human can smell it.'
    ],
    afterPrompt: 'Can users discover useful things about an object without being the best source for why it was made?',
    hostPrompts: ['Is “what I enjoy using it for” the same as “what it is for”?', 'Who is uniquely positioned to know the intended purpose?']
  },
  {
    id: 17,
    title: 'GTA INVINCIBLE MODE',
    vibe: 'pressure',
    scenario: [
      'You turn on every cheat in GTA.',
      'Infinite health. Unlimited weapons. Spawn any vehicle. Change the weather. Police cannot touch you. Inside Los Santos, you look basically unstoppable.'
    ],
    prompt: 'From the perspective of an NPC, are you the highest power in that world?',
    twist: [
      'Your little brother walks into the room and pulls the console plug.',
      'Then Rockstar patches the cheat. Your entire “unlimited power” existed only while a system outside the game allowed it.'
    ],
    afterPrompt: 'Can something be ultimate inside a system if it still depends on something beyond that system?',
    hostPrompts: ['What matters more: how much power you have or whether your power is dependent?', 'Does invincibility inside the game make the player independent of the console?']
  },
  {
    id: 18,
    title: 'THE PS5 TEARDOWN GUY',
    vibe: 'pressure',
    scenario: [
      'Your friend can explain a PlayStation 5 down to an absurd level.',
      'He knows the processor, memory, cooling, voltage, data flow, fan curves, controller signals, and exactly what happens electrically when you press the power button.'
    ],
    prompt: 'Has he completely explained the PS5?',
    twist: [
      'You ask why the console was made, why the controller has the layout it does, and what goal the designers were trying to achieve.',
      'He says those questions are unnecessary because he already explained the hardware.'
    ],
    afterPrompt: 'Does a complete explanation of how something operates automatically answer every question about why it exists?',
    hostPrompts: ['Can “how?” and “why?” both be valid questions?', 'What kind of question can a teardown answer, and what kind can it not answer by itself?']
  },
  {
    id: 19,
    title: 'THE TRUMAN SHOW PREMIUM PACKAGE',
    vibe: 'deeper',
    scenario: [
      'You discover your life is a Truman Show set.',
      'There is one exit door to the real world. But inside the set your mortgage is paid, traffic is light, every restaurant has a table, and the Leafs win the Stanley Cup every three years.'
    ],
    prompt: 'Are you still walking out?',
    twist: [
      'Outside the door is ordinary reality: bills, uncertainty, bad weather, and the Leafs return to being the Leafs.',
      'Inside is comfortable, but you now know the entire environment was built to keep you from asking what is outside.'
    ],
    afterPrompt: 'How comfortable would a false world have to become before you willingly stopped caring that it was false?',
    hostPrompts: ['Does comfort change truth or only motivation?', 'What would make someone defend the set after discovering the door?']
  },
  {
    id: 20,
    title: 'THE ONE RING: ONE WEEK ONLY',
    vibe: 'deeper',
    scenario: [
      'You get the One Ring for exactly seven days.',
      'You cannot keep it afterward. You can use it to fix one financial problem, get out of one embarrassing situation, or pull one legendary prank before destroying it.'
    ],
    prompt: 'Can you safely use it for one week?',
    twist: [
      'Every person in the room immediately explains why they personally would be disciplined enough to handle it.',
      'Unfortunately, nearly everyone who has ever been corrupted by the Ring also believed they would be the exception.'
    ],
    afterPrompt: 'When the thing being tested is your own judgement, how much should “I know myself” count as evidence?',
    hostPrompts: ['What evidence about yourself would you trust more than confidence?', 'Why do people notice bias more easily in everyone else?']
  },
  {
    id: 21,
    title: 'BACK TO THE FUTURE: SCREEN TIME 2036',
    vibe: 'deeper',
    scenario: [
      'Doc Brown takes you ten years into the future and hands you your phone.',
      'Your Screen Time report says you averaged six hours a day for the decade. You have watched thousands of videos, finished an unreasonable number of shows, and are still saving “life-changing” videos to Watch Later.'
    ],
    prompt: 'Is future-you going to be impressed with how current-you spent the time?',
    twist: [
      'Doc explains this future is not fixed.',
      'He did not show you a curse. He showed you the boring result of your current habits continuing without interruption.'
    ],
    afterPrompt: 'If a habit keeps producing the same direction, when does “I will deal with it later” stop being a plan?',
    hostPrompts: ['What small habit compounds hardest over ten years?', 'What outcome do people want while keeping the habits that prevent it?']
  },
  {
    id: 22,
    title: 'THE CLICK REMOTE',
    vibe: 'deeper',
    scenario: [
      'You get the remote from Click.',
      'You can fast-forward traffic, chores, workouts, boring meetings, awkward family events, waiting rooms, and any conversation that feels repetitive.'
    ],
    prompt: 'What are you fast-forwarding first?',
    twist: [
      'The remote learns your preferences.',
      'Eventually it starts skipping anything you repeatedly treated as “boring,” including moments that later turn out to be the ones you wish you had actually lived through.'
    ],
    afterPrompt: 'How good are we at judging which boring moments are actually worthless while we are inside them?',
    hostPrompts: ['What would younger-you fast-forward that current-you would keep?', 'Can constant convenience train you to avoid things that matter?']
  },
  {
    id: 23,
    title: 'THE FOUR BOSSES OF SATURDAY',
    vibe: 'deeper',
    scenario: [
      'Saturday morning gets ridiculous.',
      'Nick Fury wants you to answer a work emergency. Thor wants you at the gym. Dom Toretto wants you at the family barbecue. Tony Stark has box seats and says the boys are leaving in twenty minutes.'
    ],
    prompt: 'Who gets the Saturday?',
    twist: [
      'At 4 p.m. you realize you chose none of them.',
      'You spent four hours bouncing between YouTube, group chats, news, Marketplace, and one video explaining why you should stop wasting time on your phone.'
    ],
    afterPrompt: 'When your stated priorities and your actual attention disagree, which one is a better clue about what is really in charge?',
    hostPrompts: ['What wins your attention without ever being chosen?', 'What does a priority look like in behaviour instead of words?']
  },
  {
    id: 24,
    title: 'TONY STARK\'S $10,000 BET',
    vibe: 'finale',
    scenario: [
      'Tony Stark puts $10,000 on the table.',
      'To win it, pick one important opinion you defended tonight and name one specific piece of evidence that would genuinely make you change your mind.'
    ],
    prompt: 'Can you name the evidence without changing the subject?',
    twist: [
      'If your answer is “nothing could change my mind,” Tony keeps the money.',
      'If you can name a real condition and admit you would follow the evidence even if it embarrassed you, the money is yours.'
    ],
    afterPrompt: 'Which is harder: having a strong belief, or having a strong belief that is still allowed to lose?',
    hostPrompts: ['Which card tonight actually changed your answer?', 'What is one belief you are confident about but still willing to test?']
  }
];

// Chaos is a universal pressure-test. The MCU labels keep it playful, but every
// modifier applies to any card and tests the reasoning behind the current answer.
const CHAOS_MODIFIERS = [
  { name: 'LOKI MODE', text: 'For 30 seconds, defend the opposite answer as convincingly as you can. No deliberately weak version.' },
  { name: 'STARK RECEIPTS', text: 'Give one actual piece of evidence for your answer. Confidence, vibes, and “everyone knows” do not count.' },
  { name: 'CAP\'S STANDARD', text: 'Would you accept the exact same reasoning if it supported the other side instead?' },
  { name: 'FURY CHECK', text: 'What is the source of the claim you are relying on? How close is it to the original evidence?' },
  { name: 'BANNER TEST', text: 'Name one specific fact that would make you change your answer before this turns into a Hulk situation.' },
  { name: 'JARVIS: DEFINE IT', text: 'Pick the most important word in the argument and define exactly what you mean by it.' },
  { name: 'HAWKEYE BLIND SPOT', text: 'What relevant fact would hurt your answer the most if it turned out to be true?' },
  { name: 'BLACK WIDOW MOTIVE CHECK', text: 'What do you personally gain if your answer is right? That does not make you wrong, but it may explain a bias worth checking.' },
  { name: 'MJOLNIR', text: 'You get one reason only. Which single reason is strong enough to carry your whole answer?' },
  { name: 'COULSON CALLBACK', text: 'If your answer is actually true, what should logically follow from it in the real world?' }
];
