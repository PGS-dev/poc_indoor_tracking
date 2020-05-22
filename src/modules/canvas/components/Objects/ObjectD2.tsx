import React, { useContext, useMemo } from 'react';
import { BufferGeometry, ExtrudeGeometry, Vector3 } from 'three';

import { IObjectWithPointsCoordinates } from '../../canvas.model';
import { Label2D } from './Label2D';
import { LineUtils } from '../../utils/line.utils';
import { ObjectsUtils } from './objects.utils';
import { ShapeUtils } from '../../utils/shape.utils';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useMouseEvent } from '../../hooks/use-mouse-event.hook';

interface ObjectD2Props extends IObjectWithPointsCoordinates {}

const extrudeSettings = { depth: 0, bevelEnabled: false };

export const ObjectD2: React.FC<ObjectD2Props> = ({ meta, shapePoints, fromGround = 0.001, ...props }) => {
  const theme = useContext(ThemeContext);
  const emitEventConfig = { meta, shapePoints, fromGround, ...props };
  const [handleClick, handlePointerOver, handlePointerOut] = useMouseEvent(emitEventConfig);

  const lineGeometry = useMemo(() => {
    const points = LineUtils.getPathPointsFromPointCoordinates(shapePoints, fromGround);
    return new BufferGeometry().setFromPoints(points);
  }, [shapePoints, fromGround]);

  const planeGeometry = useMemo(() => {
    const geometryShape = ShapeUtils.getShapeFromPointCoordinates(shapePoints);
    return new ExtrudeGeometry(geometryShape, extrudeSettings);
  }, [shapePoints]);

  const labelPosition: Vector3 = useMemo(() => ObjectsUtils.getLabelPosition(planeGeometry, fromGround), [
    planeGeometry,
    fromGround,
  ]);

  return (
    <group>
      {meta ? <Label2D title={meta.name} description={meta.description} position={labelPosition} /> : null}
      <mesh
        args={[planeGeometry]}
        position-z={fromGround}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}>
        <meshPhongMaterial
          attach="material"
          color={theme.objects.D2.shape}
          transparent={true}
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
      <lineLoop args={[lineGeometry]}>
        <lineBasicMaterial attach="material" color={theme.objects.D2.line} />
      </lineLoop>
    </group>
  );
};