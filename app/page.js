"use client";
import KakaoShare from "@/components/button/KakaoShare";
import TextButton from "@/components/button/TextButton";
import Container from "@/components/layout/Container";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import styled from "styled-components";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Container color={"black"}>
            <ViewBox>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <TextBox>
                            <Image
                                src="/svgIcon/logo.svg"
                                alt="logo"
                                width={350}
                                height={150}
                            ></Image>
                        </TextBox>
                        <TextButtonBox>
                            <TextButton
                                onClickHandler={() => {
                                    router.push("/step/upload");
                                }}
                            >
                                사진 업로드
                            </TextButton>
                        </TextButtonBox>
                    </>
                )}
            </ViewBox>
        </Container>
    );
}

const Row = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 60px; /* 125% */
`;
const TextBox = styled.div`
    position: absolute;
    top: 30%; /* 화면 상단에서 30% 떨어진 위치 */
    display: flex;
    flex-direction: column;
    justify-content: left;
`;

const ViewBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 40px;
    align-items: center;

`;

const TextButtonBox = styled.div`
    position: absolute;
    flex-direction: column;
    top: 90%; /* 화면 상단에서 30% 떨어진 위치 */
`;
