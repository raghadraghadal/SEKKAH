// دالة عامة للحفظ تستخدمها كل الصفحات
function saveData(storageName, dataObject) {

    // نحفظ البيانات في LocalStorage
    localStorage.setItem(storageName, JSON.stringify(dataObject));

    // رسالة تأكيد
    alert("Data saved successfully!");
}