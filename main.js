// Identifying the DOM elements

const cusName=document.getElementById("nameCus");
const cusPhone=document.getElementById("phoneCus");
const cusEmail=document.getElementById("cusEmail");

const roomInput = document.getElementsByName("roomType");
const numRoomsInput = document.getElementById("rumberofRooms");
const adultsNumInput = document.getElementById("adultsnumber");
const childrenNumInput = document.getElementById("childrenNumber");
const checkinInput = document.getElementById("checkIn");
const checkoutInput = document.getElementById("checkOut");
const numofdaysOutput = document.getElementById("numofDays");
const extrareqInput = document.getElementsByName("extrareq");
const promoInput = document.getElementById("promocode");
const advInput = document.getElementsByName("adventure");
const guideInput = document.getElementsByName("divinguide");
const bookBtn = document.getElementById("bookButton");
const outputText1 = document.getElementById("output1");
const outputText2 = document.getElementById("output2");
const outputText3 = document.getElementById("output3");
const popUpoutput = document.getElementById("popup");
const singleInput = document.getElementById("single");
const doubleInput = document.getElementById("double");
const tripleInput = document.getElementById("triple");
const wifiInput = document.getElementById("wifi");
const poolViewInput = document.getElementById("poolview");
const gardenViewInput = document.getElementById("gardenview");
const currentCostOutput = document.getElementById("currentCostOutput");
const extraBedInput = document.getElementById("extraBed");

const favInput = document.getElementById("favButton");

 
// Declaring Variable

let total;
let room;
let numofRooms;
let roomcost;
let numofChildren;
let numofadults;
let numberOfDays;
let promoCode;
let advCost;
let guide;
let guideCost;
let guide1;
let guide2;
let extraRequirements;
let wifi;
let poolView;
let promoCost;
let finalCost;
let finalPayable;
let differenceinDays;
let adventure1;
let adventure2;
let adventure3;
let adventure4;
let advType1;
let advType2;
let advType3;
let advType4;

// Event listners

bookBtn.addEventListener("click", outputfunction);
roomInput.forEach(item => item.addEventListener("change", roomChargeFunction));
checkinInput.addEventListener("change", dateCalFunction);
checkoutInput.addEventListener("change", dateCalFunction);
extrareqInput.forEach(item =>item.addEventListener("change", extrareqFunction));
advInput.forEach(item => item.addEventListener("change" , adventureFunction));
guideInput.forEach(item => item.addEventListener("change", guideCalFunction));
// favinput.addEventListener("click", addfavfunction);

favInput.addEventListener("click", addFavouriteButtonFunction );


// Event listner functions

function initialize(){
    total = 0;
    roomcost = 0;
    room = "";
    numofChildren = 0;
    numofadults = 1;
    numberOfDays = 1;
    promoCode = "";
    advCost = 0;
    guide = "";
    guide1 = "";
    guide2 = "";
    guideCost = 0;
    extraRequirements = "";
    wifi = "";
    poolView = "";
    promoCost = 0;
    finalCost = 0;
    finalPayable = 0;
    differenceinDays = 0;
    adventure1 = "";
    advType1 = "";
    adventure2 = "";
    adventure3 = "";
    adventure4 = "";
    advType2 = "";
    advType3 = "";
    advType4 = "";
    numofRooms = 0;
}

function roomChargeFunction(){
    if(this.value == "single"){
        room = "Single Room(s)";
        roomcost = 25000.00;
    }else if(this.value == "double"){
        room = "Double Room(s)";
        roomcost = 35000.00;
    }else{
        room = "Triple Room(s)";
        roomcost = 40000.00;
    }
    if(extraBedInput.checked){
        roomcost += 8000.00
        room += " Extra Bed Added "
    }
    numofRooms = numRoomsInput.value;
    total = roomcost * numofRooms;
    outputText1.innerText = `Room Type is ${room} The Room cost is ${roomcost} and the number of rooms ${numofRooms}`;
    currentCostOutput.innerText = `Room Type is ${room} The Room cost is ${roomcost} and the number of rooms ${numofRooms} \n`;
}

