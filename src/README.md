# 📋 Business Cards Management System

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

### **גישה לאתר:**
- **Frontend:** http://localhost:8181
- **API:** http://localhost:8181/api

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
src/
├── server.js                    # נקודת כניסה ראשית
├── package.json                 # תלויות הפרויקט
├── README.md                    # תיעוד הפרויקט
├── .gitignore                   # קבצים להתעלמות מ-Git
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
├── public/                      # קבצי Frontend
│   ├── index.html
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
- מיקום: `src/logs/YYYY-MM-DD.log`
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
