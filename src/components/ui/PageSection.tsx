"use client";

import type { ReactNode } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

type PageSectionProps = {
  id: string;
  label: string;
  title: ReactNode;
  description?: string;
  labelColor?: string;
  children: ReactNode;
  sectionClassName?: string;
};

export default function PageSection({
  id,
  label,
  title,
  description,
  labelColor,
  children,
  sectionClassName = "",
}: PageSectionProps) {
  return (
    <SectionWrapper id={id} className={`section-padding ${sectionClassName}`.trim()}>
      <Container size="xl">
        <SectionHeading
          label={label}
          title={title}
          description={description}
          labelColor={labelColor}
        />
        {children}
      </Container>
    </SectionWrapper>
  );
}
