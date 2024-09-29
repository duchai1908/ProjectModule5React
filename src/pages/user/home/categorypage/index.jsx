import React from "react";

export default function CategoryPage() {
  return (
    <>
      <section className="block p-0 w-full max-w-[1200px] m-[0_auto] z-20 mt-14">
        <div className="w-full flex items-center justify-between  m-[0_auto] relative z-[10]">
          <div className="flex flex-wrap justify-between w-full">
            <div className="flex flex-col items-center justify-center flex-1 min-w-[200px] m-2 group">
              <div>
                <a href="">
                  <img
                    src="/images/collection-banner-_36_600x.webp"
                    className="border rounded-3xl"
                  />
                </a>
              </div>
              <div className="mt-6">
                <p className="font-bold text-black group-hover:text-blue-500">
                  Headphone
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 min-w-[200px] m-2 group">
              <div>
                <a href="">
                  <img
                    src="/images/collection-banner-_35_600x.webp"
                    className="border rounded-3xl"
                  />
                </a>
              </div>
              <div className="mt-6">
                <p className="font-bold text-black group-hover:text-blue-500">
                  Earphone
                </p>
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
                <p className="font-bold text-black group-hover:text-blue-500">
                  Smartphone
                </p>
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
                <p className="font-bold text-black group-hover:text-blue-500">
                  Smartwatch
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
