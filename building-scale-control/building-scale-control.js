let width = window.innerWidth
let height = window.innerHeight
let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(80, width / height, 1, 10000 )

let renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
})

var ambientLight = new THREE.AmbientLight( 0x000000 ); // soft white light
scene.add( ambientLight );

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
plane.material.side = THREE.DoubleSide
plane.position.x = 0
plane.rotation.x = Math.PI / 2
plane.position.y = -200
scene.add(plane)

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

// Define GUI controls
let guiControls = new function() {
  this.height = 0.05
  this.size = 0.05
}
let datGUI = new dat.GUI()
datGUI.add(guiControls, 'height', 0, .2)
datGUI.add(guiControls, 'size', 0, .5)

// Define the actual render function
function render() {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
  _collada.scene.scale.y = guiControls.height
  _collada.scene.scale.x = guiControls.size
  _collada.scene.scale.z = guiControls.size
}

// Model from clara.io/view/03d6cd28-87e6-4e90-84d8-311c2ced540e#
let loader = new THREE.ColladaLoader()
loader.setPreferredShading(THREE.SmoothShading)
loader.load('building.dae', function(collada) {

  collada.scene.scale.set(.05, .05, .05)
  collada.scene.position.y = -205
  scene.add(collada.scene)
  _collada = collada
  return render(collada)
})
