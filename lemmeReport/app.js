/* ============================================
   LemmeReport Application Logic
   ============================================ *//* ===========================================
   🔵 GOOGLE SHEETS BACKEND CONFIG
   =========================================== */

const API_URL = "https://script.google.com/macros/s/AKfycbxuE_jQ9rqPz12ZzU-vH4zRLkJS8IPl9WQxkASE8BYO5KhDfVVe8UcRVldEFKwFH9hz/exec";


// Report Data - will be loaded from JSON
// Define your hardcoded reports
// This array will be the *sole source* of initial data.
let allReports = [ // Changed to `let` so it can be modified later (e.g., when submitting new reports)
    {
        "id": "e001a4e1-7d1c-4b3a-8f8e-1a2b3c4d5e6f",
        "category": "safety",
        "subcategory": "threatening_behaviour",
        "description": "Group of individuals exhibiting threatening behavior towards pedestrians near the main market. Reported at 9 PM.",
        "photo": null,
        "location": {
            "lat": 28.6139,
            "lng": 77.2090
        },
        "timestamp": 1710355200000,
        "contactName": "Anonymous",
        "contactEmail": null,
        "priority": "Critical",
        "status": "Pending Investigation"
    },
    {
        "id": "f1a2b3c4-d5e6-7890-1234-567890abcdef",
        "category": "infrastructure",
        "subcategory": "broken_traffic_signals",
        "description": "Traffic lights at the intersection of MG Road and Brigade Road are completely non-functional since morning, causing significant congestion and risk.",
        "photo": null,
        "location": {
            "lat": 12.9716,
            "lng": 77.5946
        },
        "timestamp": 1710273600000,
        "contactName": "Sameer Singh",
        "contactEmail": "sameer.s@example.com",
        "priority": "High",
        "status": "Reported to Municipality"
    },
    {
        "id": "1b2c3d4e-5f6a-7890-bcde-f12345678901",
        "category": "waste",
        "subcategory": "illegal_dumping",
        "description": "Construction debris and household waste illegally dumped near the river bank, creating a public health hazard and foul smell.",
        "photo": null,
        "location": {
            "lat": 19.0760,
            "lng": 72.8777
        },
        "timestamp": 1710187200000,
        "contactName": "Priya Patel",
        "contactEmail": "priya.p@example.com",
        "priority": "Medium",
        "status": "Reported to Sanitation Dept"
    },
    {
        "id": "2c3d4e5f-6a7b-8901-cdef-123456789012",
        "category": "community",
        "subcategory": "vandalism_graffiti",
        "description": "Public park benches and walls covered in offensive graffiti overnight. Needs immediate cleaning and restoration.",
        "photo": null,
        "location": {
            "lat": 22.5726,
            "lng": 88.3639
        },
        "timestamp": 1710014400000,
        "contactName": "Anonymous",
        "contactEmail": null,
        "priority": "Medium",
        "status": "Acknowledged"
    },
    {
        "id": "3d4e5f6a-7b8c-9012-def1-234567890123",
        "category": "services",
        "subcategory": "electricity_outage",
        "description": "Complete power outage in the entire residential colony for the past 4 hours. No official updates received.",
        "photo": null,
        "location": {
            "lat": 13.0827,
            "lng": 80.2707
        },
        "timestamp": 1710266400000,
        "contactName": "Karthik Reddy",
        "contactEmail": "karthik.r@example.com",
        "priority": "High",
        "status": "Reported to Municipality"
    },
    {
        "id": "4e5f6a7b-8c9d-0123-ef12-345678901234",
        "category": "digital",
        "subcategory": "wrong_map_information",
        "description": "Google Maps shows an old road closure that no longer exists, causing confusion and detours for drivers.",
        "photo": null,
        "location": {
            "lat": 17.3850,
            "lng": 78.4867
        },
        "timestamp": 1709928000000,
        "contactName": "Suresh Kumar",
        "contactEmail": "suresh.k@example.com",
        "priority": "Low",
        "status": "Acknowledged"
    },
    {
        "id": "5f6a7b8c-9d0e-1234-f123-456789012345",
        "category": "safety",
        "subcategory": "unsafe_dark_zone",
        "description": "Several streetlights are out of order in the park near Sector 18, making it unsafe after dusk.",
        "photo": null,
        "location": {
            "lat": 28.5355,
            "lng": 77.3910
        },
        "timestamp": 1710100800000,
        "contactName": "Anonymous",
        "contactEmail": null,
        "priority": "Critical",
        "status": "Pending Investigation"
    },
    {
        "id": "6a7b8c9d-0e1f-2345-1234-567890123456",
        "category": "infrastructure",
        "subcategory": "water_leakage",
        "description": "Major water pipe burst on XYZ Street, leading to significant water wastage and flooding on the road.",
        "photo": null,
        "location": {
            "lat": 18.5204,
            "lng": 73.8567
        },
        "timestamp": 1710344400000,
        "contactName": "Meera Joshi",
        "contactEmail": "meera.j@example.com",
        "priority": "Medium",
        "status": "Reported to Municipality"
    },
    {
        "id": "7b8c9d0e-1f2a-3456-2345-678901234567",
        "category": "waste",
        "subcategory": "mosquito_breeding",
        "description": "Stagnant water in an abandoned plot is a potential mosquito breeding ground. Needs urgent attention to prevent dengue.",
        "photo": null,
        "location": {
            "lat": 23.0225,
            "lng": 72.5714
        },
        "timestamp": 1709841600000,
        "contactName": "Anonymous",
        "contactEmail": null,
        "priority": "Medium",
        "status": "Reported to Sanitation Dept"
    },
    {
        "id": "8c9d0e1f-2a3b-4567-3456-789012345678",
        "category": "community",
        "subcategory": "illegal_parking",
        "description": "Vehicles regularly parked illegally in front of hospital entrance, blocking emergency access.",
        "photo": null,
        "location": {
            "lat": 26.9124,
            "lng": 75.7873
        },
        "timestamp": 1710252000000,
        "contactName": "Ravi Sharma",
        "contactEmail": "ravi.s@example.com",
        "priority": "High",
        "status": "Acknowledged"
    }
];
/* ============================================
   Data Management
   ============================================ */

