'use strict';

PLOT_TWIST_CARDS.push(
  {
    id: 76,
    title: 'THE FREEDOM STARTER PACK',
    vibe: 'modern-life',
    scenario: [
      'Your friend automates everything: recommendations pick entertainment, subscriptions refill essentials, maps choose routes, apps suggest meals, and auto-pay handles bills. He saves hours each week and uses the extra time for family and hobbies.',
      'He also cannot remember the last time he chose a new song, restaurant, route, or purchase without something ranking the options first. His life is efficient enough to have a project manager.'
    ],
    prompt: 'Outsource the tiny decisions, or keep choosing them yourself so your preferences stay yours?',
    choices: ['AUTOMATE IT — save attention for bigger things', 'CHOOSE MORE — defaults quietly train taste'],
    twist: [
      'He turns recommendations off for a month. The first week is irritating. By the fourth, his music, purchases, and evening habits have shifted in ways he did not predict. Some old defaults were excellent. Others were simply the path of least resistance wearing a personalized name tag.'
    ],
    conclusion: 'Freedom is deeper than having many options or automating them. A person is more free when defaults, debt, appetite, social pressure, and systems do not quietly control the choices that shape character and direction.',
    afterPrompt: 'Which decisions are genuinely trivial enough to outsource, and which ones slowly shape who you become?',
    hostPrompts: ['What default in your life would be hardest to notice because it works well?', 'What preference might change if recommendations disappeared?']
  },
  {
    id: 77,
    title: 'THE 10,000-ITEM MENU',
    vibe: 'absurd',
    scenario: [
      'Restaurant A offers 10,000 meals, but a frighteningly good recommendation system can narrow the list to five dishes based on your tastes. Restaurant B offers eight dishes chosen by a chef who refuses to let customers select “fork personality.”',
      'One gives maximum option plus personalization. The other gives curation plus the dangerous possibility of being surprised by a vegetable.'
    ],
    prompt: 'Ten thousand options with an algorithm, or eight options chosen by somebody who thinks they know better than you?',
    choices: ['MAX CHOICE — let me keep the giant menu', 'CURATED MENU — save my brain for dinner conversation'],
    twist: [
      'The algorithm recommends your usual burger with 97% confidence and you love it. At the small restaurant, the chef talks you into something you would never have selected and you love that too. One system optimized known preference; the other created a new one.'
    ],
    conclusion: 'More choice does not automatically create more meaningful freedom. Good limits and curation can protect attention and even expose us to things our existing preferences would never select.',
    afterPrompt: 'When does personalization serve your freedom, and when does it trap you inside what you already like?',
    hostPrompts: ['Which choices deserve maximum variety?', 'When is trusting a curator better than controlling every variable yourself?']
  },
  {
    id: 78,
    title: 'AMERICA’S GOT AUTOTUNE',
    vibe: 'pop-culture',
    scenario: [
      'A talent-show contestant is a brilliant songwriter and magnetic performer but cannot reliably sing in tune. The production team can correct every note and create a fantastic track. Another contestant sings beautifully with zero processing but writes nothing memorable.',
      'The award is called BEST PERFORMANCE, which has become unhelpfully broad at exactly the wrong time.'
    ],
    prompt: 'Who deserves the trophy: the better finished performance or the stronger unaided skill?',
    choices: ['GIVE IT TO THE RESULT — the audience hears the whole production', 'GIVE IT TO THE SKILL — tools should not wear the medal'],
    twist: [
      'At a live charity event the processing fails. The songwriter sings badly but still moves the crowd with the song and stage presence. The technically gifted singer nails every note and leaves the room colder. Both had real ability; only one had been marketed as possessing a skill the software was supplying.'
    ],
    conclusion: 'Tools can support genuine talent without becoming proof of every skill they simulate. Assistance becomes deceptive when it replaces a capability while preserving the appearance that the person possesses it.',
    afterPrompt: 'Which parts of a finished result belong to the person, and which belong to the tool?',
    hostPrompts: ['Should audiences care how much assistance produced the result?', 'What should remain if the tool disappears?']
  },
  {
    id: 79,
    title: 'THE CONVENIENCE APOCALYPSE',
    vibe: 'technology',
    scenario: [
      'A town can automate nearly everything: navigation, payments, doors, driving, scheduling, cooking, translation, memory reminders, and customer service. Accidents drop, time is saved, and several people discover hobbies because they no longer spend Saturday arguing with printers.',
      'Keeping manual skills and backup systems costs money and training time for tools that may almost never be needed.'
    ],
    prompt: 'Go fully smart, or keep paying humans to remember how the dumb version works?',
    choices: ['FULL AUTOMATION — efficiency is the point of tools', 'KEEP MANUAL BACKUPS — resilience is a feature too'],
    twist: [
      'A week-long outage arrives. The automated town struggles badly. The backup-heavy neighbouring town functions better—but residents there have spent years maintaining systems and skills that were useless on 99.8% of normal days. Convenience and resilience finally meet in the parking lot and dislike each other immediately.'
    ],
    conclusion: 'Convenience is progress when it serves human capability rather than quietly deleting every fallback. Efficiency can be worth real trade-offs, but systems become fragile when nobody retains the ability to function outside them.',
    afterPrompt: 'Which backup skills are worth maintaining even if you almost never need them?',
    hostPrompts: ['How rare can a failure be before resilience stops being worth the cost?', 'Which technology makes you more capable rather than merely more dependent?']
  },
  {
    id: 80,
    title: 'FIRST CLASS, NO DESTINATION',
    vibe: 'mystery',
    scenario: [
      'You wake in a luxury first-class seat with two hours left in the flight. The crew says the plane is safe but refuses to say where it is landing or why you were booked. You can spend the final two hours demanding answers, or enjoy the food, bed, movies, and free Wi-Fi because there is apparently no eject button for existential curiosity.',
      'The dessert cart has already passed once and is behaving like it knows something.'
    ],
    prompt: 'Spend the flight investigating the destination, or enjoy the seat while you still have it?',
    choices: ['INVESTIGATE — destination changes how I should prepare', 'ENJOY IT — two hours of worry may change nothing'],
    twist: [
      'Twenty minutes before landing you learn the destination requires documents, clothing, and a decision you could have prepared earlier. The meal was still excellent. The missing information was still more important than the seat upholstery.'
    ],
    conclusion: 'Comfort and entertainment cannot answer questions of origin, destination, purpose, and accountability. Enjoyment has a place, but a pleasant journey is not a substitute for understanding where the journey is going and what it asks of you.',
    afterPrompt: 'Which major life questions stay postponed because daily life remains comfortable enough without answering them?',
    hostPrompts: ['When is enjoying the present a good answer to uncertainty?', 'What kind of destination information would change how you live the journey?']
  },
  {
    id: 81,
    title: 'THE ALIEN DEVICE RETURNS YOUR CALL',
    vibe: 'sci-fi',
    scenario: [
      'Researchers reverse-engineer an unfamiliar machine perfectly. They can predict every circuit, gear, heat cycle, and output. One team says that is enough to infer what the device is for. Another says function can reveal possibilities without proving intended purpose.',
      'The machine produces clean water, waste heat, a faint musical hum, and one blinking light nobody wants to press.'
    ],
    prompt: 'Can perfect knowledge of HOW the machine works tell you what it was FOR?',
    choices: ['INFER PURPOSE FROM FUNCTION — design reveals intent', 'KEEP PURPOSE OPEN — mechanism is not a memo from the maker'],
    twist: [
      'An archived manufacturer note appears. The clean water was a side effect; the machine was designed as an emergency coolant system. The researchers understood every mechanism and still guessed the intended purpose wrong.'
    ],
    conclusion: 'Explaining how something works does not automatically explain why it exists or what it was intended for. Mechanism and purpose are different kinds of questions, even when mechanism gives useful clues.',
    afterPrompt: 'When is function strong evidence of purpose, and when can the same function be only a side effect?',
    hostPrompts: ['Who is best positioned to settle intended purpose?', 'Can purpose be known if the maker’s intent is unavailable?']
  },
  {
    id: 82,
    title: 'THE SELF-WRITING APP',
    vibe: 'technology',
    scenario: [
      'A complex app appears on a developer’s laptop after a bizarre overnight system failure. Logs are corrupted. No human admits creating it. One engineer says a rare chain of automated scripts and random corruption could have assembled it. Another suspects an unknown generator or hidden process.',
      'The app has authentication, error handling, dark mode, and the audacity to have better settings than the developer’s real product.'
    ],
    prompt: 'Start by blaming freak accident or hidden process?',
    choices: ['ACCIDENT FIRST — weird systems can produce weird outcomes', 'LOOK FOR A GENERATOR — organized output raises the bar'],
    twist: [
      'Recovered logs show a forgotten experimental generator assembled the app using automated components during the failure. The power event mattered. It was a condition of the event, not the creative explanation for the organized result.'
    ],
    conclusion: 'Removing one familiar cause does not make “no cause” or “mere accident” the default. Rational inquiry looks for an explanation adequate to the kind of outcome that occurred.',
    afterPrompt: 'What features of an outcome should change how demanding your causal explanation becomes?',
    hostPrompts: ['When is chance genuinely an adequate explanation?', 'Does finding an automated cause end the question or move it back one level?']
  },
  {
    id: 83,
    title: 'THE TORNADO FURNITURE SALE',
    vibe: 'absurd',
    scenario: [
      'A tornado hits a warehouse full of furniture parts while an experimental robot system is also running randomized assembly attempts. Afterward, one perfectly assembled dining set sits in the middle of the wreckage with an Allen key placed neatly on top.',
      'The storm was chaotic. The robot was partly random. Your uncle says, “See? Randomness did it.” The robot would like a union representative.'
    ],
    prompt: 'Credit the random storm-and-robot mess, or assume some selection process was doing the heavy lifting?',
    choices: ['RANDOM PROCESS — enough attempts can produce order', 'ORDERING PROCESS — something had to preserve the useful arrangement'],
    twist: [
      'The robot logs show thousands of random attempts—but also a scoring system that kept successful joins and discarded failures. Random variation was real. Selection was the reason the useful structure accumulated instead of resetting to chaos each time.'
    ],
    conclusion: 'Random conditions can contribute to an outcome without explaining the organized result by themselves. When structure accumulates, ask what process preserves, selects, or coordinates the useful order.',
    afterPrompt: 'What is the difference between randomness generating possibilities and a process preserving successful structure?',
    hostPrompts: ['When can repeated random trials genuinely explain complex order?', 'What evidence would show that no selection process was involved?']
  },
  {
    id: 84,
    title: 'THE CAUSE BEHIND THE CAUSE BEHIND THE CAUSE',
    vibe: 'mystery',
    scenario: [
      'A chain of 1,000 dominoes enters the room through a hole in the wall. Every visible domino is knocked by the one before it. You can keep tracing the chain backward through more rooms, or ask whether eventually something other than a falling domino has to explain why any of them are falling.',
      'Your friend says 1,000 explanations should be plenty. Domino 1,000 says this feels like discrimination against large numbers.'
    ],
    prompt: 'Keep tracing dependent links forever, or look for something that starts rather than merely receives the motion?',
    choices: ['TRACE THE CHAIN — earlier links may be enough', 'FIND A STARTER — dependence does not become independence by repetition'],
    twist: [
      'A camera outside the building shows a cat knocked the first visible chain into motion. The cat explains this chain. It also raises the deeply important question of who left tuna beside the exhibit, but one causal mystery at a time.'
    ],
    conclusion: 'A long chain of dependent events does not become self-explanatory merely because it is long. Explaining each later link still leaves the dependence of the chain itself to be explained.',
    afterPrompt: 'When does an explanation genuinely terminate, rather than simply push the same dependence one step backward?',
    hostPrompts: ['Could an infinite chain be explanatory if every link depends on another?', 'What would count as an independent explanation rather than another link?']
  },
  {
    id: 85,
    title: 'MORALITY: NOW WITH LIVE POLLING',
    vibe: 'society',
    scenario: [
      'A town uses majority vote for everything. It works beautifully for park hours, parking rules, and whether the annual festival gets fireworks or one very determined accordion player.',
      'A new proposal asks the same 51% majority to decide whether an unpopular minority may use the public hall. The voting app sees no difference; it is just another Tuesday-shaped button.'
    ],
    prompt: 'Should the same majority rule settle both the park hours and the minority’s basic claim?',
    choices: ['ONE DEMOCRATIC RULE — majority decides public rules', 'LIMIT THE VOTE — some things should not depend on popularity'],
    twist: [
      'The majority excludes the unpopular group. A year later you join a cause that becomes unpopular and the exact same voting rule is used against you. Democracy has remained perfectly consistent while your feelings have undergone a constitutional revolution.'
    ],
    conclusion: 'Majority rule can be a useful way to make policy, but popularity cannot create moral truth. If a majority can be unjust, some standards must be capable of judging the majority itself.',
    afterPrompt: 'Which decisions are properly democratic preferences, and which claims should remain protected even when most people dislike them?',
    hostPrompts: ['What protects minorities without making every issue immune from voting?', 'What standard lets you call a majority decision unjust rather than merely unpopular?']
  },
  {
    id: 86,
    title: 'THE DISGUST-O-METER',
    vibe: 'moral',
    scenario: [
      'Scientists invent a meter that reads personal disgust from 0 to 100. It correctly warns one person away from spoiled food before lab tests confirm contamination. It also gives another person an 89 when they see a harmless unfamiliar dish from another culture.',
      'The machine is flawless at measuring “ew.” It has absolutely no department for “therefore you should.”'
    ],
    prompt: 'Treat strong disgust as a moral warning signal, or make it prove its case before it gets a vote?',
    choices: ['TRUST THE GUT — disgust often protects us for a reason', 'MAKE IT ARGUE — feelings can be useful and still wrong'],
    twist: [
      'A cruel person scores almost zero disgust while harming someone. A compassionate person scores 95 at a harmless food texture. The meter remains scientifically excellent and morally unemployed.'
    ],
    conclusion: 'Moral feelings can alert us to something worth examining, but feelings do not create objective obligation. If an action remains wrong when a person or society feels differently, the standard must be deeper than preference or disgust.',
    afterPrompt: 'When should a strong moral feeling trigger caution, and what still has to be established afterward?',
    hostPrompts: ['Would something become right if everyone stopped feeling disgust?', 'Which emotions are useful alarms but poor judges?']
  },
  {
    id: 87,
    title: 'THE LAW PASSED 100–0',
    vibe: 'society',
    scenario: [
      'After a series of injuries, a city council unanimously passes a strict emergency curfew for one month. It is lawful, popular, and the injury rate falls. People begin treating 100–0 as evidence the council has discovered a cheat code for justice.',
      'The next unanimous proposal bans an unpopular but peaceful group from meeting after dark “for public harmony.” Same process. Much weirder target.'
    ],
    prompt: 'Does a unanimous process deserve the same presumption in both cases?',
    choices: ['TRUST THE PROCESS — unanimity and results matter', 'CHECK THE LIMITS — procedure cannot bless every target'],
    twist: [
      'The first rule survives review because it addresses a temporary, measurable safety problem with a sunset date. The second fails because it burdens one group without evidence of harm. The vote count was identical. The justice was not.'
    ],
    conclusion: 'Procedure matters, but even perfect procedure can produce injustice. Law needs substantive moral limits, evidence, proportionality, and protections that are not erased by popularity.',
    afterPrompt: 'What facts can make the same legal procedure just in one case and unjust in another?',
    hostPrompts: ['What should no majority be allowed to remove?', 'How should emergency powers prove they are still necessary?']
  },
  {
    id: 88,
    title: 'THE ISLAND WITH TERRIBLE TRADITIONS',
    vibe: 'moral',
    scenario: [
      'You visit an island with an old rule that tourists pay double at certain public attractions. Locals defend it: visitors use services without paying local taxes, tourism strains infrastructure, and the extra money funds cleanup. Tourists call it discrimination with a gift shop.',
      'The rule is ancient, popular, and printed on mugs, which is apparently the final stage of cultural legitimacy.'
    ],
    prompt: 'Respect the local rule, or judge it by a standard that does not care how long it has been on a mug?',
    choices: ['RESPECT THE CUSTOM — local burdens can justify local rules', 'JUDGE THE RULE — tradition still needs a fair reason'],
    twist: [
      'You learn the surcharge originally funded real tourism costs, but over time it expanded to emergency services tourists already pay for separately. One part still has a defensible reason; another survives mainly because “we have always done it.”'
    ],
    conclusion: 'Historical normality and social acceptance explain why a rule exists; they do not prove it is right. Cultural differences can have legitimate reasons, but cultures—including our own—must remain open to moral examination.',
    afterPrompt: 'How do you distinguish a culturally different rule with a real justification from an old injustice with good branding?',
    hostPrompts: ['What evidence should outsiders understand before judging a custom?', 'When does local autonomy stop being a sufficient defence?']
  },
  {
    id: 89,
    title: 'THE PERFECTLY TOLERANT CLUB',
    vibe: 'society',
    scenario: [
      'A debate club has one core rule: everyone may speak, disagree, organize, and argue. A new faction openly campaigns to abolish that rule once it gets a majority. The faction has not committed violence or broken current rules; it is simply promising to end them later.',
      'The club can ban the faction now or allow it to compete under the very openness it wants to remove. Infinite-loop music begins playing softly.'
    ],
    prompt: 'Ban the future rule-killers, or let them use the open system until they actually break it?',
    choices: ['BAN THEM — openness may need self-defence', 'LET THEM SPEAK — pre-emptive bans can become the real threat'],
    twist: [
      'If the faction wins, open debate ends exactly as promised. If the club adopts a vague “threat to openness” ban, a later leadership uses the same wording against ordinary critics. Both sides have discovered why definitions are less exciting than slogans and more important.'
    ],
    conclusion: 'A principle sometimes needs boundaries that protect the conditions making it possible. Those boundaries should be narrow, evidence-based, defined by conduct and genuine threat rather than by ordinary disagreement.',
    afterPrompt: 'What behaviour should count as threatening openness strongly enough to justify exclusion?',
    hostPrompts: ['How do you prevent self-defence from becoming censorship?', 'Should stated future intent matter before harmful conduct occurs?']
  },
  {
    id: 90,
    title: 'THE MAYOR’S ACTUAL CUSTOMER',
    vibe: 'politics',
    scenario: [
      'A mayor is competent on routine services but repeatedly backs policies that donors love and ordinary residents dislike. You can treat the pattern as a bad mayor problem and vote him out, or treat it as a system problem involving access, campaign money, and post-office careers.',
      'Residents get folding chairs and six-minute meetings. Major donors get steak, direct phone access, and a version of the mayor with noticeably better battery life.'
    ],
    prompt: 'Replace the mayor or replace the incentives?',
    choices: ['VOTE HIM OUT — people still choose their behaviour', 'CHANGE THE SYSTEM — the next mayor will meet the same rewards'],
    twist: [
      'The mayor loses and takes a highly paid advisory job from an industry that benefited from his decisions. The replacement mayor begins with better intentions, then discovers the exact same donor calendar and career ladder waiting in the office drawer.'
    ],
    conclusion: 'Individual character matters, but political behaviour often becomes easier to understand when you ask what the incentive structure repeatedly rewards. Formal representation is not the same as real accountability.',
    afterPrompt: 'What accountability changes behaviour between elections rather than only replacing personalities afterward?',
    hostPrompts: ['Which decision still belongs fully to the officeholder despite the incentives?', 'What reform would change the reward structure rather than the campaign slogan?']
  },
  {
    id: 91,
    title: 'THE KARAOKE PRESIDENT',
    vibe: 'politics',
    scenario: [
      'Candidate A is deeply competent, detailed, and communicates like a printer manual. Candidate B is charismatic, persuasive, good at coalition-building, and has enough policy knowledge to surround himself with a strong team—but definitely enjoys microphones more than spreadsheets.',
      'Candidate B goes viral singing the campaign slogan at karaoke. Infrastructure remains unaroused.'
    ],
    prompt: 'Who gets your vote: the operator or the persuader who can actually get people to follow?',
    choices: ['CANDIDATE A — competence before performance', 'CANDIDATE B — leadership needs persuasion too'],
    twist: [
      'Candidate B wins and successfully passes two useful reforms the boring expert could never build support for. Then a fast-moving crisis arrives where shallow understanding makes him confidently choose the wrong trade-off before advisers can catch up.'
    ],
    conclusion: 'Persuasion is a real leadership skill, but it is not evidence of truth or competence. Healthy judgement separates the ability to sell a story from the ability to understand and govern the reality underneath it.',
    afterPrompt: 'How much competence can a strong team supply for a persuasive leader who lacks it personally?',
    hostPrompts: ['What skills should never be outsourced by a leader?', 'Would you demand the same evidence from a candidate you personally enjoy?']
  },
  {
    id: 92,
    title: 'THE SECURITY BLANKET STATE',
    vibe: 'politics',
    scenario: [
      'After a serious threat, a government requests broad temporary surveillance powers for six months. Intelligence officials show credible evidence the tools could prevent harm, but narrower warrants would miss some connections and move more slowly.',
      'The proposal includes oversight but the legal language is broad enough to make future lawyers visibly excited.'
    ],
    prompt: 'Grant the broad emergency tools, or accept more risk to keep the state on a shorter leash?',
    choices: ['GRANT THEM — real threats justify temporary power', 'LIMIT THEM — powers outlive the people you trust'],
    twist: [
      'The program helps disrupt a genuine threat. The emergency date arrives, the power is renewed “just in case,” and a later administration expands the same system to peaceful activists and journalists under a broader definition of risk.'
    ],
    conclusion: 'Security powers can produce real benefits while creating durable risks. Judge them by necessity, evidence, scope, sunset rules, oversight, and whether you would hand the same power to the future leader you trust least.',
    afterPrompt: 'What safeguard would make a temporary security power genuinely temporary?',
    hostPrompts: ['How much additional safety justifies a major privacy cost?', 'Would you approve the same authority for your least trusted future government?']
  },
  {
    id: 93,
    title: 'THE TRAITOR BUTTON',
    vibe: 'politics',
    scenario: [
      'An employee inside a powerful organization discovers a serious factual failure. Reporting it publicly could force reform, but the documents also contain sensitive information whose release may cause unrelated harm. Leadership calls public disclosure betrayal and promises an internal review.',
      'The red TRAITOR button is already plugged in. The internal-review shredder is making a noise nobody likes.'
    ],
    prompt: 'Protect loyalty and internal process, or expose the evidence before it can disappear?',
    choices: ['STAY INTERNAL — loyalty and confidentiality still matter', 'GO PUBLIC — loyalty cannot become a muzzle for truth'],
    twist: [
      'The internal review begins suppressing the core finding. The public leak later proves the failure was real—but unnecessary private details in the dump harm innocent people who had nothing to do with it. Both “loyalty” and “transparency” managed to become excuses for being careless.'
    ],
    conclusion: 'Disagreement and criticism are not automatically betrayal. Serious wrongdoing may justify escalation, but truth should be exposed precisely: enough evidence to establish the claim, without using a good cause to excuse unnecessary harm.',
    afterPrompt: 'What should a person try before going public, and what evidence shows internal channels can no longer be trusted?',
    hostPrompts: ['How much collateral disclosure is morally relevant?', 'When is loyalty a virtue and when is it protection for wrongdoing?']
  },
  {
    id: 94,
    title: 'THE SUSPICIOUS NEIGHBOURHOOD',
    vibe: 'society',
    scenario: [
      'Police data show one neighbourhood accounts for a disproportionate share of reported car thefts. The city can increase patrols there or distribute patrols evenly so residents are not treated as suspicious because of their postcode.',
      'Most households in the neighbourhood are currently doing dangerous activities such as homework, laundry, and forgetting bin day.'
    ],
    prompt: 'Follow the hotspot or protect equal treatment?',
    choices: ['TARGET PATROLS — resources should follow risk', 'SPREAD THEM EVENLY — postcode is not guilt'],
    twist: [
      'Extra patrols catch several real thefts. They also generate many more minor stops in that area, making the neighbourhood look even more “crime-heavy” because police are now observing it more intensely, while theft elsewhere becomes easier to miss.'
    ],
    conclusion: 'Group patterns can guide resource allocation without proving anything about an individual. Serious analysis must separate actual risk, measurement effects, enforcement intensity, and the evidence required before treating a person as suspicious.',
    afterPrompt: 'How can institutions use group-level risk without turning residents into walking statistics?',
    hostPrompts: ['What data would show the hotspot is real rather than a policing artifact?', 'What individual evidence should be required before a stop or accusation?']
  },
  {
    id: 95,
    title: 'INFLUENCE IS NOT MIND CONTROL',
    vibe: 'politics',
    scenario: [
      'A company spends millions lobbying officials, funding campaigns, and buying access. After a close vote goes its way, one side says, “The money controlled them.” The officials say they supported the policy for independent reasons and would have voted the same way anyway.',
      'The evidence proves access and pressure. It does not include a remote control labelled MAYOR.'
    ],
    prompt: 'What gets the benefit of the doubt: the money trail or the officials’ independent reasons?',
    choices: ['FOLLOW THE MONEY — incentives explain the vote', 'FOLLOW THE ARGUMENTS — influence is not proof of control'],
    twist: [
      'Emails show the company successfully pressured two officials to change language in the bill. Three others supported the same provisions before the lobbying campaign began, and several voted against the company entirely. The money mattered without becoming a hive mind.'
    ],
    conclusion: 'Influence, pressure, coordination, and control are different claims. Use the strongest term the evidence can support, because exaggerating a real influence case into total control makes the accurate part easier to dismiss.',
    afterPrompt: 'What evidence would let you move responsibly from “influence” to “coordination” or “control”?',
    hostPrompts: ['How much weight should pre-existing positions receive?', 'Which actors remain responsible for their own decisions even under pressure?']
  },
  {
    id: 96,
    title: 'THE DOG ATE ONE USB',
    vibe: 'absurd',
    scenario: [
      'A company preserves an important document in hundreds of synchronized copies, printed archives, and independent backups. The oldest original USB—containing early metadata and handwritten labels—is then eaten by a dog with a powerful opposition to records management.',
      'One team says the document is safely preserved. Another says losing the original object still matters for authenticity and history.'
    ],
    prompt: 'Did the dog destroy anything important, or merely one plastic delivery format?',
    choices: ['MOSTLY ONE COPY — the information survives everywhere', 'THE ORIGINAL MATTERS — provenance can contain unique evidence'],
    twist: [
      'The text is restored perfectly from multiple independent copies and matching hashes. The original USB’s physical metadata, however, cannot be recreated. The dog destroyed some evidence about the object without destroying the document itself.'
    ],
    conclusion: 'The loss of one physical copy does not prove the information disappeared from a distributed transmission system. At the same time, original artifacts can carry separate evidence about provenance that copies do not preserve.',
    afterPrompt: 'What exactly must be preserved: the information, the physical artifact, or both for different reasons?',
    hostPrompts: ['How does redundancy change the meaning of “lost”?', 'What unique information can an original artifact preserve beyond its text?']
  },
  {
    id: 97,
    title: 'TWO WITNESSES, ONE BURRITO',
    vibe: 'logic',
    scenario: [
      'Two witnesses describe the same burrito theft. Witness A swears the thief wore a red hat. Witness B says, “No hat. I saw his hair.” Unlike the easy version of this example, these details actually look incompatible.',
      'Your friend would like both accounts thrown out immediately because contradiction has been spotted in the wild.'
    ],
    prompt: 'Do you treat the accounts as mutually unreliable, or try to see whether the difference can be explained without gymnastics?',
    choices: ['THROW THEM OUT — they conflict on a concrete detail', 'CHECK THE TIMELINE — apparent contradiction may depend on when they looked'],
    twist: [
      'Security footage shows the thief entered wearing a red hat, dropped it while running, and exited bareheaded. Both witnesses were accurate about different moments. A third witness is still wrong about the burrito containing chicken.'
    ],
    conclusion: 'A contradiction requires incompatible claims about the same thing in the same relevant respect. Different times, perspectives, or selected details can create apparent conflict without logical contradiction.',
    afterPrompt: 'What exact conditions have to match before two statements really contradict each other?',
    hostPrompts: ['When does harmonizing accounts become reasonable rather than forced?', 'What kind of conflict would genuinely damage both witnesses’ reliability?']
  },
  {
    id: 98,
    title: 'QUOTE KARAOKE',
    vibe: 'internet',
    scenario: [
      'A scientist says in a long interview, “The treatment failed in two patients.” That exact sentence becomes a viral clip. You have not read the full interview, but the clip is authentic and the public debate is happening now.',
      'You can share the exact quote with a source link or hold it until you know the surrounding context. The crop button is waiting with the confidence of a man who owns no consequences.'
    ],
    prompt: 'Share the verified sentence now, or refuse to move a quote before reading around it?',
    choices: ['SHARE IT — exact words plus source are fair', 'WAIT FOR CONTEXT — accuracy can still mislead'],
    twist: [
      'The next sentence is, “while succeeding in ninety-eight.” The short quote was word-for-word real and functionally misleading as evidence that the treatment generally failed. Context has committed a hostile takeover.'
    ],
    conclusion: 'A quotation can be literally accurate and still be dishonest when omitted context predictably changes its meaning. Evidence includes enough surrounding context to preserve what the source was actually saying.',
    afterPrompt: 'How much context do you owe readers before an accurate excerpt becomes a misleading one?',
    hostPrompts: ['When is a short excerpt fair?', 'Should linking the source reduce or remove responsibility for the impression your excerpt creates?']
  },
  {
    id: 99,
    title: 'THE LAST CUSTOMER',
    vibe: 'dark-humour',
    scenario: [
      'Your product helps lonely people connect, gives creators income, and is free because usage drives advertising. Research also shows that a slightly more compulsive design increases time spent by 20%, which funds the free service and makes investors extremely capable of smiling.',
      'A less sticky version still works but earns less, supports fewer creators, and grows slowly. Nobody in the meeting says “let us make people weaker.” The graph simply rewards one direction.'
    ],
    prompt: 'Ship the sticky version or accept a smaller product that is easier to leave?',
    choices: ['SHIP IT — more engagement also funds real benefits', 'CAP IT — do not build weakness into the business model'],
    twist: [
      'Ten years later, your own teenager becomes one of the heaviest users and displays exactly the compulsive behaviors the old design documents predicted. The product still connects people and pays creators. The design meeting has finally arrived at your dinner table.'
    ],
    conclusion: 'What you deliberately optimize continues producing consequences after the meeting ends. Real benefits do not erase responsibility for predictable weaknesses a business chooses to train because those weaknesses are profitable.',
    afterPrompt: 'What would you refuse to optimize if the heaviest user were someone you loved?',
    hostPrompts: ['What business metric should compete with engagement?', 'How much product benefit can justify deliberate behavioral manipulation?']
  },
  {
    id: 100,
    title: 'THE FINAL EXIT INTERVIEW',
    vibe: 'finale',
    scenario: [
      'At the end of your life, you may open one report first. Report A shows everything you built: career, money, projects, achievements, skills, property, and things that would look excellent in a documentary montage. Report B shows who you became while building it: promises, private habits, relationships, service, restraint, honesty, and the people who had to live beside your ambition.',
      'You will eventually see both. You only get to choose which page deserves to define the headline.'
    ],
    prompt: 'Which report gets the front page: what you built or who you became while building it?',
    choices: ['WHAT I BUILT — contribution leaves real evidence', 'WHO I BECAME — output cannot excuse the person producing it'],
    twist: [
      'One enormous achievement helped thousands of people but cost several close relationships you assumed could be repaired later. A handful of tiny private acts nobody remembers also changed lives in ways no résumé recorded. The reports refuse to stay in separate folders.'
    ],
    conclusion: 'A finite life should be organized around truth, character, responsibility, service, restraint, and meaningful contribution rather than distraction or accumulation alone. What you build matters; so does the kind of person your building process creates.',
    afterPrompt: 'What would you want your achievements to have cost—and what would be too expensive even for a great result?',
    hostPrompts: ['Which part of your current calendar would look absurd in a final report?', 'What contribution and character would you be proud to see on the same page?']
  }
);
