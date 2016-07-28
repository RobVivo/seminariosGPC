// script para el desarrollo de la funcionalidad de la aplicación 
// seminario de ThreeJs

// variables globale 

var  renderer, scene, camera;

// secuencia de operacioens

init();
loadScene();
render();

function init(){

	// configurar el canvas y el motore de render
	
	renderer = new THREE.WebGLRenderer();
	renderer .setSize(window.innerWidth,window.innerHeight);
	renderer.setClearColor(new THREE.Color(0x0000AA));
	document.getElementById('container').appendChild(renderer.domElement);


	// instanciar el grafo de  escena 
	
	scene = new THREE.Scene();


	// sinstancial la camara
	var aspectRatio = window.innerWidth /window.innerHeight;
	camera = new THREE.PerspectiveCamera(75 /*grados*/, aspectRatio, 0.1, 100);
	camera.position.set(0, 0, 3);

	//registrar evento al atender 
	
	window.addEventListener("resize", updateApectRatio);
}

function loadScene(){
	// para definir la geometria y el material
	
	var geometria = new THREE.CylinderGeometry(1, 1, 2, 6);
	var material = THREE.MeshBasicMaterial({color: "red", wireframe: true});
	var forma = new THREE.Mesh(geometria, material);


	//posicion 
	forma.position.set(1, 0, 0);
	forma.scale.set(0.5, 0.5, 0.5);
	forma.rotation.set(1, 0, Math.PI/4);
	

	//ejes
	 var ejes = new THREE.AxisHelper();



	scene.add(forma);
	scene.add(ejes);

}

function updateApectRatio(){
	// atender al evento resize
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.apect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

}



function update(){

}

function render(){
	requestAnimationFrame(render);
	update();
	renderer.render(scene, camera );

}