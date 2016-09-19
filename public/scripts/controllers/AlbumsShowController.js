angular
  .module('tunely')
  .controller('AlbumsShowController', AlbumsShowController);

AlbumsShowController.$inject = ['$http', '$routeParams'];

function AlbumsShowController ($http, $routeParams) {
  var vm = this;
  vm.newSong = {};

  $http({
    method: 'GET',
    url: '/api/albums/'+$routeParams.id
  }).then(function successCallback(json) {
    vm.album = json.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createSong = function(){
    $http({
      method: 'POST',
      url: '/api/albums/'+vm.album._id + '/songs',
      data: vm.newSong
    }).then(function successCallback(json) {
      vm.album.songs.push(json.data);
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  }

  vm.editSong = function(song){
    $http({
      method: 'PUT',
      url: '/api/albums/'+vm.album._id + '/songs/' + song._id,
      data: song
    }).then(function successCallback(json) {
      // don't need to do anything!
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  }

  vm.deleteSong = function(song){
    var index = vm.album.songs.indexOf(song);
    console.log(index);
    vm.album.songs.splice(index, 1);
    $http({
      method: 'DELETE',
      url: '/api/albums/'+vm.album._id + '/songs/' + song._id,
    }).then(function successCallback(json) {
      // don't need to do anything!
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  }

}
