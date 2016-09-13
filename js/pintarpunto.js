/*
	Seminario WebGL #1 Introduccion al WebGL
	Ejemplo 03. Pinta un punto con WebGL
*/

// SHADER DE VERTICES
var VSHADER_SOURCE =
	'void main(){                                     \n' +
	'    gl_Position = vec4( 0.0, 0.0, 0.0, 1.0 );    \n' +
	'    gl_PointSize = 10.0;                         \n' +
	'}                                                \n' ;

var FSHADER_SOURCE =
	'void main(){                                     \n' +
	'    gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );   \n' +
	'}                                                \n' ;


function main()
{
	// Recupera el lienzo
	var canvas = document.getElementById( "canvas" );

	// Recupera el pincel de WebGL
	var gl = getWebGLContext( canvas );
	if( !gl ){
		console.log("Error: Fallo recuperacion del contexto WebGL");
		return;
	}

	// Cargar, compilar y montar los shaders
	if( !initShaders( gl, VSHADER_SOURCE, FSHADER_SOURCE ) ){
		console.log( "Error al compilar los shaders" );
		return;
	}

	// Fija el color de fondo a azul
	gl.clearColor( 0.0, 0.0, 0.3, 1.0 );
	// Borramos el canvas
	gl.clear( gl.COLOR_BUFFER_BIT );

	// Dibujar un punto
	gl.drawArrays( gl.POINTS, 0, 1 );
}