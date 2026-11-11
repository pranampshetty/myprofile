"use client";

import { AlertBanner, Button, FormField, GlassCard, Icon } from "@/components/ui";
import { useContactForm } from "@/hooks/useContactForm";

export default function ContactForm() {
  const { form, errors, status, statusMessage, updateField, validateField, handleSubmit } =
    useContactForm();

  return (
    <GlassCard className="h-full" cardClassName="flex h-full flex-col p-5 sm:p-6 lg:p-8 4k:p-10">
      <h3 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl 4k:text-2xl">Send a Message</h3>

      {status === "success" ? <AlertBanner variant="success" message={statusMessage} /> : null}
      {status === "error" ? <AlertBanner variant="error" message={statusMessage} /> : null}

      <form className="flex flex-1 flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <FormField
          id="name"
          name="name"
          label="Your Name"
          placeholder="John Doe"
          value={form.name}
          error={errors.name}
          onChange={(value) => updateField("name", value)}
          onBlur={() => validateField("name")}
          required
        />
        <FormField
          id="email"
          name="email"
          label="Your Email"
          type="email"
          placeholder="john@example.com"
          value={form.email}
          error={errors.email}
          onChange={(value) => updateField("email", value)}
          onBlur={() => validateField("email")}
          required
        />
        <FormField
          id="message"
          name="message"
          label="Message"
          type="textarea"
          placeholder="Tell me about your project..."
          value={form.message}
          error={errors.message}
          onChange={(value) => updateField("message", value)}
          onBlur={() => validateField("message")}
          required
        />
        <Button
          type="submit"
          fullWidth
          disabled={status === "loading"}
          icon={<Icon name="send" size={16} />}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </GlassCard>
  );
}
