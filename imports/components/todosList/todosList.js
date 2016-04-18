import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tasks } from '../../api/tasks';
import './todosList.html';

export default angular
  .module('todosList', [ angularMeteor ])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: [ '$scope', TodosListController ],
  });

/* @ngInject */
function TodosListController($scope) {
  const $ctrl = this;

  $scope.viewModel($ctrl);

  $ctrl.helpers({
    tasks() {return Tasks.find({}, { sort: { createdAt: -1 } });},
  });

  $ctrl.addTask = newTask => {
    Tasks.insert({
      text: newTask,
      createdAt: new Date,
    });

    $ctrl.newTask = '';
  };
}
