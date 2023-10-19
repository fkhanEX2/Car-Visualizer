import Swatch from "./static/images/S3C3T3.png";
import Hotspot from "./static/images/hotspotIcon.png";
import {
  Scene1BaseImage,
  Scene1Category1Swatch1,
  Scene1Category1Swatch2,
  Scene1Category1Swatch3,
  Scene1Category1Swatch4,
  Scene1Category2Swatch1,
  Scene1Category2Swatch2,
  Scene1Category2Swatch3,
} from "./static/Scene-1";
import {
  Scene2BaseImage,
  Scene2Category1Swatch1,
  Scene2Category1Swatch2,
  Scene2Category1Swatch3,
  Scene2Category1Swatch4,
} from "./static/Scene-2";
import {
  Scene3BaseImage,
  Scene3Category1Swatch1,
  Scene3Category1Swatch2,
  Scene3Category1Swatch3,
  Scene3Category1Swatch4,
  Scene3Category2Swatch1,
  Scene3Category2Swatch2,
  Scene3Category2Swatch3,
} from "./static/Scene-3";
import {
  Scene4BaseImage,
  Scene4Category1Swatch1,
  Scene4Category1Swatch2,
  Scene4Category1Swatch3,
  Scene4Category1Swatch4,
  Scene4Category2Swatch1,
  Scene4Category2Swatch2,
  Scene4Category2Swatch3,
} from "./static/Scene-4";
import {
  Scene5BaseImage,
  Scene5Category1Swatch1,
  Scene5Category1Swatch2,
  Scene5Category1Swatch3,
  Scene5Category1Swatch4,
} from "./static/Scene-5";

