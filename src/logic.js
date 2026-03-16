document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId === "#" || !targetId.startsWith("#")) return;

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                e.preventDefault();

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // FIX: Instead of just 'this', find ALL links with this href 
                // and give them the active class.
                navLinks.forEach(nav => nav.classList.remove('active'));
                
                const identicalLinks = document.querySelectorAll(`.nav-link[href="${targetId}"]`);
                identicalLinks.forEach(matchingLink => {
                    matchingLink.classList.add('active');
                });
            }
        });
    });
});

// imgs slider
const track = document.querySelector('.image-slides');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next-button');
const prevBtn = document.querySelector('.prev-button');

let currentIndex = 0;

function updateSlider() {
    // Moves the entire row of images
    const amountToMove = -currentIndex * 100;
    track.style.transform = `translateX(${amountToMove}%)`;
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0; // Loop back to start
    }
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1; // Go to the end
    }
    updateSlider();
});

// Automatic Slide (Every 4 seconds)
setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
}, 4000);





// PREVIEW PRODUCTS LIST


let previewProducts = document.querySelectorAll(
  ".product-list-1 img, .product-list-2 img, .product-list-3 img, .product-list-4 img, .product-list-5 img, .product-list-6 img, .product-list-7 img, .product-list-8 img"
);

let previews = document.querySelectorAll(".preview-products");

previewProducts.forEach((product, index) => {
  product.addEventListener("click", (e) => {
    e.stopPropagation();

    previews.forEach(p => p.classList.remove("show"));

    if (previews[index]) {
      previews[index].classList.add("show");

      // 🔥 Buy Now button inside this preview
      let buyNowBtn = previews[index].querySelector(".preview-products-btn-unactive");

      if (buyNowBtn) {
        buyNowBtn.onclick = (ev) => {
          ev.stopPropagation();

          const productContainer = previews[index].querySelector(".preview-products-detals");

          // ✅ Grab the currently visible slider image
          const sliderImages = previews[index].querySelectorAll(".preview-products-imgs img");
          let visibleImg = Array.from(sliderImages).find(img => img.style.display === "block");
          const productImg = visibleImg?.src || sliderImages[0]?.src || "";

          const productName = productContainer.querySelector("h1")?.innerText || "Unknown Product";
          const rawPrice = productContainer.querySelector("span")?.innerText || "0";
          const productPrice = parseFloat(rawPrice.replace(/[^\d.]/g, "")) || 0;
          const productSize = productContainer.querySelector(".preview-products-detals-size button.selected")?.innerText || "M";
          const quantity = parseInt(productContainer.querySelector(".quantity")?.innerText) || 1;
          const totalCalculated = (productPrice * quantity).toFixed(2);

          // 🔥 Fill modal order info
          orderProductsPreview.innerHTML = `
            <div class="selected-product-info"
                 data-name="${productName}"
                 data-size="${productSize}"
                 data-qty="${quantity}"
                 data-total="${totalCalculated}">
              <div class="product-img-box">
                <img src="${productImg}" alt="${productName}">
              </div>
              <div class="product-details">
                <h4>${productName}</h4>
                <p><span>Size:</span> ${productSize}</p>
                <p><span>Quantity:</span> ${quantity}</p>
                <p><span>Price:</span> $${totalCalculated}</p>
              </div>
            </div>
          `;

          totalPriceEl.innerText = totalCalculated;

          // open the order modal
          orderModal.style.display = "flex";
        };
      }
    }
  });
});

previews.forEach(preview => {
  let closeBtn = preview.querySelector(".fa-delete-left");

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      preview.classList.remove("show");
    });
  }

  preview.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

document.addEventListener("click", () => {
  previews.forEach(p => p.classList.remove("show"));
});

