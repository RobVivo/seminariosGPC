/*
	Seminario GPC WebGL/Threejs #3.
	Forma Basica en Three.js
*/

// Variables globales consensuadas
var renderer, scene, camera;

// Secuencia de operaciones
init();
loadScene();
render();

function init () {
	// Configurar el canvas y el motor de render
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( new THREE.Color( 0x0000AA ) );
	document.getElementById( "container" ).appendChild( renderer.domElement );

	// Instanciar el grafo de escena
	scene = new THREE.Scene();

	// Instanciar la camara
	var aspectRatio = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera( 75 /*grados*/, aspectRatio, 0.1, 100 );
	camera.position.set( 0, 0, 3 );

	// Registrar eventos a atender
	window.addEventListener( "resize", updateAspectRatio );

}

function loadScene () {
	// Para definir una forma hay que determinar la geometria y el material
	var geometria = new THREE.CylinderGeometry( 1, 1, 2, 6 );
	//var geometria = new THREE.TorusKnotGeometry( 1, 0.4 );
	var material = new THREE.MeshBasicMaterial( {color : "yellow",
												 wireframe : true});
	var forma = new THREE.Mesh( geometria, material );

	forma.position.set( 1, 0, 0 );
	forma.scale.set( 0.5, 0.5, 0.5 );
	forma.rotation.set( 0, 0, Math.PI/4 /*radianes*/ );

	// Ejes
	var ejes = new THREE.AxisHelper();

	// Añadimos la forma a la escena
	scene.add( forma );
	scene.add( ejes );
}

function updateAspectRatio(){
	// Atender al evento de resize
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}

function update(){

}

function render(){
	requestAnimationFrame( render );
	update();
	renderer.render( scene, camera );
}