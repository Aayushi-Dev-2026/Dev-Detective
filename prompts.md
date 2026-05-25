# Mission 3: AI Interaction Log - Dev-Detective 🔍

## ## Phase 1: Project Setup & Base Structure
**User Prompt:** "I am starting Mission 3 (Dev-Detective) for my internship. I need a clean HTML5 structure for a GitHub user finder. It should have a heading, a search input with a button, text elements to show loading and user not found states, and a profile card element to display user information later."

**AI Response:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dev-Detective: GitHub API Hunter</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Dev-Detective 🔍</h1>
        <div class="search-box">
            <input type="text" id="username-input" placeholder="Enter GitHub username (e.g., octocat)...">
            <button id="search-btn">Search</button>
        </div>
        <p id="loading-txt" style="display: none;">Loading user details...</p>
        <p id="error-txt" style="display: none;">User Not Found</p>
    </div>
</body>
</html>
```

## Phase 2: Styling and Dark Theme Dashboard Design
**User Prompt:** "The HTML structure is ready. Can you create a modern, clean CSS design for this? I want a premium dark-blue theme color scheme with proper card layouts, clean buttons, rounded profile avatar borders, and nice hover list items for a professional software dashboard look."

**AI Response:**
```css
body {
    font-family: 'Segoe UI', sans-serif;
    background-color: #141d2f;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
.container {
    background-color: #1e2a47;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.25);
    max-width: 550px;
}
.search-box input {
    background-color: #141d2f;
    color: #ffffff;
    border: none;
    border-radius: 8px;
}
```

## Phase 3: JavaScript Core Logic & Level 2 Repositories Integration
**User Prompt:** "I've decided to choose Level 2 (Repositories Integration) for this mission. I need JavaScript code using the native Fetch API and async/await. It should fetch the user's basic profile details, but also chain another API call to get their top 5 latest public repositories sorted by creation date. Please include loading and 404 error handling."

**AI Response:**
```JavaScript
async function fetchGitHubUser(username) {
    loadingTxt.style.display = 'block';
    errorTxt.style.display = 'none';
    profileCard.style.display = 'none';

    try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error('User not found');
        const userData = await userResponse.json();

        // Level 2: Fetch Top 5 Repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=5`);
        const reposData = await reposResponse.json();

        // Render UI Elements
        avatar.src = userData.avatar_url;
        userName.innerText = userData.name || userData.login;
        
        loadingTxt.style.display = 'none';
        profileCard.style.display = 'block';
    } catch (error) {
        loadingTxt.style.display = 'none';
        errorTxt.style.display = 'block';
    }
}
```

## Phase 4: Documentation Alignment
**User Prompt:** "Help me structure my project README.md file. I want a clean table for the Tech Stack, another table for the File Structure and component roles, a section for How to Run, and placeholders where I can link my three local screenshots: octocat-profile.png, error-state.png, and my-profile.png."

**AI Response:**
```
## 📸 System Screenshots

### 1. Standard Octocat Target Profile
![Octocat Profile](octocat-profile.png)

### 2. Graceful 404 User Not Found State
![Error State](error-state.png)

### 3. Active User Profile Found (e.g., Aayushi-Dev-2026)
![Aayushi Profile](my-profile.png)
```