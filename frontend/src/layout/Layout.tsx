import { NavLink, Outlet } from "react-router-dom";
import "../css/Layout.css";
import { config } from "../libs/config";
import { House, Search } from "lucide-react";

function Layout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <nav>
        <h3 id="app-name">{config.appName}</h3>
        <div className={"separator"} ></div>
        <ul className="nav-container" style={{ listStyle: "none", padding: 0 }}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }: { isActive: boolean }) =>
                `btn-nav ${isActive ? "active" : ""}`
              }
              end
            >
              <House size={20} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }: { isActive: boolean }) =>
                `btn-nav ${isActive ? "active" : ""}`
              }
            >
              <Search size={20} />
              Search
            </NavLink>
          </li>
        </ul>
      </nav>

      <main id="main-container">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
