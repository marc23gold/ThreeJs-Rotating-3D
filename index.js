import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// Set the size of the window
const w = window.innerWidth;
const h = window.innerHeight;

// Create renderer 
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Set renderer width and height
renderer.setSize(w, h);
// Append to the DOM the canvas element  
document.body.appendChild(renderer.domElement);

// Set up the camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// Create a scene
const scene = new THREE.Scene();

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

//add light to the scene
const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820);
scene.add(hemiLight);

const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const wireMesh = new THREE.Mesh(geo, wireMat);
scene.add(wireMesh);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);


function animate(t=0) {
    requestAnimationFrame(animate);
    //mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
    controls.update();
}

animate();