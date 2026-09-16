/** Central types + defaults for all editable site content. */

export interface MusicPlayerTrack {
  title: string;
  artist: string;
  album: string;
  audioUrl?: string;
  notes?: number[];
  tempo?: number;
  art?: { from: string; to: string; emoji: string; imageUrl?: string };
}

export interface CdMix {
  title: string;
  vol: string;
  vibe: string;
  from: string;
  to: string;
  emoji: string;
  tracks: string[];
  coverImageUrl?: string;
  audioUrl?: string;
}

export interface AboutStat {
  label: string;
  value: string;
}

export interface AboutFaq {
  q: string;
  a: string;
}

export interface PlaylistTrackItem {
  title: string;
  artist: string;
  audioUrl?: string;
  mediaId?: string;
}

export interface HomepageContent {
  tagline: string;
  subtitle: string;
  welcomeHeading: string;
  welcomeMessage: string;
  currentObsession: string;
  songOfTheWeek: { title: string; artist: string; note: string; audioUrl?: string };
  mood: string;
  quote: string;
  polaroidCaption: string;
  polaroidImageUrl?: string;
  stickerImageUrl?: string;
  guestbookCta: string;
  aboutCta: string;
  sectionsHeading: string;
  moodStickyFallback: string;
  quoteStickyFallback: string;
}

export interface SidebarContent {
  clock: { title: string; timezoneLabel: string };
  visitor: { startCount: number; title: string; message: string };
  status: {
    title: string;
    onlineText: string;
    favSong: string;
    statusMsg: string;
    lastUpdated: string;
    moodFallback: string;
  };
  quote: { title: string; attribution: string; fallback: string };
  pixelPet: { title: string; name: string; feedButton: string; hungryMsg: string; fedMsg: string; fullMsg: string; imageUrl?: string };
  weather: { title: string; temp: string; description: string; forecast: string[]; iconUrl?: string };
  calendar: { title: string; footerNote: string; specialDay: number; heartDay: number; month?: number; year?: number; imageUrl?: string };
  blinkies: { title: string; items: { text: string; bg: string; imageUrl?: string }[] };
  bestFriends: { title: string; friends: { name: string; emoji: string; note: string; avatarUrl?: string }[] };
  obsession: { title: string; fallback: string; wishlist: string[] };
  musicPlayerTitle: string;
}

export interface ChromeContent {
  marquee: { items: string[]; speed: string };
  nav: { brand: string; menuOpen: string; menuClose: string; tabs: { href: string; label: string; icon: string }[] };
  footer: {
    buttonWallTitle: string;
    buttons: { text: string; bg: string }[];
    signoff: string;
    copyright: string;
    stickerLeft: string;
    stickerRight: string;
  };
}

export interface BagItem {
  emoji: string;
  label: string;
  note: string;
  pos: string;
  arrowSide: "left" | "right";
  imageUrl?: string;
}

export interface BagContent {
  heading: string;
  sticker: string;
  intro: string;
  bagLabel: string;
  items: BagItem[];
}

export interface TeaserItem {
  href: string;
  title: string;
  blurb: string;
  emoji: string;
  bg: string;
  rotate: number;
  tag: string;
  imageUrl?: string;
}

export interface PageHeaderSticker {
  text: string;
  palette: number;
  rotate: number;
}

export interface PageHeaderConfig {
  title: string;
  subtitle: string;
  stickers: PageHeaderSticker[];
}

export interface PagesContent {
  blog: PageHeaderConfig;
  diary: PageHeaderConfig;
  photoDump: PageHeaderConfig;
  playlists: PageHeaderConfig;
  quizzes: PageHeaderConfig;
  style: PageHeaderConfig;
  girlhood: PageHeaderConfig;
  collections: PageHeaderConfig;
  guestbook: PageHeaderConfig;
  about: PageHeaderConfig;
  playlistsStickyNote: string;
}

export interface AboutPageContent {
  stats: AboutStat[];
  faq: AboutFaq[];
  polaroidCaption: string;
  polaroidImageUrl?: string;
  stickerText: string;
  introHeading: string;
  faqHeading: string;
}

export interface GirlhoodContent {
  bucketList: { heading: string; sticker: string; intro: string; items: { text: string; done: boolean }[] };
  smileNotes: { heading: string; sticker: string; notes: { text: string; color: string; rotate: number; font: string }[] };
  lifeLately: {
    heading: string;
    updates: { tag: string; text: string; bg: string }[];
    polaroids: { caption: string; kind: string; imageUrl?: string }[];
  };
}

export interface CollectionsContent {
  candy: {
    heading: string;
    sticker: string;
    intro: string;
    items: { name: string; price: string; emoji: string; note: string; bg: string; imageUrl?: string }[];
  };
  treasure: {
    heading: string;
    sticker: string;
    valuation: string;
    items: { emoji: string; name: string; detail: string; rarity: string; imageUrl?: string }[];
  };
  cdArchiveTitle: string;
  cdArchiveSticker: string;
  cdMixedBy: string;
}

