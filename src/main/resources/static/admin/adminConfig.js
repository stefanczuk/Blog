(function () {
    'use strict';

    var adminModule = angular.module('admin', ["ui.router", "duScroll", "ngAnimate", "textAngular"]);

    adminModule.config(function ($stateProvider, $provide) {

        $stateProvider
            .state('admin.main', {
                abstract: true,
                views: {
                    masthead: {
                        templateUrl: "admin/layout/masthead.html"
                    },

                    header: {
                        templateUrl: "admin/layout/header.html"
                    },

                    '': {
                        templateUrl: "admin/layout/content.html"
                    }
                }
            })

            .state('admin.main.home', {
                url: "/admin",
                templateUrl: "admin/home/home.html"
            })

            .state('admin.main.about', {
                url: "/admin/blog",
                templateUrl: "admin/about/about.html",
                controller: 'aboutController as aboutCtrl'
            });

        $provide.decorator('taOptions', ['taRegisterTool', 'taToolFunctions', '$delegate',
            function (taRegisterTool, taToolFunctions, taOptions) {
                taRegisterTool('uploadImage', {
                    iconclass: "fa fa-picture-o",
                    tooltiptext: 'Upload an image',
                    onElementSelect: {
                        element: 'img',
                        action: taToolFunctions.imgOnSelectAction
                    },
                    action: function () {
                        var $editor = this.$editor;
                        var input = document.createElement('input');
                        input.type = 'file';
                        input.accept = "image/*";

                        input.onchange = function () {
                            var reader = new FileReader();

                            if (this.files && this.files[0]) {
                                reader.onload = function (e) {
                                    $editor().wrapSelection('insertHtml', '<img src=' + e.target.result + '>', true);
                                };

                                reader.readAsDataURL(this.files[0]);
                            }
                        };

                        input.click();
                    }
                });
                taOptions.toolbar[1].push('uploadImage');
                return taOptions;
            }]);
    });
})();