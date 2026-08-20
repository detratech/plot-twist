'use strict';

const PLOT_TWIST_CARDS = [
  {
    id: 1,
    title: 'THE NIGHTCRAWLER SNEEZE',
    vibe: 'chaos',
    scenario: [
      'You get $5 million tonight.',
      'You also get basically Nightcrawler’s X-Men power, except you do not control it. Every time you sneeze, you teleport somewhere random within 50 km.'
    ],
    prompt: 'Taking the money and the power?',
    twist: [
      'Your clothes come with you. Your phone, wallet, keys, groceries, coffee, and anything you were holding do not.',
      'If you sneeze again before getting home, the next 50 km starts from wherever you landed.'
    ],
    afterPrompt: 'Still taking it, or did $5 million just turn allergy season into a survival game?',
    hostPrompts: ['What is your first rule for leaving the house?', 'How much money would make the risk worth it?']
  },
  {
    id: 2,
    title: 'YOUR 2006 SEARCH HISTORY',
    vibe: 'chaos',
    scenario: [
      'Someone offers you $250,000 cash.',
      'The price is your complete internet history from age 15 to 22: Google searches, YouTube rabbit holes, weird forums, old MSN-era nonsense, all of it. Your closest friends, spouse or future spouse, and parents get a copy.'
    ],
    prompt: 'Taking the money?',
    twist: [
      'You can permanently delete exactly one search before the file goes out.',
      'Everyone will see a giant line that says: ONE ITEM DELETED.'
    ],
    afterPrompt: 'Deleting one, or is the mysterious blank somehow worse than the truth?',
    hostPrompts: ['What would make the blank more suspicious than the actual history?', 'How much should dumb teenage-you count against adult-you?']
  },
  {
    id: 3,
    title: 'THE FOUR FAMILIES',
    vibe: 'late-night',
    scenario: [
      'Four babies are accidentally switched at birth.',
      'One grows up in a home that feels like The Fresh Prince of Bel-Air. One gets The Simpsons. One gets the Toretto family from Fast & Furious. One gets Harry Potter’s Dursleys.',
      'Same starting age. Completely different rules, heroes, fears, expectations, and definitions of “normal.”'
    ],
    prompt: 'At 30 years old, how different are these four people going to be?',
    twist: [
      'All four are intelligent, decent people who sincerely think the household they grew up in taught them the normal way to see life.',
      'None of them chose the family that taught them what “obvious” meant.'
    ],
    afterPrompt: 'When four sincere people inherit four different versions of normal, what should decide which beliefs survive adulthood?',
    hostPrompts: ['What would each person find hardest to question?', 'Which of your own beliefs did you actually choose?']
  },
  {
    id: 4,
    title: 'THE LIMEWIRE GAMBLE',
    vibe: 'wild',
    scenario: [
      'It is 2008. You have spent two hours downloading “The Dark Knight DVDRip REAL FINAL.avi” on LimeWire.',
      'File A has 20,000 downloads and comments saying “100% legit.” File B has barely any downloads, but it came from the one uploader your friend has trusted for years.'
    ],
    prompt: 'Which one are you double-clicking?',
    twist: [
      'File A has the perfect title, file size, thumbnail, and thousands of happy comments.',
      'The uploader account was created yesterday. Also, somewhere in the folder is an .exe file wearing a movie icon.'
    ],
    afterPrompt: 'What should matter most when something can look convincing before you know where it really came from?',
    hostPrompts: ['What made something online feel trustworthy back then?', 'How much should popularity count as evidence?']
  },
  {
    id: 5,
    title: 'MORPHEUS HAS A BUTTON',
    vibe: 'mystery',
    scenario: [
      'Morpheus from The Matrix sits across from you and slides over a red button.',
      'Press it once and you instantly learn the real answer to every major mystery about your life, reality, purpose, and what actually matters. No riddles. No uncertainty.'
    ],
    prompt: 'Pressing it?',
    twist: [
      'Nothing forces you to act on what you learn.',
      'But some answers could make the way you currently spend your time, money, attention, or weekends very hard to defend to yourself afterward.'
    ],
    afterPrompt: 'Do you still want the answer if knowing might cost you a comfortable life?',
    hostPrompts: ['Which answer would you be most nervous to learn?', 'Is there anything you would genuinely rather stay wrong about?']
  },
  {
    id: 6,
    title: 'THE RON SWANSON CABIN',
    vibe: 'mystery',
    scenario: [
      'You and the guys hike hours into untouched wilderness. No road, no trail, no tracks.',
      'Then you find a cabin that looks like Ron Swanson personally spent six months building it: perfect joinery, stacked firewood, steaks resting beside a hot cast-iron pan, beds made, fire going.',
      'Each bed has one of your names carved into a wooden plaque.'
    ],
    prompt: 'What is your first serious explanation?',
    twist: [
      'One guy says, “Nobody had to make it. Forests are old. Give random stuff enough time and weird things happen.”',
      'He has no explanation for the names, hot food, cut lumber, or why it was ready tonight.'
    ],
    afterPrompt: 'When does “random stuff happens” stop being an explanation and become a way of avoiding one?',
    hostPrompts: ['Which detail is hardest to dismiss?', 'What must an explanation actually account for?']
  },
  {
    id: 7,
    title: 'FACEBOOK: SUMMER 2009',
    vibe: 'chaos',
    scenario: [
      'You get $1 million.',
      'But every Facebook photo of you from 2007 to 2012 comes back online permanently: blurry club photos, terrible hair, BlackBerry mirror selfies, questionable outfits, album names like “SUMMER 09!!!”, everything.'
    ],
    prompt: 'Easy money?',
    twist: [
      'Whenever someone searches your name, those photos appear before your career, family, accomplishments, or anything you did later.',
      'You are never allowed to say, “Bro, it was a different time.”'
    ],
    afterPrompt: 'How much money is it worth to let the dumbest version of you become the first version everyone meets?',
    hostPrompts: ['Would you judge someone else by their worst old photo?', 'How much should a past version of you define the current one?']
  },
  {
    id: 8,
    title: 'THE COUNTER-STRIKE ADMIN',
    vibe: 'mystery',
    scenario: [
      'It is 2008 and your crew rents a Counter-Strike server.',
      'One guy has full admin. He can kick players, ban anyone, change maps, rewrite server rules, spawn whatever the server allows, and shut the whole match down.',
      'After a week of abusing admin commands, he declares himself the highest authority in that entire world.'
    ],
    prompt: 'From inside the server, does he look like the top authority?',
    twist: [
      'The hosting company can reset his password, remove his access, wipe the server, cancel the account, or cut the machine off completely.',
      'If the monthly payment stops, his entire “world” disappears whether he likes it or not.'
    ],
    afterPrompt: 'Can he really be the highest authority if both his power and his world depend on something above him?',
    hostPrompts: ['What one fact settles it?', 'Is huge power the same thing as ultimate independence?']
  },
  {
    id: 9,
    title: 'GOOGLE MAPS VS WAZE VS TOMTOM',
    vibe: 'mystery',
    scenario: [
      'You are driving back from a cabin at night with almost no signal and barely enough fuel for one wrong detour.',
      'Google Maps says turn north. Waze says south. The old TomTom someone insisted on bringing says the road ahead does not exist.'
    ],
    prompt: 'Can all three directions be right in the same sense?',
    twist: [
      'All three correctly show your current location, the lake, the highway, and most of the surrounding roads.',
      'They still contradict each other on the one turn that decides whether you get home or spend the night in the car.'
    ],
    afterPrompt: 'Does being right about 95% of the map make the contradiction on the destination disappear?',
    hostPrompts: ['What would you verify before moving?', 'When sources disagree on the crucial point, what matters next?']
  },
  {
    id: 10,
    title: 'JIM VS DWIGHT: THE CLIP',
    vibe: 'late-night',
    scenario: [
      'Imagine a 12-second clip from The Office goes viral with no context.',
      'All you see is Jim shove Dwight away from a doorway. TikTok, Reddit, and your group chat decide Jim is a workplace bully. Millions agree.'
    ],
    prompt: 'How much confidence should you have from the clip alone?',
    twist: [
      'The full scene comes out. Seconds earlier, Dwight had triggered a fake emergency, blocked the doorway, and people were trying to get out.',
      'The 12 seconds were completely real. The conclusion people built from them was not.'
    ],
    afterPrompt: 'If every frame was authentic, how did a true clip create a false story?',
    hostPrompts: ['How often do you look for what happened before the clip?', 'Can true pieces still build a false picture?']
  },
  {
    id: 11,
    title: 'MISSION: IMPOSSIBLE BOSS',
    vibe: 'mystery',
    scenario: [
      'At 10 p.m. you get a WhatsApp voice note from an unknown number.',
      'It sounds exactly like your boss: same voice, same laugh, same nickname for you. He says not to come in tomorrow and asks you to buy $3,000 in gift cards for a client.'
    ],
    prompt: 'Before spending one dollar, what do you do?',
    twist: [
      'The message knows details from a private meeting that morning and includes a video that looks straight out of Mission: Impossible: your boss’s face, voice, office, everything.',
      'You also know deepfakes and voice clones are good enough that “it looked and sounded right” is no longer proof.'
    ],
    afterPrompt: 'When a fake can copy every surface detail, what proves the source rather than just the appearance?',
    hostPrompts: ['Would you call a number you already trusted?', 'What kind of verification cannot be copied from the message itself?']
  },
  {
    id: 12,
    title: 'TONY STARK PAYS THE TAB',
    vibe: 'late-night',
    scenario: [
      'Imagine Tony Stark quietly pays for the entire guys’ trip: gas, cabins, food, gear, everything.',
      'At the end, Michael Scott somehow ends up giving a speech where everyone thinks he paid for the weekend. He does not exactly correct them.'
    ],
    prompt: 'Would watching Michael take the credit bother you?',
    twist: [
      'Tony tells you privately, “Do not announce that it was me. I do not want the attention.”',
      'Michael keeps accepting thank-yous like he personally saved everyone’s vacation.'
    ],
    afterPrompt: 'Can the real person deserve gratitude even if he refuses public credit?',
    hostPrompts: ['Why does proper credit matter?', 'Can gratitude be owed even when recognition is not requested?']
  },
  {
    id: 13,
    title: 'TWO DIFFERENT YOUTUBES',
    vibe: 'late-night',
    scenario: [
      'You and a friend argue about something important and both say, “Bro, the evidence is everywhere. Just look at YouTube.”',
      'One phone is wall-to-wall gym bros, podcasts, and clips supporting his side. The other phone is documentaries, experts, and creators supporting yours.'
    ],
    prompt: 'If both of you can scroll for an hour without seeing the other side, what does “it is everywhere” actually prove?',
    twist: [
      'You both create brand-new accounts and search the exact same topic.',
      'The recommendations change because your old feeds spent years learning what each of you clicked, watched, skipped, and argued with.'
    ],
    afterPrompt: 'How much of “everyone knows this” might really mean “my algorithm knows me”?',
    hostPrompts: ['What would you check outside your normal feed?', 'When did your feed stop being a window and start becoming a mirror?']
  },
  {
    id: 14,
    title: 'STARK TECH VS DWIGHT',
    vibe: 'choices',
    scenario: [
      'Tony Stark builds a ridiculous $50,000 camping machine. It purifies water, generates power, cooks food, heats shelter, and runs half the campsite.',
      'The Stark Industries manual is sitting beside it. Dwight Schrute says manuals are for people who lack instinct and insists he can operate it.'
    ],
    prompt: 'Who are you trusting with the controls?',
    twist: [
      'Annoyingly, Dwight guesses the first four controls correctly and becomes unbearable about it.',
      'The fifth control is an emergency pressure release. Getting that one wrong destroys the machine and could seriously hurt someone.'
    ],
    afterPrompt: 'Do four successful guesses make Dwight a better authority than the person who actually designed the machine?',
    hostPrompts: ['What should confidence be worth here?', 'At what point does “I figured it out” stop being enough?']
  },
  {
    id: 15,
    title: 'THE ANIMAL FIGHT',
    vibe: 'chaos',
    scenario: [
      'Classic campfire nonsense. You cannot run.',
      'Pick one: one horse-sized duck, or one hundred duck-sized horses. Think Pokémon battle logic, except you are the Pokémon and you get no special moves.'
    ],
    prompt: 'Choose now and explain the first ten seconds of your strategy.',
    twist: [
      'The tiny horses move like a coordinated Call of Duty squad and know how to flank.',
      'The giant duck is terrified of bread. You have exactly one hamburger bun.'
    ],
    afterPrompt: 'Switching sides, or are you now defending your first answer just because it became “your” answer?',
    hostPrompts: ['What changed your answer: new evidence or embarrassment?', 'Who in the group has the worst survival plan?']
  },
  {
    id: 16,
    title: 'THE NEO PROBLEM',
    vibe: 'choices',
    scenario: [
      'You get the basic Neo problem from The Matrix.',
      'Option A: everyone around you agrees with your view of reality and treats you like the sensible one, but you are wrong.',
      'Option B: you are right about something huge, but everyone thinks you have completely lost it.'
    ],
    prompt: 'A or B? No third option.',
    twist: [
      'In B, your closest friends and family think you are wrong too.',
      'You are finally proven right twenty years later, but nobody apologizes, nobody gives you credit, and it does not make you famous.'
    ],
    afterPrompt: 'If being right gives you no applause at all, do you still choose being right?',
    hostPrompts: ['How much does agreement affect what feels true?', 'Do you want truth, or the social reward of being confirmed?']
  },
  {
    id: 17,
    title: 'THE WHATSAPP LEAK',
    vibe: 'chaos',
    scenario: [
      'You are offered $500,000.',
      'The price: the last five years of your main guys’ WhatsApp chat becomes public under everyone’s real names. Every meme, rant, voice note, bad joke, argument, and 2 a.m. message.'
    ],
    prompt: 'Taking the deal?',
    twist: [
      'You get all $500,000. The other guys get nothing.',
      'They will know you were the one who pressed YES and turned their private messages into public property.'
    ],
    afterPrompt: 'Does the answer change when the thing you are selling contains pieces of other people?',
    hostPrompts: ['How much money makes betrayal feel justifiable?', 'What do you owe people who trusted the room was private?']
  },
  {
    id: 18,
    title: 'THE TRUMAN SHOW WARNING',
    vibe: 'late-night',
    scenario: [
      'A machine scans your brain and gives you one Truman Show-level warning:',
      '“One major thing you currently believe about life is completely wrong.”',
      'It refuses to tell you which belief.'
    ],
    prompt: 'What area are you investigating first?',
    choices: ['Money', 'Marriage', 'Health', 'Politics', 'Parenting', 'Morality', 'Life purpose', 'Something else'],
    twist: [
      'The wrong belief entered your head before you turned 18.',
      'You cannot remember ever choosing it. It came from some mix of family, school, friends, movies, music, TV, and the early internet until it simply felt like common sense.'
    ],
    afterPrompt: 'How do you examine something that feels obvious specifically because it got there before your adult filter existed?',
    hostPrompts: ['Which inherited belief would cost the most to discover was wrong?', 'What did entertainment teach you before real life got a vote?']
  },
  {
    id: 19,
    title: 'BACK TO 2006',
    vibe: 'late-night',
    scenario: [
      'You wake up back in Grade 8 with your current adult mind.',
      'MSN display names. MuchMusic. Linkin Park and 50 Cent. Dragon Ball Z reruns. Pokémon. PS2. GTA: San Andreas. Jackass. Early YouTube. Facebook is about to arrive. Smartphones are still years away.'
    ],
    prompt: 'Knowing what you know now, what are you refusing to let shape you the same way twice?',
    twist: [
      'You may keep only three beliefs or habits from your original upbringing without re-examining them.',
      'Everything else has to earn its way back into adult-you.'
    ],
    afterPrompt: 'Which three get grandfathered in, and what did you absorb the first time just because everyone around you did?',
    hostPrompts: ['What would you protect your younger self from?', 'Which “normal” idea from that era aged the worst?']
  },
  {
    id: 20,
    title: 'THE JEREMY CLARKSON FORUM GUY',
    vibe: 'wild',
    scenario: [
      'Your car develops a serious problem and you end up on an old forum thread.',
      'User A has 40,000 posts, a legendary username, and writes with Jeremy Clarkson-level confidence. Twenty people thank him and say he has been fixing cars forever.',
      'User B created an account today and says User A is wrong.'
    ],
    prompt: 'Whose advice gets your wrench moving?',
    twist: [
      'The brand-new account posts the factory service manual, the wiring diagram, torque specs, and measurements from your exact model.',
      'The forum legend replies, “Son, I was fixing these before you could drive.”'
    ],
    afterPrompt: 'What should win now: reputation, age, confidence, popularity, or evidence you can actually inspect?',
    hostPrompts: ['What would make you change sides?', 'When does expertise become an appeal to status instead of proof?']
  },
  {
    id: 21,
    title: 'THE 24 CLOCK',
    vibe: 'late-night',
    scenario: [
      'A giant countdown appears in your vision like the clock from 24: 23:59:59.',
      'This is not Jack Bauer’s mission timer. It is yours. When it reaches zero tomorrow, you are gone. You feel completely healthy and cannot stop the clock.'
    ],
    prompt: 'What are you doing tonight, and who absolutely has to be there?',
    twist: [
      'Your inbox, work problems, unread notifications, unfinished arguments, shopping carts, social feeds, and things you were saving “for later” all still exist.',
      'You simply know exactly how little time they have left to matter.'
    ],
    afterPrompt: 'What suddenly becomes important, and what turns out to have been stealing time from you?',
    hostPrompts: ['Who do you need to speak to?', 'What would you be embarrassed to spend your final hour doing?']
  },
  {
    id: 22,
    title: 'YOUR BUDDY THINKS HE IS MIKE HOLMES',
    vibe: 'choices',
    scenario: [
      'You finally find a house you can afford. The neighbourhood is good, the photos look clean, and there are already competing offers.',
      'Your realtor warns that an inspection condition might lose the deal. Your buddy walks through for ten minutes, taps a few walls, and suddenly turns into Mike Holmes: “Bro, this place is solid.”'
    ],
    prompt: 'Clean offer, or insist on the inspection?',
    twist: [
      'The seller casually mentions the basement was finished by the previous owner with no permits.',
      'Your buddy doubles down: “I watch this stuff all the time. I know what bad work looks like.”'
    ],
    afterPrompt: 'How much confidence do you need before gambling twenty-five years of payments on somebody’s ten-minute walkthrough?',
    hostPrompts: ['What are you actually paying an inspector for?', 'When does fear of missing out become a reason to stop checking?']
  },
  {
    id: 23,
    title: 'THE LEAFS HOODIE',
    vibe: 'mystery',
    scenario: [
      'Your friend wears the same Leafs hoodie for five games. Toronto wins all five.',
      'He now refuses to watch without it because, in his words, “Why would I mess with what is working?”'
    ],
    prompt: 'Are you giving that hoodie even one percent of the credit?',
    twist: [
      'Game six: he forgets it and the Leafs win 8–0.',
      'Game seven: he wears it and they lose badly. He says, “That proves nothing. The hoodie cannot control every game.”'
    ],
    afterPrompt: 'If wins support the hoodie but losses never count against it, what possible result could prove him wrong?',
    hostPrompts: ['What would count as actual evidence of cause?', 'Can a belief be tested if no outcome is allowed to count against it?']
  },
  {
    id: 24,
    title: 'THE MACGYVER TOOL',
    vibe: 'late-night',
    scenario: [
      'You find a strange metal tool in a garage with no label.',
      'MacGyver would be proud: one guy opens a paint can with it, another uses it as a doorstop, somebody discovers it can open bottles, and all three uses work perfectly.'
    ],
    prompt: 'Do successful uses tell you what the tool was actually made for?',
    twist: [
      'You find the manufacturer’s original diagram. The tool was designed for one specific job nobody guessed.',
      'The paint-can, doorstop, and bottle-opener tricks still work.'
    ],
    afterPrompt: 'Can something have many useful functions while all of you still miss the reason it was made?',
    hostPrompts: ['Who is in the best position to explain its intended purpose?', 'Is “I found a use for it” the same as “I know why it exists”?']
  }
];

const CAMPFIRE_RUN_IDS = [1, 4, 7, 3, 15, 5, 10, 8, 14, 23, 11, 13, 19, 21];

// Chaos is a universal pressure-test mechanic. Every modifier works with any card,
// whether the current answer is a preference, prediction, explanation, or factual claim.
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
