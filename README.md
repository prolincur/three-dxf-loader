
# three-dxf-loader

**three-dxf-loader** is a cross platform DXF file loader for THREE.js. It takes URL of a DXF file as input and returns THREE.js mesh entities. It internally uses dxf-parser for parsing DXF file. This library works out of the box with cross platform react-native and react-three-fiber.

#### Install
```
yarn add three-dxf-loader three
```
or
```
npm i three-dxf-loader three
```

#### Usage
```javascript
import * as THREE from 'three';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { DXFLoader } from 'three-dxf-loader';

const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const loader = new DXFLoader();
  loader.setFont(font); // set fonts
  loader.setEnableLayer(true); // set EnableLayer
  loader.setDefaultColor(0x000000); // set DefaultColor : Default color will be applied when no color found for the entity
  loader.setConsumeUnits(true); // consume units coming from DXF and scale the model to 'meter'
  const scene = new THREE.Scene();
  onLoad = (data) => {
      if (data?.entity) {
        scene.add(data.entity)
      }
  }
  const onError = (error) => {
    console.log(error);
  }
  const onProgress = (xhr) => {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  }
  loader.load(url, onLoad, onProgress, onError);
});
```

### Usage in React app
```javascript
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { DXFLoader } from 'three-dxf-loader'

function Scene() {
  const data = useLoader(DXFLoader, url, (loader) => {
    // loader.setFont(font); // set fonts
    loader.setEnableLayer(true); // set EnableLayer
    loader.setConsumeUnits(true); // consume units coming from DXF and scale the model to 'meter'
    loader.setDefaultColor(0x000000); // set DefaultColor : Default color will be applied when no color found for the entity
  })
  return <primitive object={data?.entity} />
}

```


#### Run Web Viewer Sample
![Example of the viewer](https://raw.githubusercontent.com/prolincur/three-dxf-loader/master/sample/data/snapshot.png "What the sample looks like")

```
# First, compile three-dxf-loader
> yarn install
> yarn build

# then install the sample's dependencies
> cd sample
> yarn install

# go back to the root and run http-server to run the sample
> cd ..
> npm install -g http-server@0.9.0
> http-server .
# use `http-server -c-1 .` to prevent caching
```

After performing the steps above, you can see the example at [http://127.0.0.1:8080/sample/index.html](http://127.0.0.1:8080/sample/index.html). You can use the DXF file included in the sample. **NOTE: the latest version of http-server will go into a redirect loop if you exclude "/index.html" from the url.**


### Supported DXF Features
Supports:
* Header
* Most LW entities (lines, polylines, circles, polyfaces etc)
* Layers
* Some support for line types
* Simple Text
* Viewport
* Splines (Quadratic and Cubic)
* Ellipses
* 3DFace
 
Does not yet support:
* Attributes
* 3DSolids
* All types of Leaders
* MText
* other less common objects and entities.

### BREAKING CHANGES

- Upgrade from 3.* to 4.*

Replace following code

```
loader.load(url, (data) => {
  const { entities } = data
  // do something with entities
 }, onProgress, onError);
 ```

to

```
loader.load(url, (data) => {
  const { entity } = data
  // do something with entity or entity.children

 }, onProgress, onError);
 ```


## License

[The MIT License](http://opensource.org/licenses/MIT)

