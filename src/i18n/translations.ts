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
  approach: {
    kicker: string;
    title: string;
    items: { title: string; desc: string }[];
  };
  statsBand: { value: string; label: string }[];
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
    waTemplate: string;
    loginToChoose: string;
  };
  auth: {
    authTitle: string;
    authSubtitle: string;
    authSubmit: string;
    signIn: string;
    signUp: string;
    signInTitle: string;
    signUpTitle: string;
    signInSubtitle: string;
    signUpSubtitle: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    submitSignIn: string;
    submitSignUp: string;
    toggleToSignUp: string;
    toggleToSignIn: string;
    logout: string;
    myProfile: string;
    account: string;
    errExists: string;
    errInvalid: string;
    errFields: string;
    errNotFound: string;
    errUnknown: string;
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
  footer: {
    tagline: string;
    rights: string;
    madeWith: string;
    quickTitle: string;
    servicesTitle: string;
    contactTitle: string;
    hours: string;
  };
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
    approach: {
      kicker: "הגישה שלי",
      title: "לעצב. לתכנן. לבנות. לדייק.",
      items: [
        {
          title: "עיצוב מתוך מחשבה",
          desc: "יצירתיות ופונקציונליות שנתפרות בדיוק לחזון ולמותג שלכם.",
        },
        {
          title: "תכנון חכם",
          desc: "כל מסך וכל כפתור מתוכננים מראש — מסע משתמש שמוביל לפעולה.",
        },
        {
          title: "בנייה איכותית",
          desc: "קוד נקי, מהיר ומאובטח — בסטנדרטים הגבוהים בתעשייה.",
        },
        {
          title: "עמידות בזמן",
          desc: "עיצוב שנשאר רלוונטי ומרשים גם שנים קדימה.",
        },
      ],
    },
    statsBand: [
      { value: "8", label: "שנות ניסיון" },
      { value: "+120", label: "פרויקטים שהושקו" },
      { value: "99%", label: "שביעות רצון" },
      { value: "+35", label: "לקוחות קבועים" },
      { value: "5★", label: "דירוג ממוצע" },
    ],
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
        { no: "01", title: "ייעוץ והיכרות", desc: "שיחה ראשונה להבנת הצרכים, המטרות והחזון שלכם." },
        { no: "02", title: "אפיון ואסטרטגיה", desc: "ממפים קהל, מתחרים ומטרות — ובונים תוכנית ברורה." },
        { no: "03", title: "עיצוב", desc: "מוקאפים חיים שמראים בדיוק איך האתר ייראה." },
        { no: "04", title: "פיתוח", desc: "אתר מהיר, רספונסיבי ונקי — עם אנימציות פרימיום." },
        { no: "05", title: "השקה ומסירה", desc: "בדיקות, אופטימיזציה ועלייה לאוויר — מוכן ומדויק." },
        { no: "06", title: "ליווי ותמיכה", desc: "נשארים איתכם גם אחרי ההשקה — עדכונים ושיפורים." },
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
      waTemplate:
        'היי מאיר! שמי {name} ואני מעוניין/ת בחבילת "{plan}" ({price}). אשמח לשמוע פרטים 🙌',
      loginToChoose: "התחברו כדי לבחור חבילה",
    },
    auth: {
      authTitle: "כמה פרטים ונמשיך",
      authSubtitle: "שם, אימייל וטלפון — פעם אחת בלבד, בלי סיסמאות.",
      authSubmit: "המשך",
      signIn: "התחברות",
      signUp: "הרשמה",
      signInTitle: "התחברות",
      signUpTitle: "יצירת חשבון",
      signInSubtitle: "התחברו כדי לבחור חבילה ולפנות אליי בוואטסאפ.",
      signUpSubtitle: "הירשמו בשניות — כדי לבחור חבילה ולשמור את הפרטים שלכם.",
      name: "שם מלא",
      email: "אימייל",
      phone: "טלפון",
      password: "סיסמה",
      submitSignIn: "התחברות",
      submitSignUp: "יצירת חשבון",
      toggleToSignUp: "אין לכם חשבון? הרשמה",
      toggleToSignIn: "כבר רשומים? התחברות",
      logout: "התנתקות",
      myProfile: "הפרופיל שלי",
      account: "חשבון",
      errExists: "האימייל הזה כבר רשום עם סיסמה אחרת — נסו להתחבר.",
      errInvalid: "הסיסמה שגויה — נסו שוב.",
      errFields: "נא למלא את כל השדות.",
      errNotFound: "לא מצאנו חשבון עם האימייל הזה — מילאנו לכם את טופס ההרשמה.",
      errUnknown: "אירעה שגיאה:",
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
      quickTitle: "ניווט מהיר",
      servicesTitle: "שירותים",
      contactTitle: "צרו קשר",
      hours: "א׳–ה׳ · 9:00–18:00",
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
    approach: {
      kicker: "My approach",
      title: "Design. Plan. Build. Perfect.",
      items: [
        {
          title: "Thoughtful Design",
          desc: "Creativity and function tailored precisely to your vision and brand.",
        },
        {
          title: "Smart Planning",
          desc: "Every screen and button planned ahead — a user journey that converts.",
        },
        {
          title: "Quality Build",
          desc: "Clean, fast, secure code — built to the industry's highest standards.",
        },
        {
          title: "Built to Last",
          desc: "Design that stays relevant and impressive for years to come.",
        },
      ],
    },
    statsBand: [
      { value: "8", label: "Years of experience" },
      { value: "120+", label: "Projects shipped" },
      { value: "99%", label: "Client satisfaction" },
      { value: "35+", label: "Returning clients" },
      { value: "5★", label: "Average rating" },
    ],
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
        { no: "01", title: "Consultation", desc: "A first call to understand your needs, goals and vision." },
        { no: "02", title: "Discovery & Strategy", desc: "We map your audience, competitors and goals into a clear plan." },
        { no: "03", title: "Design", desc: "Live mockups that show exactly how your site will look." },
        { no: "04", title: "Development", desc: "A fast, responsive, clean build with premium animations." },
        { no: "05", title: "Launch & Handover", desc: "Testing, optimization and go-live — polished and ready." },
        { no: "06", title: "Ongoing Support", desc: "We stay with you after launch — updates and improvements." },
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
      waTemplate:
        'Hi Meir! I\'m {name} and I\'m interested in the "{plan}" plan ({price}). Would love to hear more 🙌',
      loginToChoose: "Sign in to choose a plan",
    },
    auth: {
      authTitle: "A few details and we're set",
      authSubtitle: "Name, email and phone — once, no passwords.",
      authSubmit: "Continue",
      signIn: "Sign in",
      signUp: "Sign up",
      signInTitle: "Welcome back",
      signUpTitle: "Create an account",
      signInSubtitle: "Sign in to choose a plan and reach me on WhatsApp.",
      signUpSubtitle: "Sign up in seconds — to pick a plan and save your details.",
      name: "Full name",
      email: "Email",
      phone: "Phone",
      password: "Password",
      submitSignIn: "Sign in",
      submitSignUp: "Create account",
      toggleToSignUp: "No account yet? Sign up",
      toggleToSignIn: "Already registered? Sign in",
      logout: "Log out",
      myProfile: "My profile",
      account: "Account",
      errExists: "That email is registered with a different password — try signing in.",
      errInvalid: "Wrong password — try again.",
      errFields: "Please fill in all fields.",
      errNotFound: "No account with that email — we've switched you to sign-up.",
      errUnknown: "Something went wrong:",
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
      quickTitle: "Quick links",
      servicesTitle: "Services",
      contactTitle: "Contact us",
      hours: "Sun–Thu · 9:00–18:00",
    },
    langToggle: "עב",
  },
};
