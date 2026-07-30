import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "es" | "ar";

export interface Translations {
  // Brand & Domain
  brandName: string;
  domainName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCta: string;
  
  // Navigation
  navHome: string;
  navCollection: string;
  navJournal: string;
  navContact: string;
  navCart: string;
  navAccount: string;
  navOrders: string;
  navAiAssistant: string;

  // Counter & Live Traffic
  visitorCounterTitle: string;
  liveVisitors: string;
  totalVisitorsServed: string;
  realtimePulse: string;
  usersJoined: string;
  liveStatus: string;
  verifiedEntryOdometer: string;
  realtimeTraffic: string;
  joiningOver: string;
  connoisseurs: string;
  counterDescription: string;
  selectLanguage: string;
  languageLabel: string;

  // Sections & CTAs
  ourStory: string;
  ourStoryTitle: string;
  corporateGifting: string;
  corporateGiftingTitle: string;
  requestCorporateQuote: string;
  customerReviewsTitle: string;
  customerReviewsSubtitle: string;

  // Footer & Details
  footerAboutText: string;
  footerAddress: string;
  footerExplore: string;
  footerHouse: string;
  footerCopyright: string;
  visitOfficialSite: string;
  dubaiAtelier: string;
  spainHeritage: string;

  // Common CTAs & Labels
  exploreCollection: string;
  learnMore: string;
  addToCart: string;
  viewDetails: string;
  genuineItalianLeather: string;
  craftedInDubai: string;
  spanishCraftsmanship: string;
}

