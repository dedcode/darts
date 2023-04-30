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
              src={`${imageMeta.relativePath.replaceAll('\\', '/')}`}
              placeholder="blur"
              blurDataURL={imageMeta.imgBase64}
              width={192}
              height={imageAspect * 192}
              className="z-0 rounded-lg"
              alt="Picture of Danny, smiling as best he can"
            />
          </div>
        </div>
        <div className="flex w-2/3 flex-col">
          <p className="-mt-4">
            I'm a software developer making awesome apps to learn and have fun.
            I got into coding completely on a whim{' '}
            {+((+new Date() - +new Date('2013-03-01')) / 3.154e10).toFixed(4)}{' '}
            years ago (yes, I keep track 🤓) and ended up addicted. Coding is
            more than just a powerful tool. It's an adventure, a construct of
            your own imagination, and anything is possible! ⚔️🤠🛡️
          </p>
          <p>
            I'm most familiar with the Typescript/Javascript ecosystem,
            including React, Angular, and Node.js. I'm also well versed in
            process automation and data analytics with SQL and VBA, and dabble
            in Python. I've also used Java for native Android development, and
            C# for native Windows development and game development with Unity.
          </p>
          <p>
            In my other life, I'm a pharmacist 👨‍⚕️ (get your flu (and COVID)
            shots 💉!!) slinging pills 💊💊.
          </p>
          <p>Feel free to reach out!</p>
          <span className="-mt-2 mb-16 flex">
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
