// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import { promisify } from "util";

const readdir = promisify(fs.readdir);

export default async (req, res) => {
  const blogs = await readdir("./blog");
  res.statusCode = 200;
  res.json({ blogs });
};
