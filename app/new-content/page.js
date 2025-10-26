import { api } from '../lib/api'
import VideoCard from '../components/VideoCard'
import Pagination from '../components/Pagination'
import ExpandableContent from '../components/ExpandableContent'
import { generateCategoryContent } from '../lib/contentGenerator'

export const revalidate = 60

export const metadata = {
  title: 'spitxxx fsiblog df6 org df6org dinotube draftsex drtuber fsiblog com |',
  description: 'gekso fsiblog com fsiblog fry99 com english bf video elephant tube bad wap beeg hindi draftsex dinotube df6 org tiktits 3gp king icegay xxxhd sex18 imo sex | spitxxx',
  alternates: { canonical: '/new-content' },
}

export default async function NewContentPage({ searchParams }) {
  const page = Number(searchParams?.page || 1)
  const res = await api.getNewVideos(page, 16).catch(() => ({ data: [], records: [], videos: [], totalPages: 1, totalRecords: 0 }))
  const list = res.records || res.data || res.videos || []
  const totalPages = res.totalPages || (res.totalRecords ? Math.max(1, Math.ceil(Number(res.totalRecords) / 16)) : 1)
  const totalRecords = res.totalRecords || list.length || 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {page === 1 && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            New Content - Latest Porn Videos
          </h1>
          <p className="text-gray-400 mt-2 text-sm">{totalRecords} fresh HD videos</p>
        </div>
      )}

      {page > 1 && (
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">New Content - Page {page}</h1>
          <p className="text-gray-400 mt-1 text-sm">Showing page {page} of {totalPages}</p>
        </div>
      )}

      <div className="grid video-grid">
        {list.map((v, idx) => (
          <VideoCard key={v._id || idx} video={v} />
        ))}
      </div>

      <Pagination basePath="/new-content?" currentPage={page} totalPages={totalPages} />

      {page === 1 && (
        <ExpandableContent 
          title="About New Content"
          content={generateCategoryContent('Latest', list, totalRecords)}
          defaultExpanded={false}
        />
      )}
    </div>
  )
}
