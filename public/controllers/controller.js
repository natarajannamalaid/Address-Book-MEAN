/**
 * http://usejsdoc.org/
 */
var myapp=angular.module('myapp', []);
myapp.controller('Appctrl', ['$scope', '$http', function($scope, $http){
		console.log("hello world from controller");
		var refresh=function(){
		$http.get('/contactlist1').success(function(response){
			console.log("I got the requested data");
			$scope.contactList=response;
			$scope.contact="";
		});
		};
		refresh();
//		person1={
//				name: 'Gokkul',
//				email: 'agn253@nyu.edu',
//				number: '929-240-5611'
//		};
//		person2={
//				name: 'Gokkul1',
//				email: '1agn253@nyu.edu',
//				number: '1929-240-5611'
//		};
//		person3={
//				name: 'Gokkul2',
//				email: '2agn253@nyu.edu',
//				number: '2929-240-5611'
//		};
//		var contactlist=[person1, person2, person3];
		//$scope.contactlist=contactlist;
	$scope.addContact=function(){
		console.log($scope.contact);
		$http.post('/contactlist1', $scope.contact).success(function(response){
			console.log(response);
			refresh();
		});
	};
	
	$scope.remove=function(id){
		console.log(id);
		$http.delete('/contactlist1/'+id).success(function(response){
			refresh();
		});
	};
	
	$scope.edit=function(id){
		console.log(id);
		$http.get('/contactlist1/'+id).success(function(response){
		$scope.contact=response;	
		});
	};
	
	$scope.update=function(){
		console.log($scope.contact._id);
		$http.put('/contactlist1/'+$scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	};
	
	$scope.deselect=function(){
		$scope.contact="";
	};
}]);