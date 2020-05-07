import React from 'react'
import * as THREE from 'three'
import { IPoint, IWall } from '../../../../models/main.model'
import { VectorUtils } from './walls.unitls'

export interface WallProps extends Omit<IWall, 'start' | 'end'> {
  start: IPoint
  end: IPoint
  height?: number
}

export const Wall: React.FC<WallProps> = React.memo(({ height = 2.7, start, end, thickness }) => {
  const shape = VectorUtils.getShapeFromVectors(
    [new THREE.Vector2(start.x, start.y), new THREE.Vector2(end.x, end.y)],
    thickness
  )

  const extrudeSettings = {
    steps: 2,
    depth: height,
    bevelEnabled: false,
  }

  return (
    <mesh>
      <extrudeBufferGeometry attach="geometry" args={[shape, extrudeSettings] as any} />
      <meshPhongMaterial
        // side={THREE.DoubleSide}
        attach="material"
        color={'red'}
        transparent={true}
        opacity={0.5}
        depthWrite={false}
      />
    </mesh>
  )
})