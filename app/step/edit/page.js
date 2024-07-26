"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLoading } from "@/hooks/useLoading";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import styled from "styled-components";
import ImagePreview from "@/components/Image/ImagePreview";
import ImageSlider from "@/components/Image/ImageSlider";
import { useFile } from "@/components/layout/Provider";
import MaskedImage from "@/components/Image/MaskedImage";
import UserImageSlider from "@/components/Image/UserImageSlider";

const testTargetimages = [
    "/images/circleImage.png",
    "https://via.placeholder.com/80",
    "https://via.placeholder.com/80",
    "https://via.placeholder.com/80",
    "https://via.placeholder.com/80",
    "https://via.placeholder.com/80",
    // 더 많은 이미지 경로를 추가하세요
];

export default function Edit({ loading }) {
    const { filename } = useFile();
    const [activeTab, setActiveTab] = useState("changeFace");
    const [selectedMask, setSelectedMask] = useState();
    const masks = [
        { x: 50, y: 50, width: 100, height: 100 },
        { x: 150, y: 100, width: 100, height: 100 },
        // 추가 마스킹 영역
    ];
    const [images, setImages] = useState([...filename]);
    const [targetImages, setTargetImages] = useState([]);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const handleImageChange = (currentImage) => {
        setSelectedImage(currentImage);
    };

    useEffect(() => {
        setSelectedImage(images[0]);
    }, [images]);

    return (
        <Container>
            <View>
                <Top>
                    {images.length > 0 ? (
                        <MaskedImage
                            src={selectedImage}
                            masks={masks}
                            selectedMask={selectedMask}
                            setSelectedMask={setSelectedMask}
                        />
                    ) : (
                        <></>
                    )}
                </Top>
                <Bottom>
                    <BottomTab>
                        <TabButton
                            isActive={activeTab === "changeFace"}
                            onClick={() => setActiveTab("changeFace")}
                        >
                            얼굴바꾸기
                        </TabButton>
                        <TabButton
                            isActive={activeTab === "addPerson"}
                            onClick={() => setActiveTab("addPerson")}
                        >
                            사람 추가하기
                        </TabButton>
                    </BottomTab>
                    <Content>
                        {activeTab === "changeFace" && (
                            <UserImageSlider images={testTargetimages} />
                        )}
                        {activeTab === "addPerson" && (
                            <div>사람 추가하기 콘텐츠</div>
                        )}
                    </Content>
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
    padding-bottom: 10px;
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

const BottomTab = styled.div`
    display: flex;
`;

const TabButton = styled.div`
    flex: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding-top: 10px;
    padding-bottom: 10px;
    cursor: pointer;
    ${(props) =>
        props.isActive &&
        `
    border-bottom: 2px solid black;
    font-weight: bold;
  `}
`;
const Content = styled.div`
    margin-top: 20px;
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start; /* 수정: 중앙이 아닌 상단 정렬 */
`;
