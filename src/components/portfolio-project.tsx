import React from 'react';
import { ImageMeta } from '../pages/posts';
import { clsx } from '../utils/util';
import BlurImage from './blur-image';
import TextLink from './text-link';

type Props = {
  imageMeta: ImageMeta;
  projectTitle: string;
  projectUrl: string;
  projectDescription: React.ReactNode;
  className?: string;
};

export function PortfolioProject({
  imageMeta,
  projectTitle,
  projectDescription,
  projectUrl,
  className
}: Props) {
  return (
    <div className={clsx('bg-white', className)}>
      <div className="shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full border-b border-teal-500">
            <a href={projectUrl} target="_blank">
              <BlurImage
                {...imageMeta}
                className="rounded-lg z-0 hover:opacity-50 transition-opacity ease-in-out duration-300"
                alt={`${projectTitle} project screenshot`}
              />
            </a>
          </div>
          <div className="flex flex-col ml-6 px-6 pt-4">
            <h2 className="mt-2">
              <TextLink href={projectUrl}>{projectTitle}</TextLink>
            </h2>
            {projectDescription}
          </div>
        </div>
      </div>
    </div>
  );
}
