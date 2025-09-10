async function loadStatus() {
  try {
    const res = await fetch("status.json?_=" + Date.now()); // cache-bust
    const data = await res.json();

    // Global Status
    const global = document.getElementById("globalStatus");
    global.textContent = data.global?.message || "No status available";
    global.className = `status-banner status-${data.global?.level || "green"}`;

    // Services
    const services = document.getElementById("services");
    services.innerHTML = "";
    (data.services || []).forEach(svc => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><a href="${svc.link}" target="_blank">${svc.name}</a></td>
        <td><span class="indicator" style="background:${statusColor(svc.status)}"></span>${svc.status}</td>
      `;
      services.appendChild(row);
    });

    // Active Incidents
    const activeSection = document.getElementById("activeSection");
    const active = document.getElementById("activeIncidents");
    active.innerHTML = "";
    if (!data.active || data.active.length === 0) {
      activeSection.style.display = "none";
    } else {
      activeSection.style.display = "block";
      data.active.forEach(inc => {
        const div = document.createElement("div");
        div.className = `incident incident-${incidentColor(inc.type)}`;
        div.innerHTML = `<h3>${inc.service} - ${inc.title}</h3>`;
        inc.timeline.forEach(entry => {
          const e = document.createElement("div");
          e.className = "timeline-entry";
          e.innerHTML = `${entry.time} - <b>${entry.status}:</b> ${entry.message}`;
          div.appendChild(e);
        });
        active.appendChild(div);
      });
    }

    // Upcoming Maintenance
    const upcomingSection = document.getElementById("upcomingSection");
    const upcoming = document.getElementById("upcomingAdvisories");
    upcoming.innerHTML = "";

    if (!data.upcoming || data.upcoming.length === 0) {
      upcomingSection.style.display = "none";
    } else {
      upcomingSection.style.display = "block";

      data.upcoming.sort((a, b) => new Date(a.scheduled_for) - new Date(b.scheduled_for));

      data.upcoming.forEach(item => {
        const div = document.createElement("div");
        div.className = `incident incident-${incidentColor(item.type)}`;
        div.innerHTML = `
          <h3>${item.title}</h3>
          <div class="timeline-entry"><b>Scheduled for:</b> ${new Date(item.scheduled_for).toLocaleString()}</div>
          <div class="timeline-entry"><b>Expected duration:</b> ${item.expected_duration}</div>
          <div class="timeline-entry"><b>Affected services:</b> ${item.affects.join(', ')}</div>
          <div class="timeline-entry">${item.message}</div>
        `;
        upcoming.appendChild(div);
      });
    }

    // History
    const historySection = document.getElementById("historySection");
    const history = document.getElementById("history");
    history.innerHTML = "";
    if (!data.history || data.history.length === 0) {
      historySection.style.display = "none";
    } else {
      historySection.style.display = "block";
      data.history.forEach(h => {
        const div = document.createElement("div");
        div.className = "timeline-entry";
        div.innerHTML = `${h.date} - <b>${h.service}</b>: ${h.title}`;
        history.appendChild(div);
      });
    }

  } catch (err) {
    console.error("Failed to load status:", err);
    document.getElementById("globalStatus").textContent = "Failed to load status";
  }
}

function statusColor(status) {
  switch ((status || "").toLowerCase().trim()) {
    case "operational": return "#4CAF50";
    case "degraded performance": return "#FFC107";
    case "major outage": return "#F44336";
    case "under maintenance": return "#2196F3";
    case "scheduled maintenance": return "#2196F3";
    default: return "#999";
  }
}

function incidentColor(type) {
  switch ((type || "").toLowerCase()) {
    case "incident": return "yellow";
    case "outage": return "red";
    case "under maintenance": return "blue";
    default: return "yellow";
  }
}

loadStatus();
setInterval(loadStatus, 60000); // refresh every minute
