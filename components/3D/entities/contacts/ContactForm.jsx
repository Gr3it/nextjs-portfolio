import { Html } from "@react-three/drei";

export function ContactForm({ onCancel, onSuccess }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const statusEl = form.querySelector("[data-status]");

    statusEl?.setAttribute("data-submitting", "true");

    const formData = new FormData(form);
    try {
      const response = await fetch("https://formspree.io/f/xykdqplg", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        onSuccess?.();
      } else {
        const data = await response.json();
        statusEl?.setAttribute("data-error", data.error || "Submission failed");
      }
    } catch {
      statusEl?.setAttribute(
        "data-error",
        "Oops! There was a problem submitting your form",
      );
    } finally {
      statusEl?.removeAttribute("data-submitting");
    }
  };

  return (
    <Html position={[2.5, 5, 0]} zIndexRange={[100, 0]}>
      <ContactFormUI onCancel={onCancel} onSubmit={handleSubmit} />
    </Html>
  );
}

function ContactFormUI({ onCancel, onSubmit }) {
  return (
    <div
      className="w-[350px] max-w-[50vw] p-6 rounded-2xl bg-[var(--background)] border border-[var(--borderColor)] shadow-2xl font-sans cursor-auto"
      style={{ pointerEvents: "auto", color: "var(--foreground)" }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold mb-4 text-[var(--accent-color)]">
        Get in Touch
      </h2>
      <Form onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  );
}

function Form({ onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-[var(--grey)]">Email</span>
        <input
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          className="bg-[var(--hoverBg)] border border-[var(--borderColor)] px-3 py-2 rounded-lg outline-none focus:border-[var(--accent-color)] transition-colors placeholder:text-[var(--grey)] text-[var(--foreground)]"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-[var(--grey)]">Message</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="How can I help you?"
          className="bg-[var(--hoverBg)] border border-[var(--borderColor)] px-3 py-2 rounded-lg outline-none focus:border-[var(--accent-color)] transition-colors resize-none placeholder:text-[var(--grey)] text-[var(--foreground)]"
        />
      </label>

      <span data-status className="text-red-400 text-sm hidden" />

      <div className="flex gap-3 justify-end mt-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onCancel?.();
          }}
          className="px-4 py-2 rounded-lg border border-[var(--borderColor)] hover:cursor-pointer hover:bg-[var(--hoverBg)] transition-colors text-sm font-medium text-[var(--foreground)]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-[var(--accent-color)] hover:cursor-pointer hover:brightness-110 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          Launch Message
        </button>
      </div>
    </form>
  );
}
