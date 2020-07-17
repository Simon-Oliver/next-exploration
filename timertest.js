var countDownDate = new Date();

const setMinutes = 80;

countDownDate.setMinutes(countDownDate.getMinutes() + setMinutes);
countDownDate.getTime();
//var now = new Date().getTime();

// Find the distance between now and the count down date
//var distance = countDownDate - now;

// Time calculations for days, hours, minutes and seconds
// var days = Math.floor(distance / (1000 * 60 * 60 * 24));
// var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
// var seconds = Math.floor((distance % (1000 * 60)) / 1000);

function leadingZero(time) {
  return time < 10 ? `0${time}` : time;
}

setInterval(() => {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  beepAudio.play();
  console.log(leadingZero(hours), leadingZero(minutes), leadingZero(seconds));
}, 1000);