const translations: Record<Language, Translations> = {
  en: {
    brandName: "CUEROCAZA",
    domainName: "www.cuerocaza.com",
    tagline: "Genuine Italian Leather · Handcrafted in Dubai · Born in Spain",
    heroHeadline: "Timeless Leather Craftsmanship for the Discerning Minimalist",
    heroSubheadline: "Hand-finished Italian full-grain leather wallets, passport covers, and bespoke accessories tailored in Dubai.",
    heroCta: "Explore Collection",
    
    navHome: "Home",
    navCollection: "Collection",
    navJournal: "Journal",
    navContact: "Contact",
    navCart: "Cart",
    navAccount: "Account / Sign In",
    navOrders: "My Orders",
    navAiAssistant: "Ask Cuerocaza AI",

    visitorCounterTitle: "Global Leather Enthusiasts Served",
    liveVisitors: "Live Visitors",
    totalVisitorsServed: "Website Visitors",
    realtimePulse: "Live Entry Pulse",
    usersJoined: "users joined",
    liveStatus: "LIVE",
    verifiedEntryOdometer: "Verified Entry Odometer",
    realtimeTraffic: "Realtime Traffic",
    joiningOver: "Joining over",
    connoisseurs: "Connoisseurs",
    counterDescription: "Track our live real-time visitor entry odometer below, connecting leather aficionados across Dubai, Spain, and around the world.",
    selectLanguage: "Select Language",
    languageLabel: "Language",

    ourStory: "Our Story",
    ourStoryTitle: "From Dubai Marina to CUEROCAZA",
    corporateGifting: "Corporate Gifting",
    corporateGiftingTitle: "Corporate Gifting & Bulk Orders",
    requestCorporateQuote: "Request a Corporate Quote",
    customerReviewsTitle: "Customer Reviews",
    customerReviewsSubtitle: "Words from our customers",

    footerAboutText: "CUEROCAZA is a Dubai-based luxury leather house specializing in genuine Italian leather wallets, passport covers, cardholders, personalized gifts, and corporate leather solutions across the UAE.",
    footerAddress: "39 6th St — Al Murar — Dubai — United Arab Emirates",
    footerExplore: "Explore",
    footerHouse: "House",
    footerCopyright: "CUEROCAZA · Handcrafted Italian Leather Dubai.",
    visitOfficialSite: "Visit Official Store",
    dubaiAtelier: "Dubai Atelier",
    spainHeritage: "Spanish Heritage",

    exploreCollection: "Explore Collection",
    learnMore: "Discover More",
    addToCart: "Add to Bag",
    viewDetails: "View Details",
    genuineItalianLeather: "Genuine Italian Leather",
    craftedInDubai: "Tailored in Dubai",
    spanishCraftsmanship: "Spanish Leather Legacy",
  },
  es: {
    brandName: "CUEROCAZA",
    domainName: "www.cuerocaza.com",
    tagline: "Piel Italiana Auténtica · Artesanía en Dubái · Herencia de España",
    heroHeadline: "Artesanía Atemporal en Piel para el Minimalista Exigente",
    heroSubheadline: "Carteras de cuero italiano flor entera hechas a mano, fundas para pasaportes y accesorios personalizados hechos en Dubái.",
    heroCta: "Explorar Colección",

    navHome: "Inicio",
    navCollection: "Colección",
    navJournal: "Diario",
    navContact: "Contacto",
    navCart: "Carrito",
    navAccount: "Cuenta / Iniciar Sesión",
    navOrders: "Mis Pedidos",
    navAiAssistant: "Asistente Cuerocaza AI",

    visitorCounterTitle: "Visitantes Mundiales Atendidos",
    liveVisitors: "Visitantes en Vivo",
    totalVisitorsServed: "Visitantes del Sitio Web",
    realtimePulse: "Pulso en Vivo",
    usersJoined: "usuarios unidos",
    liveStatus: "EN VIVO",
    verifiedEntryOdometer: "Odómetro de Entradas Verificado",
    realtimeTraffic: "Tráfico en Tiempo Real",
    joiningOver: "Uniéndose a más de",
    connoisseurs: "Aficionados",
    counterDescription: "Siga nuestro odómetro de entradas en vivo a continuación, conectando aficionados al cuero en Dubái, España y todo el mundo.",
    selectLanguage: "Seleccionar Idioma",
    languageLabel: "Idioma",

    ourStory: "Nuestra Historia",
    ourStoryTitle: "Desde Dubai Marina hasta CUEROCAZA",
    corporateGifting: "Regalos Corporativos",
    corporateGiftingTitle: "Regalos Corporativos y Pedidos al Por Mayor",
    requestCorporateQuote: "Solicitar Presupuesto Corporativo",
    customerReviewsTitle: "Reseñas de Clientes",
    customerReviewsSubtitle: "Opiniones de nuestros clientes",

    footerAboutText: "CUEROCAZA es una marca de marroquinería de lujo con sede en Dubái, especializada en carteras de piel italiana legítima, fundas de pasaporte, tarjeteros, regalos personalizados y artículos corporativos en los EAU.",
    footerAddress: "Calle 39 6a — Al Murar — Dubái — Emiratos Árabes Unidos",
    footerExplore: "Explorar",
    footerHouse: "La Casa",
    footerCopyright: "CUEROCAZA · Cuero Italiano Hecho a Mano en Dubái.",
    visitOfficialSite: "Visitar Tienda Oficial",
    dubaiAtelier: "Taller en Dubái",
    spainHeritage: "Herencia Española",

    exploreCollection: "Explorar Colección",
    learnMore: "Descubrir Más",
    addToCart: "Añadir a la Bolsa",
    viewDetails: "Ver Detalles",
    genuineItalianLeather: "Piel Italiana Genuina",
    craftedInDubai: "Confeccionado en Dubái",
    spanishCraftsmanship: "Tradición Cuero Español",
  },
  ar: {
    brandName: "كويروكازا",
    domainName: "www.cuerocaza.com",
    tagline: "جلد إيطالي طبيعي فاخر · صُنِع في دبي · أصالة إسبانية",
    heroHeadline: "حرفية جلدية خالدة لأصحاب الذوق الرفيع",
    heroSubheadline: "محافظ جلدية إيطالية فاخرة وأغطية جوازات سفر وإكسسوارات شخصية مصممة بعناية فائقة في دبي.",
    heroCta: "تصفح التشكيلة",

    navHome: "الرئيسية",
    navCollection: "التشكيلة",
    navJournal: "المجلة",
    navContact: "اتصل بنا",
    navCart: "حقيبة التسوق",
    navAccount: "الحساب / تسجيل الدخول",
    navOrders: "طلباتي",
    navAiAssistant: "مساعد كويروكازا الذكي",

    visitorCounterTitle: "إجمالي زوار الموقع عالمياً",
    liveVisitors: "زوار متواجدون الآن",
    totalVisitorsServed: "عدد زوار الموقع",
    realtimePulse: "نبض التفاعل الحقيقي",
    usersJoined: "زائر انضموا إلينا",
    liveStatus: "مباشر",
    verifiedEntryOdometer: "عداد الزيارات المعتمد",
    realtimeTraffic: "حركة المرور المباشرة",
    joiningOver: "انضم إلى أكثر من",
    connoisseurs: "عاشق للجلد الفاخر",
    counterDescription: "تابع عداد زيارات الموقع الحقيقي المباشر أدناه، والذي يربط عشاق الجلد الفاخر بين دبي وإسبانيا وحول العالم.",
    selectLanguage: "اختر اللغة",
    languageLabel: "اللغة",

    ourStory: "قصتنا",
    ourStoryTitle: "من دبي مارينا إلى كويروكازا",
    corporateGifting: "الهدايا المؤسسية",
    corporateGiftingTitle: "الهدايا المؤسسية والطلبات بالجملة",
    requestCorporateQuote: "طلب عرض أسعار للشركات",
    customerReviewsTitle: "آراء العملاء",
    customerReviewsSubtitle: "كلمات من عشاق منتجاتنا",

    footerAboutText: "كويروكازا هي دار جلدية فاخرة مقرها دبي، متخصصة في المحافظ الجلدية الإيطالية الطبيعية، أغطية جوازات السفر، حوامل البطاقات، الهدايا الشخصية وحلول الهدايا للشركات في دولة الإمارات العربية المتحدة.",
    footerAddress: "شارع 39 6 — المرار — دبي — الإمارات العربية المتحدة",
    footerExplore: "استكشف",
    footerHouse: "دار كويروكازا",
    footerCopyright: "كويروكازا · جلد إيطالي فاخر صُنِع في دبي.",
    visitOfficialSite: "زيارة المتجر الرسمي",
    dubaiAtelier: "استوديو دبي",
    spainHeritage: "الأصالة الإسبانية",

    exploreCollection: "تصفح المجموعة",
    learnMore: "اكتشف المزيد",
    addToCart: "أضف إلى السلة",
    viewDetails: "عرض التفاصيل",
    genuineItalianLeather: "جلد إيطالي طبيعي",
    craftedInDubai: "صُنع في دبي",
    spanishCraftsmanship: "حرفية إسبانية عريقة",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "cuerocaza_preferred_language";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem(LOCAL_STORAGE_KEY) as Language | null;
    if (savedLang && (savedLang === "en" || savedLang === "es" || savedLang === "ar")) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LOCAL_STORAGE_KEY, lang);
  };

  const dir: "ltr" | "rtl" = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language], dir }}>
      <div dir={dir} className={language === "ar" ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
