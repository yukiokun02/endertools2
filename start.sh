
#!/bin/bash

# Terminal colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting EnderTools Setup...${NC}"

# Create necessary directories
echo -e "${BLUE}Creating necessary directories...${NC}"
mkdir -p logs uploads

# Check for Node.js and npm
echo -e "${BLUE}Checking dependencies...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js v16 or higher.${NC}"
    echo "You can install it with: curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && sudo apt-get install -y nodejs"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is not installed. Please install npm.${NC}"
    exit 1
fi

# Check for environment variables
if [ -z "$SMTP_PASSWORD" ]; then
    echo -e "${BLUE}SMTP credentials not found in environment. Using default configuration.${NC}"
    echo -e "${BLUE}To send emails, set these environment variables:${NC}"
    echo "  SMTP_HOST - SMTP server hostname (default: smtp.gmail.com)"
    echo "  SMTP_PORT - SMTP server port (default: 587)"
    echo "  SMTP_USER - SMTP username (default: mail.enderhost@gmail.com)"
    echo "  SMTP_PASSWORD - SMTP password (required for sending emails)"
    echo "  SMTP_SECURE - Use TLS (true/false, default: false)"
fi

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install

# Build frontend
echo -e "${BLUE}Building frontend...${NC}"
npm run build

# Start the server
echo -e "${GREEN}Starting the server...${NC}"
NODE_ENV=production node src/backend/server.js
