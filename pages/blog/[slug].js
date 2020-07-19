import fs from "fs";
import { promisify } from "util";
import { resolve } from "path";

import Link from "next/link";

import { Debug } from "../../component/Debug";

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);

const Blog = (props) => (
  <>
    <Link href={`/blog  `}>
      <a>Home</a>
    </Link>
    <Debug value={props} />
    <Link href={`/api/preview?slug=/blog/${slug}`}>
      <a>Enter Preview Mode</a>
    </Link>

    <Link href={`/api/clear-preview`}>
      <a>Exit Preview Mode</a>
    </Link>
  </>
);

export default Blog;

export const getStaticProps = async (context) => {
  const text = await readFile(
    resolve(process.cwd(), `./blog/${context.params.slug}.json`)
  );
  return {
    props: {
      blog: JSON.parse(text),
      slug: context.params.slug,
    },
  };
};

export const getStaticPaths = async () => {
  const fileNames = await readdir("./blog");
  const paths = fileNames.map((fileName) => ({
    params: { slug: fileName.split(".")[0] }, // return the file name (before .json)
  }));
  console.log({ paths });
  return {
    paths,
    fallback: false,
  };
};
