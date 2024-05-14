"use server";

import { join } from "path";
import { writeFile } from "fs/promises";

export async function upload(data) {
  const file = data.get("file");

  if (!file) throw new Error("No file uploaded!");

  //turn the file into a buffer object so that it can be handled by Node
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  //with the file data in a buffer, we can write it to the filesystem
  //__dirname gets the current Node directory (currently running in the .next folder) so use static path instead to get into the /app folder
  const path = join(
    "C:/Users/Joe/Documents/Coding/top-gear-redesign/app/uploads",
    file.name
  );
  await writeFile(path, buffer);
  console.log(`Open ${path} to view the uploaded file`);
  return { success: true };
}
