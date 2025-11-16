function slugify(text: string, maxWords: number = 5): string {
  const slug = text
    .toString()
    .normalize('NFKD')                  // Normalize unicode
    .replace(/[\u0300-\u036f]/g, '')    // Remove accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')        // Replace non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, '');           // Remove leading/trailing hyphens

  const words = slug.split('-');         // Split by hyphen
  return words.slice(0, maxWords).join('-'); // Keep only maxWords
}