
const cart = document.querySelector("#cart");
let items =0;


function getCart(){
    return JSON.parse(localStorage.getItem('cart'));

}
function createCart(){

    let cartN = {
        'products': {},
        'quantity': 0,
        'total' : 0,
    }

    let verifyCart = localStorage.getItem('cart')

    if(!verifyCart){
        localStorage.setItem('cart', JSON.stringify(cartN));

    }
}

createCart();


function addToCart(product, quantity){
    let cartN = getCart();

    let cartProducts = cartN.products;
    let keys = Object.keys(cartProducts)

    // console.log(keys)
console.log(keys.indexOf(product._id))
// console.log(cartN.products)
        if(keys.indexOf(product._id)!==-1){
           console.log(cartN.products[product._id])
           cartN.products[product._id].quantity+=1
           cartN.products[product._id].total = cartN.products[product._id].quantity * cartN.products[product._id].price
        
        }else{

            product.quantity = 1
            product.total= product.price
            cartN.products[product._id]= product;
            cartN.quantity+=1;
            cartN.total +=product.total




        }
    localStorage.setItem('cart', JSON.stringify(cartN))

            

    console.log(cartN)
    cart.innerHTML = items +1;
    ++items;
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

 if(productId)
 getProductDetails(productId);
else
getProducts();


function generateOneCamera( idCamera,nameCamera,priceCamera,imageUrl, descriptionCamera, selectionCamera, onClick={} ){
    const div = document.createElement("div");
    div.classList.add("card", "mb-3");
    
    const id_camera = document.createElement('p')


    const cameraThumb = document.createElement("img", "rounded-start");
    cameraThumb.src = imageUrl;
 
    const name = document.createElement("h3");
    name.classList.add("card-title");
    name.innerHTML = nameCamera;

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.innerHTML = descriptionCamera;
 
    const price = document.createElement("h4");
    price.classList.add("card-text")

    price.innerHTML = priceCamera;

    const selection = document.createElement("select");
    selection.classList.add("card-text")
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


  }

  displayCart();



