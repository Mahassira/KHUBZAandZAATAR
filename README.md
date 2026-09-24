# خبزة وزعتر — الموقع

## الملفات
```
index.html                 ← الصفحة
assets/khubza/             ← صور قسم «كيف نصنعها»
assets/video/              ← فيديو الواجهة (موبايل/كمبيوتر)
assets/img/                ← صور الواجهة، اللوجو (SVG)، صور المعرض، الأيقونات
apps-script/Code.gs        ← استقبال الطلبات في Google Sheet
```
> ارفع `index.html` ومجلد `assets` معًا بنفس الترتيب.

## واجهة الموقع (Hero)
| الملف | يظهر على | المقاس |
|---|---|---|
| `assets/video/hero-mobile.mp4` | الموبايل والتابلت الطولي | 720×1280 (9:16)، بدون صوت |
| `assets/video/hero-desktop.mp4` | الكمبيوتر والتابلت العرضي | 1920×1080 (16:9)، بدون صوت |
| `assets/img/hero-mobile-*.webp` | صورة تظهر فورًا قبل الفيديو، وبديلة له | 1080×1920 |
| `assets/img/hero-desktop-*.webp` | نفس الدور للكمبيوتر | 1920×1080 |

- الفيديو يعمل تلقائيًا بدون صوت ويتكرر، ويظهر تدريجيًا فوق الصورة بعد تحميله.
- يتوقف عند التمرير بعيدًا عنه لتوفير البطارية، ويتبدّل تلقائيًا عند تدوير الشاشة.
- عند تفعيل «تقليل الحركة» أو «توفير البيانات» في الجهاز تظهر الصورة فقط.
- لاستبدال الفيديو ضع ملفًا بنفس الاسم. للضغط: `ffmpeg -i in.mp4 -an -vf scale=720:-2 -c:v libx264 -crf 24 -movflags +faststart hero-mobile.mp4`

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
