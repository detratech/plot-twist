'use strict';

const PLOT_TWIST_CARDS = [
  {
    id: 1,
    title: 'THE HAPPINESS CHIP',
    vibe: 'deeper',
    scenario: [
      'A company launches MoodMax Pro: permanent calm, confidence, happiness, and fulfilment. No ads. No buffering. Apparently no bad Mondays either.',
      'It does not make you wiser, healthier, more loving, more skilled, or more useful. It only makes your brain report, “Life is amazing, boss.”'
    ],
    prompt: 'Installing it?',
    choices: ['Install it yesterday', 'Keep my weird brain'],
    twist: [
      'Ten years later you still feel fantastic, but you have barely grown. Hard conversations were avoided, difficult skills were never learned, and responsibilities became easy to ignore because nothing ever feels wrong.'
    ],
    afterPrompt: 'If feeling fulfilled and living a fulfilling life can split apart, which one should lead?',
    hostPrompts: ['Is happiness a feeling or a way of living?', 'Would you install it in someone you love?']
  },
  {
    id: 2,
    title: 'THE RED ENVELOPE',
    vibe: 'truth',
    scenario: [
      'A red envelope contains one completely accurate answer about a major belief or life choice you currently have wrong.',
      'Opening it might cost you nothing. Or it might force you to admit you were wrong, change a comfortable habit, disappoint people you care about, or retire several confident speeches.'
    ],
    prompt: 'What happens to the envelope?',
    choices: ['Open it', 'Sudden fireplace accident'],
    twist: [
      'Nobody will ever know what you chose. No embarrassment for opening it. No punishment for destroying it. You cannot even post about how brave you were.'
    ],
    afterPrompt: 'When truth has a price and there is no audience, how badly do you actually want it?',
    hostPrompts: ['What answer would you be nervous to find?', 'Can an uncomfortable truth become less true because it is inconvenient?']
  },
  {
    id: 3,
    title: 'THERMOSTAT COURT',
    vibe: 'funny',
    scenario: [
      'Two roommates are fighting over the thermostat. One is wearing a hoodie and says, “This apartment is freezing.” The other is standing beside a fan saying, “It is basically a sauna.”',
      'Both are completely sincere. The thermostat reads 21°C.'
    ],
    prompt: 'Can both roommates be right?',
    choices: ['Yes', 'No', 'Depends what “right” means'],
    twist: [
      'They can both be right about how the room feels to them. They cannot both make the room objectively 12°C and 35°C at the same time. The thermostat has declined to respect anyone’s personal journey.'
    ],
    afterPrompt: 'When should personal experience settle a question, and when do you need something outside the experience?',
    hostPrompts: ['Can a feeling be real without describing external reality perfectly?', 'What claims need more than “that is how it feels to me”?']
  },
  {
    id: 4,
    title: 'EVERY ROAD LEADS THERE?',
    vibe: 'absurd',
    scenario: [
      'Four friends are trying to reach the same cabin before dark. One map says turn left at the bridge. Another says turn right. A third says the bridge does not exist. The fourth says roads are a social construct.',
      'Everyone agrees that arguing is unpleasant and announces that all four routes are equally true.'
    ],
    prompt: 'Good solution?',
    choices: ['Peace achieved', 'We still need the correct road'],
    twist: [
      'The car cannot physically drive left and right at the same bridge. Also, unfortunately for Route Four, the ditch has not deconstructed itself.'
    ],
    afterPrompt: 'Can respecting people with different beliefs turn contradictory directions into the same direction?',
    hostPrompts: ['Can two people deserve respect while one of their claims is still wrong?', 'Does disagreement disappear if we rename it “different paths”?']
  },
  {
    id: 5,
    title: 'THE NO-THINKING CHAMPIONSHIP',
    vibe: 'funny',
    scenario: [
      'Two self-discovery coaches agree that thinking is the problem. Coach A says perfect truth arrives when you focus only on your breathing. Coach B says it arrives when you listen only to your heartbeat.',
      'Both have thousands of followers and extremely peaceful profile pictures.'
    ],
    prompt: 'Which method sounds more reliable?',
    choices: ['Breathing', 'Heartbeat', 'Show me a test'],
    twist: [
      'After a month, the two coaches reach opposite conclusions about the same question. Each says the disagreement proves the other coach was “not present enough.” A third coach has now entered the market with chewing.'
    ],
    afterPrompt: 'If a method can produce opposite answers and has no way to detect error, how can it separate insight from imagination?',
    hostPrompts: ['Can a practice calm you without proving every conclusion you reach during it?', 'What would let this method admit it got something wrong?']
  },
  {
    id: 6,
    title: 'THE MYSTERY BOX',
    vibe: 'mystery',
    scenario: [
      'Scientists discover a sealed black box. Everyone agrees it is doing something important, but nobody yet understands how it works.',
      'Three people immediately explain it: aliens, invisible energy, and “probably quantum.” None can open the box.'
    ],
    prompt: 'Which explanation wins?',
    choices: ['Aliens', 'Invisible energy', 'Quantum, obviously', 'We do not know yet'],
    twist: [
      'A year later the box is opened and all three confident explanations are wrong. “We do not know yet” was the least exciting answer and the only one that did not invent knowledge.'
    ],
    afterPrompt: 'When something is mysterious, does that make your favourite explanation more likely to be true?',
    hostPrompts: ['Is “I do not know” a weak answer or sometimes the most honest one?', 'What is the difference between explaining a mystery and naming it?']
  },
  {
    id: 7,
    title: 'THE ALL-TRUE EXAM',
    vibe: 'absurd',
    scenario: [
      'A school introduces a kinder math exam. One student writes 2 + 2 = 4. Another writes 5. Another writes “numbers are personal.”',
      'The teacher gives everyone 100% because correcting anyone might invalidate their mathematical experience.'
    ],
    prompt: 'Did everyone get the question right?',
    choices: ['Yes, inclusively', 'No', 'Math has left the building'],
    twist: [
      'The same students are now calculating the load limit for an elevator you are standing inside. Suddenly the class becomes aggressively interested in objective answers.'
    ],
    afterPrompt: 'Why do we accept “many truths” more easily when being wrong has no immediate cost?',
    hostPrompts: ['Can people be sincere and still mistaken?', 'Which questions allow preference, and which questions describe reality whether we like it or not?']
  },
  {
    id: 8,
    title: 'THE EXPERIENCE SHOWDOWN',
    vibe: 'truth',
    scenario: [
      'Two strangers describe life-changing personal experiences. Both are calm, sincere, intelligent, and deeply transformed by what happened.',
      'The problem: their experiences convinced them of two claims that cannot both be true.'
    ],
    prompt: 'Whose experience proves the claim?',
    choices: ['Person A', 'Person B', 'Neither by itself'],
    twist: [
      'A third person arrives with an equally powerful experience supporting a third incompatible answer. Personal Experience World Championship is now heading into overtime.'
    ],
    afterPrompt: 'Can a personal experience be meaningful to you without being enough evidence for everyone else?',
    hostPrompts: ['What kind of evidence can a third person actually examine?', 'How should you compare two sincere experiences that point in opposite directions?']
  },
  {
    id: 9,
    title: 'THE 600-PART MACHINE',
    vibe: 'funny',
    scenario: [
      'You buy a 600-part machine with a manual written by the engineer who designed it. Your friend throws the manual aside and says, “No two people ever read the same instructions the same way.”',
      'He then begins installing Part 84 where Part 12 should go because that placement “resonates more.”'
    ],
    prompt: 'Who should guide the build?',
    choices: ['The manual', 'His personal interpretation', 'Mix both and pray for the warranty'],
    twist: [
      'The machine explodes in the least dramatic possible way: one sad puff of smoke and a warranty email that simply says, “We literally numbered the parts.”'
    ],
    afterPrompt: 'When the source explains how its own system should be understood, when is personal interpretation allowed to overrule it?',
    hostPrompts: ['Does interpretation mean every interpretation is equally valid?', 'What makes one interpretation better than another?']
  },
  {
    id: 10,
    title: 'DELETE ALL HISTORY',
    vibe: 'absurd',
    scenario: [
      'Your friend announces that nothing from the past can be known unless he personally witnessed it.',
      'You ask whether his grandparents existed before he met them. He says the evidence is “interesting but not conclusive.”'
    ],
    prompt: 'Reasonable standard?',
    choices: ['Maximum scepticism', 'Way too far'],
    twist: [
      'He now cannot confidently say who won last year’s championship, whether his own birth certificate refers to him, or whether he owes you the $200 he borrowed yesterday. His new philosophy has become financially convenient.'
    ],
    afterPrompt: 'If a standard of proof destroys ordinary knowledge along with bad claims, is the standard too strong?',
    hostPrompts: ['How do we reasonably know things we did not personally witness?', 'What makes testimony or records strong enough to trust?']
  },
  {
    id: 11,
    title: 'THE QUANTUM PARKING TICKET',
    vibe: 'funny',
    scenario: [
      'You get a parking ticket. You explain that your car is not really a solid object. At a deeper level it is particles, fields, forces, and mostly empty space.',
      'You confidently conclude that the car therefore was not “really” parked there.'
    ],
    prompt: 'Ticket dismissed?',
    choices: ['Quantum defence wins', 'Nice try'],
    twist: [
      'The tow truck also consists of particles and fields. It removes your mostly-empty-space car with impressive efficiency.'
    ],
    afterPrompt: 'Can a deeper description of something make an ordinary description false, or can both describe different levels of the same reality?',
    hostPrompts: ['Does learning what something is made of erase what it is?', 'When does technical language clarify a question, and when does it dodge one?']
  },
  {
    id: 12,
    title: 'BORN SOMEWHERE ELSE',
    vibe: 'identity',
    scenario: [
      'Two identical babies are separated at birth and raised in homes with opposite ideas about success, relationships, money, modesty, family, and what a normal adult life looks like.',
      'At 30, both are intelligent, confident, and have developed the facial expression of a person who says, “I think for myself.”'
    ],
    prompt: 'How much of their “common sense” did they choose?',
    choices: ['Most of it', 'Some of it', 'Very little'],
    twist: [
      'Neither remembers deciding many of their deepest assumptions. They mostly grew up around people who already treated those assumptions as obvious. Both are considering podcasts about how everyone else is brainwashed.'
    ],
    afterPrompt: 'Being taught something does not make it false. So how do you separate truth from whatever your environment handed you?',
    hostPrompts: ['Which beliefs feel too obvious to examine?', 'Would you believe the same things if you had been raised somewhere else?']
  },
  {
    id: 13,
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
    id: 14,
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
    id: 15,
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
    id: 16,
    title: 'THE MOVING FINISH LINE',
    vibe: 'money',
    scenario: [
      'At 22 your friend says, “If I ever make $100,000 a year, I am set.” At $100,000 the number becomes $150,000. Then $250,000. Then a bigger house. Then a nicer car.',
      'Eventually he owns a watch that costs more than his first car and still watches videos called “7 Signs You Are Falling Behind Financially.”'
    ],
    prompt: 'When will the next milestone finally be enough?',
    choices: ['The next one, surely', 'This game has no ending'],
    twist: [
      'Nothing is wrong with earning more. The strange part is that “enough” moves every time he reaches it, like a finish line being dragged away by a golf cart.'
    ],
    afterPrompt: 'Can more satisfy you if your definition of enough changes whenever more arrives?',
    hostPrompts: ['What number once seemed huge to you?', 'What would a fixed definition of enough look like?']
  },
  {
    id: 17,
    title: 'THE QUIET ROOM',
    vibe: 'modern-life',
    scenario: [
      'You get $1,000 for spending 24 hours alone in a comfortable room with good food, a bed, a shower, and a window.',
      'No phone, TV, music, books, games, work, conversation, or internet. Nothing painful happens. You are simply trapped with the one person you apparently keep trying to avoid: yourself.'
    ],
    prompt: 'Finishing the 24 hours?',
    choices: ['Easy money', 'Probably', 'I will befriend the ceiling'],
    twist: [
      'After four hours you can leave whenever you want. The only thing pushing you toward the door is boredom and the urge for stimulation. By hour six the pattern on the wall has a backstory.'
    ],
    afterPrompt: 'When low stimulation feels unbearable, are you using entertainment or depending on it?',
    hostPrompts: ['What would you reach for first?', 'What thoughts appear when nothing is distracting you?']
  },
  {
    id: 18,
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
    id: 19,
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
    id: 20,
    title: 'THE ISLAND RULE',
    vibe: 'moral',
    scenario: [
      'You visit an island where every local agrees on one rule: cheating an outsider is acceptable, but cheating another local is wrong.',
      'The rule is legal, traditional, popular, taught from childhood, and printed on a tasteful little tourism brochure. A shop owner uses it to trick you out of your life savings.'
    ],
    prompt: 'Was what happened actually wrong?',
    choices: ['Actually wrong', 'Only wrong by my values'],
    twist: [
      'Every local sincerely approves of the rule. There is no secret resistance group waiting to validate you. The tourism board gives the scam five stars.'
    ],
    afterPrompt: 'If an entire society can be wrong about a moral rule, what standard are you using to judge the society?',
    hostPrompts: ['Does agreement create right and wrong?', 'What would make a moral rule more than local preference?']
  },
  {
    id: 21,
    title: 'THE PERFECTLY TOLERANT CLUB',
    vibe: 'social',
    scenario: [
      'A club has one founding rule: every member may speak, disagree, and argue without being silenced simply for having an unpopular opinion.',
      'A new member joins and uses every meeting to demand that everyone who disagrees with him lose the right to speak. He has also made a “Tolerance Now” T-shirt.'
    ],
    prompt: 'Can the club remove him?',
    choices: ['Remove him', 'Must tolerate him'],
    twist: [
      'If he succeeds, the club will no longer allow disagreement. If they stop him, he immediately points at his shirt and says, “Wow. So much for tolerance.”'
    ],
    afterPrompt: 'Can a principle survive if it refuses to defend the conditions that make the principle possible?',
    hostPrompts: ['Is every limit automatically hypocrisy?', 'What is the difference between tolerating disagreement and surrendering the rule itself?']
  },
  {
    id: 22,
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
    id: 23,
    title: 'THE ONE FACT',
    vibe: 'truth',
    scenario: [
      'Pick one important belief you are very confident about.',
      'You receive $10,000 if you can name one realistic fact, discovery, or piece of evidence that would make you admit the belief is wrong. This may be the first game show where losing an argument pays better than winning one.'
    ],
    prompt: 'Can you name one?',
    choices: ['Yes', 'Nothing could ever'],
    twist: [
      'If no possible evidence can count against the belief, then every future result can be explained in a way that protects it. Congratulations: your belief has unlocked invincibility mode.'
    ],
    afterPrompt: 'If a belief is never allowed to lose, are you testing it or protecting it?',
    hostPrompts: ['What would genuinely change your mind?', 'Do you ask opponents to be more open to correction than you are?']
  },
  {
    id: 24,
    title: 'THE EXIT DOOR',
    vibe: 'finale',
    scenario: [
      'You discover that your comfortable world has been carefully filtered. Your news agrees with you, your friends mostly agree with you, your entertainment keeps you busy, and uncomfortable questions rarely reach you.',
      'There is one exit door. Outside is unfiltered reality. Unfortunately it has no reviews, star rating, comments section, or 30-second video telling you what opinion to have.'
    ],
    prompt: 'Walk through?',
    choices: ['Open the door', 'The couch is comfortable'],
    twist: [
      'You are guaranteed that whatever is outside is real. You are not guaranteed that you will like it, keep your status, keep every friendship, or keep every belief.'
    ],
    afterPrompt: 'When truth and comfort finally point in opposite directions, which one gets the final vote?',
    hostPrompts: ['What would tempt you to stay?', 'Is wanting truth different from wanting truth only when it agrees with you?']
  }
];

