import React from "react";
import styled from "styled-components";

export default function TextButton(props) {
    return <Button>TextButton</Button>;
}

const Button = styled.button`
    width: ${(props) => props.width || "350px"};
    height: ${(props) => props.width || "52px"};
    border-radius: 4px;
    background-color: white;
`;
