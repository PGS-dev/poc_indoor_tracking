import { Dictionary } from '../../app.model';
import { IVehicle } from '../../modules/canvas/canvas.model';

export enum VehiclesAction {
  SET_VEHICLES = '@@vehicles/SET_VEHICLES',
  UPDATE_VEHICLE = '@@vehicles/UPDATE_VEHICLE',
}
export interface VehicleState extends IVehicle {
  acceleration: { x: number; y: number; z: number };
  lastUpdateTime: number;
  timeStats: string;
  currentRfIds: string[];
}

export interface VehiclesState extends Dictionary<VehicleState> {}
