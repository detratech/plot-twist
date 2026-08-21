'use strict';

const PLOT_TWIST_CARDS = [
  {
    id: 1,
    title: 'THE HAPPINESS CHIP',
    vibe: 'deeper',
    scenario: [
      'A new brain chip can make you feel calm, happy, confident, and fulfilled almost every waking hour. It is safe, legal, and has no physical side effects.',
      'It does not make you healthier, wiser, more skilled, more loving, or more useful. It only guarantees the feeling that your life is going great.'
    ],
    prompt: 'Would you install it?',
    choices: ['Install it', 'No'],
    twist: [
      'Ten years later you still feel fantastic, but you have barely grown. Difficult relationships were ignored, hard skills were never learned, and responsibilities became easy to avoid because nothing feels wrong anymore.'
    ],
    afterPrompt: 'If feeling fulfilled and living a fulfilling life can come apart, which one should lead?',
    hostPrompts: ['Is happiness a feeling or a way of living?', 'Would you want the chip for someone you love?']
  },
  {
    id: 2,
    title: 'THE RED ENVELOPE',
    vibe: 'truth',
    scenario: [
      'A sealed envelope contains one completely accurate answer about a major belief or life choice you currently have wrong.',
      'Opening it may cost you nothing. Or it may force you to admit you were wrong, change a comfortable habit, disappoint your social circle, or rethink years of decisions.'
    ],
    prompt: 'Open it or destroy it?',
    choices: ['Open it', 'Destroy it'],
    twist: [
      'Nobody will ever know which option you chose. There is no embarrassment for opening it and no punishment for destroying it.'
    ],
    afterPrompt: 'When truth has a price but nobody is watching, how badly do you actually want it?',
    hostPrompts: ['What kind of answer would you be afraid to find?', 'Can the consequences of a truth make the truth itself less true?']
  },
  {
    id: 3,
    title: 'THE PERFECT SATURDAY LOOP',
    vibe: 'funny',
    scenario: [
      'You can relive the best Saturday of your life every weekend: favourite food, perfect weather, your favourite people, no chores, no stress, everything exactly right.',
      'You remember every previous Saturday, but the day itself repeats perfectly.'
    ],
    prompt: 'Taking the deal?',
    choices: ['Absolutely', 'No'],
    twist: [
      'By Saturday 60 you know every joke before it is told, every bite tastes familiar, and every activity feels ordinary. Nothing got worse. Your reaction to it changed.'
    ],
    afterPrompt: 'If the perfect pleasure becomes normal through repetition, can “more of it” ever create enough?',
    hostPrompts: ['What enjoyable thing in your life became normal?', 'Why does novelty matter so much to pleasure?']
  },
  {
    id: 4,
    title: 'BORN SOMEWHERE ELSE',
    vibe: 'identity',
    scenario: [
      'Two identical babies are separated at birth and raised in homes with opposite ideas about success, relationships, money, modesty, family, and what a normal adult life looks like.',
      'At 30, both are intelligent and both confidently say, “I thought about life for myself.”'
    ],
    prompt: 'How much of their “common sense” did they actually choose?',
    choices: ['Most of it', 'Some of it', 'Very little'],
    twist: [
      'Neither person can remember deciding many of their deepest assumptions. They mostly remember growing up around people who already treated those assumptions as obvious.'
    ],
    afterPrompt: 'Being taught a belief does not make it false. So how would you tell which inherited beliefs are actually true?',
    hostPrompts: ['Which beliefs feel too obvious to examine?', 'Would you believe the same things if you had been raised somewhere else?']
  },
  {
    id: 5,
    title: 'THE SELF-MADE MEDAL',
    vibe: 'absurd',
    scenario: [
      'A new race has one rule: every runner chooses their own starting line, distance, finish line, and definition of winning.',
      'One person runs 42 km. One runs 100 metres. One takes three steps. Everyone receives a gold medal because nobody is allowed to judge another runner by an outside standard.'
    ],
    prompt: 'Did everyone truly win?',
    choices: ['Yes', 'No', 'The word lost meaning'],
    twist: [
      'The organizer says an external standard would be unfair because somebody might discover they did not win.'
    ],
    afterPrompt: 'If a standard can never tell you that you are wrong, is it guiding you or only validating you?',
    hostPrompts: ['Can achievement exist without a standard?', 'Where should standards come from when people disagree?']
  },
  {
    id: 6,
    title: 'THE APP THAT KNOWS YOU',
    vibe: 'modern-life',
    scenario: [
      'An app predicts what video, meal, product, song, and news story you will choose next with 96% accuracy.',
      'It also quietly changes the order of your options so the thing it wants you to choose appears first, looks popular, and is easiest to tap.'
    ],
    prompt: 'Are the final choices still completely yours?',
    choices: ['Yes', 'Not completely'],
    twist: [
      'For one month the recommendation system is secretly turned off. Your choices noticeably change even though you never knew anything had changed.'
    ],
    afterPrompt: 'If your environment can train your preferences, what does it take to call a preference truly your own?',
    hostPrompts: ['How would you separate preference from conditioning?', 'What choices do you make only after something puts them in front of you?']
  },
  {
    id: 7,
    title: 'THE 9–1 PHONE VOTE',
    vibe: 'group',
    scenario: [
      'Ten friends are hanging out. One person leaves his unlocked phone on the table.',
      'The group votes 9–1 that it would be hilarious to read his private messages aloud because “the majority wants it.”'
    ],
    prompt: 'Does the vote make it okay?',
    choices: ['Yes', 'No'],
    twist: [
      'Next weekend you are the one who leaves your phone behind. The vote is again 9–1.'
    ],
    afterPrompt: 'If being outvoted does not erase your rights, what exactly can a majority decide?',
    hostPrompts: ['Can popularity turn a wrong action into a right one?', 'Would your rule survive if you were always the 1?']
  },
  {
    id: 8,
    title: 'THE CONSENT CONTRACT',
    vibe: 'modern-life',
    scenario: [
      'At 18, you are offered $50,000 cash today in exchange for 20% of every dollar you earn for the rest of your life.',
      'A lawyer explains the contract clearly. There is no trick, no pressure, and you are legally an adult. You understand it and sign voluntarily.'
    ],
    prompt: 'Is the deal fair because you freely agreed?',
    choices: ['Yes', 'Not necessarily'],
    twist: [
      'At 35 you are earning $200,000 a year and desperately regret the deal. The company answers, “Nobody forced you. You chose this.”'
    ],
    afterPrompt: 'Is consent enough to make every voluntary choice good, fair, or wise?',
    hostPrompts: ['What does consent settle?', 'What important questions remain after consent is established?']
  },
  {
    id: 9,
    title: 'THE PERFECTLY LEGAL MAN',
    vibe: 'moral',
    scenario: [
      'A man carefully follows every law. He pays his taxes, never steals, never assaults anyone, and has no criminal record.',
      'He also lies to friends when useful, humiliates employees for fun, breaks promises whenever convenient, and ignores his family unless he needs something.'
    ],
    prompt: 'Is he a good person?',
    choices: ['Yes', 'No'],
    twist: [
      'He replies, “If any of those things were truly wrong, the law would ban them.”'
    ],
    afterPrompt: 'If legal and good are not the same thing, where does the extra standard come from?',
    hostPrompts: ['Name something legal that can still be wrong.', 'Can law create morality, or does law itself need to be judged?']
  },
  {
    id: 10,
    title: 'THE QUIET ROOM',
    vibe: 'modern-life',
    scenario: [
      'You get $1,000 for spending 24 hours alone in a comfortable room with good food, a bed, a shower, and a window.',
      'No phone, music, TV, books, games, work, conversation, or internet. Nothing painful happens. You are simply left with silence and your own thoughts.'
    ],
    prompt: 'Could you finish the 24 hours?',
    choices: ['Easy', 'Probably', 'I would struggle'],
    twist: [
      'After four hours you can leave whenever you want. The only thing making you want to quit is boredom and the urge for stimulation.'
    ],
    afterPrompt: 'When low stimulation feels unbearable, are you using entertainment or depending on it?',
    hostPrompts: ['What would you reach for first?', 'What thoughts show up when nothing is distracting you?']
  },
  {
    id: 11,
    title: 'THE MOVING FINISH LINE',
    vibe: 'money',
    scenario: [
      'At 22 your friend says, “If I ever make $100,000 a year, I will be set.”',
      'At $100,000 the number becomes $150,000. Then $250,000. Then a bigger house. Then a better car. Every new level becomes normal surprisingly quickly.'
    ],
    prompt: 'When would you believe the next milestone will finally be enough?',
    choices: ['The next one', 'Probably never'],
    twist: [
      'Nothing is wrong with earning more. The strange part is that the definition of “enough” changes every time he reaches it.'
    ],
    afterPrompt: 'Can more satisfy you if “enough” keeps moving whenever more arrives?',
    hostPrompts: ['What number once seemed huge to you?', 'What would a fixed definition of enough look like?']
  },
  {
    id: 12,
    title: 'THE MATRIX DEAL',
    vibe: 'pop',
    scenario: [
      'You can enter a simulation that feels completely real. Inside, you have the perfect career, perfect relationships, exciting travel, status, comfort, and every experience you ever wanted.',
      'Your real body is safe. Once connected, you will forget the outside world and genuinely believe the simulated life is real.'
    ],
    prompt: 'Plug in forever?',
    choices: ['Plug in', 'Stay in reality'],
    twist: [
      'Inside the simulation you will probably feel happier than you do now. But none of the people love you, none of the achievements happened, and none of the experiences are real.'
    ],
    afterPrompt: 'If pleasure and good feelings were enough by themselves, why would reality matter?',
    hostPrompts: ['What does reality add that a perfect feeling cannot?', 'Would you plug in someone you love?']
  },
  {
    id: 13,
    title: 'THE FUTURE-YOU LOAN',
    vibe: 'choices',
    scenario: [
      'A doctor offers you a strange deal. For the next five years you can have incredible energy, recover instantly, sleep four hours, party whenever you want, and feel physically amazing.',
      'The cost is ten healthy years removed from the end of your life. The effect is guaranteed.'
    ],
    prompt: 'Take the five great years?',
    choices: ['Take them', 'No'],
    twist: [
      'Imagine your 60-year-old self could send one message back to you before you sign. He remembers making the choice, but he is the one who must pay it.'
    ],
    afterPrompt: 'Why should the desire of your present self automatically outrank the person your choices are creating?',
    hostPrompts: ['Do you owe anything to your future self?', 'Which current habits are really loans from later?']
  },
  {
    id: 14,
    title: 'SAME BODY, DIFFERENT RULE',
    vibe: 'modern-life',
    scenario: [
      'At a hotel, a woman accidentally opens her room door wearing only underwear. She immediately covers herself and looks embarrassed.',
      'Twenty minutes later she is beside the pool in a bikini covering about the same amount of skin, completely comfortable.'
    ],
    prompt: 'What changed most?',
    choices: ['Her body', 'The setting', 'The people'],
    twist: [
      'Several of the same people from the hallway are now beside the pool. Her body barely changed. The social rule attached to the setting did.'
    ],
    afterPrompt: 'How many things feel naturally “normal” only because the surrounding culture gives the situation a different meaning?',
    hostPrompts: ['Is context a real difference?', 'How would you tell a meaningful distinction from a social habit you never examined?']
  },
  {
    id: 15,
    title: 'THE VALIDATION FRIEND',
    vibe: 'relationships',
    scenario: [
      'You have two close friends. One is endlessly supportive and almost always tells you that your feelings and choices are valid.',
      'The other cares about you just as much but will tell you, “You are wrong,” when he thinks you are about to damage your life.'
    ],
    prompt: 'Which friend would you rather have?',
    choices: ['Always supportive', 'Will challenge me'],
    twist: [
      'You are about to make a decision that will seriously hurt you. The first friend can see it but stays supportive because disagreement might upset you.'
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
      'It has a university logo, a dramatic chart, 300,000 shares, and everyone in the comments is celebrating.'
    ],
    prompt: 'Share it or check the study first?',
    choices: ['Share it', 'Check first'],
    twist: [
      'The actual paper is real, but its conclusion is much narrower than the viral graphic. The graphic exaggerated exactly the part your side wanted to hear.'
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
      'You receive $10,000 if you can name one realistic fact, discovery, or piece of evidence that would make you admit the belief is wrong.'
    ],
    prompt: 'Can you name one?',
    choices: ['Yes', 'Nothing could'],
    twist: [
      'If no possible evidence could count against the belief, then every future result can be explained in a way that protects it.'
    ],
    afterPrompt: 'If a belief is never allowed to lose, are you testing it or protecting it?',
    hostPrompts: ['What would genuinely change your mind?', 'Do you ask opponents to be more open to correction than you are?']
  },
  {
    id: 18,
    title: 'THE PERFECTLY TOLERANT CLUB',
    vibe: 'social',
    scenario: [
      'A club has one founding rule: every member may speak, disagree, and argue without being silenced simply for having an unpopular opinion.',
      'A new member joins and uses every meeting to demand that everyone who disagrees with him lose the right to speak.'
    ],
    prompt: 'Can the club remove him without betraying its own rule?',
    choices: ['Remove him', 'Must tolerate him'],
    twist: [
      'If he succeeds, the club will no longer allow disagreement. If they stop him, he immediately says, “So much for tolerance.”'
    ],
    afterPrompt: 'Can a principle survive if it refuses to defend the conditions that make the principle possible?',
    hostPrompts: ['Is every limit automatically hypocrisy?', 'What is the difference between tolerating disagreement and surrendering the rule itself?']
  },
  {
    id: 19,
    title: 'THE ENGINEER’S ANSWER',
    vibe: 'mystery',
    scenario: [
      'You find an unfamiliar machine in a warehouse. An engineer can explain every wire, gear, sensor, chemical reaction, and line of code inside it.',
      'He can tell you exactly how every component works, but he has never met the designer and has no idea what job the machine was built to perform.'
    ],
    prompt: 'Has he explained everything important about the machine?',
    choices: ['Yes', 'No'],
    twist: [
      'A label from the designer is later found explaining that the machine was built for a specific emergency task nobody had guessed from watching the parts move.'
    ],
    afterPrompt: 'Can a complete explanation of how something works automatically answer what it is for?',
    hostPrompts: ['Are “how?” and “what for?” the same question?', 'Who is best placed to explain intended purpose?']
  },
  {
    id: 20,
    title: 'THE NO-REPUTATION YEAR',
    vibe: 'modern-life',
    scenario: [
      'For one year, nobody can see your car brand, clothes brand, job title, follower count, vacation photos, house, watch, phone, or anything else that signals status.',
      'You still own everything and can enjoy it privately. Other people simply cannot know about it.'
    ],
    prompt: 'Would your spending or goals change?',
    choices: ['A lot', 'A little', 'Not at all'],
    twist: [
      'The same rule applies to everybody. There is no audience to impress and no social reward for appearing successful.'
    ],
    afterPrompt: 'Which desires would remain if nobody could ever admire you for satisfying them?',
    hostPrompts: ['What do you want mainly because other people can see it?', 'Would invisible luxury still be luxury to you?']
  },
  {
    id: 21,
    title: 'THE CLICK REMOTE',
    vibe: 'pop',
    scenario: [
      'You get a remote that can fast-forward anything unpleasant or boring: traffic, chores, workouts, waiting rooms, awkward talks, paperwork, bad moods, even difficult weeks.',
      'You stay physically safe and instantly arrive at the next enjoyable part.'
    ],
    prompt: 'How often would you use it?',
    choices: ['Constantly', 'Sometimes', 'Almost never'],
    twist: [
      'The remote learns what you usually skip. Eventually it starts skipping difficult conversations that would have repaired relationships, boring practice that would have built skill, and ordinary family moments you did not realize you would miss.'
    ],
    afterPrompt: 'Could a life designed to remove discomfort also remove the things that give life depth?',
    hostPrompts: ['Which difficult thing became valuable only later?', 'Is all discomfort a problem to eliminate?']
  },
  {
    id: 22,
    title: 'THE ISLAND RULE',
    vibe: 'moral',
    scenario: [
      'You visit an island where every local agrees on one rule: cheating an outsider is acceptable, but cheating another local is wrong.',
      'The rule is legal, traditional, popular, and taught from childhood. A shop owner uses it to trick you out of your life savings.'
    ],
    prompt: 'Was what happened to you actually wrong, or just against your values?',
    choices: ['Actually wrong', 'Just different values'],
    twist: [
      'Every local sincerely approves of the rule. There is no hidden local opposition for you to appeal to.'
    ],
    afterPrompt: 'If an entire society can be wrong about a moral rule, what standard are you using to judge the society?',
    hostPrompts: ['Does agreement create right and wrong?', 'What would make a moral rule more than local preference?']
  },
  {
    id: 23,
    title: 'ONE YEAR LEFT',
    vibe: 'deeper',
    scenario: [
      'You learn with complete certainty that you have exactly one healthy year left to live. Nothing can extend it, and you are not allowed to tell anyone why your behaviour changes.',
      'Your job, bank account, notifications, subscriptions, unfinished shows, purchases, grudges, relationships, and normal responsibilities all still exist.'
    ],
    prompt: 'What changes first?',
    choices: ['People', 'Work', 'Money', 'Habits', 'Nothing'],
    twist: [
      'Nobody gives you extra praise for changing. The only difference is that your remaining time has become visible to you.'
    ],
    afterPrompt: 'If knowing your time is limited changes what matters, why should uncertainty about the exact date make those priorities disappear?',
    hostPrompts: ['What suddenly looks trivial?', 'What would you regret spending another year avoiding?']
  },
  {
    id: 24,
    title: 'THE EXIT DOOR',
    vibe: 'finale',
    scenario: [
      'You discover that your comfortable world has been carefully filtered for you. Your news agrees with you, your friends mostly agree with you, your entertainment keeps you happy, and uncomfortable questions rarely reach you.',
      'There is one exit door. Outside you will see reality without the filter, but you may lose certainty, status, routines, relationships, or beliefs that currently make life comfortable.'
    ],
    prompt: 'Walk through the door?',
    choices: ['Walk through', 'Stay'],
    twist: [
      'You are guaranteed that whatever is outside is real. You are not guaranteed that you will like it.'
    ],
    afterPrompt: 'When truth and comfort finally point in opposite directions, which one gets the final vote?',
    hostPrompts: ['What would make you stay?', 'Is wanting truth different from wanting truth only when it agrees with you?']
  }
];

