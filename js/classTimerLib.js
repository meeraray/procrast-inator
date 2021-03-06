class TimerLib {
    //circle start
    progressBar = document.querySelector('.e-c-progress');
    indicator = document.getElementById('e-indicator');
    pointer = document.getElementById('e-pointer');
    length = Math.PI * 2 * 100;

    update(value, timePercent) {
        var offset = - length - length * value / (timePercent);
        progressBar.style.strokeDashoffset = offset; 
        pointer.style.transform = `rotate(${360 * value / (timePercent)}deg)`; 
    }


    //circle ends
    displayOutput = document.querySelector('.display-remain-time')
    pauseBtn = document.getElementById('pause');
    setterBtns = document.querySelectorAll('button[data-setter]');

    intervalTimer;
    timeLeft;
    wholeTime = 0.5 * 60; // manage this to set the whole time 
    isPaused = false;
    isStarted = false;

    changeWholeTime(seconds){
      if ((wholeTime + seconds) > 0){
        wholeTime += seconds;
        update(wholeTime,wholeTime);
      }
    }

    timer (seconds){ //counts time, takes seconds
      let remainTime = Date.now() + (seconds * 1000);
      displayTimeLeft(seconds);

      intervalTimer = setInterval(function(){
        timeLeft = Math.round((remainTime - Date.now()) / 1000);
        if(timeLeft < 0){
          clearInterval(intervalTimer);
          isStarted = false;
          setterBtns.forEach(function(btn){
            btn.disabled = false;
            btn.style.opacity = 1;
          });
          displayTimeLeft(wholeTime);
          pauseBtn.classList.remove('pause');
          pauseBtn.classList.add('play');
          return ;
        }
        displayTimeLeft(timeLeft);
      }, 1000);
    }
    pauseTimer(event){
      if(isStarted === false){
        timer(wholeTime);
        isStarted = true;
        this.classList.remove('play');
        this.classList.add('pause');

        setterBtns.forEach(function(btn){
          btn.disabled = true;
          btn.style.opacity = 0.5;
        });

      }else if(isPaused){
        this.classList.remove('play');
        this.classList.add('pause');
        timer(timeLeft);
        isPaused = isPaused ? false : true
      }else{
        this.classList.remove('pause');
        this.classList.add('play');
        clearInterval(intervalTimer);
        isPaused = isPaused ? false : true ;
      }
    }

    displayTimeLeft (timeLeft){ //displays time on the input
      let minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      displayOutput.textContent = displayString;
      update(timeLeft, wholeTime);
    }

    setup() {
      progressBar.style.strokeDasharray = length;
      update(wholeTime,wholeTime); //refreshes progress bar
      displayTimeLeft(wholeTime);
      for (var i = 0; i < setterBtns.length; i++) {
        setterBtns[i].addEventListener("click", function(event) {
            var param = this.dataset.setter;
            switch (param) {
                case 'minutes-plus':
                    changeWholeTime(1 * 60);
                    break;
                case 'minutes-minus':
                    changeWholeTime(-1 * 60);
                    break;
                case 'seconds-plus':
                    changeWholeTime(1);
                    break;
                case 'seconds-minus':
                    changeWholeTime(-1);
                    break;
            }
          displayTimeLeft(wholeTime);
        });
    }
      pauseBtn.addEventListener('click',pauseTimer);    
    }
    
    TimerLib() {
        setup();
    } 
 };