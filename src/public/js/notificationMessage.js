const alertSuccess = document.getElementById("alertSuccess");
const alertDanger = document.querySelector("#alertDanger");
const alertInfo = document.querySelector("#alertInfo");
const alertWarning = document.querySelector("#alertWarning");


function showMessageSuccess(title, message, time) {
  alertSuccess.querySelector("span").textContent = title;
  alertSuccess.querySelector(".toast-body").textContent = message;
  alertSuccess.querySelector("small").textContent = time;
  alertSuccess.classList.remove("hide");
  alertSuccess.classList.add("show");
}

function showMessageError(title, message, time) {
  alertDanger.querySelector("span").textContent = title;
  alertDanger.querySelector(".toast-body").textContent = message;
  alertDanger.querySelector("small").textContent = time;
  alertDanger.classList.remove("hide");
  alertDanger.classList.add("show");
}

function showMessageInfo(title, message, time) {
  alertInfo.querySelector("span").textContent = title;
  alertInfo.querySelector(".toast-body").textContent = message;
  alertInfo.querySelector("small").textContent = time;
  alertInfo.classList.remove("hide");
  alertInfo.classList.add("show");
}

function showMessageWarning(title, message, time) {
  alertWarning.querySelector("span").textContent = title;
  alertWarning.querySelector(".toast-body").textContent = message;
  alertWarning.querySelector("small").textContent = time;
  alertWarning.classList.remove("hide");
  alertWarning.classList.add("show");
}

function getParameterByUrl(name) { name = name.replace(/[\[]/,
"\\[").replace(/[\]]/, "\\]"); var regex = new RegExp("[\\?&]" + name +
"=([^&#]*)"), results = regex.exec(window.location.href); return results ===
null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")); }

if(getParameterByUrl("alertSuccess")){
  const title = getParameterByUrl("titleAlert");
  const time = getParameterByUrl("timeAlert");
  const description = getParameterByUrl("descriptionAlert");
  showMessageSuccess( title, description, time );

  //Despues del ? eliminar los parametros sin actualizar la pagina
  history.pushState({}, document.title, window.location.href.split("?")[0]);
}

if(getParameterByUrl("alertError")){
  const title = getParameterByUrl("titleAlert");
  const time = getParameterByUrl("timeAlert");
  const description = getParameterByUrl("descriptionAlert");
  showMessageError( title, description, time );

  history.pushState({}, document.title, window.location.href.split("?")[0]);
  
}
