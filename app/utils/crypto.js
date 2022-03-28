export function randomBytes(n) {
  return window.crypto.getRandomValues(new Uint32Array(n));
}
