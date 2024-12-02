export function formatDate(timestamp: string): string {
  const date = new Date(timestamp);

  // Format date components
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Return formatted date string without seconds
  return `${day}-${month}-${year} ${hours}:${minutes}`;
}
