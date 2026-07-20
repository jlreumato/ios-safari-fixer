import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  jsonLd?: object | object[];
};

const BASE = "https://julianalealreumato.com.br";

export default function Seo({ title, description, path, type = "website", jsonLd }: Props) {
  const url = `${BASE}${path}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="pt_BR" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
}
