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
                            height={192 / imageAspect}
                            className="z-0 rounded-lg"
                            alt="Picture of Danny, smiling as best he can"
                        />
                    </div>
                </div>
                <div className="mx-auto flex w-full flex-col md:w-2/3">
                    <p className="-mt-4">
                        I'm a software engineer and clinical pharmacist with over a decade of experience at the intersection of healthcare and software.
                        I've united pharmacy knowledge with a zeal for technology - automating workflows, analyzing data, and exploring healthcare's digital frontier.
                    </p>
                    <p>
                        My passion lies in fusing my technical chops with an insider's understanding of healthcare needs.
                        With years of experience being a technical clinician as a pharmacist in managed care, as well as a pharmacist at point of care,
                        I bring a 360-degree view to the field of health care as a pharmacist, data analyst, and software engineer.
                    </p>
                    <p>
                        Today, I channel this interdisciplinary skillset as an entrepreneur,
                        consulting on impactful solutions and developing transformative software products.
                    </p>
                    <p>
                        Does your healthcare initiative need a bilingual translator bridging the clinical and coding worlds?
                        I'm ready to get creative and turn your vision into reality. Feel free to reach out.
                    </p>
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
