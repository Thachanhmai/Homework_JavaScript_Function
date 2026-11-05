/**
 * Bài 2: Tính tiền điện
 * 
 * * Input: Nhập vào thông tin sau:
 *    - Tên
 *    - Số điện tiêu thụ (Số Kw)
 * * Process: Tính tiền điện dựa trên số Kw tiêu thụ theo quy tắc sau:
 *   - Bậc 1: 50 Kw đầu tiên: 500đ/Kw
 *   - Bậc 2: 50 Kw tiếp theo: 650đ/Kw
 *   - Bậc 3: 100 Kw tiếp theo: 850đ/Kw
 *   - Bậc 4: 150 Kw tiếp theo: 1100đ/Kw
 *   - Bậc 5: 200 Kw trở lên: 1300đ/Kw
 * 
 * * Output: In ra tên và số tiền điện phải trả
 */

// Function tính tiền điện theo từng bậc
function tinhTienTheoBac(soKw) {
    let tienDien = 0;

    if (soKw <= 50) {
        tienDien = soKw * 500;
    }
    else if (soKw <= 100) {
        tienDien = 50 * 500 + (soKw - 50) * 650;
    }
    else if (soKw <= 200) {
        tienDien = 50 * 500 + 50 * 650 + (soKw - 100) * 850;
    }
    else if (soKw <= 350) {
        tienDien = 50 * 500 + 50 * 650 + 100 * 850
            + (soKw - 200) * 1100;
    }
    else {
        tienDien = 50 * 500 + 50 * 650 + 100 * 850
            + 150 * 1100 + (soKw - 350) * 1300;
    }

    return tienDien;
}

// Function tính tiền điện
function tinhTienDien() {

    // Lấy dữ liệu từ HTML
    const customerName = document.getElementById("customerName").value.trim();

    const electricity = document.getElementById("electricity").value;

    const result = document.getElementById("result");

    // Kiểm tra phần tử HTML
    if (!result) {
        alert("Không tìm thấy thẻ hiển thị kết quả có id='result'!");
        return;
    }

    // Kiểm tra dữ liệu nhập
    if (customerName === "" || electricity === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    // Chuyển số điện sang kiểu Number
    const soKw = Number(electricity);

    if (!Number.isFinite(soKw) || soKw < 0) {
        alert("Số điện tiêu thụ không hợp lệ!");
        return;
    }

    // Tính tiền điện
    const tongTien = tinhTienTheoBac(soKw);

    // Hiển thị kết quả trên website
    result.hidden = false;
    result.classList.remove("hidden");
    result.style.display = "block";

    result.className = "mt-6 p-5 rounded-lg bg-green-100 text-green-700";

    result.innerHTML = `
        <h2 class="text-xl font-bold mb-4">
            KẾT QUẢ TÍNH TIỀN ĐIỆN
        </h2>

        <p class="mb-2">
            <strong>Tên khách hàng:</strong> ${escapeHTML(customerName)}
        </p>

        <p class="mb-2">
            <strong>Số điện tiêu thụ:</strong> ${soKw} Kw
        </p>

        <p class="text-lg font-bold mt-3">
            Tổng tiền điện:
            ${tongTien.toLocaleString("vi-VN")} VNĐ
        </p>
    `;
}

// Function xử lý nội dung HTML
function escapeHTML(text) {
    return text.replace(/[&<>"']/g, function (char) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[char];
    });
}

// Đưa hàm ra phạm vi toàn cục để onclick trong HTML có thể gọi được.
window.tinhTienDien = tinhTienDien;