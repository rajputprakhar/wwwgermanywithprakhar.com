/**
 * Abstract API Email Validation Service
 * 
 * Captures email input, sends a fetch request to the Abstract API email validation endpoint,
 * verifies `is_valid_format` and `deliverability`, and returns the validation result
 * to update the UI with a success or error alert message.
 */

export interface AbstractEmailResponse {
  email: string;
  autocorrect?: string;
  deliverability: 'DELIVERABLE' | 'UNDELIVERABLE' | 'RISKY' | 'UNKNOWN';
  quality_score?: number;
  is_valid_format: {
    value: boolean;
    text?: string;
  } | boolean;
  is_free_email?: { value: boolean };
  is_disposable_email?: { value: boolean };
  is_role_email?: { value: boolean };
  is_catchall_email?: { value: boolean };
  is_mx_found?: { value: boolean };
  is_smtp_valid?: { value: boolean };
}

export interface VerificationResult {
  isValid: boolean;
  message: string;
  deliverability?: string;
  data?: AbstractEmailResponse;
}

/**
 * Retrieves the secured Abstract API key from environment variables.
 */
export function getSecuredAbstractApiKey(): string {
  try {
    const metaEnv = typeof import.meta !== 'undefined' ? (import.meta as any)?.env : undefined;
    if (metaEnv?.VITE_ABSTRACT_EMAIL_API_KEY) {
      return metaEnv.VITE_ABSTRACT_EMAIL_API_KEY;
    }
  } catch {
    // ignore metaEnv error in cjs
  }

  if (typeof process !== 'undefined' && process?.env?.ABSTRACT_EMAIL_API_KEY) {
    return process.env.ABSTRACT_EMAIL_API_KEY;
  }

  return '';
}

/**
 * Captures the email input, fetches data from Abstract API, checks if is_valid_format is true
 * and deliverability is valid, and returns success or error feedback.
 * 
 * @param emailInput - Raw email string captured from user input
 * @returns Promise<VerificationResult>
 */
export async function verifyEmailWithAbstractApi(
  emailInput: string
): Promise<VerificationResult> {
  // 1. Grab email address from user input
  const email = (emailInput || '').trim();

  // Basic guard check before sending network request
  if (!email) {
    return {
      isValid: false,
      message: 'Please enter an email address.'
    };
  }

  // Basic RFC regex sanity check (local@domain.ext)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: 'The email address is incorrect. Please check your spelling (e.g. name@domain.com).'
    };
  }

  const apiKey = getSecuredAbstractApiKey();

  // 2. Use fetch command with Abstract API endpoint and secured API key if configured
  if (apiKey) {
    try {
      const endpoint = `https://emailvalidation.abstractapi.com/v1/?api_key=${encodeURIComponent(apiKey)}&email=${encodeURIComponent(email)}`;
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const data: AbstractEmailResponse = await response.json();

        // 3. Check format and deliverability fields in the data
        const isValidFormat = 
          typeof data.is_valid_format === 'boolean'
            ? data.is_valid_format
            : Boolean(data.is_valid_format?.value);

        const isDeliverable = data.deliverability !== 'UNDELIVERABLE';
        const isDisposable = Boolean(data.is_disposable_email?.value);

        // 4. If everything is valid, proceed with success message; otherwise alert user
        if (isValidFormat && isDeliverable && !isDisposable) {
          return {
            isValid: true,
            message: `Email verified successfully (${data.deliverability || 'DELIVERABLE'})!`,
            deliverability: data.deliverability,
            data
          };
        } else {
          let errorMessage = 'The email address is incorrect.';
          if (!isValidFormat) {
            errorMessage = 'The email address format is invalid. Please check for typos.';
          } else if (!isDeliverable) {
            errorMessage = 'The email address is undeliverable. Mailbox does not exist.';
          } else if (isDisposable) {
            errorMessage = 'Disposable and temporary email addresses are not permitted.';
          }

          return {
            isValid: false,
            message: errorMessage,
            deliverability: data.deliverability,
            data
          };
        }
      }
    } catch (err) {
      console.warn('Direct Abstract API fetch note: falling back to secure verification proxy', err);
    }
  }

  // 3. Seamless proxy to server verification route /api/verify-email
  // (which also evaluates Abstract API server-side with MX DNS fallback)
  try {
    const res = await fetch('/api/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const resData = await res.json();
    if (res.ok && resData.success) {
      return {
        isValid: true,
        message: 'Email address verified and deliverable!',
        deliverability: resData.deliverabilityStatus || 'DELIVERABLE'
      };
    } else {
      return {
        isValid: false,
        message: resData.error || 'The email address is incorrect. Please check for typos.'
      };
    }
  } catch (err) {
    console.warn('Backend verification route error:', err);
  }

  // 4. Client-side fallback if offline
  return {
    isValid: true,
    message: 'Email address format verified successfully!'
  };
}

/**
 * Direct DOM/UI helper function:
 * Captures email input from an input element, validates via Abstract API,
 * and updates display elements with success or error message.
 * 
 * @param inputElementOrValue - HTMLInputElement or string value
 * @param onResult - Callback or UI element update handler
 */
export async function handleEmailVerification(
  inputElementOrValue: HTMLInputElement | string,
  onResult?: (result: VerificationResult) => void
): Promise<VerificationResult> {
  const emailValue = typeof inputElementOrValue === 'string' 
    ? inputElementOrValue 
    : inputElementOrValue.value;

  const result = await verifyEmailWithAbstractApi(emailValue);

  if (onResult) {
    onResult(result);
  }

  return result;
}
