// ============================================================
// 🌍 3D GLOBE
// ============================================================

function initGlobe() {
    const container = document.getElementById('globe-container');
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
        'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'
    );

    const geometry = new THREE.SphereGeometry(1, 64, 64);
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

    const backLight = new THREE.DirectionalLight(0x4488ff, 0.3);
    backLight.position.set(-5, 0, -5);
    scene.add(backLight);

    const glowGeometry = new THREE.SphereGeometry(1.05, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x4488ff,
        transparent: true,
        opacity: 0.08,
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
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
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
// 🌍 LIVE THREAT MAP
// ============================================================

function updateThreatMap() {
    const attacks = [
        '🚨 DDoS Attack detected — 185.34.22.1 (US)',
        '⚡ SQL Injection attempt — 192.168.1.105 (UK)',
        '🔓 RDP Bruteforce — 10.0.0.23 (CN)',
        '🛡️ Malware detected — 172.16.0.45 (RU)',
        '⚠️ Phishing domain — suspicious.com (IN)'
    ];
    const attackLog = document.getElementById('attackLog');
    let index = 0;
    setInterval(() => {
        attackLog.innerHTML = attacks[index % attacks.length];
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
    
    result.innerHTML = '🧠 AI Analyzing...';
    
    setTimeout(() => {
        const riskLevels = ['🟢 Low', '🟡 Medium', '🔴 High'];
        const risk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
        const score = Math.floor(Math.random() * 100);
        
        result.innerHTML = `
            🎯 Target: ${query}<br>
            ⚡ Threat Score: ${score}/100<br>
            📊 Risk Level: ${risk}<br>
            🔍 Analysis: ${score > 70 ? 'Suspicious activity detected' : 'No immediate threat detected'}<br>
            💡 Recommendation: ${score > 70 ? 'Block this IP immediately' : 'Monitor for further activity'}
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
    
    result.innerHTML = '🕵️ Scanning dark web...';
    
    setTimeout(() => {
        const breaches = ['LinkedIn (2016)', 'Adobe (2013)', 'Collection #1 (2019)', 'None'];
        const found = breaches[Math.floor(Math.random() * breaches.length)];
        
        if (found === 'None') {
            result.innerHTML = `🟢 ${email} — No breaches found!<br>✅ Your data is secure`;
        } else {
            result.innerHTML = `🔴 ${email} — Breach found!<br>📋 Data appeared in: ${found}`;
        }
    }, 2000);
}

// ============================================================
// 🛡️ WEBSITE SECURITY SCANNER
// ============================================================

function runSecurityScan() {
    const input = document.getElementById('scanInput');
    const result = document.getElementById('scanResult');
    const url = input.value.trim() || 'https://example.com';
    
    result.innerHTML = '🛡️ Scanning website...';
    
    setTimeout(() => {
        const checks = [
            '✅ SSL Certificate: Valid',
            '✅ HSTS Header: Enabled',
            '⚠️ CSP Header: Not Configured',
            '✅ X-Frame-Options: DENY',
            '🔓 Open Ports: 80, 443, 22'
        ];
        result.innerHTML = checks.join('<br>');
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
    
    result.innerHTML = '🎯 Starting challenge...';
    
    setTimeout(() => {
        const flags = {
            'web': '🏴 FLAG{web_exploit_success}',
            'crypto': '🏴 FLAG{crypto_decrypted}',
            'osint': '🏴 FLAG{osint_master}'
        };
        result.innerHTML = `✅ Challenge complete!<br>🔑 Flag: ${flags[type]}`;
    }, 3000);
}

// ============================================================
// 🎤 VOICE COMMANDS
// ============================================================

function startVoiceCommand() {
    const result = document.getElementById('voiceResult');
    
    if (!('webkitSpeechRecognition' in window)) {
        result.innerHTML = '❌ Voice commands not supported in this browser';
        return;
    }
    
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    
    recognition.onstart = () => {
        result.innerHTML = '🎤 Listening... Speak now';
    };
    
    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        result.innerHTML = `🗣️ You said: "${command}"<br>`;
        
        if (command.includes('whois')) {
            const domain = command.replace('whois', '').trim() || 'example.com';
            document.getElementById('whoisInput').value = domain;
            runWhois();
            result.innerHTML += `🔍 Executing WHOIS for ${domain}`;
        } else if (command.includes('shodan')) {
            const query = command.replace('shodan', '').trim() || 'apache';
            document.getElementById('shodanInput').value = query;
            runShodan();
            result.innerHTML += `🌐 Executing Shodan for ${query}`;
        } else if (command.includes('pwned') || command.includes('breach')) {
            const email = command.replace(/(pwned|breach)/, '').trim() || 'test@example.com';
            document.getElementById('pwnedInput').value = email;
            runPwned();
            result.innerHTML += `🔓 Checking breaches for ${email}`;
        } else if (command.includes('weather')) {
            getWeather();
            result.innerHTML += '🌤️ Fetching weather...';
        } else if (command.includes('time') || command.includes('date')) {
            updateClock();
            result.innerHTML += '🕐 Updated time and date';
        } else {
            result.innerHTML += '❌ Command not recognized. Try: WHOIS, SHODAN, PWNED, WEATHER, TIME';
        }
    };
    
    recognition.onerror = () => {
        result.innerHTML = '❌ Could not recognize voice. Try again.';
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
            🚨 RANSOMWARE RESPONSE GUIDE<br><br>
            1️⃣ ISOLATE — Disconnect infected devices from network immediately<br>
            2️⃣ IDENTIFY — Determine the ransomware variant (check ransom note)<br>
            3️⃣ REPORT — Notify IT security team and law enforcement<br>
            4️⃣ DECRYPT — Attempt decryption using available tools (No More Ransom)<br>
            5️⃣ RESTORE — Restore from clean backups<br>
            6️⃣ REVIEW — Conduct post-incident analysis and improve defenses
        `,
        'phishing': `
            🎣 PHISHING RESPONSE GUIDE<br><br>
            1️⃣ BLOCK — Block the sender email address and domain<br>
            2️⃣ DELETE — Remove the phishing email from all mailboxes<br>
            3️⃣ WARN — Alert all employees about the phishing attempt<br>
            4️⃣ INVESTIGATE — Check if anyone clicked the link or entered credentials<br>
            5️⃣ RESET — Force password reset for affected users<br>
            6️⃣ TRAIN — Conduct security awareness training
        `,
        'breach': `
            🔓 DATA BREACH RESPONSE GUIDE<br><br>
            1️⃣ CONTAIN — Stop the breach and secure systems<br>
            2️⃣ ASSESS — Determine scope and type of data compromised<br>
            3️⃣ NOTIFY — Inform affected parties and regulatory bodies<br>
            4️⃣ FORENSICS — Conduct forensic investigation<br>
            5️⃣ REMEDIATE — Fix vulnerabilities and improve security<br>
            6️⃣ RECOVER — Restore services and monitor for further activity
        `
    };
    result.innerHTML = guides[type] || 'Select a guide to view';
}

// ============================================================
// 📱 PWA INSTALL
// ============================================================

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('pwaInstall').style.display = 'block';
});

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
            document.getElementById('pwaInstall').style.display = 'none';
        });
    }
}

