import DOMPurify from 'dompurify';
import { InferGetStaticPropsType } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Pill from '../../components/pill';
import ReadHearts from '../../components/read-hearts';
import SEO from '../../components/seo';
import CommentsIcon from '../../components/svg/comments-icon';
import LikeIcon from '../../components/svg/like-icon';
import RetweetIcon from '../../components/svg/retweet-icon';
import TwitterIcon from '../../components/svg/twitter-icon';
import TextLink from '../../components/text-link';
import { getFormattedDate, humanDateFromEpoch } from '../../utils/helpers';
import { getPostBySlug, getPostsInfo } from '../../utils/mdx-api';

interface Webmention {
  source: string;
  verified: boolean;
  verified_date: string;
  id: number;
  private: boolean;
  data: {
    author: {
      name: string;
      url: string;
      photo: string;
    };
    /** url link to the posting location (e.g. Twitter post) */
    url: string;
    name: string | null;
    /** The full content of the mention, applicable only to reply type? */
    content: string | null;
    /** Only replies have publish dates */
    published: string | null;
    published_ts: number | null;
  };
  activity: {
    type: 'link' | 'like' | 'reply' | 'repost' | 'mention' | 'bookmark';
    sentence: 'string';
    sentence_html: 'string';
  };
  target: string;
}

