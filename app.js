import bcrypt from "bcrypt";

import { pool } from "./db.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
 }); 
  // 🔥 nueva ruta
app.get("/usuarios", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM usuarios");
  res.json(rows);
});
// got 
app.post("/usuarios", async (req, res) => {
  try {
    const {
  nombre,
  apellido,
  edad,
  email,
  clave
} = req.body;
 // 2️⃣ ENCRIPTAR CONTRASEÑA
    const hashedPassword = await bcrypt.hash(clave, 10);


    const [result] = await pool.query(

  `INSERT INTO usuarios
  (nombre, apellido, edad, email, clave)
  VALUES (?, ?, ?, ?, ?)`,
      [nombre, apellido, edad, email, hashedPassword]
    );


    res.json({ id: result.insertId });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});
//put
app.put("/usuarios/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const {
      nombre,
      apellido,
      edad,
      email,
      clave
    } = req.body;

    // encriptar contraseña
    const hashedPassword = await bcrypt.hash(clave, 10);

    await pool.query(

      `UPDATE usuarios
      SET nombre=?, apellido=?, edad=?, email=?, clave=?
      WHERE id=?`,

      [
        nombre,
        apellido,
        edad,
        email,
        hashedPassword,
        id
      ]
    );

    res.sendStatus(204);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Error al actualizar usuario"
    });

  }

});
//delete
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);

    res.sendStatus(204);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});


// levantar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});

