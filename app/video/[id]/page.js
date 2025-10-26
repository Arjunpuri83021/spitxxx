import { api } from '../../lib/api'
import Link from 'next/link'
import VideoRedirect from '../../components/VideoRedirect'
import VideoCard from '../../components/VideoCard'
import Pagination from '../../components/Pagination'
import ExpandableContent from '../../components/ExpandableContent'

export const revalidate = 3600 // 1 hour - video pages don't change frequently

function extractMongoId(maybe) {
  if (!maybe || typeof maybe !== 'string') return maybe
  const m = maybe.match(/[a-f0-9]{24}/i)
  return m ? m[0] : maybe
}

function slugify(str = '') {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

// Generate unique content for each video based on title, tags, and pornstars
// Minimum 300-500 words for Google SEO requirements
function generateUniqueContent(video) {
  const title = video?.titel || video?.title || 'this video'
  const performers = Array.isArray(video?.name) && video.name.length > 0 
    ? video.name : []
  const tags = Array.isArray(video?.tags) && video.tags.length > 0 
    ? video.tags : []
  const duration = video?.minutes || 0
  const views = video?.views || 0
  const videoId = video?._id || ''
  
  // Create hash from video ID for consistent but varied content
  const hash = videoId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const variant = hash % 5 // 5 different variations
  
  const paragraphs = []
  
  // PARAGRAPH 1: Opening (Multiple variations based on hash)
  const openings = [
    // Variation 1
    () => {
      if (performers.length > 0) {
        return `Discover an exclusive ${duration}-minute HD experience featuring ${performers.join(' and ')} on Spitxxx. ` +
          `This premium video has captivated over ${new Intl.NumberFormat('en-US').format(views)} viewers worldwide. ` +
          (tags.length > 0 
            ? `Immerse yourself in ${tags[0]} and ${tags[1] || tags[0]} content that showcases ${performers[0]}'s exceptional talent. `
            : `Watch ${performers[0]} deliver an outstanding performance in crystal-clear quality. `) +
          `Our platform brings you unparalleled adult entertainment that sets new standards in the industry.`
      }
      return `Experience ${duration} minutes of premium HD content on Spitxxx, viewed by over ${new Intl.NumberFormat('en-US').format(views)} satisfied users. ` +
        (tags.length > 0 
          ? `This ${tags[0]} video delivers exceptional quality and unforgettable moments. `
          : 'This video delivers exceptional quality and unforgettable moments. ') +
        `Join our community of millions who trust us for their adult entertainment needs.`
    },
    // Variation 2
    () => {
      if (performers.length > 0) {
        return `Watch ${performers.join(', ')} in this captivating ${duration}-minute production available exclusively on Spitxxx. ` +
          `With an impressive ${new Intl.NumberFormat('en-US').format(views)} views, this video has become a fan favorite. ` +
          (tags.length > 0 
            ? `Featuring stunning ${tags.slice(0, 2).join(' and ')} scenes, ${performers[0]} demonstrates why they're considered among the industry's elite performers. `
            : `${performers[0]} demonstrates why they're considered among the industry's elite performers. `) +
          `Every frame is captured in stunning HD quality for your viewing pleasure.`
      }
      return `Dive into ${duration} minutes of premium entertainment that has attracted ${new Intl.NumberFormat('en-US').format(views)} viewers. ` +
        (tags.length > 0 
          ? `This ${tags[0]} masterpiece showcases the finest adult content available online. `
          : 'This masterpiece showcases the finest adult content available online. ') +
        `Spitxxx continues to deliver unmatched quality in every video we offer.`
    },
    // Variation 3
    () => {
      if (performers.length > 0) {
        return `Presenting ${performers.join(' alongside ')} in an unforgettable ${duration}-minute HD video on Spitxxx. ` +
          `This exclusive content has garnered over ${new Intl.NumberFormat('en-US').format(views)} views from our dedicated audience. ` +
          (tags.length > 0 
            ? `Experience the perfect blend of ${tags[0]}, ${tags[1] || 'passion'}, and ${tags[2] || 'intensity'} as ${performers[0]} takes center stage. `
            : `Experience passion and intensity as ${performers[0]} takes center stage. `) +
          `Our commitment to quality ensures every second is worth watching.`
      }
      return `Explore ${duration} minutes of carefully curated content that has resonated with ${new Intl.NumberFormat('en-US').format(views)} viewers worldwide. ` +
        (tags.length > 0 
          ? `This premium ${tags[0]} video represents the pinnacle of adult entertainment. `
          : 'This premium video represents the pinnacle of adult entertainment. ') +
        `Spitxxx brings you exclusive content you won't find anywhere else.`
    },
    // Variation 4
    () => {
      if (performers.length > 0) {
        return `Indulge in ${duration} minutes of pure entertainment featuring the incredible ${performers.join(' and ')} on Spitxxx. ` +
          `This highly-rated video has achieved over ${new Intl.NumberFormat('en-US').format(views)} views and counting. ` +
          (tags.length > 0 
            ? `Witness ${performers[0]}'s mastery in ${tags[0]} and ${tags[1] || tags[0]} categories, delivering performances that exceed expectations. `
            : `Witness ${performers[0]}'s mastery, delivering performances that exceed expectations. `) +
          `Shot in pristine HD quality, every detail is captured perfectly.`
      }
      return `Immerse yourself in ${duration} minutes of premium content that has captivated ${new Intl.NumberFormat('en-US').format(views)} viewers. ` +
        (tags.length > 0 
          ? `This exceptional ${tags[0]} video showcases what makes Spitxxx the premier destination for adult content. `
          : 'This exceptional video showcases what makes Spitxxx the premier destination for adult content. ') +
        `Quality, variety, and satisfaction guaranteed with every view.`
    },
    // Variation 5
    () => {
      if (performers.length > 0) {
        return `Step into a world of pleasure with ${performers.join(', ')} in this remarkable ${duration}-minute HD presentation. ` +
          `Having attracted ${new Intl.NumberFormat('en-US').format(views)} views, this video stands as a testament to quality content. ` +
          (tags.length > 0 
            ? `${performers[0]} brings their A-game in this ${tags[0]} and ${tags[1] || tags[0]} showcase that leaves nothing to the imagination. `
            : `${performers[0]} brings their A-game in this showcase that leaves nothing to the imagination. `) +
          `Experience entertainment at its finest, only on Spitxxx.`
      }
      return `Discover ${duration} minutes of exceptional entertainment that has earned ${new Intl.NumberFormat('en-US').format(views)} views. ` +
        (tags.length > 0 
          ? `This premium ${tags[0]} production exemplifies our commitment to delivering top-tier adult content. `
          : 'This premium production exemplifies our commitment to delivering top-tier adult content. ') +
        `Spitxxx remains your trusted source for quality entertainment.`
    }
  ]
  
  paragraphs.push(openings[variant]())
  
  // PARAGRAPH 2: Content Quality & Details (Variations)
  const contentDetails = [
    () => {
      if (tags.length > 0) {
        return `The video expertly combines ${tags.slice(0, 3).join(', ')} elements to create an immersive viewing experience. ` +
          (performers.length > 0 
            ? `${performers[0]}'s performance demonstrates years of experience and natural talent, making every scene memorable and engaging. `
            : 'Each scene is carefully crafted to ensure maximum engagement and satisfaction. ') +
          `Our production team ensures that lighting, angles, and audio quality meet the highest industry standards. ` +
          `The ${duration}-minute runtime is perfectly paced, maintaining viewer interest from start to finish without any dull moments.`
      }
      return `This carefully produced video maintains exceptional quality throughout its ${duration}-minute duration. ` +
        `Professional cinematography captures every important detail in stunning clarity. ` +
        `The pacing is expertly managed to keep viewers engaged while delivering satisfying content. ` +
        `Sound quality and visual presentation work together to create an immersive experience.`
    },
    () => {
      if (tags.length > 0) {
        return `What sets this video apart is its masterful execution of ${tags[0]}, ${tags[1] || 'passion'}, and ${tags[2] || 'intensity'}. ` +
          (performers.length > 0 
            ? `${performers[0]} brings authenticity and enthusiasm to every frame, creating genuine chemistry that translates beautifully on screen. `
            : 'The performers bring authenticity and enthusiasm to every frame, creating genuine chemistry. ') +
          `Shot with professional-grade equipment, the HD quality ensures you won't miss any subtle expressions or movements. ` +
          `The ${duration}-minute format allows for proper build-up and satisfying progression throughout the entire experience.`
      }
      return `Professional production values shine through in this ${duration}-minute masterpiece. ` +
        `Every technical aspect from lighting to sound has been optimized for viewer satisfaction. ` +
        `The HD quality brings unprecedented clarity to every scene and moment. ` +
        `Careful editing ensures smooth transitions and maintains perfect pacing throughout.`
    },
    () => {
      if (tags.length > 0) {
        return `This production showcases excellence in ${tags.slice(0, 3).join(', ')} categories with remarkable attention to detail. ` +
          (performers.length > 0 
            ? `${performers[0]}'s natural charisma and professional approach elevate the content beyond typical offerings in this genre. `
            : 'The natural charisma and professional approach elevate the content beyond typical offerings. ') +
          `High-definition cameras capture every nuance, while expert editing maintains perfect rhythm and flow. ` +
          `At ${duration} minutes, the video provides comprehensive entertainment without feeling rushed or drawn out.`
      }
      return `Technical excellence defines every aspect of this ${duration}-minute production. ` +
        `From crystal-clear visuals to pristine audio, no detail has been overlooked. ` +
        `Professional editing techniques ensure seamless viewing from beginning to end. ` +
        `The result is a polished, engaging experience that keeps viewers coming back.`
    },
    () => {
      if (tags.length > 0) {
        return `Experience the perfect fusion of ${tags[0]}, ${tags[1] || 'artistry'}, and ${tags[2] || 'passion'} in this exceptional video. ` +
          (performers.length > 0 
            ? `${performers[0]} delivers a performance that balances raw energy with refined technique, showcasing why they're highly sought after. `
            : 'The performers deliver balanced performances that showcase both energy and refined technique. ') +
          `State-of-the-art filming equipment captures everything in breathtaking HD clarity. ` +
          `The ${duration}-minute duration is optimized to provide complete satisfaction while respecting viewer time.`
      }
      return `This ${duration}-minute video represents the gold standard in adult entertainment production. ` +
        `Superior camera work and lighting create visually stunning scenes throughout. ` +
        `Audio engineering ensures clear, immersive sound that enhances the experience. ` +
        `Every element works in harmony to deliver premium quality content.`
    },
    () => {
      if (tags.length > 0) {
        return `Immerse yourself in premium ${tags.slice(0, 3).join(', ')} content that exceeds industry standards. ` +
          (performers.length > 0 
            ? `${performers[0]}'s commanding presence and skilled performance create unforgettable moments that resonate with viewers. `
            : 'Skilled performances create unforgettable moments that resonate with viewers. ') +
          `Advanced filming techniques and post-production polish result in flawless HD presentation. ` +
          `The ${duration}-minute format strikes the perfect balance between comprehensive content and optimal viewing length.`
      }
      return `Premium quality defines every second of this ${duration}-minute experience. ` +
        `Professional-grade production ensures consistent excellence throughout. ` +
        `HD resolution brings unprecedented detail and clarity to every frame. ` +
        `Thoughtful pacing and editing create a satisfying viewing journey.`
    }
  ]
  
  paragraphs.push(contentDetails[variant]())
  
  // PARAGRAPH 3: Platform Benefits & Community
  const platformBenefits = [
    () => `Spitxxx has established itself as the premier destination for free premium adult content, and this video exemplifies our commitment to quality. ` +
      `Our extensive library features thousands of videos like this one, with new content added daily to keep our collection fresh and exciting. ` +
      (tags.length > 0 
        ? `If you are passionate about ${tags[0]} content, you will find an unmatched selection here, carefully curated to meet diverse preferences. `
        : 'Our carefully curated collection meets diverse preferences and tastes. ') +
      `We prioritize user experience with fast streaming, mobile compatibility, and an intuitive interface that makes finding your preferred content effortless. ` +
      `Join our community of millions who have made Spitxxx their go-to source for adult entertainment.`,
    
    () => `At Spitxxx, we believe premium adult entertainment should be accessible to everyone, which is why all our content is completely free. ` +
      `This ${duration}-minute video is part of our vast collection that grows daily with fresh, high-quality additions. ` +
      (tags.length > 0 
        ? `Our ${tags[0]} category alone features hundreds of videos, ensuring you will never run out of content to explore. `
        : 'Our extensive categories ensure you will never run out of content to explore. ') +
      `We have invested in robust streaming infrastructure to deliver smooth playback on any device, whether you are watching on desktop, tablet, or mobile. ` +
      `Our user-friendly platform makes discovering new favorites simple and enjoyable.`,
    
    () => `Spitxxx stands out in the crowded adult entertainment landscape by consistently delivering superior quality without charging a penny. ` +
      `Our collection, including this ${duration}-minute gem, represents countless hours of curation and quality control. ` +
      (tags.length > 0 
        ? `The ${tags[0]} category is just one of many expertly organized sections designed to help you find exactly what you are looking for. `
        : 'Our expertly organized sections help you find exactly what you are looking for. ') +
      `We update our library daily, ensuring fresh content is always available alongside timeless favorites. ` +
      `With millions of satisfied users worldwide, Spitxxx has become synonymous with quality, variety, and reliability.`,
    
    () => `What makes Spitxxx special is our unwavering dedication to providing top-tier adult content absolutely free of charge. ` +
      `This video joins thousands of others in our meticulously maintained library, updated every single day with new releases. ` +
      (tags.length > 0 
        ? `Whether you are exploring ${tags[0]}, ${tags[1] || 'other categories'}, or discovering new interests, our platform has you covered. `
        : 'Whether exploring familiar favorites or discovering new interests, our platform has you covered. ') +
      `Our advanced streaming technology ensures buffer-free viewing, while our clean interface puts content discovery at your fingertips. ` +
      `Trusted by millions globally, we continue setting the standard for free premium adult entertainment.`,
    
    () => `Spitxxx has revolutionized access to premium adult content by offering everything completely free while maintaining exceptional quality standards. ` +
      `Our ever-growing library, featuring videos like this ${duration}-minute production, receives daily updates to keep content fresh and relevant. ` +
      (tags.length > 0 
        ? `With extensive ${tags[0]} offerings and dozens of other categories, there is something for every preference and mood. `
        : 'With dozens of categories, there is something for every preference and mood. ') +
      `We have optimized our platform for seamless viewing across all devices, ensuring you can enjoy content anytime, anywhere. ` +
      `Join the millions who have discovered why Spitxxx is the ultimate destination for free premium adult entertainment.`,
  ]
  
  paragraphs.push(platformBenefits[variant]())
  
  // PARAGRAPH 4: Related Content & Call to Action
  const callToAction = [
    () => {
      if (performers.length > 0) {
        return `Do not let your experience end here – explore our extensive collection of ${performers.join(' and ')} videos for more incredible content. ` +
          `We have assembled their best performances across multiple categories, giving you access to their complete portfolio. ` +
          (tags.length > 1 
            ? `Whether your interests lie in ${tags[0]}, ${tags[1]}, ${tags[2] || 'or other genres'}, our recommendation system helps you discover similar content you will love. `
            : 'Our recommendation system helps you discover similar content you will love. ') +
          `Browse related videos below to continue your entertainment journey, or use our search and filter tools to find exactly what you are craving. ` +
          `With new uploads daily, there is always something fresh to discover on Spitxxx.`
      }
      return `Your entertainment journey does not have to stop here – explore our related videos section for similar high-quality content. ` +
        (tags.length > 0 
          ? `Our ${tags[0]} category features hundreds of videos, each carefully selected for quality and appeal. `
          : 'Each video is carefully selected for quality and appeal. ') +
        `Use our intuitive navigation to discover new favorites, or let our recommendation algorithm guide you to content matching your preferences. ` +
        `With thousands of videos and daily updates, Spitxxx ensures your entertainment options are virtually limitless. ` +
        `Start exploring now and see why millions choose us for their adult entertainment needs.`
    },
    () => {
      if (performers.length > 0) {
        return `Extend your viewing pleasure by discovering more exceptional ${performers.join(', ')} content in our curated collection. ` +
          `We have gathered their finest work spanning various themes and styles, ensuring comprehensive coverage of their career highlights. ` +
          (tags.length > 1 
            ? `From ${tags[0]} to ${tags[1]} and beyond, our organized categories make finding your next favorite video effortless. `
            : 'Our organized categories make finding your next favorite video effortless. ') +
          `Check out the related videos section below, or dive into our full library using advanced search and filtering options. ` +
          `Remember, we add fresh content every day, so bookmark Spitxxx and return often for new discoveries.`
      }
      return `Continue your entertainment experience by exploring our carefully curated selection of related videos below. ` +
        (tags.length > 0 
          ? `If this ${tags[0]} video resonated with you, you will find dozens more in the same category, each offering unique appeal. `
          : 'Each video offers unique appeal and quality entertainment. ') +
        `Our platform smart recommendations learn from your viewing habits to suggest content you are likely to enjoy. ` +
        `With our commitment to daily updates and quality curation, Spitxxx remains your reliable source for premium free adult content. ` +
        `Start browsing now and unlock endless entertainment possibilities.`
    },
    () => {
      if (performers.length > 0) {
        return `Maximize your viewing experience by exploring our comprehensive ${performers.join(' and ')} video collection available on Spitxxx. ` +
          `From early career performances to recent releases, we have compiled an impressive archive showcasing their evolution and versatility. ` +
          (tags.length > 1 
            ? `Navigate through ${tags[0]}, ${tags[1]}, and ${tags[2] || 'other categories'} to find content that matches your current mood and preferences. `
            : 'Navigate through our categories to find content matching your preferences. ') +
          `Our related videos feature below provides instant access to similar content, while our search tools help you explore our entire library. ` +
          `With daily additions and a commitment to quality, Spitxxx keeps your entertainment options fresh and exciting.`
      }
      return `Enhance your entertainment journey by diving into our related videos section featuring similar high-quality productions. ` +
        (tags.length > 0 
          ? `Our ${tags[0]} collection represents just a fraction of our extensive library, with new additions arriving daily. `
          : 'Our extensive library welcomes new additions daily. ') +
        `Utilize our category browsing, search functionality, and personalized recommendations to discover content tailored to your tastes. ` +
        `Spitxxx commitment to providing free premium content means you can explore without limits or restrictions. ` +
        `Begin your discovery now and experience why we are the preferred choice for millions of users worldwide.`
    },
    () => {
      if (performers.length > 0) {
        return `Take your entertainment to the next level by exploring our full range of ${performers.join(', ')} videos on Spitxxx. ` +
          `Our collection spans their entire career, offering everything from breakthrough performances to latest releases. ` +
          (tags.length > 1 
            ? `Whether you are in the mood for ${tags[0]}, ${tags[1]}, or exploring ${tags[2] || 'new territories'}, we have content to satisfy every preference. `
            : 'We have content to satisfy every preference and interest. ') +
          `Scroll down to view related videos, or use our powerful search tools to navigate our vast library efficiently. ` +
          `With our daily content updates and quality-first approach, Spitxxx ensures you will always find something new and exciting to watch.`
      }
      return `Expand your viewing horizons by exploring the wealth of related content available in our extensive video library. ` +
        (tags.length > 0 
          ? `The ${tags[0]} category alone offers hundreds of options, each vetted for quality and viewer satisfaction. `
          : 'Each video is vetted for quality and viewer satisfaction. ') +
        `Our intelligent recommendation system suggests content based on your viewing patterns, helping you discover hidden gems. ` +
        `As a completely free platform, Spitxxx removes all barriers between you and premium adult entertainment. ` +
        `Start exploring our related videos below and see what exciting content awaits your discovery.`
    },
    () => {
      if (performers.length > 0) {
        return `Unlock even more entertainment by browsing our complete ${performers.join(' and ')} video archive on Spitxxx. ` +
          `We have curated their best work across multiple years and genres, creating a comprehensive resource for fans. ` +
          (tags.length > 1 
            ? `Explore ${tags[0]}, ${tags[1]}, ${tags[2] || 'and more'} to experience the full range of content available. `
            : 'Experience the full range of content available across our platform. ') +
          `Our related videos section below offers immediate access to similar content, while category browsing reveals our full collection. ` +
          `Trust Spitxxx to deliver daily updates, consistent quality, and the best free premium adult entertainment available online.`
      }
      return `Continue your entertainment adventure by exploring our thoughtfully organized collection of related videos. ` +
        (tags.length > 0 
          ? `If you enjoyed this ${tags[0]} content, our extensive category features many more videos designed to captivate and satisfy. `
          : 'Our extensive categories feature many more videos designed to captivate and satisfy. ') +
        `Take advantage of our user-friendly interface, advanced filtering options, and smart recommendations to find your next favorite. ` +
        `Spitxxx dedication to free, high-quality content means unlimited exploration without any barriers or costs. ` +
        `Dive into our related videos now and discover why millions trust us for their adult entertainment needs.`
    }
  ]
  
  paragraphs.push(callToAction[variant]())
  
  return paragraphs.filter(Boolean)
}

export async function generateMetadata({ params }) {
  const raw = params.id
  const id = extractMongoId(raw)
  let video
  try {
    video = await api.getVideoById(id)
  } catch (e) {
    // ignore
  }

  const title = video?.titel || video?.title || 'Video'
  const description = video?.desc || video?.metatitel || 'Watch premium video on Spitxxx.'
  const canonicalBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://spitxxx.com'
  const titleSlug = slugify(title)
  const canonical = `${canonicalBase}/video/${id}${titleSlug ? `-${titleSlug}` : ''}`
  const imageUrl = video?.imageUrl || `${canonicalBase}/og-image.jpg`

  // Generate comprehensive keywords
  const keywords = [
    ...(Array.isArray(video?.tags) ? video.tags : []),
    ...(Array.isArray(video?.name) ? video.name : []),
    'spitxxx', 'premium video', 'adult entertainment'
  ].filter(Boolean).join(', ')

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Spitxxx',
      type: 'video.other',
      locale: 'en_US',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      videos: video?.iframeUrl ? [
        {
          url: video.iframeUrl,
          width: 1280,
          height: 720,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@spitxxx',
    },
    other: {
      'video:duration': video?.minutes ? `${video.minutes * 60}` : undefined,
      'video:release_date': video?.createdAt || undefined,
    }
  }
}

export default async function VideoDetailPage({ params, searchParams }) {
  const raw = params.id
  const id = extractMongoId(raw)
  let video = null
  try {
    video = await api.getVideoById(id)
  } catch (e) {
    // ignore
  }

  if (!video) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-semibold mb-4">Video not found</h1>
        <Link className="text-purple-500" href="/">Go back home</Link>
      </div>
    )
  }

  // Determine tags list for related videos
  const videoTags = Array.isArray(video.tags) ? video.tags.filter(Boolean) : []

  // Related videos with pagination from query param `page`
  const relatedPage = Number(searchParams?.page || 1)

  // Strategy: fetch top N from each tag, merge, de-duplicate, sort, then paginate locally
  let mergedRelated = []
  if (videoTags.length > 0) {
    try {
      const perTagLimit = 50 // adjust if needed
      const results = await Promise.all(
        videoTags.map((t) => api.getPostsByTag(t, 1, perTagLimit).catch(() => ({ records: [], data: [] })))
      )
      const combined = results.flatMap(r => r.records || r.data || [])
      // De-duplicate by _id and exclude current video
      const uniqMap = new Map()
      for (const item of combined) {
        const idStr = String(item._id || '')
        if (!idStr || idStr === String(video._id || id)) continue
        if (!uniqMap.has(idStr)) uniqMap.set(idStr, item)
      }
      mergedRelated = Array.from(uniqMap.values())
      // Sort by createdAt desc if present, else by views desc
      mergedRelated.sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0
        if (aTime !== 0 || bTime !== 0) return bTime - aTime
        return (b.views || 0) - (a.views || 0)
      })
    } catch (e) {}
  }

  const pageSize = 16
  const totalRelated = mergedRelated.length
  const totalRelatedPages = Math.max(1, Math.ceil(totalRelated / pageSize))
  const pagedRelated = mergedRelated.slice((relatedPage - 1) * pageSize, relatedPage * pageSize)

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.titel || video.title || 'Video',
    "description": video.desc || video.metatitel || 'Watch premium video on Spitxxx',
    "thumbnailUrl": video.imageUrl || '',
    "uploadDate": video.createdAt || new Date().toISOString(),
    "duration": video.minutes ? `PT${video.minutes}M` : undefined,
    "contentUrl": video.link || '',
    "embedUrl": video.iframeUrl || undefined,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "WatchAction" },
      "userInteractionCount": video.views || 0
    }
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {relatedPage === 1 && (
        <>
          <h1 className="text-2xl font-semibold mb-4">{video.titel || 'Video'}</h1>

          {/* Dummy player section with redirect on play click */}
          <VideoRedirect link={video.link} imageUrl={video.imageUrl} title={video.titel} video={video} />

          {/* Enhanced Meta info with better styling */}
          <div className="mt-6 bg-gray-900/50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-400">Duration:</span>
                  <span className="ml-2 font-medium">{video.minutes || 'N/A'} minutes</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="text-gray-400">Views:</span>
                  <span className="ml-2 font-medium">{new Intl.NumberFormat('en-US').format(video.views || 0)}</span>
                </div>
                {video.createdAt && (
                  <div className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-400">Added:</span>
                    <span className="ml-2 font-medium">{new Date(video.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {Array.isArray(video.name) && video.name.length > 0 && (
                  <div>
                    <div className="flex items-center text-gray-400 mb-2">
                      <svg className="w-5 h-5 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span>Pornstars:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {video.name.map((n, i) => (
                        <Link 
                          key={i} 
                          className="inline-flex items-center bg-gray-800 hover:bg-pink-900 px-3 py-1.5 rounded-full text-sm text-pink-300 hover:text-white transition-colors"
                          href={`/pornstar/${n.toLowerCase().replace(/\s+/g,'-')}`}
                        >
                          {n}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Tags Section */}
            {Array.isArray(video.tags) && video.tags.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-center text-gray-400 mb-3">
                  <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="font-medium">Categories:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {video.tags.map((t, i) => (
                    <Link 
                      key={i} 
                      className="inline-flex items-center bg-gray-800 hover:bg-purple-900 px-3 py-1.5 rounded-full text-sm text-purple-300 hover:text-white transition-colors"
                      href={`/tag/${t.toLowerCase().replace(/\s+/g,'-')}`}
                    >
                      {t}
                    </Link>
                  ))}

                   {relatedPage === 1 && (
        <ExpandableContent 
          title="About This Video" 
          content={generateUniqueContent(video)}
          defaultExpanded={false}
        />
      )}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Related Videos with Show More */}
      {videoTags.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              More Videos You May Like
            </h2>
            <div className="text-sm text-gray-400 bg-gray-900/50 px-3 py-1 rounded-full">
              {totalRelated} videos
            </div>
          </div>
          
          {pagedRelated.length > 0 ? (
            <>
              <div className="grid video-grid">
                {pagedRelated.map((v, idx) => (
                  <VideoCard key={v._id || idx} video={v} />
                ))}
              </div>
              
              {totalRelatedPages > 1 && (
                <div className="mt-8">
                  <Pagination 
                    basePath={`/video/${id}-${slugify(video?.titel || video?.title || '')}?`} 
                    currentPage={relatedPage} 
                    totalPages={totalRelatedPages} 
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-gray-900/30 rounded-lg">
              <p className="text-gray-400 mb-4">No related videos found</p>
              <Link 
                href="/" 
                className="inline-flex items-center bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Browse All Videos
              </Link>
            </div>
          )}
        </div>
      )}

     
      </div>
    </>
  )
}
