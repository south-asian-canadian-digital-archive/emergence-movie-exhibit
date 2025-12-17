import type { RequestHandler } from "./$types";

const BASE_URL = "https://sacda.ca/exhibits/emergence";

const pages = [
  { loc: "/", priority: "1.0", changefreq: "monthly" },
  { loc: "/#about", priority: "0.8", changefreq: "monthly" },
  { loc: "/#watch-now", priority: "0.9", changefreq: "monthly" },
  { loc: "/#cast", priority: "0.7", changefreq: "monthly" },
  { loc: "/#awards", priority: "0.7", changefreq: "monthly" },
  { loc: "/#other-links", priority: "0.6", changefreq: "monthly" },
];

export const GET: RequestHandler = () => {
  const lastmod = new Date().toISOString().split("T")[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=3600",
    },
  });
};
