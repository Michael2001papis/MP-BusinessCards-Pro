const fs = require("fs");
const path = require("path");
const currentDateTimeStr = require("../../utils/dateTimeStr");

// פונקציה לרישום שגיאות לקובץ
const logErrorToFile = (status, message, url, method) => {
  try {
    // יצירת שם קובץ לפי התאריך
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const fileName = `${today}.log`;
    const logsDir = path.join(__dirname, '../../logs');
    const filePath = path.join(logsDir, fileName);
    
    // וידוא שתיקיית logs קיימת
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    // יצירת הודעת השגיאה
    const logEntry = {
      timestamp: currentDateTimeStr,
      status: status,
      message: message,
      url: url,
      method: method
    };
    
    // הוספת השגיאה לקובץ
    const logLine = `${logEntry.timestamp} [${logEntry.status}] ${logEntry.method} ${logEntry.url} - ${logEntry.message}\n`;
    
    // כתיבה לקובץ (append)
    fs.appendFileSync(filePath, logLine, 'utf8');
    
  } catch (error) {
    console.error('שגיאה ברישום לקובץ:', error);
  }
};

module.exports = { logErrorToFile };
