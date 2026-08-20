'use strict';

const PLOT_TWIST_CARDS = [
  {
    id: 1,
    title: 'WHO WANTS TO BE A MILLIONAIRE?',
    vibe: 'warm-up',
    scenario: [
      'You are on the $500,000 question. You have no idea, so you use two lifelines.',
      'The studio audience votes 91% for B. Your phone-a-friend is your annoyingly smart cousin, and he says D because he remembers the exact fact from school.'
    ],
    prompt: 'Who are you trusting: the crowd or your cousin?',
    choices: ['91% crowd', 'Smart cousin'],
    twist: [
      'The correct answer is D. Your cousin was right.',
      'The audience was not lying. Most of them were just confidently guessing together.'
    ],
    afterPrompt: 'What mattered more: how many people believed it, or why they believed it?',
    hostPrompts: ['When is a crowd useful?', 'When is a crowd just a lot of guesses?']
  },
  {
    id: 2,
    title: 'DWIGHT\'S LUCKY TIE',
    vibe: 'warm-up',
    scenario: [
      'Dwight has his three best sales days of the year while wearing the same ugly mustard-coloured tie.',
      'He tells Jim the tie is clearly improving his sales and refuses to meet a client without it.'
    ],
    prompt: 'Lucky tie or coincidence?',
    choices: ['Lucky tie', 'Coincidence'],
    twist: [
      'The next day Dwight wears the tie and sells nothing.',
      'Jim checks the numbers and finds that all three big days came from the same company-wide promotion.'
    ],
    afterPrompt: 'Did the tie cause the sales just because both happened together?',
    hostPrompts: ['What was the better cause?', 'What else do people confuse with cause and effect?']
  },
  {
    id: 3,
    title: 'JACK SPARROW\'S 30 PIRATES',
    vibe: 'warm-up',
    scenario: [
      'Thirty pirates in Tortuga warn you that a nearby island is cursed. Every one of them tells the story slightly differently, but they all swear it is true.',
      'Jack Sparrow asks one question: “Where did each of you hear it?”'
    ],
    prompt: 'Thirty witnesses sounds strong. Do you believe them?',
    choices: ['Believe them', 'Check first'],
    twist: [
      'All thirty stories trace back to the same drunk sailor who claimed he saw a ghost from half a mile away.',
      'One rumour turned into thirty retellings.'
    ],
    afterPrompt: 'Do thirty copies of one source count like thirty independent sources?',
    hostPrompts: ['What makes a source independent?', 'How often does repetition feel like proof?']
  },
  {
    id: 4,
    title: 'THE DARK KNIGHT CLIP',
    vibe: 'warm-up',
    scenario: [
      'A ten-second video hits YouTube. Batman punches a man, throws him through a glass door, and disappears before police arrive.',
      'The comments are brutal. Everyone says the clip finally proves Batman is just a violent lunatic.'
    ],
    prompt: 'Based on the clip, fair conclusion or too fast?',
    choices: ['Fair conclusion', 'Too fast'],
    twist: [
      'The full security video appears. The man had a detonator and was seconds away from setting off a bomb in the building.',
      'Nothing in the ten-second clip was fake. It was just missing the part that changed the meaning.'
    ],
    afterPrompt: 'Can completely real evidence still create the wrong conclusion when context is missing?',
    hostPrompts: ['What did the short clip prove?', 'What did it fail to prove?']
  },
  {
    id: 5,
    title: 'THE BEST WIZARD',
    vibe: 'warm-up',
    scenario: [
      'Harry, Hermione, and Neville are arguing at Hogwarts about who is the “best wizard.”',
      'Harry points to duelling. Hermione points to grades and knowledge. Neville points to the fact that neither of them should be trusted near a greenhouse.'
    ],
    prompt: 'Who is the best wizard?',
    choices: ['Harry', 'Hermione', 'Neville'],
    twist: [
      'Dumbledore walks past and asks, “Best at what?”',
      'Suddenly everyone realizes they were using the same word for three different things.'
    ],
    afterPrompt: 'Can you settle an argument before agreeing on what the important word means?',
    hostPrompts: ['Pick one definition of “best.”', 'Who wins under that definition?']
  },
  {
    id: 6,
    title: 'BUMBLEBEE IN THE GARAGE',
    vibe: 'warm-up',
    scenario: [
      'Your friend calls you at midnight and says his old yellow Camaro is actually an alien robot.',
      'He sounds completely serious. You know he has also said some very stupid things at midnight.'
    ],
    prompt: 'Believe him or assume he has lost it?',
    choices: ['Believe him', 'He has lost it'],
    twist: [
      'You walk into the garage. The Camaro stands up, looks at you, and turns into Bumblebee.',
      'Your original disbelief was reasonable. Keeping the same answer now would not be.'
    ],
    afterPrompt: 'Is changing your mind weakness, or exactly what you should do when the evidence changes?',
    hostPrompts: ['Was disbelief reasonable at first?', 'At what point would refusing to change become stubbornness?']
  },
  {
    id: 7,
    title: 'DOM\'S MARKETPLACE CIVIC',
    vibe: 'evidence',
    scenario: [
      'You are buying a used Civic on Facebook Marketplace. From a stranger, you want service records, a Carfax, a cold start, and a mechanic inspection.',
      'Then you find out the seller is Dom Toretto\'s cousin. Dom says, “He is family. You can trust him.”'
    ],
    prompt: 'Same inspection or trust the family connection?',
    choices: ['Same inspection', 'Trust family'],
    twist: [
      'The mechanic finds a disabled check-engine light and an oil leak hidden by a fresh engine wash.',
      'The cousin may still be a nice guy. The car is still leaking oil.'
    ],
    afterPrompt: 'Should your standard of evidence get weaker just because the claim comes from your own side?',
    hostPrompts: ['When is trust relevant?', 'Where do people use tougher standards on outsiders than insiders?']
  },
  {
    id: 8,
    title: 'SORTED AT BIRTH',
    vibe: 'evidence',
    scenario: [
      'Imagine Hogwarts sorts every baby into a House before they can even speak.',
      'For thirty years, your family, friends, teachers, posters, sports teams, and social circle all tell you your House is obviously the best one.'
    ],
    prompt: 'At age 30, how much of that loyalty feels chosen?',
    choices: ['Mostly chosen', 'Mostly inherited'],
    twist: [
      'A new Sorting Hat tests adults from every House and moves a huge number of them somewhere else.',
      'Most people get angry before asking whether the new test is accurate.'
    ],
    afterPrompt: 'If something has always felt normal, does that make it true or just familiar?',
    hostPrompts: ['Does inherited automatically mean wrong?', 'How would you test something you inherited?']
  },
  {
    id: 9,
    title: 'JURASSIC PARK: SPARED NO EXPENSE',
    vibe: 'evidence',
    scenario: [
      'John Hammond invites you to Jurassic Park before opening day. He keeps repeating that he “spared no expense.” The jeeps look amazing, the visitor centre is beautiful, and everyone is impressed.',
      'Ian Malcolm points at the safety systems and says the park is not ready.'
    ],
    prompt: 'Open the park or delay it?',
    choices: ['Open it', 'Delay it'],
    twist: [
      'A technician discovers the electric fences, door locks, and tracking systems all depend on one vulnerable control system.',
      'The fancy visitor centre did not make the weak point disappear.'
    ],
    afterPrompt: 'When the sales pitch and the evidence disagree, which one should win?',
    hostPrompts: ['What looked impressive but proved little?', 'What single fact mattered most?']
  },
  {
    id: 10,
    title: 'THE SIMPSONS PREDICTED IT',
    vibe: 'evidence',
    scenario: [
      'Your friend has a folder called “THE SIMPSONS KNOW THE FUTURE.” It contains twelve clips that look strangely similar to things that happened years later.',
      'He says twelve hits are impossible to explain by coincidence.'
    ],
    prompt: 'Real prediction or cherry-picking?',
    choices: ['Real prediction', 'Cherry-picking'],
    twist: [
      'You remind him that the show has hundreds of episodes and thousands of jokes, guesses, signs, headlines, and random scenes.',
      'You ask him to use the show to predict one specific event next month. He cannot.'
    ],
    afterPrompt: 'Is finding matches afterward the same as predicting something beforehand?',
    hostPrompts: ['What happened to all the misses?', 'What would make a prediction genuinely impressive?']
  },
  {
    id: 11,
    title: 'THE CALL OF DUTY HACKER',
    vibe: 'evidence',
    scenario: [
      'A guy in your Call of Duty lobby hits one ridiculous wallbang and the entire lobby starts yelling that he is hacking.',
      'Someone clips the kill and posts it to the group chat. Watching only that five seconds, it really does look suspicious.'
    ],
    prompt: 'Hacker or lucky shot?',
    choices: ['Hacker', 'Lucky shot'],
    twist: [
      'You watch the full match. He finishes 3 kills and 19 deaths and misses almost every other shot.',
      'The “impossible” clip was his one lucky moment.'
    ],
    afterPrompt: 'How much should one dramatic example tell you about the whole pattern?',
    hostPrompts: ['What sample would be more useful?', 'Why do dramatic examples stick so hard?']
  },
  {
    id: 12,
    title: 'BLACKBERRY VS IPHONE',
    vibe: 'evidence',
    scenario: [
      'It is 2010. You are in a Facebook group full of BlackBerry die-hards. Your friend is in an iPhone group.',
      'Your feed makes it look like everyone knows physical keyboards are better. His feed makes it look like everyone knows touchscreens are the future.'
    ],
    prompt: 'Whose feed shows what “everyone” really thinks?',
    choices: ['My feed', 'His feed', 'Neither'],
    twist: [
      'You both leave the fan groups and look at a broad survey. The public is badly split.',
      'Both groups were real. Both groups were also selected because they already agreed with themselves.'
    ],
    afterPrompt: 'Can your environment make a minority view feel universal?',
    hostPrompts: ['What does your feed select for?', 'What would you check outside your normal circle?']
  },
  {
    id: 13,
    title: 'THE MATRIX OFFER',
    vibe: 'pressure',
    scenario: [
      'Morpheus gives you a choice. One option lets you stay in a comfortable fake world where your life is easy and nothing challenges you.',
      'The other gives you the truth, but it may make your life harder and force you to rethink things you were comfortable with.'
    ],
    prompt: 'Comfort or truth?',
    choices: ['Comfort', 'Truth'],
    twist: [
      'Nobody will ever know which one you picked. There is no reputation to gain from choosing truth.',
      'You only have to live with the answer yourself.'
    ],
    afterPrompt: 'Do you still want truth when there is no applause for choosing it?',
    hostPrompts: ['What makes truth expensive?', 'Would your answer change if the truth cost you a habit you enjoy?']
  },
  {
    id: 14,
    title: 'Q\'S MYSTERY GADGET',
    vibe: 'pressure',
    scenario: [
      'Q from James Bond leaves a strange gadget on your table without explaining it.',
      'You discover it works as a flashlight, charges a phone, opens a bottle, and is heavy enough to hold a door open. The guys start arguing about what it was made for.'
    ],
    prompt: 'Can you figure out its intended purpose from those uses alone?',
    choices: ['Yes', 'Not for sure'],
    twist: [
      'Q comes back and says it is actually an emergency locator beacon hidden inside an ordinary object.',
      'Everything else you discovered was real, but none of it was the main reason he built it.'
    ],
    afterPrompt: 'Can useful side effects tell you what something was ultimately made for?',
    hostPrompts: ['Who knows intended purpose best?', 'Can users invent uses without changing the maker’s purpose?']
  },
  {
    id: 15,
    title: 'GTA GOD MODE',
    vibe: 'pressure',
    scenario: [
      'You turn on every GTA cheat. Infinite health. Every weapon. Any car. Police cannot stop you. Nothing inside the game can really threaten you.',
      'Your character feels like the most powerful thing in that entire world.'
    ],
    prompt: 'Inside the game, are you basically all-powerful?',
    choices: ['Yes', 'No'],
    twist: [
      'Your little brother walks into the room and pulls the console plug.',
      'Every cheat, car, weapon, and rule disappears instantly because your power was always depending on something outside the game.'
    ],
    afterPrompt: 'Can something be ultimate if its whole existence depends on something above it?',
    hostPrompts: ['Was your character powerful?', 'Is powerful the same as independent?']
  },
  {
    id: 16,
    title: 'THE PS5 TEARDOWN',
    vibe: 'pressure',
    scenario: [
      'A Sony engineer takes apart a PS5 and explains everything: processor, cooling, memory, power supply, controller input, storage, and exactly what happens when you press the power button.',
      'By the end, nobody in the room understands the machine better than he does.'
    ],
    prompt: 'Has he explained everything worth asking about the PS5?',
    choices: ['Yes', 'No'],
    twist: [
      'Someone asks, “Why did Sony decide to build this machine at all? What was it designed to do for people?”',
      'The engineer replies, “I already explained the components.”'
    ],
    afterPrompt: 'Does explaining how something works automatically answer why it exists or what it was intended for?',
    hostPrompts: ['Are “how” and “why” the same question?', 'Can both kinds of explanation be valid?']
  },
  {
    id: 17,
    title: 'FOUR BOSSES AT DUNDER MIFFLIN',
    vibe: 'pressure',
    scenario: [
      'You are working at Dunder Mifflin. Michael wants you planning his party. Dwight orders you into a safety drill. Corporate wants a report tonight. Your biggest client wants an emergency problem fixed now.',
      'All four are demanding your attention at the same time.'
    ],
    prompt: 'Whose order matters most?',
    choices: ['Michael', 'Dwight', 'Corporate', 'Client'],
    twist: [
      'David Wallace calls and tells you exactly who has final authority over your job. The other demands still matter, but they now have an order.',
      'The conflict becomes much easier once there is one clear highest authority.'
    ],
    afterPrompt: 'What happens when several things all try to act like your final boss?',
    hostPrompts: ['What gets the final vote in your real life?', 'Can every priority be number one?']
  },
  {
    id: 18,
    title: 'THE ONE RING FOR A WEEK',
    vibe: 'pressure',
    scenario: [
      'Gandalf offers you the One Ring for seven days. You can use its power, but at the end of the week you must hand it back.',
      'You have seen what it does to other people, but you are pretty confident you would handle it better.'
    ],
    prompt: 'Use it or refuse it?',
    choices: ['Use it', 'Refuse it'],
    twist: [
      'Gandalf reminds you that almost everyone corrupted by the Ring also believed they were the exception.',
      'Their confidence in themselves was part of the problem.'
    ],
    afterPrompt: 'Is “I know myself” enough evidence when every biased person says the same thing?',
    hostPrompts: ['Why is bias easier to see in other people?', 'What evidence about yourself would matter more than confidence?']
  },
  {
    id: 19,
    title: 'DOC BROWN\'S TEN-YEAR PREVIEW',
    vibe: 'deeper',
    scenario: [
      'Doc Brown takes you ten years into the future for five minutes. Your job is fine. Your family is fine. But you are annoyed by how much of your life disappeared into your phone, random videos, and things you barely remember watching.',
      'You ask what went wrong.'
    ],
    prompt: 'Bad luck or your current habits continuing?',
    choices: ['Bad luck', 'Current habits'],
    twist: [
      'Doc shows you the numbers. Nothing dramatic happened. Your daily habits simply stayed almost exactly the same for ten years.',
      'Small choices became a huge total because they repeated.'
    ],
    afterPrompt: 'If the cause keeps repeating, why should you expect a completely different result?',
    hostPrompts: ['What small habit compounds quietly?', 'What future result would require changing something now?']
  },
  {
    id: 20,
    title: 'THE CLICK REMOTE',
    vibe: 'deeper',
    scenario: [
      'You get the remote from Click. You can skip traffic, chores, workouts, awkward conversations, boring family events, and anything else you do not feel like dealing with.',
      'At first it feels like the best invention ever made.'
    ],
    prompt: 'Use it a lot or only rarely?',
    choices: ['Use it a lot', 'Rarely'],
    twist: [
      'The remote learns what you usually skip and starts doing it automatically.',
      'Soon it skips hard conversations and ordinary family moments that felt boring at the time but mattered later.'
    ],
    afterPrompt: 'Can avoiding every uncomfortable thing slowly train you into a life you never meant to choose?',
    hostPrompts: ['What uncomfortable thing is still valuable?', 'What does constant escape teach you?']
  },
  {
    id: 21,
    title: 'WALTER WHITE, CAR EXPERT',
    vibe: 'deeper',
    scenario: [
      'Walter White is clearly a brilliant chemist. Now imagine he looks at a used BMW for thirty seconds and tells you the engine is perfect.',
      'Your friend says, “He is a genius. If Walter says it is good, buy it.”'
    ],
    prompt: 'Would his intelligence be enough for you to skip a mechanic?',
    choices: ['Yes', 'No'],
    twist: [
      'A mechanic finds a failing water pump and signs of overheating.',
      'Walter may still be the smartest person in the room. It just was not his field.'
    ],
    afterPrompt: 'Does being an expert in one area make someone an authority in every area?',
    hostPrompts: ['When should expertise count?', 'What makes an authority relevant?']
  },
  {
    id: 22,
    title: 'THE 80-HOUR SAVE FILE',
    vibe: 'deeper',
    scenario: [
      'You are 80 hours into a game you no longer enjoy. Every time the guys ask why you are still playing, you say, “I already put 80 hours into this. I cannot quit now.”',
      'A new game you actually want to play is sitting unopened beside the console.'
    ],
    prompt: 'Keep grinding or quit?',
    choices: ['Keep grinding', 'Quit'],
    twist: [
      'You check a guide and discover the game has another 100 hours left.',
      'The first 80 hours are gone either way. Only the next 100 are still yours to choose.'
    ],
    afterPrompt: 'Should past investment decide what you do next if the future no longer makes sense?',
    hostPrompts: ['What past cost cannot be recovered?', 'Where does ego make quitting harder?']
  },
  {
    id: 23,
    title: 'THE TRUMAN SHOW DEAL',
    vibe: 'deeper',
    scenario: [
      'You discover your whole town is a Truman Show set. Your friends are actors, the news is controlled, and the world around you was built to keep you comfortable.',
      'There is an exit door. Outside is real life: bills, traffic, bad weather, uncertainty, and the Leafs still cannot guarantee you a Cup.'
    ],
    prompt: 'Stay in the comfortable fake world or leave for the real one?',
    choices: ['Stay', 'Leave'],
    twist: [
      'If you stay, nobody will judge you. The producers promise to make your life even easier.',
      'The only thing you lose is the chance to know what is actually real.'
    ],
    afterPrompt: 'How much comfort would it take to make you knowingly choose something false?',
    hostPrompts: ['Does comfort change reality?', 'What truth would be hardest to accept if it disrupted your life?']
  },
  {
    id: 24,
    title: 'SHARK TANK: YOUR BELIEF',
    vibe: 'finale',
    scenario: [
      'You walk onto Shark Tank with one opinion you strongly believe. It can be about money, health, relationships, society, success, or anything else you care about.',
      'Mark Cuban says he will hear the pitch, but first he wants to know what evidence could make you admit your belief is wrong.'
    ],
    prompt: 'Can you name something that would genuinely change your mind?',
    choices: ['Yes', 'Nothing would'],
    twist: [
      'Mark says, “If no possible evidence could count against your idea, then you are not really testing it. You are protecting it.”',
      'He asks you to use the same standard on your own belief that you would use on somebody else’s.'
    ],
    afterPrompt: 'Should a strong belief still be allowed to lose if the evidence goes against it?',
    hostPrompts: ['What would genuinely change your mind?', 'Which card tonight made you change an answer?']
  }
];

const CHAOS_MODIFIERS = [
  { name: 'REWIND', text: 'Defend the opposite answer for 30 seconds.' },
  { name: 'SHOW RECEIPTS', text: 'Give one real reason or piece of evidence for your answer.' },
  { name: 'SAME RULE', text: 'Would you accept the same reasoning if it supported the other side?' },
  { name: 'SOURCE CHECK', text: 'Where did the important claim come from?' },
  { name: 'MYTHBUST IT', text: 'Name one fact that would make you change your answer.' },
  { name: 'DEFINE IT', text: 'Pick the most important word in the argument and define it.' },
  { name: 'NO AUDIENCE', text: 'Nobody you know will hear your answer. Same choice?' },
  { name: 'FULL CLIP', text: 'What missing context could change this answer?' },
  { name: 'BET YOUR SAVE FILE', text: 'How confident are you from 0 to 100? What keeps it from 100?' },
  { name: 'FAST FORWARD', text: 'If you follow this answer for five years, where does it lead?' }
];