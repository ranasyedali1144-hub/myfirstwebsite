/* ==========================================================================
   THE MAD HATTERS PAKISTAN - INTERACTIVE JAVASCRIPT & AI ENGINE
   ========================================================================== */

// --- MOBILE NAV DRAWER ---
function toggleMobileMenu() {
    const navMenu = document.getElementById("navMenu");
    const hamburger = document.getElementById("hamburger");
    if (navMenu && hamburger) {
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
    }
}

// Close mobile drawer when clicking a menu link
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

// --- SEARCH TABS ---
function switchSearchTab(button, category) {
    document.querySelectorAll(".search-tab").forEach(tab => tab.classList.remove("active"));
    button.classList.add("active");
}

// --- MODAL CONTROLS ---
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

window.onclick = function(event) {
    const login = document.getElementById("loginModal");
    const signup = document.getElementById("signupModal");
    if (event.target === login) login.style.display = "none";
    if (event.target === signup) signup.style.display = "none";
};

function handleAuth(event, message) {
    event.preventDefault();
    alert("🎩 " + message);
    closeLogin();
    closeSignup();
}

// --- HERO SEARCH SUBMIT ---
function handleHeroSearch(event) {
    event.preventDefault();
    const dest = document.getElementById("heroDestSelect").value;
    const hatterSelect = document.getElementById("hatterDest");
    if (hatterSelect) {
        for (let i = 0; i < hatterSelect.options.length; i++) {
            if (hatterSelect.options[i].value.includes(dest.split(' ')[0])) {
                hatterSelect.selectedIndex = i;
                break;
            }
        }
    }
    document.getElementById("ai-planner").scrollIntoView({ behavior: 'smooth' });
    generateHatterItinerary();
}

// --- MAD HATTERS AI TOUR ENGINE ---
function generateHatterItinerary() {
    const dest = document.getElementById("hatterDest").value;
    const days = parseInt(document.getElementById("hatterDays").value) || 6;
    const type = document.getElementById("hatterType").value;
    const tier = document.getElementById("hatterTier").value;
    
    const outputContainer = document.getElementById("hatterOutput");
    
    outputContainer.innerHTML = `
        <div class="output-empty">
            <div class="empty-hat">🎩</div>
            <h3>Generating Mad Hatters Experiential Itinerary...</h3>
            <p>Customizing day-by-day plan for ${dest} (${type})...</p>
        </div>
    `;
    
    setTimeout(() => {
        renderHatterTour(dest, days, type, tier, outputContainer);
    }, 600);
}

