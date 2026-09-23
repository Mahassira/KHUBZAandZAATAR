/**
 * خبزة وزعتر — استقبال الطلبات من الموقع في Google Sheet
 * 1) الصق هذا الكود في Extensions > Apps Script داخل الشيت.
 * 2) Deploy > New deployment > Web app
 *    Execute as: Me   |   Who has access: Anyone
 * 3) انسخ رابط الـ Web App وضعه في index.html داخل: const SHEETS_URL = "";
 */

// اختياري: ضع بريدك هنا ليصلك إيميل مع كل طلب جديد، أو اتركه فارغًا
const NOTIFY_EMAIL = "";

const HEADERS = ["رقم الطلب","وقت الطلب","الاسم","الهاتف","الاستلام","العنوان","التاريخ المطلوب","الوقت المطلوب","الأصناف","الإجمالي التقريبي (ج.م)","ملاحظات","الحالة"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("الطلبات");
    if (!sheet) {
      sheet = ss.insertSheet("الطلبات");
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#0a483b").setFontColor("#ffffff");
      sheet.setFrozenRows(1);
      sheet.setRightToLeft(true);
    }
    const d = JSON.parse(e.postData.contents);
    sheet.appendRow([
      d.id || "", new Date(), d.name || "", "'" + (d.phone || ""), d.methodText || d.method || "",
      d.address || "", d.date || "", d.time || "", d.itemsText || "", Math.round(d.total || 0), d.notes || "", "جديد"
    ]);
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL, "طلب جديد " + (d.id || "") + " — " + (d.name || ""),
        "الاسم: " + d.name + "\nالهاتف: " + d.phone + "\nالاستلام: " + (d.methodText || "") + " " + (d.address || "") +
        "\nالموعد: " + (d.date || "") + " " + (d.time || "") + "\nالأصناف: " + d.itemsText +
        "\nالإجمالي التقريبي: " + Math.round(d.total || 0) + " ج.م" + (d.notes ? "\nملاحظات: " + d.notes : ""));
    }
    return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: String(err) })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
