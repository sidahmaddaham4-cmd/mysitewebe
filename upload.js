function uploadImage(file) {
    return new Promise((resolve, reject) => {
        if (!file || !file.type.startsWith("image/")) {
            reject("الملف ليس صورة");
            return;
        }

        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject("فشل رفع الصورة");

        reader.readAsDataURL(file);
    });
}