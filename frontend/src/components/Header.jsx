import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Mi Proyecto</h1>
        <div className="flex space-x-4 items-center">
          {location.pathname === "/productos" && usuario ? ( // Mostrar solo en /productos
            <>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUser} className="text-gray-300" />
                <span className="text-gray-300">{usuario.nombre}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-300 ml-4"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-300">
              Iniciar Sesión
            </Link>
          )}

          <Link to="/register" className="hover:text-gray-300">
            Registrarse
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
