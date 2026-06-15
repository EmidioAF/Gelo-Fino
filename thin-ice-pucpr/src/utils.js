/**
 * utils.js — funções utilitárias globais
 */

/** Interpolação linear */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

/** Limita valor entre min e max */
function clamp(val, mn, mx) {
  return Math.max(mn, Math.min(mx, val));
}

/** Easing suave (ease-out quadrático) */
function easeOut(t) {
  return 1 - (1 - t) * (1 - t);
}

/** Cor hexadecimal para objeto {r,g,b} */
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return { r, g, b };
}

/** Gera um número inteiro aleatório entre a (inclusive) e b (inclusive) */
function randInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}