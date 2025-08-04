import React, { useState, useEffect } from "react";
import "./App.css";
import SideNav from "./components/SideNav";
import Dashboard from "./components/Dashboard";

// Configure backend REST API base URL (hardcoded for now, ideally from env or config)
const BACKEND_URL = "http://localhost:8000";

/**
 * Main app for the Poll Analytics Dashboard.
 * Integrates themed layout, nav, and the dashboard.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");
  const [activeSection, setActiveSection] = useState("Dashboard");

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const sections = ["Dashboard", "Settings"];

  return (
    <div className="app-root">
      <SideNav
        sections={sections}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />
      <div className="dashboard-wrap">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        {activeSection === "Dashboard" ? (
          <Dashboard backendUrl={BACKEND_URL} />
        ) : (
          <div className="settings-area">
            <h2>Settings (Coming Soon)</h2>
            <p>
              This section will allow you to customize dashboard widgets and notifications.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
