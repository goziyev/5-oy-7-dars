function isHttpValid(str) {
  try {
    const newUrl = new URL(str);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
}

const validate = (name, price, color, type, description, picture) => {
  if (!name.value || !name.value.trim()) {
    alert("Name input is empty");
    name.focus();
    name.value = "";
    return false;
  }
  if (name.value.trim().length <= 3) {
    alert("Name should be more than 3 char");
    name.focus();
    return false;
  }
  if (!price.value) {
    price.focus();
    alert("Price input is empty");
    return false;
  }
  if (Number(price)) {
    alert("Price should be number");
    price.focus();
    return false;
  }
  if (price.value <= 10 || price.value > 10000000) {
    price.focus();
    price.value = "";
    alert("Price  very big or small");
    return false;
  }

  if (!picture.value) {
    picture.focus();
    alert("Picture input is empty");
    return false;
  }
  if (!isHttpValid(picture.value)) {
    picture.focus();
    alert("Picture input is not valid");
    return false;
  }

  if (!type.value) {
    type.focus();
    alert("Type input is empty");
    return false;
  }
  if (!color.value) {
    color.focus();
    alert("Color input is empty");
    return false;
  }
  return true;
};

function createCard(phone) {
  return `
    <div class="card mb-3 col-5 p-0 h-200">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          src="${phone.picture}"
          class="img-fluid rounded-start"
          width="200"
          height="200"
          alt="..."
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${phone.name}</h5>
          <div class="row">
            <p class="card-text col-4 fs-4">
              <small class="text-danger">${phone.price}$</small>
            </p>
            <p class="card-text col-4 fs-4">
              <small class="text-primary">${phone.type}</small>
            </p>
          </div>
          <p class="card-text " style="color:${
            phone.color == "white" ? "black" : `${phone.color}`
          }">${phone.color}</p>
          <p class="card-text fs-5">${phone.description.length ? `${phone.description}` :  "Bu mahsulot haqida qo'shimcha ma'lumotlar mavjud emas"}</p>
        </div>
      </div>
    </div>
  </div>
    `;
}

function filteredDate (filter){
   let filteredDate =  JSON.parse(JSON.stringify(getDateFromLocalStorage()));
    if(filter.color){
        filteredDate = filteredDate.filter(el => {
            return el.color == filter.color
        })
    }
    if(filter.type){
        filteredDate = filteredDate.filter(el => {
            return el.type == filter.type
        })
    }
    if(filter.minPrice){
        filteredDate = filteredDate.filter(el => {
            return el.price >= filter.minPrice
        })
    }
    if(filter.maxPrice){
        filteredDate = filteredDate.filter(el => {
            return el.price <= filter.maxPrice
        })
    }
    if (filter.search) {
         
      filteredDate = filteredDate.filter( el => {
        if(el.description.includes(filter.search)){
          return el.description.includes(filter.search) == true;
        }
        else if(el.name.includes(filter.search)){

          return el.name.includes(filter.search) == true;
        }
        
        else if(el.price.includes(Number(filter.search))){
          return el.price.includes(Number(filter.search)) == true;
        }
        
        else if(el.type.includes((filter.search).toLowerCase())){

          return el.type.includes((filter.search).toLowerCase()) == true;
        }
      
        else if(el.color.includes((filter.search).toLowerCase())){
          return el.color.includes((filter.search).toLowerCase()) == true;
        }

      })
   }
  


    if(filter.minPrice > filter.maxPrice){
        alert("Boshlang'ich narxlar tugash narxidan katta bo'lishi mumkin emas")
        minPrice.value = "";
        maxPrice.value = "";
        minPrice.focus();
        return
    }
    return filteredDate
}

function filterFunction(color,type,minPrice,maxPrice,search){
    let filter = {}
    if(color.value){
        filter.color = color.value
    }
    if(type.value){
        filter.type = type.value
    }
    if(minPrice.value){
        filter.minPrice = minPrice.value
    }
    if(maxPrice.value){
        filter.maxPrice = maxPrice.value
    }
    if (search.value) {
      filter.search = search.value;
    }

    return filter

}
function getDateFromLocalStorage() {
  let data = [];
  if (localStorage.getItem("phones")) {
    data = JSON.parse(localStorage.getItem("phones"));
  }
  return data;
}
 function filteredAddHtml (filteredDate,wrapper){

    filteredDate.forEach(phone => {
        let card = createCard(phone);
        wrapper.innerHTML += card
    })
}
export { validate, getDateFromLocalStorage, createCard ,filteredDate,filterFunction,filteredAddHtml};
