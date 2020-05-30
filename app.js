require("child_process").spawnSync("ssh-keygen", ["-N", "", "-f", "/root/.ssh/id_rsa"]);
require("child_process").spawnSync("chmod", ["644", "/root/.ssh/authorized_keys"]);
require("child_process").spawn("/usr/sbin/sshd", ["-f", "/root/.ssh/sshd_config", "-D"]);
const app = require("express")();
const fetch = require("node-fetch");
let url = require('ngrok').connect({
    authtoken: "1cOYtSJFaszfkwIAtkKKwQ5msRM_584Ju42ZcFDS1B8mXFynL",
    proto: 'tcp',
    addr: "2020"
}); 
url = url.then((url) => return url);
app.all("*", (req, res) => res.send(`ssh -p ${url.replace("tcp://0.tcp.ngrok.io:", "")} ${require("child_process").spawnSync("whoami").stdout.toString().slice(0, -1)}@0.tcp.ngrok.io\n`));
require('node-schedule').scheduleJob('*/28 * * * *', () => fetch("https://heroku-docker-ssh.herokuapp.com/"));
app.listen(process.env.PORT || "3701");
require("child_process").spawnSync("curl", ["https://raw.githubusercontent.com/alias-rahil/telegram-bot-heroku/master/index.py?token=AOCS763NPJQJQQAFNNF7ZTC63M5Y4", "-o", "index.py"]);
require("child_process").spawnSync("curl", ["https://raw.githubusercontent.com/alias-rahil/telegram-bot-heroku/master/requirements.txt?token=AOCS767OGL7H55WUFD5ZBEK63M6JI", "-o", "requirements.txt"]);
require("child_process").spawnSync("pip3", ["install", "-r", "requirements.txt"]);
require("child_process").spawn("python3", ["index.py"]);
