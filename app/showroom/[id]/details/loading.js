// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export default function Loading() {
  return (
    <div className={`${shimmer} flex justify-center min-h-screen`}>
      <div className="flex flex-col gap-4 w-[80%] m-10">
        <div className="w-[45%] h-[35px] bg-gray-300 rounded-lg"></div>
        <div className="flex flex-col md:flex-row">
          <div className="flex h-auto w-[50%] bg-gray-100"></div>
          <div className="flex flex-col md:px-10 px-2 min-w-[50%] h-auto md:ml-4 md:mt-0 mt-6 border-1 justify-evenly bg-gray-100">
            <div className="flex w-[60%] h-[25px] bg-gray-300 rounded-md mt-6"></div>
            <div className="flex flex-row pt-2  justify-between mt-6">
              <div className="w-[35%] h-[20px] bg-gray-300 rounded-md"></div>
              <div className="w-[25%] h-[20px] bg-gray-300 rounded-md"></div>
            </div>
            <div className="flex flex-row pt-2  justify-between mt-4">
              <div className="w-[35%] h-[20px] bg-gray-300 rounded-md"></div>
              <div className="w-[25%] h-[20px] bg-gray-300 rounded-md"></div>
            </div>
            <div className="flex flex-row pt-2  justify-between mt-4">
              <div className="w-[35%] h-[20px] bg-gray-300 rounded-md"></div>
              <div className="w-[25%] h-[20px] bg-gray-300 rounded-md"></div>
            </div>
            <div className="flex flex-row pt-2 justify-between mt-4">
              <div className="w-[35%] h-[20px] bg-gray-300 rounded-md"></div>
              <div className="w-[25%] h-[20px] bg-gray-300 rounded-md"></div>
            </div>
            <div className="flex justify-center my-6">
              <div className="w-[40%] h-[25px] bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>
        <div className="mt-6 w-[25%] h-[30px] bg-gray-300 rounded-md"></div>
        <div className="w-full h-[15px] bg-gray-300 rounded-md"></div>
        <div className="w-full h-[15px] bg-gray-300 rounded-md"></div>
        <div className="w-full h-[15px] bg-gray-300 rounded-md"></div>
        <div className="w-[80%] h-[15px] bg-gray-300 rounded-md"></div>
        <div className="mt-4 w-[25%] h-[30px] bg-gray-300 rounded-md"></div>
        <div className="flex flex-row overflow-hidden justify-center flex-wrap mt-4">
          <div className="w-[250px] h-[250px] bg-gray-100 m-2 rounded-md"></div>
          <div className="w-[250px] h-[250px] bg-gray-100 m-2 rounded-md"></div>
          <div className="w-[250px] h-[250px] bg-gray-100 m-2 rounded-md"></div>
          <div className="w-[250px] h-[250px] bg-gray-100 m-2 rounded-md"></div>
          <div className="w-[250px] h-[250px] bg-gray-100 m-2 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
