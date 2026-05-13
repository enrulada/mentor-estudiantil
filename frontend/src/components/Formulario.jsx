import { useState } from "react";
import axios from "axios";

function Formulario() {

  // estados
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");

  // función guardar
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:3000/usuarios",
        {
          nombre,
          apellido,
          edad,
          email,
          clave
        }
      );

      alert("Usuario guardado correctamente");

      // limpiar inputs
      setNombre("");
      setApellido("");
      setEdad("");
      setEmail("");
      setClave("");

    } catch (error) {

      console.log(error);

      alert("Error al guardar usuario");

    }

  };

  return (

    <div className="container">

      <img
        src="/logo.png"
        alt="Logo"
        className="logo"
      />

      <h2>Registro Usuario</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />

        <input
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />

        <button type="submit">
          Guardar
        </button>

      </form>

    </div>

  );

}

export default Formulario;