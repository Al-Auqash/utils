interface PasswordValidationConfig {
  minLength?: number;
  maxLength?: number;
  requireLowercase?: boolean;
  requireUppercase?: boolean;
  requireNumeric?: boolean;
  requireSymbol?: boolean;
  symbols?: string;
  onlyLatin?: boolean;
}

export const validatePassword = (
  password: string,
  config: PasswordValidationConfig = {},
): boolean => {
  const {
    minLength = 8,
    maxLength = 64,
    requireLowercase = true,
    requireUppercase = true,
    requireNumeric = true,
    requireSymbol = true,
    symbols = '!@#$%^&*()-_+=<>?/[]', 
    onlyLatin = true,
  } = config;

  if (password.length < minLength || password.length > maxLength) return false;

  if (requireLowercase && !/[a-z]/.test(password)) return false;

  if (requireUppercase && !/[A-Z]/.test(password)) return false;

  if (requireNumeric && !/[0-9]/.test(password)) return false;

  if (requireSymbol) {
    // We use the `RegExp` constructor here to build our regex from the string.
    // Note: If you expect the symbols to contain special regex characters like ., ^, $, etc.,
    // you'd have to escape them before creating the RegExp.
    const symbolPattern = new RegExp('[' + symbols + ']', 'g');
    if (!symbolPattern.test(password)) return false;
  }

  if (onlyLatin && /[^a-zA-Z0-9!@#$%^&*()\-\_+=<>?/\[\] ]/.test(password))
    return false;

  return true;
};
