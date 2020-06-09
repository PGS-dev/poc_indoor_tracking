import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Dictionary } from '../../../app.model';
import { IRoute } from '../../canvas/canvas.model';
import { RouteService } from '../services/routes-progress.service';
import { RoutesSelectors } from '../../../store/routes/routes.selectors';
import { RoutesProgressHandlerService } from '../services/routes-progress-handler.service';

function handleRoutes(routesId: string[], setStateCallback: (routeId: string, data: IRoute) => void) {
  RoutesProgressHandlerService.getInstance().updateRoutesServicesByIds(routesId, setStateCallback);
  return () => RoutesProgressHandlerService.getInstance().clearRoutesServicesByIds(routesId, setStateCallback);
}

export function useRoutesState(): Dictionary<IRoute> {
  const routeServices = useRef<RouteService[]>([]);
  const [routesState, setRoutesState] = useState<Dictionary<IRoute>>({});
  const routesIds = useSelector(RoutesSelectors.routesIds);

  const updateRouteState = useCallback((routeId: string, data: IRoute) => {
    setRoutesState((state) => ({
      ...state,
      [routeId]: { progress: 0, ...data },
    }));
  }, []);

  useEffect(() => handleRoutes(routesIds, updateRouteState), [routesIds, updateRouteState]);

  useEffect(
    () => () => {
      routeServices.current.forEach((service) => service.clear());
      routeServices.current = [];
    },
    []
  );
  return { ...routesState };
}
