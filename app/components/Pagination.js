"use client"

import Link from 'next/link'

export default function Pagination({ basePath = '/', currentPage = 1, totalPages = 1 }) {
  if (totalPages <= 1) return null

  const pageNumbers = getVisiblePages(currentPage, totalPages)

  const pageHref = (page) => {
    // Query-based pagination: preserve existing query params
    if (basePath.includes('?')) {
      const [path, queryString] = basePath.split('?')
      const params = new URLSearchParams(queryString || '')
      if (page === 1) {
        params.delete('page')
      } else {
        params.set('page', String(page))
      }
      const qs = params.toString()
      return qs ? `${path}?${qs}` : path
    }
    if (basePath.endsWith('/')) basePath = basePath.slice(0, -1)
    return page === 1 ? `${basePath}` : `${basePath}/${page}`
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Pagination">
      <Link
        href={pageHref(Math.max(1, currentPage - 1))}
        className={`px-3.5 py-2 rounded-md border text-sm transition-colors ${currentPage === 1 ? 'text-gray-500 border-gray-700 bg-gray-800/50 cursor-not-allowed pointer-events-none' : 'text-gray-100 border-gray-600 bg-gray-900 hover:border-purple-500 hover:text-white'}`}
      >
        ← Prev
      </Link>

      {pageNumbers.map((p, idx) => (
        p === '...' ? (
          <span key={idx} className="px-2 text-gray-400 select-none">…</span>
        ) : (
          <Link
            key={p}
            href={pageHref(p)}
            aria-current={p === currentPage ? 'page' : undefined}
            className={`px-3.5 py-2 rounded-md border text-sm transition-colors ${p === currentPage ? 'bg-purple-600 border-purple-600 text-white font-semibold' : 'text-gray-100 border-gray-600 bg-gray-900 hover:border-purple-500 hover:text-white'}`}
          >
            {p}
          </Link>
        )
      ))}

      <Link
        href={pageHref(Math.min(totalPages, currentPage + 1))}
        className={`px-3.5 py-2 rounded-md border text-sm transition-colors ${currentPage === totalPages ? 'text-gray-500 border-gray-700 bg-gray-800/50 cursor-not-allowed pointer-events-none' : 'text-gray-100 border-gray-600 bg-gray-900 hover:border-purple-500 hover:text-white'}`}
      >
        Next →
      </Link>
    </nav>
  )
}

function getVisiblePages(current, total) {
  const delta = 2
  const range = []
  const rangeWithDots = []
  let l

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i)
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
}
