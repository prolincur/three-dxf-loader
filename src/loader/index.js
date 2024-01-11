import * as THREE from 'three'
import { BufferGeometry, Color, Float32BufferAttribute, Vector3 } from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { Text } from 'troika-three-text'
import { parseDxfMTextContent } from '@dxfom/mtext'
import { Base64 } from 'js-base64'
import DxfParser from 'dxf-parser'
import bSpline from './bspline'

function decodeDataUri(uri) {
  if (uri) {
    const mime = uri.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)
    if (mime && mime.length > 0) {
      const type = mime[1]
      const data = uri.replace('data:' + type + ';', '').split(',')
      if (data && data.length === 2 && data[0] === 'base64') {
        const byteString = data[1]
        return Base64.decode(byteString)
      }
    }
  }
  return null
}

const textControlCharactersRegex = /\\[AXQWOoLIpfH].*;/g
const curlyBraces = /\\[{}]/g

// Three.js extension functions. Webpack doesn't seem to like it if we modify the THREE object directly.
var THREEx = { Math: {} }
/**
 * Returns the angle in radians of the vector (p1,p2). In other words, imagine
 * putting the base of the vector at coordinates (0,0) and finding the angle
 * from vector (1,0) to (p1,p2).
 * @param  {Object} p1 start point of the vector
 * @param  {Object} p2 end point of the vector
 * @return {Number} the angle
 */
THREEx.Math.angle2 = function (p1, p2) {
  var v1 = new THREE.Vector2(p1.x, p1.y)
  var v2 = new THREE.Vector2(p2.x, p2.y)
  v2.sub(v1) // sets v2 to be our chord
  v2.normalize()
  if (v2.y < 0) return -Math.acos(v2.x)
  return Math.acos(v2.x)
}

THREEx.Math.polar = function (point, distance, angle) {
  var result = {}
  result.x = point.x + distance * Math.cos(angle)
  result.y = point.y + distance * Math.sin(angle)
  return result
}

/**
 * Calculates points for a curve between two points using a bulge value. Typically used in polylines.
 * @param startPoint - the starting point of the curve
 * @param endPoint - the ending point of the curve
 * @param bulge - a value indicating how much to curve
 * @param segments - number of segments between the two given points
 */
function getBulgeCurvePoints(startPoint, endPoint, bulge, segments) {
  var vertex, i, center, p0, p1, angle, radius, startAngle, thetaAngle

  var obj = {}
  obj.startPoint = p0 = startPoint
    ? new THREE.Vector2(startPoint.x, startPoint.y)
    : new THREE.Vector2(0, 0)
  obj.endPoint = p1 = endPoint ? new THREE.Vector2(endPoint.x, endPoint.y) : new THREE.Vector2(1, 0)
  obj.bulge = bulge = bulge || 1

  angle = 4 * Math.atan(bulge)
  radius = p0.distanceTo(p1) / 2 / Math.sin(angle / 2)
  center = THREEx.Math.polar(
    startPoint,
    radius,
    THREEx.Math.angle2(p0, p1) + (Math.PI / 2 - angle / 2)
  )

  obj.segments = segments = segments || Math.max(Math.abs(Math.ceil(angle / (Math.PI / 18))), 6) // By default want a segment roughly every 10 degrees
  startAngle = THREEx.Math.angle2(center, p0)
  thetaAngle = angle / segments

  var vertices = []

  vertices.push(new THREE.Vector3(p0.x, p0.y, 0))

  for (i = 1; i <= segments - 1; i++) {
    vertex = THREEx.Math.polar(center, Math.abs(radius), startAngle + thetaAngle * i)
    vertices.push(new THREE.Vector3(vertex.x, vertex.y, 0))
  }

  return vertices
}

/**
 * THREE.Loader implementation for DXF files
 *
 * @param {*} manager THREE.LoadingManager
 *
 * @see https://threejs.org/docs/#api/en/loaders/Loader
 * @author Sourabh Soni / https://www.prolincur.com
 */

