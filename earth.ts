import './style.sass';

import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader';

import interact from 'interactjs';

const renderers: { composer?: any; renderer?: any; pixelpass?: any } = {};

const container = document.querySelector('#earth-wrap');
const canvas = document.getElementById('earth') as HTMLCanvasElement;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  2000
);

let loaded = false;

let mixer;

let animation;

let prevTime = Date.now();

let siteObj;

const slowDown = 0.0003;
const baseSpeed = 0.001;

let speed = 0.1;

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

  const renderpass = new RenderPass(scene, camera);
  const pixelpass = new ShaderPass(PixelShader);

  pixelpass.uniforms['resolution'].value = new THREE.Vector2(
    canvas.clientWidth,
    canvas.clientHeight
  );
  pixelpass.uniforms['pixelSize'].value = 8;

  const composer = new EffectComposer(renderer);

  composer.addPass(renderpass);
  composer.addPass(pixelpass);

  renderers.composer = composer;
  renderers.renderer = renderer;
  renderers.pixelpass = pixelpass;

  camera.position.x = 45;
  camera.position.y = 10;

  camera.lookAt(0, 0, 0);

  return new Promise<void>((resolve) => {
    objloader.load(
      '/media/earth-clouds.glb',
      (site) => {
        siteObj = site.scene;
        scene.add(siteObj);
        siteObj.scale.multiplyScalar(0.045);
        siteObj.rotation.z = Math.PI / -7;
        mixer = new THREE.AnimationMixer(siteObj);
        animation = site.animations[0];
        setInterval(() => {
          requestAnimationFrame(() => {
            if (speed > baseSpeed)
              speed = Math.max(baseSpeed, speed - slowDown);
            if (speed < baseSpeed)
              speed = Math.min(baseSpeed, speed + slowDown);
            siteObj.rotateY(speed);
            renderers.composer.render();
          });
        }, 1000 / 30);
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

init().then(() => {});

window.addEventListener(
  'resize',
  () => {
    requestAnimationFrame(() => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();

      // renderers.renderer.setSize(container.clientWidth, container.clientHeight);
      // renderers.composer.setSize(container.clientWidth, container.clientHeight);

      renderers.pixelpass.uniforms['resolution'].value.set(
        canvas.clientWidth,
        canvas.clientHeight
      );
    });
  },
  false
);

let clicked = false;
let timeClicked = 0;

const EARTH_SPEED_FACTOR = 1200;
const EARTH_MOVE_FACTOR = 1900;

let speedSum = 0;

interact(canvas).draggable({
  listeners: {
    start() {
      clicked = true;
      speed = 0;
      speedSum = 0;
      timeClicked = Date.now();
    },
    move(event) {
      let diff = event.dx;
      if (!diff) return;
      if (clicked) {
        speedSum += diff / EARTH_SPEED_FACTOR;
        siteObj.rotateY(diff / EARTH_MOVE_FACTOR);
      }
    },
    end() {
      canvas.style.cursor = 'grab';
      if (clicked) {
        clicked = false;
        timeClicked = Date.now() - timeClicked;
        speed = speedSum / (timeClicked / 50);
        if (Math.abs(speed) < slowDown) speed = slowDown;
      }
    },
  },
});

// this prevents clicks on mobile
// canvas.addEventListener('touchend', (event) => {
//   if (event.cancellable) {
//     event.preventDefault();
//   }
// });
