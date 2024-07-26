import React, { useRef, useEffect, useState } from "react";
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
import { useFile } from "../layout/Provider";

const MaskedAddImage = ({ src, masks, spriteSrc }) => {
    const [image] = useImage(src);
    const imageRef = useRef(null);
    const stageRef = useRef(null);
    const [imageSize, setImageSize] = useState({ width: 400, height: 400 }); // 기본값 설정

    const imageLayerRef = useRef(null);
    const groupRef = useRef(null);
    const [spriteImage] = useImage(spriteSrc); // Load the sprite image
    const { setFileData } = useFile(); // Context 사용

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

    useEffect(() => {
        if (stageRef.current) {
            const uri = stageRef.current.toDataURL();
            setFileData(uri); // 이미지를 context에 저장
        }
    }, [image, spriteImage, masks, setFileData]);

    useEffect(() => {
        if (image) {
            setImageSize({ width: image.width, height: image.height });
        }
    }, [image]);

    return (
        <ZoomContainer>
            <CanvasContainer>
                <Stage
                    width={imageSize.width}
                    height={imageSize.height}
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
                            {spriteImage && (
                                <KonvaImage
                                    image={spriteImage} // 스프라이트 이미지 추가
                                    x={100} // 필요한 위치로 조정
                                    y={100} // 필요한 위치로 조정
                                    width={50} // 필요한 크기로 조정
                                    height={50} // 필요한 크기로 조정
                                    draggable
                                />
                            )}
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

export default MaskedAddImage;
