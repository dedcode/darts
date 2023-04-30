import Image from 'next/image';
import React from 'react';
import { ImageMeta } from '../pages/posts';
import { clsx } from '../utils/util';
import GithubIcon from './svg/github-icon';
import TextLink from './text-link';

type Props = {
  imageMeta: ImageMeta;
  projectTitle: string;
  projectUrl: string;
  projectDescription: React.ReactNode;
  className?: string;
  github?: string;
};

export function PortfolioProject({
  imageMeta,
  projectTitle,
  projectDescription,
  projectUrl,
  className,
  github
}: Props) {
  return (
    <div className={clsx('bg-white dark:bg-gray-900', className)}>
      <div className="rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl">
        <div className="flex flex-col items-center justify-center rounded-lg">
          <div className="w-full border-b border-teal-500">
            <a
              href={imageMeta.relativePath.replaceAll('\\', '/')}
              style={{ cursor: 'zoom-in' }}
              target="_blank"
            >
              <Image
                src={imageMeta.relativePath.replaceAll('\\', '/')}
                placeholder="blur"
                blurDataURL={imageMeta.imgBase64}
                width={imageMeta.width}
                height={imageMeta.height}
                className="z-0 rounded-t-lg transition-opacity duration-300 ease-in-out hover:opacity-50"
                alt={`${projectTitle} project screenshot`}
              />
            </a>
          </div>
          <div className="ml-6 flex flex-col px-6 pt-4">
            <div className="mb-6 mt-2 flex items-center">
              <h2 className="m-0">
                <TextLink href={projectUrl}>{projectTitle}</TextLink>
              </h2>
              {github && (
                <a
                  href="https://github.com/Daynil/quests-in-code"
                  target="_blank"
                  rel="noopener"
                  className="ml-4"
                >
                  <GithubIcon className="w-8 text-teal-500 transition-colors duration-300 ease-in-out hover:text-teal-300" />
                </a>
              )}
            </div>
            {projectDescription}
          </div>
        </div>
      </div>
    </div>
  );
}
