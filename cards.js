'use strict';

const PLOT_TWIST_CARDS = [
  {
    id: 1,
    title: 'THE HAPPINESS CHIP',
    vibe: 'deeper',
    scenario: [
      'A Silicon Valley company launches MoodMax Pro: permanent calm, confidence, happiness, and fulfilment. No ads. No buffering. Apparently no bad Mondays either.',
      'It is safe and has no physical side effects. It also does not make you wiser, healthier, more loving, more skilled, or less likely to leave dishes in the sink. It only makes life feel amazing.'
    ],
    prompt: 'Installing it?',
    choices: ['Install it yesterday', 'Keep my weird brain'],
    twist: [
      'Ten years later you still feel incredible, but you have barely grown. Hard conversations were avoided, difficult skills were never learned, and responsibilities became easy to ignore because your brain keeps reporting: “Everything is fantastic, boss.”'
    ],
    afterPrompt: 'If feeling fulfilled and living a fulfilling life can split apart, which one should be in charge?',
    hostPrompts: ['Is happiness a feeling or a way of living?', 'Would you install it in someone you love?']
  },
  {
    id: 2,
    title: 'THE RED ENVELOPE',
    vibe: 'truth',
    scenario: [
      'A red envelope contains one completely accurate answer about a major belief or life choice you currently have wrong. No riddles, no inspirational quote, no “believe in yourself” nonsense. Just the answer.',
      'Opening it might cost you nothing. Or it might force you to admit you were wrong, change a comfortable habit, disappoint people you care about, or rethink years of confident speeches.'
    ],
    prompt: 'What happens to the envelope?',
    choices: ['Open it', 'Sudden fireplace accident'],
    twist: [
      'Nobody will ever know what you chose. There is no embarrassment for opening it and no punishment for destroying it. You cannot even post about how brave you were afterward.'
    ],
    afterPrompt: 'When truth has a price and there is no audience, how badly do you actually want it?',
    hostPrompts: ['What answer would you be nervous to find?', 'Can an uncomfortable truth become less true because it is inconvenient?']
  },
  {
    id: 3,
    title: 'THE PERFECT SATURDAY LOOP',
    vibe: 'funny',
    scenario: [
      'You can relive the best Saturday of your life every weekend. Perfect weather, favourite food, favourite people, zero chores, no traffic, and somehow every parking spot is directly in front of the entrance.',
      'You remember each previous Saturday, but the day itself repeats perfectly. Nothing ever goes wrong.'
    ],
    prompt: 'Taking the deal?',
    choices: ['Forever Saturday', 'I need variety'],
    twist: [
      'By Saturday 60 you know every joke before it lands, every meal tastes familiar, and you can predict exactly when someone will say, “This is the life.” Nothing got worse. Your reaction changed.'
    ],
    afterPrompt: 'If perfect pleasure eventually becomes normal, can “more of the same” ever finally become enough?',
    hostPrompts: ['What exciting thing in your life became normal?', 'Why does novelty matter so much to pleasure?']
  },
  {
    id: 4,
    title: 'BORN SOMEWHERE ELSE',
    vibe: 'identity',
    scenario: [
      'Two identical babies are separated at birth and raised in homes with opposite ideas about success, relationships, money, modesty, family, and what a normal adult life looks like.',
      'At 30, both are intelligent, both are confident, and both have somehow developed the facial expression of a man who says, “I think for myself.”'
    ],
    prompt: 'How much of their “common sense” did they actually choose?',
    choices: ['Most of it', 'Some of it', 'Very little'],
    twist: [
      'Neither remembers deciding many of their deepest assumptions. They mostly remember growing up around people who already treated those assumptions as obvious. Both are now considering starting podcasts about how everyone else is brainwashed.'
    ],
    afterPrompt: 'Being taught something does not make it false. So how do you separate truth from whatever your environment happened to hand you?',
    hostPrompts: ['Which beliefs feel too obvious to examine?', 'Would you believe the same things if you had been raised somewhere else?']
  },
  {
    id: 5,
    title: 'THE SELF-MADE MEDAL',
    vibe: 'absurd',
    scenario: [
      'A new race has one rule: every runner chooses their own starting line, distance, finish line, and definition of winning.',
      'One person runs 42 km. One runs 100 metres. One walks three steps toward the snack table. Everyone receives a gold medal. The organizer owns 900 medals and, suspiciously, zero stopwatches.'
    ],
    prompt: 'Did everyone actually win?',
    choices: ['Yes', 'No', '“Winning” is now decorative'],
    twist: [
      'The organizer says an outside standard would be unfair because somebody might discover they did not win. This is considered an unacceptable amount of negativity.'
    ],
    afterPrompt: 'If a standard can never tell you that you are wrong, is it guiding you or just congratulating you?',
    hostPrompts: ['Can achievement exist without a standard?', 'Where should standards come from when people disagree?']
  },
  {
    id: 6,
    title: 'THE APP THAT KNOWS YOU',
    vibe: 'modern-life',
    scenario: [
      'An app predicts your next video, meal, purchase, song, and news story with 96% accuracy. At this point it may know you want fries before you do.',
      'It also quietly arranges your options so the thing it wants you to choose appears first, looks popular, and requires the least effort.'
    ],
    prompt: 'Are the final choices completely yours?',
    choices: ['My thumb, my choice', 'Not completely'],
    twist: [
      'For one month the recommendation system is secretly turned off. Your choices noticeably change even though nobody told you anything changed. Your “personal taste” apparently needed a software update.'
    ],
    afterPrompt: 'If your environment can train your preferences, what does it take to call a preference genuinely your own?',
    hostPrompts: ['How would you separate preference from conditioning?', 'What do you choose only after someone puts it in front of you?']
  },
  {
    id: 7,
    title: 'THE 9–1 PHONE VOTE',
    vibe: 'group',
    scenario: [
      'Ten friends are hanging out. One guy leaves his unlocked phone on the table while he goes to the washroom.',
      'The group votes 9–1 that democracy has spoken and it is now perfectly acceptable to read his private messages aloud. Parliamentary procedure has never moved this quickly.'
    ],
    prompt: 'Does the vote make it okay?',
    choices: ['Majority rules', 'Absolutely not'],
    twist: [
      'Next weekend you leave your phone behind. The vote is again 9–1. Suddenly you have developed a passionate interest in minority rights.'
    ],
    afterPrompt: 'If being outvoted does not erase your rights, what exactly can a majority legitimately decide?',
    hostPrompts: ['Can popularity turn a wrong action into a right one?', 'Would your rule survive if you were always the 1?']
  },
  {
    id: 8,
    title: 'THE CONSENT CONTRACT',
    vibe: 'modern-life',
    scenario: [
      'On your 18th birthday, a company offers you $50,000 cash today for 20% of every dollar you earn for the rest of your life.',
      'A lawyer explains everything clearly. No deception. No pressure. You are legally an adult and fully agree. Congratulations: you are finally old enough to financially ruin 35-year-old you.'
    ],
    prompt: 'Is the deal fair because you freely agreed?',
    choices: ['I agreed, so yes', 'Not necessarily'],
    twist: [
      'At 35 you earn $200,000 a year and desperately regret it. The company responds with the most annoying sentence in human history: “Nobody forced you.”'
    ],
    afterPrompt: 'Does consent settle every question about whether a choice is good, fair, or wise?',
    hostPrompts: ['What does consent actually settle?', 'What important questions remain after consent is established?']
  },
  {
    id: 9,
    title: 'THE PERFECTLY LEGAL MAN',
    vibe: 'moral',
    scenario: [
      'A man follows every law. Taxes paid. Seatbelt on. Recycling sorted with terrifying precision. His criminal record is cleaner than his kitchen counter.',
      'He also lies to friends when useful, humiliates employees for entertainment, breaks promises whenever convenient, and ignores his family unless he needs something.'
    ],
    prompt: 'Good person?',
    choices: ['Technically yes?', 'Obviously no'],
    twist: [
      'He says, “If any of those things were truly wrong, the government would have made them illegal.” He then waits as if he has just ended morality forever.'
    ],
    afterPrompt: 'If legal and good are different categories, what standard are you using beyond the law?',
    hostPrompts: ['Name something legal that can still be wrong.', 'Can law create morality, or does law itself need judging?']
  },
  {
    id: 10,
    title: 'THE QUIET ROOM',
    vibe: 'modern-life',
    scenario: [
      'You get $1,000 for spending 24 hours alone in a comfortable room with good food, a bed, a shower, and a window.',
      'No phone, TV, music, books, games, work, conversation, or internet. Nothing painful happens. You are simply trapped with the one person you apparently keep trying to avoid: yourself.'
    ],
    prompt: 'Finishing the 24 hours?',
    choices: ['Easy money', 'Probably', 'I will befriend the ceiling'],
    twist: [
      'After four hours you are allowed to leave whenever you want. The only thing pushing you toward the door is boredom and the urge for stimulation. By hour six the pattern on the wall has a backstory.'
    ],
    afterPrompt: 'When low stimulation feels unbearable, are you using entertainment or depending on it?',
    hostPrompts: ['What would you reach for first?', 'What thoughts appear when nothing is distracting you?']
  },
  {
    id: 11,
    title: 'THE MOVING FINISH LINE',
    vibe: 'money',
    scenario: [
      'At 22 your friend says, “If I ever make $100,000 a year, I am set.” At $100,000 the number becomes $150,000. Then $250,000. Then a bigger house. Then a nicer car.',
      'Eventually he owns a watch that costs more than his first car and is still watching videos called “7 Signs You Are Falling Behind Financially.”'
    ],
    prompt: 'When will the next milestone finally be enough?',
    choices: ['The next one, surely', 'This game has no ending'],
    twist: [
      'Nothing is wrong with earning more. The strange part is that “enough” quietly moves every time he reaches it, like a finish line being dragged away by a golf cart.'
    ],
    afterPrompt: 'Can more satisfy you if your definition of enough changes whenever more arrives?',
    hostPrompts: ['What number once seemed huge to you?', 'What would a fixed definition of enough look like?']
  },
  {
    id: 12,
    title: 'THE MATRIX DEAL',
    vibe: 'pop',
    scenario: [
      'You can enter a simulation that feels completely real. Inside, you have the perfect career, perfect relationships, exciting travel, status, comfort, and somehow your favourite sports team finally stops rebuilding.',
      'Your real body is safe. Once connected, you forget the outside world and genuinely believe the simulated life is real.'
    ],
    prompt: 'Plug in forever?',
    choices: ['Give me the cable', 'Stay in reality'],
    twist: [
      'Inside you will probably feel happier than you do now. But nobody actually loves you, none of the achievements happened, and every amazing vacation was basically a very convincing loading screen.'
    ],
    afterPrompt: 'If pleasure and good feelings were enough by themselves, why should reality matter?',
    hostPrompts: ['What does reality add that a perfect feeling cannot?', 'Would you plug in someone you love?']
  },
  {
    id: 13,
    title: 'THE FUTURE-YOU LOAN',
    vibe: 'choices',
    scenario: [
      'A doctor offers a ridiculous deal. For five years you get incredible energy, recover instantly, sleep four hours, eat like a teenager, and wake up feeling like you have never heard of lower-back pain.',
      'The cost is ten healthy years removed from the end of your life. Guaranteed.'
    ],
    prompt: 'Take the five amazing years?',
    choices: ['Young me votes yes', 'Future me has lawyers'],
    twist: [
      'Your 60-year-old self is allowed to send one text before you sign. It says: “Please stop making decisions like I am a completely different guy.”'
    ],
    afterPrompt: 'Why should the desire of present-you automatically outrank the person your choices are creating?',
    hostPrompts: ['Do you owe anything to your future self?', 'Which current habits are really loans from later?']
  },
  {
    id: 14,
    title: 'SAME BODY, DIFFERENT RULE',
    vibe: 'modern-life',
    scenario: [
      'At a hotel, a woman accidentally opens her room door wearing only underwear. She instantly does the emergency cover-up manoeuvre and closes the door like the hallway is on fire.',
      'Twenty minutes later she is beside the pool in a bikini covering about the same amount of skin, completely relaxed.'
    ],
    prompt: 'What changed most?',
    choices: ['Her body', 'The setting', 'The people'],
    twist: [
      'Several of the exact same people from the hallway are now beside the pool. Her body barely changed. The amount covered barely changed. The social rule attached to the setting did.'
    ],
    afterPrompt: 'How many things feel naturally “normal” mainly because the surrounding culture has labelled the setting differently?',
    hostPrompts: ['Is context a meaningful difference here?', 'How do you tell a real distinction from a social habit you never examined?']
  },
  {
    id: 15,
    title: 'THE VALIDATION FRIEND',
    vibe: 'relationships',
    scenario: [
      'You have two close friends. Friend A responds to almost every decision with, “King, do what feels right. I support you.” Friend B loves you too but occasionally says, “Bro. This is a terrible idea.”',
      'Both are loyal. One is much easier to talk to when you are doing something stupid.'
    ],
    prompt: 'Which friend would you rather have?',
    choices: ['Always validate me', 'Risk hurting my feelings'],
    twist: [
      'You are about to make a decision that will seriously damage your life. Friend A sees it clearly but stays supportive because disagreement might upset you.'
    ],
    afterPrompt: 'Is making someone feel affirmed always the same thing as caring about them?',
    hostPrompts: ['When does kindness require disagreement?', 'Would you rather be comforted or corrected when the stakes are high?']
  },
  {
    id: 16,
    title: 'THE STUDY THAT AGREES WITH YOU',
    vibe: 'internet',
    scenario: [
      'A polished graphic appears in your feed: “NEW STUDY PROVES...” followed by a conclusion you already strongly agree with.',
      'It has a university logo, a dramatic chart, 300,000 shares, and enough tiny text at the bottom to make everybody decide reading the study is somebody else’s job.'
    ],
    prompt: 'Share it or check first?',
    choices: ['SEND TO GROUP CHAT', 'Read the boring PDF'],
    twist: [
      'The paper is real, but its conclusion is much narrower than the viral graphic. The graphic exaggerated exactly the part your side wanted to hear. The bar chart has committed emotional fraud.'
    ],
    afterPrompt: 'Do you demand the same quality of evidence from claims that flatter your beliefs as from claims that challenge them?',
    hostPrompts: ['Which side do you fact-check harder?', 'What would fair evidence standards look like?']
  },
  {
    id: 17,
    title: 'THE ONE FACT',
    vibe: 'truth',
    scenario: [
      'Pick one important belief you are very confident about.',
      'You get $10,000 if you can name one realistic fact, discovery, or piece of evidence that would make you admit the belief is wrong. No essays. No “depends what you mean.” No moving the goalposts into another postal code.'
    ],
    prompt: 'Can your belief lose?',
    choices: ['Yes, here is how', 'My belief is undefeated'],
    twist: [
      'If no possible evidence could ever count against it, then every future result can be reinterpreted to protect it. Congratulations: your belief has unlocked invincibility mode.'
    ],
    afterPrompt: 'If a belief is never allowed to lose, are you testing it or protecting it?',
    hostPrompts: ['What would genuinely change your mind?', 'Do you expect opponents to be more open to correction than you are?']
  },
  {
    id: 18,
    title: 'THE PERFECTLY TOLERANT CLUB',
    vibe: 'social',
    scenario: [
      'A club has one founding rule: everyone may speak, disagree, and argue without being silenced simply for having an unpopular opinion.',
      'A new member arrives with a metaphorical megaphone and spends every meeting demanding that everyone who disagrees with him lose the right to speak.'
    ],
    prompt: 'Can the club remove him?',
    choices: ['Remove him', 'Must tolerate him forever'],
    twist: [
      'If he succeeds, disagreement disappears. If the club stops him, he immediately announces, “WOW. So much for tolerance.” He has been waiting all week to say this.'
    ],
    afterPrompt: 'Can a principle survive if it refuses to defend the conditions that make the principle possible?',
    hostPrompts: ['Is every limit automatically hypocrisy?', 'What is the difference between tolerating disagreement and surrendering the rule itself?']
  },
  {
    id: 19,
    title: 'THE ENGINEER’S ANSWER',
    vibe: 'mystery',
    scenario: [
      'You find a bizarre machine in a warehouse. An engineer can explain every wire, gear, sensor, chemical reaction, and line of code inside it.',
      'He knows exactly how every component works. He has never met the designer and has absolutely no idea what job the machine was built to do.'
    ],
    prompt: 'Has he explained everything important?',
    choices: ['Basically yes', 'Something is missing'],
    twist: [
      'A label from the designer is found inside a panel: the machine is an emergency system designed to stop industrial birds from nesting inside airport equipment. Nobody had guessed this from admiring the gears.'
    ],
    afterPrompt: 'Can explaining exactly how something works automatically tell you what it is for?',
    hostPrompts: ['Are “how?” and “what for?” the same question?', 'Who is best placed to explain intended purpose?']
  },
  {
    id: 20,
    title: 'THE NO-REPUTATION YEAR',
    vibe: 'modern-life',
    scenario: [
      'For one year, nobody can see your car brand, clothing labels, job title, follower count, vacation photos, house, watch, phone, or anything else that signals status.',
      'You still own everything and can enjoy it privately. But your neighbour cannot know your watch costs $8,000, which is apparently a national emergency for some people.'
    ],
    prompt: 'Would your spending or goals change?',
    choices: ['A lot', 'A little', 'Not one dollar'],
    twist: [
      'The same rule applies to everyone. No audience, no flex, no likes, no subtle photo of the steering wheel with the logo accidentally occupying 40% of the frame.'
    ],
    afterPrompt: 'Which desires would remain if nobody could admire you for satisfying them?',
    hostPrompts: ['What do you want mainly because other people can see it?', 'Would invisible luxury still feel luxurious?']
  },
  {
    id: 21,
    title: 'THE CLICK REMOTE',
    vibe: 'pop',
    scenario: [
      'You get a remote that can fast-forward anything unpleasant or boring: traffic, chores, workouts, waiting rooms, paperwork, bad moods, awkward talks, and meetings that should have been emails.',
      'You stay safe and instantly arrive at the next enjoyable part. Humanity has finally defeated folding laundry.'
    ],
    prompt: 'How often are you pressing it?',
    choices: ['Button is worn out', 'Sometimes', 'Almost never'],
    twist: [
      'The remote learns your habits. Soon it skips hard conversations that would have repaired relationships, boring practice that would have built skill, and ordinary family moments you did not know you would miss.'
    ],
    afterPrompt: 'Could a life designed to remove discomfort also remove some of the things that give life depth?',
    hostPrompts: ['Which difficult thing became valuable only later?', 'Is all discomfort a problem to eliminate?']
  },
  {
    id: 22,
    title: 'THE ISLAND RULE',
    vibe: 'moral',
    scenario: [
      'You visit an island where every local agrees on one rule: cheating outsiders is acceptable, but cheating another local is wrong.',
      'The rule is legal, traditional, popular, and taught from childhood. A shop owner follows it perfectly and tricks you out of your life savings. Welcome to the island. Your wallet has been culturally enriched.'
    ],
    prompt: 'Was what happened actually wrong?',
    choices: ['Actually wrong', 'Only wrong by my values'],
    twist: [
      'Every local sincerely supports the rule. There is no secret resistance movement waiting to agree with you. Even the island’s motivational mugs say, “Locals First.”'
    ],
    afterPrompt: 'If an entire society can be wrong about a moral rule, what standard are you using to judge the whole society?',
    hostPrompts: ['Does agreement create right and wrong?', 'What would make a moral rule more than local preference?']
  },
  {
    id: 23,
    title: 'ONE YEAR LEFT',
    vibe: 'deeper',
    scenario: [
      'You learn with complete certainty that you have exactly one healthy year left. You cannot extend it and you are not allowed to tell anyone why your behaviour changes.',
      'Your job, bank account, notifications, subscriptions, 47 saved videos you will definitely “watch later,” grudges, relationships, purchases, and unfinished shows all still exist.'
    ],
    prompt: 'What changes first?',
    choices: ['People', 'Work', 'Money', 'Habits', 'Nothing'],
    twist: [
      'Nobody praises your new priorities because nobody knows. Your remaining time has simply become visible to you. The streaming service still asks, “Are you still watching?” with terrible timing.'
    ],
    afterPrompt: 'If knowing your time is limited changes what matters, why should not knowing the exact date make those priorities disappear?',
    hostPrompts: ['What suddenly looks trivial?', 'What would you regret spending another year avoiding?']
  },
  {
    id: 24,
    title: 'THE EXIT DOOR',
    vibe: 'finale',
    scenario: [
      'You discover your comfortable world has been carefully filtered around you. Your news agrees with you, your friends mostly agree with you, your entertainment keeps you occupied, and uncomfortable questions rarely survive long enough to ruin brunch.',
      'There is one exit door. Outside is unfiltered reality, but you may lose certainty, status, routines, relationships, or beliefs that currently make life comfortable.'
    ],
    prompt: 'Walk through?',
    choices: ['Open the door', 'Honestly, brunch sounds nice'],
    twist: [
      'You are guaranteed that whatever is outside is real. You are not guaranteed that you will like it. There are no reviews, no star rating, and no thirty-second explainer telling you what opinion to have first.'
    ],
    afterPrompt: 'When truth and comfort finally point in opposite directions, which one gets the final vote?',
    hostPrompts: ['What would make you stay?', 'Is wanting truth different from wanting truth only when it agrees with you?']
  }
];

