
# EnderTools - Minecraft Resource Pack Tools

A collection of free tools for Minecraft server owners and resource pack creators. This project provides three main tools:

1. **Resource Pack Merger** - Combine two resource packs into one
2. **Direct Download Link Generator** - Create shareable download links for resource packs
3. **SHA-1 Hash Generator** - Generate SHA-1 hash for resource packs (required for server.properties)

## Features

- **Easy to Use**: Simple drag-and-drop interface for all tools
- **Fast Processing**: All tools are optimized for quick operation
- **Free & Open Source**: No cost, no signup required
- **Privacy-Focused**: Files are processed on your server, not sent to third parties
- **Contact Form**: Built-in contact form with spam protection

## Setup Instructions (Ubuntu/Debian)

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- Git

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/endertools.git
   cd endertools
   ```

2. Run the start script to automatically install dependencies, build the frontend, and start the server:
   ```bash
   chmod +x start.sh
   ./start.sh
   ```

The application will be available at `http://your-server-ip:3001`.

### Contact Form Setup

To enable the contact form functionality, you need to set up SMTP credentials. You can set these as environment variables before starting the application:

```bash
export SMTP_HOST="smtp.gmail.com"
export SMTP_PORT="587"
export SMTP_USER="mail.enderhost@gmail.com"
export SMTP_PASSWORD="your-app-password"
export SMTP_SECURE="false"
./start.sh
```

**Note for Gmail users**: You'll need to use an "App Password" instead of your regular account password. To generate an App Password:
1. Enable 2-Step Verification for your Google account
2. Go to Google Account > Security > App Passwords
3. Generate a new App Password for "Mail" and use it as SMTP_PASSWORD

### Manual Installation

If you prefer to install manually:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the frontend:
   ```bash
   npm run build
   ```

3. Start the server:
   ```bash
   NODE_ENV=production node src/backend/server.js
   ```

## Running as a Service (Production)

To keep the application running after you close the terminal, you can create a systemd service:

1. Create a service file:
   ```bash
   sudo nano /etc/systemd/system/endertools.service
   ```

2. Add the following content (update paths as needed):
   ```
   [Unit]
   Description=EnderTools Server
   After=network.target

   [Service]
   Type=simple
   User=yourusername
   WorkingDirectory=/path/to/endertools
   ExecStart=/usr/bin/node /path/to/endertools/src/backend/server.js
   Restart=on-failure
   Environment=NODE_ENV=production
   Environment=SMTP_HOST=smtp.gmail.com
   Environment=SMTP_PORT=587
   Environment=SMTP_USER=mail.enderhost@gmail.com
   Environment=SMTP_PASSWORD=your-app-password
   Environment=SMTP_SECURE=false
   
   [Install]
   WantedBy=multi-user.target
   ```

3. Enable and start the service:
   ```bash
   sudo systemctl enable endertools
   sudo systemctl start endertools
   ```

## Setting Up with Nginx (Optional)

If you want to run the application on port 80 or with a domain name, you can set up Nginx as a reverse proxy:

1. Install Nginx:
   ```bash
   sudo apt-get install nginx
   ```

2. Create a site configuration:
   ```bash
   sudo nano /etc/nginx/sites-available/endertools
   ```

3. Add the following configuration:
   ```
   server {
       listen 80;
       server_name yourdomain.com; # or your server IP

       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. Enable the site and restart Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/endertools /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Log Files

Logs are stored in the `logs` directory:
- `logs/activity.log` - Records all successful API requests
- `logs/error.log` - Records errors and exceptions
- `logs/contact.log` - Records contact form submissions

You can monitor logs in real-time using:
```bash
tail -f logs/error.log
```

## Troubleshooting

### Contact Form Issues
- Check that SMTP credentials are set correctly
- Verify that your SMTP server allows the connection
- Check logs/contact.log for submission attempts

### File Upload Issues
- Check that the `uploads` directory exists and has proper permissions
- Verify the maximum file size limit (50MB by default)

### Server Won't Start
- Check that port 3001 is not in use by another application
- Verify you have the correct Node.js version installed

### API Errors
- Check the error logs: `cat logs/error.log`
- Ensure the server has enough disk space for file processing

## Need Help?

If you encounter any issues or need assistance, please check the logs or create an issue on the GitHub repository.

## License

This project is provided by EnderHOST as a free service to the Minecraft community.
