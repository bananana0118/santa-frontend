"use client";
import Image from "next/image";
import styled from "styled-components";

export default function Home() {
    return (
        <Container>
            <View>asdasdas</View>
        </Container>
    );
}

const Container = styled.main`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    background-color: black;
`;

const View = styled.div`
    width: 100%;
    background-color: white;
    max-width: 420px;
    height: 100%;
    border: 1px solid black;
`;
