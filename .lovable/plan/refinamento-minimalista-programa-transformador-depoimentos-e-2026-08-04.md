# Refinamento minimalista + Programa TransformaDOR + Depoimentos em vídeo

## 1. Direção minimalista (moderada) em todo o site

Redução de ~40% dos textos e mais respiro visual, mantendo o contexto essencial.

- **Regras de espaçamento**: padronizar seções em `py-28 lg:py-40`, títulos com `mb-16`, largura máxima de parágrafo em `max-w-[46ch]`.
- **Tipografia**: manter Cormorant Garamond nos títulos e DM Sans no corpo; subir o corpo para 18–19px, peso light, e usar letter-spacing amplo nos eyebrows (`tracking-[0.28em]`).
- **Enxugamento por seção**:
  - Sobre: reduzir a bio para 2 parágrafos curtos + 3 credenciais em lista seca.
  - Locais de atendimento: manter apenas nome, endereço e ação; remover descrições longas.
  - Tratamentos e Procedimentos: título + 1 frase por card (cortar textos de apoio duplicados).
  - FAQ: respostas em até 3 linhas.
  - CTA final: uma frase + botão (sem parágrafo de reforço).
- Remover molduras/caixas decorativas redundantes, deixando as imagens e o espaço branco carregarem o peso visual.

## 2. Componentes novos a partir dos códigos enviados

Os códigos do Framer serão reescritos como componentes React + Tailwind usando os tokens do site (champagne/dourado sobre claro, cantos retos, linhas finas):

- **ProcessSteps** (do HTML `HowTo` colado): lista numerada com círculos, linha vertical contínua, acordeão com título que "preenche" da esquerda para a direita no hover/ativo e marcação temporal à direita. Será a espinha dorsal da nova página `/transformador` (e não substitui as 8 Etapas da home). Inclui JSON-LD `HowTo`, herdado do código original.
- **ScrollFadeText**: revelação de texto palavra a palavra conforme o scroll — aplicada aos títulos de abertura da home e da página `/transformador`.
- **InverseQuote**: bloco de citação com inversão de cor no scroll — usado na seção Sobre e na abertura dos depoimentos.
- **ReelCarousel**: carrossel de vídeos verticais 9:16 — base da nova seção de depoimentos.

Referências de leveza (luxury-spa / tidy-aspects) serão usadas para calibrar espaçamento, contraste suave e ritmo de animação.

## 3. Página `/transformador`

- Nova rota `/transformador` com `Seo` próprio (title, description, canonical, JSON-LD `HowTo`), Header, Footer, WhatsApp e loading splash da logo (já coberto pelo `RouteLoader`).
- Conteúdo: abertura com a marca do programa, o que é o programa, para quem é, a equipe multidisciplinar (fisioterapeuta, nutricionista, psicólogo, psiquiatra), as 8 etapas completas via `ProcessSteps`, resultados esperados e CTA/formulário WhatsApp.
- Na home, a seção do Programa TransformaDOR passa a ser um teaser enxuto (marca + 1 frase + botão "Conhecer o Programa") e **as 8 Etapas permanecem na home** como estão hoje.
- Efeito de entrada solicitado: ao entrar na seção do teaser, a cena rotaciona no eixo Y (como se o site inteiro girasse de lado, `rotateY` + `perspective`), revelando o painel do programa; o clique/scroll conclui a transição levando à página.

## 4. Grafia "TransformaDOR"

Criar componente `<TransformaDor />` usado em todos os lugares onde a marca aparece:

- `Transforma` + `DOR` em um único `<span>` com `whitespace-nowrap`, sem hifenização ou quebra.
- Redimensionamento fluido por `clamp()` para caber em qualquer largura de tela sem quebrar a palavra.
- `DOR` em destaque (dourado/peso maior), `Transforma` em peso normal.
- Substituir todas as ocorrências textuais atuais por esse componente.

## 5. Depoimentos em vídeo vertical

- Substituir o marquee de cards de texto por um **carrossel de reels verticais (9:16)**: capa + play, nome do paciente e uma linha de contexto; abre no lightbox existente (`VideoLightbox`) em modo vertical.
- Como ainda não há vídeos reais, a estrutura nasce com **placeholders** (capa neutra champagne + rótulo "Depoimento em breve"), alimentada por um único arquivo de dados `src/data/testimonialVideos.ts` no mesmo formato do `heroVideos.ts` — trocar por links reais depois é apenas editar esse arquivo.
- Mobile: swipe lateral com snap, um vídeo por vez; desktop: 3 visíveis com o central em destaque.

## Detalhes técnicos

- Novos arquivos: `src/pages/Transformador.tsx`, `src/components/transformador/ProcessSteps.tsx`, `src/components/TransformaDor.tsx`, `src/components/testimonials/ReelCarousel.tsx`, `src/components/ScrollFadeText.tsx`, `src/components/InverseQuote.tsx`, `src/data/testimonialVideos.ts`.
- Rota adicionada em `src/App.tsx` acima do catch-all.
- Edições: `src/components/Procedures.tsx` (teaser + giro lateral), `src/components/Testimonials.tsx` (reels), `src/components/Header.tsx` (item de menu "Programa"), `public/sitemap.xml` (nova URL), além do enxugamento de texto em About, Clinic, TreatmentsGrid, FAQ, CTASection.
- Compatibilidade iOS/Safari mantida: `-webkit-` nas transformações 3D, `dvh` em alturas, sem `background-attachment: fixed`.
- Vídeos verticais com `loading="lazy"`, embeds só montados ao abrir o lightbox.
