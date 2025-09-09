async function loadStatus() {
  const res = await fetch("status.json");
  const data = await res.json();

  // Global Status
  const global = document.getElementById("globalStatus");
  global.textContent = data.global.message;
  global.className = `status-banner status-${data.global.level}`;

  // Services
  const services = document.getElementById("services");
  services.innerHTML = "";
  data.services.forEach(svc => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><a href="${svc.link}" target="_blank">${svc.name}</a></td>
      <td><span class="indicator" style="background:${statusColor(svc.status)}"></span>${svc.status}</td>
    `;
    services.appendChild(row);
  });

  // Active Incidents
  const active = document.getElementById("activeIncidents");
  active.innerHTML = "";
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

  // History
  const history = document.getElementById("history");
  history.innerHTML = "";
  data.history.forEach(h => {
    const div = document.createElement("div");
    div.className = "timeline-entry";
    div.innerHTML = `${h.date} - <b>${h.service}</b>: ${h.title}`;
    history.appendChild(div);
  });
}

function statusColor(status) {
  switch (status.toLowerCase().trim()) {
    case "operational": return "#4CAF50";
    case "degraded performance": return "#FFC107";
    case "major outage": return "#F44336";
    case "maintenance": return "#2196F3";
    default: return "#999";
  }
}

function incidentColor(type) {
  switch (type.toLowerCase().trim()) {
    case "incident": return "yellow";
    case "outage": return "red";
    case "maintenance": return "blue";
    default: return "yellow";
  }
}


loadStatus();
