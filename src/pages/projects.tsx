import { InferGetStaticPropsType } from 'next';
import React from 'react';
import BlurImage from '../components/blur-image';
import { PortfolioProject } from '../components/portfolio-project';
import SEO from '../components/seo';
import GithubIcon from '../components/svg/github-icon';
import TextLink from '../components/text-link';
import { getRouteImageMeta } from '../utils/image-api';

export default function ProjectsPage({
  imgMeta
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <SEO title="Projects" />
      <div className="mt-20 mb-12">
        <h1>Some of my projects</h1>
        <div className="bg-gray-100 p-3 md:p-12 rounded-lg lg:-mx-20">
          <PortfolioProject
            imageMeta={imgMeta['fiportfoliodoc.png']}
            projectTitle="FI Portfolio Doctor"
            projectUrl="https://fiportfoliodoc.com/"
            github="https://github.com/Daynil/portfolio-doctor"
            projectDescription={
              <>
                <p>
                  I built this app to help me understand the mechanics behind
                  using a portfolio to fund financial independence and
                  retirement. I wanted a clean, interactive way to view my
                  results, and the ability to iterate on various scenarios
                  quickly and easily.
                </p>
                <p>
                  Other apps of this sort are available, but none scratched my
                  particular itch of quick iteration and deep interactivity. As
                  I built the app, and wrote two interactive{' '}
                  <TextLink href="https://questsincode.com/posts/monte-carlo-simulation-javascript">
                    accompanying
                  </TextLink>{' '}
                  <TextLink href="https://questsincode.com/posts/stock-market-simulation-javascript">
                    posts
                  </TextLink>{' '}
                  on my blog, I gained a much deeper understanding of the math
                  behind retirement portfolios.
                </p>
                <p>
                  I decided to hand roll a custom chart library using D3js
                  together with React rather than using an off-the-shelf React
                  charts library. The charts I wanted were complex and custom
                  enough that it made sense to dig deeply into D3js. I learned
                  D3js, as well as how to maximize the performance gains of
                  using it with React, which ultimately meant using D3js as more
                  of an analytics utility library than a charting engine.
                </p>
                <p>
                  These types of analyses are often done using languages which
                  have extensive libraries that enable advanced data analytics,
                  like Python (using numpy and pandas) or R. One thing that
                  frustrated me when I practiced data analytics using Python was
                  the inability to extensively customize your charts and make
                  them interactive. It felt like a whole dimension of data
                  exploration and visualization was missing. I felt this D3js
                  approach was a great compromise.
                </p>
              </>
            }
          />
          <PortfolioProject
            className="mt-10"
            imageMeta={imgMeta['rxverisure2.png']}
            projectTitle="RxVeriSure"
            projectUrl="https://rxverisure.com/"
            projectDescription={
              <>
                <p>
                  This is the app idea that I had as an end goal as I learned to
                  code. In my work as a pharmacist, I realized there weren't any
                  good, safe training tools to learn to verify prescriptions
                  accurately, so I built one.
                </p>
                <p>
                  This is a SaaS app I built from scratch from start to finish.
                  It uses Angular 2+, Nestjs/Expressjs and MySQL for the
                  backend, Firebase Auth for user authentication, and Stripe for
                  payment processing.
                </p>
              </>
            }
          />
          <div className="mt-10 bg-white">
            <div className="shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="w-1/3 flex justify-center">
                  <div className="w-24">
                    <a href="https://questsincode.com" target="_blank">
                      <BlurImage
                        {...imgMeta['logo-large.png']}
                        className="rounded-lg z-0 hover:opacity-50 transition-opacity ease-in-out duration-300"
                        alt="Quests In Code pixel shield logo"
                      />
                    </a>
                  </div>
                </div>
                <div className="flex flex-col ml-6 px-6 pt-4 w-11/12 md:w-2/3">
                  <div className="flex items-center mt-2 mb-8">
                    <h2 className="m-0">
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
                      <GithubIcon className="w-8 text-teal-500 hover:text-teal-300 transition-colors ease-in-out duration-300" />
                    </a>
                  </div>
                  <p>My blog site where I write about my coding journey.</p>
                  <p>
                    Like this site, created with React, Next.js and hosted on
                    Netlify.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <PortfolioProject
            className="mt-10"
            imageMeta={imgMeta['ccaw2.png']}
            projectTitle="Conference Management Application"
            projectUrl="https://github.com/Daynil/ccaw-angcli"
            projectDescription={
              <>
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
                  streamlines the process of potential speakers providing their
                  information, submitting presentation proposals, and uploading
                  necessary documents, while allowing the administrators to
                  manage the schedule, speakers, and presentations over the
                  course of multiple conference years.
                </p>
                <p>
                  I created a{' '}
                  <TextLink href="https://www.youtube.com/watch?v=9-WgWY2B10E&list=PLWKjhJtqVAbnQ048Pa8sAqJoVRhx8TJtM">
                    video walkthrough
                  </TextLink>{' '}
                  demoing this app for FCC's YouTube page.
                </p>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      imgMeta: await getRouteImageMeta('projects')
    }
  };
}
