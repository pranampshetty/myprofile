"use client";

import { contactItems } from "@/data/site";
import ContactForm from "@/components/ContactForm";
import { ContactCard, FadeInView, PageSection } from "@/components/ui";

export default function Contact() {
  return (
    <PageSection
      id="contact"
      label="Contact"
      sectionClassName="section-padding-top-compact"
      title={
        <>
          Let&apos;s build <span className="accent-italic">together.</span>
        </>
      }
      description="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
    >
      <div className="grid min-w-0 gap-5 sm:gap-6 md:gap-8 lg:grid-cols-2 lg:gap-10 4k:gap-12">
        <FadeInView direction="left" className="flex min-w-0 flex-col gap-3 sm:gap-4 md:gap-5">
          {contactItems.map((item, i) => (
            <ContactCard key={item.label} {...item} delay={i * 0.15} />
          ))}
        </FadeInView>

        <FadeInView direction="right" className="h-full min-w-0">
          <ContactForm />
        </FadeInView>
      </div>
    </PageSection>
  );
}