class DXFLoader extends THREE.Loader {
  constructor(manager) {
    super(manager)
    this.font = null
    this.enableLayer = false
  }

  setFont(font) {
    this.font = font
    return this
  }

  setEnableLayer(enableLayer) {
    this.enableLayer = enableLayer
    return this
  }

  load(url, onLoad, onProgress, onError) {
    var scope = this
    var loader
    try {
      loader = new THREE.XHRLoader(scope.manager)
    } catch {
      loader = new THREE.FileLoader(scope.manager)
    }

    loader.setPath(scope.path)
    // Test if it is a data-uri
    const text = decodeDataUri(url)
    if (text) {
      scope.loadString(text, onLoad, onError)
    } else {
      loader.load(
        url,
        (text) => {
          scope.loadString(text, onLoad, onError)
        },
        onProgress,
        onError
      )
    }
  }

  loadString(text, onLoad, onError) {
    var scope = this
    try {
      onLoad(scope.parse(text))
    } catch (error) {
      if (onError) {
        onError(error)
      } else {
        console.error(error)
      }
      scope.manager.itemError(error)
    }
  }

  parse(text) {
    const parser = new DxfParser()
    var dxf = parser.parseSync(text)
    return this.loadEntities(dxf, this.font, this.enableLayer)
  }

