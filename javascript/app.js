document.getElementById('search-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const userInfoDiv = document.getElementById('user-info');
    const errorMessageDiv = document.getElementById('error-message');

    userInfoDiv.innerHTML = '';
    errorMessageDiv.innerHTML = '';

    if (!username) {
        errorMessageDiv.innerHTML = 'Please enter a username.';
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            userInfoDiv.innerHTML = `
                <div class="card d-flex align-items-center justify-content-center py-4 mx-auto">
                <img class="rounded-circle shadow-sm border" src="${data.avatar_url}" alt="${data.login}'s avatar" width="100" />
                <h2 class="text-success">${data.login}</h2>
                <p>Public Repositories: ${data.public_repos}</p>
                <p>Followers: ${data.followers}</p>
                <p>Following: ${data.following}</p>
                <a href="${data.html_url}" target="_blank" class="btn btn-outline-primary">View Profile</a>
                <div>
            `;
        })
        .catch(error => {
            errorMessageDiv.innerHTML = error.message;
        });
});
