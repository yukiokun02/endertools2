
### Contact Form Setup

To enable the contact form functionality, you need to set up SMTP credentials. You can set these as environment variables before starting the application:

```bash
export SMTP_HOST="smtp.gmail.com"
export SMTP_PORT="587"
export SMTP_USER="mail@enderhost.in"
export SMTP_PASSWORD="your-app-password"
export SMTP_SECURE="false"
./start.sh
```

## Troubleshooting

### Contact Form Issues
- Check that SMTP credentials are set correctly for mail@enderhost.in
