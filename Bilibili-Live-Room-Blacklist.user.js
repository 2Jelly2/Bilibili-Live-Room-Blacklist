// ==UserScript==
// @name         Bilibili直播间屏蔽
// @namespace    https://github.com/2Jelly2/Bilibili-Live-Room-Blacklist
// @version      0.03b++
// @description  Block specific live rooms on Bilibili.
// @author       時計坂しぐれ
// @grant        none

// @match        https://live.bilibili.com/p/eden/area-tags*

// ==/UserScript==

(
    function()
    {
        'use strict';

        // Interval of running this script (unit: millisecond)
        var patrolInterval = 500;

        // Manually enable or disable this script to block all anchors who belong to Majo Company according to collected list
        //localStorage.setItem("majoBan", true);

        // Live room numbers which you want to block
        var blacklist =
            [
                1000000000000, // Samples
                1010101010101,
                1001001001001
            ];

        var majoBan = localStorage.getItem("majoBan");

        if(majoBan == null)
        {
            localStorage.setItem("majoBan", majoBan = confirm("是否屏蔽所有魔女公司旗下主播？"));
        }

        if(majoBan)
        {
            var majoList =
            [
                21725187, //子花酱Hanako
                21721967, //椎名真绪
                740330, //玥之冰
                21636874, //鸢尾Alina
                22256250, //与朵小天使
                777581, //游莲
                //尤莉艾露 - 毕业?
                21925057, //尤菲黎娅
                //悠奈Yuli - 毕业?
                5659489, //樱谷响是螂螂
                14897638, //樱吹雪
                3858888, //伊月猫凛
                //一酱 - ?
                1653312, //夜德奈奈
                //玄懿 - ?
                //星·小 - ?
                13407, //晓月朔夜
                1038, //小伞一把
                //小青龙 - 毕业?
                3538158, //小怪受
                28094172, //香草莓巧子
                33592, //希露卡
                2292462, //物理魔法使哈娜酱
                22014628, //五月织姬
                1508300, //维斯蒂亚
                779207, //王剑Official
                21690710, //铁寒生
                22087280, //天使垣
                3725076, //特莉丝忒
                21740743, //桃里莲弥Renya
                21516855, //太皮鹿
                3279447, //塔尔斯
                21582212, //苏怡之
                384688, //松下枭太Official - 更名星野泽Hoshino
                4918903, //霜羽
                5633244, //世寒 - 毕业
                //十月 - ?
                454068, //山雀Aile
                755940, //山崎kaori
                15802, //三千宫魔王Miya
                //若月桂Official - 毕业?
                //燃 - ?
                1944820, //切茜娅
                //巧克力 - ?
                22232890, //乔微微
                //钱二两 - ?
                //奇姬LilyPop - 无直播间 / uid=485407858
                632168, //栖酒SAKEKO
                21863446, //普通de办公室
                1256455, //片桐泉
                //趴熊 - ?
                //南瓜子 - ?
                305788, //奈丽莎卡里乌斯
                21875486, //霂暮杺
                //默然 - ?
                718548, //默磷
                //莫维害行 - ?
                56064, //魔王YALU
                21195828, //魔法少女乐府酱
                681554, //茗魂
                9711880, //米呦Miyu
                21691719, //弥祢兔
                //梦影 - ?
                //没腿笼屉 - ?
                21648286, //璐比Channel
                //路卡Luca_Channel - ?
                2064239, //鹿野灸
                634585, //露露·C·娜塔莉娅
                //泷泽寒-official - ?
                22027710, //蓝波Iamb
                22243501, //可可拉
                213308, //军师-RandF
                21291286, //镜像组
                427931, //静夜夜
                364180, //金龙胧月
                1689550, //凰裳(Twinkle_凰裳)
                4145448, //红茶Asmodeus
                3429937, //鹤崎泷_TakiChannel
                21823053, //古见月FurumiLuna
                3595055, //咕噜大魔王
                //鳳姫ちゃん - ?
                540024, //粉黛乱子
                3204380, //废宅多多
                //房日兔 - ?
                91041, //断手猫
                2313, //电流妹Delia
                710449, //丹羽加奈
                21838119, //初鹿野乐
                3765033, //超危蓝猫可可亚
                27334, //草翦葱
                142572, //柄柄ちゃん
                5701155, //彼岸sama_siki
                21582212, //北山大王-苏怡之
                21718578, //百草姬
                21772345, //白小宛_official
                //白鸟穹 - ?
                //白鹿与角鸱Official - ?
                3408715, //白岛と巧克力
                4066032, //安奈るり
                68708, //爱实
                906914, //艾瑞克_艾宾浩斯
                157501, //艾露ミアナ
                21645790, //阿涅4N1E
                892432, //po芽那
                1282429, //Piquer

                22210372, //香取绮罗_kira
                22262300, //人间蜜药
                12845193, //鸢尾牙牙Yamia
                569341, //香草莓巧子Machoke
                9202763 //默然-mory
            ];

            blacklist = blacklist.concat(majoList);
        }

        var blockedNumber = 0;
        var subjects = document.getElementsByClassName("list clearfix")[0].getElementsByTagName("li");

        var patrolLoop = setInterval(patrol, patrolInterval);

        function patrol()
        {
            for (var i = 0; i < subjects.length; i ++)
            {
                var roomNumber = subjects[i].getElementsByTagName("a")[0].pathname;
                roomNumber = roomNumber.replace('/', '');

                for(var j = 0; j < blacklist.length; j ++)
                {
                    if(roomNumber == blacklist[j])
                    {
                        subjects[i].remove();

                        if(!majoBan) // Quit script for short list
                        {
                            blockedNumber ++;
                            if(blockedNumber == blacklist.length)
                            {
                                clearInterval(patrolLoop)
                            }
                        }
                    }
                }
            }
        }
    }
)();
