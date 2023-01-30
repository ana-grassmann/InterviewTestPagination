(function(angular) {
    "use strict";

    angular.module("todoApp", [])

        .config(function ($httpProvider) {
            $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
        });

})(angular);