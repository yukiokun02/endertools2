
# EnderTools Website Setup

This guide provides instructions for setting up the EnderTools website on your VPS.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- A VPS running Linux (Ubuntu recommended)
- Domain name pointed to your VPS

## Installation Steps

1. Clone the repository:
```bash
git clone <your-repository-url>
cd endertools
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# SMTP Configuration (required for contact form)
export SMTP_HOST="smtp.gmail.com"
export SMTP_PORT="587"
export SMTP_USER="mail@enderhost.in"
export SMTP_PASSWORD="your-app-password"
export SMTP_SECURE="false"
```

4. Build the application:
```bash
npm run build
```

5. Set up the server:

Create a server startup script:
```bash
echo "node src/backend/server.js" > start-server.sh
chmod +x start-server.sh
```

6. Set up PM2 for process management:
```bash
npm install -g pm2
# Start the application with PM2
pm2 start start-server.js --name "endertools"
# OR directly with node
pm2 start src/backend/server.js --name "endertools"
pm2 startup # Follow the instructions to make PM2 start on boot
pm2 save
```

7. Check PM2 logs if you encounter issues:
```bash
pm2 logs endertools
```

## Nginx Configuration

1. Install Nginx if not already installed:
```bash
sudo apt update
sudo apt install nginx
```

2. Create an Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/endertools
```

3. Add the following configuration (replace yourdomain.com with your actual domain):
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;  # Note: Our server runs on port 3001
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Configure maximum file upload size
    client_max_body_size 100M;
}
```

4. Enable the site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/endertools /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## SSL Configuration

1. Install Certbot:
```bash
sudo apt install certbot python3-certbot-nginx
```

2. Obtain SSL certificate:
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## File Upload Directory Setup

1. Create upload directories with proper permissions:
```bash
mkdir -p /var/www/endertools/uploads
chown -R www-data:www-data /var/www/endertools/uploads
chmod -R 755 /var/www/endertools/uploads
```

## Troubleshooting Common Issues

If the application shows "errored" in PM2:

1. Check application logs for detailed error messages:
```bash
pm2 logs endertools
```

2. Common issues and solutions:

   a. **Port already in use**:
   ```bash
   # Check what's using port 3001
   sudo lsof -i :3001
   # Kill the process if needed
   sudo kill -9 <PID>
   ```

   b. **Missing environment variables**:
   ```bash
   # Make sure all required environment variables are set
   # Use a startup script or PM2 ecosystem file
   echo "export SMTP_HOST=smtp.gmail.com
   export SMTP_PORT=587
   export SMTP_USER=mail@enderhost.in
   export SMTP_PASSWORD=your-app-password
   export SMTP_SECURE=false
   node src/backend/server.js" > start-app.sh
   chmod +x start-app.sh
   pm2 start ./start-app.sh --name "endertools"
   ```

   c. **Permission issues**:
   ```bash
   # Ensure proper ownership of the application files
   sudo chown -R $USER:$USER /path/to/endertools
   ```

   d. **Node.js version issues**:
   ```bash
   # Verify you're using Node.js 18 or higher
   node -v
   # Install or update if needed using NVM
   ```

3. Check Nginx error logs:
```bash
sudo tail -f /var/log/nginx/error.log
```

For security:
1. Configure a firewall (UFW recommended)
2. Keep the system updated
3. Regularly monitor logs for unusual activity

Need help? Contact us at mail@enderhost.in