export interface QuizzesContent {
  thisOrThat: {
    heading: string;
    sticker: string;
    intro: string;
    pairs: [string, string][];
    verdictHigh: string;
    verdictMid: string;
    verdictLow: string;
    verdictFooter: string;
  };
  vibeQuiz: {
    heading: string;
    sticker: string;
    questions: { q: string; options: { text: string; vibe: string }[] }[];
    results: Record<string, { title: string; emoji: string; desc: string; from: string; to: string }>;
  };
}

export interface StyleContent {
  moodboard: {
    heading: string;
    sticker: string;
    tiles: { label: string; note: string; bg: string; span?: string; rotate: number; emoji: string; imageUrl?: string }[];
  };
  clippings: {
    heading: string;
    sticker: string;
    items: { headline: string; source: string; body: string; rotate: number; bg: string }[];
    styleRule: string;
  };
}

export interface GuestbookContent {
  moods: string[];
  formTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  moodLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitText: string;
  successText: string;
  listHeading: string;
  loadingText: string;
  emptyText: string;
}

export interface SongOfTheWeekContent {
  title: string;
  artist: string;
  note: string;
  widgetTitle: string;
  disclaimer: string;
  audioUrl?: string;
  coverImageUrl?: string;
}

export interface SiteContent {
  homepage: HomepageContent;
  sidebar: SidebarContent;
  chrome: ChromeContent;
  bag: BagContent;
  teasers: TeaserItem[];
  pages: PagesContent;
  musicPlayer: { tracks: MusicPlayerTrack[] };
  cdMixes: CdMix[];
  about: AboutPageContent;
  girlhood: GirlhoodContent;
  collections: CollectionsContent;
  quizzes: QuizzesContent;
  style: StyleContent;
  guestbook: GuestbookContent;
  songOfTheWeek: SongOfTheWeekContent;
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  homepage: {
    tagline: "your favourite corner of the internet ★",
    subtitle: "a little scrapbook of girlhood ~ est. 2007 ~ updated after school & homework (sometimes during)",
    welcomeHeading: "heyyy u found my website!! ♥",
    welcomeMessage:
      "heyyy u found my website!! i like SRK movies, gel pens, radio mirchi & collecting tazos from lays packets.",
    currentObsession: "burning the PERFECT mix CD (vol. 7) 💿",
    songOfTheWeek: { title: "Kabhi Kabhi Aditi", artist: "Rashid Ali", note: "kabhi kabhi aditi zindagi mein yun hi koi apna lagta hai... ♪" },
    mood: "dreamy but also hungry 🌸🍜",
    quote: "Kuch kuch hota hai, tum nahi samjhoge",
    polaroidCaption: "me (artist's impression)",
    guestbookCta: "✍️ sign my guestbook!!",
    aboutCta: "💖 about me",
    sectionsHeading: "pick a page, any page!",
    moodStickyFallback: "unknown",
    quoteStickyFallback: "life is a mystery to be lived, not a problem to be solved",
  },
  sidebar: {
    clock: { title: "🕐 clock.exe", timezoneLabel: "indian standard timeee ☀️" },
    visitor: { startCount: 247, title: "👀 hit counter", message: "ur visitor #{count}! ♥ thx 4 coming" },
    status: {
      title: "💬 shankie's status",
      onlineText: "online (obviously)",
      favSong: '"Woh Lamhe" ~ zeher 💿',
      statusMsg: "*~AnGeL~* dnt tlk 2 me b4 my maggi k thx",
      lastUpdated: "yesterday, 11:47pm",
      moodFallback: "dreamy but also hungry 🌸🍜",
    },
    quote: { title: "📜 quote of the day", attribution: "— rahul (via SRK, via me)", fallback: "Kuch kuch hota hai, tum nahi samjhoge" },
    pixelPet: {
      title: "🐹 pixel pet: laddoo",
      name: "laddoo",
      feedButton: "feed laddoo 🍬",
      hungryMsg: "he is hungry!!",
      fedMsg: "fed {count}x today",
      fullMsg: "ok he's full. stop.",
    },
    weather: {
      title: "🌤️ weather @ my colony",
      temp: "31°C",
      description: "perfect 4 terrace + kite + nimbu pani",
      forecast: ["MON 32°", "TUE 30°", "WED 🌧️ 27°", "THU 31°"],
    },
    calendar: { title: "📅 july 2007 (in my heart)", footerNote: "7th = return priya's slam book!!", specialDay: 7, heartDay: 14 },
    blinkies: {
      title: "✨ my blinkie collection",
      items: [
        { text: "☆ certified drama queen ☆", bg: "linear-gradient(90deg,#ff1f8f,#ff77c8)" },
        { text: "♥ SRK ki fan ♥", bg: "linear-gradient(90deg,#8a2be2,#cfa6ff)" },
        { text: "✿ powered by maggi ✿", bg: "linear-gradient(90deg,#ff8a00,#ffe135)" },
        { text: "★ 2 cool 4 skool ★", bg: "linear-gradient(90deg,#00d9ff,#2fe0c8)" },
        { text: "♫ radio mirchi 98.3 ♫", bg: "linear-gradient(90deg,#e6007e,#ff8a00)" },
      ],
    },
    bestFriends: {
      title: "👯 my top 4 (dont fight)",
      friends: [
        { name: "Priya", emoji: "👧🏽", note: "bench partner 4eva" },
        { name: "Meenu", emoji: "👩🏽‍🦱", note: "shares her tiffin" },
        { name: "Aisha", emoji: "🧕🏽", note: "cassette dealer" },
        { name: "Ritu di", emoji: "👭🏽", note: "teaches me mehendi" },
      ],
    },
    obsession: {
      title: "💘 current obsession",
      fallback: "burning the PERFECT mix CD (vol. 7) 💿",
      wishlist: [
        "🎀 gel pens (the 24 set!!)",
        "📱 nokia 3220 w/ light-up sides",
        "💿 dhoom 2 original CD (not pirated)",
        "📖 new archies stationery",
        "👖 low-waist jeans like kareena",
      ],
    },
    musicPlayerTitle: "SHANKIE'S PROFILE SONG PLAYER v2.0",
  },
  chrome: {
    marquee: {
      items: [
        "★ welcome 2 shankie's ★",
        "u are visitor no. 000247 !!",
        "plz sign my guestbook b4 u leave",
        "currently obsessed: SRK in DDLJ (again)",
        "new diary entry up!! omg",
        "best viewed in 800x600 hehe",
        "no right-clicking! respect da artist",
        "add me on orkut: shankie_angel_93",
        "brb maggi break 🍜",
        "song of da week: kabhi kabhi aditi ♫",
      ],
      speed: "38s",
    },
    nav: {
      brand: "Shankie's ✿",
      menuOpen: "menu ☰",
      menuClose: "close ✖",
      tabs: [
        { href: "/", label: "Home", icon: "🏠" },
        { href: "/blog", label: "Blog", icon: "📝" },
        { href: "/diary", label: "Diary", icon: "📔" },
        { href: "/photo-dump", label: "Photo Dump", icon: "📸" },
        { href: "/playlists", label: "Playlists", icon: "🎧" },
        { href: "/quizzes", label: "Quizzes", icon: "❓" },
        { href: "/style", label: "Style Files", icon: "👛" },
        { href: "/girlhood", label: "Girlhood", icon: "🎀" },
        { href: "/collections", label: "Collections", icon: "🍬" },
        { href: "/guestbook", label: "Guestbook", icon: "✍️" },
        { href: "/about", label: "About Me", icon: "💖" },
      ],
    },
    footer: {
      buttonWallTitle: "~ button wall (collect them all!) ~",
      buttons: [
        { text: "made with ♡", bg: "linear-gradient(90deg,#ff1f8f,#8a2be2)" },
        { text: "best in IE6 lol", bg: "linear-gradient(90deg,#0a51c2,#00d9ff)" },
        { text: "GIRL POWERED", bg: "linear-gradient(90deg,#e6007e,#ff8a00)" },
        { text: "anti-flat-UI club", bg: "linear-gradient(90deg,#2fe0c8,#0a9396)" },
        { text: "orkut 4eva", bg: "linear-gradient(90deg,#ff77c8,#cfa6ff)" },
        { text: "88x31 gang", bg: "linear-gradient(90deg,#ffe135,#ff8a00)" },
        { text: "no copying!!", bg: "linear-gradient(90deg,#8a2be2,#ff1f8f)" },
        { text: "dial-up warrior", bg: "linear-gradient(90deg,#3d6cb4,#87d4f5)" },
      ],
      signoff: "hand-coded with notepad.exe, glitter & maggi breaks · est. 2007 · last updated: yesterday after school",
      copyright: "© shankie's ★ plz don't steal my graphics, i made them in MS Paint",
      stickerLeft: "xoxo",
      stickerRight: "TTYL!",
    },
  },
  bag: {
    heading: "WHAT'S IN MY BAG?",
    sticker: "snoop alert!",
    intro: "as demanded by priya. yes everything smells faintly of mango bite. no i will not apologise.",
    bagLabel: "my trusty basta",
    items: [
      { emoji: "✏️", label: "Natraj pencil (chewed)", note: "the red-black stripes r iconic", pos: "top-[6%] left-[2%]", arrowSide: "left" },
      { emoji: "📐", label: "Camlin geometry box", note: "compass = weapon of choice", pos: "top-[4%] right-[2%]", arrowSide: "right" },
      { emoji: "📓", label: "Classmate notebook", note: "brown plastic cover DONE BY PAPA", pos: "top-[36%] left-[0%]", arrowSide: "right" },
      { emoji: "🍬", label: "Poppins + Mango Bite", note: "will share ONLY if ur nice", pos: "top-[34%] right-[0%]", arrowSide: "left" },
      { emoji: "🖊️", label: "gel pens (glitter blue)", note: "borrowed... never returning", pos: "bottom-[26%] left-[1%]", arrowSide: "right" },
      { emoji: "💿", label: "mix CD vol. 6", note: "burned @ raju cyber café, ₹20", pos: "bottom-[24%] right-[1%]", arrowSide: "left" },
      { emoji: "📔", label: "slam book", note: "TOP SECRET. do not open.", pos: "bottom-[2%] left-[4%]", arrowSide: "right" },
      { emoji: "🧴", label: "strawberry lip balm", note: "smells like heaven tbh", pos: "bottom-[0%] right-[4%]", arrowSide: "left" },
    ],
  },
  teasers: [
    { href: "/diary", title: "dear diary...", blurb: "scanned pages from my top-secret notebook. washi tape included.", emoji: "📔", bg: "from-babypink to-bubblegum", rotate: -2, tag: "juicy!!" },
    { href: "/photo-dump", title: "photo dump", blurb: "polaroids, film strips & my messy collage wall. click 4 lightbox!", emoji: "📸", bg: "from-cyanpop/60 to-turq/60", rotate: 1.5, tag: "so cute" },
    { href: "/playlists", title: "playlists + winamp", blurb: "bollywood x avril x backstreet boys. burned CDs 4 lyf.", emoji: "🎧", bg: "from-lilac to-grape/50", rotate: -1, tag: "♫♫♫" },
    { href: "/quizzes", title: "quizzes: this or that", blurb: "what's ur vibe? poppins or phantom? take the quiz RIGHT NOW.", emoji: "❓", bg: "from-lemon to-tangerine/60", rotate: 2, tag: "OMG" },
    { href: "/style", title: "style files", blurb: "moodboards, magazine clippings & kareena-core fashion notes.", emoji: "👛", bg: "from-bubblegum to-lilac", rotate: -1.5, tag: "sooo fetch" },
    { href: "/girlhood", title: "girlhood ♡", blurb: "summer bucket list, things that made me smile, life lately.", emoji: "🎀", bg: "from-babypink to-lemon/70", rotate: 1, tag: "dreaming..." },
  ],
  pages: {
    blog: { title: "Blog", subtitle: "essays, stories & random thoughts ~", stickers: [] },
    diary: { title: "MY DIARY", subtitle: "scanned pages from my top-secret notebook. if u are priya: STOP READING. if u are anyone else: enjoy.", stickers: [{ text: "TOP SECRET!!", palette: 1, rotate: -6 }, { text: "juicy", palette: 0, rotate: 5 }, { text: "do not tell amma", palette: 2, rotate: -3 }] },
    photoDump: { title: "Photo Dump", subtitle: "polaroids, film strips & my messy collage wall.", stickers: [{ text: "so cute", palette: 1, rotate: 4 }, { text: "click me!", palette: 5, rotate: -3 }] },
    playlists: { title: "PLAYLISTS", subtitle: "my entire music empire: burned CDs, surviving cassettes & a profile song i change every full moon.", stickers: [{ text: "vol. up!!", palette: 3, rotate: -4 }, { text: "no skips", palette: 1, rotate: 5 }] },
    quizzes: { title: "QUIZZES", subtitle: "this or that, vibe checks & magazine-style personality tests. no wrong answers (some are wrong tho).", stickers: [{ text: "OMG", palette: 0, rotate: 5 }, { text: "choose wisely", palette: 4, rotate: -3 }] },
    style: { title: "STYLE FILES", subtitle: "moodboards, magazine clippings & kareena-core fashion notes.", stickers: [{ text: "sooo fetch", palette: 2, rotate: -4 }, { text: "the vision™", palette: 1, rotate: 6 }] },
    girlhood: { title: "GIRLHOOD", subtitle: "the soft archive: bucket lists, tiny joys & everything in between. handle with care (and glitter).", stickers: [{ text: "dreaming...", palette: 5, rotate: -4 }, { text: "soft launch", palette: 3, rotate: 5 }] },
    collections: { title: "COLLECTIONS", subtitle: "my museum of extremely important artifacts. entry fee: one poppins (orange, non-negotiable).", stickers: [{ text: "do not touch!!", palette: 1, rotate: -5 }, { text: "ok u can touch", palette: 2, rotate: 4 }] },
    guestbook: { title: "GUESTBOOK", subtitle: "leave a scrap!! sign before u leave like it's 2007.", stickers: [{ text: "xoxo", palette: 1, rotate: -5 }, { text: "sign here!", palette: 3, rotate: 4 }] },
    about: { title: "ABOUT ME", subtitle: "the official shankie dossier. handle with care.", stickers: [{ text: "main character", palette: 5, rotate: -4 }, { text: "verified", palette: 2, rotate: 5 }] },
    playlistsStickyNote: "track order is a SCIENCE: opener must slap, track 3 is for crying, last track must be \"it's my life\" or the CD is legally invalid.",
  },
  musicPlayer: {
    tracks: [
      { title: "Kabhi Kabhi Aditi", artist: "Rashid Ali", album: "Jaane Tu... Ya Jaane Na", notes: [64, 66, 67, 66, 64, 0, 62, 64, 66, 64, 62, 0, 60, 62, 64, 67, 66, 64, 62, 60], tempo: 200, art: { from: "#ff8a00", to: "#ffe135", emoji: "🌻" } },
      { title: "Woh Lamhe", artist: "Atif Aslam", album: "Zeher", notes: [57, 60, 62, 64, 62, 60, 57, 0, 55, 57, 60, 62, 60, 57, 55, 0], tempo: 260, art: { from: "#8a2be2", to: "#00d9ff", emoji: "🌙" } },
      { title: "Complicated", artist: "Avril Lavigne", album: "Let Go", notes: [67, 67, 66, 64, 0, 64, 66, 67, 71, 69, 67, 0, 66, 64, 62, 64], tempo: 210, art: { from: "#ff1f8f", to: "#3d1230", emoji: "🎸" } },
    ],
  },
  cdMixes: [
    { title: "rakhi rewind", vol: "VOL. 1", vibe: "for the school bus window seat", from: "#ff1f8f", to: "#ff8a00", emoji: "🚌", tracks: ["Kal Ho Naa Ho — title track", "BSB — I Want It That Way", "Chura Liya (remix, sorry)"] },
    { title: "monsoon meltdown", vol: "VOL. 2", vibe: "crying but make it scenic", from: "#8a2be2", to: "#00d9ff", emoji: "🌧️", tracks: ["Woh Lamhe — Atif", "Avril — I'm With You", "Tum Se Hi — Jab We Met"] },
  ],
  about: {
    stats: [
      { label: "name", value: "shankie (legal name: not ur business hehe)" },
      { label: "age", value: "14¾ (the ¾ is important)" },
      { label: "sign", value: "pisces ♓ (explains everything, says everyone)" },
      { label: "fav movie", value: "kuch kuch hota hai / jab we met (don't make me pick)" },
      { label: "fav actor", value: "SRK. next question." },
    ],
    faq: [
      { q: "y is the site so pink?", a: "wrong question. y is everything ELSE not this pink?" },
      { q: "did u really code this urself?", a: "yes!! view-source → notepad → trial & error → crying → glory." },
      { q: "who is the crush the mixtape is for?", a: "next question." },
    ],
    polaroidCaption: "artist's self portrait",
    stickerText: "it's giving main character",
    introHeading: "the official dossier",
    faqHeading: "FAQ (frequently avoided questions)",
  },
  girlhood: {
    bucketList: {
      heading: "SUMMER BUCKET LIST",
      sticker: "tap to check!",
      intro: "tap the stickers to check things off! (yes u may check off MY list. we share achievements here.)",
      items: [
        { text: "learn the full kajra re choreo (incl. the eyebrow part)", done: true },
        { text: "finish one classmate notebook with ONLY good handwriting", done: false },
        { text: "beat snake ii high score 1500 (current: 1247)", done: false },
        { text: "convince papa: CD player before boards", done: true },
        { text: "make friendship bands for the whole bench row", done: true },
        { text: "watch a movie FIRST DAY FIRST SHOW (any movie. the experience.)", done: false },
        { text: "perfect the maggi timing (2 min is a LIE, it's 3:40)", done: true },
        { text: "collect all 5 boomer tattoos this summer", done: false },
        { text: "write a letter & actually post it (archies card + everything)", done: false },
        { text: "terrace sleepover with meenu & the good blanket", done: true },
      ],
    },
    smileNotes: {
      heading: "things that made me smile",
      sticker: ":')",
      notes: [
        { text: "the kulfi wala remembered my order (pista, extra pista)", color: "#ffd1ec", rotate: -3, font: "font-indie" },
        { text: "found ₹10 in my raincoat pocket from LAST monsoon", color: "#fff9ae", rotate: 2, font: "font-marker" },
        { text: "amma sang along to lag jaa gale while making rotis", color: "#c9f4ff", rotate: -1, font: "font-indie" },
        { text: "priya saved me the window seat WITHOUT being asked", color: "#d4f7dc", rotate: 3, font: "font-comic" },
        { text: "new gel pen wrote its first word perfectly (it was 'hello')", color: "#e8dcff", rotate: -2, font: "font-indie" },
        { text: "power cut = whole colony on terraces = impromptu antakshari", color: "#ffe8b0", rotate: 1, font: "font-marker" },
        { text: "dog near the bus stop wagged SPECIFICALLY at me", color: "#ffd1ec", rotate: -4, font: "font-comic" },
        { text: "radio played woh lamhe RIGHT when i turned it on. fate.", color: "#c9f4ff", rotate: 2, font: "font-indie" },
      ],
    },
    lifeLately: {
      heading: "LIFE LATELY",
      updates: [
        { tag: "reading 📖", text: "malory towers (again) + tinkle digest no. 143. suppandi remains the greatest philosopher of our time.", bg: "from-lemon/70 to-tangerine/40" },
        { tag: "watching 📺", text: "kasautii at 8:30 with amma (i pretend i don't care. i care SO much). also: takeshi's castle dubbed. javed jaffrey deserves an oscar.", bg: "from-cyanpop/50 to-turq/40" },
        { tag: "learning ✍️", text: "bubble letters (mastered), mehendi peacock (in progress), trigonometry (we don't talk about it).", bg: "from-bubblegum/60 to-lilac/50" },
        { tag: "waiting for ⏳", text: "the new dhoom to release, my boomer tattoo collection to complete & the class picnic list to go up.", bg: "from-lilac/60 to-babypink" },
      ],
      polaroids: [
        { caption: "terrace office", kind: "sunset" },
        { caption: "research fuel", kind: "chai" },
      ],
    },
  },
  collections: {
    candy: {
      heading: "THE CANDY MUSEUM",
      sticker: "pocket money went here",
      intro: "curated from the school gate shop & the corner store uncle who KNOWS my order.",
      items: [
        { name: "Poppins", price: "₹5", emoji: "🌈", note: "the rainbow roll. orange ones are currency.", bg: "linear-gradient(135deg,#ff8a00,#ffe135)" },
        { name: "Phantom Cigarettes", price: "₹2", emoji: "🚬", note: "minty sticks 4 looking dramatic at the bus stop.", bg: "linear-gradient(135deg,#fff,#c9f4ff)" },
        { name: "Boomer", price: "₹1", emoji: "💪", note: "comes w/ tattoo. the tattoo is the point.", bg: "linear-gradient(135deg,#ff1f8f,#ffd1ec)" },
        { name: "Big Babol", price: "₹2", emoji: "🫧", note: "bubble bigger than ur face or it doesn't count.", bg: "linear-gradient(135deg,#ff77c8,#fff)" },
        { name: "Center Shock", price: "₹1", emoji: "⚡", note: "a jump scare in chewing gum form. offer to enemies.", bg: "linear-gradient(135deg,#ffe135,#2fe0c8)" },
        { name: "Kismi", price: "₹1", emoji: "💋", note: "the elaichi toffee of romance (as per the wrapper).", bg: "linear-gradient(135deg,#e6007e,#ffb3c6)" },
        { name: "Mango Bite", price: "₹0.50", emoji: "🥭", note: "lasts one bus stop if u don't crunch. i always crunch.", bg: "linear-gradient(135deg,#ffb703,#ffe135)" },
        { name: "Melody", price: "₹1", emoji: "🍫", note: "melody itni chocolaty kyun hai? ongoing investigation.", bg: "linear-gradient(135deg,#b07d48,#ffd1ec)" },
      ],
    },
    treasure: {
      heading: "the under-the-bed treasure box",
      sticker: "amma pls don't clean",
      valuation: "total estimated value: priceless (amma says ₹0)",
      items: [
        { emoji: "🃏", name: "tazos (complete pokémon set)", detail: "traded 3 lunches for the charizard one. zero regrets.", rarity: "LEGENDARY" },
        { emoji: "🖋️", name: "gel pen collection (24)", detail: "sorted by glitter density. the gold one is ceremonial.", rarity: "RARE" },
        { emoji: "📮", name: "archies cards (unsent)", detail: "bought 'thinking of you' cards for the aesthetic. thinking of no one specific. mostly.", rarity: "CLASSIFIED" },
        { emoji: "🪀", name: "wwe trump cards", detail: "undertaker card is bent but his stats remain undefeated.", rarity: "RARE" },
        { emoji: "📼", name: "recorded-from-radio tapes", detail: "each song starts 4 seconds late bc i had to run to press record.", rarity: "PRICELESS" },
        { emoji: "🎟️", name: "movie ticket stubs", detail: "including the mohabbatein one from when i was 6. it's vintage.", rarity: "VINTAGE" },
        { emoji: "🧲", name: "fridge magnet from goa", detail: "we did not go to goa. sharma aunty gave it. counts.", rarity: "COMMON" },
        { emoji: "🏅", name: "boomer tattoos (4/5)", detail: "left arm is a rotating gallery. amma disapproves (jealous).", rarity: "LIMITED" },
      ],
    },
    cdArchiveTitle: "the burned CD archive",
    cdArchiveSticker: "₹20 each @ cyber café",
    cdMixedBy: "mixed by shankie",
  },
  quizzes: {
    thisOrThat: {
      heading: "THIS or THAT",
      sticker: "choose wisely",
      intro: "tap ur pick!! there are no wrong answers except some answers are wrong (u know which).",
      pairs: [
        ["Poppins 🍬", "Phantom cigarettes 🚬(candy!)"],
        ["Big Babol 🫧", "Center Shock ⚡"],
        ["SRK 👑", "Hrithik 🕺"],
        ["Kareena 💅", "Preity 😊"],
        ["Orkut scraps 💌", "Yahoo! Messenger 💬"],
        ["Doordarshan 📺", "Channel V 🎤"],
        ["Maggi 🍜", "Kurkure 🌶️"],
        ["Gel pen ✒️", "Apsara pencil ✏️"],
        ["Auto ride 🛺", "Cycle double-seat 🚲"],
        ["Melody 🍫", "Kismi 💋"],
      ],
      verdictHigh: "classic 90s kid, respect ✊",
      verdictMid: "perfectly balanced, like a good thali 🍱",
      verdictLow: "hmm... trendsetter or menace? either way iconic 💅",
      verdictFooter: "u picked column A {count}/10 times. priya got 9. we are no longer speaking.",
    },
    vibeQuiz: {
      heading: "WHAT'S UR VIBE?",
      sticker: "no wrong answers",
      questions: [
        { q: "it's sunday 9am. u are...", options: [{ text: "watching rangoli on doordarshan & humming along 🎶", vibe: "filmi" }, { text: "blasting avril & 'cleaning' ur room (air guitar) 🎸", vibe: "rockstar" }, { text: "still in bed, decorating ur diary with gel pens ✒️", vibe: "dreamer" }] },
        { q: "ur school bag's most precious item?", options: [{ text: "shah rukh photo cut from filmfare, laminated 👑", vibe: "filmi" }, { text: "burned CD labelled 'DO NOT TOUCH' 💿", vibe: "rockstar" }, { text: "slam book with a tiny lock 🔒", vibe: "dreamer" }] },
        { q: "the class function needs a performance. u sign up for...", options: [{ text: "full bole-chudiyan choreography, 6 costume changes 💃", vibe: "filmi" }, { text: "lip-sync rock show w/ badminton racket guitar 🎤", vibe: "rockstar" }, { text: "backstage decoration committee (the REAL artists) 🎨", vibe: "dreamer" }] },
        { q: "pick an after-school snack ritual:", options: [{ text: "maggi + zoom tv countdown, screaming the rankings 🍜", vibe: "filmi" }, { text: "center shock while doing cycle stunts (dangerous. cool.) ⚡", vibe: "rockstar" }, { text: "melody + staring dramatically out the window 🌧️", vibe: "dreamer" }] },
        { q: "ur orkut 'about me' says:", options: [{ text: '"palat... palat... palat..." 🎬', vibe: "filmi" }, { text: '"sk8er girl. dnt msg if boring." 🛹', vibe: "rockstar" }, { text: '"⋆｡ﾟ☁︎｡⋆｡ ﾟ☾ ﾟ｡⋆ dreaming ⋆｡ﾟ"', vibe: "dreamer" }] },
      ],
      results: {
        filmi: { title: "FULL FILMI HEROINE", emoji: "🎬", desc: "ur life has background music only u can hear. train station scenes make u emotional. when it rains, it rains FOR u specifically. keep twirling, kuch kuch is always hota-ing in ur heart.", from: "#ff1f8f", to: "#ff8a00" },
        rockstar: { title: "COLONY ROCKSTAR", emoji: "🎸", desc: "avril taught u eyeliner, bon jovi taught u attitude. ur burned CDs are legendary, ur volume knob is broken (from use). the terrace is ur stadium & the pigeons are ur fans.", from: "#8a2be2", to: "#00d9ff" },
        dreamer: { title: "GEL PEN DREAMER", emoji: "🌙", desc: "ur diary has better world-building than most novels. u have 47 unfinished letters, all beautiful. u see a nice cloud and think about it for 3 days. never change, the scrapbooks need u.", from: "#ff77c8", to: "#cfa6ff" },
      },
    },
  },
  style: {
    moodboard: {
      heading: "MOODBOARD",
      sticker: "the vision™",
      tiles: [
        { label: "glitter lip gloss", note: "strawberry, obviously", bg: "linear-gradient(135deg,#ff77c8,#ffd1ec)", rotate: -2, emoji: "💄", span: "sm:col-span-2" },
        { label: "butterfly clips", note: "minimum 6 per hairstyle", bg: "linear-gradient(135deg,#cfa6ff,#00d9ff)", rotate: 2, emoji: "🦋" },
        { label: "low-waist jeans", note: "kareena in k3g. enough said.", bg: "linear-gradient(135deg,#87d4f5,#3d6cb4)", rotate: -1, emoji: "👖" },
        { label: "bindis but tiny", note: "the aishwarya effect", bg: "linear-gradient(135deg,#e6007e,#ff8a00)", rotate: 1.5, emoji: "🔴" },
        { label: "denim on denim", note: "preity said it's fine", bg: "linear-gradient(135deg,#5b8bd4,#a8c8f0)", rotate: -2.5, emoji: "🧢", span: "sm:col-span-2" },
        { label: "friendship bands", note: "wrist inventory: 11", bg: "linear-gradient(135deg,#2fe0c8,#ffe135)", rotate: 2, emoji: "🧵" },
        { label: "mehendi weekends", note: "ritu di's masterpieces", bg: "linear-gradient(135deg,#b07d48,#e0a458)", rotate: -1, emoji: "🌿" },
        { label: "shiny dupatta drama", note: "twirl radius: maximum", bg: "linear-gradient(135deg,#8a2be2,#ff1f8f)", rotate: 1, emoji: "🧣" },
      ],
    },
    clippings: {
      heading: "clippings & field notes",
      sticker: "glued w/ fevicol",
      items: [
        { headline: "GET THE LOOK: bole chudiyan but for school farewell", source: "~ torn from stardust, pg 42 ~", body: "lehenga? no budget. solution: mom's dupatta + safety pins (14) + confidence (unlimited). accessorize with ritu di's bangles & the tiny bindi. teachers said 'very nice beta' = fashion week approval.", rotate: -1.5, bg: "#fff3c4" },
        { headline: "TREND ALERT: avril studded belt (DIY edition)", source: "~ inspired by MTV, executed by me ~", body: "papa's old belt + silver sketch-pen dots = basically hot topic. wore it over my school uniform sweater exactly once before ma'am confiscated it. worth it. the belt is a martyr now.", rotate: 1.5, bg: "#e8dcff" },
        { headline: "HAIR FILES: the katrina waves experiment", source: "~ filmfare said 'effortless'. filmfare LIED ~", body: "slept in 6 tight braids for 'natural waves'. woke up looking like a startled maggi packet. meenu said it was 'a look'. it was, technically, a look. moving on to butterfly clips era.", rotate: -1, bg: "#ffd1ec" },
      ],
      styleRule: "style rule #1: if kareena wore it in a movie, it's automatically correct. no further debate.",
    },
  },
  guestbook: {
    moods: ["💖", "✨", "🌸", "🦋", "💿", "🍬", "🌙", "⭐"],
    formTitle: "leave a scrap!! ✍️",
    nameLabel: "ur name / screen name",
    namePlaceholder: "priya_gurl_4eva",
    moodLabel: "pick a mood",
    messageLabel: "ur message",
    messagePlaceholder: "omg ur site is sooo pretty...",
    submitText: "sign guestbook!! ♥",
    successText: "thx 4 signing!! xoxo ★",
    listHeading: "recent scraps",
    loadingText: "loading scraps...",
    emptyText: "be the first to sign!! ★",
  },
  songOfTheWeek: {
    title: "Kabhi Kabhi Aditi",
    artist: "Rashid Ali — Jaane Tu... Ya Jaane Na (2008)",
    note: "kabhi kabhi aditi zindagi mein yun hi koi apna lagta hai... ♪",
    widgetTitle: "🏆 song of the week",
    disclaimer: "(lyrics copied from the TV scroll, may contain errors, do not sue)",
  },
};

