// ELEMENTLARNI TANLASH

const searchInput = document.getElementById("searchInput");

const filters = document.getElementById("filters");

const cards = [...document.querySelectorAll(".product-card")];

const noResults = document.getElementById("noResults");

const cartCount = document.getElementById("cartCount");

const toast = document.getElementById("toast");

const menuToggle = document.getElementById("menuToggle");

const nav = document.getElementById("nav");

// O'ZGARUVCHILAR

let activeCategory = "all";

let cart = 0;

let toastTimer;

// SEARCH VA FILTER

function filterProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("uz");

  let visible = 0;

  cards.forEach((card) => {
    const categoryMatch =
      activeCategory === "all" || card.dataset.category === activeCategory;

    const nameMatch = card.dataset.name.toLocaleLowerCase("uz").includes(query);

    const show = categoryMatch && nameMatch;

    card.hidden = !show;

    if (show) {
      visible++;
    }
  });

  // Mahsulot topilmasa xabar chiqarish

  noResults.hidden = visible !== 0;
}

// FILTER TUGMALARI

filters.addEventListener("click", function (event) {
  const button = event.target.closest(".filter");

  if (!button) return;

  // Eski active classni o'chirish

  document.querySelector(".filter.active")?.classList.remove("active");

  // Yangi tugmaga active berish

  button.classList.add("active");

  // Kategoriyani olish

  activeCategory = button.dataset.category;

  // Mahsulotlarni filtrlash

  filterProducts();
});

// SEARCH INPUT

searchInput.addEventListener("input", function () {
  filterProducts();
});

// SAVATGA QO'SHISH

document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", function () {
    cart++;

    cartCount.textContent = cart;

    showToast("Mahsulot savatga qo‘shildi!");
  });
});

// TOAST XABARNOMA

function showToast(message) {
  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2300);
}

// MOBILE MENU

menuToggle.addEventListener("click", function () {
  nav.classList.toggle("open");
});

// MENYUDAGI LINK BOSILGANDA YOPILISHI

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", function () {
    nav.classList.remove("open");
  });
});

// EMAIL OBUNA

document
  .getElementById("newsletterForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    showToast("Rahmat! Obunangiz qabul qilindi.");

    event.target.reset();
  });
