"use client";

import { useState } from "react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────
type BlogStatus = "Draft" | "Published" | "Archived" | "Deleted";

interface Blog {
  id: number;
  title: string;
  author: string;
  category: string;
  status: BlogStatus;
  readTime: string;
  createdAt: string;
  excerpt: string;
  content: string;
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const initialBlogs: Blog[] = [
  {
    id: 1,
    title: "Flutter & Mobile Dev",
    author: "Authory Saram",
    category: "Mobile Dev",
    status: "Published",
    readTime: "5 min",
    createdAt: "2026-04-10",
    excerpt: "Developing with cross-platform frameworks to build elegant, high-performance mobile applications.",
    content: "Full content here...",
  },
  {
    id: 2,
    title: "AI in Healthcare",
    author: "Annan Kager",
    category: "AI",
    status: "Published",
    readTime: "7 min",
    createdAt: "2026-04-08",
    excerpt: "Leveraging AI for predictive diagnostics and research breakthroughs in modern medicine.",
    content: "Full content here...",
  },
  {
    id: 3,
    title: "Google Cloud Workshop",
    author: "Aram Negev",
    category: "Cloud",
    status: "Draft",
    readTime: "4 min",
    createdAt: "2026-04-05",
    excerpt: "Practical applications of Google Cloud services for scalable, production-ready solutions.",
    content: "Full content here...",
  },
  {
    id: 4,
    title: "BGU Tech Projects Showcase",
    author: "Student Projects Team",
    category: "Showcase",
    status: "Archived",
    readTime: "6 min",
    createdAt: "2026-03-28",
    excerpt: "Student Projects Showcase: innovative, locally-crafted creations by talented BGU developers.",
    content: "Full content here...",
  },
  {
    id: 5,
    title: "Web3 & Blockchain Basics",
    author: "Priya Mehta",
    category: "Blockchain",
    status: "Draft",
    readTime: "8 min",
    createdAt: "2026-03-20",
    excerpt: "A beginner's guide to decentralized web, smart contracts, and the future of trust.",
    content: "Full content here...",
  },
];

// ── Global Styles ──────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Google Sans', 'Segoe UI', sans-serif; }

  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
  @keyframes overlayIn { from{opacity:0} to{opacity:1} }
  @keyframes modalIn { from{opacity:0;transform:scale(0.95) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }

  .page-anim { animation: fadeUp 0.5s ease both; }
  .card-anim { animation: fadeUp 0.5s ease both; }

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

  .admin-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 32px;
  }
  @media (max-width: 1100px) { .admin-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 580px) { .admin-grid { grid-template-columns: 1fr; } }

  .table-wrap { overflow-x: auto; }