// =========================
// PREVIEW SLIDER
// =========================
document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".preview-products-imgs");

  sliders.forEach(slider => {
    const prevBtn = slider.querySelector(".prev-btn");
    const nextBtn = slider.querySelector(".next-btn");
    const images = slider.querySelectorAll(".preview-img");
    let currentIndex = 0;

    images.forEach((img, index) => {
      img.style.display = index === 0 ? "block" : "none";
    });

    function showImage(index) {
      images.forEach(img => img.style.display = "none");
      if (images[index]) images[index].style.display = "block";
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex++;
        if (currentIndex >= images.length) currentIndex = 0;
        showImage(currentIndex);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex--;
        if (currentIndex < 0) currentIndex = images.length - 1;
        showImage(currentIndex);
      });
    }
  });
});

// =========================
// PRODUCT SIZE BUTTON
// =========================
const sizeButtons = document.querySelectorAll(".preview-products-detals-size button");

sizeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const siblingButtons = button.closest(".preview-products-detals-size").querySelectorAll("button");
    siblingButtons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
  });
});

// =========================
// PRODUCT COUNTER
// =========================
document.querySelectorAll(".quantity-counter").forEach((counter) => {
  let quantity = 1;

  const decreaseBtn = counter.querySelector(".decrease");
  const increaseBtn = counter.querySelector(".increase");
  const quantityText = counter.querySelector(".quantity");

  if (quantityText) quantityText.innerText = quantity;

  if (increaseBtn) {
    increaseBtn.addEventListener("click", () => {
      quantity++;
      if (quantityText) quantityText.innerText = quantity;
    });
  }

  if (decreaseBtn) {
    decreaseBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        if (quantityText) quantityText.innerText = quantity;
      }
    });
  }
});






// ADD TO CART SECTION

const cartOverlay = document.getElementById("cartOverlay");
const cartModal = document.getElementById("cartModal");
const closeCartBtn = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartFooter = document.getElementById("cartFooter");
const cartTotal = document.getElementById("cartTotal");

const bagIcon = document.getElementById("shoping-bag");
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");


let cart = JSON.parse(localStorage.getItem("cart")) || [];


function openCart() {
  if (cartModal) cartModal.style.display = "block";
  if (cartOverlay) cartOverlay.style.display = "block";
}


function closeCart() {
  if (cartModal) cartModal.style.display = "none";
  if (cartOverlay) cartOverlay.style.display = "none";
}


function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//UPDATE CART COUNT 
function updateCartCount() {
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  let counter = document.querySelector(".navbar-icons-p");
  if (counter) {
    counter.innerText = totalItems;
  }
}

//  UPDATE CART UI 
function updateCartUI() {
  if (!cartItemsContainer || !cartFooter || !cartTotal) return;

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart" style="font-size: 48px; margin-bottom: 15px;"></i>
        <p>Your cart is empty</p>
        <p>Add items by clicking the + icon</p>
      </div>
    `;
    cartFooter.style.display = "none";
    cartTotal.innerText = "$0.00";
    updateCartCount();
    return;
  }

  cartFooter.style.display = "block";

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
        </div>

        <div class="cart-item-details">
          <p class="cart-item-title">${item.name}</p>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>

          <div class="quantity-controls">
            <button class="quantity-btn minus-btn" data-id="${item.id}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn plus-btn" data-id="${item.id}">+</button>
            <button class="remove-item" data-id="${item.id}">Remove</button>
          </div>
        </div>
      </div>
    `;
  });

  cartTotal.innerText = `$${total.toFixed(2)}`;
  updateCartCount();
}

// ADD TO CART FUNCTION 
function addToCart(product) {
  let existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartUI();
}

//  EVENT: PLUS ICON CLICK 
addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const product = {
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: parseFloat(btn.dataset.price),
      image: btn.dataset.image,
    };

    addToCart(product);
  });
});

// EVENT: BAG ICON CLICK 
if (bagIcon) {
  bagIcon.addEventListener("click", openCart);
}

if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

