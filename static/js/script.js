// ================================================================
// SAFARAI — INTERACTIVE SCRIPTS
// ================================================================

// --- NAV SCROLL SHADOW ---
window.addEventListener('scroll', () => {
    const header = document.getElementById('siteHeader');
    if (header) {
        header.style.boxShadow = window.scrollY > 10
            ? '0 4px 24px rgba(0,0,0,.08)'
            : '0 1px 0 #e8e4e0';
    }
});

// --- MOBILE DRAWER ---
function toggleNav() {
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const toggle = document.getElementById('menuToggle');
    if (!drawer) return;
    const isOpen = drawer.classList.contains('open');
    drawer.classList.toggle('open', !isOpen);
    overlay.classList.toggle('open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
}

// --- SMOOTH ACTIVE NAV LINK ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.style.color = link.getAttribute('href') === `#${entry.target.id}`
                    ? 'var(--purple)'
                    : '';
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// --- MODAL: BOOKING ---
function openBook() {
    document.getElementById('bookModal').classList.add('open');
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeBook() {
    document.getElementById('bookModal').classList.remove('open');
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

function handleBook(e) {
    e.preventDefault();
    closeBook();
    showToast('🎉 Booking request sent! Our team will contact you on WhatsApp within 24 hours.');
}

// --- CONTACT FORM ---
function handleContact(e) {
    e.preventDefault();
    showToast('✦ Thank you! Your message has been received. We\'ll reply within a few hours.');
    e.target.reset();
}

// --- TOAST NOTIFICATION ---
function showToast(message) {
    const existing = document.getElementById('toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.textContent = message;
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '90px',
        right: '26px',
        background: '#222',
        color: '#fff',
        padding: '14px 20px',
        borderRadius: '8px',
        fontSize: '.88rem',
        maxWidth: '340px',
        zIndex: '9999',
        boxShadow: '0 10px 30px rgba(0,0,0,.2)',
        lineHeight: '1.5',
        opacity: '0',
        transform: 'translateY(10px)',
        transition: 'all .3s ease'
    });

    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// --- AI PLANNER ENGINE ---
const tourData = {
    'Hunza & Nagar Valley': {
        season: 'October–November (Autumn Colours)',
        days: [
            ['Arrival & Eagle\'s Nest', 'Drive to Karimabad via Babusar Pass. Sunset tea at Eagle\'s Nest with panorama of Rakaposhi & Ladyfinger peaks.'],
            ['Baltit Fort & Altit Heritage Walk', 'Guided walk through 800-year-old Baltit Fort. Local lunch of Chapshuro. Royal Altit Fort gardens.'],
            ['Attabad Lake & Hussaini Bridge', 'Turquoise boat cruise on Attabad Lake. Cross Hussaini Suspension Bridge. Cathedral Ridge viewpoint at Passu.'],
            ['Khunjerab Pass (China Border)', 'Drive along Karakoram Highway to Khunjerab Pass, 16,000 ft. Spot Himalayan Ibex.'],
            ['Nagar Valley & Hopper Glacier', 'Excursion through Nagar Valley to the black Hopper Glacier. Walnut groves and local homestay.'],
            ['Bazaar & Departure', 'Shop Hunzai dry fruits, gemstones, and hand-carved items at Karimabad bazaar.']
        ],
        partners: { transport: 'Bookme.pk (Coaster via KKH)', hotel: 'TripKar.com (Valley-view resorts)' }
    },
    'Skardu & Deosai': {
        season: 'June–September (Summer Expeditions)',
        days: [
            ['PIA/AirSial Flight to Skardu', 'Morning flight. Transfer to Shangrila Resort (Lower Kachura Lake). Evening boating.'],
            ['Katpana Cold Desert', 'Sand dunes at Katpana. Shigar Fort stay at Serena Heritage Hotel.'],
            ['Deosai National Park', '4×4 Jeep to Deosai Plains—Sheosar Lake reflections and brown bear sighting.'],
            ['Mantoka Waterfall & Khaplu', 'Visit Mantoka Waterfall en route to Khaplu Palace.'],
            ['Upper Kachura Lake', 'Trek to the forest-ringed Upper Kachura Lake. Trout fishing.'],
            ['Skardu Market & Departure', 'Buy local apricots & gems. Evening flight back.']
        ],
        partners: { transport: 'Sastaticket.pk (Skardu Flights)', hotel: 'TripKar.com / Serena Hotels' }
    },
    'Fairy Meadows': {
        season: 'June–August (Crystal Clear Skies)',
        days: [
            ['Raikot Bridge & Jeep Trail', '4×4 jeep ride to Tatto Village. 3-hour trek to Fairy Meadows camp.'],
            ['Nanga Parbat Viewpoint', 'Day hike to Beyal Camp below Nanga Parbat\'s 8,126m summit.'],
            ['Reflection Lake & Stargazing', 'Glacial Reflection Lake at dusk. Bonfire and stargazing at altitude.'],
            ['Return & Departure', 'Morning trek down. Drive back towards Chilas and onwards.']
        ],
        partners: { transport: 'FindMyAdventure.pk (Guide & Camp)', hotel: 'Camping by FindMyAdventure' }
    },
    'Kalash & Chitral': {
        season: 'May (Chilam Joshi Festival)',
        days: [
            ['Drive via Lowari Tunnel', 'Arrival in Chitral town. Evening at Ayun Valley.'],
            ['Bumburet Valley Cultural Immersion', 'Meet Kalasha women artisans. Witness wooden temple rituals.'],
            ['Rumbur Valley', 'Explore the quieter, less-visited Rumbur valley with a local guide.'],
            ['Chitral Fort & Mosque', 'Royal Shahi Mosque and Chitral Fort before drive home.'],
            ['Return Journey', 'Drive back to Peshawar. Optional overnight in Dir.']
        ],
        partners: { transport: 'Bookme.pk (Buses Peshawar→Chitral)', hotel: 'Gerry\'s Travel (Custom Packages)' }
    },
    'Swat & Kalam': {
        season: 'June–September (Lush Green Season)',
        days: [
            ['Islamabad to Kalam via Swat Motorway', 'Drive on Swat Expressway. Stop at Fizagat Park.'],
            ['Malam Jabba Chairlift & Adventure', 'Zipline, chairlift, and optional skiing at Pakistan\'s main ski resort.'],
            ['Mahodand Lake Trek', 'Jeep to Ushu Forest & glacial Mahodand Lake.'],
            ['Matiltan Waterfall', 'Trek to the powerful Matiltan Waterfall in a side valley.'],
            ['Return & Swati Crafts', 'Buy famous Swati shawls, carved walnut wood, and honey.']
        ],
        partners: { transport: 'Bookme.pk (Daewoo Islamabad→Mingora)', hotel: 'TripKar.com (Kalam Resorts)' }
    }
};

function runPlanner() {
    const dest = document.getElementById('p_dest').value;
    const days = parseInt(document.getElementById('p_days').value) || 6;
    const group = document.getElementById('p_group').value;
    const budget = document.getElementById('p_budget').value;
    const output = document.getElementById('plannerOutput');

    output.innerHTML = `<p style="color:var(--mid); font-style:italic;">⏳ Building your itinerary for <strong>${dest}</strong>...</p>`;

    setTimeout(() => {
        const key = Object.keys(tourData).find(k => dest.includes(k.split(' ')[0])) || Object.keys(tourData)[0];
        const data = tourData[key];

        const pkrRate = budget.includes('Economy')
            ? (days * 11000).toLocaleString()
            : budget.includes('Luxury')
            ? (days * 25000).toLocaleString()
            : (days * 16000).toLocaleString();

        const daySlices = data.days.slice(0, Math.min(days, data.days.length));
        const dayItems = daySlices.map((d, i) =>
            `<div class="day-entry"><strong>Day ${i + 1} — ${d[0]}</strong><span>${d[1]}</span></div>`
        ).join('');

        output.innerHTML = `
            <div class="itin-header">
                <h4>✦ ${dest} — ${days}-Day ${group} Itinerary</h4>
                <p>${data.season} · Budget: ${budget}</p>
                <span class="itin-price">Estimated: PKR ${pkrRate} per person</span>
            </div>
            <div class="day-list">${dayItems}</div>
            <div style="font-size:.82rem; color:var(--mid); border-top:1px solid var(--border); padding-top:12px; margin-top:4px;">
                <strong>✈️ Transport:</strong> ${data.partners.transport} &nbsp;|&nbsp;
                <strong>🏨 Hotels:</strong> ${data.partners.hotel}
            </div>
            <a href="https://wa.me/923001234567?text=Hi!+I+want+to+book+the+${encodeURIComponent(dest)}+${days}-day+${encodeURIComponent(group)}+tour"
               target="_blank" class="itin-wa-link">💬 Book This Tour on WhatsApp →</a>
        `;
    }, 700);
}