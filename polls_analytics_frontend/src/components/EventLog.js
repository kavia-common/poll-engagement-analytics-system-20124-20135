import React from "react";

/**
 * Shows poll analytics event log (user or system events).
 */
// PUBLIC_INTERFACE
function EventLog({ eventLog }) {
  return (
    <div className="event-log-section">
      <h3>Event Log</h3>
      <div className="event-log-table-container">
        <table className="event-log-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Event</th>
              <th>User/Device</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {eventLog && eventLog.length > 0 ? (
              eventLog.map((event, i) => (
                <tr key={i}>
                  <td>{event.timestamp || "-"}</td>
                  <td>{event.event_type || "-"}</td>
                  <td>
                    {event.device || "-"}
                    {event.user_id ? ` (${event.user_id})` : ""}
                  </td>
                  <td>
                    {event.details
                      ? typeof event.details === "string"
                        ? event.details
                        : JSON.stringify(event.details)
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="no-event-log">
                  No events to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default EventLog;
