/* ==========================================================================
   SAFAR AI PAKISTAN - INTERACTIVE JAVASCRIPT & AI ENGINE
   ========================================================================== */

// --- MOBILE NAVIGATION DRAWER ---
function toggleMobileMenu() {
    const navMenu = document.getElementById("navMenu");
    const hamburger = document.getElementById("hamburger");
    if (navMenu && hamburger) {
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
    }
}

// Close mobile menu when clicking a nav link
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        const navMenu = document.getElementById("navMenu");
        const hamburger = document.getElementById("hamburger");
        if (navMenu && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
        }
    });
});

// --- TAB SWITCHER FOR HERO SEARCH ---
function switchTab(button, tabId) {
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
}

// --- MODALS FOR LOGIN & SIGNUP ---
function openLogin() {
    const modal = document.getElementById("loginModal");
    if (modal) modal.style.display = "flex";
}

function closeLogin() {
    const modal = document.getElementById("loginModal");
    if (modal) modal.style.display = "none";
}

function openSignup() {
    const modal = document.getElementById("signupModal");
    if (modal) modal.style.display = "flex";
}

function closeSignup() {
    const modal = document.getElementById("signupModal");
    if (modal) modal.style.display = "none";
}

// Close modals when clicking outside
window.onclick = function(event) {
    const login = document.getElementById("loginModal");
    const signup = document.getElementById("signupModal");
    if (event.target === login) login.style.display = "none";
    if (event.target === signup) signup.style.display = "none";
};

// Form Notification Helper
function handleAuth(event, message) {
    event.preventDefault();
    alert("✈️ " + message + " Welcome to SafarAI!");
    closeLogin();
    closeSignup();
}

function handleSubscribe(event) {
    event.preventDefault();
    alert("🎉 Thank you for subscribing to SafarAI travel updates & Northern Pakistan alerts!");
    event.target.reset();
}

