"use strict";

angular
  .module("wdinstagram", [
  	"ui.router",
  	"ngResource"
  ])
  .config([
  	"$stateProvider",
  	RouterFunction
  ])
  .factory("WdinstagramFactory", [
  	"$resource",
  	WdinstagramFactoryFunction
  ])
  .controller("WdinstagramIndexController", [
  	"WdinstagramFactory",
  	WdinstagramIndexControllerFunction
  ])
  .controller("WdinstagramNewController", [
  	"WdinsagramFactory",
  	WdinstagramNewControllerFunction
  ])
  .controller("WdinstagramShowController", [
  	"WdinstagramFactory",
  	"$stateParams",
  	WdinstagramShowControllerFunction
  ])

function RouterFunction($stateProvider){
	$stateProvider
	.state("wdinstagramIndex", {
		url: "/wdinstagram",
		templateUrl: "js/ng-views/index.html",
		controller: "WdinstagramIndexController",
		controllerAs: "vm"
	})
	.state("wdinstagramNew", {
		url: "/wdinstagram/new",
		templateUrl: "js/ng-views/new.html",
		controller: "WdinstagramNewController",
		controllerAs: "vm"
	})
	.state("wdinstagramShow", {
		url: "/wdinstagram/:id",
		templateUrl: "js/ng-views/show.html",
		controller: "WdinstagramShowController",
		controllerAs: "vm"
	})
}

function WdinstagramFactoryFunction( $resource ) {
	return $resource( "http://localhost:3000/entries/:id" )
}

function WdinstagramIndexControllerFunction( WdinstagramFactory ){
	this.entries = WdinstagramFactory.query()
}

function WdinstagramNewControllerFunction( WdinstagramFactory ){
	this.entry = new WdinstagramFactory()
	this.create = function(){
		this.entry.$save()
	}
}

function WdinstagramShowControllerFunction(WdinstagramFactory, $stateParams){
  this.entry = WdinstagramFactory.get({id: $stateParams.id})
}
