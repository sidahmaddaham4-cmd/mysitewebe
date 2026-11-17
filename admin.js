const form = document.getElementById("productForm");

function products() {
return JSON.parse(localStorage.getItem("products") || "[]");
}

function saveProducts(data) {
localStorage.setItem("products", JSON.stringify(data));
}

form.addEventListener("submit", function(e) {
e.preventDefault();

const file = document.getElementById("image").files[0];

if (!file) return;

const reader = new FileReader();

reader.onload = function() {
    const list = products();

    list.push({
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        description: document.getElementById("description").value,
        image: reader.result
    });

    saveProducts(list);
    form.reset();
    displayAdminProducts();

    alert("تمت إضافة المنتج!");
};

reader.readAsDataURL(file);

});

function displayAdminProducts() {
const container = document.getElementById("adminProducts");

container.innerHTML = products().map((p, i) => `
    <div class="product">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.price} DA</p>
        <button onclick="deleteProduct(${i})">حذف</button>
    </div>
`).join("");

}

function deleteProduct(index) {
if (!confirm("هل تريد حذف هذا المنتج؟")) return;

const list = products();
list.splice(index, 1);
saveProducts(list);
displayAdminProducts();

}

function displayOrders() {
const orders = JSON.parse(localStorage.getItem("orders") || "[]");

document.getElementById("adminOrders").innerHTML =
orders.map(o => `
    <div class="product">
        <p>الزبون: ${o.name}</p>
        <p>الهاتف: ${o.phone}</p>
        <p>المنتج: ${o.product}</p>
        <p>الولاية: ${o.wilaya}</p>
        <p>البلدية: ${o.municipality}</p>
        <p>العنوان: ${o.address}</p>
        <p>الكمية: ${o.quantity}</p>
    </div>
`).join("");

}

displayAdminProducts();
displayOrders();