import BaseImage from "./static/images/Scene-1.jpg";
import Cat1Swa1 from "./static/images/S1C1S1.png";
import Cat1Swa2 from "./static/images/S1C1S2.png";
import Cat1Swa3 from "./static/images/S1C1S3.png";
import Cat2Swa1 from "./static/images/S1C2S1.png";
import Cat2Swa2 from "./static/images/S1C2S2.png";
import Cat2Swa3 from "./static/images/S1C2S3.png";
import Cat3Swa1 from "./static/images/S1C3S1.png";
import Cat3Swa2 from "./static/images/S1C3S2.png";
import Cat3Swa3 from "./static/images/S1C3S3.png";
import Cat1Tbn1 from "./static/images/S1C1T1.png";
import Cat1Tbn2 from "./static/images/S1C1T2.png";
import Cat1Tbn3 from "./static/images/S1C1T3.png";
import Cat2Tbn1 from "./static/images/S1C2T1.png";
import Cat2Tbn2 from "./static/images/S1C2T2.png";
import Cat2Tbn3 from "./static/images/S1C2T3.png";
import Cat3Tbn1 from "./static/images/S1C3T1.png";
import Cat3Tbn2 from "./static/images/S1C3T2.png";
import Cat3Tbn3 from "./static/images/S1C3T3.png";
import Hotspot from "./static/images/hotspsot.png";

export const data: IVisualizer = {
  name: "Visualizer 1",
  id: 2691,
  scenes: [
    {
      id: 4844,
      name: "Scene 1",
      baseImage: BaseImage,
      initialPosition: { x: 0, y: 0, z: 0 },
      initialRotation: { x: 0, y: -90, z: 0 },
      isDefault: true,
      categories: [
        {
          id: 4151,
          name: "Category 1",
          initialView: {
            id: 5719,
            yaw: 0.54,
            pitch: 0.09,
            fov: 61.94,
          },
          swatches: [
            {
              id: 12213,
              name: "Option 1",
              isSelected: true,
              path: Cat1Swa1,
              thumbnailPath: Cat1Tbn1,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 12214,
              name: "Option 2",
              isSelected: false,
              path: Cat1Swa2,
              thumbnailPath: Cat1Tbn2,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 12215,
              name: "Option 3",
              isSelected: false,
              path: Cat1Swa3,
              thumbnailPath: Cat1Tbn3,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
          ],
        },
        {
          id: 4152,
          name: "Category 2",
          initialView: {
            id: 5720,
            yaw: 0.54,
            pitch: 0.09,
            fov: 61.94,
          },
          swatches: [
            {
              id: 12216,
              name: "Option 1",
              isSelected: true,
              path: Cat2Swa1,
              thumbnailPath: Cat2Tbn1,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 12217,
              name: "Option 2",
              isSelected: false,
              path: Cat2Swa2,
              thumbnailPath: Cat2Tbn2,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 12218,
              name: "Option 3",
              isSelected: false,
              path: Cat2Swa3,
              thumbnailPath: Cat2Tbn3,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
          ],
        },
        {
          id: 4153,
          name: "Category 3",
          initialView: {
            id: 5720,
            yaw: 0.54,
            pitch: 0.09,
            fov: 61.94,
          },
          swatches: [
            {
              id: 12219,
              name: "Option 1",
              isSelected: true,
              path: Cat3Swa1,
              thumbnailPath: Cat3Tbn1,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 12220,
              name: "Option 2",
              isSelected: false,
              path: Cat3Swa2,
              thumbnailPath: Cat3Tbn2,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 12221,
              name: "Option 3",
              isSelected: false,
              path: Cat3Swa3,
              thumbnailPath: Cat3Tbn3,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
          ],
        },
      ],
      initialView: {
        id: 5706,
        yaw: 0,
        pitch: 0,
        fov: 75,
      },
      hotspots: [
        {
          id: 3624,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Dining Room Visualizer",
          sceneId: 4845,
          initialPosition: { x: 4, y: 0, z: -3 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
        {
          id: 3625,
          thumbnail: Hotspot,
          yaw: 0.8,
          pitch: 0,
          header: "Empty Kitchen",
          sceneId: 4846,
          initialPosition: { x: -4, y: 0, z: -3 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
      ],
    },
  ],
};
