// STORE 🛍


const loremDescription =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, quae consequuntur molestias minima fugiat accusamus iure a iusto laudantium architecto iste ad obcaecati voluptatum itaque! Qui optio eius blanditiis impedit.";

const store = [
  {
    id: "product 1",
    title: "Cepillo sónico 1",
    price: "$1500",
    image: "img/sonico.jpg",
    cant:0,
    description: loremDescription
  },
  {
    id: "product 2",
    title: "Cepillo sónico 2",
    price: "$1.300",
    image: "img/sonico.jpg",
    cant:0,
    description: loremDescription
  },
  {
    id: "product 3",
    title: "Cepillo sónico 3",
    price: "$1.100",
    image: "img/sonico.jpg",
    cant:0,
    description: loremDescription
  },
  {
    id: "product 4",
    title: "Cepillo sónico 4",
    price: "$1.550",
    image: "img/sonico.jpg",
    cant:0,
    description: loremDescription
  },
];




// GENERAR PRODUCTOS EN EL STORE-------------------------------------------------------------

const divProducts = document.querySelector('#divProducts');

function generarStore(){
  store.forEach((cepillo)=> {
    let storeElement = document.createElement ('div');
    storeElement.innerHTML = 

    `<div class= "products_store">
      <div class="store-item col-lg-6" id="product">
        <img class="cart-image" src="${cepillo.image}" alt="cepillo sónico">
        <hr>
        <h3 class="title">${cepillo.title}</h3>
        <h4>${cepillo.description}</h4>
        <div class="row d-flex justify-content-between d-flex align-items-center">
          <h4 class="price" > ${cepillo.price} </h4>
          <button id="cart_btn" class="boton cart-btn" type="button"><i class="fas fa-shopping-cart"></i> </button>
        </div>
      </div>
    </div>`;
    divProducts.appendChild(storeElement);
    

  });

}

generarStore();


// END STORE 🛍




// DESPLEGAR EL CART HACIENDO CLICK EN EL CARRITO  -----------------
  
const btnToggle = document.querySelector('.toggle-btn');

btnToggle.addEventListener('click', function (){
    document.getElementById('sidebar').classList.toggle('active');

});



// CARRITO------------------------------------------

let products = [
  {
    name: 'Cepillo 1',
    tag: 'cepillo1',
    price: 1500,
    image: "img/sonico.jpg",
    inCart: 0,
    
  },
  {
    name: 'Cepillo 2',
    tag: 'cepillo2',
    price: 1300,
    image: "img/sonico.jpg",
    inCart: 0,
    
  },
  {
    name: 'Cepillo 3',
    tag: 'cepillo3',
    price: 1100,
    image: "img/sonico.jpg",
    inCart: 0,
  },
  {
    name: 'Cepillo 4',
    tag: 'cepillo4',
    price: 1550,
    image: "img/sonico.jpg",
    inCart: 0,
  }

]



//AGREGAR PRODUCTOS SELECCIONANDO EL BOTON CARRITO DEL STORE 

let cartBtn = document.querySelectorAll ('#cart_btn');


for (let i=0; i < cartBtn.length; i++){
  cartBtn[i].addEventListener('click', ()=>{
    cartNumbers(products[i]);
    totalCost(products[i])
  })
}


//AGREGAR PRODUCTOS AL LOCAL STORAGE 

function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem ('cartNumbers');

  if (productNumbers){
    document.querySelector ('.cart-items-n').textContent = productNumbers

  }

}



function cartNumbers(product){
  //console.log ("the product clicked is", product);
  let productNumbers = localStorage.getItem ('cartNumbers');
  //console.log (productNumbers);
  //console.log(typeof productNumbers);

  // para parsearlos de string a numero
  productNumbers = parseInt (productNumbers);
  //console.log(typeof productNumbers);

  if(productNumbers) {
    localStorage.setItem ('cartNumbers', productNumbers + 1);
    
    document.querySelector ('.cart-items-n').textContent = productNumbers + 1;
    

    
  }else {
    localStorage.setItem ('cartNumbers', 1);
    document.querySelector ('.cart-items-n').textContent = 1;
  }

  setItems(product);

}



function setItems(product) {
  //console.log ("inside of setItems function");
  //console.log ("my product is", product);
  
  let cartItems = localStorage.getItem ('productsInCart');
  cartItems = JSON.parse(cartItems);
  //console.log ("my cartItems are", cartItems);

  if(cartItems != null) {

    if(cartItems [product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems [product.tag].inCart += 1 ;
  }  else {
    product.inCart = 1;
    cartItems = {
      [product.tag]:product
    }

  }
  localStorage.setItem ("productsInCart", JSON.stringify (cartItems));
  

}


// SUMAR TOTAL PRODUCTOS EN EL LOCAL STORAGE

function totalCost(product){
  //console.log ('the product price is', product.price);
  let cartCost = localStorage.getItem('totalCost');
  

  console.log ('my cartCost is',cartCost);
  console.log(typeof cartCost);

  if(cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost',cartCost + product.price);
  }else {
    localStorage.setItem('totalCost',product.price);

  }
  displayCart ();
}


// INSERTAR EN EL CART LOS PRODUCTOS DEL LOCAL STORAGE 


const divDisplayCart = document.querySelector ('#displayCart');
let divemptyCart = document.querySelector ('#emptyCart');



function displayCart () {
  //Traigo los products del LS
  let cartItems = localStorage.getItem ('productsInCart');
  // Lo convierto de JSON A JS 
  cartItems = JSON.parse(cartItems);
  

  let divProductContainer = document.querySelector ('#contenedor_cart');

  let cartCost = localStorage.getItem('totalCost');

  if (cartItems && divProductContainer) {
    //console.log('running')
    divProductContainer.innerHTML = '';
    

    Object.values (cartItems).map (item => {

    
      divProductContainer.innerHTML += `
      <div class= "cart-content">

        <div class="row d-flex justify-content-between d-flex align-items-center">
          
          <i id="eliminar" class="fas fa-window-close"></i>
        
          <img class="col-lg-4 col-md-5 col-sm-5" src= ${item.image}>
        
          <span>${item.name}</span>
          <div class= "price">$ ${item.price},00</div>

          <div class= "quantity">
            <i class="fas fa-chevron-up"></i>
            <P clss= "item-amount">${item.inCart}</P>
            <i class="fas fa-chevron-down" data-id=${item.tag}></i> 
          </div>

      </div>`;

    
    });
    
    divProductContainer.innerHTML += `
    <div id= "total_cart" class="cart-footer">
      <h3 class="cart-total"> Total: $${cartCost},00 </h3>
      <button class="clear-cart banner-btn">Vaciar carrito</button>
    </div>` ;
    

  } else{
    let emptyCarrito = document.createElement ('div')
    emptyCarrito.innerHTML = `
    <div> 
      <h5 class="empty_cart">Tu carrito está vacío!!!</h5>
    </div>
    `
    divemptyCart.appendChild (emptyCarrito);
      
  }
   
  //console.log(cartItems);
 
}


displayCart();
onLoadCartNumbers();

















