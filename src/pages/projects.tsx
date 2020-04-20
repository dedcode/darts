import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import GithubIcon from '../components/svg/github-icon';
import TextLink from '../components/text-link';

type Props = {
  path: string;
  data: any;
};

export default function ProjectsPage({ path, data }: Props) {
  return (
    <Layout path={path}>
      <SEO title="Projects" />
      <div className="mt-20 mb-12">
        <h1>Some of my projects</h1>
        <div className="bg-gray-100 p-12 rounded-lg lg:-mx-20">
          <div className="bg-white">
            <div className="shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col items-center justify-center">
                <div className="w-full">
                  <a href="https://rxverisure.com/" target="_blank">
                    <Image
                      className="rounded-lg z-0 hover:opacity-50 transition-opacity ease-in-out duration-300"
                      fluid={data.rxverisure.childImageSharp.fluid}
                      alt="RxVeriSure project screencap"
                    />
                  </a>
                </div>
                <div className="flex flex-col ml-6 px-6 pt-4">
                  <h2 className="mt-2">
                    <TextLink href="https://rxverisure.com/">
                      RxVeriSure
                    </TextLink>
                  </h2>
                  <p>
                    This is the app idea that I had as an end goal as I learned
                    to code. In my work as a pharmacist, I realized there
                    weren't any good, safe training tools to learn to verify
                    prescriptions accurately, so I built one.
                  </p>
                  <p>
                    This is a SaaS app I built from scratch from start to
                    finish. It uses Angular 2+, Nestjs/Expressjs and MySQL for
                    the backend, Firebase Auth for user authentication, and
                    Stripe for payment processing.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 bg-white">
            <div className="shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center">
                <div className="w-1/3 hidden md:flex justify-center">
                  <div className="w-24">
                    <a href="https://questsincode.com" target="_blank">
                      <Image
                        className="rounded-lg z-0 hover:opacity-50 transition-opacity ease-in-out duration-300"
                        fluid={data.qiq.childImageSharp.fluid}
                        alt="CCAW project screencap"
                      />
                    </a>
                  </div>
                </div>
                <div className="flex flex-col ml-6 px-6 pt-4 w-11/12 md:w-2/3">
                  <div className="flex">
                    <h2 className="mt-0">
                      <TextLink href="https://questsincode.com">
                        Quests In Code Blog
                      </TextLink>
                    </h2>
                    <a
                      href="https://github.com/Daynil/quests-in-code"
                      target="_blank"
                      rel="noopener"
                      className="ml-4"
                    >
                      <GithubIcon className="w-10 text-teal-500 hover:text-teal-300 transition-colors ease-in-out duration-300" />
                    </a>
                  </div>
                  <p>My blog site where I write about my coding journey.</p>
                  <p>
                    Like this site, created with Gatsby and hosted on Netlify.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 bg-white">
            <div className="shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col items-center justify-center">
                <div className="w-full">
                  <a
                    href="https://github.com/Daynil/ccaw-angcli"
                    target="_blank"
                  >
                    <Image
                      className="rounded-lg z-0 hover:opacity-50 transition-opacity ease-in-out duration-300"
                      fluid={data.ccaw.childImageSharp.fluid}
                      alt="CCAW project screencap"
                    />
                  </a>
                </div>
                <div className="flex flex-col ml-6 px-6 pt-4">
                  <h2 className="mt-2">
                    <TextLink href="https://github.com/Daynil/ccaw-angcli">
                      Conference Management Application
                    </TextLink>
                  </h2>
                  <p>
                    After receiving all three certifications on{' '}
                    <TextLink href="https://www.freecodecamp.org/news/about/">
                      Free Code Camp
                    </TextLink>{' '}
                    (
                    <TextLink href="https://www.freecodecamp.org/certification/daynil/legacy-front-end">
                      Front End
                    </TextLink>
                    ,{' '}
                    <TextLink href="https://www.freecodecamp.org/certification/daynil/legacy-data-visualization">
                      Data Visualization
                    </TextLink>
                    ,{' '}
                    <TextLink href="https://www.freecodecamp.org/certification/daynil/legacy-back-end">
                      Back End
                    </TextLink>
                    ), about 1,200 hours of challenges, campers get to build a
                    series of applications for non-profit organizatons with a
                    partner. These are complex, full stack, custom applications
                    selected by FCC to challenge campers to practice and develop
                    their skills in the real world while helping a non-profit.
                  </p>
                  <p>
                    This project was developed for the organization{' '}
                    <TextLink href="http://conferencecaw.org/">
                      Conference on Crimes Against Women
                    </TextLink>{' '}
                    by my partner and I over the course of about 3 months. The
                    stakeholder requested that we develop an application that
                    streamlines the process of potential speakers providing
                    their information, submitting presentation proposals, and
                    uploading necessary documents, while allowing the
                    administrators to manage the schedule, speakers, and
                    presentations over the course of multiple conference years.
                  </p>
                  <p>
                    I created a{' '}
                    <TextLink href="https://www.youtube.com/watch?v=9-WgWY2B10E&list=PLWKjhJtqVAbnQ048Pa8sAqJoVRhx8TJtM">
                      video walkthrough
                    </TextLink>{' '}
                    demoing this app for FCC's YouTube page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query Projects {
    rxverisure: file(absolutePath: { regex: "/rxverisure2.png/" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    qiq: file(absolutePath: { regex: "/logo-large.png/" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ccaw: file(absolutePath: { regex: "/ccaw2.png/" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
