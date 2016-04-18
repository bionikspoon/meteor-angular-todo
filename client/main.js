import angular from 'angular';
import angularMeteor from 'angular-meteor';
import todosList from '../imports/components/todosList/todosList';

angular.module('app', [ angularMeteor, todosList.name ]);

function onReady() {
  angular.bootstrap(document, [ 'app' ]);
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}

