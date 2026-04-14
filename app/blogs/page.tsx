"use client";

import { useState } from "react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────
interface Blog {
  id: number;
  title: string;
  author: string;
  publishDate: string;
  readTime: number;
  excerpt: string;
  category: string;
  categoryColor: string;
  cardBg: string;
  textDark: boolean;
  icon: string;
  commentCount: number;
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const allBlogs: Blog[] = [
  {
    id: 1,
    title: "Demystifying Cloud Computing on Campus",
    author: "Alex Johnson",
    publishDate: "October 26, 2023",
    readTime: 5,
    excerpt:
      "Explore how Google Cloud services are transforming the way students and faculty collaborate, store data, and build scalable applications right from the campus network.",
    category: "Cloud Computing",
    categoryColor: "#4285F4",
    cardBg: "#e8f0fe",
    textDark: true,
    icon: "☁",
    commentCount: 12,
  },
  {
    id: 2,
    title: "The Future of Robotics: A Campus Perspective",
    author: "Priya Mehta",
    publishDate: "October 26, 2023",
    readTime: 7,
    excerpt:
      "BGU's robotics lab is pushing boundaries with AI-driven automation projects. Discover the student teams building tomorrow's machines today.",
    category: "AI & Robotics",
    categoryColor: "#EA4335",
    cardBg: "#1a1a2e",
    textDark: false,
    icon: "🤖",
    commentCount: 8,
  },
  {
    id: 3,
    title: "Optimizing Stadium Operations with Tech",
    author: "Rohan Das",
    publishDate: "October 26, 2023",
    readTime: 6,
    excerpt:
      "From smart ticketing to real-time crowd analytics, learn how GDG BGU partnered with the sports department to modernize campus events using data-driven tools.",
    category: "Campus Innovations",
    categoryColor: "#34A853",
    cardBg: "#0f172a",
    textDark: false,
    icon: "🏟",
    commentCount: 15,
  },
  {
    id: 4,
    title: "From Code to Campus: Building an App",
    author: "Sara Nkosi",
    publishDate: "October 26, 2023",
    readTime: 8,
    excerpt:
      "A step-by-step walkthrough of how a team of four students designed, built, and shipped a campus navigation app using Flutter and Firebase in under two months.",
    category: "Campus Projects",
    categoryColor: "#FBBC05",
    cardBg: "#1e293b",
    textDark: false,
    icon: "📱",
    commentCount: 21,
  },
  {
    id: 5,
    title: "Optimizing Innovations with Tech",
    author: "James Okafor",
    publishDate: "November 3, 2023",
    readTime: 4,
    excerpt:
      "A deep dive into the innovations brewing at BGU — from AI-powered scheduling tools to eco-friendly server infrastructure powering the campus data center.",
    category: "Campus Innovations",
    categoryColor: "#34A853",
    cardBg: "#e8f0fe",
    textDark: true,
    icon: "💡",
    commentCount: 6,
  },
  {
    id: 6,
    title: "Intro to Machine Learning for Beginners",
    author: "Ananya Iyer",
    publishDate: "November 10, 2023",
    readTime: 10,
    excerpt:
      "No math PhD required. This beginner-friendly guide walks you through core ML concepts using real BGU research datasets and Python notebooks you can run today.",
    category: "AI & Robotics",
    categoryColor: "#EA4335",
    cardBg: "#0f172a",
    textDark: false,
    icon: "🧠",
    commentCount: 18,
  },
];

const categories = ["All", "Cloud Computing", "AI & Robotics", "Campus Innovations", "Campus Projects"];

const recentPosts = allBlogs.slice(0, 5);

// ── Global Styles (same as home page) ─────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Google Sans', 'Segoe UI', sans-serif; }

  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  .fade-up { animation: fadeUp 0.5s ease both; }

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

