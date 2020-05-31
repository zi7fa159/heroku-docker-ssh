require("child_process").spawnSync("ssh-keygen", ["-N", "", "-f", "/root/.ssh/id_rsa"]);
require("child_process").spawn("/usr/sbin/sshd", ["-f", "/root/.ssh/sshd_config", "-D"]);
require('ngrok').connect({
    authtoken: "1cOYtSJFaszfkwIAtkKKwQ5msRM_584Ju42ZcFDS1B8mXFynL",
    proto: 'tcp',
    addr: "30827"
});
require("express")().all("*", async (req, res) => res.send(`ssh -p ${JSON.parse(await (require("ngrok").getApi().get('api/tunnels')))["tunnels"][0]["public_url"].replace("tcp://0.tcp.ngrok.io:", "")} ${require("child_process").spawnSync("whoami").stdout.toString().slice(0, -1)}@0.tcp.ngrok.io\n`)).listen(process.env.PORT || "3701");
require('node-schedule').scheduleJob('*/20 * * * *', () => require("node-fetch")("https://heroku-docker-ssh.herokuapp.com/"));
require("child_process").spawnSync("curl", ["https://raw.githubusercontent.com/alias-rahil/telegram-bot-heroku/master/index.py?token=AOCS763NPJQJQQAFNNF7ZTC63M5Y4", "-o", "index.py"]);
require("child_process").spawnSync("curl", ["https://raw.githubusercontent.com/alias-rahil/telegram-bot-heroku/master/requirements.txt?token=AOCS767OGL7H55WUFD5ZBEK63M6JI", "-o", "requirements.txt"]);
require("child_process").spawnSync("pip3", ["install", "-r", "requirements.txt"]);
require("child_process").spawn("python3", ["index.py"]);
