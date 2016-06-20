// Set up scene, camera, and renderer
let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer()

// Renderer fills entire window
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('scene').appendChild(renderer.domElement)

// Make a cube
let geometry = new THREE.BoxGeometry(3, 3, 3)
let material = new THREE.MeshLambertMaterial({ color: 0xffffff })
let cube = new THREE.Mesh(geometry, material)

// Add the cube
scene.add(cube)

// Add ambient light
let ambientLight = new THREE.AmbientLight(0x404040)
scene.add(ambientLight)

// Add a pointlight
let pointLight = new THREE.PointLight(0xffffff, 1, 1000)
pointLight.position.set(50, 50, 50)
scene.add( pointLight )

// Set camera's position
camera.position.z = 5

// Define the actual render function
function render() {
	requestAnimationFrame(render)
	renderer.render(scene, camera)
	cube.rotation.x += 0.0025
	cube.rotation.y += 0.0025
}

// Attach an event listener to toggle vis of cube
let btn = document.getElementById('toggle-cube')
btn.addEventListener('click', () => {
	cube.visible = !cube.visible
})

// Call the render function
render()
