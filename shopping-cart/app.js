
const productsDOM = document.querySelector(".products-center");
const cartIcon = document.querySelector(".cart-icon")
const closeCartBtn = document.querySelector(".close-cart")
const cartShadow = document.querySelector(".cart-overlay")
const cartDisplay = document.querySelector(".cart")
const cartItemCount = document.querySelector(".cart-item-cont")
const cartValue = document.querySelector(".cart-item-cont")
const cartItems = document.querySelector(".cart-content")
const clearBtn = document.querySelector(".clear-cart")
const cartTotal = document.querySelector(".cart-total")
let cart = [];

// products
class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      // let contentful = await client.getEntries({
      //   content_type: "comfyHouseProducts"
      // });
      // console.log(contentful.items);
      // console.log(data);

      let products = data.items;
      products = products.map(item => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });


      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

//dipslay product
class UI {
  displayProducts(products){
    let items = ""
    products.forEach((product) => {
      items += `<article class="product">
            <div class="img-container">
              <img
                src="${product.image}"
                alt="product"
                class="product-img"
              />
              <button class="bag-btn" data-id="${product.id}">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>
                add to cart
              </button>
            </div>
            <h3>${product.title}</h3>
            <h4>${product.price}</h4>
          </article>`
    });
    productsDOM.innerHTML = items
  }
  getCartBtn(){
let cartBtn = [...document.querySelectorAll(".bag-btn")]
let id = 0;
cartBtn.forEach(btn =>{
  
     id = btn.dataset.id
     //get product
   
    //add item to cart
    let inCart = cart.find(item => item.id === id)
   
    if(inCart){
      btn.innerHTML = "in cart"
      btn.disabled = true
    }else{
      btn.addEventListener("click", (e) => {
        e.currentTarget.innerHTML ="in cart"
        e.currentTarget.disabled = true
        id = e.currentTarget.getAttribute("data-id")
        let cartItem = {...storage.getProduct(id), amount:1}
        cart = [...cart, cartItem];
        //add to storage
        storage.saveCart(cart)
        //display items
        this.setCartValue(cart)
        this.addCartItem(cartItem)
        this.showCart()
        this.setCartTotal(cart)
      })
    }
})

  }
  cartLogic(){
    clearBtn.addEventListener("click", () => {
      this.clearCart(cart)
    });
    cartItems.addEventListener("click", (event) =>{
      let element = event.target
      let id = element.dataset.id
      if (element.classList.contains("remove-item")){
      this.removeItem(id, element)               
      }
      else if(element.classList.contains("decrease-item") ){
      let item = cart.find(item => item.id === id)
     if (item.amount > 1){
      item.amount--
      element.nextElementSibling.textContent = item.amount
      storage.saveCart(cart)
      this.setCartTotal(cart)
      this.setCartValue(cart)
     }else{
      this.removeItem(id, element)
     }   
      }else if (element.classList.contains("increase-item")){
        let item = cart.find(item => item.id === id)
        item.amount++
        element.previousElementSibling.textContent = item.amount
        storage.saveCart(cart)
        this.setCartTotal(cart)
        this.setCartValue(cart)
      }
    })
  }
  
  showCart(){
      cartDisplay.classList.add("show-cart")
      cartShadow.classList.add("show-shadow")
    
  }
   closeCart(){
      cartDisplay.classList.remove("show-cart")
      cartShadow.classList.remove("show-shadow")
    
  }
  addCartItem(item){
    const div = document.createElement("div")
    div.className = "cart-item"
    div.innerHTML = ` <img src="${item.image}" />
              <div>
                <h4>${item.title}</h4>
                <h5>${item.price}</h5>
                <span class="remove-item" data-id ="${item.id}">remove</span>
              </div>
              <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15" class="decrease-item" data-id ="${item.id}"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
                <p class="item-amount">
                  ${item.amount}
                </p>
               <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15" class="increase-item" data-id ="${item.id}"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
              </div>`
              cartItems.appendChild(div);
  }
  setCartValue(cart){
    let amount = cart.map(item =>{
      return item.amount
    }).reduce((a,b) => a + b, 0)
    cartValue.innerHTML= amount;
  }
  clearCart(cart){
    let cartBtn = [...document.querySelectorAll(".bag-btn")]
    cartBtn.forEach(btn => {
      btn.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                       </svg> add to cart`
        btn.disabled = false;
    })
    cart.splice(0, Infinity)
    storage.saveCart(cart)
    this.setCartValue(cart)
    this.closeCart()
    this.setCartTotal(cart)
    while (cartItems.children.length > 0){
      cartItems.removeChild(cartItems.children[0])
     
    }  
  }
  removeItem(id, element){
    document.querySelectorAll(".bag-btn").forEach(btn => {
      if (btn.dataset.id === id) {
        btn.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                     </svg> add to cart`
        btn.disabled = false;
      }
     });
     let itemIndex = cart.findIndex(item => item.id === id)
    element.parentElement.parentElement.remove()
    cart.splice(itemIndex, 1)
    storage.saveCart(cart)
    this.setCartValue(cart)
    this.setCartTotal(cart)
  }
  setCartTotal(cart){
    let price = 
    cart.map(item => {
     return parseFloat(item.price) * item.amount
    })
   let totalPrice = price.reduce((a, b) => a + b, 0)
    cartTotal.innerHTML = totalPrice.toFixed(2);
  }
}
//storage
class storage {
  static saveProduct(products){
    localStorage.setItem("products", JSON.stringify(products))
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find(product => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}
//events
cartIcon.addEventListener("click", () => {
  const Ui = new UI();
  Ui.showCart()
});
closeCartBtn.addEventListener("click", () => {
  const Ui = new UI();
  Ui.closeCart()
});

document.addEventListener("DOMContentLoaded", () =>{
  const products = new Products();
  const Ui = new UI();
  products.getProducts().then(products =>{
    Ui.displayProducts(products)
    storage.saveProduct(products)
  }).then(() => {
    Ui.getCartBtn()
    Ui.showCart()
    Ui.closeCart()
    Ui.cartLogic()
   
   
  })
  

})
