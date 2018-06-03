var scene;
var camera;
var renderer;

function init() {

    //1. detect webgl
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
    }

    //2. setup scene, camera, and renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //3. Add light to the scene
    var light = new THREE.AmbientLight(0xede155);       //ambient light
    scene.add(light);
    light = new THREE.DirectionalLight(0xffffff, 0.5);  //directional light
    light.position.set(0, 1, 0);
    scene.add(light);

    //4. Add object to the scene  objects are geometry (shape) + material (texture) + mesh (glue them together)
    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.MeshLambertMaterial({color: 0x0026ff});

    //add 20 cubes to tween from top
    for (var i = 0; i < 20; i++) {

        let cube = new THREE.Mesh(geometry, material);
        cube.position.x = 200 * Math.random() - 100;
        cube.position.y = 100;
        cube.position.z = 200 * Math.random() - 100;
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;

        new TWEEN.Tween(cube.position).to({
            y: 30 * Math.random() + 20
        }, 1000 + Math.random() * 3000).easing(TWEEN.Easing.Quadratic.Out).start();

        scene.add(cube);
    }

    //add 20 cubes to tween from the bottom
    for (var i = 0; i < 20; i++) {

        let cube = new THREE.Mesh(geometry, material);
        cube.position.x = 200 * Math.random() - 100;
        cube.position.y = -100;
        cube.position.z = 200 * Math.random() - 100;
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;

        new TWEEN.Tween(cube.position).to({
            y: 30 * Math.random()
        }, 1000 + Math.random() * 3000).easing(TWEEN.Easing.Quadratic.Out).start();

        scene.add(cube);
    }

    camera.position.set(0, 20, 0);
    render();
}


function render() {

    requestAnimationFrame(render);
    camera.rotation.y -= 0.005;
    TWEEN.update();
    renderer.render(scene, camera);
}

init();
