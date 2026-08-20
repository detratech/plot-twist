'use strict';

const PLOT_TWIST_CARDS = [
  {
    id: 1,
    title: 'TELEPORT SNEEZE',
    vibe: 'chaos',
    scenario: [
      'You get $5 million, tax-free. It is in your account tonight.',
      'The catch: every time you sneeze, you instantly teleport to a random spot somewhere within 50 km.'
    ],
    prompt: 'You have ten seconds. Taking the deal?',
    twist: [
      'Your phone, wallet, keys, and whatever you were carrying stay behind.',
      'If you sneeze again before getting home, the next 50 km starts from wherever you landed.'
    ],
    afterPrompt: 'Still worth it, or did $5 million just buy you a lifetime of never trusting your own nose?',
    hostPrompts: ['What is your first rule for allergy season?', 'How much money would make this an automatic yes?']
  },
  {
    id: 2,
    title: 'THE OLD SEARCH HISTORY',
    vibe: 'chaos',
    scenario: [
      'Someone offers you $250,000 cash.',
      'In return, your complete browser and search history from age 15 to 22 gets sent to your closest friends, your spouse or future spouse, and your parents.'
    ],
    prompt: 'Taking the money?',
    twist: [
      'You are allowed to permanently delete exactly one search before the file gets sent.',
      'Everyone will know you used the deletion.'
    ],
    afterPrompt: 'Is one mystery worse than letting them see the whole thing?',
    hostPrompts: ['Would you rather explain everything or leave one suspicious blank?', 'How much of your younger self still feels like “you”?']
  },
  {
    id: 3,
    title: 'THE BABY MIX-UP',
    vibe: 'late-night',
    scenario: [
      'A hospital makes a massive mistake. Four babies go home with four completely different families in four different parts of the world.',
      'Different languages. Different rules. Different ideas about family, success, right and wrong, and what a normal life looks like.',
      'Twenty-five years later, all four meet.'
    ],
    prompt: 'How much of what they believe came from them, and how much came from where they happened to land?',
    twist: [
      'All four are intelligent and sincere.',
      'All four are also completely convinced that their own way of seeing life is just “obviously normal.”'
    ],
    afterPrompt: 'If four smart people can inherit four different versions of “obvious,” what should actually decide who is right?',
    hostPrompts: ['What would be hardest for each person to question?', 'Which of your own beliefs did you choose, and which did you inherit?']
  },
  {
    id: 4,
    title: 'THE LIMEWIRE DOWNLOAD',
    vibe: 'wild',
    scenario: [
      'It is 2007. You have waited two hours for a movie to download.',
      'File A has thousands of downloads and a pile of comments saying “works perfect.” File B has almost no downloads, but it came from the one uploader your friend has trusted for years.'
    ],
    prompt: 'Which file are you opening first?',
    twist: [
      'File A has the exact right title, file size, and thumbnail.',
      'The uploader created the account yesterday.'
    ],
    afterPrompt: 'What matters more when you cannot inspect the file yourself: popularity, appearance, or where it actually came from?',
    hostPrompts: ['What used to make you trust something online?', 'How much did a crowd of strangers influence you back then?']
  },
  {
    id: 5,
    title: 'THE RED BUTTON',
    vibe: 'mystery',
    scenario: [
      'You find a ridiculous red button in the forest.',
      'The sign says: “Press once and learn the real answer to every major mystery about life.”',
      'No trick. It actually works.'
    ],
    prompt: 'Pressing it?',
    twist: [
      'The button does not force you to change anything afterward.',
      'But some answers could make your current habits, priorities, friendships, or way of living much harder to justify to yourself.'
    ],
    afterPrompt: 'Do you still want the truth if ignorance would be more comfortable?',
    hostPrompts: ['Which answer would you be most nervous to learn?', 'Is there anything you would rather stay comfortably wrong about?']
  },
  {
    id: 6,
    title: 'THE IMPOSSIBLE CABIN',
    vibe: 'mystery',
    scenario: [
      'You and the guys hike hours into untouched wilderness. No road, no trail, no footprints, no sign anyone has been there.',
      'Then you find a perfect cabin. Fire burning. Food hot. Beds made. Dry firewood stacked.',
      'Each bed has one of your names written above it.'
    ],
    prompt: 'What is your first serious explanation?',
    twist: [
      'One guy shrugs: “Maybe nobody prepared it. Weird stuff happens if you give nature enough time.”',
      'He cannot explain the names, the hot food, or why it was ready on the exact night you arrived.'
    ],
    afterPrompt: 'At what point is “weird stuff happens” not actually an explanation anymore?',
    hostPrompts: ['Which detail carries the most weight?', 'What does a good explanation have to explain rather than ignore?']
  },
  {
    id: 7,
    title: 'THE FACEBOOK ALBUM',
    vibe: 'chaos',
    scenario: [
      'You get $1 million.',
      'But every tagged photo of you from 2007 to 2012 comes back online permanently. Frosted tips, terrible outfits, awkward poses, everything.'
    ],
    prompt: 'Easy money?',
    twist: [
      'Whenever someone searches your name, those photos appear before anything you have done as an adult.',
      'You are never allowed to explain that “it was a different time.”'
    ],
    afterPrompt: 'How much money is it worth to let your dumbest younger moments become your public identity forever?',
    hostPrompts: ['Would you judge someone else by their worst old photo?', 'How much should the past control how people see you now?']
  },
  {
    id: 8,
    title: 'THE SERVER ADMIN',
    vibe: 'mystery',
    scenario: [
      'It is 2009 and you and the guys rent a private game server.',
      'One admin has every permission inside it. He can kick anyone, rewrite the rules, change the map, wipe inventories, and shut the game down for every player.',
      'He starts calling himself “the absolute owner of this world.”'
    ],
    prompt: 'Based only on what the players can see, does that sound fair?',
    twist: [
      'Then the hosting company emails him.',
      'They can reset his password, remove his admin rights, delete the server, cut the power, or stop hosting him entirely. He has to keep paying them for the server to exist.'
    ],
    afterPrompt: 'Can he really be the highest authority if his power and continued existence depend on something above him?',
    hostPrompts: ['What single fact settles the question?', 'Is being extremely powerful the same as being independent of everything else?']
  },
  {
    id: 9,
    title: 'THREE GPS ROUTES',
    vibe: 'mystery',
    scenario: [
      'You are driving back from a cabin at night with almost no signal.',
      'Three offline navigation apps disagree. One says turn north. One says south. One says the road ahead does not exist.',
      'You have fuel for one wrong detour, not two.'
    ],
    prompt: 'Can all three directions be right in the same sense?',
    twist: [
      'All three correctly show your location, the lake, the highway, and most of the surrounding roads.',
      'They still contradict each other on the exact turn that decides whether you get home.'
    ],
    afterPrompt: 'Does being right about a lot of things make the contradiction on the important thing disappear?',
    hostPrompts: ['What would you verify before moving?', 'How much accuracy is enough when the sources disagree on the destination?']
  },
  {
    id: 10,
    title: 'THE VIRAL CLIP',
    vibe: 'late-night',
    scenario: [
      'A 12-second video blows up online. A guy you have never met looks arrogant, cruel, and completely guilty.',
      'Millions of people are roasting him. Your group chat is unanimous: “This guy is trash.”'
    ],
    prompt: 'How confident are you that the clip tells you what happened?',
    twist: [
      'The full four-minute video appears the next day.',
      'The 12 seconds were real, but the minute before them completely changes why he said what he said.'
    ],
    afterPrompt: 'If the clip was technically real but gave you the wrong conclusion, what exactly did “millions of people saw it” prove?',
    hostPrompts: ['How often do you watch the full source before forming an opinion?', 'Can true pieces still create a false picture?']
  },
  {
    id: 11,
    title: 'THE BOSS VOICE NOTE',
    vibe: 'mystery',
    scenario: [
      'At 10 p.m. you get a WhatsApp voice note from an unknown number.',
      'It sounds exactly like your boss: “Do not come in tomorrow. I need you to buy $3,000 in gift cards for a client. I will reimburse you in the morning.”'
    ],
    prompt: 'What would you do before spending a dollar?',
    twist: [
      'The voice uses your nickname, mentions a private meeting from earlier that day, and sounds perfect.',
      'You also know convincing voice clones now exist.'
    ],
    afterPrompt: 'When a message can imitate every surface detail, what kind of verification actually matters?',
    hostPrompts: ['Would you call a number you already trusted?', 'What evidence proves the source instead of just making the message look convincing?']
  },
  {
    id: 12,
    title: 'THE SECRET SPONSOR',
    vibe: 'late-night',
    scenario: [
      'Someone quietly pays for the entire guys’ trip. Gas. Food. Gear. Campsite. Everything.',
      'At the end, another guy who paid for nothing lets everyone thank him like he funded the whole weekend.'
    ],
    prompt: 'Would that bother you enough to say something?',
    twist: [
      'The actual person who paid tells you privately: “Do not announce it was me. I do not need the attention.”',
      'The other guy keeps enjoying the credit.'
    ],
    afterPrompt: 'Can you respect the real sponsor’s privacy without letting your gratitude land on the wrong person?',
    hostPrompts: ['Why does giving proper credit matter?', 'Does someone deserve thanks even if they never ask for it?']
  },
  {
    id: 13,
    title: 'THE ALGORITHM RESET',
    vibe: 'late-night',
    scenario: [
      'You and a friend argue about something important and both say, “Just look it up. The evidence is everywhere.”',
      'You each open the apps and sites you have used for years. Your feeds are full of completely different experts, clips, headlines, and comments.'
    ],
    prompt: 'If both feeds make each side look obviously right, what do you trust?',
    twist: [
      'You create two brand-new accounts with no history and search the exact same topic.',
      'The recommendations change again because the old accounts had spent years learning what each of you already clicked, watched, and agreed with.'
    ],
    afterPrompt: 'How much of what feels like “everyone knows this” might actually mean “my feed keeps showing me this”?',
    hostPrompts: ['What would you check outside your normal feed?', 'When did the internet stop showing everyone the same internet?']
  },
  {
    id: 14,
    title: 'THE $50,000 MACHINE',
    vibe: 'choices',
    scenario: [
      'You buy a ridiculous $50,000 camping machine. It purifies water, generates electricity, cooks food, heats shelter, and runs half the campsite.',
      'The manufacturer’s manual is sitting right beside it.'
    ],
    prompt: 'Your friend says he can figure it out without the manual. Letting him?',
    twist: [
      'Annoyingly, he guesses the first four controls correctly and now feels completely vindicated.',
      'The fifth control is the emergency pressure release. Getting that one wrong can destroy the machine.'
    ],
    afterPrompt: 'Do four successful guesses make him a better authority than the people who designed the machine?',
    hostPrompts: ['What should confidence be worth here?', 'When should experience give way to the maker’s instructions?']
  },
  {
    id: 15,
    title: 'THE ANIMAL FIGHT',
    vibe: 'chaos',
    scenario: [
      'You cannot run. Pick one opponent:',
      'One horse-sized duck, or one hundred duck-sized horses.'
    ],
    prompt: 'Choose now and give the group your plan.',
    twist: [
      'The tiny horses move as one organized team and know how to flank.',
      'The giant duck is terrified of bread. You have exactly one hamburger bun.'
    ],
    afterPrompt: 'Switching sides, or are you emotionally committed to the terrible plan you already defended?',
    hostPrompts: ['What is the first ten seconds of your strategy?', 'How much did having to defend your first answer make you want to keep it?']
  },
  {
    id: 16,
    title: 'EVERYONE THINKS YOU’RE WRONG',
    vibe: 'choices',
    scenario: [
      'Pick one:',
      'A: Every friend, coworker, expert, and person online agrees with you about something important, but you are wrong.',
      'B: Everyone thinks you are an idiot, but you are right.'
    ],
    prompt: 'A or B? No third option.',
    twist: [
      'In B, your closest friends and family are against you too.',
      'Nobody proves you right for twenty years. When they finally do, you get no credit and nobody apologizes.'
    ],
    afterPrompt: 'If being right gives you no status, no applause, and years of pressure, do you still want to be right?',
    hostPrompts: ['How much does agreement affect your confidence?', 'Do you want the truth, or do you want the feeling of being confirmed?']
  },
  {
    id: 17,
    title: 'THE GROUP CHAT LEAK',
    vibe: 'chaos',
    scenario: [
      'You are offered $500,000.',
      'The price: every message you have sent in your main guys’ group chat for the last five years becomes public under your real name.'
    ],
    prompt: 'Taking the deal?',
    twist: [
      'The other guys do not get paid, but their messages appear too because they were part of the same conversations.',
      'They will know you were the person who accepted the deal.'
    ],
    afterPrompt: 'Does the answer change when the thing you are selling is not only yours?',
    hostPrompts: ['How much money would make betrayal feel justifiable?', 'What do you owe people who trusted a private space?']
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
    choices: ['Money', 'Marriage', 'Health', 'Politics', 'Parenting', 'Morality', 'Life purpose', 'Something else'],
    twist: [
      'The wrong belief is something you picked up before age 18.',
      'You cannot remember ever sitting down and deciding it was true. It just became part of how you see the world.'
    ],
    afterPrompt: 'How do you test a belief that feels like common sense precisely because you learned it before you knew to question it?',
    hostPrompts: ['Which inherited belief would cost the most to discover was wrong?', 'What did movies, friends, family, or the internet teach you before you had a filter?']
  },
  {
    id: 19,
    title: 'BACK TO GRADE 8',
    vibe: 'late-night',
    scenario: [
      'You wake up back in Grade 8 with your current mind.',
      'Same school. Same family. Same friends. MSN, early YouTube, movies, music, gaming, and the whole teenage internet era are about to hit you again.'
    ],
    prompt: 'What is the first thing you refuse to let shape you the same way twice?',
    twist: [
      'You are allowed to keep only three beliefs or habits from your original upbringing without re-examining them.',
      'Everything else has to earn its way back into your life.'
    ],
    afterPrompt: 'Which three survive automatically, and what did you absorb the first time just because it was everywhere?',
    hostPrompts: ['What would you protect your younger self from?', 'What did entertainment teach you that real adulthood later corrected?']
  },
  {
    id: 20,
    title: 'THE FORUM LEGEND',
    vibe: 'wild',
    scenario: [
      'You are trying to fix a serious car problem.',
      'One forum user has 40,000 posts, a legendary username, and twenty people thanking him for his answer.',
      'Another account was created today and says the famous guy is wrong.'
    ],
    prompt: 'Who are you trusting before you start taking the car apart?',
    twist: [
      'The new account posts the factory service manual, wiring diagram, and measurements from your exact model.',
      'The famous user replies: “I have been doing this longer than you have been alive.”'
    ],
    afterPrompt: 'At that point, what should carry more weight: reputation, confidence, years of experience, or evidence you can actually check?',
    hostPrompts: ['What would make you change sides?', 'How often do status and expertise get mistaken for proof?']
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
      'You cannot spend the day trying to prevent it.',
      'Your inbox, work problems, unfinished arguments, social feeds, purchases, and things you were saving “for later” are all still there. You just know exactly how little time they have left to matter.'
    ],
    afterPrompt: 'What suddenly becomes important, and what turns out to have been stealing time from you?',
    hostPrompts: ['Who do you need to speak to?', 'What would you be embarrassed to spend your final hour doing?']
  },
  {
    id: 22,
    title: 'THE HOUSE INSPECTION',
    vibe: 'choices',
    scenario: [
      'You finally find a house you can afford. The photos look great, the neighbourhood is good, and there are already other offers.',
      'Your realtor says, “If we put an inspection condition in, we might lose it.”'
    ],
    prompt: 'Do you make the clean offer or insist on the inspection?',
    twist: [
      'A friend who “knows houses” walks through for ten minutes and says it looks solid.',
      'The seller then casually mentions the basement was finished by the previous owner without permits.'
    ],
    afterPrompt: 'How much certainty do you need before making a decision that could cost you for twenty-five years?',
    hostPrompts: ['What risk are you actually accepting?', 'When does fear of missing out become a bad reason to stop verifying?']
  },
  {
    id: 23,
    title: 'THE LUCKY HOODIE',
    vibe: 'mystery',
    scenario: [
      'Your friend wears the same hoodie to five hockey games. His team wins all five.',
      'He now refuses to watch without it because the hoodie is “clearly doing something.”'
    ],
    prompt: 'Funny superstition, or are you giving the hoodie even one percent of the credit?',
    twist: [
      'Game six: he forgets it and the team wins 8–0.',
      'Game seven: he wears it and they lose badly. He says, “That does not prove anything. The hoodie cannot win every game.”'
    ],
    afterPrompt: 'If every possible result can be explained away, what result would ever prove the belief wrong?',
    hostPrompts: ['What would count as real evidence of cause?', 'Can a belief be tested if nothing is allowed to count against it?']
  },
  {
    id: 24,
    title: 'THE MYSTERY TOOL',
    vibe: 'late-night',
    scenario: [
      'You find a weird metal tool in a garage. Nobody knows what it is for.',
      'One guy uses it to open a paint can. It works. Another uses it as a doorstop. That works too. Someone else says it makes a decent bottle opener.'
    ],
    prompt: 'Do those successful uses tell you what the tool was actually made for?',
    twist: [
      'You find the manufacturer’s diagram. It was designed for one very specific job none of you guessed.',
      'All the other uses still technically work.'
    ],
    afterPrompt: 'Can something be useful for many things without any of those things being its actual purpose?',
    hostPrompts: ['Who is in the best position to tell you what it was made for?', 'Is “I found a use for it” the same as “I know why it exists”?']
  }
];

const CAMPFIRE_RUN_IDS = [2, 4, 3, 7, 5, 6, 15, 8, 10, 13, 11, 12, 19, 21];

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