
class Reservation{
    constructor(){
        
        this.stationName = document.getElementById("stationName");
        this.reservedStation = document.getElementById("reserved_station");
        this.firstName = document.getElementById("firstName");
        this.lastName = document.getElementById("lastName");
        this.form = document.getElementById("form");
        this.stationAddress = document.getElementById("adress_span");
        this.previousFirstName = localStorage.getItem("firstName");
        this.previousLastName = localStorage.getItem("lastName");;
        this.signToBookBtn = document.getElementById("btn_sign_to_book");
        this.reservationStatus = false;
        this.preventNewReservation = document.getElementById("prevent_new_reservation");
        this.reservationBox = document.getElementById("reservation_box");
        this.cancelBox = document.getElementById("cancel_box");
        this.cancelBtn = document.getElementById("cancel_btn");
        this.canvasBox = document.getElementById("canvas_container") ;
        this.reservationBtn = document.getElementById("save_btn");
        this.firstAndLastName = document.getElementById("firstAndLastName");
        this.missingFirstname = document.getElementById("missingFirstName");
        this.missingLastname = document.getElementById("missingLastName");
        this.inputOk = false;
        this.isInputFirstNameOk = false;
        this.isInputLastNameOk = false;
        this.correctFormat = /^[a-zA-ZçÇñÑàâäãÀÂÁÄÃéëêèÉÈÊûÛôÔÖÕöõÎÏîï]+([-'\s][a-zA-ZçÇñÑàâäãÀÂÁÄÃéëêèÉÈÊûÛôÔÖÕöõÎÏîï]+){0,}$/;
    }

   
    formValidation(e) {
        // Vérification des champs et de la validité des informations entrées au clic sur "réservez"
        if ((!this.firstName.validity.valueMissing) && (!this.lastName.validity.valueMissing) && (this.correctFormat.test(this.firstName.value)) && (this.correctFormat.test(this.lastName.value))) {//Champ rempli et valides
            e.preventDefault();
            this.missingLastname.textContent = ``;
            this.missingFirstname.textContent = ``;
            // document.getElementById("client_name").textContent = this.firstnameValue() + " " + this.lastnameValue();
            // newStorage.saveName();
            // popup.showPopup();
            this.inputOk = true;
        } else if ((this.firstName.validity.valueMissing) || (this.lastName.validity.valueMissing)){//Au moins un champ vide
            e.preventDefault();
            this.missingLastname.textContent = `Vous devez entrer votre nom pour réserver`;
            this.missingFirstname.textContent = `Vous devez entrer votre prénom pour réserver`;
        } else if(!this.correctFormat.test(this.firstName.value)) { // Format du prénom non valide
            e.preventDefault();
            this.missingFirstname.textContent = `Ce format n'est pas valide`;
        } else if(!this.correctFormat.test(this.lastName.value)) { // Format du nom non valide
            e.preventDefault();
            this.missingLastname.textContent = `Ce format n'est pas valide`;
        }
     
    }

    provideFormFeedBack() {
        // Expérience utilisateur : vérification des champs en temps réel

        this.firstName.addEventListener("keyup", () => {
            if(this.firstName.validity.valueMissing) {
                this.missingFirstname.textContent = `Vous devez entrer votre prénom pour réserver`;
            } else if(!this.correctFormat.test(this.firstName.value)) {
                this.missingFirstname.textContent = `Ce format n'est pas valide`;
            } else {
                this.missingFirstname.textContent = ``;
            this.isInputFirstNameOk = true;

            }
        });

        this.lastName.addEventListener("keyup", () => {
            if(this.lastName.validity.valueMissing) {
                this.missingLastname.textContent = `Vous devez entrer votre nom pour réserver`;
            } else if(!this.correctFormat.test(this.lastName.value)) {
                this.missingLastname.textContent = `Ce format n'est pas valide`;
            } else {
                this.missingLastname.textContent = ``;
                this.isInputLastNameOk = true;
           

            }
        });
    }

    checkInputValidity(){
        if(this.isInputFirstNameOk && this.isInputLastNameOk){
            this.inputOk = true;
        }
    }
    
// Will be called when the button is clicked AND if the name and lastname are both correct
    saveData(){
        this.checkInputValidity();
       if(this.inputOk || (this.firstName.value !="" && this.lastName.value !="")){
        localStorage.setItem("firstName",firstName.value);
        localStorage.setItem("lastName", lastName.value);
      
        sessionStorage.setItem("stationName", this.stationName.textContent);
        this.displayCanvas();
       }
       
    }
  
   

    displayCanvas(){
        this.canvasBox.style.display ="block";
    }
    goToSignature(){
        this.signToBookBtn.addEventListener("click", function(){

            if(sessionStorage.getItem("reservationStatus")== "true"){
                this.signToBookBtn.textContent = "Réservation impossible";
                this.preventNewReservation.style.display = "block";
            }
            else{
            this.saveData();
            // if(sessionStorage.getItem("firstName")!="" && sessionStorage.getItem("lastName")!=""){
            //     this.displayCanvas();
            // }
          
           this.fillReservationBox();
           
        }
        }.bind(this))
    }
   


preFillForm(){
    if(this.reservationStatus === false ){
        document.getElementById("firstName").value = this.previousFirstName;
        document.getElementById("lastName").value = this.previousLastName;
        
    }
}
removeCanvas(){
    this.reservationBtn.addEventListener("click", function(){
        this.canvasBox.style.display = "none";

    }.bind(this))
}

fillReservationBox(){
    this.firstAndLastName.textContent = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
    
    this.reservedStation.textContent = sessionStorage.getItem("stationName");
}
}
let myReservation = new Reservation;

myReservation.goToSignature();
myReservation.removeCanvas();
myReservation.preFillForm();
myReservation.provideFormFeedBack();
myReservation.fillReservationBox();
