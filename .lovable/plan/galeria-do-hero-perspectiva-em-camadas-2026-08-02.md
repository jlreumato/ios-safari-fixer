# Galeria do Hero: Perspectiva em Camadas

Reconstruir a galeria de vídeos flutuantes do hero seguindo a direção escolhida: uma cena em perspectiva 3D com cinco cartões em profundidades diferentes, um deles em destaque central.

## Composição (desktop)

- Cena com `perspective: 1200px` na coluna direita do hero.
- Cinco posições fixas, cada uma com rotação e profundidade próprias:
  - Reel vertical à esquerda, recuado ao fundo (rotação para dentro).
  - Entrevista 16:9 no topo direito, levemente recuada.
  - Reel vertical central em destaque, à frente de todos, com brilho champagne suave e um ponto pulsante discreto.
  - Reel vertical inferior direito, em profundidade intermediária.
  - Entrevista 16:9 inferior esquerda, mais ao fundo.
- Cartões mantêm cantos retos, borda fina champagne (mais opaca no destaque), capa do vídeo com gradiente escuro na base, etiqueta de origem em caixa alta espaçada e título curto.
- Botão de play em quadrado de linha fina champagne com triângulo, maior no cartão central.

## Movimento

- Flutuação contínua e dessincronizada por cartão (deslocamento vertical mínimo + respiração de escala), mantendo a profundidade de cada um.
- Hover: borda champagne cheia, o cartão avança na profundidade e clareia; o central escala levemente.
- Parallax suave conforme o mouse na área da galeria (leve inclinação da cena inteira).
- Sem animação piscante e sem `alternate` infinito no fade de entrada — os cartões entram uma vez e permanecem visíveis.

## Mobile

- A cena em perspectiva vira um empilhamento vertical compacto com leve escalonamento e inclinação, sem overflow horizontal.
- Parallax de mouse desativado; flutuação reduzida para preservar desempenho.

## Comportamento

- Mesmos cinco vídeos e capas atuais (`src/data/heroVideos.ts`), sem trocar conteúdo.
- Clique/toque continua abrindo o lightbox existente, com o recorte do embed do Instagram preservado.
- O vídeo de fundo permanece em preto e branco, sem alterações no texto do hero.

## Detalhes técnicos

- `src/components/hero/FloatingVideoGallery.tsx`: substituir o cluster atual pelo layout de perspectiva com um array de configuração (posição, largura, `rotateY`, `translateZ`, atraso da flutuação, destaque).
- `src/components/hero/VideoCard.tsx`: aceitar variação de tamanho/destaque (etiqueta, tamanho do play, intensidade da borda e do gradiente).
- `src/index.css`: ajustar/criar as keyframes de flutuação por camada e a classe de brilho do cartão central; usar `translate3d` e prefixos `-webkit-` com `transform-style: preserve-3d` para o Safari iOS.
- Sem mudanças em dados, rotas ou SEO.
