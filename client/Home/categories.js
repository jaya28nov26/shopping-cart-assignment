fetch("http://localhost:5000/categories")
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Something went wrong !");
      // return Promise.reject("Something went wrong !");
    }
  })
  .then((categorydata) => {
    console.log(categorydata);
    showCategoryData(categorydata);
  })
  .catch(function (err) {
    console.log(err);
  });
function showCategoryData(categorydata) {
  let headerData = `<img src="../static/images/logo.png" alt="Cart Logo Image" />
  <nav>
    <a href="home.html">Home</a>
    <a href="products.html">Products</a>
  </nav>
  <div class="cart-class">
    <div class="cart-register">
      <a href="sign-in.html"><span>SignIn</span></a>
      <a href="register.html"><span>Register</span></a>
    </div>
    <div class="cart-items-home" data-target="#cart-modal" data-toggle="modal">
    
      <img src="../static/images/cart.svg" alt="Cart Icon" />
      <span> 0 items</span>
    </div>
  </div>`;
  var categoriesData = "",
    footerData = "";
  for (let i = 0; i < categorydata.length; i++) {
    categoriesData += `  <div class="categories">
  <img
    src="..${categorydata[i].imageUrl}"
    alt="${categorydata[i].name}"/>

  <div>
    <h2>${categorydata[i].name}</h2>
    <p>${categorydata[i].description}</p>
    <button>Explore ${categorydata[i].name}</button>
  </div>
</div>`;
  }
  footerData = ` <p>Copyright &#169; 2011-2018 Sabka Bazaar Grocery Supplies Pvt Ltd</p>`;
  document.querySelector(
    "body"
  ).innerHTML += `<div class="modal" id="cart-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
       
        <img src="../static/images/logo.png" alt="Cart Logo Image">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="cart-hide-show"><h3 class="section-header">My Cart</h3>

      <div class="cart-items"></div>
      <div class="cart-total">
        <strong class="cart-total-title">Total</strong>
        <span class="cart-total-price">$0</span>
      </div>
      <button class="btn btn-primary btn-purchase" type="button">
        PURCHASE
      </button></div>
      </div>
     
    </div>
  </div>
  </div>`;
  // Setting innerHTML as headerdata
  document.getElementById("header_data").innerHTML = headerData;
  // Setting innerHTML as categoriesdata
  document.getElementById("categories_page").innerHTML = categoriesData;
  // Setting innerHTML as footerdata
  document.getElementById("footer-data").innerHTML = footerData;
}
