<!-- Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים 15:45 -->
# MP-BusinessCards-Pro

**Business Cards Management System** — אפליקציית ניהול כרטיסי ביקור דיגיטליים (Node.js 22, Express, MongoDB, JWT).

- **אתר:** `http://localhost:8181` · **API:** `http://localhost:8181/api/users`, `http://localhost:8181/api/cards`
- כרגע אין צורך ב-Atlas, בקובץ ENV או ב-Production DB. ברירת המחדל היא **Local Demo Mode**.
- מוכן להעלאה ל-GitHub: קבצי `.env*`, `node_modules/` ו-`logs/` חסומים ב-[`.gitignore`](.gitignore).

רישיון: [LICENSE](LICENSE).

---

## 🎯 **פרטי הפרויקט**
- **שם הפרויקט:** Business Cards Management System
- **טכנולוגיה:** Node.js Full Stack Application
- **מפתח:** מיכאל פפיסמדוב - MP
- **תאריך הגשה:** 2025

אפליקציית ניהול כרטיסי ביקור דיגיטליים עם מערכת הרשאות מתקדמת, עיצוב מודרני ותמיכה מלאה בכל המסכים.

---

## 🛠️ **טכנולוגיות בשימוש**

### **Backend:**
- **Node.js** - סביבת ריצה ל-JavaScript
- **Express.js** - Framework ליצירת שרת HTTP
- **MongoDB** - מסד נתונים NoSQL
- **Mongoose** - ODM (Object Document Mapper) ל-MongoDB

### **Authentication & Security:**
- **JSON Web Token (JWT)** - לאימות משתמשים
- **bcryptjs** - הצפנת סיסמאות
- **Joi** - ולידציה של נתוני קלט

### **Middleware & Utilities:**
- **Morgan** - Logging של בקשות HTTP
- **CORS** - Cross-Origin Resource Sharing
- **Config** - ניהול משתני סביבה
- **Lodash** - פונקציות עזר

---

## 🚀 **התקנה והפעלה**

### **דרישות מערכת:**
- Node.js 22.x
- אין צורך ב-MongoDB מקומי או Atlas להפעלה הנוכחית
- npm או yarn

### **התקנה:**
```bash
# הורדת תלויות
npm install
```

### **הפעלה מקומית:**
```bash
npm run dev
```

### **הפעלה רגילה:**
```bash
npm start
```

### **גישה לאתר:**
- **Frontend:** http://localhost:8181
- **API:** http://localhost:8181/api/users ו-http://localhost:8181/api/cards
- **Health check:** http://localhost:8181/api/health

### **מצב פיתוח (`nodemon`):**
```bash
npm run dev
```
(הסקריפטים רצים כברירת מחדל ב-Local Demo Mode, ללא `NODE_ENV` וללא קובץ ENV.)

### **בדיקת תקינות לפני Push ל-GitHub**
```bash
npm install
npm run build
```
`npm run build` בודק תחביר בכל קבצי JavaScript, `require` יחסיים, וקישורים פנימיים/קריאות API מה-Frontend.

### **מצב נתונים נוכחי**
- כרגע האתר מיועד לרוץ ב-**Local Demo Mode** בלבד.
- אין צורך ב-Atlas.
- אין צורך בקובץ `.env`.
- אין צורך ב-Production DB.
- נתוני הדמו מגיעים מתוך `initialData/initialData.json` ונשמרים זמנית בזיכרון בזמן שהשרת רץ.
- `GET /api/health` מציג את מצב הנתונים, כמות המשתמשים וכמות הכרטיסים הזמינים.

---

## ☁️ **פריסה ב-Vercel**

הפרויקט מוגדר כ-**Express** שרץ כ-**Serverless Function** דרך `api/index.js` ו-`vercel.json` (כל הנתיבים מנותבים לפונקציה).

### **לפני Deploy**
1. חבר את ה-repository ל-Vercel (Import Project).
2. אין צורך להגדיר Environment Variables עבור המצב הנוכחי.
3. **Deploy** — אחרי push ל-`main`, Vercel יבנה מחדש.

### **למה הופיע 500 / FUNCTION_INVOCATION_FAILED לפני התיקון**
- ב-Serverless **אין** `app.listen()` — חייבים לייצא את אפליקציית Express ולטעון את MongoDB בלי להאזין לפורט.
- כתיבה לתיקיית `logs/` בשרת Vercel נכשלת (מערכת קבצים read-only); ה-File Logger משתמש ב-`/tmp/logs` כש-`VERCEL` מוגדר.

