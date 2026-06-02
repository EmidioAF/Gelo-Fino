# Gelo Fino — The Ice Journey

Jogo casual em JavaScript com **p5.js**, inspirado no estilo do minigame **Thin Ice / Gelo Fino**, mas com identidade visual própria e adaptado para fins acadêmicos. O projeto foi desenvolvido para a disciplina **Web Development: HTML5 Canvas & Games** da PUCPR, com foco em organização de código, jogabilidade e apresentação final.

## Participantes

- Emidio Angelotti Filho
- Julio Cezar Sampaio Silva
- Mateus Glowaski
- William Wosch

## Descrição do Projeto

**Gelo Fino — The Ice Journey** é um jogo em visão superior no qual o jogador controla um pinguim em um tabuleiro de gelo. Cada bloco de gelo é destruído automaticamente quando o jogador passa por ele, e o objetivo é limpar todos os blocos válidos da fase sem cair na água e sem se prender antes do final. 

O jogo possui múltiplas fases com dificuldade progressiva, sistema de pontuação, vidas, menu principal, tela de instruções, tela sobre, pausa, vitória e game over, atendendo aos requisitos acadêmicos do trabalho. 

## Tecnologias Utilizadas

- JavaScript
- p5.js
- HTML5
- CSS3
- Web Audio API para efeitos sonoros simples [cite:2]

## Estrutura do Projeto

```bash
thin-ice-pucpr/
├── index.html
├── README.md
└── src/
    ├── main.js
    ├── game.js
    ├── scenes.js
    ├── player.js
    ├── tile.js
    ├── level.js
    ├── hud.js
    ├── audio.js
    ├── utils.js
    └── data-levels.js
```

## Como Executar

Existem algumas formas simples de rodar o projeto localmente:

### Opção 1 — Live Server no VS Code
1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server**.
3. Clique com o botão direito em `index.html`.
4. Selecione **Open with Live Server**.

### Opção 2 — Servidor local com Python
No terminal, dentro da pasta do projeto:

```bash
python -m http.server 8080
```

Depois, abra no navegador:

```bash
http://localhost:8080
```

> Não é recomendado abrir o arquivo diretamente em `file://`, pois alguns comportamentos podem falhar fora de um servidor local.

## Como Jogar

### Objetivo
O objetivo da fase é destruir todos os blocos de gelo válidos do mapa. Cada bloco desaparece automaticamente quando o jogador pisa nele. Quando o último bloco necessário for destruído, a fase é concluída. [cite:2]

### Regras principais
- O jogador controla um pinguim em um tabuleiro em grade.
- Cada bloco de gelo é destruído ao ser pisado.
- O jogador não pode andar sobre água.
- Se o jogador ficar sem saída, cair na água ou perder todas as vidas, ocorre derrota.
- Ao limpar todos os blocos da fase, ocorre vitória. 

### Controles
- `W`, `A`, `S`, `D` — mover
- `Setas do teclado` — mover
- `P` — pausar
- `R` — reiniciar a fase
- `M` — voltar ao menu
- `O` — ligar/desligar som

## Mecânicas Principais

- Movimento em grade com interpolação visual suave.
- Destruição automática dos blocos ao caminhar.
- Sistema de pontuação por blocos destruídos.
- Sistema de vidas.
- HUD com fase, pontuação, vidas e blocos restantes.
- Progressão por fases.
- Telas de menu, instruções, sobre, pausa, vitória e game over.

## Organização do Código

O projeto foi separado em múltiplos arquivos para facilitar manutenção, leitura e apresentação. Essa divisão ajuda a demonstrar boa arquitetura e uso adequado de JavaScript orientado a objetos. [cite:2]

### Resumo dos arquivos
- `main.js`: inicialização do p5.js e loop principal.
- `game.js`: controle geral do jogo, estados e progressão.
- `scenes.js`: gerenciamento das telas e menus.
- `player.js`: lógica e desenho do jogador.
- `tile.js`: lógica dos blocos de gelo.
- `level.js`: estrutura e atualização das fases.
- `hud.js`: interface com score, vidas e progresso.
- `audio.js`: efeitos sonoros.
- `utils.js`: funções auxiliares.
- `data-levels.js`: definição das fases em matrizes.

## Requisitos Acadêmicos Atendidos

Este projeto atende aos seguintes pontos solicitados no trabalho:

- Jogo desenvolvido em JavaScript com p5.js. 
- Game casual jogável. 
- Contagem de pontos. 
- Tela de início. 
- Tela de game over.
- Menu de abertura.
- Tela “Sobre” com nomes dos participantes.
- Progressão clara com múltiplas fases.
- HUD com informações de jogo.
- Organização de código com classes e separação de responsabilidades.
- Estrutura pronta para GitHub.

## Link do Vídeo

Adicionar aqui o link do vídeo de apresentação no YouTube:



## Possíveis Melhorias Futuras

- Ranking persistente com armazenamento local.
- Editor de fases.
- Novos tipos de blocos.
- Obstáculos ou inimigos.
- Suporte a dispositivos móveis.
- Mais efeitos visuais e sonoros.
- Sistema de seleção de fases.
- Modo endless ou fases extras. [cite:2]
