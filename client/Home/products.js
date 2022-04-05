fetch("http://localhost:5000/products")
  .then((res) => {
    console.log("Within First then block !");
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Something went wrong !");
      // return Promise.reject("Something went wrong !");
    }
  })
  .then((productData) => {
    showProductsData(productData);
    console.log(productData);
    ready();
  })
  .catch(function (err) {
    console.log(err);
  });

function showProductsData(productData) {
  let products = `<article>`;
  products += `
<section class="PLP-listing-class">
  <div class="displayclass">`;
  for (let i = 0; i < productData.length; i++) {
    products += `<div class="div-height"><h4 class="shop-item-title">${productData[i].name}</h4>
    <img class="shop-item-image"
      src="..${productData[i].imageURL}"
      alt="${productData[i].sku}"
    />
    <p>
    ${productData[i].description}
    </p><div>
    <span class="shop-item-price"> MRP Rs.${productData[i].price}</span>
    <button class="span2" id="addTocartButton">Buy Now</button></div></div>`;
  }
  products += `</div>
  </section>
</article>`;
  footerDataProduct = ` <p>Copyright &#169; 2011-2018 Sabka Bazaar Grocery Supplies Pvt Ltd</p>`;

  // Setting innerHTML as headerdata
  document.getElementById("product-details").innerHTML = products;
  // Setting innerHTML as footerdata
  document.getElementById("footer-data-product").innerHTML = footerDataProduct;
}
// if (document.readyState == "loading") {
//   document.addEventListener("DOMContentLoaded", ready);
// } else {
//   ready();
// }

function ready() {
  document.querySelector(".cart-items-home").addEventListener("click", () => {
    document.querySelector(".cart-hide-show").classList.toggle("cart-hide");
  });
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("span2");
  // var addToCartButtons = document.getElementById("addTocartButton");
  console.log(addToCartButtons);
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  alert("Thank you for your purchase");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  document.querySelector(".cart-items-home span").innerHTML = 0;
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  var count = document.querySelector(".cart-items-home span");
  var value = count.innerText;
  var newval = parseInt(value.split(" ")[0]);
  var updatedval = newval - 1;
  document.querySelector(".cart-items-home span").innerHTML = updatedval;
  localStorage.setItem("cartVal", updatedval);

  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;

  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  console.log(cartItems);
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  var count = document.querySelector(".cart-items-home span");
  var value = count.innerText;
  var newval = parseInt(value.split(" ")[0]);
  var updatedval = newval + 1;
  document.querySelector(".cart-items-home span").innerHTML = updatedval;
  localStorage.setItem("cartVal", updatedval);
  var cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];

  var cartRows = cartItemContainer.getElementsByClassName("cart-row");

  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    console.log(priceElement);
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    console.log(quantityElement);
    var price = parseFloat(priceElement.innerText.replace("MRP Rs.", ""));
    console.log(price);
    var quantity = quantityElement.value;
    console.log(quantity);
    total = total + price * quantity;
    console.log(total);
  }
  total = Math.round(total * 100) / 100;
  console.log(total);
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "MRP Rs." + total;
}
function userCreation() {
  var firstname = document.getElementById("firstName").value;
  var lastname = document.getElementById("lastName").value;
  var email = document.getElementById("email-id").value;
  var pass = document.getElementById("password").value;
  var pass2 = document.getElementById("password-2").value;
  localStorage.setItem("name1", firstname);
  localStorage.setItem("surname1", lastname);
  localStorage.setItem("pass2", pass2);
  localStorage.setItem("email1", email);
  localStorage.setItem("pass1", pass);
  if (pass == pass2) {
    localStorage.setItem("pass1", pass);
    alert("user registered successfully...!!!");
  } else {
    alert("Password doesn't matches...!!! Enter Again");
  }

  // document.getElementById("firstName").value = "";
  // document.getElementById("lastName").value = "";
  // document.getElementById("email-id").value = "";
  // document.getElementById("password").value = "";
  // document.getElementById("password-2").value = "";
}
function login() {
  var email = document.getElementById("email-id").value;
  var pass = document.getElementById("password-sign-in").value;

  var email1 = localStorage.getItem("email1");
  var pass1 = localStorage.getItem("pass1");

  if (email == email1 && pass == pass1) {
    window.location.href = "home.html";
    alert("Hi" + firstname);
  } else {
    alert("email OR pass is incorrect");
  }
}
