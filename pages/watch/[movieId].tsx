import React from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);
  console.log(data);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="w-full fixed p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70 ">
        <AiOutlineArrowLeft
          role="button"
          onClick={() => router.push("/")}
          size={40}
          className="text-white"
        />
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video
        src={data?.videoUrl}
        className="w-full h-full"
        autoPlay
        controls
      ></video>
    </div>
  );
};

export default Watch;
