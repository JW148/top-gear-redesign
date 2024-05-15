import { upload } from "./lib/actions";

import { checkDBConnection, getData } from "./lib/data";

export default async function Home() {
  checkDBConnection();
  const data = await getData();
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>React Server Component</h1>
      <form action={upload}>
        <input type="file" name="file" />
        <input type="submit" value="upload" />
      </form>
    </main>
  );
}
