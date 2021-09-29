const core = require('@actions/core');
const { createAppAuth } = require("@octokit/auth-app");

async function run() {
  try {
    const privateKey = core.getInput('private-key', { required: true });
    const appId = core.getInput('app-id', { required: true });
    const installationId = core.getInput('installation-id', { required: true });
    const appAuth = createAppAuth({
      appId,
      privateKey,
    });
    const token = appAuth({
      type: "installation",
      installationId,
    })
    if !token.token {
      console.error("Invalid access token:", token)
      throw new Error('Invalid access token')
    }
    core.setSecret(token.token)
    core.setOutput('token', token.token)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
