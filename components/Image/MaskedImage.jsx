import React, { useRef } from "react";
import {
    Stage,
    Layer,
    Image as KonvaImage,
    Rect,
    Circle,
    Group,
} from "react-konva";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useImage from "use-image";
import styled from "styled-components";

const MaskedImage = ({ src, masks, setSelectedMask, selectedMask }) => {
    const [image] = useImage(src);
    const imageRef = useRef(null);
    const stageRef = useRef(null);
    const imageLayerRef = useRef(null);
    const groupRef = useRef(null);

    const onClickMaskHandler = (index) => {
        setSelectedMask(index);
    };

    const handleWheel = (e) => {
        e.evt.preventDefault();
        const stage = stageRef.current;
        const scaleBy = 1.1;
        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        const newScale =
            e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
        stage.scale({ x: newScale, y: newScale });

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };

        stage.position(newPos);
        stage.batchDraw();
    };


    return (
        <ZoomContainer>
            <CanvasContainer>
                <Stage
                    width={400}
                    height={400}
                    onWheel={handleWheel}
                    ref={stageRef}
                >
                    <Layer>
                        <Group ref={groupRef} draggable>
                            <StyledImage
                                image={image}
                                alt={image}
                                ref={imageRef}
                            />
                            {masks.map((mask, index) => (
                                <Circle
                                    key={index}
                                    x={mask.x}
                                    y={mask.y}
                                    width={mask.width}
                                    height={mask.height}
                                    fill={
                                        selectedMask === index
                                            ? "rgba(16, 255, 36, 0.5)"
                                            : "rgba(0, 0, 0, 0.5)"
                                    } // 마스킹 색상과 투명도
                                    onClick={() => onClickMaskHandler(index)}
                                />
                            ))}
                        </Group>
                    </Layer>
                </Stage>
            </CanvasContainer>
        </ZoomContainer>
    );
};

const CanvasContainer = styled.div`
    overflow: hidden; /* 컨테이너를 초과하는 부분을 숨기기 위해 추가 */
`;

export default MaskedImage;
const ZoomContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden; /* 컨테이너를 초과하는 부분을 숨기기 위해 추가 */
`;

const Controls = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
`;

const ControlButton = styled.button`
    margin: 0 5px;
    padding: 10px 20px;
    font-size: 18px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }

    &:focus {
        outline: none;
    }

    &:active {
        background-color: #004494;
    }
`;
const StyledImage = styled(KonvaImage)`
    width: 100%;
    height: 100%;
    object-fit: cover; /* 원본 비율 유지하고 초과하는 부분 숨기기 */
`;
