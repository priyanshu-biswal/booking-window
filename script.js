const services = [
  {
    id: 1,
    name: "Dry Cleaning",
    price: 200,
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Wash & Fold",
    price: 150,
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Leather Cleaning",
    price: 999,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Sofa Cleaning",
    price: 799,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80"
  }
];

let currentIndex = 0;
let cart = [];

// DOM Elements
const serviceImg = document.getElementById("service-img");
const serviceName = document.getElementById("service-name");
const servicePrice = document.getElementById("service-price");
const btnAdd = document.getElementById("btn-add");
const btnSkip = document.getElementById("btn-skip");
const cartBody = document.getElementById("cart-body");
const totalAmountEl = document.getElementById("total-amount");
const bookingForm = document.getElementById("booking-form");

function renderService() {
  if (currentIndex < services.length) {
    const current = services[currentIndex];
    serviceImg.src = current.image;
    serviceName.textContent = current.name;
    servicePrice.textContent = `₹${current.price}.00`;
  } else {
    serviceImg.src = "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80";
    serviceName.textContent = "All Services Reviewed";
    servicePrice.textContent = "—";
    btnAdd.disabled = true;
    btnSkip.disabled = true;
    btnAdd.style.opacity = "0.5";
    btnSkip.style.opacity = "0.5";
  }
}


function nextService() {
  currentIndex++;
  renderService();
}
function renderCart() {
  if (cart.length === 0) {
    cartBody.innerHTML = `
      <tr id="empty-row">
        <td colSpan="3" class="empty-msg">
          <div class="info-icon">ⓘ</div>
          <div><strong>No Items Added</strong></div>
          <small>Add items to the cart from the services bar</small>
        </td>
      </tr>
    `;
    totalAmountEl.textContent = "₹0";
    return;
  }

  cartBody.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td class="text-right">₹${item.price}.00</td>
    `;
    cartBody.appendChild(tr);
  });

  totalAmountEl.textContent = `₹${total}`;
}
btnAdd.addEventListener("click", () => {
  if (currentIndex < services.length) {
    cart.push(services[currentIndex]);
    renderCart();
    nextService();
  }
});
btnSkip.addEventListener("click", () => {
  if (currentIndex < services.length) {
    nextService();
  }
});
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (cart.length === 0) {
    alert("Please add at least one service before booking.");
    return;
  }
  const name = document.getElementById("fullname").value;
  alert(`Thank you ${name}! Your booking for ${cart.length} service(s) has been placed successfully.`);
});
renderService();