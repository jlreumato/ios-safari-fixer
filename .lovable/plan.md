# Otimizar o LogoRotator 3D do Hero

## Diagnóstico confirmado

O componente atual chama `setTick` em todo `requestAnimationFrame`. Isso força o React a renderizar novamente todo o `VideoOrbit`, recalculando dimensões, posições 3D, profundidade, ordenação e estilos de todos os vídeos a cada frame. O componente também consulta dimensões do DOM durante a renderização. Esse fluxo pode travar ou engasgar no preview, especialmente em telas Retina, celulares e Safari.

## Implementação

1. **Retirar a animação contínua do ciclo de renderização do React**
   - Manter React apenas para estado estrutural: vídeo aberto, hover e dimensões responsivas.
   - Atualizar posição, escala, profundidade e `z-index` dos cards diretamente por referências DOM dentro do loop de animação.

2. **Reduzir cálculos por frame**
   - Pré-calcular dimensões e ângulos-base dos itens.
   - Medir o container somente no `ResizeObserver`, sem `getBoundingClientRect()` durante a renderização.
   - Limitar o delta de tempo após troca de aba ou interrupções do navegador para evitar saltos.

3. **Controlar quando a animação roda**
   - Pausar o loop quando o Hero estiver fora da área visível ou a aba estiver oculta.
   - Manter rotação automática, drag/touch com momentum e influência do scroll apenas quando necessários.
   - Em `prefers-reduced-motion`, exibir uma composição 3D estática e totalmente utilizável.

4. **Preservar experiência e compatibilidade**
   - Manter o mesmo visual orbital, lightbox, hover, responsividade e interação por toque.
   - Preservar `translate3d`, prefixos `-webkit-`, `touch-action: pan-y` e alturas compatíveis com iOS/Safari.
   - Evitar que um pequeno movimento de drag abra o vídeo acidentalmente.

## Validação

- Verificar no preview desktop e mobile que a órbita permanece fluida sem bloquear scroll ou cliques.
- Testar rotação automática, drag com momentum, scroll, abertura/fechamento do lightbox e redimensionamento.
- Confirmar ausência de erros de runtime e regressões visuais no Hero.