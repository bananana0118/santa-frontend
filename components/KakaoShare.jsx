"use client"
import React, { useEffect } from "react";
import styled from "styled-components";

export default function KakaoShare() {
    const onClickKakaoHandler = () => {
        //kakaoSdk부른후 window.kakao로 접근
        if (window.Kakao) {
            const kakao = window.kakao;

            //중복 initialization 방지
            //카카오에서 제공하는 jsㅏkey를 이용하여 initializae
            if (!kakao.isInitialized()) {
                console.log(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
                kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
            }

            kakao.Share.sendDefault({
                objectType: "feed",
                content: {
                    title: "테스트",
                    description: "테스트",
                    imageUrl: "adas",
                    link: {
                        mobileWebUrl: "",
                        webUrl: "",
                    },
                },
            });
        }
    };

    useEffect(() => {
        //카카오톡 sdk 추가
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);

        return () => document.body.removeChild(script);
    }, []);

    return (
        <div>
            <KakaoShareBtn onClick={onClickKakaoHandler}>asd</KakaoShareBtn>
        </div>
    );
}

const KakaoShareBtn = styled.button``;
