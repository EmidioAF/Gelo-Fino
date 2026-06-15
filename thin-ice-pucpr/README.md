# 🧊 Gelo Fino

> Jogo de puzzle desenvolvido em JavaScript com p5.js como projeto acadêmico para a disciplina de **Desenvolvimento de Jogos · PUCPR**.

---

## 🎮 Sobre o Projeto

**Gelo Fino** (também chamado internamente de *Thin Ice*) é um jogo de puzzle baseado em grades onde o objetivo é **percorrer todas as casas de gelo sem repetir o mesmo caminho** — inspirado nos clássicos jogos de labirinto de gelo do Club Penguin.

O jogador controla um personagem que desliza sobre tiles de gelo. Cada tile só pode ser pisado **uma vez**: ao passar por cima, ele some. O desafio é planejar sua rota para destruir todos os tiles do nível antes de cair no buraco ou ficar sem saída.

O jogo conta com:
- Múltiplas fases com layouts progressivamente mais difíceis
- Sistema de score baseado nos tiles destruídos
- Sistema de vidas (3 vidas por partida)
- HUD com progresso do nível e pontuação
- Ranking dos 10 melhores scores da sessão
- Áudio com trilha e efeitos sonoros
- Menu principal, tela de pausa, game over e vitória

---

## 🧱 Tecnologias

| Tecnologia | Uso |
|---|---|
| [p5.js](https://p5js.org/) v1.9.3 | Renderização, input e game loop |
| JavaScript (Vanilla) | Lógica do jogo, cenas e entidades |
| HTML5 / CSS3 | Estrutura e estilo da página |
| Google Fonts | Fontes *Fredoka One* e *Nunito* |

Não há dependências de build — o projeto roda direto no browser via `index.html`.

---

## ▶️ Como Rodar

### Opção 1 — Abrir direto no browser (mais simples)

```bash
# Clone o repositório
git clone https://github.com/EmidioAF/Gelo-Fino.git

# Acesse a pasta do jogo
cd Gelo-Fino/thin-ice-pucpr
```

Abra o arquivo `index.html` diretamente no seu navegador (Chrome ou Firefox recomendados).

> ⚠️ Alguns navegadores bloqueiam scripts locais por política de CORS. Se o jogo não carregar, use a **Opção 2**.

---

### Opção 2 — Servidor local (recomendado)

**Com VS Code + extensão Live Server:**
1. Abra a pasta `thin-ice-pucpr` no VS Code
2. Clique com botão direito em `index.html` → **"Open with Live Server"**
3. O jogo abrirá automaticamente no browser

**Com Python:**
```bash
cd Gelo-Fino/thin-ice-pucpr
python -m http.server 8080
# Acesse: http://localhost:8080
```

**Com Node.js (http-server):**
```bash
npx http-server thin-ice-pucpr -p 8080
# Acesse: http://localhost:8080
```

---

## 🕹️ Como Jogar

### Objetivo
Pise em **todos os tiles de gelo** do nível sem repetir o mesmo tile. Quando um tile é pisado, ele desaparece. Cair num tile já destruído ou num espaço vazio te mata.

### Controles

| Tecla | Ação |
|---|---|
| `↑` / `W` | Mover para cima |
| `↓` / `S` | Mover para baixo |
| `←` / `A` | Mover para esquerda |
| `→` / `D` | Mover para direita |
| `P` | Pausar / Retomar |
| `R` | Reiniciar fase (gasta uma vida) |
| `M` | Voltar ao menu |
| `O` | Ligar / Desligar áudio |

### Pontuação
- Cada tile destruído concede pontos
- Reiniciar uma fase com `R` desconta **100 pontos** do score total
- Ao perder todas as 3 vidas, o score é salvo no ranking da sessão

### Dica
Planeje o caminho antes de mover! Tiles em becos sem saída podem travar sua rota. Pense sempre dois ou três passos à frente.

---

## 📁 Estrutura do Projeto

```
thin-ice-pucpr/
├── index.html          # Ponto de entrada
└── src/
    ├── main.js         # Setup do p5.js e loop principal
    ├── game.js         # Orquestração geral (cenas, score, vidas)
    ├── scenes.js       # Todas as cenas (menu, jogo, pausa, etc.)
    ├── level.js        # Lógica de fase e colisões
    ├── player.js       # Movimentação e estado do jogador
    ├── tile.js         # Tipos de tiles e renderização
    ├── hud.js          # Interface de jogo (score, vidas, progresso)
    ├── data-levels.js  # Dados dos layouts de fase
    ├── audio.js        # Gerenciador de áudio
    └── utils.js        # Funções utilitárias
```

---

## 👤 Autor

**Emidio Angelotti Filho**  
Sistemas de Informação · PUCPR  
[github.com/EmidioAF](https://github.com/EmidioAF)

---

*Projeto acadêmico · PUCPR 2025/2026*
