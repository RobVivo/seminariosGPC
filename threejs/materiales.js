/*
	Seminario THREEjs #6. Luces y materiales en THREEjs
	Ejemplo de uso de iluminacion y materiales.
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
	renderer.shadowMapEnabled = true;		// Habilita el buffer se sombras

	// Instanciar el grafo de escena
	scene = new THREE.Scene();

	// Configurar la camara
	var aspectRatio = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera( 75, aspectRatio, 0.1, 100 );
	camera.position.set( 0, 5, 10 );
	camera.lookAt( new THREE.Vector3( 0,0,0 ) );
	//camera.rotation.z = -Math.PI/4;

	// Instanciar un controlador de camara
	cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
	cameraControls.target.set( 0, 0, 0 );

	// Luces

	// luz ambiente: color
	var luzAmbiente = new THREE.AmbientLight( 0x222222 );
	scene.add( luzAmbiente );

	// luz direccional: color, intensidad, direccion (L)
	var luzDireccional = new THREE.DirectionalLight( "white", 0.5 );
	luzDireccional.position.set( 5,5,4 );
	scene.add( luzDireccional );

	// luz puntual: color, intensidad, posicion
	var luzPuntual = new THREE.PointLight( "white", 0.6 );
	luzPuntual.position.set( -5,5,4 );
	scene.add( luzPuntual );

	// luz focal: color, intensidad, posicion, semiangulo, direccion de iluminacion
	var luzFocal = new THREE.SpotLight( "white", 0.5 );
	luzFocal.position.set( 4,6,0 );
	luzFocal.target.position.set( 0,0,0 );
	luzFocal.angle = Math.PI/5;
	scene.add( luzFocal );

	// Sombras
	luzFocal.shadowCameraNear = 1;
	luzFocal.shadowCameraFar = 20;
	luzFocal.shadowCameraFov = 70;
	luzFocal.shadowCameraVisible = true;
	luzFocal.castShadow = true;

	// Atencion a eventos
	window.addEventListener( 'resize', updateAspectRatio );

}

function loadScene () {
	// Carga las mallas a visualizar

	var path = "images/";

	// Texturas
	var texturaSuelo = new THREE.ImageUtils.loadTexture( path + "r_256.jpg" );
	texturaSuelo.wrapS = texturaSuelo.wrapT = THREE.MirroredRepeatWrapping;
	texturaSuelo.repeat.set( 2,2 );
	texturaSuelo.magFilter = THREE.LinearFilter;
	texturaSuelo.minFilter = THREE.LinearFilter;

	var texturaCubo = new THREE.ImageUtils.loadTexture( path + "wood512.jpg");
	texturaCubo.wrapS = texturaCubo.wrapT = THREE.RepeatWrapping;
	texturaCubo.repeat.set( 1,1 );
	texturaCubo.magFilter = THREE.LinearFilter;
	texturaCubo.minFilter = THREE.LinearFilter;

	var texturaEsfera = new THREE.ImageUtils.loadTexture( path + "earth.jpg");
	texturaEsfera.wrapS = texturaEsfera.wrapT = THREE.RepeatWrapping;
	texturaEsfera.repeat.set( 1,1 );
	texturaEsfera.magFilter = THREE.LinearFilter;
	texturaEsfera.minFilter = THREE.LinearFilter;

	// Textura de entorno
	var urls = [ path + "posx.jpg", path + "negx.jpg", path + "posy.jpg",
	             path + "negy.jpg", path + "posz.jpg", path + "negz.jpg" ];
	var mapaEntorno = THREE.ImageUtils.loadTextureCube( urls );
	mapaEntorno.format = THREE.RGBFormat;

	// Material para la habitacion
	var paredes = [];
	for( var i = 0; i < urls.length; i++ ){
		var tex = THREE.ImageUtils.loadTexture( urls[i] );
		paredes.push( new THREE.MeshBasicMaterial( {color: "white", side: THREE.BackSide, map: tex} ) );
	}

	var habitacion = new THREE.Mesh( new THREE.BoxGeometry( 30,30,30 ), 
									 new THREE.MeshFaceMaterial( paredes ));
	scene.add( habitacion );


	// Materiales
	var basico = new THREE.MeshBasicMaterial( {  color: "red" } );
	var alambrico = new THREE.MeshBasicMaterial( { color: "red", wireframe: true} );
	var facetado = new THREE.MeshLambertMaterial( {color: "red", shading: THREE.FlatShading,
													map: texturaCubo});
	var mate = new THREE.MeshLambertMaterial( {ambient:"blue", color: "blue",
											   shading: THREE.SmoothShading,
											   map: texturaSuelo});
	var brillante = new THREE.MeshPhongMaterial( {color:"white", specular: "gray", shininess: 40,
												  envMap: mapaEntorno});

	// Cubo, esfera, suelo
	var geometriaCubo = new THREE.CubeGeometry( 2, 2, 2 );
	var geometriaEsfera = new THREE.SphereGeometry( 1, 50, 50 );
	var esferaCubo = new THREE.Object3D();

	var cubo = new THREE.Mesh( geometriaCubo, facetado );
	var esfera = new THREE.Mesh( geometriaEsfera, brillante );
	var suelo = new THREE.Mesh( new THREE.PlaneGeometry( 6,6,10,10 ), mate );

	cubo.position.set( -1,0,0 );
	esfera.position.set( 1,0,0 );
	suelo.rotation.x = -Math.PI/2;
	suelo.position.y = -1.1;

	// Sombras arrojadas
	cubo.castShadow = true;
	cubo.receiveShadow = true;
	esfera.castShadow = true;
	esfera.receiveShadow = true;
	suelo.receiveShadow = true;

	esferaCubo.add( cubo );
	esferaCubo.add( esfera );
	scene.add( esferaCubo );
	scene.add( suelo );

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