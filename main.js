/*jslint browser: true*/
'use strict';

let breakTimeCon = document.querySelector('#break-time'),
    addBreakBtn = document.querySelector('#add-break'),
    subBreakBtn = document.querySelector('#sub-break'),
    workTimeCon = document.querySelector('#work-time'),
    addWorkBtn = document.querySelector('#add-work'),
    subWorkBtn = document.querySelector('#sub-work'),
    time = document.querySelector('.time'),
    startTimerBtn = document.querySelector('.pomodoro'),
    redFillColor = document.querySelector('.timer'),
    sessionType = document.querySelector('.session-type');

let session = {
  breakTime: 5,
  workTime: 25,
  isInSession: true
}

let counter,
    sessionStart = true;

startTimerBtn.addEventListener('click', function() {
  if (sessionStart === true) {
    manageSession();
    sessionStart = false;
  } else {
    endSession();
    sessionStart = true;
  }
  
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
    sessionType.innerHTML = 'Work Time';
    startSession(session.workTime - 1);
  } else {
    session.isInSession = true;
    console.log('Break Time!');
    sessionType.innerHTML = 'Break Time';
    startSession(session.breakTime - 1);
  }
  
}

UpdateTime();
