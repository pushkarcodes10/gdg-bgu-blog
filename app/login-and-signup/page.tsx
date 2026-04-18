"use client";

import { useState } from "react";
import Link from "next/link";

// ── Global Styles ──────────────────────────────────────────────────────────
const loginStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Google Sans', 'Segoe UI', sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes float0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes float3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }

  .login-card { animation: fadeUp 0.5s ease both; }

  .input-field {
    width: 100%;
    padding: 13px 16px 13px 44px;
    border: 1.5px solid #dadce0;
    border-radius: 12px;
    font-family: inherit;
    font-size: 14px;
    color: #202124;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    background: #fff;
  }
  .input-field:focus {
    border-color: #1a73e8;
    box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.12);
  }

  .btn-primary {
    width: 100%; padding: 13px; border: none; border-radius: 24px;
    background: #1a73e8; color: #fff;
    font-family: inherit; font-size: 15px; font-weight: 600;
    cursor: pointer; transition: background 0.2s, transform 0.15s;
    letter-spacing: 0.3px;
  }
  .btn-primary:hover { background: #1558b0; transform: translateY(-1px); }

  .btn-google {
    width: 100%; padding: 12px; border: 1.5px solid #dadce0;
    border-radius: 24px; background: #fff; color: #202124;
    font-family: inherit; font-size: 14px; font-weight: 500;
    cursor: pointer; display: flex; align-items: center;
    justify-content: center; gap: 10px;
    transition: background 0.2s, border-color 0.2s;
  }
  .btn-google:hover { background: #f8f9fa; border-color: #aab2bb; }

  .btn-outline-danger {
    width: 100%; padding: 13px; border: 2px solid #ea4335;
    border-radius: 24px; background: transparent; color: #ea4335;
    font-family: inherit; font-size: 15px; font-weight: 600;
    cursor: pointer; transition: background 0.2s, transform 0.15s;
  }
  .btn-outline-danger:hover { background: #fce8e6; transform: translateY(-1px); }

  .link-btn {
    background: none; border: none; cursor: pointer;
    color: #1a73e8; font-family: inherit; font-size: 13px; font-weight: 600; padding: 0;
  }
  .link-btn:hover { text-decoration: underline; }

  .error-box {
    background: #fce8e6; border: 1px solid #f5c6c6;
    border-radius: 10px; padding: 10px 14px;
    font-size: 13px; color: #c5221f;
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 16px;
  }

  .success-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: #e6f4ea; border: 1px solid #a8d5b5;
    border-radius: 20px; padding: 4px 12px;
    font-size: 11px; font-weight: 600; color: #137333;
    margin-bottom: 26px;
  }

  .divider { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
  .divider-line { flex: 1; height: 1px; background: #e8eaed; }

  .float-icon {
    position: absolute; width: 42px; height: 42px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 17px; font-weight: 700;
  }

  .avatar-circle {
    width: 72px; height: 72px; border-radius: 50%;
    background: linear-gradient(135deg, #1a73e8, #34A853);
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 26px; font-weight: 700; margin: 0 auto 16px;
  }

  @media (max-width: 480px) {
    .float-icon { display: none !important; }
    .login-page { padding: 16px !important; }
  }
`;

// ── Types ──────────────────────────────────────────────────────────────────
type View = "login" | "loggedIn" | "forgot" | "signup";

interface User {
  name: string;
  email: string;
}

// ── Eye Icon ───────────────────────────────────────────────────────────────
function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#80868b" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#80868b" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// ── Google SVG ─────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.7 2.5 30.2 0 24 0 14.7 0 6.8 5.5 2.9 13.5l7.9 6.1C12.7 13.2 17.9 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.5c-.5 2.8-2.2 5.2-4.6 6.8l7.2 5.6c4.2-3.9 6.6-9.6 6.6-16.4z" />
      <path fill="#FBBC05" d="M10.8 28.5c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C1 16.2 0 19.9 0 24s1 7.8 2.9 11l7.9-6.5z" />
      <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.2-5.6c-2 1.4-4.6 2.2-7.9 2.2-6.1 0-11.3-3.7-13.2-9.1l-7.9 6.5C6.8 42.5 14.7 48 24 48z" />
    </svg>
  );
}

// ── Floating Background Icons ─────────────────────────────────────────────
const floatingIcons = [
  { symbol: "G", color: "#4285F4", top: "8%",  left: "6%",  right: "auto", anim: "float0", dur: "2.8s", delay: "0s",   shadow: "#4285F466" },
  { symbol: "▲", color: "#EA4335", top: "14%", right: "8%", left: "auto",  anim: "float1", dur: "3.1s", delay: "0.4s", shadow: "#EA433566" },
  { symbol: "D", color: "#FBBC05", top: "auto", bottom: "18%", left: "5%", right: "auto", anim: "float2", dur: "3.4s", delay: "0.8s", shadow: "#FBBC0566" },
  { symbol: "☁", color: "#34A853", top: "auto", bottom: "10%", right: "6%", left: "auto",  anim: "float3", dur: "3.0s", delay: "0.2s", shadow: "#34A85366" },
];

// ── Badge ─────────────────────────────────────────────────────────────────
function TopBadge() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
      <div
        style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "rgba(26,115,232,0.08)", border: "1px solid rgba(26,115,232,0.2)",
          borderRadius: 20, padding: "4px 14px",
          fontSize: 11, fontWeight: 600, color: "#1a73e8",
          letterSpacing: "0.5px", textTransform: "uppercase",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34A853", display: "inline-block" }} />
        GDG BGU Blog
      </div>
    </div>
  );
}

// ── Login View ────────────────────────────────────────────────────────────
function LoginView({
  onLogin,
  onGoogleLogin,
  onForgot,
  onSignup,
}: {
  onLogin: (email: string, pw: string) => void;
  onGoogleLogin: () => void;
  onForgot: () => void;
  onSignup: () => void;
}) {
  const [email, setEmail]   = useState("");
  const [pw, setPw]         = useState("");
  const [pwVisible, setPwVisible] = useState(false);
  const [error, setError]   = useState("");

  const handleSubmit = () => {
    setError("");
    if (!email) return setError("Please enter your email address.");
    if (!email.includes("@")) return setError("Please enter a valid email address.");
    if (!pw) return setError("Please enter your password.");
    if (pw.length < 6) return setError("Password must be at least 6 characters.");
    onLogin(email, pw);
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 26 }}>
        <div
          style={{
            width: 64, height: 64, borderRadius: 16,
            background: "linear-gradient(135deg, #e8f0fe, #dcfce7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="#1a73e8" strokeWidth="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#202124", marginBottom: 6, letterSpacing: "-0.5px" }}>
          Welcome Back
        </h1>
        <p style={{ fontSize: 14, color: "#5f6368" }}>Sign in to your GDG BGU account</p>
      </div>

      {error && (
        <div className="error-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c5221f" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </div>
      )}

      <button className="btn-google" onClick={onGoogleLogin} style={{ marginBottom: 18 }}>
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="divider">
        <span className="divider-line" />
        <span style={{ fontSize: 12, color: "#80868b", whiteSpace: "nowrap" }}>or sign in with email</span>
        <span className="divider-line" />
      </div>

      {/* Email */}
      <div style={{ position: "relative", marginBottom: 14 }}>
        <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#80868b" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" />
        </svg>
        <input
          className="input-field"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>

      {/* Password */}
      <div style={{ position: "relative", marginBottom: 8 }}>
        <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#80868b" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <input
          className="input-field"
          type={pwVisible ? "text" : "password"}
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          style={{ paddingRight: 44 }}
        />
        <button
          onClick={() => setPwVisible((v) => !v)}
          style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 4 }}
        >
          <EyeIcon visible={pwVisible} />
        </button>
      </div>

      <div style={{ textAlign: "right", marginBottom: 20 }}>
        <button className="link-btn" onClick={onForgot}>Forgot password?</button>
      </div>

      <button className="btn-primary" onClick={handleSubmit}>Sign In</button>

      <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#5f6368" }}>
        Don't have an account?{" "}
        <button className="link-btn" onClick={onSignup}>Sign Up</button>
      </p>
    </>
  );
}

// ── Logged In View ────────────────────────────────────────────────────────
function LoggedInView({ user, onLogout }: { user: User; onLogout: () => void }) {
  const initials = user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div style={{ textAlign: "center" }}>
      <div className="avatar-circle">{initials}</div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#202124", marginBottom: 4 }}>{user.name}</h2>
      <p style={{ fontSize: 13, color: "#80868b", marginBottom: 10 }}>{user.email}</p>

      <div className="success-badge">
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34A853", display: "inline-block" }} />
        Signed in
      </div>

      <div style={{ background: "#f8f9fa", borderRadius: 14, padding: 16, marginBottom: 24, textAlign: "left" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#80868b", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 10 }}>
          Account
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #e8eaed" }}>
          <span style={{ fontSize: 13, color: "#5f6368" }}>Role</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#202124" }}>Member</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
          <span style={{ fontSize: 13, color: "#5f6368" }}>Community</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#1a73e8" }}>GDG BGU</span>
        </div>
      </div>

      <button className="btn-outline-danger" onClick={onLogout}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </span>
      </button>
      <p style={{ fontSize: 12, color: "#80868b", marginTop: 16 }}>You'll be redirected to the home page.</p>
    </div>
  );
}

// ── Forgot Password View ──────────────────────────────────────────────────
function ForgotView({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    alert(`Reset link sent to ${email}! Check your inbox.`);
    onBack();
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: "#fce8e6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#202124", marginBottom: 6 }}>Reset Password</h2>
        <p style={{ fontSize: 13, color: "#5f6368" }}>Enter your email and we'll send a reset link</p>
      </div>

      <div style={{ position: "relative", marginBottom: 18 }}>
        <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#80868b" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" />
        </svg>
        <input className="input-field" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <button className="btn-primary" onClick={handleReset}>Send Reset Link</button>
      <p style={{ textAlign: "center", marginTop: 16, fontSize: 13 }}>
        <button className="link-btn" onClick={onBack}>← Back to sign in</button>
      </p>
    </>
  );
}

// ── Sign Up View ──────────────────────────────────────────────────────────
function SignupView({ onLogin, onBack }: { onLogin: (user: User) => void; onBack: () => void }) {
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw]       = useState("");

  const handleSignup = () => {
    if (!name) { alert("Please enter your full name."); return; }
    if (!email || !email.includes("@")) { alert("Please enter a valid email."); return; }
    if (pw.length < 6) { alert("Password must be at least 6 characters."); return; }
    onLogin({ name, email });
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: "#e6f4ea", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#202124", marginBottom: 4 }}>Join GDG BGU</h2>
        <p style={{ fontSize: 13, color: "#5f6368" }}>Create your account</p>
      </div>

      <div style={{ position: "relative", marginBottom: 12 }}>
        <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#80868b" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
        <input className="input-field" type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div style={{ position: "relative", marginBottom: 12 }}>
        <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#80868b" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" />
        </svg>
        <input className="input-field" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div style={{ position: "relative", marginBottom: 20 }}>
        <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#80868b" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <input className="input-field" type="password" placeholder="Create password" value={pw} onChange={(e) => setPw(e.target.value)} />
      </div>

      <button className="btn-primary" onClick={handleSignup}>Create Account</button>
      <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#5f6368" }}>
        Already have an account?{" "}
        <button className="link-btn" onClick={onBack}>Sign in</button>
      </p>
    </>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const [view, setView]     = useState<View>("login");
  const [user, setUser]     = useState<User | null>(null);

  const handleLogin = (email: string, _pw: string) => {
    const name = email.split("@")[0];
    setUser({ name, email });
    setView("loggedIn");
  };

  const handleGoogleLogin = () => {
    setUser({ name: "GDG User", email: "gdg.user@bgmail.ac.in" });
    setView("loggedIn");
  };

  const handleLogout = () => {
    setUser(null);
    setView("login");
  };

  return (
    <div
      className="login-page"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8f0fe 0%, #fce8e6 40%, #fef9c3 70%, #dcfce7 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "72px 20px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{loginStyles}</style>

      {/* Floating Icons */}
      {floatingIcons.map((item, i) => (
        <div
          key={i}
          className="float-icon"
          style={{
            top: item.top,
            bottom: (item as any).bottom,
            left: item.left,
            right: item.right,
            background: item.color,
            boxShadow: `0 4px 16px ${item.shadow}`,
            animation: `${item.anim} ${item.dur} ${item.delay} ease-in-out infinite`,
          }}
        >
          {item.symbol}
        </div>
      ))}

      {/* Sticky Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          height: 60,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #e8eaed",
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          zIndex: 100,
          gap: 10,
        }}
      >
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/gdg-logo.png" alt="GDG" width={32} height={32} />
          <span style={{ fontWeight: 700, fontSize: 18, color: "#202124", letterSpacing: "-0.3px" }}>GDG</span>
          <span style={{ fontSize: 14, color: "#5f6368" }}>BGU Blog</span>
        </Link>
        <div style={{ flex: 1 }} />
        {user ? (
          <span style={{ fontSize: 13, color: "#137333", fontWeight: 500 }}>
            Signed in as {user.name}
          </span>
        ) : (
          <span style={{ fontSize: 13, color: "#5f6368" }}>Not signed in</span>
        )}
      </nav>

      {/* Card */}
      <div
        className="login-card"
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: "36px 40px",
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 8px 40px rgba(60,64,67,0.14)",
          border: "1px solid rgba(255,255,255,0.8)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <TopBadge />

        {view === "login" && (
          <LoginView
            onLogin={handleLogin}
            onGoogleLogin={handleGoogleLogin}
            onForgot={() => setView("forgot")}
            onSignup={() => setView("signup")}
          />
        )}

        {view === "loggedIn" && user && (
          <LoggedInView user={user} onLogout={handleLogout} />
        )}

        {view === "forgot" && (
          <ForgotView onBack={() => setView("login")} />
        )}

        {view === "signup" && (
          <SignupView
            onLogin={(u) => { setUser(u); setView("loggedIn"); }}
            onBack={() => setView("login")}
          />
        )}
      </div>

      {/* Footer */}
      <div style={{ marginTop: 28, display: "flex", gap: 20, fontSize: 12, color: "#80868b", flexWrap: "wrap", justifyContent: "center" }}>
        {["Privacy Policy", "Terms of Service", "Contact Support"].map((item) => (
          <span key={item} style={{ cursor: "pointer", color: "#1a73e8", fontWeight: 500 }}>{item}</span>
        ))}
      </div>
      <p style={{ marginTop: 10, fontSize: 11, color: "#aab2bb" }}>© 2026 GDG BGU Blog. All rights reserved.</p>
    </div>
  );
}