'use strict';

const PLOT_TWIST_CARDS = [];

const CHAOS_MODIFIERS = [
  {
    name: 'DEFEND YOUR EX',
    text: 'Take the opposite answer and defend it like it just got custody of the Netflix password.'
  },
  {
    name: 'RECEIPTS OR VIBES?',
    text: 'Name the actual evidence behind your answer. “It feels obvious” has been escorted from the building.'
  },
  {
    name: 'SOURCE: YOUR MOM?',
    text: 'Where did your first instinct come from: experience, family, culture, a feed, a teacher, a bad ex, or something you actually checked?'
  },
  {
    name: 'SAME ENERGY',
    text: 'Apply your exact rule to a person, group, or situation you dislike. If the rule suddenly develops asthma, explain why.'
  },
  {
    name: 'NO AUDIENCE MODE',
    text: 'Nobody will ever know what you chose. No likes, praise, shame, status, or dramatic speech afterward. Same answer?'
  },
  {
    name: 'TEN YEARS LATER',
    text: 'Imagine everyone follows your answer for ten years. What kind of people, families, habits, and institutions does it produce?'
  },
  {
    name: 'REMOVE THE REWARD',
    text: 'Take away the money, pleasure, praise, attention, convenience, and status. Do you still defend the choice?'
  },
  {
    name: 'PUT $10,000 ON IT',
    text: 'If being wrong costs you ten grand, what would you verify before speaking with that heroic level of confidence?'
  },
  {
    name: 'DEFINE THE WORD',
    text: 'Pick the most important word in your argument and define it. You are not allowed to quietly change the definition halfway through like a suspicious car salesman.'
  },
  {
    name: 'WHO PROFITS?',
    text: 'Who gains money, power, attention, convenience, votes, status, or control if people accept this idea? Incentives have entered the chat.'
  },
  {
    name: 'WHAT ARE YOU PROTECTING?',
    text: 'If changing your answer would sting, what exactly gets hurt: the evidence, your ego, your identity, your comfort, or your group membership?'
  },
  {
    name: 'BLAME VS RESPONSIBILITY',
    text: 'Even if somebody else caused the mess, what part of fixing it still belongs to you? The mess has declined to care whose fault it was.'
  },
  {
    name: 'CAMERA TWO',
    text: 'Add one missing fact that would make your current answer look much worse. Congratulations, you are now your own hostile documentary editor.'
  },
  {
    name: 'ONE COUNTEREXAMPLE',
    text: 'Find one real exception to the rule you just used. Does the rule survive, need limits, or collapse into a decorative slogan?'
  },
  {
    name: 'FOLLOW THE CHAIN',
    text: 'Trace the choice through the next five consequences instead of stopping at the first pleasant one. Future-you has requested representation.'
  },
  {
    name: 'DELETE THE LABEL',
    text: 'Remove every political, cultural, lifestyle, and group label from the scenario. Judge only the act, evidence, responsibility, and consequences.'
  }
];
