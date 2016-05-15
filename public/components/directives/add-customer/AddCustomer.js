(function () {
    angular.module('qudini.QueueApp')
        .directive('addCustomer', ['QueueService', AddCustomer]);

    function AddCustomer(queueService){
        return {
            restrict: 'E',
            scope:{
                onAdded: '&'
            },
            templateUrl:'/components/directives/add-customer/add-customer.html',
            link: function(scope){

                scope.products = [
                    {name: 'Grammatical advice'},
                    {name: 'Magnifying glass repair'},
                    {name: 'Cryptography advice'}
                ];

                scope.add = function(){
                	queueService._addCustomer(scope.customer).then(function(result){
                		scope.onAdded()();
                		scope.customer = {};
                	});

                };
            }
        };
    }

})();

