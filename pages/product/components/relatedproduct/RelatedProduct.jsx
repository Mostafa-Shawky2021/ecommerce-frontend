import React, { useState } from 'react';

import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

import { SectionLayout } from '@root/components/layout';
import { ProductCard } from '@root/components/cards';

import "swiper/css/pagination";
import "swiper/css/navigation";

import style from './relatedproduct.module.scss';

const RelatedProduct = () => {

    const [swiper, setSwiper] = useState(null);
    return (
        <div className={style.relatedProductWrapper}>
            <SectionLayout title="المنتجات ذات صلة">
                {(nextElementRef, prevElementRef) => (
                    <Swiper
                        modules={[Pagination, Navigation]}
                        className={style.swiperWrapper}
                        slidesPerView="auto"
                        navigation={{
                            prevEl: nextElementRef.current,
                            nextEl: prevElementRef.current,
                        }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            480: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            992: { slidesPerView: 4 },
                            // 1170: { slidesPerView: 4 },
                        }}
                        loop={true}
                        spaceBetween={18}
                        onSwiper={setSwiper}
                    >
                        <SwiperSlide>
                            <ProductCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductCard />
                        </SwiperSlide>
                    </Swiper>
                )}

            </SectionLayout>

        </div>
    )
}
export default RelatedProduct