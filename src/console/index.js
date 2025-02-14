// import * as THREE from 'three';
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from './build/RoomEnvironment.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';


const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 13; // decrese this to increase model size,,

const renderer = new THREE.WebGLRenderer({alpha: true});
const scene = new THREE.Scene();

const environment = new RoomEnvironment( renderer );
const pmremGenerator = new THREE.PMREMGenerator( renderer );
// scene.background = new THREE.Color( 0xbbbbbb ); // sets background of complete background
scene.environment = pmremGenerator.fromScene( environment ).texture;
environment.dispose();


let bee;
let mixer;
const loader = new GLTFLoader();
loader.load('./../models/shield.glb',
    function (gltf) {
        // adds light to the model otherise it will be all black
        gltf.scene.traverse(child => {
            if (child.material) {
                console.log('materia',child.material)
                //   child.material = new THREE.MeshPhongMaterial({ color: 0xffffff +  0.4 * 0xffffff });
                // child.material = new THREE.MeshPhongMaterial({ color: 0x888888 + Math.random() * 0x888888 });
            }
          });

        bee = gltf.scene;
        scene.add(bee);


        mixer = new THREE.AnimationMixer(bee);
        mixer.clipAction(gltf.animations[0]).play();
        modelMove();
    },
    function (xhr) {},
    function (error) {}
);


renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(100, 100, 500);
scene.add(topLight);

// const ambient = new THREE.AmbientLight(0xffffff, 0.1);
// scene.add(ambient);
// const light = new THREE.DirectionalLight(0xffffff, 5);
// light.position.set(0, 10, 0);
// light.castShadow = true;
// scene.add(light);



const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.02);
};
reRender3D();

let arrPositionModel = [
    {
        id: 'banner',
        position: {x: 0, y: -1, z: 0},
        rotation: {x: 0, y: 1.5, z: 0}
    },
    {
        id: "intro",
        position: { x: 1, y: -1, z: -5 },
        rotation: { x: 0.5, y: -0.5, z: 0 },
    },
    {
        id: "description",
        position: { x: -1, y: -1, z: -5 },
        rotation: { x: 0, y: 0.5, z: 0 },
    },
    {
        id: "contact",
        position: { x: 0.8, y: -1, z: 0 },
        rotation: { x: 0.3, y: -0.5, z: 0 },
    },
];
const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });
    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );
    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        gsap.to(bee.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });
        gsap.to(bee.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease: "power1.out"
        })
    }
}
window.addEventListener('scroll', () => {
    if (bee) {
        modelMove();
    }
})
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})