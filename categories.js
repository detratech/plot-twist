'use strict';

const GAME_CATEGORIES = [
  {
    id: 'mind',
    label: 'Mind & Truth',
    icon: '🧠',
    description: 'Evidence, beliefs, logic, assumptions'
  },
  {
    id: 'relationships',
    label: 'Relationships & Family',
    icon: '❤️',
    description: 'Marriage, dating, parenting, boundaries'
  },
  {
    id: 'money',
    label: 'Money & Success',
    icon: '💸',
    description: 'Work, ambition, debt, status, responsibility'
  },
  {
    id: 'tech',
    label: 'Tech & Modern Life',
    icon: '📱',
    description: 'Phones, algorithms, attention, convenience'
  },
  {
    id: 'society',
    label: 'Society & Culture',
    icon: '🌎',
    description: 'Social rules, politics, groups, public life'
  },
  {
    id: 'life',
    label: 'Life & Purpose',
    icon: '🧭',
    description: 'Character, pleasure, freedom, meaning, time'
  }
];

const CATEGORY_RULES = {
  mind: {
    vibes: ['truth', 'logic', 'mystery', 'evidence', 'wordplay'],
    keywords: [
      'truth', 'evidence', 'claim', 'argument', 'logic', 'contradiction', 'source', 'testimony',
      'record', 'expert', 'measurement', 'context', 'quote', 'proof', 'belief', 'interpretation',
      'manual', 'mystery', 'witness', 'reasoning', 'reliable', 'confidence', 'fact', 'knowledge'
    ]
  },
  relationships: {
    vibes: ['relationships', 'family', 'parenting', 'marriage', 'dating'],
    keywords: [
      'partner', 'spouse', 'marriage', 'married', 'dating', 'relationship', 'family', 'parent',
      'mother', 'father', 'child', 'children', 'kid', 'husband', 'wife', 'boyfriend', 'girlfriend',
      'grandma', 'grandfather', 'home', 'boundary', 'apology', 'couple', 'parenting'
    ]
  },
  money: {
    vibes: ['money', 'work', 'career', 'business', 'consumer', 'status', 'debt'],
    keywords: [
      'money', 'salary', 'income', 'job', 'career', 'boss', 'employee', 'business', 'debt', 'loan',
      'mortgage', 'credit', 'wealth', 'work', 'promotion', 'productivity', 'millionaire', 'purchase',
      'price', 'contract', 'ambition', 'goal', 'status', 'spending', 'budget', 'bank', 'donor'
    ]
  },
  tech: {
    vibes: ['internet', 'technology', 'modern-life', 'digital', 'ai', 'phone', 'sci-fi'],
    keywords: [
      'phone', 'app', 'algorithm', 'internet', 'online', 'feed', 'notification', 'screen', 'social media',
      'digital', 'streaming', 'recommendation', 'ai ', 'artificial intelligence', 'smart ', 'simulation',
      'software', 'platform', 'scroll', 'viral', 'video', 'device', 'technology'
    ]
  },
  society: {
    vibes: ['politics', 'society', 'group', 'social', 'culture', 'awkward'],
    keywords: [
      'society', 'culture', 'law', 'legal', 'politic', 'mayor', 'neighbourhood', 'group', 'vote',
      'majority', 'crowd', 'public', 'policy', 'speech', 'community', 'equality', 'collective', 'lobby',
      'influence', 'security', 'citizen', 'government', 'city', 'social rule', 'tradition', 'custom'
    ]
  },
  life: {
    vibes: ['absurd', 'deeper', 'moral', 'choices', 'time', 'health', 'discipline', 'identity', 'pleasure', 'finale', 'freedom', 'habits', 'food'],
    keywords: [
      'happiness', 'pleasure', 'fulfilment', 'purpose', 'meaning', 'death', 'life', 'time', 'health',
      'freedom', 'responsibility', 'character', 'discipline', 'morality', 'moral', 'appetite', 'desire',
      'habit', 'self-control', 'enough', 'future', 'sacrifice', 'comfort', 'identity', 'humility',
      'attention', 'regret', 'growth', 'restraint', 'addiction', 'dependence'
    ]
  }
};

function scoreCategory(card, categoryId) {
  const rule = CATEGORY_RULES[categoryId];
  if (!rule) return 0;

  const vibe = String(card.vibe || '').toLowerCase();
  const haystack = [
    card.title,
    ...(card.scenario || []),
    card.prompt,
    ...(card.choices || []),
    ...(card.twist || []),
    card.conclusion,
    card.afterPrompt,
    ...(card.hostPrompts || [])
  ].filter(Boolean).join(' ').toLowerCase();

  let score = rule.vibes.includes(vibe) ? 5 : 0;
  rule.keywords.forEach(keyword => {
    if (haystack.includes(keyword)) score += 1;
  });
  return score;
}

function inferCardCategories(card) {
  const ranked = GAME_CATEGORIES
    .map(category => ({ id: category.id, score: scoreCategory(card, category.id) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) return ['life'];

  const topScore = ranked[0].score;
  const selected = ranked
    .filter((item, index) => index === 0 || item.score >= Math.max(3, topScore - 2))
    .slice(0, 2)
    .map(item => item.id);

  return selected.length ? selected : ['life'];
}

PLOT_TWIST_CARDS.forEach(card => {
  card.categories = inferCardCategories(card);
});
