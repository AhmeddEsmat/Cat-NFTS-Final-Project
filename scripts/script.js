var cartButton = document.querySelector(".cartIcon");
var cart = document.querySelector(".cart");
var addCart = document.querySelectorAll(".addToCart");
var ol = document.querySelector("ol")
var cartEmpty = document.querySelector(".cartItem");
var quantityPrice;
var price;
var input;

if (!cartEmpty) {
    var emptyMessage = document.createElement("h4");
    emptyMessage.innerHTML = "Your Cart is Empty";
    cart.appendChild(emptyMessage);
}

function display(){
    if (cart.style.display == "none"){
        cart.style.display = "block"
    }
    else {
        cart.style.display = "none";
    }
}

for (var i=0; i<addCart.length; i++){
    var button = addCart[i];
    button.addEventListener("click",addToCart);
}

function addToCart(event) {

    emptyMessage.innerHTML = "";
    // cart.appendChild(emptyMessage);

    var button = event.target;
    var shopItem = button.parentElement;
    var list = document.createElement("li");
    list.setAttribute("class","cartItem");


    var itemImg = document.createElement("img");
    itemImg.setAttribute("class", "shopImg")
    itemImg.src = shopItem.getElementsByClassName("itemDesc")[0].src;
    list.append(itemImg);

    var itemPrice = document.createElement("p");
    itemPrice.setAttribute("class", "price");
    itemPrice.innerHTML = "<i class='fa-brands fa-ethereum'></i>" + shopItem.getElementsByClassName("itemDesc")[1].innerHTML;
    list.append(itemPrice);

    var minus = document.createElement("button");
    minus.setAttribute("class","minus");
    // minus.setAttribute("onclick" , "decrease()");
    // minus.setAttribute("onclick","decrement()");
    minus.innerHTML = "-";
    list.append(minus);

    input = document.createElement("input");
    input.setAttribute("type","number");
    input.setAttribute("value", 1);
    input.setAttribute("min", 1);
    input.setAttribute("class","input");
    list.append(input);

    var plus = document.createElement("button");
    plus.setAttribute("class","plus");
    // plus.setAttribute("onclick","increment()");
    plus.innerHTML = "+";
    list.append(plus);

    quantityPrice = document.createElement("p");
    quantityPrice.setAttribute("class","quantity"); 
    quantityPrice.innerHTML = '1';
    list.append(quantityPrice);

    // check if item is already in cart
    var cartItemContainer = document.getElementsByClassName("cart")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cartItem");
    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i];
        var cartItem = cartRow.getElementsByClassName("shopImg")[0];
        if (cartItem.src == itemImg.src){
            var quantity = cartRow.getElementsByClassName("quantity")[0];
            var newQuantity = parseInt(quantity.innerHTML) + parseInt(shopItem.getElementsByClassName("itemDesc")[1].innerHTML);
            quantity.innerHTML = newQuantity;
            // increase input value by 1
            var input = cartRow.getElementsByClassName("input")[0];
            var newInput = parseInt(input.value) + 1;
            input.value = newInput;
            var price = cartRow.getElementsByClassName("price")[0];
            var newPrice = parseInt(price.innerHTML) * newQuantity;
            // price.innerHTML = newPrice;
            updateQuantity();
            return;
        }
    }
    // var listTotal = document.createElement("li");
    // listTotal.setAttribute("class","cartItem");
    var totalPrice = document.createElement("p");
    totalPrice.setAttribute("class","total");
    // listTotal.append(totalPrice);
    
    ol.append(totalPrice);
    ol.appendChild(list);
    updateQuantity();


    var minusButton = document.getElementsByClassName('minus');
    for (var i=0; i < minusButton.length; i++){
        var subtractButton = minusButton[i];
        subtractButton.addEventListener('click',decrement);
    }
    var plusButton = document.getElementsByClassName('plus');
    for (var i=0; i < plusButton.length; i++){
        var addButton = plusButton[i];
        addButton.addEventListener('click',increment);
    }
}
       
function decrement(event){
    var button = event.target;
    var shopItem = button.parentElement;
    var input = shopItem.querySelector("input");
    event.preventDefault();
    const currentValue = Number(input.value) || 0;
    input.value = currentValue - 1;

    if (input.value == 0){
        shopItem.remove();
    }
    updateQuantity();
}

function increment(event){
    var button = event.target;
    var shopItem = button.parentElement;
    var input = shopItem.querySelector("input");
    event.preventDefault();
    const currentValue = Number(input.value) || 0;
    input.value = currentValue + 1;
    updateQuantity();
}

function updateQuantity(){
    var cartItemContainer = document.getElementsByClassName("cart")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cartItem");
    var total = 0;
    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i];
        var quantity = cartRow.getElementsByClassName("input")[0].value;
        var price = cartRow.getElementsByClassName("quantity")[0];
        var itemAmount = cartRow.getElementsByClassName("price")[0];
        var itemPrice = (itemAmount.innerText.replace("<i class='fa-brands fa-ethereum'></i>",""));
        console.log(itemPrice);
        price.innerHTML = "<i class='fa-brands fa-ethereum'></i>" + quantity * itemPrice;
        total += (quantity * itemPrice);
    }
    console.log(total);
    cartItemContainer.getElementsByClassName("total")[0].innerHTML = "Cart Total : " + "<i class='fa-brands fa-ethereum'></i>" + total;
}



        // {
        //     var add = event.target;

        //     var current = parseInt(add.parentElement.getElementsByClassName("itemDesc")[0].innerHTML);
        //     add.parentElement.getElementsByClassName("itemDesc")[0].innerHTML = (current+=current)+"";
        //     // const currentValue = Number(input.value) || 0;
        //     // input.value = currentValue + 1;

        //     console.log(current);

        // };


    //     var add = event.target;

    //     var current = parseInt(add.parentElement.getElementsByClassName('quantity')[0].innerHTML);
    //     add.parentElement.getElementsByClassName('quantity')[0].innerHTML = (current-1)+"";
    //     const currentValue = Number(input.value) || 0;
    
    //     if (input.value <= 1){
    //         shopItem.remove();
    //      }
    //      else{
    //          input.value = currentValue - 1;
    //      }

    //     console.log(current);

    // });