let pullRequestElements = document.querySelectorAll("a[data-hovercard-type='pull_request'")
let gitHubString = ""
let kargoLink = "https://kargo1.atlassian.net/browse/"

pullRequestElements.forEach(pullRequest => {
    let prText = pullRequest.innerText;
    let dm_id = prText.split('] ')[0].toUpperCase().replace(/[\[\]']+/g, '') // plucking just Jira ticket_id
    let ticketTitle = prText.split('] ')[1]
    let pr_id = pullRequest.href.split('pull/')[1]

    gitHubString += `* [[${dm_id}]]`;
    gitHubString += `(${kargoLink + dm_id})`
    gitHubString += ' - '
    gitHubString += ticketTitle
    gitHubString += `    (PR - #${pr_id})`
    gitHubString += '\n'
})
gitHubString
