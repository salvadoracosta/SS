'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.load',
    'ui.jq',
    'ui.validate',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'app.filters',
    'app.services',
    'app.directives',
    'app.controllers',
    'toaster',
    'angularBootstrapNavTree'
  ])
.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;        
    }
  ]
)
.config(
  [          '$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($stateProvider,   $urlRouterProvider,   $controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;

        $urlRouterProvider
            .otherwise('/access/signin');
        $stateProvider
            .state('access', {
                url: '/access',
                template: '<div ui-view class="fade-in-right-big smooth"></div>'
            })
            .state('access.signin', {
                url: '/signin',
                templateUrl: 'app/signin/signin.html',
                controller: 'SigninCtrl'
            })
            .state('access.signup', {
                url: '/signup',
                templateUrl: 'app/signup/signup.html',
                controller: 'SignupCtrl'
            })
            .state('access.forgotpwd', {
                url: '/forgotpwd',
                templateUrl: 'app/forgotpwd/forgotpwd.html'
            })
            .state('access.404', {
                url: '/404',
                templateUrl: 'tpl/page_404.html'
            })
            .state('layout', {
                abstract: true,
                url: '/layout',
                templateUrl: 'app/layout/layout.html'
            })
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'app/home/app.html',
                controller: 'HomeCtrl',
                resolve: {
                    tree: function(treeFactory) {
                        return treeFactory.getTree();
                    }
                }
            })
            .state('app.dashboard-v1', {
                url: '/',
                templateUrl: 'app/home/dashboard.html'
            })
            .state('app.proyectos', {
                url: '/proyectos',
                templateUrl: 'app/proyecto/proyecto.html',
                controller: 'ProyectoCtrl',
                resolve: {
                    listaproyectos: function(proyectosFactory) {
                        return proyectosFactory.getListaProyectos();
                    }
                }
            })
            .state('app.perfil', {
                url: '/perfil',
                templateUrl: 'app/perfil/perfil.html',
                controller: 'PerfilCtrl',
                resolve: {
                    listaproyectos: function(proyectosFactory) {
                        return proyectosFactory.getListaProyectos();
                    }
                }
            })
            .state('app.consultaProyecto', {
                url: '/consultaProyecto',
                templateUrl: 'app/consultaProyecto/consultaProyecto.html',
                controller: 'ConsultaProyectoCtrl',
                resolve: {
                    listaproyectos: function(proyectosFactory) {
                        return proyectosFactory.getListaProyectos();
                    }
                }
            })
            .state('app.subsistemas',{
                url:'/subsistemas',
                controller: 'SubsistemaCtrl',
                templateUrl: 'app/subsistema/subsistema.html',
                resolve: {
                    listasubsistemas: function(subsistemasFactory) {
                        return subsistemasFactory.getListaSubsistemas();
                    },
                    listamodulos: function(modulosFactory) {
                        return modulosFactory.getListaModulos();
                    }
                }
            })
            .state('app.funciones',{
                url:'/funciones',
                controller: 'FuncionesCtrl',
                templateUrl: 'app/funcion/funcion.html',
                resolve: {
                    listafunciones: function(funcionesFactory) {
                        return funcionesFactory.getListaFunciones();
                    }
                }
            })
            .state('app.variables',{
                url:'/variables',
                controller: 'VariableCtrl',
                templateUrl: 'app/variable/variable.html',
                resolve: {
                    listavariables: function(variablesFactory) {
                        return variablesFactory.getListaVariables();
                    }
                }
            })

            .state('app.modulos',{
                url:'/modulos',
                controller: 'ModuloCtrl',
                templateUrl: 'app/modulo/modulo.html',
                resolve: {
                    listamodulos: function(modulosFactory) {
                        return modulosFactory.getListaModulos();
                    },
                     listavariables: function(variablesFactory) {
                        return variablesFactory.getListaVariables();
                    }
                }
            })
            .state('app.pesos',{
                url:'/pesos',
                controller: 'PesoCtrl',
                templateUrl: 'app/peso/peso.html'
            })
            .state('app.pesoDesc',{
                url:'/proyecto/:idproyecto/peso',
                controller: 'PesoDescCtrl',
                templateUrl: 'app/pesoDesc/peso.html',
                resolve:{
                    pesos: function($stateParams, pesosFactory){
                        return pesosFactory.getPesos($stateParams.idproyecto);
                    },
                    idproyecto:function($stateParams){
                        return $stateParams.idproyecto;
                    } 
                }
            })
            .state('app.representaciones',{
                url:'/representaciones/:idproyecto',
                controller: 'RepresentacionesCtrl',
                templateUrl: 'app/representaciones/representaciones.html',
                resolve:{
                    listafunciones: function($stateParams, funcionesFactory){
                        return funcionesFactory.getListaFuncionesByProyecto($stateParams.idproyecto);
                    },
                    listaunidadesdeinformacion: function($stateParams,unidadesFactory) {
                        return unidadesFactory.getListaUnidades($stateParams.idproyecto);
                    }
                }
            })
            .state('app.unidadInformacion',{
                url:'/proyecto/:idproyecto/unidad',
                controller: 'unidadInformacionCtrl',
                templateUrl: 'app/unidadInformacion/unidad.html',
                 resolve: {
                    listaunidadesdeinformacion: function($stateParams,unidadesFactory) {
                        return unidadesFactory.getListaUnidades($stateParams.idproyecto);
                    },
                    idproyecto: function($stateParams) {
                        return $stateParams.idproyecto;
                    },
                    listavariablesindependientes: function ($stateParams,variablesIndependientesFactory) {
                        return variablesIndependientesFactory.getListaVariablesIndependientes($stateParams.idproyecto);
                    }
                }
            })
            .state('app.vindependientes',{
                url:'/vindependientes',
                controller: 'VIndpendienteCtrl',
                templateUrl: 'app/vindependiente/vindependiente.html'
            })
            .state('app.variableIndependiente',{
                url:'/proyecto/:idproyecto/variableIndependiente',
                controller: 'VariableIndependienteCtrl',
                templateUrl: 'app/variableIndependiente/variableIndependiente.html',
                 resolve: {
                    listavariablesindependientes: function($stateParams,variablesIndependientesFactory) {
                        return variablesIndependientesFactory.getListaVariablesIndependientes($stateParams.idproyecto);
                    },
                    idproyecto: function($stateParams) {
                        return $stateParams.idproyecto;
                    }
                }
            })
            .state('app.proyectoDesc',{
                url:'/proyecto/:edit',
                controller: 'proyectoDescCtrl',
                templateUrl: 'app/proyectoDesc/proyecto.html',
                 resolve: {
                    listaproyectos: function(proyectosFactory,$localStorage) {
                      return proyectosFactory.getListaProyectosByAutor($localStorage.user.per_id);
                    }
                    
                }
            })
            .state('app.subsistemaDesc',{
                url:'/proyecto/:idproyecto/subsistema',
                controller: 'SubsistemaDescCtrl',
                templateUrl: 'app/subsistemaDesc/subsistema.html',
                 resolve: {
                    listasubsistemas: function($stateParams,subsistemasFactory) {
                        return subsistemasFactory.getListaSubsistemasById($stateParams.idproyecto);
                    },
                    idproyecto: function($stateParams) {
                        return $stateParams.idproyecto;
                    }
                }
            })
         
            .state('app.modulosDesc',{
                url:'/proyecto/:idproyecto/subsistema/:idsubsistema/modulos',
                controller: 'ModuloDescCtrl',
                templateUrl: 'app/moduloDesc/modulo.html',
                 resolve: {
                    listamodulos: function($stateParams,modulosFactory) {
                        return modulosFactory.getListaModulosById($stateParams.idsubsistema);
                    },
                    idproyecto: function($stateParams) {
                        return $stateParams.idproyecto;
                    },
                    idsubsistema: function($stateParams) {
                        return $stateParams.idsubsistema;
                    }
                }
            })
            .state('app.variablesDesc',{
                url:'/proyecto/:idproyecto/subsistema/:idsubsistema/modulos/:idmodulo/variables',
                controller: 'VariableDescCtrl',
                templateUrl: 'app/variableDesc/variable.html',
                 resolve: {
                    listavariables: function($stateParams,variablesFactory) {
                        return variablesFactory.getListaVariablesById($stateParams.idmodulo);
                    },
                    idproyecto: function($stateParams) {
                        return $stateParams.idproyecto;
                    },
                    idsubsistema: function($stateParams) {
                        return $stateParams.idsubsistema;
                    },
                    idmodulo: function($stateParams) {
                        return $stateParams.idmodulo;
                    }
                }
            })
    }
  ]
)

