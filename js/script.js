var button = document.querySelector(".order-question-button");
var popup = document.querySelector(".form-container");
var form = popup.querySelector("form");
var appointment = form.querySelector("[name=appointment-date]");
var departure = form.querySelector("[name=departure-date]");
var adults = form.querySelector("[name=adults]");
var child = form.querySelector("[name=child]");
var isStorageSupport = true;
var adultsStorage = "";
var childStorage = "";

popup.classList.remove("form-show");

try {
  adultsStorage = localStorage.getItem("adults");
} catch (err) {
  isStorageSupport = false;
}

try {
  childStorage = localStorage.getItem("child");
} catch (err) {
  isStorageSupport = false;
}

appointment.addEventListener("keyup", function () {
  this.classList.remove("field-error");
});

departure.addEventListener("keyup", function () {
  this.classList.remove("field-error");
});

button.addEventListener("click", function (evt) {
  popup.classList.add("form-show");

  if (adultsStorage) {
    adults.value = adultsStorage;

  if (childStorage) {
      child.value = childStorage;
  }
  else{
    child.focus();
  }
  }
  else {
    adults.focus();
  }
});

form.addEventListener("submit", function (evt) {

  if (appointment.value && departure.value && isStorageSupport) {
    localStorage.setItem("adults", adults.value);
    localStorage.setItem("child", child.value);

    appointment.classList.remove("field-error");
    departure.classList.remove("field-error");
  }
  else {
    evt.preventDefault();

    if(appointment.value === "") {
      appointment.classList.add("field-error");
    }

    if(departure.value === "") {
      departure.classList.add("field-error");
    }

    popup.classList.remove("form-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("form-error");
    console.log("Нужно ввести даты заезда");
  }
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27 && popup.classList.contains("form-show")){
      popup.classList.remove("form-show");
      popup.classList.remove("form-error");
    }
});
