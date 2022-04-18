import './style.sass';
import 'virtual:fonts.css';

import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader';

const renderers = {};

const container = document.querySelector('#earth-wrap');
const canvas = document.getElementById('earth');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  container.clientWidth / container.clientHeight,
  0.1,
  2000
);

let loaded = false;

let mixer;

let animation;

let prevTime = Date.now();

let siteObj;

const slowDown = 0.001;

let speed = 0.005;

const init = async () => {
  const objloader = new GLTFLoader();

  const ambientlight = new THREE.AmbientLight(0x77b2db, 2);

  const sunLight = new THREE.PointLight(0xffffff, 7);
  sunLight.position.set(30, 30, 30);

  scene.add(sunLight);

  scene.add(ambientlight);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    logarithmicDepthBuffer: true,
    antialias: true,
    alpha: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);

  const renderpass = new RenderPass(scene, camera);
  const pixelpass = new ShaderPass(PixelShader);

  pixelpass.uniforms['resolution'].value = new THREE.Vector2(
    container.clientWidth,
    container.clientHeight
  );
  pixelpass.uniforms['pixelSize'].value = 10;

  const composer = new EffectComposer(renderer);

  composer.addPass(renderpass);
  composer.addPass(pixelpass);

  renderers.composer = composer;
  renderers.renderer = renderer;
  renderers.pixelpass = pixelpass;

  camera.position.x = 45;
  camera.position.y = 10;

  camera.lookAt(0, 0, 0);

  return new Promise((resolve) => {
    objloader.load(
      'media/Earth.glb',
      (site) => {
        siteObj = site.scene;
        scene.add(siteObj);
        siteObj.scale.multiplyScalar(0.05);
        siteObj.rotation.z = Math.PI / -7;
        mixer = new THREE.AnimationMixer(siteObj);
        animation = site.animations[0];
        setInterval(() => {
          requestAnimationFrame(() => {
            if (speed > 0) speed = Math.max(slowDown, speed - slowDown);
            if (speed < 0) speed = Math.min(slowDown, speed + slowDown);
            siteObj.rotateY(speed);
            renderers.composer.render();
          });
        }, 1000 / 30);
        render();
        resolve();
      },
      undefined,
      (err) => {
        console.error(err);
        return;
      }
    );
  });
};

let oldScroll = 0;

const render = () => {
  const frame = window.scrollY / window.innerHeight;
  // make render function, which takes a frame count as input, which will be a function of scroll amount.

  // speed += Math.log(1 + Math.abs(frame - oldScroll)) * 0.1;

  // let diff = (1 - frame) * 0.05;

  // siteObj.scale.y = diff;
  // siteObj.scale.x = diff;
  // siteObj.scale.z = diff;

  oldScroll = frame;
};

init().then(() => {
  loaded = true;
  render();
});

document.addEventListener('scroll', () => {
  if (!loaded) return;
  requestAnimationFrame(render);
});

window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderers.renderer.setSize(container.clientWidth, container.clientHeight);
  renderers.composer.setSize(container.clientWidth, container.clientHeight);

  renderers.pixelpass.uniforms['resolution'].value.set(
    container.clientWidth,
    container.clientHeight
  );
});

let clicked = false;
let timeClicked = 0;

window.addEventListener('mousedown', () => {
  clicked = true;
  speed = 0;
  speedSum = 0;
  timeClicked = Date.now();
});

window.addEventListener('mouseup', () => {
  clicked = false;
  timeClicked = Date.now() - timeClicked;
  speed = speedSum / (timeClicked / 50);
  if (Math.abs(speed) < slowDown) speed = slowDown;
});

const EARTH_SPEED_FACTOR = 1200;
const EARTH_MOVE_FACTOR = 1900;

let speedSum = 0;

canvas.addEventListener('mousemove', (e) => {
  let diff = e.movementX;
  if (clicked) {
    speedSum += diff / EARTH_SPEED_FACTOR;
    siteObj.rotateY(diff / EARTH_MOVE_FACTOR);
  }
});

canvas.addEventListener('mousedown', () => {
  canvas.style.cursor = 'grabbing';
});

canvas.addEventListener('mouseup', () => {
  canvas.style.cursor = 'grab';
});
