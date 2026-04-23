export type LocationPoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: string;
  year: string;
  description: string;
};

export const locations: LocationPoint[] = [
  {
    id: "sharon-pa",
    name: "Sharon, Pennsylvania, USA",
    lat: 41.2331,
    lng: -80.4934,
    type: "Early life",
    year: "1964",
    description: "Birthplace in western Pennsylvania, with formative years in nearby New Castle.",
  },
  {
    id: "washington-gwu",
    name: "Washington, D.C., USA",
    lat: 38.9072,
    lng: -77.0369,
    type: "Education",
    year: "1980s",
    description: "Attended George Washington University before entering intelligence service.",
  },
  {
    id: "langley-va",
    name: "Langley, Virginia, USA",
    lat: 38.9517,
    lng: -77.1467,
    type: "CIA start",
    year: "1990",
    description: "Began CIA career as analyst and then case officer.",
  },
  {
    id: "athens-gr",
    name: "Athens, Greece",
    lat: 37.9838,
    lng: 23.7275,
    type: "Field posting",
    year: "1990s",
    description: "Served abroad in Greece during operational assignments.",
  },
  {
    id: "islamabad-pk",
    name: "Islamabad, Pakistan",
    lat: 33.6844,
    lng: 73.0479,
    type: "Counterterrorism",
    year: "2001-2002",
    description: "Worked in post-9/11 operations, including activity tied to the Abu Zubaydah case.",
  },
  {
    id: "manama-bh",
    name: "Manama, Bahrain",
    lat: 26.2235,
    lng: 50.5876,
    type: "Middle East",
    year: "2000s",
    description: "Regional intelligence work connected to Gulf operations.",
  },
  {
    id: "washington-disclosure",
    name: "Washington, D.C., USA",
    lat: 38.8895,
    lng: -77.0353,
    type: "Public disclosure",
    year: "2007",
    description: "Spoke publicly about CIA interrogation and waterboarding.",
  },
  {
    id: "loretto-pa",
    name: "Loretto, Pennsylvania, USA",
    lat: 40.5034,
    lng: -78.6389,
    type: "Imprisonment",
    year: "2013-2015",
    description: "Served sentence at FCI Loretto.",
  },
];

export const routePairs = locations.slice(0, -1).map((location, index) => ({
  id: `${location.id}->${locations[index + 1].id}`,
  start: location,
  end: locations[index + 1],
}));

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
];