const CHAOS_MODIFIERS = [
  {
    name: 'LAWYER UP',
    text: 'Defend the answer you did NOT choose like somebody is paying you an unreasonable hourly rate.'
  },
  {
    name: 'SOURCE OF VIBES',
    text: 'Where did your first instinct actually come from: evidence, experience, family, friends, media, habit, or pure vibes?'
  },
  {
    name: 'ONE FACT OR BUST',
    text: 'Name one new fact that would genuinely make you switch your answer. “Nothing” is an answer, but it is a very interesting one.'
  },
  {
    name: 'SAME ENERGY',
    text: 'Would you accept the exact same reasoning if it helped the other side instead of yours? No jersey changes allowed.'
  },
  {
    name: 'NO AUDIENCE MODE',
    text: 'Nobody will ever know what you chose. No praise. No shame. No screenshot. Does your answer change?'
  },
  {
    name: 'PUT A PRICE ON IT',
    text: 'What is the largest real cost you would accept before abandoning your answer? Give a number or consequence.'
  },
  {
    name: 'FAST-FORWARD 10 YEARS',
    text: 'Imagine everyone lives by your answer for ten years. Does society still look functional, or are we all living in a parking lot?'
  },
  {
    name: 'DEFINE YOUR WORDS',
    text: 'Pick the most important word in the argument, define it clearly, and do not quietly change the definition when you start losing.'
  },
  {
    name: 'WHAT ARE YOU PROTECTING?',
    text: 'If changing your answer feels uncomfortable, what exactly would you lose: comfort, status, identity, relationships, or the joy of saying “I told you so”?'
  },
  {
    name: 'SHOW RECEIPTS',
    text: 'What are you actually relying on: evidence, one person, a crowd, familiarity, intuition, or a screenshot your cousin sent you?'
  },
  {
    name: 'REMOVE THE REWARD',
    text: 'Delete money, pleasure, praise, status, likes, and approval. Would you still choose the same thing?'
  },
  {
    name: 'BET $10,000',
    text: 'If being wrong cost you $10,000 tonight, what would you verify before locking in your answer? Suddenly research feels exciting.'
  }
];
