Acesse a pagina [AQUI](https://r3vmarcos.github.io/alarme_pet/)

🐶 Documentação do Sistema: Alarme do Scooby (v1.0)

📋 Visão Geral

Este sistema é uma aplicação web otimizada para dispositivos móveis (Web App) que serve como um botão de alerta para Afazeres higiênicos do cachorro (Scooby).

O objetivo é emitir um alerta sonoro contínuo e irritante até que o usuário (humano) interaja para desligá-lo, garantindo que a "sujeira" seja notada e limpa imediatamente.

⚙️ Lógica do Sistema

O sistema opera baseando-se em manipulação do DOM (Interface) e em uma Máquina de Estados simples para o áudio. Abaixo detalho os pilares da lógica:

1. O Ciclo de Áudio (Loop Infinito Misto)

Diferente de um loop simples que repete apenas um arquivo, este sistema utiliza um ciclo alternado entre dois tipos de som.

O Fluxo:

Gatilho: O usuário clica em "XIXI" ou "COCÔ".

Estado 1 (Sirene): O sistema toca o arquivo sirene.mp4.

Evento onended: O sistema aguarda o fim da sirene. Assim que ela termina, dispara automaticamente a próxima função.

Estado 2 (Voz): O sistema toca a voz correspondente (voz1.mp4 ou voz2.mp4).

Evento onended: O sistema aguarda o fim da voz. Assim que ela termina, chama de volta a função do Estado 1.

Resultado: Cria-se um loop infinito (Sirene ➔ Voz ➔ Sirene ➔ Voz...) que só para quando interrompido manualmente.

2. Interface (UI) Reativa

A interface possui dois "modos" controlados por classes CSS do Tailwind (hidden e flex):

Modo Seleção (Main Screen):

Fundo escuro (bg-gray-950) para conforto visual.

Botões grandes para facilitar o toque rápido.

Modo Alerta (Stop Screen):

Fundo vermelho intenso (bg-red-600).

Animações de pulso (animate-urgent) e textos saltitantes (animate-bounce) para criar senso de urgência visual.

Botão de "PARAR" ocupa grande parte da tela para ser fácil de acertar.

3. Mecanismo de Parada (Reset)

A função stopAlarm() é crítica para evitar bugs de áudio sobreposto. Ela realiza três ações:

Pausa Imediata: Para todos os objetos de áudio (.pause()).

Reset de Tempo: Volta os áudios para o segundo zero (.currentTime = 0).

Quebra de Loop (Crucial): Define audioSiren.onended = null. Isso impede que, ao parar a sirene, o navegador "pense" que ela acabou naturalmente e tente tocar a voz em seguida.

📂 Estrutura de Arquivos

Para que o sistema funcione localmente (offline) ou em um servidor simples, a estrutura de pastas deve ser rigorosamente esta:

```txt
/ (Raiz do Projeto)
├── alarme_pet.html      (O código principal)
├── script.js            (lógiaca principal)
├── style.css            (ajustes de animação)
└── assets/              (Pasta obrigatória)
    ├── sirene.mp4       (Som de alerta geral)
    ├── voz1.mp4         (Áudio falado para Xixi)
    └── voz2.mp4         (Áudio falado para Cocô)
```

🛠️ Tecnologias Utilizadas

HTML5: Estrutura semântica.

JavaScript (ES6): Lógica de controle de mídia (Audio API) e eventos.

Tailwind CSS (via CDN): Estilização utilitária para garantir responsividade, sombras, cores e animações sem escrever CSS puro complexo.

🚀 Como Usar

Salve o código HTML.

Crie a pasta assets.

Coloque seus áudios na pasta.

Abra o arquivo HTML no navegador do celular (Chrome/Safari).

(Opcional) Use a função "Adicionar à Tela Inicial" do navegador para que ele pareça um aplicativo nativo.
