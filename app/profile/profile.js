'use strict';

angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile/:username?', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileCtrl'
  })
}])

.controller('ProfileCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
	$scope.options = {legend: {display: true, position: "bottom"}};
	$scope.colors = ['#72C02C', '#3498DB', '#717984', '#F1C40F'];
	
	$scope.search = function(username) {
	 $location.path('/profile/' + username);
		$http.get('https://api.github.com/users/' + username)
		.then(function(response) {
			$scope.myGithub = response.data;
			
				$http.get('https://api.github.com/users/' + username + '/followers')
				.then(function(followers) {
					$scope.myFollowers = followers.data;
				});
			
				$http.get('https://api.github.com/users/' + username + '/repos')
				.then(function(repos){
										
					var reposWithLanguages = repos.data.filter(function(repo){
						return repo.language;
					});
					
					var languageStats = reposWithLanguages.reduce(function(count, repo) {
							count[repo.language] = ++count[repo.language] || 1;
							return count;
					}, {});
					$scope.languages = Object.keys(languageStats);
  				$scope.data = $scope.languages.map(function(language) {
						return languageStats[language];
					});
				});
		}, function(response) {
				$location.path('/profile');
		});
	};

	$scope.search($routeParams.username || "nogalpaulina");
}]);
