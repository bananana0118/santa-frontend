import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";

export default function UserImageSlider({ images, imageSize, viewCount }) {
    const settings = {
        infinite: false,
        slidesToShow: viewCount ? viewCount : 4,
        slidesToScroll: 1,
        arrows: false,
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
                            width={imageSize}
                            height={imageSize}
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
        display: flex !important;
        justify-content: center; /* 중앙 정렬 */
        align-items: center; /* 중앙 정렬 */
        height: auto; /* 높이 자동 조정 */
    }
`;

const ImageList = styled.div`
    gap: 10px; /* 이미지 간 간격 */
    transition: transform 0.3s ease; /* 스크롤 애니메이션 */
`;

const ImageWrapper = styled.div`
    display: flex !important;
    justify-content: center; /* 중앙 정렬 */
    align-items: center; /* 중앙 정렬 */
    padding: 8px;
    box-sizing: border-box;
    width: ${(props) => props.imageSize + 16}px; /* 패딩 포함 크기 */
`;

const Image = styled.img`
    width: ${(props) => (props.width ? props.width + "px" : "80px")};
    height: ${(props) => (props.height ? props.height + "px" : "80px")};
    border-radius: 50%;
    box-sizing: border-box;
    border: ${(props) =>
        props.isSelected ? "2px solid black" : "2px solid transparent"};
    cursor: pointer;
    object-fit: cover;
    transition: border 0.3s;
`;
