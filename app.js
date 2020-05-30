require("child_process").spawnSync("ssh-keygen", ["-N", "", "-f", "/root/.ssh/id_rsa"]);
require("child_process").spawnSync("chmod", ["644", "/root/.ssh/authorized_keys"]);
require("child_process").spawn("/usr/sbin/sshd", ["-f", "/root/.ssh/sshd_config", "-D"]);
const app = require("express")();
const fetch = require("node-fetch");
let url;
(async function() {
    url = await require('ngrok').connect({
        authtoken: "1cOYtSJFaszfkwIAtkKKwQ5msRM_584Ju42ZcFDS1B8mXFynL",
        proto: 'tcp',
        addr: "2020"
    });
})();
app.all("*", (req, res) => res.send(`ssh -p ${url.slice(21, 26)} ${require("child_process").spawnSync("whoami").stdout.toString()}@${url.slice(6, 20)}\n`));
require('node-schedule').scheduleJob('*/28 * * * *', () => fetch("https://heroku-docker-ssh.herokuapp.com/"));
app.listen(process.env.PORT || "3701");
