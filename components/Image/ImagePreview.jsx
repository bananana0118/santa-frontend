import React from "react";
import styled from "styled-components";

export default function ImagePreview({ src }) {
    console.log(src)
    return (
        <PreviewContainer>
            <PreviewImage src={src} alt="Preview" />
        </PreviewContainer>
    );
}

const PreviewContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ededed;
    width: 95%;
    height: 80%;
    padding: 16px;
    border-radius: 8px;
    background-color: #fff;
    overflow: hidden; /* 컨테이너를 벗어나는 부분을 숨깁니다 */
`;

const PreviewImage = styled.img`
    height: auto;
    max-width: 100%; /* 이미지가 컨테이너의 너비를 넘지 않도록 합니다 */
    max-height: 100%; /* 이미지가 컨테이너의 높이를 넘지 않도록 합니다 */
    border-radius: 8px;
    border: 1px solid #ddd;
    object-fit: contain; /* 이미지가 비율을 유지하면서 컨테이너에 맞게 조정됩니다 */
`;
