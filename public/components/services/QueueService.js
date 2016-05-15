(function() {

	angular.module('qudini.QueueApp').factory('QueueService',
			[ '$http', QueueService ]);

	function QueueService($http) {

		var urls = {
			getServedCustomersUrl : '/api/customers/served',
			getCustomersUrl : '/api/customers',
			removeCustomerUrl : '/api/customer/remove',
			addCustomerUrl : '/api/customer/add',
			serveCustomerUrl : '/api/customer/serve'
		};

		var _getServedCustomers = function() {
			return $http.get(urls.getServedCustomersUrl).then(function(res) {
				return res.data;
			});
		};

		var _getCustomers = function() {
			return $http.get(urls.getCustomersUrl).then(function(res) {
				return res.data;
			});
		};

		var _removeCustomer = function(id) {
			return $http({
				method : 'DELETE',
				url : urls.removeCustomerUrl,
				params : {
					id : id
				}
			}).then(function(res) {
				return res;
			});
		};

		var _addCustomer = function(customer) {
			return $http.post(urls.addCustomerUrl, customer).then(
					function(res) {
						return res;
					});
		};

		var _serveCustomer = function(id) {
			return $http.post(urls.serveCustomerUrl, {
				id : id
			}).then(function(res) {
				return res;
			});
		};

		return {
			_getServedCustomers : _getServedCustomers,
			_getCustomers : _getCustomers,
			_removeCustomer : _removeCustomer,
			_addCustomer : _addCustomer,
			_serveCustomer : _serveCustomer
		};

	}

})();