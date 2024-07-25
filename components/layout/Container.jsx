import React from "react";
import styled from "styled-components";

export default function Container({ children }) {
    return <ContainerBox>{children}</ContainerBox>;
}

const ContainerBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: black;
`;
