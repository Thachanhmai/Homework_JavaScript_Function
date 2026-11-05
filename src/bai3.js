
/**
 * Bài 3: Tính Thuế Thu Nhập Cá Nhân
 *
 * Input:
 * - Họ tên
 * - Tổng thu nhập năm
 * - Số người phụ thuộc
 *
 * Process:
 * - Thu nhập chịu thuế = Tổng thu nhập năm
 *   - 4 triệu - Số người phụ thuộc * 1.6 triệu
 *
 * - Tính thuế theo từng bậc:
 *   Đến 60 triệu: 5%
 *   Trên 60 đến 120 triệu: 10%
 *   Trên 120 đến 210 triệu: 15%
 *   Trên 210 đến 384 triệu: 20%
 *   Trên 384 đến 624 triệu: 25%
 *   Trên 624 đến 960 triệu: 30%
 *   Trên 960 triệu: 35%
 *
 * Output:
 * - Họ tên
 * - Thu nhập chịu thuế
 * - Tổng thuế phải trả
 */

// Function tính thu nhập chịu thuế
function tinhThuNhapChiuThue(tongThuNhap, soNguoiPhuThuoc) {

    let thuNhapChiuThue =
        tongThuNhap - 4 - soNguoiPhuThuoc * 1.6;

    if (thuNhapChiuThue < 0) {
        thuNhapChiuThue = 0;
    }

    return thuNhapChiuThue;
}

// Function tính thuế theo từng bậc
function tinhThueTheoBac(thuNhapChiuThue) {

    let tienThue = 0;
    let mocTruoc = 0;

    const cacBacThue = [
        { muc: 60, thueSuat: 0.05 },
        { muc: 120, thueSuat: 0.10 },
        { muc: 210, thueSuat: 0.15 },
        { muc: 384, thueSuat: 0.20 },
        { muc: 624, thueSuat: 0.25 },
        { muc: 960, thueSuat: 0.30 },
        { muc: Infinity, thueSuat: 0.35 }
    ];

    for (let i = 0; i < cacBacThue.length; i++) {

        let mucHienTai = cacBacThue[i].muc;
        let thueSuat = cacBacThue[i].thueSuat;

        let thuNhapTrongBac = Math.min(
            thuNhapChiuThue,
            mucHienTai
        ) - mocTruoc;

        if (thuNhapTrongBac > 0) {
            tienThue += thuNhapTrongBac * thueSuat;
        }

        mocTruoc = mucHienTai;

        if (thuNhapChiuThue <= mucHienTai) {
            break;
        }
    }

    return tienThue;
}

// Function tính thuế thu nhập cá nhân
function tinhThueThuNhapCaNhan() {

    // Lấy dữ liệu từ HTML
    const fullName = document.getElementById("fullName").value.trim();

    const annualIncome = document.getElementById("annualIncome").value;

    const dependents = document.getElementById("dependents").value;

    // Kiểm tra dữ liệu nhập
    if (
        fullName === "" ||
        annualIncome === "" ||
        dependents === ""
    ) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    // Chuyển dữ liệu sang kiểu Number
    const tongThuNhap = Number(annualIncome);

    const soNguoiPhuThuoc = Number(dependents);

    // Kiểm tra tính hợp lệ
    if (
        !Number.isFinite(tongThuNhap) ||
        tongThuNhap < 0
    ) {
        alert("Tổng thu nhập không hợp lệ!");
        return;
    }

    if (
        !Number.isInteger(soNguoiPhuThuoc) ||
        soNguoiPhuThuoc < 0
    ) {
        alert("Số người phụ thuộc phải là số nguyên không âm!");
        return;
    }

    // Tính thu nhập chịu thuế
    let thuNhapChiuThue = tinhThuNhapChiuThue(
        tongThuNhap,
        soNguoiPhuThuoc
    );

    // Tính tổng thuế phải trả
    let tongThue = tinhThueTheoBac(thuNhapChiuThue);

    // Chuyển từ triệu đồng sang VNĐ
    let tienThueVND = tongThue * 1000000;

    // Lấy khu vực hiển thị kết quả
    const result = document.getElementById("result");

    // Hiển thị kết quả
    result.classList.remove("hidden");

    result.className =
        "mt-6 p-5 rounded-lg bg-green-100 text-green-700";

    result.innerHTML = `
        <h2 class="text-xl font-bold mb-3">
            KẾT QUẢ TÍNH THUẾ THU NHẬP CÁ NHÂN
        </h2>

        <p class="mb-2">
            Họ tên: ${escapeHTML(fullName)}
        </p>

        <p class="mb-2">
            Tổng thu nhập năm:
            ${tongThuNhap.toLocaleString("vi-VN")} triệu đồng
        </p>

        <p class="mb-2">
            Số người phụ thuộc: ${soNguoiPhuThuoc}
        </p>

        <p class="mb-2">
            Thu nhập chịu thuế:
            ${thuNhapChiuThue.toLocaleString("vi-VN")} triệu đồng
        </p>

        <p class="text-lg font-bold mt-3">
            Thuế phải trả:
            ${tienThueVND.toLocaleString("vi-VN")} VNĐ
        </p>
    `;
}

// Function xử lý nội dung họ tên
function escapeHTML(text) {

    return text.replace(/[&<>"']/g, function(char) {

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

// Gắn sự kiện click cho button
document.getElementById("btnTinhThue")
    .addEventListener("click", tinhThueThuNhapCaNhan);
