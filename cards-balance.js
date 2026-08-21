'use strict';

const BALANCED_CARD_OVERRIDES = {
  1: {
    prompt: 'Would you trade some struggle and growth for guaranteed happiness?',
    choices: ['Take guaranteed happiness', 'Keep the real highs and lows'],
    twist: [
      'Ten years later, the chip can still be switched off. But a decade without much discomfort left some users worse at hard conversations, patience, and recovery when life finally hurts.',
      'If you took the chip, comfort may have quietly weakened abilities you only build under pressure. If you refused it, you also chose years of pain, anxiety, and bad days that you could have safely avoided.'
    ],
    afterPrompt: 'Still your answer? How much struggle is actually worth keeping if relief is available?'
  },
  2: {
    prompt: 'Do you open a guaranteed uncomfortable truth, or keep living without knowing it?',
    choices: ['Open it', 'Leave it sealed'],
    twist: [
      'The envelope tells you exactly what you are wrong about, but gives no instructions for what to do next. Acting on it could seriously disrupt a stable part of your life.',
      'If you open it, truth may create costs you cannot undo. If you leave it sealed, you are knowingly protecting a comfortable belief that you have been guaranteed is wrong.'
    ],
    afterPrompt: 'Still your answer? Is knowing the truth always worth the price of having to live differently?'
  },
  3: {
    prompt: 'When sincere experience and a measurement disagree, which gets first priority?',
    choices: ['Trust the measurement first', 'Trust the experience first'],
    twist: [
      'Later, the thermostat is found to be off by 2°C. But even after it is corrected, the two roommates still experience the same room very differently.',
      'Trusting measurement can ignore imperfect tools and real human variation. Trusting experience can turn a private feeling into a claim about the room itself.'
    ],
    afterPrompt: 'Still your answer? What should happen when neither the instrument nor the feeling deserves absolute authority?'
  },
  4: {
    prompt: 'With four conflicting routes and limited time, what is the better starting rule?',
    choices: ['Pick the best-supported route', 'Keep every route open until tested'],
    twist: [
      'The official-looking map is outdated. The weird handwritten map contains one correct shortcut, but several other directions on it are nonsense.',
      'Choosing early can make you confidently follow bad evidence. Treating every option as equally possible can waste time on routes with almost no support.'
    ],
    afterPrompt: 'Still your answer? When does open-mindedness become indecision, and when does confidence become premature?'
  },
  5: {
    prompt: 'When an inner practice gives someone a powerful insight, how much should they trust it?',
    choices: ['Trust the experience provisionally', 'Trust only what survives outside testing'],
    twist: [
      'The practices genuinely reduce stress and help people notice things about themselves. They also lead equally sincere people to contradictory conclusions about questions outside themselves.',
      'Dismissing inner experience can throw away useful information. Treating it as proof can make conflicting conclusions impossible to resolve.'
    ],
    afterPrompt: 'Still your answer? What can personal experience tell you well, and what can it not settle by itself?'
  },
  6: {
    prompt: 'When evidence is incomplete, what is the better move?',
    choices: ['Use the best explanation for now', 'Suspend judgment and say we do not know'],
    twist: [
      'One early explanation turns out to be wrong, but testing it leads to the experiment that eventually solves the mystery.',
      'A tentative explanation can move inquiry forward while also becoming false confidence. Refusing to guess protects accuracy but can become an excuse to never investigate.'
    ],
    afterPrompt: 'Still your answer? How tentative should a useful explanation be before it turns into pretending to know?'
  },
  7: {
    prompt: 'When people give conflicting answers to a factual question, what deserves priority first?',
    choices: ['Protect participation and dignity', 'Correct the answer clearly'],
    twist: [
      'The students now have to calculate the elevator load. A wrong answer can hurt people. But the harshest teacher gets accurate answers while making half the class afraid to speak at all.',
      'Kindness without correction can protect error. Correction without kindness can make people hide confusion instead of learning.'
    ],
    afterPrompt: 'Still your answer? How do you correct what is false without making disagreement feel like humiliation?'
  },
  8: {
    prompt: 'Two sincere people report powerful experiences supporting opposite claims. What is the fair starting position?',
    choices: ['Give sincere testimony real weight', 'Withhold belief until something else breaks the tie'],
    twist: [
      'One person later produces a small piece of independent support, but it is not decisive. The other has no outside evidence but an unusually detailed and consistent account.',
      'Automatically distrusting testimony can ignore real evidence. Treating sincerity as proof cannot explain why equally sincere people reach incompatible conclusions.'
    ],
    afterPrompt: 'Still your answer? How much should sincerity count when sincerity cannot settle the dispute?'
  },
  9: {
    prompt: 'When written instructions and what you observe in front of you conflict, which should lead?',
    choices: ['Follow the manual', 'Adapt to what actually happens'],
    twist: [
      'The manual contains one real printing mistake. Your friend also ignored twenty instructions that were completely correct.',
      'Following the source blindly can preserve an error. Improvising whenever something feels wrong can turn one exception into permission to ignore everything.'
    ],
    afterPrompt: 'Still your answer? What evidence should be strong enough to justify departing from the instructions?'
  },
  10: {
    prompt: 'How should you treat reliable records about events you never personally witnessed?',
    choices: ['Trust them unless there is reason to doubt', 'Stay skeptical until independently checked'],
    twist: [
      'A respected archive is later caught with several forged entries. Most of its other records remain independently confirmed and accurate.',
      'Trust makes ordinary knowledge possible but can inherit institutional mistakes. Maximum skepticism protects against bad records but can erase almost everything you know about the past.'
    ],
    afterPrompt: 'Still your answer? What makes testimony and records trustworthy enough without making them unquestionable?'
  },
  11: {
    prompt: 'When an everyday description and a technical description point in different directions, which should guide the decision?',
    choices: ['Use the everyday description', 'Use the deeper technical description'],
    twist: [
      'The technical description is crucial for repairing the car, but useless for deciding whether it occupied the parking space. The ordinary description works for the ticket but cannot explain the engine.',
      'Either level becomes misleading when it is used outside the question it actually answers.'
    ],
    afterPrompt: 'Still your answer? Is the better description the deepest one, or the one relevant to the question being asked?'
  },
  12: {
    prompt: 'What should inherited beliefs receive before you have personally tested them?',
    choices: ['Initial trust', 'Initial suspicion'],
    twist: [
      'One inherited belief turns out to preserve generations of hard-earned wisdom. Another survives only because nobody ever asked why it was there.',
      'Starting with trust can preserve wisdom and error together. Starting with suspicion can expose bad assumptions while making you discard useful knowledge merely because it came before you.'
    ],
    afterPrompt: 'Still your answer? What should make an inherited belief earn confidence rather than automatic loyalty or automatic rejection?'
  },
  13: {
    prompt: 'If roughly the same amount of the body is visible, should the setting change the social rule?',
    choices: ['Context can legitimately change the meaning', 'The physical exposure should matter more'],
    twist: [
      'Context really does change expectations in many areas: a medical exam, a locker room, a stage, and a public street are not socially identical. But cultures can also attach strong feelings to distinctions people rarely examine.',
      'Ignoring context can flatten meaningful differences. Treating context as automatically decisive can turn any familiar custom into a self-justifying rule.'
    ],
    afterPrompt: 'Still your answer? How do you tell a meaningful contextual difference from a social habit that merely feels obvious?'
  },
  14: {
    prompt: 'An informed adult freely accepts a terrible-looking deal. What should matter more?',
    choices: ['Respect the agreement', 'Protect people from exploitative terms'],
    twist: [
      'Some adults knowingly take extreme risks that later transform their lives for the better. The same legal freedom also lets companies design deals around predictable desperation and short-term thinking.',
      'Strong protection can become paternalism that blocks voluntary risk. Pure consent can become a shield for predatory arrangements.'
    ],
    afterPrompt: 'Still your answer? What does consent settle, and what questions remain after consent is real?'
  },
  15: {
    prompt: 'When judging whether someone is a good person, what should carry more weight?',
    choices: ['Clear enforceable rules', 'Moral standards beyond the law'],
    twist: [
      'Broad moral judgment can become subjective, intrusive, and easily weaponized against unpopular people. But written law leaves plenty of room for cruelty, betrayal, and selfishness that remains perfectly legal.',
      'Rules protect people from arbitrary judgment. Rules alone cannot define every kind of goodness.'
    ],
    afterPrompt: 'Still your answer? If law is not the whole standard, how should the rest be judged without becoming arbitrary?'
  },
  16: {
    prompt: 'When you reach a major goal, what is the healthier default?',
    choices: ['Raise the target again', 'Define enough and protect it'],
    twist: [
      'People who stop raising goals sometimes become comfortable and stagnant. People who never define enough can turn every achievement into the starting line for the next dissatisfaction.',
      'Ambition can build a life. Ambition can also make arrival psychologically impossible.'
    ],
    afterPrompt: 'Still your answer? How do you keep ambition without making satisfaction permanently conditional on the next milestone?'
  },
  17: {
    prompt: 'Should you deliberately protect periods of low stimulation, or use entertainment whenever it improves the day?',
    choices: ['Use the entertainment', 'Protect regular quiet'],
    twist: [
      'Constant stimulation can make ordinary life feel painfully slow. But people can also romanticize silence and use “disconnecting” to avoid relationships, responsibilities, or useful tools.',
      'One side risks dependence on stimulation. The other risks turning withdrawal into its own escape.'
    ],
    afterPrompt: 'Still your answer? What would healthy use look like if neither constant stimulation nor total withdrawal is the goal?'
  },
  18: {
    prompt: 'You can have a happier simulated life or a harder real one. Which do you choose?',
    choices: ['Choose the happier simulation', 'Choose reality'],
    twist: [
      'Reality outside includes real loss, loneliness, disappointment, and no guarantee that your life will feel meaningful. The simulation reliably gives you love, achievement, and joy, but none of those relationships or accomplishments exist outside the experience.',
      'Choosing reality accepts suffering for something more than feeling. Choosing simulation forces you to defend why a convincing experience of a good life is not enough.'
    ],
    afterPrompt: 'Still your answer? What does reality contain that perfect experience cannot replace, if anything?'
  },
  19: {
    prompt: 'A dramatic claim supports something you already believe. What is the better rule?',
    choices: ['Share it quickly with a caveat', 'Verify it before sharing'],
    twist: [
      'This graphic exaggerates the study. But the underlying issue is real, and in another case waiting for perfect verification delayed a warning that people genuinely needed.',
      'Speed can spread useful warnings and falsehoods. Verification protects accuracy but can become paralysis when decisions are time-sensitive.'
    ],
    afterPrompt: 'Still your answer? What level of confidence should be required before information is worth spreading?'
  },
  20: {
    prompt: 'When another society has a moral rule you strongly reject, what should be your default?',
    choices: ['Some things can be wrong across cultures', 'Local norms deserve strong deference'],
    twist: [
      'Outsiders have often judged unfamiliar customs badly because they misunderstood the context. Entire societies have also defended practices that later generations, including their own descendants, condemned as unjust.',
      'Universal judgment can become arrogant when the facts are misunderstood. Cultural deference can become an excuse to stop judging obvious harm.'
    ],
    afterPrompt: 'Still your answer? What could justify judging a whole society without simply treating your own culture as the measuring stick?'
  },
  21: {
    prompt: 'A member uses an open-speech rule to campaign for ending open speech. What should the club do?',
    choices: ['Remove him to protect the rule', 'Keep him to protect the rule'],
    twist: [
      'If he stays and wins, the club may lose the freedom that allowed the debate. If he is removed, future leaders now have a precedent for excluding people by claiming they are a threat to the rule.',
      'Both choices can protect the principle in the short term while creating a way to destroy it later.'
    ],
    afterPrompt: 'Still your answer? What limit protects tolerance without turning “protection” into a weapon against ordinary disagreement?'
  },
  22: {
    prompt: 'Would you trade ten healthy years later for five extraordinary years now?',
    choices: ['Take the five extraordinary years', 'Protect the ten future years'],
    twist: [
      'Those five years would arrive exactly when a parent needs care, your children are young, and your best career opportunity appears. The ten years you lose would come later, when you may finally have more time and less pressure.',
      'Either answer sacrifices a real version of your life, not an abstract number on a timeline.'
    ],
    afterPrompt: 'Still your answer? Which version of you gets to decide what the other version must lose?'
  },
  23: {
    prompt: 'Should every important belief have a clear fact that could prove it wrong?',
    choices: ['Yes, it should be able to lose', 'Not every belief fits one decisive test'],
    twist: [
      'Some conclusions rest on many pieces of evidence, so no single fact would destroy them. But if no possible evidence, combination of evidence, or contradiction could ever count against a belief, it has become impossible to test.',
      'Demanding one magic falsifier can oversimplify real reasoning. Allowing a belief to survive everything makes evidence irrelevant.'
    ],
    afterPrompt: 'Still your answer? What would a fair way for a strongly held belief to lose actually look like?'
  },
  24: {
    prompt: 'You discover your world is heavily filtered. What is the safer move?',
    choices: ['Step into the unfiltered world', 'Stay until I can judge the filters better'],
    twist: [
      'Outside the filter is not pure truth. It contains noise, manipulation, scams, and contradictory claims too. Staying inside protects you from some junk while guaranteeing that someone else keeps deciding what reaches you.',
      'Leaving creates exposure without certainty. Staying creates comfort without independence.'
    ],
    afterPrompt: 'Still your answer? How do you escape a filter without pretending that “unfiltered” automatically means true?'
  },
  25: {
    prompt: 'What matters more for personal freedom?',
    choices: ['Having more options', 'Being able to refuse your impulses'],
    twist: [
      'More options can protect people from being trapped in one approved way of living. But a person with endless choices can still be dragged around by cravings, recommendations, debt, and habits.',
      'Self-control without options can become disciplined captivity. Options without self-control can become a very colourful leash.'
    ],
    afterPrompt: 'Still your answer? Is freedom mainly about what you are allowed to choose, or what you are capable of refusing?'
  },
  26: {
    prompt: 'Which restaurant gives you more meaningful freedom?',
    choices: ['The 10,000-item menu', 'The carefully chosen eight-item menu'],
    twist: [
      'The giant menu contains one meal perfectly suited to you that the small restaurant never offers. The small menu saves forty minutes and was designed by a chef who knows which combinations actually work.',
      'More choice can reveal possibilities. Curation can protect time and quality while quietly deciding what you never get to see.'
    ],
    afterPrompt: 'Still your answer? When does curation help you, and when does it become somebody else choosing on your behalf?'
  },
  27: {
    prompt: 'If an app is legal and users knowingly keep choosing it, who carries more responsibility for harmful overuse?',
    choices: ['The user', 'The designer'],
    twist: [
      'Users can leave, disable features, and make different choices. The company also runs thousands of experiments specifically to make leaving harder and returning more automatic.',
      'Blaming only the user ignores deliberate influence. Blaming only the designer treats adults as though their repeated choices do not matter.'
    ],
    afterPrompt: 'Still your answer? How should responsibility be divided when persuasion is intentional but the final tap is still voluntary?'
  },
  28: {
    prompt: 'The celebrity expert and the hands-on mechanic disagree. Who gets your first trust?',
    choices: ['The public expert', 'The local practitioner'],
    twist: [
      'The mechanic replaces the $40 belt and the noise disappears. Two weeks later, a deeper transmission fault appears that the celebrity had noticed from the sound, although he wildly overstated how urgent it was.',
      'Hands-on experience solved the immediate problem. Broader expertise spotted something real that the quick fix did not.'
    ],
    afterPrompt: 'Still your answer? How should relevant expertise, direct observation, and actual evidence be weighed when they point in different directions?'
  },
  29: {
    prompt: 'If tool-assisted work is excellent, what should matter more when hiring?',
    choices: ['Judge the output', 'Test the underlying unaided skill'],
    twist: [
      'The actual job allows the same tools every day, so refusing tool-assisted talent may punish someone for working efficiently. But outages, unusual cases, and judgment calls still require understanding that cannot be outsourced.',
      'Output can be the real job. Underlying competence is what remains when the normal tool stops being enough.'
    ],
    afterPrompt: 'Still your answer? What must a person know personally when powerful tools are part of ordinary work?'
  },
  30: {
    prompt: 'Someone refuses $10,000 to delete social apps for 90 days. What is the stronger interpretation?',
    choices: ['That is strong evidence of dependence', 'The apps may simply be worth more to them'],
    twist: [
      'When they finally delete the apps for a family trip, they feel real withdrawal-like urges for a week. They also miss invitations, community updates, and relationships that genuinely mattered to them.',
      'The habit was doing real harm and providing real value at the same time.'
    ],
    afterPrompt: 'Still your answer? How do you tell dependence from a tool that has become deeply useful and deeply costly at once?'
  },
  31: {
    prompt: 'For a good dinner with friends, what is the better rule?',
    choices: ['Lock the phones away', 'Keep them available but use self-control'],
    twist: [
      'Keeping phones nearby causes constant glances and broken attention. During the meal, one genuinely urgent family message arrives and is not seen until everyone leaves.',
      'Removing temptation protects attention by reducing choice. Keeping access preserves responsiveness while demanding self-control every few minutes.'
    ],
    afterPrompt: 'Still your answer? When is removing access wiser than practising restraint, and when does it become impractical?'
  },
  32: {
    prompt: 'Should the status of the person correcting you affect how seriously you take the correction?',
    choices: ['Credibility should affect initial trust', 'Judge the evidence without status'],
    twist: [
      'The intern is right in this case. Across the year, the experienced consultant is also right much more often on unfamiliar problems because expertise really does matter.',
      'Ignoring credibility wastes useful information about reliability. Letting status override the actual evidence turns reputation into a substitute for thinking.'
    ],
    afterPrompt: 'Still your answer? How much should credibility change your starting confidence without deciding the conclusion for you?'
  },
  33: {
    prompt: 'Your good deed can stay anonymous or become public and inspire more donations. Which do you choose?',
    choices: ['Keep it anonymous', 'Make it public'],
    twist: [
      'Publishing the story doubles the money raised for the project. It also gives you a powerful reputation boost, and you notice that you start thinking about the praise more than you expected.',
      'Anonymity protects motive but may reduce impact. Publicity can multiply impact while quietly changing why you enjoy doing good.'
    ],
    afterPrompt: 'Still your answer? When does public example become useful leadership, and when does it become image management?'
  },
  34: {
    prompt: 'When judging someone early, how much should obvious potential count?',
    choices: ['Potential deserves real credit', 'Only demonstrated results deserve credit'],
    twist: [
      'A talented beginner with almost no finished work later becomes exceptional because someone took a chance on potential. Another person receives years of praise for potential and uses it to avoid ever finishing anything.',
      'Ignoring potential can miss future ability. Rewarding it too freely can pay people in advance for a person they never become.'
    ],
    afterPrompt: 'Still your answer? What kind of evidence turns potential from fantasy into a reasonable bet?'
  },
  35: {
    prompt: 'The fallen tree is not your fault. What should come first?',
    choices: ['Clear it and solve the immediate problem', 'Wait and hold the responsible person accountable'],
    twist: [
      'Clearing it yourself gets you to the appointment but damages a fence, creating a dispute about who authorized the work. Waiting preserves a clean claim against the neighbour but costs you the appointment.',
      'Taking responsibility for the next step can create new risks. Refusing responsibility because you did not cause the problem can leave your life blocked by someone who is not there.'
    ],
    afterPrompt: 'Still your answer? How do you act on a problem without accidentally accepting blame that does not belong to you?'
  },
  36: {
    prompt: 'For uncomfortable decisions, what is the better default?',
    choices: ['Sleep on it for 24 hours', 'Act while the issue is clear and motivation is present'],
    twist: [
      'Waiting one day prevents an angry message and a terrible impulse purchase. The same habit also delays an apology, an application, and a health decision until the opportunities are gone.',
      'Delay can create wisdom or avoidance. Speed can create courage or stupidity.'
    ],
    afterPrompt: 'Still your answer? What tells you whether “I need time” is prudence or procrastination?'
  },
  37: {
    prompt: 'What is the fairer way to decide who is ready for major adult choices?',
    choices: ['Use clear age-based rules', 'Judge maturity case by case'],
    twist: [
      'A fixed age treats very different people the same but gives everyone a predictable boundary. Case-by-case judgment can recognize real maturity differences but gives enormous power to whoever gets to decide what “mature enough” means.',
      'One rule is crude but consistent. The other is flexible but vulnerable to bias.'
    ],
    afterPrompt: 'Still your answer? Where should society prefer a bright line, and where is individual maturity too important to ignore?'
  },
  38: {
    prompt: 'You can act on a major decision now with incomplete information or delay it five years. Which is safer?',
    choices: ['Act now', 'Wait for more certainty'],
    twist: [
      'Acting now would lock you into one mistake you cannot fully reverse. Waiting would close a different opportunity that exists only this year.',
      'Action risks choosing badly before you know enough. Delay is also a choice, and time can remove options while you are gathering certainty.'
    ],
    afterPrompt: 'Still your answer? How much uncertainty should you accept before waiting becomes its own irreversible decision?'
  },
  39: {
    prompt: 'When you see an unusually polished family online, what is the healthier use of it?',
    choices: ['Use it as inspiration', 'Refuse the comparison'],
    twist: [
      'One idea from the clip genuinely improves your home routine. The overall image is still heavily staged and leaves you feeling like ordinary family chaos means you are failing.',
      'Comparison can teach you something useful. It can also turn a selected highlight into an impossible baseline.'
    ],
    afterPrompt: 'Still your answer? How do you learn from exceptional examples without treating them as a normal standard?'
  },
  40: {
    prompt: 'After repeated bad experiences with a type of person, what is the fairer response?',
    choices: ['Update your expectations cautiously', 'Keep judging each person individually'],
    twist: [
      'Some patterns really do change probabilities and are foolish to ignore. The feed also overselects extreme examples, making a small pattern look universal.',
      'Ignoring every pattern can make you naive. Turning a pattern into a verdict on each individual creates prejudice from averages.'
    ],
    afterPrompt: 'Still your answer? How should group-level patterns affect caution without becoming individual guilt?'
  },
  41: {
    prompt: 'Comparing your partner to other couples can reveal unmet needs or poison satisfaction. Which risk worries you more?',
    choices: ['Comparison can clarify standards', 'Judge the relationship mostly on its own'],
    twist: [
      'Your partner really is neglecting one important need that the comparison helped you notice. But the “better partner” in your head is assembled from the best trait of five different people who each have flaws you never see.',
      'Comparison can expose a real problem and create an imaginary competitor at the same time.'
    ],
    afterPrompt: 'Still your answer? What is a fair standard for a real person when your comparison pool is made of everyone else’s best moments?'
  },
  42: {
    prompt: 'One member of a huge group is caught cheating. How much should group membership affect suspicion?',
    choices: ['Group context can justify extra scrutiny', 'Judge only the individual evidence'],
    twist: [
      'Investigators later find a small organized cheating ring involving six more members. The other 7,993 supporters had nothing to do with it.',
      'Ignoring group links would have missed a real coordinated problem. Treating the whole group as suspicious would have blamed thousands of innocent people.'
    ],
    afterPrompt: 'Still your answer? When does association become useful evidence, and when does it become collective guilt?'
  },
  43: {
    prompt: 'A wall of connections looks suspicious. What is the better first move?',
    choices: ['Investigate the pattern', 'Demand a direct causal link first'],
    twist: [
      'One of the connections leads to a real undisclosed financial relationship. Most of the other yarn connects coincidences, irrelevant friendships, and the sandwich, which remains innocent.',
      'Patterns can reveal where to investigate. Patterns can also make unrelated facts feel coordinated simply because they look impressive on a wall.'
    ],
    afterPrompt: 'Still your answer? What turns an interesting association into evidence of actual coordination?'
  },
  44: {
    prompt: 'A short video appears to show one person clearly in the wrong. What should you do first?',
    choices: ['Judge the visible act', 'Wait for more context'],
    twist: [
      'A second camera shows important provocation before the clip began. It changes how blame should be divided, but the first video still captured a real act that needs explaining.',
      'Context can transform a story without making everything in the first clip imaginary. Waiting protects against premature judgment but can also become an excuse to never judge clear conduct.'
    ],
    afterPrompt: 'Still your answer? How much context is enough before “wait for context” becomes another way to avoid a conclusion?'
  },
  45: {
    prompt: 'An alarming claim is unverified but could matter immediately. What is the better rule?',
    choices: ['Share it clearly labelled unverified', 'Wait until it is verified'],
    twist: [
      'This claim turns out to be false. Separately, serious abuses in the same situation are later verified with strong evidence.',
      'Sharing early can warn people when time matters and can poison credibility with falsehood. Waiting protects accuracy and can also leave real danger invisible during the period when action matters most.'
    ],
    afterPrompt: 'Still your answer? What should change the threshold between “people need to know now” and “we do not know enough yet”?'
  },
  46: {
    prompt: 'A politician’s decisions help donors and sometimes help residents too. What should voters judge more heavily?',
    choices: ['Judge the outcomes', 'Judge the incentives and access behind them'],
    twist: [
      'One donor-backed policy produces a real public benefit. Another popular policy with almost no donor pressure fails badly. The mayor still spends dramatically more time with people who can fund his future.',
      'Good incentives do not guarantee good outcomes. Good outcomes do not prove the decision process was healthy or independent.'
    ],
    afterPrompt: 'Still your answer? How should motives, incentives, process, and results be weighed when they point in different directions?'
  },
  47: {
    prompt: 'What creates better accountability for elected representatives?',
    choices: ['Stable terms with judgment at election time', 'Stronger ways to remove or restrain them mid-term'],
    twist: [
      'Easy mid-term removal lets wealthy groups fund constant campaigns to punish unpopular but necessary decisions. Weak mid-term control lets representatives ignore voters for years with little immediate consequence.',
      'Stability can protect independent judgment and protect betrayal. Constant accountability can empower citizens and permanent campaigning.'
    ],
    afterPrompt: 'Still your answer? How do you create real accountability without making every difficult decision a new election?'
  },
  48: {
    prompt: 'A platform gives endless customization but no control over its core rules. Is that meaningful freedom?',
    choices: ['Yes, user-level choices still matter', 'No, real control means influence over the core rules'],
    twist: [
      'The customization genuinely improves accessibility, identity, and daily usefulness for millions of people. The tracking, recommendation system, and contract remain non-negotiable.',
      'Small choices can matter greatly to ordinary life. They can also distract from the fact that the most consequential choices belong to someone else.'
    ],
    afterPrompt: 'Still your answer? How much choice is enough before “freedom” becomes more than decoration?'
  },
  49: {
    prompt: 'When technology can automate ordinary skills, what is the better default?',
    choices: ['Automate and use the saved time', 'Preserve the human skill anyway'],
    twist: [
      'Automation cuts errors, saves thousands of hours, and makes difficult tasks accessible to more people. A week-long outage then reveals that almost nobody remembers how the basic system works without it.',
      'Preserving every old skill wastes time and blocks useful progress. Outsourcing every skill creates efficiency that can become fragility.'
    ],
    afterPrompt: 'Still your answer? Which abilities are worth keeping even when a machine normally does them better?'
  },
  50: {
    prompt: 'An engagement-heavy product is legal, useful, and intentionally hard to put down. Who should carry more of the burden for preventing overuse?',
    choices: ['Let adult users manage themselves', 'Build stronger limits into the product'],
    twist: [
      'Strong limits reduce harmful overuse but also frustrate power users, small businesses, creators, and people who genuinely want long sessions. Without limits, the same design techniques predictably keep vulnerable users engaged far longer than they intended.',
      'Guardrails can become paternalistic. Pure choice can let the designer profit from weaknesses the designer deliberately studied.'
    ],
    afterPrompt: 'Still your answer? When does respecting choice require leaving people alone, and when does responsible design require adding friction?'
  }
};

PLOT_TWIST_CARDS.forEach(card => {
  const override = BALANCED_CARD_OVERRIDES[card.id];
  if (override) Object.assign(card, override);
});
