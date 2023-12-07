const cartButton = document.querySelector(".cart-button");
const cartBadge = document.querySelector(".cart-badge");
const cartItemsList = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");

const itemsGrid = document.querySelector(".items-grid");
const wallet = document.querySelector(".wallet");

const categoryGroup = document.querySelector(".select-category");
const categoryButtons = categoryGroup.querySelectorAll(
  'input[name="category"]'
);
const sortGroup = document.querySelector(".select-sort");
const sortButtons = sortGroup.querySelectorAll('input[name="sort"]');
const removeFiltersButton = document.querySelector(".remove-filters-btn");

const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".close");
const backButton = document.querySelector(".back-btn");
const buyButton = document.querySelector(".buy-btn");

const alertModal = document.querySelector(".modal-alert");
const alertOk = document.querySelector(".close-alert-btn");
const alertText = document.querySelector(".alert-msg");
let items = [
  {
    id: 1,
    name: "jabuka",
    price: 1.1,
    category: "food",
  },
  {
    id: 2,
    name: "banana",
    price: 1.0,
    category: "food",
  },
  {
    id: 3,
    name: "naranča",
    price: 1.5,
    category: "food",
  },
  {
    id: 4,
    name: "jagoda",
    price: 1.3,
    category: "food",
  },
  {
    id: 5,
    name: "luk",
    price: 0.75,
    category: "food",
  },
  {
    id: 6,
    name: "rajčica",
    price: 0.95,
    category: "food",
  },
  {
    id: 7,
    name: "meso",
    price: 10.5,
    category: "food",
  },
  {
    id: 8,
    name: "keksi",
    price: 6.49,
    category: "food",
  },
  {
    id: 9,
    name: "coca-cola",
    price: 2.5,
    category: "drink",
  },
  {
    id: 10,
    name: "mlijeko",
    price: 2.3,
    category: "drink",
  },
  {
    id: 11,
    name: "fanta",
    price: 2.3,
    category: "drink",
  },
  {
    id: 12,
    name: "pivo",
    price: 3.2,
    category: "drink",
  },
  {
    id: 13,
    name: "majica",
    price: 15.99,
    category: "clothes",
  },
  {
    id: 14,
    name: "hlače",
    price: 23.99,
    category: "clothes",
  },
  {
    id: 15,
    name: "duksa",
    price: 29.99,
    category: "clothes",
  },
  {
    id: 16,
    name: "patike",
    price: 45.99,
    category: "shoes",
  },
  {
    id: 17,
    name: "japanke",
    price: 16.99,
    category: "shoes",
  },
];
let cart = [];
let walletAmount = 250;

