'use strict';

PLOT_TWIST_CARDS.push(
  {
    id: 1,
    title: 'HAPPINESS: PREMIUM EDITION',
    vibe: 'absurd',
    scenario: [
      'A clinic offers MoodOS: 25% less anxiety, faster recovery from rejection, calmer arguments, better sleep, and no known physical side effects. Monday is still Monday, but it can no longer legally enter your chest.',
      'You still laugh, cry, love, and care. The only catch is that unpleasant emotions arrive with the volume turned down. The brochure calls this “finally muting the group chat inside your skull.”'
    ],
    prompt: 'Do you patch the misery bugs, or keep your emotional dashboard painfully factory-standard?',
    choices: ['INSTALL IT — smoother emotions', 'KEEP IT STOCK — full-strength signals'],
    twist: [
      'Five years later, users sleep better and fight less. They also stay longer in some bad jobs and broken relationships because dissatisfaction no longer screams. Non-users suffer more false alarms, but some act faster when the warning light is real.'
    ],
    conclusion: 'Pleasure and fulfilment are not the same thing. Good feelings matter, but discomfort can also carry information. A better life is not simply the life with the fewest unpleasant sensations.',
    afterPrompt: 'Which uncomfortable feelings in your life are noise, and which might be useful warning lights?',
    hostPrompts: ['What would you happily turn down forever?', 'What discomfort would you be nervous to lose completely?']
  },
  {
    id: 2,
    title: 'THE ENVELOPE THAT RUINS BRUNCH',
    vibe: 'truth',
    scenario: [
      'A red envelope contains one completely accurate correction to a major belief or life plan you currently have wrong. Opening it could change nothing, or it could force a truly inconvenient conversation before the weekend.',
      'Nothing terrible happens if you leave it sealed tonight. Your pancakes have formally requested a 24-hour extension.'
    ],
    prompt: 'Do you open the truth grenade now, or leave one peaceful Tuesday intact?',
    choices: ['OPEN IT — deal with the fallout', 'LEAVE IT SEALED — functioning life first'],
    twist: [
      'As you put it away, you notice one line printed on the back: “This mistake directly affects an irreversible decision you are making Friday.” The pancakes immediately withdraw their legal advice.'
    ],
    conclusion: 'Truth does not become less true because accepting it is expensive. Comfort can affect timing and preparation, but it cannot be allowed to veto evidence when a decision depends on what is actually true.',
    afterPrompt: 'When is “I am not ready to know” a reasonable delay, and when is it avoidance wearing a cardigan?',
    hostPrompts: ['What kind of truth would be hardest because of what it would require next?', 'How much should emotional readiness matter when a decision cannot be undone?']
  },
  {
    id: 3,
    title: 'THERMOSTAT SUPREME COURT',
    vibe: 'funny',
    scenario: [
      'Two roommates are fighting over the apartment. One is in three hoodies saying, “Antarctica has better zoning.” The other is shirtless beside a fan claiming his organs are now sous-vide.',
      'The smart thermostat says 21°C and carries the smug confidence of a machine that has never paid rent.'
    ],
    prompt: 'Who gets custody of the thermostat: the number, or the humans currently living inside it?',
    choices: ['TRUST THE SENSOR — numbers beat drama', 'TRUST THE ROOMMATES — bodies live here'],
    twist: [
      'A second thermometer reveals the thermostat sensor sits beside a warm router and reads 2°C high. Unfortunately Hoodie Roommate also just came in from the snow, while Shirtless Roommate finished a workout. Everyone brought evidence. Nobody brought enough evidence.'
    ],
    conclusion: 'Feelings are real evidence about experience, while measurements answer different questions. The right move is not to worship either one; it is to use evidence suited to the claim and check whether the evidence itself is reliable.',
    afterPrompt: 'Where do people confuse “this feels true,” “this measures true,” and “therefore my explanation is true”?',
    hostPrompts: ['When should lived experience outweigh a measurement?', 'What makes a measurement trustworthy rather than merely numerical?']
  },
  {
    id: 4,
    title: 'FOUR GPS APPS, ONE BRIDGE',
    vibe: 'absurd',
    scenario: [
      'You are driving to a cabin in heavy rain. Live GPS says the bridge route is 35 minutes faster and shows traffic moving. Gary, who has driven these roads every week since flip phones, says, “Never take that bridge after rain.”',
      'GPS has satellites. Gary has scar tissue from every pothole in the county. You have one steering wheel and a passenger who is already blaming you.'
    ],
    prompt: 'Who gets the steering wheel: Silicon Valley or Gary Valley?',
    choices: ['FOLLOW GPS — current data wins', 'FOLLOW GARY — local experience wins'],
    twist: [
      'At the junction, a brand-new road sign says the bridge reopened after flood upgrades this morning, while Gary’s alternate road is closed by a fresh rockslide that GPS has not received yet. Gary was right about the old risk. GPS was right about the bridge. Neither knew the whole present situation.'
    ],
    conclusion: 'Sincerity, experience, and technology can all provide useful evidence without becoming automatic truth. When claims conflict, update toward the evidence that best matches the present reality.',
    afterPrompt: 'What should break a tie when two credible sources disagree?',
    hostPrompts: ['Which source had the better reason before the new sign appeared?', 'How quickly should confidence change when better evidence arrives?']
  },
  {
    id: 5,
    title: 'THE VIBES LABORATORY',
    vibe: 'funny',
    scenario: [
      'Coach A runs an intense self-discovery retreat. Hundreds of clients say it changed their lives, repaired relationships, and gave them the strongest sense of certainty they have ever felt. Coach B runs a painfully boring method involving controls, repeatable tests, and absolutely no candles.',
      'Coach A has transformed people. Coach B has spreadsheets. Both would like custody of the word “truth.”'
    ],
    prompt: 'Whose clipboard gets to make claims about reality outside the retreat?',
    choices: ['THE TRANSFORMATION — repeated lived experience', 'THE TEST — independently checkable results'],
    twist: [
      'A second retreat using the same emotional method produces equally powerful transformations but reaches the opposite external conclusion. Meanwhile the boring test correctly predicts a concrete outcome neither retreat expected. Everyone still feels deeply changed. Reality remains annoyingly single-player.'
    ],
    conclusion: 'A powerful experience can be personally meaningful without proving every explanation attached to it. When sincere experiences conflict, you need a method capable of distinguishing interpretation from what can be checked outside the experience.',
    afterPrompt: 'What can a personal experience establish strongly, and what still needs evidence beyond the person who felt it?',
    hostPrompts: ['Would the same experience persuade you if it supported the opposite conclusion?', 'What kind of test could genuinely prove your explanation wrong?']
  },
  {
    id: 6,
    title: 'THE MYSTERY BOX CONSULTANT',
    vibe: 'mystery',
    scenario: [
      'Engineers find a sealed black box controlling backup power in a hospital wing. Nobody fully understands it, but one model gives a 70% chance that flipping Switch B will stabilize the system.',
      'You have thirty minutes before the wing loses power. “Let us simply remain epistemically humble” has received poor feedback from the ICU.'
    ],
    prompt: 'Do you act on the best unproven model, or refuse to gamble with a hospital?',
    choices: ['ACT — best hypothesis, clearly provisional', 'WAIT — no guessing with ICU power'],
    twist: [
      'Switch B does stabilize the system, but the model’s explanation of why was wrong. Waiting for certainty would have lost the wing. Acting worked because the team treated the model as a justified risk, not as proven truth.'
    ],
    conclusion: '“We do not know for certain” does not mean “we know nothing” or “do nothing.” Good reasoning separates confidence from certainty: act on the best justified evidence when necessary, while keeping the explanation open to correction.',
    afterPrompt: 'Where do people confuse admitting uncertainty with having no rational basis to act?',
    hostPrompts: ['How much confidence should be enough when delay also carries risk?', 'What language would let you act without pretending the hypothesis is proven?']
  },
  {
    id: 7,
    title: 'THE ELEVATOR MATH SUPPORT GROUP',
    vibe: 'absurd',
    scenario: [
      'A nervous student solves a difficult maths problem with excellent reasoning but makes one arithmetic mistake at the end. A teacher worries that a giant red WRONG will make the student shut down again.',
      'Another teacher says, “If the answer is wrong, pretending otherwise is emotional accounting fraud.” Kevin has drawn a dragon in the margin and would like partial credit for atmosphere.'
    ],
    prompt: 'What matters more in the moment: protecting confidence or making the error unmistakable?',
    choices: ['COACH GENTLY — confidence keeps learning alive', 'MARK IT CLEARLY — wrong must still mean wrong'],
    twist: [
      'Months later the same arithmetic error appears in a medication calculation. The student says nobody ever made clear that the mistake mattered. But an earlier brutally blunt teacher had also trained the student to hide questions instead of asking for help.'
    ],
    conclusion: 'Compassion and correction are not opposites. A person can be treated with dignity while an error is named clearly. Protecting someone from humiliation is good; protecting an error from correction is not.',
    afterPrompt: 'How do you make “you are wrong here” feel safe enough that a person can actually learn from it?',
    hostPrompts: ['When does gentleness become vagueness?', 'When does blunt correction become more about the corrector than the learner?']
  },
  {
    id: 8,
    title: 'THE BLUE-CHECK MECHANIC',
    vibe: 'internet',
    scenario: [
      'Your car makes a horrible grinding noise. A famous former race mechanic with eight million followers hears a recording and says, “Classic transmission failure.” Your local mechanic inspects the car and says, “I think it is a forty-dollar belt.”',
      'The famous guy has elite credentials. The local guy has your actual car on a lift and a coffee stain shaped like Australia.'
    ],
    prompt: 'Whose diagnosis gets your wallet first?',
    choices: ['THE SPECIALIST — elite pattern recognition', 'THE INSPECTION — the actual car beats the clip'],
    twist: [
      'The famous mechanic correctly recognized a sound that often comes from transmissions, but the local inspection finds a damaged belt creating a nearly identical noise. The transmission is fine. The internet diagnoses three more components in the comments for emotional support.'
    ],
    conclusion: 'Credentials and experience matter, but relevant evidence matters too. The strongest authority is the one whose expertise actually connects to the question and whose conclusion fits the available evidence.',
    afterPrompt: 'When should general expertise lose to direct inspection?',
    hostPrompts: ['What would make the remote specialist’s view stronger?', 'What would make you suspicious that the local expert is overconfident?']
  },
  {
    id: 9,
    title: 'IKEA: DIRECTOR’S CUT',
    vibe: 'funny',
    scenario: [
      'You are assembling a complicated machine. The official manual says Step 42 one way. Your friend has built twelve of these and says the printed step is notorious: “Everyone who follows that line ends up swearing in Swedish.”',
      'The manual has diagrams. Your friend has forearms, experience, and a small collection of leftover screws he refuses to discuss.'
    ],
    prompt: 'Who wins Step 42: the manual or the veteran with mysterious spare parts?',
    choices: ['FOLLOW THE MANUAL — source before improvisation', 'FOLLOW THE BUILDER — experience found the real-world fix'],
    twist: [
      'An official erratum confirms your friend is right about Step 42. Unfortunately, he also skips the safety latch because “I never bother with that bit.” The manufacturer’s updated instructions say the latch prevents the machine from becoming a briefly airborne lawsuit.'
    ],
    conclusion: 'Interpretation is not permission to ignore a source, and a source is not understood well by pretending context never matters. The strongest reading fits the text, updates, structure, and intended function rather than whichever line is most convenient.',
    afterPrompt: 'What should make you depart from a literal instruction without turning “experience” into a blank cheque?',
    hostPrompts: ['When can later context legitimately change how a line is applied?', 'What makes an interpretation better than “this is how I prefer to read it”?']
  },
  {
    id: 10,
    title: 'DELETE ALL HISTORY',
    vibe: 'absurd',
    scenario: [
      'A 40-year-old incident has one surviving eyewitness who remembers a blue car. Three newspaper archives say the car was red. You did not personally witness any of it because you were busy not existing yet.',
      'The witness is sincere. The archives agree. Your group chat has already split into Team Grandma and Team PDF.'
    ],
    prompt: 'Who gets the first draft of history?',
    choices: ['THE WITNESS — memory from the scene', 'THE RECORDS — multiple documented sources'],
    twist: [
      'An old photograph shows the car was blue: the newspapers all copied the same mistaken police report. The eyewitness was right about the colour but wrong about the time by nearly an hour. Independence has entered the chat.'
    ],
    conclusion: 'We can know the past without personally witnessing it, but neither memory nor documents are magical. Reliable history comes from provenance, independence, preservation, corroboration, and cross-checking different kinds of evidence.',
    afterPrompt: 'What makes several sources genuinely stronger rather than several copies of the same mistake?',
    hostPrompts: ['When is eyewitness memory especially valuable?', 'What would make a written record less independent than it appears?']
  },
  {
    id: 11,
    title: 'THE QUANTUM PARKING DEFENCE',
    vibe: 'funny',
    scenario: [
      'A self-driving car rolls into a decorative fountain. The software engineer calls it “a navigation-model failure.” The insurer calls it “a vehicle collision.” Both descriptions are true and both parties would very much like the other description to pay the bill.',
      'The fountain describes it as “Tuesday.”'
    ],
    prompt: 'Which description should lead the investigation: the code failure or the car crash?',
    choices: ['START WITH SOFTWARE — find the underlying mechanism', 'START WITH THE CRASH — deal with the real-world event'],
    twist: [
      'Logs reveal a software bug caused the wrong turn, but the impact became serious because a physical safety barrier had been removed. Fixing only the code leaves the site unsafe; fixing only the barrier leaves the bug in every car.'
    ],
    conclusion: 'A deeper description does not erase a higher-level one. Different levels of explanation can both be true while answering different questions. Use the level—or combination of levels—that actually explains the problem you are trying to solve.',
    afterPrompt: 'Where do people use a technically deeper description to pretend the everyday-level problem disappeared?',
    hostPrompts: ['Which question belongs to the engineer and which belongs to the insurer?', 'Can explaining mechanism settle purpose, responsibility, or meaning by itself?']
  },
  {
    id: 12,
    title: 'GRANDMA VS THE PODCAST',
    vibe: 'family',
    scenario: [
      'You inherit a family rule nobody can explain before tonight: Grandma says, “Keep it. People learned things the hard way.” A podcaster with a ring light says, “Delete it. Old rules are just peer pressure from dead people.”',
      'You cannot research it until tomorrow. Grandma has snacks. The podcaster has a microphone. Both have dangerous levels of confidence.'
    ],
    prompt: 'What is your default until you can investigate: preserve the old rule or suspend it?',
    choices: ['PRESERVE IT — survival may contain wisdom', 'SUSPEND IT — tradition has to earn authority'],
    twist: [
      'When you finally investigate, one family rule prevents a problem previous generations repeatedly suffered. Another exists because a great-grandfather misunderstood a neighbour in 1934 and nobody wanted to admit the casserole feud had no basis.'
    ],
    conclusion: 'Inherited does not mean false, and familiar does not mean true. Tradition deserves serious examination rather than automatic obedience or automatic contempt.',
    afterPrompt: 'Which inherited belief in your life has never had to explain itself because it arrived before your questions did?',
    hostPrompts: ['When is preserving a rule during uncertainty sensible?', 'What evidence should make an old rule lose your loyalty?']
  },
  {
    id: 13,
    title: 'THE HOTEL HALLWAY INCIDENT',
    vibe: 'awkward',
    scenario: [
      'A resort needs one dress-code rule. Option A regulates by physical coverage: if two outfits reveal roughly the same amount, they are treated the same. Option B regulates by setting: swimwear is normal by the pool, business clothes at the conference, pajamas at breakfast only if your dignity has already left.',
      'Both rules sound reasonable until actual humans arrive with fashion designers and loopholes.'
    ],
    prompt: 'Do you regulate the amount of skin, or let context decide what counts as appropriate?',
    choices: ['SAME COVERAGE, SAME RULE — measurable and consistent', 'CONTEXT MATTERS — places carry different expectations'],
    twist: [
      'The coverage rule bans ordinary swimwear at the pool. The context rule allows two nearly identical outfits to be treated differently because one was sold as “resort wear.” The resort has accidentally discovered that social meaning is real and also occasionally ridiculous.'
    ],
    conclusion: 'Context can legitimately change social meaning, but “this feels normal here” is not a complete moral argument. Customs need reasons; consistency needs attention to the differences that actually matter.',
    afterPrompt: 'When is context a real difference, and when is it merely a habit everyone forgot to question?',
    hostPrompts: ['What should a fair dress rule actually be trying to protect?', 'Which part of the rule would still make sense in a different culture?']
  },
  {
    id: 14,
    title: 'THE LEGALLY TERRIBLE DEAL',
    vibe: 'money',
    scenario: [
      'On your 18th birthday, a company offers $50,000 today for 20% of every dollar you earn for life. A lawyer explains every clause in plain language. No hidden fee, no intoxication, no pressure, and you pass a comprehension test before signing.',
      'It is the cleanest possible version of a deal that makes 35-year-old you want to time-travel with a folding chair.'
    ],
    prompt: 'Do you enforce the signature forever, or give young adults a cooling-off escape from deals like this?',
    choices: ['ENFORCE IT — adults have to own signatures', 'ALLOW EXIT — some commitments deserve a safety valve'],
    twist: [
      'Internal documents show the company offers the deal almost exclusively to 18-to-20-year-olds because older adults nearly always reject it once they understand lifetime earnings. The contract was informed and voluntary. The business model was also built around predictable inexperience.'
    ],
    conclusion: 'Consent matters, but consent alone does not settle wisdom, fairness, exploitation, or predictable harm. Freedom requires responsibility from the chooser and moral limits on people who deliberately profit from weakness.',
    afterPrompt: 'What should full consent protect, and what problems can remain even after everyone knowingly says yes?',
    hostPrompts: ['When does protecting adults become paternalism?', 'When does targeting predictable weakness become exploitation even without deception?']
  },
  {
    id: 15,
    title: 'SAINT ACCORDING TO THE PARKING BYLAW',
    vibe: 'moral',
    scenario: [
      'Your neighbour runs a legal public-camera page. It has caught package thieves, reunited lost dogs, and once identified the man who keeps reversing into everyone’s bins like it is a hobby.',
      'It also posts embarrassing but legal clips of innocent people tripping, arguing, or having terrible parallel-parking days. Everything was filmed from public space. The law is completely relaxed.'
    ],
    prompt: 'Keep the public feed, or send useful footage privately and kill the spectacle?',
    choices: ['KEEP THE FEED — public accountability works', 'PRIVATE REPORTS ONLY — usefulness without the humiliation show'],
    twist: [
      'A viral clip from the page helps identify a repeat thief and gets several stolen packages returned. The same week, an innocent teenager becomes a meme after a panic attack outside his house. Both outcomes came from the exact same legal upload policy.'
    ],
    conclusion: 'Legality can create a floor for behaviour without becoming the ceiling of goodness. A legal action can still need to be judged by dignity, harm, purpose, fairness, and responsibility.',
    afterPrompt: 'What legal behaviour would you still refuse to do because “allowed” is not the same as “good”?',
    hostPrompts: ['How much public benefit would justify public embarrassment?', 'What standard should judge the rule if the law itself permits both outcomes?']
  },
  {
    id: 16,
    title: 'THE STUDY THAT LOVES YOU BACK',
    vibe: 'internet',
    scenario: [
      'A new preprint strongly supports a policy you already favour. The result is from a reputable team, the data are public, and a vote happens tonight. Waiting for peer review means the debate will move without the study.',
      'Sharing it now means trusting research that has not finished being kicked by other researchers, which is apparently how science shows affection.'
    ],
    prompt: 'Do you use the fresh study tonight, or keep it holstered until the review process has had a turn?',
    choices: ['USE IT NOW — label the uncertainty', 'WAIT — unfinished evidence should not drive the vote'],
    twist: [
      'Peer review later confirms the direction of the result but cuts the estimated effect roughly in half and uncovers one caveat that changes who the policy helps. The headline was not fake; it was just wearing shoulder pads.'
    ],
    conclusion: 'Evidence should be examined most carefully when it flatters what you already believe. Early evidence can matter, but confidence, wording, and decisions should match what the evidence actually establishes.',
    afterPrompt: 'How should you talk about evidence that is useful now but still capable of changing?',
    hostPrompts: ['Would you use the same preprint standard if the result hurt your side?', 'Which part of the claim survived and which part was overconfident?']
  },
  {
    id: 17,
    title: 'YOUR BELIEF HAS BOSS ARMOUR',
    vibe: 'game',
    scenario: [
      'You have held a well-supported belief for ten years. A new study finds one result that does not fit. The study is small but serious. Your friend says one anomaly should not bulldoze a decade of evidence; another says protecting the core belief is exactly how people become impossible to correct.',
      'Your belief is standing in the boss arena wondering how many health bars it is legally entitled to.'
    ],
    prompt: 'Does the anomaly trigger an immediate rematch, or does the old belief keep the belt until replication?',
    choices: ['DEFEND THE CORE — one weird result is not a coup', 'REOPEN THE CASE — real counterevidence earns attention now'],
    twist: [
      'The result replicates. It genuinely disproves one broad part of the belief, but the narrower core survives the rest of the evidence. The correct update is neither “nothing happened” nor “burn the whole building.”'
    ],
    conclusion: 'A strong belief needs a real loss condition. Being open to correction does not mean abandoning a well-supported view at the first anomaly; it means letting genuine counterevidence narrow, revise, or defeat what the evidence no longer supports.',
    afterPrompt: 'What would make you revise a belief without overreacting to every new claim?',
    hostPrompts: ['What part of a belief should survive when only one component fails?', 'Do you set a higher bar for evidence against your view than for evidence supporting it?']
  },
  {
    id: 18,
    title: 'ONE CLOWN, WHOLE TEAM',
    vibe: 'group',
    scenario: [
      'A huge trivia tournament has a cheating problem. Seven of the last ten cheaters came from Team Orange. Organizers can either add extra checks for Orange this round or keep identical screening for all 8,000 players.',
      'Orange fans say targeted checks are collective punishment. Everyone else says statistics have entered the building and would like a clipboard.'
    ],
    prompt: 'Do you target the pattern, or keep the same checks for everyone?',
    choices: ['TARGET EXTRA CHECKS — follow the pattern', 'SAME CHECKS — guilt stays individual'],
    twist: [
      'Targeted checks catch one more Orange cheater. They also hassle hundreds of innocent Orange players, while a cheater from another team sails through lighter screening. The pattern was real. So were the individuals who did not fit it.'
    ],
    conclusion: 'Group patterns can be relevant to investigation or risk without becoming proof of individual guilt. Use group information carefully, then keep accusation and punishment attached to evidence about the person actually being judged.',
    afterPrompt: 'When may a pattern justify extra attention without justifying suspicion as a verdict?',
    hostPrompts: ['What safeguards would make targeted screening less unfair?', 'What individual evidence should always be required before punishment?']
  },
  {
    id: 19,
    title: 'THE RED-YARN DETECTIVE',
    vibe: 'absurd',
    scenario: [
      'Seven executives share donors, schools, board members, and one suspiciously expensive golf weekend. There is enough overlap to make the red yarn feel emotionally employed, but no direct proof of coordination yet.',
      'You can open a serious investigation based on the network pattern, or refuse to spend resources until somebody finds the smoking email. A sandwich photo has been removed from the evidence wall pending appeal.'
    ],
    prompt: 'Does the pattern earn an investigation, or is that how corkboards start ruining Thanksgiving?',
    choices: ['INVESTIGATE — patterns can be real leads', 'WAIT FOR DIRECT PROOF — association is cheap'],
    twist: [
      'Subpoenaed emails show two executives coordinated one specific decision. The investigation was justified. The evidence still does not support claims that all seven executives, every donor, their university, and Kevin Bacon were part of one master plan.'
    ],
    conclusion: 'Association can justify looking; it cannot substitute for proof of coordination, motive, or control. Follow the lead, then make the smallest claim the evidence actually supports.',
    afterPrompt: 'How do you investigate a pattern seriously without upgrading “connected” into “controlled”?',
    hostPrompts: ['What evidence would justify widening the claim beyond the two executives?', 'When does refusing to investigate become as unreasonable as overclaiming?']
  },
  {
    id: 20,
    title: 'CAMERA TWO HAS ENTERED THE CHAT',
    vibe: 'internet',
    scenario: [
      'A 12-second clip shows a teacher screaming at a student in a hallway. Parents want the teacher suspended immediately. The principal can remove the teacher pending review, or keep them teaching until the full context is known.',
      'The clip is ugly. The context is missing. The school group chat has achieved temperatures normally associated with re-entry.'
    ],
    prompt: 'Do you bench the teacher now, or refuse to punish from twelve seconds of cinema?',
    choices: ['SUSPEND PENDING REVIEW — protect students first', 'WAIT FOR CONTEXT — punishment needs the whole event'],
    twist: [
      'Camera Two shows the student had just shoved another child down the stairs and the teacher was shouting for everyone to move back. The teacher still used insulting language that violated policy. The simple hero/villain edit has been cancelled after one season.'
    ],
    conclusion: 'Context does not automatically excuse bad behaviour, but incomplete evidence cannot support a complete story. Risk can justify temporary safeguards; judgement should still stay proportional to what the evidence actually shows.',
    afterPrompt: 'What can you responsibly do before the full story is known without pretending the temporary decision is a verdict?',
    hostPrompts: ['Which part of the teacher’s behaviour changed meaning after Camera Two?', 'What action would be fair if the missing context had never appeared?']
  },
  {
    id: 21,
    title: 'SOURCE: TRUST ME BRO',
    vibe: 'internet',
    scenario: [
      'An anonymous local account posts that tap water may be contaminated. The source is unnamed, officials have not confirmed it, and the post includes enough siren emojis to qualify as municipal infrastructure.',
      'If it is true, warning people quickly matters. If it is false, panic-buying bottled water will turn Costco into the Thunderdome.'
    ],
    prompt: 'Do you warn people now with a giant UNCONFIRMED label, or wait for verification?',
    choices: ['WARN NOW — uncertainty beats preventable harm', 'WAIT — serious claims need confirmation'],
    twist: [
      'The warning is false and causes a run on water. A month later a real contamination alert appears, but many residents dismiss it because they remember the last viral scare. False urgency has managed to damage future urgency.'
    ],
    conclusion: 'Accuracy is part of moral seriousness. Urgency can justify communicating uncertainty quickly, but it raises rather than erases the duty to distinguish warning, evidence, and confirmed fact.',
    afterPrompt: 'How should you communicate a potentially dangerous claim when waiting and spreading can both cause harm?',
    hostPrompts: ['What minimum verification is possible before sharing?', 'How should wording change when the evidence is preliminary?']
  },
  {
    id: 22,
    title: 'THE BANK THAT MOVED TO A RIVER',
    vibe: 'wordplay',
    scenario: [
      'Your friend texts, “Meet me at the bank after lunch.” In this tiny town there is First National Bank on Main Street and a riverside picnic spot everyone calls The Bank.',
      'He is late, his phone is dead, and you have exactly enough time to choose one location before the other person begins a lifelong story about how you abandoned them.'
    ],
    prompt: 'Which bank are you betting your friendship on?',
    choices: ['FIRST NATIONAL — ordinary meaning wins', 'THE RIVER BANK — local context wins'],
    twist: [
      'You reread the previous message: “Bring the fishing rods.” One sentence of context has ended a philosophical crisis that was moments away from becoming a podcast.'
    ],
    conclusion: 'Words do not carry meaning in isolation. Definitions and context matter, and arguments fail when a key term quietly changes meaning halfway through the reasoning.',
    afterPrompt: 'Which words in serious arguments cause trouble because everyone thinks the definition is obvious?',
    hostPrompts: ['When should ordinary usage beat a technical definition?', 'What context would make the same word mean something else without contradiction?']
  },
  {
    id: 23,
    title: 'TWO DOCTORS, ONE KALE SMOOTHIE',
    vibe: 'absurd',
    scenario: [
      'Doctor A has fantastic patient reviews and a simple explanation for your headaches: dehydration. Doctor B is less charming, orders tests, and says there may be a rarer condition. Both tell you to sleep, exercise, drink water, and stop pretending coffee is a food group.',
      'The shared lifestyle advice works. Your headaches improve. Everybody would like to declare the diagnostic disagreement cancelled.'
    ],
    prompt: 'Do you stop at the advice that helped, or keep testing the diagnosis nobody wants to talk about?',
    choices: ['STOP THERE — improvement is meaningful evidence', 'KEEP TESTING — shared good advice does not settle the cause'],
    twist: [
      'The tests find the rare condition early. Hydration genuinely reduced the headaches, so Doctor A was useful. It still was not the full explanation. Kale is cleared of all charges.'
    ],
    conclusion: 'People can share useful advice and still disagree about deeper explanations. Practical overlap does not erase contradictory claims; the explanation still has to be tested on its own evidence.',
    afterPrompt: 'Where do shared good outcomes tempt us to stop asking whether the underlying explanation is actually true?',
    hostPrompts: ['Can an explanation be partly useful and still fundamentally incomplete?', 'What evidence would have justified stopping the investigation?']
  },
  {
    id: 24,
    title: 'ALL ROADS LEAD TO THE CABIN',
    vibe: 'road-trip',
    scenario: [
      'Three luxury buses offer the same comfy seats, good snacks, kind staff, seatbelts, and surprisingly decent coffee. Your friends say the packages are “basically the same” because the rules for a pleasant journey overlap so much.',
      'One bus ends at a mountain cabin, one at the coast, and one at an industrial conference centre beside an airport. The brochures have been aggressively focused on the snacks.'
    ],
    prompt: 'When comparing the trips, do you judge mainly by how they travel or where their claims say they end?',
    choices: ['THE RIDE — shared good practices matter most', 'THE DESTINATION — endpoints still have to match'],
    twist: [
      'All three buses deliver exactly the good ride they promised. They also arrive at three genuinely different places. Nobody was lying about the snacks; the snacks simply never settled the destination question.'
    ],
    conclusion: 'Different systems can share good practices, wisdom, and admirable behaviour while still making incompatible claims about reality and destination. Shared virtue does not make contradictory conclusions identical.',
    afterPrompt: 'What kind of agreement shows common ground without proving that the larger explanations are the same?',
    hostPrompts: ['Which shared values are genuinely important even when conclusions differ?', 'What would you need to compare before saying two paths really lead to the same place?']
  },
  {
    id: 25,
    title: 'THE ALIEN TOASTER MANUAL',
    vibe: 'sci-fi',
    scenario: [
      'You find a strange alien device. The manufacturer’s manual says it is an emergency beacon. Your friend discovers it also makes an incredible foot-warmer and argues that successful users can give objects new purposes the original designer never imagined.',
      'His feet are warm. The device is humming. Somewhere, a lawyer is already billing by the hour.'
    ],
    prompt: 'Who gets final say on what the device is “for”: the maker or the user who found a better use?',
    choices: ['MAKER — intended purpose sets the baseline', 'USER — useful function can redefine purpose'],
    twist: [
      'The manual’s buried safety section reveals that heater-mode slowly drains the emergency battery and disables the beacon when it is needed most. The foot-warmer genuinely works. It also quietly defeats the device’s central design.'
    ],
    conclusion: 'Users can discover creative secondary uses, but desire alone does not erase intended function or design limits. If something was made for a purpose, the maker is uniquely positioned to explain what that purpose is and what uses undermine it.',
    afterPrompt: 'When does repurposing something become clever adaptation, and when does it sabotage what the thing was designed to do?',
    hostPrompts: ['Can a user-created purpose coexist with the intended purpose?', 'What evidence would justify rejecting the maker’s stated purpose?']
  }
);
