import Image from "next/image";

export default function NavBar() {
  return (
    <>
      <div className="w-screen grid grid-cols-6 py-4 items-center shadow-xl text-center text-lg text-gray-700 font-semibold ">
        <p>01501 763 800</p>
        <div className=" flex col-start-2 col-span-4 justify-center items-center ">
          <Image
            src={"/navbar/TopGearLogoLight.png"}
            alt="Top Gear logo"
            priority={true}
            width={220}
            height={140}
          />
        </div>
        <div className="flex flex-col">
          <p>7 Stoneheap Crofts</p>
          <p>Bathgate EH47 8BX</p>
        </div>
      </div>
      <div className="sticky w-[90vw] top-0 bg-black h-20"></div>
    </>
  );
}
