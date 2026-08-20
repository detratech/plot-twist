'use strict';

const PLOT_TWIST_CARDS = [
  {
    id: 1,
    title: 'TELEPORT SNEEZE',
    vibe: 'chaos',
    scenario: [
      'You get $5 million, tax-free. The money is real and yours forever.',
      'The catch: every time you sneeze, you instantly teleport to a random spot somewhere within 50 km.'
    ],
    prompt: 'You have ten seconds. Taking the deal?',
    twist: [
      'Your phone, wallet, keys, and whatever you were carrying stay behind.',
      'And if you sneeze again before getting home, the next 50 km starts from wherever you landed.'
    ],
    afterPrompt: 'Still worth $5 million, or did control over your own life just become too expensive?',
    hostPrompts: ['What is the first rule you would make for yourself?', 'How much money would make you accept this permanently?']
  },
  {
    id: 2,
    title: 'MIND READER',
    vibe: 'wild',
    scenario: [
      'You can read one person’s mind for ten minutes every day.',
      'You choose the person. They cannot block you. You hear exactly what they are thinking.'
    ],
    prompt: 'Do you take the power, and whose mind are you reading first?',
    twist: [
      'The moment you enter someone else’s mind, they can hear yours just as clearly.',
      'They do not get a warning first.'
    ],
    afterPrompt: 'Still using it, or does the power stop being attractive when privacy becomes equal?',
    hostPrompts: ['Whose thoughts would you be most afraid to hear?', 'Would you use this on someone you love?']
  },
  {
    id: 3,
    title: 'THE BABY MIX-UP',
    vibe: 'late-night',
    scenario: [
      'A hospital makes a ridiculous mistake. Four babies go home with four completely different families in four different parts of the world.',
      'Different languages. Different rules. Different ideas about success, family, right and wrong, and what a “normal life” looks like.',
      'Twenty-five years later, all four meet.'
    ],
    prompt: 'How much of who they became do you think came from them, and how much came from where they landed?',
    twist: [
      'All four are intelligent, decent people.',
      'All four are also completely certain that the way they grew up seeing life is just “obviously normal.”'
    ],
    afterPrompt: 'When four smart people all say “obviously” and mean different things, how much should confidence impress you?',
    hostPrompts: ['What would be hardest for each person to question?', 'What do you believe mostly because everyone around you treated it as normal?']
  },
  {
    id: 4,
    title: 'FREE FOOD FOREVER',
    vibe: 'choices',
    scenario: [
      'Every meal is free for the rest of your life. Restaurants, groceries, snacks, takeout, all of it.',
      'You will never spend another dollar on food.'
    ],
    prompt: 'Signing up?',
    twist: [
      'A mystery chef chooses every meal. You do not know what is coming until it is in front of you.',
      'You may refuse a meal once. Refuse twice and the free-food deal disappears forever.'
    ],
    afterPrompt: 'How much choice would you give up to never pay for food again?',
    hostPrompts: ['What meal makes you use your first refusal?', 'Do you value free more than control?']
  },
  {
    id: 5,
    title: 'THE RED BUTTON',
    vibe: 'mystery',
    scenario: [
      'Deep in the forest you find a ridiculous red button on a metal stand.',
      'The sign beside it says: “Press once and learn the real answer to every major mystery about life.”',
      'No tricks. It actually works.'
    ],
    prompt: 'Pressing it?',
    twist: [
      'The button does not force you to do anything afterward.',
      'But once you know the answers, you cannot honestly tell yourself you did not know. Some answers could cost you habits, comfort, status, or relationships.'
    ],
    afterPrompt: 'Do you still want every answer if knowing could make your current life harder?',
    hostPrompts: ['Which answer would you be most nervous to learn?', 'Is there any truth you would rather not know?']
  },
  {
    id: 6,
    title: 'THE IMPOSSIBLE CABIN',
    vibe: 'mystery',
    scenario: [
      'You hike for hours into untouched wilderness. No road, no trail, no footprints, no sign that anyone has been there.',
      'Then you find a perfect cabin. Fire burning. Soup hot. Beds made. Dry firewood stacked.',
      'Each bed has one of your names written above it.'
    ],
    prompt: 'What explanation are you betting on?',
    twist: [
      'One friend says, “Nobody had to prepare this. Given enough time, forests do weird stuff.”',
      'Another says, “Whatever happened, it somehow produced a cabin prepared specifically for us.”'
    ],
    afterPrompt: 'What would an explanation have to account for before you would call it good enough?',
    hostPrompts: ['Which detail is hardest to explain away?', 'When does “it happened somehow” stop being an explanation?']
  },
  {
    id: 7,
    title: 'INVISIBILITY',
    vibe: 'chaos',
    scenario: [
      'You can turn completely invisible whenever you want.',
      'No cooldown. No limit. One thought and you disappear.'
    ],
    prompt: 'What is the first thing you use it for?',
    twist: [
      'Your clothes and anything you carry stay visible.',
      'Also, while invisible, light passes through your eyes too. You are completely blind until you turn visible again.'
    ],
    afterPrompt: 'Still a superpower, or just an extremely dangerous party trick?',
    hostPrompts: ['Best useful use you can still think of?', 'Would you risk using it outdoors?']
  },
  {
    id: 8,
    title: 'THE ULTIMATE BOSS',
    vibe: 'wild',
    scenario: [
      'Your group has to design the most ridiculously powerful final boss possible.',
      'The rule is simple: this character is supposed to be above everything else in the game.'
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
    prompt: 'Which of these weaknesses immediately wreck the idea that he is truly “ultimate”?',
    twist: [
      'The game engine lets you delete only three weaknesses. The other five stay forever.'
    ],
    afterPrompt: 'Which three absolutely must go, and can you still honestly call what remains “ultimate”?',
    hostPrompts: ['Which weakness does the most damage?', 'Can something be ultimate if it depends on something else?']
  },
  {
    id: 9,
    title: 'THE THREE MAPS',
    vibe: 'mystery',
    scenario: [
      'You are lost in the woods and daylight is disappearing.',
      'Map A says camp is north. Map B says camp is south. Map C says the campsite never existed.',
      'You have enough daylight to follow only one.'
    ],
    prompt: 'Can all three maps somehow be right, and which one are you trusting with the walk back?',
    twist: [
      'All three correctly show the river, the mountain, several trails, and your current location.',
      'They still completely disagree about the one thing you actually need.'
    ],
    afterPrompt: 'How much correct information can a map contain and still be wrong where it matters most?',
    hostPrompts: ['What would you check before committing to a direction?', 'Does “mostly accurate” settle the contradiction?']
  },
  {
    id: 10,
    title: 'PERFECT MEMORY',
    vibe: 'choices',
    scenario: [
      'You gain perfect memory. Names, faces, conversations, dates, directions, everything.',
      'Nothing ever fades again.'
    ],
    prompt: 'Taking it?',
    twist: [
      'Bad memories stay just as vivid as good ones.',
      'Embarrassment, grief, betrayal, and every stupid thing you ever said can return with the same detail years later.'
    ],
    afterPrompt: 'Is forgetting always a weakness, or is some forgetting part of being able to move on?',
    hostPrompts: ['Which memory would you most want to keep perfectly?', 'Which one are you grateful became blurry?']
  },
  {
    id: 11,
    title: 'THE MYSTERY BOSS TEXT',
    vibe: 'mystery',
    scenario: [
      'An unknown number texts you: “Hey. It’s your boss. Do not come to work for three months. Full pay. Also, you are getting a $50,000 bonus.”',
      'You need to decide tonight whether to show up tomorrow.'
    ],
    prompt: 'What would you need before you actually trusted the message?',
    twist: [
      'The sender knows your boss’s full name, uses the company logo, knows private workplace details, and sends a photo from inside the office.',
      'Everything looks right. You still have not contacted your boss through any number you already trusted.'
    ],
    afterPrompt: 'At what point does a convincing message become enough, and when would you still verify the source directly?',
    hostPrompts: ['What evidence would actually settle it for you?', 'Can something look authentic without being authentic?']
  },
  {
    id: 12,
    title: 'THE SECRET SPONSOR',
    vibe: 'late-night',
    scenario: [
      'Someone secretly pays for your entire camping trip. Gas. Food. Gear. Campsite. Everything.',
      'At the end, another person who paid for nothing stands up and accepts everyone’s thanks like they funded the whole thing.'
    ],
    prompt: 'Do you correct the group?',
    twist: [
      'The real sponsor quietly tells you, “Do not tell anyone it was me. I do not want public credit.”',
      'The other person keeps taking the applause.'
    ],
    afterPrompt: 'Can you respect the real sponsor’s privacy without letting gratitude land on the wrong person?',
    hostPrompts: ['Why does proper credit matter if the real person wants no attention?', 'Is private thanks enough?']
  },
  {
    id: 13,
    title: 'NEVER NEED SLEEP',
    vibe: 'wild',
    scenario: [
      'You never need sleep again. You stay completely healthy, alert, and rested 24 hours a day.',
      'You effectively gain eight extra waking hours every night.'
    ],
    prompt: 'What are you doing with all that extra life?',
    twist: [
      'Everyone else still sleeps.',
      'After five years, you have spent roughly 14,600 extra hours awake while your family, friends, and most of the world were unavailable.'
    ],
    afterPrompt: 'Does extra time automatically make life better if most of it is time you cannot share?',
    hostPrompts: ['Would you use the hours to get ahead or just feel alone?', 'What makes time valuable to you?']
  },
  {
    id: 14,
    title: 'THE $50,000 MACHINE',
    vibe: 'choices',
    scenario: [
      'You buy a ridiculous $50,000 camping machine that purifies water, generates electricity, cooks food, heats your shelter, and controls half the campsite.',
      'The maker’s instruction manual is sitting beside it.'
    ],
    prompt: 'Who gets final say on how this thing is operated?',
    twist: [
      'Your friend has never seen the machine before, refuses to read the manual, and says, “Relax. I understand machines.”',
      'Annoyingly, he guesses the first four controls correctly. The fifth control is the emergency pressure release.'
    ],
    afterPrompt: 'Do four confident successes make him the person you trust on the dangerous fifth one?',
    hostPrompts: ['What matters more here: confidence, past luck, or knowing the design?', 'When should you defer to instructions instead of instinct?']
  },
  {
    id: 15,
    title: 'THE ANIMAL FIGHT',
    vibe: 'chaos',
    scenario: [
      'You have to fight one of these and you cannot run away:',
      'One horse-sized duck, or one hundred duck-sized horses.'
    ],
    prompt: 'Pick your opponent and explain your strategy before anyone talks you out of it.',
    twist: [
      'The tiny horses move as one coordinated team and know how to flank.',
      'The giant duck is terrified of bread. You have exactly one hamburger bun.'
    ],
    afterPrompt: 'Switching opponents, or doubling down on your original plan?',
    hostPrompts: ['What is the first ten seconds of your plan?', 'Which option sounded easier before you had details?']
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
    prompt: 'A or B? No third option.',
    twist: [
      'In option B, your closest friends and family are against you too.',
      'Nobody finds out you were right for twenty years, and when they finally do, you get no credit for it.'
    ],
    afterPrompt: 'If being right brings you no approval, no reward, and years of social pressure, is being right still enough?',
    hostPrompts: ['How much would social pressure change your confidence?', 'Do you want truth, or do you want to feel confirmed?']
  },
  {
    id: 17,
    title: 'FAMOUS FOREVER',
    vibe: 'chaos',
    scenario: [
      'You wake up world-famous and $20 million richer.',
      'People recognize you everywhere. Doors open. You never worry about money again.'
    ],
    prompt: 'Taking that life?',
    twist: [
      'You are famous because of a seven-second video showing the most embarrassing moment of your life.',
      'Every good thing you do gets described as “that thing the embarrassing-video person did.” The internet never moves on.'
    ],
    afterPrompt: 'How much money is permanent public humiliation actually worth to you?',
    hostPrompts: ['Would the answer change if the clip was misleading?', 'How much of your identity should other people’s opinion control?']
  },
  {
    id: 18,
    title: 'THE ONE WRONG BELIEF',
    vibe: 'late-night',
    scenario: [
      'A machine scans your brain and prints one sentence:',
      '“One major thing you currently believe is completely wrong.”',
      'It refuses to tell you which one.'
    ],
    prompt: 'What part of your life are you investigating first?',
    choices: ['Money', 'Relationships', 'Health', 'Politics', 'Morality', 'Life purpose', 'Something else'],
    twist: [
      'The wrong belief is something you learned in childhood and have almost never questioned.',
      'It also affects a real decision you still make regularly.'
    ],
    afterPrompt: 'How do you seriously test a belief that feels too normal to even notice?',
    hostPrompts: ['Which belief would be most costly to discover late?', 'What is one belief you inherited rather than chose?']
  },
  {
    id: 19,
    title: 'THE RESET BUTTON',
    vibe: 'late-night',
    scenario: [
      'You restart your life from age five, but you keep everything you know right now.',
      'You remember every mistake, every lesson, and every person.'
    ],
    prompt: 'What is the first thing you deliberately do differently?',
    twist: [
      'You are allowed to keep only three beliefs or habits from your original upbringing without re-examining them.',
      'Everything else has to earn its way back into your life from scratch.'
    ],
    afterPrompt: 'Which three survive automatically, and what would you refuse to copy again just because it felt familiar?',
    hostPrompts: ['What would you keep exactly the same?', 'What belief deserves a fresh trial?']
  },
  {
    id: 20,
    title: 'CLONE ROOMMATE',
    vibe: 'wild',
    scenario: [
      'A perfect clone of you walks into your house.',
      'Same face. Same voice. Same memories. Same private jokes. Same annoying habits. The clone insists that you are the clone.'
    ],
    prompt: 'You have five minutes to prove you are the original. What do you use?',
    twist: [
      'DNA, fingerprints, photos, passwords, and childhood memories all match perfectly.',
      'One member of your family hears both of you speak and genuinely cannot tell who is who.'
    ],
    afterPrompt: 'If every obvious proof can be copied, what actually makes you you?',
    hostPrompts: ['Who gets your bedroom?', 'What could the clone never copy if anything?']
  },
  {
    id: 21,
    title: 'THE LAST 24 HOURS',
    vibe: 'late-night',
    scenario: [
      'You somehow know with absolute certainty that you have exactly 24 hours left.',
      'You feel completely healthy. Nothing hurts. Tomorrow, you are simply gone.'
    ],
    prompt: 'What are you doing tonight, and who absolutely has to be part of it?',
    twist: [
      'You cannot spend the day trying to prevent what is coming.',
      'Every unfinished work task, unread notification, argument you were trying to win, and thing you were saving “for later” suddenly has only the value you choose to give it today.'
    ],
    afterPrompt: 'What suddenly matters more, and what turns out to have been stealing time from you?',
    hostPrompts: ['Who do you need to speak to?', 'What would you be embarrassed to spend your final hour doing?']
  },
  {
    id: 22,
    title: 'PAUSE BUTTON',
    vibe: 'chaos',
    scenario: [
      'You get a remote that freezes the entire world except you.',
      'You can walk around, think, read, eat, and move things while everyone else is paused.'
    ],
    prompt: 'What is your first use?',
    twist: [
      'You keep aging while the world is frozen.',
      'Every hour you pause comes directly out of your own lifespan. Nobody else loses a second.'
    ],
    afterPrompt: 'What is important enough that you would literally spend part of your life to get extra time for it?',
    hostPrompts: ['Would you waste any of it on a prank?', 'What would be worth a full year of paused time?']
  },
  {
    id: 23,
    title: 'THE LUCKY HOODIE',
    vibe: 'mystery',
    scenario: [
      'Your friend wears the same hoodie to five hockey games. His team wins all five.',
      'He now refuses to watch without it because the hoodie is “clearly doing something.”'
    ],
    prompt: 'Funny superstition, or are you giving the hoodie even a tiny bit of credit?',
    twist: [
      'Game six: he forgets the hoodie. The team wins 8–0.',
      'Game seven: he wears it again. They lose badly. He says, “That does not count. The hoodie cannot win every time.”'
    ],
    afterPrompt: 'What result would actually make him admit the hoodie was never causing anything?',
    hostPrompts: ['Can a belief survive every possible outcome?', 'What evidence would genuinely change his mind?']
  },
  {
    id: 24,
    title: 'INSTANT EXPERT',
    vibe: 'wild',
    scenario: [
      'You can instantly become world-class at one skill. Surgery, flying, cooking, coding, music, mechanics, anything.',
      'Your ability is real. You genuinely know what you are doing.'
    ],
    prompt: 'What skill are you taking?',
    twist: [
      'You get the skill but none of the history. No degree, no certificate, no years of training, no reputation.',
      'During an emergency, you know the certified expert in the room is making a dangerous mistake. Everyone trusts them, not you.'
    ],
    afterPrompt: 'How would you prove you should be trusted without just saying “I know better”?',
    hostPrompts: ['What should matter more than confidence?', 'How would you tell a real expert from a convincing fake?']
  }
];

const CAMPFIRE_RUN_IDS = [1, 2, 3, 7, 5, 6, 15, 8, 9, 17, 11, 12, 19, 21];

// Chaos is a universal pressure-test mechanic. Every modifier is written to work
// with any card, whether the current answer is a preference, prediction, explanation,
// or factual claim.
const CHAOS_MODIFIERS = [
  {
    name: 'FLIP IT',
    text: 'For 30 seconds, make the strongest possible case against your current answer. No weak version of the other side.'
  },
  {
    name: 'LINE IN THE SAND',
    text: 'Name one specific new fact that would make you change your current answer. If nothing could, say that out loud.'
  },
  {
    name: 'CONFIDENCE CHECK',
    text: 'Give your current answer a confidence score from 0 to 100. What keeps it from being 100?'
  },
  {
    name: 'NO AUDIENCE',
    text: 'Imagine nobody you know will ever find out what you chose or what you said. Same answer?'
  },
  {
    name: 'RESPECTED OPPOSITION',
    text: 'Someone you genuinely respect chooses the opposite answer. What is the first question you ask them before deciding they are wrong?'
  },
  {
    name: 'WORST CASE',
    text: 'Assume your current choice leads to the worst reasonable outcome. Do you still own the choice, or are you switching?'
  },
  {
    name: 'SWITCH SIDES',
    text: 'Pick someone who disagrees with you. Each of you must argue the other person’s position better than they did.'
  },
  {
    name: 'ONE REASON',
    text: 'Strip away every extra argument. What is the single strongest reason for your current answer?'
  },
  {
    name: 'WHAT WOULD IT TAKE?',
    text: 'What would have to become true for the opposite answer to become the better choice? Be specific.'
  },
  {
    name: 'LOCK IT IN',
    text: 'No “it depends,” no extra options. Everyone commits to one current answer and gives one sentence defending it.'
  }
];
