"use client";
import Link from "next/link";
import products from "@/data/products.json";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ── Icons ─────────────────────────────────────────────────────────
function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );
}
function AlertIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}

// ── Badge styles ──────────────────────────────────────────────────
function ProductBadge({ badge }) {
  if (!badge) return <span style={{ color: "var(--foreground-faint)", fontSize: "12px" }}>—</span>;
  const lower = badge.toLowerCase();
  let bg = "var(--background-subtle)";
  let color = "var(--foreground-muted)";
  if (lower.includes("new")) { bg = "var(--brand-faint)"; color = "var(--brand)"; }
  else if (lower.includes("sale") || lower.includes("hot")) { bg = "rgba(251,191,36,0.18)"; color = "var(--accent-hover)"; }
  else if (lower.includes("sold") || lower.includes("out")) { bg = "rgba(239,68,68,0.12)"; color = "#ef4444"; }
  return (
    <span style={{
      fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em",
      padding: "3px 10px", borderRadius: "999px", background: bg, color,
    }}>
      {badge}
    </span>
  );
}

// ── Stock indicator ───────────────────────────────────────────────
function StockCell({ stock }) {
  const low = stock <= 10;
  const mid = stock <= 30;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
      <span style={{
        width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0,
        background: low ? "#ef4444" : mid ? "var(--accent)" : "var(--brand)",
      }} />
      <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--foreground)" }}>{stock}</span>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────
