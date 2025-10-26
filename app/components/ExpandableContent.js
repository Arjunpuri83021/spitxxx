'use client'

import { useState } from 'react'

export default function ExpandableContent({ title, content, defaultExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  if (!content || (Array.isArray(content) && content.length === 0)) {
    return null
  }

  const paragraphs = Array.isArray(content) ? content : [content]

  return (
    <div className="mt-6 bg-gray-900/50 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-900/70 transition-colors"
      >
        <h2 className="text-lg font-semibold text-gray-100 flex items-center">
          <svg className="w-5 h-5 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {title}
        </h2>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 space-y-4">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="text-gray-300 leading-relaxed">
              {para}
            </p>
          ))}
          
          {/* Show More indicator when collapsed */}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none" />
          )}
        </div>
      </div>
      
      {/* Preview when collapsed */}
      {!isExpanded && paragraphs.length > 0 && (
        <div className="px-6 pb-4">
          <p className="text-gray-400 text-sm line-clamp-2">
            {paragraphs[0].substring(0, 150)}...
          </p>
          <button
            onClick={() => setIsExpanded(true)}
            className="mt-2 text-pink-400 hover:text-pink-300 text-sm font-medium flex items-center"
          >
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
