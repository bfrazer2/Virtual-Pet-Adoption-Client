//React Imports
import React, { useEffect, useRef, FC } from 'react';

//MUI Imports
import { Card } from '@mui/joy';

//Konva Imports
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';

//Native Imports
//Styles
import styles from './SpriteCreator.module.scss';

type Dimensions = {
  width: number;
  height: number;
}

type SpriteCreatorProps = {
  dimensions: Dimensions
};

export const SpriteCreator: FC<SpriteCreatorProps> = ({ dimensions, ...props }) => {
  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    if (stageRef.current) {
      Konva.Image.fromURL('https://thumbs.dreamstime.com/b/lion-head-cartoon-style-color-minimalist-png-isolated-background-lion-head-cartoon-style-color-minimalist-png-isolated-background-279292767.jpg', function (lion) {
        const stage = stageRef.current;
        const layer = new Konva.Layer();

        const imgWidth = lion.width();
        const imgHeight = lion.height();

        // Determine the scaling factor to fit the image within the specified dimensions
        const scaleFactor = Math.min(dimensions.width / imgWidth, dimensions.height / imgHeight);

        // Calculate the new dimensions of the image after scaling
        const newImgWidth = imgWidth * scaleFactor;
        const newImgHeight = imgHeight * scaleFactor;

        // Calculate the position to center the image
        const posX = (dimensions.width - newImgWidth) / 2;
        const posY = (dimensions.height - newImgHeight) / 2;

        lion.scale({
          x: scaleFactor,
          y: scaleFactor,
        });

        lion.position({
          x: posX,
          y: posY,
        });

        lion.cache();
        lion.filters([Konva.Filters.RGB]);

        layer.add(lion);
        if (stage) {
          stage.add(layer);
        };

        const sliders = ['red', 'green', 'blue'];
        sliders.forEach(function (attr) {
          const slider = document.getElementById(attr) as HTMLInputElement;
          function update() {
            (lion as any)[attr](parseFloat(slider.value));
            layer.batchDraw();
          }
          slider.oninput = update;
          update();
        });
      }
      );
    }
  }, [dimensions]);

  return (
    <div className={styles.previewContainer}>
      <div className={styles.colorControls} id="controls">
        Red:
        <input id="red" type="range" min="0" max="256" step="1" defaultValue="150" />
        Green:
        <input id="green" type="range" min="0" max="256" step="1" defaultValue="150" />
        Blue:
        <input id="blue" type="range" min="0" max="256" step="1" defaultValue="150" />
      </div>
      <div className={styles.petStage}>
        <Stage width={dimensions.width} height={(dimensions.height * .65)} ref={stageRef}>
          <Layer />
        </Stage>
      </div>
    </div >
  );
};
