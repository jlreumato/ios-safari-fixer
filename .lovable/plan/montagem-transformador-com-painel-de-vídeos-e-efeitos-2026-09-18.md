# Montagem TransformaDOR com painel de vídeos e efeitos

## O que vou construir

**1. Montagem ao vivo na seção TransformaDOR**
A montagem deixa de ser um arquivo de vídeo fixo e passa a ser montada na hora, no próprio site, a partir da lista de vídeos que você enviar:

- as cenas entram uma após a outra, em loop contínuo;
- transição de giro 360 graus entre cenas, com brilho/flash de luz no ponto de virada;
- vídeos verticais aparecem inteiros, sem corte: a cena fica centralizada e o fundo é preenchido com uma versão desfocada e escurecida do próprio vídeo (nada é cortado, nada fica com tarja preta);
- sem áudio, leve no carregamento (só a cena atual e a próxima ficam prontas).

**2. Painel de vídeos (área administrativa protegida por login)**
- enviar novos vídeos (arraste e solte ou seleção de arquivo);
- ver a lista com miniatura, duração e ordem;
- reordenar, ligar/desligar e excluir;
- ao salvar, o vídeo entra automaticamente na montagem do site — sem precisar pedir nada a mim.

**3. Painel de efeitos (na mesma área administrativa)**
Controles que valem para a montagem inteira, com pré-visualização ao lado:
- duração de cada cena (corte rápido ou longo);
- tipo de transição: giro 360, giro lateral, flash de luz, zoom, dissolver;
- intensidade do efeito de luz;
- velocidade do giro;
- slow motion por cena (velocidade de reprodução);
- ordem aleatória ligada/desligada.

Cada ajuste é salvo e aplicado no site na hora.

## Acesso

Para o painel existir de forma segura, vou ativar o backend do Lovable Cloud (banco de dados, armazenamento de vídeos e login). Você entra com e-mail e senha em `/admin` — apenas contas marcadas como administradoras conseguem abrir o painel. Visitantes do site nunca veem o painel, apenas a montagem.

## Detalhes técnicos

- **Cloud:** tabelas `transformador_videos` (url, ordem, ativo, duração, velocidade) e `transformador_settings` (linha única com os parâmetros de efeito), mais `user_roles` + função `has_role` para o papel de admin. Leitura pública apenas de vídeos ativos e das configurações; escrita restrita a admin. GRANTs explícitos em todas as tabelas.
- **Storage:** bucket público `transformador` para os arquivos de vídeo; upload direto do navegador com limite de tamanho por arquivo.
- **Montagem:** novo componente `src/components/transformador/MontageStage.tsx` — dois elementos `<video>` alternando (atual/próxima), transições com Framer Motion (`rotateY`/`rotateZ` em contexto `perspective`, camada de luz com `mix-blend-screen` e gradiente radial), `object-contain` na cena + camada `object-cover blur` como fundo.
- **Integração:** `src/pages/Transformador.tsx` e a seção do Index passam a usar `MontageStage`, com o vídeo atual como fallback quando a lista estiver vazia.
- **Painel:** rota `/admin` (`src/pages/Admin.tsx`) com duas abas — Vídeos e Efeitos — usando os componentes de UI já existentes; pré-visualização reaproveita `MontageStage`.
- Respeita `prefers-reduced-motion` (troca simples por dissolver) e mantém a estética champagne/branco.
