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

/**
 * 
 *  vérifie que la clé cart existe bien dans le localStorage
 * 
 */
function getCart(){
    return JSON.parse(localStorage.getItem('cart'));
}

/**
 * créer un panier vide
 */

function createCart(){

    let cartN = {
        'products': {},
        'quantity': 0,
        'total' : 0,
    }

    localStorage.setItem('cart', JSON.stringify(cartN));
}

/**
 * 
 * formatter les différents prix prend un paramètre un prix et le format en euros
 */

function formatPrice( rawPrice ) {
    let separator = ',';
    let symbol = '€';
    let price = parseInt( rawPrice ) / 100;
    return price.toFixed(2).replace('.', separator) + '&nbsp;' + symbol;
}


/**
 * mise à jour de la quantité dans le panier
 */

function updateCartData() {
    cartData = getCart()
    cart.innerHTML = cartData.quantity;
}

/**
 *  ajoute un produit dans le panier et le localstorage et prend deux paramètres
 * @param {*} product 
 * @param {*} quantity 
 */

function addToCart(product, quantity){
    let cartN = getCart();
    let cartProducts = cartN.products;
    let keys = Object.keys(cartProducts)

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

    alert("Votre produit a été ajouté")
    
}

/**
 * création d'une div contenant toutes les informations sur le produit, elle affiche la liste des caméras contenus dans l'API
 * @param {*} nameCamera 
 * @param {*} priceCamera 
 * @param {*} imageUrl 
 * @param {*} idCamera 
 */

function generateCameras(nameCamera, priceCamera, imageUrl, idCamera) {
    const div = document.createElement("div");
    div.classList.add("col-xl-3", "col-lg-4", "col-md-6", "p-2");

    const card = document.createElement("div");

    const id = document.createElement("p")
    id.innerHTML = idCamera;
    
    card.classList.add("card");
 
    const cameraThumb = document.createElement("img");
    cameraThumb.src = imageUrl;
    cameraThumb.classList.add("card-img-top");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-body");

   
    const name = document.createElement("h5");
    name.classList.add("card-title");
    name.innerHTML = nameCamera;
 
    const price = document.createElement("p");
    price.classList.add("card-text")
    price.innerHTML = formatPrice(priceCamera);
 
 
    const addContainer = document.createElement("div");
    const cameraRaw = {name: nameCamera, imageUrl: cameraThumb, price: priceCamera}
 
 
    const detailButton = document.createElement("a");
    detailButton.classList.add("btn-primary", "btn")
    detailButton.innerHTML = "Voir le produit";
    detailButton.href="detail.html?sku=" + idCamera;

    addContainer.append(detailButton);

    cardContent.append(name, price, addContainer)
 
    card.append(cameraThumb, cardContent);
    div.append(card);
    return div;
 }


 /**
  * appel dans l'aPI des différentes caméras à afficher grace à generateCameras
  */

function getProducts(){
    let container = document.querySelector(".boutique");

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

// article.appendChild(container);
}


/**
 * générer les information du produit grace à son Id
 * @param {*} productId 
 */
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

/**
 * 
 * générer une div con tenant les information du produit sélectionné
 * @param {*} datalenses 
 * @param {*} idCamera 
 * @param {*} nameCamera 
 * @param {*} priceCamera 
 * @param {*} imageUrl 
 * @param {*} descriptionCamera 
 * @param {*} selectionCamera 
 */

function generateOneCamera(datalenses, idCamera,nameCamera,priceCamera,imageUrl, descriptionCamera, selectionCamera){

    let cardmb3 = document.createElement("div")
    cardmb3.classList.add("card", "mb-3")
    let rowg= document.createElement("div")
    rowg.classList.add("row","g-0")
    let colmd= document.createElement("div")
    colmd.classList.add("col-md-4")
    let colmd2= document.createElement("div")
    colmd2.classList.add("col-md-8")
    let cardBody= document.createElement("div")
    cardBody.classList.add("card-body")
    let cardBody2 = document.createElement("div")
    cardBody2.classList.add("card-body")

    let cardTitle = document.createElement("h5")
    cardTitle.classList.add("card-title")
    let cardText = document.createElement("p")
    cardText.classList.add("card-text")

    let cardDescription = document.createElement("p")
    cardDescription.classList.add("p-2")

    let mot=  document.createElement("p").textContent= `Selectionner une lentille : `;

    cardmb3.append(rowg)
    rowg.append(colmd)
    rowg.append(colmd2)
    colmd2.append(cardBody)
    cardBody.append(cardTitle)
    cardBody.append(cardText)
    cardBody.append(cardDescription)
    cardBody.append(mot)
    colmd2.append(cardBody2)
//création de lélement image et insertion dans le colmd
    let selection = document.createElement("select");
    selection.classList.add("card-text")
    selection.innerHTML = selectionCamera
    cardBody.append(selection)
    let opt = document.querySelector(".opt")
    for(i=0; i<datalenses.length; i++){
        let opti = datalenses[i];
        let option = document.createElement("option")      
        option.innerHTML= opti;        
        option.value = opti;
        selection.appendChild(option);     }


    cardTitle.innerHTML = nameCamera;
    cardText.innerHTML =formatPrice(priceCamera)
    cardDescription.innerHTML = '<strong>Description:</strong><br>' + descriptionCamera
    let imag = document.createElement("img")
    imag.classList.add("img-fluid", "rounded-start")
    colmd.append(imag)
    imag.src = imageUrl

    const addContainer = document.createElement("div");
    const cameraRaw = { _id: idCamera, name: nameCamera, price: priceCamera, imageUrl: imag}
    
    
    const addButton = document.createElement("button");
    addButton.classList.add("btn-primary", "btn", "col-md-8")
    addButton.innerHTML = "Ajouter au Panier";

    addButton.addEventListener("click", () =>addToCart(cameraRaw, 1));
        cardBody2.append(addButton)
    
    return cardmb3;

  }