export const DATA: IVisualizer = {
  name: "Bugati",
  id: 2691,
  scenes: [
    {
      id: 4801,
      name: "Scene 1",
      baseImage: Scene1BaseImage,
      initialPosition: { x: 0, y: 0, z: 0 },
      initialRotation: { x: 0, y: -90, z: 0 },
      isDefault: true,
      categories: [
        {
          id: 3801,
          name: "Color",
          initialView: {
            id: 5719,
            yaw: 0.54,
            pitch: 0.09,
            fov: 61.94,
          },
          swatches: [
            {
              id: 2801,
              name: "Color 1",
              isSelected: true,
              path: Scene1Category1Swatch1,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2802,
              name: "Color 2",
              isSelected: false,
              path: Scene1Category1Swatch2,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2803,
              name: "Color 3",
              isSelected: false,
              path: Scene1Category1Swatch3,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2804,
              name: "Color 4",
              isSelected: false,
              path: Scene1Category1Swatch4,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
          ],
        },
        {
          id: 3802,
          name: "Alloys",
          initialView: {
            id: 5719,
            yaw: 0.54,
            pitch: 0.09,
            fov: 61.94,
          },
          swatches: [
            {
              id: 2805,
              name: "Alloy 1",
              isSelected: true,
              path: Scene1Category2Swatch1,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2806,
              name: "Alloy 2",
              isSelected: false,
              path: Scene1Category2Swatch2,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2807,
              name: "Alloy 3",
              isSelected: false,
              path: Scene1Category2Swatch3,
              thumbnailPath: Swatch,
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
          id: 1801,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 2",
          sceneId: 4802,
          initialPosition: { x: 4, y: 0, z: -5 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
        {
          id: 1802,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 3",
          sceneId: 4803,
          initialPosition: { x: 4, y: -1, z: -3 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
        {
          id: 1803,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 4",
          sceneId: 4804,
          initialPosition: { x: -4, y: -1, z: -3 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
        {
          id: 1804,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 5",
          sceneId: 4805,
          initialPosition: { x: -4, y: 0, z: -5 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
      ],
    },
    {
      id: 4802,
      name: "Scene 2",
      baseImage: Scene2BaseImage,
      initialPosition: { x: 0, y: 0, z: 0 },
      initialRotation: { x: 0, y: -90, z: 0 },
      isDefault: false,
      categories: [
        {
          id: 3803,
          name: "Color",
          initialView: {
            id: 5719,
            yaw: 0.54,
            pitch: 0.09,
            fov: 61.94,
          },
          swatches: [
            {
              id: 2808,
              name: "Color 1",
              isSelected: true,
              path: Scene2Category1Swatch1,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2809,
              name: "Color 2",
              isSelected: false,
              path: Scene2Category1Swatch2,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2810,
              name: "Color 3",
              isSelected: false,
              path: Scene2Category1Swatch3,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2811,
              name: "Color 4",
              isSelected: false,
              path: Scene2Category1Swatch4,
              thumbnailPath: Swatch,
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
          id: 1805,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 1",
          sceneId: 4801,
          initialPosition: { x: -2, y: 0, z: -8 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
        {
          id: 1806,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 3",
          sceneId: 4803,
          initialPosition: { x: -2, y: -2, z: -5 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
        {
          id: 1807,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 4",
          sceneId: 4804,
          initialPosition: { x: 2, y: 0, z: -8 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
        {
          id: 1808,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 5",
          sceneId: 4805,
          initialPosition: { x: 0.5, y: 1, z: -8 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
      ],
    },
    {
      id: 4803,
      name: "Scene 3",
      baseImage: Scene3BaseImage,
      initialPosition: { x: 0, y: 0, z: 0 },
      initialRotation: { x: 0, y: -90, z: 0 },
      isDefault: false,
      categories: [
        {
          id: 3804,
          name: "Color",
          initialView: {
            id: 5719,
            yaw: 0.54,
            pitch: 0.09,
            fov: 61.94,
          },
          swatches: [
            {
              id: 2812,
              name: "Color 1",
              isSelected: true,
              path: Scene3Category1Swatch1,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2813,
              name: "Color 2",
              isSelected: false,
              path: Scene3Category1Swatch2,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2814,
              name: "Color 3",
              isSelected: false,
              path: Scene3Category1Swatch3,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2815,
              name: "Color 4",
              isSelected: false,
              path: Scene3Category1Swatch4,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
          ],
        },
        {
          id: 3805,
          name: "Alloys",
          initialView: {
            id: 5719,
            yaw: 0.54,
            pitch: 0.09,
            fov: 61.94,
          },
          swatches: [
            {
              id: 2816,
              name: "Alloy 1",
              isSelected: true,
              path: Scene3Category2Swatch1,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2817,
              name: "Alloy 2",
              isSelected: false,
              path: Scene3Category2Swatch2,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2818,
              name: "Alloy 3",
              isSelected: false,
              path: Scene3Category2Swatch3,
              thumbnailPath: Swatch,
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
          id: 1809,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 1",
          sceneId: 4801,
          initialPosition: { x: -4, y: -2, z: -8 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
        {
          id: 1810,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 2",
          sceneId: 4802,
          initialPosition: { x: 1, y: -2, z: -5 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
        {
          id: 1811,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 4",
          sceneId: 4804,
          initialPosition: { x: -6, y: -1, z: -8 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
        {
          id: 1812,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 5",
          sceneId: 4805,
          initialPosition: { x: -4, y: 1, z: -8 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
      ],
    },
    {
      id: 4804,
      name: "Scene 4",
      baseImage: Scene4BaseImage,
      initialPosition: { x: 0, y: 0, z: 0 },
      initialRotation: { x: 0, y: -90, z: 0 },
      isDefault: false,
      categories: [
        {
          id: 3806,
          name: "Color",
          initialView: {
            id: 5719,
            yaw: 0.54,
            pitch: 0.09,
            fov: 61.94,
          },
          swatches: [
            {
              id: 2819,
              name: "Color 1",
              isSelected: true,
              path: Scene4Category1Swatch1,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2820,
              name: "Color 2",
              isSelected: false,
              path: Scene4Category1Swatch2,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2821,
              name: "Color 3",
              isSelected: false,
              path: Scene4Category1Swatch3,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2822,
              name: "Color 4",
              isSelected: false,
              path: Scene4Category1Swatch4,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
          ],
        },
        {
          id: 3807,
          name: "Alloys",
          initialView: {
            id: 5719,
            yaw: 0.54,
            pitch: 0.09,
            fov: 61.94,
          },
          swatches: [
            {
              id: 2823,
              name: "Alloy 1",
              isSelected: true,
              path: Scene4Category2Swatch1,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2824,
              name: "Alloy 2",
              isSelected: false,
              path: Scene4Category2Swatch2,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2825,
              name: "Alloy 3",
              isSelected: false,
              path: Scene4Category2Swatch3,
              thumbnailPath: Swatch,
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
          id: 1813,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 1",
          sceneId: 4801,
          initialPosition: { x: 5, y: -2, z: -8 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
        {
          id: 1814,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 2",
          sceneId: 4802,
          initialPosition: { x: 7, y: -1, z: -10 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
        {
          id: 1815,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 3",
          sceneId: 4803,
          initialPosition: { x: 9, y: -3, z: -12 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
        {
          id: 1816,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 5",
          sceneId: 4805,
          initialPosition: { x: 0, y: -3, z: -10 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
      ],
    },
    {
      id: 4805,
      name: "Scene 5",
      baseImage: Scene5BaseImage,
      initialPosition: { x: 0, y: 0, z: 0 },
      initialRotation: { x: 0, y: -90, z: 0 },
      isDefault: false,
      categories: [
        {
          id: 3808,
          name: "Color",
          initialView: {
            id: 5719,
            yaw: 0.54,
            pitch: 0.09,
            fov: 61.94,
          },
          swatches: [
            {
              id: 2826,
              name: "Color 1",
              isSelected: true,
              path: Scene5Category1Swatch1,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2827,
              name: "Color 2",
              isSelected: false,
              path: Scene5Category1Swatch2,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2828,
              name: "Color 3",
              isSelected: false,
              path: Scene5Category1Swatch3,
              thumbnailPath: Swatch,
              initialPosition: { x: 0, y: 0, z: 0 },
              initialRotation: { x: 0, y: -90, z: 0 },
            },
            {
              id: 2829,
              name: "Color 4",
              isSelected: false,
              path: Scene5Category1Swatch4,
              thumbnailPath: Swatch,
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
          id: 1817,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 1",
          sceneId: 4801,
          initialPosition: { x: 1, y: -1, z: -8 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
        {
          id: 1818,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 2",
          sceneId: 4802,
          initialPosition: { x: 0, y: 1, z: -8 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
        {
          id: 1819,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 3",
          sceneId: 4803,
          initialPosition: { x: 2, y: 0, z: -8 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
        {
          id: 1820,
          yaw: 0,
          pitch: 0,
          thumbnail: Hotspot,
          header: "Scene 4",
          sceneId: 4804,
          initialPosition: { x: 2, y: -4, z: -8 },
          initialRotation: { x: 0, y: 0, z: 0 },
        },
      ],
    },
  ],
};
