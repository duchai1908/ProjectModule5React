import React from "react";

export default function Map() {
  return (
    <section className="block p-0 w-full max-w-[1300px] m-[0_auto] z-20 mt-14">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.3741163955574!2d105.77865277476889!3d21.01771158815887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455c862f3aee1%3A0x53602e8d02ec1d24!2zVG_DoCBOaMOgIFPDtG5nIMSQw6A!5e0!3m2!1svi!2s!4v1727678065048!5m2!1svi!2s"
        width="100%"
        height="600"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
