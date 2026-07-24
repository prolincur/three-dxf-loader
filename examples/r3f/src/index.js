/*
 * Copyright (c) 2020-present Prolincur Technologies LLP.
 * All Rights Reserved.
 */

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Bounds, Center, OrbitControls } from '@react-three/drei'
import { DXFExample } from './dxf-example'
import './index.css'

const DXF_URL = process.env.PUBLIC_URL + '/api-cw750-details.dxf'
const FONT_URL = process.env.PUBLIC_URL + '/fonts/helvetiker_regular.typeface.json'

function App() {
  return (
    <div id="container">
      <Canvas orthographic camera={{ position: [0, 0, 100] }} style={{ background: '#f5f5f5' }}>
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          {/* Bounds auto-fits the camera to the loaded drawing -- DXF units/extents vary per file.
              Center recenters the drawing to the origin first: DXF coordinates are rarely
              centered on (0,0), and Bounds derives its camera direction from
              (camera.position - box.center), so an off-origin box skews that direction off
              the Z-axis and the "orthographic" view ends up looking isometric. */}
          <Bounds fit clip observe margin={1.2}>
            <Center>
              <DXFExample url={DXF_URL} fontUrl={FONT_URL} />
            </Center>
          </Bounds>
        </Suspense>
        {/* DXF drawings are 2D -- zoom only, no rotate/pan. */}
        <OrbitControls makeDefault enableRotate={false} />
      </Canvas>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
