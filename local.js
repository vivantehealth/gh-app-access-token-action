const { createAppAuth } = require("@octokit/auth-app");

async function run() {
  try {
    const privateKey = process.env.PRIVATE_KEY;
    const appId = 141210;
    const installationId = 19791482;
    const appAuth = createAppAuth({
      appId,
      privateKey,
    });
    const token = await appAuth({
      type: "installation",
      installationId,
    });
    console.log('token:', token);
    return token
  } catch (error) {
    console.err(error.message)
  }
}

run().then((result) => {
  console.log("complete", result)
});
