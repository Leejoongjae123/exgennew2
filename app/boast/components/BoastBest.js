"use client";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Chip } from "@nextui-org/react";
import Link from "next/link";
function BoastBest() {
  const supabase = createClient();
  const [bestBoasts, setBestBoasts] = useState([]);

  useEffect(() => {
    const fetchBestBoasts = async () => {
      const { data, error } = await supabase
        .from("boast")
        .select("*")
        .eq("best", true);

      if (error) {
        console.error("Error fetching best boasts:", error);
      } else {
        setBestBoasts(data);
      }
    };

    fetchBestBoasts();
  }, []);

  return (
    <>
      <h1 className="page-title my-3">자랑하기 BEST</h1>
      <div
        className="relative"
        tabindex="-1"
        uk-slider="autoplay: true;finite: false;autoplayInterval:2000"
      >
        <div className="uk-slider-container pb-1">
          <ul
            className="uk-slider-items w-[calc(100%+14px)]"
            uk-scrollspy="target: > li; cls: uk-animation-scale-up; delay: 20;repeat:true"
          >
            {bestBoasts.map((boast) => (
              <li className="pr-3 w-1/2" uk-scrollspy-className="uk-animation-fade">
                <div className="card">
                  <Link href={`/boast/${boast.id}`}>
                    <div className="card-media sm:aspect-[2/1.7] h-36 relative">
                      <img src={boast.thumbImage} alt="" />
                      <div className="card-overly"></div>
                      <Chip
                        color="primary"
                        className=" z-50 absolute top-0 left-0 m-2"
                      >
                        BEST
                      </Chip>
                    </div>
                  </Link>
                  <div className="card-body relative">
                    <span className="text-teal-600 font-semibold text-xs">
                      <Link href={`/boast/${boast.id}`}>{boast.title}</Link>
                    </span>
                    <p className="card-text block text-black mt-0.5">
                      <Link href={`/boast/${boast.id}`}>{boast.description}</Link>
                    </p>
                    <p className="text-xs text-gray-500 text-right">
                      {new Date(boast.regiDate).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-md:hidden">
          <a
            className="nav-prev !bottom-1/2 !top-auto"
            href="#"
            uk-slider-item="previous"
          >
            {" "}
            <ion-icon name="chevron-back" className="text-2xl"></ion-icon>{" "}
          </a>
          <a
            className="nav-next !bottom-1/2 !top-auto"
            href="#"
            uk-slider-item="next"
          >
            {" "}
            <ion-icon name="chevron-forward" className="text-2xl"></ion-icon>
          </a>
        </div>

        <div className="flex justify-center">
          <ul className="inline-flex flex-wrap justify-center my-5 gap-2 uk-dotnav uk-slider-nav">
            {" "}
          </ul>
        </div>
      </div>
    </>
  );
}

export default BoastBest;