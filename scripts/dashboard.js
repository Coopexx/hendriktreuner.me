const addZero = function (val) {
  if (val < 10) {
    val = "0" + val;
  }
  return val;
};

const setTime = function (hour, min, half) {
  min = addZero(min);
  hour = addZero(hour);
  document.querySelector(".clock__hour").textContent = hour;
  document.querySelector(".clock__minute").textContent = min;
  document.querySelector(".clock__half").textContent = half;
};

const calcTime = function () {
  half = "AM";
  let current = new Date();
  let hour = current.getHours();
  let min = current.getMinutes();

  if (hour === 24) {
    hour -= 12;
    half = "AM";
  } else if (hour >= 12) {
    hour -= 12;
    half = "PM";
    if (hour === 0) {
      hour = 12;
    }
  }
  setTime(hour, min, half);
};

window.addEventListener("load", function () {
  calcTime();
  setInterval(calcTime, 60000);
});
