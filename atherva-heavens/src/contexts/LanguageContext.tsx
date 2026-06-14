import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "kn";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About Us",
    "nav.contact": "CONTACT US",

    "hero.subtitle": "Beauty and Wellness in Perfect Harmony with",
    "hero.title1": "ATHARVA",
    "hero.title2": "HEAVEN",
    "hero.tagline": "Salon and Spa.",

    "about.label": "about us",
    "about.title": "Your Journey to Relaxation Begins Here.",
    "about.desc": "At Atharva Heaven, we believe self-care is essential for a healthy and balanced lifestyle. Our salon and spa are designed to provide a relaxing escape where beauty, wellness, and comfort come together. With skilled professionals, premium products, and personalized treatments, we strive to deliver an exceptional experience that leaves every guest feeling refreshed, confident, and rejuvenated.",

    "services.jacuzzi.title": "Ultimate Hydro Relaxation",
    "services.jacuzzi.desc": "Enjoy a soothing soak in our Jacuzzi tub, where warm water and gentle jets help relax muscles, improve circulation, and melt away daily stress.",
    "services.steam.title": "Pure Steam Therapy",
    "services.steam.desc": "Relax in a warm steam-filled environment that helps open pores, cleanse the skin, and promote overall well-being. The soothing heat helps reduce stress and leaves you feeling refreshed.",
    "services.wine.title": "Luxurious Wine Therapy",
    "services.wine.desc": "Our wine massage combines soothing massage techniques with antioxidant-rich ingredients to help improve skin texture, reduce stress, and leave you feeling refreshed.",

    "about.rating": "Average Rating",
    "about.drag": "Tap or\ndrag cards",

    "review.1.quote": "Exceptional Service & Care",
    "review.1.text": "From the warm welcome to the professional treatments, Atharva Heaven exceeded my expectations. The staff was attentive, the atmosphere was relaxing, and I left feeling completely refreshed and satisfied.",
    "review.1.user": "Dixit",
    "review.1.role": "Daily customer",

    "review.2.quote": "A Truly Relaxing Experience",
    "review.2.text": "The spa services were amazing and helped me unwind after a busy week. The environment was peaceful, and every detail was thoughtfully designed for comfort and relaxation.",
    "review.2.user": "Sujith",
    "review.2.role": "Highest paid customer",

    "review.3.quote": "My Favorite Salon & Spa",
    "review.3.text": "Atharva Heaven has become my go-to destination for self-care. The quality of service, friendly staff, and excellent results keep me coming back every time.",
    "review.3.user": "Sneha",
    "review.3.role": "Weekend customer",

    "contact.label": "contact us",
    "contact.title": "DROP US\nA LINE",
    "contact.location.label": "Location",
    "contact.location.address": "opposit Indian Bank, Veerannana, 7th A Cross Rd, Nagavara, Bengaluru, Karnataka 560045",
    "contact.location.btn": "Get Directions",
    "contact.callback.label": "Callback_request",
    "contact.callback.placeholder": "Your mobile number",
    "contact.callback.success": "We will reach you early",
    "contact.callback.desc": "Get a call from us within 12 celestial hours.",
    "contact.hours.label": "Trading Hours",
    "contact.hours.mon_fri": "Monday - Friday:",
    "contact.hours.mon_fri_time": "11:00 am to 8:30 pm",
    "contact.hours.sat_sun": "Saturday - Sunday:",
    "contact.hours.sat_sun_time": "10:30 am to 9:00 pm",
    "contact.social.label": "Follow us",

    "footer.nav": "Navigation",
    "footer.social": "Social_Connect",
    "footer.connect.title": "Connect with phone",
    "footer.connect.desc": "Get a call from us within 12 celestial hours.",
    "footer.connect.placeholder": "Mobile number",
    "footer.connect.success": "We will reach you early",
    "footer.connect.footer": "Contact with ease",
    "footer.copyright": "A SPACE BY TEJAS ARYA",
    "footer.typewriter": "Atharva heaven",
    "social.instagram": "Instagram",
    "social.facebook": "Facebook",
    "social.twitter": "Twitter"
  },
  kn: {
    "nav.home": "ಮುಖಪುಟ",
    "nav.services": "ಸೇವೆಗಳು",
    "nav.about": "ನಮ್ಮ ಬಗ್ಗೆ",
    "nav.contact": "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",

    "hero.subtitle": "ಸೌಂದರ್ಯ ಮತ್ತು ಕ್ಷೇಮದ ಪರಿಪೂರ್ಣ ಸಾಮರಸ್ಯ",
    "hero.title1": "ಅಥರ್ವ",
    "hero.title2": "ಹೆವೆನ್",
    "hero.tagline": "ಸಲೂನ್ ಮತ್ತು ಸ್ಪಾ.",

    "about.label": "ನಮ್ಮ ಬಗ್ಗೆ",
    "about.title": "ನಿಮ್ಮ ವಿಶ್ರಾಂತಿಯ ಪ್ರಯಾಣ ಇಲ್ಲಿ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ.",
    "about.desc": "ಅಥರ್ವ ಹೆವೆನ್‌ನಲ್ಲಿ, ಆರೋಗ್ಯಕರ ಮತ್ತು ಸಮತೋಲಿತ ಜೀವನಶೈಲಿಗೆ ಸ್ವಯಂ-ಆರೈಕೆ ಅತ್ಯಗತ್ಯ ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ. ನಮ್ಮ ಸಲೂನ್ ಮತ್ತು ಸ್ಪಾ ಅನ್ನು ಸೌಂದರ್ಯ, ಕ್ಷೇಮ ಮತ್ತು ಸೌಕರ್ಯಗಳು ಒಗ್ಗೂಡುವ ಶಾಂತಿಯುತ ತಪ್ಪಿಸಿಕೊಳ್ಳುವಿಕೆಯನ್ನು ಒದಗಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ನುರಿತ ವೃತ್ತಿಪರರು, ಪ್ರೀಮಿಯಂ ಉತ್ಪನ್ನಗಳು ಮತ್ತು ವೈಯಕ್ತೀಕರಿಸಿದ ಚಿಕಿತ್ಸೆಗಳೊಂದಿಗೆ, ಪ್ರತಿಯೊಬ್ಬ ಅತಿಥಿಗೂ ಉಲ್ಲಾಸ, ಆತ್ಮವಿಶ್ವಾಸ ಮತ್ತು ಹೊಸ ಹುರುಪು ನೀಡುವ ಅಸಾಧಾರಣ ಅನುಭವವನ್ನು ನೀಡಲು ನಾವು ಶ್ರಮಿಸುತ್ತೇವೆ.",

    "services.jacuzzi.title": "ಅಲ್ಟಿಮೇಟ್ ಹೈಡ್ರೋ ರಿಲ್ಯಾಕ್ಸೇಶನ್",
    "services.jacuzzi.desc": "ನಮ್ಮ ಜಕುಝಿ ಟಬ್‌ನಲ್ಲಿ ಹಿತವಾದ ನೆನಸುವಿಕೆಯನ್ನು ಆನಂದಿಸಿ, ಅಲ್ಲಿ ಬೆಚ್ಚಗಿನ ನೀರು ಮತ್ತು ಮೃದುವಾದ ಜೆಟ್‌ಗಳು ಸ್ನಾಯುಗಳನ್ನು ಸಡಿಲಗೊಳಿಸಲು, ರಕ್ತ ಪರಿಚಲನೆಯನ್ನು ಸುಧಾರಿಸಲು ಮತ್ತು ದೈನಂದಿನ ಒತ್ತಡವನ್ನು ನಿವಾರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ.",
    "services.steam.title": "ಪ್ಯೂರ್ ಸ್ಟೀಮ್ ಥೆರಪಿ",
    "services.steam.desc": "ಬೆಚ್ಚಗಿನ ಉಗಿ-ತುಂಬಿದ ಪರಿಸರದಲ್ಲಿ ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ, ಇದು ರಂಧ್ರಗಳನ್ನು ತೆರೆಯಲು, ತ್ವಚೆಯನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಲು ಮತ್ತು ಒಟ್ಟಾರೆ ಯೋಗಕ್ಷೇಮವನ್ನು ಉತ್ತೇಜಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಹಿತವಾದ ಉಷ್ಣತೆಯು ಒತ್ತಡವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ ಮತ್ತು ನಿಮಗೆ ಉಲ್ಲಾಸವನ್ನು ನೀಡುತ್ತದೆ.",
    "services.wine.title": "ಲಕ್ಸುರಿಯಸ್ ವೈನ್ ಥೆರಪಿ",
    "services.wine.desc": "ನಮ್ಮ ವೈನ್ ಮಸಾಜ್, ಚರ್ಮದ ವಿನ್ಯಾಸವನ್ನು ಸುಧಾರಿಸಲು, ಒತ್ತಡವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮತ್ತು ನಿಮಗೆ ಉಲ್ಲಾಸವನ್ನು ನೀಡಲು ಉತ್ಕರ್ಷಣ ನಿರೋಧಕ-ಸಮೃದ್ಧ ಪದಾರ್ಥಗಳೊಂದಿಗೆ ಹಿತವಾದ ಮಸಾಜ್ ತಂತ್ರಗಳನ್ನು ಸಂಯೋಜಿಸುತ್ತದೆ.",

    "about.rating": "ಸರಾಸರಿ ರೇಟಿಂಗ್",
    "about.drag": "ಕಾರ್ಡ್‌ಗಳನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ\nಅಥವಾ ಎಳೆಯಿರಿ",

    "review.1.quote": "ಅಸಾಧಾರಣ ಸೇವೆ ಮತ್ತು ಆರೈಕೆ",
    "review.1.text": "ವೃತ್ತಿಪರ ಚಿಕಿತ್ಸೆಗಳವರೆಗೆ, ಅಥರ್ವ ಹೆವೆನ್ ನನ್ನ ನಿರೀಕ್ಷೆಗಳನ್ನು ಮೀರಿದೆ. ಸಿಬ್ಬಂದಿ ಗಮನಹರಿಸಿದ್ದರು, ವಾತಾವರಣವು ವಿಶ್ರಾಂತಿದಾಯಕವಾಗಿತ್ತು, ಮತ್ತು ನಾನು ಸಂಪೂರ್ಣವಾಗಿ ರಿಫ್ರೆಶ್ ಮತ್ತು ತೃಪ್ತಿ ಹೊಂದಿದ್ದೇನೆ.",
    "review.1.user": "ದೀಕ್ಷಿತ್",
    "review.1.role": "ದೈನಂದಿನ ಗ್ರಾಹಕ",

    "review.2.quote": "ನಿಜವಾದ ವಿಶ್ರಾಂತಿಯ ಅನುಭವ",
    "review.2.text": "ಸ್ಪಾ ಸೇವೆಗಳು ಅದ್ಭುತವಾಗಿವೆ ಮತ್ತು ಬಿಡುವಿಲ್ಲದ ವಾರದ ನಂತರ ನನಗೆ ವಿಶ್ರಾಂತಿ ಪಡೆಯಲು ಸಹಾಯ ಮಾಡಿತು. ಪರಿಸರವು ಶಾಂತಿಯುತವಾಗಿತ್ತು, ಮತ್ತು ಪ್ರತಿಯೊಂದು ವಿವರವನ್ನು ಚಿಂತನಶೀಲವಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
    "review.2.user": "ಸುಜಿತ್",
    "review.2.role": "ಅತ್ಯಧಿಕ ಸಂಭಾವನೆ ಪಡೆಯುವ ಗ್ರಾಹಕ",

    "review.3.quote": "ನನ್ನ ನೆಚ್ಚಿನ ಸಲೂನ್ ಮತ್ತು ಸ್ಪಾ",
    "review.3.text": "ಅಥರ್ವ ಹೆವೆನ್ ಸ್ವ-ಆರೈಕೆಗಾಗಿ ನನ್ನ ನೆಚ್ಚಿನ ತಾಣವಾಗಿದೆ. ಸೇವೆಯ ಗುಣಮಟ್ಟ, ಸ್ನೇಹಪರ ಸಿಬ್ಬಂದಿ ಮತ್ತು ಅತ್ಯುತ್ತಮ ಫಲಿತಾಂಶಗಳು ನನ್ನನ್ನು ಪ್ರತಿ ಬಾರಿಯೂ ಹಿಂತಿರುಗುವಂತೆ ಮಾಡುತ್ತವೆ.",
    "review.3.user": "ಸ್ನೇಹ",
    "review.3.role": "ವಾರಾಂತ್ಯದ ಗ್ರಾಹಕ",

    "contact.label": "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
    "contact.title": "ನಮ್ಮೊಂದಿಗೆ\nಮಾತನಾಡಿ",
    "contact.location.label": "ಸ್ಥಳ",
    "contact.location.address": "ಇಂಡಿಯನ್ ಬ್ಯಾಂಕ್ ಎದುರು, ವೀರಣ್ಣನ, 7 ನೇ ಎ ಕ್ರಾಸ್ ರಸ್ತೆ, ನಾಗವಾರ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ 560045",
    "contact.location.btn": "ನಿರ್ದೇಶನಗಳನ್ನು ಪಡೆಯಿರಿ",
    "contact.callback.label": "ಕಾಲ್ಬ್ಯಾಕ್ ವಿನಂತಿ",
    "contact.callback.placeholder": "ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    "contact.callback.success": "ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ತಲುಪುತ್ತೇವೆ",
    "contact.callback.desc": "12 ಆಕಾಶ ಗಂಟೆಗಳ ಒಳಗೆ ನಮ್ಮಿಂದ ಕರೆಯನ್ನು ಪಡೆಯಿರಿ.",
    "contact.hours.label": "ವಹಿವಾಟು ಸಮಯ",
    "contact.hours.mon_fri": "ಸೋಮವಾರ - ಶುಕ್ರವಾರ:",
    "contact.hours.mon_fri_time": "ಬೆಳಿಗ್ಗೆ 11:00 ರಿಂದ ರಾತ್ರಿ 8:30",
    "contact.hours.sat_sun": "ಶನಿವಾರ - ಭಾನುವಾರ:",
    "contact.hours.sat_sun_time": "ಬೆಳಿಗ್ಗೆ 10:30 ರಿಂದ ರಾತ್ರಿ 9:00",
    "contact.social.label": "ನಮ್ಮನ್ನು ಹಿಂಬಾಲಿಸಿ",

    "footer.nav": "ನ್ಯಾವಿಗೇಷನ್",
    "footer.social": "ಸಾಮಾಜಿಕ ಸಂಪರ್ಕ",
    "footer.connect.title": "ಫೋನ್ ಮೂಲಕ ಸಂಪರ್ಕಿಸಿ",
    "footer.connect.desc": "12 ಆಕಾಶ ಗಂಟೆಗಳ ಒಳಗೆ ನಮ್ಮಿಂದ ಕರೆಯನ್ನು ಪಡೆಯಿರಿ.",
    "footer.connect.placeholder": "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    "footer.connect.success": "ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ತಲುಪುತ್ತೇವೆ",
    "footer.connect.footer": "ಸುಲಭವಾಗಿ ಸಂಪರ್ಕಿಸಿ",
    "footer.copyright": "ತೇಜಸ್ ಆರ್ಯ ಅವರಿಂದ ರಚಿಸಲಾಗಿದೆ",
    "footer.typewriter": "ಅಥರ್ವ ಹೆವೆನ್",
    "social.instagram": "ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್",
    "social.facebook": "ಫೇಸ್‌ಬುಕ್",
    "social.twitter": "ಟ್ವಿಟರ್"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always default to English as requested
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "en" ? "kn" : "en"));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
