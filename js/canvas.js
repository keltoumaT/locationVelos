class Canvas{
    constructor(){
        this.canvas = document.getElementById("canvas");
        this.eraseBtn = document.getElementById("erase_btn");
        this.saveBtn = document.getElementById("save_btn");
        this.ctx = canvas.getContext("2d");
        this.ctx.strokeStyle = "#2A2025";
        this.ctx.lineWidth = 3;
        this.ctx.fillStyle = "#ffffff";
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
    }

    draw(x,y){
        if(!this.isDrawing)
      
            return;
          
            this.ctx.beginPath();
           
            this.ctx.moveTo(this.lastX, this.lastY); 
            this.ctx.lineTo(x, y);
            this.ctx.stroke(); 
            [this.lastX, this.lastY] = [x,y];
    }
    init(){
        this.saveBtn.style.display = "none";
        canvas.addEventListener("mousemove", (e) => {
            this.draw(e.offsetX, e.offsetY);
        });
        canvas.addEventListener("mousedown", (e)=>{
        this.isDrawing = true;
        this.saveBtn.style.display = "block";
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
        });

       canvas.addEventListener("mouseup", ()=>this.isDrawing = false);
       this.eraseBtn.addEventListener("click", function(){
           console.log("clické");
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        }.bind(this));
        canvas.addEventListener("touchstart", e=>{
            if(e.touches && e.touches.length ==1){
                this.isDrawing = true;
                this.saveBtn.style.display = "block";

                let touch = e.touches[0];
                let touchX = touch.pageX - touch.target.offsetLeft;
                let touchY = touch.pageY - touch.target.offsetTop;
                [this.lastX, this.lastY] = [touchX, touchY];
               
            }
        });
        canvas.addEventListener("touchmove", (e) => {
            if (e.touches && e.touches.length === 1) {
            let touch = e.touches[0];
            let touchX = touch.pageX - touch.target.offsetLeft;
            let touchY = touch.pageY - touch.target.offsetTop;
            this.draw(touchX, touchY);
            }
        });
        canvas.addEventListener("touchend", () => {
            this.isDrawing = false;
        });
        
        
    }
    
}
let myCanvas = new Canvas;
myCanvas.init();