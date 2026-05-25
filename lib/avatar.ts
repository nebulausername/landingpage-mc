/* Minecraft avatar helpers — uses mc-heads.net (no API key, generous CDN). */
export function mcHead(user: string, size = 96): string {
  const safe = encodeURIComponent(user);
  return `https://mc-heads.net/avatar/${safe}/${size}`;
}
export function mcBody(user: string): string {
  return `https://mc-heads.net/body/${encodeURIComponent(user)}/right`;
}
