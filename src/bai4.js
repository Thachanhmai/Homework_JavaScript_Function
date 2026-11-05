
/**
 * Bài 4: Tính Tiền Cáp
 *
 * Input:
 * - Mã khách hàng
 * - Loại khách hàng
 * - Số kết nối
 * - Số kênh cao cấp
 *
 * Nhà dân:
 * - Phí xử lý hóa đơn: 4.5$
 * - Phí dịch vụ cơ bản: 20.5$
 * - Thuê kênh cao cấp: 7.5$ / kênh
 *
 * Doanh nghiệp:
 * - Phí xử lý hóa đơn: 15$
 * - Phí dịch vụ cơ bản: 75$ cho 10 kết nối đầu
 * - Mỗi kết nối thêm: 5$
 * - Thuê kênh cao cấp: 50$ / kênh
 *
 * Output:
 * - Mã khách hàng
 * - Loại khách hàng
 * - Tổng tiền cáp phải trả
 */

// Function hiển thị hoặc ẩn card số kết nối
function hienThiSoKetNoi() {

    const customerType = document.getElementById("customerType").value;

    const connectionCard = document.getElementById("connectionCard");

    const connections = document.getElementById("connections");

    if (customerType === "business") {

        connectionCard.classList.remove("hidden");

        connections.disabled = false;

    }
    else {

        connectionCard.classList.add("hidden");

        connections.disabled = true;

        connections.value = "";

    }
}

// Function tính phí xử lý hóa đơn
function tinhPhiXuLyHoaDon(loaiKhachHang) {

    let phiHoaDon = 0;

    if (loaiKhachHang === "residential") {

        phiHoaDon = 4.5;

    }
    else if (loaiKhachHang === "business") {

        phiHoaDon = 15;

    }

    return phiHoaDon;
}

// Function tính phí dịch vụ cơ bản
function tinhPhiDichVuCoBan(loaiKhachHang, soKetNoi) {

    let phiDichVu = 0;

    if (loaiKhachHang === "residential") {

        phiDichVu = 20.5;

    }
    else if (loaiKhachHang === "business") {

        if (soKetNoi <= 10) {

            phiDichVu = 75;

        }
        else {

            phiDichVu = 75 + (soKetNoi - 10) * 5;

        }

    }

    return phiDichVu;
}

// Function tính phí kênh cao cấp
function tinhPhiKenhCaoCap(loaiKhachHang, soKenh) {

    let phiKenh = 0;

    if (loaiKhachHang === "residential") {

        phiKenh = soKenh * 7.5;

    }
    else if (loaiKhachHang === "business") {

        phiKenh = soKenh * 50;

    }

    return phiKenh;
}

// Function tính tổng tiền cáp
function tinhTienCap() {

    // Lấy dữ liệu từ HTML
    const customerCode = document.getElementById("customerCode").value.trim();

    const customerType = document.getElementById("customerType").value;

    const connections = document.getElementById("connections").value;

    const premiumChannels = document.getElementById("premiumChannels").value;

    // Kiểm tra thông tin
    if (customerCode === "" || customerType === "" || premiumChannels === "") {

        alert("Vui lòng nhập đầy đủ thông tin!");

        return;

    }

    // Chuyển số kênh sang Number
    const soKenh = Number(premiumChannels);

    // Kiểm tra số kênh
    if (!Number.isInteger(soKenh) || soKenh < 0) {

        alert("Số kênh cao cấp phải là số nguyên không âm!");

        return;

    }

    // Khởi tạo số kết nối
    let soKetNoi = 0;

    // Chỉ kiểm tra số kết nối khi là doanh nghiệp
    if (customerType === "business") {

        if (connections === "") {

            alert("Vui lòng nhập số kết nối!");

            return;

        }

        soKetNoi = Number(connections);

        if (!Number.isInteger(soKetNoi) || soKetNoi < 0) {

            alert("Số kết nối phải là số nguyên không âm!");

            return;

        }

    }

    // Tính phí xử lý hóa đơn
    let phiHoaDon = tinhPhiXuLyHoaDon(customerType);

    // Tính phí dịch vụ cơ bản
    let phiDichVu = tinhPhiDichVuCoBan(customerType, soKetNoi);

    // Tính phí kênh cao cấp
    let phiKenh = tinhPhiKenhCaoCap(customerType, soKenh);

    // Tính tổng tiền cáp
    let tongTien = phiHoaDon + phiDichVu + phiKenh;

    // Xác định loại khách hàng
    let tenLoaiKhachHang = "";

    if (customerType === "residential") {

        tenLoaiKhachHang = "Nhà dân";

    }
    else {

        tenLoaiKhachHang = "Doanh nghiệp";

    }

    // Lấy khu vực xuất kết quả
    const result = document.getElementById("result");

    // Hiển thị kết quả
    result.classList.remove("hidden");

    result.className = "mt-6 p-5 rounded-lg bg-green-100 text-green-700";

    result.innerHTML = `
        <h2 class="text-xl font-bold mb-3">
            KẾT QUẢ TÍNH TIỀN CÁP
        </h2>

        <p class="mb-2">
            Mã khách hàng: ${escapeHTML(customerCode)}
        </p>

        <p class="mb-2">
            Loại khách hàng: ${tenLoaiKhachHang}
        </p>

        ${customerType === "business" ? `
            <p class="mb-2">
                Số kết nối: ${soKetNoi}
            </p>
        ` : ""}

        <p class="mb-2">
            Số kênh cao cấp: ${soKenh}
        </p>

        <hr class="my-3">

        <p class="mb-2">
            Phí xử lý hóa đơn: $${phiHoaDon.toFixed(2)}
        </p>

        <p class="mb-2">
            Phí dịch vụ cơ bản: $${phiDichVu.toFixed(2)}
        </p>

        <p class="mb-2">
            Phí kênh cao cấp: $${phiKenh.toFixed(2)}
        </p>

        <p class="text-lg font-bold mt-3">
            Tổng tiền cáp: $${tongTien.toFixed(2)}
        </p>
    `;

}

// Function xử lý mã khách hàng
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

// Gắn sự kiện thay đổi loại khách hàng
document.getElementById("customerType")
    .addEventListener("change", hienThiSoKetNoi);

// Gắn sự kiện click button tính tiền
document.getElementById("btnTinhTienCap")
    .addEventListener("click", tinhTienCap);
