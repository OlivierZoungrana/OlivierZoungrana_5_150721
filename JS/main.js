
const carts = document.querySelector("#cart");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('sku');
const productSpan = document.getElementById('product_id');

let boutique = document.querySelector(".boutique")

if(productId)
 getProductDetails(productId);
if(boutique && productId===null)
getProducts();




// Initialize global cart data
let cartData = getCart();
if(!cartData) {
    createCart();
}
updateCartData();

// vérifie que la clé cart existe bien dans le localStorage
function getCart(){
    return JSON.parse(localStorage.getItem('cart'));
}

function createCart(){

    let cartN = {
        'products': {},
        'quantity': 0,
        'total' : 0,
    }

    localStorage.setItem('cart', JSON.stringify(cartN));
}

function updateCartData() {
    cartData = getCart()
    // update menu cart quantity
    cart.innerHTML = cartData.quantity;
}

//ajouter un produit au panier
function addToCart(product, quantity){
    let cartN = getCart();

    let cartProducts = cartN.products;
    let keys = Object.keys(cartProducts)

    // console.log(keys)
console.log(keys.indexOf(product._id))
// console.log(cartN.products)
        if(keys.indexOf(product._id) !== -1){
           console.log(cartN.products[product._id])
           cartN.products[product._id].quantity += quantity
           cartN.products[product._id].total = cartN.products[product._id].quantity * cartN.products[product._id].price
        } else {
            product.quantity = quantity
            product.total = product.price * quantity
            cartN.products[product._id] = product;
        }
        // update global quantity and price
        cartN.quantity += quantity;
        cartN.total += product.price * quantity
    localStorage.setItem('cart', JSON.stringify(cartN))
    updateCartData()

    console.log(cartN)
    
    console.log(product, quantity)
    
};


function generateCameras(nameCamera, priceCamera, imageUrl, idCamera, onClick = {}) {
    const a = document.createElement("a");

    const id = document.createElement("p")
    id.innerHTML = idCamera;
    a.href="detail.html?sku=" + idCamera;
    a.classList.add("card");
 
    const cameraThumb = document.createElement("img");
    cameraThumb.src = imageUrl;

   
    const name = document.createElement("h3");
    name.classList.add("card-title");
    name.innerHTML = nameCamera;
 
    const price = document.createElement("h4");
    price.classList.add("card-text")
    price.innerHTML = priceCamera;
 
 
    const addContainer = document.createElement("div");
    const cameraRaw = {name: nameCamera, imageUrl: cameraThumb, price: priceCamera}
 
 
    const addButton = document.createElement("button");
    addButton.classList.add("btn-primary", "btn")
    addButton.innerHTML = "Ajouter au Panier";
    addButton.addEventListener("click", () => onClick(cameraRaw, 1))
    addButton.addEventListener("click",() =>{
       
        const alertte = document.createElement("div")
        alertte.classList.add("alert", "alert-success")
        alertte.innerHTML="produit ajouté"

    });
    addContainer.append(addButton);
 
    a.append(cameraThumb, name, price);
    return a;
 }

function getProducts(){
    const container = document.createElement("div")
    let article = document.querySelector(".boutique");
    container.classList.add("containers")

fetch("http://localhost:3000/api/cameras")
.then(res=> res.json())
.then(data => data.forEach((item) => {

   const cameras = generateCameras(
       item.name,
       item.price,
       item.imageUrl,
       item._id,
       item.description,
       addToCart
       
   );
  container.append(cameras);
}));

article.appendChild(container);
}

//générer les information du produit grace à son Id
function getProductDetails(productId){
    const container = document.createElement("div")
    container.classList.add("container")
    let article = document.querySelector(".boutique");
    let item= [];
  
    

fetch("http://localhost:3000/api/cameras/"+ productId)
.then(response => response.json())
.then(data =>{
    //  console.log(data);

    const cameras = generateOneCamera(
        data.lenses,
        data._id,
        data.name,
        data.price,
        data.imageUrl,
        data.description,
        addToCart
        
    );


    

    container.append(cameras);

})
    article.appendChild(container);
};




function generateOneCamera(datalenses, idCamera,nameCamera,priceCamera,imageUrl, descriptionCamera, selectionCamera, onClick={} ){
    const div = document.createElement("div");
    div.classList.add("card", "mb-3");
    
    const id_camera = document.createElement('p');


    const cameraThumb = document.createElement("img");
    cameraThumb.src = imageUrl;
 
    const name = document.createElement("h3");
    name.classList.add("card-title");
    name.innerHTML = nameCamera;

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.innerHTML = descriptionCamera;
 
    const price = document.createElement("h4");
    price.classList.add("card-text");
    price.innerHTML = priceCamera;

    const selection = document.createElement("select");
    selection.classList.add("card-text"); 
    selection.innerHTML= selectionCamera;
 
 
    const addContainer = document.createElement("div");
    const cameraRaw = {_id: idCamera, name: nameCamera, price: priceCamera, imageUrl: cameraThumb}
 
 
    const addButton = document.createElement("button");
    addButton.classList.add("btn-primary", "btn")
    addButton.innerHTML = "Ajouter au Panier";

    addButton.addEventListener("click", () =>addToCart(cameraRaw, 1));
    addContainer.append(addButton);
 
    div.append(cameraThumb, name, description, selection, price, addContainer);
    return div;

  }

