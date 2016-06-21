let width = window.innerWidth
let height = window.innerHeight
let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(80, width / height, 1, 10000 )

let renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  shadowMapEnabled: true,
  shadowMapSoft: true
})

var ambientLight = new THREE.AmbientLight( 0x000000 ); // soft white light
scene.add( ambientLight )

// Add a spotlight
var spotLight = new THREE.SpotLight( 0xffffff )
spotLight.position.set( 420, 200, 200 )
spotLight.castShadow = true
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
spotLight.shadow.camera.near = 500
spotLight.shadow.camera.far = 4000
spotLight.shadow.camera.fov = 30
scene.add(spotLight)

// Set renderer size and append it
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

// Add a light
let light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(800, 1200, 500)
scene.add(light)

// Add some grass
let grassMaterial = new THREE.MeshLambertMaterial({ color: 0x49E20E })
let plane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), grassMaterial)
plane.position.x = 0
plane.rotation.x = Math.PI / 2
plane.position.y = -200
plane.rotation.y = Math.PI
plane.receiveShadow = true
scene.add(plane)
console.log(plane)


// Make some sky
let skyMaterial = new THREE.MeshBasicMaterial({ color: 0x87CEFA, side: THREE.BackSide})
let skyGeometry = new THREE.BoxGeometry(2000,2000,2000)
let sky = new THREE.Mesh(skyGeometry, skyMaterial)
scene.add(sky)

// Set camera position
camera.position.set(420, 200, 200)
camera.lookAt(scene.position)

// Add controls
let controls = new THREE.OrbitControls(camera, renderer.domElement)
let once = false

// Define object to later assign to model
let _collada = null

let firstTime = true

// Define the actual render function
function render() {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
  if (firstTime) {
    console.log(_collada)
    firstTime = false
  }
}

// Model from clara.io/view/03d6cd28-87e6-4e90-84d8-311c2ced540e#
let loader = new THREE.ColladaLoader()
loader.setPreferredShading(THREE.SmoothShading)
loader.load('building.dae', function(collada) {

  for (let i=0; i<collada.scene.children.length; i++) {
    collada.scene.children[i].castShadow = true
    collada.scene.children[i].receiveShadow = true
    console.log('child')
  }

  collada.dae.scene.scene.castShadow = true

  collada.scene.scale.set(.05, .05, .05)
  collada.scene.position.y = -205
  collada.scene.castShadow = true
  collada.scene.visible = true
  scene.add(collada.scene)
  _collada = collada
  return render(collada)
})
