# MP-BusinessCards-Pro

**Business Cards Management System** — אפליקציית ניהול כרטיסי ביקור דיגיטליים (Node.js, Express, MongoDB, JWT).

- **אתר:** `http://localhost:8181` · **API:** `http://localhost:8181/api`
- העתק [`.env.example`](.env.example) ל-`.env.development` או `.env.production` והגדר משתני סביבה.

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
- Node.js (v14+)
- MongoDB (Local או Atlas)
- npm או yarn

### **התקנה:**
```bash
# הורדת תלויות
npm install
```

### **הפעלה:**
```bash
# הפעלת השרת
npm start
```

### **גישה לאתר (פיתוח):**
- **Frontend:** http://localhost:8181
- **API:** http://localhost:8181/api

### **מצב פיתוח (`nodemon`):**
```bash
npm run dev
```
(הסקריפטים ב-`package.json` מותאמים ל-Windows עם `set NODE_ENV=...`.)

### **משתני סביבה (אבטחה)**
- **לא לעשות commit** לקבצי `.env*` — הם ב-[`.gitignore`](.gitignore). רק [`.env.example`](.env.example) ב-Git כתבנית.
- בעת עליית השרת נטען אוטומטית `dotenv` מקובץ **`.env.development`** או **`.env.production`** לפי `NODE_ENV` (אם הקובץ קיים).
- ערכים רגישים מגיעים מ-**משתני סביבה** (מערכת ההפעלה, Vercel, או `.env` מקומי) וממופים ב-[`config/custom-environment-variables.json`](config/custom-environment-variables.json).
- **חיבור ל-MongoDB Atlas** — אחת מהאפשרויות:
  - **`MONGODB_URI`** — מחרוזת `mongodb+srv://...` מלאה (מומלץ ל-Vercel).
  - או **`DB_NAME`**, **`DB_PASSWORD`**, **`MONGODB_CLUSTER_HOST`** (שם ה-host של הקלאסטר ב-Atlas, בלי `mongodb+srv://`).
- **סודות שהופיעו בעבר ב-Git / בקונפיג ישן:** מומלץ **לסובב** JWT, סיסמת Atlas וכל מפתח — גם אם הוסרו מהקבצים.

---

## ☁️ **פריסה ב-Vercel**

הפרויקט מוגדר כ-**Express** שרץ כ-**Serverless Function** דרך `api/index.js` ו-`vercel.json` (כל הנתיבים מנותבים לפונקציה).

### **לפני Deploy**
1. חבר את ה-repository ל-Vercel (Import Project).
2. ב-**Settings → Environment Variables** הגדר לפחות (לסביבת Production — ואם צריך גם Preview):

| משתנה | הסבר |
|--------|------|
| `JWT_KEY` | מפתח חתימה ל-JWT (חובה בפרודקשן) |
| `MONGODB_URI` | **מומלץ:** מחרוזת `mongodb+srv://USER:PASS@cluster...mongodb.net/` מלאה |
| `DB_NAME` | משתמש Atlas (אם לא משתמשים ב-`MONGODB_URI`) |
| `DB_PASSWORD` | סיסמת Atlas (אם לא משתמשים ב-`MONGODB_URI`) |
| `MONGODB_CLUSTER_HOST` | לדוגמה `cluster0.xxxxx.mongodb.net` (אם לא משתמשים ב-`MONGODB_URI`) |
| `NODE_ENV` | `production` (לרוב Vercel כבר מגדיר) |

המפתחות נטענים דרך [`config/custom-environment-variables.json`](config/custom-environment-variables.json) ודורסים את ערכי ברירת המחדל ב-`config/` כשהם מוגדרים.

3. **Deploy** — אחרי push ל-`main`, Vercel יבנה מחדש.

### **למה הופיע 500 / FUNCTION_INVOCATION_FAILED לפני התיקון**
- ב-Serverless **אין** `app.listen()` — חייבים לייצא את אפליקציית Express ולטעון את MongoDB בלי להאזין לפורט.
- כתיבה לתיקיית `logs/` בשרת Vercel נכשלת (מערכת קבצים read-only); ה-File Logger משתמש ב-`/tmp/logs` כש-`VERCEL` מוגדר.

### **מגבלות**
- **Cold start** וחיבור ל-Atlas עלולים לקחת כמה שניות; בתוכנית חינם של Vercel יש מגבלת זמן לביצוע פונקציה — אם יש timeout, שקול תוכנית Pro או אופטימיזציה של חיבור MongoDB.

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

### **Authentication:**
- `POST /users/login` - התחברות משתמש
- `POST /users/register` - רישום משתמש חדש

### **Users Management:**
- `GET /users` - קבלת רשימת משתמשים (Admin)
- `GET /users/:id` - קבלת משתמש ספציפי
- `PATCH /users/:id` - עדכון משתמש
- `DELETE /users/:id` - מחיקת משתמש

### **Cards Management:**
- `GET /cards` - קבלת רשימת כרטיסים
- `GET /cards/:id` - קבלת כרטיס ספציפי
- `POST /cards` - יצירת כרטיס חדש (Business/Admin)
- `PUT /cards/:id` - עדכון כרטיס מלא
- `PATCH /cards/:id` - עדכון כרטיס חלקי
- `DELETE /cards/:id` - מחיקת כרטיס

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

### **מה נבדק:**
- ✅ כל ה-API endpoints עובדים
- ✅ Authentication ו-Authorization
- ✅ CRUD operations מלאות
- ✅ Validation של קלטים
- ✅ Responsive design
- ✅ Error handling
- ✅ Security measures

### **סביבות בדיקה:**
- **Development:** MongoDB Local
- **Production:** MongoDB Atlas (מוכן)

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
