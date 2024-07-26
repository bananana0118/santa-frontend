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
import dynamic from "next/dynamic";
import MaskedAddImage from "@/components/Image/MaskedAddImage";
import { api } from "@/apis/apis";
import { useParams } from "next/navigation";
import JSZip from "jszip";

const NoSSRComponent = dynamic(() => import("@/components/Image/MaskedImage"), {
    ssr: false,
});
const fetchCroppedImages = async ({ groupId, humanId, setImages }) => {
    try {
        const response = await api.post(
            "/get_cropped_imgs",
            {
                groupId: groupId,
                humanId: humanId,
            },
            {
                responseType: "blob", // Response type을 blob으로 설정하여 바이너리 데이터를 수신합니다.
            }
        );

        const zip = await JSZip.loadAsync(response.data);
        const images = [];

        for (const filename of Object.keys(zip.files)) {
            const file = await zip.file(filename).async("blob");
            images.push(URL.createObjectURL(file));
        }

        setImages(images);
    } catch (error) {
        console.error("Error fetching cropped images:", error);
    }
};

export default function Edit({ loading }) {
    const { filename, selectedMaskId } = useFile();
    const fileInputRef = useRef(null);
    const [sprite, setSprite] = useState(null);
    const params = useParams();
    const { id } = params;
    const [coords, setCoords] = useState(null);

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

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // 수정된 부분
        if (file) {
            const url = URL.createObjectURL(file);
            setSprite(url);
        }
    };

    const handleImageChange = (currentImage) => {
        setSelectedImage(currentImage);
    };

    useEffect(() => {
        setSelectedImage(images[0]);
    }, [images]);

    useEffect(() => {
        const fetchCoords = async () => {
            try {
                const response = await api.post("/get_coord", {
                    groupId: Number(id),
                });
                setCoords(response.data);
            } catch (error) {
                console.error("Error fetching coordinates:", error);
            }
        };

        fetchCoords();
    }, [id]);

    useEffect(() => {
        //async함수로 코드 만들어서 setTargetImages 에 값저장한다.
        const fetchTargetImage = async () => {
            if (selectedMaskId) {
                await fetchCroppedImages({
                    groupId: Number(id),
                    humanId: selectedMaskId,
                    setImages: setTargetImages,
                });
            }
        };

        fetchTargetImage();
    }, [selectedMaskId, id]);

    return (
        <Container>
            <Top>
                {images.length > 0 ? (
                    activeTab === "changeFace" ? (
                        <MaskedImage
                            src={selectedImage}
                            coords={coords}
                            selectedMask={selectedMask}
                            setSelectedMask={setSelectedMask}
                        />
                    ) : (
                        <MaskedAddImage
                            src={selectedImage}
                            spriteSrc={sprite}
                        ></MaskedAddImage>
                    )
                ) : (
                    <></>
                )}
            </Top>
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
            <Bottom activeTab={activeTab}>
                {activeTab === "changeFace" && (
                    <Content>
                        <UserImageSlider images={targetImages} />
                    </Content>
                )}
                {activeTab === "addPerson" && (
                    <AddContent>
                        {sprite ? (
                            <ImagePreview
                                src={sprite}
                                height={"200px"}
                            ></ImagePreview>
                        ) : (
                            <>
                                <AddButtonContainer>
                                    <AddButton>사람 추가하기</AddButton>
                                </AddButtonContainer>
                                <FileInput
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                />
                            </>
                        )}
                    </AddContent>
                )}
            </Bottom>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 56px); /* 전체 화면 높이를 사용 */
    padding: 0;
    margin: 0;
    box-sizing: border-box; /* padding 및 border를 포함하여 요소 크기 설정 */
    overflow: hidden; /* 스크롤바 숨기기 */
`;

const View = styled.div`
    display: flex; /* Flexbox 사용 */
    flex-direction: column; /* 세로 방향으로 정렬 */
`;

const Top = styled.div`
    flex: 5; /* 전체 공간의 60% 차지 */
    display: flex;
    min-height: 400px;
    justify-content: center;
    align-items: center;
    background-color: #f6f6f6; /* 시각적 구분을 위해 배경색 설정 */
`;

const Bottom = styled.div`
    flex: 4;
    display: ${(props) =>
        props.activeTab === "changeFace" ? "block" : "flex"};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
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

const BottomTab = styled.div`
    display: flex;
    flex: 1;
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
    display: flex;
    justify-content: center;
    align-items: center;
`;
const AddContent = styled.div`
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AddButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: white;
`;

const AddButton = styled.button`
    width: 175px;
    height: 52px;
    line-height: 24px; /* 150% */
    border-radius: 8px;
    background-color: black;
    color: white;
`;

const FileInput = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
`;
