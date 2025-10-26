import { NextResponse } from 'next/server'

export const revalidate = 3600

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spitxxx.com'
  const currentDate = new Date().toISOString().split('T')[0]

  const staticUrls = [
    '/',
    '/categories',
    '/tags',
    '/pornstars',
    '/search',
  ]

  const urlEntries = staticUrls.map(url => `
  <url>
    <loc>${siteUrl}${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
