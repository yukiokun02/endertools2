
#!/bin/bash

# Load environment variables
export SMTP_HOST="${SMTP_HOST:-smtp.gmail.com}"
export SMTP_PORT="${SMTP_PORT:-587}"
export SMTP_USER="${SMTP_USER:-mail@enderhost.in}"
export SMTP_PASSWORD="${SMTP_PASSWORD:-your-app-password}"
export SMTP_SECURE="${SMTP_SECURE:-false}"

# Start the server
exec node src/backend/server.js
