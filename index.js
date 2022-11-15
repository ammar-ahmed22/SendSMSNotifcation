const core = require("@actions/core")
const github = require("@actions/github");

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

  console.log("inputs:", JSON.stringify(inputs));

  const dateString = new Date().toLocaleString('en-US', { timeZone: "America/New_York", month: "long", day: "numeric", year: "numeric" });
  const timeString = new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "numeric", minute: "2-digit" })
  const workflowName = github.context.workflow;

  const message = `✅ GitHub Action ✅\n\nDate:${dateString}\nTime:${timeString}\nName:${workflowName}`

  console.log("message:", message);

} catch (error) {
  core.setFailed(error.message)
}