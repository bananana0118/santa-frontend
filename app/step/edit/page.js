"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLoading } from "@/hooks/useLoading";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import styled from "styled-components";
import ImagePreview from "@/components/Image/ImagePreview";
import ImageSlider from "@/components/Image/ImageSlider";
import { useFile } from "@/components/layout/Provider";

export default function Edit({ loading }) {
    const { filename } = useFile();
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([...filename]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const handleImageChange = (currentImage) => {
        setSelectedImage(currentImage);
    };
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        console.log(files);
        setSelectedFiles(files);

        const urls = files.map((file) => URL.createObjectURL(file));
        setImages((prev) => [...prev, urls]);
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        setSelectedImage(images[0]);
    }, [images]);

    return (
        <Container>
            <View>
                <Top>
                    {images.length > 0 ? (
                        <ImagePreview src={selectedImage} />
                    ) : (
                        <InputButtonContainer>
                            <InputButton>사진을 업로드해 주세요</InputButton>
                        </InputButtonContainer>
                    )}
                    <FileInput
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        ref={fileInputRef}
                    />
                </Top>
                <Bottom>
                    <ImageSlider images={images} setImages={setImages} />
                    <BottomActions>
                        <ActionButton>초대링크 복사</ActionButton>
                        <ActionButton>사진 편집하기</ActionButton>
                    </BottomActions>
                </Bottom>
            </View>
        </Container>
    );
}

const Container = styled.div`
    height: calc(100vh - 56px); /* 전체 화면 높이를 사용 */
    padding: 0;
    margin: 0;
    box-sizing: border-box; /* padding 및 border를 포함하여 요소 크기 설정 */
    overflow: hidden; /* 스크롤바 숨기기 */
`;

const View = styled.div`
    display: flex; /* Flexbox 사용 */
    height: 100%;
    flex-direction: column; /* 세로 방향으로 정렬 */
    box-sizing: border-box; /* padding 및 border를 포함하여 요소 크기 설정 */
`;

const Top = styled.div`
    flex: 6; /* 전체 공간의 60% 차지 */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightblue; /* 시각적 구분을 위해 배경색 설정 */
`;

const Bottom = styled.div`
    flex: 4; /* 전체 공간의 40% 차지 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    background-color: lightcoral; /* 시각적 구분을 위해 배경색 설정 */
`;
const BottomActions = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    gap: 10px;
    padding: 16px;
`;

const ActionButton = styled.button`
    padding: 10px 20px;
    width: 100%;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.8); /* 검정색 배경과 80% 투명도 */
        cursor: pointer;
    }
`;
const FileInput = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
`;

const InputButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ededed;
    color: white;
    padding: 16px;
    border-radius: 8px;
    background-color: black;
`;

const InputButtonContainer = styled.div`
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