//afficher les informations des produits chois dans le panier
  function displayCart(){

  
    let cartItems = localStorage.getItem("cart")
   
    cartItems = JSON.parse(cartItems)

    console.log(cartItems)


    let productContainer = document.querySelector(".display-cart")
    let totalCostContainer = document.querySelector(".totalCost")

    if(cartItems && productContainer){
            // productContainer.insertBefore = '';

        for(let i in cartItems){
            
                    Object.values(cartItems[i]).map(item=>{

                productContainer.innerHTML+= `

                <div><i class="fas fa-times-circle"></i> <span>${item.name}</span></div>
                <div class="price">${item.price}</div>
                <div class="quantity">${item.quantity}</div>
                <div class="total">${item.total}</div>    
                `        })     
            }
                }
            }

    displayCart();


//création tableauId

function createTableauId(){
    products= [];
for(let i in cartData){
    for(let k in cartData[i]){
        products.push(cartData[i][k]._id)
    }
} 
};
createTableauId();

console.log();


// console.log(tableauId)

//

//selection du bouton envoyer

let btnEnvoyerFormulaire = document.querySelector("#sendFormulaire")


// envoi du formulaire et du panier de produit dans le locaStorage et vérification des champs du formulaire
btnEnvoyerFormulaire.addEventListener('click', async(e)=>{
e.preventDefault();

let contact = {

    firstName: document.querySelector("#firstName").value,
    lastName:document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city:document.querySelector("#city").value,
    email: document.querySelector("#email").value
 }


 // validation formulaire//

let testAlert = (value)=>{
    return `${value} n'est pas correct:  Chiffres et symboles ne sont aps autorisés \n ne pas dépasser 20caractères, minimum 3 caractères ` }


let regExLastNameFistNameCity = (value)=>{
   return /^[ \u00c0-\u01ffa-zA-Z'\-]{3,20}$/.test(value);
 }

let regExEmail = (value)=>{
  return /^^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
 }

let regExAdress = (value)=>{
   return /^[a-zA-Z0-9\s,.'-]{3,}$/.test(value);
 }
 //controle de la validité du nom


 // gérer l'affichage du texte à coté des champs
function dataChampmanquantTexteVide(querySelectorId){
  document.querySelector(`#${querySelectorId}`).textContent ="";
 }

function dataChampmanquantTexte(querySelectorId){
  document.querySelector(`#${querySelectorId}`).textContent ="veuillez remplir correctement ce chanp";
 }

function controlFirstName(){

let theFistName = contact.firstName

if(regExLastNameFistNameCity(theFistName)){
  dataChampmanquantTexteVide("noFirstName");
  return true;
}else{
   dataChampmanquantTexte("noFirstName");
alert(testAlert("fistName"))
 return false;
}
 }

function controlLastName(){
  let theLastName = contact.lastName

 if(regExLastNameFistNameCity(theLastName)){
   dataChampmanquantTexteVide("noLastName")
  return true;
 }else{
 dataChampmanquantTexte("noLastName")
alert(testAlert("lastName"))
 return false;
}
}

function controlCity(){
  let theCity = contact.city

 if(regExLastNameFistNameCity(theCity)){
   dataChampmanquantTexteVide("noCity")
  return true;
 }else{
 dataChampmanquantTexte("noCity")
alert(testAlert("city"))
 return false;
}
}
function controlAdresse(){

  let theAdresse = contact.address

 if(regExAdress(theAdresse)){
   dataChampmanquantTexteVide("noAddress")
  return true;
 }else{
 dataChampmanquantTexte("noAddress")
alert("l' adresse n'est pas valide")
 return false;
}

}

function controlEmail(){

  let theEmail = contact.email

 if(regExEmail(theEmail)){
   dataChampmanquantTexteVide("noEmail")
  return true;
 }else{
 dataChampmanquantTexte("noEmail")
alert("l'email n'est pas valide")
 return false;
}

}


if(controlFirstName() && controlLastName() && controlCity() && controlEmail() && controlAdresse()){
 localStorage.setItem("contact", JSON.stringify(contact));



    const aEnvoyer = {
        products,
        contact
    };

    sendToServer(aEnvoyer);

    
}else{
    document.querySelector(".alert")

  alert("remplissez correctement le formulaire");
}

    
});

// envoyer les informations de la commande au serveur
function sendToServer(aEnvoyer){
  let promesse = fetch("http://localhost:3000/api/cameras/order/", {
        method: "POST",
        body: JSON.stringify(aEnvoyer),
        headers: {
            "Content-Type": "application/json"
        },

    });

    promesse.then(async(response)=>{
      try{
        let contenu = await response.json();
        console.log("contenu de la reponse");
        console.log(contenu);

if(response.ok){

  //récuperer lId
  console.log("l'orderId")
  console.log(contenu.orderId);
  localStorage.setItem("orderId", contenu.orderId);

  //Changer de page

  window.location = "order.html";

}else{

}

      }catch(e){
        console.log(e)
      }
    });

}
//contenu du résultat serveur



// contenu local storage dans le formulaire

let localData = localStorage.getItem("contact")
let dataObject = JSON.parse(localData);

function remplirFormulaireLocalStorage(input){
  document.querySelector(`#${input}`).value = dataObject[input];
};

remplirFormulaireLocalStorage("firstName");
remplirFormulaireLocalStorage("lastName");
remplirFormulaireLocalStorage("address");
remplirFormulaireLocalStorage("city");
remplirFormulaireLocalStorage("email");


console.log(dataObject)













