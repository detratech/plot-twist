'use strict';

const PLOT_TWIST_CARDS = [];

const CHAOS_MODIFIERS = [
  {
    name: 'SWITCH SIDES',
    text: 'Take the other answer and make the best case you can for it.'
  },
  {
    name: 'SHOW YOUR RECEIPTS',
    text: 'What facts are you actually using? “It just feels obvious” does not count.'
  },
  {
    name: 'WHERE DID THAT COME FROM?',
    text: 'Where did your first reaction come from: your own experience, family, culture, social media, a teacher, or something you checked yourself?'
  },
  {
    name: 'SAME RULE',
    text: 'Use your exact rule on a person or group you strongly disagree with. Still fair?'
  },
  {
    name: 'NOBODY IS WATCHING',
    text: 'Nobody will ever know what you picked. No praise, shame, likes, or status. Same answer?'
  },
  {
    name: 'TEN YEARS LATER',
    text: 'Imagine everyone follows your answer for ten years. What happens to people, families, habits, or society?'
  },
  {
    name: 'REMOVE THE REWARD',
    text: 'Take away the money, pleasure, praise, attention, convenience, and status. Do you still pick the same side?'
  },
  {
    name: 'BET $10,000',
    text: 'If being wrong cost you $10,000, what would you double-check first?'
  },
  {
    name: 'WHAT DOES THAT WORD MEAN?',
    text: 'Pick the most important word in your argument and explain what you mean by it. Keep the same meaning the whole time.'
  },
  {
    name: 'WHO BENEFITS?',
    text: 'Who gets money, power, attention, status, or control if people accept this idea?'
  },
  {
    name: 'WHAT ARE YOU PROTECTING?',
    text: 'If changing your answer would hurt, what would it hurt most: your ego, your identity, your comfort, or your group?'
  },
  {
    name: 'FAULT VS FIXING IT',
    text: 'Even if someone else caused the mess, what part of fixing it still belongs to you?'
  },
  {
    name: 'MAKE YOUR SIDE LOOK BAD',
    text: 'Add one missing fact that would make your current answer much harder to defend.'
  },
  {
    name: 'FIND ONE EXCEPTION',
    text: 'Can you think of one real case where your rule would not work? Does the rule need a limit?'
  },
  {
    name: 'WHAT HAPPENS NEXT?',
    text: 'Follow your choice through the next few consequences instead of stopping at the first good result.'
  },
  {
    name: 'REMOVE THE LABELS',
    text: 'Forget the political, cultural, or group labels. Judge only what happened, why it happened, and what the result was.'
  }
];
