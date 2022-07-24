var cartDiv = document.querySelector(".cart");
var cartDivOl = document.querySelector(".ol");
const nftsContainer = document.querySelector(".CatsGallery");

function display(){
    if (cartDiv.style.display == "none"){
        cartDiv.style.animation = "fadeIn ease 1s";
        cartDiv.style.display = "block";
    }
    else {
        cartDiv.style.animation = "fadeOut ease 1s";
        cartDiv.style.display = "none";
    }
}

function renderCats() {
    collection.forEach((cat) => {
        nftsContainer.innerHTML += `
            <div class="col-3">
                <img src="${cat.imgSrc}" alt="" class="itemDesc">
                <p><i class="fa-brands fa-ethereum"></i><span class="itemDesc">${cat.price}</span></p>
                <button class="btn btn-danger addToCart" onclick="addCart(${cat.id})">Add to Cart</button>
            </div>
        `;
    });
    console.log("Hello collection");
}
renderCats();

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();


// Add to Cart Function
function addCart(id) {
    if (cart.some((item) => item.id === id)) {
        changeNumber("plus",id);
    }
    else {
        const item = collection.find((item) => item.id === id);
        cart.push({...item,numberOfItems:1});
    }
    updateCart();
}

// Update Cart Function
function updateCart() {
    var totalPrice = 0;
    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfItems;
    });

    cartDiv.innerHTML = `
        <p class="total">Cart Total : <i class="fa-brands fa-ethereum"></i>${totalPrice}</p>
        <div class="buttonContainer"><button class="checkout" onclick="checkout()">Checkout</button></div>
        <ol class="ol">
        </ol>
    `;
    cart.forEach((item) => {
        cartDiv.innerHTML += `
        <ol class="ol">
            <li class="cartItem">
                <img class="shopImg" src="${item.imgSrc}">
                <p class="price"><i class="fa-brands fa-ethereum"></i>${item.price}</p>
                <button class="minus" onclick="changeNumber('minus',${item.id})">-</button>
                <input type="number" value="${item.numberOfItems}" min="1" class="input">
                <button class="plus" onclick="changeNumber('plus',${item.id})">+</button>
                <p class="quantity"><i class="fa-brands fa-ethereum"></i>${(item.price)*(item.numberOfItems)}</p>
                <button class="delete" onclick="deleteFromCart(${item.id})"><i class="fa-solid fa-trash-can"></i></button>
            </li>
        </ol>
        `
    });
    localStorage.setItem("CART", JSON.stringify(cart)); 
}
if (cart.length === 0) {
    cartDiv.innerHTML = `
        <h4>Your Cart is Empty</h4>
        <p>Please add some items to your cart</p>
    `;
}

// Change Number Function
function changeNumber(action,id) {
    cart = cart.map((item) => {
    let numberOfUnits = item.numberOfItems;
    
    if (item.id === id) {
        if (action === "minus" && numberOfUnits > 1) {
            numberOfUnits--;
        }
        // else if (action === "minus" && numberOfUnits <= 1) {
            //remove from cart
            // deleteFromCart(id);
            // item.deleteFromCart(id);
            // cart = cart.filter((item) => item.id !== id);
            // console.log("hello");
        // }
        else if (action === "plus") {
        numberOfUnits++;
        }
    }
    
    return {
        ...item,
        numberOfItems:numberOfUnits
    };
    });
    
    updateCart();
}

function deleteFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    updateCart();
    if (cart.length === 0) {
        cartDiv.innerHTML = `
            <h4>Your Cart is Empty</h4>
            <p>Please add some items to your cart</p>
        `;
    }
    console.log(cart);
}
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty");
        return;
    }
    cartDiv.innerHTML = `
        <h4>Thank you for your purchase</h4>
        <p>You will receive an email with your order details</p>
    `;
    cart = [];
    localStorage.setItem("CART", JSON.stringify(cart)); 
}

// var cartButton = document.querySelector(".cartIcon");
// var ol = document.querySelector("ol")
// var cartEmpty = document.querySelector(".cartItem");
// var quantityPrice;
// var price;
// var input;
// var loader = document.querySelector(".preloader");

// if (!cartEmpty) {
//     var emptyMessage = document.createElement("h4");
//     emptyMessage.innerHTML = "Your Cart is Empty";
//     cart.appendChild(emptyMessage);
// }


// var addCart = document.querySelectorAll(".addToCart");
// for (var i=0; i<addCart.length; i++){
//     var button = addCart[i];
//     button.addEventListener("click",addToCart);
// }

// var purchase = document.querySelector("button.checkout");
// function confirmPurchase(){
//     console.log("hello");
//     var cart = document.querySelector("ol");
//     var cartRows = document.getElementsByClassName("cartItem");
//     if (cartRows.length == 0){
//         alert("Cart is empty")
//         return;
//     }
//     alert("Purchased Completed");
//     while(cart.hasChildNodes()){
//         cart.removeChild(cart.firstChild);
//     }
//     emptyMessage.innerHTML = "Your Cart is Empty";
// }   

// function addToCart(event) {

//     emptyMessage.innerHTML = "";
//     // cart.appendChild(emptyMessage);

//     var button = event.target;
//     var shopItem = button.parentElement;
//     var list = document.createElement("li");
//     list.setAttribute("class","cartItem");


//     var itemImg = document.createElement("img");
//     itemImg.setAttribute("class", "shopImg")
//     itemImg.src = shopItem.getElementsByClassName("itemDesc")[0].src;
//     list.append(itemImg);