  .blog-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr auto;
    align-items: center;
    padding: 14px 20px;
    border-bottom: 1px solid #f1f3f4;
    transition: background 0.15s;
    gap: 12px;
  }
  .blog-row:hover { background: #f8f9fa; }
  @media (max-width: 900px) {
    .blog-row {
      grid-template-columns: 1fr 1fr auto;
      gap: 8px;
    }
    .blog-row .hide-sm { display: none !important; }
  }

  .action-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 8px;
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(32,33,36,0.45);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: overlayIn 0.2s ease;
  }
  .modal-box {
    background: #fff;
    border-radius: 20px;
    width: 100%;
    max-width: 580px;
    box-shadow: 0 24px 80px rgba(60,64,67,0.22);
    overflow: hidden;
    animation: modalIn 0.25s ease;
    max-height: 90vh;
    overflow-y: auto;
  }
  .modal-header {
    padding: 24px 28px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .modal-body { padding: 20px 28px 28px; }

  .form-group { margin-bottom: 18px; }
  .form-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #3c4043;
    margin-bottom: 6px;
  }
  .form-input, .form-textarea, .form-select {
    width: 100%;
    border: 1px solid #dadce0;
    border-radius: 10px;
    padding: 10px 14px;
    font-family: inherit;
    font-size: 14px;
    color: #202124;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    background: #fff;
  }
  .form-input:focus, .form-textarea:focus, .form-select:focus {
    border-color: #1a73e8;
    box-shadow: 0 0 0 3px rgba(26,115,232,0.12);
  }
  .form-textarea { resize: vertical; min-height: 100px; }

  .tab-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px 20px;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    color: #5f6368;
    border-radius: 20px;
    transition: background 0.15s, color 0.15s;
  }
  .tab-btn.active {
    background: #e8f0fe;
    color: #1a73e8;
    font-weight: 600;
  }
  .tab-btn:hover:not(.active) { background: #f1f3f4; }

  .badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .stat-card {
    background: #fff;
    border-radius: 16px;
    padding: 22px 24px;
    box-shadow: 0 2px 8px rgba(60,64,67,0.08);
    border: 1px solid #f1f3f4;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .stat-card:hover { box-shadow: 0 6px 24px rgba(60,64,67,0.13); transform: translateY(-2px); }

  .btn-primary {
    background: #1a73e8;
    color: #fff;
    border: none;
    cursor: pointer;
    padding: 10px 22px;
    border-radius: 20px;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    transition: background 0.2s, transform 0.15s;
  }
  .btn-primary:hover { background: #1558b0; transform: translateY(-1px); }

  .btn-ghost {
    background: none;
    border: 1px solid #dadce0;
    cursor: pointer;
    padding: 10px 22px;
    border-radius: 20px;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    color: #3c4043;
    transition: background 0.15s;
  }
  .btn-ghost:hover { background: #f1f3f4; }

  .confirm-modal-box {
    background: #fff;
    border-radius: 20px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 24px 80px rgba(60,64,67,0.22);
    overflow: hidden;
    animation: modalIn 0.25s ease;
    padding: 32px 28px 28px;
    text-align: center;
  }

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
    .footer-inner { flex-direction: column; align-items: center; text-align: center; padding: 28px 20px; }
  }
`;

// ── Helpers ────────────────────────────────────────────────────────────────
function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}

function statusBadge(status: BlogStatus) {
  const map: Record<BlogStatus, { bg: string; color: string }> = {
    Published: { bg: "#e6f4ea", color: "#137333" },
    Draft:     { bg: "#fef7e0", color: "#b06000" },
    Archived:  { bg: "#e8eaed", color: "#5f6368" },
    Deleted:   { bg: "#fce8e6", color: "#c5221f" },
  };
  const s = map[status];
  return (
    <span className="badge" style={{ background: s.bg, color: s.color }}>
      {status}
    </span>
  );
}

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
function Navbar() {
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
          <Link href="/" style={{ textDecoration: "none" }}>
            <GDGLogo />
          </Link>

          <div className="nav-links">
            {["Home", "Blog", "Admin"].map((link) => (
              <Link
                key={link}
                href={link === "Home" ? "/" : link === "Blog" ? "/blogs" : "/admin"}
                className={`nav-link${link === "Admin" ? " active" : ""}`}
                style={{
                  padding: "8px 20px",
                  fontSize: 15,
                  fontWeight: link === "Admin" ? 600 : 400,
                  color: link === "Admin" ? "#1a73e8" : "#3c4043",
                  textDecoration: "none",
                }}
              >
                {link}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#e8f0fe",
                border: "1px solid rgba(26,115,232,0.25)",
                borderRadius: 20,
                padding: "6px 14px 6px 8px",
                fontSize: 13,
                fontWeight: 600,
                color: "#1a73e8",
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "#1a73e8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                A
              </div>
              Admin
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// ── Blog Form Modal ────────────────────────────────────────────────────────
interface BlogFormProps {
  blog?: Blog;
  onClose: () => void;
  onSave: (blog: Partial<Blog>) => void;
}

function BlogFormModal({ blog, onClose, onSave }: BlogFormProps) {
  const [title, setTitle]     = useState(blog?.title   ?? "");
  const [author, setAuthor]   = useState(blog?.author  ?? "");
  const [category, setCategory] = useState(blog?.category ?? "");
  const [content, setContent] = useState(blog?.content ?? "");
  const [excerpt, setExcerpt] = useState(blog?.excerpt ?? "");
  const [readTime, setReadTime] = useState(blog?.readTime ?? "");
  const [status, setStatus]   = useState<"Draft" | "Published">(
    blog?.status === "Published" ? "Published" : "Draft"
  );
  const [autoRead, setAutoRead] = useState(!blog?.readTime);

  const computedReadTime = autoRead ? estimateReadTime(content) : readTime;

  function handleSave() {
    if (!title.trim() || !author.trim()) return;
    onSave({ title, author, category, content, excerpt, readTime: computedReadTime, status });
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1a73e8", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4 }}>
              {blog ? "Edit Blog" : "New Blog"}
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#202124" }}>
              {blog ? "Update Post" : "Create Post"}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: "#f1f3f4", border: "none", cursor: "pointer", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title..." />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Author *</label>
              <input className="form-input" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name..." />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <input className="form-input" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. AI, Cloud..." />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Excerpt</label>
            <textarea className="form-textarea" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short description..." style={{ minHeight: 60 }} />
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea className="form-textarea" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Full blog content..." />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Read Time</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  className="form-input"
                  value={autoRead ? computedReadTime : readTime}
                  onChange={(e) => { setAutoRead(false); setReadTime(e.target.value); }}
                  placeholder="e.g. 5 min"
                  disabled={autoRead}
                  style={{ flex: 1, opacity: autoRead ? 0.6 : 1 }}
                />
              </div>
              <label style={{ fontSize: 12, color: "#5f6368", marginTop: 5, display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
                <input type="checkbox" checked={autoRead} onChange={(e) => setAutoRead(e.target.checked)} />
                Auto-calculate from content
              </label>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value as "Draft" | "Published")}>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <button className="btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>
              {blog ? "Save Changes" : "Create Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Confirm Modal ──────────────────────────────────────────────────────────
interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel: string;
  confirmColor?: string;
  onConfirm: () => void;
  onClose: () => void;
}

function ConfirmModal({ title, message, confirmLabel, confirmColor = "#c5221f", onConfirm, onClose }: ConfirmModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="confirm-modal-box" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: confirmColor + "18",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={confirmColor} strokeWidth="2.2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#202124", marginBottom: 8 }}>{title}</h3>
        <p style={{ fontSize: 14, color: "#5f6368", lineHeight: 1.6, marginBottom: 24 }}>{message}</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button
            style={{
              background: confirmColor,
              color: "#fff",
              border: "none",
              cursor: "pointer",
              padding: "10px 22px",
              borderRadius: 20,
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: 600,
              transition: "opacity 0.15s",
            }}
            onClick={() => { onConfirm(); onClose(); }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color, sub }: { label: string; value: number; icon: string; color: string; sub?: string }) {
  return (
    <div className="stat-card card-anim">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: color + "18",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          {icon}
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: color, letterSpacing: "0.5px", background: color + "12", padding: "3px 8px", borderRadius: 8 }}>
          {label}
        </span>
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: "#202124", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "#80868b", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ── Blog Row ───────────────────────────────────────────────────────────────
interface BlogRowProps {
  blog: Blog;
  onEdit: () => void;
  onArchive: () => void;
  onUnarchive: () => void;
  onDelete: () => void;
}

function BlogRow({ blog, onEdit, onArchive, onUnarchive, onDelete }: BlogRowProps) {
  return (
    <div className="blog-row">
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, color: "#202124", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {blog.title}
        </div>
        <div style={{ fontSize: 12, color: "#80868b" }}>By {blog.author}</div>
      </div>
      <div className="hide-sm" style={{ fontSize: 13, color: "#5f6368" }}>{blog.category || "—"}</div>
      <div className="hide-sm">{statusBadge(blog.status)}</div>
      <div className="hide-sm" style={{ fontSize: 13, color: "#5f6368" }}>{blog.readTime}</div>
      <div className="hide-sm" style={{ fontSize: 12, color: "#80868b" }}>{blog.createdAt}</div>

      <div style={{ display: "flex", gap: 4, justifyContent: "flex-end", flexWrap: "wrap" }}>
        {blog.status !== "Deleted" && (
          <button
            className="action-btn"
            onClick={onEdit}
            style={{ color: "#1a73e8", background: "rgba(26,115,232,0.08)" }}
            title="Edit"
          >
            Edit
          </button>
        )}
        {blog.status !== "Archived" && blog.status !== "Deleted" && (
          <button
            className="action-btn"
            onClick={onArchive}
            style={{ color: "#5f6368", background: "#f1f3f4" }}
            title="Archive"
          >
            Archive
          </button>
        )}
        {blog.status === "Archived" && (
          <button
            className="action-btn"
            onClick={onUnarchive}
            style={{ color: "#137333", background: "#e6f4ea" }}
            title="Unarchive"
          >
            Unarchive
          </button>
        )}
        {blog.status !== "Deleted" && (
          <button
            className="action-btn"
            onClick={onDelete}
            style={{ color: "#c5221f", background: "#fce8e6" }}
            title="Delete"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const [blogs, setBlogs]             = useState<Blog[]>(initialBlogs);
  const [activeTab, setActiveTab]     = useState<BlogStatus | "All">("All");
  const [search, setSearch]           = useState("");
  const [showForm, setShowForm]       = useState(false);
  const [editBlog, setEditBlog]       = useState<Blog | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    type: "archive" | "unarchive" | "delete";
    id: number;
  } | null>(null);

  // ── Stats ──────────────────────────────────────────────────────────────
  const total      = blogs.length;
  const published  = blogs.filter((b) => b.status === "Published").length;
  const drafts     = blogs.filter((b) => b.status === "Draft").length;
  const archived   = blogs.filter((b) => b.status === "Archived").length;

  // ── Filtered list ──────────────────────────────────────────────────────
  const filtered = blogs.filter((b) => {
    const matchTab    = activeTab === "All" || b.status === activeTab;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  // ── Actions ────────────────────────────────────────────────────────────
  function handleCreate(data: Partial<Blog>) {
    const newBlog: Blog = {
      id: Date.now(),
      title:    data.title    ?? "",
      author:   data.author   ?? "",
      category: data.category ?? "",
      content:  data.content  ?? "",
      excerpt:  data.excerpt  ?? "",
      readTime: data.readTime ?? "1 min",
      status:   data.status   ?? "Draft",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setBlogs((prev) => [newBlog, ...prev]);
  }

  function handleEdit(data: Partial<Blog>) {
    if (!editBlog) return;
    setBlogs((prev) =>
      prev.map((b) => (b.id === editBlog.id ? { ...b, ...data } : b))
    );
  }

  function handleArchive(id: number) {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Archived" } : b))
    );
  }

  function handleUnarchive(id: number) {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Draft" } : b))
    );
  }

  function handleDelete(id: number) {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Deleted" } : b))
    );
  }

  const confirmBlog = blogs.find((b) => b.id === confirmAction?.id);

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <Navbar />

      {/* ── Page Header ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #e8f0fe 0%, #fce8e6 60%, #fef9c3 100%)",
          borderBottom: "1px solid #e8eaed",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 40px 32px" }}>
          <div className="page-anim">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(26,115,232,0.08)",
                border: "1px solid rgba(26,115,232,0.2)",
                borderRadius: 20,
                padding: "4px 14px",
                fontSize: 11,
                fontWeight: 600,
                color: "#1a73e8",
                letterSpacing: "0.5px",
                marginBottom: 12,
                textTransform: "uppercase" as const,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#EA4335", display: "inline-block" }} />
              Admin Only
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <h1
                  style={{
                    fontSize: "clamp(26px, 4vw, 38px)",
                    fontWeight: 700,
                    color: "#202124",
                    letterSpacing: "-0.5px",
                    marginBottom: 6,
                  }}
                >
                  Admin Dashboard
                </h1>
                <p style={{ fontSize: 15, color: "#5f6368" }}>
                  Manage all blog posts — create, edit, archive, and delete content.
                </p>
              </div>
              <button
                className="btn-primary"
                onClick={() => { setEditBlog(null); setShowForm(true); }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", fontSize: 15 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New Post
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 40px 60px" }}>
        {/* ── Stat Cards ── */}
        <div className="admin-grid">
          <StatCard label="Total Posts"  value={total}     icon="📝" color="#1a73e8" sub={`${published} published`} />
          <StatCard label="Published"    value={published}  icon="✅" color="#137333" sub="Live on site" />
          <StatCard label="Drafts"       value={drafts}     icon="✏️" color="#b06000" sub="Pending review" />
          <StatCard label="Archived"     value={archived}   icon="📦" color="#5f6368" sub="Hidden from public" />
        </div>

        {/* ── Table Card ── */}
        <div
          className="card-anim"
          style={{
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 2px 12px rgba(60,64,67,0.09)",
            border: "1px solid #f1f3f4",
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div style={{ padding: "20px 24px 0", borderBottom: "1px solid #f1f3f4" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#202124" }}>All Posts</h2>

              {/* Search */}
              <div style={{ position: "relative" }}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#80868b"
                  strokeWidth="2"
                  style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
                >
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  className="form-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search posts..."
                  style={{ paddingLeft: 36, width: 220, borderRadius: 20, fontSize: 13 }}
                />
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" as const }}>
              {(["All", "Published", "Draft", "Archived", "Deleted"] as const).map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn${activeTab === tab ? " active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  <span
                    style={{
                      marginLeft: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      background: activeTab === tab ? "#1a73e8" : "#e8eaed",
                      color: activeTab === tab ? "#fff" : "#5f6368",
                      borderRadius: 10,
                      padding: "1px 7px",
                    }}
                  >
                    {tab === "All"
                      ? blogs.length
                      : blogs.filter((b) => b.status === tab).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Column Headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr auto",
              padding: "10px 20px",
              background: "#f8f9fa",
              gap: 12,
              borderBottom: "1px solid #f1f3f4",
            }}
          >
            {["Title / Author", "Category", "Status", "Read Time", "Date", "Actions"].map((h) => (
              <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "#80868b", letterSpacing: "0.5px", textTransform: "uppercase" as const }}>
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="table-wrap">
            {filtered.length === 0 ? (
              <div style={{ padding: "48px 24px", textAlign: "center", color: "#80868b", fontSize: 15 }}>
                No posts found.
              </div>
            ) : (
              filtered.map((blog) => (
                <BlogRow
                  key={blog.id}
                  blog={blog}
                  onEdit={() => { setEditBlog(blog); setShowForm(true); }}
                  onArchive={() => setConfirmAction({ type: "archive", id: blog.id })}
                  onUnarchive={() => setConfirmAction({ type: "unarchive", id: blog.id })}
                  onDelete={() => setConfirmAction({ type: "delete", id: blog.id })}
                />
              ))
            )}
          </div>

          {/* Footer count */}
          <div
            style={{
              padding: "12px 24px",
              borderTop: "1px solid #f1f3f4",
              fontSize: 13,
              color: "#80868b",
              background: "#fafafa",
            }}
          >
            Showing {filtered.length} of {blogs.length} posts
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{ background: "#f8f9fa", borderTop: "1px solid #e8eaed" }}>
        <div className="footer-inner">
          <GDGLogo />
          <div style={{ fontSize: 13, color: "#80868b" }}>© 2026 GDG BGU Blog. All rights reserved.</div>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy", "Terms", "Contact"].map((item) => (
              <span key={item} style={{ fontSize: 13, color: "#1a73e8", cursor: "pointer", fontWeight: 500 }}>{item}</span>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Blog Form Modal ── */}
      {showForm && (
        <BlogFormModal
          blog={editBlog ?? undefined}
          onClose={() => { setShowForm(false); setEditBlog(null); }}
          onSave={editBlog ? handleEdit : handleCreate}
        />
      )}

      {/* ── Confirm Modals ── */}
      {confirmAction?.type === "archive" && confirmBlog && (
        <ConfirmModal
          title="Archive Post"
          message={`"${confirmBlog.title}" will be hidden from the public site. You can unarchive it later.`}
          confirmLabel="Archive"
          confirmColor="#5f6368"
          onConfirm={() => handleArchive(confirmBlog.id)}
          onClose={() => setConfirmAction(null)}
        />
      )}
      {confirmAction?.type === "unarchive" && confirmBlog && (
        <ConfirmModal
          title="Restore Post"
          message={`"${confirmBlog.title}" will be restored to Draft and become editable again.`}
          confirmLabel="Restore"
          confirmColor="#137333"
          onConfirm={() => handleUnarchive(confirmBlog.id)}
          onClose={() => setConfirmAction(null)}
        />
      )}
      {confirmAction?.type === "delete" && confirmBlog && (
        <ConfirmModal
          title="Delete Post"
          message={`"${confirmBlog.title}" will be permanently marked as deleted. This cannot be undone.`}
          confirmLabel="Delete"
          confirmColor="#c5221f"
          onConfirm={() => handleDelete(confirmBlog.id)}
          onClose={() => setConfirmAction(null)}
        />
      )}
    </div>
  );
}