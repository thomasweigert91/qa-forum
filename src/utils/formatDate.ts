export function formatDate(date: string | Date): string {
  const parsedDate = new Date(date);

  const dd = String(parsedDate.getDate()).padStart(2, "0");
  const mm = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const yyyy = parsedDate.getFullYear();
  const hh = String(parsedDate.getHours()).padStart(2, "0");
  const min = String(parsedDate.getMinutes()).padStart(2, "0");

  return `${dd}.${mm}.${yyyy} / ${hh}:${min}`;
}
