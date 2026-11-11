import { profile } from "@/data/profile";
import type { ContactFormData } from "@/lib/validation";

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

type FormSubmitResponse = {
  success?: string;
  message?: string;
};

export type SubmitMethod = "web3forms" | "formsubmit" | "mailto";

export type SubmitResult = {
  method: SubmitMethod;
};

function trimFormData(data: ContactFormData) {
  return {
    name: data.name.trim(),
    email: data.email.trim(),
    message: data.message.trim(),
  };
}

async function submitViaWeb3Forms(
  data: ContactFormData,
  accessKey: string,
): Promise<void> {
  const { name, email, message } = trimFormData(data);

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      message,
      subject: `Portfolio message from ${name}`,
      from_name: "Portfolio Contact Form",
      replyto: email,
    }),
  });

  let result: Web3FormsResponse = {};
  try {
    result = (await response.json()) as Web3FormsResponse;
  } catch {
    throw new Error("Unable to send message. Please try again later.");
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message ?? "Unable to send message. Please try again later.");
  }
}

async function submitViaFormSubmit(data: ContactFormData): Promise<void> {
  const { name, email, message } = trimFormData(data);

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(profile.email)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Portfolio message from ${name}`,
        _replyto: email,
        _template: "table",
      }),
    },
  );

  let result: FormSubmitResponse = {};
  try {
    result = (await response.json()) as FormSubmitResponse;
  } catch {
    throw new Error("Unable to send message. Please try again later.");
  }

  if (!response.ok || result.success !== "true") {
    throw new Error(result.message ?? "FormSubmit delivery failed");
  }
}

function openMailto(data: ContactFormData): void {
  const { name, email, message } = trimFormData(data);
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(
    `From: ${name}\nEmail: ${email}\n\n${message}`,
  );

  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

export async function submitContactForm(data: ContactFormData): Promise<SubmitResult> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

  if (accessKey) {
    await submitViaWeb3Forms(data, accessKey);
    return { method: "web3forms" };
  }

  try {
    await submitViaFormSubmit(data);
    return { method: "formsubmit" };
  } catch {
    openMailto(data);
    return { method: "mailto" };
  }
}

export function getSuccessMessage(method: SubmitMethod): string {
  switch (method) {
    case "web3forms":
    case "formsubmit":
      return `Message sent! You'll receive it at ${profile.email}. Check your phone if Gmail notifications are enabled.`;
    case "mailto":
      return `Your email app should open with the message ready. Click Send to deliver it to ${profile.email}.`;
  }
}

/** Exposed for tests and diagnostics. */
export function getContactRecipientEmail(): string {
  return profile.email;
}
