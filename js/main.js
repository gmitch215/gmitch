let index_strs = [
    "Isn't afraid of OOP",
    "Loves to code",
    "Enjoys playing Minecraft",
    "Is a fan of Rocket League",
    "Prefers Spigot over Paper",
    "Hates Boilerplate",
    "Is irritated with NMS"
]

function getTheme() {
    let theme = "light";

    if (localStorage.getItem("theme") && localStorage.getItem("theme") === "dark") theme = "dark";
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) theme = "dark";

    if (document.cookie.indexOf("theme=dark") > -1) theme = "dark";
    else if (document.cookie.indexOf("theme=light") > -1) theme = "light";

    return theme;
}

function switchTheme() {
    let theme = getTheme() === "light" ? "dark" : "light";
    loadTheme(theme);
}

function getThemeIcon(theme) {
    if (theme === "light") return "assets/sun.png";
    else return "assets/moon.png";
}

function loadTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.cookie = "theme=" + theme;

    document.getElementById("theme-icon").src = getThemeIcon(theme);
}

document.onload = function(e) {
    document.documentElement.setAttribute("data-theme", getTheme());
}

document.onreadystatechange = function() {
    document.getElementById("theme-icon").src = getThemeIcon(getTheme());
    loadTheme(getTheme());
}

function updateTitle(element) {
    let color = $(element).attr("data-color").replace('\\', "");
    let title = $(element).attr("data-item-name") ? $(element).attr("data-item-name").replace('\\', "") : "GamerCoder215";

    document.getElementById("index-title").innerHTML = title;
    document.getElementById("index-title").style.color = color;

}

function resetTitle() {
    document.getElementById("index-title").innerHTML = "GamerCoder215";
    document.getElementById("index-title").style.color = "var(--text)";
}

window.onload = async function() {
    $("#index-subtitle").text(index_strs[Math.floor(Math.random() * index_strs.length)]);
    setInterval(function () {
        $("#index-subtitle").text(index_strs[Math.floor(Math.random() * index_strs.length)]);
    }, 5000);

    $("#stars").text("⭐" + await getStars() + " Stars");
    $("#watchers").text("👀" + await getWatchers() + " Watchers");
    $("#repos").text("📦" + await getRepos() + " Repositories");
}

async function getStars() {
    let stars = 0;
    let url = "https://api.github.com/users/GamerCoder215/repos";
    let data = JSON.parse(await makeRequest(url));

    for (let i = 0; i < data.length; i++) {
        stars += data[i].stargazers_count;
    }

    return stars;
}

async function getWatchers() {
    let watchers = 0;
    let url = "https://api.github.com/users/GamerCoder215/repos";
    let data = JSON.parse(await makeRequest(url));

    for (let i = 0; i < data.length; i++) watchers += data[i].watchers_count;
    return watchers;
}

async function getRepos() {
    let repos = 0;
    let url = "https://api.github.com/users/GamerCoder215/repos";
    let data = JSON.parse(await makeRequest(url));

    for (let i = 0; i < data.length; i++) repos++;

    return repos;
}

function makeRequest( url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}