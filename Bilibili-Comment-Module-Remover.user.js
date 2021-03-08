// ==UserScript==
// @name         Bilibili评论区移除
// @namespace    https://github.com/2Jelly2/Bilibili-Comment-Module-Remover
// @version      0.01
// @description  Remove comment module under video player.
// @author       時計坂しぐれ

// @grant        none
// @match        https://www.bilibili.com/video/*

// ==/UserScript==

(
    function()
    {
        'use strict';

        //creatMenu();
        let objects = document.getElementsByClassName("comment-m report-wrap-module report-scroll-module");
        let patrolLoop = setInterval(patrol, 500);

        function patrol()
        {
            for(let object of objects)
            {
                object.remove();
                console.log('removed');
            }
        }
    }
)();
