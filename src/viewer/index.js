import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DXFLoader } from '../loader'
import THREEx from '../loader/extend'

/**
 * Viewer class for a dxf object.
 * @param {Object} data - the dxf object
 * @param {Object} parent - the parent element to which we attach the rendering canvas
 * @param {Number} width - width of the rendering canvas in pixels
 * @param {Number} height - height of the rendering canvas in pixels
 * @param {Object} font - a font loaded with THREE.FontLoader
 * @constructor
 */
function Viewer(data, parent, width, height, font) {
  const loader = new DXFLoader()
  loader.setFont(font)
  loader.setDefaultColor(0x000000)
  loader.setConsumeUnits(true)
  loader.setEnableLayer(true)
  // Create THREE meshes
  const result = loader.loadEntities(data)

  const scene = new THREE.Scene()
  scene.add(result.entity)
  // Create scene from dxf object (data)
  let i, obj, min_x, min_y, min_z, max_x, max_y, max_z

  const dims = new THREE.Box3()
  const bbox = dims.expandByObject(result.entity, true)
  if (isFinite(bbox.min.x) && dims.min.x > bbox.min.x) dims.min.x = bbox.min.x
  if (isFinite(bbox.min.y) && dims.min.y > bbox.min.y) dims.min.y = bbox.min.y
  if (isFinite(bbox.min.z) && dims.min.z > bbox.min.z) dims.min.z = bbox.min.z
  if (isFinite(bbox.max.x) && dims.max.x < bbox.max.x) dims.max.x = bbox.max.x
  if (isFinite(bbox.max.y) && dims.max.y < bbox.max.y) dims.max.y = bbox.max.y
  if (isFinite(bbox.max.z) && dims.max.z < bbox.max.z) dims.max.z = bbox.max.z

  width = width || parent.clientWidth
  height = height || parent.clientHeight
  const aspectRatio = width / height

  const upperRightCorner = { x: dims.max.x, y: dims.max.y }
  const lowerLeftCorner = { x: dims.min.x, y: dims.min.y }

  // Figure out the current viewport extents
  let vp_width = upperRightCorner.x - lowerLeftCorner.x
  let vp_height = upperRightCorner.y - lowerLeftCorner.y
  const center = {
    x: vp_width / 2 + lowerLeftCorner.x,
    y: vp_height / 2 + lowerLeftCorner.y,
  }

  // Fit all objects into current ThreeDXF viewer
  const extentsAspectRatio = Math.abs(vp_width / vp_height)
  if (aspectRatio > extentsAspectRatio) {
    vp_width = vp_height * aspectRatio
  } else {
    vp_height = vp_width / aspectRatio
  }

  const viewPort = {
    bottom: -vp_height / 2,
    left: -vp_width / 2,
    top: vp_height / 2,
    right: vp_width / 2,
    center: {
      x: center.x,
      y: center.y,
    },
  }

  const camera = new THREE.OrthographicCamera(
    viewPort.left,
    viewPort.right,
    viewPort.top,
    viewPort.bottom,
    0.001,
    750000
  )
  camera.position.z = dims.max.z + 10
  camera.position.x = viewPort.center.x
  camera.position.y = viewPort.center.y

  const renderer = (this.renderer = new THREE.WebGLRenderer())
  renderer.setSize(width, height)
  renderer.setClearColor(0xffffff, 1)

  parent.appendChild(renderer.domElement)
  parent.style.display = 'block'

  //TODO: Need to make this an option somehow so others can roll their own controls.
  const controls = new OrbitControls(camera, parent)
  controls.target.x = camera.position.x
  controls.target.y = camera.position.y
  controls.target.z = dims.max.z
  controls.zoomSpeed = 1

  //Uncomment this to disable rotation (does not make much sense with 2D drawings).
  //controls.enableRotate = false;

  this.render = function () {
    renderer.render(scene, camera)
  }
  controls.addEventListener('change', this.render)
  this.render()
  controls.update()

  this.resize = function (width, height) {
    const originalWidth = renderer.domElement.width
    const originalHeight = renderer.domElement.height

    const hscale = width / originalWidth
    const vscale = height / originalHeight

    camera.top = vscale * camera.top
    camera.bottom = vscale * camera.bottom
    camera.left = hscale * camera.left
    camera.right = hscale * camera.right

    //        camera.updateProjectionMatrix();

    renderer.setSize(width, height)
    renderer.setClearColor(0xffffff, 1)
    this.render()
  }
}

// Show/Hide helpers from https://plainjs.com/javascript/effects/hide-or-show-an-element-42/
// get the default display style of an element
function defaultDisplay(tag) {
  const iframe = document.createElement('iframe')
  iframe.setAttribute('frameborder', 0)
  iframe.setAttribute('width', 0)
  iframe.setAttribute('height', 0)
  document.documentElement.appendChild(iframe)

  const doc = (iframe.contentWindow || iframe.contentDocument).document

  // IE support
  doc.write()
  doc.close()

  const testEl = doc.createElement(tag)
  doc.documentElement.appendChild(testEl)
  const display = (window.getComputedStyle ? getComputedStyle(testEl, null) : testEl.currentStyle)
    .display
  iframe.parentNode.removeChild(iframe)
  return display
}

// actual show/hide function used by show() and hide() below
function showHide(el, show) {
  let value = el.getAttribute('data-olddisplay')
  const display = el.style.display
  const computedDisplay = (window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle)
    .display

  if (show) {
    if (!value && display === 'none') el.style.display = ''
    if (el.style.display === '' && computedDisplay === 'none')
      value = value || defaultDisplay(el.nodeName)
  } else {
    if ((display && display !== 'none') || !(computedDisplay == 'none'))
      el.setAttribute('data-olddisplay', computedDisplay == 'none' ? display : computedDisplay)
  }
  if (!show || el.style.display === 'none' || el.style.display === '')
    el.style.display = show ? value || '' : 'none'
}

// helper functions
function show(el) {
  showHide(el, true)
}
function hide(el) {
  showHide(el)
}

export { Viewer, THREEx }
