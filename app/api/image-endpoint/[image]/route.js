import fs from "fs";
import { join } from "path";

//route handler that serves image during application runtime

export async function GET(req, { params }) {
  const path = join(process.cwd() + "/uploads/" + params.image);

  const buffer = fs.readFileSync(path);

  return new Response(buffer, { headers: { "content-type": "image/jpg" } });
}
