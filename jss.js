let titel = document.querySelector(".Title")
let Price = document.querySelector(".Price")
let Taxes = document.querySelector(".Taxes")
let Ads = document.querySelector(".Ads")
let Discount = document.querySelector(".Discount")
let count = document.querySelector(".count")
let categore = document.querySelector(".categore")
let Search = document.querySelector(".Search")

let Total = document.querySelector(".Total")
let TotalNumbar = document.querySelector(".Total span")

let butCreate = document.querySelector(".butCreate")
let butSearchTit = document.querySelector(".butSearchTit")
let butSearchCat = document.querySelector(".butSearchCat")

let butDeleteAll = document.querySelector(".butDeleteAll")
let butDeleteAllS = document.querySelector(".butDeleteAll span")

let cont = document.querySelector(".cont")



let col = document.querySelector(".col")
let body = document.querySelector(".body")


window.onload = function(){
    if(localStorage.getItem("color")){
        body.classList.add("color")
        document.body.classList.add('color')
    }else{
        body.classList.remove("color")
        document.body.classList.remove('color')
    }
}

col.onclick = function(){
    if(document.body.classList.contains('color')){
        body.classList.remove("color")
        document.body.classList.remove('color')
        localStorage.removeItem("color")
    }else{
        body.classList.add("color")
        document.body.classList.add('color')
        localStorage.setItem("color" , "color")
    }
    
}




let mod = "creat"
let tmp ;

let getTotal = ()=>{
    if(Price.value !== ""){
        let result = (+Price.value + +Taxes.value + +Ads.value) - +Discount.value
        TotalNumbar.innerHTML = result
        Total.style.backgroundColor = "#4CAF50";
    }else{
        TotalNumbar.innerHTML = ""
        Total.style.backgroundColor = "#F44336";
    }
}


let data ;
if(localStorage.product != null){
    data = JSON.parse(localStorage.product)
}else{
    data = []
}


butCreate.onclick = function(){
    let newPro = {
        titel : titel.value .toLowerCase(),
        Price : Price.value,
        Taxes : Taxes.value,
        Ads : Ads.value,
        Discount : Discount.value,
        count : count.value,
        categore : categore.value.toLowerCase(),
        TotalNumbar : TotalNumbar.innerHTML
    }

    if(titel.value != "" && Price.value != ""){
        if(mod === "creat"){
            if(newPro.count > 1){
                for (let index = 0; index < count.value; index++) {
                    data.push(newPro)
                }
            }else{
                data.push(newPro)
            }
        }else{
            data[tmp] = newPro
            count.style.display = "block"
            butCreate.innerHTML = "create" 
            mod = "creat"
        }
        titel.value = ""
        Price.value = ""
        Taxes.value = ""
        Ads.value = ""
        Discount.value = ""
        count.value = ""
        categore.value = ""
        TotalNumbar.innerHTML = ""
    }
    
    
    
    localStorage.setItem( "product" ,JSON.stringify(data))

    

    showData()
}

function showData() {
    getTotal()
    let count = ""
    for (let i = 0; i < data.length; i++) {
        count += `
        <div class="tbody">
            <span>${i}</span>
            <span>${data[i].titel}</span>
            <span>${data[i].Price}</span>
            <span>${data[i].Taxes}</span>
            <span>${data[i].Ads}</span>
            <span>${data[i].Discount}</span>
            <span>${data[i].TotalNumbar}</span>
            <span>${data[i].categore}</span>
            <span><button onclick="updateData(${i})">Update</button></span>
            <span><button onclick="deleteData(${i})">Delete</button></span>
        </div>
        `
    }
    cont.innerHTML = count


    if (data.length > 0) {
        butDeleteAll.style.display = "block";
        }else{
            butDeleteAll.style.display = "none";
        }
    
        butDeleteAllS.innerHTML = data.length


}

showData()

function deleteData(i) {
    data.splice(i,1)
    localStorage.product = JSON.stringify(data)
    showData()
}

butDeleteAll.onclick = function(){
    data = []
    localStorage.product = JSON.stringify(data)
    showData()
}

function updateData(i){
    titel.value = data[i].titel
    Price.value = data[i].Price
    Taxes.value = data[i].Taxes
    Ads.value = data[i].Ads
    Discount.value = data[i].Discount
    categore.value = data[i].categore
    count.style.display = "none"
    tmp = i
    getTotal()
    scroll({
        top : 0 ,
        behavior : "smooth"
    })
    mod = "update"
    butCreate.innerHTML = "update" 
}

let searchMood = "titel"

function getSearchMood(id) {
    if(id === "SearchTitle"){
        searchMood = "titel"
        Search.placeholder = "Search By Title"
    }else{
        searchMood = "category"
        Search.placeholder = "Search By categore"
    }
    Search.focus()
    Search.value = ""
    showData()
}


function searchData(value) {
    let = count = ""
    if(searchMood === "titel"){
        for (let i = 0; i < data.length; i++) {
            if(data[i].titel.includes(value.toLowerCase())){
                count += `
                <div class="tbody">
                    <span>${i}</span>
                    <span>${data[i].titel}</span>
                    <span>${data[i].Price}</span>
                    <span>${data[i].Taxes}</span>
                    <span>${data[i].Ads}</span>
                    <span>${data[i].Discount}</span>
                    <span>${data[i].TotalNumbar}</span>
                    <span>${data[i].categore}</span>
                    <span><button onclick="updateData(${i})">Update</button></span>
                    <span><button onclick="deleteData(${i})">Delete</button></span>
                </div>
                `
            }
        }
    }else{
        for (let i = 0; i < data.length; i++) {
            if(data[i].categore.includes(value.toLowerCase())){
                count += `
                <div class="tbody">
                    <span>${i}</span>
                    <span>${data[i].titel}</span>
                    <span>${data[i].Price}</span>
                    <span>${data[i].Taxes}</span>
                    <span>${data[i].Ads}</span>
                    <span>${data[i].Discount}</span>
                    <span>${data[i].TotalNumbar}</span>
                    <span>${data[i].categore}</span>
                    <span><button onclick="updateData(${i})">Update</button></span>
                    <span><button onclick="deleteData(${i})">Delete</button></span>
                </div>
                `
            }
        }
    }
    cont.innerHTML = count
}