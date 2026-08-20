'use strict';

const PLOT_TWIST_CARDS = [
  {
    id: 1,
    title: 'THE TELEPORT SNEEZE',
    vibe: 'chaos',
    scenario: [
      'You get $5 million tonight, tax-free.',
      'The catch: every time you sneeze, you instantly teleport to a random place somewhere within 50 km.'
    ],
    prompt: 'Taking the deal?',
    choices: ['Take it', 'No chance'],
    twist: [
      'Your clothes come with you. Your phone, wallet, keys, food, and anything in your hands stay behind.',
      'If you sneeze again, the next 50 km starts from wherever you just landed.'
    ],
    afterPrompt: 'Still taking the money?',
    hostPrompts: ['What is your allergy-season plan?', 'How much money would make this worth it?']
  },
  {
    id: 2,
    title: 'THE GROUP CHAT SCREENSHOT',
    vibe: 'real-life',
    scenario: [
      'A screenshot from your main group chat gets posted online.',
      'It contains one terrible joke you made five years ago. Everything before and after it is cropped out.'
    ],
    prompt: 'Do you explain yourself or ignore it?',
    choices: ['Explain it', 'Ignore it'],
    twist: [
      'The full conversation makes the joke look completely different.',
      'But posting the full chat would expose private messages from everyone else too.'
    ],
    afterPrompt: 'Do you clear your name if it means exposing your friends?',
    hostPrompts: ['What matters more here: context or privacy?', 'What would you want a friend to do?']
  },
  {
    id: 3,
    title: 'THE DUCK PROBLEM',
    vibe: 'chaos',
    scenario: [
      'You are locked in a hockey rink for ten minutes.',
      'You must face either one horse-sized duck or one hundred duck-sized horses.'
    ],
    prompt: 'Pick your opponent.',
    choices: ['Giant duck', 'Tiny horses'],
    twist: [
      'The tiny horses coordinate like a team.',
      'The giant duck is terrified of hamburger buns. You have one bun in your pocket.'
    ],
    afterPrompt: 'Switching sides?',
    hostPrompts: ['What is your first move?', 'Who has the better survival plan?']
  },
  {
    id: 4,
    title: 'THE USED CIVIC',
    vibe: 'real-life',
    scenario: [
      'You find a clean used Civic for a great price.',
      'From a stranger, you would ask for records and get an inspection. This seller is your cousin, and he says, “Bro, you know me. The car is perfect.”'
    ],
    prompt: 'Inspect it or trust your cousin?',
    choices: ['Inspect it', 'Trust him'],
    twist: [
      'The inspection finds a hidden problem that will cost $3,000 next month.',
      'Your cousin genuinely did not know about it.'
    ],
    afterPrompt: 'Was checking the car a sign of distrust?',
    hostPrompts: ['When should trust change your evidence standard?', 'Would you want your cousin to inspect a car you sold him?']
  },
  {
    id: 5,
    title: 'THE $500,000 QUESTION',
    vibe: 'pop',
    scenario: [
      'You are on Who Wants to Be a Millionaire and have no clue.',
      'The audience votes 88% for B. Your phone-a-friend is your annoyingly smart cousin, and he says D because he remembers the exact answer.'
    ],
    prompt: 'Who gets your trust?',
    choices: ['88% audience', 'Smart cousin'],
    twist: [
      'The answer is D.',
      'The audience was not lying. Most of them simply guessed the same wrong answer.'
    ],
    afterPrompt: 'What mattered more: the number of people, or why they believed it?',
    hostPrompts: ['When is popularity useful evidence?', 'When is it just a lot of guesses?']
  },
  {
    id: 6,
    title: 'THE CABIN WITH YOUR NAME',
    vibe: 'mystery',
    scenario: [
      'You hike deep into an area with no roads or trails and find a perfect cabin.',
      'The fire is burning, dinner is hot, and every bed has one of your names written above it.'
    ],
    prompt: 'Prepared for you or random coincidence?',
    choices: ['Prepared', 'Coincidence'],
    twist: [
      'Your friend says, “Forests are huge. Given enough time, weird stuff happens.”',
      'He still cannot explain the hot food or your names.'
    ],
    afterPrompt: 'How much can “weird stuff happens” actually explain?',
    hostPrompts: ['Which detail matters most?', 'What would a good explanation need to account for?']
  },
  {
    id: 7,
    title: 'FREE FOOD FOREVER',
    vibe: 'chaos',
    scenario: [
      'Every meal you eat for the rest of your life becomes completely free.',
      'Restaurants, groceries, steak, sushi, whatever you want. You never pay for food again.'
    ],
    prompt: 'Taking the deal?',
    choices: ['Absolutely', 'No'],
    twist: [
      'You do not choose the meals. A mystery chef chooses every meal for you.',
      'You can reject one meal per year. Reject a second and the deal ends forever.'
    ],
    afterPrompt: 'Still worth it?',
    hostPrompts: ['What meal would break you?', 'How much is choice worth?']
  },
  {
    id: 8,
    title: 'THE VIRAL CLIP',
    vibe: 'internet',
    scenario: [
      'A 12-second video blows up online.',
      'A guy looks arrogant, cruel, and obviously guilty. Millions of people are roasting him and your group chat agrees.'
    ],
    prompt: 'Enough to judge him?',
    choices: ['Yes', 'Need more context'],
    twist: [
      'The full four-minute video appears the next day.',
      'The 12 seconds were real, but the minute before them completely changes why he said what he said.'
    ],
    afterPrompt: 'Can a real clip still create a false picture?',
    hostPrompts: ['How often do you watch the full source?', 'Does a true piece guarantee a true conclusion?']
  },
  {
    id: 9,
    title: 'THE PAUSE BUTTON',
    vibe: 'chaos',
    scenario: [
      'You get a button that freezes the entire world except you.',
      'You can sleep, travel, finish work, play games, or just enjoy complete silence while everyone else is paused.'
    ],
    prompt: 'How much would you use it?',
    choices: ['All the time', 'Sometimes', 'Almost never'],
    twist: [
      'You keep ageing while the world is frozen.',
      'Every paused hour comes directly out of your lifespan.'
    ],
    afterPrompt: 'How valuable is an extra hour now?',
    hostPrompts: ['What would still be worth pausing for?', 'Would you spend a year of life for a year of private time?']
  },
  {
    id: 10,
    title: 'DWIGHT’S EMERGENCY PLAN',
    vibe: 'pop',
    scenario: [
      'Dwight from The Office gives everyone a detailed emergency plan for a building fire.',
      'It sounds ridiculous, he is extremely confident, and nobody wants to listen to a fifteen-minute lecture from Dwight.'
    ],
    prompt: 'Read his plan or ignore Dwight?',
    choices: ['Read it', 'Ignore it'],
    twist: [
      'Most of the plan is over-the-top nonsense.',
      'But one page correctly identifies a blocked emergency exit that nobody else noticed.'
    ],
    afterPrompt: 'Does a bad source make every claim from that source false?',
    hostPrompts: ['Can an annoying person still be right?', 'How do you separate the claim from the person?']
  },
  {
    id: 11,
    title: 'ONE DELETED SEARCH',
    vibe: 'nostalgia',
    scenario: [
      'Someone offers you $250,000.',
      'In return, your complete internet history from age 15 to 22 gets sent to your closest friends, spouse or future spouse, and parents.'
    ],
    prompt: 'Taking the money?',
    choices: ['Take it', 'Keep my dignity'],
    twist: [
      'You may permanently delete exactly one search before the file is sent.',
      'Everyone will see a giant line saying: ONE ITEM DELETED.'
    ],
    afterPrompt: 'Delete one or leave everything?',
    hostPrompts: ['Is the mystery worse than the history?', 'How much should teenage-you count against adult-you?']
  },
  {
    id: 12,
    title: 'THREE GPS APPS',
    vibe: 'real-life',
    scenario: [
      'You are driving back from a cabin at night with barely enough gas for one wrong detour.',
      'Three offline maps agree on your location and the nearby roads. One says turn north, one says south, and one says the road ahead does not exist.'
    ],
    prompt: 'Can all three be right about the turn?',
    choices: ['Yes', 'No'],
    twist: [
      'All three are accurate about almost everything else in the area.',
      'They still directly disagree on the turn that decides whether you get home.'
    ],
    afterPrompt: 'Does being right about many things erase one direct contradiction?',
    hostPrompts: ['What would you verify next?', 'Can opposite directions both be right in the same sense?']
  },
  {
    id: 13,
    title: 'JURASSIC PARK DELIVERY',
    vibe: 'pop',
    scenario: [
      'John Hammond offers to deliver one baby dinosaur to your house for free.',
      'You choose the species. It is legal, healthy, and yours forever.'
    ],
    prompt: 'Taking one?',
    choices: ['Obviously', 'Absolutely not'],
    twist: [
      'It grows to full size.',
      'You are responsible for food, fencing, neighbours, insurance, cleanup, and whatever happens if it escapes.'
    ],
    afterPrompt: 'Which dinosaur are you still crazy enough to choose?',
    hostPrompts: ['What sounded fun before the consequences arrived?', 'What is your containment plan?']
  },
  {
    id: 14,
    title: 'THE PERFECT LIAR',
    vibe: 'mystery',
    scenario: [
      'Two people tell you opposite stories about the same event.',
      'Person A is calm, confident, detailed, and looks you straight in the eye. Person B is nervous, awkward, and keeps forgetting small details.'
    ],
    prompt: 'Who sounds more believable?',
    choices: ['Person A', 'Person B', 'Need evidence'],
    twist: [
      'A security camera shows Person B was telling the truth.',
      'Person A was simply much better at telling a story.'
    ],
    afterPrompt: 'How much should confidence count as evidence?',
    hostPrompts: ['What makes someone seem trustworthy?', 'How often do presentation skills fool us?']
  },
  {
    id: 15,
    title: 'THE MYSTERY MACHINE',
    vibe: 'weird',
    scenario: [
      'You buy a strange machine at an estate sale with no label or instructions.',
      'It charges a phone, warms coffee, opens jars, and makes a great doorstop. Everyone has a different idea about what it was built for.'
    ],
    prompt: 'Can the users figure out its real purpose just from using it?',
    choices: ['Probably', 'Not for sure'],
    twist: [
      'You find the original designer.',
      'He says those are side effects. He built it to detect a dangerous gas leak before humans can smell it.'
    ],
    afterPrompt: 'Who knows the intended purpose best: users or maker?',
    hostPrompts: ['Is usefulness the same as intended purpose?', 'Can something have many uses but one original purpose?']
  },
  {
    id: 16,
    title: 'THE $2 MILLION SECRET',
    vibe: 'choices',
    scenario: [
      'You get $2 million cash today.',
      'The only condition is that your best friend can never know you received it.'
    ],
    prompt: 'Taking the money?',
    choices: ['Take it', 'No'],
    twist: [
      'Your friend later loses his job and asks to borrow $8,000.',
      'You can help him, but if he ever discovers where your money came from, you lose everything you have left.'
    ],
    afterPrompt: 'Helping him or protecting the deal?',
    hostPrompts: ['What would make you suspicious if the roles were reversed?', 'How much does secrecy change a friendship?']
  },
  {
    id: 17,
    title: 'GTA GOD MODE',
    vibe: 'pop',
    scenario: [
      'You are playing GTA with every cheat turned on.',
      'Infinite health, unlimited weapons, unlimited money, any car you want. Inside the game, almost nothing can stop you.'
    ],
    prompt: 'Are you basically all-powerful inside that world?',
    choices: ['Pretty much', 'Not really'],
    twist: [
      'Your little brother walks past the console and pulls the power cable.',
      'Your entire world disappears instantly.'
    ],
    afterPrompt: 'Can something be ultimate if its existence depends on something outside itself?',
    hostPrompts: ['What were all your powers depending on?', 'Is power the same as independence?']
  },
  {
    id: 18,
    title: 'THE ALGORITHM RESET',
    vibe: 'internet',
    scenario: [
      'You and a friend argue about something important. Both of you say, “The evidence is everywhere.”',
      'You open your feeds and nearly every video supports you. He opens his and nearly every video supports him.'
    ],
    prompt: 'Whose feed is showing reality?',
    choices: ['Mine', 'His', 'Neither proves it'],
    twist: [
      'You both make fresh accounts with no history.',
      'The recommendations look completely different because your old feeds had spent years learning what kept each of you watching.'
    ],
    afterPrompt: 'How much can “everyone I see agrees” actually prove?',
    hostPrompts: ['What would you check outside your feed?', 'When did your internet become personalized?']
  },
  {
    id: 19,
    title: 'THE CLONE AT THE DOOR',
    vibe: 'weird',
    scenario: [
      'Someone knocks on your door who looks exactly like you.',
      'Same voice, same memories, same scars, same passwords, same childhood stories. He calmly says you are the clone and he is the original.'
    ],
    prompt: 'What is the first thing you test?',
    twist: [
      'DNA matches. Fingerprints match. Your family cannot tell. Even your private memories match.',
      'Only one of you can keep your current life.'
    ],
    afterPrompt: 'What makes you “you” if every measurable detail can be copied?',
    hostPrompts: ['Would memory settle it?', 'What would you refuse to give up?']
  },
  {
    id: 20,
    title: 'THE TRUMAN SHOW EXIT',
    vibe: 'pop',
    scenario: [
      'You discover your life has been a Truman Show-style set.',
      'Inside, life is comfortable: no mortgage, little stress, your friends stay nearby, and somehow the Leafs win the Cup every few years. There is one exit to the real world.'
    ],
    prompt: 'Stay or leave?',
    choices: ['Stay', 'Leave'],
    twist: [
      'Outside is ordinary life: bills, traffic, bad weather, uncertainty, and normal Leafs hockey.',
      'But outside is real.'
    ],
    afterPrompt: 'How much comfort would it take to make you choose something you knew was fake?',
    hostPrompts: ['Does comfort change what is true?', 'Would your answer change if your family wanted to stay?']
  },
  {
    id: 21,
    title: 'THE OLD FRIEND’S BUSINESS',
    vibe: 'real-life',
    scenario: [
      'Your friend has spent three years and $60,000 building a side business.',
      'It has never made a profit. He hates working on it now, but keeps saying, “I have put too much into this to stop.”'
    ],
    prompt: 'Keep going or walk away?',
    choices: ['Keep going', 'Walk away'],
    twist: [
      'A new opportunity appears that he actually enjoys and has better numbers.',
      'He refuses because quitting the old business would make the last three years feel wasted.'
    ],
    afterPrompt: 'Should past cost decide the next three years?',
    hostPrompts: ['When does persistence become stubbornness?', 'What matters more: money already spent or future opportunity?']
  },
  {
    id: 22,
    title: 'THE ONE WRONG BELIEF',
    vibe: 'deeper',
    scenario: [
      'A machine scans your brain and prints one sentence:',
      '“One major thing you currently believe is completely wrong.” It refuses to say which belief.'
    ],
    prompt: 'What part of your life do you investigate first?',
    choices: ['Money', 'Family', 'Health', 'Politics', 'Right & wrong', 'Life direction'],
    twist: [
      'The false belief entered your head before age 18.',
      'You cannot remember ever choosing it. You simply heard it enough times that it became normal.'
    ],
    afterPrompt: 'How do you test something that has always felt obvious?',
    hostPrompts: ['Which beliefs have you never had to defend?', 'Does inherited automatically mean false?']
  },
  {
    id: 23,
    title: 'THE LAST 24 HOURS',
    vibe: 'deeper',
    scenario: [
      'You know with absolute certainty that you have 24 healthy hours left.',
      'Nothing can extend the time. You are not allowed to spend it trying to stop the clock.'
    ],
    prompt: 'What gets your first six hours?',
    twist: [
      'Your unread emails, job title, bank balance, unfinished shows, online arguments, and shopping cart will all still exist tomorrow.',
      'You will not.'
    ],
    afterPrompt: 'What suddenly became important, and what suddenly looked ridiculous?',
    hostPrompts: ['What would you regret leaving unfixed?', 'Why do some priorities change only when time becomes visible?']
  },
  {
    id: 24,
    title: 'THE PHONE RECEIPT',
    vibe: 'real-life',
    scenario: [
      'You list the five things you say matter most in your life.',
      'Then your phone generates a brutally accurate report showing where your free time actually went for the last twelve months.'
    ],
    prompt: 'Would your list and your time match?',
    choices: ['Mostly', 'Not even close'],
    twist: [
      'The report also predicts the next ten years by simply continuing your current habits.',
      'No dramatic disaster. Just more of the same.'
    ],
    afterPrompt: 'Which tells the truth about your priorities: what you say, or what you repeatedly do?',
    hostPrompts: ['What habit would you least want multiplied by ten years?', 'What would have to change this week?']
  }
];

