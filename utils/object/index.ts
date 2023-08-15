/**
 * Converts a query string to an object.
 *
 * Assumes a format like "?key1=value1&key2=value2".
 *
 * @param query - The query string.
 * @returns An object representing the key-value pairs in the query string.
 *
 * @example
 * queryStringToObject("?key1=value1&key2=value2")
 * // Returns: { key1: "value1", key2: "value2" }
 */
export const queryStringToObject = (query: string): Record<string, string> => {
  return query
    .replace(/^\?/, '')
    .split('&')
    .reduce((acc: Record<string, string>, item) => {
      const [key, value] = item.split('=');
      acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
      return acc;
    }, {});
};

/**
 * Recursively merges two objects.
 * If the same key exists in both objects and the values are objects, they are merged.
 * Otherwise, the value in the source object overwrites the one in the target object.
 *
 * @param target - The target object.
 * @param source - The source object to merge from.
 * @returns The merged object.
 *
 * @example
 * deepMerge({ a: { b: 1 } }, { a: { c: 2 } })
 * // Returns: { a: { b: 1, c: 2 } }
 */
export const deepMerge = <
  T extends Record<string, any>,
  S extends Record<string, any>,
>(
  target: T,
  source: S,
): T & S => {
  const output: Record<string, any> = { ...target };

  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      target.hasOwnProperty(key) &&
      target[key] &&
      typeof target[key] === 'object'
    ) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }

  return output as T & S;
};

/**
 * Determines if two objects are deeply equal.
 *
 * @param obj1 - The first object.
 * @param obj2 - The second object.
 * @returns True if objects are deeply equal, otherwise false.
 *
 * @example
 * const objA = { a: 1, b: { c: 2 } };
 * const objB = { a: 1, b: { c: 2 } };
 * deepEqual(objA, objB); // true
 */
export const deepEqual = <T>(obj1: T, obj2: T): boolean => {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    const keyTyped = key as keyof T;
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[keyTyped], obj2[keyTyped])) return false;
  }

  return true;
};

/**
 * Creates a deep clone of an object.
 *
 * @param obj - The object to clone.
 * @returns A new object that is a deep clone of the original.
 *
 * @example
 * const source = { a: 1, b: { c: 2 } };
 * const cloned = deepClone(source);
 * console.log(source === cloned); // false
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Merges multiple objects into one.
 *
 * @param objects - The objects to merge.
 * @returns A new object that merges the properties of all input objects.
 *
 * @example
 * mergeObjects({ a: 1 }, { b: 2 }, { c: 3 })
 * // Returns: { a: 1, b: 2, c: 3 }
 */
export const mergeObjects = <T extends {}>(...objects: Partial<T>[]): T => {
  return Object.assign({}, ...objects) as T;
};

/**
 * Retrieves a nested value from an object using a dot-separated path.
 *
 * @param obj - The object.
 * @param path - A dot-separated path indicating the nested value.
 * @returns The nested value or undefined if not found.
 *
 * @example
 * const obj = { a: { b: { c: 1 } } };
 * getNestedValue(obj, 'a.b.c'); // 1
 */
export const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

/**
 * Sets a nested value in an object using a dot-separated path.
 *
 * @param obj - The object.
 * @param path - A dot-separated path indicating where to set the value.
 * @param value - The value to set.
 *
 * @example
 * const obj = {};
 * setNestedValue(obj, 'a.b.c', 1);
 * console.log(obj); // { a: { b: { c: 1 } } }
 */
export const setNestedValue = (obj: any, path: string, value: any): void => {
  const parts = path.split('.');
  let current = obj;

  for (let i = 0; i < parts.length; i++) {
    if (i === parts.length - 1) {
      current[parts[i]] = value;
    } else {
      current[parts[i]] = current[parts[i]] || {};
      current = current[parts[i]];
    }
  }
};

/**
 * Converts an object into an array of key-value pairs.
 *
 * @param obj - The object to convert.
 * @returns An array of key-value pairs.
 *
 * @example
 * objectToPairs({ a: 1, b: 2 })
 * // Returns: [['a', 1], ['b', 2]]
 */
export const objectToPairs = <T extends Object>(
  obj: T,
): [keyof T, T[keyof T]][] => {
  const result: [keyof T, T[keyof T]][] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push([key as keyof T, obj[key]]);
    }
  }

  return result;
};

/**
 * Converts an array of key-value pairs into an object.
 *
 * @param pairs - The key-value pairs.
 * @returns An object formed from the key-value pairs.
 *
 * @example
 * pairsToObject([['a', 1], ['b', 2]])
 * // Returns: { a: 1, b: 2 }
 */
export const pairsToObject = <T extends {}>(
  pairs: [keyof T, T[keyof T]][],
): T => {
  return pairs.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as T);
};
