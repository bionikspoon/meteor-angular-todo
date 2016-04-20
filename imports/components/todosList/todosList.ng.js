import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../../api/tasks';
import './todosList.ng.html';

export default angular
  .module('todosList', [ angularMeteor ])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.ng.html',
    controller: TodosListController,
  });

/* @ngInject */
function TodosListController($scope) {
  const $ctrl = this;

  $scope.viewModel($ctrl);

  $ctrl.hideCompleted = false;

  $ctrl.helpers({
    tasks() {
      const selector = {};

      if ($ctrl.getReactively('hideCompleted')) {
        selector.checked = { $ne: true };
      }

      return Tasks.find(selector, { sort: { createdAt: -1 } });
    },

    incompleteCount() {
      return Tasks.find({ checked: { $ne: true } }).count();
    },

    currentUser() {
      return Meteor.user();
    },
  });

  $ctrl.addTask = newTask => {
    Meteor.call('tasks.insert', newTask);

    $ctrl.newTask = '';
  };

  $ctrl.setChecked = task => {
    Meteor.call('tasks.setChecked', task._id, !task.checked);
  };

  $ctrl.removeTask = task => {
    Meteor.call('tasks.remove', task._id);
  };
}
