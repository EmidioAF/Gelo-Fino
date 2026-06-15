/**
 * data-levels.js — fases solucionáveis para a regra:
 * - 1 camada de gelo
 * - ao pisar, o bloco é destruído
 * - vence quando destruir todos os blocos válidos
 *
 * Legenda:
 * 0 = água / vazio
 * 1 = gelo normal
 *
 * Observação:
 * Como o bloco some imediatamente, os mapas abaixo foram
 * desenhados como trilhas solucionáveis.
 */

const LEVELS = [
  // Fase 1 — linha tutorial
  {
    name: 'Primeiros Passos',
    tileSize: 46,
    startCol: 0,
    startRow: 4,
    grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
  },

  // Fase 2 — cobra simples
  {
    name: 'Trilha Gelada',
    tileSize: 46,
    startCol: 11,
    startRow: 1,
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
    ]
  },

  // Fase 3 — curva maior
  {
    name: 'Caminho Frio',
    tileSize: 46,
    startCol: 1,
    startRow: 5,
    grid: [
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
      [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
      [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    ]
  },

  // Fase 4 — serpentina
  {
    name: 'Serpentina Ártica',
    tileSize: 46,
    startCol: 10,
    startRow: 1,
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    ]
  },

  // Fase 5 — trilha final longa
  {
    name: 'Desafio Final',
    tileSize: 46,
    startCol: 1,
    startRow: 3,
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
      [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
];



