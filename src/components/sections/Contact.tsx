"use client";

import { Mail, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { type FormEvent, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { personalInfo } from "@/data/portfolio";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(initialForm);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(formData.subject || "Portfolio enquiry");

    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
    );

    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-shell">
      <SectionHeading
        eyebrow="Contact"
        title="Get In"
        highlightedWord="Touch"
        description="I am open to development opportunities, technical collaborations, freelance projects, and conversations about software and technology."
      />

      <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <div className="glass-card rounded-[1.75rem] p-7 sm:p-9">
            <h3 className="text-2xl font-bold">Let&apos;s Start a Conversation</h3>

            <p className="mt-5 leading-8 text-[var(--muted)]">
              Whether you are recruiting a developer, building a new application, or exploring a
              technical collaboration, you can contact me through email, LinkedIn, or GitHub.
            </p>
          </div>

          <a href={`mailto:${personalInfo.email}`} className="contact-card">
            <Mail className="text-violet-400" />
            <div>
              <p className="text-sm text-[var(--muted)]">Email</p>
              <p className="font-semibold">{personalInfo.email}</p>
            </div>
          </a>

          <div className="contact-card">
            <MapPin className="text-pink-400" />
            <div>
              <p className="text-sm text-[var(--muted)]">Location</p>
              <p className="font-semibold">{personalInfo.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="contact-card justify-center"
            >
              <FaGithub className="text-violet-400" />
              <span className="font-semibold">GitHub</span>
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="contact-card justify-center"
            >
              <FaLinkedin className="text-pink-400" />
              <span className="font-semibold">LinkedIn</span>
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-[1.75rem] p-7 sm:p-9">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Name</span>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    name: event.target.value,
                  })
                }
                className="input-field"
                placeholder="Your name"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Email</span>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    email: event.target.value,
                  })
                }
                className="input-field"
                placeholder="your.email@example.com"
              />
            </label>
          </div>

          <label className="mt-6 block">
            <span className="mb-2 block text-sm font-semibold">Subject</span>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  subject: event.target.value,
                })
              }
              className="input-field"
              placeholder="What is this about?"
            />
          </label>

          <label className="mt-6 block">
            <span className="mb-2 block text-sm font-semibold">Message</span>
            <textarea
              required
              rows={7}
              value={formData.message}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  message: event.target.value,
                })
              }
              className="input-field resize-none"
              placeholder="Tell me about the opportunity or project."
            />
          </label>

          <button type="submit" className="button-primary mt-6 w-full justify-center">
            Send Message
            <Send size={18} />
          </button>

          <p className="mt-4 text-center text-xs leading-5 text-[var(--muted)]">
            This starter version opens your computer&apos;s default email application. A
            database-backed contact API can be added later.
          </p>
        </form>
      </div>
    </section>
  );
}
