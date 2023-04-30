import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { join } from 'path';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { ImageMeta, PostMatter } from '../pages/posts';
import { getTimeToRead } from './helpers';
import { highlightCodeBlock } from './remark-highlight';

export function getPostSlugs() {
  const mdxFileNames = fs.readdirSync(join(process.cwd(), 'src', '_posts'));

  return mdxFileNames.map((name) => name.replace('.mdx', ''));
}

export function getPostsMeta() {
  const slugs = getPostSlugs();
  return slugs
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
    .sort((a, b) => (a.date < b.date ? 1 : -1));
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
    // source: matterResult.content,
    mdxOptions: {
      remarkPlugins: [highlightCodeBlock, remarkMath],
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
