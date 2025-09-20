# 📊 PapersFoundHere Status Page

This repository hosts the **PapersFoundHere Status Page**, a static Atlassian-style system status page.
It shows **global system health**, **individual service statuses**, **active incidents/maintenance**, and a **history log** of past issues.

The page is fully static and can be hosted on **GitHub Pages** or any free static webhost.

---

## ✅ File Structure

```
status/
 ├── index.html      # Main status page
 ├── style.css       # Styling (can also be inlined into index.html)
 ├── status.js       # JS to load and render data
 ├── status.json     # Core data file for services/incidents/maintenance
 └── logo.png        # Project logo
```

---

## 🗂 Status JSON Structure

The entire status page is driven by `status.json`.

### 1. Global Status

```json
"global": {
  "level": "green",
  "message": "✅ All Systems Operational"
}
```

**Valid `level` values:**

| Level  | Meaning                 | Color     |
| ------ | ----------------------- | --------- |
| green  | All Systems Operational | ✅ Green  |
| yellow | Degraded Performance    | ⚠️ Yellow |
| red    | Major Outage            | 🔴 Red    |
| blue   | Under Maintenance       | 🔵 Blue   |

---

### 2. Services

```json
{
  "name": "Main Website",
  "link": "https://www.papersfoundhere.org",
  "status": "Operational"
}
```

**Valid `status` values:**

| Status               | Meaning           | Color     |
| -------------------- | ----------------- | --------- |
| Operational          | Fully working     | ✅ Green   |
| Degraded Performance | Partial issues    | ⚠️ Yellow |
| Major Outage         | Service down      | 🔴 Red    |
| Maintenance          | Under maintenance | 🔵 Blue   |

---

### 3. Active Incidents / Maintenance

```json
{
  "service": "Lookup Service",
  "type": "maintenance",
  "title": "Database Upgrade",
  "timeline": [
    {
      "time": "12:00 AM (GMT+3)",
      "status": "In Progress",
      "message": "Lookup Service is undergoing scheduled maintenance."
    }
  ]
}
```

**Valid `type` values:**

| Type        | Meaning               | Color     |
| ----------- | --------------------- | --------- |
| incident    | Minor/partial problem | ⚠️ Yellow |
| outage      | Major outage          | 🔴 Red    |
| under maintenance | Scheduled maintenance | 🔵 Blue   |

**Timeline `status` values:**

* Incidents/Outages → Investigating, Identified, Update, Monitoring, Resolved
* Maintenance → Scheduled, In Progress, Verifying, Completed

---

### 4. History

```json
{
  "date": "21 Sept 2025",
  "service": "Lookup Service",
  "title": "Scheduled maintenance completed"
}
```

* `date` → Date of event
* `service` → Affected service
* `title` → Short description

---

### 5. Upcoming Maintenance Advisories

```json
{
  "title": "Database Upgrade",
  "type": "maintenance",
  "scheduled_for": "2025-09-21T00:00:00+03:00",
  "expected_duration": "1 hour",
  "affects": ["Lookup Service"],
  "message": "Scheduled maintenance window for Lookup Service."
}
```

* `title` → Brief description
* `type` → Always `"maintenance"`
* `scheduled_for` → ISO datetime for start
* `expected_duration` → Estimated time
* `affects` → Array of affected services
* `message` → User-facing advisory

Advisories show **before** maintenance starts.

---

## 💡 JSON Notes

* JSON does **not** support comments.
* Use `_comment` fields for notes:

```json
{
  "_comment": "This is ignored by the status page",
  "global": { "level": "green", "message": "✅ All Systems Operational" }
}
```

---

## 🔄 Auto Refresh

The status page **auto-refreshes every 60s**, so `status.json` edits show live quickly.

---

## 📝 Example `status.json`

```json
{
  "global": {
    "level": "green",
    "message": "✅ All Systems Operational"
  },
  "services": [
    { "name": "Main Website", "link": "https://www.papersfoundhere.org", "status": "Operational" },
    { "name": "Lookup Service", "link": "https://lookup.papersfoundhere.org", "status": "Operational" }
  ],
  "active": [],
  "upcoming": [
    {
      "title": "Lookup Service Maintenance",
      "type": "maintenance",
      "scheduled_for": "2025-09-21T00:00:00+03:00",
      "expected_duration": "1 hour",
      "affects": ["Lookup Service"],
      "message": "Scheduled maintenance window for Lookup Service."
    }
  ],
  "history": []
}
```

---

## 🚀 Deployment

1. Upload repo to **GitHub Pages** or any static host.
2. Ensure `index.html`, `status.json`, and `logo.png` are in the same folder.
3. Update `status.json` whenever status changes.
4. Page auto-refreshes every 1 minute.

---

## 👨‍💻 Dev Notes

* Keep `status.json` clean and valid JSON.
* Use ISO timestamps for `scheduled_for`.
* Close maintenance events by moving them into `history` with a completion note.

