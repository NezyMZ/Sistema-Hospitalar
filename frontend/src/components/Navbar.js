import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Sistema Hospitalar</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/pacientes" className={({ isActive }) => (isActive ? 'active' : '')}>
            Pacientes
          </NavLink>
        </li>
        <li>
          <NavLink to="/medicos" className={({ isActive }) => (isActive ? 'active' : '')}>
            Médicos
          </NavLink>
        </li>
        <li>
          <NavLink to="/consultas" className={({ isActive }) => (isActive ? 'active' : '')}>
            Consultas
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
