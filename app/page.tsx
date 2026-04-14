"use client";

import { useState } from "react";
import Link from "next/link";


// ── Types ──────────────────────────────────────────────────────────────────
interface Article {
  id: number;
  title: string;
  author: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  cardBg: string;
  textDark: boolean;
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const featuredArticles: Article[] = [
  {
    id: 1,
    title: "Flutter & Mobile Dev",
    author: "Authory Saram",
    excerpt:
      "Developing with cross-platform frameworks to build elegant, high-performance mobile applications.",
    category: "Mobile Dev",
    categoryColor: "#38bdf8",
    cardBg: "#1a1a2e",
    textDark: false,
  },
  {
    id: 2,
    title: "AI in Healthcare",
    author: "Annan Kager",
    excerpt:
      "Leveraging AI for predictive diagnostics and research breakthroughs in modern medicine.",
    category: "AI",
    categoryColor: "#818cf8",
    cardBg: "#0f172a",
    textDark: false,
  },
  {
    id: 3,
    title: "Google Cloud Workshop",
    author: "Aram Negev",
    excerpt:
      "Practical applications of Google Cloud services for scalable, production-ready solutions.",
    category: "Cloud",
    categoryColor: "#4285F4",
    cardBg: "#e8f0fe",
    textDark: true,
  },
  {
    id: 4,
    title: "BGU Tech Projects Showcase",
    author: "Student Projects Team",
    excerpt:
      "Student Projects Showcase: innovative, locally-crafted creations by talented BGU developers.",
    category: "Showcase",
    categoryColor: "#34d399",
    cardBg: "#1e293b",
    textDark: false,
  },
];

// ── Global Styles ──────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { font-family: 'Google Sans', 'Segoe UI', sans-serif; }

