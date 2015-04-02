app.directives('textEditor', function () {
  console.log("TEXT EDITOR DIRECTIVE!")
 return {
   require: 'ngModel',
   link: function(scope, element, attributes, controller) {
     $(element).wysiwyg();
   scope.$watch(attributes.ngModel, function(value) {
        $(element).html(value);
      });
      element.bind('blur', function(){
          controller.$setViewValue(element.html());
              if (!scope.$$phase) {
                scope.$apply();
              }
      });
      
   }
 };
});