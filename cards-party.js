'use strict';

const PARTY_CARD_OVERRIDES = {
  1: {
    title: 'HAPPINESS: PREMIUM EDITION',
    scenario: [
      'A company offers a brain upgrade that makes you calm, confident, and genuinely happy every day. Mondays become emotionally powerless. Group chats cannot hurt you.',
      'It is medically safe and reversible. The catch: discomfort is one of the things that normally pushes people to grow, apologise, practise, leave bad situations, and finally assemble the IKEA shelf correctly.'
    ],
    prompt: 'Taking the upgrade?',
    choices: ['Give me the premium brain', 'Keep the emotional potholes'],
    twist: [
      'Ten years later, people who took it report happier lives but are noticeably worse at handling the rare problems the chip cannot remove.',
      'People who refused it became more resilient on average, but also spent ten years voluntarily experiencing anxiety, heartbreak, stress, and Tuesdays. Congratulations, both teams bought something expensive.'
    ],
    afterPrompt: 'Still your answer? How much suffering is character-building, and how much is just terrible customer service?',
    hostPrompts: ['Would you give the chip to someone you love?', 'At what point does avoiding pain start costing you abilities?']
  },
  2: {
    title: 'THE ENVELOPE THAT RUINS BRUNCH',
    scenario: [
      'A red envelope contains one guaranteed true fact about a major belief or life choice you currently have wrong.',
      'You may open it before brunch. Nobody recommends doing this before brunch.'
    ],
    prompt: 'Open it or protect the pancakes?',
    choices: ['Open the cursed stationery', 'Let me enjoy my pancakes'],
    twist: [
      'Opening it gives you certainty but no instructions. Fixing the mistake could cost money, status, relationships, or the pleasure of saying “I knew it” for the next thirty years.',
      'Leaving it closed protects your life from immediate chaos, but now every confident speech you give comes with the knowledge that a small paper rectangle is sitting at home judging you.'
    ],
    afterPrompt: 'Still your answer? Is truth always worth opening immediately, or can timing matter without becoming cowardice?',
    hostPrompts: ['What kind of answer would make you reach for the syrup instead?', 'When does “not now” quietly become “never”?']
  },
  3: {
    title: 'THERMOSTAT CIVIL WAR',
    scenario: [
      'Roommate A is in a hoodie under a blanket. Roommate B is standing in front of a fan wearing the expression of a man crossing the Sahara.',
      'The thermostat says 21°C. Both have begun citing “basic science” at each other despite neither remembering high-school science.'
    ],
    prompt: 'Who gets first priority?',
    choices: ['Trust the number', 'Trust the human'],
    twist: [
      'The thermostat is later found to be wrong by 2°C. Unfortunately, after it is fixed, the roommates still feel completely different in the exact same room.',
      'The machine can be wrong. The person can be sincere and still describe only their own experience. The thermostat has requested legal representation.'
    ],
    afterPrompt: 'Still your answer? When measurement and lived experience disagree, who gets to be annoying first?',
    hostPrompts: ['What can a measurement settle here?', 'What can the measurement never tell you about the other person?']
  },
  4: {
    title: 'FOUR MAPS, ONE GAS TANK',
    scenario: [
      'Four friends are driving to a cabin. One map says left. One says right. One says the bridge is closed. One is hand-drawn by someone named Trevor and includes a dragon.',
      'You have enough gas to test maybe two routes before the car becomes expensive lawn furniture.'
    ],
    prompt: 'What is the smarter move?',
    choices: ['Back the best-looking evidence', 'Keep multiple routes alive'],
    twist: [
      'The official map is outdated. Trevor’s dragon map contains the only working shortcut, but also sends you through a goat farm for no reason.',
      'Commit too early and you can become confidently lost. Stay open to everything and you may die of old age at the intersection.'
    ],
    afterPrompt: 'Still your answer? How open-minded should you stay once one option starts winning?',
    hostPrompts: ['What makes evidence “good enough” to act on?', 'How many Trevors does one road trip need?']
  },
  5: {
    title: 'THE VIBES LABORATORY',
    scenario: [
      'Two wellness coaches discover different “truth-finding” methods. One breathes slowly. One listens to their heartbeat. Both own linen pants.',
      'Their methods genuinely calm people down and produce powerful personal insights.'
    ],
    prompt: 'How much should the insight be trusted?',
    choices: ['Trust the inner signal', 'Make it survive an outside test'],
    twist: [
      'The methods help people notice real things about themselves, but the coaches reach opposite conclusions about the same outside facts.',
      'Ignore inner experience and you may throw away useful self-knowledge. Treat every peaceful feeling as evidence and scented candles become a research department.'
    ],
    afterPrompt: 'Still your answer? What can vibes tell you, and when do vibes need receipts?',
    hostPrompts: ['Can something help you without proving your conclusion?', 'What would let the method admit it was wrong?']
  },
  6: {
    title: 'THE MYSTERY BOX HAS LAWYERS',
    scenario: [
      'Scientists find a sealed black box humming in a warehouse. Nobody knows what it does.',
      'Within six hours the internet has blamed aliens, magnets, billionaires, “quantum stuff,” and one man’s ex-wife.'
    ],
    prompt: 'What is the better move?',
    choices: ['Build the best theory now', 'Admit we have no clue yet'],
    twist: [
      'The first theory is wrong, but testing it accidentally reveals the clue that solves the whole thing.',
      'Guessing can move investigation forward. “We do not know” can protect honesty. Either one becomes useless if it starts wearing sunglasses indoors and acting superior.'
    ],
    afterPrompt: 'Still your answer? When does a working theory become a fact wearing a fake moustache?',
    hostPrompts: ['How tentative should a useful theory sound?', 'When does caution become an excuse to investigate nothing?']
  },
  7: {
    title: 'THE NICEST WRONG ANSWER',
    scenario: [
      'A teacher has two students. One confidently gives the wrong answer. The other is terrified to speak because the teacher is known for roasting mistakes like a late-night comedian with tenure.',
      'Today they are calculating an elevator load. The elevator has requested accuracy.'
    ],
    prompt: 'What matters more first?',
    choices: ['Protect people enough to speak', 'Correct the answer immediately'],
    twist: [
      'The gentle class produces more participation but occasionally lets nonsense survive too long. The brutal class gets cleaner answers but half the students stop asking questions.',
      'One room risks confident error. The other risks silent error. The elevator continues to be deeply uncomfortable with both.'
    ],
    afterPrompt: 'Still your answer? How do you correct people without creating a witness-protection program for mistakes?',
    hostPrompts: ['When has kindness made correction easier?', 'When has kindness become avoidance?']
  },
  8: {
    title: 'THE SINCERITY OLYMPICS',
    scenario: [
      'Two people tell incredibly detailed, life-changing stories supporting opposite conclusions. Both are sincere, calm, intelligent, and annoyingly convincing.',
      'A third person arrives with an equally sincere third answer because apparently this meeting needed overtime.'
    ],
    prompt: 'What gets more weight first?',
    choices: ['Take sincere testimony seriously', 'Wait for something outside the stories'],
    twist: [
      'One story later gets a small piece of independent support. The other remains more detailed and internally consistent but has nothing outside it.',
      'Distrust every story and you may ignore real evidence. Trust sincerity as proof and the trophy goes to whoever cries most convincingly.'
    ],
    afterPrompt: 'Still your answer? How much should sincerity count when sincerity cannot break the tie?',
    hostPrompts: ['What makes testimony stronger?', 'What would a neutral third person be able to check?']
  },
  9: {
    title: 'IKEA: DIRECTOR’S CUT',
    scenario: [
      'You are assembling a 600-part machine. The manual is written by the engineer. Your friend says manuals “limit creativity” and has already attached Part 84 to something that looks emotionally unprepared.',
      'You are both now holding Allen keys like weapons.'
    ],
    prompt: 'Who leads when instructions and observation clash?',
    choices: ['Trust the manual first', 'Trust what is happening in front of us'],
    twist: [
      'The manual contains one genuine printing error. Your friend also ignored twenty instructions that were perfectly correct and has created furniture with a limp.',
      'Blind obedience preserves the typo. Freestyle engineering turns one typo into an international incident.'
    ],
    afterPrompt: 'Still your answer? What earns the right to override the instructions?',
    hostPrompts: ['How many errors justify distrusting the whole manual?', 'When does adaptation become “I did not feel like reading”?']
  },
  10: {
    title: 'DELETE THE PAST, KEEP THE DEBT',
    scenario: [
      'Your friend says historical records should be trusted only after independent checking because institutions can lie.',
      'You remind him he owes you $200 from last week. He suddenly becomes a leading scholar of historical uncertainty.'
    ],
    prompt: 'What is the better default?',
    choices: ['Trust reliable records first', 'Stay skeptical until cross-checked'],
    twist: [
      'A respected archive is caught with several forged entries. Most of its remaining records are independently confirmed.',
      'Too much trust inherits institutional mistakes. Too much skepticism conveniently erases history, receipts, and apparently your $200.'
    ],
    afterPrompt: 'Still your answer? How skeptical can you be before ordinary knowledge files for divorce?',
    hostPrompts: ['What makes a record trustworthy?', 'What would make you lower confidence without deleting everything?']
  },
  11: {
    title: 'QUANTUM COURT: PARKING EDITION',
    scenario: [
      'You get a parking ticket and explain that your car is mostly empty space at the atomic level, so technically it barely occupied the spot.',
      'The officer looks tired enough to consider retirement.'
    ],
    prompt: 'Which description should decide the case?',
    choices: ['The everyday description', 'The deeper technical description'],
    twist: [
      'The technical description is essential if the engine needs repair. The everyday description is essential if we are deciding whether your Honda was across two parking spaces like a wounded buffalo.',
      'Both descriptions are true. One of them is just spectacularly useless for this question.'
    ],
    afterPrompt: 'Still your answer? Is the deepest explanation always the most relevant one?',
    hostPrompts: ['What question is each description actually answering?', 'Where does technical language become decorative smoke?']
  },
  12: {
    title: 'GRANDMA’S RULE VS YOUR PODCAST',
    scenario: [
      'Your family has a rule everyone follows because “that is how we have always done it.” You discover a podcast saying inherited beliefs are intellectual cowardice.',
      'Grandma and a man with a ring light are now fighting for custody of your worldview.'
    ],
    prompt: 'What deserves the better starting position?',
    choices: ['Give inherited wisdom initial trust', 'Make inherited ideas prove themselves'],
    twist: [
      'One old family rule turns out to encode practical wisdom nobody remembered the reason for. Another survives only because asking “why?” made Grandpa stare into the distance.',
      'Trust can preserve wisdom and nonsense together. Suspicion can expose nonsense and accidentally throw Grandma out with the bathwater.'
    ],
    afterPrompt: 'Still your answer? How does an inherited idea graduate from “because Grandma said so” to something you actually own?',
    hostPrompts: ['Which inherited rule turned out to be smart?', 'Which one survived mainly through aggressive eyebrow raising?']
  },
  13: {
    title: 'UNDERWEAR HAS A LOCATION SETTING',
    scenario: [
      'A hotel guest opens the door in underwear, sees people in the hallway, and performs the fastest door-close in recorded history.',
      'Twenty minutes later, similar coverage at the pool feels completely normal. Same body. Similar fabric. Suddenly the lobby has laws and the pool has diplomacy.'
    ],
    prompt: 'What should matter more?',
    choices: ['Context changes the meaning', 'The physical exposure matters more'],
    twist: [
      'Context clearly matters in many places: medical exams, locker rooms, beaches, stages. But social rules can also feel “natural” simply because everyone learned them before learning long division.',
      'Ignore context and you flatten real differences. Worship context and every custom gets diplomatic immunity.'
    ],
    afterPrompt: 'Still your answer? When is context meaningful, and when is it just culture wearing a fake moustache?',
    hostPrompts: ['Would the rule feel obvious in another culture?', 'What makes a contextual difference relevant rather than merely familiar?']
  },
  14: {
    title: 'CONGRATS, YOU ARE LEGALLY ALLOWED TO REGRET THIS',
    scenario: [
      'At 18, a company offers you $50,000 today for 20% of everything you earn forever. A lawyer explains every detail. No trick. No pressure.',
      'The contract includes enough legal paper to stun a medium-sized horse.'
    ],
    prompt: 'What matters more?',
    choices: ['Respect the adult’s choice', 'Block obviously predatory terms'],
    twist: [
      'Some adults take wild voluntary risks and transform their lives. Others sign terrible deals because short-term desperation has the negotiating skills of a raccoon in a vending machine.',
      'Protection can become paternalism. Pure consent can become a corporate permission slip for “well, technically you clicked Agree.”'
    ],
    afterPrompt: 'Still your answer? When does protecting adults become control, and when does “their choice” become a convenient excuse?',
    hostPrompts: ['What does valid consent settle?', 'What makes a voluntary deal exploitative anyway?']
  },
  15: {
    title: 'SAINT ACCORDING TO THE PARKING BYLAW',
    scenario: [
      'A man obeys every law. Taxes paid. Seatbelt on. Recycling sorted like a hostage negotiator is watching.',
      'He is also selfish, cruel to friends, unreliable, and somehow always “just being honest” immediately before ruining dinner.'
    ],
    prompt: 'What should carry more weight?',
    choices: ['Clear enforceable rules', 'Standards beyond the law'],
    twist: [
      'Beyond-the-law judgment can become vague, intrusive, and weaponized by whoever owns the loudest moral megaphone.',
      'But law alone leaves him free to be a perfectly legal nightmare. The government has declined to issue a licence for being unbearable.'
    ],
    afterPrompt: 'Still your answer? If law is not enough, who gets to write the unofficial rulebook without becoming unbearable too?',
    hostPrompts: ['Name something legal but clearly rotten.', 'What keeps “moral judgment” from becoming personal taste with a badge?']
  },
  16: {
    title: 'THE FINISH LINE HAS WHEELS',
    scenario: [
      'Your friend says $100k would make him happy. Then $150k. Then $250k. Then a bigger house. Then a watch that needs its own insurance agent.',
      'He now watches videos titled “7 Signs You Are Falling Behind” from a couch he once considered his dream couch.'
    ],
    prompt: 'What is the healthier default after a win?',
    choices: ['Raise the target again', 'Define enough and defend it'],
    twist: [
      'People who stop raising goals can become comfortable and stagnant. People who never define enough turn every victory into the opening ceremony for the next insecurity.',
      'One side risks complacency. The other side buys a treadmill for the soul and sets it to incline.'
    ],
    afterPrompt: 'Still your answer? How do you stay hungry without emotionally eating the furniture?',
    hostPrompts: ['What used to feel like “enough” to you?', 'Which goals improve life and which just move the scoreboard?']
  },
  17: {
    title: '24 HOURS WITH YOURSELF: HORROR MODE',
    scenario: [
      'You get $1,000 to spend 24 comfortable hours with no phone, shows, games, music, work, or internet.',
      'By hour six the wallpaper has a personality, a political position, and possibly a podcast.'
    ],
    prompt: 'Which is healthier as a default?',
    choices: ['Use entertainment freely', 'Protect regular boredom'],
    twist: [
      'Constant stimulation can make ordinary life feel like the loading screen before life starts. But people can also romanticize “disconnecting” and become monks who mysteriously never answer family texts or finish paperwork.',
      'One escape route has autoplay. The other owns a journal and refuses to call itself an escape route.'
    ],
    afterPrompt: 'Still your answer? When does entertainment become dependency, and when does “quiet” become hiding with better branding?',
    hostPrompts: ['What do you reach for the second boredom arrives?', 'What useful thing can silence reveal that scrolling cannot?']
  },
  18: {
    title: 'THE MATRIX, BUT THE WIFI IS AMAZING',
    scenario: [
      'You may enter a simulation where you are loved, successful, healthy, admired, and your favourite team finally stops rebuilding.',
      'It feels completely real. Outside, actual life contains bills, loss, traffic, disappointing people, and printers.'
    ],
    prompt: 'Which life do you choose?',
    choices: ['Take the perfect simulation', 'Keep messy reality'],
    twist: [
      'Reality offers no guarantee of meaning or happiness. The simulation offers both feelings reliably, but none of the relationships or achievements exist outside your experience.',
      'Reality may be brutally overrated. The simulation may be premium-grade emotional catfishing.'
    ],
    afterPrompt: 'Still your answer? If an experience feels completely real, what exactly is reality adding?',
    hostPrompts: ['Would your answer change if your family joined you?', 'What would make a fake achievement matter less if it felt identical?']
  },
  19: {
    title: 'BREAKING: YOUR SIDE IS AWESOME',
    scenario: [
      'A dramatic graphic lands in the group chat proving something you already believe. It has a university logo, a red arrow, and the sacred words “NEW STUDY.”',
      'Nobody has read the study because apparently PDFs are where curiosity goes to die.'
    ],
    prompt: 'What is the better rule?',
    choices: ['Share fast, add a caveat', 'Verify before forwarding'],
    twist: [
      'The graphic exaggerates the study. But in a different case, waiting for perfect verification would have delayed a genuinely useful warning.',
      'Speed can spread truth before it is too late. Speed can also turn Uncle Dave into an unpaid misinformation intern.'
    ],
    afterPrompt: 'Still your answer? How sure should you be before pressing the button that ruins Thanksgiving?',
    hostPrompts: ['Does urgency change the evidence threshold?', 'Do you fact-check flattering claims as hard as insulting ones?']
  },
  20: {
    title: 'WELCOME TO MORALLY CONFUSING ISLAND',
    scenario: [
      'You visit an island with a long-standing custom you strongly dislike. Locals say outsiders always misunderstand it.',
      'The tourism brochure has responded to criticism with “It is complicated ❤️.”'
    ],
    prompt: 'What should be your starting posture?',
    choices: ['Some rules can be wrong anywhere', 'Give local norms strong deference'],
    twist: [
      'Outsiders have often condemned customs they barely understood. Entire societies have also defended practices their own grandchildren later called horrific.',
      'Universal judgment can become arrogant tourism with opinions. Total deference can become “who are we to judge?” while somebody is actively being thrown into a volcano.'
    ],
    afterPrompt: 'Still your answer? How do you avoid arrogance without giving every custom a diplomatic passport?',
    hostPrompts: ['What facts would you need before judging?', 'Can context explain a practice without making it good?']
  },
  21: {
    title: 'THE TOLERANCE CLUB EATS ITSELF',
    scenario: [
      'A club’s founding rule is that members may disagree freely. A new member uses that freedom to campaign for ending everyone else’s freedom to disagree.',
      'He has also printed TOLERANCE NOW shirts, because irony has formally resigned.'
    ],
    prompt: 'What protects the rule better?',
    choices: ['Remove him before he ends it', 'Keep him because the rule includes him'],
    twist: [
      'If he stays and wins, the rule may disappear. If he is removed, future leaders now have a precedent for banning anyone they call “a threat to the rule.”',
      'Congratulations: both doors have a rake lying behind them.'
    ],
    afterPrompt: 'Still your answer? What kind of limit protects openness without becoming the favourite toy of people who hate openness?',
    hostPrompts: ['What behaviour actually threatens the rule?', 'Who decides when disagreement becomes sabotage?']
  },
  22: {
    title: 'FUTURE YOU HAS FILED A COMPLAINT',
    scenario: [
      'You can trade ten healthy years at the end of your life for five extraordinary years right now: energy, money, travel, recovery, and knees that behave like knees.',
      'Future You has been added to the group chat against his will.'
    ],
    prompt: 'Taking the deal?',
    choices: ['Present Me wants the upgrade', 'Future Me gets veto power'],
    twist: [
      'The five great years happen exactly when your family needs you most and your biggest opportunity appears. The ten lost years would happen later when you finally have more free time.',
      'Either answer robs one version of you. Present You just has better access to the password.'
    ],
    afterPrompt: 'Still your answer? Why does the version holding the phone get to spend the other version’s years?',
    hostPrompts: ['What do you owe your future self?', 'Which current habit is basically a loan with horrifying interest?']
  },
  23: {
    title: 'YOUR BELIEF HAS BOSS ARMOUR',
    scenario: [
      'You win $10,000 if you can explain what kind of evidence would make you seriously lower confidence in one important belief.',
      'The host is already holding the cheque. Your ego has requested a commercial break.'
    ],
    prompt: 'Which rule is fairer?',
    choices: ['Every belief needs a way to lose', 'Some beliefs need a whole case, not one knockout fact'],
    twist: [
      'Some conclusions really do rest on many pieces of evidence, so one magic fact should not destroy them.',
      'But if no evidence, combination of evidence, contradiction, or failed prediction could ever hurt the belief, you have not built a fortress. You have turned on cheat codes.'
    ],
    afterPrompt: 'Still your answer? What would a fair defeat condition look like for something you care about?',
    hostPrompts: ['What would make you lower confidence by 20%?', 'Do your opponents get the same armour you give yourself?']
  },
  24: {
    title: 'THE INTERNET EXIT DOOR',
    scenario: [
      'You discover your information world has been heavily filtered around your preferences. There is an exit into a much wider stream of information.',
      'Outside is not “pure truth.” It is also scams, maniacs, newsletters, contradictory experts, and one man yelling into a microphone from his truck.'
    ],
    prompt: 'What is safer?',
    choices: ['Walk into the messy wider world', 'Stay until I understand the filter'],
    twist: [
      'Leaving gives you more independence but also more garbage to sort through. Staying protects you from some garbage while guaranteeing that somebody else keeps deciding which garbage you never see.',
      'Freedom has apparently been shipped without instructions.'
    ],
    afterPrompt: 'Still your answer? How do you escape one filter without immediately marrying another?',
    hostPrompts: ['What filters do you choose on purpose?', 'Which filter would be hardest for you to notice?']
  },
  25: {
    title: 'FREEDOM STARTER PACK™',
    scenario: [
      'Your friend says nobody controls him. His phone recommends what to watch, ads suggest what to buy, debt decides what job he cannot leave, and notifications schedule tiny emotional emergencies all day.',
      'He can, however, choose from 46 phone-case colours. Liberty has never looked so accessorized.'
    ],
    prompt: 'What matters more for freedom?',
    choices: ['Give me more options', 'Give me more self-control'],
    twist: [
      'More options can rescue people from being trapped in one approved life. Self-control can rescue people from being dragged through all 46 options like a shopping cart with one bad wheel.',
      'Options without discipline can become a colourful leash. Discipline without options can become extremely well-organized captivity.'
    ],
    afterPrompt: 'Still your answer? Is freedom the size of the menu or your ability to close it?',
    hostPrompts: ['What choice in your life is actually meaningful?', 'What option do you technically have but emotionally cannot refuse?']
  },
  26: {
    title: 'THE MENU REQUIRES A DEGREE',
    scenario: [
      'Restaurant A has 10,000 combinations. You may customize the bread, sauce, fork weight, music, and emotional arc of the potato.',
      'Restaurant B has eight meals chosen by a chef who refuses to let potatoes have emotional arcs.'
    ],
    prompt: 'Which gives you better freedom?',
    choices: ['The glorious 10,000 choices', 'The eight sane options'],
    twist: [
      'The giant menu contains one perfect meal Restaurant B never offers. Restaurant B saves forty minutes and almost never serves a terrible combination.',
      'More choice can reveal the perfect option. Curation can save your life from becoming a settings menu.'
    ],
    afterPrompt: 'Still your answer? When does curation help, and when is it just someone else quietly holding the remote?',
    hostPrompts: ['Which choices are worth your attention?', 'What have you outsourced because choosing it yourself is exhausting?']
  },
  27: {
    title: 'THE CASINO IN YOUR POCKET',
    scenario: [
      'An app is legal, useful, free to leave, and intentionally designed so people keep coming back longer than they planned.',
      'The company says users are responsible adults. Users say the company hired behavioural scientists to turn a thumb into a full-time employee.'
    ],
    prompt: 'Who carries more responsibility for overuse?',
    choices: ['You have a thumb. Use it.', 'You built the casino in my pocket'],
    twist: [
      'Users really can disable features, leave, or build better habits. Designers really do test notifications, rewards, and friction to increase engagement.',
      'Put everything on the user and the designer gets moral invisibility. Put everything on the designer and adults become decorative houseplants.'
    ],
    afterPrompt: 'Still your answer? Where should responsibility sit when one side has agency and the other side has a behavioural science budget?',
    hostPrompts: ['What should a company be allowed to optimize?', 'When does persuasion become exploitation?']
  },
  28: {
    title: 'BLUE CHECK VS GREASY OVERALLS',
    scenario: [
      'Your car makes a terrible noise. A famous creator with eight million followers says the transmission is dead. A mechanic with thirty years of experience says it is probably a $40 belt.',
      'The creator has dramatic lighting. The mechanic has coffee on his shirt and absolutely no ring light.'
    ],
    prompt: 'Who gets first trust?',
    choices: ['The famous expert-looking person', 'The boring relevant expert'],
    twist: [
      'The mechanic is right this time. Later you discover he is also confidently wrong about a different problem outside his specialty.',
      'Status can fake competence. Real expertise can also become overconfidence once it wanders out of its lane like a shopping cart in traffic.'
    ],
    afterPrompt: 'Still your answer? How much should expertise travel before its passport gets revoked?',
    hostPrompts: ['What makes expertise relevant?', 'When does a famous person become just a person with better lighting?']
  },
  29: {
    title: 'THE LAPTOP GOT THE JOB',
    scenario: [
      'A candidate uses powerful tools to write the résumé, build the portfolio, answer interview questions, and complete the take-home test.',
      'The company calls him “generational talent.” The laptop has not yet been offered dental.'
    ],
    prompt: 'What should matter more?',
    choices: ['Judge the output', 'Judge the underlying ability'],
    twist: [
      'With the tools, he consistently produces excellent work faster than the rest of the team. During an outage, he cannot explain half of what he built.',
      'Output-only may hire a brilliant tool-user who collapses when conditions change. Skill-only may reject someone who can reliably produce great results in the world that actually exists.'
    ],
    afterPrompt: 'Still your answer? When is tool dependence a weakness, and when is refusing tools just cosplay for 1998?',
    hostPrompts: ['What capability must remain without the tool?', 'Which jobs should care most about underlying understanding?']
  },
  30: {
    title: 'DELETE IT FOR TEN GRAND',
    scenario: [
      'Your friend says social apps have zero control over him. You offer $10,000 to delete them for 90 days.',
      'His job does not need them. His actual friends have his number. Humanity will survive without his reaction to brunch photos.'
    ],
    prompt: 'What is the better test of freedom?',
    choices: ['If I choose it, I am free', 'If I can walk away, I am free'],
    twist: [
      'Some people use social apps heavily and can quit immediately. Others use them less but become anxious the moment access disappears.',
      'Frequency alone does not prove dependence. “I could quit anytime” remains history’s most suspicious sentence.'
    ],
    afterPrompt: 'Still your answer? Is freedom about choosing the habit, or surviving the divorce?',
    hostPrompts: ['What habit would be hardest to drop for money?', 'Can something be enjoyable and still own too much of you?']
  },
  31: {
    title: 'PHONE JAIL',
    scenario: [
      'Four adults lock their phones in a box during dinner. First person to ask for a phone pays the whole bill.',
      'Five minutes in, everyone is looking at the box like it contains their parole documents.'
    ],
    prompt: 'Better dinner rule?',
    choices: ['Lock the phones away', 'Keep them and practise self-control'],
    twist: [
      'The phones absolutely wreck attention when left on the table. But during the locked dinner, one genuinely urgent family message arrives and sits unanswered for forty minutes.',
      'Remove temptation and you lose flexibility. Keep access and four grown adults become sunflowers every time something buzzes.'
    ],
    afterPrompt: 'Still your answer? Is good self-control avoiding temptation or being able to sit beside it without licking the glass?',
    hostPrompts: ['What deserves uninterrupted attention?', 'When is availability genuinely worth the distraction cost?']
  },
  32: {
    title: 'THE $30,000 INTERN',
    scenario: [
      'An intern quietly corrects the CEO’s spreadsheet. The CEO ignores her.',
      'Two weeks later a consultant says the exact same thing while wearing a suit with the credit score of a small country.'
    ],
    prompt: 'What should matter more when judging advice?',
    choices: ['Source credibility first', 'Argument quality first'],
    twist: [
      'The intern was right here but has been wrong on several unrelated issues. The consultant has a strong track record but copied this specific insight from someone else.',
      'Ignore source credibility and every random uncle becomes an expert. Worship credentials and truth may need a nicer suit before you let it into the building.'
    ],
    afterPrompt: 'Still your answer? How much should the messenger matter once the message can be checked?',
    hostPrompts: ['When is credibility a useful shortcut?', 'Whose correction is hardest for you to accept?']
  },
  33: {
    title: 'WORLD’S MOST HUMBLE PERSON AWARD',
    scenario: [
      'You can fund a community project anonymously or publicly. Publicity puts your face on a giant banner and may inspire other donors.',
      'The award ceremony is titled “A Celebration of How Little You Care About Recognition.” There will be photographers.'
    ],
    prompt: 'Which is better?',
    choices: ['Do it anonymously', 'Use the publicity to multiply the good'],
    twist: [
      'The public version doubles donations. It also gives you a reputation boost you enjoy far more than expected.',
      'Anonymous giving protects motive but loses useful influence. Public giving can multiply the benefit while quietly turning your ego into an unpaid event planner.'
    ],
    afterPrompt: 'Still your answer? If publicity helps people and feeds your ego, does the ego get to invoice the charity?',
    hostPrompts: ['Would you still do it if nobody praised you?', 'Can mixed motives still produce real good?']
  },
  34: {
    title: 'THE ALMOST LEGEND',
    scenario: [
      'Your friend owns premium gym gear, six business ideas, seventeen courses, a logo for a company that does not exist, and a five-year plan he redesigns every six months.',
      'His slogan is “If I actually locked in, it would be over for everybody.” Everybody remains safe.'
    ],
    prompt: 'What deserves more weight?',
    choices: ['Potential and intention', 'Completed results'],
    twist: [
      'Some high-potential people really do need time, mentoring, and room to fail before results appear. Some people spend twenty years emotionally living off an advance payment for a future self who never arrives.',
      'Ignore potential and you miss late bloomers. Worship potential and eventually your résumé becomes fan fiction.'
    ],
    afterPrompt: 'Still your answer? When does patience become enabling a trailer for a movie that never releases?',
    hostPrompts: ['What evidence shows potential is becoming progress?', 'How long should intention get credit without output?']
  },
  35: {
    title: 'THE TREE DOES NOT ACCEPT BLAME',
    scenario: [
      'A storm drops your neighbour’s tree across your driveway. It is absolutely not your fault. You have an important appointment in two hours.',
      'The tree has declined mediation and is refusing to read your thread about accountability.'
    ],
    prompt: 'What deserves priority?',
    choices: ['Establish fault and make them handle it', 'Solve the problem in front of me'],
    twist: [
      'Clearing it yourself gets you moving but may let the neighbour dodge responsibility and future costs. Waiting preserves accountability but guarantees you remain professionally defeated by wood.',
      'Responsibility and fault have entered a custody battle.'
    ],
    afterPrompt: 'Still your answer? How do you solve what is yours to solve without adopting somebody else’s bill forever?',
    hostPrompts: ['When does taking action become enabling?', 'When does insisting on fault become self-sabotage?']
  },
  36: {
    title: 'THE BOOP BUTTON',
    scenario: [
      'A magical button postpones any uncomfortable task by 24 hours with no immediate penalty. Workout? Boop. Budget? Boop. Apology? Extremely satisfying boop.',
      'The button has better UX than your entire life plan.'
    ],
    prompt: 'Which rule is better?',
    choices: ['Use delay when today is overloaded', 'Do uncomfortable things before comfort'],
    twist: [
      'Strategic delay sometimes prevents bad decisions and protects limited energy. Repeated delay also turns five harmless minutes into a five-year documentary called “How Did This Happen?”',
      'Never postpone and you become rigid. Always postpone and Future You starts forwarding your mail back.'
    ],
    afterPrompt: 'Still your answer? When is “later” strategy, and when is it procrastination wearing glasses?',
    hostPrompts: ['What task gets booped most often?', 'What delay has actually improved a decision for you?']
  },
  37: {
    title: 'ADULT DLC UNLOCKED',
    scenario: [
      'At 18, society unlocks voting, giant loans, contracts, dangerous jobs, and the legal ability to make decisions your 35-year-old self may one day discuss in therapy.',
      'But for some serious life choices, people suddenly say 18-year-olds are basically large children with debit cards.'
    ],
    prompt: 'What should decide readiness?',
    choices: ['Use a clear age rule', 'Judge maturity case by case'],
    twist: [
      'Age rules are crude but predictable and harder to manipulate. Case-by-case judgment can be more accurate but suddenly everyone’s favourite person is “mature for their age” and everyone else is “not ready.”',
      'Consistency is blunt. Discretion has suspiciously flexible eyebrows.'
    ],
    afterPrompt: 'Still your answer? Would you rather live with a blunt rule or a smarter rule that humans get to bend?',
    hostPrompts: ['What does age measure well?', 'What signs of maturity actually matter?']
  },
  38: {
    title: 'FUTURE ME LEFT A VOICEMAIL',
    scenario: [
      'A magical app lets you postpone one major decision exactly five years. Career move? Later. Health plan? Later. Difficult conversation? Later.',
      'The button is enormous, warm, and clearly designed by somebody who hates Future You.'
    ],
    prompt: 'What is the better default?',
    choices: ['Act while the door is open', 'Wait until I know more'],
    twist: [
      'Acting now locks you into one decision you later discover was partly wrong. Waiting gives you better information but closes a different opportunity forever.',
      'Present You and Future You are now leaving each other one-star reviews.'
    ],
    afterPrompt: 'Still your answer? How much uncertainty should you accept before delay becomes its own irreversible choice?',
    hostPrompts: ['What are you assuming will still be available later?', 'Which decision benefits most from more information?']
  },
  39: {
    title: 'PERFECT FAMILY — TAKE 28',
    scenario: [
      'You watch a family video featuring a spotless home, smiling children, homemade food, matching outfits, and a craft project with zero glue in anyone’s hair.',
      'Your living room looks like a toy store lost a custody battle.'
    ],
    prompt: 'What is the better comparison rule?',
    choices: ['Use inspiring examples as a target', 'Ignore curated family content'],
    twist: [
      'The perfect clip took 28 takes and involved candy bribery. But one of the ideas in it genuinely improves your family routine when you try it.',
      'Inspiration can teach. Comparison can quietly make a decent life feel like evidence in a criminal trial.'
    ],
    afterPrompt: 'Still your answer? How do you steal the useful idea without also stealing the insecurity?',
    hostPrompts: ['What does good family life look like off-camera?', 'When has comparison actually helped you improve?']
  },
  40: {
    title: 'BREAKUP UNIVERSITY',
    scenario: [
      'After one terrible breakup, your friend watches three angry relationship videos. The algorithm notices and immediately enrols him in Breakup University.',
      'By Friday his feed explains why half the human race is manipulative, lazy, emotionally unavailable, and probably in a secret group chat about him.'
    ],
    prompt: 'What should he trust more?',
    choices: ['Patterns from lots of stories', 'His own real-world sample'],
    twist: [
      'His personal sample is tiny and emotionally messy. The online stories are numerous but heavily selected by an algorithm rewarded for keeping him angry.',
      'Anecdotes can be too small. Feeds can be a stadium full of anecdotes chosen by a machine that gets paid when you yell.'
    ],
    afterPrompt: 'Still your answer? Which sample is less terrible when both come with emotional baggage?',
    hostPrompts: ['What would representative evidence look like?', 'When does pain turn one example into a worldview?']
  },
  41: {
    title: 'BUILD-A-PARTNER™',
    scenario: [
      'Your friend compares their partner to Person A’s cooking, Person B’s body, Person C’s income, Person D’s romance, and Person E’s suspicious ability to wake up cheerful.',
      'They have assembled five separate humans into one imaginary spouse with a frankly terrifying résumé.'
    ],
    prompt: 'What is the better standard?',
    choices: ['Compare against what is possible', 'Judge the real relationship on its own'],
    twist: [
      'Comparison can expose real neglect and show what improvement looks like. It can also create a fictional competitor built from everyone else’s best edited trait.',
      'Never compare and you may normalize mediocrity. Compare constantly and your spouse eventually loses to a committee.'
    ],
    afterPrompt: 'Still your answer? How many strangers should be allowed to jointly compete against one real person?',
    hostPrompts: ['Which expectations come from real needs?', 'When does comparison stop informing and start poisoning?']
  },
  42: {
    title: 'ONE CLOWN, WHOLE TEAM',
    scenario: [
      'At a massive trivia tournament, one player from Team Orange is caught cheating.',
      'A rival demands all 8,000 Team Orange supporters be treated as suspicious because “you people clearly do this.” Team Orange responds with the ancient legal doctrine of “bro, that was one guy.”'
    ],
    prompt: 'What should matter more?',
    choices: ['Group patterns can justify extra caution', 'Judge each person individually'],
    twist: [
      'Investigators later find a small coordinated cheating ring inside Team Orange. The other 7,960 supporters had absolutely nothing to do with it and mostly wanted nachos.',
      'Ignore group patterns and you may miss coordination. Treat the group as the crime and thousands of innocent people inherit a stranger’s nonsense.'
    ],
    afterPrompt: 'Still your answer? How much group evidence changes individual treatment before caution becomes collective punishment?',
    hostPrompts: ['What evidence justifies extra scrutiny?', 'Would you accept the same standard when your team wears the matching shirt?']
  },
  43: {
    title: 'THE RED-YARN DETECTIVE',
    scenario: [
      'Your cousin covers a wall with photos of executives connected by red yarn. Four share a university, two play golf, and three have summer birthdays.',
      'The wall now also contains a sandwich photo. Nobody remembers why.'
    ],
    prompt: 'What should matter more?',
    choices: ['Patterns of connection deserve suspicion', 'Demand evidence of actual coordination'],
    twist: [
      'Two executives really are coordinating privately. The other connections are innocent coincidences, normal networking, and one extremely popular golf course.',
      'Ignore patterns and real coordination can hide in plain sight. Treat every connection as proof and eventually Kevin Bacon becomes head of global operations.'
    ],
    afterPrompt: 'Still your answer? When does a pattern become evidence instead of red yarn with confidence?',
    hostPrompts: ['What evidence would prove coordination?', 'How many connections can be explained by ordinary social networks?']
  },
  44: {
    title: 'CAMERA TWO HAS ENTERED THE CHAT',
    scenario: [
      'A ten-second clip shows Person A screaming at Person B in public. The internet completes a full moral trial before the video finishes buffering.',
      'Person A is now trending under a nickname ending in “Karen.”'
    ],
    prompt: 'What is the better default?',
    choices: ['Judge what the clip clearly shows', 'Wait for broader context'],
    twist: [
      'Camera Two shows Person B provoking the situation for several minutes. It also confirms Person A still crossed a line afterward.',
      'Context changes the story without magically deleting the behaviour. Apparently two cameras can ruin everyone’s clean narrative at once.'
    ],
    afterPrompt: 'Still your answer? How much context explains conduct without excusing it?',
    hostPrompts: ['What did Camera One prove by itself?', 'When does waiting for context become avoiding obvious evidence?']
  },
  45: {
    title: 'SOURCE: TRUST ME BRO',
    scenario: [
      'A terrifying claim about the other side appears online from an anonymous account with a siren emoji and the words BREAKING BREAKING BREAKING.',
      'It perfectly confirms what your group already suspected, which is always a wonderfully safe moment for critical thinking.'
    ],
    prompt: 'What is the better rule?',
    choices: ['Warn people now, label it unconfirmed', 'Wait for verification'],
    twist: [
      'This specific claim is false. Later, several different serious claims about the same group are independently verified.',
      'Share too fast and your false story becomes a gift to people who want to dismiss the real ones. Wait too long and “verification” can become the comfy chair everyone sits in while actual harm develops.'
    ],
    afterPrompt: 'Still your answer? How do you warn without turning “BREAKING” into a personality disorder?',
    hostPrompts: ['What confidence level justifies sharing?', 'Does a true broader pattern lower the standard for a new specific claim?']
  },
  46: {
    title: 'THE MAYOR’S ACTUAL CUSTOMER',
    scenario: [
      'A mayor campaigns on “residents first.” After winning, residents get folding chairs and six-minute meetings. Major donors and contractors get steak, private calls, and a version of the mayor with much better battery life.',
      'Several policies hurt residents but are very profitable for the people getting dessert.'
    ],
    prompt: 'What explains the behaviour better?',
    choices: ['He is failing the public', 'He is following the incentives around him'],
    twist: [
      'Some unpopular decisions genuinely help the city long-term, so “voters hate it” cannot prove corruption. But after leaving office, the mayor gets a luxury job from an industry he repeatedly favoured.',
      'Bad optics are not proof. Incentives are not mind control. The steak remains suspicious.'
    ],
    afterPrompt: 'Still your answer? When does an incentive explain behaviour, and when are we just writing fan fiction about motives?',
    hostPrompts: ['Who benefits from the policy?', 'What evidence would distinguish courage from capture?']
  },
  47: {
    title: 'THE MANAGER YOU CAN FIRE IN FOUR YEARS',
    scenario: [
      'Your neighbourhood hires a manager to control a shared fund. He repeatedly ignores residents, and your main remedy is to maybe replace him years later.',
      'He describes this as “robust accountability.” The neighbourhood describes it using words not suitable for the minutes.'
    ],
    prompt: 'What is the better system?',
    choices: ['Stable terms with delayed elections', 'More immediate removal power'],
    twist: [
      'Easy removal makes managers hypersensitive to every short-term outrage and impossible long-term planning. Delayed removal gives bad managers years to ignore everyone while updating LinkedIn.',
      'One system risks chaos. The other risks a four-year hostage situation with campaign signs.'
    ],
    afterPrompt: 'Still your answer? How quickly should representation be punishable before governing becomes live-comment-section mode?',
    hostPrompts: ['What decisions need stability?', 'What betrayal should trigger faster consequences?']
  },
  48: {
    title: '900 THEMES, ZERO CONTROL',
    scenario: [
      'A platform gives you 900 profile themes, custom fonts, avatar outfits, twelve notification colours, and an animated raccoon that waves when someone follows you.',
      'Tracking, recommendations, auto-renewal, and the core data rules cannot be turned off.'
    ],
    prompt: 'Which matters more for user freedom?',
    choices: ['Lots of visible choices', 'Control over the hidden structure'],
    twist: [
      'Visible choices genuinely make the product more useful for millions of people. Structural control would also make the system harder to run, less consistent, and much less profitable.',
      'One side can dismiss useful choice as cosmetic. The other can mistake choosing raccoon accessories for constitutional government.'
    ],
    afterPrompt: 'Still your answer? Which choices are freedom, and which are just decorative cup holders on a locked car?',
    hostPrompts: ['What settings actually change power?', 'When is standardization worth limiting choice?']
  },
  49: {
    title: 'THE CONVENIENCE APOCALYPSE',
    scenario: [
      'A town automates everything: doors, directions, shopping, repairs, reminders, cooking, scheduling, and basic thinking before 9 a.m.',
      'Everyone becomes extremely efficient at never learning where anything is.'
    ],
    prompt: 'What should society prioritize?',
    choices: ['Automate aggressively', 'Preserve basic human skills'],
    twist: [
      'Automation cuts errors, saves thousands of hours, and makes difficult tasks accessible to more people. Then a week-long outage arrives and grown adults stand outside a smart door waiting for it to remember how doors work.',
      'Preserve every old skill and progress becomes historical cosplay. Outsource every skill and efficiency becomes a very elegant form of helplessness.'
    ],
    afterPrompt: 'Still your answer? Which skills are worth keeping even if a machine normally does them better?',
    hostPrompts: ['What skill would embarrass you to lose?', 'When is redundancy worth the inefficiency?']
  },
  50: {
    title: 'THE ENGAGEMENT MONSTER',
    scenario: [
      'You design a product that is useful, legal, profitable, and intentionally hard to put down. Your bonus rises when people stay longer.',
      'The design team calls this “engagement.” Your conscience has submitted a bug report.'
    ],
    prompt: 'Who should carry more of the burden for preventing overuse?',
    choices: ['Adults manage themselves', 'Build stronger limits into the product'],
    twist: [
      'Strong limits reduce compulsive use but also annoy power users, creators, small businesses, and people who genuinely want long sessions. Weak limits preserve choice while predictably keeping vulnerable users around longer than they intended.',
      'Guardrails can become paternalistic. Pure choice can become “we studied your weaknesses professionally, good luck out there.”'
    ],
    afterPrompt: 'Still your answer? When does respecting adults mean leaving them alone, and when does it mean not building the floor out of banana peels?',
    hostPrompts: ['What should a product optimize besides time spent?', 'Would your design change if your own family became the heaviest users?']
  }
};

PLOT_TWIST_CARDS.forEach(card => {
  const override = PARTY_CARD_OVERRIDES[card.id];
  if (override) Object.assign(card, override);
});