// Lore, mythology, and ephemera for Lunar Chaperone workbooks

export interface LunarMyth {
  culture: string;
  deity: string;
  story: string;
  lesson: string;
  phase?: string;
}

export interface ZodiacLore {
  sign: string;
  mythology: string;
  archetype: string;
  shadow: string;
  gift: string;
  ancientName: string;
}

export interface LunarEphemera {
  category: string;
  items: {
    name: string;
    description: string;
    use: string;
  }[];
}

export interface HistoricalTradition {
  name: string;
  origin: string;
  period: string;
  practice: string;
  modernApplication: string;
}

export const lunarMyths: LunarMyth[] = [
  {
    culture: "Greek",
    deity: "Selene",
    story: "Selene, the titan goddess of the moon, drove her silver chariot across the night sky. She fell in love with the mortal Endymion and asked Zeus to grant him eternal sleep so she could visit him nightly without him aging.",
    lesson: "The moon's love is eternal but requires surrender; we cannot possess what illuminates us.",
    phase: "Full Moon"
  },
  {
    culture: "Egyptian",
    deity: "Thoth",
    story: "Thoth, the ibis-headed god, won five extra days from the moon in a game of dice, allowing Nut to birth her children. He became the keeper of lunar time and divine wisdom.",
    lesson: "Intelligence and patience can expand time itself; the moon teaches us to work with cycles rather than against them.",
    phase: "Crescent"
  },
  {
    culture: "Sumerian",
    deity: "Nanna/Sin",
    story: "Nanna, the father of the sun and Venus, sailed across the sky in a luminous boat. Each month he died and was reborn, teaching humanity the mysteries of cyclical existence.",
    lesson: "Death and rebirth are not opposites but a continuous journey; the moon is our oldest teacher of resurrection.",
    phase: "New Moon"
  },
  {
    culture: "Chinese",
    deity: "Chang'e",
    story: "Chang'e swallowed an immortality elixir and floated to the moon, where she lives eternally with a jade rabbit. Her husband Houyi gazes up at her each full moon.",
    lesson: "Immortality comes with isolation; the moon reminds us that transcendence has its costs.",
    phase: "Full Moon"
  },
  {
    culture: "Hindu",
    deity: "Chandra",
    story: "Chandra, the moon god, was cursed to wax and wane eternally after favoring one wife over others. His cycle became a teaching on the impermanence of favor and fortune.",
    lesson: "What grows must also diminish; attachment to fullness creates suffering.",
    phase: "Last Quarter"
  },
  {
    culture: "Norse",
    deity: "Máni",
    story: "Máni guides the moon across the sky while being chased by the wolf Hati. At Ragnarök, the wolf will finally catch and devour the moon.",
    lesson: "Even celestial bodies are not permanent; the moon teaches us to live fully knowing endings come.",
    phase: "Balsamic"
  },
  {
    culture: "Japanese",
    deity: "Tsukuyomi",
    story: "Tsukuyomi killed the food goddess Uke Mochi out of disgust at how she produced food. His sister Amaterasu was so horrified she refused to look at him, separating day and night forever.",
    lesson: "Actions have eternal consequences; the moon's solitary path reflects the weight of irreversible choices.",
    phase: "Last Quarter"
  },
  {
    culture: "Aztec",
    deity: "Coyolxauhqui",
    story: "Coyolxauhqui was dismembered by her brother Huitzilopochtli and her body parts thrown into the sky, becoming the moon. She reassembles herself monthly.",
    lesson: "Fragmentation precedes wholeness; the moon's cycle is one of perpetual healing and reunion.",
    phase: "Gibbous"
  }
];

