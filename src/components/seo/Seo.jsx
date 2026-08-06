import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Fully Cuvved';
const SITE_URL = 'https://www.fullycuvved.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-cover.jpg`;

/**
 * Drop <Seo /> at the top of any page component's returned JSX.
 * `title` should be the page-specific part only — SITE_NAME is appended
 * automatically. `path` is the route (e.g. "/pricing") used to build the
 * canonical URL; omit it on the homepage.
 *
 * `schema` accepts one JSON-LD object or an array of them (e.g. an
 * Organization block plus a page-specific FAQPage block) — each is
 * rendered as its own <script type="application/ld+json"> for AEO/GEO
 * answer engines to parse cleanly.
 */
export default function Seo({ title, description, path = '', image = DEFAULT_OG_IMAGE, schema, noindex = false }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — UK Motor Cover Notes, Generated in Seconds`;
  const canonical = `${SITE_URL}${path}`;
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      <html lang="en-GB" />
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_GB" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />

      {schemas.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}

export { SITE_NAME, SITE_URL };
