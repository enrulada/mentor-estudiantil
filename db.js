import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // ⚠️ si tenés contraseña, ponela acá
  database: "form"
});