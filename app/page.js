import Link from 'next/link'
import { api } from './lib/api'
import VideoCard from './components/VideoCard'
import Pagination from './components/Pagination'

export const revalidate = 60

export const metadata = {
  title: 'spitxxx Free XXXHD Adult Content Videos And Free Porn Videos',
  description: 'fry99 hqpornee freeomovie 3gp king adelt movies auntymaza badwap com bf full hd bf hd video bfxxx bigfucktv xxxhd spanbank borwap com pornve wowuncut| spitxxx',
  alternates: { canonical: '/' },
}

export default async function HomePage({ searchParams }) {
  const page = Number(searchParams?.page || 1)
  const limit = 16
  const res = await api.getAllPosts(page, limit).catch(() => ({ records: [], data: [], totalPages: 1, totalRecords: 0 }))
  const list = res.records || res.data || []
  const totalPages = res.totalPages || (res.totalRecords ? Math.max(1, Math.ceil(Number(res.totalRecords) / limit)) : 1)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Main Page Title */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Spitxxx - Free Premium Porn Videos
        </h1>
        <p className="text-gray-400 text-lg">
          Watch the best HD adult content videos for free. Updated daily with newest releases.
        </p>
      </div>

      {/* All Videos (Newest first handled by API) */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">All Videos</h2>
        </div>
        <div className="grid video-grid">
          {list.map((v, idx) => (
            <VideoCard key={v._id || idx} video={v} priority={idx < 6} />
          ))}
        </div>
        <div className="mt-6">
          <Pagination basePath="/?" currentPage={page} totalPages={totalPages} />
        </div>
      </section>
    </div>
  )
}
