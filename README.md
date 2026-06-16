# 🧊 Gelo Fino

> Jogo de puzzle desenvolvido em JavaScript com p5.js como projeto acadêmico para a disciplina de Desenvolvimento de Jogos da PUCPR.

***

# Integrantes

> JEmidio Angelotti Filho ; Mateus Glowaski ; Julio Cezar ; Willam Wosch

***

## 🎮 Sobre o projeto

**Gelo Fino** é um jogo de puzzle em grade inspirado em jogos de gelo clássicos, no qual o jogador deve atravessar todos os blocos do cenário sem repetir o caminho. O projeto foi estruturado em HTML, CSS e JavaScript, com renderização e loop principal feitos em p5.js. 

No jogo, cada tile de gelo desaparece depois que o personagem passa por ele. O objetivo de cada fase é limpar todos os tiles válidos sem cair em espaços vazios e sem ficar preso. 

O projeto inclui:
- Sistema de fases com progressão. 
- Pontuação acumulada durante a partida. 
- Sistema de vidas, começando com 3 por jogo. 
- HUD com nível, score, vidas e progresso da fase. 
- Telas de menu, instruções, pausa, vitória, ranking e game over. 
- Controle de áudio com opção de ativar ou desativar. 

***

## 🧱 Tecnologias usadas

| Tecnologia | Função |
|---|---|
| HTML5 | Estrutura da página e ponto de entrada do jogo.  |
| CSS3 | Estilo visual da tela e do canvas.  |
| JavaScript | Lógica do jogo, cenas, fases, HUD e movimentação.  |
| p5.js | Renderização, input e game loop.  |

***

## ▶️ Como rodar

O projeto não depende de build nem framework frontend. Ele pode ser executado diretamente a partir do arquivo `index.html`, que carrega os scripts do jogo e a biblioteca p5.js. 

### Opção 1 — Abrir direto no navegador

1. Clone o repositório:
```bash
git clone https://github.com/EmidioAF/Gelo-Fino.git
```

2. Entre na pasta do projeto:
```bash
cd Gelo-Fino/thin-ice-pucpr
```

3. Abra o arquivo `index.html` no navegador.

### Opção 2 — Rodar com servidor local

Essa opção é a mais recomendada para evitar possíveis restrições do navegador com arquivos locais.

**Usando Python:**
```bash
cd Gelo-Fino/thin-ice-pucpr
python -m http.server 8080
```

Depois, acesse:
```bash
http://localhost:8080
```

**Usando VS Code + Live Server:**
- Abra a pasta `thin-ice-pucpr` no VS Code.
- Clique com o botão direito em `index.html`.
- Selecione **Open with Live Server**.

***

## 🕹️ Como jogar

O objetivo é passar por todos os tiles de gelo da fase. Cada tile desaparece após ser pisado, então o jogador precisa planejar a rota com cuidado para não se prender ou cair. 

### Controles

| Tecla | Ação |
|---|---|
| `W` / `↑` | Mover para cima.  |
| `S` / `↓` | Mover para baixo.  |
| `A` / `←` | Mover para a esquerda.  |
| `D` / `→` | Mover para a direita.  |
| `P` | Pausar o jogo.  |
| `R` | Perder uma vida e reiniciar a fase.  |
| `M` | Voltar ao menu principal.  |
| `O` | Ativar ou desativar o áudio.  |

### Regras básicas

- O jogador começa com 3 vidas. 
- Cada tile destruído adiciona pontos ao score. 
- Reiniciar a fase reduz 100 pontos da pontuação total. 
- Se as vidas chegarem a 0, a partida termina e o score entra no ranking da sessão. 
- Ao completar todos os tiles de uma fase, o jogador avança para a próxima. 

***

## 📁 Estrutura do projeto

A aplicação está organizada com um arquivo principal HTML e um conjunto de módulos JavaScript na pasta `src`. 

```text
thin-ice-pucpr/
├── README.md
├── index.html
└── src/
    ├── audio.js
    ├── data-levels.js
    ├── game.js
    ├── hud.js
    ├── level.js
    ├── main.js
    ├── player.js
    ├── scenes.js
    ├── tile.js
    └── utils.js
```

### Função dos arquivos

- `index.html`: carrega a página, o canvas e todos os scripts do jogo. 
- `main.js`: inicialização principal do p5.js e entrada da aplicação. 
- `game.js`: gerencia score, vidas, ranking, fases e troca de cenas. 
- `scenes.js`: controla menu, pausa, vitória, game over e demais telas. 
- `level.js`: processa a lógica das fases. 
- `player.js`: define comportamento e movimentação do jogador. 
- `tile.js`: representa os tiles do mapa. 
- `hud.js`: desenha informações de interface durante a partida. 
- `data-levels.js`: armazena os dados dos níveis. 
- `audio.js`: cuida dos efeitos e controle de áudio. 
- `utils.js`: reúne utilitários usados pelo projeto. 

***

## 💡 Ideias futuras

Algumas melhorias que podem evoluir o projeto:
- Ranking persistente com `localStorage`.
- Novos tipos de tile e obstáculos.
- Mais fases com dificuldade crescente.
- Menu de seleção de fases.
- Melhor feedback visual e sonoro para ações do jogador.

***
## 📚 Contexto acadêmico

Este projeto foi desenvolvido como trabalho acadêmico e apresenta uma estrutura modular com separação entre lógica de jogo, fases, HUD, áudio e cenas. Essa organização aparece claramente na pasta `src` e no carregamento ordenado dos scripts em `index.html`.
