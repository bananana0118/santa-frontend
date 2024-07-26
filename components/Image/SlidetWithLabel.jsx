import React from "react";
import UserImageSlider from "./UserImageSlider";
import styled from "styled-components";

export default function SlidetWithLabel({ label, images }) {
    return (
        <div>
            <Lable>{label}</Lable>
            <UserImageSlider
                images={images}
                imageSize={48}
                viewCount={5}
            ></UserImageSlider>
        </div>
    );
}

const Lable = styled.div`
    font-weight: 500;
    color: var(--gray-6, #888889);
`;
