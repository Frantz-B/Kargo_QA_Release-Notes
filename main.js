const projectNameInputElement = document.getElementById('project-name');
const projectListDropDownElement = document.getElementById('project-list');
const releaseVersionInputElement = document.getElementById('release-version');
const gitAccessElement = document.querySelector('.gitHub-access');
const apiKeyElement = document.querySelector('#git-api-key');

const releaseSearchEndpoint = '/releases?per_page=100';

let project = {};
let releaseObject = {};
let releaseId = '';
let gitMarkDown = '';
let gitApiMarkDown = '';
let slackMarkDown = '';

const projectList = { 
    KM: {
        shortName: 'KM',
        githubName: 'ControlPanel',
        longName: 'Kargo Marketplace',
        jiraShortName: 'KM'
    },
    DM: {
        githubName: 'deal-manager',
        longName: 'Deal-Manager Backend',
        jiraShortName: 'DM'
    },
    "DM-UI": {
        githubName: 'deal-manager-ui',
        longName: 'Deal-Manager Frontend',
        jiraShortName: 'DM'
    },
    KBR: {
        githubName: 'kbr-builder',
        longName: 'Kargo Brand Study Builder',
        jiraShortName: 'KBR'
    },
    "DEAL-SYNC": {
        githubName: 'deal-sync',
        longName: 'Deal-Sync Service for KM and DM',
        jiraShortName: 'DM'
    },
    "SYNC-DIFF": {
        githubName: 'sync-diff',
        longName: 'Sync-Diff Service for Kargo Marketplace',
        jiraShortName: 'KM'
    },
    KAM: {
        githubName: 'kam',
        longName: 'Altice `Backend`',
        jiraShortName: 'ALT'
    },
    "KAM-UI": {
        githubName: 'kam-ui',
        longName: 'Altice `Frontend`',
        jiraShortName: 'ALT'
    },
    "K-USERS": {
        githubName: 'k-users',
        longName: 'K-Users',
        jiraShortName: 'KM'
    },
    "KRAKEN-UI": {
        githubName: 'kraken-ui',
        longName: 'Kraken UI',
        jiraShortName: 'WEB'
    },
    IN: {
        githubName: 'integrations-hub',
        longName: 'Integrations Hub',
        jiraShortName: 'IN'
    },
    CMA: {
        githubName: 'cma',
        longName: 'Cerberus Media Activation Service',
        jiraShortName: 'CMA'
    },
    KBR: {
        githubName: 'kbr-builder',
        longName: 'KBR Builder',
        jiraShortName: 'WEB'
    },
    CITADEL: {
        githubName: 'citadel',
        longName: 'Citadel',
        jiraShortName: 'WEB'
    },
    COMPOSER: {
        githubName: 'ad-composer',
        longName: 'Composer Backend',
        jiraShortName: 'CM'
    },
    "AD-COMPOSER-REACT": {
        githubName: 'ad-composer-react',
        longName: 'Composer Frontend',
        jiraShortName: 'CM'
    },
    "RETAIL-API": {
        githubName: 'retail-api',
        longName: 'Retail API',
        jiraShortName: 'KAT'
    },
    "SNIPPET-SERVICE": {
        githubName: 'ad-snippet-service',
        longName: 'Snippet Service',
        jiraShortName: 'KAT'
    },
    "AD-TAG": {
        githubName: 'ad-tag',
        longName: 'Ad Tag',
        jiraShortName: 'KAT'
    },
    "DEMO-SITE": {
        githubName: 'ad-demo-platform',
        longName: 'Demo Site',
        jiraShortName: 'KAT'
    },
    KARGONAUT: {
        githubName: 'ad-kargonaut',
        longName: 'Kargonaut',
        jiraShortName: 'KAT'
    },
    KROSSBOW: {
        githubName: 'ad-krossbow',
        longName: 'Krossbow / Ad Tag E2E Testing',
        jiraShortName: 'KAT'
    },
    "AD-PLATFORM-TEMPLATES": {
        githubName: 'ad-platform-templates',
        longName: 'Ad Platform Templates',
        jiraShortName: 'KAT'
    },
    KAILTRA: {
        githubName: 'ad-kailtra',
        longName: 'Kailtra',
        jiraShortName: 'KATT'
    },
    KAIL: {
        githubName: 'ad-innovation-library',
        longName: 'Kargo Ad Innovation Library',
        jiraShortName: 'KAT'
    },
    COP: {
        githubName: 'ad-chrome-extension',
        longName: 'Ad Chrome Extension / COP (Creative on Pub)',
        jiraShortName: 'KAT'
    },
};

