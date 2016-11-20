import configureService from '../lib/configureService';
import { Meteor } from 'meteor/meteor';
import {BrowserPolicy} from 'meteor/browser-policy-common';
import logger from 'cdm-logger';

let startup = () => {
    logger.info("configuring login services");
    configureService();
};

if (Meteor.isServer && process.env.NODE_ENV == 'development') {
    //ref: https://themeteorchef.com/snippets/using-the-browser-policy-package/
    // giving more grants with
    // BrowserPolicy.content.allowDataUrlForAll();


    BrowserPolicy.content.allowOriginForAll('localhost:3500');
    BrowserPolicy.content.allowSameOriginForAll();
    BrowserPolicy.content.allowFontDataUrl('http://localhost');
    BrowserPolicy.content.allowFrameOrigin('http://localhost:*');
    BrowserPolicy.content.allowScriptOrigin('localhost:3500');
    BrowserPolicy.content.allowEval('localhost:3500');
    BrowserPolicy.content.allowFontOrigin('localhost:3500');

    //Instead of granting blob to all origin as in below line, grant only required src
    //BrowserPolicy.content.allowOriginForAll('blob:');
    //Blob URLS for more precise grants
    BrowserPolicy.content.allowImageOrigin("blob:");
    var constructedCsp = BrowserPolicy.content._constructCsp();
    BrowserPolicy.content.setPolicy(constructedCsp + " media-src blob:;");
    BrowserPolicy.content.setPolicy(constructedCsp + " font-src localhost:3500 blob:;");
    BrowserPolicy.content.setPolicy(constructedCsp + " default-src blob:;");
    logger.debug("Tracing  browser policy: " + BrowserPolicy.content._constructCsp())


} else  {
    BrowserPolicy.content.allowEval('localhost');
}


startup();

logger.info(" =====> Meteor App restarted " + new Date(Date.now()) + " <=====");

