import { When } from "@cucumber/cucumber";
import { By } from "selenium-webdriver";
import { PageFactory } from "../page-objects/PageFactory";

let pageForm = PageFactory.getInstance().createDIENFORM();
let pageGlobal = PageFactory.getInstance().createGlobalPageObjectPage();

When("User fills form {string}", async (filename) => {
    const loader_xlsx = require('read-excel-file/node');

    await loader_xlsx(filename).then(async (rows) => {
        for (let j = 1; j < rows.length; j++) {
            const Cau1 = rows[j][rows[0].indexOf("Cau1")];
            const DapAn1 = rows[j][rows[0].indexOf("DapAn1")];
            const Cau2 = rows[j][rows[0].indexOf("Cau2")];
            const DapAn2 = rows[j][rows[0].indexOf("DapAn2")];
            const Cau3 = rows[j][rows[0].indexOf("Cau3")];
            const DapAn3 = rows[j][rows[0].indexOf("DapAn3")];
            const Cau4 = rows[j][rows[0].indexOf("Cau4")];
            const DapAn4 = rows[j][rows[0].indexOf("DapAn4")];
            const Cau5 = rows[j][rows[0].indexOf("Cau5")];
            const DapAn5 = rows[j][rows[0].indexOf("DapAn5")];
            const Cau6 = rows[j][rows[0].indexOf("Cau6")];
            const DapAn6 = rows[j][rows[0].indexOf("DapAn6")];
            const CauDoQuanTam = rows[j][rows[0].indexOf("CauDoQuanTam")];
            const DapAnDoQuanTam = rows[j][rows[0].indexOf("DapAnDoQuanTam")];
            const CauSuAnhHuongSanPham = rows[j][rows[0].indexOf("CauSuAnhHuongSanPham")];
            const DapAnSuAnhHuongSanPham = rows[j][rows[0].indexOf("DapAnSuAnhHuongSanPham")];
            const CauSuAnhHuongGiaCa = rows[j][rows[0].indexOf("CauSuAnhHuongGiaCa")];
            const DapAnSuAnhHuongGiaCa = rows[j][rows[0].indexOf("DapAnSuAnhHuongGiaCa")];
            const CauSuAnhHuongQC_KM = rows[j][rows[0].indexOf("CauSuAnhHuongQC_KM")];
            const DapAnSuAnhHuongQC_KM = rows[j][rows[0].indexOf("DapAnSuAnhHuongQC_KM")];
            const CauSuAnhHuongQG_XX = rows[j][rows[0].indexOf("CauSuAnhHuongQG_XX")];
            const DapAnSuAnhHuongQG_XX = rows[j][rows[0].indexOf("DapAnSuAnhHuongQG_XX")];
            const CauSuAnhHuongCCQ = rows[j][rows[0].indexOf("CauSuAnhHuongCCQ")];
            const DapAnSuAnhHuongCCQ = rows[j][rows[0].indexOf("DapAnSuAnhHuongCCQ")];
            const CauSuAnhHuongKTNTD = rows[j][rows[0].indexOf("CauSuAnhHuongKTNTD")];
            const DapAnSuAnhHuongKTNTD = rows[j][rows[0].indexOf("DapAnSuAnhHuongKTNTD")];
            const GioiTinh = rows[j][rows[0].indexOf("GioiTinh")];
            const DoTuoi = rows[j][rows[0].indexOf("DoTuoi")];
            const NgheNghiep = rows[j][rows[0].indexOf("NgheNghiep")];
            const ThuNhapSauThue = rows[j][rows[0].indexOf("ThuNhapSauThue")];
            const DapAnGioiTinh = rows[j][rows[0].indexOf("DapAnGioiTinh")];
            const DapAnDoTuoi = rows[j][rows[0].indexOf("DapAnDoTuoi")];
            const DapAnNgheNghiep = rows[j][rows[0].indexOf("DapAnNgheNghiep")];
            const DapAnThuNhapSauThue = rows[j][rows[0].indexOf("DapAnThuNhapSauThue")];


            await pageForm.pressTiepButton();
            if (!await pageGlobal.waitElementVisible(By.xpath(`//*[@id='lpd4pf' and text()='Trang 2 trong t???ng s??? 11']`))) {
                await pageForm.pressTiepButton();
            }
            //Cau 1
            await pageForm.SelectQuestion1Options(Cau1, DapAn1);
            //cau 2
            await pageForm.SelectQuestion1Options(Cau2, DapAn2);

            await pageForm.pressTiepButton();
            if (!await pageGlobal.waitElementVisible(By.xpath(`//*[@id='lpd4pf' and text()='Trang 3 trong t???ng s??? 11']`))) {
                await pageForm.pressTiepButton();
            }

            //Cau 3
            let array3 = DapAn3.split(",");
            for (let i = 0; i < array3.length; i++) {
                await pageForm.SelectMultipleOptions(Cau3, array3[i])
            }
            //Cau 4
            await pageForm.SelectQuestion1Options(Cau4, DapAn4);

            //Cau 5
            await pageForm.SelectQuestion1Options(Cau5, DapAn5);

            //Cau 6
            await pageForm.SelectQuestion1Options(Cau6, DapAn6);

            //Khao sat do quan tam
            let arrayQT = DapAnDoQuanTam.split(",");
            for (let i = 0; i < 6; i++) {
                await pageForm.doQuanTam(CauDoQuanTam, arrayQT[i], i + 1);
            }


            await pageForm.pressTiepButton();
            if (!await pageGlobal.waitElementVisible(By.xpath(`//*[@id='lpd4pf' and text()='Trang 4 trong t???ng s??? 11']`))) {
                await pageForm.pressTiepButton();
            }


            //Khao sat su anh huong San Pham
            let arraySP = DapAnSuAnhHuongSanPham.split(",");
            for (let i = 0; i < 4; i++) {
                await pageForm.suAnhHuong(CauSuAnhHuongSanPham, arraySP[i], i);
            }

            await pageForm.pressTiepButton();
            if (!await pageGlobal.waitElementVisible(By.xpath(`//*[@id='lpd4pf' and text()='Trang 5 trong t???ng s??? 11']`))) {
                await pageForm.pressTiepButton();
            }

            //Khao sat su anh huong Gia Ca
            let arrayGC = DapAnSuAnhHuongGiaCa.split(",");
            for (let i = 0; i < 5; i++) {
                await pageForm.suAnhHuong(CauSuAnhHuongGiaCa, arrayGC[i], i);
            }
            await pageForm.pressTiepButton();
            if (!await pageGlobal.waitElementVisible(By.xpath(`//*[@id='lpd4pf' and text()='Trang 6 trong t???ng s??? 11']`))) {
                await pageForm.pressTiepButton();
            }

            //Khao sat su anh huong Quang Cao- Khuyen Mai
            let arrayQCKM = DapAnSuAnhHuongQC_KM.split(",");
            for (let i = 0; i < 5; i++) {
                await pageForm.suAnhHuong(CauSuAnhHuongQC_KM, arrayQCKM[i], i);
            }

            await pageForm.pressTiepButton();
            if (!await pageGlobal.waitElementVisible(By.xpath(`//*[@id='lpd4pf' and text()='Trang 7 trong t???ng s??? 11']`))) {
                await pageForm.pressTiepButton();
            }


            //Khao sat su anh huong Quoc Gia - Xuat x??
            let arrayQGXX = DapAnSuAnhHuongQG_XX.split(",");
            for (let i = 0; i < 4; i++) {
            await pageForm.suAnhHuong(CauSuAnhHuongQG_XX, arrayQGXX[i], i);
            }
            await pageForm.pressTiepButton();
            if (!await pageGlobal.waitElementVisible(By.xpath(`//*[@id='lpd4pf' and text()='Trang 8 trong t???ng s??? 11']`))) {
                await pageForm.pressTiepButton();
            }

            //Khao sat su anh huong Chuan Chu Quan
            let arrayCCQ = DapAnSuAnhHuongCCQ.split(",");
            for (let i = 0; i < 5; i++) {
            await pageForm.suAnhHuong(CauSuAnhHuongCCQ, arrayCCQ[i], i);
            }
            await pageForm.pressTiepButton();
            if (!await pageGlobal.waitElementVisible(By.xpath(`//*[@id='lpd4pf' and text()='Trang 9 trong t???ng s??? 11']`))) {
                await pageForm.pressTiepButton();
            }


            //Khao sat su anh huong kIEN Thuc Nguoi Tieu Dung
            let arrayKTNTD = DapAnSuAnhHuongKTNTD.split(",");
            for (let i = 0; i < 4; i++) {
            await pageForm.suAnhHuong(CauSuAnhHuongKTNTD, arrayKTNTD[i], i);
            }
            await pageForm.pressTiepButton();
            if (!await pageGlobal.waitElementVisible(By.xpath(`//*[@id='lpd4pf' and text()='Trang 11 trong t???ng s??? 11']`))) {
                await pageForm.pressTiepButton();
            }

            //Gioi Tinh
            await pageForm.SelectQuestion1Options(GioiTinh, DapAnGioiTinh);

            //Do Tuoi
            await pageForm.SelectQuestion1Options(DoTuoi, DapAnDoTuoi);

            //Nghe Nghiep
            await pageForm.SelectQuestion1Options(NgheNghiep, DapAnNgheNghiep);

            //Thu Nhap Sau Thue
            await pageForm.SelectQuestion1Options(ThuNhapSauThue, DapAnThuNhapSauThue);

            await pageForm.pressGuiButton();

            await pageForm.pressGuiPhanHoiKhac();

        }
    }
    )



})