import fs from 'fs';
import { join } from 'path';
import { ImageMeta } from '../pages/posts';

/**
 * @param route The route path, excluding base path, without leading or trailing slashes. E.g. test/page or page
 * @param includeSharedImages Whether the images in the base images folder should be included
 */
export async function getRouteImageMeta(
  route: string,
  includeSharedImages = false
) {
  const routeImgPath = join(
    process.cwd(),
    'public',
    'images',
    route === '' ? 'home' : route,
    'imgMeta.json'
  );

  const routeImgMeta = JSON.parse(fs.readFileSync(routeImgPath, 'utf-8')) as {
    [key: string]: ImageMeta;
  };

  if (includeSharedImages) {
    const sharedImgMeta = JSON.parse(
      fs.readFileSync(
        join(process.cwd(), 'public', 'images', 'imgMeta.json'),
        'utf-8'
      )
    ) as { [key: string]: ImageMeta };
    return { ...sharedImgMeta, ...routeImgMeta };
  }

  return routeImgMeta;
}