export default function ProductsPage() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${selectedProduct.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setSelectedProduct(null);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px", display: "flex", flexDirection: "column", gap: "28px" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brand)", marginBottom: "6px" }}>
              Inventory
            </p>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 800, color: "var(--foreground)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Products
            </h1>
            <p style={{ marginTop: "6px", fontSize: "14px", color: "var(--foreground-muted)" }}>
              {products.length} items in your store
            </p>
          </div>

          <Link href="/admin/products/add" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "var(--brand)", color: "#fff",
            padding: "10px 20px", borderRadius: "12px",
            fontWeight: 600, fontSize: "14px", textDecoration: "none",
            boxShadow: "var(--shadow-sm)",
            transition: "background 0.2s, transform 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--brand-hover)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--brand)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <PlusIcon /> Add Product
          </Link>
        </div>

        {/* ── Table ── */}
        <div style={{
          background: "var(--background-card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          boxShadow: "var(--shadow-sm)",
          overflow: "hidden",
        }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "720px" }}>
              <thead>
                <tr style={{ background: "var(--background-subtle)", borderBottom: "1px solid var(--border)" }}>
                  {["Product", "Category", "Price", "Rating", "Stock", "Badge", "Actions"].map((h) => (
                    <th key={h} style={{
                      padding: "12px 16px", textAlign: "left",
                      fontSize: "11px", fontWeight: 700, letterSpacing: "0.07em",
                      textTransform: "uppercase", color: "var(--foreground-faint)",
                      whiteSpace: "nowrap",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {products.map((product, i) => (
                  <tr key={product.id} style={{
                    borderBottom: i < products.length - 1 ? "1px solid var(--border)" : "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--background-subtle)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    {/* Product */}
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img
                          src={`/ProductsMedia/img/${product.image || "cartimg.avif"}`}
                          alt={product.name}
                          style={{ width: "48px", height: "48px", borderRadius: "10px", objectFit: "cover", border: "1px solid var(--border)", flexShrink: 0 }}
                        />
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontWeight: 600, fontSize: "14px", color: "var(--foreground)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "180px" }}>
                            {product.name}
                          </p>
                          <p style={{ fontSize: "11px", color: "var(--foreground-faint)", marginTop: "2px", fontFamily: "monospace" }}>
                            #{product.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{
                        fontSize: "12px", fontWeight: 500, color: "var(--foreground-muted)",
                        background: "var(--background-subtle)", borderRadius: "6px", padding: "3px 9px",
                        border: "1px solid var(--border)",
                      }}>
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontWeight: 700, fontSize: "15px", color: "var(--foreground)" }}>
                        ${product.price}
                      </span>
                    </td>

                    {/* Rating */}
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <span style={{ color: "var(--accent)", fontSize: "13px" }}>★</span>
                        <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--foreground)" }}>{product.rating}</span>
                      </div>
                    </td>

                    {/* Stock */}
                    <td style={{ padding: "14px 16px" }}>
                      <StockCell stock={product.stock} />
                    </td>

                    {/* Badge */}
                    <td style={{ padding: "14px 16px" }}>
                      <ProductBadge badge={product.badge} />
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Link href={`/admin/products/edit/${product.id}`} style={{
                          display: "inline-flex", alignItems: "center", gap: "6px",
                          padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
                          border: "1px solid var(--border)", color: "var(--foreground-muted)",
                          background: "var(--background-subtle)", textDecoration: "none",
                          transition: "border-color 0.15s, color 0.15s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.color = "var(--foreground)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--foreground-muted)"; }}
                        >
                          <EditIcon /> Edit
                        </Link>

                        <button onClick={() => setSelectedProduct(product)} style={{
                          display: "inline-flex", alignItems: "center", gap: "6px",
                          padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
                          border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444",
                          background: "rgba(239,68,68,0.07)", cursor: "pointer",
                          transition: "background 0.15s, border-color 0.15s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.14)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.07)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
                        >
                          <TrashIcon /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Delete Modal ── */}
      {selectedProduct && (
        <div
          onClick={(e) => e.target === e.currentTarget && setSelectedProduct(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px",
            animation: "fadeIn 0.15s ease",
          }}
        >
          <div style={{
            width: "100%", maxWidth: "400px",
            background: "var(--background-card)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "28px",
            boxShadow: "var(--shadow-xl)",
            animation: "slideUp 0.2s ease",
          }}>
            {/* Icon */}
            <div style={{
              width: "48px", height: "48px", borderRadius: "14px",
              background: "rgba(239,68,68,0.1)", color: "#ef4444",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "18px",
            }}>
              <AlertIcon />
            </div>

            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--foreground)", marginBottom: "8px" }}>
              Delete Product
            </h2>
            <p style={{ fontSize: "14px", color: "var(--foreground-muted)", lineHeight: 1.6 }}>
              Are you sure you want to delete{" "}
              <strong style={{ color: "var(--foreground)" }}>{selectedProduct.name}</strong>?
              This action cannot be undone.
            </p>

            {/* Divider */}
            <div style={{ height: "1px", background: "var(--border)", margin: "22px 0" }} />

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button onClick={() => setSelectedProduct(null)} style={{
                padding: "9px 18px", borderRadius: "10px", fontSize: "14px", fontWeight: 600,
                border: "1px solid var(--border)", color: "var(--foreground-muted)",
                background: "var(--background-subtle)", cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--background)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--background-subtle)"}
              >
                Cancel
              </button>

              <button onClick={handleDelete} disabled={deleting} style={{
                padding: "9px 20px", borderRadius: "10px", fontSize: "14px", fontWeight: 600,
                background: deleting ? "rgba(239,68,68,0.5)" : "#ef4444",
                color: "#fff", border: "none", cursor: deleting ? "not-allowed" : "pointer",
                transition: "background 0.15s, transform 0.15s",
                display: "flex", alignItems: "center", gap: "8px",
              }}
              onMouseEnter={e => { if (!deleting) e.currentTarget.style.background = "#dc2626"; }}
              onMouseLeave={e => { if (!deleting) e.currentTarget.style.background = "#ef4444"; }}
              >
                {deleting ? (
                  <>
                    <span style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                    Deleting…
                  </>
                ) : (
                  <><TrashIcon /> Delete</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes spin    { to { transform: rotate(360deg) } }
      `}</style>
    </>
  );
}