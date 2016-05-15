(function () {
    angular.module('qudini.QueueApp')
        .directive('customer', ['QueueService', '$interval', Customer]);

    /**
     * The <customer> directive is responsible for:
     * - serving customer
     * - calculating queued time
     * - removing customer from the queue
     */
    function Customer(queueService, $interval){

        return{
            restrict: 'E',
            scope:{
                customer: '=',
                onRemoved: '&',
                onServed: '&'
            },
            templateUrl: '/components/directives/customer/customer.html',
            link: function(scope){
            	
            	var millToTime = function(milliseconds){
           
            		var date = new Date(milliseconds);	
            	
            			scope.days = date.getUTCDate()-1;
            		
            			scope.hours = date.getUTCHours();
            	
            			scope.minutes = date.getUTCMinutes();
            	
            			scope.seconds = date.getUTCSeconds();
            	};
            	
            	var calcQueueTime = function(joinedTime){
            		 return new Date() - new Date(joinedTime.toString());
            	};
            	
            	var setWaitingCustomersQueueTime = function(){
            		millToTime(calcQueueTime(scope.customer.joinedTime));
            	};
                        	
            	var setIsServedCustomer = function(){
            		scope.isServed = scope.customer.status === 'served';
            	};
            	
            	setIsServedCustomer();
            	setWaitingCustomersQueueTime();
            	$interval(setWaitingCustomersQueueTime, 5000);
            	
                scope.remove = function(){
	                queueService._removeCustomer(scope.customer.id).then(function(res){
	                    scope.onRemoved()();
	                });
                };
                
                scope.serve = function(){
                	queueService._serveCustomer(scope.customer.id).then(function(res){
  	                    scope.onServed()();
  	                });
                };
                
            }
        };
    }

})();

