import React from "react";
import Image from "next/image";
import shape from "@/assets/images/shape/shape_02.svg";

const MapArea = () => {
  return (
    <div className="inner-banner-one position-relative pb-0">
      <div className="map-banner">
        <div className="gmap_canvas h-100 w-100">
          <iframe
            className="gmap_iframe h-100 w-100"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.683352475909!2d77.20950452495259!3d28.51917308922041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x69faea4c682cb8d1%3A0x79f33f98bef96a60!2sMetageeks%20Technologies%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1715956124481!5m2!1sen!2sin"
          ></iframe>
          {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.683352475909!2d77.20950452495259!3d28.51917308922041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x69faea4c682cb8d1%3A0x79f33f98bef96a60!2sMetageeks%20Technologies%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1715956124481!5m2!1sen!2sin"
            width="600"
            height="450"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe> */}
        </div>
      </div>
      <Image src={shape} alt="shape" className="lazy-img shapes shape_01" />
    </div>
  );
};

export default MapArea;
