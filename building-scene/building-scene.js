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

// Make some grass
let textureLoader = new THREE.TextureLoader()
textureLoader.load('grass.jpg', function(texture) {

  // Set texture to tile
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(100, 100)

  let grassMaterial = new THREE.MeshLambertMaterial({ map: texture })
  let plane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), grassMaterial)
  plane.material.side = THREE.DoubleSide
  plane.position.x = 0
  plane.rotation.x = Math.PI / 2
  plane.position.y = 143
  scene.add(plane)
})

// Add a light
let light = new THREE.DirectionalLight(0xeeeeee, 1)
light.position.set(10, -20, 15)
scene.add(light)

// Set camera position
camera.position.set(300, 300, 300)
camera.lookAt(scene.position)

// Add controls
let controls = new THREE.OrbitControls(camera, renderer.domElement)

// Define the actual render function
function render(collada) {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}


// Model from clara.io/view/6aba987e-344d-47f0-9182-db3898efa6e2#
let loader = new THREE.ColladaLoader()
loader.load('city.dae', function(collada) {
    collada.scene.scale.set(1, 1.5, 1)
    collada.scene.position.y = -78
    scene.add(collada.scene)
    return render(collada)
})
