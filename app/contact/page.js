import store from "@/data/store.json";

export const metadata = {
  title: "Contact | Aurevia Market",
};

export default function ContactPage() {
  return (
    <section
      className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Info card (dark regardless of theme for contrast) */}
      <div className="rounded-2xl p-8 text-white" style={{ backgroundColor: "#0f172a" }}>
        <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          Contact
        </p>
        <h1 className="mt-3 text-4xl font-black">We are here to help.</h1>
        <p className="mt-4 leading-7 text-neutral-300">
          Questions about products, delivery, returns, or a bulk order? Send a
          note and the Aurevia team will get back quickly.
        </p>
        <div className="mt-8 grid gap-4 text-sm text-neutral-200">
          <span>✉ {store.supportEmail}</span>
          <span>📞 {store.phone}</span>
          <span>📍 {store.address}</span>
        </div>
      </div>

      {/* Form */}
      <form
        className="grid gap-5 rounded-2xl p-6"
        style={{
          backgroundColor: "var(--background-card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name"  placeholder="Your name" />
          <Field label="Email" type="email" placeholder="you@example.com" />
        </div>
        <Field label="Subject" placeholder="How can we help?" />
        <label className="grid gap-2">
          <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
            Message
          </span>
          <textarea
            rows="7"
            className="rounded-xl px-4 py-3 text-sm outline-none transition"
            style={{
              backgroundColor: "var(--background-subtle)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
            placeholder="Write your message"
          />
        </label>
        <button
          type="button"
          className="w-fit rounded-full px-6 py-3 text-sm font-black transition-all hover:scale-105 active:scale-95"
          style={{ backgroundColor: "var(--accent)", color: "var(--cta-text)" }}
        >
          Send message
        </button>
      </form>
    </section>
  );
}

function Field({ label, type = "text", placeholder }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
        {label}
      </span>
      <input
        type={type}
        className="rounded-xl px-4 py-3 text-sm outline-none transition"
        style={{
          backgroundColor: "var(--background-subtle)",
          border: "1px solid var(--border)",
          color: "var(--foreground)",
        }}
        placeholder={placeholder}
      />
    </label>
  );
}
