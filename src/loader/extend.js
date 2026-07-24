/*
 * Copyright (c) 2020-present Prolincur Technologies LLP.
 * All Rights Reserved.
 */

import * as THREE from 'three'

// This method is used to ensure backward compatability with older version of threejs
// As module has been moved in/out from THREE to examples across versions
const THREEx = {}

function load() {
  const key1 = 'FontLoader'
  const fontLoaderReady = THREE[key1]
    ? Promise.resolve((THREEx.FontLoader = THREE[key1]))
    : import(/* webpackIgnore: true */ 'three/examples/jsm/loaders/FontLoader.js')
        .then((module) => (THREEx.FontLoader = module.FontLoader))
        .catch((error) => console.error(error))

  const key2 = 'TextGeometry'
  const textGeometryReady = THREE[key2]
    ? Promise.resolve((THREEx.TextGeometry = THREE[key2]))
    : import(/* webpackIgnore: true */ 'three/examples/jsm/geometries/TextGeometry.js')
        .then((module) => (THREEx.TextGeometry = module.TextGeometry))
        .catch((error) => console.error(error))

  return Promise.all([fontLoaderReady, textGeometryReady])
}
// Consumers that draw TEXT entities before this resolves can silently skip them
// (see DXFLoader.loadEntities -> drawText) -- await THREEx.ready first if that matters.
THREEx.ready = load()

export default THREEx
