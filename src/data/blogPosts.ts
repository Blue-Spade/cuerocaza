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
      spanishOrigin: string;
      philosophy: string;
    };
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
        spanishOrigin: "In Spanish, cuerocaza speaks to leather and the hunt — the pursuit of something real, something made to last.",
        philosophy: "Just like Spain’s team, we believe great things aren’t rushed. They’re built with skill, patience, and pride."
      },
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
    title: "The Anatomy of Full-Grain Italian Leather: Why Hides Matter",
    subtitle: "Understanding vegetable tanning, grain density, and why real leather outlasts synthetic alternatives.",
    excerpt: "Not all leather is created equal. Discover how traditional Tuscan vegetable tanning creates supple, durable hides that develop a rich patina over decades.",
    publishedAt: "July 15, 2026",
    readTime: "5 min read",
    category: "Craftsmanship",
    featured: false,
    author: {
      name: "Master Tanner",
      role: "CUEROCAZA Atelier",
    },
    heroImage: "/our-story-banner.jpeg",
    content: {
      introduction: [
        "Behind every timeless leather accessory lies a relentless commitment to raw material selection."
      ],
      brandMeaning: {
        spanishOrigin: "True full-grain hides preserve the natural surface markings and fibrous strength.",
        philosophy: "We source our leather directly from certified tanneries committed to ecological sustainability."
      },
      pillars: [],
      closing: ["Invest in pieces that gain character with age."],
      signature: {
        team: "— Atelier Notes",
        tagline: "Handmade Excellence"
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
    readTime: "3 min read",
    category: "Care & Style",
    featured: false,
    author: {
      name: "Team CUEROCAZA",
      role: "Care & Maintenance",
    },
    heroImage: "/hero-banner-main.jpeg",
    content: {
      introduction: [
        "Patina is the warm luster and natural darkening that full-grain leather acquires through wear and handling."
      ],
      brandMeaning: {
        spanishOrigin: "Every drop of rain, oil from your hands, and fold in your pocket adds a unique line to your story.",
        philosophy: "Proper care ensures your leather stays supple without losing its structural integrity."
      },
      pillars: [],
      closing: ["Keep your leather fed and it will outlive trends."],
      signature: {
        team: "— Team CUEROCAZA",
        tagline: "Built to Last"
      }
    }
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
