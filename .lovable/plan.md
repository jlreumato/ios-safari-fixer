# Implementar LogoRotator do Framer no Hero

## Contexto

O site já possui um `VideoOrbit.tsx` inspirado no LogoRotator, mas ele é um anel 2D simples. O componente Framer original é um carrossel 3D orbital verdadeiro, com perspectiva, profundidade, drag/touch com momentum e rotação por scroll.

## Objetivo

Recriar fielmente o comportamento do [LogoRotator Framer](https://framer.com/m/LogoRotator-uXFCHi.js@muT7GhFtHd0h1EOqNYSf) na seção Hero, usando **Framer Motion**, mantendo a integração com os vídeos existentes e o lightbox.

## Escopo

### 1. Componente `LogoRotator.tsx`

Substituir `src/components/hero/VideoOrbit.tsx` por uma versão 3D fiel:

- **Orbita 3D inclinada**: itens distribuídos em um círculo com `radiusX`, `radiusY` e `radiusZ`, usando `perspective` no container.
- **Profundidade real**: ordenar os itens por eixo Z a cada frame e aplicar escala baseada na profundidade (itens ao fundo menores, ao frente maiores).
- **Rotação automática**: velocidade configurável, pausada ao interagir.
- **Drag/touch**: arrastar horizontalmente gira o carrossel com física de momentum.
- **Rotação por scroll**: quando a seção está no viewport, o scroll da página acrescenta velocidade à rotação.
- **Clique**: abre o `VideoLightbox` existente.
- **Responsivo**: escala reduzida em mobile/tablet sem cortar os itens.
- **Acessibilidade**: respeita `prefers-reduced-motion`.

### 2. Integração no Hero

- Atualizar `src/components/Hero.tsx` para usar `LogoRotator` no lugar de `VideoOrbit`.
- Manter o copy atual enxuto e os botões de CTA.
- Garantir que o componente não quebre o layout em telas pequenas.

### 3. Compatibilidade iOS/Safari

- Usar `-webkit-transform`, `transform-style: preserve-3d` e `-webkit-transform-style: preserve-3d`.
- `touch-action: pan-y` no container para permitir scroll vertical enquanto arrasta o carrossel.
- Alturas em `dvh` já existentes no Hero são mantidas.

### 4. Dependência

- Verificar se `framer-motion` está instalado; se não estiver, adicionar ao projeto.

## Arquivos alterados

- `src/components/hero/VideoOrbit.tsx` → reescrito como LogoRotator 3D
- `src/components/Hero.tsx` → importa e usa o novo componente
- `package.json` / `bun.lockb` → adiciona `framer-motion` se necessário

## Critérios de aceitação

- Carrossel gira continuamente em 3D no desktop e mobile.
- Drag/touch funciona com momentum.
- Scroll da página influencia a rotação quando o Hero está visível.
- Clique em qualquer item abre o lightbox de vídeo.
- Nenhum erro de build ou warning de tipo.
- Preview fluido no Safari/iOS.
