'use client'

import Image from 'next/image'
import { useCallback } from 'react'
import { Play } from 'lucide-react'

export default function VideoRedirect({ link, imageUrl, title }) {
  const handlePlay = useCallback(() => {
    if (!link) return
    // Redirect to external link stored in DB
    window.location.href = link
  }, [link])

  return (
    <div className="relative">
      <div className="relative video-container rounded-lg overflow-hidden bg-black">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title || 'Video thumbnail'}
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gray-800" />
        )}

        <button
          onClick={handlePlay}
          disabled={!link}
          className="absolute inset-0 m-auto flex items-center justify-center"
          aria-label="Play video"
          title={link ? 'Play video (redirect)' : 'No link available'}
        >
          <span className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-200 ${link ? 'bg-white/20 hover:bg-white/30' : 'bg-gray-600 cursor-not-allowed'}`}>
            <Play className="w-8 h-8 text-white ml-1" />
          </span>
        </button>
      </div>
    </div>
  )
}
