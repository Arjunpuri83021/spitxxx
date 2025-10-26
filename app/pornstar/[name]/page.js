import { api } from '../../lib/api'
import VideoCard from '../../components/VideoCard'
import Pagination from '../../components/Pagination'
import ExpandableContent from '../../components/ExpandableContent'

export const revalidate = 300 // 5 minutes

export async function generateMetadata({ params, searchParams }) {
  const name = decodeURIComponent(params.name)
  const page = Number(searchParams?.page || 1)
  const displayName = name.replace(/-/g, ' ')
  const title = page > 1 
    ? `${displayName} Porn Videos - Page ${page} | Spitxxx`
    : `${displayName} Porn Videos - Free HD XXX Videos | Spitxxx`
  const description = `Watch free ${displayName} porn videos in HD on Spitxxx. Browse the best ${displayName} XXX content, updated regularly with new releases.`

  const canonicalBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://spitxxx.com'
  const canonical = `${canonicalBase}/pornstar/${params.name}`

  return {
    title,
    description,
    alternates: { canonical },
    robots: page > 1 ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'profile',
    },
  }
}

async function getData(name, page) {
  const res = await api.getPornstarVideos(name, page, 16).catch(() => ({ records: [], data: [], totalPages: 1, totalRecords: 0 }))
  return { list: res.records || res.data || [], totalPages: res.totalPages || 1, totalRecords: res.totalRecords || 0 }
}