function dateCalFunction(){

    let checkOut = new Date(checkoutInput.value);
    let checkIn = new Date(checkinInput.value);

    if (isNaN(checkOut)){
        numofdaysOutput.innerText = "Invalid Date";
    }else if (isNaN(checkIn)){
        numofdaysOutput.innerText = "Invalid Date";
    }
    else{
        let difference = checkOut.getTime() - checkIn.getTime();
        if (`${difference}` < 0){
            numofdaysOutput.innerText = "Invalid Date";
        }else{
            differenceinDays = difference / (1000 * 3600 * 24);
            numofdaysOutput.innerText = `${differenceinDays}`;
        }
    }
}

function extrareqFunction(){
    if(this.value == "wifi"){
        if(this.checked){
            wifi = "WIFI Included \n";
        }else{
            wifi = " ";
        }
    }else if(this.value == "poolview"){
        poolView = " Pool View Included";
    }else if(this.value == "gardenview"){
        poolView = " Garden View Included";
    }else{
        poolView = " ";
    }
    extraRequirements = wifi + poolView;
    outputText2.innerText = `${extraRequirements}`
}

function promoFunction(){
    promoCode = promoInput.value;
    if(promoCode == "Promo123"){
        promoCost = total * (5/100);
        total -= promoCost;
        finalCost = total;
    }else{
        finalCost = total;
    }
}

function finalcalFunction(){
    finalPayable = finalCost * differenceinDays;
}

function adventureFunction() {
    const adventures = [
        { id: "localAdults", label: "Diving for local Adults (1 hr) is", cost: 5000 },
        { id: "localkids", label: "Diving for local kids (above 5 years)", cost: 2000 },
        { id: "foreignadults", label: "Diving for foreign adults", cost: 10000 },
        { id: "foreignkids", label: "Diving for foreign kids", cost: 5000 }
    ];

    advCost = 0; 
    let adventureOutput = "";

    adventures.forEach(adventure => {
        const checkbox = document.getElementById(adventure.id);
        if (checkbox && checkbox.checked) {
            adventureOutput += `Included: ${adventure.label}\n`;
            advCost += adventure.cost;
        }  
    });

   
    outputText2.innerText = adventureOutput.trim();


    finalCost += advCost;
}

function guideCalFunction() {
    const guides = [
        { id: "adultsguide", label: "Guide during the diving session for Adults", cost: 1000 },
        { id: "kidsguide", label: "Guide during the diving session for Kids", cost: 500 }
    ];

    guideCost = 0; 
    let guideOutput = "";

    guides.forEach(guide => {
        const checkbox = document.getElementById(guide.id);
        if (checkbox && checkbox.checked) {
            guideOutput += `${guide.label} The Guide Cost is LKR ${guide.cost}\n`;
            guideCost += guide.cost;
        }
    });

  
    outputText3.innerText = guideOutput.trim();
}

function addFavouriteButtonFunction(){
    localStorage.setItem("customer_name", cusName.value);
    localStorage.setItem("customer_phone", cusPhone.value);
    localStorage.setItem("customer_email",cusEmail.value);

    localStorage.setItem("customer_room",roomInput.value);
    localStorage.setItem("customer_room_num",numRoomsInput.value);
    localStorage.setItem("customer_adults_num",adultsNumInput.value);
    localStorage.setItem("customer_children_num",childrenNumInput.value);
    localStorage.setItem("customer_check_in",checkinInput.value);
    localStorage.setItem("customer_check_out",checkoutInput.value);
    localStorage.setItem("wi-fi",wifiInput.value);
    localStorage.setItem("pool_view",guideInput.value);
    localStorage.setItem("view",gardenViewInput.value);
    localStorage.setItem("promo_code",promoInput.value);

    alert("Added to Favorites");
    event.preventDefault()
}




function printerror(error){
    console.log(`there is an error ${error}`);
}



function outputfunction(){
    promoFunction();
    finalcalFunction();
    popUpoutput.classList.toggle('active');


    outputText1.innerText = `Order has been placed!!!
     \n Order Details :
      \n Room Type is ${room} The number of Rooms ${numofRooms}
       \n Room Cost is (Without promotions) ${roomcost}
        \n Extra Requirements are ${extraRequirements}
         \n Promotion Amount ${promoCost}
          \n Final Cost Per day ${finalCost}
           \n Adventure Cost is LKR ${advCost}
            \n Total Amount ${finalPayable}`;
    outputText3.innerText = "";
    outputText2.innerText = "";
}

initialize();

