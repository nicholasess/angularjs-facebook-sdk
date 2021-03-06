function FacebookCommentsDirective(facebookService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<fb:comments ng-attr-href ng-attr-numposts ng-attr-colorscheme></fb:comments>',
        scope: {
            href: '@href',
            colorschema: '@colorschema',
            numposts: '@numposts'
        },
        link: function (scope, element) {
            facebookService.ready.then(function () {
                FB.XFBML.parse(element[0]);
            });
        }
    };
}

FacebookCommentsDirective.$inject = ['facebookService'];

angular.module('angularjs-facebook-sdk.directives')
    .directive('afbComments', FacebookCommentsDirective);
