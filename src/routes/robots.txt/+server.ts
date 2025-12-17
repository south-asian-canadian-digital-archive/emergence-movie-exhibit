import type { RequestHandler } from "./$types";

export const GET: RequestHandler = () => {
  const robotsTxt = `# Robots.txt for Emergence: Out of the Shadows Exhibit
# https://sacda.ca/exhibits/emergence/

User-agent: *
Allow: /

# Sitemap location
Sitemap: https://sacda.ca/exhibits/emergence/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "max-age=86400",
    },
  });
};
