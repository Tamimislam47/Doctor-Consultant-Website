export async function Fetch(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
