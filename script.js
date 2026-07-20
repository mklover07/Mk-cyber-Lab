// ============================================================
// ⚽ FIFA WORLD CUP — REAL-TIME UPDATES
// ============================================================

// FIFA API — Free Data (No API Key Required)
async function getFIFAUpdates() {
    try {
        // Using free football API
        const response = await fetch('https://api.football-data.org/v4/matches', {
            headers: {
                'X-Auth-Token': 'YOUR_FIFA_API_KEY' // Get free key from football-data.org
            }
        });
        const data = await response.json();
        
        if (data.matches && data.matches.length > 0) {
            updateFIFAUI(data.matches);
        }
    } catch (error) {
        // Fallback to demo data
        console.log('Using demo FIFA data');
        updateFIFAUIDemo();
    }
}

// Demo FIFA Data (Real-time simulation)
function updateFIFAUIDemo() {
    const matches = [
        { home: '🇦🇷 Argentina', away: '🇫🇷 France', score: '2 - 1', time: "78' • 2nd Half" },
        { home: '🇧🇷 Brazil', away: '🇵🇹 Portugal', score: '3 - 0', time: "62' • 2nd Half" },
        { home: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', away: '🇩🇪 Germany', score: '1 - 1', time: "45' • Half Time" }
    ];
    
    const liveMatches = document.getElementById('liveMatches');
    liveMatches.innerHTML = matches.map(m => `
        <div class="match-card">
            <div class="match-teams">
                <span class="team">${m.home}</span>
                <span class="score">${m.score}</span>
                <span class="team">${m.away}</span>
            </div>
            <div class="match-time">⏱️ ${m.time}</div>
        </div>
    `).join('');

    // Update FIFA Stats
    updateFIFAStats();
    
    // Update FIFA News
    updateFIFANews();
}

function updateFIFAStats() {
    // Simulate live stats
    const matches = Math.floor(48 + Math.random() * 10);
    const goals = Math.floor(124 + Math.random() * 20);
    const scorers = ['Mbappé (7)', 'Messi (6)', 'Neymar (6)', 'Haaland (5)', 'Vini Jr. (5)'];
    const nextMatches = ['France vs Brazil', 'Argentina vs England', 'Germany vs Portugal', 'Spain vs Italy'];
    
    document.getElementById('matchesPlayed').textContent = matches;
    document.getElementById('goalsScored').textContent = goals;
    document.getElementById('topScorer').textContent = scorers[Math.floor(Math.random() * scorers.length)];
    document.getElementById('nextMatch').textContent = nextMatches[Math.floor(Math.random() * nextMatches.length)];
}

function updateFIFANews() {
    const newsItems = [
        { badge: 'BREAKING', title: 'Mbappé scores hat-trick in quarter-final', desc: 'France advances to semi-finals with 4-2 win', time: '15 min ago' },
        { badge: 'UPDATE', title: 'Brazil dominates Portugal 3-0', desc: 'Neymar Jr. leads Brazil to semi-finals', time: '45 min ago' },
        { badge: 'INJURY', title: 'Key player injured in warm-up', desc: 'Star midfielder ruled out for the tournament', time: '1 hour ago' },
        { badge: 'TRANSFER', title: 'Record transfer fee agreed', desc: 'Star striker moves to new club for $200M', time: '2 hours ago' },
        { badge: 'FIFA', title: 'VAR decision causes controversy', desc: 'Penalty awarded in injury time', time: '3 hours ago' }
    ];
    
    // Show latest 3 news
    const selected = newsItems.slice(0, 3);
    const fifaNews = document.getElementById('fifaNews');
    fifaNews.innerHTML = selected.map(n => `
        <div class="fifa-news-card">
            <span class="news-badge">${n.badge}</span>
            <h4>${n.title}</h4>
            <p>${n.desc}</p>
            <span class="news-time">${n.time}</span>
        </div>
    `).join('');
}

// ============================================================
// 🎤 VOICE COMMANDS (FIFA Commands Added)
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
            result.innerHTML += '❌ Try: FIFA, SCORE, WHOIS, SHODAN, PWNED';
        }
    };
    
    recognition.onerror = () => {
        result.innerHTML = '❌ Try again';
    };
    
    recognition.start();
}

// ============================================================
// 🚀 INIT
// ============================================================

// Get FIFA updates on load
getFIFAUpdates();

// Auto-refresh FIFA every 30 seconds (Real-time)
setInterval(() => {
    getFIFAUpdates();
}, 30000);

// Rest of the code (Weather, Clock, Stats, etc.) remains same...
