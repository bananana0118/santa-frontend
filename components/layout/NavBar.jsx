"use client";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import { pageConfig } from "@/pagesConfig";

export default function NavBar({ text, hasCompleteBtn }) {
    const router = useRouter();
    const pathName = usePathname();
    const showHeader = pageConfig[pathName]?.showHeader ?? false;

    return (
        showHeader && (
            <NavBarContainer>
                <SvgIcon>
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
                    <CompleteButton>완료</CompleteButton>
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
