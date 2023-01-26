import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic, UnknownContext } from 'homebridge';
import { PLATFORM_NAME, PLUGIN_NAME } from './settings';

export class PingShutdown implements DynamicPlatformPlugin {

  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;
  public readonly accessories: PlatformAccessory[] = [];

  constructor(public readonly log: Logger, public readonly config: PlatformConfig, public readonly api: API ) {
    this.log.debug('Finished initializing platform:', this.config.name);

    this.api.on('didFinishLaunching', () => {
      this.log.debug('Launch of the Application is completed!');
      this.checkConfiguration(log);
    });
  }

  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Creating Accessory:', accessory.displayName);

    // add the restored accessory to the accessories cache so we can track if it has already been registered
    this.accessories.push(accessory);
  }

  checkConfiguration(log: Logger) {
    this.config.deviceList.forEach(function (device : {ip: string; name: string}) {
      log.debug(device.ip + '' + device.name);
    });
  }

  executePing(hosts: String[]){
    // get library
    var ping = require('ping');
    // ping each host
    hosts.forEach(function (host) {
      ping.promise.probe(host)
          .then(function(res : string) {
              console.log(res);
          });
  });
  }
}
