// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import { promisify } from "util";
import { resolve } from "path";

const readdir = promisify(fs.readdir);

export default async (req, res) => {
  const blogs = await readdir(resolve(process.cwd(), "./blog"));
  res.statusCode = 200;
  res.json({ blogs });
};
