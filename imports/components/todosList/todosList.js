import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './todosList.html';

export default angular
  .module('todosList', [ angularMeteor ])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: TodosListController,
  });

function TodosListController() {
  const $ctrl = this;

  $ctrl.tasks = [
    { text: 'The moon has conclusion, but not everyone emerges it.' },
    { text: 'One must acquire the spirit in order to love the cow of meaningless hypnosis.' },
    { text: 'Stop to remember and lure.' },
  ];
}
