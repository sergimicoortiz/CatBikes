import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useStations } from "../../hooks/useStations";
import CaruselItem from "./caruselItem";
import "./CaruselStations.scss";

const CaruselStations = () => {
    const { stations } = useStations();

    const data = stations.map((item) => {
        return { img: item.image, slug: item.slug };
    });
    const carusel_items = data.map((item, index) => (
        <SwiperSlide key={index}>
            <CaruselItem data={item} />
        </SwiperSlide>
    ));
    return (
        <div>
            <br />
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                {carusel_items}
            </Swiper>
            <br />
        </div>
    );
};

export default CaruselStations;
