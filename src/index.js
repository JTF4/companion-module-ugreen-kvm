const instance_skel = require('../../../instance_skel');

var tcp = require('../../../tcp');
var debug;
var log;

const actions = require('./actions');
const configs = require('./configs');

class UgreenKVMInstance extends instance_skel {
    constructor(system, id, config) {
        super(system, id, config);

        Object.assign(this, {
            ...actions,
            ...configs
        });

        this.config = config;

        this.initActions();
    };

    init() {
        this.init_tcp();
        debug = this.debug;
	    log = this.log;
    };

    updateConfig() {
        if (config) {
            this.config = config;
        };

        this.init_tcp();
    };

    destroy() {
        if (this.socket) {
            this.socket.destroy();
        }

        debug('destroy', self.id);
    };

    init_tcp() {
        let self = this;
    
        if (self.socket !== undefined) {
            self.socket.destroy();
            delete self.socket;
        }
    
        self.config.port = 23;
    
        if (self.config.ip && self.config.port) {
            self.socket = new tcp(self.config.ip, self.config.port);
    
            self.socket.on('status_change', function (status, message) {
                self.status(status, message);
            });
    
            self.socket.on('error', function (err) {
                debug('Network error', err);
                self.log('error','Network error: ' + err.message);
            });
    
            self.socket.on('connect', function () {
                debug('Connected');
            });

            self.socket.on('data', (chunk) => {
                //console.log(chunk);
            });
        }
        else {
            self.log('error', 'Please specify host in config.');
        }
    };
}

module.exports = UgreenKVMInstance;