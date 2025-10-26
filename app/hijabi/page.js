import { api } from '../lib/api'
import VideoCard from '../components/VideoCard'
import Pagination from '../components/Pagination'
import ExpandableContent from '../components/ExpandableContent'
import { generateCategoryContent } from '../lib/contentGenerator'

export const revalidate = 60

export const metadata = {
  title: 'Hijabi Videos',
  description: 'Watch Hijabi videos on spitxxx with high-quality streaming.',
  alternates: { canonical: '/hijabi' },
}

export default async function HijabiPage({ searchParams }) {
  const page = Number(searchParams?.page || 1)
  const res = await api.getHijabi(page, 16).catch(() => ({ data: [], records: [], totalPages: 1, totalRecords: 0 }))
  const listRaw = Array.isArray(res) ? res : (res.data || res.records || res.hijabi || [])
  const list = Array.isArray(listRaw) ? listRaw : []
  const totalPages = (res.totalPages || (res.totalRecords ? Math.max(1, Math.ceil(Number(res.totalRecords) / 16)) : 1)) || 1
  const totalRecords = res.totalRecords || list.length || 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {page === 1 && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Hijabi Porn Videos
          </h1>
          <p className="text-gray-400 mt-2 text-sm">{totalRecords} premium HD videos</p>
        </div>
      )}

      {page > 1 && (
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Hijabi Videos - Page {page}</h1>
          <p className="text-gray-400 mt-1 text-sm">Showing page {page} of {totalPages}</p>
        </div>
      )}

      <div className="grid video-grid">
        {list.map((v, idx) => (
          <VideoCard key={v._id || idx} video={v} />
        ))}
      </div>

      <Pagination basePath="/hijabi?" currentPage={page} totalPages={totalPages} />

      {page === 1 && (
        <ExpandableContent 
          title="About Hijabi Porn Videos"
          content={generateCategoryContent('Hijabi', list, totalRecords)}
          defaultExpanded={false}
        />
      )}
    </div>
  )
}
