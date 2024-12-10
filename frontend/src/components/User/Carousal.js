import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const CarouselComponent = () => {
  return (
    <div className="w-[300px] max-w-4xl mx-auto ml-[70px] mt-4">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        allowTouchMove={false} // Disable manual swiping
      >
        {/* Carousel Items */}
        <SwiperSlide>
          <img
            src="https://res.cloudinary.com/drygl5o4k/image/upload/v1733332877/hyqatgti9ww6zb23mjd5.png"
            alt="Slide 1 Will upload image in this slide soon"
            className="w-full h-64 object-cover rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://res.cloudinary.com/drygl5o4k/image/upload/v1733332883/kkaxjdy7jci5zkruaevd.png"
            alt="Slide 2 Will upload image in this slide soon"
            className="w-full h-64 object-cover rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://res.cloudinary.com/drygl5o4k/image/upload/v1733332879/awakhnoo9acr2oou5pm9.png"
            alt="Slide 3  Will upload image in this slide soon"
            className="w-full h-64 object-cover rounded-lg"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CarouselComponent;
