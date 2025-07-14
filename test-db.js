// test-db.js
const db = require('./src/config/db');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT NOW() AS time');
    console.log('DB Connected, Time:', rows[0].time);
  } catch (error) {
    console.error('DB Connection Error:', error.message);
  }
}

testConnection();
