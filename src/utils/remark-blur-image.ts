import chalk from 'chalk';
import { Node } from 'hast';
import visit from 'unist-util-visit';
import { ImageMeta } from '../pages/posts';

export function blurImage(imgMeta: { [key: string]: ImageMeta }) {
  if (!imgMeta) {
    console.error(
      chalk.cyan('RemarkBlurImage - ') + chalk.red('Image meta required!')
    );
  }
  return transformer;

  function transformer(tree: Node) {
    visit(tree, 'image', visitor);

    function visitor(node: any) {
      if (!imgMeta) return;
      const meta = imgMeta[(node.url as string).split('./')[1]];
      if (!meta) {
        console.error(
          chalk.cyan('RemarkBlurImage - ') +
            chalk.red('Image meta missing for: ' + node.url)
        );
        return;
      }

      node.type = 'mdxJsxFlowElement';
      node.name = 'Image';
      node.attributes = [
        {
          type: 'mdxJsxAttribute',
          name: 'src',
          value: meta.relativePath.replaceAll('\\', '/')
        },
        {
          type: 'mdxJsxAttribute',
          name: 'placeholder',
          value: 'blur'
        },
        {
          type: 'mdxJsxAttribute',
          name: 'blurDataURL',
          value: meta.imgBase64
        },
        {
          type: 'mdxJsxAttribute',
          name: 'width',
          value: meta.width
        },
        {
          type: 'mdxJsxAttribute',
          name: 'height',
          value: meta.height
        },
        {
          type: 'mdxJsxAttribute',
          name: 'alt',
          value: node.alt
        }
      ];
    }
  }
}
