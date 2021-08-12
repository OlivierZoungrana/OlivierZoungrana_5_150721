
const carts = document.querySelector("#cart");





// Initialize global cart data
let cartData = getCart();
if(!cartData) {
    createCart();
}
updateCartData();

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


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('sku');
const productSpan = document.getElementById('product_id');

let boutique = document.querySelector(".boutique")

 if(productId)
 getProductDetails(productId);
if(boutique && productId===null)
getProducts();


function generateOneCamera( idCamera,nameCamera,priceCamera,imageUrl, descriptionCamera, selectionCamera, onClick={} ){
    const div = document.createElement("div");
    div.classList.add("card", "mb-3");
    
    const id_camera = document.createElement('p');


    const cameraThumb = document.createElement("img", "rounded-start");
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


    const afficherFormulaire =() =>{

        const positionFormulaire = document.querySelector(".formulaire-content")

        const structureFormulaire = `

        <form>
          <div class="form-row">
            <div class="col-md-4 mb-3">
              <label for="nom">Nom</label>
              <input type="text" class="form-control is-valid" id="firstName" placeholder="First name" value="Mark" required>
              <div class="valid-feedback">
                Valide!
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <label for="prenom">Prénom</label>
              <input type="text" class="form-control is-valid" id="lastName" placeholder="Last name" value="Otto" required>
              <div class="valid-feedback">
                Valide!
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="adresse">Adresse</label>
              <input type="text" class="form-control is-valid" id="address" placeholder="Adresse" required>
              <div class="invalid-feedback">
                Entrer votre Adresse.
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-6 mb-3">
              <label for="ville">Ville</label>
              <input type="text" class="form-control is-valid" id="city" placeholder="City" required>
              <div class="invalid-feedback">
                Choissisez une ville.
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-6 mb-3">
              <label for="email">E-mail</label>
              <input type="email" class="form-control is-valid" id="email" placeholder="e-mail" required>
              <div class="invalid-feedback">
                Votre 
              </div>
            </div>
          </div>
  
          <button id="sendFormulaire" class="btn btn-primary" type="submit">Soumettre</button>
        </form>
          
        
        
        
        `;

        positionFormulaire.insertAdjacentHTML("afterend", structureFormulaire);
    }

afficherFormulaire();


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

let btnEnvoyerFormalaire = document.querySelector("#sendFormulaire")



btnEnvoyerFormalaire.addEventListener('click', async(e)=>{
e.preventDefault();

 let contact = {

    firstName: document.querySelector("#firstName").value,
    lastName:document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city:document.querySelector("#city").value,
    email: document.querySelector("#email").value
 }

 localStorage.setItem("contact", JSON.stringify(contact))

    const aEnvoyer = {
        products,
        contact
    }

    console.log(aEnvoyer);


    let promesse = fetch("http://localhost:3000/api/cameras/order/", {
        method: "POST",
        body: JSON.stringify(aEnvoyer),
        headers: {
            "Content-Type": "application/json"
        },

    });
await promesse.then((res)=>{
    
    return res.json()
    
    }).then((data)=> console.log(data)).catch(console.log)
    // console.log("promesse")
    // console.log(promesse)

  
})



// contenu local storage dans le formulaire



let localData = localStorage.getItem("contact")

console.log(localData)

let dataObject = JSON.parse(localData)

function remplirFormulaireLocalStorage(input){
document.querySelector(`#${input}`).value = dataObject[input];
}

remplirFormulaireLocalStorage("firstName");
remplirFormulaireLocalStorage("lastName");
remplirFormulaireLocalStorage("address");
remplirFormulaireLocalStorage("city");
remplirFormulaireLocalStorage("email");


console.log(dataObject)
       



