import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const webGLRendererParameters = {

    // Element | undefined, 要渲染的畫布 (預設:undefined)
    canvas: undefined,

    // WebGLRenderingContext | null, 現有的渲染環境 (預設:null)
    context: null,

    // 'highp' | 'mediump' | 'lowp', 著色精確度 (預設: 'highp')
    precision: 'highp',

    // 是否允許背景使用透明度 (預設:false)
    alpha: false,

    // 是否在渲染時假設顏色都預先乘以透明度，即使 alpha 沒啟用 (預設:true)
    premultipliedAlpha: true,

    // 是否開啟抗鋸齒渲染 (預設:false)
    antialias: false,

    // DrawingBuffer 是否創建一個至少有 8 位元的 StencilBuffer (預設:true)
    stencil: true,

    // 是否保留緩存直到被手動清除或覆蓋 (預設:false)
    preserveDrawingBuffer: false,
    
    // 'high-performance' | 'low-power' | 'default', 用來提示給用戶要使用什麼樣的配置才比較適合這個渲染環境 (預設:'default')
    powerPreference: 'high-performance',

    // 是否在低性能時讓渲染器創建失敗
    failIfMajorPerformanceCaveat: true,

    // DrawingBuffer 是否創建一個至少有 8 位元的 DepthBuffer (預設:true)
    depth: true,

    // 是否啟用對數深度緩存, 如果要在場景處理比例差距巨大的模型就得啟用它 (預設:false)
    logarithmicDepthBuffer: false,
    
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const renderer = new THREE.WebGLRenderer( webGLRendererParameters );
const orbitControls = new OrbitControls( camera, renderer.domElement );
const clock = new THREE.Clock();
let delta = 0;

function init_scene() {

}

function init_camera() {
    camera.fov = 75;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.near = 0.1;
    camera.far = 1000;
    camera.position.z = 5;  
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.updateProjectionMatrix();
}

function init_renderer() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.setClearColor(new THREE.Color('#000'));
}

function init_lights() {

    const ambientLight = new THREE.AmbientLight( new THREE.Color('#404040') );
    scene.add( ambientLight );

    const hemisphereLight = new THREE.HemisphereLight( new THREE.Color('#ffffbb'), new THREE.Color('#080820'), 1 );
    scene.add( hemisphereLight );

    const directionalLight = new THREE.DirectionalLight( new THREE.Color('#fff'), 0.5 );
    scene.add( directionalLight );

}

function init_cube() {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshStandardMaterial( { color: new THREE.Color('#00ff00') } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
}

function init_grid() {
    const gridHelper = new THREE.GridHelper(12, 64, 0x0ff0f0, 0x404040);
    scene.add(gridHelper);
}

function tick() {

	requestAnimationFrame( tick );
	renderer.render( scene, camera );
    delta = clock.getDelta();
    orbitControls.update();
    
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

init_scene();
init_camera();
init_renderer();
init_lights();
init_cube();
init_grid();
window.addEventListener('resize', onWindowResize);

tick();