import { api } from '../lib/api'
import VideoCard from '../components/VideoCard'
import Pagination from '../components/Pagination'
import ExpandableContent from '../components/ExpandableContent'
import { generateCategoryContent } from '../lib/contentGenerator'

export const revalidate = 60

export const metadata = {
  title: 'spitxxx Desi49 SxyPrn & BF Sex Videos | IndianGaySite & spitxxx on spitxxx',
  description: 'desi 52 com desi 49 com dehati sex dasi sex blueflim boyfriendtv com bollywood sex bf sexy indiangaysite sxyprn bf hindi video bf hindi movie banglaxx | spitxxx',
  alternates: { canonical: '/indian' },
}

export default async function IndianPage({ searchParams }) {
  const page = Number(searchParams?.page || 1)
  const res = await api.getIndians(page, 16).catch(() => ({ data: [], records: [], totalPages: 1, totalRecords: 0 }))
  const list = res.records || res.data || []
  const totalPages = res.totalPages || (res.totalRecords ? Math.max(1, Math.ceil(Number(res.totalRecords) / 16)) : 1)
  const totalRecords = res.totalRecords || list.length || 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {page === 1 && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Indian Porn Videos
          </h1>
          <p className="text-gray-400 mt-2 text-sm">{totalRecords} premium HD videos</p>
        </div>
      )}

      {page > 1 && (
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Indian Videos - Page {page}</h1>
          <p className="text-gray-400 mt-1 text-sm">Showing page {page} of {totalPages}</p>
        </div>
      )}

      <div className="grid video-grid">
        {list.map((v, idx) => (
          <VideoCard key={v._id || idx} video={v} />
        ))}
      </div>

      <Pagination basePath="/indian?" currentPage={page} totalPages={totalPages} />

      {page === 1 && (
        <ExpandableContent 
          title="About Indian Porn Videos"
          content={generateCategoryContent('Indian', list, totalRecords)}
          defaultExpanded={false}
        />
      )}
    </div>
  )
}
