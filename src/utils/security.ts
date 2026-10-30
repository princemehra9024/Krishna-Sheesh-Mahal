/**
 * Security utility functions for input validation and sanitization.
 * These run client-side since this is a static SPA with no backend.
 * All form data is sent via WhatsApp links, so validation prevents
 * malformed/spam messages from being constructed.
 */

/** Strip any HTML tags from a string to prevent accidental injection */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

/** Sanitize a generic text field: strip HTML, trim whitespace */
export function sanitizeText(input: string): string {
  return stripHtml(input).substring(0, 500);
}

/** Sanitize a name field: strip HTML, allow only safe name characters */
export function sanitizeName(input: string): string {
  // Allow letters, spaces, hyphens, apostrophes, and common Unicode letters
  return stripHtml(input)
    .replace(/[^a-zA-Z\u00C0-\u024F\u1E00-\u1EFF '\-\.]/g, "")
    .substring(0, 100);
}

/** Validate and sanitize an email address */
export function sanitizeEmail(input: string): string {
  const cleaned = stripHtml(input).toLowerCase().substring(0, 254);
  return cleaned;
}

/** Validate email format */
export function isValidEmail(email: string): boolean {
  // RFC 5322 simplified pattern
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email) && email.length <= 254;
}

/** Validate phone number: digits, spaces, +, -, ( ) only */
export function sanitizePhone(input: string): string {
  return stripHtml(input)
    .replace(/[^0-9\s\+\-\(\)]/g, "")
    .substring(0, 20);
}

/** Sanitize a number of guests: only digits */
export function sanitizeGuests(input: string): string {
  return input.replace(/\D/g, "").substring(0, 4);
}

/** Validate that a required field is non-empty after sanitization */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/** Build a safe WhatsApp URL — ensures encodeURIComponent is always called */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const safPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${safPhone}?text=${encodeURIComponent(message)}`;
}
