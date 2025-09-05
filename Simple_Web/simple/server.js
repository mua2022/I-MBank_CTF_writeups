const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8001;

const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    // Route handling
    if (pathname === '/') {
        serveFile(res, './index.html');
    } 
    else if (pathname === '/robots.txt') {
        serveFile(res, './robots.txt');
    }
    else if (pathname === '/hidden_flag.txt') {
        serveFile(res, './hidden_flag.txt');
    }
    else if (pathname.startsWith('/secret/admin')) {
        handleAdminRequest(res, parsedUrl);
    }
    else {
        // Try to serve other files (CSS, JS, etc.)
        serveFile(res, '.' + pathname);
    }
});

function serveFile(res, filePath) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('Not found');
        } else {
            // Set correct content type
            const extname = path.extname(filePath);
            let contentType = 'text/html';
            
            switch (extname) {
                case '.js': contentType = 'text/javascript'; break;
                case '.css': contentType = 'text/css'; break;
                case '.json': contentType = 'application/json'; break;
                case '.png': contentType = 'image/png'; break;
                case '.jpg': contentType = 'image/jpg'; break;
                case '.svg': contentType = 'image/svg+xml'; break;
            }
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}

function handleAdminRequest(res, parsedUrl) {
    const id = parsedUrl.query.id || '1';
    const flag = 'file_discovery}';
    
    const html = ` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #333;
        }

        .admin-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 128, 0.2);
            width: 90%;
            max-width: 800px;
            padding: 30px;
            text-align: center;
        }

        h1 {
            color: #2a52be;
            margin-bottom: 30px;
            font-size: 2.5rem;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }

        .flag-container {
            perspective: 1000px;
            margin: 30px 0;
        }

        .flag-card {
            position: relative;
            width: 100%;
            height: 120px;
            transition: transform 0.6s;
            transform-style: preserve-3d;
            cursor: pointer;
        }

        .flag-card.flipped {
            transform: rotateY(180deg);
        }

        .flag-front, .flag-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 128, 0.2);
        }

        .flag-front {
            background: #2a52be;
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
        }

        .flag-back {
            background: #e6f0ff;
            color: #1a3a8f;
            transform: rotateY(180deg);
            font-family: monospace;
            font-size: 1.2rem;
            border-left: 5px solid #2a52be;
        }

        .dashboard-stats {
            display: flex;
            justify-content: space-around;
            margin: 40px 0;
        }

        .stat-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            width: 22%;
            box-shadow: 0 4px 8px rgba(0, 0, 128, 0.1);
            transition: transform 0.3s;
        }

        .stat-card:hover {
            transform: translateY(-5px);
        }

        .stat-card h3 {
            color: #2a52be;
            margin-top: 0;
        }

        .stat-value {
            font-size: 1.8rem;
            font-weight: bold;
            color: #1a3a8f;
        }

        footer {
            margin-top: 40px;
            color: #666;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="admin-container">
        <h1>Admin Dashboard</h1>
        
        <div class="flag-container">
            <div class="flag-card" id="flagCard" onclick="this.classList.toggle('flipped')">
                <div class="flag-front">
                    🔍 Click to Reveal Flag
                </div>
                <div class="flag-back">
                    <strong>Last part of flag:</strong> ${flag}
                </div>
            </div>
        </div>
        
        <div class="dashboard-stats">
            <div class="stat-card">
                <h3>Users</h3>
                <div class="stat-value">1,248</div>
            </div>
            <div class="stat-card">
                <h3>Logs</h3>
                <div class="stat-value">42</div>
            </div>
            <div class="stat-card">
                <h3>Alerts</h3>
                <div class="stat-value">3</div>
            </div>
            <div class="stat-card">
                <h3>Security</h3>
                <div class="stat-value">100%</div>
            </div>
        </div>
        
        <footer>
            Secure Admin Panel v2.0 | Last updated: <span id="current-date"></span>
        </footer>
    </div>

    <script>
        // Add current date
        document.getElementById('current-date').textContent = new Date().toLocaleDateString();
        
        // Optional: Add click sound effect
        document.getElementById('flagCard').addEventListener('click', function() {
            const clickSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...'); // Short base64 encoded click sound
            clickSound.volume = 0.3;
            clickSound.play().catch(e => {});
        });
    </script>
</body>
</html>
    `;
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
}

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access at: http://localhost:${PORT}/`);
});