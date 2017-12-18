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
var redFillColor = document.querySelector('.timer');

var session = {
  breakTime: 5,
  workTime: 25,
}

var counter;

startTimerBtn.addEventListener('click', function() {
  startSession();
});

addBreakBtn.addEventListener('click', function() {
  session.breakTime += 1;
  UpdateTime();
});

subBreakBtn.addEventListener('click', function() {
  
  if (session.breakTime <= 1) {
    session.breakTime = 1;
  } else {
    session.breakTime -= 1;
  }

  UpdateTime();
});

addWorkBtn.addEventListener('click', function() {
  session.workTime += 1;
  UpdateTime();
});

subWorkBtn.addEventListener('click', function() {
  if (session.workTime <= 1) {
    session.workTime = 1;
  } else {
    session.workTime -= 1;
  }

  UpdateTime();
});

function UpdateTime() { 
  breakTimeCon.innerHTML = session.breakTime;
  workTimeCon.innerHTML = session.workTime;
  time.innerHTML = session.workTime + ':00';
  endSession();
}

function startSession() {
  
  var seconds = 60, minutes;
  minutes = session.workTime - 1;
  var fill = 110/minutes;
 
  counter = setInterval(function() { 
    seconds--;
    if (seconds < 0) {
      if (minutes === 0) {
        endSession();
        console.log('sessions ended');
      } else {
        seconds = 59;
        minutes--;
        fill += fill;
        redFillColor.style.height = fill + '%';
      }
    } 

    time.innerHTML = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
  }, 1000);

  
  console.log('session started');
    
}

function endSession() {
  clearInterval(counter);
  redFillColor.style.height = '0%';
  console.log('session Ended');
}


UpdateTime();
