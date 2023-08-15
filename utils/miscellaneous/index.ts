/**
 * Creates a debounced version of the provided function.
 * The debounced version will delay the invocation of the function until after a specified number of milliseconds has passed since the last time it was invoked.
 *
 * @param func - The function to debounce.
 * @param delay - The number of milliseconds to delay invocation.
 * @returns A new debounced function.
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): ((...funcArgs: Parameters<T>) => void) => {
  let debounceTimer: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  };
};

/**
 * Creates a throttled version of the provided function.
 * The throttled version will ensure that the function is not called more than once in a specified time frame.
 *
 * @param func - The function to throttle.
 * @param limit - The number of milliseconds to use for throttling.
 * @returns A new throttled function.
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...funcArgs: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Generates a universally unique identifier (UUID).
 *
 * @returns A new UUID string.
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
