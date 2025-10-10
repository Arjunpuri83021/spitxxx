import Link from 'next/link'
import { api } from '../lib/api'
import VideoCard from '../components/VideoCard'
import Pagination from '../components/Pagination'

export const revalidate = 60

export const metadata = {
  title: 'spitxxx bad wap wwwxxx xvedeo sexv icegay sex sister tiktits |spitxxx',
  description: 'xmoviesforyou aunty sex wwwxxx sex sister aunty sexy video bad wap beeg hindi badwap badwap com sexv tiktits boobs kiss boobs pressing borwap boudi sex | spitxxx',
  alternates: { canonical: '/most-liked' },
}

export default async function PopularPage({ searchParams }) {
  const page = Number(searchParams?.page || 1)
  const data = await api.getPopularVideos(page, 16).catch(() => ({ records: [], totalPages: 1 }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Popular Videos</h1>
      <div className="grid video-grid">
        {data.records?.map((v, idx) => (
          <VideoCard key={v._id || idx} video={v} />
        ))}
      </div>
      <Pagination basePath="/most-liked" currentPage={page} totalPages={data.totalPages || 1} />
    </div>
  )
}