export const zodiacLore: ZodiacLore[] = [
  {
    sign: "Aries",
    mythology: "The golden ram Chrysomallus who rescued Phrixus and Helle, later sacrificed and hung in the grove of Ares as the Golden Fleece.",
    archetype: "The Warrior, The Pioneer, The Innocent Hero",
    shadow: "Aggression, Impatience, Self-centeredness",
    gift: "The courage to begin, the fire of initiation",
    ancientName: "The Ram of the Golden Fleece"
  },
  {
    sign: "Taurus",
    mythology: "Zeus transformed into a white bull to carry Europa across the sea to Crete, where he revealed his true form.",
    archetype: "The Earth Mother, The Builder, The Sensualist",
    shadow: "Stubbornness, Possessiveness, Inertia",
    gift: "The ability to create lasting beauty and stability",
    ancientName: "The Bull of Heaven"
  },
  {
    sign: "Gemini",
    mythology: "Castor and Pollux, the divine twins—one mortal, one immortal. When Castor died, Pollux shared his immortality, and they alternate between Olympus and Hades.",
    archetype: "The Messenger, The Trickster, The Eternal Youth",
    shadow: "Superficiality, Duplicity, Restlessness",
    gift: "The bridge between worlds, the power of communication",
    ancientName: "The Great Twins"
  },
  {
    sign: "Cancer",
    mythology: "The crab Karkinos sent by Hera to distract Heracles during his battle with the Hydra. Though crushed underfoot, Hera placed it in the stars for its loyalty.",
    archetype: "The Mother, The Nurturer, The Oracle",
    shadow: "Clinginess, Moodiness, Manipulation through emotion",
    gift: "The capacity to create home and hold memory",
    ancientName: "The Crab of the Tides"
  },
  {
    sign: "Leo",
    mythology: "The Nemean Lion with impenetrable golden fur, slain by Heracles as his first labor. Zeus placed it in the stars to honor its ferocity.",
    archetype: "The King/Queen, The Performer, The Child of the Sun",
    shadow: "Pride, Vanity, Domination",
    gift: "The radiance of authentic self-expression and joy",
    ancientName: "The Lion of Nemea"
  },
  {
    sign: "Virgo",
    mythology: "Astraea, the virgin goddess of innocence and purity, last of the immortals to leave Earth. She returns when humanity returns to the Golden Age.",
    archetype: "The Healer, The Analyst, The Sacred Servant",
    shadow: "Criticism, Perfectionism, Self-denial",
    gift: "The ability to discern essence and serve truth",
    ancientName: "The Maiden of the Harvest"
  },
  {
    sign: "Libra",
    mythology: "The scales held by Astraea to measure souls, or the scales of Maat weighing hearts against the feather of truth.",
    archetype: "The Diplomat, The Artist, The Peacemaker",
    shadow: "Indecision, People-pleasing, Avoidance of conflict",
    gift: "The creation of harmony and the perception of beauty",
    ancientName: "The Scales of Justice"
  },
  {
    sign: "Scorpio",
    mythology: "The scorpion sent by Gaia to slay Orion for his boasting. They were placed on opposite sides of the sky, forever chasing but never meeting.",
    archetype: "The Shaman, The Detective, The Phoenix",
    shadow: "Jealousy, Obsession, Destruction",
    gift: "The power of transformation and regeneration",
    ancientName: "The Scorpion of the Depths"
  },
  {
    sign: "Sagittarius",
    mythology: "Chiron, the wise centaur who taught heroes and chose mortality to end his suffering, placed in stars as the archer aiming toward truth.",
    archetype: "The Philosopher, The Explorer, The Guru",
    shadow: "Excess, Dogmatism, Escapism",
    gift: "The arrow of meaning that pierces illusion",
    ancientName: "The Centaur of Wisdom"
  },
  {
    sign: "Capricorn",
    mythology: "Pricus, the sea-goat who could manipulate time, watching his children lose their fish tails and climb ashore. Unable to stop evolution, he joined the stars in solitude.",
    archetype: "The Father, The Authority, The Master Builder",
    shadow: "Coldness, Ruthless ambition, Rigidity",
    gift: "The wisdom to build structures that outlast lifetimes",
    ancientName: "The Sea-Goat of Time"
  },
  {
    sign: "Aquarius",
    mythology: "Ganymede, the beautiful mortal carried to Olympus by Zeus's eagle to serve as cupbearer to the gods, pouring out divine nectar.",
    archetype: "The Revolutionary, The Humanitarian, The Genius",
    shadow: "Detachment, Eccentricity, Superiority",
    gift: "The vision to see humanity's potential future",
    ancientName: "The Water-Bearer of the Gods"
  },
  {
    sign: "Pisces",
    mythology: "Aphrodite and Eros transformed into fish and tied themselves together to escape the monster Typhon, swimming up the Euphrates to safety.",
    archetype: "The Mystic, The Dreamer, The Martyr",
    shadow: "Escapism, Victimhood, Dissolution of boundaries",
    gift: "The ability to dissolve into the cosmic ocean and return",
    ancientName: "The Fishes of the Deep"
  }
];

