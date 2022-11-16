# Send SMS Notification Action

This action sends an SMS notification using Twilio for when other actions are complete.

The message will look like this:

> ✅ GitHub Action ✅<br/>
> <br/>
> Date: November 15, 2022<br/>
> Time: 7:01 PM<br/>
> Name: Deploy Website

## Inputs

### `TWILIO_ACCOUNT_SID`

**Required:** Twilio Account SID. Should be set in repository secrets.

### `TWILIO_AUTH_TOKEN`

**Required:** Twilio Account SID. **MUST** be set in repository secrets.

### `TWILIO_PHONE_NUMBER`

**Required:** Twilio phone number to send messages from. Should be set in repository secrets. <br/>
**Format:**`[+][country-code][number-with-area-code]`

### `PHONE_NUMBER`

**Required:** Phone number to send messages to. <br/>
**Format:**`[+][country-code][number-with-area-code]`


## Example usage

```yaml
uses: ammar-ahmed22/SendSMSNotification@v0.1-beta
  with:
    TWILIO_ACCOUNT_SID: ${{ secrets.TWILIO_ACCOUNT_SID }}
    TWILIO_AUTH_TOKEN: ${{ secrets.TWILIO_AUTH_TOKEN }}
    TWILIO_PHONE_NUMBER: ${{ secrets.TWILIO_PHONE_NUMBER }}
    PHONE_NUMBER: '+14168364386'
```

## Complete Action Usage
```yaml
name: Testing SMS Notification
on:
  schedule:
    # Runs at 12 AM est
    - cron: '30 18 * * *'
  workflow_dispatch:
jobs:
  test:
    name: Test Step
    runs-on: ubuntu-latest
    steps:
      - name: Testing inputs and date step
        id: test
        uses: ammar-ahmed22/SendSMSNotification@v0.1-beta
        with:
          TWILIO_ACCOUNT_SID: ${{ secrets.TWILIO_ACCOUNT_SID }}
          TWILIO_AUTH_TOKEN: ${{ secrets.TWILIO_AUTH_TOKEN }}
          TWILIO_PHONE_NUMBER: ${{ secrets.TWILIO_PHONE_NUMBER }}
          PHONE_NUMBER: '+14168364386'
```