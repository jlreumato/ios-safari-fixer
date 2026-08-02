# Hero com galeria flutuante de vídeos

Nova hero em duas camadas: o vídeo atual continua como fundo cinematográfico (escurecido), e sobre ele flutuam cards de vídeo — entrevistas e procedimentos — com parallax suave. Headline e galeria dividem o espaço 50/50.

## Layout (desktop)

```text
┌──────────────────────────────────────────────────────────┐
│  CRM/RQE                          ┌──────┐               │
│                          ┌──────┐ │ 16:9 │               │
│  Humanidade para         │ 9:16 │ │ card │  ┌──────┐     │
│  transformar sua DOR     │ card │ └──────┘  │ 9:16 │     │
│  em LIBERDADE!           └──────┘           │ card │     │
│                                  ┌──────┐   └──────┘     │
│  [Agendar Consulta] [Conheça]    │ 16:9 │               │
│                                  └──────┘               │
└──────────────────────────────────────────────────────────┘
```

- Coluna esquerda: badge CRM, headline (escala reduzida ~15% para o equilíbrio 50/50), subtítulo, CTAs — animações de entrada atuais preservadas.
- Coluna direita: 4-5 cards agrupados em cluster compacto, com pouco espaço entre eles, em profundidades diferentes (escala + blur leve nos mais distantes), cantos retos, moldura de linha fina champagne, sombra suave.
- Cada card exibe a thumbnail do vídeo + badge de duração/origem e um botão de play champagne. Legenda curta ("Entrevista TV Pajuçara", "Infiltração guiada", etc.).

## Movimento

- Cards posicionados próximos uns dos outros; em alguns momentos do ciclo de flutuação eles se sobrepõem em até ~20% da largura/altura do card, e depois se separam novamente.
- `z-index` por profundidade fixo (o card da frente sempre passa por cima), com a sombra do card frontal reforçada no momento da sobreposição para dar sensação de camadas.
- Flutuação contínua e dessincronizada (translate Y/X sutil, ~6-10s por ciclo, amplitudes e fases diferentes por card para gerar os encontros), suavizada e desativada com `prefers-reduced-motion`.
- Parallax leve pelo movimento do mouse (desktop apenas), com limite pequeno para não distrair.
- Entrada em stagger junto com a headline.


## Interação

- Clique/tap em um card abre um lightbox em tela cheia com o embed real (YouTube `iframe` ou Instagram `blockquote` + script oficial), fundo escuro, fechar por X / Esc / clique fora.
- Foco visível no teclado, `aria-label` por card, lightbox com trap de foco.

## Mobile

- Sem parallax de mouse: os cards viram um carrossel horizontal `snap-x` abaixo dos CTAs, com a flutuação mantida em amplitude reduzida.
- `touch-action: pan-x` nos cards para o scroll vertical da página continuar livre (mesmo padrão já usado em Tratamentos).
- Vídeo de fundo continua com o loop de 5s existente e o poster estático.

## Conteúdo

Preciso dos links dos vídeos (Instagram/YouTube). Vou implementar com um arquivo de dados `src/data/heroVideos.ts` contendo 5 entradas de exemplo (plataforma, id/url, título, thumbnail) — assim você me envia os links e eu só troco os valores, ou você mesmo edita.

## Detalhes técnicos

- `src/components/Hero.tsx`: refatorado para grid de duas colunas; mantém poster LCP, `dvh`, prefixos `-webkit-`.
- Novos componentes: `src/components/hero/FloatingVideoGallery.tsx`, `src/components/hero/VideoCard.tsx`, `src/components/hero/VideoLightbox.tsx`.
- `src/data/heroVideos.ts`: fonte dos itens da galeria.
- Thumbnails: YouTube via `i.ytimg.com`; Instagram não expõe thumb pública, então uso frames extraídos/imagens existentes salvos como assets CDN.
- Embeds carregam só ao abrir o lightbox (nada de iframe no load inicial) — sem impacto no LCP.
- Keyframes de flutuação em `src/index.css`, animações via CSS transform (composited) para o Safari iOS.
