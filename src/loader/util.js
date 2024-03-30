import * as THREE from 'three'

// This method is used to ensure backward compatability with older version of threejs
// As module has been moved in/out from THREE to examples across versions
function ensureThreeClass(THREEx, modulePath, className) {
  if (THREE[className]) {
    THREEx[className] = THREE[className]
    return
  }
  import(modulePath)
    .then((module) => (THREEx[className] = module[className]))
    .catch((error) => console.error(error))
}

export { ensureThreeClass }