//     var itemPrice = document.createElement("p");
//     itemPrice.setAttribute("class", "price");
//     itemPrice.innerHTML = "<i class='fa-brands fa-ethereum'></i>" + shopItem.getElementsByClassName("itemDesc")[1].innerHTML;
//     list.append(itemPrice);

//     var minus = document.createElement("button");
//     minus.setAttribute("class","minus");
//     // minus.setAttribute("onclick" , "decrease()");
//     // minus.setAttribute("onclick","decrement()");
//     minus.innerHTML = "-";
//     list.append(minus);

//     input = document.createElement("input");
//     input.setAttribute("type","number");
//     input.setAttribute("value", 1);
//     input.setAttribute("min", 1);
//     input.setAttribute("class","input");
//     list.append(input);

//     var plus = document.createElement("button");
//     plus.setAttribute("class","plus");
//     // plus.setAttribute("onclick","increment()");
//     plus.innerHTML = "+";
//     list.append(plus);

//     quantityPrice = document.createElement("p");
//     quantityPrice.setAttribute("class","quantity"); 
//     quantityPrice.innerHTML = '1';
//     list.append(quantityPrice);

//     // check if item is already in cart
//     var cartItemContainer = document.getElementsByClassName("cart")[0];
//     var cartRows = cartItemContainer.getElementsByClassName("cartItem");
//     for (var i = 0; i < cartRows.length; i++){
//         var cartRow = cartRows[i];
//         var cartItem = cartRow.getElementsByClassName("shopImg")[0];
//         if (cartItem.src == itemImg.src){
//             var quantity = cartRow.getElementsByClassName("quantity")[0];
//             var newQuantity = parseInt(quantity.innerHTML) + parseInt(shopItem.getElementsByClassName("itemDesc")[1].innerHTML);
//             quantity.innerHTML = newQuantity;
//             // increase input value by 1
//             var input = cartRow.getElementsByClassName("input")[0];
//             var newInput = parseInt(input.value) + 1;
//             input.value = newInput;
//             var price = cartRow.getElementsByClassName("price")[0];
//             var newPrice = parseInt(price.innerHTML) * newQuantity;
//             // price.innerHTML = newPrice;
//             updateQuantity();
//             return;
//         }
//     }

//     var totalPrice = document.createElement("p");
//     totalPrice.setAttribute("class","total");

//     //add checkout button
//     var container = document.createElement("div");
//     container.setAttribute("class","buttonContainer");
//     var checkout = document.createElement("button");
//     checkout.setAttribute("class","checkout");
//     checkout.addEventListener('click', confirmPurchase);
//     checkout.innerHTML = "Checkout";
//     container.appendChild(checkout);
//     var checkOUT = document.querySelector(".checkout");
    
//     ol.append(totalPrice);
//     if (!checkOUT){
//         ol.append(container);
//     }
//     ol.appendChild(list);
//     updateQuantity();
//     // store cart items as an array
//     var cartItems = document.getElementsByClassName("cartItem");
//     var cartItemsArray = Array.from(cartItems);
//     console.log(cartItemsArray);
//     storeItem(list);

    
//     var minusButton = document.getElementsByClassName('minus');
//     for (var i=0; i < minusButton.length; i++){
//         var subtractButton = minusButton[i];
//         subtractButton.addEventListener('click',decrement);
//     }
//     var plusButton = document.getElementsByClassName('plus');
//     for (var i=0; i < plusButton.length; i++){
//         var addButton = plusButton[i];
//         addButton.addEventListener('click',increment);
//     }
// }
       
// function decrement(event){
//     var button = event.target;
//     var shopItem = button.parentElement;
//     var input = shopItem.querySelector("input");
//     event.preventDefault();
//     const currentValue = Number(input.value) || 0;
//     input.value = currentValue - 1;

//     if (input.value == 0){
//         shopItem.remove();
//     }
//     var cartRows = document.getElementsByClassName("cartItem");
//     if (cartRows.length == 0){
//         emptyMessage.innerHTML = "Your Cart is Empty";
//         cart.appendChild(emptyMessage);
//         var cartItemContainer = document.getElementsByClassName("cart")[0];
//         cartItemContainer.getElementsByClassName("total")[0].remove();
//         var cartItemContainer1 = document.getElementsByClassName("cart")[0];
//         cartItemContainer1.getElementsByClassName("buttonContainer")[0].remove();
//     } 
//     if (cartRows.length > 0){
//         updateQuantity();
//     }
// }

// function increment(event){
//     var button = event.target;
//     var shopItem = button.parentElement;
//     var input = shopItem.querySelector("input");
//     event.preventDefault();
//     const currentValue = Number(input.value) || 0;
//     input.value = currentValue + 1;
//     updateQuantity();
// }

// function updateQuantity(){
//     var cartItemContainer = document.getElementsByClassName("cart")[0];
//     var cartRows = cartItemContainer.getElementsByClassName("cartItem");
//     var total = 0;
//     for (var i = 0; i < cartRows.length; i++){
//         var cartRow = cartRows[i];
//         var quantity = cartRow.getElementsByClassName("input")[0].value;
//         var price = cartRow.getElementsByClassName("quantity")[0];
//         var itemAmount = cartRow.getElementsByClassName("price")[0];
//         var itemPrice = (itemAmount.innerText.replace("<i class='fa-brands fa-ethereum'></i>",""));
//         console.log(itemPrice);
//         price.innerHTML = "<i class='fa-brands fa-ethereum'></i>" + quantity * itemPrice;
//         total += (quantity * itemPrice);
//     }
//     console.log(total);
//     cartItemContainer.getElementsByClassName("total")[0].innerHTML = "Cart Total : " + "<i class='fa-brands fa-ethereum'></i>" + total;
// }