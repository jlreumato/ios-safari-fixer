

# Plano: Recriar o site da Dra. Juliana Leal no Lovable

## Visao Geral

Recriar o site completo da Dra. Juliana Leal no Lovable, com banner hero no estilo do site da Dra. Maria Eugenia (foto grande lateral + texto a esquerda + CTA WhatsApp), mantendo todo o conteudo original e melhorando design, responsividade e SEO.

## Estrutura do Site (Single Page)

### 1. SEO e Meta Tags (index.html)
- Title: "Dra. Juliana Leal | Reumatologista em Maceio - AL"
- Keywords: reumatologista, maceio, artrite reumatoide, lupus, fibromialgia, dor cronica, especialista em dor, USP
- Open Graph e Twitter Cards com dados da dra.

### 2. Header/Navbar
- Logo/nome "Dra. Juliana Leal - Reumatologia" a esquerda
- Links: Sobre Mim, A Clinica, Atuacao, Depoimentos, Blog, Contato
- Botao "Agendar Consulta" (WhatsApp) a direita
- Menu hamburger no mobile

### 3. Hero Banner (estilo dramariaeugeniafarias.com.br)
- Layout split: texto a esquerda, foto grande da dra. a direita
- Texto: nome, "Reumatologista em Maceio - AL", "Especialista em Dor | Pos-graduada pela USP-SP"
- Descricao curta + botao verde WhatsApp "Agendar Consulta"
- Background com gradiente suave rosa/lilas (mantendo identidade visual original)
- Elementos decorativos geometricos sutis

### 4. Secao Sobre Mim
- Foto + biografia completa (conteudo original)
- CRM/AL: 6717 | RQE: 4857

### 5. Secao A Clinica
- Galeria de fotos do consultorio (URLs originais)
- Lista de diferenciais (ambiente climatizado, localizacao, equipamentos, pontualidade)

### 6. Secao Areas de Atuacao
- Cards com icones: Artrites, Doencas Autoimunes, Fibromialgia e Dores
- Descricoes curtas de cada area

### 7. Secao Depoimentos
- Carousel/cards com os 3 depoimentos (Maria S., Joao P., Ana L.)

### 8. Secao Blog
- Grid de 4 artigos (Gota, Artrite Reumatoide, Lupus, Fibromialgia)
- Cards com imagem, categoria, titulo e resumo

### 9. Secao FAQ (Accordion)
- 4 perguntas frequentes com respostas expansiveis

### 10. Secao CTA Final
- "Pronta para cuidar de voce!" com botao WhatsApp

### 11. Secao Contato/Footer
- Endereco: Harmony Trade Center, Sala 318
- Telefone: (82) 99987-2509
- Google Maps embed ou link
- Redes sociais + copyright

### 12. Botao WhatsApp Flutuante
- Icone fixo no canto inferior direito

## Detalhes Tecnicos

### Arquivos a criar/modificar:
- **index.html**: Meta tags SEO, titulo, OG tags
- **src/index.css**: Paleta de cores lilas/rosa (#8e82b8, gradientes), fonte elegante
- **src/pages/Index.tsx**: Componente principal com todas as secoes
- **src/App.css**: Remover estilos default desnecessarios

### Paleta de cores (mantendo identidade da Dra. Juliana):
- Primaria: lilas #8e82b8
- Gradiente hero: rosa claro para lilas
- Textos: cinza escuro
- CTA WhatsApp: verde #25D366
- Background: branco com secoes alternadas em cinza claro

### Imagens:
- Usar URLs originais do site julianalealreumato.com.br (fotos, blog, clinica)

### Responsividade:
- Mobile-first com Tailwind
- Usar `dvh` para alturas em vez de `vh` (compatibilidade Safari/iOS)
- Prefixos `-webkit-` onde necessario
- Hero: empilhado no mobile, lado a lado no desktop

