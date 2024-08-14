import "./style.css";
import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "dat.gui";

const scene = new THREE.Scene();
scene.add(new THREE.GridHelper());

const camera = new THREE.OrthographicCamera(-4, 4, 4, -4, -5, 10);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0.5, 0);

function updateCameraAspect() {
  const aspect = window.innerWidth / window.innerHeight;

  const frustumHeight = camera.top - camera.bottom;
  const frustumWidth = frustumHeight * aspect;

  camera.left = -frustumWidth / 2;
  camera.right = frustumWidth / 2;

  camera.updateProjectionMatrix();
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  updateCameraAspect();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

updateCameraAspect();

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial({ wireframe: true });

const cube = new THREE.Mesh(geometry, material);
cube.position.y = 0.5;
scene.add(cube);

const stats = new Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();

const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, 'x', -10, 10)
cameraFolder.add(camera.position, 'y', -10, 10)
cameraFolder.add(camera.position, 'z', -10, 10)
cameraFolder.add(camera, "left", -10, 0).onChange(() => {
  camera.updateProjectionMatrix();
});
cameraFolder.add(camera, "right", 0, 10).onChange(() => {
  camera.updateProjectionMatrix();
});
cameraFolder.add(camera, "top", 0, 10).onChange(() => {
  camera.updateProjectionMatrix();
});
cameraFolder.add(camera, "bottom", -10, 0).onChange(() => {
  camera.updateProjectionMatrix();
});
cameraFolder.add(camera, "near", -5, 5).onChange(() => {
  camera.updateProjectionMatrix();
});
cameraFolder.add(camera, "far", 0, 10).onChange(() => {
  camera.updateProjectionMatrix();
});
cameraFolder.open();

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);

  stats.update();
}

animate();
