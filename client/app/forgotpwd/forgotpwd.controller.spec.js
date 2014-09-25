'use strict';

describe('Controller: ForgotpwdCtrl', function () {

  // load the controller's module
  beforeEach(module('bootstrapAngularAdminWebAppApp'));

  var ForgotpwdCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ForgotpwdCtrl = $controller('ForgotpwdCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
