// ===== Vulnerability Scanner =====
function scanWebsite() {
    const input = document.getElementById('scanInput');
    const resultDiv = document.getElementById('scanResult');
    const url = input.value.trim();

    if (!url) {
        resultDiv.innerHTML = '❌ कृपया कोई URL डालें!';
        return;
    }

    resultDiv.innerHTML = '🔍 Scanning... please wait';

    // सिमुलेटेड स्कैन (असली स्कैन नहीं है, सिर्फ डेमो)
    setTimeout(() => {
        const vulnerabilities = [
            'XSS (Cross-Site Scripting) - 🔴 High',
            'SQL Injection - 🟠 Medium',
            'Open Redirect - 🟡 Low',
            'Missing Security Headers - 🟠 Medium',
            'Outdated SSL Certificate - 🟡 Low'
        ];

        const random = Math.floor(Math.random() * vulnerabilities.length);
        const result = vulnerabilities[random];

        resultDiv.innerHTML = `
            <strong>🔎 Scan Results for ${url}</strong><br>
            Found: ${result}<br>
            <small style="color:#666;">⚠️ यह एक डेमो है, असली स्कैन नहीं</small>
        `;
    }, 2000);
}

// ===== Reverse Shell Lab =====
function shellLab() {
    const resultDiv = document.getElementById('shellResult');
    
    resultDiv.innerHTML = '🔄 Initializing Shell...';

    setTimeout(() => {
        resultDiv.innerHTML = `
            💀 Reverse Shell Started<br>
            <span style="color:#00ff00;">Connection Established ✅</span><br>
            <span style="color:#aaa;font-size:0.8rem;">
                Commands: whoami, ls, pwd, id, exit
            </span><br>
            <input type="text" id="shellCmd" placeholder="Enter command..." 
                   style="width:100%;margin-top:10px;padding:8px;border-radius:5px;border:1px solid #333;background:rgba(255,255,255,0.05);color:white;">
            <button onclick="runShellCommand()" 
                    style="width:100%;margin-top:5px;padding:8px;background:#00f2fe;border:none;border-radius:5px;color:#0a0e27;font-weight:bold;cursor:pointer;">
                Run Command
            </button>
            <div id="shellOutput" style="margin-top:10px;color:#00ff00;font-family:monospace;"></div>
        `;
    }, 1500);
}

function runShellCommand() {
    const cmdInput = document.getElementById('shellCmd');
    const outputDiv = document.getElementById('shellOutput');
    const cmd = cmdInput.value.trim();

    if (!cmd) {
        outputDiv.innerHTML = '⚠️ Type a command!';
        return;
    }

    // सिमुलेटेड कमांड रिस्पांस
    const responses = {
        'whoami': 'user@mk-cyber-lab',
        'ls': 'Desktop  Documents  Downloads  Pictures  videos  secret.txt',
        'pwd': '/home/user/mk-cyber-lab',
        'id': 'uid=1000(user) gid=1000(user) groups=1000(user),4(adm),27(sudo)',
        'exit': '🔌 Connection closed. Type "whoami" to reconnect.',
        'cat secret.txt': '🔐 Flag{cyber_lab_is_fun_2026}'
    };

    const output = responses[cmd] || `❌ Command not found: ${cmd}`;
    outputDiv.innerHTML = `$ ${cmd}<br>${output}`;
    cmdInput.value = '';
}

// ===== Security Dashboard =====
function checkSecurity() {
    const statusDiv = document.getElementById('status');
    
    statusDiv.innerHTML = '🔍 Checking...';
    statusDiv.style.color = '#ffaa00';

    setTimeout(() => {
        const threats = ['No threats found ✅', 'Suspicious activity detected ⚠️', 'All systems secure 🟢'];
        const random = Math.floor(Math.random() * threats.length);
        
        if (random === 0) {
            statusDiv.innerHTML = '🟢 System Secure - No Threats Found';
            statusDiv.style.color = '#00ff00';
        } else if (random === 1) {
            statusDiv.innerHTML = '🟠 Suspicious Activity Detected - Check Logs';
            statusDiv.style.color = '#ffaa00';
        } else {
            statusDiv.innerHTML = '🟢 All Systems Operational';
            statusDiv.style.color = '#00ff00';
        }
    }, 1500);
}

// ===== Console Warning =====
console.log('%c🔥 MK Cyber Lab Loaded Successfully!', 'font-size:20px;color:#4facfe;');
console.log('%c⚠️ यह सिर्फ शैक्षिक उद्देश्य के लिए है', 'font-size:14px;color:#ffaa00;');
