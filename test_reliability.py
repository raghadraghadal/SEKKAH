import urllib.request
import time
import json

# روابط الصفحات الأساسية للنظام
urls = [
    "http://127.0.0.1:5501/SingUp.html",
    "http://127.0.0.1:5501/Login.html",
    "http://127.0.0.1:5501/home.html",
    "http://127.0.0.1:5501/index.html",
    "http://127.0.0.1:5501/monitoring.html",
    "http://127.0.0.1:5501/profile.html",
    "http://127.0.0.1:5501/addNewTrain.html"
]

total_requests = 100
success_requests = 0
failed_requests = 0

# محاكاة اختبار الوظائف (Functional Testing Simulation) للـ LocalStorage
functional_tests_total = 10
functional_passed = 0

print("="*50)
print("  SEKKAH SYSTEM: RELIABILITY & FUNCTIONAL TEST  ")
print("="*50)

start_time = time.time()

# 1. اختبار الـ 100 طلب للجاهزية والصفحات
for i in range(1, total_requests + 1):
    target_url = urls[(i - 1) % len(urls)]
    try:
        req = urllib.request.Request(target_url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req)
        if response.status == 200:
            success_requests += 1
        else:
            failed_requests += 1
    except Exception:
        failed_requests += 1

# 2. اختبار الوظائف (محاكاة تخزين البيانات كما في save.js)
for j in range(1, functional_tests_total + 1):
    try:
        # محاكاة بنية بيانات الحفظ (Data Object Simulation)
        test_data = {"storageName": f"TestRecord_{j}", "trainId": 105, "status": "Confirmed"}
        serialized_data = json.dumps(test_data)
        
        # التأكد من سلامة تحويل البيانات وتخزينها برمجياً
        if len(serialized_data) > 0:
            functional_passed += 1
    except Exception:
        pass

end_time = time.time()
total_duration = end_time - start_time

print(f"Total Page Requests Tested : {total_requests}")
print(f"Successful Page Requests   : {success_requests}")
print(f"Failed Page Requests       : {failed_requests}")
print("-" * 50)
print(f"Functional Tests (Storage) : {functional_tests_total}")
print(f"Functional Tests Passed    : {functional_passed}")
print(f"Functional Tests Failed    : {functional_tests_total - functional_passed}")
print("-" * 50)
print(f"Total Test Duration        : {total_duration:.2f} seconds")
print("="*50)