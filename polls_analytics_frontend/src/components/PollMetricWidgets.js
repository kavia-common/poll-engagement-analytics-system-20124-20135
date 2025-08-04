import React from "react";

/**
 * Widget cards showing poll analytics metrics (widgets, device breakdown, geo heatmap).
 * Expects prop: metrics {polls_shown, participation_rate, device_breakdown, geo_heatmap_data,...}
 */
// PUBLIC_INTERFACE
function PollMetricWidgets({ metrics }) {
  if (!metrics) return null;

  const {
    polls_shown = 0,
    participation_rate = 0,
    device_breakdown = {},
    geo_heatmap_data = []
  } = metrics;

  return (
    <div className="metrics-widgets">
      <div className="metrics-row">
        <div className="metrics-widget metrics-accent">
          <div className="metrics-title">Polls Shown</div>
          <div className="metrics-value">{polls_shown}</div>
        </div>
        <div className="metrics-widget metrics-primary">
          <div className="metrics-title">Participation Rate</div>
          <div className="metrics-value">{participation_rate}%</div>
        </div>
      </div>
      <div className="metrics-row">
        <div className="metrics-widget metrics-outline">
          <div className="metrics-title">Device Breakdown</div>
          <div className="device-list">
            {Object.entries(device_breakdown).map(([device, count]) => (
              <div key={device} className="device-item">
                {device}: <span>{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="metrics-widget metrics-outline">
          <div className="metrics-title">Geo-location Heatmap</div>
          <div className="heatmap-container">
            {/* Placeholder heatmap (real implementation would use a mapping/heatmap library) */}
            {geo_heatmap_data.length > 0 ? (
              <svg width="160" height="100" className="heatmap-svg">
                {geo_heatmap_data.map((point, i) => {
                  // point: { lat, lng, value }
                  // Place dots within the "map" for demo purposes
                  const x = (point.lng + 180) * (160 / 360);
                  const y = (90 - point.lat) * (100 / 180);
                  // Clamp value for radius/opacity
                  const radius = 5 + Math.min(15, Math.abs(point.value || 0));
                  const opacity = 0.4 + (0.4 * (point.value || 1)) / 100;
                  return (
                    <circle
                      cx={x}
                      cy={y}
                      r={radius}
                      fill="#ff9800"
                      key={i}
                      opacity={opacity}
                    />
                  );
                })}
              </svg>
            ) : (
              <div className="heatmap-placeholder">No geo data</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PollMetricWidgets;
