
const cart = document.querySelector("#cart");

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




function displayCart(){

    let cartcontainer = document.querySelector(".products")

     let cartItems = localStorage.getItem("cart")

     console.log(cartItems)

     cartItems = JSON.parse(cartItems)

     if(cartItems=== null){

        console.log("je ne suis pas vide")
     }else{

        let productInpanier = [];

        for(i=0 ; i< cartItems.length; i++){
            console.log(cartItems.length);


        }





     }

    
  }

  displayCart();
