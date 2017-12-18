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
var sessionType = document.querySelector('.session-type');

var session = {
  breakTime: 5,
  workTime: 25,
  isInSession: true
}

var counter;

startTimerBtn.addEventListener('click', function() {
  manageSession();
});

addBreakBtn.addEventListener('click', function() {
  UpdateTime();
  session.isInSession = true;
  session.breakTime += 1;
});

subBreakBtn.addEventListener('click', function() {
  UpdateTime();
  session.isInSession = true;
  if (session.breakTime <= 1) {
    session.breakTime = 1;
  } else {
    session.breakTime -= 1;
  }
});

addWorkBtn.addEventListener('click', function() {
  UpdateTime();
  session.isInSession = true;
  session.workTime += 1;
});

subWorkBtn.addEventListener('click', function() {
  UpdateTime();
  session.isInSession = true;
  if (session.workTime <= 1) {
    session.workTime = 1;
  } else {
    session.workTime -= 1;
  }
});

function UpdateTime() { 
  endSession();
  breakTimeCon.innerHTML = session.breakTime;
  workTimeCon.innerHTML = session.workTime;
  time.innerHTML = session.workTime + ':00';
}

function startSession(minutes) {
  
  var seconds = 60;
  var fill = 110/minutes;
 
  counter = setInterval(function() { 
    seconds--;
    if (seconds === 0) {
      if (minutes === 0) {
        endSession();
        manageSession();
      } else {
        seconds = 59;
        minutes--;
        fill += fill;
        redFillColor.style.height = fill + '%';
      }
    } 

    time.innerHTML = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
  }, 1000);

    
}

function endSession() {
  clearInterval(counter);
  redFillColor.style.height = '0%';
  console.log('session Ended');
}

function manageSession() {
  var minutes;
  
  if (session.isInSession) {
    session.isInSession = false;
    console.log('Work Time!');
    minutes = session.workTime - 1;
    sessionType.innerHTML = 'Work Time';
    startSession(minutes);
  } else {
    session.isInSession = true;
    console.log('Break Time!');
    minutes = session.breakTime - 1;
    sessionType.innerHTML = 'Break Time';
    startSession(minutes);
  }
  
}

UpdateTime();