export default function BlogPost({
  post
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [webmentions, setWebmentions] = useState<Webmention[]>(null);

  const postUrl = `https://dlibin.net/posts/${post.slug}/`;
  const twitterShareUrl = `https://twitter.com/share?url=${postUrl}&text=“${post.title}”, a post from Danny Libin.&via=Dayn1l`;
  const twitterSearchUrl = `https://twitter.com/search?q=${postUrl}`;

  useEffect(() => {
    async function getWebmentions() {
      try {
        const webmentionUrl = `https://webmention.io/api/mentions.json?per-page=1000&page=0&target=${postUrl}`;
        const res = await (await fetch(webmentionUrl)).json();
        // Trailing slash issue is infuriating, just grab with and without slash results and combine
        const res2 = await (
          await fetch(webmentionUrl.substr(0, webmentionUrl.length - 1))
        ).json();
        // Remove duplicates in case there are any
        let webmentions = Array.from(new Set([...res.links, ...res2.links]));

        // For posts before 3/1/21, also grab webmentions from my old domain
        // and combine
        if (new Date(post.date) <= new Date('2021-03-01')) {
          const webmentionUrl = `https://webmention.io/api/mentions.json?per-page=1000&page=0&target=${postUrl.replace(
            'https://dlibin.net',
            'https://questsincode.com'
          )}`;
          const res = await (await fetch(webmentionUrl)).json();
          // Trailing slash issue is infuriating, just grab with and without slash results and combine
          const res2 = await (
            await fetch(webmentionUrl.substr(0, webmentionUrl.length - 1))
          ).json();
          webmentions = Array.from(
            new Set([...webmentions, ...res.links, ...res2.links])
          );
        }

        setWebmentions(webmentions);
      } catch (e) {
        console.log('Failed to get webmentions', e);
      }
    }
    getWebmentions();
  }, []);

  const postTags = !post.tags.length
    ? null
    : post.tags.map((tag, index) => (
        <Link key={index} href={`/posts?filter=${tag}`}>
          <Pill>{tag}</Pill>
        </Link>
      ));

  const webmentionContent = !webmentions
    ? null
    : webmentions
        .filter((mention, i) => {
          const isComment =
            mention.activity?.type === 'link' ||
            mention.activity?.type === 'reply';
          const hasAuthor =
            mention.data?.author?.name &&
            mention.data?.author?.photo &&
            mention.data?.author?.url;
          return isComment && hasAuthor;
        })
        .sort((a, b) => {
          if (!a.data.published_ts || !b.data.published_ts) return 999;
          return a.data.published_ts - b.data.published_ts;
        })
        .map((mention, i) => {
          const longMention = mention.data.content.length > 1000;
          return (
            <div
              key={i}
              className={
                'mt-6 flex justify-between p-2' +
                (mention.data.author.url === 'https://twitter.com/Dayn1l'
                  ? ' rounded-md bg-gray-200 dark:bg-gray-800'
                  : '')
              }
            >
              <div className="mt-1 w-1/12">
                <a href={mention.data.url} target="_blank">
                  <img
                    src={mention.data.author.photo}
                    alt={mention.data.author.name}
                    className="w-12 rounded-full"
                  />
                </a>
              </div>
              <div className="w-11/12">
                <div>
                  <TextLink href={mention.data.url}>
                    <span>{mention.data.author.name}</span>
                  </TextLink>{' '}
                  ⋅{' '}
                  <span className="text-base text-gray-700 dark:text-gray-500">
                    {humanDateFromEpoch(mention.data.published_ts)}
                  </span>
                </div>
                <div
                  className="comments-text mt-1"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      longMention
                        ? mention.activity.sentence_html
                        : mention.data.content
                    )
                  }}
                ></div>
              </div>
            </div>
          );
        });

  return (
    <section>
      <SEO
        title={post.title}
        description={post.description}
        featuredImagePath={
          post.featuredImageMeta && post.featuredImageMeta.relativePath
        }
      />
      <div className="mt-24">
        <header>
          <div className="text-center">
            <div className="flex flex-wrap justify-center space-x-4">
              {postTags}
            </div>
            <h1 className="my-2">{post.title}</h1>
            <div className="mb-8 flex flex-col justify-center text-gray-700 dark:text-gray-400 sm:flex-row sm:text-center">
              <span className="mr-2">
                {getFormattedDate(post.date)}{' '}
                <span className="hidden sm:inline-block">•</span>{' '}
              </span>
              <span className="flex items-center justify-center">
                <span className="mr-2 flex">
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
          </div>
          {!post.featuredImageMeta ? null : (
            <div className="mt-16 lg:-mx-16">
              <Image
                src={post.featuredImageMeta.relativePath.replaceAll('\\', '/')}
                placeholder="blur"
                blurDataURL={post.featuredImageMeta.imgBase64}
                width={post.featuredImageMeta.width}
                height={post.featuredImageMeta.height}
                className="z-0 rounded-md"
                alt={post.title}
              />
            </div>
          )}
        </header>
        <article className="mt-16">
          <MDXRemote {...post.source} />
        </article>
        <a
          href={twitterShareUrl}
          target="_blank"
          className="mt-12 flex flex-row"
        >
          <TwitterIcon className="w-24 text-teal-500 transition-colors duration-150 ease-in-out hover:text-teal-300" />
          <span className="ml-4 rounded-md bg-teal-200 p-4 text-2xl text-teal-800 transition-colors duration-150 hover:bg-teal-100 hover:text-teal-700 dark:bg-teal-800 dark:text-teal-100 dark:hover:bg-teal-600 hover:dark:text-teal-50">
            Found this article useful? Click to share, discuss and spread the
            word!! 🎉
          </span>
        </a>
        <h2>
          Webmentions (
          <TextLink
            href="https://indieweb.org/Webmention"
            className="border-b-0 text-lg"
          >
            ❔
          </TextLink>
          )
        </h2>
        {!webmentions || !webmentions.length ? (
          <div>
            No comments yet.{' '}
            <TextLink href={twitterShareUrl}>Start the conversation!</TextLink>{' '}
            Your post will show up here.
          </div>
        ) : (
          <div className="mt-10">
            <a href={twitterSearchUrl} target="_blank">
              <div className="flex">
                <div className="flex">
                  <LikeIcon className="w-6 text-red-600" />{' '}
                  <span className="ml-2">
                    {
                      webmentions.filter(
                        (mention) => mention.activity.type === 'like'
                      ).length
                    }
                  </span>
                </div>
                <div className="ml-6 flex">
                  <RetweetIcon className="w-8 text-teal-500" />{' '}
                  <span className="ml-2">
                    {
                      webmentions.filter(
                        (mention) => mention.activity.type === 'repost'
                      ).length
                    }
                  </span>
                </div>
                <div className="ml-6 flex">
                  <CommentsIcon className="w-6 text-teal-500" />{' '}
                  <span className="ml-2">
                    {
                      webmentions.filter(
                        (mention) => mention.activity.type === 'reply'
                      ).length
                    }
                  </span>
                </div>
              </div>
            </a>
            <div className="mt-6">
              <TextLink href={twitterSearchUrl}>
                Join the conversation!
              </TextLink>
            </div>
            <div className="mt-6">{webmentionContent}</div>
          </div>
        )}
      </div>
    </section>
  );
}

export async function getStaticPaths() {
  return {
    paths: getPostsInfo().slugs.map((slug) => ({
      params: { slug }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);

  return {
    props: {
      post
    }
  };
}
