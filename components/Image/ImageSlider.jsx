import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import UploadButton from "../button/UploadButton";

export default function ImageSlider({ images, setImages }) {
    const settings = {
        speed: 500,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
    };
console.log("images" , images)
    return (
        <SliderContainer>
            <Slider {...settings}>
                <UploadButton
                    images={images}
                    setImages={setImages}
                ></UploadButton>
                {images.map((src, index) => (
                    <Group key={index} className="slide-group">
                        <SlideImage src={src} alt={`Slide ${index}`} />
                    </Group>
                ))}
                <NullDiv></NullDiv>
            </Slider>
        </SliderContainer>
    );
}

const SliderContainer = styled.div`
    width: 100%;
    .slick-slide .slide-group img {
        width: auto;
        height: 80px;
    }
    .slick-list {
        margin: 0 -10px; /* 양쪽에 마이너스 마진을 줘서 padding과 균형을 맞춤 */
    }

    .slick-slide > div {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px; /* 각 슬라이드에 패딩을 줘서 간격을 만듦 */
    }

    .slick-slide .first > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const SlideImage = styled.img`
    width: 80px;
    border-radius: 8px;
`;
const NullDiv = styled.div`
    opacity: 0;
    height: 80px;
    width: 10px;
    border-radius: 8px;
`;

const Group = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
