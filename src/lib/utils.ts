export function formatCurrencyZAR(value: number) {
  return value.toLocaleString('en-ZA');
}

export function shortDate(d?: string | Date) {
  if (!d) return '';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString();
}
