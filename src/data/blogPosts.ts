export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  heroImage: string;
  content: {
    introduction: string[];
    brandMeaning: {
      calloutTitle?: string;
      spanishOrigin: string;
      philosophy: string;
    };
    anatomyBreakdown?: {
      title: string;
      description: string;
      layers: {
        name: string;
        badge: string;
        description: string;
        verdict: string;
      }[];
    };
    pillarsTitle?: string;
    pillars: {
      number: string;
      title: string;
      highlight: string;
      body: string;
    }[];
    faqs?: {
      question: string;
      answer: string;
    }[];
    closing: string[];
    signature: {
      team: string;
      tagline: string;
    };
  };
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "spain-world-cup-win-craft-pride-legacy",
    title: "What Spain’s World Cup Win Teaches Us About Craft, Pride, and Legacy",
    subtitle: "Pasión, patience, and legacy — why Spain's champion spirit defines the foundation of CUEROCAZA.",
    excerpt: "When Spain lifted the World Cup, the whole country didn’t just celebrate a trophy. They celebrated pasión. That same word is why I started CUEROCAZA.",
    publishedAt: "July 24, 2026",
    readTime: "4 min read",
    category: "Brand & Heritage",
    featured: true,
    author: {
      name: "Team CUEROCAZA",
      role: "Leather with Spanish Soul",
    },
    heroImage: "/spain-world-cup-blog.png",
    content: {
      introduction: [
        "When Spain lifted the World Cup, the whole country didn’t just celebrate a trophy. They celebrated pasión.",
        "That same word is why I started CUEROCAZA."
      ],
      brandMeaning: {
        calloutTitle: "The Spanish Soul",
        spanishOrigin: "In Spanish, cuerocaza speaks to leather and the hunt — the pursuit of something real, something made to last.",
        philosophy: "Just like Spain’s team, we believe great things aren’t rushed. They’re built with skill, patience, and pride."
      },
      pillarsTitle: "3 Lessons from Spain’s Champions",
      pillars: [
        {
          number: "01",
          title: "Craft Takes Time",
          highlight: "Watch the replays. Every pass, every goal came from years of training.",
          body: "At CUEROCAZA, every bag, wallet, and belt goes through the same idea: hand-finished details, real leather that ages with you, not against you. No shortcuts."
        },
        {
          number: "02",
          title: "Play With Heart",
          highlight: "Spain didn’t win by being the loudest. They won by playing together, with heart.",
          body: "That’s how we treat our customers. You’re not buying “just leather goods.” You’re joining a brand that values quality over hype."
        },
        {
          number: "03",
          title: "Leave a Legacy",
          highlight: "A World Cup win becomes part of history. A good leather piece does too.",
          body: "It gets better with time. It tells your story. 10 years from now, you’ll still carry it."
        }
      ],
      closing: [
        "As we launch CUEROCAZA, I wanted our first post to be about this: Pride. Craft. Legacy.",
        "The things that make Spain champions are the same things that make great leather.",
        "So here’s to new beginnings. ¡Vamos!"
      ],
      signature: {
        team: "— Team CUEROCAZA",
        tagline: "Leather with Spanish Soul"
      }
    }
  },
  {
    id: "2",
    slug: "anatomy-of-italian-full-grain-leather",
    title: "The Honest Guide to Genuine Full-Grain Leather: Why Your Father’s Wallet Never Peeled",
    subtitle: "That shiny 'Genuine Leather' stamp in the mall isn't the badge of honor you think it is. Here’s what real, uncut hide actually feels like — and why true craft gets better with every passing year.",
    excerpt: "We’ve all seen that gold-embossed 'Genuine Leather' stamp. But why do department store wallets crack after 18 months, while grandfather’s briefcase looks richer than ever? Let’s talk about uncut full-grain hides, living patina, and the difference between real craft and painted plastic.",
    publishedAt: "July 15, 2026",
    readTime: "6 min read",
    category: "Craftsmanship & Materials",
    featured: false,
    author: {
      name: "Master Tanner & Artisan Team",
      role: "CUEROCAZA Atelier",
    },
    heroImage: "/our-story-banner.jpeg",
    content: {
      introduction: [
        "Have you ever picked up a wallet, a pair of boots, or a weekend bag proudly stamped with the words 'GENUINE LEATHER' in crisp golden foil — only to watch it start peeling like sunburned skin eighteen months down the road?",
        "You paid good money for it. You took care of it. But soon enough, the folds split, the corners cracked open like dry cardboard, and underneath a thin veneer of brown paint, a gray, spongy fabric began to peek through. You probably blamed yourself. Did it get caught in the rain? Did you sit on it too hard? Did you leave it on the car dashboard in the Dubai summer heat?",
        "Here is the honest truth from inside our workshop: you didn’t do anything wrong. You simply encountered one of retail's most successful linguistic sleights of hand.",
        "In the commercial fashion industry, the word 'genuine' is essentially the legal bare minimum required by consumer protection agencies so brands don't get sued for selling vinyl or cardboard as hide. It means animal skin was technically involved at some stage in the chemical vat — nothing more. But if you're looking for the kind of leather that outlives your smartphone, molds to the shape of your palm, and gets fought over by your grandkids decades from now, there is only one term you ever need to look for: Genuine Full-Grain Leather."
      ],
      brandMeaning: {
        calloutTitle: "The Craftsman's Rule",
        spanishOrigin: "If a hide doesn't breathe, flex, and wear its scars with pride, it isn't leather — it's plastic pretending to have a pulse.",
        philosophy: "At CUEROCAZA, we never sand down nature’s grain to make high-speed factory cutting machines happy. We hand-select dense European hides that preserve every original pore, scar, and fiber."
      },
      anatomyBreakdown: {
        title: "The 4 Grades of Leather Ranked by Longevity",
        description: "Most buyers assume 'leather is just leather.' In reality, commercial tanneries slice cowhides into distinct strata. Here is the unvarnished hierarchy:",
        layers: [
          {
            name: "1. Full-Grain Leather",
            badge: "Grade A • The Gold Standard",
            description: "The uncut, uppermost layer of the hide directly below the hair. Fibers remain densely woven by nature. Untouched by sandpaper, it retains natural pores, breathes freely, and drinks in natural oils.",
            verdict: "Lifespan: 20–50+ Years. Never peels. Develops a radiant, glossy caramel patina over time."
          },
          {
            name: "2. Top-Grain Leather",
            badge: "Grade B • The Compromise",
            description: "The top layer has been sanded down with abrasive wheels to erase natural scars, insect bites, or wrinkles. Coated in heavy polymer paint and mechanically pressed with an artificial grain.",
            verdict: "Lifespan: 4–7 Years. Clean looking on day one, but plastic coating prevents authentic patina."
          },
          {
            name: "3. Genuine / Split Leather",
            badge: "Grade C • The Retail Trick",
            description: "The residual bottom layer sliced from underneath the grain. Fibers are fuzzy and structurally brittle. Glued together with polyurethane resins and embossed with fake pebble print.",
            verdict: "Lifespan: 1–2 Years. Cracks, splits, and delaminates under normal pocket friction."
          },
          {
            name: "4. Bonded / Faux Leather",
            badge: "Grade D • Fast Fashion Mulch",
            description: "Shredded leather dust and scrap offcuts mulched into a pulp with polymer adhesive and pressed onto a mesh fabric backing. Less than 20% actual animal fiber.",
            verdict: "Lifespan: 6–12 Months. Cheap landfill fodder that peels at the slightest crease."
          }
        ]
      },
      pillarsTitle: "Behind the Tannery Curtain: 6 Workshop Truths",
      pillars: [
        {
          number: "01",
          title: "The 'Genuine Leather' Trap: What You're Really Buying",
          highlight: "Calling split leather 'genuine' is like calling hot dog filler 'aged prime rib.' Technically meat, but worlds apart in reality.",
          body: "A raw cowhide is remarkably thick — usually around 4 to 6 millimeters. Commercial tanneries feed this hide through giant motorized blades that slice it horizontally into multiple sheets. The top layer has all the natural strength. The bottom layers — known in the trade as 'splits' — are weak, porous, and look like fuzzy cardboard. Cheap manufacturers take these bottom scraps, glue them together with polymer resin, slather them in thick polyurethane paint, and run them under a heated steel roller to press a fake pebble pattern into the plastic. Legally, they can stamp it 'Genuine Leather.' But because there is no natural grain left to hold tension, that plastic paint will inevitably crack, peel, and delaminate under daily pocket friction."
        },
        {
          number: "02",
          title: "What Full-Grain Means: Nature’s Unbroken Armor",
          highlight: "No sandpaper. No chemical makeup. Just the densest, most durable fibers on earth.",
          body: "Full-grain leather is the topmost layer of the hide, right underneath the animal’s hair. It contains the tightest, most densely interwoven protein fibers in existence. In full-grain processing, nobody touches the surface with sandpaper or buffing wheels. Everything nature engineered to protect the animal from wind, rain, and briars remains 100% intact. Because the grain is uncut, moisture and natural oils can migrate naturally through the pores. It doesn’t crack when folded; it doesn't peel in the humidity; it flexes and softens like an old friend."
        },
        {
          number: "03",
          title: "The Beauty of Scars: Why Perfect Means Fake",
          highlight: "A factory machine demands dead uniformity. An artisan looks for life.",
          body: "If you walk into a luxury boutique and inspect twenty bags where every single square centimeter looks mathematically identical, you are looking at heavy pigmented correction. Cattle live real lives — they brush against thornbushes, get bitten by insects, and stretch as they roam open pastures. On a genuine full-grain piece from CUEROCAZA, you will see subtle neck wrinkles, gentle tonal variations, and the faint memory of a healed briar scratch. These are not defects. They are nature’s fingerprints. It guarantees that no other human being on earth is carrying the exact same piece as you."
        },
        {
          number: "04",
          title: "The Magic of Patina: Leather That Wears In, Not Out",
          highlight: "Plastic rots. Full-grain leather writes your personal autobiography.",
          body: "Every synthetic item on the market looks its absolute best on day one. From the moment you unbox it, everyday life begins to ruin it. Full-grain vegetable-tanned leather flips that equation completely upside down. On day one, it’s firm and pale — almost shy. But as you carry it through airports, handle it with morning espresso on your fingers, and leave it on sunlit desks, it drinks in the oils of your hands and oxidizes in the light. Over 6 months, 2 years, and 10 years, it turns a rich, radiant amber honey and gains a supple, mirror-like gloss known as patina. It doesn’t wear out; it wears in."
        },
        {
          number: "05",
          title: "The 5-Second Test: How to Spot the Real Thing Anywhere",
          highlight: "Don't trust the label. Trust your thumb, your nose, and your eyes.",
          body: "Next time you’re evaluating a leather item, do these three quick tests right there in the shop. First, the Thumb Press: press your thumb hard into the leather surface. Full-grain will create subtle, organic micro-wrinkles that fan outward — just like the skin on your knuckle — and smooth right out when released. Coated leather will feel stiff, spongy, or indent like a rubber tire. Second, the Scent: close your eyes and breathe deep. Real vegetable-tanned full-grain smells warm, earthy, sweet, and woodsy — like dried oak leaves and beeswax. If you smell acetone, acrylic paint, or burnt plastic, put it back. Third, inspect the raw edges: real leather is fibrous all the way through, never a three-layer sandwich glued together."
        },
        {
          number: "06",
          title: "Tuscan Vegetable Tanning: The Patient Art",
          highlight: "Sixty days in chestnut bark drums versus twenty-four hours in toxic chromium salts.",
          body: "More than 90% of commercial leather products are flash-tanned in industrial vats using harsh chromium salts. It’s fast and cheap, but it leaves hides smelling of petroleum chemicals and locks them in a static, artificial state. At CUEROCAZA, our hides undergo classic Italian vegetable tanning. Hides soak for 40 to 60 days in giant wooden drums infused with organic extracts of chestnut, mimosa, and quebracho bark. This gentle, time-honored alchemy leaves the leather breathable, hypoallergenic, and primed to absorb life's patina for half a century."
        }
      ],
      faqs: [
        {
          question: "Can genuine full-grain leather get caught in the rain?",
          answer: "Yes, absolutely! Cattle roam open fields in torrential rainstorms without dissolving. If your wallet or bag gets splashed, simply blot excess moisture with a clean cotton towel and let it dry naturally at room temperature. Never blast it with a hair dryer or set it against a radiator, as forced artificial heat leeches the essential oils out of the hide."
        },
        {
          question: "Why does full-grain leather feel stiffer out of the box?",
          answer: "Because the dense, fibrous protein structure hasn't been chemically broken down or mechanically crushed. Just like a pair of raw Japanese selvedge denim or Goodyear-welted boots, full-grain possesses an authentic break-in period. Within two to three weeks of daily carry, the warmth of your hands and pocket molds the hide into a buttery, supple companion."
        },
        {
          question: "How often should I condition my leather accessories?",
          answer: "Less is always more. A light rub with natural beeswax or lanolin leather cream once or twice a year is all that is ever required. Here is our craftsman rule of thumb: if your own hands feel parched during the dry winter months, your leather will appreciate a pea-sized dab of balm too."
        },
        {
          question: "Are surface scratches permanent?",
          answer: "Not on vegetable-tanned full-grain. For light surface fingernail marks, simply press the fleshy ball of your thumb onto the mark and rub firmly in circular motions for twenty seconds. The natural friction heat and oils from your skin re-disperse the internal waxes and blend the mark right into the surrounding grain."
        }
      ],
      closing: [
        "There is a quiet, steady comfort in owning things that don't need to be replaced every twelve months.",
        "We live in an age of disposable speed — plastic phones designed to slow down in two years, shirts that disintegrate in the wash, and disposable accessories engineered to fill landfills. Choosing genuine full-grain leather is a quiet, deliberate act of rebellion. It’s a decision to buy once, cry once, and live with something that honors the hands that made it.",
        "When you slip a CUEROCAZA wallet or passport cover into your pocket, you aren't just carrying a piece of cured hide. You're carrying centuries of Spanish marroquinería tradition, unhurried Italian vegetable tanning, and a piece of honest earth that will faithfully keep your secrets for decades.",
        "Demand the grain. Respect the craft. Never settle for plastic in disguise."
      ],
      signature: {
        team: "— The CUEROCAZA Atelier",
        tagline: "Handcrafted with Spanish Soul & Uncut Full-Grain Heritage"
      }
    }
  },
  {
    id: "4",
    slug: "how-to-choose-the-right-leather-wallet",
    title: "How to Choose the Right Leather Wallet: The Definitive Buyer's Guide",
    subtitle: "Size, leather grade, stitching, and soul — everything you need to know before you spend your money on a wallet that will last 20 years.",
    excerpt: "Most men replace their wallet every two years. With the right knowledge, you buy once and carry it for life. Here's the no-nonsense guide to choosing a leather wallet that actually earns its price.",
    publishedAt: "November 17, 2026",
    readTime: "7 min read",
    category: "Buying Guide",
    featured: false,
    author: {
      name: "Team CUEROCAZA",
      role: "Style & Craft Advisors",
    },
    heroImage: "/hero-banner-main.jpeg",
    content: {
      introduction: [
        "Walk into any shopping mall and the wallet section will overwhelm you in thirty seconds flat. Slim. Bifold. Trifold. Card-only. Money-clip. RFID-blocking. Genuine Leather. Genuine Synthetic. Genuine Confusion.",
        "Most buyers pick whatever feels good in hand on the day, only to end up with a cracked, bloated, misshapen relic twelve months later.",
        "This guide cuts through every gimmick and marketing trick to leave you with the five real questions that separate a forgettable purchase from a wallet you'll still carry when your children start asking to borrow it."
      ],
      brandMeaning: {
        calloutTitle: "The Golden Rule of Wallets",
        spanishOrigin: "A wallet is not an accessory. It is a daily ritual object — it leaves your house with you every single morning and never leaves your side.",
        philosophy: "Choose it the way a carpenter chooses a plane: weight, balance, material, and longevity over flash."
      },
      pillarsTitle: "5 Questions to Ask Before You Buy Any Wallet",
      pillars: [
        {
          number: "01",
          title: "What Leather Grade Is It, Really?",
          highlight: "The single most important question — and the one most brands hope you never ask.",
          body: "We've written a full guide on the four grades of leather (Full-Grain, Top-Grain, Genuine/Split, and Bonded), so here is the short version: if the wallet does not specifically say 'Full-Grain' on the product page, assume it is not. 'Genuine Leather' is the industry's legal minimum — it means animal skin was involved, nothing more. Only full-grain leather has the uncut, densely woven fiber surface that resists cracking, absorbs natural oils, and develops the rich honey patina that makes a 10-year-old wallet look better than a new one. At CUEROCAZA, every wallet we produce is built exclusively from hand-selected Italian full-grain vegetable-tanned hides. No exceptions, no compromises."
        },
        {
          number: "02",
          title: "Slim vs. Bifold vs. Trifold: Which Shape Suits Your Life?",
          highlight: "The best wallet is the one that fits your actual daily carry — not the one that looks good in a flat-lay photo.",
          body: "Slim card wallets (4–6 cards maximum) are perfect for minimalists who rely on digital payments and rarely carry cash. They sit flat in a front trouser pocket and eliminate back-pocket spine damage. Classic bifolds fold once and comfortably hold 6–10 cards plus a cash slot — the timeless workhorse format for most men. Trifolds offer the most raw storage but triple-fold bulk makes them uncomfortable in slim-cut trousers. Our recommendation: audit your wallet right now. If you have more than 8 cards, start by editing your carry down. A leaner wallet is more elegant, more comfortable, and far kinder to your posture."
        },
        {
          number: "03",
          title: "Inspect the Stitching Before Anything Else",
          highlight: "The stitching tells you everything about how the rest of the wallet was made.",
          body: "Turn the wallet inside out if you can. Look at the thread: is it waxed linen or polyester? Waxed linen thread — the same thread used by saddlers for centuries — grips the leather fibers, resists moisture, and never frays. Polyester thread is cheaper, slippery, and will rot at the knots over time. Next, count the stitches per inch. 6–8 SPI is hand-stitcher territory. 10–14 SPI is acceptable machine stitching. If the stitching looks rushed, crooked, or is hidden under a heavy layer of edge paint, the rest of the wallet probably received the same level of attention. At CUEROCAZA, our artisans use traditional saddle-stitching — two needles, one thread, one locked stitch at a time — which means that even if one stitch breaks, the seam will not unravel."
        },
        {
          number: "04",
          title: "Edge Finishing: The Detail That Separates Craft from Production",
          highlight: "Raw, rough edges mean the hide was stamped from a machine. Burnished edges mean a human cared.",
          body: "Pick up the wallet and look at the edges of every leather panel. Mass-produced wallets are die-cut by machine and their raw edges are slathered in a thick layer of acrylic edge paint — the craft equivalent of covering a bad haircut with a hat. Genuine artisan wallets have hand-burnished edges: the leather is moistened, rolled, pressed, and polished repeatedly with a wooden slicker until the fibres compress into a smooth, sealed, almost glass-like finish. It takes eight times as long. It costs more. And it means the edge will never peel, flake, or catch on your pocket lining. Run your thumb along every edge before you commit."
        },
        {
          number: "05",
          title: "Price Per Year Is the Only Number That Matters",
          highlight: "A $30 wallet replaced every 18 months costs more over a decade than a $180 wallet that lasts 15 years.",
          body: "The leather goods industry has conditioned buyers to wince at the sticker price without ever calculating the actual cost of ownership. Here is a simple exercise: take the price of the wallet and divide it by its realistic lifespan in years. A fast-fashion wallet at $35 lasting 1.5 years costs $23 per year. A CUEROCAZA full-grain wallet at $160 lasting 15–20 years costs between $8–$11 per year — and gets more beautiful along the way. The economics of quality almost always win over time. Buy cheap twice, or buy right once."
        }
      ],
      faqs: [
        {
          question: "Should I buy a wallet with RFID blocking?",
          answer: "RFID skimming is a genuine but rare threat in densely crowded transit hubs. If your contactless bank cards feel like a vulnerability to you, an RFID-shielded wallet provides peace of mind. That said, never let RFID lining be the primary reason you choose a wallet — a cheap wallet with RFID lining is still a cheap wallet. Look for full-grain leather first, RFID blocking second."
        },
        {
          question: "How many cards should I actually carry daily?",
          answer: "Ruthlessly edit to 4–6 essentials: one primary bank card, one backup, your ID, and 1–2 loyalty or access cards. Everything else should live in a dedicated card case at home. A slim carry reduces pick-pocket risk, eliminates back-pocket pressure on your spine, and means your wallet will never stretch or balloon out of shape."
        },
        {
          question: "Will the wallet stretch over time?",
          answer: "Full-grain leather does mould and soften with use, but it will not stretch out of shape if you carry a sensible number of cards. The wallets that balloon into rounded bricks are almost always holding 12–20 cards, receipts, coins, and folded notes — that is not a wallet problem, that is a carry discipline problem. Keep your wallet lean and it will hold its form beautifully for years."
        },
        {
          question: "What is the best way to break in a new full-grain leather wallet?",
          answer: "Full-grain leather is firm on day one — this is a feature, not a flaw. Load it with your regular cards and carry it daily for 2–3 weeks. The warmth from your body and the natural movement of your pocket will gently mold the leather to your exact card configuration. You can accelerate the process by applying a very thin layer of natural beeswax leather balm to the exterior on day one, which softens the fibres from the outside in."
        }
      ],
      closing: [
        "The wallet is one of the most intimate objects a person carries. It touches your hands dozens of times each day. It lives in your pocket through every meeting, every journey, and every memory.",
        "It deserves more than a five-second decision in a checkout queue.",
        "Take the time to ask the five questions above. Inspect the leather grade, the stitching, and the edge finish. Calculate the real cost per year. And choose something that will still be with you a decade from now — slightly darker, slightly softer, and completely yours.",
        "That is what we build at CUEROCAZA. Not the most fashionable wallet in the room. The last one you'll ever need to buy."
      ],
      signature: {
        team: "— Team CUEROCAZA",
        tagline: "Buy Once. Carry Forever. Spanish Soul in Every Stitch."
      }
    }
  },
  {
    id: "3",
    slug: "caring-for-your-leather-patina-guide",
    title: "Patina & Care: How Real Leather Tells Your Personal Story",
    subtitle: "Simple habits to nourish, condition, and protect your leather accessories for decades.",
    excerpt: "A fine leather wallet shouldn’t stay pristine forever — it should age gracefully with your daily journeys. Here is our master guide to leather conditioning.",
    publishedAt: "June 28, 2026",
    readTime: "4 min read",
    category: "Care & Style",
    featured: false,
    author: {
      name: "Team CUEROCAZA",
      role: "Care & Maintenance",
    },
    heroImage: "/hero-banner-main.jpeg",
    content: {
      introduction: [
        "Patina is the warm luster and natural darkening that full-grain leather acquires through wear and handling.",
        "Every drop of rain, oil from your hands, and fold in your pocket adds a unique line to your story.",
        "Proper care ensures your leather stays supple without losing its structural integrity."
      ],
      brandMeaning: {
        calloutTitle: "The Care Philosophy",
        spanishOrigin: "A good piece of leather doesn't ask for much, but what it does ask for, it rewards ten times over.",
        philosophy: "Care for the fiber, and the hide will protect your essentials for a lifetime."
      },
      pillarsTitle: "3 Golden Rules for Lifelong Leather Care",
      pillars: [
        {
          number: "01",
          title: "Feed the Hide, Don't Drown It",
          highlight: "Less is more. Quality leather needs moisture, not a bath.",
          body: "Once or twice a year, apply a small dime-sized dab of natural beeswax or lanolin leather balm with a microfibre cloth. Let it absorb overnight, then buff with a horsehair brush. That is all it takes to keep the fibers supple."
        },
        {
          number: "02",
          title: "When Rain Happens: Air Dry Only",
          highlight: "Never rush nature with a hairdryer or a radiator.",
          body: "If your bag or wallet gets caught in a sudden downpour, blot off the excess water with a clean towel and let it dry naturally at room temperature. Intense artificial heat will leech the essential oils out of the pores."
        },
        {
          number: "03",
          title: "Buff Out Daily Scratches with Your Thumb",
          highlight: "Your own natural skin oils are the best conditioner on earth.",
          body: "Got a light surface fingernail mark on your full-grain leather? Don't panic. Firmly rub the mark in circular motions with the ball of your thumb for twenty seconds. The friction warmth and natural skin oils will disperse the wax and blend the mark right away."
        }
      ],
      closing: [
        "Keep your leather fed and it will outlive trends.",
        "A wallet that bears the marks of ten years of travel is infinitely more beautiful than one fresh out of cellophane."
      ],
      signature: {
        team: "— Team CUEROCAZA",
        tagline: "Built to Last & Handcrafted with Spanish Soul"
      }
    }
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
