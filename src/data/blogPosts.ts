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
    pillarsTitle?: string;
    pillars: {
      number: string;
      title: string;
      highlight: string;
      body: string;
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
      pillarsTitle: "Behind the Tannery Curtain: 5 Things You Deserve to Know",
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
          title: "The 3-Second Pocket Test: How to Spot the Real Thing",
          highlight: "Don't trust the label. Trust your thumb, your nose, and your eyes.",
          body: "Next time you’re evaluating a leather item, do these three quick tests right there in the shop. First, the Thumb Press: press your thumb hard into the leather surface. Full-grain will create subtle, organic micro-wrinkles that fan outward — just like the skin on your knuckle — and smooth right out when released. Coated leather will feel stiff, spongy, or indent like a rubber tire. Second, the Scent: close your eyes and breathe deep. Real vegetable-tanned full-grain smells warm, earthy, sweet, and woodsy — like dried oak leaves and beeswax. If you smell acetone, acrylic paint, or burnt plastic, put it back. Third, inspect the raw edges: real leather is fibrous all the way through, never a three-layer sandwich glued together."
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