// --- QUICK HERO SEARCH ---
function handleQuickSearch(event) {
    event.preventDefault();
    const dest = document.getElementById("destInput").value;
    if (dest) {
        // Scroll to AI Planner section and populate destination
        const plannerSelect = document.getElementById("aiDest");
        if (plannerSelect) {
            // Try to match or add value
            let matched = false;
            for (let i = 0; i < plannerSelect.options.length; i++) {
                if (plannerSelect.options[i].value.toLowerCase().includes(dest.toLowerCase())) {
                    plannerSelect.selectedIndex = i;
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                const newOpt = new Option("📍 " + dest, dest, true, true);
                plannerSelect.add(newOpt);
            }
        }
        
        document.getElementById("ai-planner").scrollIntoView({ behavior: 'smooth' });
        generateAIItinerary();
    }
}

// --- INTERACTIVE AI ITINERARY GENERATOR ---
function generateAIItinerary() {
    const dest = document.getElementById("aiDest").value;
    const days = parseInt(document.getElementById("aiDays").value) || 5;
    const style = document.getElementById("aiStyle").value;
    const tier = document.getElementById("aiTier").value;
    
    const displayContainer = document.getElementById("aiResultDisplay");
    
    // Show Loading state
    displayContainer.innerHTML = `
        <div class="result-placeholder">
            <div class="placeholder-icon">🤖</div>
            <h3>Generating SafarAI Smart Itinerary...</h3>
            <p>Analyzing routes, hotel availability, weather, and PKR rates for ${dest}...</p>
        </div>
    `;
    
    // Simulate instant AI computation
    setTimeout(() => {
        renderItinerary(dest, days, style, tier, displayContainer);
    }, 700);
}

function renderItinerary(dest, days, style, tier, container) {
    // Generate realistic dynamic data based on inputs
    let estCostPKR = "55,000";
    let estFlightBus = "Bookme.pk / Sastaticket.pk";
    let hotelPartner = "TripKar / FindMyAdventure";
    
    if (tier.includes("VIP")) {
        estCostPKR = (days * 45000).toLocaleString();
    } else if (tier.includes("Standard")) {
        estCostPKR = (days * 18000).toLocaleString();
    } else {
        estCostPKR = (days * 9000).toLocaleString();
    }

    // Build Day by Day Cards
    let daysHTML = "";
    const itinerariesData = {
        "Hunza & Nagar Valley": [
            { day: 1, title: "Arrival & Attabad Lake Cruise", desc: "Arrival in Gilgit via Naran/Babusar Pass or Flight. Drive to Hunza. Sunset boat ride at turquoise Attabad Lake & check-in at luxury valley view resort." },
            { day: 2, title: "Baltit & Altit Forts Heritage Tour", desc: "Explore 800-year-old Baltit Fort in Karimabad. Traditional Hunzai lunch (Chapshuro). Visit Altit Fort & Royal Gardens." },
            { day: 3, title: "Passu Cones & Hussaini Suspension Bridge", desc: "Drive past Cathedral Ridge (Passu Cones). Walk on the world-famous Hussaini Suspension Bridge. Trek to Passu Glacier viewpoint." },
            { day: 4, title: "Khunjerab Pass (China Border)", desc: "Excursion to Khunjerab Pass (16,000 ft) - World's highest ATM & border. Spot Himalayan Ibex in Khunjerab National Park." },
            { day: 5, title: "Eagle's Nest Sunrise & Departure", desc: "Panoromic 360-degree view of Rakaposhi, Ladyfinger & Ultar Sar peaks from Eagle's Nest Duikar. Souvenir shopping in Karimabad bazaar." }
        ],
        "Skardu & Deosai Plains": [
            { day: 1, title: "Flight to Skardu & Shangrila Lake", desc: "Land at Skardu Airport. Check-in at Shangrila Resort (Lower Kachura Lake). Visit Upper Kachura Lake for motor boating." },
            { day: 2, title: "Deosai National Park & Sheosar Lake", desc: "4x4 Jeep safari to Deosai Plains (Land of Giants). Spot Brown Bears and enjoy reflections at Sheosar Lake." },
            { day: 3, title: "Cold Desert & Shigar Fort", desc: "Experience Sand Dunes at Katpana Cold Desert. Heritage tour of 17th-century Shigar Fort." },
            { day: 4, title: "Mantoka Waterfall & Khaplu Palace", desc: "Drive along the Shyok River. Visit Mantoka Waterfall and explore historic Serena Khaplu Palace." },
            { day: 5, title: "Skardu Organic Village & Souvenirs", desc: "Visit Nansoq Organic Village. Buy fresh dry fruits and Hunza shilajit before flight departure." }
        ],
        "Swat Valley & Malam Jabba": [
            { day: 1, title: "Islamabad to Mingora & Swat River", desc: "Drive on Swat Motorway. Stop at Fizagat Park along Swat River. Overnight stay in Kalam." },
            { day: 2, title: "Malam Jabba Ski Resort & Chairlift", desc: "Full day at Malam Jabba. Enjoy Zipline, Chairlift, and snow skiing activities." },
            { day: 3, title: "Mahodand Lake & Ushu Forest", desc: "Jeep trip to Ushu Pine Forest, Matiltan Waterfall, and glacial Mahodand Lake." },
            { day: 4, title: "White Palace Marghazar & Stupas", desc: "Visit Sufi shrines, Buddhist archaeological stupas, and the historic Sufed Mahal (White Palace)." },
            { day: 5, title: "Crafts Shopping & Return", desc: "Shop famous Swati shawls, carved wooden crafts, and fresh honey before heading back." }
        ],
        "Lahore Cultural Heritage": [
            { day: 1, title: "Walled City & Badshahi Mosque", desc: "Visit Badshahi Mosque, Lahore Fort (Shahi Qila), Sheesh Mahal & Royal Kitchens." },
            { day: 2, title: "Shalimar Gardens & Wagah Border", desc: "Explore Mughal Shalimar Gardens. Afternoon trip to Wagah Border flag ceremony." },
            { day: 3, title: "Culinary Feast & Food Street", desc: "Food tour: Fort Road Food Street, Cuckoo's Den, Butt Karahi, and Haveli Restaurant." }
        ],
        "Dubai Luxury Experience": [
            { day: 1, title: "Burj Khalifa & Dubai Mall", desc: "Land at Dubai Airport. Visit 124th floor of Burj Khalifa & Dubai Fountain show." },
            { day: 2, title: "4x4 Desert Safari & BBQ Dinner", desc: "Dune bashing in Red Dunes, Camel riding, Tanoura dance show & Arabic buffet." },
            { day: 3, title: "Museum of the Future & Marina Cruise", desc: "Explore Museum of the Future. Evening Luxury Yacht cruise in Dubai Marina." }
        ]
    };

    const selectedData = itinerariesData[dest] || itinerariesData["Hunza & Nagar Valley"];
    
    for (let i = 0; i < Math.min(days, selectedData.length); i++) {
        const d = selectedData[i];
        daysHTML += `
            <div class="day-card">
                <h4>Day ${i+1}: ${d.title}</h4>
                <p style="font-size: 0.9rem; color: #94a3b8;">${d.desc}</p>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="itinerary-output">
            <div class="itinerary-output-header">
                <div>
                    <h3 style="font-size: 1.5rem; color: #f8fafc;">📍 ${dest} (${days} Days AI Plan)</h3>
                    <p style="font-size: 0.9rem; color: #10b981; font-weight: 600;">Style: ${style} • Category: ${tier}</p>
                </div>
                <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); padding: 10px 18px; border-radius: 12px; text-align: right;">
                    <span style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase;">Est. Total Budget</span>
                    <h4 style="font-size: 1.3rem; color: #10b981;">PKR ${estCostPKR}</h4>
                </div>
            </div>

            <div class="itinerary-days-grid">
                ${daysHTML}
            </div>

            <div class="booking-partners-box">
                <h4 style="font-size: 1rem; color: #f8fafc;">⚡ Ready To Book This Trip With Top Pakistani Brands?</h4>
                <p style="font-size: 0.85rem; color: #94a3b8; margin-top: 4px;">Click any partner below to compare real-time tickets and hotel rates:</p>
                <div class="partner-pills">
                    <a href="https://bookme.pk" target="_blank" class="partner-btn">🚌 Book Transport on Bookme.pk</a>
                    <a href="https://www.sastaticket.pk" target="_blank" class="partner-btn">✈️ Book Flights on Sastaticket.pk</a>
                    <a href="https://tripkar.com" target="_blank" class="partner-btn">🏨 Reserve Hotel on TripKar</a>
                    <a href="https://gerrystravel.com" target="_blank" class="partner-btn">🛂 Visa Services on Gerry's</a>
                    <a href="https://findmyadventure.pk" target="_blank" class="partner-btn">🏕️ Adventure Guide on FindMyAdventure</a>
                </div>
            </div>
        </div>
    `;
}