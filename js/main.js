const bancoRadio = document.querySelector("#banco");
const financieraRadio = document.querySelector("#financiera");
const opciones = document.querySelector("#opciones");
const montoDeuda = document.querySelector("#monto-deuda")
const montoTexto = document.querySelector("#monto-texto")
const cantidadDeuda = document.querySelector("#cantidad-deuda")
const botonInput = document.querySelector(".input-boton")

const nombre = document.getElementById("nombre");
const primerApellido = document.getElementById("apellido-paterno")
const segundoApellido = document.getElementById("apellido-materno")
const telefono = document.getElementById("telefono")
const email = document.getElementById("email")

const emailRegex = /[a-z0-9]@[a-z0-9].[a-z0-9]/
const telRegex = /[0-9]{9}/
const client = {
  banco: "",
  financiera: "",
  montoDeuda: "",
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  telefono: "",
  email: "",
}

const BANCOS = ["CaixaBank", "ING", "BBVA"]
const FINANCIERAS = ["Vivus", "Moneyman", "Wenance"]




bancoRadio.addEventListener("click", () => {

  if (botonInput.className === "input-boton") {
    boton.removeAttribute("disabled")
    botonInput.classList.toggle("desbloqueado");
  }

  if (bancoRadio.checked) {

    opciones.removeAttribute("disabled")
    for (let i = 0; i < opciones.length; i++) {
      opciones[i].value = BANCOS[i].toLowerCase();
      opciones[i].innerHTML = BANCOS[i];
    }
  }
})

financieraRadio.addEventListener("click", () => {

  if (botonInput.className === "input-boton") {
    boton.removeAttribute("disabled")
    botonInput.classList.toggle("desbloqueado");
  }

  if (financieraRadio.checked) {
    opciones.removeAttribute("disabled")
    for (let i = 0; i < opciones.length; i++) {
      opciones[i].value = FINANCIERAS[i].toLowerCase()
      opciones[i].innerHTML = FINANCIERAS[i];
    }
  }
})
montoTexto.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
  }
})
montoTexto.addEventListener("input", () => {
  
  let newValue;
  if (montoTexto.value.length <= 3) {
    newValue = montoTexto.value
  }
  if (montoTexto.value.length > 3) {

    newValue = montoTexto.value.slice(0, 1) + "." + montoTexto.value.slice(1);
  }
  if (montoTexto.value.length > 4) {

    newValue = montoTexto.value.slice(0, 2) + "." + montoTexto.value.slice(2);
  }
  if (montoTexto.value.length > 5) {

    newValue = montoTexto.value.slice(0, 3) + "." + montoTexto.value.slice(3);
  }
  if (montoTexto.value.length > 6) {

    newValue = montoTexto.value.slice(0,1) + "." + montoTexto.value.slice(1, 4) + "." + montoTexto.value.slice(4);
  }
  montoDeuda.setAttribute("max", montoTexto.value)
  montoDeuda.setAttribute("value", montoTexto.value)
  montoDeuda.value = montoTexto.value;
  cantidadDeuda.innerHTML = newValue + " EUR";

})

montoDeuda.addEventListener("input", () => {

  montoDeuda.setAttribute("max", 30000)
  let newValue;
  if (montoDeuda.value.length > 3) {

    newValue = montoDeuda.value.slice(0, 1) + "." + montoDeuda.value.slice(1);
  }
  if (montoDeuda.value.length > 4) {

    newValue = montoDeuda.value.slice(0, 2) + "." + montoDeuda.value.slice(2);
  }
  cantidadDeuda.innerHTML = newValue + " EUR";
  montoTexto.value = newValue;

})

// Gestión datos cliente

const primerFormulario = document.getElementById("primer-formulario")
const formulario = document.querySelector(".formularios");
const segundoFormulario = document.getElementById("segundo-formulario")
const boton = document.getElementById("button-primer-formulario");

boton.addEventListener("click", () => {
  formulario.classList.toggle("vuelta")
})

const recuperarDatos = () => {
  
  client.montoDeuda = montoDeuda.value;
  if (bancoRadio.checked) {
    client.banco = opciones.value
  }
  if (financieraRadio.checked) {
    client.financiera = opciones.value;
  }
}

const enviarDatos = () => {

  if (bancoRadio.checked) client.banco = opciones.value;
  if (financieraRadio.checked) client.financiera = opciones.value;

  client.montoDeuda = montoDeuda.value;    
  client.nombre = nombre.value;
  client.apellidoPaterno = primerApellido.value;
  client.apellidoMaterno = segundoApellido.value;
  client.telefono = telefono.value;
  client.email = email.value;
  
  if (nombre.value && primerApellido.value && segundoApellido.value && telefono.value && telRegex.test(telefono.value) && email.value && emailRegex.test(email.value)) {
    localStorage.setItem("cliente", JSON.stringify(client));
    console.log(localStorage.getItem("cliente"))
    alert("Registrado correctamente")
    
  } else {
    alert("Rellena correctamente todos los campos")
  }
}


if (!bancoRadio.checked || !financieraRadio.checked) {
  boton.setAttribute("disabled", "");
}
