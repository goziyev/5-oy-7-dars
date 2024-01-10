import { getDateFromLocalStorage ,createCard,filteredDate,filterFunction,filteredAddHtml} from "./function.js";
const wrapper = document.getElementById("product-list");
const button = document.getElementById("button");
const maxPrice = document.getElementById("max-price");
const minPrice = document.getElementById("min-price");
const type  = document.getElementById("type")
const form = document.getElementById("form")
const color  = document.getElementById("color")
let data = getDateFromLocalStorage();


document.addEventListener("DOMContentLoaded" ,function(){
    if (data.length) {
        data.forEach(phone => {
            let card = createCard(phone);
            wrapper.innerHTML += card
        });
    }
})

button && button.addEventListener("click",function(e){
    e.preventDefault();
    let filter = filterFunction(color,type,minPrice,maxPrice);
    let filteredDatE = filteredDate(filter)
    wrapper.innerHTML = "";
    if (filteredDatE.length) {
    filteredAddHtml(filteredDatE,wrapper);
        
        form.reset();
    }else{
        wrapper.innerHTML = "Siz kiritgan so'rov boyicha mahsulotlar mavjud emas!!!"
    }

})