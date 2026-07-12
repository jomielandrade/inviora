/**
 * Central configuration for the Inviora marketing site.
 *
 * All conversion CTAs, navigation, pricing, and repeated content are defined
 * here so copy and links can be updated without touching component markup.
 */

// TODO: Replace with the real Inviora Facebook Messenger URL before launch.
// A Facebook page username must not be invented; this is an obvious placeholder.
const MESSENGER_BASE_URL = "https://m.me/REPLACE_WITH_INVIORA_PAGE";

/**
 * Builds a Messenger link, optionally attaching a prefilled reference so the
 * team can see which package or section prompted the inquiry. The `ref`
 * parameter is only honored by Messenger when the page supports it, so the
 * link remains functional either way.
 */
export function messengerUrl(ref?: string): string {
  if (!ref) return MESSENGER_BASE_URL;
  const separator = MESSENGER_BASE_URL.includes("?") ? "&" : "?";
  return `${MESSENGER_BASE_URL}${separator}ref=${encodeURIComponent(ref)}`;
}

export const siteConfig = {
  name: "Inviora",
  legalName: "Inviora Digital",
  tagline: "Beautiful invitations. Simpler celebrations.",
  description:
    "Elegant digital wedding invitations and simpler RSVP experiences for modern celebrations.",
  messengerUrl: MESSENGER_BASE_URL,
  social: {
    facebook: MESSENGER_BASE_URL,
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: readonly NavLink[] = [
  { label: "Templates", href: "#templates" },
  { label: "Features", href: "#features" },
  { label: "Packages", href: "#packages" },
  { label: "FAQ", href: "#faq" },
];

export type Benefit = {
  title: string;
  description: string;
};

export const trustBenefits: readonly Benefit[] = [
  {
    title: "One link for every detail",
    description:
      "Your story, schedule, venue, and RSVP live together in a single elegant link.",
  },
  {
    title: "Simple RSVP for every guest",
    description:
      "Guests confirm in a few taps, on any phone, without downloads or accounts.",
  },
  {
    title: "Designed beautifully for mobile",
    description:
      "Every invitation is crafted to feel refined on the screens guests use most.",
  },
];

export type Step = {
  number: string;
  title: string;
  description: string;
};

export const howItWorksSteps: readonly Step[] = [
  {
    number: "01",
    title: "Choose your style",
    description: "Start from a curated wedding template that fits your celebration.",
  },
  {
    number: "02",
    title: "Share your details",
    description:
      "Send us the couple's content, photos, schedule, and guest information.",
  },
  {
    number: "03",
    title: "Invite and celebrate",
    description:
      "Share the finished link and receive RSVPs with far less follow-up.",
  },
];

export type Template = {
  name: string;
  mood: string;
  description: string;
  palette: {
    surface: string;
    ink: string;
    accent: string;
  };
};

export const templates: readonly Template[] = [
  {
    name: "The Classic Vow",
    mood: "Timeless & formal",
    description:
      "Refined serif typography and quiet symmetry for a traditional celebration.",
    palette: {
      surface: "#f8f4ec",
      ink: "#0e1b3d",
      accent: "#e7a23a",
    },
  },
  {
    name: "Modern Romance",
    mood: "Editorial & clean",
    description:
      "Confident layouts and generous space for couples who love a modern look.",
    palette: {
      surface: "#0e1b3d",
      ink: "#f8f4ec",
      accent: "#e7a23a",
    },
  },
  {
    name: "Quiet Garden",
    mood: "Soft & natural",
    description:
      "Gentle tones and airy structure inspired by an intimate garden setting.",
    palette: {
      surface: "#eef1f4",
      ink: "#0e1b3d",
      accent: "#7089a8",
    },
  },
];

export type Feature = {
  title: string;
  description: string;
  /** Lucide icon name resolved in the Features component. */
  icon: FeatureIcon;
};

export type FeatureIcon =
  | "sparkles"
  | "clipboardCheck"
  | "bookHeart"
  | "calendarClock"
  | "images"
  | "share"
  | "listChecks"
  | "layoutPanelLeft";

export const features: readonly Feature[] = [
  {
    title: "Personalized invitation experience",
    description: "An invitation shaped around your names, story, and celebration.",
    icon: "sparkles",
  },
  {
    title: "Mobile-friendly RSVP form",
    description: "Guests confirm attendance quickly from any device.",
    icon: "clipboardCheck",
  },
  {
    title: "Wedding story",
    description: "Share how you met and the moments that led to this day.",
    icon: "bookHeart",
  },
  {
    title: "Event timeline and venue details",
    description: "Keep the schedule and directions clear in one place.",
    icon: "calendarClock",
  },
  {
    title: "Photo gallery",
    description: "Show your favorite photos in a clean, elegant layout.",
    icon: "images",
  },
  {
    title: "Guest-friendly sharing",
    description: "One link is easy to send and simple for everyone to open.",
    icon: "share",
  },
  {
    title: "RSVP tracking",
    description: "Follow responses as they arrive, where included by your package.",
    icon: "listChecks",
  },
  {
    title: "Custom sections",
    description: "Add tailored sections on higher packages to fit your day.",
    icon: "layoutPanelLeft",
  },
];

export type Package = {
  id: "essential" | "premium" | "custom";
  name: string;
  price: string;
  priceNote?: string;
  positioning: string;
  featured: boolean;
  badge?: string;
  includesLabel?: string;
  features: readonly string[];
  cta: string;
};

export const packages: readonly Package[] = [
  {
    id: "essential",
    name: "Essential",
    price: "₱1,999",
    positioning:
      "A polished digital invitation with the details your guests need.",
    featured: false,
    features: [
      "Curated template selection",
      "RSVP form",
      "Wedding story",
      "Event timeline and venue details",
      "Photo gallery",
      "Mobile-friendly invitation link",
    ],
    cta: "Choose Essential",
  },
  {
    id: "premium",
    name: "Premium",
    price: "₱3,499",
    positioning:
      "More personalization, more guest flexibility, and easier RSVP management.",
    featured: true,
    badge: "Most Popular",
    includesLabel: "Everything in Essential, plus:",
    features: [
      "Premium template options",
      "Personalized guest links",
      "Advanced RSVP fields",
      "Full RSVP management dashboard",
      "Expanded gallery",
      "Priority customization",
    ],
    cta: "Choose Premium",
  },
  {
    id: "custom",
    name: "Custom",
    price: "Starts at ₱12,999",
    positioning:
      "A fully custom digital experience designed around your celebration.",
    featured: false,
    features: [
      "Fully custom visual direction",
      "Custom page structure and sections",
      "Custom RSVP flow",
      "Personalized guest links",
      "Full RSVP management dashboard",
      "Custom integrations scoped separately",
    ],
    cta: "Discuss a custom invitation",
  },
];

export const pricingNote =
  "Final inclusions and turnaround time are confirmed before the project begins.";

/**
 * Feature comparison across packages. Values are intentionally explicit text so
 * meaning never relies on color or icons alone.
 */
export type ComparisonValue = "Included" | "Not included" | "Custom" | string;

export type ComparisonRow = {
  feature: string;
  essential: ComparisonValue;
  premium: ComparisonValue;
  custom: ComparisonValue;
};

export const comparisonRows: readonly ComparisonRow[] = [
  {
    feature: "Template selection",
    essential: "Curated",
    premium: "Premium options",
    custom: "Fully custom",
  },
  {
    feature: "Wedding story",
    essential: "Included",
    premium: "Included",
    custom: "Included",
  },
  {
    feature: "Event timeline and venue details",
    essential: "Included",
    premium: "Included",
    custom: "Included",
  },
  {
    feature: "Photo gallery",
    essential: "Included",
    premium: "Expanded",
    custom: "Custom",
  },
  {
    feature: "RSVP form",
    essential: "Standard",
    premium: "Advanced fields",
    custom: "Custom flow",
  },
  {
    feature: "Personalized guest links",
    essential: "Not included",
    premium: "Included",
    custom: "Included",
  },
  {
    feature: "RSVP management dashboard",
    essential: "Not included",
    premium: "Included",
    custom: "Included",
  },
  {
    feature: "Custom sections",
    essential: "Not included",
    premium: "Priority customization",
    custom: "Fully custom",
  },
  {
    feature: "Custom integrations",
    essential: "Not included",
    premium: "Not included",
    custom: "Scoped separately",
  },
  {
    feature: "Turnaround time",
    essential: "To be confirmed",
    premium: "To be confirmed",
    custom: "To be confirmed",
  },
];

export type Celebration = {
  name: string;
  available: boolean;
};

export const celebrations: readonly Celebration[] = [
  { name: "Weddings", available: true },
  { name: "Birthdays", available: false },
  { name: "Baptisms", available: false },
  { name: "Debuts", available: false },
  { name: "Anniversaries", available: false },
  { name: "Corporate events", available: false },
];

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: readonly Faq[] = [
  {
    question: "How does the process work?",
    answer:
      "You choose a template, share your details and photos, and we prepare your invitation. Once it's ready, you receive a single link to share with your guests.",
  },
  {
    question: "How long does an invitation take to prepare?",
    answer:
      "Preparation time depends on your package and the scope of your celebration. We confirm a clear timeline together before the project begins.",
  },
  {
    question: "Can we use our own design or request custom sections?",
    answer:
      "Yes. Higher packages support custom sections, and the Custom package is built around a fully personalized visual direction and page structure.",
  },
  {
    question: "How do guests submit their RSVP?",
    answer:
      "Guests open your invitation link on any device and confirm through a simple mobile-friendly RSVP form—no app or account required.",
  },
  {
    question: "Can details be updated after the invitation is published?",
    answer:
      "Updates are possible and are confirmed based on your package and project scope. We'll walk through what changes are covered before you begin.",
  },
  {
    question: "Do you provide a custom domain?",
    answer:
      "A custom domain can be discussed as part of your project. Availability and terms are confirmed based on your package and scope.",
  },
];
