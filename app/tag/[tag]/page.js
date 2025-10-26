import Link from 'next/link'
import { api } from '../../lib/api'
import VideoCard from '../../components/VideoCard'
import Pagination from '../../components/Pagination'
import ExpandableContent from '../../components/ExpandableContent'

export async function generateMetadata({ params, searchParams }) {
  const tag = decodeURIComponent(params.tag)
  const page = Number(searchParams?.page || 1)
  const titleTag = tag.replace(/-/g, ' ')
  // Fetch minimal data to enrich meta (total count + first image)
  let totalRecords = 0
  let totalPages = 1
  let ogImage = null
  try {
    const res = await api.getPostsByTag(tag, 1, 1)
    const first = (res?.records || res?.data || [])[0]
    totalRecords = Number(res?.totalRecords || 0)
    totalPages = Number(res?.totalPages || 1)
    ogImage = first?.imageUrl || null
  } catch {}

  const baseTitle = `${titleTag} Porn Videos`
  const title = page > 1
    ? `${baseTitle} – Page ${page} | Spitxxx`
    : `${baseTitle} – Free ${titleTag} Sex in HD | Spitxxx`

  const description = page > 1
    ? `Browse page ${page}${totalPages ? ` of ${totalPages}` : ''} for the best ${titleTag} porn videos in HD on Spitxxx. Free streaming, updated daily.${totalRecords ? ` ${totalRecords}+ videos available.` : ''}`
    : `Watch the best ${titleTag} porn videos in HD on Spitxxx. Free streaming, updated daily.${totalRecords ? ` ${totalRecords}+ videos available.` : ''}`

  const canonicalBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://spitxxx.com'
  const canonical = page > 1
    ? `${canonicalBase}/tag/${params.tag}/${page}`
    : `${canonicalBase}/tag/${params.tag}`

  return {
    title,
    description,
    alternates: { canonical },
    keywords: [
      `${titleTag} porn`, `${titleTag} sex videos`, `${titleTag} hd`, `${titleTag} xxx`,
      'spitxxx', 'free porn', 'hd porn videos'
    ],
    robots: {
      index: page === 1,
      follow: true,
      maxImagePreview: 'large',
      maxSnippet: -1,
      maxVideoPreview: -1,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      images: ogImage ? [{ url: ogImage } ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

async function getData(tag, page) {
  const list = await api.getPostsByTag(tag, page, 16).catch(() => ({ data: [], records: [], totalPages: 1, totalRecords: 0 }))

  const items = list.data || list.records || []
  const totalPages = list.totalPages || 1
  const totalRecords = list.totalRecords || items.length || 0

  return { list: items, totalPages, totalRecords }
}

// Generate unique content for tag pages based on videos
function generateTagContent(tagName, videos, totalVideos) {
  const displayTag = tagName.replace(/-/g, ' ')
  const videoTitles = videos.slice(0, 4).map(v => v.titel || v.title).filter(Boolean)
  const pornstars = [...new Set(videos.flatMap(v => v.name || []).filter(Boolean))].slice(0, 5)
  
  // Create hash from tag name for consistent variations
  const hash = tagName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const variant = hash % 4 // 4 different variations
  
  const paragraphs = []
  
  // Paragraph 1: Introduction with video examples
  const intros = [
    () => `Discover ${totalVideos} premium ${displayTag} porn videos on Spitxxx, your ultimate destination for free HD adult content. ` +
      (videoTitles.length > 0
        ? `Explore popular videos like "${videoTitles[0]}"${videoTitles[1] ? `, "${videoTitles[1]}"` : ''}${videoTitles[2] ? `, and "${videoTitles[2]}"` : ''} among our extensive collection. `
        : 'Explore our extensive collection of premium content. ') +
      (pornstars.length > 0
        ? `Watch ${pornstars.slice(0, 2).join(' and ')} along with other top performers in stunning ${displayTag} scenes. `
        : 'Watch top performers in stunning scenes. ') +
      `Our ${displayTag} category features carefully curated content that delivers exceptional quality and variety for every preference.`,
    
    () => `Welcome to the ultimate ${displayTag} video collection featuring ${totalVideos} exclusive HD videos on Spitxxx. ` +
      (videoTitles.length > 0
        ? `From trending titles like "${videoTitles[0]}" to hidden gems${videoTitles[1] ? ` such as "${videoTitles[1]}"` : ''}, our library offers comprehensive ${displayTag} entertainment. `
        : `Our library offers comprehensive entertainment. `) +
      (pornstars.length > 0
        ? `Featuring performances by ${pornstars[0]}${pornstars[1] ? `, ${pornstars[1]}` : ''}${pornstars[2] ? `, and ${pornstars[2]}` : ''}, each video showcases professional quality and authentic passion. `
        : 'Each video showcases professional quality and authentic passion. ') +
      `Experience the best ${displayTag} content available online, all streaming free in crystal-clear HD.`,
    
    () => `Explore ${totalVideos} handpicked ${displayTag} porn videos on Spitxxx, where quality meets variety in adult entertainment. ` +
      (videoTitles.length > 0
        ? `Popular selections include "${videoTitles[0]}"${videoTitles[1] ? ` and "${videoTitles[1]}"` : ''}${videoTitles[2] ? `, plus "${videoTitles[2]}"` : ''} and countless other premium videos. `
        : 'Countless premium videos await your discovery. ') +
      (pornstars.length > 0
        ? `Our ${displayTag} collection features industry favorites like ${pornstars.slice(0, 2).join(' and ')}, delivering performances that exceed expectations. `
        : 'Our collection delivers performances that exceed expectations. ') +
      `Every video is available for instant streaming in HD, ensuring an immersive viewing experience.`,
    
    () => `Immerse yourself in ${totalVideos} exceptional ${displayTag} videos, exclusively available on Spitxxx in premium HD quality. ` +
      (videoTitles.length > 0
        ? `Must-watch content includes "${videoTitles[0]}"${videoTitles[1] ? `, "${videoTitles[1]}"` : ''}${videoTitles[2] ? `, and "${videoTitles[2]}"` : ''}, representing the finest ${displayTag} entertainment. `
        : `Representing the finest entertainment available. `) +
      (pornstars.length > 0
        ? `Watch ${pornstars[0]}${pornstars[1] ? ` and ${pornstars[1]}` : ''} showcase their talents in authentic ${displayTag} performances. `
        : 'Watch talented performers showcase authentic performances. ') +
      `Our curated ${displayTag} library ensures you always find exactly what you are looking for.`
  ]
  
  paragraphs.push(intros[variant]())
  
  // Paragraph 2: Content quality and variety
  const contentDetails = [
    () => `Our ${displayTag} collection spans ${totalVideos} carefully selected videos, each meeting strict quality standards for HD resolution and production value. ` +
      (pornstars.length > 0
        ? `Featuring renowned performers including ${pornstars.slice(0, 3).join(', ')}, every video delivers professional cinematography and authentic performances. `
        : 'Every video delivers professional cinematography and authentic performances. ') +
      `The diverse range of ${displayTag} content ensures something for every taste, from passionate encounters to intense scenes. ` +
      `Regular updates keep the collection fresh, with new ${displayTag} videos added frequently to maintain variety and excitement.`,
    
    () => `With ${totalVideos} premium videos in our ${displayTag} category, Spitxxx offers unmatched variety and consistent quality. ` +
      (pornstars.length > 0
        ? `Top performers like ${pornstars[0]}${pornstars[1] ? ` and ${pornstars[1]}` : ''} bring their expertise to create memorable ${displayTag} content. `
        : 'Top performers bring their expertise to create memorable content. ') +
      `Each video undergoes quality review to ensure HD clarity, proper lighting, and engaging performances throughout. ` +
      `The ${displayTag} collection continues growing, with fresh content additions ensuring you always discover new favorites.`,
    
    () => `The ${displayTag} category features ${totalVideos} meticulously curated videos showcasing diverse styles and approaches to adult entertainment. ` +
      (pornstars.length > 0
        ? `Industry professionals including ${pornstars.slice(0, 3).join(', ')} deliver performances that highlight why ${displayTag} content remains so popular. `
        : `Professional performances highlight why this content remains so popular. `) +
      `Superior production values, HD filming, and authentic chemistry define every video in our ${displayTag} collection. ` +
      `Continuous content updates mean the library evolves constantly, offering both timeless classics and latest releases.`,
    
    () => `Our ${totalVideos}-video ${displayTag} library represents the pinnacle of free adult entertainment, combining quality with accessibility. ` +
      (pornstars.length > 0
        ? `Watch ${pornstars[0]}${pornstars[1] ? `, ${pornstars[1]}` : ''}${pornstars[2] ? `, and ${pornstars[2]}` : ''} demonstrate why they are favorites in ${displayTag} content. `
        : 'Watch talented performers demonstrate their skills. ') +
      `Every video maintains premium standards with HD resolution, professional editing, and engaging performances from start to finish. ` +
      `The ${displayTag} collection receives regular updates, ensuring fresh content alongside established favorites.`
  ]
  
  paragraphs.push(contentDetails[variant]())
  
  // Paragraph 3: Platform benefits
  const platformBenefits = [
    () => `Spitxxx provides unlimited free access to all ${totalVideos} ${displayTag} videos without registration requirements or hidden fees. ` +
      `Our platform delivers fast, buffer-free streaming on any device, whether you are watching on desktop, tablet, or mobile. ` +
      `The ${displayTag} collection updates regularly with new releases, ensuring you always have fresh content to explore. ` +
      `Join millions who trust Spitxxx for premium ${displayTag} entertainment and discover why we are the preferred choice for adult content.`,
    
    () => `Watch all ${totalVideos} ${displayTag} porn videos completely free on Spitxxx, with no subscriptions or payment barriers. ` +
      `We have built robust streaming infrastructure to ensure smooth playback and quick loading times across all devices. ` +
      `New ${displayTag} content arrives regularly, keeping the collection current with latest trends and performer releases. ` +
      `Experience the convenience of a platform designed specifically for adult entertainment enthusiasts seeking quality ${displayTag} content.`,
    
    () => `Spitxxx offers unrestricted access to ${totalVideos} premium ${displayTag} videos at absolutely no cost to viewers. ` +
      `Our user-friendly interface makes browsing the ${displayTag} category effortless, with intuitive navigation and smart filtering options. ` +
      `Regular content updates ensure the ${displayTag} library stays fresh, with new videos added as soon as they become available. ` +
      `Trust a platform that has served millions with reliable streaming and comprehensive adult content collections.`,
    
    () => `Access the complete ${displayTag} collection of ${totalVideos} videos for free on Spitxxx, with unlimited streaming and no restrictions. ` +
      `Advanced streaming technology ensures high-quality playback without buffering, regardless of your device or connection. ` +
      `Stay current with the latest ${displayTag} releases through our frequent content updates and new video additions. ` +
      `Discover why Spitxxx has become the go-to destination for fans seeking premium ${displayTag} entertainment.`
  ]
  
  paragraphs.push(platformBenefits[variant]())
  
  // Paragraph 4: Call to action
  const callToActions = [
    () => `Start exploring our ${totalVideos} ${displayTag} videos now and discover why this category captivates audiences worldwide. ` +
      (videoTitles.length > 0
        ? `Do not miss trending videos like "${videoTitles[0]}" and other popular titles in our extensive library. `
        : 'Do not miss the popular titles in our extensive library. ') +
      `Use our filtering and sorting options to find exactly what you want, whether searching by popularity, upload date, or duration. ` +
      `With free unlimited streaming and daily updates, Spitxxx ensures you always have access to the best ${displayTag} content online.`,
    
    () => `Begin your journey through ${totalVideos} exceptional ${displayTag} videos and experience adult entertainment at its finest. ` +
      (videoTitles.length > 0
        ? `Check out must-see content including "${videoTitles[0]}"${videoTitles[1] ? ` and "${videoTitles[1]}"` : ''} to understand why ${displayTag} remains so popular. `
        : `Understand why this category remains so popular among fans. `) +
      `Our platform makes discovering new favorites easy while allowing you to revisit beloved classics anytime. ` +
      `Join our community today and enjoy unlimited access to premium ${displayTag} entertainment.`,
    
    () => `Dive into the extensive ${displayTag} library featuring ${totalVideos} premium videos, all available for immediate free streaming. ` +
      (videoTitles.length > 0
        ? `Start with highly rated videos like "${videoTitles[0]}" to see why ${displayTag} content attracts such dedicated viewership. `
        : `See why this content attracts such dedicated viewership. `) +
      `Our recommendation system helps you discover similar content and explore the full range of ${displayTag} offerings. ` +
      `Experience the difference that quality content and user-focused platform design make in your viewing experience.`,
    
    () => `Unlock access to all ${totalVideos} ${displayTag} videos and immerse yourself in premium adult entertainment. ` +
      (videoTitles.length > 0
        ? `Featured content like "${videoTitles[0]}"${videoTitles[1] ? ` and "${videoTitles[1]}"` : ''} showcases exactly why ${displayTag} remains a top category. `
        : `Discover exactly why this remains a top category. `) +
      `Browse the complete collection, bookmark your favorites, and return anytime for more exceptional ${displayTag} content. ` +
      `Spitxxx delivers the ultimate ${displayTag} viewing experience with free, unlimited access to every video.`
  ]
  
  paragraphs.push(callToActions[variant]())
  
  return paragraphs.filter(Boolean)
}

export default async function TagPage({ params, searchParams }) {
  const tag = decodeURIComponent(params.tag)
  const page = Number(params.page || searchParams?.page || 1)
  const { list, totalPages, totalRecords } = await getData(tag, page)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {page === 1 && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold capitalize">
            {tag.replace(/-/g, ' ')} Porn Videos
          </h1>
          <p className="text-gray-400 mt-2 text-sm">{totalRecords} premium HD videos</p>
        </div>
      )}

      {page > 1 && (
        <div className="mb-6">
          <h1 className="text-2xl font-semibold capitalize">{tag.replace(/-/g, ' ')} Sex Videos - Page {page}</h1>
          <p className="text-gray-400 mt-1 text-sm">Showing page {page} of {totalPages} ({totalRecords} total videos)</p>
        </div>
      )}

      <div className="grid video-grid mt-8">
        {list.map((v, idx) => (
          <VideoCard key={v._id || idx} video={v} />
        ))}
      </div>

      <Pagination basePath={`/tag/${params.tag}`} currentPage={page} totalPages={totalPages} />

      {/* Unique SEO Content - After videos on page 1 */}
      {page === 1 && (
        <ExpandableContent 
          title={`About ${tag.replace(/-/g, ' ')} Videos`}
          content={generateTagContent(tag, list, totalRecords)}
          defaultExpanded={false}
        />
      )}
    </div>
  )
}
