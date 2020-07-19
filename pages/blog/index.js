import fs from "fs";
import { promisify } from "util";

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
  </>
);

export default Blog;

export const getStaticProps = async () => {
  const blogs = await readdir("./blog");
  return {
    props: {
      blogs,
    },
  };
};
