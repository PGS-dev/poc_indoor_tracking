import { IObject, IPath, IPoint, IRoute, IVehicle, IWall } from '../../models/main.model';
import * as THREE from 'three';
import { BackgroundProperty } from 'csstype';

export enum VisualizationType {
  D2 = 'D2',
  D3 = 'D3',
}

export interface IWallWithPointsCoordinates extends Omit<IWall, 'start' | 'end'> {
  start: IPoint;
  end: IPoint;
}

export interface IObjectWithPointsCoordinates extends Omit<IObject, 'shapePoints'> {
  shapePoints: IPoint[];
}

export interface IPathWithPointsCoordinates extends Omit<IPath, 'points'> {
  points: IPoint[];
}

export interface IRouteWithComputedData extends Omit<IRoute, 'vehicle' | 'path'> {
  vehicle: IVehicle;
  path: IPathWithPointsCoordinates;
}

export type Color = THREE.Color | number | string;

export interface ICanvasTheme {
  canvasBackground: BackgroundProperty<any>;
  text: {
    color: Color;
  };
  floor: {
    D2: Color;
    D3: Color;
  };
  sensor: {
    D2: Color;
    D3: Color;
  };
  walls: {
    D2: { line: Color };
    D3: Color;
  };
  objects: {
    D2: {
      line: Color;
      shape: Color;
      text: Color;
    };
    D3: {
      shape: Color;
      text: Color;
    };
  };
  paths: {
    D2: {
      gapSize: number;
      dashSize: number;
      line: Color;
      selectedLine: Color;
    };
    D3: {
      gapSize: number;
      dashSize: number;
      line: Color;
      selectedLine: Color;
    };
  };
}
