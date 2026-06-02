/**
 * data-levels.js — fases solucionáveis para a regra:
 * - 1 camada de gelo
 * - ao pisar, o bloco é destruído
 * - vence quando destruir todos os blocos válidos
 *
 * Legenda:
 * 0 = água / vazio
 * 1 = gelo normal
 * 4 = bloco bônus
 *
 * Observação:
 * Como o bloco some imediatamente, os mapas abaixo foram
 * desenhados como trilhas solucionáveis.
 */

const LEVELS = [
  // Fase 1 — linha tutorial
  {
    name: 'Primeiros Passos',
    timeLimit: 0,
    tileSize: 72,
    startCol: 0,
    startRow: 0,
    grid: [
      [1, 1, 1, 1, 1]
    ],
  },

  // Fase 2 — cobra simples
  {
    name: 'Trilha Gelada',
    timeLimit: 0,
    tileSize: 64,
    startCol: 0,
    startRow: 0,
    grid: [
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ],
  },

  // Fase 3 — curva maior
  {
    name: 'Caminho Frio',
    timeLimit: 45,
    tileSize: 58,
    startCol: 0,
    startRow: 0,
    grid: [
      [1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 4],
    ],
  },

  // Fase 4 — serpentina
  {
    name: 'Serpentina Ártica',
    timeLimit: 70,
    tileSize: 52,
    startCol: 0,
    startRow: 0,
    grid: [
      [1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1],
    ],
  },

  // Fase 5 — trilha final longa
  {
    name: 'Desafio Final',
    timeLimit: 100,
    tileSize: 46,
    startCol: 0,
    startRow: 0,
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 4],
    ],
  },
];