/* eslint-env mocha */
import 'angular-mocks';
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';

import todosList from '../todosList.ng.js';

describe('todosList', () => {
  let element;
  let $scope;

  beforeEach(() => {
    let $compile;
    let $rootScope;

    window.module(todosList.name);

    inject((_$compile_, _$rootScope_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new(true);

      element = $compile('<todos-list></todos-list>')($scope);
      $scope.$digest();
    });
  });

  describe('component', () => {
    it('Should exist', () => {
      assert.isTrue(element[ 0 ].classList.contains('ng-scope'));
      assert.isTrue(element[ 0 ].classList.contains('ng-isolate-scope'));
    });

    it('Should be showing incomplete tasks count', () => {
      assert.include(element[ 0 ].querySelector('h1').innerHTML, '0');
    });
  });

  describe('controller', () => {
    let controller;

    beforeEach(() => {
      sinon.stub(Meteor, 'call');
      controller = element.controller('todosList');
    });

    afterEach(Meteor.call.restore);

    describe('addTask', () => {
      const newTask = 'Be more fabulous';

      beforeEach(() => {
        controller.newTask = 'Be fabulous';
        controller.addTask(newTask);
      });

      it('Should call tasks.insert method', () => {
        sinon.assert.calledOnce(Meteor.call);
        sinon.assert.calledWith(Meteor.call, 'tasks.insert', newTask);
      });

      it('Should should reset newTask', () => {
        assert.equal(controller.newTask, '');
      });
    });
  });
});
