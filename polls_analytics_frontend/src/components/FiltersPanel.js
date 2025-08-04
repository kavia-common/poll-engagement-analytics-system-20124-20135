import React from "react";

/**
 * Panel to adjust dashboard filters: date range, device type, poll ID.
 */
// PUBLIC_INTERFACE
function FiltersPanel({ filters, setFilters, availablePolls }) {
  // Simplified filter setters
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("dateRange.")) {
      setFilters({
        ...filters,
        dateRange: {
          ...filters.dateRange,
          [name.split(".")[1]]: value
        }
      });
    } else {
      setFilters({
        ...filters,
        [name]: value
      });
    }
  };

  return (
    <div className="filters-panel">
      <label>
        From:
        <input
          type="date"
          name="dateRange.from"
          value={filters.dateRange.from}
          onChange={handleChange}
        />
      </label>
      <label>
        To:
        <input
          type="date"
          name="dateRange.to"
          value={filters.dateRange.to}
          onChange={handleChange}
        />
      </label>
      <label>
        Device:
        <select name="device" value={filters.device} onChange={handleChange}>
          <option>All</option>
          <option>Web</option>
          <option>Mobile</option>
          <option>TV</option>
        </select>
      </label>
      <label>
        Poll ID:
        <select name="pollId" value={filters.pollId} onChange={handleChange}>
          <option>All</option>
          {availablePolls.map((pid) => (
            <option key={pid}>{pid}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default FiltersPanel;
