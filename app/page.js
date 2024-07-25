"use client";
import KakaoShare from "@/components/button/KakaoShare";
import TextButton from "@/components/button/TextButton";
import Container from "@/components/layout/Container";
import Image from "next/image";
import styled from "styled-components";

export default function Home() {
    return (
        <Container>
            <ViewBox>
                <TextBox>
                    <Row>
                        모두가
                        <Image
                            src="/svgIcon/loveit.svg"
                            alt="loveit"
                            width={48}
                            height={48}
                        ></Image>
                    </Row>
                    <Row>
                        <Image
                            src="/svgIcon/star.svg"
                            alt="loveit"
                            width={48}
                            height={48}
                        ></Image>
                        만족할 수 있는
                    </Row>
                    <Row>
                        단체사진{" "}
                        <Image
                            src="/svgIcon/picture.svg"
                            alt="loveit"
                            width={48}
                            height={48}
                        ></Image>
                    </Row>
                </TextBox>
                <TextButtonBox>
                    <TextButton></TextButton>
                </TextButtonBox>
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
