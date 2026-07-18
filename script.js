// ============================================================
// 🌍 3D GLOBE (Mobile Optimized)
// ============================================================

function initGlobe() {
    const container = document.getElementById('globe-container');
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
        'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'
    );

    const geometry = new THREE.SphereGeometry(1, 48, 48);
    const material = new THREE.MeshPhongMaterial({
        map: earthTexture,
        shininess: 5,
    });

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const glowGeometry = new THREE.SphereGeometry(1.05, 48, 48);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x4488ff,
        transparent: true,
        opacity: 0.06,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    let rotation = 0;

    function animate() {
        requestAnimationFrame(animate);
        rotation += 0.001;
        earth.rotation.y = rotation;
        glow.rotation.y = rotation;
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
}

window.addEventListener('DOMContentLoaded', initGlobe);

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
            iconElem.textContent = '🌤️';
            tempElem.textContent = `${Math.round(temp)}°C`;
            cityElem.textContent = `${city}, ${country}`;
        }
    } catch (error) {
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
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-IN', options);
}

// ============================================================
// 📊 STATS ANIMATION
// ============================================================

function animateStats() {
    const stats = [
        { id: 'totalThreats', target: 12847 },
        { id: 'activeAttacks', target: 342 },
        { id: 'vulnerabilities', target: 1204 },
        { id: 'countries', target: 189 }
    ];

    stats.forEach(stat => {
        const el = document.getElementById(stat.id);
        let current = 0;
        const step = Math.ceil(stat.target / 60);
        const interval = setInterval(() => {
            current += step;
            if (current >= stat.target) {
                current = stat.target;
                clearInterval(interval);
            }
            el.textContent = current.toLocaleString();
        }, 30);
    });
}

// ============================================================
// 🌙 THEME TOGGLE
// ============================================================

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const btn = document.querySelector('.theme-toggle');
    btn.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
}

// ============================================================
// 🌍 THREAT MAP
// ============================================================

function updateThreatMap() {
    const attacks = [
        '🚨 DDoS Attack — 185.34.22.1 (US)',
        '⚡ SQL Injection — 192.168.1.105 (UK)',
        '🔓 RDP Bruteforce — 10.0.0.23 (CN)',
        '🛡️ Malware Detected — 172.16.0.45 (RU)',
        '⚠️ Phishing Domain — suspicious.com (IN)'
    ];
    const attackLog = document.getElementById('attackLog');
    let index = 0;
    setInterval(() => {
        attackLog.textContent = attacks[index % attacks.length];
        index++;
    }, 3000);
}

// ============================================================
// 🤖 AI THREAT ANALYZER
// ============================================================

function runAIAnalysis() {
    const input = document.getElementById('aiInput');
    const result = document.getElementById('aiResult');
    const query = input.value.trim() || '8.8.8.8';
    
    result.innerHTML = '🧠 Analyzing...';
    
    setTimeout(() => {
        const riskLevels = ['🟢 Low', '🟡 Medium', '🔴 High'];
        const risk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
        const score = Math.floor(Math.random() * 100);
        
        result.innerHTML = `
            🎯 Target: ${query}<br>
            ⚡ Score: ${score}/100<br>
            📊 Risk: ${risk}<br>
            💡 ${score > 70 ? 'Block this IP' : 'Monitor further'}
        `;
    }, 2000);
}

// ============================================================
// 🕵️ DARK WEB MONITOR
// ============================================================

function runDarkWebMonitor() {
    const input = document.getElementById('darkWebInput');
    const result = document.getElementById('darkWebResult');
    const email = input.value.trim() || 'test@example.com';
    
    result.innerHTML = '🕵️ Scanning...';
    
    setTimeout(() => {
        const breaches = ['LinkedIn (2016)', 'Adobe (2013)', 'Collection #1 (2019)', 'None'];
        const found = breaches[Math.floor(Math.random() * breaches.length)];
        
        if (found === 'None') {
            result.innerHTML = `🟢 ${email} — No breaches found! ✅`;
        } else {
            result.innerHTML = `🔴 ${email} — Found in: ${found}`;
        }
    }, 2000);
}

// ============================================================
// 🛡️ SECURITY SCANNER
// ============================================================

function runSecurityScan() {
    const input = document.getElementById('scanInput');
    const result = document.getElementById('scanResult');
    const url = input.value.trim() || 'https://example.com';
    
    result.innerHTML = '🛡️ Scanning...';
    
    setTimeout(() => {
        result.innerHTML = `
            ✅ SSL: Valid<br>
            ✅ HSTS: Enabled<br>
            ⚠️ CSP: Not Set<br>
            🔓 Ports: 80, 443, 22
        `;
    }, 2500);
}

