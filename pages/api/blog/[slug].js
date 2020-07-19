// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import { promisify } from "util";
import { resolve } from "path";

const readFile = promisify(fs.readFile);

export default async (req, res) => {
  const json = await readFile(
    resolve(process.cwd(), `./blog/${req.query.slug}.json`),
    "utf8"
  );
  const blog = JSON.parse(json);
  res.statusCode = 200;
  res.json({ blog });
};
