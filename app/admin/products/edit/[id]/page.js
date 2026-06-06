"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import products from "@/data/products.json";

// ── Shared style helpers ──────────────────────────────────────────
const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: "10px",
  background: "var(--background)", border: "1px solid var(--border)",
  color: "var(--foreground)", fontSize: "14px", outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};
const labelStyle = {
  display: "block", fontSize: "13px", fontWeight: 600,
  color: "var(--foreground-muted)", marginBottom: "7px", letterSpacing: "0.01em",
};
function Field({ label, hint, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {hint && <p style={{ fontSize: "11px", color: "var(--foreground-faint)", marginTop: "5px" }}>{hint}</p>}
    </div>
  );
}
function FocusInput({ style: extraStyle, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <input {...props}
      style={{
        ...inputStyle, ...extraStyle,
        borderColor: focused ? "var(--brand)" : "var(--border)",
        boxShadow: focused ? "0 0 0 3px var(--brand-ring)" : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}
function FocusTextarea(props) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea {...props}
      style={{
        ...inputStyle, resize: "vertical", minHeight: "120px", fontFamily: "inherit",
        borderColor: focused ? "var(--brand)" : "var(--border)",
        boxShadow: focused ? "0 0 0 3px var(--brand-ring)" : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}
function FocusSelect({ children, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <select {...props}
      style={{
        ...inputStyle,
        borderColor: focused ? "var(--brand)" : "var(--border)",
        boxShadow: focused ? "0 0 0 3px var(--brand-ring)" : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </select>
  );
}
function SectionHeader({ label }) {
  return (
    <div style={{ padding: "14px 24px 0" }}>
      <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--foreground-faint)" }}>
        {label}
      </p>
    </div>
  );
}
function Divider() {
  return <div style={{ height: "1px", background: "var(--border)", margin: "4px 0" }} />;
}
function Spinner({ light }) {
  return (
    <span style={{
      width: "13px", height: "13px", borderRadius: "50%", display: "inline-block", flexShrink: 0,
      border: `2px solid ${light ? "rgba(255,255,255,0.35)" : "var(--brand-ring)"}`,
      borderTopColor: light ? "#fff" : "var(--brand)",
      animation: "spin 0.7s linear infinite",
    }} />
  );
}
function SparkleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  );
}
function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
    </svg>
  );
}
function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  );
}