//  EVENT: CART BUTTONS (PLUS/MINUS/REMOVE) 
if (cartItemsContainer) {
  cartItemsContainer.addEventListener("click", (e) => {
    let id = e.target.dataset.id;

    if (!id) return;

    // PLUS BUTTON
    if (e.target.classList.contains("plus-btn")) {
      cart = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }

    // MINUS BUTTON
    if (e.target.classList.contains("minus-btn")) {
      cart = cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    }

    // REMOVE BUTTON
    if (e.target.classList.contains("remove-item")) {
      cart = cart.filter((item) => item.id !== id);
    }

    saveCart();
    updateCartUI();
  });
}

//LOAD CART ON REFRESH
updateCartUI();





// for sign up method
const signupBtn = document.getElementById("signupBtn");
const emailInput = document.getElementById("emailInput");
const notification = document.getElementById("notification");

function showNotification(message, color = "#333") {
    notification.textContent = message;
    notification.style.background = color;
    notification.style.opacity = 1;

    setTimeout(() => {
        notification.style.opacity = 0;
    }, 3000);
}

signupBtn.addEventListener("click", () => {
    const email = emailInput.value.trim().toLowerCase();

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showNotification("Please enter a valid email.", "red");
        return;
    }

    let emails = JSON.parse(localStorage.getItem("newsletterEmails")) || [];

    if (emails.includes(email)) {
        showNotification("You already signed up!", "orange");
    } else {
        emails.push(email);
        localStorage.setItem("newsletterEmails", JSON.stringify(emails));
        showNotification("Thank you for signing up!", "green");
        emailInput.value = "";
    }
});
















// for payment form validation

// ✅ Modern Form Validation UI (Extra Layer)
const orderModal = document.getElementById("orderModal");
const closeOrder = document.getElementById("closeOrder");
const orderProductsPreview = document.querySelector(".order-products-preview");
const totalPriceEl = document.getElementById("totalPrice");
const orderForm = document.getElementById("orderForm");

// IMPORTANT: Replace this with your newest Deployment URL from Google Sheets
const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxltxKXdw2hZO9V4cXq-DiULGDK0DGoMb4SHIlu6TwpoWA2qaLhDvdrw4qGec5zEJTf/exec';


// ===============================
// 1️⃣ Quantity buttons logic
// ===============================
document.querySelectorAll(".quantity-counter").forEach((counter) => {
  const qtyText = counter.querySelector(".quantity");

  counter.addEventListener("click", (e) => {
    let val = parseInt(qtyText.innerText);

    if (e.target.classList.contains("decrease") && val > 1) {
      qtyText.innerText = val - 1;
    } else if (e.target.classList.contains("increase")) {
      qtyText.innerText = val + 1;
    }
  });
});


// ===============================
// 2️⃣ Size selection logic
// ===============================
document.querySelectorAll(".preview-products-detals-size").forEach((sizeDiv) => {
  sizeDiv.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      sizeDiv.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
    }
  });
});


// ===============================
// 3️⃣ Buy Now -> Open modal
// ===============================
document.querySelectorAll(".preview-products-btn-unactive").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const productContainer = e.target.closest(".preview-products-detals");

    const productImg = productContainer.querySelector(".preview-img")?.src || "";
    const productName = productContainer.querySelector("h1")?.innerText || "Unknown Product";
    const rawPrice = productContainer.querySelector("span")?.innerText || "0";
    const productPrice = parseFloat(rawPrice.replace(/[^\d.]/g, "")) || 0;

    const productSize =
      productContainer.querySelector(".preview-products-detals-size button.active")?.innerText || "M";

    const quantity = parseInt(productContainer.querySelector(".quantity")?.innerText) || 1;

    const totalCalculated = (productPrice * quantity).toFixed(2);

    // Insert product summary on right side
    orderProductsPreview.innerHTML = `
        <div class="selected-product-info"
             data-name="${productName}"
             data-size="${productSize}"
             data-qty="${quantity}"
             data-total="${totalCalculated}">

            <div class="product-img-box">
                <img src="${productImg}" alt="${productName}">
            </div>

            <div class="product-details">
                <h4>${productName}</h4>
                <p><span>Size:</span> ${productSize}</p>
                <p><span>Quantity:</span> ${quantity}</p>
                <p><span>Price:</span> $${totalCalculated}</p>
            </div>
        </div>
    `;

    totalPriceEl.innerText = totalCalculated;

    // open modal
    orderModal.style.display = "flex";
  });
});


