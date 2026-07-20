## Objetivo
Melhorar o LCP e reduzir consumo de dados no mobile mostrando uma imagem estática (poster) do Hero imediatamente, com o vídeo carregando por trás sem bloquear a primeira renderização.

## Por que funciona
- Hoje o `<video>` MP4 (1.3 MB) é o primeiro grande recurso do Hero — mesmo com `preload="metadata"` ele concorre com o LCP e demora para aparecer no 4G.
- Um poster JPEG/WebP bem comprimido (~80–150 KB) aparece quase instantaneamente e vira o candidato a LCP.
- O vídeo carrega em segundo plano e faz "cross-fade" quando o primeiro frame estiver pronto (evento `loadeddata`), sem "pulo" visual.

## Passos

### 1. Gerar a imagem do poster
Criar `src/assets/hero-poster.jpg` representando a primeira cena do vídeo atual (mesma composição/cor/atmosfera para não haver "salto" quando o vídeo entrar). Usar `imagegen` no modelo `standard`, 1920×1080, mesmo mood cinematográfico lilás/champagne da marca.

### 2. Ajustar `src/components/Hero.tsx`
- Importar o poster.
- Renderizar uma `<img>` de fundo (ou `background-image`) que fica visível de imediato — recebe `fetchPriority="high"` e `decoding="async"`.
- Renderizar o `<video>` com `poster={heroPoster}`, `preload="none"` no mobile e `preload="metadata"` no desktop, `opacity: 0` até o `onLoadedData`, quando faz `opacity: 1` via transição CSS (300 ms). No mobile em conexão lenta (`navigator.connection.saveData` ou `effectiveType` in `['slow-2g','2g','3g']`), não montar o `<video>` — deixar apenas o poster.
- Manter todos os overlays e conteúdo atuais intactos (sem mudança visual).

### 3. Preload do poster
Adicionar no `<head>` do `index.html`:
```html
<link rel="preload" as="image" href="/…/hero-poster.jpg" fetchpriority="high" />
```
(usando a URL do `.asset.json` gerado pelo Lovable Assets)

### 4. Verificação
- `bun run build` (sanity check).
- Playwright headless em `http://localhost:8080`: medir `performance.getEntriesByType('largest-contentful-paint')` antes/depois; screenshot do Hero em viewport mobile (375×812) para confirmar que o visual não mudou e que o poster aparece imediatamente.

## Fora do escopo
- Não mexer em outras seções, animações ou textos.
- Não alterar o vídeo em si.

## Detalhes técnicos
- `useState(false)` para `videoReady`; `onLoadedData={() => setVideoReady(true)}` no `<video>`.
- Detecção de mobile/rede leve (executada uma vez no primeiro render):
  ```ts
  const shouldSkipVideo = () => {
    if (typeof navigator === 'undefined') return false;
    const conn = (navigator as any).connection;
    const slow = conn?.saveData || ['slow-2g','2g','3g'].includes(conn?.effectiveType);
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    return isMobile && slow;
  };
  ```
- Poster salvo via `lovable-assets` (pointer `.asset.json`) para não pesar o repo.
