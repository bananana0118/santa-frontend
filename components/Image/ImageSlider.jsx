import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function ImageSlider({ images }) {
    const settings = {
        speed: 500,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
    };

    return (
        <SliderContainer>
            <Slider {...settings}>
                <AddImage>첫번째 이미지 요소</AddImage>
                {images.map((src, index) => (
                    <Group key={index}>
                        <SlideImage src={src} alt={`Slide ${index}`} />
                    </Group>
                ))}
            </Slider>
        </SliderContainer>
    );
}

const SliderContainer = styled.div`
    width: 100%;
    .slick-slide img {
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
`;

const SlideImage = styled.img`
    width: 80px;
    border-radius: 8px;
`;

const AddImage = styled.div`
    background-color: white;
    height: 80px;
    width: auto;
    border-radius: 8px;
`;

const Group = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
