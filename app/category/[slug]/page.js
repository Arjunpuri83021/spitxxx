import { api } from '../../lib/api'
import VideoCard from '../../components/VideoCard'
import Pagination from '../../components/Pagination'

export const revalidate = 60

const categoryTitles = {
  'chochox': 'Chochox',
  'scout69': 'Scout69',
  'comxxx': 'Comxxx',
  'lesbify': 'Lesbify',
  'milfnut': 'MilfNut',
  'badwap': 'Badwap',
  'sex-sister': 'Sex Sister',
  'sex18': 'Sex18',
  'desi49': 'Desi49',
  'dehati-sex': 'Dehati Sex',
  'boobs-pressing': 'Boobs Pressing',
  'blueflim': 'Blue Film',
  'aunt-sex': 'Aunt Sex',
  'famili-sex-com': 'Family Sex',
  'teen-sex': 'Teen Sex',
  'small-tits': 'Small Tits',
  'fullporner': 'Fullporner',
}

// Map slug -> search keyword (from legacy components)
const categorySearch = {
  'badwap': 'bad',
  'scout69': 'big',
  'blueflim': 'porn',
  'lesbify': 'lesbian',
  'famili-sex-com': 'family',
  'sex-sister': 'sis',
  'sex18': 'room',
  'dehati-sex': 'indian',
  'boobs-pressing': 'boobs',
  'aunt-sex': 'mom',
  'teen-sex': 'teen',
  'small-tits': 'tits',
  'comxxx': 'step',
  'chochox': 'ass',
  'milfnut': 'milf',
  'desi49': 'desi',
  'fullporner': 'girl',
}

