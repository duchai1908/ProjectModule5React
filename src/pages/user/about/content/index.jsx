import React from "react";

export default function Content() {
  return (
    <section className="block p-0 w-full max-w-[1200px] m-[0_auto] z-20 mt-14">
      <div className="w-full flex flex-col lg:flex-row justify-between items-center m-[0_auto] relative z-[10] gap-5">
        {/* Text Section */}
        <div className="w-full lg:w-[60%]">
          <p className="font-bold text-4xl mb-6">Apple Store E-Commerce</p>
          <p>
            Apple Store E-Commerce is a dynamic and innovative online retail
            platform that offers a wide range of products to customers
            worldwide. Established in 1191, our company has rapidly grown to
            become a prominent player in the eCommerce industry. Our mission is
            to provide customers with a seamless and convenient shopping
            experience while offering a diverse selection of high-quality
            products.
            <br />
            <br />
            Apple Store E-Commerce is dedicated to setting new standards in the
            eCommerce landscape, providing convenience, choice, and quality to
            our valued customers.
          </p>
        </div>

        {/* Image Section */}
        <div
          className="rounded-2xl bg-cover bg-center w-full lg:w-[40%] h-[400px]"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/564x/23/22/a6/2322a6a89f09db1d7c5956edd1a78aa8.jpg')",
          }}
        ></div>
      </div>
    </section>
  );
}