// Generate unique content for pornstar pages based on their videos
function generatePornstarContent(pornstarName, videos, totalVideos) {
  const displayName = pornstarName.replace(/-/g, ' ')
  const videoTitles = videos.slice(0, 4).map(v => v.titel || v.title).filter(Boolean)
  const tags = [...new Set(videos.flatMap(v => v.tags || []).filter(Boolean))].slice(0, 5)
  
  // Create hash from pornstar name for consistent variations
  const hash = pornstarName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const variant = hash % 4 // 4 different variations
  
  const paragraphs = []
  
  // Paragraph 1: Introduction with video examples
  const intros = [
    () => `Explore the complete collection of ${displayName} porn videos on Spitxxx, featuring ${totalVideos} exclusive HD videos. ` +
      (videoTitles.length > 0 
        ? `Watch popular titles like "${videoTitles[0]}"${videoTitles[1] ? `, "${videoTitles[1]}"` : ''}${videoTitles[2] ? `, and "${videoTitles[2]}"` : ''} in stunning quality. `
        : 'Watch all videos in stunning HD quality. ') +
      `${displayName} has become one of the most sought-after performers in the adult entertainment industry, known for delivering captivating performances that keep viewers coming back for more. ` +
      `Our extensive library showcases the best of ${displayName} work, updated regularly with new releases.`,
    
    () => `Discover ${totalVideos} premium ${displayName} videos available exclusively on Spitxxx. ` +
      (videoTitles.length > 0
        ? `From fan favorites like "${videoTitles[0]}" to recent releases${videoTitles[1] ? ` such as "${videoTitles[1]}"` : ''}, our collection offers comprehensive coverage of ${displayName} career. `
        : `Our collection offers comprehensive coverage of ${displayName} career. `) +
      `${displayName} brings natural talent and professional expertise to every scene, creating memorable moments that showcase why they are among the industry elite. ` +
      `Browse through our curated selection and experience the best adult entertainment featuring ${displayName}.`,
    
    () => `Welcome to the ultimate ${displayName} video collection on Spitxxx, featuring ${totalVideos} high-definition videos. ` +
      (videoTitles.length > 0
        ? `Experience top-rated content including "${videoTitles[0]}"${videoTitles[1] ? ` and "${videoTitles[1]}"` : ''}${videoTitles[2] ? `, plus "${videoTitles[2]}"` : ''} and many more exclusive scenes. `
        : 'Experience top-rated exclusive content. ') +
      `${displayName} has established a reputation for authentic performances and undeniable screen presence. ` +
      `Our platform provides easy access to ${displayName} complete portfolio, all available for free streaming in crystal-clear HD quality.`,
    
    () => `Immerse yourself in ${totalVideos} exclusive ${displayName} porn videos, all available in premium HD quality on Spitxxx. ` +
      (videoTitles.length > 0
        ? `Popular videos like "${videoTitles[0]}"${videoTitles[1] ? `, "${videoTitles[1]}"` : ''}${videoTitles[2] ? `, and "${videoTitles[2]}"` : ''} demonstrate ${displayName} versatility and appeal. `
        : `Our collection demonstrates ${displayName} versatility and appeal. `) +
      `With a growing fanbase and consistent quality, ${displayName} continues to be a top choice for adult entertainment enthusiasts. ` +
      `Stream all videos for free and discover why ${displayName} has become a household name in the industry.`
  ]
  
  paragraphs.push(intros[variant]())
  
  // Paragraph 2: Content quality and categories
  const contentDetails = [
    () => {
      if (tags.length > 0) {
        return `${displayName} videos span multiple popular categories including ${tags.slice(0, 3).join(', ')}, showcasing remarkable range and adaptability. ` +
          `Each performance is captured with professional-grade equipment, ensuring every detail is visible in stunning HD clarity. ` +
          `The ${totalVideos} videos in our collection represent carefully selected content that highlights ${displayName} best work across different themes and styles. ` +
          `Whether you prefer ${tags[0]} content or exploring ${tags[1] || 'other categories'}, you will find exceptional quality throughout the entire collection.`
      }
      return `Our ${totalVideos}-video collection showcases ${displayName} work across various themes and styles. ` +
        `Each video is professionally produced and presented in high-definition quality. ` +
        `The diverse content ensures there is something for every preference and taste. ` +
        `Experience premium adult entertainment that sets the standard for quality and performance.`
    },
    
    () => {
      if (tags.length > 0) {
        return `The extensive ${displayName} library features diverse content across ${tags.slice(0, 3).join(', ')} and other popular categories. ` +
          `Professional cinematography and HD quality ensure an immersive viewing experience with every video. ` +
          `With ${totalVideos} videos available, fans can explore ${displayName} evolution as a performer, from early work to latest releases. ` +
          `The variety in themes and styles means you can enjoy ${tags[0]}, ${tags[1] || 'passionate'}, and ${tags[2] || 'intense'} content all in one place.`
      }
      return `Browse through ${totalVideos} professionally produced videos featuring ${displayName}. ` +
        `High-definition quality and expert production values define every scene. ` +
        `The collection spans ${displayName} career, offering both classic and contemporary content. ` +
        `Discover why ${displayName} remains a fan favorite with consistently excellent performances.`
    },
    
    () => {
      if (tags.length > 0) {
        return `${displayName} excels in multiple genres, with our collection featuring ${tags.slice(0, 3).join(', ')} content and more. ` +
          `Every video in the ${totalVideos}-strong library maintains premium quality standards with HD resolution and professional production. ` +
          `Fans appreciate ${displayName} ability to bring authenticity and energy to ${tags[0]} scenes while also delivering in ${tags[1] || 'other'} categories. ` +
          `The comprehensive collection ensures you have access to the full spectrum of ${displayName} work.`
      }
      return `Access ${totalVideos} premium videos showcasing ${displayName} talent and versatility. ` +
        `Each video meets strict quality standards with HD resolution throughout. ` +
        `The curated selection represents the best of ${displayName} performances. ` +
        `Experience adult entertainment at its finest with consistently excellent content.`
    },
    
    () => {
      if (tags.length > 0) {
        return `Our ${displayName} collection covers popular categories like ${tags.slice(0, 3).join(', ')}, with ${totalVideos} videos to explore. ` +
          `Superior production quality and HD filming ensure every scene delivers maximum visual impact. ` +
          `${displayName} natural charisma shines through in ${tags[0]} content, while their versatility is evident in ${tags[1] || 'diverse'} performances. ` +
          `This comprehensive library provides everything fans could want from a ${displayName} video collection.`
      }
      return `Discover ${totalVideos} carefully selected videos featuring ${displayName} best performances. ` +
        `Premium HD quality ensures an exceptional viewing experience. ` +
        `The collection showcases ${displayName} range and talent across multiple scenes. ` +
        `Enjoy free access to top-tier adult entertainment featuring one of the industry best.`
    }
  ]
  
  paragraphs.push(contentDetails[variant]())
  
  // Paragraph 3: Platform benefits
  const platformBenefits = [
    () => `Spitxxx provides completely free access to all ${totalVideos} ${displayName} videos, with no hidden fees or subscription requirements. ` +
      `Our platform prioritizes user experience with fast streaming, mobile compatibility, and an intuitive interface that makes browsing effortless. ` +
      `New ${displayName} content is added regularly, ensuring the collection stays fresh and up-to-date with latest releases. ` +
      `Join millions of satisfied users who have made Spitxxx their preferred destination for ${displayName} videos and premium adult content.`,
    
    () => `Watch all ${totalVideos} ${displayName} videos absolutely free on Spitxxx, with unlimited streaming and no registration barriers. ` +
      `We have invested in robust infrastructure to deliver smooth, buffer-free playback on any device, whether desktop, tablet, or mobile. ` +
      `Our commitment to quality extends beyond video content to include regular updates, ensuring you never miss new ${displayName} releases. ` +
      `Experience the convenience of a platform designed specifically for adult entertainment enthusiasts.`,
    
    () => `Spitxxx offers unrestricted access to the complete ${displayName} video library, totaling ${totalVideos} premium HD videos at no cost. ` +
      `Our user-friendly platform features advanced search and filtering options, making it easy to find exactly what you want to watch. ` +
      `We update the ${displayName} collection frequently, adding new videos as soon as they become available. ` +
      `Trust in a platform that has served millions of users with reliable streaming and comprehensive adult content libraries.`,
    
    () => `Access the entire ${displayName} collection of ${totalVideos} videos for free on Spitxxx, with no limitations or hidden costs. ` +
      `Our advanced streaming technology ensures high-quality playback without buffering or interruptions. ` +
      `Stay current with ${displayName} latest work through our regular content updates and new video additions. ` +
      `Discover why Spitxxx has become the go-to platform for fans seeking quality ${displayName} content.`
  ]
  
  paragraphs.push(platformBenefits[variant]())
  
  // Paragraph 4: Call to action
  const callToActions = [
    () => `Start exploring the ${displayName} video collection now and discover why these ${totalVideos} videos have captivated audiences worldwide. ` +
      (videoTitles.length > 0
        ? `Do not miss popular titles like "${videoTitles[0]}" or other fan favorites available in our library. `
        : 'Do not miss the fan favorites available in our library. ') +
      `Use our intuitive navigation to browse by popularity, upload date, or duration to find your perfect video. ` +
      `With free unlimited streaming and daily updates, Spitxxx ensures you always have access to the best ${displayName} content available online.`,
    
    () => `Begin your journey through ${totalVideos} exceptional ${displayName} videos and experience premium adult entertainment at its finest. ` +
      (videoTitles.length > 0
        ? `Check out must-watch videos including "${videoTitles[0]}"${videoTitles[1] ? ` and "${videoTitles[1]}"` : ''} to see what makes ${displayName} so popular. `
        : `See what makes ${displayName} so popular among fans. `) +
      `Our platform makes it easy to discover new favorites while revisiting classic performances. ` +
      `Join our community today and enjoy unlimited access to ${displayName} complete video portfolio.`,
    
    () => `Dive into the extensive ${displayName} library featuring ${totalVideos} premium videos, all available for immediate streaming. ` +
      (videoTitles.length > 0
        ? `Start with highly rated videos like "${videoTitles[0]}" to understand why ${displayName} has such a dedicated following. `
        : `Discover why ${displayName} has such a dedicated following. `) +
      `Our recommendation system helps you find similar content and explore ${displayName} full range of performances. ` +
      `Experience the difference that quality content and a user-focused platform can make in your viewing experience.`,
    
    () => `Unlock access to all ${totalVideos} ${displayName} videos and immerse yourself in premium adult entertainment. ` +
      (videoTitles.length > 0
        ? `Featured content like "${videoTitles[0]}"${videoTitles[1] ? ` and "${videoTitles[1]}"` : ''} showcases exactly why ${displayName} remains a top performer. `
        : `Discover exactly why ${displayName} remains a top performer. `) +
      `Browse the complete collection, save your favorites, and return anytime for more exceptional content. ` +
      `Spitxxx delivers the ultimate ${displayName} viewing experience with free, unlimited access to every video.`
  ]
  
  paragraphs.push(callToActions[variant]())
  
  return paragraphs.filter(Boolean)
}