const CHAOS_MODIFIERS = [
  {
    name: 'SWITCH SIDES',
    text: 'Defend the answer you did not choose as strongly as you can.'
  },
  {
    name: 'WHO TAUGHT YOU THAT?',
    text: 'Where did your first instinct come from: evidence, experience, family, friends, media, habit, or something else?'
  },
  {
    name: 'ONE FACT',
    text: 'Name one new fact that would genuinely make you change your answer.'
  },
  {
    name: 'SAME RULE',
    text: 'Would you accept the exact same reasoning if it worked against you or your side?'
  },
  {
    name: 'NO AUDIENCE',
    text: 'Nobody will ever know your choice. Does your answer change?'
  },
  {
    name: 'PRICE IT',
    text: 'What is the largest real cost you would accept before abandoning your answer?'
  },
  {
    name: 'TEN YEARS LATER',
    text: 'Imagine everyone lives by your answer for ten years. What happens next?'
  },
  {
    name: 'DEFINE IT',
    text: 'Pick the most important word in the argument, define it clearly, and keep that definition fixed.'
  },
  {
    name: 'WHAT ARE YOU PROTECTING?',
    text: 'If changing your answer feels uncomfortable, what exactly would you lose by changing it?'
  },
  {
    name: 'SOURCE CHECK',
    text: 'What are you actually relying on: evidence, a person, a crowd, familiarity, or your own intuition?'
  },
  {
    name: 'REMOVE THE REWARD',
    text: 'Take away money, pleasure, praise, status, and approval. Would you still choose the same thing?'
  },
  {
    name: 'BET SOMETHING',
    text: 'If being wrong cost you $10,000, what would you verify before locking in your answer?'
  }
];
