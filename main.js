/*jslint browser: true*/
'use strict';

var breakTimeCon = document.querySelector('#break-time');
var addBreakBtn = document.querySelector('#add-break');
var subBreakBtn = document.querySelector('#sub-break');
var workTimeCon = document.querySelector('#work-time');
var addWorkBtn = document.querySelector('#add-work');
var subWorkBtn = document.querySelector('#sub-work');
var time = document.querySelector('.time');
var startTimerBtn = document.querySelector('.pomodoro');

var breakTime = 5, workTime = 25;
var startTimeNow = false;

startTimerBtn.addEventListener('click', function() {
  startTimeNow = true;
  console.log(startTimeNow);
  startCountDown();
});

addBreakBtn.addEventListener('click', function() {
  breakTime += 1;
  UpdateTime();
  startTimeNow = false;
});

subBreakBtn.addEventListener('click', function() {
  
  if (breakTime <= 0) {
    breakTime = 0;
  } else {
    breakTime -= 1;
  }

  UpdateTime();
  startTimeNow = false;
});

addWorkBtn.addEventListener('click', function() {
  workTime += 1;
  UpdateTime();
  startTimeNow = false;
});

subWorkBtn.addEventListener('click', function() {
  
  if (workTime <= 0) {
    workTime = 0;
  } else {
    workTime -= 1;
  }

  UpdateTime();
  startTimeNow = false;
});

function UpdateTime() {
  
  breakTimeCon.innerHTML = breakTime;
  workTimeCon.innerHTML = workTime;
  
  time.innerHTML = workTime + ':00';
}

function startCountDown() {
  
  var seconds = 60, minutes;
  minutes = workTime - 1;
  
  if (startTimeNow === true && workTime >= 0) {
    setInterval(function(){ 
      if (seconds === 0) {
        seconds = 60;
      }
      
      seconds -= 1;
      time.innerHTML = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
      console.log(workTime);
    }, 1000);
    
    setInterval(function(){ 
      if (minutes === 0) {
        minutes = 60;
      }
      minutes -= 1;
      time.innerHTML = minutes + ':' + seconds;
      console.log(workTime);
    }, 60000);
  } else { 
    UpdateTime();
    seconds = 60;
    minutes = workTime;
  }
}


UpdateTime();
