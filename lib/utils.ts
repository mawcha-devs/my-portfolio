export function cn(
  ...classes: Array<string | false | null | undefined>
) {
  return classes.filter(Boolean).join(' ');
}

export function formatDateRange(
  start: string,
  end?: string,
) {
  if (!end) return start;
  return `${start} – ${end}`;
}
