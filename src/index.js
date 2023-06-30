'use strict';

const https = require('node:https');
const routeBuilder = require('./APIRouter');

const packageData = require('../package.json');
const errors = require('./errors');

class BoticordClient {
    constructor(config) {
        this.config = config;
        if (!this.config.apiVersion) this.config.apiVersion = 3;
        if (!this.config.dev) this.config.baseAPI = "api.boticord.top";
    }

    get api() {
        return routeBuilder(this);
    }

    request(method, url, data) {
        const options = {
            method: method.toUpperCase(),
            hostname: this.config.baseAPI,
            path: (this.config.dev) ? url : `/v${this.config.apiVersion}${url}`,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': `${packageData.name} (v${packageData.version})`
            }
        };
        if (this.config.token) options.headers['Authorization'] = this.config.token;

        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let responseData = '';
                res.on('data', (chunk) => (responseData += chunk));
                res.on('end', () => {
                    let final = JSON.parse(responseData);
                    if (final.errors) {
                        let error = final.errors[0];
                        error.humanizedMessage = errors[error.code];
                        return resolve({ error });
                    }

                    if (final.result.length === 1) return resolve(final.result[0]);
                    return resolve(final.result);
                });
            });
            req.on('error', reject);

            if (data) {
                req.write(JSON.stringify(data));
            }

            req.end();
        });
    }
}

module.exports = { BoticordClient };