// ===============================
// 4️⃣ Close modal logic
// ===============================
const closeModal = () => {
  orderModal.style.display = "none";
};

closeOrder.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
  if (e.target === orderModal) closeModal();
});


// ===============================
// ✅ MODERN FORM VALIDATION
// ===============================
function showError(input, message) {
  const group = input.closest(".form-group");

  let oldError = group.querySelector(".error-text");
  if (oldError) oldError.remove();

  const error = document.createElement("small");
  error.className = "error-text";
  error.innerText = message;
  group.appendChild(error);

  input.classList.add("input-error");
  input.classList.remove("input-success");

  input.classList.remove("shake");
  void input.offsetWidth;
  input.classList.add("shake");
}

function showSuccess(input) {
  const group = input.closest(".form-group");

  let oldError = group.querySelector(".error-text");
  if (oldError) oldError.remove();

  input.classList.remove("input-error");
  input.classList.add("input-success");
}

function validateName(name) {
  return /^[a-zA-Z\s]{3,30}$/.test(name.trim());
}

function validatePhone(phone) {
  return /^[0-9+\-\s]{8,15}$/.test(phone.trim());
}

function validateForm() {
  let valid = true;

  const fullName = document.getElementById("fullName");
  const country = document.getElementById("country");
  const town = document.getElementById("town");
  const address = document.getElementById("address");
  const phone = document.getElementById("phone");

  // Full Name
  if (!validateName(fullName.value)) {
    showError(fullName, "Enter a valid name (only letters, min 3 characters).");
    valid = false;
  } else {
    showSuccess(fullName);
  }

  // Country
  if (country.value.trim().length < 2) {
    showError(country, "Country name must be at least 2 characters.");
    valid = false;
  } else {
    showSuccess(country);
  }

  // Town
  if (town.value.trim().length < 2) {
    showError(town, "Town/City must be at least 2 characters.");
    valid = false;
  } else {
    showSuccess(town);
  }

  // Address
  if (address.value.trim().length < 8) {
    showError(address, "Address must be at least 8 characters.");
    valid = false;
  } else {
    showSuccess(address);
  }

  // Phone
  if (!validatePhone(phone.value)) {
    showError(phone, "Enter a valid phone number (8-15 digits).");
    valid = false;
  } else {
    showSuccess(phone);
  }

  return valid;
}


// ===============================
// 🔥 Remove error while typing
// ===============================
document.querySelectorAll("#orderForm input, #orderForm textarea").forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("input-error", "shake");

    const group = input.closest(".form-group");
    const oldError = group.querySelector(".error-text");
    if (oldError) oldError.remove();
  });
});


// ===============================
// 5️⃣ Submit to Google Sheet
// ===============================
orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // validate first
  if (!validateForm()) {
    return;
  }

  const productInfo = orderProductsPreview.querySelector(".selected-product-info");
  if (!productInfo) return alert("Please select a product first.");

  const formData = new FormData(orderForm);
  const params = new URLSearchParams();

  params.append("name", formData.get("fullName"));
  params.append("country", formData.get("country"));
  params.append("town", formData.get("town"));
  params.append("address", formData.get("address"));
  params.append("phone", formData.get("phone"));

  params.append("productName", productInfo.dataset.name);
  params.append("productSize", productInfo.dataset.size);
  params.append("quantity", productInfo.dataset.qty);
  params.append("totalPrice", productInfo.dataset.total);

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  })
    .then(() => {
      alert("Order submitted successfully!");
      closeModal();
      orderForm.reset();
    })
    .catch((err) => {
      alert("Error submitting order. Check console.");
      console.error(err);
    });
});
