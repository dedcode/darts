import React, { useEffect, useState } from 'react';
import ReadHearts from '../components/read-hearts';
import SEO from '../components/seo';
import SpinnerIcon from '../components/svg/spinner-icon';
import TextLink from '../components/text-link';

type Posts = {
  excerpt: string;
  timeToRead: number;
  date: string;
  description: string;
  title: string;
  tags: string[];
  slug: string;
}[];

export interface ImageMeta {
  fileName: string;
  relativePath: string;
  width: number;
  height: number;
  imgBase64: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Posts>(null);
  const [loading, setLoading] = useState(true);

  const qiqBaseURL = 'https://questsincode.com';

  useEffect(() => {
    fetch(`${qiqBaseURL}/postsMetaData.json`)
      .then(res => res.json())
      .then((data: Posts) => {
        // data.sort((a, b) => (a.date > b.date ? -1 : 1));
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const postsIndex = loading ? (
    <div className="w-full flex justify-center">
      <SpinnerIcon className="text-teal-500 w-12" />
    </div>
  ) : (
    posts.map((post, index) => {
      const postTags = !post.tags.length
        ? null
        : post.tags.map((tag, index) => (
            <a
              key={index}
              target="_blank"
              href={`${qiqBaseURL}/topics?topic=${tag}`}
              className="my-1"
            >
              <span
                className={
                  'py-1 px-4 text-sm font-semibold tracking-widest rounded-full cursor-pointer transition duration-200 ease-in-out bg-teal-100 text-teal-700 hover:bg-teal-200 dk:bg-blue-900 dk:text-teal-100 dk-hover:bg-blue-700' +
                  (index >= 1 ? ' ml-4' : '')
                }
              >
                {tag}
              </span>
            </a>
          ));

      return (
        <div className="mt-12" key={index}>
          <div className="mb-4 flex flex-wrap">{postTags}</div>
          <a target="_blank" href={`${qiqBaseURL}/posts/${post.slug}`}>
            <h2 className="my-2">{post.title}</h2>
            <div className="mb-8 text-gray-700 dk:text-gray-500 flex flex-col sm:flex-row sm:text-center">
              <span className="mr-2">
                {post.date} <span className="hidden sm:inline-block">•</span>{' '}
              </span>
              <span className="flex items-center">
                <span className="flex mr-2">
                  <ReadHearts readTimeMins={post.timeToRead} />
                </span>{' '}
                {post.timeToRead} minute read
              </span>
            </div>
            <p className="-mt-2">
              {post.description ? post.description : post.excerpt}
            </p>
          </a>
        </div>
      );
    })
  );

  return (
    <div>
      <SEO title="Posts - Danny Libin" />
      <h1 className="text-center mt-20 text-3xl">
        I blog about my coding journey over at{' '}
        <TextLink target="_blank" href={qiqBaseURL}>
          Quests in Code
        </TextLink>
        . Check out some of my latest posts below.
      </h1>
      <div className="mt-20">{postsIndex}</div>
    </div>
  );
}
