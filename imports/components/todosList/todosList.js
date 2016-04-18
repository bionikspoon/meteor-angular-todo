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
  });

  $ctrl.addTask = newTask => {
    Tasks.insert({
      text: newTask,
      createdAt: new Date,
    });

    $ctrl.newTask = '';
  };

  $ctrl.setChecked = task => {
    Tasks.update(task._id, {
      $set: { checked: !task.checked },
    });
  };

  $ctrl.removeTask = task => {
    Tasks.remove(task._id);
  };
}
