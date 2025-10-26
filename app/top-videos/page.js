import { api } from '../lib/api'
import VideoCard from '../components/VideoCard'
import Pagination from '../components/Pagination'
import ExpandableContent from '../components/ExpandableContent'
import { generateCategoryContent } from '../lib/contentGenerator'

export const revalidate = 60

export const metadata = {
  title: 'spitxxx scout69 porndish hitbdsm pornwild tubsexer pornhits pornhut | spitxxx',
  description: 'pornmz pornwild hitbdsm freesexyindians milf300 sex18 desi49 wwwxxx xvedeo sex sister freeomovie 3gp king aunty sex adelt movies bf full hd bigfucktv | spitxxx',
  alternates: { canonical: '/top-videos' },
}

export default async function TopVideosPage({ searchParams }) {
  const page = Number(searchParams?.page || 1)
  const data = await api.getTopRated(page, 16).catch(() => ({ data: [], totalPages: 1, totalRecords: 0 }))
  const list = data.data || []
  const totalRecords = data.totalRecords || list.length || 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {page === 1 && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Top Rated Porn Videos
          </h1>
          <p className="text-gray-400 mt-2 text-sm">{totalRecords} premium HD videos</p>
        </div>
      )}

      {page > 1 && (
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Top Rated Videos - Page {page}</h1>
          <p className="text-gray-400 mt-1 text-sm">Showing page {page} of {data.totalPages || 1}</p>
        </div>
      )}

      <div className="grid video-grid">
        {list.map((v, idx) => (
          <VideoCard key={v._id || idx} video={v} />
        ))}
      </div>

      <Pagination basePath="/top-videos" currentPage={page} totalPages={data.totalPages || 1} />

      {page === 1 && (
        <ExpandableContent 
          title="About Top Rated Videos"
          content={generateCategoryContent('Top Rated', list, totalRecords)}
          defaultExpanded={false}
        />
      )}
    </div>
  )
}
