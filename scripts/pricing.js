var cartDiv = document.querySelector(".cart");
var cartDivOl = document.querySelector(".ol");
const nftsContainer = document.querySelector(".CatsGallery");
var loader = document.querySelector(".preloader");

window.addEventListener('load', function(){
    loader.style.display = "none";
});

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


let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();


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