// Load reports from JSON file
// Simpler loadReportsFromJSON if you ONLY want to use the hardcoded data
async function loadReportsFromJSON() {
    console.warn('Using hardcoded initial dummy dataset.');
    return initialReportsData;
}

// Save report data as downloadable JSON
function downloadReportsJSON() {
    const dataStr = JSON.stringify(allReports, null, 4);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    link.click();
    URL.revokeObjectURL(url);
    console.log('Downloaded updated data.json with', allReports.length, 'reports');
}

// Display JSON data for copying
function showJSONData() {
    const jsonStr = JSON.stringify(allReports, null, 4);
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;';
    modal.innerHTML = `
        <div style="background:#1e293b;border-radius:20px;padding:30px;max-width:800px;width:100%;max-height:80vh;overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,0.5);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h2 style="color:#f8fafc;margin:0;">📋 Report Data (JSON)</h2>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background:#ef4444;color:white;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;font-weight:600;">Close</button>
            </div>
            <p style="color:#cbd5e1;margin-bottom:15px;">Copy this JSON and paste it into your <code>data.json</code> file:</p>
            <textarea readonly style="width:100%;height:400px;background:#0f172a;color:#10b981;border:1px solid #334155;border-radius:12px;padding:15px;font-family:monospace;font-size:13px;line-height:1.5;" onclick="this.select()">${jsonStr}</textarea>
            <div style="margin-top:15px;display:flex;gap:10px;">
                <button onclick="navigator.clipboard.writeText(this.parentElement.previousElementSibling.value);alert('Copied to clipboard!')" style="background:#6366f1;color:white;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-weight:600;flex:1;">📋 Copy to Clipboard</button>
                <button onclick="window.downloadReportsJSON()" style="background:#10b981;color:white;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-weight:600;flex:1;">💾 Download JSON</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Make functions globally available
window.downloadReportsJSON = downloadReportsJSON;
window.showJSONData = showJSONData;

// Global Variables
const INDIA_CENTER = [20.5937, 78.9629];
const INITIAL_ZOOM = 5;
const LAST_REPORT_TIME_KEY = "lastReportTime";
let userCoords = null;
let citizenMap = null;
let municipalityMap = null;
let policeMap = null;
let reportFormLeafletMap = null; // <-- NEW: For the map inside the report form
let reportFormMapMarker = null; // <-- NEW: To manage the marker on the form map

// DOM Elements
const views = document.querySelectorAll('.view-section');
const navButtons = document.querySelectorAll('.dashboard-nav .btn');
const reportForm = document.getElementById("reportForm");
const categorySelect = document.getElementById("category");
const categorySpecificFields = document.getElementById("category-specific-fields");
const locateBtn = document.getElementById("locateBtn");
//const mapPreview = document.getElementById("mapPreview");
//const mapStaticImage = document.getElementById("mapStaticImage");
const reportFormMapContainer = document.getElementById("reportFormMap");
const mapPreviewText = document.getElementById("mapPreviewText");
const cooldownMsg = document.getElementById("cooldownMsg");
const manualLatInput = document.getElementById("manual-lat");
const manualLngInput = document.getElementById("manual-lng");
const createReportBtn = document.getElementById("create-report-btn");
const reportFormContainer = document.getElementById("report-form-container");
const citizenReportList = document.getElementById("citizenReportList");
const municipalityReportList = document.getElementById("municipalityReportList");
const policeReportList = document.getElementById("policeReportList");

// Category Templates
const categoryTemplates = {
    "safety": `
        <div>
            <label for="subcategory_safety">Type of Safety Issue</label>
            <select id="subcategory_safety" name="subcategory" required>
                <option value="">Select subcategory...</option>
                <option value="sexual_harassment">Sexual harassment</option>
                <option value="stalking">Stalking / being followed</option>
                <option value="threatening_behaviour">Threatening behaviour</option>
                <option value="verbal_abuse">Verbal abuse</option>
                <option value="public_intoxication">Public intoxication causing threat</option>
                <option value="domestic_violence">Domestic violence alert (anonymous tip)</option>
                <option value="suspicious_person">Suspicious person/activity</option>
                <option value="unsafe_dark_zone">Unsafe dark zone (lights not working)</option>
            </select>
            <small style="display: block; margin-top: 8px; color: #ef4444;">🔥 Critical: Automated alert sent to Police HQ & nearby citizens</small>
        </div>
    `,
    "infrastructure": `
        <div>
            <label for="subcategory_infrastructure">Type of Infrastructure Issue</label>
            <select id="subcategory_infrastructure" name="subcategory" required>
                <option value="">Select subcategory...</option>
                <option value="potholes">Potholes</option>
                <option value="open_drainage">Open drainage / manholes</option>
                <option value="damaged_sidewalks">Damaged sidewalks</option>
                <option value="streetlight_not_working">Streetlight not working</option>
                <option value="broken_traffic_signals">Broken traffic signals</option>
                <option value="water_leakage">Water leakage</option>
                <option value="low_water_pressure">Low water pressure</option>
                <option value="sewage_overflow">Sewage overflow</option>
                <option value="road_construction_debris">Road construction debris</option>
                <option value="fallen_trees">Fallen trees / broken branches</option>
            </select>
            <small style="display: block; margin-top: 8px; color: #10b981;">📌 High/Medium: Notifies Municipality</small>
        </div>
    `,
    "waste": `
        <div>
            <label for="subcategory_waste">Type of Waste Issue</label>
            <select id="subcategory_waste" name="subcategory" required>
                <option value="">Select subcategory...</option>
                <option value="garbage_not_collected">Garbage not collected</option>
                <option value="overflowing_trash_bins">Overflowing trash bins</option>
                <option value="illegal_dumping">Illegal dumping</option>
                <option value="dead_animals">Dead animals on the street</option>
                <option value="mosquito_breeding">Mosquito breeding sites</option>
                <option value="public_toilet_issues">Public toilet issues</option>
                <option value="sewage_smell">Sewage smell in area</option>
            </select>
            <small style="display: block; margin-top: 8px; color: #10b981;">📌 Medium: Notifies Municipality</small>
        </div>
    `,
    "community": `
        <div>
            <label for="subcategory_community">Type of Community Issue</label>
            <select id="subcategory_community" name="subcategory" required>
                <option value="">Select subcategory...</option>
                <option value="noise_complaints">Noise complaints</option>
                <option value="public_nuisance">Public nuisance</option>
                <option value="illegal_parking">Illegal parking</option>
                <option value="vandalism_graffiti">Vandalism/graffiti</option>
                <option value="street_vendors_blocking">Street vendors blocking pathway</option>
                <option value="begging_zones">Begging in certain zones</option>
                <option value="fire_hazard_behaviour">Fire hazard behaviour</option>
            </select>
            <small style="display: block; margin-top: 8px; color: #f59e0b;">📌 Varies by severity, notifies local authorities</small>
        </div>
    `,
    "services": `
        <div>
            <label for="subcategory_services">Type of Service Issue</label>
            <select id="subcategory_services" name="subcategory" required>
                <option value="">Select subcategory...</option>
                <option value="electricity_outage">Electricity outage</option>
                <option value="internet_outage">Internet outage</option>
                <option value="water_contamination">Water contamination</option>
                <option value="bus_stop_issues">Bus stop issues</option>
                <option value="broken_public_benches">Broken public benches</option>
                <option value="non_functioning_public_facilities">Non-functioning public facilities</option>
            </select>
            <small style="display: block; margin-top: 8px; color: #10b981;">📌 Notifies relevant service provider</small>
        </div>
    `,
    "digital": `
        <div>
            <label for="subcategory_digital">Type of Digital/Administrative Issue</label>
            <select id="subcategory_digital" name="subcategory" required>
                <option value="">Select subcategory...</option>
                <option value="broken_signboards">Broken signboards</option>
                <option value="wrong_map_information">Wrong map information</option>
                <option value="incorrect_naming">Incorrect street/area naming</option>
                <option value="app_portal_malfunction">App/portal malfunction</option>
                <option value="public_info_kiosk_down">Public info kiosk down</option>
            </select>
            <small style="display: block; margin-top: 8px; color: #94a3b8;">📌 Low: Notifies administrative department</small>
        </div>
    `
};

/* ============================================
   Navigation & View Management
   ============================================ */

function showView(viewId) {
    views.forEach(view => {
        view.style.display = 'none';
        view.classList.remove('fade-in');
    });
    
    const activeView = document.getElementById(viewId);
    if (activeView) {
        activeView.style.display = 'block';
        setTimeout(() => activeView.classList.add('fade-in'), 10);
    }

    navButtons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`nav-${viewId.replace('-view', '')}`);
    if (activeBtn) activeBtn.classList.add('active');

    // Render appropriate content
    setTimeout(() => {
        if (viewId === 'citizen-view') {
            renderReports(citizenReportList, 'citizen');
            setTimeout(() => initializeMap('citizen-map-container', 'all'), 200);
        } else if (viewId === 'municipality-view') {
            renderReports(municipalityReportList, 'municipality');
            setTimeout(() => initializeMap('municipality-map-container', 'municipality'), 200);
        } else if (viewId === 'police-view') {
            renderReports(policeReportList, 'police');
            setTimeout(() => initializeMap('police-map-container', 'police'), 200);
        }
    }, 100);
}

// Map Management (Leaflet)
// ... (your existing initializeMap function)

// NEW: Function to initialize the small map in the report form
function initializeReportFormMap() {
    if (reportFormLeafletMap) {
        reportFormLeafletMap.remove(); // Remove existing map if any
    }
    
    reportFormLeafletMap = L.map('reportFormMap').setView(INDIA_CENTER, INITIAL_ZOOM + 2); // Slightly more zoomed in
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(reportFormLeafletMap);

    // Initial message on the map
    mapPreviewText.style.display = 'block';

    // Event listener for map clicks to set manual location
    reportFormLeafletMap.on('click', (e) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        manualLatInput.value = lat.toFixed(4);
        manualLngInput.value = lng.toFixed(4);
        userCoords = { lat, lng };
        updateReportFormMapMarker(lat, lng);
        mapPreviewText.style.display = 'none'; // Hide text once a location is clicked
    });

    // Invalidate size after map is displayed to ensure it renders correctly
    setTimeout(() => {
        if (reportFormLeafletMap) reportFormLeafletMap.invalidateSize();
    }, 100);
}

// NEW: Function to update the marker on the form map
function updateReportFormMapMarker(lat, lng) {
    if (reportFormMapMarker) {
        reportFormMapMarker.setLatLng([lat, lng]);
    } else {
        reportFormMapMarker = L.marker([lat, lng]).addTo(reportFormLeafletMap);
    }
    reportFormLeafletMap.setView([lat, lng], 15); // Zoom to the new location
    mapPreviewText.style.display = 'none'; // Hide the text overlay
}

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const viewId = button.id.replace('nav-', '') + '-view';
        showView(viewId);
    });
});

document.getElementById('go-to-report').addEventListener('click', () => {
    showView('citizen-view');
    reportFormContainer.style.display = 'block';
    reportFormContainer.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('go-to-citizen-reports').addEventListener('click', () => {
    showView('citizen-view');
    reportFormContainer.style.display = 'none';
});

createReportBtn.addEventListener('click', () => {
    if (reportFormContainer.style.display === 'none') {
        reportFormContainer.style.display = 'block';
        reportFormContainer.scrollIntoView({ behavior: 'smooth' });
    } else {
        reportFormContainer.style.display = 'none';
    }
});

/* ============================================
   Form Handling
   ============================================ */

categorySelect.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;
    categorySpecificFields.innerHTML = categoryTemplates[selectedCategory] || '';
});

function checkCooldown() {
    const last = Number(localStorage.getItem(LAST_REPORT_TIME_KEY) || 0);
    const now = Date.now();
    const diff = now - last;
    const cooldownPeriod = 60000; // 1 minute

    if (diff < cooldownPeriod) {
        const remaining = Math.ceil((cooldownPeriod - diff) / 1000);
        cooldownMsg.textContent = `Please wait ${remaining}s before submitting another report.`;
        reportForm.querySelector('button[type="submit"]').disabled = true;
        return true;
    }

    cooldownMsg.textContent = "";
    reportForm.querySelector('button[type="submit"]').disabled = false;
    return false;
}

setInterval(checkCooldown, 1000);

reportForm.onsubmit = async (e) => {
    e.preventDefault();

    if (checkCooldown()) return;

    const fd = new FormData(reportForm);
    const category = fd.get("category");
    const subcategory = fd.get("subcategory");

    let priority = "Low";
    let status = "Under Review";
    let alertMessage = "";

    switch (category) {
        case "safety":
            priority = "Critical";
            status = "Pending Investigation";
            alertMessage = "🔥 Critical Alert! Automated message sent to Police Headquarters. Nearby citizens will be alerted.";
            break;
        case "infrastructure":
        case "services":
            priority = (subcategory === "electricity_outage" || subcategory === "open_drainage" || subcategory === "broken_traffic_signals") ? "High" : "Medium";
            status = "Reported to Municipality";
            alertMessage = `📌 ${priority} Priority! Notification sent to the Municipality.`;
            break;
        case "waste":
            priority = "Medium";
            status = "Reported to Sanitation Dept";
            alertMessage = "📌 Medium Priority! Notification sent to the Sanitation Department.";
            break;
        case "community":
            priority = "Medium";
            status = "Acknowledged";
            alertMessage = "📢 Report Acknowledged. Local authorities notified for review.";
            break;
        case "digital":
            priority = "Low";
            status = "Acknowledged";
            alertMessage = "🌐 Report Acknowledged. Administrative department notified.";
            break;
    if (reportFormMapMarker) {
        reportFormLeafletMap.removeLayer(reportFormMapMarker);
        reportFormMapMarker = null;
    }
    reportFormLeafletMap.setView(INDIA_CENTER, INITIAL_ZOOM + 2); // Reset map view
    mapPreviewText.style.display = 'block'; // Show the initial text again
    mapPreviewText.textContent = 'Click "Detect My Location" or enter coordinates manually.';
    }

    const file = fd.get("photo");
    let photoBase64 = null;

    if (file && file.size > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        await new Promise(resolve => {
            reader.onload = () => {
                photoBase64 = reader.result;
                resolve();
            };
        });
    }

    const report = {
        id: crypto.randomUUID(),
        category: category,
        subcategory: subcategory,
        description: fd.get("description"),
        photo: photoBase64,
        location: userCoords || { lat: null, lng: null },
        timestamp: Date.now(),
        contactName: fd.get("contactName") || "Anonymous",
        contactEmail: fd.get("contactEmail") || null,
        priority: priority,
        status: status
    };

    allReports.unshift(report);
    localStorage.setItem(LAST_REPORT_TIME_KEY, Date.now());

    // Show success message with option to download JSON
    alert(alertMessage + "\n\n💾 Don't forget to export your data! Check the console or press Ctrl+Shift+J to export.");
    
    // Log export instructions
    console.log('\n🎉 Report submitted successfully!');
    console.log('📊 Total reports:', allReports.length);
    console.log('💾 To export data: Type showJSONData() in console or downloadReportsJSON()');
    console.log('\nYour new report:', report);
    
    reportForm.reset();
    categorySpecificFields.innerHTML = '';
    userCoords = null;
    manualLatInput.value = '';
    manualLngInput.value = '';
    mapPreview.classList.remove('active-location');
    mapStaticImage.style.display = 'none';
    mapPreviewText.style.display = 'block';
    mapPreviewText.textContent = 'Click "Detect My Location" or enter coordinates manually.';

    showView('citizen-view');
    reportFormContainer.style.display = 'none';
};

/* ============================================
   Geolocation
   ============================================ */

// Handle manual location inputs
manualLatInput.addEventListener('input', updateLocationFromManualInputs);
manualLngInput.addEventListener('input', updateLocationFromManualInputs);

function updateLocationFromManualInputs() {
    const lat = parseFloat(manualLatInput.value);
    const lng = parseFloat(manualLngInput.value);
    
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        userCoords = { lat, lng };
        updateReportFormMapMarker(lat, lng); // <-- NEW: Update the form map marker
        mapPreviewText.style.display = 'none'; // <-- NEW: Hide text once location is valid
        // mapPreview.classList.add('active-location'); // REMOVE THIS LINE
    } else {
        // Only show message if inputs are non-empty and invalid
        if (manualLatInput.value || manualLngInput.value) {
            mapPreviewText.textContent = 'Invalid coordinates. Please check your input.';
            mapPreviewText.style.display = 'block'; // Show error message
        } else {
            // If both are empty, reset to initial state
            mapPreviewText.textContent = 'Click "Detect My Location" or enter coordinates manually.';
            mapPreviewText.style.display = 'block';
            if (reportFormMapMarker) {
                reportFormLeafletMap.removeLayer(reportFormMapMarker);
                reportFormMapMarker = null;
            }
            reportFormLeafletMap.setView(INDIA_CENTER, INITIAL_ZOOM + 2); // Reset map view
        }
        userCoords = null; // Clear userCoords if input is invalid/empty
        // mapPreview.classList.remove('active-location'); // REMOVE THIS LINE
    }
}

locateBtn.onclick = () => {
    if (navigator.geolocation) {
        locateBtn.disabled = true;
        locateBtn.innerHTML = '<span class="btn-icon">⏳</span> if detected will update in the position box...below';
        
        navigator.geolocation.getCurrentPosition((pos) => {
            userCoords = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            };
            
            // Update manual inputs
            manualLatInput.value = userCoords.lat.toFixed(4);
            manualLngInput.value = userCoords.lng.toFixed(4);
            
            updateReportFormMapMarker(userCoords.lat, userCoords.lng); // <-- NEW: Update the form map marke

            locateBtn.disabled = false;
            locateBtn.innerHTML = '<span class="btn-icon">✅</span> Location Detected';
            
            setTimeout(() => {
                locateBtn.innerHTML = '<span class="btn-icon">📍</span> Detect My Location';
            }, 3000);
        }, (error) => {
            console.error("Geolocation error:", error);
            alert("Could not detect location. Please ensure location services are enabled or enter coordinates manually.");
            mapPreviewText.textContent = 'Location detection updated';
            mapPreviewText.style.display = 'block'; // Show error message on the map
            locateBtn.disabled = false;
            locateBtn.innerHTML = '<span class="btn-icon">📍</span> Detect My Location';
        }, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
    } else {
        alert("Geolocation is not supported. Please enter coordinates manually.");
    }
};

/* ============================================
   Report Rendering
   ============================================ */

function createReportCard(report) {
    const div = document.createElement("div");
    div.className = "card glass report-card";
    
    let locationHtml = '';
    if (report.location && report.location.lat && report.location.lng) {
        locationHtml = `<a class="location-link" href="https://www.openstreetmap.org/?mlat=${report.location.lat}&mlon=${report.location.lng}#map=16/${report.location.lat}/${report.location.lng}" target="_blank">📍 View on Map</a>`;
    }

    const priorityColors = {
        "Critical": "#ef4444",
        "High": "#f59e0b",
        "Medium": "#10b981",
        "Low": "#94a3b8"
    };

    const subcategoryText = report.subcategory ? report.subcategory.replace(/_/g, ' ') : 'N/A';
    
    div.innerHTML = `
        <b>${report.category.charAt(0).toUpperCase() + report.category.slice(1)} - ${subcategoryText}</b>
        <p>${report.description}</p>
        ${report.photo ? `<img src="${report.photo}" alt="Report photo" loading="lazy" />` : ""}
        <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 10px;">
            <p style="margin: 0;">Priority: <span style="font-weight: 700; color: ${priorityColors[report.priority]};">${report.priority}</span></p>
            <p style="margin: 0;">Status: <span style="font-weight: 700;">${report.status}</span></p>
        </div>
        <small>Reported: ${new Date(report.timestamp).toLocaleString()} ${locationHtml}</small>
    `;
    
    return div;
}

function renderReports(targetElement, viewType) {
    targetElement.innerHTML = '';
    
    let filteredReports = [];
    const sortedReports = [...allReports].sort((a, b) => b.timestamp - a.timestamp);
    
    if (viewType === 'citizen') {
        filteredReports = sortedReports;
    } else if (viewType === 'municipality') {
        filteredReports = sortedReports.filter(r => 
            r.category === 'infrastructure' || 
            r.category === 'waste' || 
            r.category === 'services' ||
            (r.category === 'community' && ['vandalism_graffiti', 'street_vendors_blocking', 'illegal_parking'].includes(r.subcategory))
        );
    } else if (viewType === 'police') {
        filteredReports = sortedReports.filter(r => 
            r.category === 'safety' || (r.category === 'community' && r.priority === 'High')
        );
    }

    if (filteredReports.length === 0) {
        targetElement.innerHTML = `<div class="card glass empty-card"><p>No reports to display for this view yet.</p></div>`;
    } else {
        filteredReports.forEach(r => {
            targetElement.appendChild(createReportCard(r));
        });
    }
}

/* ============================================
   Map Management (Leaflet)
   ============================================ */

function initializeMap(containerId, viewType) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Map container not found:', containerId);
        return;
    }

    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        return;
    }

    let map;
    
    // Get or create map instance
    try {
        if (containerId === 'citizen-map-container') {
            if (citizenMap) {
                citizenMap.remove();
                citizenMap = null;
            }
            map = citizenMap = L.map(containerId).setView(INDIA_CENTER, INITIAL_ZOOM);
        } else if (containerId === 'municipality-map-container') {
            if (municipalityMap) {
                municipalityMap.remove();
                municipalityMap = null;
            }
            map = municipalityMap = L.map(containerId).setView(INDIA_CENTER, INITIAL_ZOOM);
        } else if (containerId === 'police-map-container') {
            if (policeMap) {
                policeMap.remove();
                policeMap = null;
            }
            map = policeMap = L.map(containerId).setView(INDIA_CENTER, INITIAL_ZOOM);
        }
    } catch (error) {
        console.error('Error creating map:', error);
        return;
    }

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Filter reports based on view type
    let filteredReports = allReports.filter(r => r.location && r.location.lat && r.location.lng);
    
    if (viewType === 'municipality') {
        filteredReports = filteredReports.filter(r => 
            r.category === 'infrastructure' || 
            r.category === 'waste' || 
            r.category === 'services' ||
            (r.category === 'community' && ['vandalism_graffiti', 'street_vendors_blocking', 'illegal_parking'].includes(r.subcategory))
        );
    } else if (viewType === 'police') {
        filteredReports = filteredReports.filter(r => 
            r.category === 'safety' || (r.category === 'community' && r.priority === 'High')
        );
    }

    // Add markers
    filteredReports.forEach(report => {
        const markerColors = {
            "Critical": '#ef4444',
            "High": '#f59e0b',
            "Medium": '#10b981',
            "Low": '#6366f1'
        };
        
        const color = markerColors[report.priority] || '#6366f1';

        const customIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color:${color}; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.4);"></div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
            popupAnchor: [0, -14]
        });

        const marker = L.marker([report.location.lat, report.location.lng], {icon: customIcon}).addTo(map);
        
        const subcategoryText = report.subcategory ? report.subcategory.replace(/_/g, ' ') : 'N/A';
        
        marker.bindPopup(`
            <div style="color: #1e293b; min-width: 200px;">
                <b style="font-size: 1.1em;">${report.category} - ${subcategoryText}</b><br>
                <p style="margin: 8px 0;">${report.description.substring(0, 100)}${report.description.length > 100 ? '...' : ''}</p>
                <div style="margin: 5px 0;">
                    <strong>Priority:</strong> <span style="color: ${color}; font-weight: 700;">${report.priority}</span>
                </div>
                <small style="color: #64748b;">${new Date(report.timestamp).toLocaleString()}</small><br>
                <a href="https://www.openstreetmap.org/?mlat=${report.location.lat}&mlon=${report.location.lng}#map=16/${report.location.lat}/${report.location.lng}" target="_blank" style="color: #6366f1; font-weight: 600; text-decoration: none;">View Full Map →</a>
            </div>
        `);
    });

    // Fit bounds if there are markers
    if (filteredReports.length > 0) {
        const bounds = L.latLngBounds(filteredReports.map(r => [r.location.lat, r.location.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
    }

    // Fix map rendering after display
    setTimeout(() => {
        if (map) {
            map.invalidateSize();
        }
    }, 250);
}

/* ============================================
   Initialize Application
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
    // We no longer need to await loadReportsFromJSON() as allReports is already defined
    // allReports = await loadReportsFromJSON(); // <--- REMOVE THIS LINE
    
    // Show initial view with the already-defined hardcoded reports
    showView('citizen-view');
    checkCooldown();
    
    // Log instructions
    console.log('%c🛡️ LemmeReport Loaded!', 'font-size:20px;font-weight:bold;color:#6366f1');
    console.log('%c📊 Loaded ' + allReports.length + ' reports (using hardcoded data).', 'color:#10b981'); // Updated log
    console.log('%c\n💡 Helpful Commands:', 'font-weight:bold;color:#f59e0b');
    console.log('%c   showJSONData()     - View/copy all report data', 'color:#cbd5e1');
    console.log('%c   downloadReportsJSON() - Download data.json file', 'color:#cbd5e1');
    console.log('%c\n🚀 Submit a report to add it to the dataset!', 'color:#ec4899');
});
