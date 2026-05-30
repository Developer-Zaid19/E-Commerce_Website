import store from "@/data/store.json";

export const metadata = {
  title: "Contact | Aurevia Market",
};

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div className="rounded-lg bg-neutral-950 p-8 text-white">
        <p className="text-sm font-bold uppercase tracking-wide text-amber-300">
          Contact
        </p>
        <h1 className="mt-3 text-4xl font-black">We are here to help.</h1>
        <p className="mt-4 leading-7 text-neutral-300">
          Questions about products, delivery, returns, or a bulk order? Send a
          note and the Aurevia team will get back quickly.
        </p>
        <div className="mt-8 grid gap-4 text-sm text-neutral-200">
          <span>{store.supportEmail}</span>
          <span>{store.phone}</span>
          <span>{store.address}</span>
        </div>
      </div>

      <form className="grid gap-5 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" placeholder="Your name" />
          <Field label="Email" type="email" placeholder="you@example.com" />
        </div>
        <Field label="Subject" placeholder="How can we help?" />
        <label className="grid gap-2">
          <span className="text-sm font-bold text-neutral-800">Message</span>
          <textarea
            rows="7"
            className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            placeholder="Write your message"
          />
        </label>
        <button
          type="button"
          className="w-fit rounded-full bg-amber-400 px-6 py-3 text-sm font-black text-neutral-950 hover:bg-amber-300"
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
      <span className="text-sm font-bold text-neutral-800">{label}</span>
      <input
        type={type}
        className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
        placeholder={placeholder}
      />
    </label>
  );
}