// ============================================================
// 🎮 CTF CHALLENGES
// ============================================================

function startCTF(type) {
    const resultMap = {
        'web': 'ctfWebResult',
        'crypto': 'ctfCryptoResult',
        'osint': 'ctfOsintResult'
    };
    const result = document.getElementById(resultMap[type]);
    
    result.innerHTML = '🎯 Starting...';
    
    setTimeout(() => {
        const flags = {
            'web': '🏴 FLAG{web_exploit}',
            'crypto': '🏴 FLAG{crypto_decrypt}',
            'osint': '🏴 FLAG{osint_master}'
        };
        result.innerHTML = `✅ Done!<br>🔑 ${flags[type]}`;
    }, 3000);
}

// ============================================================
// 🎤 VOICE COMMANDS
// ============================================================

function startVoiceCommand() {
    const result = document.getElementById('voiceResult');
    
    if (!('webkitSpeechRecognition' in window)) {
        result.innerHTML = '❌ Chrome/Edge only';
        return;
    }
    
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    
    recognition.onstart = () => {
        result.innerHTML = '🎤 Listening...';
    };
    
    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        result.innerHTML = `🗣️ "${command}"<br>`;
        
        if (command.includes('whois')) {
            const domain = command.replace('whois', '').trim() || 'example.com';
            document.getElementById('whoisInput').value = domain;
            runWhois();
            result.innerHTML += `🔍 WHOIS ${domain}`;
        } else if (command.includes('shodan')) {
            const query = command.replace('shodan', '').trim() || 'apache';
            document.getElementById('shodanInput').value = query;
            runShodan();
            result.innerHTML += `🌐 Shodan ${query}`;
        } else if (command.includes('pwned') || command.includes('breach')) {
            const email = command.replace(/(pwned|breach)/, '').trim() || 'test@example.com';
            document.getElementById('pwnedInput').value = email;
            runPwned();
            result.innerHTML += `🔓 Check ${email}`;
        } else {
            result.innerHTML += '❌ Try: WHOIS, SHODAN, PWNED';
        }
    };
    
    recognition.onerror = () => {
        result.innerHTML = '❌ Try again';
    };
    
    recognition.start();
}

// ============================================================
// 📜 INCIDENT RESPONSE
// ============================================================

function showGuide(type) {
    const result = document.getElementById('guideResult');
    const guides = {
        'ransomware': `
            🚨 RANSOMWARE RESPONSE<br>
            1️⃣ ISOLATE infected devices<br>
            2️⃣ IDENTIFY ransomware variant<br>
            3️⃣ REPORT to authorities<br>
            4️⃣ RESTORE from backups
        `,
        'phishing': `
            🎣 PHISHING RESPONSE<br>
            1️⃣ BLOCK sender & domain<br>
            2️⃣ DELETE phishing email<br>
            3️⃣ WARN employees<br>
            4️⃣ RESET affected passwords
        `,
        'breach': `
            🔓 DATA BREACH RESPONSE<br>
            1️⃣ CONTAIN the breach<br>
            2️⃣ ASSESS compromised data<br>
            3️⃣ NOTIFY affected parties<br>
            4️⃣ REMEDIATE vulnerabilities
        `
    };
    result.innerHTML = guides[type] || 'Select a guide';
}

// ============================================================
// 📊 CHARTS
// ============================================================

function initCharts() {
    // Threat Chart
    const ctx1 = document.getElementById('threatChart').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Threats',
                data: [45, 52, 38, 65, 71, 48, 56],
                borderColor: '#ff44cc',
                backgroundColor: 'rgba(255, 68, 204, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 2,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { 
                    labels: { 
                        color: '#8899aa',
                        font: { size: 10 }
                    } 
                }
            },
            scales: {
                x: { 
                    ticks: { 
                        color: '#556677',
                        font: { size: 8 }
                    } 
                },
                y: { 
                    ticks: { 
                        color: '#556677',
                        font: { size: 8 }
                    } 
                }
            }
        }
    });

    // Attack Chart
    const ctx2 = document.getElementById('attackChart').getContext('2d');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['DDoS', 'Phishing', 'Malware', 'Ransomware', 'Other'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: ['#ff44cc', '#00d4ff', '#ffaa00', '#ff4444', '#44dd88'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { 
                    labels: { 
                        color: '#8899aa',
                        font: { size: 9 }
                    } 
                }
            }
        }
    });
}

