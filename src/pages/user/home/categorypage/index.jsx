import React from "react";
import "./category.css";
import { Link } from "react-router-dom";
export default function CategoryPage() {
  return (
    <>
      <section className="block p-0 w-full max-w-[1300px] m-[0_auto] z-20 mt-20">
        <div className="w-full flex items-center justify-between  m-[0_auto] relative z-[10]">
          <div className="flex flex-wrap justify-between gap-5 w-full">
            <div className="flex flex-col items-center justify-center  flex-1 min-w-[200px] m-2 group">
              <div>
                <a href="">
                  <img
                    src="/images/collection-banner-_36_600x.webp"
                    className="border rounded-3xl"
                  />
                </a>
              </div>
              <div className="mt-6">
                <Link className="font-bold text-black group-hover:text-blue-500 category-title">
                  Headphone
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 min-w-[200px] m-2 group">
              <div>
                <Link href="">
                  <img
                    src="/images/collection-banner-_35_600x.webp"
                    className="border rounded-3xl"
                  />
                </Link>
              </div>
              <div className="mt-6">
                <Link className="font-bold text-black group-hover:text-blue-500 category-title">
                  Earphone
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 min-w-[200px] m-2 group">
              <div>
                <a href="">
                  <img
                    src="/images/collection-banner-_37_600x.webp"
                    className="border rounded-3xl"
                  />
                </a>
              </div>
              <div className="mt-6">
                <Link className="font-bold text-black group-hover:text-blue-500 category-title">
                  Smartphone
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 min-w-[200px] m-2 group">
              <div>
                <a href="">
                  <img
                    src="/images/collection-banner_31_600x.webp"
                    className="border rounded-3xl"
                  />
                </a>
              </div>
              <div className="mt-6">
                <Link className="font-bold text-black group-hover:text-blue-500 category-title">
                  Smartwatch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
