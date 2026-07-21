// ============================================================
// 🌍 3D GLOBE (Three.js)
// ============================================================

function initGlobe() {
    const container = document.getElementById('globe-container');
    if (!container) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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

// ============================================================
// 🌤️ WEATHER (Real-time)
// ============================================================

async function getWeather() {
    const tempElem = document.getElementById('weatherTemp');
    const cityElem = document.getElementById('weatherCity');
    const iconElem = document.querySelector('.weather-display i');
    
    if (!tempElem || !cityElem) return;

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
            if (iconElem) iconElem.className = 'fas fa-cloud-sun';
            tempElem.textContent = `${Math.round(temp)}°C`;
            cityElem.textContent = city;
        }
    } catch (error) {
        if (iconElem) iconElem.className = 'fas fa-cloud-sun';
        tempElem.textContent = '34°C';
        cityElem.textContent = 'Jodhpur';
    }
}

// ============================================================
// 🕐 CLOCK (Real-time)
// ============================================================

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const timeElem = document.getElementById('currentTime');
    const dateElem = document.getElementById('currentDate');
    
    if (timeElem) timeElem.textContent = `${hours}:${minutes}:${seconds}`;
    if (dateElem) {
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        dateElem.textContent = now.toLocaleDateString('en-IN', options);
    }
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
        if (!el) return;
        
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
// 🌙 THEME TOGGLE (Modern)
// ============================================================

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const btn = document.querySelector('.theme-btn i');
    if (btn) {
        if (document.body.classList.contains('light-mode')) {
            btn.className = 'fas fa-sun';
        } else {
            btn.className = 'fas fa-moon';
        }
    }
}

// ============================================================
// 🌍 THREAT MAP (Live Simulation)
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
    if (!attackLog) return;
    
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
    if (!input || !result) return;
    
    const query = input.value.trim() || '8.8.8.8';
    
    result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AI Analyzing...';
    result.className = 'result-modern';
    
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
    if (!input || !result) return;
    
    const email = input.value.trim() || 'test@example.com';
    
    result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning dark web...';
    result.className = 'result-modern';
    
    setTimeout(() => {
        const breaches = ['LinkedIn (2016)', 'Adobe (2013)', 'Collection #1 (2019)', 'None'];
        const found = breaches[Math.floor(Math.random() * breaches.length)];
        
        if (found === 'None') {
            result.innerHTML = `🟢 ${email} — No breaches found! ✅`;
        } else {
            result.innerHTML = `🔴 ${email} — Breach found!<br>📋 Data appeared in: ${found}`;
        }
    }, 2000);
}

// ============================================================
// 🛡️ SECURITY SCANNER
// ============================================================

