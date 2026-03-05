import { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
   CERTIFYAI — EdTech Certification Platform
   Design: Bold dark-first editorial, sharp geometric, neon accents
   Fonts: Syne (display) + Instrument Serif (accent) + IBM Plex Mono
   Colors: Near-black canvas, electric lime accent, slate-blue secondary
   ============================================================ */

// ─── THEME ──────────────────────────────────────────────────
const T = { 
  dark: {
    bg: "#0A0A0B",
    bg2: "#111114",
    bg3: "#18181D",
    card: "#16161A",
    cardHover: "#1E1E24",
    border: "#2A2A35",
    borderBright: "#3D3D52",
    text: "#F2F2F5",
    text2: "#9090A8",
    text3: "#5A5A70",
    lime: "#C8FF00",
    limeHover: "#D4FF33",
    limeDim: "#C8FF0018",
    limeBorder: "#C8FF0035",
    blue: "#4F8EF7",
    blueDim: "#4F8EF715",
    purple: "#9D7AFF",
    purpleDim: "#9D7AFF15",
    orange: "#FF7A45",
    orangeDim: "#FF7A4515",
    success: "#00D68F",
    successDim: "#00D68F15",
    danger: "#FF4D6A",
    dangerDim: "#FF4D6A15",
    warning: "#FFB800",
    warningDim: "#FFB80015",
    nav: "rgba(10,10,11,0.92)",
    glass: "rgba(22,22,26,0.85)",
    overlay: "rgba(0,0,0,0.75)",
  },
  light: {
    bg: "#F5F5F0",
    bg2: "#EBEBЕ4",
    bg3: "#FFFFFF",
    card: "#FFFFFF",
    cardHover: "#F8F8F5",
    border: "#E0E0D8",
    borderBright: "#C8C8C0",
    text: "#0A0A0B",
    text2: "#5A5A6A",
    text3: "#9090A0",
    lime: "#4A7C00",
    limeHover: "#3A6200",
    limeDim: "#4A7C0012",
    limeBorder: "#4A7C0030",
    blue: "#2563EB",
    blueDim: "#2563EB12",
    purple: "#7C3AED",
    purpleDim: "#7C3AED12",
    orange: "#C2410C",
    orangeDim: "#C2410C12",
    success: "#059669",
    successDim: "#05966912",
    danger: "#DC2626",
    dangerDim: "#DC262612",
    warning: "#D97706",
    warningDim: "#D9770612",
    nav: "rgba(245,245,240,0.92)",
    glass: "rgba(255,255,255,0.88)",
    overlay: "rgba(0,0,0,0.55)",
  },
};

// ─── DATA ────────────────────────────────────────────────────
const COURSES = [
  {
    id: "excel",
    title: "MS Excel",
    sub: "Zero to Expert",
    cat: "Business",
    icon: "⬛",
    emoji: "📊",
    color: "#00D68F",
    students: "82K",
    rating: 4.9,
    modules: 18,
    hours: "24h",
    certPrices: { beginner: 299, intermediate: 499, expert: 799 },
    tags: ["Formulas", "Pivot Tables", "VBA", "Dashboards"],
    instructor: "Priya Sharma",
    badge: null,
  },
  {
    id: "photoshop",
    title: "Photoshop",
    sub: "Complete Mastery",
    cat: "Design",
    icon: "🎨",
    emoji: "🎨",
    color: "#4F8EF7",
    students: "54K",
    rating: 4.8,
    modules: 22,
    hours: "32h",
    certPrices: { beginner: 349, intermediate: 549, expert: 899 },
    tags: ["Photo Editing", "UI Design", "Retouching"],
    instructor: "Rahul Menon",
    badge: null,
  },
  {
    id: "aitools",
    title: "AI Tools",
    sub: "ChatGPT · Claude · More",
    cat: "AI & Tech",
    icon: "🤖",
    emoji: "🤖",
    color: "#9D7AFF",
    students: "1.2L",
    rating: 4.9,
    modules: 14,
    hours: "18h",
    certPrices: { beginner: 399, intermediate: 599, expert: 999 },
    tags: ["Prompt Eng", "Automation", "Midjourney"],
    instructor: "Arjun Krishnan",
    badge: "HOT",
  },
  {
    id: "canva",
    title: "Canva",
    sub: "Design Masterclass",
    cat: "Design",
    icon: "✏️",
    emoji: "✏️",
    color: "#FF7A45",
    students: "67K",
    rating: 4.7,
    modules: 12,
    hours: "16h",
    certPrices: { beginner: 249, intermediate: 449, expert: 699 },
    tags: ["Social Media", "Branding", "Templates"],
    instructor: "Neha Kapoor",
    badge: null,
  },
  {
    id: "digitalmarketing",
    title: "Digital Marketing",
    sub: "Full Stack Strategy",
    cat: "Business",
    icon: "📱",
    emoji: "📱",
    color: "#FFB800",
    students: "45K",
    rating: 4.6,
    modules: 16,
    hours: "20h",
    certPrices: { beginner: 299, intermediate: 499, expert: 799 },
    tags: ["SEO", "Google Ads", "Analytics"],
    instructor: "Vikram Bhat",
    badge: null,
  },
  {
    id: "powerpoint",
    title: "PowerPoint",
    sub: "Executive Presentations",
    cat: "Business",
    icon: "📽️",
    emoji: "📽️",
    color: "#FF4D6A",
    students: "38K",
    rating: 4.7,
    modules: 10,
    hours: "12h",
    certPrices: { beginner: 199, intermediate: 349, expert: 599 },
    tags: ["Slide Design", "Storytelling", "Animations"],
    instructor: "Sunita Reddy",
    badge: null,
  },
];

const LEVELS = [
  {
    id: "beginner",
    label: "Beginner",
    icon: "🌱",
    qs: 30,
    mins: 30,
    desc: "Core foundations & concepts",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    icon: "⚡",
    qs: 45,
    mins: 45,
    desc: "Applied skills & real-world",
  },
  {
    id: "expert",
    label: "Expert",
    icon: "🏆",
    qs: 60,
    mins: 60,
    desc: "Advanced mastery & edge cases",
  },
];

const SAMPLE_QS = [
  {
    q: "Which Excel function returns the current date AND time?",
    opts: ["=DATE()", "=NOW()", "=TODAY()", "=TIMESTAMP()"],
    correct: 1,
    exp: "=NOW() returns the current date and time. =TODAY() returns only the date.",
  },
  {
    q: "What does VLOOKUP stand for?",
    opts: [
      "Virtual Lookup",
      "Vertical Lookup",
      "Variable Lookup",
      "Value Lookup",
    ],
    correct: 1,
    exp: "VLOOKUP = Vertical Lookup. It searches vertically (downward) through a column.",
  },
  {
    q: "In AI prompt engineering, what is 'few-shot prompting'?",
    opts: [
      "Running the model a few times",
      "Providing example input-output pairs in the prompt",
      "Limiting output length",
      "Fine-tuning on few samples",
    ],
    correct: 1,
    exp: "Few-shot prompting provides example input-output pairs within the prompt to guide model behaviour.",
  },
  {
    q: "What does 'AI hallucination' mean?",
    opts: [
      "AI generating images",
      "AI making up false but confident information",
      "AI refusing answers",
      "AI running slowly",
    ],
    correct: 1,
    exp: "Hallucination refers to AI generating plausible-sounding but factually incorrect information.",
  },
  {
    q: "Which shortcut selects ALL cells in Excel?",
    opts: ["Ctrl+S", "Ctrl+A", "Ctrl+Z", "Alt+A"],
    correct: 1,
    exp: "Ctrl+A selects all cells in the current worksheet.",
  },
];

const TESTIMONIALS = [
  {
    name: "Ananya V.",
    role: "Data Analyst · TCS",
    cert: "Excel Expert",
    score: 92,
    avatar: "AV",
    color: "#00D68F",
    text: "The expert exam was genuinely hard. Passed with 92% — my manager noticed the cert on LinkedIn within a week!",
  },
  {
    name: "Rohan M.",
    role: "Freelance Designer",
    cert: "Photoshop Intermediate",
    score: 81,
    avatar: "RM",
    color: "#4F8EF7",
    text: "QR verification is a game-changer. Clients scan and instantly trust my skills. Worth every rupee.",
  },
  {
    name: "Preethi N.",
    role: "Social Media Manager",
    cert: "AI Tools Expert",
    score: 95,
    avatar: "PN",
    color: "#9D7AFF",
    text: "Most rigorous online cert I've taken. AI-generated questions actually test real usage. No cramming shortcuts!",
  },
  {
    name: "Karan G.",
    role: "MBA · IIM Calcutta",
    cert: "Digital Marketing",
    score: 78,
    avatar: "KG",
    color: "#FFB800",
    text: "Got 3 interview calls mentioning my CertifyAI cert specifically. The QR scanner sold them instantly.",
  },
];

// ─── UTILITIES ───────────────────────────────────────────────
const fmtPrice = (n: number) => `₹${n}`;

const fmtTime = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const genCertId = () => {
  return `CAI-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .substr(2, 5)
    .toUpperCase()}`;
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

function calcScore(answers: any[], questions: any[]) {
  const correct = questions.reduce(
    (n: number, q: any, i: number) => n + (answers[i] === q.correct ? 1 : 0),
    0
  );
  return Math.round((correct / questions.length) * 100);
}

function getQuestions(courseId, level) {
  const base = [...SAMPLE_QS];
  const count = LEVELS.find((l) => l.id === level)?.qs || 30;
  while (base.length < count)
    base.push({
      ...SAMPLE_QS[base.length % SAMPLE_QS.length],
      q: `[Advanced] ${SAMPLE_QS[base.length % SAMPLE_QS.length].q}`,
    });
  return base.slice(0, count).sort(() => Math.random() - 0.5);
}

// ─── GLOBAL CSS ──────────────────────────────────────────────
function CSS({ t }) {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{font-family:'Syne',sans-serif;background:${t.bg};color:${t.text};overflow-x:hidden;-webkit-font-smoothing:antialiased;transition:background .3s,color .3s}
      ::selection{background:${t.lime};color:${t.bg}}
      ::-webkit-scrollbar{width:4px}
      ::-webkit-scrollbar-track{background:${t.bg}}
      ::-webkit-scrollbar-thumb{background:${t.border};border-radius:4px}

      /* Typography */
      .syne{font-family:'Syne',sans-serif}
      .serif{font-family:'Instrument Serif',serif}
      .mono{font-family:'IBM Plex Mono',monospace}

      /* Layout */
      .page-wrap{padding-top:64px;min-height:100vh}
      .container{max-width:1160px;margin:0 auto;padding:0 24px}

      /* ── NAVBAR ── */
      .navbar{
        position:fixed;top:0;left:0;right:0;z-index:200;height:64px;
        display:flex;align-items:center;padding:0 28px;
        background:${t.nav};backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
        border-bottom:1px solid ${t.border};
        transition:background .3s,border-color .3s;
      }

      /* ── BUTTONS ── */
      .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:'Syne',sans-serif;font-weight:700;font-size:13px;letter-spacing:.02em;border:none;border-radius:6px;cursor:pointer;transition:all .15s;text-decoration:none;white-space:nowrap;position:relative;overflow:hidden}
      .btn-lime{background:${t.lime};color:${t.bg};padding:10px 22px}
      .btn-lime:hover{background:${t.limeHover};transform:translateY(-1px);box-shadow:0 6px 24px ${t.lime}40}
      .btn-outline{background:transparent;color:${t.text};border:1.5px solid ${t.border};padding:9px 21px}
      .btn-outline:hover{border-color:${t.text};background:${t.text}08}
      .btn-ghost{background:transparent;color:${t.text2};padding:8px 14px;border-radius:6px}
      .btn-ghost:hover{background:${t.bg3};color:${t.text}}
      .btn-danger{background:${t.danger};color:#fff;padding:10px 22px}
      .btn-danger:hover{opacity:.9;transform:translateY(-1px)}
      .btn-success{background:${t.success};color:${t.bg};padding:10px 22px}
      .btn-success:hover{opacity:.9;transform:translateY(-1px)}
      .btn-sm{padding:6px 14px;font-size:12px;border-radius:5px}
      .btn-lg{padding:14px 32px;font-size:15px;border-radius:8px}
      .btn-xl{padding:16px 40px;font-size:16px;border-radius:8px}
      .btn-disabled{opacity:.4;pointer-events:none}

      /* ── CARDS ── */
      .card{background:${t.card};border:1px solid ${t.border};border-radius:12px;transition:border-color .2s,box-shadow .2s,transform .2s;overflow:hidden}
      .card:hover{border-color:${t.borderBright};box-shadow:0 8px 32px ${t.bg}80;transform:translateY(-2px)}
      .card-glass{background:${t.glass};border:1px solid ${t.border};border-radius:12px;backdrop-filter:blur(16px)}
      .card-lime{border-color:${t.limeBorder};background:${t.limeDim}}

      /* ── INPUTS ── */
      .input{background:${t.bg3};border:1.5px solid ${t.border};border-radius:8px;color:${t.text};font-family:'Syne',sans-serif;font-size:14px;padding:11px 16px;width:100%;outline:none;transition:border-color .15s,box-shadow .15s}
      .input:focus{border-color:${t.lime};box-shadow:0 0 0 3px ${t.limeDim}}
      .input::placeholder{color:${t.text3}}
      textarea.input{resize:vertical;min-height:100px}

      /* ── BADGES ── */
      .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:4px;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase}
      .badge-lime{background:${t.limeDim};color:${t.lime};border:1px solid ${t.limeBorder}}
      .badge-blue{background:${t.blueDim};color:${t.blue};border:1px solid ${t.blue}35}
      .badge-purple{background:${t.purpleDim};color:${t.purple};border:1px solid ${t.purple}35}
      .badge-orange{background:${t.orangeDim};color:${t.orange};border:1px solid ${t.orange}35}
      .badge-success{background:${t.successDim};color:${t.success};border:1px solid ${t.success}35}
      .badge-danger{background:${t.dangerDim};color:${t.danger};border:1px solid ${t.danger}35}
      .badge-warning{background:${t.warningDim};color:${t.warning};border:1px solid ${t.warning}35}
      .badge-hot{background:${t.danger};color:#fff}

      /* ── PROGRESS ── */
      .pbar{background:${t.bg3};border-radius:100px;overflow:hidden}
      .pbar-fill{height:100%;border-radius:100px;background:${t.lime};transition:width .6s ease}

      /* ── DIVIDER ── */
      .divider{height:1px;background:${t.border}}

      /* ── MODAL ── */
      .overlay{position:fixed;inset:0;z-index:300;background:${t.overlay};backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:16px}
      .modal{background:${t.card};border:1px solid ${t.borderBright};border-radius:16px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;padding:36px;animation:scaleIn .25s ease}

      /* ── ANIMATIONS ── */
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes scaleIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
      @keyframes slideRight{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      @keyframes gradientShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
      @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
      @keyframes scanLine{0%{top:-10%}100%{top:110%}}

      .afu{animation:fadeUp .5s ease both}
      .afi{animation:fadeIn .4s ease both}
      .asi{animation:scaleIn .3s ease both}
      .asr{animation:slideRight .4s ease both}
      .afloat{animation:floatY 3.5s ease-in-out infinite}
      .apulse{animation:pulse 2s ease infinite}
      .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}
      .d4{animation-delay:.4s}.d5{animation-delay:.5s}.d6{animation-delay:.6s}

      /* ── GRADIENT TEXT ── */
      .gtext-lime{background:linear-gradient(135deg,${t.lime},#80FF80);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      .gtext-multi{background:linear-gradient(135deg,${t.lime} 0%,${t.blue} 50%,${t.purple} 100%);background-size:200% 200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradientShift 4s ease infinite}

      /* ── EXAM MODE ── */
      .exam-wrap{position:fixed;inset:0;z-index:400;background:${t.bg};overflow-y:auto}

      /* ── SIDEBAR ── */
      .sidebar{width:264px;flex-shrink:0;border-right:1px solid ${t.border};background:${t.card};overflow-y:auto}

      /* ── TAG ── */
      .tag{display:inline-block;padding:3px 10px;border-radius:4px;font-size:11px;font-weight:600;background:${t.bg3};color:${t.text2};border:1px solid ${t.border}}

      /* ── TOOLTIP ── */
      .tip-wrap{position:relative}
      .tip{position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);background:${t.text};color:${t.bg};padding:5px 10px;border-radius:6px;font-size:11px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s}
      .tip-wrap:hover .tip{opacity:1}

      /* ── MOBILE ── */
      @media(max-width:768px){
        .hide-m{display:none!important}
        .modal{padding:24px}
        .sidebar{width:100%}
      }
    `}</style>
  );
}

// ─── SHARED COMPONENTS ───────────────────────────────────────
function Spinner({ size = 18, color }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: "spin 1s linear infinite", flexShrink: 0 }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color || "currentColor"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="32 10"
      />
    </svg>
  );
}

function Avatar({ name, size = 36, bg }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg || "#9D7AFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 800,
        fontSize: size * 0.36,
        fontFamily: "'Syne',sans-serif",
        flexShrink: 0,
      }}
    >
      {initials(name)}
    </div>
  );
}

function Stars({ n = 5 }) {
  return (
    <span style={{ color: "#FFB800", letterSpacing: 1, fontSize: 13 }}>
      {"★".repeat(Math.round(n))}
      {"☆".repeat(5 - Math.round(n))}
    </span>
  );
}

function LevelBadge({ level }) {
  const map = {
    beginner: ["badge-success", "🌱"],
    intermediate: ["badge-blue", "⚡"],
    expert: ["badge-purple", "🏆"],
  };
  const [cls, ic] = map[level] || ["badge-blue", "•"];
  return (
    <span className={`badge ${cls}`}>
      {ic} {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}

// ─── NAVIGATION ──────────────────────────────────────────────
function Nav({ page, setPage, isDark, setIsDark, user, setUser, t }) {
  const [showAuth, setShowAuth] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav
        className="navbar"
        style={{ boxShadow: scrolled ? `0 1px 0 ${t.border}` : "none" }}
      >
        {/* Logo */}
        <button
          onClick={() => setPage("home")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginRight: 32,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: t.lime,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
            }}
          >
            ⬡
          </div>
          <span
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: 17,
              letterSpacing: "-.03em",
              color: t.text,
            }}
          >
            Certify<span style={{ color: t.lime }}>AI</span>
          </span>
        </button>

        {/* Nav links */}
        <div className="hide-m" style={{ display: "flex", gap: 2, flex: 1 }}>
          {[
            ["home", "Home"],
            ["courses", "Courses"],
            ["pricing", "Pricing"],
            ["verify", "Verify Cert"],
          ].map(([id, label]) => (
            <button
              key={id}
              className="btn btn-ghost"
              style={{
                fontWeight: page === id ? 700 : 500,
                color: page === id ? t.lime : t.text2,
                fontSize: 13,
              }}
              onClick={() => setPage(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginLeft: "auto",
          }}
        >
          <button
            onClick={() => setIsDark(!isDark)}
            style={{
              width: 34,
              height: 34,
              borderRadius: 6,
              background: t.bg3,
              border: `1px solid ${t.border}`,
              cursor: "pointer",
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all .15s",
            }}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setPage("dashboard")}
                style={{ color: t.text2, fontSize: 12 }}
              >
                Dashboard
              </button>
              {user.isAdmin && (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setPage("admin")}
                  style={{ color: t.warning, fontSize: 12 }}
                >
                  Admin
                </button>
              )}
              <button
                onClick={() => setPage("dashboard")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Avatar name={user.name} size={32} bg={t.lime} />
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn btn-ghost btn-sm hide-m"
                onClick={() => setShowAuth("login")}
              >
                Sign in
              </button>
              <button
                className="btn btn-lime btn-sm"
                onClick={() => setShowAuth("signup")}
              >
                Get started
              </button>
            </div>
          )}
        </div>
      </nav>

      {showAuth && (
        <AuthModal
          mode={showAuth}
          t={t}
          onClose={() => setShowAuth(false)}
          onAuth={(u) => {
            setUser(u);
            setShowAuth(false);
            setPage("dashboard");
          }}
        />
      )}
    </>
  );
}

// ─── AUTH MODAL ──────────────────────────────────────────────
function AuthModal({ mode: init, t, onClose, onAuth }) {
  const [mode, setMode] = useState(init);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    onAuth({
      id: "u1",
      name:
        form.name ||
        form.email
          .split("@")[0]
          .replace(/[._]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
      email: form.email,
      plan: "free",
      enrolledCourses: ["excel", "aitools"],
      certificates: [
        {
          certId: "CAI-LX4K2M-9ABCD",
          course: "MS Excel",
          level: "expert",
          score: 88,
          date: "15 Jan 2025",
        },
      ],
      isAdmin: form.email.includes("admin"),
    });
  };

  return (
    <div className="overlay afi" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: t.lime,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              marginBottom: 16,
            }}
          >
            ⬡
          </div>
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: 22,
              fontWeight: 800,
              marginBottom: 4,
            }}
          >
            {mode === "login" ? "Welcome back" : "Join CertifyAI"}
          </h2>
          <p style={{ color: t.text2, fontSize: 14 }}>
            {mode === "login"
              ? "Sign in to continue learning"
              : "Free courses. Paid certs. Real skills."}
          </p>
        </div>

        {/* Google */}
        <button
          style={{
            width: "100%",
            padding: "11px 16px",
            borderRadius: 8,
            border: `1.5px solid ${t.border}`,
            background: t.bg3,
            cursor: "pointer",
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: 13,
            color: t.text,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 20,
            transition: "all .15s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = t.borderBright;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = t.border;
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <div className="divider" style={{ flex: 1 }} />
          <span style={{ color: t.text3, fontSize: 12 }}>or</span>
          <div className="divider" style={{ flex: 1 }} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {mode === "signup" && (
            <input
              className="input"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          )}
          <input
            className="input"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
        </div>

        <button
          className={`btn btn-lime btn-lg ${
            !form.email || !form.password ? "btn-disabled" : ""
          }`}
          style={{ width: "100%" }}
          onClick={submit}
          disabled={loading}
        >
          {loading ? (
            <Spinner color={t.bg} />
          ) : mode === "login" ? (
            "Sign In →"
          ) : (
            "Create Account →"
          )}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: 14,
            fontSize: 13,
            color: t.text2,
          }}
        >
          {mode === "login" ? "No account? " : "Already joined? "}
          <span
            style={{ color: t.lime, cursor: "pointer", fontWeight: 700 }}
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign up free" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────
function HomePage({ t, setPage, setCourse }) {
  const [catFilter, setCatFilter] = useState("All");
  const cats = ["All", "Design", "Business", "AI & Tech"];

  return (
    <div className="page-wrap">
      {/* ── HERO ── */}
      <section
        style={{
          padding: "88px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid bg pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${t.border} 1px, transparent 1px), linear-gradient(90deg, ${t.border} 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 400,
            background: `radial-gradient(ellipse at center, ${t.lime}14 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative" }}>
          <div style={{ maxWidth: 760 }}>
            {/* Pill */}
            <div
              className="afu"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px 6px 6px",
                border: `1px solid ${t.limeBorder}`,
                borderRadius: 100,
                background: t.limeDim,
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  background: t.lime,
                  color: t.bg,
                  borderRadius: 100,
                  padding: "2px 8px",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: ".05em",
                }}
              >
                NEW
              </span>
              <span style={{ fontSize: 13, color: t.lime, fontWeight: 600 }}>
                AI Tools Mastery — now live with 60-min Expert exam
              </span>
            </div>

            {/* Headline */}
            <h1
              className="afu d1"
              style={{
                fontSize: "clamp(40px, 7vw, 82px)",
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-.04em",
                marginBottom: 24,
              }}
            >
              Learn{" "}
              <span className="serif" style={{ fontStyle: "italic" }}>
                Skills
              </span>{" "}
              Free.
              <br />
              Get Certified
              <br />
              <span className="gtext-lime">with AI.</span>
            </h1>

            <p
              className="afu d2"
              style={{
                fontSize: "clamp(15px, 2vw, 18px)",
                color: t.text2,
                lineHeight: 1.75,
                marginBottom: 36,
                maxWidth: 560,
              }}
            >
              Access world-class courses at zero cost. Pay only for AI-proctored
              certification exams that employers actually trust — starting at{" "}
              <strong style={{ color: t.text }}>₹199</strong>.
            </p>

            <div
              className="afu d3"
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <button
                className="btn btn-lime btn-xl"
                onClick={() => setPage("courses")}
              >
                Explore Courses ↗
              </button>
              <button
                className="btn btn-outline btn-xl"
                onClick={() => setPage("verify")}
              >
                Verify a Certificate
              </button>
            </div>

            {/* Social proof row */}
            <div
              className="afu d4"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                marginTop: 48,
                flexWrap: "wrap",
              }}
            >
              {/* Avatars */}
              <div style={{ display: "flex" }}>
                {["#9D7AFF", "#4F8EF7", "#00D68F", "#FF7A45", "#FFB800"].map(
                  (c, i) => (
                    <div
                      key={i}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: c,
                        border: `2px solid ${t.bg}`,
                        marginLeft: i > 0 ? -10 : 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        color: "#fff",
                        fontWeight: 800,
                      }}
                    >
                      {["AV", "RM", "PN", "KG", "AS"][i]}
                    </div>
                  )
                )}
              </div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>
                4 Lakh+{" "}
                <span style={{ color: t.text2, fontWeight: 400 }}>
                  learners · 180+ cities
                </span>
              </div>
              <div style={{ width: 1, height: 24, background: t.border }} />
              <div style={{ fontWeight: 700, fontSize: 14 }}>
                ⭐ 4.9{" "}
                <span style={{ color: t.text2, fontWeight: 400 }}>
                  · 50K+ certs issued
                </span>
              </div>
            </div>
          </div>

          {/* Hero visual — certificate mockup */}
          <div
            className="afloat hide-m"
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-55%)",
              width: 340,
            }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${t.lime}DD, #40C800DD)`,
                borderRadius: 16,
                padding: 28,
                color: t.bg,
                position: "relative",
                overflow: "hidden",
                fontFamily: "'Syne',sans-serif",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -30,
                  right: -30,
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,.08)",
                }}
              />
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 3,
                  opacity: 0.7,
                  marginBottom: 6,
                }}
              >
                CERTIFYAI
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
                Certificate of Mastery
              </div>
              <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 20 }}>
                AI Tools — Expert Level
              </div>
              <div
                style={{
                  fontFamily: "'Instrument Serif',serif",
                  fontSize: 28,
                  marginBottom: 4,
                }}
              >
                Preethi Nair
              </div>
              <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 16 }}>
                Score: 95% · Jan 2025
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="mono" style={{ fontSize: 9, opacity: 0.6 }}>
                  CAI-7XPQ92-M4K8Z
                </div>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: "rgba(0,0,0,.12)",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  }}
                >
                  📱
                </div>
              </div>
            </div>

            {/* Floating chips */}
            <div
              style={{
                position: "absolute",
                bottom: -16,
                left: -28,
                background: t.card,
                border: `1px solid ${t.border}`,
                borderRadius: 10,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: t.successDim,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✅
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>Passed!</div>
                <div style={{ fontSize: 11, color: t.success }}>
                  Score 95% — Expert
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCROLLING TICKER ── */}
      <div
        style={{
          overflow: "hidden",
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          padding: "13px 0",
          background: t.bg2,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            animation: "ticker 22s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {[...Array(3)]
            .flatMap(() => [
              "🎓 50K+ Certs Issued",
              "📊 Excel: Most Taken",
              "⭐ 4.9 Rating",
              "🤖 AI-Proctored Exams",
              "🇮🇳 Pan-India",
              "💰 From ₹199",
              "🔒 QR Verification",
              "📱 Mobile Friendly",
            ])
            .map((s, i) => (
              <span
                key={i}
                style={{
                  padding: "0 36px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: t.text2,
                }}
              >
                {s}
              </span>
            ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 24px" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 48,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <span className="badge badge-lime" style={{ marginBottom: 12 }}>
                HOW IT WORKS
              </span>
              <h2
                style={{
                  fontSize: "clamp(26px, 4vw, 40px)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: "-.03em",
                }}
              >
                Three steps to prove
                <br />
                <span className="serif" style={{ fontStyle: "italic" }}>
                  your skills
                </span>
              </h2>
            </div>
            <button
              className="btn btn-outline"
              onClick={() => setPage("courses")}
            >
              See all courses →
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 2,
            }}
          >
            {[
              {
                num: "01",
                icon: "📹",
                title: "Learn — for free",
                desc: "Complete video courses, practice quizzes, and downloadable resources. No subscription, no paywall.",
                tag: "100% FREE",
                tagCls: "badge-success",
              },
              {
                num: "02",
                icon: "🤖",
                title: "Take AI Exam",
                desc: "One-time payment. AI-generated questions, fullscreen mode, anti-cheating detection. Fair, rigorous, final.",
                tag: "AI PROCTORED",
                tagCls: "badge-purple",
              },
              {
                num: "03",
                icon: "🏆",
                title: "Get Certified",
                desc: "Verifiable digital certificate with unique QR code. Download PDF, share on LinkedIn in one click.",
                tag: "VERIFIABLE",
                tagCls: "badge-lime",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: 28,
                  borderRadius:
                    i === 0 ? "12px 0 0 12px" : i === 2 ? "0 12px 12px 0" : "0",
                  borderRight: i < 2 ? "none" : undefined,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 20,
                  }}
                >
                  <div
                    className="mono"
                    style={{ fontSize: 11, color: t.text3, fontWeight: 600 }}
                  >
                    {s.num}
                  </div>
                  <span className={`badge ${s.tagCls}`}>{s.tag}</span>
                </div>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    marginBottom: 10,
                    letterSpacing: "-.02em",
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ color: t.text2, lineHeight: 1.7, fontSize: 14 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 28,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <h2
              style={{
                fontSize: "clamp(22px, 3.5vw, 36px)",
                fontWeight: 800,
                letterSpacing: "-.03em",
              }}
            >
              Skill Tracks
            </h2>
            <div style={{ display: "flex", gap: 6 }}>
              {cats.map((c) => (
                <button
                  key={c}
                  className="btn"
                  style={{
                    background: catFilter === c ? t.lime : t.bg3,
                    color: catFilter === c ? t.bg : t.text2,
                    border: `1px solid ${
                      catFilter === c ? "transparent" : t.border
                    }`,
                    padding: "7px 14px",
                    fontSize: 12,
                    borderRadius: 6,
                  }}
                  onClick={() => setCatFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {COURSES.filter(
              (c) => catFilter === "All" || c.cat === catFilter
            ).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                t={t}
                onClick={() => {
                  setCourse(course);
                  setPage("learn");
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        style={{
          padding: "80px 24px",
          borderTop: `1px solid ${t.border}`,
          background: t.bg2,
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="badge badge-warning" style={{ marginBottom: 12 }}>
              TESTIMONIALS
            </span>
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 40px)",
                fontWeight: 800,
                letterSpacing: "-.03em",
              }}
            >
              Real results from
              <br />
              <span className="serif" style={{ fontStyle: "italic" }}>
                real learners
              </span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {TESTIMONIALS.map((tm, i) => (
              <div key={i} className="card" style={{ padding: 24 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
                  <Stars n={5} />
                </div>
                <p
                  style={{
                    color: t.text2,
                    lineHeight: 1.75,
                    fontSize: 14,
                    marginBottom: 20,
                  }}
                >
                  "{tm.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar name={tm.name} size={40} bg={tm.color} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>
                      {tm.name}
                    </div>
                    <div style={{ fontSize: 12, color: t.text2 }}>
                      {tm.role}
                    </div>
                    <div
                      style={{
                        marginTop: 4,
                        display: "flex",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <LevelBadge
                        level={
                          tm.cert.includes("Expert")
                            ? "expert"
                            : tm.cert.includes("Inter")
                            ? "intermediate"
                            : "beginner"
                        }
                      />
                      <span style={{ fontSize: 11, color: t.text3 }}>
                        {tm.score}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: "80px 24px" }}>
        <div className="container">
          <div
            style={{
              background: t.lime,
              borderRadius: 16,
              padding: "56px 48px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 240,
                height: 240,
                borderRadius: "50%",
                background: "rgba(0,0,0,.08)",
              }}
            />
            <div style={{ position: "relative" }}>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: t.bg,
                  opacity: 0.6,
                  marginBottom: 16,
                  textTransform: "uppercase",
                }}
              >
                Ready to prove your skills?
              </div>
              <h2
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "clamp(26px, 4vw, 48px)",
                  fontWeight: 800,
                  color: t.bg,
                  marginBottom: 24,
                  letterSpacing: "-.03em",
                  lineHeight: 1.1,
                }}
              >
                Start free.
                <br />
                Get certified.
                <br />
                Get hired.
              </h2>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  className="btn btn-xl"
                  style={{
                    background: t.bg,
                    color: t.lime,
                    fontFamily: "'Syne',sans-serif",
                  }}
                  onClick={() => setPage("courses")}
                >
                  Start Learning Free
                </button>
                <button
                  className="btn btn-xl"
                  style={{
                    background: "transparent",
                    color: t.bg,
                    border: `2px solid rgba(0,0,0,.25)`,
                    fontFamily: "'Syne',sans-serif",
                  }}
                  onClick={() => setPage("pricing")}
                >
                  View Pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: `1px solid ${t.border}`,
          padding: "40px 24px 28px",
          background: t.bg2,
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 32,
              marginBottom: 32,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    background: t.lime,
                    borderRadius: 5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                  }}
                >
                  ⬡
                </div>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: 16,
                    letterSpacing: "-.02em",
                  }}
                >
                  CertifyAI
                </span>
              </div>
              <p
                style={{
                  color: t.text2,
                  fontSize: 13,
                  lineHeight: 1.7,
                  maxWidth: 240,
                }}
              >
                India's AI-powered skill certification platform. Learn free, get
                certified.
              </p>
            </div>
            {[
              {
                title: "Platform",
                links: ["Courses", "Pricing", "Verify Certificate"],
              },
              { title: "Company", links: ["About", "Blog", "Careers"] },
              {
                title: "Legal",
                links: ["Terms", "Privacy Policy", "Refund Policy"],
              },
            ].map((col) => (
              <div key={col.title}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 11,
                    color: t.text3,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  {col.title}
                </div>
                {col.links.map((l) => (
                  <div
                    key={l}
                    style={{
                      fontSize: 13,
                      color: t.text2,
                      marginBottom: 10,
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => (e.target.style.color = t.lime)}
                    onMouseOut={(e) => (e.target.style.color = t.text2)}
                  >
                    {l}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="divider" style={{ marginBottom: 20 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 12, color: t.text3 }}>
              © 2025 CertifyAI · Made with ❤️ in India 🇮🇳
            </span>
            <span style={{ fontSize: 11, color: t.text3 }}>
              ⚠️ Skill-based certs · Not accredited · Not affiliated with
              Microsoft/Adobe
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── COURSE CARD ─────────────────────────────────────────────
function CourseCard({ course, t, onClick }) {
  return (
    <div className="card" style={{ cursor: "pointer" }} onClick={onClick}>
      {/* Color strip */}
      <div
        style={{
          height: 5,
          background: course.color,
          borderRadius: "12px 12px 0 0",
        }}
      />
      <div style={{ padding: 22 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 14,
          }}
        >
          <div style={{ fontSize: 40 }}>{course.emoji}</div>
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            {course.badge && (
              <span className="badge badge-hot">{course.badge}</span>
            )}
            <span className="badge badge-success">FREE</span>
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            color: t.text3,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {course.cat}
        </div>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "-.02em",
            marginBottom: 2,
          }}
        >
          {course.title}
        </h3>
        <p style={{ fontSize: 13, color: t.text2, marginBottom: 14 }}>
          {course.sub}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
            flexWrap: "wrap",
          }}
        >
          <Stars n={course.rating} />
          <span style={{ fontSize: 12, fontWeight: 700 }}>{course.rating}</span>
          <span style={{ fontSize: 12, color: t.text3 }}>
            · {course.students} students
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          {course.tags.slice(0, 3).map((tg) => (
            <span key={tg} className="tag">
              {tg}
            </span>
          ))}
        </div>
        <div className="divider" style={{ marginBottom: 16 }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                color: t.text3,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Cert exam from
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: course.color }}>
              {fmtPrice(course.certPrices.beginner)}
            </div>
          </div>
          <button className="btn btn-lime btn-sm">Learn Free →</button>
        </div>
      </div>
    </div>
  );
}

// ─── COURSES PAGE ────────────────────────────────────────────
function CoursesPage({ t, setPage, setCourse }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const filtered = COURSES.filter(
    (c) =>
      (cat === "All" || c.cat === cat) &&
      c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrap">
      <div
        style={{
          background: t.bg2,
          borderBottom: `1px solid ${t.border}`,
          padding: "48px 24px 32px",
        }}
      >
        <div className="container">
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-.03em",
              marginBottom: 8,
            }}
          >
            All Skill Tracks
          </h1>
          <p style={{ color: t.text2, marginBottom: 24, fontSize: 15 }}>
            Free courses. Paid certs. Real credentials.
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <input
              className="input"
              style={{ maxWidth: 300 }}
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {["All", "Design", "Business", "AI & Tech"].map((c) => (
              <button
                key={c}
                className="btn"
                style={{
                  background: cat === c ? t.lime : t.bg3,
                  color: cat === c ? t.bg : t.text2,
                  border: `1px solid ${cat === c ? "transparent" : t.border}`,
                  padding: "7px 14px",
                  fontSize: 12,
                  borderRadius: 6,
                }}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container" style={{ padding: "36px 24px" }}>
        <div style={{ color: t.text3, fontSize: 13, marginBottom: 20 }}>
          {filtered.length} courses
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {filtered.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              t={t}
              onClick={() => {
                setCourse(c);
                setPage("learn");
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── LEARN PAGE ──────────────────────────────────────────────
function LearnPage({ t, course, setPage, setExamTarget }) {
  const [activeModule, setActiveModule] = useState(0);
  const [progress, setProgress] = useState(38);
  const [tab, setTab] = useState("overview");
  const [notes, setNotes] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizRevealed, setQuizRevealed] = useState({});

  const modules = Array.from({ length: course.modules }, (_, i) => ({
    id: i,
    title: `${i + 1}. ${
      [
        "Introduction & Setup",
        "Core Fundamentals",
        "Key Techniques",
        "Applied Practice",
        "Advanced Methods",
        "Real Projects",
        "Performance Tips",
        "Troubleshooting",
        "Case Studies",
        "Final Assessment",
        "Bonus Content",
        "Expert Secrets",
      ][i % 12]
    }`,
    duration: `${10 + ((i * 7) % 20)}m`,
    done: i < Math.round(course.modules * 0.38),
  }));

  return (
    <div
      className="page-wrap"
      style={{ display: "flex", height: "calc(100vh - 64px)" }}
    >
      {/* ── SIDEBAR ── */}
      <div className="sidebar hide-m">
        <div
          style={{
            padding: "16px 14px 12px",
            borderBottom: `1px solid ${t.border}`,
          }}
        >
          <div style={{ fontSize: 12, color: t.text2, marginBottom: 6 }}>
            Progress
          </div>
          <div className="pbar" style={{ height: 6, marginBottom: 5 }}>
            <div className="pbar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.lime }}>
            {progress}% Complete
          </div>
        </div>
        <div style={{ padding: "10px 8px" }}>
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setActiveModule(m.id);
                setProgress(
                  Math.max(
                    progress,
                    Math.round(((m.id + 1) / modules.length) * 100)
                  )
                );
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "9px 8px",
                borderRadius: 7,
                border: "none",
                background: activeModule === m.id ? t.limeDim : "transparent",
                cursor: "pointer",
                textAlign: "left",
                transition: "all .12s",
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: m.done
                    ? t.lime
                    : activeModule === m.id
                    ? t.lime + "30"
                    : t.bg3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  color: m.done ? t.bg : t.text3,
                  flexShrink: 0,
                  fontWeight: 800,
                  border: `1.5px solid ${
                    m.done || activeModule === m.id ? t.lime : t.border
                  }`,
                  marginTop: 2,
                }}
              >
                {m.done ? "✓" : m.id + 1}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: activeModule === m.id ? 700 : 500,
                    color: activeModule === m.id ? t.lime : t.text,
                    lineHeight: 1.3,
                  }}
                >
                  {m.title}
                </div>
                <div style={{ fontSize: 11, color: t.text3, marginTop: 2 }}>
                  {m.duration}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Video */}
        <div
          style={{
            background: "#000",
            aspectRatio: "16/9",
            maxHeight: "52vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center", color: "#fff" }}>
            <div style={{ fontSize: 64, marginBottom: 12 }}>{course.emoji}</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
              {modules[activeModule]?.title}
            </div>
            <div style={{ fontSize: 13, opacity: 0.6 }}>
              {modules[activeModule]?.duration} · HD Video
            </div>
            <button
              style={{
                marginTop: 20,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "rgba(255,255,255,.15)",
                border: "2px solid rgba(255,255,255,.4)",
                color: "#fff",
                fontSize: 22,
                cursor: "pointer",
              }}
            >
              ▶
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            borderBottom: `1px solid ${t.border}`,
            padding: "0 24px",
            display: "flex",
            gap: 4,
          }}
        >
          {["overview", "notes", "resources", "quiz"].map((tb) => (
            <button
              key={tb}
              onClick={() => setTab(tb)}
              style={{
                border: "none",
                background: "transparent",
                padding: "14px 10px",
                fontFamily: "'Syne',sans-serif",
                fontWeight: tab === tb ? 700 : 500,
                fontSize: 13,
                color: tab === tb ? t.lime : t.text2,
                borderBottom: `2px solid ${
                  tab === tb ? t.lime : "transparent"
                }`,
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "all .12s",
              }}
            >
              {tb}
            </button>
          ))}
        </div>

        <div style={{ padding: "24px" }}>
          {tab === "overview" && (
            <div>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "-.02em",
                  marginBottom: 8,
                }}
              >
                {course.title} — {course.sub}
              </h2>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  color: t.text2,
                  fontSize: 13,
                  marginBottom: 20,
                }}
              >
                <span>👨‍🏫 {course.instructor}</span>
                <span>⏱ {course.hours}</span>
                <span>📚 {course.modules} modules</span>
                <Stars n={course.rating} />
                <span>{course.rating}</span>
              </div>
              <p style={{ color: t.text2, lineHeight: 1.75, marginBottom: 24 }}>
                This comprehensive course takes you from fundamentals to
                advanced mastery. Each module builds on the last, ensuring you
                develop real-world skills that employers demand.
              </p>

              {/* Unlock CTA */}
              <div
                style={{
                  background: t.bg2,
                  border: `1px solid ${t.limeBorder}`,
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 18,
                  }}
                >
                  <div style={{ fontSize: 32 }}>🏆</div>
                  <div>
                    <h3
                      style={{ fontSize: 16, fontWeight: 800, marginBottom: 3 }}
                    >
                      Earn your certificate
                    </h3>
                    <p style={{ color: t.text2, fontSize: 13 }}>
                      Take an AI-proctored exam and prove your mastery
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {LEVELS.map((lv) => (
                    <button
                      key={lv.id}
                      className="btn btn-outline"
                      style={{
                        flexDirection: "column",
                        gap: 3,
                        padding: "14px 18px",
                        height: "auto",
                        flex: 1,
                        minWidth: 130,
                      }}
                      onClick={() => {
                        setExamTarget({ course, level: lv.id });
                        setPage("exam");
                      }}
                    >
                      <span style={{ fontSize: 16 }}>
                        {lv.icon} {lv.label}
                      </span>
                      <span
                        style={{ fontSize: 18, fontWeight: 800, color: t.lime }}
                      >
                        {fmtPrice(course.certPrices[lv.id])}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: t.text3,
                          fontWeight: 400,
                        }}
                      >
                        {lv.qs}Q · {lv.mins}m
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "notes" && (
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: 16 }}>
                Your Notes
              </h3>
              <textarea
                className="input"
                placeholder="Write notes while you watch..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{ minHeight: 200 }}
              />
              <button className="btn btn-lime" style={{ marginTop: 10 }}>
                Save Notes
              </button>
            </div>
          )}

          {tab === "resources" && (
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: 16 }}>
                Downloadable Resources
              </h3>
              {[
                "Course Slides (PDF)",
                "Practice Exercises",
                "Quick Reference Sheet",
                "Project Templates",
              ].map((r) => (
                <div
                  key={r}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 0",
                    borderBottom: `1px solid ${t.border}`,
                  }}
                >
                  <div
                    style={{ display: "flex", gap: 10, alignItems: "center" }}
                  >
                    <span>📄</span>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{r}</span>
                  </div>
                  <button className="btn btn-outline btn-sm">⬇ Download</button>
                </div>
              ))}
            </div>
          )}

          {tab === "quiz" && (
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 6, fontSize: 16 }}>
                Practice Quiz
              </h3>
              <p style={{ color: t.text2, fontSize: 13, marginBottom: 20 }}>
                No time limit. Unlimited attempts. Builds towards exam
                readiness.
              </p>
              {SAMPLE_QS.slice(0, 3).map((q, i) => (
                <div
                  key={i}
                  className="card"
                  style={{ padding: 20, marginBottom: 14 }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      marginBottom: 14,
                      fontSize: 14,
                      lineHeight: 1.5,
                    }}
                  >
                    Q{i + 1}. {q.q}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      marginBottom: 12,
                    }}
                  >
                    {q.opts.map((opt, oi) => (
                      <button
                        key={oi}
                        onClick={() => {
                          if (!quizRevealed[i])
                            setQuizAnswers((a) => ({ ...a, [i]: oi }));
                        }}
                        style={{
                          textAlign: "left",
                          padding: "10px 14px",
                          borderRadius: 8,
                          border: `1.5px solid ${
                            quizRevealed[i]
                              ? oi === q.correct
                                ? t.success
                                : quizAnswers[i] === oi
                                ? t.danger
                                : t.border
                              : quizAnswers[i] === oi
                              ? t.lime
                              : t.border
                          }`,
                          background: quizRevealed[i]
                            ? oi === q.correct
                              ? t.successDim
                              : quizAnswers[i] === oi
                              ? t.dangerDim
                              : "transparent"
                            : quizAnswers[i] === oi
                            ? t.limeDim
                            : "transparent",
                          cursor: quizRevealed[i] ? "default" : "pointer",
                          fontFamily: "'Syne',sans-serif",
                          fontSize: 13,
                          fontWeight: quizAnswers[i] === oi ? 700 : 400,
                          color: t.text,
                          transition: "all .12s",
                        }}
                      >
                        <span style={{ marginRight: 8, opacity: 0.5 }}>
                          {String.fromCharCode(65 + oi)}.
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {!quizRevealed[i] && quizAnswers[i] !== undefined && (
                    <button
                      className="btn btn-lime btn-sm"
                      onClick={() =>
                        setQuizRevealed((r) => ({ ...r, [i]: true }))
                      }
                    >
                      Check →
                    </button>
                  )}
                  {quizRevealed[i] && (
                    <div
                      style={{
                        background:
                          quizAnswers[i] === q.correct
                            ? t.successDim
                            : t.dangerDim,
                        border: `1px solid ${
                          quizAnswers[i] === q.correct ? t.success : t.danger
                        }30`,
                        borderRadius: 8,
                        padding: 12,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          color:
                            quizAnswers[i] === q.correct ? t.success : t.danger,
                          marginBottom: 3,
                          fontSize: 13,
                        }}
                      >
                        {quizAnswers[i] === q.correct
                          ? "✅ Correct!"
                          : "❌ Incorrect"}
                      </div>
                      <div style={{ fontSize: 12, color: t.text2 }}>
                        {q.exp}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── EXAM PAGE ───────────────────────────────────────────────
function ExamPage({ t, examTarget, user, onDone }) {
  const { course, level } = examTarget;
  const lvlData = LEVELS.find((l) => l.id === level);
  const [phase, setPhase] = useState("instructions"); // instructions | payment | exam | result
  const [qs, setQs] = useState([]);
  const [curr, setCurr] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [warnings, setWarnings] = useState(0);
  const [result, setResult] = useState(null);
  const [payLoading, setPayLoading] = useState(false);
  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    if (phase !== "exam") return;
    if (timeLeft === null) {
      setTimeLeft(lvlData.mins * 60);
      return;
    }
    if (timeLeft <= 0) {
      submitExam(false);
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [phase, timeLeft]);

  // Anti-cheat
  useEffect(() => {
    if (phase !== "exam") return;
    const onVis = () => {
      if (document.hidden) {
        setWarnings((w) => {
          if (w + 1 >= 2) {
            submitExam(true);
            return w + 1;
          }
          return w + 1;
        });
      }
    };
    const block = (e) => e.preventDefault();
    document.addEventListener("visibilitychange", onVis);
    document.addEventListener("contextmenu", block);
    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    document.addEventListener("paste", block);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
      document.removeEventListener("paste", block);
    };
  }, [phase]);

  const submitExam = (forced) => {
    clearTimeout(timerRef.current);
    const q = qs.length > 0 ? qs : getQuestions(course.id, level);
    const sc = calcScore(answers, q);
    setResult({
      score: sc,
      passed: sc >= 70,
      correct: Math.round((q.length * sc) / 100),
      total: q.length,
      certId: sc >= 70 ? genCertId() : null,
      forced,
      timeTaken: lvlData.mins * 60 - (timeLeft || 0),
    });
    setPhase("result");
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  };

  const startPayment = async () => {
    setPayLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    const generated = getQuestions(course.id, level);
    setQs(generated);
    setPayLoading(false);
    setPhase("exam");
    document.documentElement.requestFullscreen?.().catch(() => {});
  };

  // ── INSTRUCTIONS ──
  if (phase === "instructions")
    return (
      <div
        className="page-wrap"
        style={{ maxWidth: 680, margin: "0 auto", padding: "88px 24px 60px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 28,
          }}
        >
          <div style={{ fontSize: 40 }}>{course.emoji}</div>
          <div>
            <h1
              style={{
                fontSize: "clamp(22px, 4vw, 32px)",
                fontWeight: 800,
                letterSpacing: "-.02em",
                marginBottom: 4,
              }}
            >
              {course.title}
            </h1>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <LevelBadge level={level} />
              <span style={{ color: t.text2, fontSize: 13 }}>
                Certification Exam
              </span>
            </div>
          </div>
        </div>

        {/* Level picker */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 10,
            marginBottom: 28,
          }}
        >
          {LEVELS.map((lv) => (
            <div
              key={lv.id}
              style={{
                padding: 16,
                borderRadius: 10,
                border: `2px solid ${lv.id === level ? t.lime : t.border}`,
                background: lv.id === level ? t.limeDim : t.card,
                textAlign: "center",
                cursor: "pointer",
                transition: "all .15s",
              }}
              onClick={() => {}}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{lv.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 14 }}>{lv.label}</div>
              <div style={{ fontSize: 11, color: t.text3 }}>
                {lv.qs}Q · {lv.mins}m
              </div>
              <div
                style={{
                  fontWeight: 800,
                  color: t.lime,
                  fontSize: 18,
                  marginTop: 6,
                }}
              >
                {fmtPrice(course.certPrices[lv.id])}
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="card" style={{ padding: 24, marginBottom: 20 }}>
          <h3 style={{ fontWeight: 800, marginBottom: 16, fontSize: 15 }}>
            📋 Before You Begin
          </h3>
          {[
            [
              "🖥️",
              `${lvlData.qs} AI-generated questions · ${lvlData.mins} minutes`,
            ],
            ["🔒", "Full-screen mode enforced throughout"],
            ["📵", "Tab switching triggers auto-submit (2 warnings)"],
            ["🚫", "Copy-paste, right-click & dev shortcuts blocked"],
            ["✅", "Minimum 70% required to earn your certificate"],
            ["🔁", "Retake at 50% off if you don't pass"],
          ].map(([ic, txt], i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 12,
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{ic}</span>
              <span style={{ fontSize: 13, color: t.text2, lineHeight: 1.6 }}>
                {txt}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            background: t.dangerDim,
            border: `1px solid ${t.danger}30`,
            borderRadius: 10,
            padding: 14,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: t.danger,
              marginBottom: 4,
            }}
          >
            🔒 Anti-Cheating Policy
          </div>
          <div style={{ fontSize: 12, color: t.text2 }}>
            This exam is AI-monitored. Cheating attempts result in
            disqualification and forfeiture of exam fee. Fraudulent certificates
            will be permanently revoked.
          </div>
        </div>

        <button
          className="btn btn-lime btn-xl"
          style={{ width: "100%" }}
          onClick={() => setPhase("payment")}
        >
          Proceed to Payment → {fmtPrice(course.certPrices[level])}
        </button>
      </div>
    );

  // ── PAYMENT ──
  if (phase === "payment") {
    const base = course.certPrices[level];
    const gst = Math.round(base * 0.18);
    const total = base + gst;
    return (
      <div
        className="page-wrap"
        style={{ maxWidth: 500, margin: "0 auto", padding: "88px 24px 60px" }}
      >
        <h2
          style={{
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: "-.02em",
            marginBottom: 8,
          }}
        >
          Secure Payment
        </h2>
        <p style={{ color: t.text2, marginBottom: 28, fontSize: 14 }}>
          Exam access activated immediately on payment.
        </p>

        <div className="card" style={{ padding: 24, marginBottom: 16 }}>
          <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>
            Order Summary
          </h3>
          {[
            ["Exam Fee", fmtPrice(base)],
            ["GST (18%)", fmtPrice(gst)],
          ].map(([l, v]) => (
            <div
              key={l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "9px 0",
                borderBottom: `1px solid ${t.border}`,
              }}
            >
              <span style={{ color: t.text2, fontSize: 13 }}>{l}</span>
              <span style={{ fontWeight: 700, fontSize: 13 }}>{v}</span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "14px 0",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 15 }}>Total</span>
            <span style={{ fontWeight: 800, fontSize: 22, color: t.lime }}>
              {fmtPrice(total)}
            </span>
          </div>
        </div>

        <div className="card" style={{ padding: 20, marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 14 }}>
            Payment Method
          </div>
          {[
            ["🏦", "UPI (GPay, PhonePe, Paytm)", true],
            ["💳", "Credit / Debit Card", false],
            ["🏧", "Net Banking", false],
            ["📋", "No-Cost EMI", false],
          ].map(([ic, lbl, checked]) => (
            <div
              key={lbl}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 0",
                borderBottom: `1px solid ${t.border}`,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: `2px solid ${checked ? t.lime : t.border}`,
                  background: checked ? t.lime : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {checked && (
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: t.bg,
                    }}
                  />
                )}
              </div>
              <span style={{ fontSize: 13 }}>
                {ic} {lbl}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            fontSize: 11,
            color: t.text3,
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          🔒 Secured by Razorpay · 256-bit SSL
        </div>

        <button
          className="btn btn-lime btn-xl"
          style={{ width: "100%" }}
          onClick={startPayment}
          disabled={payLoading}
        >
          {payLoading ? (
            <>
              <Spinner color={t.bg} /> Processing...
            </>
          ) : (
            `Pay ${fmtPrice(total)} via Razorpay ↗`
          )}
        </button>
        <button
          className="btn btn-ghost"
          style={{ width: "100%", marginTop: 8 }}
          onClick={() => setPhase("instructions")}
        >
          ← Back
        </button>
      </div>
    );
  }

  // ── EXAM ──
  if (phase === "exam") {
    const q = qs[curr];
    const answered = Object.keys(answers).length;

    return (
      <div className="exam-wrap">
        {/* Exam Header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: t.card,
            borderBottom: `1px solid ${t.border}`,
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 28,
                height: 28,
                background: t.lime,
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              ⬡
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 13 }}>
                {course.title} — {lvlData.label} Exam
              </div>
              <div style={{ fontSize: 11, color: t.text2 }}>
                Q{curr + 1}/{qs.length} · {answered} answered
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {warnings > 0 && (
              <div
                style={{
                  background: t.dangerDim,
                  border: `1px solid ${t.danger}40`,
                  borderRadius: 7,
                  padding: "5px 12px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: t.danger,
                }}
              >
                ⚠️ Warning {warnings}/2
              </div>
            )}
            <div
              className="mono"
              style={{
                fontWeight: 700,
                fontSize: 20,
                color: timeLeft < 300 ? t.danger : t.text,
                background: t.bg2,
                padding: "6px 14px",
                borderRadius: 8,
                border: `1px solid ${timeLeft < 300 ? t.danger : t.border}`,
              }}
            >
              {fmtTime(timeLeft || 0)}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={{ height: 3, background: t.bg2 }}>
          <div
            style={{
              height: "100%",
              background: t.lime,
              width: `${((curr + 1) / qs.length) * 100}%`,
              transition: "width .3s",
            }}
          />
        </div>

        {/* Question */}
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
          <span className="badge badge-lime" style={{ marginBottom: 16 }}>
            Question {curr + 1}
          </span>
          <h2
            style={{
              fontSize: "clamp(17px, 2.5vw, 22px)",
              fontWeight: 700,
              lineHeight: 1.55,
              marginBottom: 28,
            }}
          >
            {q?.q}
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 32,
            }}
          >
            {q?.opts.map((opt, oi) => (
              <button
                key={oi}
                onClick={() => setAnswers((a) => ({ ...a, [curr]: oi }))}
                style={{
                  textAlign: "left",
                  padding: "15px 18px",
                  borderRadius: 10,
                  border: `2px solid ${
                    answers[curr] === oi ? t.lime : t.border
                  }`,
                  background: answers[curr] === oi ? t.limeDim : t.card,
                  fontFamily: "'Syne',sans-serif",
                  color: t.text,
                  fontSize: 14,
                  fontWeight: answers[curr] === oi ? 700 : 400,
                  cursor: "pointer",
                  transition: "all .12s",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 26,
                    height: 26,
                    borderRadius: 6,
                    background: answers[curr] === oi ? t.lime : t.bg3,
                    color: answers[curr] === oi ? t.bg : t.text3,
                    marginRight: 12,
                    textAlign: "center",
                    lineHeight: "26px",
                    fontWeight: 800,
                    fontSize: 11,
                    flexShrink: 0,
                    fontFamily: "monospace",
                  }}
                >
                  {String.fromCharCode(65 + oi)}
                </span>
                {opt}
              </button>
            ))}
          </div>

          {/* Nav */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              className="btn btn-outline"
              onClick={() => setCurr((c) => Math.max(0, c - 1))}
              disabled={curr === 0}
              style={{ opacity: curr === 0 ? 0.4 : 1 }}
            >
              ← Prev
            </button>
            <div
              style={{
                display: "flex",
                gap: 5,
                flexWrap: "wrap",
                maxWidth: 320,
                justifyContent: "center",
              }}
            >
              {qs.slice(0, 20).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurr(i)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    border: `1.5px solid ${
                      curr === i
                        ? t.lime
                        : answers[i] !== undefined
                        ? t.success
                        : t.border
                    }`,
                    background:
                      curr === i
                        ? t.lime
                        : answers[i] !== undefined
                        ? t.successDim
                        : "transparent",
                    color:
                      curr === i
                        ? t.bg
                        : answers[i] !== undefined
                        ? t.success
                        : t.text3,
                    cursor: "pointer",
                    fontFamily: "monospace",
                    fontWeight: 700,
                    fontSize: 11,
                  }}
                >
                  {i + 1}
                </button>
              ))}
              {qs.length > 20 && (
                <span
                  style={{ color: t.text3, fontSize: 11, lineHeight: "28px" }}
                >
                  +{qs.length - 20}
                </span>
              )}
            </div>
            {curr < qs.length - 1 ? (
              <button
                className="btn btn-lime"
                onClick={() => setCurr((c) => c + 1)}
              >
                Next →
              </button>
            ) : (
              <button
                className="btn btn-lime"
                onClick={() => submitExam(false)}
              >
                Submit ✓
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── RESULT ──
  if (phase === "result" && result) {
    return (
      <ExamResult
        t={t}
        result={result}
        course={course}
        level={level}
        lvlData={lvlData}
        user={user}
        onDone={onDone}
      />
    );
  }

  return null;
}

// ─── EXAM RESULT ─────────────────────────────────────────────
function ExamResult({ t, result, course, level, lvlData, user, onDone }) {
  const [showCert, setShowCert] = useState(false);

  return (
    <div
      className="page-wrap"
      style={{ maxWidth: 680, margin: "0 auto", padding: "80px 24px 60px" }}
    >
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 72, marginBottom: 16 }}>
          {result.passed ? "🏆" : "📚"}
        </div>
        <h1
          style={{
            fontSize: "clamp(26px, 4vw, 42px)",
            fontWeight: 800,
            letterSpacing: "-.03em",
            marginBottom: 12,
          }}
        >
          {result.passed ? "You passed!" : "Keep pushing!"}
        </h1>
        <p style={{ color: t.text2, fontSize: 15 }}>
          {result.passed
            ? `You've earned your ${lvlData.label} certificate in ${course.title}`
            : `You scored ${result.score}%. You need 70% to pass.`}
        </p>
        {result.forced && (
          <div
            style={{
              marginTop: 12,
              padding: "10px 16px",
              background: t.dangerDim,
              border: `1px solid ${t.danger}30`,
              borderRadius: 8,
              fontSize: 13,
              color: t.danger,
            }}
          >
            ⚠️ Auto-submitted due to tab switching violations
          </div>
        )}
      </div>

      {/* Score breakdown */}
      <div
        className="card"
        style={{ padding: 28, marginBottom: 20, textAlign: "center" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 20,
            marginBottom: 20,
          }}
        >
          {[
            ["Score", `${result.score}%`, result.passed ? t.success : t.danger],
            ["Correct", `${result.correct}/${result.total}`, t.blue],
            [
              "Time",
              `${Math.floor(result.timeTaken / 60)}m ${result.timeTaken % 60}s`,
              t.purple,
            ],
          ].map(([lbl, val, col]) => (
            <div key={lbl}>
              <div style={{ fontSize: 30, fontWeight: 800, color: col }}>
                {val}
              </div>
              <div style={{ fontSize: 12, color: t.text3 }}>{lbl}</div>
            </div>
          ))}
        </div>
        <div className="pbar" style={{ height: 14 }}>
          <div
            className="pbar-fill"
            style={{
              width: `${result.score}%`,
              background: result.passed ? t.lime : t.danger,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
          }}
        >
          <span style={{ fontSize: 11, color: t.text3 }}>0%</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: t.warning }}>
            70% Pass
          </span>
          <span style={{ fontSize: 11, color: t.text3 }}>100%</span>
        </div>
      </div>

      {result.passed ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            className="btn btn-lime btn-xl"
            style={{ width: "100%" }}
            onClick={() => setShowCert(true)}
          >
            🏆 View Certificate
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-outline" style={{ flex: 1 }}>
              📤 Share LinkedIn
            </button>
            <button
              className="btn btn-outline"
              style={{ flex: 1 }}
              onClick={onDone}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button className="btn btn-lime btn-xl" style={{ width: "100%" }}>
            Retake — {fmtPrice(Math.round(course.certPrices[level] * 0.5))} (50%
            off)
          </button>
          <button
            className="btn btn-outline btn-lg"
            style={{ width: "100%" }}
            onClick={onDone}
          >
            Back to Course
          </button>
        </div>
      )}

      {/* Certificate Modal */}
      {showCert && result.certId && (
        <div className="overlay afi" onClick={() => setShowCert(false)}>
          <div
            className="modal"
            style={{ maxWidth: 620, padding: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Certificate design */}
            <div
              style={{
                background: `linear-gradient(135deg, #0A1628 0%, #1A2B50 50%, #0E1A32 100%)`,
                padding: "36px 40px",
                borderRadius: "16px 16px 0 0",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: t.lime,
                  opacity: 0.07,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -30,
                  left: -30,
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background: "#4F8EF7",
                  opacity: 0.08,
                }}
              />
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: 10,
                      letterSpacing: 3,
                      color: t.lime,
                      fontWeight: 700,
                    }}
                  >
                    CERTIFYAI
                  </div>
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: 9,
                      color: "rgba(255,255,255,.4)",
                      letterSpacing: 2,
                    }}
                  >
                    CERTIFICATE OF MASTERY
                  </div>
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,.6)",
                    fontSize: 13,
                    marginBottom: 6,
                  }}
                >
                  This certifies that
                </div>
                <div
                  style={{
                    fontFamily: "'Instrument Serif',serif",
                    fontSize: 40,
                    color: "#fff",
                    marginBottom: 6,
                  }}
                >
                  {user?.name || "Learner"}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,.7)",
                    fontSize: 13,
                    marginBottom: 4,
                  }}
                >
                  has demonstrated {lvlData.label}-level mastery in
                </div>
                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 800,
                    fontSize: 22,
                    color: t.lime,
                  }}
                >
                  {course.title}
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "24px 32px 28px",
                background: t.card,
                borderRadius: "0 0 16px 16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      color: t.text3,
                      marginBottom: 3,
                      fontFamily: "monospace",
                    }}
                  >
                    CERTIFICATE ID
                  </div>
                  <div
                    className="mono"
                    style={{ fontWeight: 700, fontSize: 12 }}
                  >
                    {result.certId}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{ fontSize: 10, color: t.text3, marginBottom: 3 }}
                  >
                    SCORE
                  </div>
                  <div
                    style={{ fontWeight: 800, fontSize: 22, color: t.success }}
                  >
                    {result.score}%
                  </div>
                </div>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 8,
                    background: t.bg2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    fontSize: 10,
                    color: t.text3,
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  📱
                  <br />
                  <span style={{ fontFamily: "monospace" }}>VERIFY</span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  paddingTop: 16,
                  borderTop: `1px solid ${t.border}`,
                }}
              >
                <button className="btn btn-lime" style={{ flex: 2 }}>
                  ⬇ Download PDF
                </button>
                <button className="btn btn-outline" style={{ flex: 1 }}>
                  LinkedIn
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowCert(false)}
                  style={{ padding: "8px 12px" }}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────
