import { getShowroomDataSQL } from "../lib/data";
import SortableGrid from "../ui/dnd/SortableGrid";

export default async function Page() {
  const data = await getShowroomDataSQL();
  console.log(data[1]);
  return (
    <main className="flex min-h-screen justify-center items-center m-10">
      <SortableGrid images={data[1].images} />
    </main>
  );
}