### **מגבלות**
- במצב Local Demo הנתונים נשמרים בזיכרון בלבד. בסביבת Serverless הם יכולים להתאפס בין הפעלות.

---

## 👥 **משתמשים ראשוניים לבדיקה**

### **🔑 פרטי התחברות:**

| סוג משתמש | שם משתמש | סיסמה | הרשאות | תיאור |
|----------|----------|-------|---------|--------|
| **Admin** | admin | Aa123456 | Admin + Business | מנהל מערכת - גישה מלאה |
| **Business** | Michael | Mp123456 | Business | משתמש עסקי - יצירה ועריכה |
| **Business** | Lika | Lp123456 | Business | משתמש עסקי - יצירה ועריכה |
| **Regular** | Zura | Zp123456 | Regular | משתמש רגיל - צפייה בלבד |

### **🎯 הוראות בדיקה:**
1. **התחבר עם Admin** - בדוק גישה לכל הפונקציות
2. **התחבר עם Michael או Lika** - בדוק יצירה ועריכה של כרטיסים
3. **התחבר עם Zura** - בדוק הגבלות גישה

---

## 🔐 **מערכת Authentication**

### **JWT Token Structure:**
```json
{
  "_id": "user_id",
  "isBusiness": boolean,
  "isAdmin": boolean
}
```

### **רמות הרשאות:**
1. **משתמש רגיל** - צפייה בלבד בכרטיסים
2. **משתמש עסקי** - יצירה ועריכה של כרטיסים
3. **מנהל מערכת** - גישה מלאה לכל הפונקציות

---

## 📊 **מודלי נתונים**

