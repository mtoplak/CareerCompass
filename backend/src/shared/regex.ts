export function escapeRegex(text: string): string {
    return text.replace(/\d/g, '');
  }