const CHAOS_MODIFIERS = [
  {
    name: 'SWITCH SIDES',
    text: 'For 30 seconds, defend the opposite answer as strongly as you can.'
  },
  {
    name: 'SHOW RECEIPTS',
    text: 'Give one actual reason or piece of evidence for your answer. No vibes.'
  },
  {
    name: 'NO AUDIENCE',
    text: 'Nobody you know will ever hear your answer. Do you still choose the same thing?'
  },
  {
    name: 'BET $100',
    text: 'You lose $100 if your answer turns out badly. Same choice?'
  },
  {
    name: 'SAME RULE',
    text: 'Would you accept the same reasoning if it helped the opposite side?'
  },
  {
    name: 'FAST FORWARD',
    text: 'Imagine your choice plays out for ten years. Does it still look good?'
  },
  {
    name: 'ONE REASON',
    text: 'You only get one reason. What is the strongest reason for your answer?'
  },
  {
    name: 'CHANGE ONE FACT',
    text: 'Name one new fact that would make you switch your answer.'
  },
  {
    name: 'PICK A LAWYER',
    text: 'Choose someone else in the group to defend your answer for you.'
  },
  {
    name: 'LOCK IT IN',
    text: 'No “it depends.” Everyone picks one answer right now and gives one sentence why.'
  }
];
