import React from "react";
import { Stage, Layer, Image, Rect, Circle } from "react-konva";
import useImage from "use-image";
import styled from "styled-components";

const MaskedImage = ({ src, masks, setSelectedMask, selectedMask }) => {
    const [image] = useImage(src);

    const onClickMaskHandler = (index) => {
        setSelectedMask(index);
    };

    return (
        <CanvasContainer>
            <Stage width={300} height={400}>
                <Layer>
                    <Image image={image} width={300} height={400} alt={image} />
                    {masks.map((mask, index) => (
                        <Circle
                            key={index}
                            x={mask.x}
                            y={mask.y}
                            width={mask.width}
                            height={mask.height}
                            fill={
                                selectedMask===index
                                    ? "rgba(16, 255, 36, 0.5)"
                                    : "rgba(0, 0, 0, 0.5)"
                            } // 마스킹 색상과 투명도
                            onClick={() => onClickMaskHandler(index)}
                        />
                    ))}
                </Layer>
            </Stage>
        </CanvasContainer>
    );
};

const CanvasContainer = styled.div`
    width: 300px;
    height: 400px;
    position: relative;
`;

export default MaskedImage;