export function mergeSiteContent(saved: Partial<SiteContent> | null | undefined): SiteContent {
  const d = DEFAULT_SITE_CONTENT;
  if (!saved) return d;
  return {
    homepage: { ...d.homepage, ...saved.homepage, songOfTheWeek: { ...d.homepage.songOfTheWeek, ...saved.homepage?.songOfTheWeek } },
    sidebar: deepMerge(d.sidebar, saved.sidebar),
    chrome: deepMerge(d.chrome, saved.chrome),
    bag: { ...d.bag, ...saved.bag, items: saved.bag?.items?.length ? saved.bag.items : d.bag.items },
    teasers: saved.teasers?.length ? saved.teasers : d.teasers,
    pages: deepMerge(d.pages, saved.pages),
    musicPlayer: { tracks: saved.musicPlayer?.tracks?.length ? saved.musicPlayer.tracks : d.musicPlayer.tracks },
    cdMixes: saved.cdMixes?.length ? saved.cdMixes : d.cdMixes,
    about: { ...d.about, ...saved.about, stats: saved.about?.stats?.length ? saved.about.stats : d.about.stats, faq: saved.about?.faq?.length ? saved.about.faq : d.about.faq },
    girlhood: deepMerge(d.girlhood, saved.girlhood),
    collections: deepMerge(d.collections, saved.collections),
    quizzes: deepMerge(d.quizzes, saved.quizzes),
    style: deepMerge(d.style, saved.style),
    guestbook: { ...d.guestbook, ...saved.guestbook, moods: saved.guestbook?.moods?.length ? saved.guestbook.moods : d.guestbook.moods },
    songOfTheWeek: { ...d.songOfTheWeek, ...saved.songOfTheWeek },
  };
}