### **User Model:**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  image: String,
  isBusiness: Boolean,
  isAdmin: Boolean,
  createdAt: Date
}
```

### **Card Model:**
```javascript
{
  title: String,
  subtitle: String,
  description: String,
  phone: String,
  email: String,
  web: String,
  image: {
    url: String,
    alt: String
  },
  address: {
    street: String,
    houseNumber: Number,
    city: String,
    zipcode: Number,
    country: String
  },
  user_id: ObjectId (Foreign Key)
}
```

---

## 🚀 **API Endpoints**

כל נתיבי ה-API משתמשים ב-prefix אחיד: `/api`.

### **System Health:**
- `GET /api/health` - מצב שרת, סביבת עבודה, זמן בדיקה ומצב חיבור MongoDB

### **Authentication:**
- `POST /api/users/login` - התחברות משתמש
- `POST /api/users` - רישום משתמש חדש

### **Users Management:**
- `GET /api/users` - קבלת רשימת משתמשים (Admin)
- `GET /api/users/:id` - קבלת משתמש ספציפי
- `PUT /api/users/:id` - עדכון משתמש
- `PATCH /api/users/:id` - עדכון חלקי/בדיקה קיימת
- `DELETE /api/users/:id` - מחיקת משתמש

### **Cards Management:**
- `GET /api/cards` - קבלת רשימת כרטיסים
- `GET /api/cards/my-cards` - קבלת כרטיסי המשתמש המחובר
- `GET /api/cards/:id` - קבלת כרטיס ספציפי
- `POST /api/cards` - יצירת כרטיס חדש (Business/Admin)
- `PUT /api/cards/:id` - עדכון כרטיס מלא
- `PATCH /api/cards/:id` - לייק/עדכון חלקי לכרטיס
- `DELETE /api/cards/:id` - מחיקת כרטיס

---

## 🛡️ **אבטחה וולידציה**

### **Password Security:**
- הצפנה עם bcryptjs (salt rounds: 12)
- השוואת סיסמאות מוצפנות

### **Input Validation:**
- ולידציה עם Joi לכל הקלטים
- הודעות שגיאה ברורות בעברית
- בדיקת פורמטים (אימייל, טלפון, URL)

### **Error Handling:**
- טיפול מרכזי בשגיאות
- קודי סטטוס HTTP מתאימים
- File Logger לשגיאות 400+

---

## 🎨 **עיצוב Frontend**

### **תכונות עיצוב:**
- **Responsive Design** - התאמה לכל המסכים
- **Modern UI** - עיצוב מודרני ונקי
- **Animations** - אנימציות רקע עדינות
- **Dark Mode Support** - תמיכה במצב לילה
- **Touch Friendly** - מותאם למגע

### **תמיכה במסכים:**
- 📱 **סמארטפונים** (480px-640px)
- 📱 **טאבלטים** (768px-1024px)
- 💻 **מחשבים** (1024px+)
- 🖥️ **מסכים רחבים** (1440px+)

---

## 🏗️ **מבנה הפרויקט**

```
(שורש הפרויקט)
├── server.js                    # נקודת כניסה ראשית (מיוצא גם ל-Vercel)
├── vercel.json                  # ניתוב כל ה-HTTP ל-Serverless
├── api/index.js                 # כניסת Vercel — מייצא את אותו Express
├── package.json                 # תלויות הפרויקט
├── README.md                    # תיעוד הפרויקט
├── .gitignore                   # קבצים להתעלמות מ-Git
├── config/                      # הגדרות (כולל custom-environment-variables)
├── DB/                          # חיבור למסד נתונים
│   ├── dbService.js
│   └── mongoDB/
├── router/                      # ניתוב מרכזי
│   └── router.js
├── auth/                        # מערכת אימות
│   ├── authService.js
│   └── Providers/jwt.js
├── users/                       # ניהול משתמשים
│   ├── models/mongodb/User.js
│   ├── routes/usersController.js
│   ├── services/usersService.js
│   └── models/usersAccessDataService.js
├── cards/                       # ניהול כרטיסי עסק
│   ├── models/mongodb/Card.js
│   ├── routes/cardController.js
│   ├── services/cardService.js
│   └── models/cardsDataAccessService.js
├── initialData/                 # נתונים ראשוניים
│   ├── initialData.json
│   └── initialDataService.js
├── index.html                   # דף הבית (שורש הפרויקט)
├── public/                      # קבצי Frontend סטטיים
│   ├── styles.css
│   └── copyright.html
├── logger/                      # מערכת לוגים
│   └── loggerService.js
└── logs/                        # קבצי לוגים
```

---

## 🎯 **תכונות מתקדמות (Bonus)**

### **1. File Logger:**
- שמירת שגיאות 400+ בקובץ יומי
- **מקומי:** `logs/YYYY-MM-DD.log`
- **Vercel:** `/tmp/logs/YYYY-MM-DD.log` (מערכת הקבצים בפונקציה read-only)
- פורמט: `[תאריך] [סטטוס] [הודעת שגיאה]`

---

## 🧪 **בדיקות ואימות**

### **בדיקות זמינות כרגע:**
- `npm run build` — בדיקת תחביר לכל קבצי JavaScript, `require` יחסיים וקישורי Frontend פנימיים
- `GET /api/health` — בדיקת זמינות עם מצב שרת, סביבת עבודה, זמן בדיקה ומצב חיבור MongoDB

### **בדיקות ידניות מומלצות לפני Deploy:**
- התחברות והרשאות משתמשים
- פעולות CRUD לכרטיסים
- Validation של קלטים
- Responsive design
- Error handling

### **סביבות בדיקה:**
- **Local Demo Mode:** מצב ברירת המחדל כרגע, ללא Atlas, ללא ENV וללא Production DB.

---

## 🎉 **סיכום**

פרויקט זה מדגים שימוש מלא בטכנולוגיות Full Stack מודרניות:

- **Backend חזק** עם Node.js ו-Express
- **מסד נתונים מתקדם** עם MongoDB ו-Mongoose
- **אבטחה מלאה** עם JWT ו-bcrypt
- **עיצוב מודרני** ו-Responsive
- **קוד נקי ומאורגן** עם מבנה מודולרי

הפרויקט מוכן לשימוש בפרודקשן ומדגים הבנה עמוקה בפיתוח Full Stack.

---

## 📝 **הערות נוספות**

- האפליקציה כוללת מערכת הרשאות מתקדמת
- תמיכה מלאה בעברית (RTL)
- עיצוב מודרני ו-responsive לכל המסכים
- מערכת לוגים מתקדמת לניטור שגיאות
- תמיכה במצב כהה (Dark Mode)

---

**פותח על ידי:** מיכאל פפיסמדוב - MP  
**תאריך:** 2025  
**טכנולוגיה:** Node.js Full Stack Application

Michael Papismedov MP - 04/05/2026 15:45
