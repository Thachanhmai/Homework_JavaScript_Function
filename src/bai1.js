/**
 * Bài 1: Quản Lý Tuyển Sinh
 * 
 * * Yêu cầu: Cho biết thí sinh đó đậu hay rớt và tổng số điểm đạt được
 * 
 * * Input: Cho phép người dùng nhập những thông tin sau:
 *      - Điểm Chuẩn Của Hội Đồng
 *      - Điểm 3 môn của thí sinh
 *      - Khu vực (A, B, C) Hoặc là X nếu không thuộc khu vực ưu tiên
 *      - Đối tượng (1, 2, 3) Hoặc là 0 nếu không thuộc đối tượng ưu tiên
 * 
 * * Process:
 *    - Tính tổng điểm của thí sinh = Tổng điểm 3 môn + Điểm ưu tiên khu vực + Điểm ưu tiên đối tượng
 *    - Nếu tổng điểm >= Điểm Chuẩn Của Hội Đồng và không có môn nào bị điểm 0 thì thí sinh đậu, ngược lại thí sinh rớt
 *    - Xét điểm ưu tiên khu vực:
 *        - Khu vực A: 2 điểm
 *        - Khu vực B: 1 điểm
 *        - Khu vực C: 0.5 điểm
 *        - X: 0 điểm
 *   - Xét điểm ưu tiên đối tượng:
 *        - Đối tượng 1: 2.5 điểm
 *        - Đối tượng 2: 1.5 điểm
 *        - Đối tượng 3: 1 điểm
 *        - 0: 0 điểm
 * 
 * * Output: In ra kết quả thí sinh đậu hay rớt và tổng số điểm đạt được
 */

// Function tính điểm ưu tiên khu vực
function tinhDiemUuTienKhuVuc(khuVuc) {
    let diemUuTienKhuVuc = 0;

    switch (khuVuc) {
        case "A":
            diemUuTienKhuVuc = 2;
            break;

        case "B":
            diemUuTienKhuVuc = 1;
            break;

        case "C":
            diemUuTienKhuVuc = 0.5;
            break;

        case "X":
            diemUuTienKhuVuc = 0;
            break;
    }

    return diemUuTienKhuVuc;
}

// Function tính điểm ưu tiên đối tượng
function tinhDiemUuTienDoiTuong(doiTuong) {
    let diemUuTienDoiTuong = 0;

    switch (doiTuong) {
        case "1":
            diemUuTienDoiTuong = 2.5;
            break;

        case "2":
            diemUuTienDoiTuong = 1.5;
            break;

        case "3":
            diemUuTienDoiTuong = 1;
            break;

        case "0":
            diemUuTienDoiTuong = 0;
            break;
    }

    return diemUuTienDoiTuong;
}

// Function tính kết quả tuyển sinh
function tinhKetQuaTuyenSinh() {

    // Lấy dữ liệu từ HTML
    const passingScore = document.getElementById("passingScore").value;

    const subject1 = document.getElementById("subject1").value;
    const subject2 = document.getElementById("subject2").value;
    const subject3 = document.getElementById("subject3").value;

    const region = document.getElementById("region").value;
    const category = document.getElementById("category").value;

    // Kiểm tra dữ liệu nhập
    if (
        passingScore === "" ||
        subject1 === "" ||
        subject2 === "" ||
        subject3 === "" ||
        region === "" ||
        category === ""
    ) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    // Chuyển dữ liệu sang kiểu Number
    const diemChuan = Number(passingScore);

    const diemMon1 = Number(subject1);
    const diemMon2 = Number(subject2);
    const diemMon3 = Number(subject3);

    // Kiểm tra điểm nhập hợp lệ
    if (
        !Number.isFinite(diemChuan) ||
        diemChuan < 0 ||
        ![diemMon1, diemMon2, diemMon3].every(
            diem => Number.isFinite(diem) && diem >= 0 && diem <= 10
        )
    ) {
        alert("Điểm nhập không hợp lệ! Điểm mỗi môn phải từ 0 đến 10.");
        return;
    }

    // Tính điểm ưu tiên khu vực
    let diemUuTienKhuVuc = tinhDiemUuTienKhuVuc(region);

    // Tính điểm ưu tiên đối tượng
    let diemUuTienDoiTuong = tinhDiemUuTienDoiTuong(category);

    // Tính tổng điểm
    let tongDiem =
        diemMon1 +
        diemMon2 +
        diemMon3 +
        diemUuTienKhuVuc +
        diemUuTienDoiTuong;

    // Kiểm tra kết quả tuyển sinh
    let ketQua = "";
    let lyDo = "";

    if (diemMon1 === 0 || diemMon2 === 0 || diemMon3 === 0) {
        ketQua = "RỚT";
        lyDo = "Thí sinh có môn thi bị điểm 0.";
    }
    else if (tongDiem >= diemChuan) {
        ketQua = "ĐẬU";
        lyDo = "Thí sinh đạt đủ điểm chuẩn của hội đồng.";
    }
    else {
        ketQua = "RỚT";
        lyDo = "Tổng điểm chưa đạt điểm chuẩn.";
    }

    // Xuất kết quả ra HTML
    let result = document.getElementById("result");

    result.classList.remove("hidden");
    result.className = "mt-6 p-5 rounded-lg whitespace-pre-line";

    if (ketQua === "ĐẬU") {
        result.classList.add("bg-green-100", "text-green-700");
    }
    else {
        result.classList.add("bg-red-100", "text-red-700");
    }

    result.innerHTML = `
        <h2 class="text-xl font-bold mb-3">
            KẾT QUẢ: ${ketQua}
        </h2>

        Điểm chuẩn: ${diemChuan}

        Điểm môn 1: ${diemMon1}
        Điểm môn 2: ${diemMon2}
        Điểm môn 3: ${diemMon3}

        Điểm ưu tiên khu vực: ${diemUuTienKhuVuc}
        Điểm ưu tiên đối tượng: ${diemUuTienDoiTuong}

        Tổng điểm đạt được: ${tongDiem.toFixed(2)}

        Lý do: ${lyDo}
    `;
}
