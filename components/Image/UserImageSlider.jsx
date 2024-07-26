import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";

export default function UserImageSlider({ images }) {
    const settings = {
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        draggable: true,
        focusOnSelect: false,
    };
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageClick = (index) => {
        setSelectedImage(index);
    };

    return (
        <SliderContainer>
            <Slider {...settings}>
                {images.map((src, index) => (
                    <ImageWrapper key={index}>
                        <Image
                            src={src}
                            alt={`Image ${index}`}
                            onClick={() => handleImageClick(index)}
                            isSelected={selectedImage === index}
                        />
                    </ImageWrapper>
                ))}
            </Slider>
        </SliderContainer>
    );
}

const SliderContainer = styled.div`
    width: 100%;
    .slick-slide {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .slick-list {
        padding: 0 10px;
    }
`;

const ImageList = styled.div`
    gap: 10px; /* 이미지 간 간격 */
    transition: transform 0.3s ease; /* 스크롤 애니메이션 */
`;

const ImageWrapper = styled.div`
    display: inline-block;
    padding: 8px;
`;

const Image = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: ${(props) =>
        props.isSelected ? "2px solid black" : "2px solid transparent"};
    cursor: pointer;
    object-fit: cover;
    transition: border 0.3s;
`;
