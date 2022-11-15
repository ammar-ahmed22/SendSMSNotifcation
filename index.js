const core = require("@actions/core")
const github = require("@actions/github");

( async () => {
  try {
    const inputs = {
      TWILIO_ACCOUNT_SID: "",
      TWILIO_AUTH_TOKEN: "",
      TWILIO_PHONE_NUMBER: "",
      PHONE_NUMBER: ""
    }
  
    for (const name in inputs){
      inputs[name] = core.getInput(name)
    }
  
    const client = require("twilio")(inputs.TWILIO_ACCOUNT_SID, inputs.TWILIO_AUTH_TOKEN);
  
  
    const dateString = new Date().toLocaleString('en-US', { timeZone: "America/New_York", month: "long", day: "numeric", year: "numeric" });
    const timeString = new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "numeric", minute: "2-digit" })
    const workflowName = github.context.workflow;
  
    const message = `✅ GitHub Action ✅\n\nDate: ${dateString}\nTime: ${timeString}\nName: ${workflowName}`
  
    const response = await client.messages.create({
      body: message,
      from: inputs.TWILIO_PHONE_NUMBER,
      to: inputs.PHONE_NUMBER
    })

    console.log(response.status);
  
  } catch (error) {
    core.setFailed(error.message)
  }
})()
