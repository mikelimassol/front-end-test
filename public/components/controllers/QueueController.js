(function () {

    angular.module('qudini.QueueApp')
        .controller('QueueController', ['QueueService', QueueController]);

    /**
     * Bonus points - manipulating the without waiting for the
     * server request
     */
    function QueueController(gueueService) {
    	
    	var self = this;

    	self.customers = [];
    	self.customersServed = [];
        _getCustomers();
        _getServedCustomers();

        self.onCustomerAdded = function(){
            _getCustomers();
        };

        self.onCustomerRemoved = function(){
            _getCustomers();
        };

        self.onCustomerServed = function(){
            _getCustomers();
            _getServedCustomers();
        };

        function _getServedCustomers(){
            return gueueService._getServedCustomers().then(function(data){
            	self.customersServed = data;
            });
        }

        function _getCustomers(){
        	 return gueueService._getCustomers().then(function(data){
        		 self.customers = data;
             });
        }
        
    }

})();