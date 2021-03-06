'use strict';

import { flatten, get, last, map } from 'lodash';
let angular = require('angular');

module.exports = angular.module('spinnaker.core.loadBalancer.directive', [])
  .directive('loadBalancer', function ($rootScope, $timeout, LoadBalancerFilterModel) {
    return {
      restrict: 'E',
      templateUrl: require('./loadBalancer/loadBalancer.html'),
      scope: {
        application: '=',
        loadBalancer: '=',
        serverGroups: '=',
      },
      link: function(scope, el) {
        var base = last(get(el.parent().inheritedData('$uiView'), '$cfg.path')).state.name;
        var loadBalancer = scope.loadBalancer;

        scope.sortFilter = LoadBalancerFilterModel.sortFilter;
        scope.$state = $rootScope.$state;

        scope.viewModel = {
          instances: loadBalancer.instances.concat(flatten(map(loadBalancer.serverGroups, 'detachedInstances')))
        };

        scope.loadDetails = function(event) {
          $timeout(function() {
            var loadBalancer = scope.loadBalancer;
            // anything handled by ui-sref or actual links should be ignored
            if (event.isDefaultPrevented() || (event.originalEvent && (event.originalEvent.defaultPrevented || event.originalEvent.target.href))) {
              return;
            }
            var params = {
              application: scope.application.name,
              region: loadBalancer.region,
              accountId: loadBalancer.account,
              name: loadBalancer.name,
              vpcId: loadBalancer.vpcId,
              provider: loadBalancer.cloudProvider,
            };

            if (angular.equals(scope.$state.params, params)) {
              // already there
              return;
            }
            // also stolen from uiSref directive
            scope.$state.go('.loadBalancerDetails', params, {relative: base, inherit: true});
          });
        };
      }
    };
  });
