import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';
import { IndexQuery } from '../../graphql-types';
import Layout from '../components/layout';
import SEO from '../components/seo';
import GithubIcon from '../components/svg/github-icon';
import MailIcon from '../components/svg/mail-icon';
import TwitterIcon from '../components/svg/twitter-icon';

type Props = {
  path: string;
  data: IndexQuery;
};

export default function IndexPage({ path, data }: Props) {
  return (
    <Layout path={path}>
      <SEO title="Danny Libin Personal Site" />
      <div className="mt-20 text-center">
        <h1>Hi! I'm Danny Libin.</h1>
      </div>
      <div className="flex flex-col md:flex-row mt-16">
        <div className="mr-8 mb-6 flex justify-center">
          <Image
            className="rounded-lg z-0"
            fixed={data.avatar.childImageSharp.fixed}
            alt="Picture of Danny, smiling as best he can"
          />
        </div>
        <div className="flex flex-col">
          <p className="-mt-4">
            I'm a software developer making awesome apps for fun and to learn. I
            got into coding completely on a whim{' '}
            {+((+new Date() - +new Date('2013-03-01')) / 3.154e10).toFixed(4)}{' '}
            years ago (yes, I keep track 🤓) and ended up addicted. Coding is
            more than just a powerful tool. It's an adventure, a construct of
            your own imagination, and anything is possible! ⚔️🤠🛡️
          </p>
          <p>
            I'm most familiar with the Typescript/Javascript ecosystem,
            including React, Angular, and Node.js. I dabble in process
            automation and data analytics with SQL, VBA, and Python. I've also
            used Java for native Android development, and C# for native Windows
            development and game development with Unity.
          </p>
          <p>
            In my other life, I'm a pharmacist 👨‍⚕️ (get your flu shot 💉!!). When
            I'm not slinging pills 💊💊 or coding, I love to bike, cook, and
            game with friends.
          </p>
          <p>Feel free to reach out!</p>
          <span className="flex -mt-2 mb-16">
            <a href="https://github.com/daynil" target="_blank" rel="me">
              <GithubIcon className="w-10 text-teal-500 hover:text-teal-300 transition-colors ease-in-out duration-300" />
            </a>
            <a href="https://twitter.com/day1l" target="_blank" rel="me">
              <TwitterIcon className="ml-4 w-10 text-teal-500 hover:text-teal-300 transition-colors ease-in-out duration-300" />
            </a>
            <a
              className="flex items-center"
              href="mailto:dlibinrx@gmail.com"
              target="_blank"
              rel="me"
            >
              <MailIcon className="ml-4 mr-2 w-10 text-teal-500 hover:text-teal-300 transition-colors ease-in-out duration-300" />
              <span className="border-b-2 border-teal-500 text-gray-900 dk:text-gray-300 dk-hover:text-teal-500 hover:text-teal-500 hover:border-transparent transition duration-200 ease-in-out">
                dlibinrx@gmail.com
              </span>
            </a>
          </span>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query Index {
    avatar: file(absolutePath: { regex: "/about-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 180) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
