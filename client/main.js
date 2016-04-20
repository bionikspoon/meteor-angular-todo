import angular from 'angular';
import angularMeteor from 'angular-meteor';
import todosList from '../imports/components/todosList/todosList.ng';
import '../imports/startup/accounts-config';

angular.module('app', [ angularMeteor, todosList.name, 'accounts.ui' ]);

function onReady() {
  angular.bootstrap(document, [ 'app' ]);
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}

