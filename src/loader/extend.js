import * as THREE from 'three'

// This method is used to ensure backward compatability with older version of threejs
// As module has been moved in/out from THREE to examples across versions
const THREEx = {}

function load() {
  const key1 = 'FontLoader'
  if (THREE[key1]) {
    THREEx.FontLoader = THREE[key1]
  } else {
    import(/* webpackIgnore: true */ 'three/examples/jsm/loaders/FontLoader.js')
      .then((module) => (THREEx.FontLoader = module.FontLoader))
      .catch((error) => console.error(error))
  }

  const key2 = 'TextGeometry'
  if (THREE[key2]) {
    THREEx.TextGeometry = THREE[key2]
  } else {
    import(/* webpackIgnore: true */ 'three/examples/jsm/geometries/TextGeometry.js')
      .then((module) => (THREEx.TextGeometry = module.TextGeometry))
      .catch((error) => console.error(error))
  }
}
load()

export default THREEx