  /**
   * @param {Object} data - the dxf object
   * @param {Object} font - a font loaded with THREE.FontLoader
   * @constructor
   */
  loadEntities(data, font, enableLayer) {
    /* Entity Type
            'POINT' | '3DFACE' | 'ARC' | 'ATTDEF' | 'CIRCLE' | 'DIMENSION' | 'MULTILEADER' | 'ELLIPSE' | 'INSERT' | 'LINE' | 
            'LWPOLYLINE' | 'MTEXT' | 'POLYLINE' | 'SOLID' | 'SPLINE' | 'TEXT' | 'VERTEX'
        */
    function drawEntity(entity, data) {
      var mesh
      if (entity.type === 'CIRCLE' || entity.type === 'ARC') {
        mesh = drawArc(entity, data)
      } else if (
        entity.type === 'LWPOLYLINE' ||
        entity.type === 'LINE' ||
        entity.type === 'POLYLINE'
      ) {
        mesh = drawLine(entity, data)
      } else if (entity.type === 'TEXT') {
        mesh = drawText(entity, data)
      } else if (entity.type === 'SOLID') {
        mesh = drawSolid(entity, data)
      } else if (entity.type === 'POINT') {
        mesh = drawPoint(entity, data)
      } else if (entity.type === 'INSERT') {
        mesh = drawBlock(entity, data)
      } else if (entity.type === 'SPLINE') {
        mesh = drawSpline(entity, data)
      } else if (entity.type === 'MTEXT') {
        mesh = drawMtext(entity, data)
      } else if (entity.type === 'ELLIPSE') {
        mesh = drawEllipse(entity, data)
      } else if (entity.type === 'DIMENSION') {
        var dimTypeEnum = entity.dimensionType & 7
        if (dimTypeEnum === 0) {
          mesh = drawDimension(entity, data)
        } else {
          console.warn('Unsupported Dimension type: ' + dimTypeEnum)
        }
      } else if (entity.type === '3DFACE') {
        mesh = draw3dFace(entity, data)
      } else {
        console.warn('Unsupported Entity Type: ' + entity.type)
      }
      return mesh
    }

    function drawEllipse(entity, data) {
      var color = getColor(entity, data)

      var xrad = Math.sqrt(
        Math.pow(entity.majorAxisEndPoint.x, 2) + Math.pow(entity.majorAxisEndPoint.y, 2)
      )
      var yrad = xrad * entity.axisRatio
      var rotation = Math.atan2(entity.majorAxisEndPoint.y, entity.majorAxisEndPoint.x)

      var curve = new THREE.EllipseCurve(
        entity.center.x,
        entity.center.y,
        xrad,
        yrad,
        entity.startAngle,
        entity.endAngle,
        false, // Always counterclockwise
        rotation
      )

      var points = curve.getPoints(50)
      var geometry = new THREE.BufferGeometry().setFromPoints(points)
      var material = new THREE.LineBasicMaterial({ linewidth: 1, color: color })

      // Create the final object to add to the scene
      var ellipse = new THREE.Line(geometry, material)
      return ellipse
    }

    function drawMtext(entity, data) {
      var color = getColor(entity, data)

      if (!font) {
        return console.warn('font parameter not set. Ignoring text entity.')
      }

      var textAndControlChars = parseDxfMTextContent(entity.text)

      //Note: We currently only support a single format applied to all the mtext text
      var content = mtextContentAndFormattingToTextAndStyle(textAndControlChars, entity, color)

      var txt = createTextForScene(content.text, content.style, entity, color)
      if (!txt) return null

      var group = new THREE.Object3D()
      group.add(txt)
      return group
    }

    function mtextContentAndFormattingToTextAndStyle(textAndControlChars, entity, color) {
      let activeStyle = {
        horizontalAlignment: 'left',
        textHeight: entity.height,
      }

      var text = []
      for (let item of textAndControlChars) {
        if (typeof item === 'string') {
          if (item.startsWith('pxq') && item.endsWith(';')) {
            if (item.indexOf('c') !== -1) activeStyle.horizontalAlignment = 'center'
            else if (item.indexOf('l') !== -1) activeStyle.horizontalAlignment = 'left'
            else if (item.indexOf('r') !== -1) activeStyle.horizontalAlignment = 'right'
            else if (item.indexOf('j') !== -1) activeStyle.horizontalAlignment = 'justify'
          } else {
            text.push(item)
          }
        } else if (Array.isArray(item)) {
          var nestedFormat = mtextContentAndFormattingToTextAndStyle(item, entity, color)
          text.push(nestedFormat.text)
        } else if (typeof item === 'object') {
          if (item['S'] && item['S'].length === 3) {
            text.push(item['S'][0] + '/' + item['S'][2])
          } else {
            // not yet supported.
          }
        }
      }
      return {
        text: text.join(),
        style: activeStyle,
      }
    }

    function createTextForScene(text, style, entity, color) {
      if (!text) return null

      let textEnt = new Text()
      textEnt.text = text.replaceAll('\\P', '\n').replaceAll('\\X', '\n')

      textEnt.font = font.fontUrl
      textEnt.fontSize = style.textHeight
      textEnt.maxWidth = entity.width
      textEnt.position.x = entity.position.x
      textEnt.position.y = entity.position.y
      textEnt.position.z = entity.position.z
      textEnt.textAlign = style.horizontalAlignment
      textEnt.color = color
      if (entity.rotation) {
        textEnt.rotation.z = (entity.rotation * Math.PI) / 180
      }
      if (entity.directionVector) {
        var dv = entity.directionVector
        textEnt.rotation.z = new THREE.Vector3(1, 0, 0).angleTo(new THREE.Vector3(dv.x, dv.y, dv.z))
      }
      switch (entity.attachmentPoint) {
        case 1:
          // Top Left
          textEnt.anchorX = 'left'
          textEnt.anchorY = 'top'
          break
        case 2:
          // Top Center
          textEnt.anchorX = 'center'
          textEnt.anchorY = 'top'
          break
        case 3:
          // Top Right
          textEnt.anchorX = 'right'
          textEnt.anchorY = 'top'
          break

        case 4:
          // Middle Left
          textEnt.anchorX = 'left'
          textEnt.anchorY = 'middle'
          break
        case 5:
          // Middle Center
          textEnt.anchorX = 'center'
          textEnt.anchorY = 'middle'
          break
        case 6:
          // Middle Right
          textEnt.anchorX = 'right'
          textEnt.anchorY = 'middle'
          break

        case 7:
          // Bottom Left
          textEnt.anchorX = 'left'
          textEnt.anchorY = 'bottom'
          break
        case 8:
          // Bottom Center
          textEnt.anchorX = 'center'
          textEnt.anchorY = 'bottom'
          break
        case 9:
          // Bottom Right
          textEnt.anchorX = 'right'
          textEnt.anchorY = 'bottom'
          break

        default:
          return undefined
      }

      textEnt.sync(() => {
        if (textEnt.textAlign !== 'left') {
          textEnt.geometry.computeBoundingBox()
          var textWidth = textEnt.geometry.boundingBox.max.x - textEnt.geometry.boundingBox.min.x
          if (textEnt.textAlign === 'center') textEnt.position.x += (entity.width - textWidth) / 2
          if (textEnt.textAlign === 'right') textEnt.position.x += entity.width - textWidth
        }
      })

      return textEnt
    }

    function drawSpline(entity, data) {
      var color = getColor(entity, data)

      var points = getBSplinePolyline(
        entity.controlPoints,
        entity.degreeOfSplineCurve,
        entity.knotValues,
        100
      )

      var geometry = new THREE.BufferGeometry().setFromPoints(points)
      var material = new THREE.LineBasicMaterial({ linewidth: 1, color: color })
      var splineObject = new THREE.Line(geometry, material)

      return splineObject
    }

    /**
     * Interpolate a b-spline. The algorithm examins the knot vector
     * to create segments for interpolation. The parameterisation value
     * is re-normalised back to [0,1] as that is what the lib expects (
     * and t i de-normalised in the b-spline library)
     *
     * @param controlPoints the control points
     * @param degree the b-spline degree
     * @param knots the knot vector
     * @returns the polyline
     */
    function getBSplinePolyline(
      controlPoints,
      degree,
      knots,
      interpolationsPerSplineSegment,
      weights
    ) {
      const polyline = []
      const controlPointsForLib = controlPoints.map(function (p) {
        return [p.x, p.y]
      })

      const segmentTs = [knots[degree]]
      const domain = [knots[degree], knots[knots.length - 1 - degree]]

      for (let k = degree + 1; k < knots.length - degree; ++k) {
        if (segmentTs[segmentTs.length - 1] !== knots[k]) {
          segmentTs.push(knots[k])
        }
      }

      interpolationsPerSplineSegment = interpolationsPerSplineSegment || 25
      for (let i = 1; i < segmentTs.length; ++i) {
        const uMin = segmentTs[i - 1]
        const uMax = segmentTs[i]
        for (let k = 0; k <= interpolationsPerSplineSegment; ++k) {
          const u = (k / interpolationsPerSplineSegment) * (uMax - uMin) + uMin
          // Clamp t to 0, 1 to handle numerical precision issues
          let t = (u - domain[0]) / (domain[1] - domain[0])
          t = Math.max(t, 0)
          t = Math.min(t, 1)
          const p = bSpline(t, degree, controlPointsForLib, knots, weights)
          polyline.push(new THREE.Vector2(p[0], p[1]))
        }
      }
      return polyline
    }

    function drawLine(entity, data) {
      let points = []
      let color = getColor(entity, data)
      var material, lineType, vertex, startPoint, endPoint, bulgeGeometry, bulge, i, line

      if (!entity.vertices) return console.warn('entity missing vertices.')

      // create geometry
      for (i = 0; i < entity.vertices.length; i++) {
        if (entity.vertices[i].bulge) {
          bulge = entity.vertices[i].bulge
          startPoint = entity.vertices[i]
          endPoint = i + 1 < entity.vertices.length ? entity.vertices[i + 1] : points[0]

          let bulgePoints = getBulgeCurvePoints(startPoint, endPoint, bulge)

          points.push.apply(points, bulgePoints)
        } else {
          vertex = entity.vertices[i]
          points.push(new THREE.Vector3(vertex.x, vertex.y, 0))
        }
      }
      if (entity.shape) points.push(points[0])

      // set material
      if (entity.lineType) {
        lineType = data.tables.lineType.lineTypes[entity.lineType]
      }

      if (lineType && lineType.pattern && lineType.pattern.length !== 0) {
        material = new THREE.LineDashedMaterial({ color: color, gapSize: 4, dashSize: 4 })
      } else {
        material = new THREE.LineBasicMaterial({ linewidth: 1, color: color })
      }

      var geometry = new BufferGeometry().setFromPoints(points)

      line = new THREE.Line(geometry, material)
      return line
    }

    function drawArc(entity, data) {
      var startAngle, endAngle
      if (entity.type === 'CIRCLE') {
        startAngle = entity.startAngle || 0
        endAngle = startAngle + 2 * Math.PI
      } else {
        startAngle = entity.startAngle
        endAngle = entity.endAngle
      }

      var curve = new THREE.ArcCurve(0, 0, entity.radius, startAngle, endAngle)

      var points = curve.getPoints(32)
      var geometry = new THREE.BufferGeometry().setFromPoints(points)

      var material = new THREE.LineBasicMaterial({ color: getColor(entity, data) })

      var arc = new THREE.Line(geometry, material)
      arc.position.x = entity.center.x
      arc.position.y = entity.center.y
      arc.position.z = entity.center.z

      return arc
    }

    function addTriangleFacingCamera(verts, p0, p1, p2) {
      // Calculate which direction the points are facing (clockwise or counter-clockwise)
      var vector1 = new Vector3()
      var vector2 = new Vector3()
      vector1.subVectors(p1, p0)
      vector2.subVectors(p2, p0)
      vector1.cross(vector2)

      var v0 = new Vector3(p0.x, p0.y, p0.z)
      var v1 = new Vector3(p1.x, p1.y, p1.z)
      var v2 = new Vector3(p2.x, p2.y, p2.z)

      // If z < 0 then we must draw these in reverse order
      if (vector1.z < 0) {
        verts.push(v2, v1, v0)
      } else {
        verts.push(v0, v1, v2)
      }
    }

    function drawSolid(entity, data) {
      var material,
        verts,
        geometry = new THREE.BufferGeometry()

      var points = entity.points
      // verts = geometry.vertices;
      verts = []
      addTriangleFacingCamera(verts, points[0], points[1], points[2])
      addTriangleFacingCamera(verts, points[1], points[2], points[3])

      material = new THREE.MeshBasicMaterial({ color: getColor(entity, data) })
      geometry.setFromPoints(verts)

      return new THREE.Mesh(geometry, material)
    }

    function drawText(entity, data) {
      var geometry, material, text

      if (!font)
        return console.warn(
          'Text is not supported without a Three.js font loaded with THREE.FontLoader! Load a font of your choice and pass this into the constructor. See the sample for this repository or Three.js examples at http://threejs.org/examples/?q=text#webgl_geometry_text for more details.'
        )

      geometry = new TextGeometry(entity.text, {
        font: font,
        height: 0,
        size: entity.textHeight || 12,
      })

      if (entity.rotation) {
        var zRotation = (entity.rotation * Math.PI) / 180
        geometry.rotateZ(zRotation)
      }

      material = new THREE.MeshBasicMaterial({ color: getColor(entity, data) })

      text = new THREE.Mesh(geometry, material)
      text.position.x = entity.startPoint.x
      text.position.y = entity.startPoint.y
      text.position.z = entity.startPoint.z

      return text
    }

    function drawPoint(entity, data) {
      var geometry, material, point

      geometry = new THREE.BufferGeometry()

      geometry.setAttribute(
        'position',
        new Float32BufferAttribute([entity.position.x, entity.position.y, entity.position.z], 3)
      )

      var color = getColor(entity, data)

      material = new THREE.PointsMaterial({ size: 0.1, color: new Color(color) })
      point = new THREE.Points(geometry, material)
      return point
    }

    function drawDimension(entity, data) {
      var block = data.blocks[entity.block]

      if (!block || !block.entities) return null

      var group = new THREE.Object3D()
      // if(entity.anchorPoint) {
      //     group.position.x = entity.anchorPoint.x;
      //     group.position.y = entity.anchorPoint.y;
      //     group.position.z = entity.anchorPoint.z;
      // }

      for (var i = 0; i < block.entities.length; i++) {
        var childEntity = drawEntity(block.entities[i], data, group)
        if (childEntity) group.add(childEntity)
      }

      return group
    }

    function drawBlock(entity, data) {
      var block = data.blocks[entity.name]

      if (!block.entities) return null

      var group = new THREE.Object3D()

      if (entity.xScale) group.scale.x = entity.xScale
      if (entity.yScale) group.scale.y = entity.yScale

      if (entity.rotation) {
        group.rotation.z = (entity.rotation * Math.PI) / 180
      }

      if (entity.position) {
        group.position.x = entity.position.x
        group.position.y = entity.position.y
        group.position.z = entity.position.z
      }

      for (var i = 0; i < block.entities.length; i++) {
        var childEntity = drawEntity(block.entities[i], data, group)
        if (childEntity) group.add(childEntity)
      }

      return group
    }

    function getColor(entity, data) {
      var color = 0x000000 //default
      if (entity.color) color = entity.color
      else if (data.tables && data.tables.layer && data.tables.layer.layers[entity.layer])
        color = data.tables.layer.layers[entity.layer].color

      if (color == null || color === 0xffffff) {
        color = 0x000000
      }
      return color
    }

    function createLineTypeShaders(data) {
      var ltype, type
      if (!data.tables || !data.tables.lineType) return
      var ltypes = data.tables.lineType.lineTypes

      for (type in ltypes) {
        ltype = ltypes[type]
        if (!ltype.pattern) continue
        ltype.material = createDashedLineShader(ltype.pattern)
      }
    }

    function createDashedLineShader(pattern) {
      var i,
        dashedLineShader = {},
        totalLength = 0.0

      for (i = 0; i < pattern.length; i++) {
        totalLength += Math.abs(pattern[i])
      }

      dashedLineShader.uniforms = THREE.UniformsUtils.merge([
        THREE.UniformsLib['common'],
        THREE.UniformsLib['fog'],

        {
          pattern: { type: 'fv1', value: pattern },
          patternLength: { type: 'f', value: totalLength },
        },
      ])

      dashedLineShader.vertexShader = [
        'attribute float lineDistance;',

        'varying float vLineDistance;',

        THREE.ShaderChunk['color_pars_vertex'],

        'void main() {',

        THREE.ShaderChunk['color_vertex'],

        'vLineDistance = lineDistance;',

        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

        '}',
      ].join('\n')

      dashedLineShader.fragmentShader = [
        'uniform vec3 diffuse;',
        'uniform float opacity;',

        'uniform float pattern[' + pattern.length + '];',
        'uniform float patternLength;',

        'varying float vLineDistance;',

        THREE.ShaderChunk['color_pars_fragment'],
        THREE.ShaderChunk['fog_pars_fragment'],

        'void main() {',

        'float pos = mod(vLineDistance, patternLength);',

        'for ( int i = 0; i < ' + pattern.length + '; i++ ) {',
        'pos = pos - abs(pattern[i]);',
        'if( pos < 0.0 ) {',
        'if( pattern[i] > 0.0 ) {',
        'gl_FragColor = vec4(1.0, 0.0, 0.0, opacity );',
        'break;',
        '}',
        'discard;',
        '}',

        '}',

        THREE.ShaderChunk['color_fragment'],
        THREE.ShaderChunk['fog_fragment'],

        '}',
      ].join('\n')

      return dashedLineShader
    }

    // function findExtents(scene) {
    //     for (var child of scene.children) {
    //         var minX, maxX, minY, maxY;
    //         if (child.position) {
    //             minX = Math.min(child.position.x, minX);
    //             minY = Math.min(child.position.y, minY);
    //             maxX = Math.max(child.position.x, maxX);
    //             maxY = Math.max(child.position.y, maxY);
    //         }
    //     }

    //     return { min: { x: minX, y: minY }, max: { x: maxX, y: maxY } };
    // }

    function draw3dFace(entity, data) {
      let entityColor = getColor(entity, data)
      let color =
        entityColor === 0x000000
          ? new THREE.Color()
          : new THREE.Color(`#${entityColor.toString(16)}`)
      const layer = entity.layer || 'default'
      if (Object.keys(data.faceVertices).indexOf(layer) === -1) {
        data.faceVertices[layer] = []
        data.faceColors[layer] = []
      }

      for (let i = 0; i < 3; i++) {
        data.faceVertices[layer].push(
          entity.vertices[i].x,
          entity.vertices[i].y,
          entity.vertices[i].z
        )
        data.faceColors[layer].push(color.r, color.g, color.b)
      }

      // If there is a fourth vertex and it is different from the third vertex, create a second triangular face.
      if (
        entity.vertices[3] &&
        (entity.vertices[3].x !== entity.vertices[2].x ||
          entity.vertices[3].y !== entity.vertices[2].y ||
          entity.vertices[3].z !== entity.vertices[2].z)
      ) {
        // need to arrange 4th point properly to make a traingle
        for (let index = 0; index < 4; index++) {
          if (index === 1) continue
          data.faceVertices[layer].push(
            entity.vertices[index].x,
            entity.vertices[index].y,
            entity.vertices[index].z
          )
          data.faceColors[layer].push(color.r, color.g, color.b)
        }
      }
      return null
    }

    // Load entities now!

    createLineTypeShaders(data)

    var entities = []
    var layers = {}
    data.faceVertices = {}
    data.faceColors = {}

    // Create scene from dxf object (data)
    var i, entity, obj

    for (i = 0; i < data.entities.length; i++) {
      entity = data.entities[i]
      obj = drawEntity(entity, data)

      if (obj) {
        entities.push(obj)
        if (enableLayer && entity.layer) {
          let layerGroup = layers[entity.layer]
          if (!layerGroup) {
            layerGroup = new THREE.Group()
            layerGroup.name = entity.layer
            layers[entity.layer] = layerGroup
          }
          layerGroup.add(obj)
        }
      }
      obj = null
    }

    // Handle 3dfaces
    const keys = Object.keys(data.faceVertices)
    for (const layer of keys) {
      const layerFaceVertices = data.faceVertices[layer]
      const layerFaceColors = data.faceColors[layer]
      const faceGeometry = new THREE.BufferGeometry()
      faceGeometry.setAttribute('position', new THREE.Float32BufferAttribute(layerFaceVertices, 3))
      faceGeometry.setAttribute('color', new THREE.Float32BufferAttribute(layerFaceColors, 3))
      faceGeometry.computeVertexNormals()
      const faceMaterial = new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide,
        vertexColors: true,
        transparent: false,
      })
      // faceMaterial.emissive.setHex(0x2E92D4) // default is black color
      const faceObject = new THREE.Mesh(faceGeometry, faceMaterial)
      entities.push(faceObject)
      if (enableLayer) {
        let layerGroup = layers[layer]
        if (!layerGroup) {
          layerGroup = new THREE.Group()
          layerGroup.name = layer
          layerGroup.add(faceObject)
          layers[layer] = layerGroup
        } else {
          layers[layer].add(faceObject)
        }
      }
    }

    delete data.faceVertices
    delete data.faceColors

    return {
      entities: enableLayer ? Object.values(layers) : entities,
      dxf: data,
    }
  }
}

export { DXFLoader }
