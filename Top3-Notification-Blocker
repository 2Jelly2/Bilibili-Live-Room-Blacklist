// ==UserScript==
// @name         Bilibili高能榜提醒屏蔽
// @namespace    https://github.com/2Jelly2/Bilibili-Top3-Notification-Blocker
// @version      0.01
// @description  Block Top3 Notification on Bilibili.
// @author       時計坂しぐれ

// @grant        none
// @match        https://live.bilibili.com/*

// ==/UserScript==

(
    function()
    {
        'use strict';

        //creatMenu();
        let objects = document.getElementsByClassName("top3-notice chat-item");
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
