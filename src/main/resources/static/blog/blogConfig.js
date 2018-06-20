(function () {
    'use strict';

    let blogModule = angular.module('blog', ["ui.router", "duScroll", "ngAnimate"]);

    blogModule.config(function ($stateProvider) {

        $stateProvider
            .state('blog.main', {
                abstract: true,
                views: {
                    masthead: {
                        templateUrl: "blog/layout/masthead.html"
                    },

                    header: {
                        templateUrl: "blog/layout/header.html"
                    },

                    '': {
                        templateUrl: "blog/layout/content.html"
                    },

                    sidebar: {
                        templateUrl: "blog/layout/sidebar/sidebar.html",
                        controller: 'sidebarController as sidebarCtrl'
                    },

                    footer: {
                        templateUrl: "blog/layout/footer.html"
                    }
                },
                resolve: {
                    latest5Posts: ['postService', function (postService) {
                        return postService.getLatest5Posts();
                    }],

                    first5TopPosts: ['postService', function (postService) {
                        return postService.getFirst5TopPosts();
                    }]
                }
            })

            .state('blog.main.home', {
                url: "/",
                templateUrl: "blog/posts/posts.html",
                controller: "postHeadingsController as postHeadingsCtrl",
                resolve: {
                    first6Posts: ['postService', function (postService) {
                        return postService.getNext6FromPage(0);
                    }]
                }
            })

            .state('blog.main.topPosts', {
                url: "/najciekawsze-posty{path:\/?}",
                templateUrl: "blog/posts/top-posts.html",
                controller: "postHeadingsByTopTrueController as postHeadingsByTopTrueCtrl",
                resolve: {
                    first6TopPosts: ['postService', function (postService) {
                        return postService.getNext6ByTopTrueFromPage(0);
                    }]
                }
            })

            .state('blog.main.about', {
                url: "/blog{path:\/?}",
                templateUrl: "blog/about/about.html",
                controller: "aboutController as aboutCtrl"
            })

            .state('blog.main.author', {
                url: "/autor{path:\/?}",
                templateUrl: "blog/author/author.html",
                controller: "authorController as authorCtrl"
            })

            .state('blog.main.categories', {
                url: "/kategorie{path:\/?}",
                templateUrl: "blog/categories/categories.html",
                controller: "categoryController as categoryCtrl",
                resolve: {
                    allCategories: ['categoryService', function (categoryService) {
                        return categoryService.getAllCategories();
                    }]
                }
            })

            .state('blog.main.contact', {
                url: "/kontakt{path:\/?}",
                templateUrl: "blog/contact/contact.html",
                controller: "emailController as emailCtrl"
            })

            .state('blog.main.postsByCategory', {
                url: "/kategorie/{categoryNameUrl:.+}",
                templateUrl: "blog/posts/posts-by-category.html",
                controller: "postHeadingsByCategoryController as postHeadingsByCategoryCtrl",
                resolve: {
                    first6PostsByCategory: ['postService', '$stateParams', function (postService, $stateParams) {
                        return postService.getNext6ByCategoryNameUrlFromPage($stateParams.categoryNameUrl, 0);
                    }]
                }
            })

            .state('blog.main.post', {
                url: "/post/{postTitleUrl:.+}",
                templateUrl: "blog/posts/post.html",
                controller: "postDetailsController as postDetailsCtrl",
                resolve: {
                    postDetails: ['postService', '$stateParams', function (postService, $stateParams) {
                        return postService.getPostByTitleUrl($stateParams.postTitleUrl);
                    }]
                }
            })
    });
})();