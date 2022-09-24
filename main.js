let users = {
    get: function(username)
    {
        fetch('https://api.github.com/users/'+username)
        .then(response => response.json())
        .then((data) => {

            if(data.login == "" || data.login == null)
            {
                error("User not found");
            }
            else
            {
                document.querySelector("#avatar").src = data.avatar_url;
                document.querySelector("#name").innerHTML = data.login;
                document.querySelector("#ulink").href = data.html_url;
                document.querySelector("#uname").innerHTML = `@${data.login}`;
                document.querySelector("#repos").innerHTML = data.public_repos;
                document.querySelector("#following").innerHTML = data.following;
                document.querySelector("#followers").innerHTML = data.followers;
                document.querySelector("#bio").innerHTML = data.bio;
                this.getRepos(username);
                document.querySelector("#profile-container").style.display = "block";
            }
        })
        .catch(err => console.log(err));
    },
    getRepos: function(username)
    {
        fetch('https://api.github.com/users/'+username+'/repos')
        .then(response => response.json())
        .then((data) => {
            let repos = "";
            for(var i in data)
            {
                repos +=`
                <div class="repos">
                    <small><strong><i class="bi bi-git"></i></strong>&nbsp;&nbsp; ${data[i].name}</small>
                    <a href="${data[i].clone_url}" target="_blank"><i class="bi bi-box-arrow-up-right"></i></a>
                </div>
                `;
            }
            document.querySelector("#repo_container").innerHTML = repos;
        })
        .catch(err => console.log(err));
    },
    search: function()
    {
        let search_result = document.querySelector("#search").value;
        if(search_result == "")
        {
            error("Please enter name");
        }
        else
        {
            this.get(search_result);
        }
    }
};

document.querySelector("#searchBtn").addEventListener('click', () => {
    users.search();
});

document.querySelector("#search").addEventListener('keyup', (event) => {
    if(event.key == "Enter")
    {
        users.search();
    }
});

function error(msg)
{
    let err = `<div class="error">
    <p><span><i class="bi bi-person-x"></i></span>&nbsp; ${msg}</p>
    </div>`;
    document.querySelector("#profile-container").innerHTML = err;
    document.querySelector("#profile-container").style.display = "block";
    setTimeout(() => {
        document.querySelector("#profile-container").innerHTML = "";
        document.querySelector("#profile-container").style.display = "none";
    }, 4 * 1000);
}