export const lunarEphemera: LunarEphemera[] = [
  {
    category: "Victorian Moon Superstitions",
    items: [
      {
        name: "Money Turning",
        description: "Turn silver coins in your pocket when first seeing the new moon to ensure financial growth",
        use: "Modern adaptation: Set financial intentions at the new moon while holding silver jewelry"
      },
      {
        name: "Moon Gazing Glass",
        description: "Special mirrors used only for viewing the moon's reflection, believed to capture lunar magic",
        use: "Use any mirror to reflect moonlight into your space for passive charging"
      },
      {
        name: "Curtseying to the Moon",
        description: "Young women would curtsey to the new moon for good luck in love",
        use: "Bow or gesture of respect toward the new moon while setting romantic intentions"
      }
    ]
  },
  {
    category: "Lunar Gardening Traditions",
    items: [
      {
        name: "Above/Below Ground Planting",
        description: "Plant above-ground crops during waxing moon, root vegetables during waning moon",
        use: "Apply the principle metaphorically: grow visible projects waxing, develop roots waning"
      },
      {
        name: "Moon Signs for Planting",
        description: "Plant in water signs (Cancer, Scorpio, Pisces) for best germination",
        use: "Start new emotional or creative projects when moon is in water signs"
      },
      {
        name: "Harvest by Moonlight",
        description: "Medicinal herbs gathered under full moonlight were believed most potent",
        use: "Charge herbs, crystals, or water under full moonlight for ritual use"
      }
    ]
  },
  {
    category: "Sailor Moon Lore",
    items: [
      {
        name: "Moon Dogs",
        description: "Halos around the moon predicting weather; sailors read them for storm warnings",
        use: "Observe lunar halos as invitations for introspection before 'storms' arrive"
      },
      {
        name: "The Moon Eats Clouds",
        description: "When the moon 'ate' clouds (passed behind them), sailors expected clear weather",
        use: "Notice what 'clouds' in your life the moon seems to be dissolving"
      },
      {
        name: "Moon Runs the Tides",
        description: "Practical knowledge of lunar influence on ocean tides for navigation",
        use: "Track your emotional tides in correlation with lunar phases"
      }
    ]
  },
  {
    category: "Witchcraft Traditions",
    items: [
      {
        name: "Drawing Down the Moon",
        description: "Ritual invocation of the goddess into a priestess during full moon ceremonies",
        use: "Meditate on embodying lunar qualities: receptivity, reflection, cycles"
      },
      {
        name: "Moon Water",
        description: "Water charged under specific moon phases for various magical purposes",
        use: "Charge water under full moon for blessing, new moon for cleansing"
      },
      {
        name: "Esbat Celebrations",
        description: "Full moon gatherings for magical workings and goddess worship",
        use: "Create personal full moon rituals even as a solitary practitioner"
      }
    ]
  }
];

export const historicalTraditions: HistoricalTradition[] = [
  {
    name: "Babylonian Lunar Calendar",
    origin: "Mesopotamia",
    period: "c. 1800 BCE",
    practice: "Priests observed the first visible crescent to begin each month; days were numbered from this sighting",
    modernApplication: "Begin personal months at the new moon with intention-setting rather than January 1st"
  },
  {
    name: "Roman Calends, Nones, and Ides",
    origin: "Rome",
    period: "c. 700 BCE",
    practice: "Calends marked new moon, Nones the first quarter, Ides the full moon. Debts were due on Calends.",
    modernApplication: "Structure monthly finances and completions around lunar phases rather than arbitrary dates"
  },
  {
    name: "Islamic Lunar Months",
    origin: "Arabia",
    period: "622 CE onward",
    practice: "Each month begins with the sighting of the new crescent; Ramadan's timing follows the moon",
    modernApplication: "Connect spiritual practices to the actual visible lunar phase rather than fixed calendar dates"
  },
  {
    name: "Chinese Lunar New Year",
    origin: "China",
    period: "c. 2000 BCE",
    practice: "New Year falls on the second new moon after winter solstice; 15-day celebration ends at full moon",
    modernApplication: "Create personal 'new years' at lunations that feel significant to your own cycles"
  },
  {
    name: "Celtic Ogham Moon Months",
    origin: "Ireland/Scotland",
    period: "c. 400 CE",
    practice: "Tree months aligned with lunar cycles; each moon had associated trees, animals, and powers",
    modernApplication: "Create personal correspondences between moons and meaningful symbols in your life"
  },
  {
    name: "Native American Moon Names",
    origin: "North America",
    period: "Pre-colonial",
    practice: "Each full moon named for natural phenomena: Wolf Moon, Strawberry Moon, Harvest Moon",
    modernApplication: "Name your personal moons based on what's happening in your life each cycle"
  }
];

// Helper functions
export const getMythsForPhase = (phase: string): LunarMyth[] => {
  return lunarMyths.filter(m => m.phase?.toLowerCase() === phase.toLowerCase());
};

export const getLoreForSign = (sign: string): ZodiacLore | undefined => {
  return zodiacLore.find(l => l.sign.toLowerCase() === sign.toLowerCase());
};

export const getEphemeraByCategory = (category: string): LunarEphemera | undefined => {
  return lunarEphemera.find(e => e.category.toLowerCase().includes(category.toLowerCase()));
};
