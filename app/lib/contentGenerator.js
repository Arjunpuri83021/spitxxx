// Reusable content generator for category pages
export function generateCategoryContent(categoryName, videos, totalVideos) {
  const videoTitles = videos.slice(0, 4).map(v => v.titel || v.title).filter(Boolean)
  const pornstars = [...new Set(videos.flatMap(v => v.name || []).filter(Boolean))].slice(0, 5)
  const tags = [...new Set(videos.flatMap(v => v.tags || []).filter(Boolean))].slice(0, 5)
  
  // Create hash from category name for consistent variations
  const hash = categoryName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const variant = hash % 4 // 4 different variations
  
  const paragraphs = []
  
  // Paragraph 1: Introduction
  const intros = [
    () => `Explore ${totalVideos} premium ${categoryName} porn videos on Spitxxx, featuring the finest adult content in HD quality. ` +
      (videoTitles.length > 0
        ? `Discover popular videos like "${videoTitles[0]}"${videoTitles[1] ? `, "${videoTitles[1]}"` : ''}${videoTitles[2] ? `, and "${videoTitles[2]}"` : ''} in our extensive collection. `
        : 'Discover our extensive collection of premium content. ') +
      (pornstars.length > 0
        ? `Watch ${pornstars.slice(0, 2).join(' and ')} along with other top performers in authentic ${categoryName} scenes. `
        : 'Watch top performers in authentic scenes. ') +
      `Our ${categoryName} category delivers exceptional quality and variety for every preference.`,
    
    () => `Welcome to the ultimate ${categoryName} video collection featuring ${totalVideos} exclusive HD videos on Spitxxx. ` +
      (videoTitles.length > 0
        ? `From trending content like "${videoTitles[0]}" to hidden gems${videoTitles[1] ? ` such as "${videoTitles[1]}"` : ''}, our library offers comprehensive ${categoryName} entertainment. `
        : `Our library offers comprehensive entertainment. `) +
      (pornstars.length > 0
        ? `Featuring performances by ${pornstars[0]}${pornstars[1] ? `, ${pornstars[1]}` : ''}${pornstars[2] ? `, and ${pornstars[2]}` : ''}, each video showcases professional quality. `
        : 'Each video showcases professional quality. ') +
      `Experience the best ${categoryName} content available online, streaming free in crystal-clear HD.`,
    
    () => `Discover ${totalVideos} handpicked ${categoryName} porn videos on Spitxxx, where quality meets variety. ` +
      (videoTitles.length > 0
        ? `Popular selections include "${videoTitles[0]}"${videoTitles[1] ? ` and "${videoTitles[1]}"` : ''}${videoTitles[2] ? `, plus "${videoTitles[2]}"` : ''} and countless other premium videos. `
        : 'Countless premium videos await your discovery. ') +
      (pornstars.length > 0
        ? `Our ${categoryName} collection features industry favorites like ${pornstars.slice(0, 2).join(' and ')}, delivering performances that exceed expectations. `
        : 'Our collection delivers performances that exceed expectations. ') +
      `Every video is available for instant streaming in HD quality.`,
    
    () => `Immerse yourself in ${totalVideos} exceptional ${categoryName} videos, exclusively available on Spitxxx in premium HD. ` +
      (videoTitles.length > 0
        ? `Must-watch content includes "${videoTitles[0]}"${videoTitles[1] ? `, "${videoTitles[1]}"` : ''}${videoTitles[2] ? `, and "${videoTitles[2]}"` : ''}, representing the finest ${categoryName} entertainment. `
        : `Representing the finest entertainment available. `) +
      (pornstars.length > 0
        ? `Watch ${pornstars[0]}${pornstars[1] ? ` and ${pornstars[1]}` : ''} showcase their talents in authentic ${categoryName} performances. `
        : 'Watch talented performers showcase authentic performances. ') +
      `Our curated ${categoryName} library ensures you always find exactly what you are looking for.`
  ]
  
  paragraphs.push(intros[variant]())
  
  // Paragraph 2: Content quality
  const contentDetails = [
    () => `Our ${categoryName} collection spans ${totalVideos} carefully selected videos, each meeting strict quality standards for HD resolution. ` +
      (pornstars.length > 0
        ? `Featuring renowned performers including ${pornstars.slice(0, 3).join(', ')}, every video delivers professional cinematography and authentic performances. `
        : 'Every video delivers professional cinematography and authentic performances. ') +
      (tags.length > 0
        ? `The diverse range includes ${tags.slice(0, 3).join(', ')} content, ensuring something for every taste. `
        : 'The diverse range ensures something for every taste. ') +
      `Regular updates keep the collection fresh with new ${categoryName} videos added frequently.`,
    
    () => `With ${totalVideos} premium videos in our ${categoryName} category, Spitxxx offers unmatched variety and consistent quality. ` +
      (pornstars.length > 0
        ? `Top performers like ${pornstars[0]}${pornstars[1] ? ` and ${pornstars[1]}` : ''} bring their expertise to create memorable ${categoryName} content. `
        : 'Top performers bring their expertise to create memorable content. ') +
      (tags.length > 0
        ? `Explore ${tags[0]}, ${tags[1] || 'passionate'}, and ${tags[2] || 'intense'} scenes all in one place. `
        : 'Explore diverse scenes all in one place. ') +
      `Each video undergoes quality review to ensure HD clarity and engaging performances throughout.`,
    
    () => `The ${categoryName} category features ${totalVideos} meticulously curated videos showcasing diverse styles. ` +
      (pornstars.length > 0
        ? `Industry professionals including ${pornstars.slice(0, 3).join(', ')} deliver performances that highlight why ${categoryName} content remains so popular. `
        : `Professional performances highlight why this content remains so popular. `) +
      (tags.length > 0
        ? `From ${tags[0]} to ${tags[1] || 'other themes'}, superior production values define every video. `
        : 'Superior production values define every video. ') +
      `Continuous content updates mean the library evolves constantly with both classics and latest releases.`,
    
    () => `Our ${totalVideos}-video ${categoryName} library represents the pinnacle of free adult entertainment. ` +
      (pornstars.length > 0
        ? `Watch ${pornstars[0]}${pornstars[1] ? `, ${pornstars[1]}` : ''}${pornstars[2] ? `, and ${pornstars[2]}` : ''} demonstrate why they are favorites in ${categoryName} content. `
        : 'Watch talented performers demonstrate their skills. ') +
      (tags.length > 0
        ? `Enjoy ${tags.slice(0, 3).join(', ')} and more, all in premium HD quality. `
        : 'Enjoy premium HD quality throughout. ') +
      `Every video maintains professional standards with HD resolution and engaging performances from start to finish.`
  ]
  
  paragraphs.push(contentDetails[variant]())
  
  // Paragraph 3: Platform benefits
  const platformBenefits = [
    () => `Spitxxx provides unlimited free access to all ${totalVideos} ${categoryName} videos without registration or hidden fees. ` +
      `Our platform delivers fast, buffer-free streaming on any device, whether desktop, tablet, or mobile. ` +
      `The ${categoryName} collection updates regularly with new releases, ensuring fresh content to explore. ` +
      `Join millions who trust Spitxxx for premium ${categoryName} entertainment.`,
    
    () => `Watch all ${totalVideos} ${categoryName} porn videos completely free on Spitxxx, with no subscriptions or payment barriers. ` +
      `We have built robust streaming infrastructure to ensure smooth playback and quick loading times. ` +
      `New ${categoryName} content arrives regularly, keeping the collection current with latest trends. ` +
      `Experience the convenience of a platform designed specifically for adult entertainment enthusiasts.`,
    
    () => `Spitxxx offers unrestricted access to ${totalVideos} premium ${categoryName} videos at absolutely no cost. ` +
      `Our user-friendly interface makes browsing the ${categoryName} category effortless with intuitive navigation. ` +
      `Regular content updates ensure the ${categoryName} library stays fresh with new videos added frequently. ` +
      `Trust a platform that has served millions with reliable streaming and comprehensive content collections.`,
    
    () => `Access the complete ${categoryName} collection of ${totalVideos} videos for free on Spitxxx with unlimited streaming. ` +
      `Advanced streaming technology ensures high-quality playback without buffering on any device. ` +
      `Stay current with the latest ${categoryName} releases through our frequent content updates. ` +
      `Discover why Spitxxx has become the go-to destination for fans seeking premium ${categoryName} entertainment.`
  ]
  
  paragraphs.push(platformBenefits[variant]())
  
  // Paragraph 4: Call to action
  const callToActions = [
    () => `Start exploring our ${totalVideos} ${categoryName} videos now and discover why this category captivates audiences worldwide. ` +
      (videoTitles.length > 0
        ? `Do not miss trending videos like "${videoTitles[0]}" and other popular titles in our extensive library. `
        : 'Do not miss the popular titles in our extensive library. ') +
      `Use our filtering and sorting options to find exactly what you want by popularity, upload date, or duration. ` +
      `With free unlimited streaming and daily updates, Spitxxx ensures you always have access to the best ${categoryName} content online.`,
    
    () => `Begin your journey through ${totalVideos} exceptional ${categoryName} videos and experience adult entertainment at its finest. ` +
      (videoTitles.length > 0
        ? `Check out must-see content including "${videoTitles[0]}"${videoTitles[1] ? ` and "${videoTitles[1]}"` : ''} to understand why ${categoryName} remains so popular. `
        : `Understand why this category remains so popular among fans. `) +
      `Our platform makes discovering new favorites easy while allowing you to revisit beloved classics anytime. ` +
      `Join our community today and enjoy unlimited access to premium ${categoryName} entertainment.`,
    
    () => `Dive into the extensive ${categoryName} library featuring ${totalVideos} premium videos, all available for immediate free streaming. ` +
      (videoTitles.length > 0
        ? `Start with highly rated videos like "${videoTitles[0]}" to see why ${categoryName} content attracts such dedicated viewership. `
        : `See why this content attracts such dedicated viewership. `) +
      `Our recommendation system helps you discover similar content and explore the full range of ${categoryName} offerings. ` +
      `Experience the difference that quality content and user-focused platform design make in your viewing experience.`,
    
    () => `Unlock access to all ${totalVideos} ${categoryName} videos and immerse yourself in premium adult entertainment. ` +
      (videoTitles.length > 0
        ? `Featured content like "${videoTitles[0]}"${videoTitles[1] ? ` and "${videoTitles[1]}"` : ''} showcases exactly why ${categoryName} remains a top category. `
        : `Discover exactly why this remains a top category. `) +
      `Browse the complete collection, bookmark your favorites, and return anytime for more exceptional ${categoryName} content. ` +
      `Spitxxx delivers the ultimate ${categoryName} viewing experience with free, unlimited access to every video.`
  ]
  
  paragraphs.push(callToActions[variant]())
  
  return paragraphs.filter(Boolean)
}
