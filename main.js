
const cart = document.querySelector("#cart");
let item=0;
// cart.innerHTML = item;




  






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
       item.description
       
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
        data.name,
        data.price,
        data.imageUrl,
        data._id,
        data.description
        
        
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


function generateOneCamera(nameCamera, descriptionCamera, imageUrl, priceCamera, selectionCamera, onClick={} ){
    const div = document.createElement("div");
    div.classList.add("card");
 
    const cameraThumb = document.createElement("img");
    cameraThumb.src = imageUrl;
 
    const name = document.createElement("h3");
    name.classList.add("card-title");
    name.innerHTML = nameCamera;

    const description = document.createElement("p");
    description.innerHTML = descriptionCamera;
 
    const price = document.createElement("h4");
    price.classList.add("card-text")
    price.innerHTML = priceCamera;

    const selection = document.createElement("select");
    selection.classList.add("card-text")
    selection.innerHTML= selectionCamera;
 
 
    const addContainer = document.createElement("div");
    const cameraRaw = {name: nameCamera, imageUrl: cameraThumb, price: priceCamera}
 
 
    const addButton = document.createElement("button");
    addButton.classList.add("btn-primary", "btn")
    addButton.innerHTML = "Ajouter au Panier";

    addButton.addEventListener('click', e=>{
        
    } )
   // addButton.addEventListener("click", () => onClick(cameraRaw, 1))
    addContainer.append(addButton);
 
    div.append(cameraThumb, name, description, selection, price, addContainer);
    return div;

  }






