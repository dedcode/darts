import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Pill from '../components/pill';
import ReadHearts from '../components/read-hearts';
import SEO from '../components/seo';
import { getPostsInfo } from '../utils/mdx-api';

export type PostMatter = {
  title: string;
  tags: string[];
  date: string;
  description: string;
  draft: boolean;
};

export interface ImageMeta {
  fileName: string;
  relativePath: string;
  width: number;
  height: number;
  imgBase64: string;
}

export default function PostsPage({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  let tagList: string[] = [];
  posts.map((post) => (tagList = tagList.concat(post.tags)));
  tagList = [...new Set(tagList)];
  tagList.sort();
  tagList.unshift('All');

  const router = useRouter();

  let initialTopic = 'All';
  const [selectedTag, setSelectedTag] = useState(initialTopic);

  useEffect(() => {
    if (router.isReady) {
      if (router.query) {
        const filter = router.query.filter as string;
        setSelectedTag(filter ?? 'All');
      }
    }
  }, [router]);

  const filteredPosts =
    selectedTag === 'All'
      ? posts
      : posts.filter((post) => post.tags.find((tag) => tag === selectedTag));

  const topics = tagList.map((tag, index) => {
    return (
      <Link key={index} href={`/posts?filter=${tag}`} className="my-1">
        <Pill active={selectedTag === tag}>{tag}</Pill>
      </Link>
    );
  });

  const postsIndex = filteredPosts.map((post, index) => {
    const postTags = !post.tags.length
      ? null
      : post.tags.map((tag, index) => (
          <Link key={index} href={`/posts?filter=${tag}`} className="my-1">
            <Pill active={selectedTag === tag}>{tag}</Pill>
          </Link>
        ));

    return (
      <div className="mt-12" key={index}>
        <div className="mb-4 flex flex-wrap space-x-4">{postTags}</div>
        <Link href={`/posts/${post.slug}`}>
          <h2 className="my-2">{post.title}</h2>
          <div className="mb-8 flex flex-col text-gray-700 dark:text-gray-400 sm:flex-row sm:text-center">
            <span className="mr-2">
              {post.date} <span className="hidden sm:inline-block">•</span>{' '}
            </span>
            <span className="flex items-center">
              <span className="mr-2 flex flex-wrap">
                <ReadHearts readTimeMins={post.timeToRead} />
              </span>{' '}
              {post.timeToRead} minute read
            </span>
            {post.draft && (
              <span className="ml-2 rounded-full bg-red-200 px-4 py-1 text-sm font-bold text-red-500">
                Draft
              </span>
            )}
          </div>
          <p className="-mt-2">{post.description}</p>
        </Link>
      </div>
    );
  });

  return (
    <div>
      <SEO title="Posts - Danny Libin" />
      <div className="mt-20">
        <div className="flex flex-wrap space-x-4">{topics}</div>
        <div>{postsIndex}</div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: { posts: getPostsInfo().postsMeta }
  };
}
