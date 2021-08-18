

let orderIdResponse = localStorage.getItem("orderId");

// récuperer le prix total

let prixTotalResponse = localStorage.getItem("cart")

prixTotalResponse = JSON.parse(prixTotalResponse)


let positionConfirmationOrder = document.querySelector("#recapCommande")



let structureConfCommande = `
<div class="card">
<div class="card-title">
  <h2>Recap Commande</h2>
</div>
<div class="card-text">
  <p>Merci pour votre commande</p>
  <p>Votre commande numero: <span class="gras">${orderIdResponse}</span> a bien été prise en compte</p>
  <p>Le montant de votre commande est de <span class="gras">${prixTotalResponse["total"]}</span> Euros</p>
  <p>Au plaisir de vous revoir bientôt</p>
</div>
</div>
`;

positionConfirmationOrder.insertAdjacentHTML("afterend",structureConfCommande);

//effacer local storage

function deleteLocalStorage(key){
    localStorage.removeItem(key)
};

deleteLocalStorage("cart");
deleteLocalStorage("contact");
deleteLocalStorage("orderId");


if(orderIdResponse == null){
    window.location.href="index.html";
}




