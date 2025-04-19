
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

5. Set up PM2 for process management:
```bash
npm install -g pm2
pm2 start npm --name "endertools" -- start
pm2 startup # Follow the instructions to make PM2 start on boot
pm2 save
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
        proxy_pass http://localhost:3000;
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

## Maintenance

- Monitor logs: `pm2 logs endertools`
- Restart application: `pm2 restart endertools`
- View status: `pm2 status`

## Troubleshooting

If you encounter issues:
1. Check application logs: `pm2 logs endertools`
2. Verify Nginx configuration: `sudo nginx -t`
3. Check Nginx error logs: `sudo tail -f /var/nginx/error.log`

For the contact form to work properly, make sure to:
1. Configure your SMTP settings correctly
2. Use a valid app password if using Gmail
3. Test the contact form after setup

For security:
1. Configure a firewall (UFW recommended)
2. Keep the system updated
3. Regularly monitor logs for unusual activity

Need help? Contact us at mail@enderhost.in
