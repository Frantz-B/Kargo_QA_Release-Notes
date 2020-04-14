let pullRequestRow = document.querySelectorAll('.min-width-0.lh-condensed');
let kargoLink = "https://kargo1.atlassian.net/browse/"
let gitHubString = ''
let slackString = ''
let storiesGit = [];
let stories = [];
let bugGit = [];
let bug = [];

pullRequestRow.forEach( pullRequest => {
    let prText = pullRequest.childNodes[1].innerText;
    let dm_id = prText.split('] ')[0].toUpperCase().replace(/[\[\]']+/g, ''); // plucking just Jira ticket_id
    let ticketTitle = prText.split('] ')[1];
    let pr_id = pullRequest.childNodes[1].href.split('pull/')[1];

    gitHubString += `* [[${dm_id}]]`;
    gitHubString += `(${kargoLink + dm_id})`
    gitHubString += ' - '
    gitHubString += ticketTitle
    gitHubString += `    (PR - #${pr_id})`
    gitHubString += '\n'

    slackString += `> • [${dm_id}]`;
    slackString += ' - '
    slackString += ticketTitle
    slackString += '\n'

    if (pullRequest.childNodes[5].innerText.includes('bug')) {
        bugGit.push(gitHubString);
        bug.push(slackString);
        gitHubString = '';
        slackString = '';
    } else {
        storiesGit.push(gitHubString);
        stories.push(slackString);
        gitHubString = '';
        slackString = '';
    }
})
gitHubString
slackString