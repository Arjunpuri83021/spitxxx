import Link from 'next/link'
import { api } from '../lib/api'
import VideoCard from '../components/VideoCard'
import Pagination from '../components/Pagination'
import ExpandableContent from '../components/ExpandableContent'
import { generateCategoryContent } from '../lib/contentGenerator'

export const revalidate = 60

export const metadata = {
  title: 'spitxxx bad wap wwwxxx xvedeo sexv icegay sex sister tiktits |spitxxx',
  description: 'xmoviesforyou aunty sex wwwxxx sex sister aunty sexy video bad wap beeg hindi badwap badwap com sexv tiktits boobs kiss boobs pressing borwap boudi sex | spitxxx',
  alternates: { canonical: '/most-liked' },
}

export default async function PopularPage({ searchParams }) {
  const page = Number(searchParams?.page || 1)
  const data = await api.getPopularVideos(page, 16).catch(() => ({ records: [], totalPages: 1, totalRecords: 0 }))
  const list = data.records || []
  const totalRecords = data.totalRecords || list.length || 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {page === 1 && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Most Popular Porn Videos
          </h1>
          <p className="text-gray-400 mt-2 text-sm">{totalRecords} trending HD videos</p>
        </div>
      )}

      {page > 1 && (
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Popular Videos - Page {page}</h1>
          <p className="text-gray-400 mt-1 text-sm">Showing page {page} of {data.totalPages || 1}</p>
        </div>
      )}

      <div className="grid video-grid">
        {list.map((v, idx) => (
          <VideoCard key={v._id || idx} video={v} />
        ))}
      </div>

      <Pagination basePath="/most-liked" currentPage={page} totalPages={data.totalPages || 1} />

      {page === 1 && (
        <ExpandableContent 
          title="About Most Popular Videos"
          content={generateCategoryContent('Most Popular', list, totalRecords)}
          defaultExpanded={false}
        />
      )}
    </div>
  )
}