if (localStorage.gitApiKey) {
    gitAccessElement.innerHTML = "";
    gitAccessElement.innerHTML += "<p style='color: #165f04; font-weight: bold;'>Thanks for coming back. API Key Found!</p>"
}

projectNameInputElement.addEventListener('input', getProjectNames);

function getProjectNames() {
    projectSearchTerm = projectNameInputElement.value;
    matchingProjects = {};

    if (projectSearchTerm.length > 0 ) {
        Object.keys(projectList).forEach((key) => {
            project = projectList[key]; // All keys are Uppercase already
            if ( key.includes(projectSearchTerm.toUpperCase()) || project.longName.toUpperCase().includes(projectSearchTerm.toUpperCase())) {
                matchingProjects[key] = project;
            }
        });
        showProjectNames(matchingProjects);
    } else {
        showProjectNames(projectList);
    }
};

function showProjectNames(projectObject) {
    projectListDropDownElement.innerHTML = '';
    Object.keys(projectObject).forEach((project) => {
        const listItemElement = document.createElement('li');
        const spanProjectNameElement = document.createElement('span');
        const spanProjectLongNameElement = document.createElement('span');
        
        spanProjectNameElement.textContent = project;
        spanProjectNameElement.className = 'name';
        spanProjectNameElement.setAttribute('style', 'font-weight: bold');
        
        spanProjectLongNameElement.textContent = ': ' + projectList[project].longName;
        spanProjectLongNameElement.className = 'long-name';

        listItemElement.appendChild(spanProjectNameElement);
        listItemElement.appendChild(spanProjectLongNameElement);
        projectListDropDownElement.appendChild(listItemElement);
    });

    //Adding functionality so that User can click on a any project
    document.querySelectorAll('li').forEach( projectListItemElement => {
        projectListItemElement.onclick = () => {
            let selectedProjectName = projectListItemElement.querySelector('.name');
            projectNameInputElement.value = selectedProjectName.textContent;
            projectListDropDownElement.innerHTML = '';
        }
    });
};

showProjectNames(projectList);

projectNameInputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let selectedProject = projectListDropDownElement.querySelector('li');

        if (selectedProject) {
            let selectedProjectName = selectedProject.querySelector('.name');
            projectNameInputElement.value = selectedProjectName.textContent;
            projectListDropDownElement.innerHTML = '';
        }
    }
});

releaseVersionInputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
       generateNotes();
    }
});

function grabApiKey() {
    localStorage.setItem('gitApiKey', apiKeyElement.value);
    gitAccessElement.innerHTML = "";
    gitAccessElement.innerHTML += "<p>API Key Saved!</p>";
}

function getReleaseType(releaseVer) {
    let releaseProject = {};
    let releaseNumberArray = releaseVer.match(/\d+/g); // Drops text from string
    releaseProject.version = releaseNumberArray.join('.'); // Yields number in format '#.#.#'
    
    if (!!releaseNumberArray.length === 3) {
        throw new Error('release version should follow format #.#.#');
    }
    if(!parseInt(releaseNumberArray[2])) {
        releaseProject.type = 'build'
        releaseProject.icon = ':fire:'
    } else {
        releaseProject.type = 'patch';
        releaseProject.icon = ':hotsprings:';
    }
    return releaseProject;
};

