import type { Lang } from "@/config";

export type Content = {
  dir: "rtl" | "ltr";
  nav: { work: string; services: string; process: string; pricing: string; contact: string; cta: string };
  hero: {
    badge: string;
    titleTop: string;
    titleAccent: string;
    titleBottom: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
  };
  marquee: string[];
  about: {
    kicker: string;
    title: string;
    body: string;
    points: string[];
    services: { title: string; desc: string }[];
    servicesKicker: string;
    servicesTitle: string;
    perks: { label: string; desc: string }[];
  };
  work: {
    kicker: string;
    title: string;
    desc: string;
    before: string;
    after: string;
    hint: string;
    featuredKicker: string;
    featuredTitle: string;
    featuredDesc: string;
    featuredTags: string[];
    visitSite: string;
    liveLabel: string;
  };
  process: {
    kicker: string;
    title: string;
    steps: { no: string; title: string; desc: string }[];
  };
  pricing: {
    kicker: string;
    title: string;
    desc: string;
    popular: string;
    period: string;
    cta: string;
    plans: { name: string; price: string; tagline: string; features: string[]; featured?: boolean }[];
    note: string;
  };
  contact: {
    kicker: string;
    title: string;
    desc: string;
    emailLabel: string;
    whatsappLabel: string;
    callLabel: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      sent: string;
    };
  };
  footer: { tagline: string; rights: string; madeWith: string };
  langToggle: string;
};

