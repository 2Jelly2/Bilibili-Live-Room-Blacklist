// ==UserScript==
// @name         Bilibili直播间屏蔽
// @namespace    https://github.com/2Jelly2/Bilibili-Live-Room-Blacklist
// @version      0.02
// @description  Block specific live rooms on Bilibili.
// @author       時計坂しぐれ
// @grant        none

// @match        https://live.bilibili.com/p/eden/area-tags*

// ==/UserScript==

(
    function()
    {
        'use strict';

        var blacklist = [1944820, 4339349]; // Live room numbers which you want to block
        var patrolInterval = 500; // Interval of running this script (unit: millisecond)

        var blockedNumber = 0;
        var subjects = document.getElementsByClassName("list clearfix")[0].getElementsByTagName("li");

        setInterval(patrol, patrolInterval);

        function patrol()
        {
            Search:
            for (var i = 0; i < subjects.length; i ++)
            {
                var roomNumber = subjects[i].getElementsByTagName("a")[0].pathname;
                roomNumber = roomNumber.replace('/', '');

                for(var j = 0; j < blacklist.length; j ++)
                {
                    if(roomNumber == blacklist[j])
                    {
                        blockedNumber ++;
                        subjects[i].remove();

                        if(blockedNumber == blacklist.length)
                        {
                            break Search;
                        }
                    }
                }
            }
        }
    }
)();
