class Slider{
    constructor(img1, img2, img3, img4, img5){
            this.images = [img1, img2, img3, img4, img5]; // images is equal to an array
            this.arrowRight = document.getElementById("arrow-right");
            this.arrowLeft = document.getElementById("arrow-left");
            this.img_slide = document.getElementById("img_slide");
            this.pause = document.getElementById("pause");
            this.play = document.getElementById("play");
            this.current = null;
            this.timer = null;
            
    }
  
    init(){
        this.playSlider();
        this.clickLeft();
        this.clickRight();
        this.clickPause();
        this.clickPlay();
        this.keyDown();
        
    }
    playSlider(){
        this.pauseSlider();
        this.timer = window.setInterval(function(){
           mySlide.nextSlide();
        },5000);
        this.play.style.display = "none";
        this.pause.style.display = "block";
       
    }
    pauseSlider(){
        
        clearInterval(this.timer);
        this.pause.style.display = "none";
        this.play.style.display = "block";
        
       
    }
    nextSlide(){
    
    this.current +=1; // Add 1 to keep track of the slide we're on
    if(this.current >  this.images.length-1){ // Check to see if the current slide is the last +  // -1 because array have zero based index
        this.current = 0; // If it's the last go back to the start
        
    } 
       
        this.img_slide.src= this.images[this.current] // If the current slide is not the last change the src of the img to the current src of the index in the array
        
        
        this.arrowRight.addEventListener("click", function(){
            this.nextSlide();
        }.bind(this));
    }
 
    previousSlide(){
        this.current -=1; // Substract 1 to keep track of the slide we're on
        if(this.current < 0){ // Check to see if the current slide is the first
            this.current = this.images.length-1; // If it's the case go to the last slide
        }
        this.img_slide.src = this.images[this.current];
      
    }
 
    keyTouchDown(e) {
		this.keyDown = e.key;

		if (this.keyDown === "ArrowLeft") {
			
			this.previousSlide();
		};

		if (this.keyDown === "ArrowRight") {
			this.nextSlide();
		};  
    }
    clickLeft(){
       this.arrowLeft.addEventListener("click", function(){
            this.previousSlide();
        }.bind(this))
    }
    clickRight(){
       this.arrowRight.addEventListener("click", function(){
            this.nextSlide();
        }.bind(this));
    }
    clickPause(){
        this.pause.addEventListener("click", function(){
            this.pauseSlider();
           
           
            
         }.bind(this));
    }
    clickPlay(){
        this.play.addEventListener("click", function(){
            this.timer = window.setInterval(function(){
                this.nextSlide();
             }.bind(this),5000);
             this.play.style.display = "none";
            this.pause.style.display = "block";
        }.bind(this));
        
    }
    keyDown(){
        window.addEventListener("keydown", function(e){
            this.keyTouchDown(e);
        }.bind(this));
    }
    
}
let mySlide = new Slider("ASSETS/slide1.png", "ASSETS/slide2.png", "ASSETS/slide3.png", "ASSETS/slide4.png", "ASSETS/Slide5.png"); // Instancing a new object that will inherit from the prototype object created with the class


mySlide.init();