function fillItemsGrid() {
  for (const item of items) {
    let itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
            <img src="./images/${item.id}.jpeg" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" id="${item.id}">DODAJ</button>
        `;
    itemsGrid.appendChild(itemElement);
  }
}

function showCategories(category) {
  const itemsinStore = document.querySelectorAll(".item");
  itemsinStore.forEach((storeItem) => {
    itemCategory = items.find(
      (item) => storeItem.querySelector("h2").innerHTML == item.name
    ).category;
    if (itemCategory == category || category == null) {
      storeItem.style.display = "flex";
    } else {
      storeItem.style.display = "none";
    }
  });
}

function sortItems(sort) {
  if (sort == "name") {
    items.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sort == "price") {
    items.sort((a, b) => a.price - b.price);
  }
  itemsGrid.innerHTML = "";
  fillItemsGrid();
  showCategories(selectedCategory);
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => addItemToCart(button.id));
  });
}

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function toggleAlert() {
  toggleModal();
  alertModal.classList.toggle("show-alert");
}

function updateTotal() {
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
  });
  cartTotal.innerHTML = `$${total.toFixed(2)}`;
}

function updateModal() {
  if (cart.length == 0) {
    let itemElement = document.createElement("li");
    itemElement.classList.add("empty-cart-msg");
    itemElement.innerHTML = "Košarica je prazna!";
    cartItemsList.appendChild(itemElement);
  } else {
    let itemElement = document.querySelector(".empty-cart-msg");
    if (itemElement) {
      cartItemsList.removeChild(itemElement);
    }
  }
}

function removeItemFromCart(id) {
  let itemElement = document.querySelector(`#i${id}`);
  cartItemsList.removeChild(itemElement);
  cart = cart.filter((item) => item.id != id);
  updateModal();
  updateTotal();
  cartBadge.innerHTML = cart.length;
}

function removeOneItem(id) {
  let item = items.find((item) => item.id == id);
  let itemElement = document.querySelector(`#i${id}`);
  if (cart.includes(item)) {
    if (parseInt(itemElement.querySelector("span").innerHTML) > 1) {
      itemElement.querySelector("span").innerHTML =
        parseInt(itemElement.querySelector("span").innerHTML) - 1;
    } else {
      removeItemFromCart(id);
    }
  }

  for (const item of cart) {
    if (item.id == id) {
      cart.splice(cart.indexOf(item), 1);
      break;
    }
  }
  updateTotal();
  cartBadge.innerHTML = cart.length;
}

function addOneItem(id) {
  let item = items.find((item) => item.id == id);
  let itemElement = document.querySelector(`#i${id}`);
  if (cart.includes(item)) {
    itemElement.querySelector("span").innerHTML =
      parseInt(itemElement.querySelector("span").innerHTML) + 1;
  }
  cart.push(item);
  updateTotal();
  cartBadge.innerHTML = cart.length;
}

function addItemToCart(id) {
  let item = items.find((item) => item.id == id);
  if (cart.includes(item)) {
    let itemElement = document.querySelector(`#i${id}`);
    itemElement.querySelector("span").innerHTML =
      parseInt(itemElement.querySelector("span").innerHTML) + 1;
  } else {
    let itemElement = document.createElement("li");
    itemElement.classList.add("cart-item");
    itemElement.id = `i${item.id}`;
    itemElement.innerHTML = `
            <img src="./images/${item.id}.jpeg" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <p><button class="remove-one" id="${item.id}"><i class="fa-solid fa-square-minus"></i></button><span>1</span><button class="add-one" id="${item.id}"><i class="fa-solid fa-square-plus"></i></button></p>
            <button class="remove-from-cart-btn" id="${item.id}"><i class="fa-solid fa-trash"></i></button>
        `;
    cartItemsList.appendChild(itemElement);

    const removeButtons = document.querySelectorAll(".remove-from-cart-btn");
    removeButtons.forEach((button) => {
      if (button.id == id) {
        button.addEventListener("click", () => removeItemFromCart(button.id));
      }
    });
    const removeOneButtons = document.querySelectorAll(".remove-one");
    removeOneButtons.forEach((button) => {
      if (button.id == id) {
        button.addEventListener("click", () => removeOneItem(button.id));
      }
    });
    const addOneButtons = document.querySelectorAll(".add-one");
    addOneButtons.forEach((button) => {
      if (button.id == id) {
        button.addEventListener("click", () => addOneItem(button.id));
      }
    });
  }
  cart.push(item);
  updateModal();
  updateTotal();
  cartBadge.innerHTML = cart.length;
}

function buyItems() {
  if (cart.length == 0) {
    alertText.innerHTML = "Košarica je prazna!";
    return;
  }
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
  });
  if (total > walletAmount) {
    alertText.innerHTML = "Nemate dovoljno novca!";
    return;
  }
  walletAmount -= total;
  wallet.innerHTML = `$${walletAmount.toFixed(2)}`;
  cart = [];
  cartItemsList.innerHTML = "";
  updateModal();
  updateTotal();
  cartBadge.innerHTML = cart.length;
  alertText.innerHTML = "Kupovina uspješna!";
}

function onCategoryChange(event) {
  selectedCategory = event.target.value;
  showCategories(selectedCategory);
}

function onSortChange(event) {
  selectedSort = event.target.value;
  sortItems(selectedSort);
}

function removeFilters() {
  selectedCategory = null;
  selectedSort = "price";
  categoryButtons.forEach((categoryButton) => {
    categoryButton.checked = false;
  });
  sortButtons.forEach((sortButton) => {
    sortButton.checked = false;
  });
  sortButtons[0].checked = true;
  sortItems(selectedSort);
}

var selectedCategory;
var selectedSort = "price";

sortItems(selectedSort);

wallet.innerHTML = `$${walletAmount.toFixed(2)}`;

categoryButtons.forEach(function (categoryButton) {
  categoryButton.addEventListener("change", onCategoryChange);
});
sortButtons.forEach(function (sortButton) {
  sortButton.addEventListener("change", onSortChange);
});

buyButton.addEventListener("click", buyItems);
cartButton.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);
backButton.addEventListener("click", toggleModal);

buyButton.addEventListener("click", toggleAlert);
alertOk.addEventListener("click", toggleAlert);
