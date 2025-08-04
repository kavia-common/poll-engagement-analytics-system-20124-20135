import React from "react";

/**
 * Side navigation for analytics dashboard.
 */
// PUBLIC_INTERFACE
function SideNav({ sections, activeSection, onSelectSection }) {
  return (
    <nav className="side-nav">
      <div className="side-nav-header">
        <span className="side-nav-title">Poll Analytics</span>
      </div>
      <ul className="side-nav-list">
        {sections.map((section) => (
          <li
            key={section}
            className={section === activeSection ? "active" : ""}
            onClick={() => onSelectSection(section)}
            data-testid={`nav-item-${section}`}
          >
            {section}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideNav;
