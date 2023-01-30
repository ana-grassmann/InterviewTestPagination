(function (angular) {
    "use strict";

    angular
        .module("todoApp")
        .directive("todoPaginatedList", [todoPaginatedList])
        .directive("pagination", [pagination]);

    /**
     * Directive definition function of 'todoPaginatedList'.
     * 
     * TODO: correctly parametrize scope (inherited? isolated? which properties?)
     * TODO: create appropriate functions (link? controller?) and scope bindings
     * TODO: make appropriate general directive configuration (support transclusion? replace content? EAC?)
     * 
     * @returns {} directive definition object
     */
    function todoPaginatedList() {
        var directive = {
            restrict: "E", //element only,
            transclude: false,
            templateUrl: "app/templates/todo.list.paginated.html",
            scope: {},
            controller: ["$scope", "$http", controller]
        };

        function controller($scope, $http) {
            //data to be displayed on the table
            $scope.todos = [];
            //indicates if data is being loaded
            $scope.loading = false;
            //indicates if the sorting is not the default anymore
            var sortingChanged = false;
            //initialize table params
            $scope.tableParams = {
                totalItens: 0,
                totalPages: 0,
                currentPage: 1,
                pageSize: "20",
                sortBy: 'CreatedDate',
                sortOrder: 'desc'
            }

            //function to get the data from the api
            $scope.getData = function () {
                $scope.loading = true;
                // example of xhr call to the server's 'RESTful' api
                $http.get("api/Todo/Todos", { params: $scope.tableParams }).then(response => {
                    $scope.todos = response.data.list;
                    $scope.tableParams = response.data.pagination;
                    $scope.loading = false;
                });
            }

            //changes the sorting column and order, returns to page 1 and fetches the data
            $scope.changeSorting = function (newColumn) {
                if (newColumn == $scope.tableParams.sortBy) {
                    $scope.tableParams.sortOrder = $scope.tableParams.sortOrder == 'asc' ? 'desc' : 'asc';
                }                    
                else {
                    $scope.tableParams.sortBy = newColumn;
                    $scope.tableParams.sortOrder = 'asc'
                }
                sortingChanged = true;
                $scope.tableParams.currentPage = 1;
                $scope.getData();
            }

            //gets the css class for sorting indicator icon
            $scope.getSortClass = function (column) {
                if (column == $scope.tableParams.sortBy && sortingChanged) {
                    return $scope.tableParams.sortOrder == 'asc' ? 'fa-angle-up' : 'fa-angle-down';
                }
            }

            $scope.getData();
            
        }

        return directive;
    }

    /**
     * Directive definition function of 'pagination' directive.
     * 
     * TODO: make it a reusable component (i.e. usable by any list of objects not just the Models.Todo model)
     * TODO: correctly parametrize scope (inherited? isolated? which properties?)
     * TODO: create appropriate functions (link? controller?) and scope bindings
     * TODO: make appropriate general directive configuration (support transclusion? replace content? EAC?)
     * 
     * @returns {} directive definition object
     */
    function pagination() {
        var directive = {
            restrict: "E", // example setup as an element only
            templateUrl: "app/templates/pagination.html",
            scope: {
                getData: '&',
                tableParams:'='
            },
            controller: ["$scope", controller]
        };

        function controller($scope) {

            $scope.pageSizes = [
                { value: 10, text: '10'},
                { value: 20, text: '20'},
                { value: 30, text: '30'},
                { value: 0, text: 'All'}
            ];

            $scope.changePage = function (newPage) {
                $scope.tableParams.currentPage = newPage;
                $scope.getData();
            }
        }

        return directive;
    }

})(angular);

