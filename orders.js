function getOrders() {
    return JSON.parse(
        localStorage.getItem("orders") || "[]"
    );
}

function saveOrders(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
}

function displayOrders() {

    const container = document.getElementById("adminOrders");

    if (!container) return;

    const orders = getOrders();

    container.innerHTML = orders.map((order, index) => `

        <div class="product">

            <h3>طلب رقم ${index + 1}</h3>

            <p>الزبون: ${order.name}</p>

            <p>الهاتف: ${order.phone}</p>

            <p>المنتج: ${order.product}</p>

            <p>الولاية: ${order.wilaya}</p>

            <p>البلدية: ${order.municipality}</p>

            <p>العنوان: ${order.address}</p>

            <p>الكمية: ${order.quantity}</p>

            <p>المقاس: ${order.size}</p>

            <p>اللون: ${order.color}</p>

            <p>الحالة: ${order.status || "جديد"}</p>

            <button onclick="changeStatus(${index})">
                تغيير الحالة
            </button>

            <button onclick="deleteOrder(${index})">
                حذف الطلب
            </button>

            <a href="https://wa.me/${String(order.phone).replace(/\\D/g,'')}"
            target="_blank">
                واتساب
            </a>

        </div>

    `).join("");
}

function changeStatus(index) {

    const orders = getOrders();

    const status = prompt(
        "أدخل الحالة: جديد / مؤكد / مشحون / مكتمل / ملغي"
    );

    if (!status) return;

    orders[index].status = status;

    saveOrders(orders);

    displayOrders();
}

function deleteOrder(index) {

    if (!confirm("هل تريد حذف الطلب؟")) return;

    const orders = getOrders();

    orders.splice(index, 1);

    saveOrders(orders);

    displayOrders();
}

displayOrders();