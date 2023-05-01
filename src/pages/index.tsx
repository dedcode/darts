import { InferGetStaticPropsType } from 'next';
// import BlurImage from '../components/blur-image';
import Image from 'next/image';
import SEO from '../components/seo';
import GithubIcon from '../components/svg/github-icon';
import MailIcon from '../components/svg/mail-icon';
import TwitterIcon from '../components/svg/twitter-icon';
import { getRouteImageMeta } from '../utils/image-api';

export default function IndexPage({
  imgMeta
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const imageMeta = { ...imgMeta['about-pic.jpg'] };
  const imageAspect = imageMeta.width / imageMeta.height;
  return (
    <div>
      <SEO title="Danny Libin Personal Site" />
      <div className="mt-20 text-center">
        <h1>Hi! I'm Danny Libin.</h1>
      </div>
      <div className="mt-16 flex w-full flex-col md:flex-row">
        <div className="mb-6 mr-8 flex justify-center">
          <div>
            <Image
              src={imageMeta.relativePath.replaceAll('\\', '/')}
              placeholder="blur"
              blurDataURL={imageMeta.imgBase64}
              width={192}
              height={imageAspect * 192}
              className="z-0 rounded-lg"
              alt="Picture of Danny, smiling as best he can"
            />
          </div>
        </div>
        <div className="mx-auto flex w-full flex-col md:w-2/3">
          <p className="-mt-4">
            I'm a software developer making awesome apps to learn and have fun.
            I got into coding completely on a whim{' '}
            {+((+new Date() - +new Date('2013-03-01')) / 3.154e10).toFixed(4)}{' '}
            years ago and quickly ended up addicted. I had never considered
            myself to be a creative type, but coding has opened up new horizons
            for me, helping me express my creativity in ways I never thought
            possible. Coding has become more than just a hobby for me, weaving
            itself into my life both personal and professional.
          </p>
          <p>
            I'm most familiar with the Typescript/Javascript ecosystem,
            including React, Angular, and Node.js. I'm also well versed in
            process automation with Python and VBA and data analytics with SQL.
            I've also dabbled with Go for server-side development. I've used
            Java for native Android development, and C# for native Windows
            development and game development with Unity.
          </p>
          <p>
            In my other life, I'm a pharmacist 👨‍⚕️ (get your flu (and COVID)
            shots!!) slinging pills 💊💊.
          </p>
          <p>Feel free to reach out!</p>
          <span className="mb-16 flex flex-wrap">
            <a href="https://github.com/Daynil" target="_blank" rel="me">
              <GithubIcon className="w-10 text-teal-600 transition-colors duration-300 ease-in-out hover:text-teal-300" />
            </a>
            <a href="https://twitter.com/Dayn1l" target="_blank" rel="me">
              <TwitterIcon className="ml-4 w-10 text-teal-600 transition-colors duration-300 ease-in-out hover:text-teal-300" />
            </a>
            <a
              className="flex items-center"
              href="mailto:dlibinrx@gmail.com"
              target="_blank"
              rel="me"
            >
              <MailIcon className="ml-4 mr-2 w-10 text-teal-600 transition-colors duration-300 ease-in-out hover:text-teal-300" />
              <span className="dk-hover:text-teal-500 border-b-2 border-teal-500 text-gray-900 transition duration-200 ease-in-out hover:border-transparent hover:text-teal-500 dark:text-gray-300">
                dlibinrx@gmail.com
              </span>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      imgMeta: await getRouteImageMeta('')
    }
  };
}