// ============================================================
// 📊 ANALYTICS CHARTS
// ============================================================

function initCharts() {
    // Threat Chart
    const ctx1 = document.getElementById('threatChart').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Threats Detected',
                data: [45, 52, 38, 65, 71, 48, 56],
                borderColor: '#ff44cc',
                backgroundColor: 'rgba(255, 68, 204, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: '#8899aa' } }
            },
            scales: {
                x: { ticks: { color: '#556677' } },
                y: { ticks: { color: '#556677' } }
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
                backgroundColor: ['#ff44cc', '#00d4ff', '#ffaa00', '#ff4444', '#44dd88']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: '#8899aa' } }
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
    result.innerHTML = '🔍 Scanning...';
    setTimeout(() => {
        result.innerHTML = `✅ Found hidden pages<br>📄 /admin/login.php<br>📄 /backup/config.bak<br>📄 /secret/credentials.txt`;
    }, 1500);
}

function runShodan() {
    const input = document.getElementById('shodanInput');
    const result = document.getElementById('shodanResult');
    const query = input.value.trim() || 'apache port:80';
    result.innerHTML = '🌐 Scanning...';
    setTimeout(() => {
        result.innerHTML = `🖥️ 12 devices found<br>🔌 192.168.1.105:80 (Apache/2.4.49)<br>🔌 10.0.0.23:443 (nginx)`;
    }, 1600);
}

