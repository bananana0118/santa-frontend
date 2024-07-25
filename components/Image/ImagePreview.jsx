import React from "react";
import styled from "styled-components";

export default function ImagePreview({ src }) {
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
`;

const PreviewImage = styled.img`
    height: auto;
    border-radius: 8px;
    border: 1px solid #ddd;
`;
