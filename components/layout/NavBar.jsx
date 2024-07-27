"use client";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { useParams, usePathname, useRouter } from "next/navigation";
import { pageConfig } from "@/pagesConfig";
import { useFile } from "./Provider";
import extractPath from "@/utils/extractPath";
import { api } from "@/apis/apis";

export default function NavBar({ text, hasCompleteBtn }) {
    const router = useRouter();
    const params = useParams();
    const url = usePathname();

    const pathName = extractPath(url, "/step");
    const showHeader = pageConfig[pathName]?.showHeader ?? false;
    const { fileData, mode, selectedFaceInfo, addMaskInfo } = useFile(); // Context 사용
    const { id } = params;

    const swapFaces = async () => {
        console.log(selectedFaceInfo);
        const requestData = {
            ...selectedFaceInfo,
        };

        try {
            const response = await api.post("/swap_faces", requestData);
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error swapping faces:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("groupId", Number(id));
        formData.append("coordinate", JSON.stringify(addMaskInfo));

        try {
            const response = await api.post("/add_people", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                responseType: "blob", // 이미지 파일을 받기 위해 responseType을 blob으로 설정
            });

            // Blob 데이터를 처리하는 로직 추가
            const blob = new Blob([response.data], {
                type: response.headers["content-type"],
            });
            const url = window.URL.createObjectURL(blob);
            console.log(url);
        } catch (error) {
            console.error("Error adding people and fetching the image:", error);
        }
    };

    const onClickCompleteHandler = (e) => {
        console.log(mode);

        if (mode == "changeFace") {
            swapFaces();
            router.push(`/${id}/step/complete`);
        }
        if (mode == "addPerson") {
            handleSubmit(e);
            router.push(`/${id}/step/complete`);
        }
    };

    return (
        showHeader && (
            <NavBarContainer>
                <SvgIcon onClick={() => router.back()}>
                    <Image
                        src="/svgIcon/arrowLeft.svg"
                        alt="arrow"
                        width="24"
                        height="24"
                    ></Image>
                </SvgIcon>
                <Title
                    center={pageConfig[pathName]?.hasCompleteBtn ? true : false}
                >
                    {pageConfig[pathName].title}
                </Title>
                {pageConfig[pathName]?.hasCompleteBtn ? (
                    <CompleteButton onClick={onClickCompleteHandler}>
                        완료
                    </CompleteButton>
                ) : (
                    <NullDiv></NullDiv>
                )}
            </NavBarContainer>
        )
    );
}

const NavBarContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: white;
`;

const Title = styled.div`
    font-size: 16px;
    font-weight: 600;
    margin-left: 16px;
    line-height: 24px; /* 150% */
`;

const SvgIcon = styled.div`
    width: 56px;
    height: 56px;
    padding: 16px 16px;
    box-sizing: border-box;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1); /* 검정색 배경과 80% 투명도 */
        cursor: pointer;
    }
`;

const NullDiv = styled.div`
    width: 56px;
    height: 56px;
    margin-right: 16px;
`;

const CompleteButton = styled.div`
    display: flex;
    padding: 2px 14px;
    background-color: black;
    color: white;
    margin-right: 16px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    &:hover {
        background-color: rgba(0, 0, 0, 0.5); /* 검정색 배경과 80% 투명도 */
        cursor: pointer;
    }
`;
