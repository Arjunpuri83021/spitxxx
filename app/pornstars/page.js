import Link from 'next/link'
import { api } from '../lib/api'
import Pagination from '../components/Pagination'
import Image from 'next/image'

export const revalidate = 60

export const metadata = {
  title: 'spitxxx Adult Actress 3Pornstar 4K Pornstar Black Pornstars | spitxxx',
  description: 'A list of top-rated adult actresses and pornstars, including black pornstars and 4K-rated performers.',
  alternates: { canonical: '/pornstars' },
}

function toSlug(s) {
  return (s || '').toString().toLowerCase().trim().replace(/\s+/g, '-')
}

export default async function PornstarsPage({ searchParams }) {
  const page = Number(searchParams?.page || 1)
  const letter = (searchParams?.letter || '').toString().toUpperCase()

  const res = await api.getAllPornstars(page, 30, '', letter).catch(() => ({ pornstars: [], pagination: { totalPages: 1 } }))
  const stars = res.pornstars || []
  const totalPages = (res.pagination && res.pagination.totalPages) || res.totalPages || 1

  // Fetch first video image for each star (server-side)
  const images = await Promise.all(
    stars.map(async (s) => {
      try {
        const vids = await api.getPornstarVideos(s.name, 1, 1)
        const first = (vids.records || vids.data || vids.videos || [])[0]
        return first?.imageUrl || null
      } catch {
        return null
      }
    })
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Pornstars</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {stars.map((star, idx) => (
          <Link
            key={idx}
            href={`/pornstar/${toSlug(star.slug || star.name || '')}`}
            className="text-center hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-full aspect-square relative rounded-full overflow-hidden mb-2">
              {images[idx] ? (
                <Image
                  src={images[idx]}
                  alt={star.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-400 to-purple-500">
                  <svg width="120" height="120" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="100" fill="rgba(255,255,255,0.2)"/>
                    <circle cx="100" cy="85" r="35" fill="#FDBCB4"/>
                    <path d="M65 75C65 55 80 40 100 40C120 40 135 55 135 75C135 65 130 55 125 50C120 45 110 42 100 42C90 42 80 45 75 50C70 55 65 65 65 75Z" fill="#8B4513"/>
                    <circle cx="90" cy="80" r="3" fill="#000"/>
                    <circle cx="110" cy="80" r="3" fill="#000"/>
                    <circle cx="100" cy="88" r="1.5" fill="#F4A460"/>
                    <ellipse cx="100" cy="95" rx="4" ry="2" fill="#FF69B4"/>
                    <ellipse cx="100" cy="160" rx="40" ry="30" fill="#FDBCB4"/>
                    <path d="M70 140C70 140 85 135 100 135C115 135 130 140 130 140L130 180C130 185 125 190 120 190L80 190C75 190 70 185 70 180Z" fill="#FF1493"/>
                    <circle cx="100" cy="125" r="3" fill="#FFD700"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="text-sm text-white font-medium truncate">{star.name}</div>
          </Link>
        ))}
      </div>

      <Pagination basePath={`/pornstars${letter ? `?letter=${letter}` : ''}${letter ? '&' : '?'}sort=az`} currentPage={page} totalPages={totalPages} />
    </div>
  )
}