  /* Blog listing layout */
  .blog-layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 60px;
  }
  @media (max-width: 1000px) {
    .blog-layout { grid-template-columns: 1fr; padding: 36px 28px; }
    .sidebar { display: none; }
  }
  @media (max-width: 580px) {
    .blog-layout { padding: 24px 16px; }
  }

  /* Blog cards grid */
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  @media (max-width: 720px) {
    .blog-grid { grid-template-columns: 1fr; }
  }

  /* Card hover */
  .blog-card {
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
  .blog-card:hover {
    box-shadow: 0 8px 32px rgba(60,64,67,0.18);
    transform: translateY(-4px);
  }

  /* Category filter pills */
  .cat-pill {
    padding: 7px 18px;
    border-radius: 20px;
    border: 1.5px solid #dadce0;
    background: #fff;
    font-family: 'Google Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #3c4043;
    cursor: pointer;
    transition: all 0.18s;
    white-space: nowrap;
  }
  .cat-pill:hover { border-color: #1a73e8; color: #1a73e8; background: #e8f0fe; }
  .cat-pill.active { border-color: #1a73e8; color: #fff; background: #1a73e8; }

  /* Sidebar card */
  .sidebar-card {
    background: #fff;
    border-radius: 16px;
    padding: 22px 20px;
    box-shadow: 0 2px 8px rgba(60,64,67,0.10);
    margin-bottom: 20px;
  }

  /* Recent post item hover */
  .recent-item {
    padding: 10px 0;
    border-bottom: 1px solid #f1f3f4;
    cursor: pointer;
    transition: color 0.15s;
    text-decoration: none;
    display: block;
  }
  .recent-item:last-child { border-bottom: none; }
  .recent-item:hover .recent-title { color: #1a73e8; }

  /* Sidebar category item */
  .sidebar-cat {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 0;
    border-bottom: 1px solid #f1f3f4;
    cursor: pointer;
    transition: color 0.15s;
  }
  .sidebar-cat:last-child { border-bottom: none; }
  .sidebar-cat:hover { color: #1a73e8; }

  /* Btn effects */
  .btn-primary { transition: background 0.2s, transform 0.15s; }
  .btn-primary:hover { background: #1558b0 !important; transform: translateY(-1px); }
  .btn-outline { transition: background 0.2s, transform 0.15s; }
  .btn-outline:hover { background: rgba(26,115,232,0.08) !important; transform: translateY(-1px); }

  /* Navbar */
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
  @media (max-width: 580px) { .nav-inner { padding: 0 20px; } }

  .nav-links {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 4px;
  }
  @media (max-width: 640px) { .nav-links { display: none !important; } }

  .nav-cta { display: flex; align-items: center; gap: 10px; }
  .hamburger {
    display: none; background: none; border: none; cursor: pointer;
    padding: 6px; flex-direction: column; gap: 5px;
  }
  .hamburger span { display: block; width: 22px; height: 2px; background: #202124; border-radius: 2px; transition: transform 0.2s, opacity 0.2s; }

  @media (max-width: 640px) {
    .nav-cta   { display: none !important; }
    .hamburger { display: flex !important; }
  }

  .mobile-drawer {
    position: fixed; top: 64px; left: 0; right: 0;
    background: #fff; border-bottom: 1px solid #e8eaed;
    padding: 16px 20px 20px; display: flex; flex-direction: column; gap: 4px;
    z-index: 99; box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }

  /* Footer */
  .footer-inner {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 16px;
    max-width: 1200px; margin: 0 auto; padding: 32px 60px;
  }
  @media (max-width: 700px) {
    .footer-inner { flex-direction: column; align-items: center; text-align: center; padding: 28px 20px; }
  }

  /* Search bar */
  .search-bar {
    display: flex; align-items: center; gap: 10px;
    background: #f1f3f4; border-radius: 24px; padding: 10px 18px;
    margin-bottom: 28px; border: 1.5px solid transparent;
    transition: border-color 0.2s, background 0.2s;
  }
  .search-bar:focus-within { background: #fff; border-color: #1a73e8; box-shadow: 0 2px 8px rgba(26,115,232,0.12); }
  .search-bar input { border: none; background: none; outline: none; font-family: 'Google Sans', sans-serif; font-size: 15px; color: #202124; width: 100%; }
  .search-bar input::placeholder { color: #80868b; }
`;

// ── Shared Components ──────────────────────────────────────────────────────
function GDGLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, userSelect: "none" }}>
      <img src="/gdg-logo.png" alt="gdg logo" width={75} height={75} />
      <div>
        <div style={{ fontWeight: 700, fontSize: 20, lineHeight: 1, color: "#202124", letterSpacing: "-0.3px", marginTop: 7 }}>GDG</div>
        <div style={{ fontWeight: 400, fontSize: 15, color: "#5f6368", letterSpacing: "0.5px" }}>BGU Blog</div>
      </div>
    </div>
  );
}

const NAV_LINKS = ["Home", "Blog"] as const;
type NavLink = (typeof NAV_LINKS)[number];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{globalStyles}</style>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "#fff", borderBottom: "1px solid #e8eaed", boxShadow: "0 1px 3px rgba(60,64,67,0.08)" }}>
        <div className="nav-inner">
          <Link href="/" style={{ textDecoration: "none" }}>
            <GDGLogo />
          </Link>

          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link}
                href={link === "Home" ? "/" : "/blogs"}
                className={`nav-link${link === "Blog" ? " active" : ""}`}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "8px 20px", fontFamily: "inherit", fontSize: 15,
                  fontWeight: link === "Blog" ? 600 : 400,
                  color: link === "Blog" ? "#1a73e8" : "#3c4043",
                  transition: "color 0.15s", textDecoration: "none",
                }}
              >
                {link}
              </Link>
            ))}
          </div>

          <div className="nav-cta">
            <button className="btn-primary" style={{ background: "#1a73e8", color: "#fff", border: "none", cursor: "pointer", padding: "8px 22px", borderRadius: 20, fontFamily: "inherit", fontSize: 14, fontWeight: 500 }}>
              Subscribe
            </button>
            <button style={{ background: "none", border: "1px solid #dadce0", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 20, fontFamily: "inherit", fontSize: 14, color: "#202124" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#e8eaed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#5f6368"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" /></svg>
              </div>
              Login
            </button>
          </div>

          <button className="hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-drawer">
          {NAV_LINKS.map((link) => (
            <Link
              key={link}
              href={link === "Home" ? "/" : "/blogs"}
              onClick={() => setMenuOpen(false)}
              style={{
                background: link === "Blog" ? "#e8f0fe" : "none",
                border: "none", cursor: "pointer", padding: "13px 16px",
                borderRadius: 10, fontFamily: "inherit", fontSize: 15,
                fontWeight: link === "Blog" ? 600 : 400,
                color: link === "Blog" ? "#1a73e8" : "#3c4043",
                textDecoration: "none", display: "block",
              }}
            >
              {link}
            </Link>
          ))}
          <div style={{ borderTop: "1px solid #e8eaed", marginTop: 10, paddingTop: 14, display: "flex", gap: 10 }}>
            <button style={{ flex: 1, background: "#1a73e8", color: "#fff", border: "none", cursor: "pointer", padding: "11px", borderRadius: 20, fontFamily: "inherit", fontSize: 14, fontWeight: 500 }}>Subscribe</button>
            <button style={{ flex: 1, background: "none", border: "1px solid #dadce0", cursor: "pointer", padding: "11px", borderRadius: 20, fontFamily: "inherit", fontSize: 14, color: "#202124", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#5f6368"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" /></svg>
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#f8f9fa", borderTop: "1px solid #e8eaed" }}>
      <div className="footer-inner">
        <GDGLogo />
        <div style={{ fontSize: 13, color: "#80868b", marginTop: 5 }}>© 2026 GDG BGU Blog. All rights reserved.</div>
        <div style={{ display: "flex", gap: 20, marginTop: 5 }}>
          {["Privacy", "Terms", "Contact"].map((item) => (
            <span key={item} style={{ fontSize: 13, color: "#1a73e8", cursor: "pointer", fontWeight: 500 }}>{item}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── Blog Card ──────────────────────────────────────────────────────────────
function BlogCard({ blog, delay = 0 }: { blog: Blog; delay?: number }) {
  return (
    <Link
      href={`/blogs/${blog.id}`}
      className="blog-card fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Color banner with icon */}
      <div style={{ background: blog.cardBg, height: 150, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: -30, left: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

        <span style={{ fontSize: 52, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))", zIndex: 1 }}>{blog.icon}</span>

        {/* Category badge */}
        <span style={{
          position: "absolute", top: 14, left: 14,
          background: blog.categoryColor + "25",
          border: `1px solid ${blog.categoryColor}55`,
          color: blog.textDark ? blog.categoryColor : blog.categoryColor,
          fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 12, letterSpacing: "0.5px",
        }}>
          {blog.category}
        </span>

        {/* Read time badge */}
        <span style={{
          position: "absolute", top: 14, right: 14,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(4px)",
          color: blog.textDark ? "#3c4043" : "#fff",
          fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 12,
          border: `1px solid ${blog.textDark ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.25)"}`,
        }}>
          ⏱ {blog.readTime} min read
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontWeight: 700, fontSize: 16, color: "#202124", lineHeight: 1.35, marginBottom: 6 }}>
          {blog.title}
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          {/* Author avatar */}
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, #1a73e8, #34A853)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700 }}>
            {blog.author.charAt(0)}
          </div>
          <span style={{ fontSize: 12, color: "#5f6368", fontWeight: 500 }}>{blog.author}</span>
          <span style={{ fontSize: 12, color: "#dadce0" }}>•</span>
          <span style={{ fontSize: 12, color: "#80868b" }}>{blog.publishDate}</span>
        </div>

        <p style={{ fontSize: 13, color: "#5f6368", lineHeight: 1.65, margin: 0, flex: 1 }}>
          {blog.excerpt}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18 }}>
          <span style={{ color: "#1a73e8", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
            Read more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
          <span style={{ fontSize: 12, color: "#80868b", display: "flex", alignItems: "center", gap: 4 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#80868b" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {blog.commentCount}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Sidebar ────────────────────────────────────────────────────────────────
function Sidebar({ activeCategory, onCategoryChange }: { activeCategory: string; onCategoryChange: (cat: string) => void }) {
  const categoryIcons: Record<string, string> = {
    "Cloud Computing": "☁",
    "AI & Robotics": "🤖",
    "Campus Innovations": "💡",
    "Campus Projects": "📱",
  };

  return (
    <aside className="sidebar">
      {/* Categories */}
      <div className="sidebar-card">
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#202124", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 3, height: 18, background: "#1a73e8", borderRadius: 2, display: "inline-block" }} />
          Categories
        </h3>
        {Object.entries(categoryIcons).map(([cat, icon]) => (
          <div key={cat} className="sidebar-cat" onClick={() => onCategoryChange(cat)} style={{ color: activeCategory === cat ? "#1a73e8" : "#3c4043" }}>
            <span style={{ fontSize: 18, width: 28, textAlign: "center" }}>{icon}</span>
            <span style={{ fontSize: 14, fontWeight: activeCategory === cat ? 600 : 400 }}>{cat}</span>
          </div>
        ))}
        <div className="sidebar-cat" onClick={() => onCategoryChange("All")} style={{ color: activeCategory === "All" ? "#1a73e8" : "#3c4043" }}>
          <span style={{ fontSize: 18, width: 28, textAlign: "center" }}>✦</span>
          <span style={{ fontSize: 14, fontWeight: activeCategory === "All" ? 600 : 400 }}>All Blogs</span>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="sidebar-card">
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#202124", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 3, height: 18, background: "#34A853", borderRadius: 2, display: "inline-block" }} />
          Recent Posts
        </h3>
        {recentPosts.map((post) => (
          <Link key={post.id} href={`/blogs/${post.id}`} className="recent-item">
            <div className="recent-title" style={{ fontSize: 13, fontWeight: 600, color: "#202124", lineHeight: 1.35, marginBottom: 3, transition: "color 0.15s" }}>
              {post.title}
            </div>
            <div style={{ fontSize: 11, color: "#80868b" }}>
              {post.publishDate} · {post.readTime} min read
            </div>
          </Link>
        ))}
      </div>

      {/* Newsletter CTA */}
      <div style={{ background: "linear-gradient(135deg, #1a73e8 0%, #34A853 100%)", borderRadius: 16, padding: "22px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 24, marginBottom: 10 }}>📬</div>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Stay in the Loop</h3>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", marginBottom: 16, lineHeight: 1.5 }}>
          Get the latest GDG BGU articles delivered to your inbox.
        </p>
        <button style={{ width: "100%", background: "#fff", color: "#1a73e8", border: "none", cursor: "pointer", padding: "10px", borderRadius: 20, fontFamily: "inherit", fontSize: 13, fontWeight: 600 }}>
          Subscribe Now
        </button>
      </div>
    </aside>
  );
}

// ── Page Banner ────────────────────────────────────────────────────────────
function PageBanner() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #e8f0fe 0%, #fce8e6 50%, #dcfce7 100%)",
      borderBottom: "1px solid #e8eaed",
      padding: "40px 60px 32px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#80868b", marginBottom: 16 }}>
          <Link href="/" style={{ color: "#1a73e8", textDecoration: "none", fontWeight: 500 }}>Home</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#80868b" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
          <span style={{ color: "#3c4043" }}>Blog</span>
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(26,115,232,0.08)", border: "1px solid rgba(26,115,232,0.2)", borderRadius: 20, padding: "5px 14px", fontSize: 11, fontWeight: 600, color: "#1a73e8", letterSpacing: "0.5px", marginBottom: 16, textTransform: "uppercase" as const }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34A853", display: "inline-block" }} />
          GDG BGU Blog
        </div>

        <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "#202124", letterSpacing: "-0.5px", marginBottom: 10 }}>
          All Articles
        </h1>
        <p style={{ fontSize: 15, color: "#3c4043", lineHeight: 1.6 }}>
          Tech insights, student projects, and developer stories from the BGU community.
        </p>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function BlogListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allBlogs.filter((b) => {
    const matchesCat = activeCategory === "All" || b.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <Navbar />
      <PageBanner />

      <div className="blog-layout">
        {/* Main Content */}
        <main>
          {/* Search bar */}
          <div className="search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#80868b" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search articles, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#80868b", fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
            )}
          </div>

          {/* Category filter pills */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const, marginBottom: 28, overflowX: "auto" as const, paddingBottom: 4 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-pill${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div style={{ fontSize: 13, color: "#80868b", marginBottom: 20, fontWeight: 500 }}>
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && ` in ${activeCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>

          {/* Blog grid */}
          {filtered.length > 0 ? (
            <div className="blog-grid">
              {filtered.map((blog, i) => (
                <BlogCard key={blog.id} blog={blog} delay={i * 80} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#80868b" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#3c4043", marginBottom: 8 }}>No articles found</h3>
              <p style={{ fontSize: 14 }}>Try a different search term or category.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="btn-primary"
                style={{ marginTop: 20, background: "#1a73e8", color: "#fff", border: "none", cursor: "pointer", padding: "10px 24px", borderRadius: 20, fontFamily: "inherit", fontSize: 14, fontWeight: 500 }}
              >
                Clear filters
              </button>
            </div>
          )}
        </main>

        {/* Sidebar */}
        <Sidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      <Footer />
    </div>
  );
}