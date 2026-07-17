import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import PageHero from "../components/PageHero";
import { FadeIn, SectionEyebrow } from "../components/Reveal";
import { API, formatApiError } from "../lib/auth";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent — the Center will be in touch.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Failed to send message.");
    } finally { setSubmitting(false); }
  };

  return (
    <main data-testid="contact-page">
      <PageHero
        tone="dark"
        eyebrow="§ Contact"
        title={["Get in touch with", "the ", <em key="e" className="not-italic text-aggie-gold">NERVE Center.</em>]}
        lead="Collaboration inquiries, media requests, prospective students — write to us."
      />

      <section className="bg-editorial-cream section-pad">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <SectionEyebrow n="§ 01">Address</SectionEyebrow>
            <address className="not-italic font-serif text-3xl leading-snug text-aggie-navy">
              Fort IRC Building, Room 119<br />
              North Carolina A&amp;T State University<br />
              Greensboro, NC 27411
            </address>
            <div className="mt-8 space-y-2 font-mono text-xs uppercase tracking-widest text-aggie-navy/80">
              <div>Phone · 336-256-1152 ext. 2010</div>
              <div>Phone · 336-285-3226</div>
              <div>Email · <a href="mailto:yyun@ncat.edu" className="link-underline">yyun@ncat.edu</a></div>
            </div>
            <div className="mt-10 aspect-[16/10] overflow-hidden border border-black/15">
              <iframe
                title="NC A&T campus map"
                width="100%" height="100%" style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Fort%20Interdisciplinary%20Research%20Center%20NC%20A%26T%20Greensboro%20NC&output=embed"
              />
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <SectionEyebrow n="§ 02">Send a message</SectionEyebrow>
            <form data-testid="contact-form" onSubmit={submit} className="space-y-6">
              <Field testid="contact-name" label="Full name" value={form.name} onChange={set("name")} required />
              <Field testid="contact-email" label="Email" type="email" value={form.email} onChange={set("email")} required />
              <Field testid="contact-subject" label="Subject" value={form.subject} onChange={set("subject")} />
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-aggie-navy/70 mb-2">Message</label>
                <textarea data-testid="contact-message" value={form.message} onChange={set("message")} required rows={6}
                  className="w-full bg-transparent border-b border-aggie-navy/40 focus:border-aggie-navy focus:outline-none py-2 text-base text-aggie-navy" />
              </div>
              <button type="submit" disabled={submitting} data-testid="contact-submit"
                className="inline-flex items-center gap-2 bg-aggie-navy text-editorial-cream px-6 py-4 font-mono text-xs uppercase tracking-widest hover:bg-aggie-blue transition-colors disabled:opacity-50">
                {submitting ? "Sending..." : "Send message →"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

const Field = ({ label, value, onChange, type = "text", required, testid }) => (
  <div>
    <label className="block font-mono text-[10px] uppercase tracking-widest text-aggie-navy/70 mb-2">{label}</label>
    <input data-testid={testid} type={type} value={value} onChange={onChange} required={required}
      className="w-full bg-transparent border-b border-aggie-navy/40 focus:border-aggie-navy focus:outline-none py-2 text-base text-aggie-navy" />
  </div>
);