// Legacy-like meta templates per category
const categoryMeta = {
  'badwap': {
    title: (page) => `Spitxxx badwap Videos page ${page} - badwap xvedeo`,
    desc: 'Explore a collection of premium badwap videos on Spitxxx. Enjoy handpicked, high-quality content filtered for your preferences.',
  },
  'blueflim': {
    title: (page) => `Spitxxx Blueflim Videos Page ${page} – Watch HD videos online`,
    desc: 'Explore a collection of premium Blueflim videos on Spitxxx. Enjoy handpicked, high-quality content filtered for your preferences.',
  },
  'scout69': {
    title: (page) => `Spitxxx Scout69 Videos page ${page} - bad wap wwwxxx xvedeo`,
    desc: 'Explore a collection of premium Scout69 Big boobs big dick videos on Spitxxx. Enjoy handpicked, high-quality content filtered for your preferences.',
  },
  'lesbify': {
    title: (page) => `Spitxxx Lesbify Videos page ${page} - xxxhd,wwwsexcom videos`,
    desc: 'Explore a collection of premium lesbian videos on Spitxxx. Enjoy handpicked, high-quality content filtered for your preferences.',
  },
  'famili-sex-com': {
    title: (page) => `Spitxxx famili sex com page ${page} - step family xvedeo`,
    desc: 'Explore a collection of premium famili sex com videos on Spitxxx. Enjoy handpicked, high-quality content filtered for your preferences.',
  },
  'boobs-pressing': {
    title: (page) => `Spitxxx Boobs Pressing page ${page} Videos – Watch HD clips now`,
    desc: 'Explore a collection of premium boobs pressing videos on Spitxxx. Enjoy handpicked, high-quality content filtered for your preferences.',
  },
  'small-tits': {
    title: (page) => `Spitxxx Small Tits sex Videos page ${page} - 4K Pornstar 3pornstar`,
    desc: 'Explore a collection of premium SmallTits videos. Enjoy handpicked, high-quality content filtered for your preferences.',
  },
  'sex18': {
    title: (page) => `Spitxxx sex18 Videos page ${page} - xxxhd,wwwsexcom videos`,
    desc: 'Explore a collection of premium sex18 videos on Spitxxx. Enjoy handpicked, high-quality content filtered for your preferences.',
  },
  'desi49': {
    title: (page) => `Spitxxx Desi49 Sex Videos page ${page} – Watch hot desi clips in HD`,
    desc: 'Explore a collection of premium desi49 videos on Spitxxx. Enjoy handpicked, high-quality content filtered for your preferences.',
  },
  'dehati-sex': {
    title: (page) => `Spitxxx Dehati Videos page ${page} – Watch rural desi clips in HD`,
    desc: 'Explore a collection of premium Milf videos on Dehati. Enjoy handpicked, high-quality content filtered for your preferences.',
  },
  'chochox': {
    title: (page) => `Spitxxx chochox Videos page ${page} – Watch Cartoon porn clips in HD`,
    desc: 'Explore a collection of premium chochox videos on Spitxxx. Enjoy handpicked, high-quality content filtered for your preferences.',
  },
  'comxxx': {
    title: (page) => `Spitxxx comxxx Videos Page ${page} – Watch HD videos online`,
    desc: 'Explore a collection of premium comxxx videos on Spitxxx. Enjoy handpicked, high-quality content filtered for your preferences.',
  },
  'milfnut': {
    title: (page) => `Spitxxx MilfNut Videos page ${page} - milf300 wwwxxx`,
    desc: 'Explore a collection of premium MilfNut videos on Spitxxx. Enjoy handpicked, high-quality content filtered for your preferences.',
  },
  'fullporner': {
    title: (page) => `Spitxxx fullporner Videos page ${page} - bad wap wwwxxx xvedeo`,
    desc: 'Explore a collection of premium fullporner Big boobs big dick videos on Spitxxx. Enjoy handpicked, high-quality content filtered for your preferences.',
  },
  'aunt-sex': {
    title: (page) => `Spitxxx Aunt Sex Videos page ${page} - milf300 wwwxxx`,
    desc: 'Explore a collection of premium Aunt Sex videos on Spitxxx. Enjoy handpicked, high-quality content filtered for your preferences.',
  },
  'teen-sex': {
    title: (page) => `Spitxxx Teen Sex Videos page ${page}`,
    desc: 'Explore a collection of premium Teen sex videos on Spitxxx. Enjoy handpicked, high-quality content filtered for your preferences.',
  },
}

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug
  const page = Number(searchParams?.page || 1)
  const titleBase = categoryTitles[slug] || slug.replace(/-/g, ' ')
  const meta = categoryMeta[slug]
  const title = meta ? meta.title(page) : (page > 1 ? `${titleBase} Videos - Page ${page}` : `${titleBase} Videos`)
  const description = meta ? meta.desc : `Watch ${titleBase} videos on Spitxxx${page > 1 ? ` - Page ${page}` : ''}.`
  const canonicalBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://spitxxx.com'
  const canonical = page > 1 ? `${canonicalBase}/category/${slug}/${page}` : `${canonicalBase}/category/${slug}`
  return {
    title,
    description,
    alternates: { canonical },
  }
}

export default async function CategoryPage({ params, searchParams }) {
  const slug = params.slug
  const page = Number(params.page || searchParams?.page || 1)
  const query = categorySearch[slug] || slug.replace(/-/g, ' ')
  const data = await api.searchPosts(query, page, 16, '').catch(() => ({ records: [], totalPages: 1, totalRecords: 0 }))
  const titleBase = categoryTitles[slug] || slug.replace(/-/g, ' ')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">{titleBase} Videos</h1>
        <p className="text-gray-400 mt-1 text-sm">Showing page {page} of {data.totalPages || 1} ({data.totalRecords || 0} total videos)</p>
      </div>
      <div className="grid video-grid">
        {(data.records || []).map((v, idx) => (
          <VideoCard key={v._id || idx} video={v} />
        ))}
      </div>
      <Pagination basePath={`/category/${slug}`} currentPage={page} totalPages={data.totalPages || 1} />
    </div>
  )
}
