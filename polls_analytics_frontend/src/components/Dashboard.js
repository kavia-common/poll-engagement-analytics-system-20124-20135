import React, { useEffect, useState } from "react";
import PollMetricWidgets from "./PollMetricWidgets";
import FiltersPanel from "./FiltersPanel";
import EventLog from "./EventLog";

/**
 * Dashboard for poll analytics metrics, with filter and event log.
 */
// PUBLIC_INTERFACE
function Dashboard({ backendUrl }) {
  const [filters, setFilters] = useState({
    dateRange: { from: "", to: "" },
    device: "All",
    pollId: "All"
  });
  const [metrics, setMetrics] = useState(null);
  const [availablePolls, setAvailablePolls] = useState([]);
  const [eventLog, setEventLog] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch available poll IDs (for filter dropdown)
  useEffect(() => {
    fetch(`${backendUrl}/fanEngage/analytics/v1/pollSummary`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.polls)) {
          setAvailablePolls(data.polls.map((poll) => poll.poll_id));
        } else {
          setAvailablePolls([]);
        }
      })
      .catch(() => setAvailablePolls([]));
  }, [backendUrl]);

  // Fetch analytics metrics when filters change
  useEffect(() => {
    setLoading(true);
    // Build query params for filters if backend supports them
    const params = [];
    // Example: ?from=2024-01-01&to=2024-01-31&device=Web&pollId=xyz
    if (filters.dateRange.from) params.push(`from=${filters.dateRange.from}`);
    if (filters.dateRange.to) params.push(`to=${filters.dateRange.to}`);
    if (filters.device && filters.device !== "All") params.push(`device=${filters.device}`);
    if (filters.pollId && filters.pollId !== "All") params.push(`pollId=${filters.pollId}`);
    const queryString = params.length > 0 ? "?" + params.join("&") : "";

    // Older example endpoint: /fanEngage/analytics/v1/pollSummary
    fetch(`${backendUrl}/fanEngage/analytics/v1/pollSummary${queryString}`)
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    // Fetch event log, stubbed as polling /eventLog
    fetch(`${backendUrl}/fanEngage/analytics/v1/eventLog${queryString}`)
      .then((res) => res.json())
      .then((data) => setEventLog(Array.isArray(data.events) ? data.events : []))
      .catch(() => setEventLog([]));
  }, [filters, backendUrl]);

  // Handle filter apply
  const handleFiltersChange = (newFilters) => setFilters(newFilters);

  return (
    <div className="dashboard-main">
      <div className="dashboard-header">
        <h2>Analytics Dashboard</h2>
      </div>
      <FiltersPanel
        filters={filters}
        setFilters={handleFiltersChange}
        availablePolls={availablePolls}
      />
      {loading ? (
        <div className="dashboard-loading">Loading metrics...</div>
      ) : (
        <PollMetricWidgets metrics={metrics} />
      )}
      <EventLog eventLog={eventLog} />
    </div>
  );
}
export default Dashboard;
