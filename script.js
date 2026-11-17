const wilayas = [
"أدرار","الشلف","الأغواط","أم البواقي","باتنة","بجاية","بسكرة","بشار","البليدة","البويرة",
"تمنراست","تبسة","تلمسان","تيارت","تيزي وزو","الجزائر","الجلفة","جيجل","سطيف","سعيدة",
"سكيكدة","سيدي بلعباس","عنابة","قالمة","قسنطينة","المدية","مستغانم","المسيلة","معسكر","ورقلة",
"وهران","البيض","إليزي","برج بوعريريج","بومرداس","الطارف","تندوف","تيسمسيلت","الوادي","خنشلة",
"سوق أهراس","تيبازة","ميلة","عين الدفلى","النعامة","عين تموشنت","غرداية","غليزان",
"تيميمون","برج باجي مختار","أولاد جلال","بني عباس","عين صالح","عين قزام","تقرت","جانت",
"المغير","المنيعة","آفلو","بريكة","قصر الشلالة","مسعد","عين وسارة","بوسعادة","الأبيض سيدي الشيخ",
"القنطرة","بئر العاتر","العريشة"
];

const wilayaSelect = document.getElementById("wilaya");

wilayas.forEach((name, index) => {
const option = document.createElement("option");
option.value = name;
option.textContent = "${index + 1} - ${name}";
wilayaSelect.appendChild(option);
});

function getProducts() {
return JSON.parse(localStorage.getItem("products") || "[]");
}

function displayProducts() {
const container = document.getElementById("products");
const products = getProducts();

container.innerHTML = "";

products.forEach((product, index) => {
    container.innerHTML += `
    <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description || ""}</p>
        <div class="price">${product.price} DA</div>
        <button onclick="orderProduct(${index})">اطلب الآن</button>
    </div>`;
});

if (!products.length) {
    container.innerHTML = "<p>لا توجد منتجات حاليا.</p>";
}

}

function orderProduct(index) {
const product = getProducts()[index];
document.getElementById("productName").value = product.name;
document.getElementById("orderSection").scrollIntoView({behavior:"smooth"});
}

document.getElementById("orderForm").addEventListener("submit", function(e) {
e.preventDefault();

const order = {
    product: document.getElementById("productName").value,
    name: document.getElementById("customerName").value,
    phone: document.getElementById("phone").value,
    wilaya: document.getElementById("wilaya").value,
    municipality: document.getElementById("municipality").value,
    address: document.getElementById("address").value,
    quantity: document.getElementById("quantity").value,
    size: document.getElementById("size").value,
    color: document.getElementById("color").value
};

const orders = JSON.parse(localStorage.getItem("orders") || "[]");
orders.push(order);
localStorage.setItem("orders", JSON.stringify(orders));

alert("تم تسجيل طلبك بنجاح!");
this.reset();

});

displayProducts();