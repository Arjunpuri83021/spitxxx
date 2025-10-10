import { api } from '../lib/api'
import VideoCard from '../components/VideoCard'
import Pagination from '../components/Pagination'

export const revalidate = 60

export const metadata = {
  title: 'spitxxx scout69 porndish hitbdsm pornwild tubsexer pornhits pornhut | spitxxx',
  description: 'pornmz pornwild hitbdsm freesexyindians milf300 sex18 desi49 wwwxxx xvedeo sex sister freeomovie 3gp king aunty sex adelt movies bf full hd bigfucktv | spitxxx',
  alternates: { canonical: '/top-videos' },
}

export default async function TopVideosPage({ searchParams }) {
  const page = Number(searchParams?.page || 1)
  const data = await api.getTopRated(page, 16).catch(() => ({ data: [], totalPages: 1 }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Top Rated Videos</h1>
      <div className="grid video-grid">
        {data.data?.map((v, idx) => (
          <VideoCard key={v._id || idx} video={v} />
        ))}
      </div>
      <Pagination basePath="/top-videos" currentPage={page} totalPages={data.totalPages || 1} />
    </div>
  )
}