// ── Main ─────────────────────────────────────────────────────────
export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [embedding, setEmbedding] = useState([]);
  const [embeddingLoading, setEmbeddingLoading] = useState(false);
  const [embeddingError, setEmbeddingError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const categories = [...new Set(products.map((p) => p.category))].sort();

  useEffect(() => {
    const product = products.find((item) => item.id === id);
    if (product) {
      setFormData(product);
      setEmbedding(product.embedding || []);
    }
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function generateEmbedding() {
    try {
      setEmbeddingLoading(true);
      setEmbeddingError("");
      const text = `${formData.name} ${formData.category} ${formData.description}`.trim();
      const res = await fetch("/api/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Embedding failed");
      setEmbedding(data.embedding || []);
    } catch (err) {
      setEmbeddingError(err.message);
    } finally {
      setEmbeddingLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      let imageName = formData.image;
      if (imageFile) {
        const uploadForm = new FormData();
        uploadForm.append("file", imageFile);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadForm });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.message);
        imageName = uploadData.fileName;
      }
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, image: imageName, embedding }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("Product updated successfully");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  // ── Loading state ─────────────────────────────────────────────
  if (!formData) {
    return (
      <div style={{ padding: "48px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <Spinner />
        <p style={{ color: "var(--foreground-muted)", fontSize: "14px" }}>Loading product…</p>
      </div>
    );
  }

  const currentImage = previewUrl || `/ProductsMedia/img/${formData.image}`;

  return (
    <div style={{ maxWidth: "760px", padding: "32px 24px", display: "flex", flexDirection: "column", gap: "28px" }}>

      {/* Header */}
      <div>
        <button onClick={() => router.push("/admin/products")} style={{
          display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "16px",
          fontSize: "13px", fontWeight: 500, color: "var(--foreground-muted)",
          background: "none", border: "none", cursor: "pointer", padding: 0,
        }}>
          <ArrowLeftIcon /> Back to Products
        </button>

        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brand)", marginBottom: "6px" }}>
          Inventory
        </p>
        <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
          Edit Product
        </h1>
        <p style={{ marginTop: "6px", fontSize: "14px", color: "var(--foreground-muted)" }}>
          Updating <strong style={{ color: "var(--foreground)" }}>{formData.name}</strong>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div style={{
          background: "var(--background-card)", border: "1px solid var(--border)",
          borderRadius: "16px", boxShadow: "var(--shadow-sm)", overflow: "hidden",
        }}>

          {/* Basic Info */}
          <SectionHeader label="Basic Info" />
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <Field label="Product ID" hint="Cannot be changed">
              <input type="text" value={formData.id} disabled style={{
                ...inputStyle,
                background: "var(--background-subtle)", color: "var(--foreground-faint)",
                cursor: "not-allowed", fontFamily: "monospace",
              }} />
            </Field>
            <Field label="Product Name">
              <FocusInput type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Field>
            <Field label="Category">
              <FocusSelect name="category" value={formData.category} onChange={handleChange}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </FocusSelect>
            </Field>
          </div>

          <Divider />

          {/* Pricing & Stock */}
          <SectionHeader label="Pricing & Stock" />
          <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px" }} className="form-grid-4">
            <Field label="Price ($)">
              <FocusInput type="number" name="price" value={formData.price} onChange={handleChange} required />
            </Field>
            <Field label="Rating">
              <FocusInput type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} required />
            </Field>
            <Field label="Stock">
              <FocusInput type="number" name="stock" value={formData.stock} onChange={handleChange} required />
            </Field>
            <Field label="Badge">
              <FocusInput type="text" name="badge" value={formData.badge || ""} onChange={handleChange} />
            </Field>
          </div>

          <Divider />

          {/* Image */}
          <SectionHeader label="Product Image" />
          <div style={{ padding: "24px", display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
            {/* Current image */}
            <div style={{ flexShrink: 0 }}>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--foreground-faint)", marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {previewUrl ? "New" : "Current"}
              </p>
              <Image
                src={currentImage}
                alt={formData.name}
                width={120} height={120}
                style={{ borderRadius: "12px", objectFit: "cover", border: "1px solid var(--border)" }}
              />
            </div>

            {/* Upload zone */}
            <div style={{ flex: 1, minWidth: "200px" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--foreground-faint)", marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Replace Image
              </p>
              <label style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: "8px", padding: "20px", borderRadius: "12px", cursor: "pointer",
                border: "2px dashed var(--border)", background: "var(--background-subtle)",
                transition: "border-color 0.2s",
              }}>
                <div style={{ color: "var(--foreground-faint)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <UploadIcon />
                  <span style={{ fontSize: "12px" }}>Click to upload</span>
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
              </label>
              {previewUrl && (
                <button type="button" onClick={() => { setPreviewUrl(""); setImageFile(null); }}
                  style={{ marginTop: "8px", fontSize: "12px", color: "var(--foreground-faint)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Revert to original
                </button>
              )}
            </div>
          </div>

          <Divider />

          {/* Description */}
          <SectionHeader label="Description" />
          <div style={{ padding: "24px" }}>
            <FocusTextarea name="description" value={formData.description || ""} onChange={handleChange} />
          </div>

          <Divider />

          {/* Embedding */}
          <SectionHeader label="Vector Embedding" />
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <p style={{ fontSize: "13px", color: "var(--foreground-muted)" }}>
              Regenerate the semantic embedding after making changes to name, category, or description.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <button type="button" onClick={generateEmbedding} disabled={embeddingLoading} style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "9px 18px", borderRadius: "10px", fontSize: "13px", fontWeight: 600,
                background: embeddingLoading ? "var(--background-subtle)" : "var(--brand-faint)",
                color: "var(--brand)", border: "1px solid var(--brand-ring)",
                cursor: embeddingLoading ? "not-allowed" : "pointer", transition: "background 0.2s",
              }}>
                {embeddingLoading ? <><Spinner /> Generating…</> : <><SparkleIcon /> Regenerate Embedding</>}
              </button>

              {embedding.length > 0 && (
                <span style={{
                  fontSize: "12px", fontWeight: 600, color: "var(--brand)",
                  background: "var(--brand-faint)", borderRadius: "999px", padding: "3px 12px",
                }}>
                  ✓ {embedding.length} dimensions
                </span>
              )}
            </div>

            {embeddingError && (
              <p style={{ fontSize: "13px", color: "#ef4444" }}>⚠ {embeddingError}</p>
            )}

            {embedding.length > 0 && (
              <div style={{ background: "var(--background-subtle)", border: "1px solid var(--border)", borderRadius: "10px", padding: "14px" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--foreground-faint)", marginBottom: "8px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Preview (first 20 dims)
                </p>
                <pre style={{ fontSize: "11px", color: "var(--foreground-muted)", overflowX: "auto", margin: 0, fontFamily: "monospace" }}>
                  {JSON.stringify(embedding.slice(0, 20), null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "12px", marginTop: "20px", justifyContent: "flex-end" }}>
          <button type="button" onClick={() => router.push("/admin/products")} style={{
            padding: "11px 22px", borderRadius: "10px", fontSize: "14px", fontWeight: 600,
            background: "var(--background-subtle)", border: "1px solid var(--border)",
            color: "var(--foreground-muted)", cursor: "pointer",
          }}>
            Cancel
          </button>
          <button type="submit" disabled={submitting} style={{
            padding: "11px 28px", borderRadius: "10px", fontSize: "14px", fontWeight: 700,
            background: submitting ? "var(--brand-hover)" : "var(--brand)",
            color: "#fff", border: "none", cursor: submitting ? "not-allowed" : "pointer",
            boxShadow: "var(--shadow-sm)", display: "inline-flex", alignItems: "center", gap: "8px",
            transition: "background 0.2s",
          }}>
            {submitting ? <><Spinner light /> Saving…</> : "Save Changes"}
          </button>
        </div>
      </form>

      <style>{`
        @media (max-width: 600px) {
          .form-grid-4 { grid-template-columns: 1fr 1fr !important; }
        }
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>
    </div>
  );
}