function renderHatterTour(dest, days, type, tier, container) {
    let pkrPrice = "78,000";
    if (tier.includes("Luxury")) {
        pkrPrice = (days * 22000).toLocaleString();
    } else {
        pkrPrice = (days * 13000).toLocaleString();
    }

    const tourData = {
        "Hunza & Nagar Valley": [
            { day: 1, title: "Drive to Hunza via Babusar / Flight to Gilgit", desc: "Arrival in Hunza. Sunset tea at Eagle's Nest vantage point facing Rakaposhi." },
            { day: 2, title: "Altit & Baltit Forts Experiential Heritage Walk", desc: "Guided heritage walk through 800-year-old Baltit Fort and Altit Royal Gardens with local women artisans." },
            { day: 3, title: "Attabad Lake Boating & Passu Cones", desc: "Boat cruise on turquoise Attabad Lake. Walk across Hussaini Suspension Bridge & photo stop at Cathedral Ridge (Passu Cones)." },
            { day: 4, title: "Khunjerab Pass (Pak-China Border Excursion)", desc: "Drive along Karakoram Highway to Khunjerab Pass (16,000 ft). Spot Himalayan Ibex & visit world's highest ATM." },
            { day: 5, title: "Nagar Valley & Hopper Glacier", desc: "Excursion to Hopper Valley to witness the black ice Hopper Glacier." },
            { day: 6, title: "Local Souvenir Shopping & Departure", desc: "Buy authentic Hunzai dry fruits, gemstones, and handwoven shawls before departure." }
        ],
        "Skardu & Deosai Plains": [
            { day: 1, title: "Flight to Skardu & Shangrila Lake Resort", desc: "Arrival in Skardu. Check-in at Shangrila Resort (Lower Kachura Lake)." },
            { day: 2, title: "Katpana Cold Desert Dunes & Shigar Fort", desc: "Experience Katpana Sand Dunes. Stay at historic 17th-century Serena Shigar Fort." },
            { day: 3, title: "Deosai National Park & Sheosar Lake", desc: "4x4 Jeep trip across Deosai Plains (Land of Giants) to Sheosar Lake." },
            { day: 4, title: "Mantoka Waterfall & Khaplu Palace", desc: "Visit roaring Mantoka Waterfall and explore Yabgo Royal Palace in Khaplu." },
            { day: 5, title: "Upper Kachura Lake Boating", desc: "Trek to Upper Kachura Lake for trout fishing and boating." },
            { day: 6, title: "Skardu Organic Village & Flight Back", desc: "Visit Nansoq Organic Village before taking flight to Islamabad." }
        ],
        "Fairy Meadows & Nanga Parbat": [
            { day: 1, title: "Drive to Raikot Bridge & Jeep Trail", desc: "4x4 jeep ride to Tatto Village, followed by 3-hour trek to Fairy Meadows." },
            { day: 2, title: "Nanga Parbat Beyal Camp Trek", desc: "Day hike to Beyal Camp & Nanga Parbat Viewpoint (Killer Mountain 8,126m)." },
            { day: 3, title: "Reflection Lake Stargazing & Bonfire", desc: "Stargazing at Reflection Lake with traditional music & bonfire." },
            { day: 4, title: "Return Trek to Raikot & Departure", desc: "Trek back down to Tatto Village and drive towards Islamabad." }
        ],
        "Kalash Valley & Chitral": [
            { day: 1, title: "Drive to Chitral via Lowari Tunnel", desc: "Arrival in Chitral town. Visit Ayun Valley." },
            { day: 2, title: "Bumburet & Kalasha Cultural Walk", desc: "Immerse in Bumburet Valley. Meet local Kalasha women artisans & explore wooden temples." },
            { day: 3, title: "Rumbur & Birir Valleys", desc: "Explore undisturbed Rumbur valley & witness traditional animist dances." },
            { day: 4, title: "Chitral Fort & Shahi Mosque", desc: "Visit Chitral Shahi Mosque & royal fort before departure." }
        ]
    };

    const selectedItinerary = tourData[dest] || tourData["Hunza & Nagar Valley"];
    let daysGridHTML = "";

    for (let i = 0; i < Math.min(days, selectedItinerary.length); i++) {
        const item = selectedItinerary[i];
        daysGridHTML += `
            <div class="day-box">
                <h4>Day ${i+1}: ${item.title}</h4>
                <p style="font-size: 0.88rem; color: #64748b;">${item.desc}</p>
            </div>
        `;
    }

    container.innerHTML = `
        <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 14px; flex-wrap: wrap; gap: 12px;">
                <div>
                    <h3 style="font-size: 1.4rem; color: #85459a;">🎩 ${dest} (${days} Days Tour)</h3>
                    <p style="font-size: 0.85rem; color: #64748b; font-weight: 700;">Category: ${type} • Tier: ${tier}</p>
                </div>
                <div style="background: #f9f4fb; border: 1px solid #85459a; padding: 10px 18px; border-radius: 12px; text-align: right;">
                    <span style="font-size: 0.75rem; color: #64748b; text-transform: uppercase;">Est. Total Rate</span>
                    <h4 style="font-size: 1.3rem; color: #85459a;">PKR ${pkrPrice}</h4>
                </div>
            </div>

            <div class="itinerary-days">
                ${daysGridHTML}
            </div>

            <div style="margin-top: 24px; padding: 18px; background: #fff8e7; border: 1px solid #f5a623; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
                <div>
                    <h4 style="font-size: 1rem; color: #1e1e24;">📲 Want to book this exact itinerary with The Mad Hatters team?</h4>
                    <p style="font-size: 0.85rem; color: #64748b;">Speak directly with our team on WhatsApp for group dates & visa invitation letters.</p>
                </div>
                <a href="https://wa.me/923001234567?text=Hi!%20I%20want%20to%20book%20the%20${encodeURIComponent(dest)}%20${days}-day%20tour" target="_blank" class="btn btn-yellow">Chat & Book on WhatsApp 💬</a>
            </div>
        </div>
    `;
}