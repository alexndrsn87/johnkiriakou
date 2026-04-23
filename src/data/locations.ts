export type LocationPoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  order: number;
  type: string;
  year: string;
  description: string;
  story: string;
  category:
    | "Recruitment & Training"
    | "CIA Career"
    | "Counterterrorism"
    | "Government Service"
    | "Legal Case"
    | "Post-Prison"
    | "Media & Public"
    | "Context";
};

export const locations: LocationPoint[] = [
  {
    id: "gwu-med-school-tests",
    name: "George Washington University Medical School, Washington, D.C.",
    lat: 38.8991,
    lng: -77.0486,
    order: 1,
    type: "CIA entry testing",
    year: "Spring/Summer 1988",
    category: "Recruitment & Training",
    description: "Took three CIA entry exams with roughly 300 applicants.",
    story:
      "He says he arrived at 8am on a Saturday and completed a blank world map test, a current-events multiple-choice test, and a very large personality inventory. He recalls being the first person to finish.",
  },
  {
    id: "rosslyn-virginia-recruitment",
    name: "Rosslyn, Virginia",
    lat: 38.8959,
    lng: -77.0722,
    order: 2,
    type: "Recruitment stage meeting",
    year: "Spring/Summer 1988",
    category: "Recruitment & Training",
    description: "Met with CIA HR contact in a nondescript building after GWU recruitment.",
    story:
      "After Professor Gerald Post connected him, he says he took the Metro to Rosslyn, went to a sixth-floor office, and met \"Bob\" (whom he believes was the head of CIA HR) who moved him through the process.",
  },
  {
    id: "vienna-psych-evaluation",
    name: "Vienna, Virginia",
    lat: 38.9012,
    lng: -77.2653,
    order: 3,
    type: "Psychological assessment",
    year: "Spring/Summer 1988",
    category: "Recruitment & Training",
    description: "Panel psychological evaluation as part of CIA hiring.",
    story:
      "He says he drove to a small two-story building where a psychiatrist, psychologist, and anthropologist questioned him on family dynamics, discipline, trust, and betrayal.",
  },
  {
    id: "white-house-oval-office-1990",
    name: "White House (Oval Office), Washington, D.C.",
    lat: 38.8977,
    lng: -77.0365,
    order: 4,
    type: "Presidential briefing",
    year: "August 2, 1990",
    category: "CIA Career",
    description: "Briefed President George H.W. Bush on Saddam Hussein during Kuwait invasion morning.",
    story:
      "At age 25 and roughly nine months into CIA service, he says he briefed the President, Vice President, National Security Adviser, CIA Director, and others on expected Iraqi next steps, then was told to pack for Saudi Arabia.",
  },
  {
    id: "camp-peary-analyst-training",
    name: "The Farm (Camp Peary), Virginia",
    lat: 37.3201,
    lng: -76.3083,
    order: 5,
    type: "Analyst writing training",
    year: "Mid 1990",
    category: "Recruitment & Training",
    description: "Six-week writing course focused on CIA and PDB drafting standards.",
    story:
      "About four months into his CIA career, he says he was sent for six weeks to train in standardized CIA analytical writing style used for high-level briefing products like the President's Daily Brief.",
  },
  {
    id: "taif-saudi-1990",
    name: "Taif, Saudi Arabia",
    lat: 21.2703,
    lng: 40.4158,
    order: 6,
    type: "Kuwaiti royal liaison",
    year: "September 1990",
    category: "CIA Career",
    description: "Served as CIA liaison with displaced Kuwaiti leadership after Iraq's invasion.",
    story:
      "He says the Kuwaiti royals relocated to Taif after fleeing Kuwait. He assessed the Emir as unstable and cabled HQ to work primarily through the Crown Prince while the Emir was handled diplomatically.",
  },
  {
    id: "kuwait-city-liberation",
    name: "Kuwait City, Kuwait",
    lat: 29.3759,
    lng: 47.9774,
    order: 7,
    type: "Liberation entry",
    year: "Late February 1991",
    category: "CIA Career",
    description: "Entered Kuwait City with U.S. Marines on Liberation Day.",
    story:
      "He recounts entering after Operation Desert Storm and references the gold-plated Lincoln Town Car memorial narrative around Sheikh Fahad Al-Sabah during post-liberation observations.",
  },
  {
    id: "amman-jordan-defectors",
    name: "Amman, Jordan",
    lat: 31.9539,
    lng: 35.9106,
    order: 8,
    type: "Defector interviews",
    year: "Approximately January 1993",
    category: "CIA Career",
    description: "Joined delegation interviewing Saddam's sons-in-law after their defection.",
    story:
      "He says the team wanted WMD intelligence while the defectors sought support for regime change. Talks stalled, and he believes later disinformation around the meeting influenced Saddam's destruction of chemical stockpiles.",
  },
  {
    id: "middle-east-early",
    name: "Middle East (unspecified)",
    lat: 29.5,
    lng: 45.0,
    order: 9,
    type: "Early operational work",
    year: "Early 1990s",
    category: "CIA Career",
    description: "Early overseas service under senior officer later consulted on interrogation issues.",
    story:
      "He references working in the Middle East about a decade before the post-9/11 torture debates, including service under the senior officer he later sought for advice about the enhanced interrogation program.",
  },
  {
    id: "athens-gr",
    name: "Athens, Greece",
    lat: 37.9838,
    lng: 23.7275,
    order: 10,
    type: "CIA station posting",
    year: "Early-to-mid 1990s",
    category: "CIA Career",
    description: "Posted as a CIA officer replacing Mike Baker in a high-threat station.",
    story:
      "He says Athens was among the most dangerous stations, citing domestic groups such as 17 November and Popular Revolutionary Struggle, as well as Abu Nidal and PFLP presence under a permissive political environment.",
  },
  {
    id: "chios-greece-honeymoon",
    name: "Chios, Greece",
    lat: 38.3674,
    lng: 26.1358,
    order: 11,
    type: "Personal milestone",
    year: "Likely late 1980s to early 1990s",
    category: "Context",
    description: "Referenced as first honeymoon site and later memory trigger with George Tenet.",
    story:
      "He recalls having the best loukoumades of his life on Chios, a detail that resurfaced years later during a chance encounter with George Tenet at a Greek festival.",
  },
  {
    id: "st-george-bethesda-festival",
    name: "St. George Greek Orthodox Church, Bethesda, Maryland",
    lat: 38.9875,
    lng: -77.0988,
    order: 12,
    type: "Tenet encounter",
    year: "Likely 1996-1997",
    category: "CIA Career",
    description: "Met George Tenet at a Greek festival loukoumades line.",
    story:
      "He says he introduced himself and his brother to Tenet at the festival during Tenet's deputy-director era, creating an informal personal connection that would resurface later.",
  },
  {
    id: "camp-peary-ops-training",
    name: "The Farm (Camp Peary), Virginia",
    lat: 37.3201,
    lng: -76.3083,
    order: 13,
    type: "Operational crash-and-bang training",
    year: "Late 1997 to early 1998",
    category: "Recruitment & Training",
    description: "Eight-to-nine month operational pipeline with firearms, vehicles, and surveillance drills.",
    story:
      "He describes advanced weapons qualification, shooting-house and vehicle exercises with live rounds, roadblock crashing, parachuting, and surveillance detection as part of full operational preparation.",
  },
  {
    id: "san-diego-submarine",
    name: "San Diego, California, USA",
    lat: 32.7157,
    lng: -117.1611,
    order: 14,
    type: "Maritime infiltration training start",
    year: "Late 1997 or 1998",
    category: "Recruitment & Training",
    description: "Flew to San Diego and boarded submarine for infiltration exercise.",
    story:
      "He says this training block began in San Diego where he boarded a submarine for a covert coastal insertion scenario tied to operational tradecraft.",
  },
  {
    id: "oregon-coast-infiltration",
    name: "Oregon Coast, USA",
    lat: 44.6368,
    lng: -124.0535,
    order: 15,
    type: "Maritime infiltration/exfiltration exercise",
    year: "Late 1997 or 1998",
    category: "Recruitment & Training",
    description: "Sub surfaced offshore; he rowed to land, buried dinghy, and recovered hidden instructions.",
    story:
      "He describes surfacing offshore, rowing in, concealing the boat, and retrieving instructions from a bottle as part of infiltration and exfiltration readiness training.",
  },
  {
    id: "western-us-desert-driving",
    name: "Western U.S. desert (unspecified)",
    lat: 36.1699,
    lng: -115.1398,
    order: 16,
    type: "Advanced desert driving",
    year: "Late 1997 or 1998",
    category: "Recruitment & Training",
    description: "Counterterrorist mobility training on sand terrain.",
    story:
      "He says this module focused on high-performance driving on dunes to prepare for desert operating environments comparable to Afghanistan.",
  },
  {
    id: "london-uk",
    name: "London, United Kingdom",
    lat: 51.5072,
    lng: -0.1276,
    order: 17,
    type: "Joint operation",
    year: "1999-2000",
    category: "CIA Career",
    description: "Worked with Christopher Steele on an operation in London.",
    story:
      "He references collaborating with Christopher Steele on a London operation roughly 25-26 years before the podcast timeframe.",
  },
  {
    id: "st-george-family-day-story",
    name: "CIA Headquarters (Langley), Virginia, USA",
    lat: 38.9517,
    lng: -77.1467,
    order: 18,
    type: "Family Day anecdote",
    year: "Circa 2000",
    category: "CIA Career",
    description: "Brought his parents to Langley, including meeting with George Tenet.",
    story:
      "He says his mother insisted on meeting Tenet, who gave her a CIA-seal piggy bank and joked about islanders versus mainland Greeks, reinforcing recurring personal-cultural themes in his account.",
  },
  {
    id: "islamabad-pk",
    name: "Islamabad, Pakistan",
    lat: 33.6844,
    lng: 73.0479,
    order: 19,
    type: "Head of counterterrorism operations",
    year: "Late 2001-2002",
    category: "Counterterrorism",
    description: "Led post-9/11 hunt for al-Qaeda operatives fleeing Afghanistan.",
    story:
      "Sent after 9/11 to run counterterrorism operations, he describes a six-week hunt that culminated in the February 2002 capture of Abu Zubaydah.",
  },
  {
    id: "langley-post-zubaydah",
    name: "CIA Headquarters (Langley), Virginia, USA",
    lat: 38.9517,
    lng: -77.1467,
    order: 20,
    type: "Return to HQ",
    year: "May 2002",
    category: "Counterterrorism",
    description: "Returned to HQ, declined EIT training, and was promoted out of cycle.",
    story:
      "After returning in May 2002, he says he was offered enhanced interrogation techniques training in a cafeteria setting, declined, then received an out-of-cycle promotion for Abu Zubaydah's capture and served as executive assistant reading secret-site cables.",
  },
  {
    id: "white-house-situation-room-2003",
    name: "White House (Situation Room), Washington, D.C.",
    lat: 38.8977,
    lng: -77.0365,
    order: 21,
    type: "Principals Committee note-taker role",
    year: "Approximately March 18, 2003",
    category: "Counterterrorism",
    description: "Attended pre-Iraq invasion war meeting as note-taker for CIA Director Tenet.",
    story:
      "He recounts the night-before-invasion meeting chaired by Cheney where General Franks discussed a possible path to Tehran by August. He says Tenet privately reacted with alarm and skepticism during the session.",
  },
  {
    id: "baghdad-iraq-war-context",
    name: "Baghdad, Iraq",
    lat: 33.3152,
    lng: 44.3661,
    order: 22,
    type: "Iraq war context",
    year: "2003-2004",
    category: "Counterterrorism",
    description: "Referenced repeatedly from early career briefings through Iraq war operations.",
    story:
      "He ties his executive-assistant role at Langley to the period when the agency was handling Iraq war cables and operations, linking Iraq as a recurring career theater from early briefings through wartime management.",
  },
  {
    id: "deloitte-washington",
    name: "Deloitte & Touche, Washington, D.C.",
    lat: 38.8995,
    lng: -77.0395,
    order: 23,
    type: "Post-CIA consulting and vetting",
    year: "Approximately 2004-2007",
    category: "Government Service",
    description: "Screened former intelligence applicants for private-sector hiring.",
    story:
      "He says he was asked to interview CIA applicants over dinner in D.C., including one candidate whose exaggerated claims about serving in every CIA directorate immediately disqualified him.",
  },
  {
    id: "abu-dhabi-uae",
    name: "Abu Dhabi, UAE",
    lat: 24.4539,
    lng: 54.3773,
    order: 24,
    type: "FARA-registered writing contract",
    year: "2008",
    category: "Government Service",
    description: "Wrote six pro-business op-eds under a small Abu Dhabi Chamber contract.",
    story:
      "He says he won a roughly $30,000 contract to write six op-eds supporting U.S. business in Abu Dhabi and registered under the Foreign Agents Registration Act.",
  },
  {
    id: "senate-foreign-relations-dc",
    name: "Washington, D.C. (Senate Foreign Relations Committee), USA",
    lat: 38.8899,
    lng: -77.0091,
    order: 25,
    type: "Senior investigator for John Kerry",
    year: "2009-2011",
    category: "Government Service",
    description: "Investigative work on foreign-policy cases including Dasht-i-Leili.",
    story:
      "From 2009 to late 2011, he says he served as senior investigator for then-Senator John Kerry, including investigations around the Dasht-i-Leili massacre and alleged recruitment attempts by a Japanese diplomat on Capitol Hill.",
  },
  {
    id: "afghanistan-dasht",
    name: "Dasht-i-Leili, Afghanistan",
    lat: 36.6667,
    lng: 66.8833,
    order: 26,
    type: "War-crimes investigation travel",
    year: "2010-2011",
    category: "Government Service",
    description: "Travelled to investigate the 2001 prisoner deaths at Dasht-i-Leili.",
    story:
      "While working for Kerry, he reports visiting the desert site linked to the November-December 2001 container-truck prisoner deaths, where he said physical traces remained years later.",
  },
  {
    id: "johns-hopkins-baltimore",
    name: "Johns Hopkins University (Baltimore area), USA",
    lat: 39.3299,
    lng: -76.6205,
    order: 27,
    type: "Witness follow-up meeting",
    year: "2011",
    category: "Government Service",
    description: "Private meeting with a human-rights activist about Dasht-i-Leili witnesses.",
    story:
      "After returning from Afghanistan, he says he met in an unused classroom with a human-rights activist regarding a witness, which later informed his letter asking whether U.S. personnel were present at the massacre site.",
  },
  {
    id: "fbi-wfo-2012-raid",
    name: "FBI Washington Field Office, USA",
    lat: 38.8951,
    lng: -77.0336,
    order: 28,
    type: "Interview and raid day",
    year: "January 2012",
    category: "Legal Case",
    description: "Called in under pretense of cooperation, then confronted while his home was raided.",
    story:
      "He describes being summoned for what sounded like another recruitment-counterintelligence matter, then being ambushed while agents raided his house, with Peter Strzok identified as involved.",
  },
  {
    id: "loretto-pa",
    name: "Loretto, Pennsylvania (FCI Loretto), USA",
    lat: 40.5034,
    lng: -78.6389,
    order: 29,
    type: "Federal prison term",
    year: "2013-2015",
    category: "Legal Case",
    description: "Served about 23 months with extensive prison experiences later recounted publicly.",
    story:
      "He says he reported expecting minimum security but was placed in a low-medium environment and served roughly 23 months, where incidents he later described included Aryan Brotherhood pressure, mafia friendships, inmate setups, and encounters linked to Taliban figures.",
  },
  {
    id: "greece-post-prison",
    name: "Greece (post-prison policy work)",
    lat: 39.0742,
    lng: 21.8243,
    order: 30,
    type: "Whistleblower law drafting",
    year: "2015+",
    category: "Post-Prison",
    description: "Helped draft Greek whistleblower protections after release.",
    story:
      "After prison release, he says the Greek government hired him to help draft whistleblower protection law; he also notes his Greek-American background, Rhodes family roots, and receiving Greek citizenship shortly after arrest.",
  },
  {
    id: "fox-news-studios-dc",
    name: "Fox News studios, Washington, D.C.",
    lat: 38.9055,
    lng: -77.0397,
    order: 31,
    type: "Regular media appearances",
    year: "Roughly 2016-2023",
    category: "Media & Public",
    description: "Appeared regularly during Tucker Carlson era and flagged alleged impostor.",
    story:
      "He says he identified a man in the green room falsely claiming deep CIA black-ops experience, reported concerns during a commercial break, and later saw the individual arrested for fraud tied to fake credentials.",
  },
  {
    id: "trump-hotel-dc",
    name: "Trump Hotel, Washington, D.C.",
    lat: 38.8977,
    lng: -77.0337,
    order: 32,
    type: "Pardon-seeking meetings",
    year: "2018",
    category: "Legal Case",
    description: "Two meetings tied to proposed pardon influence efforts.",
    story:
      "He says one meeting involved Rudy Giuliani and an alleged $2M demand, while another involved Sebastian Gorka allegedly raising a fee demand to $5,000 for social media influence. He says he refused both efforts.",
  },
  {
    id: "brussels-eu",
    name: "Brussels, Belgium",
    lat: 50.8503,
    lng: 4.3517,
    order: 33,
    type: "EU testimony",
    year: "Late 2010s",
    category: "Post-Prison",
    description: "Testified after Greece's whistleblower model was adopted and scaled.",
    story:
      "He says that after Greece adopted the law, he testified before EU institutions in Brussels, where the framework was repackaged into broader EU-level legislation.",
  },
  {
    id: "investment-company-dc-athens",
    name: "Washington, D.C. and Athens (investment company role)",
    lat: 38.9072,
    lng: -77.0369,
    order: 34,
    type: "COO whistleblowing",
    year: "2020",
    category: "Legal Case",
    description: "Hired as COO, then reported alleged $150M fraud and money laundering.",
    story:
      "He says he split time between Washington and Athens, discovered large-scale fraud, copied about 15,000 pages of records to a thumb drive, resigned, and reported the case to authorities.",
  },
  {
    id: "fbi-wfo-2022-fraud-report",
    name: "FBI Washington Field Office, USA",
    lat: 38.8951,
    lng: -77.0336,
    order: 35,
    type: "Fraud complaint submission",
    year: "2022",
    category: "Legal Case",
    description: "Returned with counsel and documentary evidence to report alleged financial crimes.",
    story:
      "He says he arrived with attorney Bruce Fein and a thumb drive containing 15,000 documents, but was told the office was not interested absent terrorism, Russia, China, or January 6 nexus.",
  },
  {
    id: "rhodes-greece-return",
    name: "Rhodes, Greece",
    lat: 36.4340,
    lng: 28.2176,
    order: 36,
    type: "Ancestral return trip",
    year: "January 2024/2025",
    category: "Post-Prison",
    description: "Visited ancestral island with his son shortly before podcast recording.",
    story:
      "He describes returning to Rhodes, his family's ancestral home, as a dual Greek-American citizen and says he planned another near-term return at the time of the interview.",
  },
  {
    id: "cuba-havana",
    name: "Havana, Cuba",
    lat: 23.1136,
    lng: -82.3666,
    order: 37,
    type: "Book translation event",
    year: "Around 2024",
    category: "Post-Prison",
    description: "Visited after Spanish editions of his books entered Cuba's National Library.",
    story:
      "He says he attended a ceremony during an international author event and even tested local claims about radio jamming, concluding local interest seemed more focused on baseball than censorship technology.",
  },
  {
    id: "salamanca-spain",
    name: "University of Salamanca, Spain",
    lat: 40.9608,
    lng: -5.6639,
    order: 38,
    type: "Teaching",
    year: "Current/Ongoing",
    category: "Post-Prison",
    description: "Teaches graduate-level history of terrorism.",
    story:
      "He says he currently teaches a graduate class at Salamanca focused on terrorism history, extending his post-intelligence work into academic instruction.",
  },
  {
    id: "somaliland-reference",
    name: "Hargeisa, Somaliland",
    lat: 9.5624,
    lng: 44.0770,
    order: 39,
    type: "Travel reference",
    year: "Undated",
    category: "Context",
    description: "Mentioned in passing during discussion of unrecognized states.",
    story:
      "He briefly says, \"I've been to Somaliland,\" without giving specific mission purpose or timeline details.",
  },
  {
    id: "yemen",
    name: "Sana'a, Yemen",
    lat: 15.3694,
    lng: 44.1910,
    order: 40,
    type: "Career posting reference",
    year: "Undated (CIA years)",
    category: "CIA Career",
    description: "Mentioned as a place he lived while serving in intelligence.",
    story:
      "In recounting prison interactions, he said he had lived in Yemen and Pakistan, indicating Yemen service during his CIA years even though dates and assignment details were not specified.",
  },
  {
    id: "riyadh-saudi-context",
    name: "Riyadh, Saudi Arabia",
    lat: 24.7136,
    lng: 46.6753,
    order: 41,
    type: "Leadership context reference",
    year: "Undated (9/11 era context)",
    category: "Context",
    description: "Referenced in criticism of senior leadership and hijacker visa approvals.",
    story:
      "He discusses Riyadh in relation to John Brennan's station-chief period and allegations concerning visa approvals connected to 9/11 hijackers, framing it as institutional context rather than his own posting.",
  },
];

const orderedLocations = [...locations].sort((a, b) => a.order - b.order);

export const routePairs = orderedLocations.slice(0, -1).map((location, index) => ({
  id: `${location.id}->${orderedLocations[index + 1].id}`,
  start: location,
  end: orderedLocations[index + 1],
}));

export const storyCategories = Array.from(new Set(locations.map((location) => location.category)));

export const sources = [
  {
    label: "Wikipedia: John Kiriakou",
    url: "https://en.wikipedia.org/wiki/John_Kiriakou",
  },
  {
    label: "NYT topic archive",
    url: "https://www.nytimes.com/topic/person/john-c-kiriakou",
  },
  {
    label: "DOJ sentencing release",
    url: "https://www.justice.gov/opa/pr/former-cia-officer-sentenced-30-months-prison-unlawful-disclosure-classified-information",
  },
  {
    label: "The Realignment podcast episode (narrative source)",
    url: "https://www.youtube.com/watch?v=f4Yq6mI6T4Q",
  },
];
