import './App.css';
import React, { useState } from 'react';
import { Canvas } from './modules/three/Canvas';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { InfoSidebar } from './modules/ui-interface/components/InfoSidebar';
import { Menu } from './modules/ui-interface/components/Menu';
import { visualizationSceneMock, visualisationStateMock } from './mocks/main.mock';
import { VisualizationType } from './modules/three/canvas.model';
import { VisualisationTooltip } from './modules/visualisation-tooltip/VisualisationTooltip';
import { IEventContextPayload } from './modules/three/contexts/EventsContext';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  const [events, setEvents] = useState<IEventContextPayload>(null);

  return (
    <main className={'MainContainer'}>
      <ThemeProvider theme={theme}>
        <Menu />
        <Canvas
          scene={visualizationSceneMock}
          state={visualisationStateMock}
          type={VisualizationType.D3}
          events={setEvents}
        />
        <VisualisationTooltip events={events} />
        <InfoSidebar />
      </ThemeProvider>
    </main>
  );
}

export default App;
