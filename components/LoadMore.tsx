"use client";
//using server-action in Client-side-rendered page

import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";

let page = 2;

export type AnimeCard = JSX.Element;

function LoadMore() {

  const { ref, inView } = useInView();
  // we cannot use hooks on the server side
  const [data, setData] = useState<AnimeCard[]>([]);

  useEffect(() => {
    if (inView) {
      fetchAnime(page).then((res) => {
         setData([...data, ...res]);
         page++
         });
    }
  }, [inView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>

      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
            style={{ width: 'auto', height: 'auto' }} // Added to fix aspect ratio warning
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
