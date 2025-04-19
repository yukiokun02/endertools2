
# Ensure the default SMTP_USER uses the new email
if [ -z "$SMTP_USER" ]; then
    export SMTP_USER="mail@enderhost.in"
fi