// translate config
.config(['$translateProvider', function($translateProvider){

  // Register a loader for the static files
  // So, the module will search missing translation tables under the specified urls.
  // Those urls are [prefix][langKey][suffix].
  $translateProvider.useStaticFilesLoader({
    prefix: 'l10n/',
    suffix: '.json'
  });

  // Tell the module what language to use by default
  $translateProvider.preferredLanguage('en');

  // Tell the module to store the language in the local storage
  $translateProvider.useLocalStorage();

}])

/**
 * jQuery plugin config use ui-jq directive , config the js and css files that required
 * key: function name of the jQuery plugin
 * value: array of the css js file located
 */
.constant('JQ_CONFIG', {
    easyPieChart:   ['js/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
    sparkline:      ['js/jquery/charts/sparkline/jquery.sparkline.min.js'],
    plot:           ['js/jquery/charts/flot/jquery.flot.min.js', 
                        'js/jquery/charts/flot/jquery.flot.resize.js',
                        'js/jquery/charts/flot/jquery.flot.tooltip.min.js',
                        'js/jquery/charts/flot/jquery.flot.spline.js',
                        'js/jquery/charts/flot/jquery.flot.orderBars.js',
                        'js/jquery/charts/flot/jquery.flot.pie.min.js'],
    slimScroll:     ['js/jquery/slimscroll/jquery.slimscroll.min.js'],
    sortable:       ['js/jquery/sortable/jquery.sortable.js'],
    nestable:       ['js/jquery/nestable/jquery.nestable.js',
                        'js/jquery/nestable/nestable.css'],
    filestyle:      ['js/jquery/file/bootstrap-filestyle.min.js'],
    slider:         ['js/jquery/slider/bootstrap-slider.js',
                        'js/jquery/slider/slider.css'],
    chosen:         ['js/jquery/chosen/chosen.jquery.min.js',
                        'js/jquery/chosen/chosen.css'],
    TouchSpin:      ['js/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                        'js/jquery/spinner/jquery.bootstrap-touchspin.css'],
    wysiwyg:        ['js/jquery/wysiwyg/bootstrap-wysiwyg.js',
                        'js/jquery/wysiwyg/jquery.hotkeys.js'],
    dataTable:      ['js/jquery/datatables/jquery.dataTables.min.js',
                        'js/jquery/datatables/dataTables.bootstrap.js',
                        'js/jquery/datatables/dataTables.bootstrap.css'],
    vectorMap:      ['js/jquery/jvectormap/jquery-jvectormap.min.js', 
                        'js/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                        'js/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                        'js/jquery/jvectormap/jquery-jvectormap.css'],
    footable:       ['js/jquery/footable/footable.all.min.js',
                        'js/jquery/footable/footable.core.css']
    }
)

// modules config
.constant('MODULE_CONFIG', {
    select2:        ['js/jquery/select2/select2.css',
                        'js/jquery/select2/select2-bootstrap.css',
                        'js/jquery/select2/select2.min.js',
                        'js/modules/ui-select2.js']
    }
)

// oclazyload config
.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    // We configure ocLazyLoad to use the lib script.js as the async loader
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: [
            {
                name: 'ngGrid',
                files: [
                    'js/modules/ng-grid/ng-grid.min.js',
                    'js/modules/ng-grid/ng-grid.css',
                    'js/modules/ng-grid/theme.css'
                ]
            },
            {
                name: 'toaster',
                files: [                    
                    'js/modules/toaster/toaster.js',
                    'js/modules/toaster/toaster.css'
                ]
            }
        ]
    });
}])
.config(['$httpProvider', function($httpProvider) {
    // We configure ocLazyLoad to use the lib script.js as the async loader
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage','$rootScope', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);
}])
;
