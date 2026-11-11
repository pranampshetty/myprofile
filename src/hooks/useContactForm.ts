"use client";

import { useState } from "react";
import {
  validateContactForm,
  validateEmail,
  validateMessage,
  validateName,
  type ContactFormData,
  type ContactFormErrors,
} from "@/lib/validation";
import { getSuccessMessage, submitContactForm } from "@/lib/contact/submitContactForm";

const initialForm: ContactFormData = { name: "", email: "", message: "" };
const validators = { name: validateName, email: validateEmail, message: validateMessage } as const;

export type FormStatus = "idle" | "loading" | "success" | "error";

export function useContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const updateField = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  const validateField = (field: keyof ContactFormData) => {
    const error = validators[field](form[field]);
    setErrors((prev) => {
      const next = { ...prev };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
    return !error;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateContactForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const result = await submitContactForm(form);

      setForm(initialForm);
      setErrors({});
      setStatus("success");
      setStatusMessage(getSuccessMessage(result.method));
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again or email me directly.",
      );
    }
  };

  return {
    form,
    errors,
    status,
    statusMessage,
    updateField,
    validateField,
    handleSubmit,
  };
}
