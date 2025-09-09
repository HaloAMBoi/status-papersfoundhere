# 📊 PapersFoundHere Status Page

This repository hosts the **PapersFoundHere Status Page**, an Atlassian-style system status page for your users. It shows global status, individual service statuses, active incidents/maintenance, and a history of past issues.  

The page is fully **static** and can be hosted on GitHub Pages or any free static webhost.

---

## ✅ File Structure

```
status/
 ├── index.html      # Main status page
 ├── style.css       # CSS (can be embedded into index.html)
 ├── status.js       # JS to load and render JSON
 ├── status.json     # Data file containing services, incidents, and history
 └── logo.png        # Your logo
```

---

## 🗂 Status JSON Structure

The page reads `status.json` to display all information.  

### 1. Global Status

```json
"global": {
  "level": "green",
  "message": "✅ All Systems Operational"
}
```

**Keywords for `level`**:

| Keyword | Meaning | Color |
|---------|---------|-------|
| green   | All Systems Operational | ✅ Green |
| yellow  | Degraded Performance   | ⚠️ Yellow |
| red     | Major Outage           | 🔴 Red |
| blue    | Maintenance            | 🔵 Blue |

`message` → Custom text displayed in the banner (emoji optional).  

---

### 2. Services

```json
{
  "name": "Main Website",
  "link": "https://www.papersfoundhere.org",
  "status": "Operational"
}
```

**Keywords for `status`**:

| Keyword               | Meaning           | Color |
|-----------------------|-----------------|-------|
| Operational           | Fully working    | ✅ Green |
| Degraded Performance  | Partial issues   | ⚠️ Yellow |
| Major Outage          | Service down     | 🔴 Red |
| Maintenance           | Under maintenance| 🔵 Blue |

---

### 3. Active Incidents / Maintenance

```json
{
  "service": "Lookup Service",
  "type": "incident",
  "title": "Degraded Performance",
  "timeline": [
    {
      "time": "10:30 PM (GMT+3)",
      "status": "Investigating",
      "message": "Users may experience delays."
    }
  ]
}
```

**Keywords for `type`**:

| Keyword      | Meaning                   | Color |
|--------------|--------------------------|-------|
| incident     | Degraded/partial problem  | Yellow |
| outage       | Major outage             | Red    |
| maintenance  | Scheduled/ongoing maintenance | Blue |

**Timeline `status` keywords**:

- **Incidents / Outages**:  
  - Investigating  
  - Identified  
  - Update  
  - Monitoring  
  - Resolved  

- **Maintenance**:  
  - Scheduled  
  - In Progress  
  - Verifying  
  - Completed  

Each timeline entry must have:  
- `time` → Timestamp (string)  
- `status` → One of the keywords above  
- `message` → Description of update  

---

### 4. History

```json
{
  "date": "09 Sept 2025",
  "service": "Lookup Service",
  "title": "Outage resolved"
}
```

- `date` → Date of incident/maintenance  
- `service` → Name of affected service  
- `title` → Short description of event  

---

## 💡 Adding Comments in JSON

JSON **does not support comments** officially. Use a `_comment` field for inline notes:

```json
{
  "_comment": "This is ignored by the status page",
  "global": {
    "level": "green",
    "message": "✅ All Systems Operational"
  }
}
```

> ⚠️ Avoid `//` or `/* */` comments; they will break JSON parsing.

---

## 🔄 Auto Refresh

The page automatically refreshes every **1 minute**, so changes in `status.json` are reflected live.  

---

## 📝 Example `status.json` Template

```json
{
  "global": {
    "level": "green",
    "message": "✅ All Systems Operational"
  },
  "services": [
    {
      "name": "Main Website",
      "link": "https://www.papersfoundhere.org",
      "status": "Operational"
    },
    {
      "name": "Lookup Service",
      "link": "https://lookup.papersfoundhere.org",
      "status": "Operational"
    }
  ],
  "active": [],
  "history": []
}
```

> Simply update `services`, `active`, and `history` with current status and incidents.  

---

## 🚀 Deployment

1. Upload the folder to **GitHub Pages** or another static host.  
2. Make sure `index.html`, `status.json`, and `logo.png` are in the same directory.  
3. Update `status.json` whenever service status or incidents change.  
4. Page auto-refreshes every 60 seconds.
