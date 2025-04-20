
#!/bin/bash

# Set default environment variables if not provided
export SMTP_HOST="${SMTP_HOST:-smtp.gmail.com}"
export SMTP_PORT="${SMTP_PORT:-587}"
export SMTP_USER="${SMTP_USER:-mail@enderhost.in}"
export SMTP_PASSWORD="${SMTP_PASSWORD:-your-app-password}"
export SMTP_SECURE="${SMTP_SECURE:-false}"

# Create logs directory if it doesn't exist
mkdir -p logs

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "Warning: You are using Node.js v$(node -v). Version 18 or higher is recommended."
fi

# Start the server
echo "Starting EnderTools server..."
exec node src/backend/server.js 2>&1 | tee -a logs/server.log
