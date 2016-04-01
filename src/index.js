import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import style from './style.css';
import appService from './service';
import appConfig from './config';
import appRun from './run';

angular
    .module('app', [ngMaterial, uiRouter, appService])
    .config(appConfig)
    .run(appRun);