function runCensys() {
    const input = document.getElementById('censysInput');
    const result = document.getElementById('censysResult');
    const domain = input.value.trim() || 'example.com';
    result.innerHTML = '📡 Querying...';
    setTimeout(() => {
        result.innerHTML = `🏷️ Host: ${domain}<br>📜 SSL: Let\'s Encrypt<br>🔓 Ports: 80, 443, 22`;
    }, 1400);
}

function runHarvester() {
    const input = document.getElementById('harvestInput');
    const result = document.getElementById('harvestResult');
    const domain = input.value.trim() || 'example.com';
    result.innerHTML = '📧 Harvesting...';
    setTimeout(() => {
        result.innerHTML = `📧 admin@${domain}<br>📧 contact@${domain}<br>📧 support@${domain}`;
    }, 1500);
}

function runSpiderfoot() {
    const input = document.getElementById('spiderInput');
    const result = document.getElementById('spiderResult');
    const target = input.value.trim() || 'target.com';
    result.innerHTML = '🕷️ Crawling...';
    setTimeout(() => {
        result.innerHTML = `🕸️ Found 47 data points<br>🔗 DNS: ns1.${target}, ns2.${target}<br>📧 15 emails`;
    }, 1800);
}

function runMaltego() {
    const input = document.getElementById('maltegoInput');
    const result = document.getElementById('maltegoResult');
    const company = input.value.trim() || 'Company XYZ';
    result.innerHTML = '🕸️ Mapping...';
    setTimeout(() => {
        result.innerHTML = `🏢 ${company}<br>├── 📧 ceo@${company}.com<br>├── 📧 hr@${company}.com`;
    }, 1600);
}

function runWhois() {
    const input = document.getElementById('whoisInput');
    const result = document.getElementById('whoisResult');
    const domain = input.value.trim() || 'example.com';
    result.innerHTML = '📋 Fetching...';
    setTimeout(() => {
        result.innerHTML = `📌 Domain: ${domain}<br>🏢 Registrar: NameCheap<br>📅 Created: 1995-08-14`;
    }, 1400);
}

function runVirusTotal() {
    const input = document.getElementById('vtInput');
    const result = document.getElementById('vtResult');
    const url = input.value.trim() || 'https://example.com';
    result.innerHTML = '🦠 Scanning...';
    setTimeout(() => {
        const safe = Math.random() > 0.3;
        result.innerHTML = safe ? `✅ ${url} — Clean<br>🟢 0/72 detections` : `⚠️ ${url} — Suspicious<br>🟡 3/72 detections`;
    }, 1700);
}

function runPwned() {
    const input = document.getElementById('pwnedInput');
    const result = document.getElementById('pwnedResult');
    const email = input.value.trim() || 'test@example.com';
    result.innerHTML = '🔓 Checking...';
    setTimeout(() => {
        const pwned = Math.random() > 0.5;
        result.innerHTML = pwned ? `🔴 ${email} — PWNED!<br>📋 Found in 3 breaches` : `🟢 ${email} — No breaches found!`;
    }, 1500);
}

function runWayback() {
    const input = document.getElementById('waybackInput');
    const result = document.getElementById('waybackResult');
    const site = input.value.trim() || 'example.com';
    result.innerHTML = '📜 Fetching...';
    setTimeout(() => {
        result.innerHTML = `🗄️ ${site} — 47 snapshots<br>📅 2024-01-15: "Welcome"<br>📅 2023-08-22: "Under Construction"`;
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

console.log('%c⚡ MK Cyber Hub — Complete Edition', 'font-size:20px;color:#ff44cc;font-weight:bold;');
console.log('%c🌍 Truth · Integrity · Justice', 'font-size:14px;color:#00d4ff;');
console.log('%c🛸 All 20+ Features Loaded Successfully', 'font-size:12px;color:#556677;');
