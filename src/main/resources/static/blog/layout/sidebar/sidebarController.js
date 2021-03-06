(function () {
    'use strict';

    var blogModule = angular.module('blog');

    blogModule.controller('sidebarController', function (latest5Posts, $sce, staticContentService) {

        var self = this;

        self.latest5Posts = latest5Posts;
        self.postUrlPrefix = "post/";

        self.authorDescriptionStaticContentName = 'authorSidebar';

        loadContent();

        function loadContent() {
            staticContentService.getStaticContentByName(self.authorDescriptionStaticContentName).then(
                function (response) {
                    self.authorDescription = $sce.trustAsHtml(response.body);
                }
            )
        }
    });
})();