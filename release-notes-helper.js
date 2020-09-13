// Pls modify buildType, version and releaseDate variables
let buildType = 'build';  // put either 'patch' or 'build'
let version = '0.19.0';  // build version
let releaseDate = 'September 01, 2020 at 6:25pm EST'; // enter date of release
let releaseDateSlack = '9/1'; // quick date for slackMarkdown
let kargoLink = "https://kargo1.atlassian.net/browse/";
let gitHubString = '';
let slackString = '';
let storiesGit = [];
let stories = [];
let bugGit = [];
let bug = [];
let dvGit = [];
let dv = [];

response.forEach( pullRequest => {
    let prText = pullRequest.title;
    let project_id = prText.match(/[a-zA-Z]+\s?.\s?[0-9]{1,}/g); // plucking just Jira ticket_id
    let ticketTitle = prText.replace(/((\[?(([a-zA-Z]+)*[ -]*\d+)\]*)[ -:]*)/g, '');
    let pr_id = pullRequest.number;

    gitHubString += '*';
    slackString += '> •';

    if (!!project_id) {
        project_id.forEach(id => {
            id = id.toUpperCase();
            gitHubString += ` [[${id}]]`;
            gitHubString += `(${kargoLink + id})`;
            slackString += ` [${id}]`;
        });
    } else {
        project_id = '👺 No Ticket';
        gitHubString += ` [${project_id}]`;
        slackString += ` [${project_id}]`;
    }

    gitHubString += ' - ';
    gitHubString += ticketTitle;
    gitHubString += `    (PR - #${pr_id})`;
    slackString += ' - ';
    slackString += ticketTitle;

    if (pullRequest.labels[0].name === 'WIP') {
        dvGit.push(gitHubString);
        dv.push(slackString);
        gitHubString = '';
        slackString = '';
    } 
    if (pullRequest.labels[0].name === 'bug') {
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
let slackMarkdown = `:fire: *Altice Release v${version}* :fire: \nALT: (released Today ${releaseDateSlack})\n`
gitMarkdown += '### STORIES\n' + storiesGit.join('\n');
gitMarkdown += '\n\n### BUGS\n' + bugGit.join('\n');
gitMarkdown += '\n\n### Work In Progress\n' + dvGit.join('\n');
slackMarkdown += '_*Stories:*_\n' + stories.join('\n');
slackMarkdown += '\n\n_*Bugs:*_\n' + bug.join('\n');
slackMarkdown += '\n\n_*WIP:*_\n' + dv.join('\n');
console.log(slackMarkdown);
console.log(gitMarkdown);

// Below should be executed first, then top
let myHeaders = new Headers();
myHeaders.append("Authorization", "token 14e8f15d802b67e7c39bef5810cd6875a222e598");

let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.github.com/repos/KargoGlobal/kam/issues?milestone=21&state=closed&&per_page=100", requestOptions)
  .then(response => response.json())
  .then(result => {response = result})  //figure out what to do
  .catch(error => console.log('error', error));