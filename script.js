// custom slider
const carousel = document.querySelector(".mycarousel"),
  firstImg = carousel.querySelectorAll(".slider-image")[0],
  arrowIcons = document.querySelectorAll(".slider-wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
  // showing and hiding prev/next icon according to carousel scroll left value
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
    // if clicked icon is left, reduce width value from the carousel scroll left else add to it
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
  });
});

const autoSlide = () => {
  // if there is no image left to scroll then return from here
  if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

  positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
  let firstImgWidth = firstImg.clientWidth + 14;
  // getting difference value that needs to add or reduce from carousel left to take middle img center
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
    return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  }
  // if user is scrolling to the left
  carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
  // updatating global variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  // scrolling images/carousel to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
}

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);
// 

let signupBtn = document.getElementById('signupBtn');
let signinBtn = document.getElementById('signinBtn');
let nameField = document.getElementById('nameField');
let title = document.getElementById('title');

signinBtn.onclick = function () {
  nameField.style.maxHeight = "0";
  title.innerHTML = "Sign In";
  signupBtn.classList.add("disable");
  signinBtn.classList.remove("disable");
}

signupBtn.onclick = function () {
  nameField.style.maxHeight = "60px";
  title.innerHTML = "Sign Up";
  signupBtn.classList.remove("disable");
  signinBtn.classList.add("disable");

}


// form
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let flag = 1;

function validateForm() {
  if (username.value === "") {
    document.getElementById('userError').innerHTML = "User Name is empty";
    flag = 0;
  }
  else if (username.value.length < 3) {
    document.getElementById('userError').innerHTML = "User Name require min 3 char";
    flag = 0;
  }
  else {
    document.getElementById('userError').innerHTML = "";
    flag = 1;
  }
  if (password.value == "") {
    document.getElementById('passerror').innerHTML = "Password is empty";
    flag = 0;
  }
  else {
    document.getElementById('passerror').innerHTML = "";
    flag = 1;
  }
  if (flag) {
    return true;
  } else {
    return false;
  }
}
//add to cart
const products = [
  {
    id: 1,
    name: "hp core i7",
    category: "Laptop",
    price: " 50,000",
    img: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08473512.png?impolicy=Png_Res&imwidth=270&imdensity=1",
  },
  {
    id: 2,
    name: "Best Gaming Phones 2024",
    category: "Smartphone",
    price: "75,000",
    img: "https://st1.techlusive.in/wp-content/uploads/2023/08/174b221d-068c-4184-8c6e-56c15abb1e91.webp",
  },
  {
    id: 3,
    name: "Official Huawei FreeBuds Studio Wireless Headphones",
    category: "Headphones",
    price: "42,999",
    img: "https://i0.wp.com/sparrowsnews.com/wp-content/uploads/2020/10/wp-1603389534218..jpg?resize=659%2C575&ssl=1",
  },
  {
    id: 4,
    name: "SAMSUNG Galaxy Tab S6 Lite 10.4 64GB",
    category: "Tablet",
    price: "199.9",
    img: "https://images.olx.com.pk/thumbnails/413225580-600x450.jpeg",
  },
  {
    id: 5,
    name: "Microsoft Surface Laptop 5 Core i7 ",
    category: "Laptop",
    price: "474,999 ",
    img: "https://static3.webx.pk/files/4012/Images/1-4012-1657301-020123013452850.jpg",
  },
  {
    id: 6,
    name: "HP Notebook 15",
    category: "Laptop",
    price: " 45,999.00 ",
    img: "https://laptops.qeemat.com/images/hp/hp-15-notebook-price.jpg",
  },
];

let productSection = document.querySelector(".product-section");

function searchItem(products, itemToSearch) {
  let item = itemToSearch.toLowerCase();
  let result = products.filter((e) => {
    let productName = e.category.toLowerCase();

    return productName.includes(item);
  });
  return result;
}


// let result = searchItem(products, "Laptop");
//   console.log(result);


