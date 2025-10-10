import { api } from '../../lib/api'
import VideoCard from '../../components/VideoCard'
import Pagination from '../../components/Pagination'

export const revalidate = 60

export async function generateMetadata({ params, searchParams }) {
  const name = decodeURIComponent(params.name)
  const page = Number(searchParams?.page || 1)
  const displayName = name.replace(/-/g, ' ')
  const title = `spitxxx - ${displayName} xvids porno missax trisha paytas porn`
  const description = `sexy movie super movie ${displayName}. chinese family sex huge tits Porn Videos big natural boobs download vporn sex videos`

  const canonicalBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://spitxxx.com'
  const canonical = `${canonicalBase}/pornstar/${params.name}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'profile',
    },
  }
}

async function getData(name, page) {
  const res = await api.getPornstarVideos(name, page, 16).catch(() => ({ records: [], data: [], totalPages: 1, totalRecords: 0 }))
  return { list: res.records || res.data || [], totalPages: res.totalPages || 1, totalRecords: res.totalRecords || 0 }
}

export default async function PornstarPage({ params, searchParams }) {
  const name = decodeURIComponent(params.name)
  const page = Number(params.page || searchParams?.page || 1)
  const { list, totalPages, totalRecords } = await getData(name, page)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold capitalize">{name.replace(/-/g, ' ')} Porn Videos</h1>
        <p className="text-gray-400 mt-1 text-sm">Showing page {page} of {totalPages} ({totalRecords} total videos)</p>
      </div>

      <div className="grid video-grid">
        {list.map((v, idx) => (
          <VideoCard key={v._id || idx} video={v} />
        ))}
      </div>

      <Pagination basePath={`/pornstar/${params.name}`} currentPage={page} totalPages={totalPages} />
    </div>
  )
}
