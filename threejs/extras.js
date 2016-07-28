/*
	Seminario GPC. Webgl #7. Extras en THRREjs
	Ayudantes, Antialiasing, GUI, Stats, texto, recorrido grafo y video
*/

// Globales
var renderer, scene, camera;

// Control de camara
var cameraControls;

// Objetos 
var esfera, cubo, esferaCubo, texto;

// Acciones
init();
loadScene();
setupGui();
render();

// Objeto de valores de la interfaz
var effectController;

function init()
{
	// Inicializar el motor
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( "black" );
	renderer.shadowMapEnabled = true;
	renderer.antialias = true;
	document.getElementById( "container" ).appendChild( renderer.domElement );

	// Grafo de escena
	scene = new THREE.Scene();

	// Camara
	var aspectRatio = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera( 75, aspectRatio, 0.1, 100 );
	camera.position.set( 0, 5, 10 );
	camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
	cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
	cameraControls.target.set( 0, 0, 0 );

	// Luces
	var luzFocal = new THREE.SpotLight( 0xFFFFFF, 1.0 );
	luzFocal.position.set( 4,6,3 );
	luzFocal.target.position.set( 0,0,0 );
	luzFocal.angle = Math.PI/5;
	luzFocal.shadowCameraNear = 1;
	luzFocal.shadowCameraFar = 20;
	luzFocal.shadowCameraFov = 70;
	luzFocal.castShadow = true;
	scene.add( luzFocal );

	var luzAmbiente =  new THREE.AmbientLight( 0x222222 );
	scene.add( luzAmbiente);

	// Callbacks
	window.addEventListener( 'resize', updateAspectRatio );
}

function loadScene()
{
	// Materiales
	var materialEsfera = new THREE.MeshPhongMaterial( { ambient: 0xFFFFFF,
													 	color: 0xFFFFFF,
													    specular: 0x222222,
														shininess: 50});
	var materialCubo = new THREE.MeshPhongMaterial( { ambient: 0xFF0000,
													 	color: 0xFF0000,
													    specular: 0x444444,
														shininess: 50});
	// Cubo
	var geometriaCubo = new THREE.CubeGeometry( 2, 2, 2 );
	cubo = new THREE.Mesh( geometriaCubo, materialCubo );
	cubo.position.set( -1, 0, 0 );

	// Esfera
	var geometriaEsfera = new THREE.SphereGeometry( 1, 50, 50 );
	esfera = new THREE.Mesh( geometriaEsfera, materialEsfera );
	esfera.position.set( 1, 0, 0 );

	esferaCubo = new THREE.Object3D();
	esferaCubo.add( esfera );
	esferaCubo.add( cubo );
	esferaCubo.position.set( 0, 1, 0 );

	// Texto
	var geometriaTexto = new THREE.TextGeometry( 'Aplicacion',
												{ size: 1,			// tamanyo
												  height: 0.1,		// profundidad
												  curveSegments: 3, // trazos curvos
												  font: "droid serif", // fuente
												  weight: "bold",      // negrita
												  style: "normal",     // no inclinada
												  bevelThickness: 0.05, // grosor del bisel
												  bevelSize: 0.04,      // altura del bisel
												  bevelEnabled: true    // hacer bisel
												   });
	texto = new THREE.Mesh( geometriaTexto, materialCubo );
	texto.position.set( -3, 0, 2 ); // punto de comienzo del texto
	scene.add( texto );

	// Apoyo
	Coordinates.drawGround( {size: 10} );
	Coordinates.drawGrid( { size: 6, scale: 1, orientation: "y"} );
	Coordinates.drawAllAxes( { axisLength: 5, axisRadius: 0.05, axisTess: 20 });

	scene.add( esferaCubo );

	// Recorrido del grafo
	scene.traverse( function ( objeto ){
						if( objeto instanceof THREE.Mesh ){
							objeto.castShadow = true;
							objeto.receiveShadow = true;
						}
					});
}
function setupGui()
{
	// Definicion de lo controles
	effectController = {
		mensaje: 'Interfaz',
		giroy: 0.0,
		separacion: [],
		sombras: true,
		colorEsfera: "rgb(255,255,255)"
	};

	// Creacion de la interfaz
	var gui = new dat.GUI();

	// Construir el menu
	var h = gui.addFolder( "Control EsferaCubo" );
	h.add( effectController, "mensaje" ).name( "Aplicacion" );
	h.add( effectController, "giroy", -180.0, 180.0, 0.025 ).name("Giro en Y");
	h.add( effectController, "separacion", { Ninguna: 0, Media: 2, Total: 5 }).name("Separacion");
	h.add( effectController, "sombras").name( "Sombras" );
	h.addColor( effectController, "colorEsfera" ).name( "Color esfera" );
}

function updateAspectRatio()
{
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}
function update()
{
	cameraControls.update();

	// Actualizamos segun valores de la interfaz
	cubo.position.set( -1-effectController.separacion/2, 0, 0 );
	esfera.position.set( 1+effectController.separacion/2, 0, 0 );
	cubo.castShadow = effectController.sombras;
	esfera.castShadow = effectController.sombras;
	esfera.material.setValues( {color: effectController.colorEsfera} );
	esferaCubo.rotation.y = effectController.giroy * Math.PI/180;
}
function render()
{
	requestAnimationFrame( render );
	update();
	renderer.render( scene, camera );
}