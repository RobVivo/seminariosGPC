 /*
  Fragment Shader generico
  Espera vColor desde el vertex shader
 
  rvivo@upv.es 2014
 */

//declarations
varying highp vec4 vColor;

void main(void) {
    gl_FragColor = vColor;
}