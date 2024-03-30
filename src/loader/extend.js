import * as THREE from 'three'

// This method is used to ensure backward compatability with older version of threejs
// As module has been moved in/out from THREE to examples across versions
const THREEx = {}

function load() {
  if (THREE.FontLoader) {
    THREEx.FontLoader = THREE.FontLoader
  } else {
    import(/* webpackIgnore: true */ 'three/examples/jsm/loaders/FontLoader.js')
      .then((module) => (THREEx.FontLoader = module.FontLoader))
      .catch((error) => console.error(error))
  }

  if (THREE.TextGeometry) {
    THREEx.TextGeometry = THREE.TextGeometry
  } else {
    import(/* webpackIgnore: true */ 'three/examples/jsm/geometries/TextGeometry.js')
      .then((module) => (THREEx.TextGeometry = module.TextGeometry))
      .catch((error) => console.error(error))
  }
}
load()

export default THREEx
