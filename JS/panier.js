
var validePanier = document.querySelector(".valider-panier")
var formula = document.getElementById("formula")
var cartDisplay = document.querySelector(".display-cart")
var panier = document.getElementById("panier-display")


function displayCart(){
    let cartItems = localStorage.getItem("cart")
   
    cartItems = JSON.parse(cartItems)

    console.log(cartItems)

    let prixTotalResponse = localStorage.getItem("cart")

    prixTotalResponse = JSON.parse(prixTotalResponse)
    
    let productContainer = document.querySelector(".display-cart")
    let totalCostContainer = document.querySelector(".totalCost")

    if(cartItems && productContainer){
            // productContainer.insertBefore = '';

        for(let i in cartItems){
            
                    Object.values(cartItems[i]).map(item=>{

                productContainer.innerHTML+= `

                <div><span>${item.name}</span></div>
                <div class="price">${formatPrice(item.price)}</div>
                <div class="quantity"><i class="fas fa-chevron-circle-down"></i>${item.quantity}<i class="fas fa-chevron-circle-up"></i></div>
                <div class="total">${formatPrice(item.total)}</div>    
                `  })     
            }       
                     totalCostContainer.innerHTML =`<div class="gras"> TOTAL: ${formatPrice(prixTotalResponse["total"])} </div> `
        
        }

        let circle = document.querySelectorAll(".fa-times-circle")
        console.log(circle)

        for(let l=0; l<circle.length; l++){
            circle[l].addEventListener("click", e=>{
                e.preventDefault();
                console.log("toto")
            })
        }

            }
    displayCart();

    let btnEnvoyerFormulaire = document.querySelector("#sendFormulaire")

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
// envoi du formulaire et du panier de produit dans le locaStorage et vérification des champs du formulaire

btnEnvoyerFormulaire.addEventListener("click", async(e)=>{
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

// contenu local storage dans le formulaire

let localData = localStorage.getItem("contact")
let dataObject = JSON.parse(localData);

function remplirFormulaireLocalStorage(input){
  document.querySelector(`#${input}`).value = dataObject[input];
};

// remplirFormulaireLocalStorage("firstName");
// remplirFormulaireLocalStorage("lastName");
// remplirFormulaireLocalStorage("address");
// remplirFormulaireLocalStorage("city");
// remplirFormulaireLocalStorage("email");



// afficher le formulaire après click sur le bouton

validePanier.addEventListener("click", e=>{

    formula.style.display = "block";

    alert("Votre panier est maintenant valider, remplissez le formulaire et valider la commande")

});

// fonction affichage du panier

function displayPanier(){
    let cart= JSON.parse(localStorage.getItem("cart"))

    console.log(cart)
    if( cart.quantity == 0){

        panier.innerHTML = ` le panier est vide`;
        panier.classList.add("hidden")


    }else{
        console.log("tata")
        panier.style.display= "grid";

    }
}

displayPanier();

// incrémenter et décrementer la quantité
let chevronDown = document.querySelectorAll(".fa-chevron-circle-down")

for(let i=0; i<chevronDown.length; i++){

    chevronDown[i].addEventListener("click", e=>{
 let carta = JSON.parse(localStorage.getItem("cart"))
        if(carta.quantity>1){
            carta.quantity = carta.quantity -1;
        }else{
            alert("impossible d'effectuer cette opération")
        }
        
        console.log("iti")

    })
}


