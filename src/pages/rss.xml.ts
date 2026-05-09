import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const reviews = (await getCollection('reviews', ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
    .slice(0, 30);

  return rss({
    title: 'lateston.ai',
    description: 'Engineering reviews of the latest in AI, through The Standard.',
    site: context.site ?? 'https://lateston.ai',
    items: reviews.map((review) => ({
      title: review.data.title,
      pubDate: review.data.publishedAt,
      description: `${review.data.verdict}\n\n${review.data.description}`,
      link: `/reviews/${review.slug}/`,
      categories: [review.data.action, review.data.depth, ...review.data.tags],
    })),
    customData: '<language>en-us</language>',
  });
}
