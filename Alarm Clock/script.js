const currentTime = document.querySelector("h1"),
  content = document.querySelector(".content"),
  selectMenu = document.querySelectorAll("select"),
  setAlarmBtn = document.querySelector("button");

let alarmTime, isAlarmSet,
  ringtone = new Audio("./files/ringtone.mp3");

for (let i = 12; i > 0; i--) {
  let hour = i < 10 ? `0${i}` : i;
  let option = `<option value="${hour}">${hour}</option>`;
  selectMenu[0].insertAdjacentHTML("beforeend", option);
}

for (let i = 59; i >= 0; i--) {
  let minute = i < 10 ? `0${i}` : i;
  let option = `<option value="${minute}">${minute}</option>`;
  selectMenu[1].insertAdjacentHTML("beforeend", option);
}

['AM', 'PM'].forEach(period => {
  let option = `<option value="${period}">${period}</option>`;
  selectMenu[2].insertAdjacentHTML("beforeend", option);
});

setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  h = h === 0 ? 12 : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

  if (alarmTime === `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
});

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return isAlarmSet = false;
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
    return alert('Please enter a valid time to set Alarm!');
  };
  alarmTime = time;
  isAlarmSet = true;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Cancel Alarm";
};

setAlarmBtn.addEventListener("click", setAlarm);