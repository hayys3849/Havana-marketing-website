export interface Translation {
  dir: "ltr" | "rtl";
  announcement: { text: string };
  nav: { home: string; shop: string; categories: string; occasions: string; about: string; contact: string; downloadApp: string };
  occasions: { eid: string; weddings: string; birthday: string; anniversary: string; graduation: string; mothersDay: string; loveRomance: string; sympathy: string };
  hero: { badge: string; title: string; description: string; shopCollection: string; customOrders: string; scroll: string };
  shopByOccasion: { title: string; subtitle: string };
  whyChooseUs: { title: string; subtitle: string; sameDay: { title: string; description: string }; freshness: { title: string; description: string }; premium: { title: string; description: string }; support: { title: string; description: string }; personalized: { title: string; description: string }; eco: { title: string; description: string } };
  featuredCollection: { title: string; subtitle: string };
  bestSellers: { title: string; subtitle: string };
  productCard: { bestSeller: string; new: string; orderInApp: string };
  newsletter: { exclusive: string; title: string; description: string; placeholder: string; subscribe: string; thankYou: string; privacy: string };
  footer: { about: string; quickLinks: string; faq: string; shippingPolicy: string; returnsRefunds: string; privacyPolicy: string; termsOfService: string; customerService: string; trackOrder: string; giftCards: string; corporateOrders: string; contactInfo: string; address: string; hours: string; copyright: string; downloadApp: string };
  mobileNav: { occasions: string; downloadApp: string };
  language: { en: string; ar: string };
  download: { badge: string; title: string; subtitle: string; description: string; feature1Title: string; feature1Desc: string; feature2Title: string; feature2Desc: string; feature3Title: string; feature3Desc: string; feature4Title: string; feature4Desc: string; playStoreButton: string; apkButton: string; apkNote: string; minVersion: string; backToHome: string; whyAppTitle: string; whyAppSubtitle: string; ctaTitle: string; ctaSubtitle: string };
}