import type { GetServerSideProps } from 'next'

import { prisma } from '../lib/prisma'

const BASE_URL = 'https://curhat.space'

function createUrlElement(url: string) {
  return `<url>
  <loc>${url}</loc>
</url>`
}

function generateSiteMap(curhat: { id: string }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://curhat.space</loc>
     </url>
     <url>
       <loc>https://curhat.space/about</loc>
     </url>
     <url>
       <loc>https://curhat.space/explore</loc>
     </url>
     ${curhat
       .map(({ id }) => {
         return `<url>
      <loc>${`${BASE_URL}/curhat/${id}`}</loc>
    </url>`
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      timestamp: 'desc'
    },
    select: {
      id: true
    }
  })

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default SiteMap
