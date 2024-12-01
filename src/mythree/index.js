import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;


const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);


const light2 = new THREE.AmbientLight(0xffffff, 1); // soft white light
light2.position.set(1, 1, 1).normalize();
scene.add( light2 );


// Load Shield Model
const loader = new GLTFLoader();
let shield;
loader.load(
    './marvel_thors_hammer_mjolnir/scene.gltf',
    (gltf) => {
        shield = gltf.scene;
        scene.add(shield);

        // gltf.scene.traverse(child => {
        //     if (child.material) {
        //       child.material = new THREE.MeshPhongMaterial({ color: 0x888888 + Math.random() * 0x888888 });
        //     }
        //   });
    },
    undefined,
    (error) => console.error(error)
);

// Handle Scroll Animation
let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY; // Get the scroll position
});

// Animate the Scene
function animate() {
    requestAnimationFrame(animate);

    if (shield) {
        const scrollFactor = scrollY / window.innerHeight;
        shield.rotation.x = scrollFactor * Math.PI * 2; // Rotate with scroll
        shield.position.z = -scrollFactor * 10; // Move forward
        shield.scale.set(1 + scrollFactor, 1 + scrollFactor, 1 + scrollFactor); // Scale up
    }

    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});