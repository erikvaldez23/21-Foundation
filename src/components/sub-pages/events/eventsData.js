/**
 * Shared event data — used by EventsContent (cards) and EventDetails (detail page).
 *
 * Slug pattern must match landing/Events.jsx toSlug helper:
 *   toSlug(title) + "-" + id  →  e.g. "seansbirthday-celebration-at-amc-1"
 */

export const EVENTS = [
  // {
  //   id: 1,
  //   slug: "seans-birthday-celebration-at-amc-1",
  //   title: "SEAN'S BIRTHDAY CELEBRATION AT AMC",
  //   shortTitle: "Sean's Birthday Celebration",
  //   date: "June 1, 2025",
  //   isoDate: "2025-06-01T18:00:00-05:00",
  //   isoEnd: "2025-06-01T21:00:00-05:00",
  //   timezone: "America/Chicago",
  //   location: { name: "AMC Theatre", address: "Leawood, KS 66224" },
  //   cost: "Free",
  //   category: "Celebration",
  //   image: "/events/AMC/thumbnails/DSC08348.jpg",
  //   heroImage: "/events/AMC/DSC08348.JPEG",
  //   organizer: "Clark21 Foundation",
  //   contactEmail: "reachout@seanclark21foundation.org",
  //   formUrl: "https://docs.google.com/forms/d/example",
  //   description:
  //     "In honor of Sean's birthday, we gathered as a community to celebrate his life and the legacy he left behind. This special evening at AMC brought together family, friends, and supporters of the Clark21 Foundation for an evening of reflection, laughter, and connection.",
  //   tags: ["Birthday", "Celebration", "Community"],
  //   itinerary: [
  //     { time: "6:00 PM", title: "Doors Open & Welcome", detail: "Arrive, grab a program, and connect with fellow attendees." },
  //     { time: "6:30 PM", title: "Opening Remarks", detail: "Words from the Clark21 Foundation team." },
  //     { time: "7:00 PM", title: "Tribute & Memories", detail: "Sharing stories and memories of Sean." },
  //     { time: "8:00 PM", title: "Celebration & Fellowship", detail: "Refreshments and community time." },
  //   ],
  // },
  // {
  //   id: 2,
  //   slug: "virginia-yoga-for-mental-health-2",
  //   title: "VIRGINIA — YOGA FOR MENTAL HEALTH",
  //   shortTitle: "Yoga for Mental Health",
  //   date: "May 31, 2025",
  //   isoDate: "2025-05-31T10:00:00-05:00",
  //   isoEnd: "2025-05-31T12:00:00-05:00",
  //   timezone: "America/Chicago",
  //   location: { name: "Virginia Park", address: "Kansas City, MO" },
  //   cost: "Free",
  //   category: "Wellness",
  //   image: "/events/Yoga/thumbnails/PXL_20250531_161735842~2.jpg",
  //   heroImage: "/events/Yoga/PXL_20250531_161735842~2.JPEG",
  //   organizer: "Clark21 Foundation",
  //   contactEmail: "reachout@seanclark21foundation.org",
  //   formUrl: "https://docs.google.com/forms/d/example",
  //   description:
  //     "A morning of mindful movement and mental-health awareness. Led by certified instructors, this outdoor yoga session was designed for all skill levels and focused on the healing power of breath, movement, and community support.",
  //   tags: ["Yoga", "Wellness", "Mental Health"],
  //   itinerary: [
  //     { time: "10:00 AM", title: "Welcome & Check-In", detail: "Grab your mat and meet the instructors." },
  //     { time: "10:15 AM", title: "Opening Meditation", detail: "Grounding breathwork and intentions." },
  //     { time: "10:30 AM", title: "Yoga Flow", detail: "60-minute guided all-levels yoga session." },
  //     { time: "11:30 AM", title: "Closing Circle", detail: "Community sharing and mental health resources." },
  //   ],
  // },
  // {
  //   id: 3,
  //   slug: "reach-out-walk-2025-3",
  //   title: "REACH-OUT WALK 2025",
  //   shortTitle: "Reach-Out Walk 2025",
  //   date: "September 14, 2025",
  //   isoDate: "2025-09-14T09:00:00-05:00",
  //   isoEnd: "2025-09-14T12:00:00-05:00",
  //   timezone: "America/Chicago",
  //   location: { name: "Downtown Commons Park", address: "Kansas City, MO" },
  //   cost: "Free",
  //   category: "Community Event",
  //   image: "/events/Walk/thumbnails/walk(25).jpg",
  //   heroImage: "/events/Walk/walk(25).JPG",
  //   organizer: "Clark21 Foundation",
  //   contactEmail: "reachout@seanclark21foundation.org",
  //   formUrl: "https://docs.google.com/forms/d/example",
  //   description:
  //     "The annual Reach-Out Walk is our flagship community event — a symbolic 3-mile walk that unites survivors, advocates, families, and allies in the fight against youth mental health struggles. Together we walk, together we heal.",
  //   tags: ["Walk", "Community", "Awareness"],
  //   itinerary: [
  //     { time: "9:00 AM", title: "Registration & Check-In", detail: "Pick up your bib and wristband." },
  //     { time: "9:30 AM", title: "Opening Ceremony", detail: "Words from leadership and community speakers." },
  //     { time: "10:00 AM", title: "Walk Begins", detail: "3-mile community walk through the park." },
  //     { time: "11:15 AM", title: "Resource Fair", detail: "Connect with mental health organizations." },
  //     { time: "12:00 PM", title: "Closing & Next Steps", detail: "Photos, handouts, and community celebration." },
  //   ],
  // },
  // {
  //   id: 4,
  //   slug: "spreading-awareness-4",
  //   title: "SPREADING AWARENESS",
  //   shortTitle: "Spreading Awareness",
  //   date: "2024",
  //   isoDate: "2024-10-01T10:00:00-05:00",
  //   isoEnd: null,
  //   timezone: "America/Chicago",
  //   location: { name: "Community Center", address: "Kansas City, MO" },
  //   cost: "Free",
  //   category: "Awareness Campaign",
  //   image: "/events/spreading-awareness/thumbnails/awareness(17).jpg",
  //   heroImage: "/events/spreading-awareness/thumbnails/awareness(40).jpg",
  //   organizer: "Clark21 Foundation",
  //   contactEmail: "reachout@seanclark21foundation.org",
  //   formUrl: "https://docs.google.com/forms/d/example",
  //   description:
  //     "A grassroots awareness campaign bringing mental health conversations to schools, community centers, and public spaces. Volunteers shared resources, personal stories, and information about the Clark21 Foundation's mission.",
  //   tags: ["Awareness", "Outreach", "Mental Health"],
  //   itinerary: [
  //     { time: "10:00 AM", title: "Setup & Volunteer Briefing", detail: "Organize materials and review messaging." },
  //     { time: "11:00 AM", title: "Community Outreach", detail: "Engage with community members and share resources." },
  //     { time: "1:00 PM", title: "Panel Discussion", detail: "Open conversation about mental health stigma." },
  //     { time: "2:30 PM", title: "Wrap-Up", detail: "Collect feedback and distribute handouts." },
  //   ],
  // },
  {
    id: 4,
    slug: "yoga-for-mental-health-4",
    title: "YOGA FOR MENTAL HEALTH",
    shortTitle: "Yoga for Mental Health",
    date: "May 2, 2026",
    isoDate: "2026-05-02T13:00:00-04:00",
    isoEnd: "2026-05-02T14:15:00-04:00",
    timezone: "America/New_York",
    location: { 
      name: "In Balance Yoga Studio", 
      address: "1512 N. Main Street, Blacksburg, VA 24060",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=In+Balance+Yoga+Studio+Blacksburg+VA"
    },
    cost: "Donation Based",
    category: "Fundraiser",
    image: "/events/Yoga/thumbnails/PXL_20250531_161735842~2.jpg",
    heroImage: "/events/Yoga/PXL_20250531_161735842~2.JPEG",
    organizer: "Clark21 Foundation",
    contactEmail: "reachout@seanclark21foundation.org",
    formUrl: "https://www.inbalanceyogastudio.com/new-students/",
    description:
      "Description to go here",
    tags: ["Fundraiser", "Yoga", "Mental Health", "Community"],
    itinerary: [
      { time: "12:45 PM", title: "Arrival & Check-In", detail: "Suggested arrival time to settle in and prepare for the class." },
      { time: "1:00 PM", title: "Warm Flow Yoga Class", detail: "An all-levels session focused on connection and mental wellness." },
      { time: "2:00 PM", title: "Closing & Reflection", detail: "A brief moment to honor Sean's memory and connect with the community." },
    ],
    knowBeforeYouGo: [
      { label: "Attire", detail: "Wear something green and comfy clothing." },
      { label: "Children Welcome", detail: "Children 10+ years old are welcome but must be accompanied by a parent/adult." },
      { label: "Phone Policy", detail: "No cell phones are allowed in the yoga classroom." },
      { label: "Studio Etiquette", detail: "Remove shoes when entering the studio’s lobby. Cubbies are available for storage." },
      { label: "Hydration", detail: "Water bottles are allowed in the yoga classroom." },
      { label: "Arrival", detail: "Attendees are encouraged to arrive 15-20 minutes prior to the class." },
      { label: "First Timers", detail: "All first time visitors to IBY need to complete an online waiver: https://www.inbalanceyogastudio.com/new-students/" },
    ],
    registration: {
      pricePlayers: "Donations can be made by calling (540) 961-1030 or in-person.",
      priceSpectators: "100% of donations support the Sean Clark 21 Foundation.",
      rules: [
        "Donations can be made either by calling In Balance Yoga Studio or in-person at the studio the day of the fundraiser: (540) 961-1030",
        "This is an all-levels warm flow class, all levels of yoga experience are welcome!",
      ],
      donationOnly: "Visit In Balance Yoga Studio's website for more information.",
      waiverUrl: "https://www.inbalanceyogastudio.com/new-students/",
      waiverText: "In Balance Yoga Online Waiver (Required for new students)",
    },
    stayConnected: {
      instagram: "@seanclark21foundation",
      contactName: "IBY @ 540-961-1030",
      email: "reachout@seanclark21foundation.org"
    }
  },
  {
    id: 5,
    slug: "dodgeball-tournament-throw-kindness-dodge-hate-5",
    title: "DODGEBALL TOURNAMENT — THROW KINDNESS DODGE HATE",
    shortTitle: "Dodgeball Tournament",
    date: "May 31, 2026",
    isoDate: "2026-05-31T12:00:00-05:00",
    timezone: "America/Chicago",
    location: { name: "St. Thomas Aquinas Gym", address: "11411 South Pflumm Rd, Overland Park, KS 66210" },
    cost: "$120 - Per 6 Person Team",
    category: "Fundraiser",
    landingImage: "/events/dodgeball/event.png",
    image: "/events/dodgeball/event.png",
    heroImage: "/events/dodgeball/flyer1.jpeg",
    organizer: "Clark21 Foundation",
    contactEmail: "reachout@seanclark21foundation.org",
    formUrl: "https://givebutter.com/throw-kindness-dodge-hate-dodgeball-tournament",
    description:
      "Think you've got the reflexes to dodge, dip, and dive your way to victory? Gather your team and join us for an action-packed Dodgeball Tournament! Get ready for a day of high-energy competition and community spirit. Whether you’re here for the glory or just the laughs, there’s a court waiting for you.",
    tags: ["Fundraiser", "Sports", "Community", "Fun"],
    itinerary: [
      { time: "12:00 PM", title: "Team Check-In & Warm-Up", detail: "Register your team and stretch it out." },
      { time: "12:30 PM", title: "Opening Remarks & Group Photo", detail: "Round-robin games across all registered teams." },
      { time: "1:00 PM", title: "First Game Whistle", detail: "Top teams advance to single-elimination brackets." },
    ],
    knowBeforeYouGo: [
      { label: "Attire", detail: "Tennis shoes only." },
      { label: "Stay Hydrated", detail: "Bring a reusable water bottle! Water fountains are available in the Commons." },
      { label: "Parking", detail: "Please park in the south parking lot of Saint Thomas Aquinas and enter through the south Commons doors." },
      { label: "The Extras", detail: "Stick around for our Gift Card Raffle, and the crowning of the Best Dressed Team and Most Spirited Player." },
    ],
    registration: {
      pricePlayers: "$120 for a team of 6 ($20 per person)",
      priceSpectators: "$10 suggested donation at the door",
      rules: [
        "Team Captains, please complete one registration form for the whole team and complete payment.",
        "All teams must be 6 players and are welcome to be co-ed.",
        "Players are allowed to register with more than one team, however players are limited to one team per division."
      ],
      donationOnly: "Please select 'Other' and enter your donation amount. For all team registration questions, please type N/A.",
      waiverUrl: "https://docs.google.com/forms/d/example-waiver", // Placeholder URL
      waiverText: "Throw Kindness, Dodge Hate Dodgeball Tournament Participant Waiver",
      waiverNote: "Every participant must submit a digital waiver via the link above. Team Captains, please send this link to all players in your team to fill out before the tournament."
    },
    divisions: [
      { 
        level: "Just for Fun", 
        tag: "“A Friend to All” Level", 
        color: "#4CAF50", // Green ball
        description: "This is dodgeball for the vibes. You're here for laughs, light tosses, and maybe a dramatic slow-motion dodge or two. If your main goal is to break a light sweat and make some friends, welcome home." 
      },
      { 
        level: "Intermediate", 
        tag: "“Reach Out” Level", 
        color: "#FFEB3B", // Yellow ball
        description: "This is where fun meets firepower. You've graduated from 'just happy to be here' to 'actually trying to win.' You know how to aim, you're not afraid to take a hit, and you definitely keep score. Expect quick throws, solid strategy, and a healthy dose of competitive spirit." 
      },
      { 
        level: "Hyper-Competitive", 
        tag: "“Premier SC21” Level", 
        color: "#F44336", // Red ball
        description: "This division is fast, fierce, and fearless. Throws are sharp, catches are clutch, and mercy is in short supply. These teams thrive on strategy, intimidation, and total court control. If you hear the whistle and see nothing but targets, you've found your division." 
      }
    ],
    grandPrize: "The Championship Team in every division walks away with a $300 grand prize ($50 per player)!",
    awards: [
      { 
        title: "Best Dressed Team", 
        description: "Whether it’s full-blown superheroes, retro 80s gym class, or custom-printed puns, we want to see it. This award goes to the squad with the most creative uniform." 
      },
      { 
        title: "Most Spirited Player", 
        description: "This is for the person whose energy never dips below 100%. Maybe they have the loudest cheer, the most dramatic (but clean) dodge, or they’re the first to high-five the opposing team. We’re looking for the heart of the tournament." 
      },
      { 
        title: "Gift Card Raffle", 
        description: "Not feeling lucky on the court? No problem. We’ll be drawing raffle winners throughout the afternoon." 
      }
    ],
    stayConnected: {
      instagram: "@seanclark21foundation",
      contactName: "Isabel Clark",
      phone: "816-616-6624",
      email: "reachout@seanclark21foundation.org"
    }
  },
];

/** Look up an event by URL slug */
export function getEventBySlug(slug) {
  return EVENTS.find((e) => e.slug === slug) || null;
}