export const translations: Record<Lang, Content> = {
  he: {
    dir: "rtl",
    nav: {
      work: "עבודות",
      services: "שירותים",
      process: "תהליך",
      pricing: "חבילות",
      contact: "צור קשר",
      cta: "בואו נדבר",
    },
    hero: {
      badge: "פנוי ל-2 פרויקטים החודש",
      titleTop: "אתרים שנראים כמו",
      titleAccent: "מיליון דולר",
      titleBottom: "ועובדים כמו מכונת מכירות",
      subtitle:
        "אני מעצב ובונה אתרים שגורמים ללקוחות שלכם לעצור, להתרשם — וללחוץ. עיצוב פרימיום, ביצועים מהירים, ותוצאות שאפשר למדוד.",
      ctaPrimary: "בואו נבנה משהו",
      ctaSecondary: "צפו בעבודות",
      stats: [
        { value: "+120", label: "פרויקטים שהושקו" },
        { value: "8", label: "שנות ניסיון" },
        { value: "99%", label: "שביעות רצון" },
      ],
    },
    marquee: [
      "עיצוב UI/UX",
      "פיתוח אתרים",
      "חנויות אונליין",
      "מיתוג",
      "דפי נחיתה",
      "אנימציות",
      "SEO",
      "ביצועים",
    ],
    about: {
      kicker: "מי אני",
      title: "לא עוד אתר. נכס דיגיטלי שמייצר לכם לקוחות.",
      body:
        "כבר הרבה זמן שאני עוזר לעסקים להיראות בגדול באונליין. אני לא מוסר תבניות מוכנות — כל פרויקט נבנה מאפס, סביב המותג והמטרות שלכם, עם תשומת לב לכל פיקסל ולכל שנייה של טעינה.",
      points: [
        "עיצוב מותאם אישית — בלי תבניות משוכפלות",
        "מהירות טעינה וניקוד גבוה ב-Google",
        "מותאם מושלם למובייל ולכל מסך",
        "ליווי צמוד מהרעיון ועד העלייה לאוויר",
      ],
      servicesKicker: "מה אני עושה",
      servicesTitle: "שירות מקצה לקצה",
      perks: [
        { label: "זמינות גבוהה", desc: "זמינים בשבילכם מסביב לשעון, לכל שאלה או תקלה." },
        { label: "עיצוב לפי הלקוח", desc: "תיאום עיצוב מלא לפי הבקשה והטעם שלכם." },
        { label: "תיקונים חינם", desc: "תיקונים ללא עלות עד שבוע מהתוצאה הסופית." },
        { label: "הסבר על הכל", desc: "הסברה ברורה על כל דבר ודבר לאורך הדרך." },
      ],
      services: [
        { title: "עיצוב UI/UX", desc: "ממשקים יפים ואינטואיטיביים שמובילים את המשתמש לפעולה." },
        { title: "פיתוח אתרים", desc: "קוד נקי ומהיר, אתרים שנטענים בברק ומדורגים גבוה." },
        { title: "חנויות אונליין", desc: "חנויות שנבנו למכור — מהעגלה ועד הצ'ק-אאוט." },
        { title: "מיתוג ולוגו", desc: "זהות ויזואלית שלמה שגורמת לעסק שלכם להיראות יוקרתי." },
        { title: "דפי נחיתה", desc: "עמודים ממוקדי המרה לקמפיינים שמביאים לידים." },
        { title: "תחזוקה ו-SEO", desc: "אתר שממשיך לרוץ מהר, מאובטח ומופיע בגוגל." },
      ],
    },
    work: {
      kicker: "לפני / אחרי",
      title: "מדף ריק לאתר שמוכר",
      desc:
        "גררו את המחוון וראו את ההבדל. משמאל — נקודת ההתחלה. מימין — התוצאה שאתם מקבלים.",
      before: "לפני",
      after: "אחרי",
      hint: "גררו כדי להשוות",
      featuredKicker: "פרויקט חי",
      featuredTitle: "שפע אצל יוסי מוזס",
      featuredDesc:
        "אתר תדמית לעסק מקומי — פירות, ירקות ומיני-סופרמרקט. עיצוב נקי, מותאם מושלם למובייל, עם דגש על המוצרים ויצירת קשר מהירה. גללו ובדקו אותו חי כאן למטה.",
      featuredTags: ["אתר עסקי", "עיצוב רספונסיבי", "חנות מקומית"],
      visitSite: "פתיחת האתר החי",
      liveLabel: "חי",
    },
    process: {
      kicker: "איך זה עובד",
      title: "תהליך פשוט. תוצאה מרשימה.",
      steps: [
        { no: "01", title: "אפיון ואסטרטגיה", desc: "מבינים את המטרות, הקהל והמתחרים — ובונים תוכנית פעולה ברורה." },
        { no: "02", title: "עיצוב", desc: "מוקאפים חיים שמראים בדיוק איך האתר ייראה, עד לפרט האחרון." },
        { no: "03", title: "פיתוח", desc: "בונים אתר מהיר, רספונסיבי ונקי — עם אנימציות שמרגישות פרימיום." },
        { no: "04", title: "עלייה לאוויר", desc: "בדיקות, אופטימיזציה, השקה — וליווי גם אחרי שהאתר עלה." },
      ],
    },
    pricing: {
      kicker: "חבילות",
      title: "מחיר הוגן. ערך שרואים.",
      desc: "כל חבילה כוללת עיצוב מותאם אישית, התאמה למובייל וליווי אישי.",
      popular: "הכי פופולרי",
      period: "החל מ־",
      cta: "בחירת חבילה",
      plans: [
        {
          name: "בסיסי",
          price: "₪300",
          tagline: "דף נחיתה אחד",
          features: ["עמוד אחד ממוקד המרה", "עיצוב מותאם אישית", "מותאם למובייל", "טופס יצירת קשר", "מסירה תוך 1 יום"],
        },
        {
          name: "פרו",
          price: "₪600",
          tagline: "אתר מלא לעסק",
          features: ["עד 3 עמודים", "עיצוב פרימיום + אנימציות", "בלוג / חדשות", "אופטימיזציית SEO בסיסית", "אינטגרציית וואטסאפ", "שבוע תמיכה חינם"],
          featured: true,
        },
        {
          name: "אקסטרים",
          price: "₪1000",
          tagline: "חנות אונליין שמוכרת",
          features: ["חנות מלאה ", "ניהול מוצרים ומלאי", "עד 10 עמודים" ,"עמודי מוצר מעוצבים", "אופטימיזציית SEO מתקדמת", "אנליטיקס ופיקסלים", "1 חודשי תמיכה"],
        },
      ],
      note: "לא בטוחים מה מתאים? ספרו לי על הפרויקט ואבנה הצעה מדויקת.",
    },
    contact: {
      kicker: "בואו נתחיל",
      title: "יש לכם פרויקט בראש?",
      desc: "השאירו פרטים או כתבו לי ישירות — אחזור אליכם תוך 24 שעות עם רעיונות ראשונים.",
      emailLabel: "אימייל",
      whatsappLabel: "וואטסאפ",
      callLabel: "טלפון",
      form: {
        name: "השם שלך",
        email: "אימייל",
        message: "ספרו לי על הפרויקט...",
        submit: "שליחה בוואטסאפ",
        sent: "פותח וואטסאפ עם ההודעה שלכם — רק ללחוץ שליחה 💬",
      },
    },
    footer: {
      tagline: "עיצוב ובניית אתרים פרימיום.",
      rights: "כל הזכויות שמורות.",
      madeWith: "נבנה באהבה ובקוד נקי",
    },
    langToggle: "EN",
  },
  en: {
    dir: "ltr",
    nav: {
      work: "Work",
      services: "Services",
      process: "Process",
      pricing: "Pricing",
      contact: "Contact",
      cta: "Let's talk",
    },
    hero: {
      badge: "Open for 2 projects this month",
      titleTop: "Websites that look like",
      titleAccent: "a million bucks",
      titleBottom: "and sell like a machine",
      subtitle:
        "I design and build websites that make your customers stop, stare — and click. Premium design, blazing performance, and results you can measure.",
      ctaPrimary: "Let's build something",
      ctaSecondary: "See the work",
      stats: [
        { value: "120+", label: "Projects shipped" },
        { value: "8", label: "Years of craft" },
        { value: "99%", label: "Client satisfaction" },
      ],
    },
    marquee: [
      "UI/UX Design",
      "Web Development",
      "E-commerce",
      "Branding",
      "Landing Pages",
      "Animation",
      "SEO",
      "Performance",
    ],
    about: {
      kicker: "Who I am",
      title: "Not just a website. A digital asset that brings you clients.",
      body:
        "For eight years I've helped businesses look bigger online. No cookie-cutter templates — every project is built from scratch around your brand and goals, with obsessive attention to every pixel and every millisecond of load time.",
      points: [
        "Fully custom design — never a recycled template",
        "Fast load times & high Google scores",
        "Pixel-perfect on mobile and every screen",
        "Hands-on partnership from idea to launch",
      ],
      servicesKicker: "What I do",
      servicesTitle: "End-to-end service",
      perks: [
        { label: "24/7 Availability", desc: "Available around the clock for any question or issue." },
        { label: "Design your way", desc: "Full design coordination to your request and taste." },
        { label: "Free fixes", desc: "Free revisions up to a week after final delivery." },
        { label: "Clear guidance", desc: "A clear explanation of every step along the way." },
      ],
      services: [
        { title: "UI/UX Design", desc: "Beautiful, intuitive interfaces that guide users to action." },
        { title: "Web Development", desc: "Clean, fast code — sites that load instantly and rank high." },
        { title: "E-commerce", desc: "Stores built to sell, from cart to checkout." },
        { title: "Branding & Logo", desc: "A full visual identity that makes your business look premium." },
        { title: "Landing Pages", desc: "Conversion-focused pages for campaigns that bring leads." },
        { title: "Maintenance & SEO", desc: "A site that stays fast, secure, and visible on Google." },
      ],
    },
    work: {
      kicker: "Before / After",
      title: "From blank page to a site that sells",
      desc:
        "Drag the slider and see the difference. Left — the starting point. Right — the result you get.",
      before: "Before",
      after: "After",
      hint: "Drag to compare",
      featuredKicker: "Live project",
      featuredTitle: "Shefa — Yossi Moses",
      featuredDesc:
        "A business site for a local grocery — fresh produce & mini-market. Clean, fully mobile-first design focused on products and quick contact. Scroll and try it live right below.",
      featuredTags: ["Business site", "Responsive design", "Local shop"],
      visitSite: "Open the live site",
      liveLabel: "Live",
    },
    process: {
      kicker: "How it works",
      title: "Simple process. Stunning result.",
      steps: [
        { no: "01", title: "Discovery & Strategy", desc: "We map your goals, audience and competitors — and set a clear plan." },
        { no: "02", title: "Design", desc: "Live mockups that show exactly how your site will look, down to the detail." },
        { no: "03", title: "Development", desc: "A fast, responsive, clean build — with animations that feel premium." },
        { no: "04", title: "Launch", desc: "Testing, optimization, go-live — plus support after you're live." },
      ],
    },
    pricing: {
      kicker: "Pricing",
      title: "Fair price. Visible value.",
      desc: "Every package includes custom design, mobile optimization and personal support.",
      popular: "Most popular",
      period: "from",
      cta: "Choose plan",
      plans: [
        {
          name: "Landing",
          price: "$890",
          tagline: "One page that converts",
          features: ["Single conversion-focused page", "Custom design", "Mobile optimized", "Contact form", "Delivered in 7 days"],
        },
        {
          name: "Business",
          price: "$1,990",
          tagline: "A full business website",
          features: ["Up to 6 pages", "Premium design + animation", "Blog / news", "Basic SEO setup", "WhatsApp integration", "1 month free support"],
          featured: true,
        },
        {
          name: "Store",
          price: "$3,690",
          tagline: "An online store that sells",
          features: ["Full store + payments", "Product & inventory management", "Designed product pages", "Advanced SEO", "Analytics & pixels", "3 months support"],
        },
      ],
      note: "Not sure which fits? Tell me about the project and I'll craft an exact quote.",
    },
    contact: {
      kicker: "Let's start",
      title: "Got a project in mind?",
      desc: "Leave your details or message me directly — I'll reply within 24 hours with first ideas.",
      emailLabel: "Email",
      whatsappLabel: "WhatsApp",
      callLabel: "Call",
      form: {
        name: "Your name",
        email: "Email",
        message: "Tell me about the project...",
        submit: "Send via WhatsApp",
        sent: "Opening WhatsApp with your message — just hit send 💬",
      },
    },
    footer: {
      tagline: "Premium web design & development.",
      rights: "All rights reserved.",
      madeWith: "Built with love and clean code",
    },
    langToggle: "עב",
  },
};
