var request = require("request");
function client(url, user, password) {
    this.url = url;
    this.user = user;
    this.password = password;
    this.auth = null;
    this.method = "POST";
    this.id = 1;
    this.call = (method, params) => {
        return new Promise((resolve, reject) => {
            var options = {
                uri: this.url,
                method: this.method,
                json: {
                    auth: this.auth,
                    id: this.id,
                    jsonrpc: "2.0",
                    method: method,
                    params: params
                }
            };
            request(options, (error, response, body) => {
                (!error && response.statusCode == 200) ? resolve(body): reject(error);
            });
        });
    }
    this.login = () => {
        return new Promise((resolve, reject) => {
            this.call("user.login", {
                user: this.user,
                password: this.password
            }).then((body) => {
                this.auth = body.result;
                resolve("Logged in");
            }).catch((error) => reject(error));
        })
    }
    this.logout = () => {
        return new Promise((resolve, reject) => {
            this.call("user.logout", []).then((body) => {
                this.auth = body.result;
                resolve("Logged out");
            }).catch((error) => reject(error));
        })
    }
}
module.exports = client;