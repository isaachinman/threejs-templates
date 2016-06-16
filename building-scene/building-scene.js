let D, aspect, camera, light, loader, renderer, scene

let width = window.innerWidth
let height = window.innerHeight

aspect = width / height

D = 8

scene = new THREE.Scene()

camera = new THREE.OrthographicCamera(-D * aspect, D * aspect, D, -D, 1, 1000)

renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
})

renderer.setSize(width, height)

document.body.appendChild(renderer.domElement)

// Create a grass texture
let texture = THREE.ImageUtils.loadTexture('grass.jpg')
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(100, 100)

// Make some grass
let grassMaterial = new THREE.MeshLambertMaterial({ map: texture })
let plane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), grassMaterial)
plane.position.x = 0
plane.rotation.z = Math.PI / 2
scene.add(plane)


// Add a light
light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(10, -20, 15)
scene.add(light)

// Set camera position
camera.position.set(0, -20, 5)

// Add controls
let controls = new THREE.OrbitControls(camera, renderer.domElement)

// Define the actual render function
function render(collada) {
    requestAnimationFrame(render)
    renderer.render(scene, camera)
}

loader = new THREE.ColladaLoader()

let lastTimestamp = 0

loader.load('CNR_master.dae', function(collada) {
    collada.scene.scale.set(0.001, 0.001, 0.001)
    scene.add(collada.scene)
    return render(collada)
})
