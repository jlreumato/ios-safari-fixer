## Objetivo

Reduzir o consumo inicial de JS, imagens e listeners de scroll no mobile carregando as seções abaixo da dobra (`About`, `Clinic`, `TreatmentsGrid`, `Procedures`, `WhatsAppForm`, `Testimonials`, `FAQ`, `CTASection`) apenas quando estiverem próximas do viewport. As animações de entrada passam a ser disparadas no momento em que cada seção entra na tela.

## Por que faz sentido

Hoje o `Index.tsx` monta todas as seções de uma só vez, mesmo as que o usuário nunca rola até. No mobile isso significa:

- Todo o bundle/imagens das seções inferiores competem com o LCP.
- Listeners de scroll das seções `Procedures` e `CTASection` são registrados logo no primeiro render.
- O Marquee de depoimentos começa a animar fora da tela.

Com lazy loading por seção, o primeiro paint fica mais leve e o usuário só paga pelo que visualiza.

## O que não muda

- `IntroCover`, `Header`, `Hero`, `Footer`, `WhatsAppButton` e `BackToTop` continuam eager (são críticos para a primeira experiência).
- Navegação por âncoras (`/#tratamentos-resumo`, `#procedimentos`) continua funcionando.
- As animações de scroll-driven (`CTASection`, `Procedures`) continuam funcionando, porque serão montadas com antecedência (`rootMargin`) para que seus cálculos de altura/progresso sejam feitos antes de ficarem visíveis.

## Passos

### 1. Criar hook reutilizável `src/hooks/useInView.ts`

Um único `IntersectionObserver` por elemento, com parâmetros:

- `threshold` padrão `0.15`
- `rootMargin` configurável (ex: `"0px"` para reveal simples, `"300px"` para seções scroll-driven)
- `triggerOnce` padrão `true`
- Retorna `{ ref, inView }`

Isso elimina as cópias do `useReveal` espalhadas em `About.tsx`, `Clinic.tsx` e `Testimonials.tsx`.

### 2. Criar componente `src/components/LazySection.tsx`

Wrapper que:

1. Renderiza um placeholder `div` com altura mínima aproximada da seção (evita layout shift brusco).
2. Observa o placeholder com `rootMargin`.
3. Monta os `children` quando o placeholder entra na zona de pré-carregamento.
4. Passa `inView` para os filhos via render prop, permitindo que cada seção dispare sua animação de entrada no momento certo.

```tsx
<LazySection rootMargin="300px" minHeight="100vh">
  {(inView) => <CTASection reveal={inView} />}
</LazySection>
```

### 3. Aplicar lazy loading nas seções da home

Em `src/pages/Index.tsx`, envolver as seções abaixo da dobra:

- `About` — `rootMargin="200px"`
- `Clinic` — `rootMargin="200px"`
- `TreatmentsGrid` — `rootMargin="200px"`
- `Procedures` — `rootMargin="400px"` (precisa de mais margem por causa das animações scroll-driven e altura de 800vh)
- `WhatsAppForm` — `rootMargin="200px"`
- `Testimonials` — `rootMargin="200px"`
- `FAQ` — `rootMargin:"200px"`
- `CTASection` — `rootMargin="400px"` (altura 300vh, precisa montar cedo)

Cada componente receberá uma prop `reveal: boolean` e ajustará sua animação de entrada para iniciar quando `reveal` for `true`.

### 4. Adaptar componentes para animar ao entrar na tela

- `About`, `Clinic`, `Testimonials`: substituir o `useReveal` local pelo `useInView` do hook global e/ou pela prop `reveal` vinda do `LazySection`.
- `FAQ`: manter o stagger existente, mas iniciá-lo a partir do momento em que a seção se torna visível.
- `TreatmentsGrid`: manter o `IntersectionObserver` dos cards, mas garantir que o container só comece a observar após o mount lazy.
- `CTASection`: manter o scroll progress, mas adicionar uma transição de fade-in suave quando `reveal` passar de `false` para `true`.
- `Procedures`: manter o `ArrowSliceReveal` e `JointsWheel`, mas adicionar fade-in inicial controlado por `reveal`.

### 5. Garantir acessibilidade e SEO

- O placeholder deve ter o mesmo `id` da seção (ex: `id="sobre"`) para que links de âncora funcionem mesmo antes do mount.
- Adicionar `aria-busy="true"` no placeholder e `aria-busy="false"` após o mount.
- Para usuários sem JavaScript, o placeholder pode conter o conteúdo estático em `noscript`.

### 6. Otimizações adicionais no mobile

- No `Testimonials`, pausar o CSS animation do `MarqueeRow` enquanto a seção não estiver visível (usando `animation-play-state: paused`).
- No `Hero`, manter a lógica atual de poster/vídeo (já otimizada).
- Considerar desmontar seções que saíram muito do viewport? **Não recomendado** — causa perda de estado e re-renderizações caras. O plano é montar uma vez (`triggerOnce`).

## Fora do escopo

- Code-split de rotas internas (`Blog`, `Procedimentos`, `Tratamentos`, `TratamentoDetalhe`) — o usuário optou por não priorizar isso agora.
- Alterar o design visual das seções.
- Trocar imagens ou textos.

## Detalhes técnicos

- `LazySection` usará `React.lazy` internamente? Não. O ganho vem do atraso do mount, não de split de chunk. Se quisermos split de chunk no futuro, basta trocar a importação do componente por `React.lazy` sem mexer no wrapper.
- O `rootMargin` positivo faz com que o observer dispare antes do elemento estar visível, dando tempo de montar e calcular layouts.
- Para seções scroll-driven, o placeholder precisa ter altura aproximada correta. Se a altura for dinâmica (ex: `800vh`), usamos `minHeight` igual à altura real da seção.

## Verificação

1. `bun run build` — sanity check de compilação.
2. Playwright headless em viewport mobile (375×812):
   - Medir `performance.getEntriesByType('largest-contentful-paint')` antes e depois.
   - Verificar que `About` só monta após scroll.
   - Verificar que animações de `CTASection` e `Procedures` ainda funcionam.
   - Testar link de âncora `/#tratamentos-resumo` vindo de outra página.
3. Lighthouse mobile para confirmar redução no TBT/CLS.

## Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| Layout shift ao montar seção | Placeholder com `minHeight` igual à altura real da seção |
| Animação scroll-driven quebra porque montou tarde | `rootMargin` maior (400px) para `Procedures` e `CTASection` |
| Âncora não funciona antes do mount | Placeholder carrega o `id` da seção |
| Reveal não dispara se usuário rola muito rápido | `threshold` baixo (0.05) + `rootMargin` generoso |