function deepMerge<T>(defaults: T, saved: Partial<T> | undefined): T {
  if (!saved) return defaults;
  const result = { ...defaults } as Record<string, unknown>;
  for (const key of Object.keys(saved)) {
    const val = (saved as Record<string, unknown>)[key];
    const def = (defaults as Record<string, unknown>)[key];
    if (val === undefined) continue;
    if (Array.isArray(val) && val.length > 0) {
      result[key] = val;
    } else if (val && typeof val === "object" && !Array.isArray(val) && def && typeof def === "object") {
      result[key] = deepMerge(def, val as Partial<typeof def>);
    } else {
      result[key] = val;
    }
  }
  return result as T;
}

export function parseAudioTracks(metadata: string): PlaylistTrackItem[] {
  try {
    const meta = JSON.parse(metadata) as { audioTracks?: PlaylistTrackItem[] };
    if (Array.isArray(meta.audioTracks)) return meta.audioTracks;
  } catch {
    // fall through
  }
  return [];
}

export function parsePlaylistTracks(metadata: string): PlaylistTrackItem[] {
  try {
    const meta = JSON.parse(metadata) as { playlistTracks?: PlaylistTrackItem[]; tracks?: string };
    if (Array.isArray(meta.playlistTracks)) return meta.playlistTracks;
    if (meta.tracks) {
      return meta.tracks
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          const [title, artist] = line.split(" — ");
          return { title: title?.trim() || line.trim(), artist: artist?.trim() || "" };
        });
    }
  } catch {
    // fall through
  }
  return [];
}
