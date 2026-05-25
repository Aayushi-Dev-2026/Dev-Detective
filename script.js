const searchBtn = document.getElementById('search-btn');
const usernameInput = document.getElementById('username-input');
const loadingTxt = document.getElementById('loading-txt');
const errorTxt = document.getElementById('error-txt');
const profileCard = document.getElementById('profile-card');

const avatar = document.getElementById('avatar');
const userName = document.getElementById('user-name');
const userBio = document.getElementById('user-bio');
const joinDate = document.getElementById('join-date');
const portfolioUrl = document.getElementById('portfolio-url');
const reposList = document.getElementById('repos-list'); // Level 2 element

searchBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username !== "") {
        fetchGitHubUser(username);
    }
});

async function fetchGitHubUser(username) {
    // Initial State: Loading dikhao, baaki sab chhupao
    loadingTxt.style.display = 'block';
    errorTxt.style.display = 'none';
    profileCard.style.display = 'none';
    reposList.innerHTML = ""; // Purani list clear karo

    try {
        // 1. Fetch Profile Data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        
        if (!userResponse.ok) {
            throw new Error('User not found');
        }

        const userData = await userResponse.json();

        // 2. LEVEL 2 FEATURE: Fetch Repositories Data (Sorted by latest created)
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=5`);
        const reposData = await reposResponse.json();

        // UI Update: Profile Info
        avatar.src = userData.avatar_url;
        userName.innerText = userData.name || userData.login;
        userBio.innerText = userData.bio || "This profile has no bio";
        
        // Date Format: ISO format ko simple date mein badalna
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        joinDate.innerText = new Date(userData.created_at).toLocaleDateString('en-US', options);
        portfolioUrl.href = userData.html_url;

        // UI Update: Top 5 Repositories list banana
        if (reposData.length === 0) {
            reposList.innerHTML = "<li>No public repositories found.</li>";
        } else {
            reposData.forEach(repo => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
                reposList.appendChild(li);
            });
        }

        // Loading chhupao aur card dikhao
        loadingTxt.style.display = 'none';
        profileCard.style.display = 'block';

    } catch (error) {
        // Error State
        loadingTxt.style.display = 'none';
        errorTxt.style.display = 'block';
    }
}