function generateProductCard(product) {
  return `
  <div class="product-card">
    <img class="product-image" src="${product.img}" alt="${product.name}">
    <div class="product-info"  pid='${product.id}'  pname='${product.name}' pprice='${product.price}'  pimg='${product.img}'>
      <div class="product-title">${product.name}</div>
      <div class="product-price" >${product.price} PKR</div>
      <button class="btn" onclick="addToCart(this)">Add to cart</button>

    </div>
  </div>
`;
}

let productCardsHTML;

productCardsHTML = products.map(generateProductCard).join("");
productSection.innerHTML = productCardsHTML;

function handleSearch(searchTerm) {
  let searchResult = searchItem(products, searchTerm);
  if (searchResult.length > 0) {
    productCardsHTML = searchResult.map(generateProductCard).join("");
    productSection.innerHTML = productCardsHTML;
  } else {
    productSection.innerHTML = `<div class='no-match'>no match Found ...</div>`;

  }
}



/////////////////////////////// add to cart /////////////////////////////
let cartItems = [];

const addToCart = (e) => {

  // console.log(e.parentNode.parentNode);
  const itemName = e.parentNode.getAttribute('pname');
  const itemPrice = e.parentNode.getAttribute('pprice');
  const itemImg = e.parentNode.getAttribute('pimg');
  const itemId = e.parentNode.getAttribute('pid');

  const existingItem = cartItems.find(product => product.pid == itemId);

  if (existingItem) {
    existingItem.quantity += 1;
    createCart(cartItems);
  } else {
    cartItems.push({ name: itemName, price: itemPrice, img: itemImg, pid: itemId, quantity: 1 });
    document.getElementById('cartLength').innerHTML = cartItems.length;
    createCart(cartItems);
  }

  // console.log(cartItems);
}


function removeCartItem(itemId) {
  const itemIndex = cartItems.findIndex(item => item.pid == itemId);

  if (itemIndex !== -1) {
    const removedItem = cartItems.splice(itemIndex, 1)[0];
    createCart(cartItems);

    document.getElementById('cartLength').innerHTML = cartItems.length;
    const total = calculateCartTotal(cartItems);
    document.getElementById('cartTotal').innerHTML = total.toFixed(2);

    // console.log(`Removed item: ${removedItem.name}`);
  }
}

function increaseQuantity(itemId) {
  const cartItem = cartItems.find(item => item.pid == itemId);
  if (cartItem) {
    cartItem.quantity += 1;
    createCart(cartItems);
  }
}

function decreaseQuantity(itemId) {
  const cartItem = cartItems.find(item => item.pid == itemId);
  if (cartItem && cartItem.quantity > 1) {
    cartItem.quantity -= 1;
    createCart(cartItems);
  }
}

function calculateCartTotal(items) {
  let total = 0;
  items.forEach((item) => {
    total += parseFloat(item.price.replace(',', '')) * item.quantity;
  });
  return total;
}

function createCart(items) {
  document.getElementById('cart-body').innerHTML = items.map((e, i) => {
    // console.log(e);

    return `

      <div class="cartItem">
        <img
          src= '${e.img}'
          alt="${e.name}"
        />

        <div class="cartItemDetail">
          <h3>${e.name}</h3>
          <h3>${e.price} PKR</h3>
          <b> 
          <button class="smBtn increaseBtn" onclick="increaseQuantity('${e.pid}')">+</button>
           qty: ${e.quantity}
           <button class="smBtn decreaseBtn" onclick="decreaseQuantity('${e.pid}')">-</button>
           </b>
           <button class=" removeBtn" onclick="removeCartItem('${e.pid}')">X</button>

        </div>
        </div>
`
  })
  const total = calculateCartTotal(items);
  document.getElementById('cartTotal').innerHTML = total.toFixed(2);

}




function clearCart() {
  cartItems.length = 0;
  createCart(cartItems);
}
function toggleCart() {
  document.getElementById('cart').style.display = 'block'
}
function closeBtn() {
  document.getElementById('cart').style.display = 'none'
}