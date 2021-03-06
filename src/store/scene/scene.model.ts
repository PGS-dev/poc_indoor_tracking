import { Color, IVisualizationScene } from '../../modules/canvas/canvas.model';

export type SelectSceneElementsByPathsIdsPayload = Array<{ pathId: string; color: Color }>;
export type SetObjectResourceIndicatorPayload = Array<{ objectId: string; resourceIndicator: number /*0-1*/ }>;

export enum SceneAction {
  SET_SCENE = '@@scene/SET_SCENE',
  SELECT_SCENE_ELEMENTS_BY_PATHS_IDS = '@@scene/SELECT_SCENE_OBJECTS',
}

export interface SceneState extends IVisualizationScene {}
