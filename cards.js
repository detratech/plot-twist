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
    afterPrompt: 'What mattered more: the $5 million headline, or the consequences you did not think about at first?',
    hostPrompts: ['What hidden cost did you ignore first?', 'How often do we judge an idea before following it to the end?']
  },
  {
    id: 2,
    title: 'SAME BODY, DIFFERENT RULE',
    vibe: 'modern-life',
    scenario: [
      'At a hotel, a woman accidentally opens her room door wearing only underwear. She immediately covers herself and looks embarrassed.',
      'Twenty minutes later she is at the pool in a bikini that covers about the same amount of skin, and she feels completely normal.'
    ],
    prompt: 'What changed most?',
    choices: ['Her body', 'The setting', 'The people'],
    twist: [
      'Some of the exact same people from the hallway are now sitting beside the pool.',
      'Her body did not change. The amount of skin barely changed. The social setting did.'
    ],
    afterPrompt: 'How much of what feels “obviously normal” comes from the rule attached to the setting rather than the physical thing itself?',
    hostPrompts: ['Is this really about skin, or about context?', 'Which everyday rules feel natural only because everyone around us treats them as natural?']
  },
  {
    id: 3,
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
    afterPrompt: 'What should matter more: how many people believe something, or why they believe it?',
    hostPrompts: ['When is popularity useful evidence?', 'When is a majority just a lot of people repeating the same weak reason?']
  },
  {
    id: 4,
    title: 'NOBODY LIKES THE SHOTS',
    vibe: 'real-life',
    scenario: [
      'Ten friends are on a weekend trip. Someone orders another round of shots.',
      'Every guy drinks because he thinks everyone else is enjoying it and he does not want to be the boring one.'
    ],
    prompt: 'Would you say you do not want one?',
    choices: ['Say it', 'Just take it'],
    twist: [
      'Later, everyone admits they were tired of drinking hours ago.',
      'Nine people did something they did not really want because each thought the other nine wanted it.'
    ],
    afterPrompt: 'If nobody actually wanted the “normal” thing, who was everyone following?',
    hostPrompts: ['How can a norm survive when most people privately dislike it?', 'What else do people do because they think everyone else expects it?']
  },
  {
    id: 5,
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
    afterPrompt: 'Should liking or trusting the source change the standard you use to test the claim?',
    hostPrompts: ['When is trust useful?', 'Where do we demand proof from outsiders but accept weaker proof from our own side?']
  },
  {
    id: 6,
    title: 'THE FREE WI-FI',
    vibe: 'modern-life',
    scenario: [
      'A coffee shop offers free high-speed Wi-Fi.',
      'The sign-in page asks for your full name, email, birthday, location access, and permission to track which stores you visit afterward.'
    ],
    prompt: 'Connect or use your data?',
    choices: ['Free Wi-Fi', 'Use my data'],
    twist: [
      'Five minutes earlier you were complaining that companies know too much about people.',
      'The Wi-Fi saves you about 200 MB of mobile data.'
    ],
    afterPrompt: 'How much is a stated value worth if a tiny convenience can make you abandon it?',
    hostPrompts: ['What privacy would you actually pay to protect?', 'Do our actions reveal our real priorities better than our opinions do?']
  },
  {
    id: 7,
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
    afterPrompt: 'Switching sides? Which new fact changed your answer?',
    hostPrompts: ['What did you assume without being told?', 'Are you defending your first answer or updating to the better one?']
  },
  {
    id: 8,
    title: 'THE DEFAULT BUTTON',
    vibe: 'modern-life',
    scenario: [
      'Two identical apps ask the same question during setup: “Share anonymous usage data to improve the product?”',
      'App A starts with YES selected. App B starts with NO selected. You can change either with one tap.'
    ],
    prompt: 'Will most users make the same choice in both apps?',
    choices: ['Probably yes', 'Probably no'],
    twist: [
      'Imagine both companies later announce that most users “chose” the option that happened to be preselected for them.'
    ],
    afterPrompt: 'When the default changes behaviour, how much of the final choice was really a carefully formed preference?',
    hostPrompts: ['Why does doing nothing feel like a choice?', 'How many decisions in your life arrive with a default already selected?']
  },
  {
    id: 9,
    title: 'NO FILTER, TAKE 37',
    vibe: 'modern-life',
    scenario: [
      'Someone posts a selfie with the caption: “Stop caring what people think. Just be yourself.”',
      'Before posting it, they took 37 photos, chose the best angle, adjusted the lighting, smoothed the skin, and deleted the ones they hated.'
    ],
    prompt: 'Hypocritical or just normal?',
    choices: ['Hypocritical', 'Just normal', 'Both'],
    twist: [
      'Almost everyone seeing the post knows photos are curated, yet the likes still feel like approval of the “real” person.'
    ],
    afterPrompt: 'Can a culture celebrate authenticity while training everyone to perform for approval?',
    hostPrompts: ['Who is the photo really for?', 'How much of “being yourself” gets edited for the audience?']
  },
  {
    id: 10,
    title: 'FORTY REPOSTS',
    vibe: 'internet',
    scenario: [
      'A shocking claim appears in your feed.',
      'You see it from a news account, three influencers, two podcasts, a meme page, Reddit, and about thirty people reposting screenshots.'
    ],
    prompt: 'Does that make the claim feel well confirmed?',
    choices: ['Yes', 'Not yet'],
    twist: [
      'Every post traces back to one anonymous account. Nobody checked the original claim before repeating it.'
    ],
    afterPrompt: 'Did you see forty sources, or one source forty times?',
    hostPrompts: ['What makes evidence independent?', 'Does repetition create confidence even when it adds no new proof?']
  },
  {
    id: 11,
    title: 'OUTRAGE PAYS',
    vibe: 'internet',
    scenario: [
      'You post a calm opinion online and get 12 likes.',
      'The next day you post the same point with insults, outrage, and “THIS IS INSANE.” It gets 4,000 likes and hundreds of shares.'
    ],
    prompt: 'Which style are you more likely to use next time?',
    choices: ['Stay calm', 'Turn it up'],
    twist: [
      'After a month, your most angry posts keep winning the most attention.',
      'You now sound much more extreme online than you do when talking face-to-face.'
    ],
    afterPrompt: 'If the platform rewards one version of you, can it slowly train which version you become?',
    hostPrompts: ['What behaviour does attention reward?', 'Would you still say it that way if likes were invisible?']
  },
  {
    id: 12,
    title: 'GRANDPA’S ADVICE, REBRANDED',
    vibe: 'funny',
    scenario: [
      'Your grandfather tells you: sleep properly, stop wasting money, walk every day, and do not let your phone own you.',
      'You laugh and say he does not understand modern life.'
    ],
    prompt: 'Good advice or outdated advice?',
    choices: ['Good advice', 'Outdated'],
    twist: [
      'Six months later a famous productivity creator sells the same four ideas as a “dopamine reset protocol.” You send the video to everyone.'
    ],
    afterPrompt: 'Did the idea become smarter, or did the packaging become more modern?',
    hostPrompts: ['Do we mistake new language for new truth?', 'Would you reject a good idea just because it sounds old?']
  },
  {
    id: 13,
    title: 'EXPLAIN THE TOILET',
    vibe: 'funny',
    scenario: [
      'Everyone in the room has used a toilet thousands of times.',
      'Without looking anything up, explain exactly how pressing the handle makes the bowl empty and refill.'
    ],
    prompt: 'Could you explain it properly?',
    choices: ['Easy', 'I know the rough idea', 'Not really'],
    twist: [
      'Now imagine someone saying, “I have used toilets my whole life, so obviously I understand how the system works.”'
    ],
    afterPrompt: 'How many things do we feel certain about because they are familiar, even though we could not actually explain them?',
    hostPrompts: ['Name something else you “know” until someone asks how it works.', 'Does familiarity create fake confidence?']
  },
  {
    id: 14,
    title: 'SAME CALL, DIFFERENT JERSEY',
    vibe: 'sports',
    scenario: [
      'A referee makes a borderline call against your team in the final minute. You say it is one of the worst calls you have ever seen.',
      'Next week the exact same call goes in your team’s favour.'
    ],
    prompt: 'Are you calling it terrible again?',
    choices: ['Yes', 'Probably not'],
    twist: [
      'The league later shows the two plays side by side. They are almost identical.'
    ],
    afterPrompt: 'If your standard changes when your jersey changes, were you judging the rule or protecting your side?',
    hostPrompts: ['Where else do we use different standards for our team?', 'Would you trust a judge who reasoned like a fan?']
  },
  {
    id: 15,
    title: 'GREEN CHECKOUT',
    vibe: 'modern-life',
    scenario: [
      'You tell people you care about waste and the environment.',
      'At checkout, the more sustainable option costs $4 more and takes two extra days to arrive. The cheaper option arrives tonight.'
    ],
    prompt: 'Which one are you buying?',
    choices: ['Sustainable option', 'Cheaper tonight'],
    twist: [
      'Neither answer makes you a good or bad person. But one of them reveals what happens when a stated value meets money and inconvenience.'
    ],
    afterPrompt: 'Which tells us more about a belief: saying it when it is free, or acting on it when it costs something?',
    hostPrompts: ['How much inconvenience would you accept for a value?', 'Which values disappear fastest when they become expensive?']
  },
  {
    id: 16,
    title: 'TWO BRAND-NEW ACCOUNTS',
    vibe: 'internet',
    scenario: [
      'You make two new social-media accounts with no history.',
      'On Account A you spend one evening clicking angry political clips. On Account B you click cooking, travel, and comedy.'
    ],
    prompt: 'A month later, will the two feeds feel like the same world?',
    choices: ['Mostly the same', 'Completely different'],
    twist: [
      'Now imagine each account belongs to a real person who says, “Look around. This is what everyone is talking about.”'
    ],
    afterPrompt: 'When a system chooses what you repeatedly see, can it also influence what feels common, urgent, or obvious?',
    hostPrompts: ['How much of your feed did you deliberately choose?', 'Does seeing something constantly make it feel more important than it is?']
  },
  {
    id: 17,
    title: 'THE INVISIBLE CAMERA',
    vibe: 'deeper',
    scenario: [
      'You find a wallet with $800 cash and an ID inside.',
      'There are no people around and you are completely certain there are no cameras.'
    ],
    prompt: 'Return it or keep the cash?',
    choices: ['Return everything', 'Keep the cash'],
    twist: [
      'Now change one fact: there is a security camera pointed directly at you.'
    ],
    afterPrompt: 'If the camera changes the choice, was the original rule a principle or just fear of consequences?',
    hostPrompts: ['Would your answer change if nobody could ever know?', 'What does a principle mean when there is no audience?']
  },
  {
    id: 18,
    title: 'FAMILY FIRST',
    vibe: 'real-life',
    scenario: [
      'You say family is one of the most important things in your life.',
      'At dinner your phone keeps buzzing. Work email, sports updates, group chat, YouTube, a sale notification, then another group chat.'
    ],
    prompt: 'Phone on the table or phone away?',
    choices: ['Keep it nearby', 'Put it away'],
    twist: [
      'Your weekly screen-time report later shows 29 hours of social apps and entertainment.',
      'You also say you have been “too busy” to spend more time with people you care about.'
    ],
    afterPrompt: 'When stated priorities and repeated behaviour disagree, which one is the better evidence of what is actually running your life?',
    hostPrompts: ['What gets your best attention?', 'Which thing do you claim matters more than your calendar suggests?']
  },
  {
    id: 19,
    title: 'THE SCIENCE GRAPHIC',
    vibe: 'internet',
    scenario: [
      'A clean infographic says, “STUDY PROVES...” and gives a dramatic conclusion you already agree with.',
      'It has a university logo, a chart, and 200,000 shares.'
    ],
    prompt: 'Share it or check the study first?',
    choices: ['Share it', 'Check first'],
    twist: [
      'The actual study exists, but its conclusion is much narrower than the graphic claims.',
      'The graphic was made by an advocacy account, not the researchers.'
    ],
    afterPrompt: 'Do we really follow evidence if we only verify claims that challenge us?',
    hostPrompts: ['Would you have checked it if you disagreed with it?', 'What does “evidence-based” require from your own side?']
  },
  {
    id: 20,
    title: 'ONE RING FOR A WEEK',
    vibe: 'pop',
    scenario: [
      'You get the One Ring for seven days. It gives you real advantages, and after the week you must destroy it.',
      'You know what happened to nearly everyone else who believed they could control it.'
    ],
    prompt: 'Use it or refuse it?',
    choices: ['Use it', 'Refuse it'],
    twist: [
      'Your main argument for using it is: “Those people were weaker than me. I know myself.”'
    ],
    afterPrompt: 'Why are we often more willing to trust our own self-control than the evidence we would use to judge someone else?',
    hostPrompts: ['What makes you the exception?', 'When is confidence about yourself evidence, and when is it just confidence?']
  },
  {
    id: 21,
    title: 'THE PERFECT FAKE TOWN',
    vibe: 'deeper',
    scenario: [
      'You discover your entire town is a controlled set. Your job, neighbours, news, and routines are staged.',
      'But life there is excellent: no mortgage, no traffic, great weather, your friends stay, and your favourite team wins regularly.'
    ],
    prompt: 'Stay or walk through the exit?',
    choices: ['Stay', 'Leave'],
    twist: [
      'Outside is ordinary reality: bills, uncertainty, bad weather, arguments, and no guarantee things work out better.'
    ],
    afterPrompt: 'If comfort cannot make something true, why does comfort have so much power over whether we want to examine it?',
    hostPrompts: ['How much comfort would make you tolerate something you knew was fake?', 'Do unpleasant consequences make a fact less true?']
  },
  {
    id: 22,
    title: 'THE MYSTERY MACHINE',
    vibe: 'mystery',
    scenario: [
      'You find a strange machine in a storage unit.',
      'You discover it can charge a phone, heat coffee, hold a door open, and play music. Everyone argues about what it was made for.'
    ],
    prompt: 'Can the users figure out its real purpose just from what they can do with it?',
    choices: ['Probably', 'Not for sure'],
    twist: [
      'The original designer appears with the plans. The machine was built to detect a dangerous gas leak. Every other use was accidental.'
    ],
    afterPrompt: 'Can something have many useful uses while its intended purpose still comes from the one who designed it?',
    hostPrompts: ['Is usefulness the same thing as intended purpose?', 'Who has the strongest claim to know why something was made?']
  },
  {
    id: 23,
    title: 'THE ONE FACT',
    vibe: 'deeper',
    scenario: [
      'Pick one belief or opinion you feel very confident about.',
      'Now imagine someone offers you $10,000 if you can honestly name one piece of evidence that would make you admit you were wrong.'
    ],
    prompt: 'Can you name one?',
    choices: ['Yes', 'No'],
    twist: [
      'If the answer is “nothing could change my mind,” you do not get the money.',
      'The other person asks: “Then what role is evidence actually playing in your belief?”'
    ],
    afterPrompt: 'Can a belief be called open-minded if it has no possible losing condition?',
    hostPrompts: ['What would genuinely change your mind?', 'Which of your beliefs gets the toughest protection from contrary evidence?']
  },
  {
    id: 24,
    title: 'TEN YEARS OF YOU',
    vibe: 'deeper',
    scenario: [
      'A machine shows you an accurate preview of yourself ten years from now if your current habits simply continue.',
      'Same sleep habits, spending habits, screen habits, friendships, exercise, work patterns, and ways of handling stress.'
    ],
    prompt: 'Would you press PLAY?',
    choices: ['Show me', 'I would rather not know'],
    twist: [
      'The machine cannot show intentions. It only projects repeated behaviour.',
      'It does not care what you planned to become.'
    ],
    afterPrompt: 'If your current causes keep running, what reason do you have to expect a completely different result?',
    hostPrompts: ['Which habit would you be most nervous to see compounded?', 'What future do your actions predict better than your goals do?']
  }
];

const CHAOS_MODIFIERS = [
  {
    name: 'SWITCH SIDES',
    text: 'Defend the opposite answer for 30 seconds. Make it as strong as you can.'
  },
  {
    name: 'SHOW RECEIPTS',
    text: 'Give one actual reason or piece of evidence for your answer. No vibes.'
  },
  {
    name: 'NO AUDIENCE',
    text: 'Nobody will ever know what you chose. Same answer?'
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
  },
  {
    name: 'WHO TAUGHT YOU THAT?',
    text: 'Where did your first instinct on this question come from: experience, evidence, family, friends, media, habit, or something else?'
  }
];