const CHAOS_MODIFIERS = [
  {
    name: 'VIBES ARE NOT RECEIPTS',
    text: 'Your answer feels right. Great. What evidence makes it right outside your own feelings?'
  },
  {
    name: 'BOTH CAN’T WIN',
    text: 'If two claims directly contradict each other, say clearly what would have to be true for one of them to lose.'
  },
  {
    name: 'MYSTERY ≠ ANSWER',
    text: 'Point out what is actually unknown, then separate that from whatever explanation you are tempted to insert.'
  },
  {
    name: 'PERSONAL EXPERIENCE MODE',
    text: 'Imagine someone has an equally powerful personal experience supporting the opposite answer. What breaks the tie?'
  },
  {
    name: 'WHO TAUGHT YOU THAT?',
    text: 'Where did your first instinct come from: evidence, experience, family, friends, media, habit, or something else?'
  },
  {
    name: 'SAME ENERGY',
    text: 'Would you accept this exact reasoning from someone defending the opposite side?'
  },
  {
    name: 'SHOW THE METHOD',
    text: 'What process could tell you that your answer is wrong, not just confirm it when you are right?'
  },
  {
    name: 'NO AUDIENCE MODE',
    text: 'Nobody will ever know your answer. Remove praise, embarrassment, status, and group approval. Same choice?'
  },
  {
    name: 'DEFINE THE WORD',
    text: 'Pick the most important word in the argument and define it before anyone changes its meaning halfway through.'
  },
  {
    name: 'BORING EVIDENCE',
    text: 'Ignore confidence, charisma, followers, and dramatic storytelling. What actual evidence is left?'
  },
  {
    name: 'BET $10,000',
    text: 'Being wrong now costs $10,000. What would you verify before locking in your answer?'
  },
  {
    name: 'LAWYER UP',
    text: 'Choose someone who disagrees with you. They now have to defend your answer better than you did.'
  }
];
