/*
	Seminario WebGL #1 Introduccion al WebGL
	Ejemplo 02. Rellena el canvas haciando uso del pincel de WebGL
*/

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

	// Fija el color de fondo a azul
	gl.clearColor( 0.0, 0.0, 0.3, 1.0 );
	// Borramos el canvas
	gl.clear( gl.COLOR_BUFFER_BIT );
}