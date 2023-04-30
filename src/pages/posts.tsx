import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import ReadHearts from '../components/read-hearts';
import SEO from '../components/seo';
import { getPostsMeta } from '../utils/mdx-api';

type Posts = {
  excerpt: string;
  timeToRead: number;
  date: string;
  description: string;
  title: string;
  tags: string[];
  slug: string;
}[];

export type PostMatter = {
  title: string;
  tags: string[];
  date: string;
  description: string;
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
  // const [posts, setPosts] = useState<Posts>(null);
  // const [loading, setLoading] = useState(true);

  // const qiqBaseURL = 'https://questsincode.com';

  // useEffect(() => {
  //   fetch(`${qiqBaseURL}/postsMetaData.json`)
  //     .then((res) => res.json())
  //     .then((data: Posts) => {
  //       // data.sort((a, b) => (a.date > b.date ? -1 : 1));
  //       setPosts(data);
  //       setLoading(false);
  //     });
  // }, []);

  const postsIndex = posts.map((post, index) => {
    const postTags = !post.tags.length
      ? null
      : post.tags.map((tag, index) => (
          <Link key={index} href={`/topics?topic=${tag}`} className="my-1">
            <span
              className={
                'cursor-pointer rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold tracking-widest text-teal-700 transition duration-200 ease-in-out hover:bg-teal-200 dark:bg-teal-800 dark:text-teal-100 dark:hover:bg-teal-600' +
                (index >= 1 ? ' ml-4' : '')
              }
            >
              {tag}
            </span>
          </Link>
        ));

    return (
      <div className="mt-12" key={index}>
        <div className="mb-4 flex flex-wrap">{postTags}</div>
        <Link href={`/posts/${post.slug}`}>
          <h2 className="my-2">{post.title}</h2>
          <div className="mb-8 flex flex-col text-gray-700 dark:text-gray-400 sm:flex-row sm:text-center">
            <span className="mr-2">
              {post.date} <span className="hidden sm:inline-block">•</span>{' '}
            </span>
            <span className="flex items-center">
              <span className="mr-2 flex">
                <ReadHearts readTimeMins={post.timeToRead} />
              </span>{' '}
              {post.timeToRead} minute read
            </span>
          </div>
          <p className="-mt-2">{post.description}</p>
        </Link>
      </div>
    );
  });

  return (
    <div>
      <SEO title="Posts - Danny Libin" />
      <div className="mt-20">{postsIndex}</div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: { posts: getPostsMeta() }
  };
}
