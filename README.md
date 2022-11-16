# Send SMS Notification Action

This action sends an SMS notification using Twilio for when other actions are complete.

The message will look like this (dependent on the options you choose):

> ✅ GitHub Action ✅<br/>
> <br/>
> Date: November 15, 2022<br/>
> Time: 7:01 PM<br/>
> Name: Deploy Website

### Latest Release: v1.1

## Inputs (Required)

### `TWILIO_ACCOUNT_SID`

Twilio Account SID. Should be set in repository secrets. <br/>
**Type:** String

### `TWILIO_AUTH_TOKEN`

Twilio Account SID. **MUST** be set in repository secrets. <br/>
**Type:** String

### `TWILIO_PHONE_NUMBER`

Twilio phone number to send messages from. Should be set in repository secrets. <br/>
**Type:** String <br/>
**Format:** `[+][country-code][number-with-area-code]`


### `PHONE_NUMBER`

Phone number to send messages to. <br/>
**Type:** String <br/>
**Format:** `[+][country-code][number-with-area-code]`

## Inputs (Optional)

### `withDate` 

Include date in message.<br/>
**Type:** Boolean <br/>
**Default:**: `true`

### `withTime` 

Include time in message.<br/>
**Type:** Boolean
**Default:**: `true`

### `withRepoName` 

Include repository name in message.<br/>
**Type:** Boolean
**Default:**: `true`

### `withRepoOwner` 

Include repository name in message.<br/>
**Type:** Boolean
**Default:**: `true`

### `note`

Include a note with the message
**Type:** String

## Example Action Usage
```yaml
name: Testing SMS Notification
on: workflow_dispatch # runs only when called manually
jobs:
  test:
    name: Testing
    runs-on: ubuntu-latest
    steps:
      - name: Testing with only required
        id: test-only-req
        uses: ammar-ahmed22/SendSMSNotification@v1.1
        with:
          TWILIO_ACCOUNT_SID: ${{ secrets.TWILIO_ACCOUNT_SID }}
          TWILIO_AUTH_TOKEN: ${{ secrets.TWILIO_AUTH_TOKEN }}
          TWILIO_PHONE_NUMBER: ${{ secrets.TWILIO_PHONE_NUMBER }}
          PHONE_NUMBER: '+14168364386'
      - name: Testing without repo name and owner
        id: test-no-repo
        uses: ammar-ahmed22/SendSMSNotification@v1.1
        with:
          TWILIO_ACCOUNT_SID: ${{ secrets.TWILIO_ACCOUNT_SID }}
          TWILIO_AUTH_TOKEN: ${{ secrets.TWILIO_AUTH_TOKEN }}
          TWILIO_PHONE_NUMBER: ${{ secrets.TWILIO_PHONE_NUMBER }}
          PHONE_NUMBER: '+14168364386'
          withRepoName: false
          withRepoOwner: false
      - name: Testing without date
        id: test-no-date
        uses: ammar-ahmed22/SendSMSNotification@v1.1
        with:
          TWILIO_ACCOUNT_SID: ${{ secrets.TWILIO_ACCOUNT_SID }}
          TWILIO_AUTH_TOKEN: ${{ secrets.TWILIO_AUTH_TOKEN }}
          TWILIO_PHONE_NUMBER: ${{ secrets.TWILIO_PHONE_NUMBER }}
          PHONE_NUMBER: '+14168364386'
          withDate: false
      - name: Testing with note
        id: test-with-note
        uses: ammar-ahmed22/SendSMSNotification@v1.1
        with:
          TWILIO_ACCOUNT_SID: ${{ secrets.TWILIO_ACCOUNT_SID }}
          TWILIO_AUTH_TOKEN: ${{ secrets.TWILIO_AUTH_TOKEN }}
          TWILIO_PHONE_NUMBER: ${{ secrets.TWILIO_PHONE_NUMBER }}
          PHONE_NUMBER: '+14168364386'
          note: 'Site is live at: https://ammarahmed.ca'
```

### Outputs for Example Usage
**id: test-only-req**<br />
Output:<br/>
> ✅ GitHub Action ✅<br/>
> <br/>
> Date: November 15, 2022<br/>
> Time: 7:01 PM<br/>
> Name: Testing SMS Notification <br />
> Repo Name: SendSMSNotification <br/>
> Repo Owner: ammar-ahmed22 <br/>

**id: test-no-repo**<br />
Output:<br/>
> ✅ GitHub Action ✅<br/>
> <br/>
> Date: November 15, 2022<br/>
> Time: 7:01 PM<br/>
> Name: Testing SMS Notification <br />

**id: test-no-date**<br />
Output:<br/>
> ✅ GitHub Action ✅<br/>
> <br/>
> Time: 7:01 PM<br/>
> Name: Testing SMS Notification <br />
> Repo Name: SendSMSNotification <br/>
> Repo Owner: ammar-ahmed22 <br/>

**id: test-with-note**<br />
Output:<br/>
> ✅ GitHub Action ✅<br/>
> <br/>
> Date: November 15, 2022<br/>
> Time: 7:01 PM<br/>
> Name: Testing SMS Notification <br />
> Repo Name: SendSMSNotification <br/>
> Repo Owner: ammar-ahmed22 <br/>
> <br/>
> Site is live at: https://ammarahmed.ca