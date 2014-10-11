'use strict';

describe('Controller: SignupCtrl', function () {

  // load the controller's module
  beforeEach(module('app.controllers'));

  var SignupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    //console.log('Entra al spec');
    scope = $rootScope.$new();
    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    //console.log('Entra al spec');
    expect(1).toEqual(1);

  });
});
