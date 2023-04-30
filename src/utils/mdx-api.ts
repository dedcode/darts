import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { join } from 'path';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { ImageMeta, PostMatter } from '../pages/posts';
import { isProduction } from './constants';
import { getTimeToRead } from './helpers';
import { blurImage } from './remark-blur-image';
import { highlightCodeBlock } from './remark-highlight';

export function getPostsInfo() {
  const slugs = fs
    .readdirSync(join(process.cwd(), 'src', '_posts'))
    .map((name) => name.replace('.mdx', ''));

  const postsMeta = slugs
    .map((slug) => {
      const fileContents = fs.readFileSync(
        join(process.cwd(), 'src', '_posts', `${slug}.mdx`),
        'utf-8'
      );
      const matterResult = matter(fileContents);
      return {
        slug,
        timeToRead: getTimeToRead(matterResult.content),
        ...(matterResult.data as PostMatter)
      };
    })
    .filter((meta) => {
      // Filter out draft posts, but only in production
      if (isProduction && meta.draft) return false;
      return true;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return { slugs, postsMeta };
}

export async function getPostBySlug(slug: string) {
  const sharedImgMeta = JSON.parse(
    fs.readFileSync(
      join(process.cwd(), 'public', 'images', 'imgMeta.json'),
      'utf-8'
    )
  ) as { [key: string]: ImageMeta };

  let imgMeta: { [key: string]: ImageMeta };

  const postImagePath = join(
    process.cwd(),
    'public',
    'images',
    'posts',
    slug,
    'imgMeta.json'
  );

  if (fs.existsSync(postImagePath)) {
    const pathImgMeta = JSON.parse(fs.readFileSync(postImagePath, 'utf-8')) as {
      [key: string]: ImageMeta;
    };

    imgMeta = { ...sharedImgMeta, ...pathImgMeta };
  } else imgMeta = sharedImgMeta;

  const fileContents = fs.readFileSync(
    join(process.cwd(), 'src', '_posts', `${slug}.mdx`),
    'utf-8'
  );

  const { content, data } = matter(fileContents);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [highlightCodeBlock, [blurImage, imgMeta], remarkMath],
      rehypePlugins: [rehypeKatex]
    },
    scope: data
  });

  return {
    slug: slug,
    source: mdxSource,
    featuredImageMeta: imgMeta['featuredImage.png']
      ? imgMeta['featuredImage.png']
      : null,
    timeToRead: getTimeToRead(content),
    ...(data as PostMatter)
  };
}
