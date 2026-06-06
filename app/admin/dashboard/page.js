"use client"
import products from "@/data/products.json";

// ── Icon components ───────────────────────────────────────────────
function BoxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  );
}
function TagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}
function TrendUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────
function StatCard({ icon, label, value, accent }) {
  return (
    <div style={{
      background: "var(--background-card)",
      border: "1px solid var(--border)",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "var(--shadow-sm)",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      transition: "box-shadow 0.2s, transform 0.2s",
      cursor: "default",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.boxShadow = "var(--shadow-md)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow = "var(--shadow-sm)";
      e.currentTarget.style.transform = "translateY(0)";
    }}
    >
      {/* Icon badge */}
      <div style={{
        width: "42px", height: "42px", borderRadius: "12px",
        background: accent ? "var(--brand-faint)" : "var(--background-subtle)",
        color: accent ? "var(--brand)" : "var(--foreground-muted)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>

      <div>
        <p style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--foreground-faint)", marginBottom: "6px" }}>
          {label}
        </p>
        <p style={{ fontSize: "32px", fontWeight: 700, color: "var(--foreground)", lineHeight: 1 }}>
          {value}
        </p>
      </div>

      {/* Subtle bottom accent line */}
      {accent && (
        <div style={{ height: "3px", background: "var(--brand)", borderRadius: "999px", width: "36px", marginTop: "-4px" }} />
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function DashboardPage() {
  const totalProducts = products.length;
  const totalCategories = new Set(products.map((p) => p.category)).size;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const averageRating =
    products.length > 0
      ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)
      : 0;
  const recentProducts = [...products].reverse().slice(0, 5);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px", display: "flex", flexDirection: "column", gap: "32px" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brand)", marginBottom: "6px" }}>
            Overview
          </p>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "var(--foreground)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Dashboard
          </h1>
          <p style={{ marginTop: "8px", fontSize: "15px", color: "var(--foreground-muted)" }}>
            Manage your e-commerce products and search system.
          </p>
        </div>

        {/* Live badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          background: "var(--background-subtle)", border: "1px solid var(--border)",
          borderRadius: "999px", padding: "8px 16px", fontSize: "13px", color: "var(--foreground-muted)",
        }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)", display: "inline-block", animation: "pulse 2s infinite" }} />
          Live data
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
      }}>
        <StatCard icon={<BoxIcon />}    label="Total Products"  value={totalProducts}  accent />
        <StatCard icon={<TagIcon />}    label="Categories"      value={totalCategories} />
        <StatCard icon={<LayersIcon />} label="Total Stock"     value={totalStock.toLocaleString()} />
        <StatCard icon={<StarIcon />}   label="Avg. Rating"     value={`${averageRating} ★`} />
      </div>

      {/* ── Bottom Row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr min(340px, 100%)", gap: "20px", alignItems: "start" }}
        className="dashboard-bottom-row"
      >

        {/* Recent Products */}
        <div style={{
          background: "var(--background-card)", border: "1px solid var(--border)",
          borderRadius: "16px", padding: "24px", boxShadow: "var(--shadow-sm)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.01em" }}>
              Recent Products
            </h2>
            <span style={{
              fontSize: "12px", fontWeight: 500, color: "var(--brand)",
              background: "var(--brand-faint)", borderRadius: "999px", padding: "3px 10px",
            }}>
              Last {recentProducts.length}
            </span>
          </div>

          {/* Table head */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr auto auto",
            gap: "12px", padding: "0 0 10px 0",
            borderBottom: "1px solid var(--border)",
            fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em",
            textTransform: "uppercase", color: "var(--foreground-faint)",
          }}>
            <span>Product</span>
            <span style={{ textAlign: "right" }}>Price</span>
            <span style={{ textAlign: "right" }}>Stock</span>
          </div>

          <div>
            {recentProducts.map((product, i) => (
              <div key={product.id} style={{
                display: "grid", gridTemplateColumns: "1fr auto auto",
                gap: "12px", padding: "14px 0",
                borderBottom: i < recentProducts.length - 1 ? "1px solid var(--border)" : "none",
                alignItems: "center",
                transition: "background 0.15s",
              }}>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: "14px", color: "var(--foreground)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {product.name}
                  </p>
                  <span style={{
                    display: "inline-block", marginTop: "3px",
                    fontSize: "11px", fontWeight: 500, color: "var(--foreground-muted)",
                    background: "var(--background-subtle)", borderRadius: "6px", padding: "1px 7px",
                  }}>
                    {product.category}
                  </span>
                </div>

                <p style={{ fontWeight: 700, fontSize: "15px", color: "var(--foreground)", textAlign: "right", whiteSpace: "nowrap" }}>
                  ${product.price}
                </p>

                <div style={{ textAlign: "right" }}>
                  <span style={{
                    fontSize: "12px", fontWeight: 600, padding: "2px 9px", borderRadius: "999px",
                    background: product.stock > 20 ? "var(--brand-faint)" : "rgba(251,191,36,0.15)",
                    color: product.stock > 20 ? "var(--brand)" : "var(--accent-hover)",
                  }}>
                    {product.stock}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vector Search Status */}
        <div style={{
          background: "var(--background-card)", border: "1px solid var(--border)",
          borderRadius: "16px", padding: "24px", boxShadow: "var(--shadow-sm)",
          display: "flex", flexDirection: "column", gap: "20px",
        }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "14px",
            background: "var(--brand-faint)", color: "var(--brand)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <SearchIcon />
          </div>

          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.01em", marginBottom: "8px" }}>
              Vector Search
            </h2>
            <p style={{ fontSize: "14px", color: "var(--foreground-muted)", lineHeight: 1.6 }}>
              Embeddings are enabled for semantic product search across all {totalProducts} items.
            </p>
          </div>

          {/* Status pill */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            background: "var(--brand-faint)", borderRadius: "12px", padding: "12px 16px",
          }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--brand)", flexShrink: 0, animation: "pulse 2s infinite" }} />
            <div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--brand)" }}>Semantic Search Ready</p>
              <p style={{ fontSize: "11px", color: "var(--brand)", opacity: 0.75, marginTop: "1px" }}>All embeddings indexed</p>
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "12px", paddingTop: "4px",
          }}>
            {[
              { label: "Indexed", value: totalProducts },
              { label: "Books", value: "7 Major" },
            ].map(({ label, value }) => (
              <div key={label} style={{
                background: "var(--background-subtle)", borderRadius: "10px", padding: "12px",
                textAlign: "center",
              }}>
                <p style={{ fontSize: "18px", fontWeight: 700, color: "var(--foreground)" }}>{value}</p>
                <p style={{ fontSize: "11px", color: "var(--foreground-faint)", marginTop: "2px" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
        @media (max-width: 768px) {
          .dashboard-bottom-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}