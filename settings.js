const settingsForm = document.getElementById("settingsForm");

const savedSettings = JSON.parse(
    localStorage.getItem("storeSettings") || "{}"
);

document.getElementById("storeName").value =
    savedSettings.name || "SIDO STORE";

document.getElementById("whatsappNumber").value =
    savedSettings.whatsapp || "";

document.getElementById("logoPreview").src =
    savedSettings.logo || "";

settingsForm.addEventListener("submit", async function(e) {

    e.preventDefault();

    const name = document.getElementById("storeName").value;

    const whatsapp = document.getElementById("whatsappNumber").value;

    const file = document.getElementById("storeLogo").files[0];

    let logo = savedSettings.logo || "";

    if (file) {

        logo = await new Promise((resolve, reject) => {

            const reader = new FileReader();

            reader.onload = () => resolve(reader.result);

            reader.onerror = reject;

            reader.readAsDataURL(file);

        });

    }

    const settings = {
        name,
        whatsapp,
        logo
    };

    localStorage.setItem(
        "storeSettings",
        JSON.stringify(settings)
    );

    alert("تم حفظ إعدادات المتجر بنجاح!");

});