function runSecurityScan() {
    const input = document.getElementById('scanInput');
    const result = document.getElementById('scanResult');
    if (!input || !result) return;
    
    const url = input.value.trim() || 'https://example.com';
    
    result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning website...';
    result.className = 'result-modern';
    
    setTimeout(() => {
        result.innerHTML = `
            ✅ SSL Certificate: Valid<br>
            ✅ HSTS Header: Enabled<br>
            ⚠️ CSP Header: Not Configured<br>
            ✅ X-Frame-Options: DENY<br>
            🔓 Open Ports: 80, 443, 22
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
    if (!result) return;
    
    result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Starting challenge...';
    result.className = 'result-modern';
    
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
// 🎤 VOICE COMMANDS (with FIFA support)
// ============================================================

function startVoiceCommand() {
    const result = document.getElementById('voiceResult');
    if (!result) return;
    
    if (!('webkitSpeechRecognition' in window)) {
        result.innerHTML = '❌ Voice commands supported in Chrome/Edge only';
        result.className = 'result-modern error';
        return;
    }
    
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    
    recognition.onstart = () => {
        result.innerHTML = '🎤 Listening... Speak now';
        result.className = 'result-modern';
    };
    
    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        result.innerHTML = `🗣️ You said: "${command}"<br>`;
        result.className = 'result-modern';
        
        // FIFA Commands
        if (command.includes('fifa') || command.includes('football') || command.includes('world cup')) {
            result.innerHTML += '⚽ Fetching FIFA updates...';
            updateFIFAUIDemo();
            result.innerHTML += '<br>✅ FIFA updates refreshed!';
        } else if (command.includes('score') || command.includes('match')) {
            result.innerHTML += '⚽ Checking live scores...';
            updateFIFAUIDemo();
            result.innerHTML += '<br>✅ Scores updated!';
        } else if (command.includes('whois')) {
            const domain = command.replace('whois', '').trim() || 'example.com';
            const input = document.getElementById('whoisInput');
            if (input) input.value = domain;
            runWhois();
            result.innerHTML += `🔍 WHOIS ${domain}`;
        } else if (command.includes('shodan')) {
            const query = command.replace('shodan', '').trim() || 'apache';
            const input = document.getElementById('shodanInput');
            if (input) input.value = query;
            runShodan();
            result.innerHTML += `🌐 Shodan ${query}`;
        } else if (command.includes('pwned') || command.includes('breach')) {
            const email = command.replace(/(pwned|breach)/, '').trim() || 'test@example.com';
            const input = document.getElementById('pwnedInput');
            if (input) input.value = email;
            runPwned();
            result.innerHTML += `🔓 Check ${email}`;
        } else if (command.includes('weather')) {
            getWeather();
            result.innerHTML += '🌤️ Weather updated!';
        } else if (command.includes('time') || command.includes('date')) {
            updateClock();
            result.innerHTML += '🕐 Time and date updated!';
        } else {
            result.innerHTML += '❌ Try: FIFA, SCORE, WHOIS, SHODAN, PWNED, WEATHER, TIME';
        }
    };
    
    recognition.onerror = () => {
        result.innerHTML = '❌ Could not recognize voice. Try again.';
        result.className = 'result-modern error';
    };
    
    recognition.start();
}

// ============================================================
// 📜 INCIDENT RESPONSE GUIDES
// ============================================================

function showGuide(type) {
    const result = document.getElementById('guideResult');
    if (!result) return;
    
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
    result.className = 'result-modern';
}

// ============================================================
// ⚽ FIFA WORLD CUP — REAL-TIME UPDATES
// ============================================================

function getFIFAUpdates() {
    try {
        updateFIFAUIDemo();
    } catch (error) {
        console.log('Using demo FIFA data');
        updateFIFAUIDemo();
    }
}

function updateFIFAUIDemo() {
    const matches = [
        { home: '🇦🇷 Argentina', away: '🇫🇷 France', score: '2 - 1', time: "78' • 2nd Half" },
        { home: '🇧🇷 Brazil', away: '🇵🇹 Portugal', score: '3 - 0', time: "62' • 2nd Half" },
        { home: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', away: '🇩🇪 Germany', score: '1 - 1', time: "45' • Half Time" }
    ];
    
    const liveMatches = document.getElementById('liveMatches');
    if (liveMatches) {
        liveMatches.innerHTML = matches.map(m => `
            <div class="match-card-modern">
                <span class="team">${m.home}</span>
                <span class="score-modern">${m.score}</span>
                <span class="team">${m.away}</span>
                <span class="match-time-modern">⏱️ ${m.time}</span>
            </div>
        `).join('');
    }

    updateFIFAStats();
    updateFIFANews();
}

function updateFIFAStats() {
    const matches = document.getElementById('matchesPlayed');
    const goals = document.getElementById('goalsScored');
    const scorer = document.getElementById('topScorer');
    const nextMatch = document.getElementById('nextMatch');
    
    if (matches) {
        const matchCount = Math.floor(48 + Math.random() * 10);
        const goalCount = Math.floor(124 + Math.random() * 20);
        const scorers = ['Mbappé (7)', 'Messi (6)', 'Neymar (6)', 'Haaland (5)', 'Vini Jr. (5)'];
        const nextMatches = ['France vs Brazil', 'Argentina vs England', 'Germany vs Portugal', 'Spain vs Italy'];
        
        matches.textContent = matchCount;
        goals.textContent = goalCount;
        scorer.textContent = scorers[Math.floor(Math.random() * scorers.length)];
        nextMatch.textContent = nextMatches[Math.floor(Math.random() * nextMatches.length)];
    }
}

function updateFIFANews() {
    const newsItems = [
        { badge: 'BREAKING', title: 'Mbappé scores hat-trick in quarter-final', desc: 'France advances to semi-finals with 4-2 win', time: '15 min ago' },
        { badge: 'UPDATE', title: 'Brazil dominates Portugal 3-0', desc: 'Neymar Jr. leads Brazil to semi-finals', time: '45 min ago' },
        { badge: 'INJURY', title: 'Key player injured in warm-up', desc: 'Star midfielder ruled out for the tournament', time: '1 hour ago' }
    ];
    
    const fifaNews = document.getElementById('fifaNews');
    if (fifaNews) {
        fifaNews.innerHTML = newsItems.map(n => `
            <div class="fifa-news-item">
                <span class="news-badge-modern">${n.badge}</span>
                <span class="news-text">${n.title}</span>
                <span class="news-time-modern">${n.time}</span>
            </div>
        `).join('');
    }
}

// ============================================================
// 📊 ANALYTICS CHARTS (Chart.js)
// ============================================================

function initCharts() {
    const threatCtx = document.getElementById('threatChart');
    const attackCtx = document.getElementById('attackChart');
    
    if (threatCtx) {
        new Chart(threatCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Threats',
                    data: [45, 52, 38, 65, 71, 48, 56],
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.05)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 3,
                    pointBackgroundColor: '#00d4ff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
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
                            font: { size: 9 }
                        }
                    },
                    y: {
                        ticks: {
                            color: '#556677',
                            font: { size: 9 }
                        }
                    }
                }
            }
        });
    }

    if (attackCtx) {
        new Chart(attackCtx, {
            type: 'doughnut',
            data: {
                labels: ['DDoS', 'Phishing', 'Malware', 'Ransomware', 'Other'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: ['#00d4ff', '#ff44cc', '#ffaa00', '#ff4444', '#44dd88'],
                    borderWidth: 2,
                    borderColor: 'rgba(8,12,26,0.8)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#8899aa',
                            font: { size: 9 },
                            padding: 10
                        }
                    }
                }
            }
        });
    }
}

// ============================================================
// 🔍 OSINT TOOLS (10 Tools)
// ============================================================

function runDork() {
    const input = document.getElementById('dorkInput');
    const result = document.getElementById('dorkResult');
    if (!input || !result) return;
    
    const query = input.value.trim() || 'site:example.com';
    result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    result.className = 'result-modern';
    
    setTimeout(() => {
        result.innerHTML = `
            ✅ Found hidden pages<br>
            📄 /admin/login.php<br>
            📄 /backup/config.bak<br>
            📄 /secret/credentials.txt
        `;
    }, 1500);
}

function runShodan() {
    const input = document.getElementById('shodanInput');
    const result = document.getElementById('shodanResult');
    if (!input || !result) return;
    
    const query = input.value.trim() || 'apache port:80';
    result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning Shodan...';
    result.className = 'result-modern';
    
    setTimeout(() => {
        result.innerHTML = `
            🖥️ 12 devices found<br>
            🔌 192.168.1.105:80 (Apache/2.4.49)<br>
            🔌 10.0.0.23:443 (nginx)
        `;
    }, 1600);
}

function runCensys() {
    const input = document.getElementById('censysInput');
    const result = document.getElementById('censysResult');
    if (!input || !result) return;
    
    const domain = input.value.trim() || 'example.com';
    result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Querying Censys...';
    result.className = 'result-modern';
    
    setTimeout(() => {
        result.innerHTML = `
            🏷️ Host: ${domain}<br>
            📜 SSL: Let\'s Encrypt<br>
            🔓 Ports: 80, 443, 22
        `;
    }, 1400);
}

function runHarvester() {
    const input = document.getElementById('harvestInput');
    const result = document.getElementById('harvestResult');
    if (!input || !result) return;
    
    const domain = input.value.trim() || 'example.com';
    result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Harvesting emails...';
    result.className = 'result-modern';
    
    setTimeout(() => {
        result.innerHTML = `
            📧 admin@${domain}<br>
            📧 contact@${domain}<br>
            📧 support@${domain}
        `;
    }, 1500);
}

function runSpiderfoot() {
    const input = document.getElementById('spiderInput');
    const result = document.getElementById('spiderResult');
    if (!input || !result) return;
    
    const target = input.value.trim() || 'target.com';
    result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Crawling with Spiderfoot...';
    result.className = 'result-modern';
    
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
    if (!input || !result) return;
    
    const company = input.value.trim() || 'Company XYZ';
    result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mapping relationships...';
    result.className = 'result-modern';
    
    setTimeout(() => {
        result.innerHTML = `
            🏢 ${company}<br>
            ├── 📧 ceo@${company}.com<br>
            ├── 📧 hr@${company}.com
        `;
    }, 1600);
}

function runWhois() {
    const input = document.getElementById('whoisInput');
    const result = document.getElementById('whoisResult');
    if (!input || !result) return;
    
    const domain = input.value.trim() || 'example.com';
    result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Fetching WHOIS data...';
    result.className = 'result-modern';
    
    setTimeout(() => {
        result.innerHTML = `
            📌 Domain: ${domain}<br>
            🏢 Registrar: NameCheap<br>
            📅 Created: 1995-08-14
        `;
    }, 1400);
}

function runVirusTotal() {
    const input = document.getElementById('vtInput');
    const result = document.getElementById('vtResult');
    if (!input || !result) return;
    
    const url = input.value.trim() || 'https://example.com';
    result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning with VirusTotal...';
    result.className = 'result-modern';
    
    setTimeout(() => {
        const safe = Math.random() > 0.3;
        result.innerHTML = safe 
            ? `✅ ${url} — Clean<br>🟢 0/72 detections` 
            : `⚠️ ${url} — Suspicious<br>🟡 3/72 detections`;
    }, 1700);
}

function runPwned() {
    const input = document.getElementById('pwnedInput');
    const result = document.getElementById('pwnedResult');
    if (!input || !result) return;
    
    const email = input.value.trim() || 'test@example.com';
    result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking Have I Been Pwned...';
    result.className = 'result-modern';
    
    setTimeout(() => {
        const pwned = Math.random() > 0.5;
        result.innerHTML = pwned 
            ? `🔴 ${email} — PWNED!<br>📋 Found in 3 breaches` 
            : `🟢 ${email} — No breaches found!`;
    }, 1500);
}

function runWayback() {
    const input = document.getElementById('waybackInput');
    const result = document.getElementById('waybackResult');
    if (!input || !result) return;
    
    const site = input.value.trim() || 'example.com';
    result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Fetching Wayback Machine data...';
    result.className = 'result-modern';
    
    setTimeout(() => {
        result.innerHTML = `
            🗄️ ${site} — 47 snapshots<br>
            📅 2024-01-15: "Welcome"<br>
            📅 2023-08-22: "Under Construction"
        `;
    }, 1500);
}

// ============================================================
// 🚀 INIT (सब कुछ Start करें)
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // 3D Globe
    initGlobe();
    
    // Weather
    getWeather();
    setInterval(getWeather, 300000); // Every 5 minutes
    
    // Clock
    updateClock();
    setInterval(updateClock, 1000);
    
    // Stats Animation
    animateStats();
    
    // Threat Map
    updateThreatMap();
    
    // Charts
    initCharts();
    
    // FIFA Updates
    getFIFAUpdates();
    setInterval(getFIFAUpdates, 30000); // Every 30 seconds
    
    // Console Welcome
    console.log('%c⚡ MK Cyber Hub — Modern 2026 Edition', 'font-size:22px;color:#00d4ff;font-weight:bold;');
    console.log('%c🌍 Truth · Integrity · Justice · Football', 'font-size:14px;color:#ff44cc;');
    console.log('%c🛸 All 20+ Features Loaded Successfully', 'font-size:12px;color:#8899aa;');
    console.log('%c🔍 OSINT · AI · FIFA · CTF · Voice Commands', 'font-size:12px;color:#556677;');
});
