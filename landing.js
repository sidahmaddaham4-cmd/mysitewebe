const params = new URLSearchParams(window.location.search);
const productIndex = Number(params.get("id"));

const productList = JSON.parse(
    localStorage.getItem("products") || "[]"
);

const product = productList[productIndex];

const landing = document.getElementById("landingProduct");

if (!product || !landing) {

    landing.innerHTML = "<h2>المنتج غير موجود</h2>";

} else {

    document.title = product.name;

    landing.innerHTML = `
        <div class="product">

            <img src="${product.image}" alt="${product.name}">

            <h2>${product.name}</h2>

            <p>${product.description || ""}</p>

            <h2 class="price">${product.price} DA</h2>

            <button onclick="document.getElementById('customerName').focus()">
                اطلب الآن
            </button>

        </div>
    `;

    document.getElementById("landingOrderForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const order = {
            id: Date.now(),
            product: product.name,
            price: Number(product.price),
            name: document.getElementById("customerName").value,
            phone: document.getElementById("phone").value,
            wilaya: document.getElementById("wilaya").value,
            municipality: document.getElementById("municipality").value,
            address: document.getElementById("address").value,
            quantity: Number(document.getElementById("quantity").value),
            size: document.getElementById("size").value,
            color: document.getElementById("color").value,
            status: "جديد"
        };

        const orders = JSON.parse(
            localStorage.getItem("orders") || "[]"
        );

        orders.push(order);

        localStorage.setItem("orders", JSON.stringify(orders));

        alert("تم تسجيل طلبك بنجاح!");

        this.reset();
    });
}