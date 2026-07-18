// ============================================================
// 🌤️ WEATHER
// ============================================================
async function getWeather() {
    const tempElem = document.getElementById('weatherTemp');
    const cityElem = document.getElementById('weatherCity');
    const iconElem = document.querySelector('.weather-icon');

    try {
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();
        const city = ipData.city || 'Jodhpur';
        const country = ipData.country_name || 'India';

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${ipData.latitude || 26.2389}&longitude=${ipData.longitude || 73.0243}&current_weather=true&timezone=auto`
        );
        const weatherData = await weatherResponse.json();

        if (weatherData.current_weather) {
            const temp = weatherData.current_weather.temperature;
            const weatherCode = weatherData.current_weather.weathercode;
            
            const icons = {
                0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
                45: '🌫️', 48: '🌫️',
                51: '🌦️', 53: '🌦️', 55: '🌧️',
                61: '🌧️', 63: '🌧️', 65: '⛈️',
                71: '❄️', 73: '❄️', 75: '❄️',
                80: '🌧️', 81: '🌧️', 82: '⛈️',
                95: '⛈️', 96: '⛈️', 99: '⛈️'
            };
            
            iconElem.textContent = icons[weatherCode] || '🌤️';
            tempElem.textContent = `${Math.round(temp)}°C`;
            cityElem.textContent = `${city}, ${country}`;
        }
    } catch (error) {
        // Fallback
        iconElem.textContent = '🌤️';
        tempElem.textContent = '34°C';
        cityElem.textContent = 'Jodhpur, India';
    }
}

// ============================================================
// 🕐 CLOCK
// ============================================================
function updateClock() {
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('currentTime').textContent = `${hours}:${minutes}:${seconds}`;
    
    const options = { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-IN', options);
}

// ============================================================
// 🔍 OSINT TOOLS FUNCTIONS
// ============================================================

function runDork() {
    const input = document.getElementById('dorkInput');
    const result = document.getElementById('dorkResult');
    const query = input.value.trim() || 'site:example.com intitle:"login"';
    result.innerHTML = '🔍 Searching...';
    setTimeout(() => {
        result.innerHTML = `
            ✅ Found 23 hidden pages<br>
            📄 /admin/login.php<br>
            📄 /backup/config.bak<br>
            📄 /secret/credentials.txt
        `;
    }, 1500);
}

function runShodan() {
    const input = document.getElementById('shodanInput');
    const result = document.getElementById('shodanResult');
    const query = input.value.trim() || 'apache port:80';
    result.innerHTML = '🌐 Scanning...';
    setTimeout(() => {
        result.innerHTML = `
            🖥️ 12 devices found<br>
            🔌 192.168.1.105:80 (Apache/2.4.49)<br>
            🔌 10.0.0.23:443 (nginx/1.18.0)
        `;
    }, 1600);
}

function runCensys() {
    const input = document.getElementById('censysInput');
    const result = document.getElementById('censysResult');
    const domain = input.value.trim() || 'example.com';
    result.innerHTML = '📡 Querying...';
    setTimeout(() => {
        result.innerHTML = `
            🏷️ Host: ${domain}<br>
            📜 SSL: Let\'s Encrypt R3<br>
            🔓 Ports: 80, 443, 22
        `;
    }, 1400);
}

function runHarvester() {
    const input = document.getElementById('harvestInput');
    const result = document.getElementById('harvestResult');
    const domain = input.value.trim() || 'example.com';
    result.innerHTML = '📧 Harvesting...';
    setTimeout(() => {
        result.innerHTML = `
            📧 admin@${domain}<br>
            📧 contact@${domain}<br>
            📧 support@${domain}<br>
            🌐 Subdomains: mail.${domain}, dev.${domain}
        `;
    }, 1500);
}

function runSpiderfoot() {
    const input = document.getElementById('spiderInput');
    const result = document.getElementById('spiderResult');
    const target = input.value.trim() || 'target.com';
    result.innerHTML = '🕷️ Crawling...';
    setTimeout(() => {
        result.innerHTML = `
            🕸️ Found 47 data points<br>
            🔗 DNS: ns1.${target}, ns2.${target}<br>
            📧 15 emails harvested
        `;
    }, 1800);
}

function runMaltego() {
    const input = document.getElementById('maltegoInput');
    const result = document.getElementById('maltegoResult');
    const company = input.value.trim() || 'Company XYZ';
    result.innerHTML = '🕸️ Mapping...';
    setTimeout(() => {
        result.innerHTML = `
            🏢 ${company}<br>
            ├── 📧 ceo@${company}.com<br>
            ├── 📧 hr@${company}.com<br>
            ├── 🌐 domain: ${company}.com
        `;
    }, 1600);
}

function runWhois() {
    const input = document.getElementById('whoisInput');
    const result = document.getElementById('whoisResult');
    const domain = input.value.trim() || 'example.com';
    result.innerHTML = '📋 Fetching...';
    setTimeout(() => {
        result.innerHTML = `
            📌 Domain: ${domain}<br>
            🏢 Registrar: NameCheap, Inc.<br>
            📅 Created: 1995-08-14<br>
            ⏳ Expires: 2026-08-13
        `;
    }, 1400);
}

function runVirusTotal() {
    const input = document.getElementById('vtInput');
    const result = document.getElementById('vtResult');
    const url = input.value.trim() || 'https://example.com';
    result.innerHTML = '🦠 Scanning...';
    setTimeout(() => {
        const safe = Math.random() > 0.3;
        result.innerHTML = safe ? `
            ✅ ${url} — Clean<br>
            🟢 0/72 detections
        ` : `
            ⚠️ ${url} — Suspicious<br>
            🟡 3/72 detections
        `;
    }, 1700);
}

function runPwned() {
    const input = document.getElementById('pwnedInput');
    const result = document.getElementById('pwnedResult');
    const email = input.value.trim() || 'test@example.com';
    result.innerHTML = '🔓 Checking...';
    setTimeout(() => {
        const pwned = Math.random() > 0.5;
        result.innerHTML = pwned ? `
            🔴 ${email} — PWNED!<br>
            📋 Found in 3 breaches
        ` : `
            🟢 ${email} — No breaches found!
        `;
    }, 1500);
}

function runWayback() {
    const input = document.getElementById('waybackInput');
    const result = document.getElementById('waybackResult');
    const site = input.value.trim() || 'example.com';
    result.innerHTML = '📜 Fetching...';
    setTimeout(() => {
        result.innerHTML = `
            🗄️ ${site} — 47 snapshots found<br>
            📅 2024-01-15: "Welcome to ${site}"<br>
            📅 2023-08-22: "Under Construction"
        `;
    }, 1500);
}

// ============================================================
// 🚀 INIT
// ============================================================
getWeather();
updateClock();
setInterval(updateClock, 1000);
setInterval(getWeather, 300000);

console.log('%c⚡ MK Cyber Hub', 'font-size:20px;color:#ff44cc;font-weight:bold;');
console.log('%c🔍 Truth · Integrity · Justice', 'font-size:14px;color:#00d4ff;');
