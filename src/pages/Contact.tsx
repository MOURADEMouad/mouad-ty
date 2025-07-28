import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Fake submit: just show success
    setSubmitted(true);
  }

  if (submitted) return <p>Merci pour votre message, nous vous contacterons bientôt.</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Contactez-nous</h1>

      <div>
        <label htmlFor="name" className="block font-semibold mb-1">Nom</label>
        <input
          id="name"
          name="name"
          required
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-semibold mb-1">Email</label>
        <input
          id="email"
          name="email"
          required
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-semibold mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Envoyer
      </button>
    </form>
  );
}
