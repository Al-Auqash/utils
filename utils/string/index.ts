// Example: "hello-world_here" => ["hello", "world", "here"]
export const splitIntoWords = (str: string): string[] => {
  return str.split(/[\s_-]+/);
};

// Example: "hello" => "HELLO"
export const toUppercase = (str: string): string => {
  return str.toUpperCase();
};

// Example: "HELLO" => "hello"
export const toLowercase = (str: string): string => {
  return str.toLowerCase();
};

// Examples:
// "hello world" => "Hello World"
// "HELLO_WORLD" => "Hello World"
export const toTitleCase = (str: string): string => {
  return splitIntoWords(str)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Examples:
// "hello world" => "Hello world"
// "HELLO_WORLD" => "Hello world"
export const toSentenceCase = (str: string): string => {
  let words = splitIntoWords(str);
  return (
    words[0].charAt(0).toUpperCase() +
    words[0].slice(1).toLowerCase() +
    ' ' +
    words.slice(1).join(' ').toLowerCase()
  );
};

// Examples:
// "hello world" => "helloWorld"
// "HELLO_WORLD" => "helloWorld"
export const toCamelCase = (str: string): string => {
  return splitIntoWords(str)
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
};

// Examples:
// "hello world" => "hello_world"
// "HELLO WORLD" => "hello_world"
export const toSnakeCase = (str: string): string => {
  return splitIntoWords(str)
    .map((word) => word.toLowerCase())
    .join('_');
};

// Examples:
// "hello world" => "hello-world"
// "HELLO WORLD" => "hello-world"
export const toKebabCase = (str: string): string => {
  return splitIntoWords(str)
    .map((word) => word.toLowerCase())
    .join('-');
};

// Example: "Hello World" => "hELLO wORLD"
export const toToggleCase = (str: string): string => {
  return str
    .split('')
    .map((char) => {
      return char === char.toUpperCase()
        ? char.toLowerCase()
        : char.toUpperCase();
    })
    .join('');
};