export default async function PornstarPage({ params, searchParams }) {
  const name = decodeURIComponent(params.name)
  const page = Number(params.page || searchParams?.page || 1)
  const { list, totalPages, totalRecords } = await getData(name, page)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {page === 1 && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold capitalize">
            {name.replace(/-/g, ' ')} Porn Videos
          </h1>
          <p className="text-gray-400 mt-2 text-sm">{totalRecords} exclusive HD videos</p>
        </div>
      )}

      {page > 1 && (
        <div className="mb-6">
          <h1 className="text-2xl font-semibold capitalize">{name.replace(/-/g, ' ')} Porn Videos - Page {page}</h1>
          <p className="text-gray-400 mt-1 text-sm">Showing page {page} of {totalPages} ({totalRecords} total videos)</p>
        </div>
      )}

      <div className="grid video-grid mt-8">
        {list.map((v, idx) => (
          <VideoCard key={v._id || idx} video={v} />
        ))}
      </div>

      <Pagination basePath={`/pornstar/${params.name}`} currentPage={page} totalPages={totalPages} />

      {/* Unique SEO Content - After videos on page 1 */}
      {page === 1 && (
        <ExpandableContent 
          title={`About ${name.replace(/-/g, ' ')}`}
          content={generatePornstarContent(name, list, totalRecords)}
          defaultExpanded={false}
        />
      )}
    </div>
  )
}