// ============================================================
// 🔍 OSINT TOOLS
// ============================================================

function runDork() {
    const input = document.getElementById('dorkInput');
    const result = document.getElementById('dorkResult');
    const query = input.value.trim() || 'site:example.com';
    result.innerHTML = '🔍 Searching...';
    setTimeout(() => {
        result.innerHTML = `✅ Found pages<br>📄 /admin/login.php<br>📄 /backup/config.bak`;
    }, 1500);
}

function runShodan() {
    const input = document.getElementById('shodanInput');
    const result = document.getElementById('shodanResult');
    const query = input.value.trim() || 'apache port:80';
    result.innerHTML = '🌐 Scanning...';
    setTimeout(() => {
        result.innerHTML = `🖥️ 12 devices<br>🔌 192.168.1.105:80<br>🔌 10.0.0.23:443`;
    }, 1600);
}

function runCensys() {
    const input = document.getElementById('censysInput');
    const result = document.getElementById('censysResult');
    const domain = input.value.trim() || 'example.com';
    result.innerHTML = '📡 Querying...';
    setTimeout(() => {
        result.innerHTML = `🏷️ ${domain}<br>📜 SSL: Valid<br>🔓 Ports: 80, 443, 22`;
    }, 1400);
}

function runHarvester() {
    const input = document.getElementById('harvestInput');
    const result = document.getElementById('harvestResult');
    const domain = input.value.trim() || 'example.com';
    result.innerHTML = '📧 Harvesting...';
    setTimeout(() => {
        result.innerHTML = `📧 admin@${domain}<br>📧 contact@${domain}`;
    }, 1500);
}

function runSpiderfoot() {
    const input = document.getElementById('spiderInput');
    const result = document.getElementById('spiderResult');
    const target = input.value.trim() || 'target.com';
    result.innerHTML = '🕷️ Crawling...';
    setTimeout(() => {
        result.innerHTML = `🕸️ 47 data points<br>🔗 ns1.${target}<br>📧 15 emails`;
    }, 1800);
}

function runMaltego() {
    const input = document.getElementById('maltegoInput');
    const result = document.getElementById('maltegoResult');
    const company = input.value.trim() || 'Company XYZ';
    result.innerHTML = '🕸️ Mapping...';
    setTimeout(() => {
        result.innerHTML = `🏢 ${company}<br>├── 📧 ceo@${company}.com`;
    }, 1600);
}

function runWhois() {
    const input = document.getElementById('whoisInput');
    const result = document.getElementById('whoisResult');
    const domain = input.value.trim() || 'example.com';
    result.innerHTML = '📋 Fetching...';
    setTimeout(() => {
        result.innerHTML = `📌 ${domain}<br>🏢 NameCheap<br>📅 1995-08-14`;
    }, 1400);
}

function runVirusTotal() {
    const input = document.getElementById('vtInput');
    const result = document.getElementById('vtResult');
    const url = input.value.trim() || 'https://example.com';
    result.innerHTML = '🦠 Scanning...';
    setTimeout(() => {
        const safe = Math.random() > 0.3;
        result.innerHTML = safe ? `✅ ${url} — Clean` : `⚠️ ${url} — Suspicious`;
    }, 1700);
}

function runPwned() {
    const input = document.getElementById('pwnedInput');
    const result = document.getElementById('pwnedResult');
    const email = input.value.trim() || 'test@example.com';
    result.innerHTML = '🔓 Checking...';
    setTimeout(() => {
        const pwned = Math.random() > 0.5;
        result.innerHTML = pwned ? `🔴 ${email} — PWNED!` : `🟢 ${email} — Secure ✅`;
    }, 1500);
}

function runWayback() {
    const input = document.getElementById('waybackInput');
    const result = document.getElementById('waybackResult');
    const site = input.value.trim() || 'example.com';
    result.innerHTML = '📜 Fetching...';
    setTimeout(() => {
        result.innerHTML = `🗄️ ${site}<br>📅 2024-01-15<br>📅 2023-08-22`;
    }, 1500);
}

// ============================================================
// 🚀 INIT
// ============================================================

getWeather();
updateClock();
setInterval(updateClock, 1000);
setInterval(getWeather, 300000);
animateStats();
updateThreatMap();
initCharts();

console.log('%c⚡ MK Cyber Hub — Mobile Optimized', 'font-size:16px;color:#ff44cc;font-weight:bold;');