async function gitApiRequest(projectGitName, endPoint, methodType, methodBody) {
    let apiResponse;
    
    try {
        if (!localStorage.gitApiKey) throw new Error('Must Enter GitHub API-Key to use tool.');
    } catch (error) {
        console.log(error.message);
        document.getElementById('missing-apiKey-msg').innerHTML = error.message;
        return error
    }

    const token = "token " + localStorage.gitApiKey; // my token ddaf84ae0313c9d01378d144af77131101057eba
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const options = {
        method: methodType,
        headers: myHeaders,
        body: methodBody
    };

    let url = `https://api.github.com/repos/KargoGlobal/${projectGitName}`;
    if(endPoint) url += endPoint;
    await fetch(url, options)
        .then(response => response.json())
        .then(result => {apiResponse = result})  //figure out what to do
        .catch(error => {apiResponse = error});
    return apiResponse;
};

async function getMileStoneNumber(projectGithubName, releaseTagNumber) { // Created this incase milestone was close earlier than suppose
    let milestoneSearchEndpoint = '/milestones?state=all&per_page=100'; // keeping this variable to debug api later
    let pageNumber = 1;
    let milestone = '';
    while (pageNumber < 10) {
        let milestoneSearchResults = await gitApiRequest(projectGithubName, `${milestoneSearchEndpoint}&page=${pageNumber}`);
        milestone = milestoneSearchResults.filter(milestoneElement => milestoneElement.title.includes(releaseTagNumber))[0];
        if (milestone) {
            console.log('Yo, found Milestone on page: ' + pageNumber);
            break;
        }
        pageNumber++
    }
    try {
        if (!milestone) throw new Error('Milestone Not found in 1st 6 pages in GitHub for Project: ' + projectGithubName);
    } catch (error) {
        console.log(error.message);
        document.getElementById('captured-error-msg').innerHTML = error.message;
    }
    return milestone.number;
};

function getReleaseDate(releaseTagSearchResponse, releaseVer) { 
    let releaseTag = releaseTagSearchResponse.filter(releaseTagElement => releaseTagElement.tag_name.includes(releaseVer))[0];
    try {
        if (!releaseTag) throw new Error('Release Tag Not found in 1st 100-set or Tag needs to be Released');
    } catch (error) {
        console.log(error.message);
        document.getElementById('captured-error-msg').innerHTML = error.message;
    }
    releaseId = `${releaseSearchEndpoint}/${releaseTag.id}`;
    return releaseTag.published_at;
};

// Once 'gitMarkDown' looks good, uncomment the next line
async function updateGitHub() {
    await gitApiRequest(project.githubName, releaseId.replace('?per_page=100',''), 'PATCH', `{"body":"${gitApiMarkDown}"}`);
    console.log('API Markdown was pushed');
    document.querySelector('#git-markdown textarea').value = 'API Markdown was pushed';
};

