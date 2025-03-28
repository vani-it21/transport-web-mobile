import mysql from 'mysql2';
import { RowDataPacket } from 'mysql2';
// Setup MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'transport_bit',
});



// Create Transport Tables
const damageServices= 
  `CREATE TABLE IF NOT EXISTS reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    emailId VARCHAR(100) NOT NULL,  
    vehicleNumber VARCHAR(50) NOT NULL,
    priority VARCHAR(50) NOT NULL,
    damageType VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    audio VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

`
;
interface ReportData {
    emailId: string;
    vehicleNumber: string;
    priority: string;
    damageType: string;
    photo?: string | null;
    audio?: string | null;
  }
connection.query(damageServices, (err) => {
    if (err) {
      console.error('Error creating table damageServices:', err);
    } else {
      console.log('Table "damageServices" is ready.');
    }
  });
  export const ReportModel = {
    createReport: (data: ReportData): Promise<any> => {
      const sql = `INSERT INTO reports (emailId, vehicleNumber, priority, damageType, photo, audio) VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [data.emailId, data.vehicleNumber, data.priority, data.damageType, data.photo, data.audio];
  
      return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    },
  
    getReportsByEmail: (email: string): Promise<any> => {
      const sql = `SELECT * FROM reports WHERE emailId = ?`;
      return new Promise((resolve, reject) => {
        connection.query(sql, [email], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    },
  };