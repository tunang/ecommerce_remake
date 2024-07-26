import panel from "../../../../img/BannerImg/banner.jpg";
import panel2 from "../../../../img/BannerImg/banner2.jpg";
import panel3 from "../../../../img/BannerImg/banner3.jpg";


import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { GoDot, GoDotFill } from "react-icons/go";

import { Swiper, SwiperSlide } from "swiper/react";

import { useState } from "react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './banner.css'
import { Navigation } from 'swiper/modules';
const panels = [panel, panel2, panel3];

const Banner = () => {
  const [Index, setIndex] = useState(0);

  function handleRight(event) {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }

    if (Index === panels.length - 1) {
      setIndex(0);
    } else {
      setIndex(Index + 1);
    }
  }

  function handleLeft(event) {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }

    if (Index === 0) {
      setIndex(panels.length - 1);
    } else {
      setIndex(Index - 1);
    }
  }


  return (


    <div className="relative">
      <Swiper navigation={true} modules={[Navigation]} className="flex relative h-[250px] md:h-[400px] lg:h-[660px] ">
        {panels.map((panel, index) => {
          return (
              <SwiperSlide className="relative w-full rounded">
                <div className="absolute w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-[15%]"></div>
                <img
                  className="w-full h-full object-cover rounded"
                  src={panel}
                  alt=""
                />
                <h1 className="absolute text-3xl md:text-5xl lg:text-7xl text-white bottom-[30%] left-[5%] drop-shadow-[-3px_3px_0px_black]">
                  NEW COLLECTION
                </h1>
                <p className="absolute w-1/2 text-white bottom-[20%] left-[5%]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <button className="hidden lg:block absolute bg-white  bottom-[20%] right-[10%] text-4xl font-bold px-10 py-3 rounded-full">
                  Buy Now
                </button>
              </SwiperSlide>
            
          );
        })}
        {/* <FaChevronLeft
          onClick={(e) => handleLeft(e)}
          className="absolute h-full left-0 top-0 w-6 lg:w-12 lg:pl-5 text-white bg-gradient-to-r from-primary drop-shadow-[0px_0px_15px_rgba(0,0,0,1) pl-2 cursor-pointer "
        />
        <FaChevronRight
          onClick={(e) => handleRight(e)}
          className="absolute h-full top-0 right-0 w-6 lg:w-12 lg:pr-5 text-white bg-gradient-to-l from-primary drop-shadow-[0px_0px_15px_rgba(0,0,0,1) pr-2 cursor-pointer"
        /> */}
      </Swiper>

      <div className="flex absolute w-full align-middle justify-center bottom-[1%]">
        {panels.map((panel, panelIndex) => {
          return <div onClick={() => setIndex(panelIndex)}>{Index === panelIndex ? <GoDotFill className="w-6 h-6 lg:w-12 lg:h-12 text-quinary" key={panelIndex}/> : <GoDot className="w-6 h-6 lg:w-12 lg:h-12 text-quinary" key={panelIndex}/>}</div>
        })}
      </div>
    </div>
  );
};

export default Banner;