async function generateNotes() {
    document.getElementById('captured-error-msg').innerHTML = '';
    document.querySelector('#git-markdown textarea').value = '';
    document.querySelector('#slack-markdown textarea').value = '';

    const projectKey = projectNameInputElement.value;
    const releaseVersion = releaseVersionInputElement.value;

    releaseObject = getReleaseType(releaseVersion);
    project = projectList[projectKey.toUpperCase()];

    const milestoneNumber = await getMileStoneNumber(project.githubName, releaseObject.version);
    const milestonePrsUrl = `/issues?milestone=${milestoneNumber}&state=closed&per_page=100`;
    const collectionOfPRs = await gitApiRequest(project.githubName, milestonePrsUrl);

    const releaseSearchResponse = await gitApiRequest(project.githubName, releaseSearchEndpoint);
    
    const releaseDate = getReleaseDate(releaseSearchResponse, releaseObject.version);
    const gitReleaseDate = `${moment(releaseDate).format('MMMM DD, YYYY [at] h:mma')} EST`;
    const slackReleaseDate = moment(releaseDate).format('MM/DD');

    let gitHubString = '';
    let slackString = '';
    let storiesGit = [];
    let storiesSlack = [];
    let bugGit = [];
    let bugSlack = [];
    let workInProgressGit = [];
    let workInProgressSlack = [];

    collectionOfPRs.forEach( pullRequest => {
        let jiraBaseUrl = "https://kargo1.atlassian.net/browse/";
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
                gitHubString += `(${jiraBaseUrl + id})`;
                slackString += ` [${id}]`;
            });
        } else {
            project_id = '👺 No Ticket';
            gitHubString += ` [${project_id}]`;
            slackString += ` [${project_id}]`;
        }

        gitHubString += ' - ';
        gitHubString += ticketTitle.replace(/['"]+/g, ':');
        gitHubString += `    (PR - #${pr_id})`;
        slackString += ' - ';
        slackString += ticketTitle.replace(/['"]+/g, ':');

        try {
            if (!pullRequest.labels[0]) throw new Error('There are PR(s) missing labels, Please make sure each PR in Milestone has a Label')
        } catch (error) {
            console.log(error.message);
            document.getElementById('captured-error-msg').innerHTML = error.message;
        }

        if (pullRequest.labels[0].name === 'WIP') {
            workInProgressGit.push(gitHubString);
            workInProgressSlack.push(slackString);
            gitHubString = '';
            slackString = '';
        } 
        else if (pullRequest.labels[0].name === 'bug') {
            bugGit.push(gitHubString);
            bugSlack.push(slackString);
            gitHubString = '';
            slackString = '';
        } else {
            storiesGit.push(gitHubString);
            storiesSlack.push(slackString);
            gitHubString = '';
            slackString = '';
        }
    });

    gitMarkDown = `### ${releaseObject.type.toUpperCase()} RELEASE\n` + `* Build version ${releaseObject.version} on ${gitReleaseDate}\n\n`
    gitApiMarkDown = `### ${releaseObject.type.toUpperCase()} RELEASE\\n` + `* Build version ${releaseObject.version} on ${gitReleaseDate}\\n\\n`
    slackMarkDown = `${releaseObject.icon} *${project.longName} Release v${releaseObject.version}* ${releaseObject.icon} \n${project.jiraShortName}: (released Today ${slackReleaseDate})\n`
    if (storiesGit.length) gitMarkDown += '### STORIES\n' + storiesGit.join('\n');
    if (storiesGit.length) gitApiMarkDown += '### STORIES\\n' + storiesGit.join('\\n');
    if (storiesGit.length) gitMarkDown += '\n\n';
    if (storiesGit.length) gitApiMarkDown += '\\n\\n';
    if (bugGit.length) gitMarkDown += '### BUGS\n' + bugGit.join('\n');
    if (bugGit.length) gitApiMarkDown += '### BUGS\\n' + bugGit.join('\\n');
    if (bugGit.length) gitMarkDown += '\n\n';
    if (bugGit.length) gitApiMarkDown += '\\n\\n';
    if (workInProgressGit.length) gitMarkDown += '### Work In Progress\n' + workInProgressGit.join('\n');
    if (workInProgressGit.length) gitApiMarkDown += '### Work In Progress\\n' + workInProgressGit.join('\\n');
    if (storiesSlack.length) slackMarkDown += '_*Stories:*_\n' + storiesSlack.join('\n');
    if (storiesSlack.length) slackMarkDown += '\n\n'
    if (bugSlack.length) slackMarkDown += '_*Bugs:*_\n' + bugSlack.join('\n');
    if (bugSlack.length && workInProgressSlack.length) slackMarkDown += '\n\n'
    if (workInProgressSlack.length) slackMarkDown += '_*WIP:*_\n' + workInProgressSlack.join('\n');
    slackMarkDown += `\n\n:lock_with_ink_pen: - https://github.com/KargoGlobal/${project.githubName}/releases/tag/v${releaseObject.version}`
    console.log(slackMarkDown);
    console.log(gitMarkDown);
    console.log(gitApiMarkDown);

    document.querySelector('#git-markdown textarea').value = gitMarkDown;
    document.querySelector('#slack-markdown textarea').value = slackMarkDown;
}
