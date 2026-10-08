/**
 * Email validation utility with strict RFC 5322 formatting checks
 * and disposable email provider rejection.
 */

// Strict RFC 5322 standard compliant regular expression
export const STRICT_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Common disposable/burner email services
export const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  'temp-mail.org',
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  '10minutemail.com',
  '10minutemail.net',
  'throwawaymail.com',
  'yopmail.com',
  'sharklasers.com',
  'trashmail.com',
  'dispostable.com',
  'getairmail.com',
  'fakeinbox.com',
  'burnermail.io',
  'maildrop.cc',
  'crazymailing.com',
  'mohmal.com',
  'mytemp.email',
  'fakemailgenerator.com',
  'armyspy.com',
  'cuvox.de',
  'dayrep.com',
  'fleckens.hu',
  'gustr.com',
  'jourrapide.com',
  'rhyta.com',
  'superrito.com',
  'teleworm.us',
  'tinypm.com',
  'inboxkitten.com'
]);

export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  domain?: string;
  isDisposable?: boolean;
}

/**
 * Validates email syntax and disposable domain blacklist
 */
export function validateEmailClient(rawEmail: string): EmailValidationResult {
  const email = (rawEmail || '').trim().toLowerCase();

  if (!email) {
    return { isValid: false, error: 'Email address cannot be empty.' };
  }

  if (email.length < 6 || email.length > 254) {
    return { isValid: false, error: 'Email must be between 6 and 254 characters long.' };
  }

  if (email.includes('..')) {
    return { isValid: false, error: 'Email cannot contain consecutive periods.' };
  }

  if (!STRICT_EMAIL_REGEX.test(email)) {
    return { isValid: false, error: 'Please enter a properly formatted email address (e.g., name@domain.com).' };
  }

  const parts = email.split('@');
  if (parts.length !== 2) {
    return { isValid: false, error: 'Email must contain exactly one @ symbol.' };
  }

  const [localPart, domain] = parts;

  if (localPart.length > 64) {
    return { isValid: false, error: 'The email username portion exceeds 64 characters.' };
  }

  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  if (!tld || tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) {
    return { isValid: false, error: 'Please enter a valid top-level domain (e.g. .com, .de, .edu).' };
  }

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { 
      isValid: false, 
      isDisposable: true, 
      error: 'Disposable and temporary email addresses are not permitted. Please use your permanent academic or personal email.' 
    };
  }

  return {
    isValid: true,
    domain
  };
}
