import Link from 'next/link'
import { api } from '../../lib/api'
import VideoCard from '../../components/VideoCard'
import Pagination from '../../components/Pagination'

export async function generateMetadata({ params, searchParams }) {
  const tag = decodeURIComponent(params.tag)
  const page = Number(searchParams?.page || 1)
  const titleTag = tag.replace(/-/g, ' ')
  // Fetch minimal data to enrich meta (total count + first image)
  let totalRecords = 0
  let totalPages = 1
  let ogImage = null
  try {
    const res = await api.getPostsByTag(tag, 1, 1)
    const first = (res?.records || res?.data || [])[0]
    totalRecords = Number(res?.totalRecords || 0)
    totalPages = Number(res?.totalPages || 1)
    ogImage = first?.imageUrl || null
  } catch {}

  const baseTitle = `${titleTag} Porn Videos`
  const title = page > 1
    ? `${baseTitle} – Page ${page} | Spitxxx`
    : `${baseTitle} – Free ${titleTag} Sex in HD | Spitxxx`

  const description = page > 1
    ? `Browse page ${page}${totalPages ? ` of ${totalPages}` : ''} for the best ${titleTag} porn videos in HD on Spitxxx. Free streaming, updated daily.${totalRecords ? ` ${totalRecords}+ videos available.` : ''}`
    : `Watch the best ${titleTag} porn videos in HD on Spitxxx. Free streaming, updated daily.${totalRecords ? ` ${totalRecords}+ videos available.` : ''}`

  const canonicalBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://spitxxx.com'
  const canonical = page > 1
    ? `${canonicalBase}/tag/${params.tag}/${page}`
    : `${canonicalBase}/tag/${params.tag}`

  return {
    title,
    description,
    alternates: { canonical },
    keywords: [
      `${titleTag} porn`, `${titleTag} sex videos`, `${titleTag} hd`, `${titleTag} xxx`,
      'spitxxx', 'free porn', 'hd porn videos'
    ],
    robots: {
      index: true,
      follow: true,
      maxImagePreview: 'large',
      maxSnippet: -1,
      maxVideoPreview: -1,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      images: ogImage ? [{ url: ogImage } ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

async function getData(tag, page) {
  const list = await api.getPostsByTag(tag, page, 16).catch(() => ({ data: [], records: [], totalPages: 1, totalRecords: 0 }))

  const items = list.data || list.records || []
  const totalPages = list.totalPages || 1
  const totalRecords = list.totalRecords || items.length || 0

  return { list: items, totalPages, totalRecords }
}

export default async function TagPage({ params, searchParams }) {
  const tag = decodeURIComponent(params.tag)
  const page = Number(params.page || searchParams?.page || 1)
  const { list, totalPages, totalRecords } = await getData(tag, page)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold capitalize">{tag.replace(/-/g, ' ')} Sex Videos</h1>
        <p className="text-gray-400 mt-1 text-sm">Showing page {page} of {totalPages} ({totalRecords} total videos)</p>
      </div>

      <div className="grid video-grid">
        {list.map((v, idx) => (
          <VideoCard key={v._id || idx} video={v} />
        ))}
      </div>

      <Pagination basePath={`/tag/${params.tag}`} currentPage={page} totalPages={totalPages} />
    </div>
  )
}
