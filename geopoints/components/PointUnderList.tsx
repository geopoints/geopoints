import React from "react";
import Image from "next/image.js";
import { Point, Tag } from "../types/types";
import Link from "next/link";
// import { useRouter } from 'next/router';

interface PointUnderListProps {
  pointId: number | undefined;
  imagePath?: string;
  title: string;
  description?: string;
}

const PointUnderList = ({
  pointId,
  imagePath,
  title,
  description,
}: PointUnderListProps) => {
  return (
      <section className="rounded">
        {/* <Link href={`/points/${pointId}`}> */}
          <div className="p-3">
            <div className=" w-full lg:max-w-full lg:flex">
              <div className="bg-white p-4 flex flex-row items-center leading-normal rounded-xl">
                <div className="w-36">
                  <img
                    src={imagePath || process.env.NEXT_PUBLIC_DEFAULT_IMAGE}
                    alt={title}
                    className="flex-none overflow-hidden h-24 rounded-md"
                  />
                </div>
                <div className="ml-5">
                  <h2 className="text-gray-900 font-bold text-xl mb-2">
                    {title ? title : "Untitled"}
                  </h2>
                  <p className="text-gray-700 text-sm">
                    {description ? description : "No description"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        {/* </Link> */}
      </section>

  );
};

export default PointUnderList;