function DashboardPage({ t, user, setPage, setCourse }) {
  const [tab, setTab] = useState("overview");
  const enrolled = COURSES.filter((c) => user?.enrolledCourses?.includes(c.id));

  const sideItems = [
    ["overview", "📊", "Overview"],
    ["courses", "📚", "My Courses"],
    ["exams", "📋", "Exam History"],
    ["certificates", "🏆", "Certificates"],
    ["analytics", "📈", "Analytics"],
    ["settings", "⚙️", "Settings"],
  ];

  return (
    <div
      className="page-wrap"
      style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}
    >
      {/* Sidebar */}
      <div className="sidebar hide-m" style={{ padding: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 8px",
            marginBottom: 20,
          }}
        >
          <Avatar name={user?.name || "User"} size={40} bg={t.lime} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: t.text3 }}>{user?.email}</div>
          </div>
        </div>
        {sideItems.map(([id, ic, lbl]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 8,
              border: "none",
              background: tab === id ? t.limeDim : "transparent",
              color: tab === id ? t.lime : t.text2,
              fontFamily: "'Syne',sans-serif",
              fontWeight: tab === id ? 700 : 500,
              fontSize: 13,
              cursor: "pointer",
              marginBottom: 2,
              transition: "all .12s",
              textAlign: "left",
            }}
          >
            <span>{ic}</span> {lbl}
          </button>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "32px 28px", overflowY: "auto" }}>
        {tab === "overview" && (
          <>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-.02em",
                marginBottom: 6,
              }}
            >
              Hey, {user?.name?.split(" ")[0]} 👋
            </h2>
            <p style={{ color: t.text2, marginBottom: 28, fontSize: 14 }}>
              Here's your learning snapshot.
            </p>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
                gap: 14,
                marginBottom: 32,
              }}
            >
              {[
                ["📚", "Enrolled", enrolled.length, t.blue],
                ["🏆", "Certificates", user?.certificates?.length || 0, t.lime],
                ["📋", "Exams Taken", 2, t.purple],
                ["📈", "Avg Score", "88%", t.success],
              ].map(([ic, lbl, val, col]) => (
                <div key={lbl} className="card" style={{ padding: 18 }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{ic}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: col }}>
                    {val}
                  </div>
                  <div style={{ fontSize: 12, color: t.text3 }}>{lbl}</div>
                </div>
              ))}
            </div>

            {/* Continue */}
            <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>
              Continue Learning
            </h3>
            {enrolled.map((c) => (
              <div
                key={c.id}
                className="card"
                style={{
                  padding: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 10,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setCourse(c);
                  setPage("learn");
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: c.color + "20",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  {c.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{c.title}</div>
                  <div className="pbar" style={{ height: 5, marginTop: 6 }}>
                    <div className="pbar-fill" style={{ width: "38%" }} />
                  </div>
                  <div style={{ fontSize: 11, color: t.text3, marginTop: 3 }}>
                    38% · {c.modules} modules
                  </div>
                </div>
                <button className="btn btn-outline btn-sm">Continue →</button>
              </div>
            ))}

            {/* Certificate */}
            {user?.certificates?.length > 0 && (
              <>
                <h3
                  style={{
                    fontWeight: 700,
                    marginBottom: 14,
                    marginTop: 28,
                    fontSize: 15,
                  }}
                >
                  Recent Certificate
                </h3>
                {user.certificates.map((cert) => (
                  <div
                    key={cert.certId}
                    className="card"
                    style={{
                      padding: 18,
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        background: t.limeDim,
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        flexShrink: 0,
                      }}
                    >
                      🏆
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>
                        {cert.course} — {cert.level}
                      </div>
                      <div
                        className="mono"
                        style={{ fontSize: 11, color: t.text3 }}
                      >
                        {cert.certId}
                      </div>
                      <div
                        style={{ fontSize: 12, color: t.text2, marginTop: 2 }}
                      >
                        Score:{" "}
                        <strong style={{ color: t.success }}>
                          {cert.score}%
                        </strong>{" "}
                        · {cert.date}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-outline btn-sm">⬇</button>
                      <button className="btn btn-outline btn-sm">🔗</button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}

        {tab === "certificates" && (
          <>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-.02em",
                marginBottom: 20,
              }}
            >
              Certificates
            </h2>
            {(user?.certificates || []).length === 0 ? (
              <div style={{ textAlign: "center", padding: 60 }}>
                <div style={{ fontSize: 52, marginBottom: 14 }}>🏆</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
                  No certificates yet
                </div>
                <div style={{ color: t.text2, marginBottom: 20, fontSize: 14 }}>
                  Pass a certification exam to earn your first cert
                </div>
                <button
                  className="btn btn-lime"
                  onClick={() => setPage("courses")}
                >
                  Browse Courses →
                </button>
              </div>
            ) : (
              user.certificates.map((cert) => (
                <div
                  key={cert.certId}
                  className="card"
                  style={{ padding: 24, marginBottom: 12 }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <div
                      style={{
                        width: 54,
                        height: 54,
                        background: "linear-gradient(135deg, #C8FF00,#40C800)",
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 26,
                        flexShrink: 0,
                      }}
                    >
                      🏆
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: 16,
                          marginBottom: 4,
                        }}
                      >
                        {cert.course}
                      </div>
                      <LevelBadge level={cert.level} />
                      <div
                        style={{ fontSize: 13, color: t.text2, marginTop: 6 }}
                      >
                        Score:{" "}
                        <strong style={{ color: t.success }}>
                          {cert.score}%
                        </strong>{" "}
                        · {cert.date}
                      </div>
                      <div
                        className="mono"
                        style={{ fontSize: 10, color: t.text3, marginTop: 2 }}
                      >
                        {cert.certId}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      <button className="btn btn-lime btn-sm">⬇ PDF</button>
                      <button className="btn btn-outline btn-sm">
                        🔗 Share
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {tab === "analytics" && (
          <>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-.02em",
                marginBottom: 20,
              }}
            >
              Skill Analytics
            </h2>
            {[
              { skill: "MS Excel", level: 88, color: t.success },
              { skill: "AI Tools", level: 45, color: t.purple },
              { skill: "PowerPoint", level: 62, color: t.danger },
              { skill: "Digital Marketing", level: 25, color: t.warning },
            ].map((s) => (
              <div
                key={s.skill}
                className="card"
                style={{ padding: 18, marginBottom: 10 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: 14 }}>
                    {s.skill}
                  </span>
                  <span
                    style={{ fontWeight: 800, fontSize: 14, color: s.color }}
                  >
                    {s.level}%
                  </span>
                </div>
                <div className="pbar" style={{ height: 8 }}>
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 100,
                      background: s.color,
                      width: `${s.level}%`,
                      transition: "width 1s ease",
                    }}
                  />
                </div>
                <div style={{ fontSize: 11, color: t.text3, marginTop: 6 }}>
                  {s.level >= 70
                    ? "✅ Certified"
                    : `${70 - s.level}% more to certify`}
                </div>
              </div>
            ))}
          </>
        )}

        {["courses", "exams", "settings"].includes(tab) && (
          <div style={{ textAlign: "center", padding: 60 }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>🔌</div>
            <div
              style={{
                fontWeight: 800,
                fontSize: 18,
                marginBottom: 8,
                textTransform: "capitalize",
              }}
            >
              {tab}
            </div>
            <div style={{ color: t.text2, fontSize: 14 }}>
              Connect your Supabase backend to populate this section.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PRICING PAGE ────────────────────────────────────────────
function PricingPage({ t }) {
  return (
    <div className="page-wrap">
      <div style={{ padding: "80px 24px", textAlign: "center" }}>
        <div className="container">
          <span className="badge badge-lime" style={{ marginBottom: 14 }}>
            PRICING
          </span>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-.03em",
              marginBottom: 14,
            }}
          >
            Simple, transparent
            <br />
            <span className="serif" style={{ fontStyle: "italic" }}>
              pricing
            </span>
          </h1>
          <p style={{ color: t.text2, fontSize: 16, marginBottom: 48 }}>
            Courses are always free. Pay only when you're ready to certify.
          </p>

          {/* Table */}
          <div
            className="card"
            style={{ overflow: "hidden", marginBottom: 40, borderRadius: 16 }}
          >
            <div
              style={{
                padding: "18px 24px",
                borderBottom: `1px solid ${t.border}`,
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <h2 style={{ fontWeight: 800, fontSize: 17 }}>
                Exam Pricing — All Courses
              </h2>
              <span className="badge badge-lime">GST extra</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: 560,
                }}
              >
                <thead>
                  <tr style={{ background: t.bg2 }}>
                    <th
                      style={{
                        padding: "12px 20px",
                        textAlign: "left",
                        fontSize: 12,
                        fontWeight: 700,
                        color: t.text3,
                      }}
                    >
                      Course
                    </th>
                    {LEVELS.map((lv) => (
                      <th
                        key={lv.id}
                        style={{
                          padding: "12px 16px",
                          textAlign: "center",
                          fontSize: 12,
                          fontWeight: 700,
                          color:
                            lv.id === "expert"
                              ? t.purple
                              : lv.id === "intermediate"
                              ? t.blue
                              : t.success,
                        }}
                      >
                        {lv.icon} {lv.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COURSES.map((c, i) => (
                    <tr
                      key={c.id}
                      style={{ borderTop: `1px solid ${t.border}` }}
                    >
                      <td style={{ padding: "14px 20px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <span>{c.emoji}</span>
                          <span style={{ fontWeight: 700, fontSize: 14 }}>
                            {c.title}
                          </span>
                        </div>
                      </td>
                      {["beginner", "intermediate", "expert"].map((lv) => (
                        <td
                          key={lv}
                          style={{ padding: "14px 16px", textAlign: "center" }}
                        >
                          <span
                            style={{
                              fontWeight: 800,
                              fontSize: 17,
                              color: t.lime,
                            }}
                          >
                            {fmtPrice(c.certPrices[lv])}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* What's included */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 16,
              marginBottom: 40,
            }}
          >
            {[
              [
                "🆓",
                "Free Forever",
                "All video lessons, practice quizzes, notes, resources. No paywall.",
                t.success,
              ],
              [
                "🤖",
                "AI Exam",
                "Randomized AI-questions, fullscreen proctoring, instant grading.",
                t.blue,
              ],
              [
                "🏆",
                "Certificate",
                "Verifiable QR cert, PDF download, LinkedIn share — yours for life.",
                t.lime,
              ],
            ].map(([ic, tl, desc, col]) => (
              <div
                key={tl}
                className="card"
                style={{
                  padding: 24,
                  textAlign: "left",
                  borderTop: `3px solid ${col}`,
                }}
              >
                <div style={{ fontSize: 30, marginBottom: 12 }}>{ic}</div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 16,
                    marginBottom: 8,
                    color: col,
                  }}
                >
                  {tl}
                </div>
                <p style={{ color: t.text2, fontSize: 13, lineHeight: 1.7 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "left" }}>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 800,
                marginBottom: 20,
                letterSpacing: "-.02em",
              }}
            >
              FAQ
            </h2>
            {[
              [
                "Are courses really free?",
                "Yes. Always. Every video, quiz, and resource is free forever. You only pay for proctored certification exams.",
              ],
              [
                "What if I fail?",
                "Retake at 50% of the original price. No limits on retakes.",
              ],
              [
                "How is the cert verified?",
                "Each cert has a unique ID and QR code. Scan at certifyai.in/verify to confirm instantly.",
              ],
              [
                "Are certs accredited?",
                "CertifyAI certs are skill-based — they prove practical mastery to employers. Not government accredited.",
              ],
              [
                "What payment methods are accepted?",
                "UPI, credit/debit cards, net banking, and EMI via Razorpay.",
              ],
            ].map(([q, a]) => (
              <div
                key={q}
                className="card"
                style={{ padding: 20, marginBottom: 10 }}
              >
                <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>
                  {q}
                </div>
                <div style={{ color: t.text2, fontSize: 13, lineHeight: 1.7 }}>
                  {a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── VERIFY PAGE ─────────────────────────────────────────────
function VerifyPage({ t }) {
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const verify = async () => {
    setLoading(true);
    setResult(null);
    setNotFound(false);
    await new Promise((r) => setTimeout(r, 1400));
    if (id.toUpperCase().startsWith("CAI-")) {
      setResult({
        name: "Preethi Nair",
        course: "AI Tools",
        level: "Expert",
        score: 95,
        date: "January 15, 2025",
        id: id.toUpperCase(),
      });
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };

  return (
    <div
      className="page-wrap"
      style={{ maxWidth: 600, margin: "0 auto", padding: "80px 24px 60px" }}
    >
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 52, marginBottom: 14 }}>🔍</div>
        <h1
          style={{
            fontSize: "clamp(26px, 4vw, 40px)",
            fontWeight: 800,
            letterSpacing: "-.03em",
            marginBottom: 10,
          }}
        >
          Verify Certificate
        </h1>
        <p style={{ color: t.text2, fontSize: 15 }}>
          Enter a CertifyAI certificate ID to verify its authenticity in
          real-time.
        </p>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <label
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Certificate ID
        </label>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            className="input mono"
            placeholder="CAI-XXXXXX-XXXXX"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && verify()}
          />
          <button
            className="btn btn-lime"
            onClick={verify}
            disabled={!id || loading}
            style={{ flexShrink: 0 }}
          >
            {loading ? <Spinner color={t.bg} size={16} /> : "Verify"}
          </button>
        </div>
        <div style={{ fontSize: 11, color: t.text3, marginTop: 6 }}>
          Try: CAI-7XPQ92-M4K8Z
        </div>
      </div>

      {result && (
        <div
          className="card asi"
          style={{ padding: 24, border: `2px solid ${t.success}` }}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                background: t.successDim,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              ✅
            </div>
            <div>
              <div style={{ fontWeight: 700, color: t.success, fontSize: 15 }}>
                Verified — Authentic Certificate
              </div>
              <div style={{ fontSize: 13, color: t.text2 }}>
                This certificate is valid and was issued by CertifyAI
              </div>
            </div>
          </div>
          {[
            ["Certificate Holder", result.name],
            ["Course", result.course],
            ["Level", result.level],
            ["Score", `${result.score}%`],
            ["Issue Date", result.date],
            ["Certificate ID", result.id],
          ].map(([l, v]) => (
            <div
              key={l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: `1px solid ${t.border}`,
              }}
            >
              <span style={{ color: t.text2, fontSize: 13 }}>{l}</span>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  fontFamily: l === "Certificate ID" ? "monospace" : "inherit",
                }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
      )}

      {notFound && (
        <div
          className="card asi"
          style={{
            padding: 24,
            border: `2px solid ${t.danger}`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 10 }}>❌</div>
          <div style={{ fontWeight: 700, color: t.danger, marginBottom: 6 }}>
            Certificate Not Found
          </div>
          <div style={{ color: t.text2, fontSize: 13 }}>
            No matching certificate. It may be invalid, revoked, or a fake.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN PANEL ─────────────────────────────────────────────
function AdminPanel({ t }) {
  const [tab, setTab] = useState("overview");

  return (
    <div
      className="page-wrap"
      style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}
    >
      <div className="sidebar hide-m" style={{ padding: 16 }}>
        <div
          style={{
            padding: "8px 12px",
            marginBottom: 20,
            background: t.warningDim,
            border: `1px solid ${t.warning}40`,
            borderRadius: 8,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 16 }}>⚙️</span>
          <span style={{ fontWeight: 700, fontSize: 13, color: t.warning }}>
            Admin Panel
          </span>
        </div>
        {[
          ["overview", "📊", "Overview"],
          ["courses", "📚", "Courses"],
          ["users", "👥", "Users"],
          ["exams", "📋", "Exam Moderation"],
          ["certs", "🏆", "Certificates"],
          ["revenue", "💰", "Revenue"],
        ].map(([id, ic, lbl]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 7,
              border: "none",
              background: tab === id ? t.warningDim : "transparent",
              color: tab === id ? t.warning : t.text2,
              fontFamily: "'Syne',sans-serif",
              fontWeight: tab === id ? 700 : 500,
              fontSize: 13,
              cursor: "pointer",
              marginBottom: 2,
              textAlign: "left",
            }}
          >
            <span>{ic}</span>
            {lbl}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, padding: "28px", overflowY: "auto" }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "-.02em",
            marginBottom: 24,
            textTransform: "capitalize",
          }}
        >
          {tab}
        </h2>

        {tab === "overview" && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
                gap: 14,
                marginBottom: 28,
              }}
            >
              {[
                ["👥", "Total Users", "4,12,847", "+12%", t.blue],
                ["🏆", "Certs Issued", "50,234", "+8%", t.lime],
                ["💰", "Revenue", "₹28.4L", "+22%", t.purple],
                ["📋", "Exams/Month", "12,847", "+15%", t.orange],
              ].map(([ic, lbl, val, chg, col]) => (
                <div key={lbl} className="card" style={{ padding: 18 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{ic}</span>
                    <span
                      className="badge badge-success"
                      style={{ fontSize: 10 }}
                    >
                      {chg}
                    </span>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: col }}>
                    {val}
                  </div>
                  <div style={{ fontSize: 11, color: t.text3 }}>{lbl}</div>
                </div>
              ))}
            </div>

            {/* Bar chart placeholder */}
            <div className="card" style={{ padding: 24, marginBottom: 20 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: 14 }}>
                Revenue — This Month
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 6,
                  height: 120,
                }}
              >
                {[
                  60, 75, 55, 88, 72, 90, 95, 80, 85, 78, 92, 88, 96, 82, 90,
                  87, 94, 89, 92, 85, 78, 91, 88, 95, 82, 90, 94, 88, 92, 96,
                ].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      borderRadius: "3px 3px 0 0",
                      background: `linear-gradient(to top, ${t.lime}, ${t.blue})`,
                      opacity: 0.75,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Recent certs table */}
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div
                style={{
                  padding: "16px 20px",
                  borderBottom: `1px solid ${t.border}`,
                }}
              >
                <h3 style={{ fontWeight: 700, fontSize: 14 }}>
                  Recent Certificate Issues
                </h3>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: t.bg2 }}>
                    {[
                      "User",
                      "Course",
                      "Level",
                      "Score",
                      "Date",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "10px 16px",
                          textAlign: "left",
                          fontSize: 11,
                          fontWeight: 700,
                          color: t.text3,
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Preethi N.", "AI Tools", "expert", "95%", "Jan 15"],
                    ["Ananya V.", "MS Excel", "expert", "88%", "Jan 14"],
                    ["Rohan M.", "Photoshop", "intermediate", "81%", "Jan 13"],
                    ["Karan G.", "Digital Mktg", "beginner", "78%", "Jan 12"],
                  ].map(([name, course, lv, sc, dt]) => (
                    <tr
                      key={name}
                      style={{ borderTop: `1px solid ${t.border}` }}
                    >
                      <td
                        style={{
                          padding: "12px 16px",
                          fontWeight: 700,
                          fontSize: 13,
                        }}
                      >
                        {name}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: 13,
                          color: t.text2,
                        }}
                      >
                        {course}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <LevelBadge level={lv} />
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontWeight: 700,
                          color: t.success,
                          fontSize: 13,
                        }}
                      >
                        {sc}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: 12,
                          color: t.text3,
                        }}
                      >
                        {dt}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <button
                          className="btn btn-ghost btn-sm"
                          style={{ fontSize: 11 }}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          style={{ fontSize: 11, color: t.danger }}
                        >
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab !== "overview" && (
          <div style={{ textAlign: "center", padding: 64 }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>🔌</div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 17,
                marginBottom: 8,
                textTransform: "capitalize",
              }}
            >
              {tab} Management
            </div>
            <div style={{ color: t.text2, fontSize: 13 }}>
              Connect Supabase backend to manage {tab} data here.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LEGAL PAGE ──────────────────────────────────────────────
function LegalPage({ t, type }) {
  const content = {
    terms: {
      title: "Terms & Conditions",
      icon: "📋",
      sections: [
        {
          h: "1. Use of Platform",
          b: "By accessing CertifyAI, you agree to these terms. All course content is for personal learning only. Redistribution is prohibited.",
        },
        {
          h: "2. Exams & Payments",
          b: "Exam fees are charged per attempt. Exams are AI-proctored. Cheating results in immediate disqualification without refund.",
        },
        {
          h: "3. Certificate Disclaimer",
          b: "CertifyAI certificates are skill-based credentials. They are not government-accredited, nor affiliated with Microsoft, Adobe, or other vendors.",
        },
        {
          h: "4. Anti-Cheating",
          b: "Tab switching, screen recording, sharing exam content, or any form of dishonesty results in permanent disqualification and certificate revocation.",
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      icon: "🔒",
      sections: [
        {
          h: "Data Collection",
          b: "We collect name, email, progress data, exam responses, and payment info (processed by Razorpay).",
        },
        {
          h: "AI Proctoring Disclosure",
          b: "During exams we monitor tab visibility, clipboard events, right-click attempts, and fullscreen status. No webcam data is captured.",
        },
        {
          h: "Data Usage",
          b: "Your data is used to provide the service, issue certificates, prevent cheating, and improve our AI. We do not sell your data.",
        },
      ],
    },
    refund: {
      title: "Refund Policy",
      icon: "💳",
      sections: [
        {
          h: "Eligibility",
          b: "Refunds are only available if the exam has NOT been started. Once you click 'Begin Exam', the attempt is considered used.",
        },
        {
          h: "Technical Issues",
          b: "If a technical failure on our end prevents completion, we'll offer a full refund or free retry.",
        },
        {
          h: "Process",
          b: "Email support@certifyai.in within 24 hours. Refunds processed within 5-7 business days.",
        },
      ],
    },
  };
  const pg = content[type] || content.terms;

  return (
    <div
      className="page-wrap"
      style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px 60px" }}
    >
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 44, marginBottom: 14 }}>{pg.icon}</div>
        <h1
          style={{
            fontSize: "clamp(26px, 4vw, 40px)",
            fontWeight: 800,
            letterSpacing: "-.03em",
          }}
        >
          {pg.title}
        </h1>
        <p style={{ color: t.text3, marginTop: 4, fontSize: 13 }}>
          Last updated: January 1, 2025
        </p>
      </div>
      {pg.sections.map((s, i) => (
        <div key={i} className="card" style={{ padding: 22, marginBottom: 12 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 10, fontSize: 15 }}>
            {s.h}
          </h3>
          <p style={{ color: t.text2, lineHeight: 1.8, fontSize: 14 }}>{s.b}</p>
        </div>
      ))}
      <div
        style={{
          marginTop: 24,
          padding: 18,
          background: t.warningDim,
          borderRadius: 10,
          border: `1px solid ${t.warning}30`,
        }}
      >
        <p style={{ fontSize: 12, color: t.text2 }}>
          ⚠️ <strong style={{ color: t.text }}>Disclaimer:</strong> CertifyAI
          certificates are non-accredited skill credentials. They do not
          constitute professional licenses or government qualifications.
        </p>
      </div>
    </div>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────
export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [examTarget, setExamTarget] = useState(null);

  const t = isDark ? T.dark : T.light;

  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.color = t.text;
  }, [isDark]);

  const navTo = (p) => {
    if (p === "exam" && !examTarget && course)
      setExamTarget({ course, level: "beginner" });
    setPage(p);
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage t={t} setPage={navTo} setCourse={setCourse} />;
      case "courses":
        return <CoursesPage t={t} setPage={navTo} setCourse={setCourse} />;
      case "learn":
        return course ? (
          <LearnPage
            t={t}
            course={course}
            setPage={navTo}
            setExamTarget={setExamTarget}
          />
        ) : (
          <CoursesPage t={t} setPage={navTo} setCourse={setCourse} />
        );
      case "exam":
        return examTarget ? (
          <ExamPage
            t={t}
            examTarget={examTarget}
            user={user}
            onDone={() => setPage("dashboard")}
          />
        ) : (
          <CoursesPage t={t} setPage={navTo} setCourse={setCourse} />
        );
      case "dashboard":
        return user ? (
          <DashboardPage
            t={t}
            user={user}
            setPage={navTo}
            setCourse={setCourse}
          />
        ) : (
          <HomePage t={t} setPage={navTo} setCourse={setCourse} />
        );
      case "pricing":
        return <PricingPage t={t} />;
      case "verify":
        return <VerifyPage t={t} />;
      case "admin":
        return user?.isAdmin ? (
          <AdminPanel t={t} />
        ) : (
          <HomePage t={t} setPage={navTo} setCourse={setCourse} />
        );
      case "terms":
        return <LegalPage t={t} type="terms" />;
      case "privacy":
        return <LegalPage t={t} type="privacy" />;
      case "refund":
        return <LegalPage t={t} type="refund" />;
      default:
        return <HomePage t={t} setPage={navTo} setCourse={setCourse} />;
    }
  };

  return (
    <>
      <CSS t={t} />
      <div
        style={{
          minHeight: "100vh",
          background: t.bg,
          color: t.text,
          transition: "background .3s,color .3s",
        }}
      >
        {page !== "exam" && (
          <Nav
            page={page}
            setPage={navTo}
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            setUser={setUser}
            t={t}
          />
        )}
        {renderPage()}
      </div>
    </>
  );
}
