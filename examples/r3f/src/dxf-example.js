/*
 * Copyright (c) 2020-present Prolincur Technologies LLP.
 * All Rights Reserved.
 */

import { useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { DXFLoader } from 'three-dxf-loader'

// DXFLoader implements the standard THREE.Loader interface (constructor(manager),
// load(url, onLoad, onProgress, onError)), so it plugs straight into R3F's useLoader --
// same pattern as useLoader(GLTFLoader, url).
function DXFExample({ url, fontUrl }) {
  const font = useLoader(FontLoader, fontUrl)

  const configureLoader = useMemo(
    () => (loader) => {
      loader.setFont(font)
      loader.setDefaultColor(0x000000)
      loader.setConsumeUnits(true)
      loader.setEnableLayer(true)
    },
    [font]
  )

  const { entity } = useLoader(DXFLoader, url, configureLoader)

  return <primitive object={entity} />
}

export { DXFExample }
