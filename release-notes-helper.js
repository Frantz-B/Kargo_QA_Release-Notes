// Pls modify buildType, version and releaseDate variables
let buildType = 'build';  // put either 'patch' or 'build'
let version = '1.6.2';  // build version
let releaseDate = 'April 8, 2020 at 7:44pm EST'; // enter date of release
let releaseDateSlack = '4/8'; // quick date for slackMarkdown


let pullRequestRow = document.querySelectorAll('.min-width-0.lh-condensed');
let kargoLink = "https://kargo1.atlassian.net/browse/";
let gitHubString = '';
let slackString = '';
let storiesGit = [];
let stories = [];
let bugGit = [];
let bug = [];

pullRequestRow.forEach( pullRequest => {
    let prText = pullRequest.childNodes[1].innerText;
    let project_id = prText.match(/[a-zA-Z]+\s?.\s?[0-9]{1,}/g); // plucking just Jira ticket_id
    let ticketTitle = prText.replace(/((\[?(([a-zA-Z]+)*[ -]*\d+)\]*)[ -:]*)/g, '');
    let pr_id = pullRequest.childNodes[1].href.split('pull/')[1];

    gitHubString += '*';
    slackString += '> •';

    project_id.forEach(id => {
        id = id.toUpperCase();
        gitHubString += ` [[${id}]]`;
        gitHubString += `(${kargoLink + id})`;
        slackString += ` [${id}]`;
    });
    gitHubString += ' - ';
    gitHubString += ticketTitle;
    gitHubString += `    (PR - #${pr_id})`;

    slackString += ' - ';
    slackString += ticketTitle;

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
});

let gitMarkdown = `### ${buildType.toUpperCase()} RELEASE\n` + `* Build version ${version} on ${releaseDate}\n\n`
let slackMarkdown = `:fire: *Deal Manager Release v${version}* :fire: \nDM: (released Today ${releaseDateSlack})\n`
gitMarkdown += '### STORIES\n' + storiesGit.join('\n');
gitMarkdown += '\n\n### BUGS\n' + bugGit.join('\n');
slackMarkdown += '_*Stories:*_\n' + stories.join('\n');
slackMarkdown += '\n\n_*Bugs:*_\n' + bug.join('\n');
// console.log(slackMarkdown);
console.log(gitMarkdown);
