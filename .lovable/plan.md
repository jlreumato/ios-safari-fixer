# Nova capa: retrato editorial com vídeo discreto

A primeira tela deixa de ser um vídeo cheio de cortes e passa a ser uma capa de revista: fundo claro champagne, movimento contínuo e suave, a Dra. Juliana presente de forma elegante — sem roubar a atenção do texto.

## Como a capa vai ficar

Três camadas sobrepostas, todas em tom claro e quente:

1. **Fundo de luz viva** — um degradê champagne/marfim com um brilho dourado que se move muito lentamente (respiração de 20 s), mais um leve grão de papel. Nada de cores escuras ou saturadas.
2. **Vídeo discreto em preto e branco suave** — o material atual reaproveitado, mas em ritmo lento (sem cortes em flash), com pouca opacidade e recortado dentro de uma forma vertical alta de cantos levemente arredondados, alinhada à direita. Ele funciona como textura, não como protagonista.
3. **Retrato da Dra. Juliana** — foto tratada em tom quente, encaixada nessa mesma coluna vertical, com a borda inferior dissolvendo no fundo. Ela aparece em segundo plano, discreta, sem sobrepor o texto.

À esquerda (e centralizado no celular) fica a tipografia:

- linha fina em maiúsculas: REUMATOLOGIA · ESPECIALISTA EM DOR
- título em Cormorant Garamond: "Viver com DOR não é NORMAL."
- credenciais: DRA. JULIANA LEAL · CRM/AL 6717 · RQE 4857 / Pós-graduada em Dor Crônica pela USP
- botões atuais (WhatsApp + Conheça a Dra. Juliana) e o indicador de rolagem

```text
desktop                                mobile
+----------------------------+          +--------------+
|                    ______  |          |   ______     |
|  REUMATOLOGIA     |      | |          |  |      |    |
|  Viver com DOR    | foto | |          |  | foto |    |
|  não é NORMAL.    |  +   | |          |  |  +   |    |
|  CRM · RQE        | vídeo| |          |  | vídeo|    |
|  [WhatsApp] [Sobre]|_____| |          |  |______|    |
|                            |          |  texto+CTAs  |
+----------------------------+          +--------------+
```

## Movimento (nível 4 de 5)

- brilho dourado que desliza e pulsa lentamente atrás do retrato
- vídeo em velocidade reduzida, sempre em loop, sem cortes bruscos
- retrato entra com zoom leve e contínuo (efeito Ken Burns muito sutil)
- texto e botões surgem de baixo para cima ao carregar; o título aparece palavra por palavra
- ao rolar, retrato e brilho se afastam em ritmos diferentes (parallax leve)
- quem prefere menos animação (ajuste do sistema) vê a capa parada

## Detalhes técnicos

- `src/components/Hero.tsx` reescrito em grade de 2 colunas no desktop (`lg:grid-cols-12`, texto 6 colunas / mídia 6) e empilhado no mobile, mantendo `min-h-[100dvh]` e a lógica de `revealed`.
- Nova camada `src/components/hero/CoverBackdrop.tsx`: degradê animado por keyframes CSS, grão em SVG, máscara vertical (`mask-image` com `-webkit-mask-image`) para dissolver retrato e vídeo no fundo.
- Vídeo: `hero-reel-juliana.mp4` existente com `playbackRate` reduzido, `muted/loop/playsInline`, `poster` para o primeiro quadro, filtro `grayscale`/`sepia` leve e `opacity` baixa; `preload="metadata"` no mobile para não pesar.
- Retrato: `src/assets/dra-juliana-about.jpg` (ou `dra-juliana-leal.webp`), servido com `loading="eager"` e `object-position` ajustado ao rosto.
- Todas as cores novas entram como tokens em `src/index.css` (champagne, dourado, tinta) — sem classes de cor fixas nos componentes.
- Prefixos `-webkit-` e unidades `dvh` mantidos; `prefers-reduced-motion` desliga as animações.
- `VideoMosaic`/`VideoOrbit` deixam de ser usados na capa; os vídeos do Instagram continuam disponíveis nas outras seções.

## Fora do escopo

Nenhuma outra seção muda. Se depois quiser um retrato novo em estúdio (fundo claro, luz suave), gero a imagem separadamente.
