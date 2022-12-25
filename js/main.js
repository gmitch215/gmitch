let index_strs = [
    "Isn't afraid of OOP",
    "Loves to code",
    "Enjoys playing Minecraft",
    "Is a fan of Rocket League",
    "Prefers Spigot over Paper",
    "Hates Boilerplate",
    "Is irritated with NMS",
    "Enjoyer of Java",
    "Wants to Learn",
    "JoJo's Bizarre Adventure: Stardust Crusaders",
    "Creator of MobChip"
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
    document.cookie = "theme=" + theme + "; SameSite=None; Secure";

    document.getElementById("theme-icon").src = getThemeIcon(theme);
}

document.onload = function(e) {
    document.documentElement.setAttribute("data-theme", getTheme());
}

document.onreadystatechange = function() {
    document.getElementById("theme-icon").src = getThemeIcon(getTheme());
    loadTheme(getTheme());
}

window.onload = async function() {
    $("#index-subtitle").text(index_strs[Math.floor(Math.random() * index_strs.length)]);
    setInterval(function () {
        $("#index-subtitle").text(index_strs[Math.floor(Math.random() * index_strs.length)]);
    }, 5000);

    $("#repos").text("📦 " + await getRepos() + " Repositories");
    $("#downloads").text("📥 " + (await getDownloads()).toLocaleString("en-US") + " Downloads");
}

async function getRepos() {
    let repos = 0;
    let url = "https://api.github.com/users/GamerCoder215/repos";
    let data = JSON.parse(await makeRequest(url));

    for (let i = 0; i < data.length; i++) repos++;

    return repos;
}

async function getDownloads() {
    let downloads = 0
    let url = "https://api.spiget.org/v2/authors/1229877/resources"
    let data = JSON.parse(await makeRequest(url))

    for (let i = 0; i < data.length; i++)downloads += data[i].downloads;

    return downloads;
}

function makeRequest(url) {
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