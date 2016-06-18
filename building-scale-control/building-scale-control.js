let width = window.innerWidth
let height = window.innerHeight
let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

let renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
})

// Set renderer size and append it
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

// Add a light
let light = new THREE.DirectionalLight(0xeeeeee, 1)
light.position.set(800, 1200, 500)
scene.add(light)

// Set camera position
camera.position.set(800, 1200, 500)
camera.lookAt(scene.position)

// Add controls
let controls = new THREE.OrbitControls(camera, renderer.domElement)
let once = false

// Define object to later assign to model
let _collada = null

// Define GUI controls
let guiControls = new function() {
  this.height = 0.1
  this.size = 0.1
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
loader.load('building.dae', function(collada) {
  _collada = collada
  collada.scene.scale.set(.1, .1, .1)
  collada.scene.position.y = -205
  scene.add(collada.scene)
  return render(collada)
})
