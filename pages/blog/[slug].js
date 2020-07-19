import fs from "fs";
import { promisify } from "util";

import Link from "next/link";

import { Debug } from "../../component/Debug";

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);

const Blog = (props) => (
  <>
    <Link href={`/blog`}>
      <a>Home</a>
    </Link>
    <Debug value={props} />
  </>
);

export default Blog;

export const getStaticProps = async ({ params }) => {
  const text = await readFile(`./blog/${params.slug}.json`);
  return {
    props: {
      blog: JSON.parse(text),
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
