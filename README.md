# خبزة وزعتر — الموقع

## الملفات
```
index.html                 ← الصفحة
assets/khubza/             ← صور قسم «كيف نصنعها»
assets/img/                ← صور الواجهة (موبايل/كمبيوتر)، اللوجو (SVG)، صور المعرض، الأيقونات
apps-script/Code.gs        ← استقبال الطلبات في Google Sheet
```
> ارفع `index.html` ومجلد `assets` معًا بنفس الترتيب.

## صورة الواجهة (Hero)
| الملف | يظهر على | المقاس |
|---|---|---|
| `assets/img/hero-mobile-1080.webp` و`-720` | الموبايل والتابلت الطولي | 1080×1920 (9:16) |
| `assets/img/hero-desktop-1920.webp` و`-1280` | الكمبيوتر والتابلت العرضي | 1920×1080 (16:9) |

المتصفح يختار النسخة المناسبة تلقائيًا حسب اتجاه الشاشة ومقاسها. لاستبدال الصورة ضع ملفات بنفس الأسماء والمقاسات.

## 1) النشر على GitHub Pages
1. أنشئ مستودعًا جديدًا (Public) باسم مثل `khubza-zaatar`.
2. Add file ← Upload files ← اسحب `index.html` **ومجلد `assets` كاملًا** إلى الصفحة ← Commit changes.
3. Settings ← Pages ← Source: Deploy from a branch ← Branch: `main` / `(root)` ← Save.
4. بعد دقيقة يعمل الموقع على: `https://اسم-حسابك.github.io/khubza-zaatar/`

## 2) ربط الطلبات بـ Google Sheet (مرة واحدة)
1. أنشئ Google Sheet جديدًا.
2. Extensions ← Apps Script ← احذف الكود الموجود والصق محتوى `Code.gs` ← Save.
3. (اختياري) اكتب بريدك في `NOTIFY_EMAIL` ليصلك إيميل بكل طلب.
4. Deploy ← New deployment ← النوع: Web app
   - Execute as: **Me**
   - Who has access: **Anyone**
   ← Deploy ← وافق على الصلاحيات.
5. انسخ رابط الـ Web App (ينتهي بـ `/exec`).
6. افتح `index.html` وابحث عن السطر:
   `const SHEETS_URL = "";`
   وضع الرابط بين علامتي التنصيص، ثم ارفع الملف مرة أخرى على GitHub.

تظهر الطلبات في ورقة اسمها «الطلبات» داخل الشيت.
إذا لم يُضبط الرابط أو تعذّر الإرسال، يظهر للعميل زر لإرسال الطلب كاملًا عبر واتساب حتى لا يضيع أي طلب.

> عند تعديل الكود في Apps Script لاحقًا: Deploy ← Manage deployments ← Edit ← Version: New version ← Deploy.

## 3) ربط الدومين الخاص (بعد شرائه)
1. Settings ← Pages ← Custom domain ← اكتب الدومين ← Save.
2. عند شركة الدومين أضف سجلات DNS:
   - أربعة سجلات A للدومين الأساسي تشير إلى: `185.199.108.153` / `185.199.109.153` / `185.199.110.153` / `185.199.111.153`
   - سجل CNAME لـ `www` يشير إلى `اسم-حسابك.github.io`
3. بعد التفعيل فعّل خيار **Enforce HTTPS**.

## تعديل القائمة والأسعار
داخل `index.html` ابحث عن `const MENU = [` — كل صنف مكتوب بسطر واحد (الاسم عربي/إنجليزي، السعر، الوحدة).