  @keyframes float0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes float3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes float4 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
  @keyframes float5 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }

  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

  .hero-text    { animation: fadeUp 0.6s ease both; }
  .hero-buttons { animation: fadeUp 0.6s 0.15s ease both; }
  .hero-visual  { animation: fadeUp 0.6s 0.25s ease both; }

  .nav-link { position: relative; }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 50%; right: 50%;
    height: 2px;
    background: #1a73e8;
    transition: left 0.2s, right 0.2s;
    border-radius: 2px;
  }
  .nav-link.active::after { left: 0; right: 0; }

  /* Responsive grid */
  .articles-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  @media (max-width: 1100px) {
    .articles-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 580px) {
    .articles-grid { grid-template-columns: 1fr; }
  }

  /* Responsive hero layout */
  .hero-inner {
    display: flex;
    align-items: center;
    gap: 48px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 64px 40px;
  }
  @media (max-width: 900px) {
    .hero-inner {
      flex-direction: column;
      padding: 48px 24px;
      text-align: center;
    }
    .hero-buttons { justify-content: center !important; }
    .hero-stats   { justify-content: center !important; }
    .hero-visual  { display: none !important; }
  }
  @media (max-width: 480px) {
    .hero-inner { padding: 36px 16px; }
  }

  /* Responsive section padding */
  .section-pad { padding: 56px 60px; }
  @media (max-width: 900px)  { .section-pad { padding: 44px 28px; } }
  @media (max-width: 580px)  { .section-pad { padding: 36px 16px; } }

  /* Responsive footer */
  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px 60px;
  }
  @media (max-width: 700px) {
    .footer-inner {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 28px 20px;
    }
  }

  /* Navbar inner */
  .nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
  @media (max-width: 580px) {
    .nav-inner { padding: 0 20px; }
  }

  /* Nav links: centered on desktop, hidden on mobile */
  .nav-links {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 4px;
  }
  @media (max-width: 640px) {
    .nav-links { display: none !important; }
  }

  /* CTA buttons — visible on desktop, hidden on mobile */
  .nav-cta {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* Hamburger — hidden on desktop, visible on mobile */
  .hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    flex-direction: column;
    gap: 5px;
  }
  .hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: #202124;
    border-radius: 2px;
    transition: transform 0.2s, opacity 0.2s;
  }

  @media (max-width: 640px) {
    .nav-cta   { display: none !important; }
    .hamburger { display: flex !important; }
  }

  /* Mobile drawer */
  .mobile-drawer {
    position: fixed;
    top: 64px; left: 0; right: 0;
    background: #fff;
    border-bottom: 1px solid #e8eaed;
    padding: 16px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    z-index: 99;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }

  /* Card */
  .article-card {
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 8px rgba(60,64,67,0.10);
    transition: box-shadow 0.25s, transform 0.25s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    text-decoration: none;
  }
  .article-card:hover {
    box-shadow: 0 8px 32px rgba(60,64,67,0.18);
    transform: translateY(-4px);
  }

  /* Button effects */
  .btn-primary { transition: background 0.2s, transform 0.15s; }
  .btn-primary:hover { background: #1558b0 !important; transform: translateY(-1px); }
  .btn-outline { transition: background 0.2s, transform 0.15s; }
  .btn-outline:hover { background: rgba(26,115,232,0.08) !important; transform: translateY(-1px); }
`;

// ── GDG Logo ───────────────────────────────────────────────────────────────
function GDGLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, userSelect: "none" }}>
      <img src="/gdg-logo.png" alt="gdg logo" width={75} height={75} />
      <div>
        <div style={{ fontWeight: 700, fontSize: 20, lineHeight: 1, color: "#202124", letterSpacing: "-0.3px", marginTop: 7 }}>
          GDG
        </div>
        <div style={{ fontWeight: 400, fontSize: 15, color: "#5f6368", letterSpacing: "0.5px" }}>
          BGU Blog
        </div>
      </div>
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "Blog"] as const;
type NavLink = (typeof NAV_LINKS)[number];

function Navbar() {
  const [active, setActive] = useState<NavLink>("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{globalStyles}</style>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#fff",
          borderBottom: "1px solid #e8eaed",
          boxShadow: "0 1px 3px rgba(60,64,67,0.08)",
        }}
      >
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <GDGLogo />
          </Link>

          {/* Nav Links — centered, hidden on mobile */}
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link}
                href={link === "Home" ? "/" : "/blogs"}
                className={`nav-link${active === link ? " active" : ""}`}
                onClick={() => setActive(link)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 20px",
                  fontFamily: "inherit",
                  fontSize: 15,
                  fontWeight: active === link ? 600 : 400,
                  color: active === link ? "#1a73e8" : "#3c4043",
                  transition: "color 0.15s",
                  textDecoration: "none",
                }}
              >
                {link}
              </Link>
            ))}
          </div>

          {/* CTA buttons — desktop only */}
          <div className="nav-cta">
            <button
              className="btn-primary"
              style={{
                background: "#1a73e8",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                padding: "8px 22px",
                borderRadius: 20,
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Subscribe
            </button>
            <button
              style={{
                background: "none",
                border: "1px solid #dadce0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 20,
                fontFamily: "inherit",
                fontSize: 14,
                color: "#202124",
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "#e8eaed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#5f6368">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
              Login
            </button>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="mobile-drawer">
          {NAV_LINKS.map((link) => (
            <Link
              key={link}
              href={link === "Home" ? "/" : "/blogs"}
              onClick={() => {
                setActive(link);
                setMenuOpen(false);
              }}
              style={{
                background: active === link ? "#e8f0fe" : "none",
                border: "none",
                cursor: "pointer",
                padding: "13px 16px",
                borderRadius: 10,
                fontFamily: "inherit",
                fontSize: 15,
                fontWeight: active === link ? 600 : 400,
                color: active === link ? "#1a73e8" : "#3c4043",
                textDecoration: "none",
                display: "block",
              }}
            >
              {link}
            </Link>
          ))}

          <div
            style={{
              borderTop: "1px solid #e8eaed",
              marginTop: 10,
              paddingTop: 14,
              display: "flex",
              gap: 10,
            }}
          >
            <button
              style={{
                flex: 1,
                background: "#1a73e8",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                padding: "11px",
                borderRadius: 20,
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Subscribe
            </button>
            <button
              style={{
                flex: 1,
                background: "none",
                border: "1px solid #dadce0",
                cursor: "pointer",
                padding: "11px",
                borderRadius: 20,
                fontFamily: "inherit",
                fontSize: 14,
                color: "#202124",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#5f6368">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
const floatingIcons = [
  { symbol: "G", color: "#4285F4", top: "12%", right: "16%", anim: "float0", dur: "2.8s", delay: "0s" },
  { symbol: "▲", color: "#EA4335", top: "6%",  right: "5%",  anim: "float1", dur: "3.1s", delay: "0.4s" },
  { symbol: "D", color: "#FBBC05", top: "30%", right: "2%",  anim: "float2", dur: "3.4s", delay: "0.8s" },
  { symbol: "☁", color: "#34A853", top: "55%", right: "4%",  anim: "float3", dur: "3.0s", delay: "0.2s" },
  { symbol: "⬡", color: "#4285F4", top: "72%", right: "18%", anim: "float4", dur: "3.2s", delay: "0.6s" },
  { symbol: "✦", color: "#EA4335", top: "82%", right: "32%", anim: "float5", dur: "2.9s", delay: "1s" },
];

function HeroSection() {
  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, #e8f0fe 0%, #fce8e6 35%, #fef9c3 65%, #dcfce7 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="hero-inner">
        <div style={{ flex: "0 0 auto", maxWidth: 520 }}>
          <div className="hero-text">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(26,115,232,0.08)",
                border: "1px solid rgba(26,115,232,0.2)",
                borderRadius: 20,
                padding: "5px 14px",
                fontSize: 11,
                fontWeight: 600,
                color: "#1a73e8",
                letterSpacing: "0.5px",
                marginBottom: 20,
                textTransform: "uppercase" as const,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#34A853",
                  display: "inline-block",
                }}
              />
              BGU Campus Tech Community
            </div>

            <h1
              style={{
                fontSize: "clamp(34px, 5vw, 56px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "#202124",
                marginBottom: 20,
                letterSpacing: "-1px",
              }}
            >
              Explore Innovation
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #1a73e8, #34A853)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                with GDG BGU.
              </span>
            </h1>

            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: "#3c4043",
                marginBottom: 36,
                maxWidth: 460,
              }}
            >
              Your home for the latest tech insights, student projects, and
              developer stories from the Birla Global University tech community.
            </p>
          </div>

          <div
            className="hero-buttons"
            style={{ display: "flex", gap: 14, flexWrap: "wrap" as const }}
          >
            {/* ✅ "Read Latest Posts" → /blogs */}
            <Link href="/blogs" style={{ textDecoration: "none" }}>
              <button
                className="btn-primary"
                style={{
                  background: "#1a73e8",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  padding: "13px 28px",
                  borderRadius: 24,
                  fontFamily: "inherit",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                Read Latest Posts
              </button>
            </Link>

            <a
              href="https://chat.whatsapp.com/LLZTIbSQotaElCp2UXjGbe"
              target="_blank"
              rel="noopener noreferrer"
            >

            <button
              className="btn-outline"
              style={{
                background: "rgba(255,255,255,0.7)",
                color: "#1a73e8",
                border: "2px solid #1a73e8",
                cursor: "pointer",
                padding: "13px 28px",
                borderRadius: 24,
                fontFamily: "inherit",
                fontSize: 15,
                fontWeight: 500,
                backdropFilter: "blur(4px)",
              }}
            >
              Join Community
              </button>
            </a>
          </div>

          <div
            className="hero-stats"
            style={{ display: "flex", gap: 36, marginTop: 44, flexWrap: "wrap" as const }}
          >
            {[
              { value: "120+", label: "Articles" },
              { value: "5K+",  label: "Members" },
              { value: "40+",  label: "Events" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#1a73e8" }}>{value}</div>
                <div style={{ fontSize: 12, color: "#80868b", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="hero-visual"
          style={{
            flex: 1,
            position: "relative",
            minHeight: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {floatingIcons.map((item, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: item.top,
                right: item.right,
                width: 46,
                height: 46,
                borderRadius: 13,
                background: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 18,
                fontWeight: 700,
                boxShadow: `0 4px 16px ${item.color}66`,
                animation: `${item.anim} ${item.dur} ${item.delay} ease-in-out infinite`,
              }}
            >
              {item.symbol}
            </div>
          ))}

          <div
            style={{
              background: "rgba(255,255,255,0.88)",
              borderRadius: 20,
              padding: "22px 26px",
              boxShadow: "0 12px 40px rgba(60,64,67,0.14)",
              backdropFilter: "blur(10px)",
              width: 290,
              border: "1px solid rgba(255,255,255,0.6)",
            }}
          >
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {["#EA4335", "#FBBC05", "#34A853"].map((c) => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
              ))}
            </div>
            {[
              { text: "const gdg = 'awesome';",  color: "#1a73e8" },
              { text: "function innovate() {",   color: "#34A853" },
              { text: "  return future + now;",  color: "#EA4335" },
              { text: "}",                        color: "#34A853" },
              { text: "// GDG BGU 🚀",           color: "#80868b" },
            ].map((line, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "'Roboto Mono', monospace",
                  fontSize: 12.5,
                  color: line.color,
                  marginBottom: 5,
                  lineHeight: 1.5,
                }}
              >
                {line.text}
              </div>
            ))}
          </div>

          <div
            style={{
              position: "absolute",
              top: "8%",
              left: "5%",
              fontSize: 10,
              fontWeight: 700,
              color: "#5f6368",
              letterSpacing: "2px",
              textTransform: "uppercase" as const,
              background: "rgba(255,255,255,0.72)",
              padding: "4px 10px",
              borderRadius: 8,
              backdropFilter: "blur(4px)",
            }}
          >
            Campus Tech Ecosystem
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              left: "12%",
              fontSize: 10,
              fontWeight: 700,
              color: "#5f6368",
              letterSpacing: "2px",
              textTransform: "uppercase" as const,
              background: "rgba(255,255,255,0.72)",
              padding: "4px 10px",
              borderRadius: 8,
              backdropFilter: "blur(4px)",
            }}
          >
            Global Connectivity
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Article Card ───────────────────────────────────────────────────────────
function ArticleCard({ article }: { article: Article }) {
  return (
    // ✅ Each featured card links to /blogs/[id]
    <Link href={`/blogs/${article.id}`} className="article-card">
      <div
        style={{
          background: article.cardBg,
          height: 160,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "16px 18px",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            background: article.categoryColor + "33",
            border: `1px solid ${article.categoryColor}55`,
            color: article.categoryColor,
            fontSize: 11,
            fontWeight: 600,
            padding: "3px 10px",
            borderRadius: 12,
            letterSpacing: "0.5px",
          }}
        >
          {article.category}
        </span>
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "rgba(255,255,255,0.10)",
          }}
        />
        <span
          style={{
            fontWeight: 700,
            fontSize: 20,
            color: article.textDark ? "#202124" : "#fff",
            lineHeight: 1.25,
          }}
        >
          {article.title}
        </span>
      </div>

      <div
        style={{
          padding: "16px 20px 22px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 15, color: "#202124", marginBottom: 4 }}>
          {article.title}
        </div>
        <div style={{ fontSize: 12, color: "#80868b", marginBottom: 12 }}>
          By {article.author}
        </div>
        <p style={{ fontSize: 13, color: "#5f6368", lineHeight: 1.65, margin: 0, flex: 1 }}>
          {article.excerpt}
        </p>
        <span
          style={{
            marginTop: 18,
            alignSelf: "flex-start",
            color: "#1a73e8",
            fontSize: 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          Read more
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

// ── Latest Blog Section ────────────────────────────────────────────────────
function LatestBlogSection() {
  return (
    <section className="section-pad" style={{ background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 32,
            flexWrap: "wrap" as const,
            gap: 12,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#1a73e8",
                letterSpacing: "1.5px",
                textTransform: "uppercase" as const,
                marginBottom: 6,
              }}
            >
              Latest Posts
            </div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "#202124" }}>
              Featured Articles
            </h2>
          </div>

          {/* ✅ "View all →" → /blogs */}
          <Link href="/blogs" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "none",
                border: "1px solid #dadce0",
                cursor: "pointer",
                padding: "9px 22px",
                borderRadius: 20,
                fontFamily: "inherit",
                fontSize: 14,
                color: "#1a73e8",
                fontWeight: 500,
                transition: "border-color 0.2s",
              }}
            >
              View all →
            </button>
          </Link>
        </div>

        <div className="articles-grid">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#f8f9fa", borderTop: "1px solid #e8eaed" }}>
      <div className="footer-inner">
        <GDGLogo />
        <div style={{ fontSize: 13, color: "#80868b", marginTop: 5 }}>
          © 2026 GDG BGU Blog. All rights reserved.
        </div>
        <div style={{ display: "flex", gap: 20, textAlign: "center", marginTop: 5 }}>
          {["Privacy", "Terms", "Contact"].map((item) => (
            <span
              key={item}
              style={{ fontSize: 13, color: "#1a73e8", cursor: "pointer", fontWeight: 500 }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <LatestBlogSection />
      <Footer />
    </div>
  );
}