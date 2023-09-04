const { Octokit } = require("@octokit/rest");
const core = require("@actions/core");

async function labelPR() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const octokit = new Octokit({ auth: token });

    const prTitle = process.env.PR_TITLE;
    const prNumber = process.env.PR_NUMBER;

    let labelsToAdd = [];

    if (prTitle.includes("[Bug]")) {
      labelsToAdd.push("Bug");
    }

    if (prTitle.includes("[Feature]")) {
      labelsToAdd.push("Feature");
    }

    if (labelsToAdd.length > 0) {
      await octokit.issues.addLabels({
        owner: process.env.GITHUB_REPOSITORY_OWNER,
        repo: process.env.GITHUB_REPOSITORY,
        issue_number: prNumber,
        labels: labelsToAdd,
      });
    }

    console.log(`Labels added to PR #${prNumber}: ${labelsToAdd.join(", ")}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

labelPR();
