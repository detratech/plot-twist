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
      'A second sneeze starts another 50 km jump from wherever you landed.'
    ],
    afterPrompt: 'Still taking it, or did the hidden consequences change the value of the deal?',
    hostPrompts: ['What problem did you ignore at first?', 'How often do we judge a deal before thinking through the consequences?']
  },
  {
    id: 2,
    title: 'THE GROUP CHAT SCREENSHOT',
    vibe: 'real-life',
    scenario: [
      'A screenshot from your main group chat gets posted online.',
      'It contains one terrible joke you made five years ago. Everything before and after it is cropped out.'
    ],
    prompt: 'Explain yourself or ignore it?',
    choices: ['Explain it', 'Ignore it'],
    twist: [
      'The full conversation makes the joke look completely different.',
      'But posting the full chat would also expose private messages from everyone else.'
    ],
    afterPrompt: 'How much should context matter when proving your side creates a new problem?',
    hostPrompts: ['Would you sacrifice someone else’s privacy to clear your name?', 'Can a true screenshot still create a false conclusion?']
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
      'The tiny horses coordinate and attack as a team.',
      'The giant duck is terrified of hamburger buns. You have one bun in your pocket.'
    ],
    afterPrompt: 'Switching sides? What new fact mattered most?',
    hostPrompts: ['Which assumption did you make before the twist?', 'What single fact changed the whole problem?']
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
    afterPrompt: 'Was checking the car distrust, or was it just using the same standard you would use on anyone else?',
    hostPrompts: ['When should trust lower your evidence standard?', 'Would you want your cousin to inspect a car you sold him?']
  },
  {
    id: 5,
    title: 'THE LUCKY HOODIE',
    vibe: 'nostalgia',
    scenario: [
      'Your friend wears the same hoodie for five straight playoff games. His team wins all five.',
      'He now refuses to watch a game without it because, according to him, “Why mess with what works?”'
    ],
    prompt: 'Does the hoodie deserve any credit?',
    choices: ['Maybe a little', 'Absolutely none'],
    twist: [
      'He forgets it for game six and they win 8–0.',
      'He wears it for game seven and they get destroyed. He says those two games prove nothing.'
    ],
    afterPrompt: 'If wins count as evidence but losses never count, can the belief ever lose?',
    hostPrompts: ['What result would actually prove him wrong?', 'Are we as generous with evidence against our own beliefs?']
  },
  {
    id: 6,
    title: 'THE $500,000 QUESTION',
    vibe: 'pop',
    scenario: [
      'You are on Who Wants to Be a Millionaire and have no clue.',
      'The audience votes 88% for B. Your phone-a-friend is your annoyingly smart cousin, and he says D because he remembers the exact fact.'
    ],
    prompt: 'Who gets your trust?',
    choices: ['88% crowd', 'Smart cousin'],
    twist: [
      'The correct answer is D.',
      'The audience was not lying. Most of them were simply guessing with confidence.'
    ],
    afterPrompt: 'What mattered more: how many believed it, or why they believed it?',
    hostPrompts: ['When is a crowd useful evidence?', 'When is popularity just a lot of guesses?']
  },
  {
    id: 7,
    title: 'THE FREE VACATION',
    vibe: 'choices',
    scenario: [
      'A company offers you a completely free seven-day trip to a private resort in Hawaii.',
      'Flights, food, hotel, activities, everything is covered. You only have to sign one page before reading the full agreement later.'
    ],
    prompt: 'Sign now or read first?',
    choices: ['Sign now', 'Read first'],
    twist: [
      'The agreement says the company can use every photo and video of you from the trip in advertising forever.',
      'It was technically disclosed. You just had to scroll.'
    ],
    afterPrompt: 'Does a great offer make the hidden terms less important?',
    hostPrompts: ['What did the word “free” make you assume?', 'How often do we accept a conclusion before checking the conditions?']
  },
  {
    id: 8,
    title: 'THE PARKING LOT WALLET',
    vibe: 'moral',
    scenario: [
      'You find a wallet in an empty parking lot with $900 cash and a driver’s licence inside.',
      'Nobody saw you pick it up. You could return it exactly as you found it, or keep the cash and mail back the wallet.'
    ],
    prompt: 'What are you doing?',
    choices: ['Return everything', 'Keep the cash'],
    twist: [
      'You recognize the owner. Earlier that day he was rude to a cashier and treated her terribly.'
    ],
    afterPrompt: 'Did his bad behaviour change what you were allowed to do with his money?',
    hostPrompts: ['Do two wrongs fix each other?', 'Would your answer change if he had been kind? Why?']
  },
  {
    id: 9,
    title: 'THE SAME STORY 40 TIMES',
    vibe: 'internet',
    scenario: [
      'A crazy story starts spreading online. Forty accounts post it within an hour.',
      'Some are big pages, some are local pages, and several say “multiple sources are reporting this.”'
    ],
    prompt: 'Forty reports: convincing or not yet?',
    choices: ['Convincing', 'Not yet'],
    twist: [
      'Every post traces back to one anonymous tweet.',
      'Nobody independently checked what the tweet claimed.'
    ],
    afterPrompt: 'Did you have forty sources, or one source repeated forty times?',
    hostPrompts: ['What makes sources independent?', 'How can repetition feel like evidence?']
  },
  {
    id: 10,
    title: 'THE PERFECT RESTAURANT',
    vibe: 'real-life',
    scenario: [
      'You are choosing dinner in a city you have never visited.',
      'Restaurant A has 4.9 stars from 2,000 reviews. Restaurant B has 4.2 stars from 300 reviews, but two people you trust say B is much better.'
    ],
    prompt: 'Which place are you picking?',
    choices: ['4.9-star place', 'Friend recommendation'],
    twist: [
      'You learn Restaurant A offered free desserts for five-star reviews.',
      'Restaurant B never asked customers to review anything.'
    ],
    afterPrompt: 'Should all evidence get equal weight just because it looks numerical?',
    hostPrompts: ['What makes a source reliable?', 'Does a bigger number always mean stronger evidence?']
  },
  {
    id: 11,
    title: 'THE HOUSE RULE',
    vibe: 'funny',
    scenario: [
      'Four friends are playing a game for $20 each.',
      'One guy explains a house rule that helps him win a round. Everyone accepts it.'
    ],
    prompt: 'Rule is locked in now?',
    choices: ['Yes', 'No'],
    twist: [
      'Two rounds later, the exact same rule makes him lose.',
      'He immediately says, “Obviously that rule does not apply in this situation.”'
    ],
    afterPrompt: 'What would justify an exception besides the fact that he is losing?',
    hostPrompts: ['Would you accept his explanation if the rule hurt you instead?', 'Where do people change standards halfway through?']
  },
  {
    id: 12,
    title: 'THE FOUR HOMES',
    vibe: 'deeper',
    scenario: [
      'Four children grow up in four very different homes.',
      'Each family teaches different ideas about money, relationships, success, right and wrong, and what a “normal life” looks like.'
    ],
    prompt: 'At age 18, how much did each kid actually choose?',
    choices: ['Most of it', 'Very little'],
    twist: [
      'At age 30, all four still describe their own upbringing as “basically common sense.”',
      'None can remember when they first decided those ideas were true.'
    ],
    afterPrompt: 'How do you test a belief that feels obvious mainly because it has always been there?',
    hostPrompts: ['Does inherited automatically mean wrong?', 'Which beliefs are hardest to recognize as inherited?']
  },
  {
    id: 13,
    title: 'THE INVISIBLE CAMERA',
    vibe: 'moral',
    scenario: [
      'Your boss accidentally leaves a $200 gift card on the break-room table.',
      'You know exactly who it belongs to. Nobody else is around, and the security camera has been broken for weeks.'
    ],
    prompt: 'Does the broken camera matter to your decision?',
    choices: ['Yes', 'No'],
    twist: [
      'The next morning your boss says the card was a birthday gift from his daughter.',
      'He has no idea where he lost it.'
    ],
    afterPrompt: 'If an action only changes when nobody can see you, what was actually controlling the action?',
    hostPrompts: ['Would your answer change if the camera worked?', 'What is the difference between reputation and character?']
  },
  {
    id: 14,
    title: 'THE RED ENVELOPE',
    vibe: 'deeper',
    scenario: [
      'A sealed red envelope contains one guaranteed true statement about your life.',
      'It could confirm something important, or prove one belief you have held for years is badly wrong.'
    ],
    prompt: 'Open it or burn it?',
    choices: ['Open it', 'Burn it'],
    twist: [
      'Nobody will ever know which choice you made.',
      'If you open it, you cannot forget what you learn.'
    ],
    afterPrompt: 'Do you want the truth equally when nobody is watching and the answer may cost you something?',
    hostPrompts: ['What kind of answer would make you hesitate?', 'Can comfort become a reason not to know?']
  },
  {
    id: 15,
    title: 'THE MYSTERY TOOL',
    vibe: 'mystery',
    scenario: [
      'You find a strange metal tool in a box with no label.',
      'It works as a bottle opener, a doorstop, a scraper, and a phone stand. Everyone starts arguing about what it was made for.'
    ],
    prompt: 'Can the users decide its real purpose?',
    choices: ['Yes', 'Not necessarily'],
    twist: [
      'The manufacturer’s diagram turns up.',
      'It was designed for one specific repair job nobody guessed. All the other uses still work.'
    ],
    afterPrompt: 'Can something have many useful functions and still have an intended purpose the users did not invent?',
    hostPrompts: ['Is usefulness the same as intended purpose?', 'Who is in the best position to explain why something was made?']
  },
  {
    id: 16,
    title: 'GTA ADMIN MODE',
    vibe: 'pop',
    scenario: [
      'You are playing GTA with every cheat enabled: unlimited health, weapons, money, vehicles, and no police problem you cannot escape.',
      'Inside the game, you can do almost anything a normal character cannot.'
    ],
    prompt: 'Inside GTA, are you basically the highest power?',
    choices: ['Pretty much', 'No'],
    twist: [
      'Your little brother walks into the room and pulls the console plug.',
      'Your entire “world” disappears instantly, cheats included.'
    ],
    afterPrompt: 'Can something be ultimate inside a system if its power and existence still depend on something outside it?',
    hostPrompts: ['What mattered more: huge power or independence?', 'What was your character depending on the whole time?']
  },
  {
    id: 17,
    title: 'YOUR INTERNET VS HIS INTERNET',
    vibe: 'internet',
    scenario: [
      'You and a friend strongly disagree about an issue.',
      'You open your feeds and see experts, clips, comments, and videos supporting your side. He opens his phone and sees the same thing supporting his.'
    ],
    prompt: 'Whose feed proves the point?',
    choices: ['Mine', 'His', 'Neither by itself'],
    twist: [
      'You both open brand-new accounts and the recommendations change within an hour based on what each of you clicks.',
      'Your old feeds had spent years learning what kept you watching.'
    ],
    afterPrompt: 'How much of “everyone I see agrees” might really mean “my feed knows me”?',
    hostPrompts: ['What should outrank an algorithm?', 'When was the last time you checked the original source?']
  },
  {
    id: 18,
    title: 'BET YOUR CAR',
    vibe: 'deeper',
    scenario: [
      'Think of an opinion you are very confident about.',
      'Now imagine a fair machine can reveal whether you are correct. If you are wrong, your car disappears. If you are right, you get a second identical car.'
    ],
    prompt: 'Making the bet?',
    choices: ['Bet the car', 'Not that confident'],
    twist: [
      'You are allowed to research as long as you want before deciding.',
      'The machine does not care how strongly you feel. It only checks whether the claim is actually true.'
    ],
    afterPrompt: 'What would you investigate differently once confidence has a real cost?',
    hostPrompts: ['Which beliefs feel certain until something is at stake?', 'Does confidence measure truth?']
  },
  {
    id: 19,
    title: 'THE ONE RING FOR A WEEK',
    vibe: 'pop',
    scenario: [
      'You get the One Ring for seven days. You know what it did to other people, but you also know you only have to resist it for one week.',
      'You could use it for money, revenge, curiosity, or just one harmless prank.'
    ],
    prompt: 'Use it once or refuse it completely?',
    choices: ['Use it once', 'Refuse it'],
    twist: [
      'Everyone who was corrupted by it also had a reason they thought was different.',
      'Most of them believed they could control it better than the people before them.'
    ],
    afterPrompt: 'How strong is “I know myself” when the evidence says people are bad at seeing their own weakness?',
    hostPrompts: ['Why are other people’s blind spots easier to see?', 'What evidence about yourself should count?']
  },
  {
    id: 20,
    title: 'TEN YEARS LATER',
    vibe: 'real-life',
    scenario: [
      'A future version of you appears for two minutes.',
      'He has the same basic habits you have now, just repeated for ten more years: the same sleep habits, spending habits, screen habits, exercise habits, and way of handling people.'
    ],
    prompt: 'Are you happy to become him?',
    choices: ['Yes', 'No'],
    twist: [
      'He tells you there was no single disaster and no huge turning point.',
      'Small choices simply kept becoming normal.'
    ],
    afterPrompt: 'If you dislike the outcome but keep the causes, what exactly are you expecting to change?',
    hostPrompts: ['Which habit compounds the most?', 'What result do people want without accepting the causes that produce it?']
  },
  {
    id: 21,
    title: 'THE 9–1 VOTE',
    vibe: 'moral',
    scenario: [
      'Ten friends rent a cabin for the weekend.',
      'Nine vote that the tenth guy has to sleep on the floor so they can turn his bedroom into a gaming room.'
    ],
    prompt: 'Does a 9–1 vote make it fair?',
    choices: ['Yes', 'No'],
    twist: [
      'The next weekend you are the tenth person.',
      'Everyone uses your exact argument from last time.'
    ],
    afterPrompt: 'Should a rule still feel fair when you are the minority?',
    hostPrompts: ['Does majority agreement settle what is right?', 'What protects someone when the crowd benefits from ignoring them?']
  },
  {
    id: 22,
    title: 'BEST PHONE EVER',
    vibe: 'funny',
    scenario: [
      'Two friends argue for twenty minutes about the “best phone ever made.”',
      'One keeps talking about camera quality. The other keeps talking about battery life, durability, and price.'
    ],
    prompt: 'Who is winning the argument?',
    choices: ['Camera guy', 'Battery guy', 'Nobody yet'],
    twist: [
      'They finally realize they have been using the word “best” to mean two different things.',
      'Once they agree on the criteria, half the argument disappears.'
    ],
    afterPrompt: 'How many arguments are really disagreements about definitions?',
    hostPrompts: ['What word needs defining before this debate starts?', 'Can two people both be right under different meanings?']
  },
  {
    id: 23,
    title: 'THE PERFECT FAKE TOWN',
    vibe: 'deeper',
    scenario: [
      'You discover your town is an artificial set built around you.',
      'Inside, life is easy: cheap housing, no traffic, perfect weather, your favourite food everywhere, and everyone treats you well. There is one exit to the real world.'
    ],
    prompt: 'Stay or leave?',
    choices: ['Stay', 'Leave'],
    twist: [
      'Outside is ordinary life: bills, bad weather, difficult people, uncertainty, and no guarantee you will be happier.',
      'But it is real.'
    ],
    afterPrompt: 'If comfort and truth point in different directions, which one should win?',
    hostPrompts: ['How much comfort could make you accept something you knew was false?', 'Does an unpleasant truth become less true?']
  },
  {
    id: 24,
    title: 'THE ONE FACT',
    vibe: 'deeper',
    scenario: [
      'Pick one belief or opinion you hold strongly.',
      'A stranger offers you $10,000 if you can name one realistic fact that, if proven, would make you change your mind.'
    ],
    prompt: 'Can you name one?',
    choices: ['Yes', 'Nothing would change it'],
    twist: [
      'If your answer is “nothing,” you do not get the money.',
      'The stranger asks: “Then are you protecting a conclusion, or investigating whether it is true?”'
    ],
    afterPrompt: 'Should a strong belief still be allowed to lose?',
    hostPrompts: ['What evidence would genuinely move you?', 'Would you demand the same openness from someone who disagrees with you?']
  }
];

const CHAOS_MODIFIERS = [
  {
    name: 'SWITCH SIDES',
    text: 'For 30 seconds, argue the opposite answer as strongly as you can.'
  },
  {
    name: 'SHOW RECEIPTS',
    text: 'Give the single strongest piece of evidence for your answer. No vibes.'
  },
  {
    name: 'NO AUDIENCE',
    text: 'Nobody you know will ever hear your answer. Does your choice change?'
  },
  {
    name: 'SOURCE CHECK',
    text: 'What source are you trusting most, and why should anyone trust it?'
  },
  {
    name: 'BET $100',
    text: 'Put a confidence number on your answer. Would you bet $100 at those odds?'
  },
  {
    name: 'FULL CLIP',
    text: 'What missing context could completely change your answer?'
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
