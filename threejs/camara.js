/*
	Seminario THREEjs #5. La camara en THREEjs
	Ejemplo de configuracion y uso de la camara
	con interaccion y mantenimeinto de la relacion
	de aspecto del marco.
*/

var renderer, scene, camera;
var cameraControls;

init();
loadScene();
render();

function init () {
	// Configurar el motor de render
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( new THREE.Color( 0x00000A ) );
	document.getElementById('container').appendChild( renderer.domElement );

	// Instanciar el grafo de escena
	scene = new THREE.Scene();

	// Configurar la camara
	var aspectRatio = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera( 20, aspectRatio, 0.1, 100 );
	camera.position.set( 8, 4, 6 );
	camera.lookAt( new THREE.Vector3( 0,0,0 ) );
	//camera.rotation.z = -Math.PI/4;

	// Instanciar un controlador de camara
	cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
	cameraControls.target.set( 0, 0, 0 );

	// Atencion a eventos
	window.addEventListener( 'resize', updateAspectRatio );

}

function loadScene () {
	// Carga las mallas a visualizar
	// Cubo y esfera
	var geometriaCubo = new THREE.CubeGeometry( 2, 2, 2 );
	var geometriaEsfera = new THREE.SphereGeometry( 1 );
	var material = new THREE.MeshBasicMaterial( {color: "yellow",
												 wireframe: true });
	var cubo = new THREE.Mesh( geometriaCubo, material );
	var esfera = new THREE.Mesh( geometriaEsfera, material );

	scene.add( cubo );
	scene.add( esfera );

	var ejes = new THREE.AxisHelper(10);
	scene.add( ejes );
}

function updateAspectRatio () {
	// Reconfigurar la matriz de proyeccion y el tamanyo del lienzo
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}

function update(){
	// Actualiza la posicion de la camara segun la interaccion entre frames
	cameraControls.update();
}

function render () {
	// Funcion de dibujo por frame
	requestAnimationFrame( render );
	update();
	renderer.render( scene, camera );
}