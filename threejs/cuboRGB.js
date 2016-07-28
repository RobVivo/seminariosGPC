/*
	Ejemplo sobre THREE.js: Cubo RGB usando la clase Geometry
*/

// variables globales

var  renderer, scene, camera;
var  angulo = 0, cubo;
var  antes = Date.now();

// secuencia de operacioens

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
	camera.position.set( 1, 1.5, 2 );
	camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

	// Registrar eventos a atender
	window.addEventListener( "resize", updateAspectRatio );

}

function loadScene () {
	// Instancia de malla
	var malla = new THREE.Geometry();

	var semilado = 1.0 / 2.0;

	// Coordenadas de los vertices
	var coordenadas = [
			semilado, -semilado,  semilado, 
			semilado, -semilado, -semilado,
			semilado,  semilado, -semilado,
			semilado,  semilado,  semilado,
		   -semilado,  semilado,  semilado,
		   -semilado,  semilado, -semilado,
		   -semilado, -semilado, -semilado,
		   -semilado, -semilado,  semilado ];
	var colores = [
			0xFF0000,
			0xFF00FF,
			0xFFFFFF,
			0x00FF00,
			0x00FFFF,
			0x0000FF,
			0x000000 ];
	var indices = [ 0,3,7, 7,3,4, 0,1,2,
					0,2,3, 4,3,2, 4,2,5,
					6,7,4, 6,4,5, 1,5,2,
					1,6,5, 7,6,1, 7,1,0 ];

	// Formar la lista de vertices e insertar en la malla
	for (var i = 0; i < coordenadas.length ; i+=3) {
		var vertice = new THREE.Vector3( coordenadas[i], 
									     coordenadas[i+1],
									     coordenadas[i+2] );
		malla.vertices.push( vertice );
	};

	// Construir las caras e insertar en malla
	for( var i = 0; i<indices.length; i+=3 ){
		// Construir la cara
		var triangulo = new THREE.Face3( indices[i], indices[i+1], indices[i+2]);
		triangulo.vertexColors.push( new THREE.Color( colores[ indices[i] ] ) );
		triangulo.vertexColors.push( new THREE.Color( colores[ indices[i+1] ] ) );
		triangulo.vertexColors.push( new THREE.Color( colores[ indices[i+2] ] ) );
		malla.faces.push( triangulo );
	};

	// Configurar el material
	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

	// Construir el objeto
	cubo = new THREE.Mesh( malla, material );

	scene.add(cubo);
}

function updateAspectRatio(){
	// Atender al evento de resize
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}

function update(){
	var ahora = Date.now();
	angulo += Math.PI/20 * (ahora-antes)/1000;
	antes = ahora;
	cubo.rotation.y = angulo;
}

function render(){
	requestAnimationFrame( render );
	update();
	renderer.render( scene, camera );
}