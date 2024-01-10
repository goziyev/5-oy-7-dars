import { validate ,getDateFromLocalStorage} from "./function.js";

const btn = document.getElementById("btn");
const color = document.getElementById("color");
const price = document.getElementById("price");
const name = document.getElementById("name");
const type = document.getElementById("type");
const picture = document.getElementById("picture");
const description = document.getElementById("description");
const form  = document.getElementById("form")



btn && btn.addEventListener("click",function(e){
e.preventDefault();
    if(validate(name,price,color,type,description,picture)){
        const phone = {
        name:name.value,
        price:price.value,
        picture:picture.value,
        color:color.value,
        description:description.value,
        type:type.value
        }

        let data = getDateFromLocalStorage();
        data.push(phone);
        localStorage.setItem("phones",JSON.stringify(data))

        form.reset(); 
        document.getElementById("card-title").innerHTML ="Noutbuk Adamler"
        document.getElementById("card-price").innerHTML ="2400$"
        document.getElementById("card-type").innerHTML ="aser"
        document.getElementById("card-color").innerHTML ="Black"
        document.getElementById("card-description").innerHTML ="Noutbuk Adreamer 16 dyuymli 8 GB RAM 512 GB SSD, ko'k"
        document.getElementById("card-picture").setAttribute("src","../images/cla98rl6sfhgee0lrapg.jpg")
    }else{
        console.log("Validation error");
    }
  
})


name.onkeyup = function(){
    let a = document.querySelector('#card-title')
    a.innerHTML = name.value
}

price.onkeyup = function(){
    let a = document.querySelector('#card-price')
    a.innerHTML = price.value+ "$"
}

picture.onkeyup = function(){
    let a = document.querySelector('#card-picture')
    a.setAttribute("src",`${picture.value}`)
}

description.onkeyup = function(){
    let a = document.querySelector('#card-description')
    a.innerHTML = description.value ? description.value : "Bu mahsulot boyicha qo'shimcha ma'lumotlar mavjud emas!!"
}

color.onchange = function(){
    let a = document.getElementById('card-color-asd')
    a.innerHTML = color.value
}
type.onchange = function(){
    let a = document.getElementById('card-type')
    a.innerHTML = type.value
}