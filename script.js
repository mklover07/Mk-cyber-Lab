// ============================================
// 1. GOOGLE DORKING
// ============================================
function runDork() {
    const input = document.getElementById('dorkInput');
    const result = document.getElementById('dorkResult');
    const query = input.value.trim() || 'site:example.com intitle:"login"';
    result.innerHTML = '🔍 Scanning Google index...';
    setTimeout(() => {
        result.innerHTML = `
            ✅ Found 23 hidden pages<br>
            📄 /admin/login.php<br>
            📄 /backup/config.bak<br>
            📄 /secret/credentials.txt<br>
            ⚠️ ${query} — 8 results
        `;
    }, 1500);
}

// ============================================
// 2. SHODAN
// ============================================
function runShodan() {
    const input = document.getElementById('shodanInput');
    const result = document.getElementById('shodanResult');
    const query = input.value.trim() || 'apache port:80';
    result.innerHTML = '🌐 Scanning Shodan database...';
    setTimeout(() => {
        result.innerHTML = `
            🖥️ 12 devices found<br>
            🔌 192.168.1.105:80 (Apache/2.4.49)<br>
            🔌 10.0.0.23:443 (nginx/1.18.0)<br>
            🔌 172.16.0.45:8080 (Tomcat 9)
        `;
    }, 1600);
}

// ============================================
// 3. CENSYS
// ============================================
function runCensys() {
    const input = document.getElementById('censysInput');
    const result = document.getElementById('censysResult');
    const domain = input.value.trim() || 'example.com';
    result.innerHTML = '📡 Querying Censys...';
    setTimeout(() => {
        result.innerHTML = `
            🏷️ Host: ${domain}<br>
            📜 SSL Certificate: Let\'s Encrypt R3<br>
            🌍 IPs: 93.184.216.34, 2606:2800:220:1:248:1893:25c8:1946<br>
            🔓 Ports open: 80, 443, 22
        `;
    }, 1400);
}

// ============================================
// 4. THEHARVESTER
// ============================================
function runHarvester() {
    const input = document.getElementById('harvestInput');
    const result = document.getElementById('harvestResult');
    const domain = input.value.trim() || 'example.com';
    result.innerHTML = '📧 Harvesting emails...';
    setTimeout(() => {
        result.innerHTML = `
            📧 admin@${domain}<br>
            📧 contact@${domain}<br>
            📧 support@${domain}<br>
            📧 info@${domain}<br>
            🌐 Subdomains: mail.${domain}, dev.${domain}, api.${domain}
        `;
    }, 1500);
}

// ============================================
// 5. SPIDERFOOT
// ============================================
function runSpiderfoot() {
    const input = document.getElementById('spiderInput');
    const result = document.getElementById('spiderResult');
    const target = input.value.trim() || 'target.com';
    result.innerHTML = '🕷️ Spiderfoot crawling...';
    setTimeout(() => {
        result.innerHTML = `
            🕸️ Found 47 data points<br>
            🔗 DNS: ns1.${target}, ns2.${target}<br>
            📧 15 emails harvested<br>
            🌍 3 subdomains discovered<br>
            🔍 2 open ports (22, 443)
        `;
    }, 1800);
}

// ============================================
// 6. MALTEGO
// ============================================
function runMaltego() {
    const input = document.getElementById('maltegoInput');
    const result = document.getElementById('maltegoResult');
    const company = input.value.trim() || 'Company XYZ';
    result.innerHTML = '🕸️ Generating relationship map...';
    setTimeout(() => {
        result.innerHTML = `
            🏢 ${company}<br>
            ├── 📧 ceo@${company}.com<br>
            ├── 📧 hr@${company}.com<br>
            ├── 🌐 domain: ${company}.com<br>
            ├── 📱 Twitter: @${company}<br>
            └── 🔗 LinkedIn: ${company} Inc.
        `;
    }, 1600);
}

// ============================================
// 7. WHOIS
// ============================================
function runWhois() {
    const input = document.getElementById('whoisInput');
    const result = document.getElementById('whoisResult');
    const domain = input.value.trim() || 'example.com';
    result.innerHTML = '📋 Fetching WHOIS data...';
    setTimeout(() => {
        result.innerHTML = `
            📌 Domain: ${domain}<br>
            🏢 Registrar: NameCheap, Inc.<br>
            📅 Created: 1995-08-14<br>
            ⏳ Expires: 2026-08-13<br>
            🌐 Nameservers: ns1.${domain}, ns2.${domain}<br>
            📧 Admin: admin@${domain}
        `;
    }, 1400);
}

// ============================================
// 8. VIRUSTOTAL
// ============================================
function runVirusTotal() {
    const input = document.getElementById('vtInput');
    const result = document.getElementById('vtResult');
    const url = input.value.trim() || 'https://example.com';
    result.innerHTML = '🦠 Scanning with 70+ antivirus engines...';
    setTimeout(() => {
        const safe = Math.random() > 0.3;
        result.innerHTML = safe ? `
            ✅ ${url} — Clean<br>
            🟢 0/72 detections<br>
            📊 Last scan: 2 hours ago
        ` : `
            ⚠️ ${url} — Suspicious<br>
            🟡 3/72 detections<br>
            🦠 Malware: Trojan.Generic.12345
        `;
    }, 1700);
}

// ============================================
// 9. HAVE I BEEN PWNED
// ============================================
function runPwned() {
    const input = document.getElementById('pwnedInput');
    const result = document.getElementById('pwnedResult');
    const email = input.value.trim() || 'test@example.com';
    result.innerHTML = '🔓 Checking breach databases...';
    setTimeout(() => {
        const pwned = Math.random() > 0.5;
        result.innerHTML = pwned ? `
            🔴 ${email} — PWNED!<br>
            📋 Found in 3 breaches:<br>
            • Adobe (2013)<br>
            • LinkedIn (2016)<br>
            • Collection #1 (2019)
        ` : `
            🟢 ${email} — No breaches found!<br>
            ✅ Your email is secure (for now)
        `;
    }, 1500);
}

// ============================================
// 10. WAYBACK MACHINE
// ============================================
function runWayback() {
    const input = document.getElementById('waybackInput');
    const result = document.getElementById('waybackResult');
    const site = input.value.trim() || 'example.com';
    result.innerHTML = '📜 Fetching archived snapshots...';
    setTimeout(() => {
        result.innerHTML = `
            🗄️ ${site} — 47 snapshots found<br>
            📅 2024-01-15: "Welcome to ${site}"<br>
            📅 2023-08-22: "Under Construction"<br>
            📅 2022-11-03: "${site} - Homepage"<br>
            🕰️ Oldest: 2015-03-10
        `;
    }, 1500);
}

// ===== CONSOLE EASTER EGG =====
console.log('%c⚡ MK GLOBAL NEXUS', 'font-size:24px;color:#ff00ff;font-weight:bold;');
console.log('%c🔍 Cyber Intelligence • Investigation • Awareness', 'font-size:14px;color:#00f0ff;');
console.log('%c🏛️ Truth · Integrity · Justice', 'font-size:12px;color:#ffffff;');
console.log('%c⚠️ OSINT Tools — For Educational & Research Purpose Only', 'font-size:12px;color:#88aabb;');
