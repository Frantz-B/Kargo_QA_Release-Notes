// [DM-1029] - Generate Deal ID and push to KSSP and Kraken
// [DM-1029] Generate Deal ID and push to KSSP and Kraken
let prs = document.querySelectorAll("a[data-hovercard-type='pull_request'")
let str = ""
let githubURL = "https://github.com/KargoGlobal/deal-manager/pull/"
let kargoLink = "https://kargo1.atlassian.net/browse/"
prs.forEach(pr => {
    let text = pr.innerText;
    let dm_id = text.split('] ')[0].toUpperCase().replace(/[\[\]']+/g, '') // [DM-1065]
    let ticketName = text.split(' - ')[1]
    let pr_id = pr.href.split('pull/')[1]
    let pr_link = `(${pr.href})`
    str += `[[${dm_id}]]`;
    str += `(${kargoLink + dm_id})`
    str += ' - '
    str += ticketName
    str += ` #${pr_id}`
    str += pr_link
    str += '\n'
})
str