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

    console.log("inputs:", JSON.stringify(inputs));
  
    const client = require("twilio")(inputs.TWILIO_ACCOUNT_SID, inputs.TWILIO_AUTH_TOKEN);
  
  
    const dateString = new Date().toLocaleString('en-US', { timeZone: "America/New_York", month: "long", day: "numeric", year: "numeric" });
    const timeString = new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "numeric", minute: "2-digit" })
    const workflowName = github.context.workflow;
    const repo = github.context.repo

    let message = `✅ GitHub Action ✅\n\nName: ${workflowName}`;

    if (inputs.withDate === "true"){
      message += `\nDate: ${dateString}`
    }

    if (inputs.withTime === "true"){
      message += `\nTime: ${timeString}`
    }

    if (inputs.withRepoName === "true"){
      message += `\nRepo Name: ${repo.repo}`
    }

    if (inputs.withRepoOwner === "true"){
      message += `\nRepo Owner: ${repo.owner}`
    }

    if (inputs.note !== ""){
      message += `\n\n${inputs.note}`
    }

    console.log("sending message:\n", message);
    
  
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
