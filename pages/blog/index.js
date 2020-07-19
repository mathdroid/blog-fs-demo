import fs from "fs";
import { promisify } from "util";
import { resolve } from "path";

import Link from "next/link";

import { Debug } from "../../component/Debug";

const readdir = promisify(fs.readdir);

const Blog = (props) => (
  <>
    <Debug value={props} />
    {props.blogs.map((blog) => (
      <Link key={blog} href={`/blog/${blog.split(".")[0]}`}>
        <a>{blog}</a>
      </Link>
    ))}
    <Link href={`/api/preview?slug=/blog`}>
      <a>Enter Preview Mode</a>
    </Link>

    <Link href={`/api/clear-preview`}>
      <a>Exit Preview Mode</a>
    </Link>
  </>
);

export default Blog;

export const getStaticProps = async (context) => {
  const blogs = await readdir(resolve(process.cwd(), "./blog"));
  return {
    props: {
      isPreview: context.preview || false,
      blogs,
    },
  };
};
