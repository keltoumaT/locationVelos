class Timer{
    constructor(){
    
        this.clock = document.getElementById("clock");

        this.days = null;
        this.hours = null;
        this.minutes= null;
        this.seconds = null;
        this.btn = document.getElementById("save_btn");
       
        this.time = null;
        this.timerInterval = null;
        this.signToBookBtn = document.getElementById("btn_sign_to_book");
        this.preventNewReservation = document.getElementById("prevent_new_reservation");

        this.reservationBox = document.getElementById("reservation_box");
        this.cancelBtn = document.getElementById("cancel_btn");
        this.canvasBox = document.getElementById("canvas_container") ;
        this.cancelBox = document.getElementById("cancel_box");
        this.expirationBox = document.getElementById("expiration_box");
        this.reservationStatus = false;

        
      
    }
    // getDeadline will be call on click
    getDeadline(){

     
        this.deadline.setMinutes(this.deadline.getMinutes()+20);

        sessionStorage.setItem("deadline", this.deadline);
   
    }
    updateTimer(){
  
    this.deadline = sessionStorage.getItem("deadline");

        
       let time = Date.parse(this.deadline) - new Date(Date.now());
   
        this.days = Math.floor(time/(1000*60*60*24));
        
        this.hours = Math.floor((time/(1000*60*60))%24);
        this.minutes= Math.floor((time/1000/60)%60);
        this.seconds= Math.floor((time/1000)%60);
    
        this.total= Math.floor(time/1000);
        console.log(this.total);
       
        if(this.total < 1){
          
            this.reservationBox.style.display = "none";
            this.expirationBox.style.display = "block";
            this.reservationStatus = false;
            sessionStorage.setItem("reservationStatus", this.reservationStatus);
            this.signToBookBtn.textContent = "Signer pour réserver";
            this.preventNewReservation.style.display = "none";
            this.clearTimer();
            
        }
    }

    startTimer(){
     
      this.timerInterval = setInterval(function(){
           myTimer.updateTimer();
           if(this.minutes <10 && this.seconds > 10){

           
            this.clock.innerHTML = 
           
             "<span>" +"0" + this.minutes + "</span>"
             + "<span>" + this.seconds + "</span>"
           }
           else if(this.seconds < 10 && this.minutes >10){

            this.clock.innerHTML = 
           
             "<span>" + this.minutes + "</span>"
             + "<span>" + "0" + this.seconds + "</span>"
           }
           else if(this.minutes < 10 && this.seconds < 10){
            this.clock.innerHTML = 
           
            "<span>" +"0" +this.minutes + "</span>"
            + "<span>" + "0" + this.seconds + "</span>"
           }
           else{
            this.clock.innerHTML = 
           
            "<span>" + this.minutes + "</span>"
            + "<span>" +  this.seconds + "</span>"
           }
          
        
        }.bind(this),1000);
      
      
      
    }
    clearTimer(){
    
       
       this.clock.innerHTML =  
        "<span>" + "0" + "</span>"
        + "<span>" + "0" + "</span>";
        clearInterval(this.timerInterval);
        sessionStorage.removeItem("deadline");
            //Votre résa a expiré
          
        }
        
    

    clickEvent(){
       this.btn.addEventListener("click", function(){
           
        //    event.preventDefault();
           this.deadline = new Date(Date.now());
            this.getDeadline();
            this.startTimer();
        //    this.clearTimer();
            // myReservation.fillReservationBox();
            this.reservationBox.style.display = "block";
         
            this.cancelBox.style.display = "none";
            this.expirationBox.style.display = "none";
            this.reservationStatus = true;
            sessionStorage.setItem("reservationStatus", this.reservationStatus);

            
        }.bind(this));
        this.cancelBtn.addEventListener("click", function(){
        //    event.preventDefault();
            // console.log(myTimer.total);
            this.cancelBox.style.display = "block";
            this.reservationBox.style.display = "none";
            this.signToBookBtn.textContent = "Signer pour réserver";
            this.preventNewReservation.style.display = "none";
            this.reservationStatus = false;
            sessionStorage.setItem("reservationStatus", this.reservationStatus);

            this.clearTimer();
            sessionStorage.removeItem("deadline");
        }.bind(this));
    }
    checkNeedForTimer(){
        if(sessionStorage.getItem("deadline")){
            this.startTimer();
            this.reservationBox.style.display = "block";
        }
        else {
            this.reservationBox.style.display = "none";
        }
    }

}


let myTimer = new Timer;
myTimer.clickEvent();
myTimer.checkNeedForTimer();




