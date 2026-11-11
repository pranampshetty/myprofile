export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_REGEX = /^[a-zA-Z][a-zA-Z\s.'-]{0,48}$/;

export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return "Name is required";
  if (trimmed.length < 2) return "Name must be at least 2 characters";
  if (trimmed.length > 50) return "Name must be under 50 characters";
  if (!NAME_REGEX.test(trimmed)) {
    return "Name can only contain letters, spaces, dots, hyphens, and apostrophes";
  }
  return null;
}

export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return "Email is required";
  if (!EMAIL_REGEX.test(trimmed)) return "Please enter a valid email address";
  return null;
}

export function validateMessage(message: string): string | null {
  const trimmed = message.trim();
  if (!trimmed) return "Message is required";
  if (trimmed.length < 10) return "Message must be at least 10 characters";
  if (trimmed.length > 2000) return "Message must be under 2000 characters";
  return null;
}

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const nameError = validateName(data.name);
  const emailError = validateEmail(data.email);
  const messageError = validateMessage(data.message);

  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (messageError) errors.message = messageError;

  return errors;
}
