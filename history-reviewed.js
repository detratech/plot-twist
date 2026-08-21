'use strict';

// Editorial replacements made during the research audit. These keep a strong,
// recognizable fit while removing repeated examples, disputed popular myths,
// and examples that did not clarify the exact card strongly enough.
Object.assign(HISTORICAL_EXAMPLES, {
  11: {
    title: 'Deepwater Horizon · 2010',
    text: 'The Macondo blowout involved concrete technical failures, but the presidential commission also found repeated failures in risk management and safe drilling practices across the companies involved. Explaining the physical mechanism did not erase the organizational decisions that allowed the danger to become a catastrophe.'
  },
  21: {
    title: 'Associated Press Twitter hack · 2013',
    text: 'Attackers stole credentials for the Associated Press account and posted a false report of explosions at the White House. The bogus alert triggered a sharp stock-market decline before the claim was corrected. A trusted-looking source can move people and systems faster than verification can catch up.'
  },
  22: {
    title: 'The “What is chicken?” contract case · 1960',
    text: 'A U.S. court literally had to decide what the word “chicken” meant in a sales contract: young broilers only, or older stewing birds too. Judge Henry Friendly examined negotiations, trade usage, pricing, and context because a dictionary definition alone could not settle what the parties had agreed to.'
  },
  27: {
    title: 'Vietnam veterans and heroin relapse · 1970s',
    text: 'Studies of U.S. soldiers who had used heroin in Vietnam found surprisingly low rates of renewed addiction after they returned home. The drug had not changed, but availability, social setting, routines, and life circumstances had. Environment can make self-control easier or harder without making personal choice disappear.'
  },
  34: {
    title: 'Y2K remediation · 1990s',
    text: 'Governments and companies knew years in advance that old date-handling code could fail when 1999 became 2000. The extra time only helped because teams spent it finding systems, repairing code, testing, rehearsing, and building contingency plans. Waiting was useful when the waiting period contained preparation rather than hope.'
  },
  35: {
    title: 'ALS Ice Bucket Challenge · 2014',
    text: 'Millions publicly filmed themselves dumping ice water over their heads and challenged friends to do the same. The performance was inseparable from attention and social visibility, yet the campaign raised $115 million for the ALS Association and greatly expanded research and care. Publicity can feed ego and multiply real good at the same time.'
  },
  39: {
    title: 'Weight Watchers randomized trial · 2011',
    text: 'In a large randomized trial, adults referred to a commercial group program lost substantially more weight over twelve months than those receiving standard primary-care treatment. Regular meetings, weighing, advice, motivation, and group support were part of the package. External accountability can be useful scaffolding even when the long-term goal is self-directed discipline.'
  },
  48: {
    title: 'General Motors and the annual model change · 1920s',
    text: 'General Motors helped normalize releasing visibly different car models every year, using styling and design obsolescence to make an older but functional car feel dated. Some new models genuinely improved. The marketing breakthrough was teaching consumers that “still works” and “still feels current” were different problems.'
  },
  55: {
    title: 'Mars Climate Orbiter · 1999',
    text: 'NASA lost the spacecraft after one team supplied navigation data in English units while another system expected metric units. Both groups were doing serious technical work; a basic assumption at the interface was never made safely explicit. Important expectations become dangerous when everybody thinks the other side already knows them.'
  },
  57: {
    title: 'Canada’s wartime income tax · 1917',
    text: 'Canada introduced the Income War Tax during the First World War as a temporary measure to be reviewed after the war. It was reviewed in 1919 but remained, and by 1948 federal income tax was no longer treated as temporary. A reasonable emergency arrangement can become normal when every extension is easier than a fresh decision.'
  },
  91: {
    title: 'FDR’s first banking Fireside Chat · 1933',
    text: 'Roosevelt did more than sign emergency banking measures: he explained the crisis and the reopening plan directly to the public in plain language over radio. When banks reopened, depositors returned money rather than continuing the run. Persuasion was not a substitute for policy competence; it was one of the capacities that helped the policy work.'
  },
  98: {
    title: 'Martin Luther King Jr. on riots · 1966–1967',
    text: 'King’s line that a riot is “the language of the unheard” is often repeated by itself. In the same argument he also called riots socially destructive and self-defeating while insisting the conditions producing them had to be confronted. One authentic sentence can mislead when the surrounding position is removed.'
  },
  104: {
    title: 'Andrew Wakefield’s MMR paper · 1998–2011',
    text: 'Wakefield had undisclosed financial and legal conflicts around research that claimed a vaccine link to autism, and later investigations found serious scientific misconduct. The conflicts were reasons for deeper scrutiny; the claim itself was ultimately defeated by examination of the evidence, not by motive alone.'
  },
  117: {
    title: 'Eisenhower’s D-Day decision · 1944',
    text: 'Eisenhower had to decide whether to launch the Normandy invasion amid unstable weather forecasts, strategic disagreement, and enormous possible losses. Before knowing the outcome, he wrote a note accepting responsibility if the landing failed. A decision can be judged by the information and risks available beforehand rather than by pretending success was guaranteed after it happens.'
  },
  126: {
    title: 'Elizabeth Taylor and Richard Burton · 1964–1976',
    text: 'Taylor and Burton became one of Hollywood’s most famous intensely passionate couples. They married, divorced after a decade, remarried the next year, and divorced again less than a year later. Powerful chemistry was plainly real; it was not enough by itself to make a volatile relationship durable.'
  },
  129: {
    title: 'Steve Jobs and Tim Cook at Apple · 1998–2011',
    text: 'Jobs recruited Cook to Apple while Jobs remained the company’s defining product visionary. Cook became responsible for worldwide operations, including supply chain, sales, service, and support. The partnership made visible two different kinds of leadership: choosing direction and making an enormous daily system reliably deliver it.'
  },
  131: {
    title: 'Camp David Accords · 1978',
    text: 'After thirteen days of difficult negotiations, Egypt and Israel signed two detailed framework documents rather than leaving peace at the level of goodwill and hopeful conversation. The later treaty still required more work. As stakes and investment grow, clarity about terms and direction becomes more important, not less.'
  },
  139: {
    title: 'César Chávez and the grape boycott · 1965–1970',
    text: 'Farmworkers used strikes, marches, fasting, organizing, and a nationwide consumer boycott to pressure growers while Chávez repeatedly emphasized nonviolent discipline. The campaign eventually helped win contracts and broader support. Effective escalation did not require confusing firmness with uncontrolled aggression.'
  },
  143: {
    title: 'FDR’s first inaugural address · 1933',
    text: 'Roosevelt entered office during a banking collapse and mass unemployment. His inaugural address spoke frankly about the crisis while insisting that action was possible and fear should not paralyze the country. Encouragement is strongest when hope does not require pretending the hard facts are smaller than they are.'
  },
  148: {
    title: 'New Jersey v. T.L.O. · 1985',
    text: 'The U.S. Supreme Court held that students have legitimate privacy expectations while schools also have a real need to maintain safety and order. School searches therefore had to be reasonable in both their justification and scope. Privacy did not vanish, and supervision did not have to wait for adult-level proof in every case.'
  },
  156: {
    title: 'Long-Term Capital Management · 1998',
    text: 'LTCM was run by celebrated market experts, including two Nobel laureates, and produced impressive profits using sophisticated models. After Russia’s default shocked markets, the fund lost heavily and required a private-sector rescue. A brilliant winning record proved the method could win; it did not reveal every way it could fail.'
  },
  171: {
    title: 'Bill Gates’ “Think Week” · 1990s onward',
    text: 'While leading Microsoft, Gates began setting aside isolated stretches to read technical papers, think, and write because daily executive demands left him falling behind on new ideas. More useful input was not enough by itself; he deliberately created uninterrupted space in which the input could be processed.'
  },
  175: {
    title: 'Chuck Feeney and “Giving While Living” · 1984–2020',
    text: 'Duty Free Shoppers co-founder Chuck Feeney transferred virtually his entire personal fortune to philanthropy and deliberately spent the foundation down during his lifetime. He could have kept accumulating indefinitely. Instead, he treated wealth as stored capacity that eventually had to become action while he was alive to see it matter.'
  },
  179: {
    title: 'Cynthia Cooper uncovers WorldCom fraud · 2002',
    text: 'WorldCom internal-audit chief Cynthia Cooper advanced an investigation into suspicious accounting entries even after the company’s finance leadership asked for delay. Her team’s work helped expose a massive accounting fraud. Loyalty to an institution can require confronting the facts that threaten its reputation rather than protecting the reputation from the facts.'
  },
  187: {
    title: 'Moritz v. Commissioner · 1972',
    text: 'Charles Moritz, an unmarried man caring for his dependent mother, was denied a tax deduction that the law made available to women and certain previously married men. The appeals court rejected the sex-based distinction. Applying the rule to an unexpected male caregiver made the unequal standard much harder to hide behind habit.'
  },
  189: {
    title: 'The Salt March · 1930',
    text: 'Gandhi began the protest with a small group walking toward the coast to challenge Britain’s salt monopoly. The march grew, and the act of making salt helped trigger much wider civil disobedience. One person’s tiny act could not change the system alone; coordinated repetition turned a small act into political pressure.'
  },
  196: {
    title: 'The causes of the First World War · 1914',
    text: 'The assassination of Archduke Franz Ferdinand was the immediate spark, but the conflict grew out of a larger mix of alliances, nationalism, military competition, imperial rivalry, and choices made during the July Crisis. One motive or one trigger can be important without becoming the complete explanation for a huge human event.'
  },
  200: {
    title: 'Charles Darwin’s routine at Down House · 19th century',
    text: 'Darwin organized his days into repeated blocks for concentrated work, correspondence, walks, meals, rest, and family reading. His timetable was not a perfect measure of what he valued, but it made his real priorities visible through what repeatedly received protected hours.'
  }
});
