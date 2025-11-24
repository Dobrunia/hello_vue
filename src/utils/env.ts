/**
 * Get environment variable with type safety
 */
export function getEnv(key: keyof ImportMetaEnv): string | undefined {
  return import.meta.env[key];
}

/**
 * Get environment variable or throw if not set
 */
export function requireEnv(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

/**
 * Convenience getters for common env variables
 */
export const env = {
  get apiUrl() {
    return getEnv('VITE_API_URL');
  },
  get apiKey() {
    return getEnv('VITE_API_KEY');
  },
};
