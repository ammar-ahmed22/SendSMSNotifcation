const core = require("@actions/core")
const github = require("@actions/github");

( async () => {
  try {
    const inputs = {
      TWILIO_ACCOUNT_SID: "",
      TWILIO_AUTH_TOKEN: "",
      TWILIO_PHONE_NUMBER: "",
      PHONE_NUMBER: "",
      withDate: true,
      withTime: true,
      withRepoName: true,
      withRepoOwner: true,
      note: '',
    }
  
    for (const name in inputs){
      inputs[name] = core.getInput(name)
    }
  
    const client = require("twilio")(inputs.TWILIO_ACCOUNT_SID, inputs.TWILIO_AUTH_TOKEN);
  
  
    const dateString = new Date().toLocaleString('en-US', { timeZone: "America/New_York", month: "long", day: "numeric", year: "numeric" });
    const timeString = new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "numeric", minute: "2-digit" })
    const workflowName = github.context.workflow;
    const repo = github.context.repo

    const message = `✅ GitHub Action ✅\n\nName: ${workflowName}`;

    if (inputs.withDate){
      message += `\nDate: ${dateString}`
    }

    if (inputs.withTime){
      message += `\nTime: ${timeString}`
    }

    if (inputs.withRepoName){
      message += `\nRepo Name: ${repo.repo}`
    }

    if (inputs.withRepoOwner){
      message += `\nRepo Owner: ${repo.owner}`
    }

    if (inputs.note !== ""){
      message += `\n\n${note}`
    }
    
  
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
