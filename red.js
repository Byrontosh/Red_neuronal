

//Inicializar red neuronal
let network = new brain.NeuralNetwork();

// Se comienza con el proceso de entrenamiento 

// Para lo cual nos ayudamos con ejemplos para que sepa 
// cuando poner texto blanco o texto negro segun el fondo de entrada
// https://htmlcolorcodes.com/es/

network.train([
  // Si la entrada es color negro, debe dar un texto en color blanco
  { input: { rojo: 0, verde: 0, azul: 0 }, output: { color: 1 } },
  // Si la entrada es color blanco, debe dar un texto en color negro
  { input: { rojo: 1, verde: 1, azul: 1 }, output: { color: 0 } },
  //Fondo verde, texto negro
  { input: { rojo: 0, verde: 1, azul: 0 }, output: { color: 0 } },
  //Fondo azul, texto blanco
  { input: { rojo: 0, verde: 0.43, azul: 1 }, output: { color: 1 } },
  //Fondo rojo, texto blanco
  { input: { rojo: 1, verde: 0, azul: 0 }, output: { color: 1 } },
]);




function cambiarColor(color) {
  console.log(color.channels.r);
  
  var div = document.getElementById("color");
  
  div.style.background = color.toBackground();

  // Tomar el color actual elegido por el usuario
  // el cual servirá para usarlo como dato de entrada para que la red 
  // de la predicción del mejor color de texto a utilizar
  var entrada = {
    rojo: color.channels.r / 255,
    verde: color.channels.g / 255,
    azul: color.channels.b / 255,
  };

  // Obtener la prediccion de la red con los datos de entrada
  var resultado = network.run(entrada);
  console.log(resultado);

  // En base al resultado, evaluar lo siguiente:
  // si resultado > 0.5, se considera color de texto blanco
  // caso contrario se considera color de texto negro
  if (resultado.color > 0.5) 
  {
    div.style.color = "white";
  } else {
    div.style.color = "black";
  }
}
