// ==UserScript==
// @name         Bilibili直播间屏蔽
// @namespace    https://github.com/2Jelly2/Bilibili-Live-Room-Blacklist
// @version      0.04+
// @description  Block specific live rooms on Bilibili.
// @author       時計坂しぐれ

// @grant        GM_setValue
// @grant        GM_getValue

// @match        https://live.bilibili.com/p/eden/area-tags*

// ==/UserScript==

(
    function()
    {
        'use strict';

        // Interval of running this script (unit: millisecond)
        const patrolInterval = 500;

        // Manually enable or disable this script to block all anchors who belong to Majo Company according to collected list
        //GM_setValue("majoBan", true);

        // Live rooms which you want to block
        // Note that once this script runs, the following rooms will be added to blacklist permanently
        // To remove rooms from the blacklist, please add targeted live room number to following constant 'blacklistRemoved'
        const blacklist = new Set
        (
            [
                1000000000000, // Samples, replace with live room number
                1010101010101,
                1001001001001
            ]
        );

        // Live rooms which will be excluded from blocking
        const whitelist = new Set
        (
            [
                //1000000000000,
                //1010101010101,
                1001001001001
            ]
        );

        // Live rooms which will be removed from blacklist
        // Privior to 'blacklist'
        const blacklistRemoved = new Set
        (
            [
                //1010101010101,
                //1001001001001,
                1000000000000
            ]
        );


        const blocklistOLD = GM_getValue("blocklist");
        let blocklist = new Set([...(blocklistOLD == undefined ? new Set([]) : new Set(blocklistOLD)), ...blacklist].filter(x => !blacklistRemoved.has(x)));
        GM_setValue("blocklist", [...blocklist]);

        console.log(blocklist);

        let majoBan = GM_getValue("majoBan");

        if(majoBan == null)
        {
            GM_setValue("majoBan", majoBan = confirm("是否屏蔽所有已知魔女公司旗下主播？"));
        }

        if(majoBan)
        {
            const majoList = new Set
            (
                [
                    //Majo
                    21725187, //子花酱Hanako
                    21721967, //椎名真绪
                    3408715, //巧克力
                    815973, //钱二两 - 永久封禁


                    //Messiah
                    1944820, //切茜娅
                    1038, //小伞一把
                    22014628, //五月织姬
                    3858888, //伊月猫凛
                    21718578, //百草姬
                    681554, //茗魂
                    21691719, //弥祢兔
                    22243501, //可可拉


                    //MajoSP
                    634585, //露露·C·娜塔莉娅
                    777581, //游莲
                    33592, //希露卡
                    14897638, //樱吹雪
                    2292462, //物理魔法使哈娜酱

                    //Croven
                    41035, //竹糯
                    //曼德萝草
                    //戈洛
                    //黑泽诺亚
                    //塔克
                    21838119, //初鹿野乐
                    //切羽
                    //星谷实花
                    //幽游
                    //溯月
                    //里奈
                    //裔书
                    //巴克


                    //三垣四象
                    21627660, //小青龙
                    7554620, //风从虎
                    22087280, //天使垣
                    22403613, //钟馗
                    //紫天垣
                    //腾心
                    //勾陈须
                    //烛龙
                    //大微垣
                    //太微垣
                    //朱九儿
                    //玄鸡
                    //心月狐
                    //房日兔

                    //EroS
                    //费不燎
                    //林岳风


                    //Wonderland
                    540024, //粉黛乱子
                    22210372, //香取绮罗_Kira
                    9711880, //米呦Miyu
                    //乌月
                    3279447, //塔尔斯
                    4066032, //安奈るり
                    1689550, //凰裳(Twinkle_凰裳)
                    //居居喵
                    //路卡
                    //黑白


                    //曙光
                    //将离
                    //雷柏磷
                    //S1娘
                    22256250, //与朵小天使
                    3595055, //咕噜大魔王
                    //光冥
                    718548, //默磷
                    //白云藻

                    //DDL


                    //AW$L


                    740330, //玥之冰
                    21636874, //鸢尾Alina
                    21925057, //尤菲黎娅
                    5659489, //樱谷响是螂螂
                    1653312, //夜德奈奈
                    13407, //晓月朔夜
                    3538158, //小怪受
                    28094172, //香草莓巧子
                    1508300, //维斯蒂亚
                    779207, //王剑Official
                    21690710, //铁寒生
                    3725076, //特莉丝忒
                    21740743, //桃里莲弥Renya
                    21516855, //太皮鹿
                    21582212, //苏怡之
                    384688, //松下枭太Official - 更名星野泽Hoshino
                    4918903, //霜羽
                    454068, //山雀Aile
                    755940, //山崎kaori
                    15802, //三千宫魔王Miya
                    22232890, //乔微微
                    632168, //栖酒SAKEKO
                    21863446, //普通de办公室
                    1256455, //片桐泉
                    305788, //奈丽莎卡里乌斯
                    21875486, //霂暮杺
                    56064, //魔王YALU
                    21195828, //魔法少女乐府酱
                    21648286, //璐比Channel
                    2064239, //鹿野灸
                    22027710, //蓝波Iamb
                    213308, //军师-RandF
                    21291286, //镜像组
                    427931, //静夜夜
                    364180, //金龙胧月
                    4145448, //红茶Asmodeus
                    3429937, //鹤崎泷_TakiChannel
                    21823053, //古见月FurumiLuna
                    3204380, //废宅多多
                    91041, //断手猫
                    2313, //电流妹Delia
                    710449, //丹羽加奈
                    3765033, //超危蓝猫可可亚
                    27334, //草翦葱
                    142572, //柄柄ちゃん
                    5701155, //彼岸sama_siki
                    21582212, //北山大王-苏怡之
                    21772345, //白小宛_official
                    3408715, //白岛と巧克力
                    68708, //爱实
                    906914, //艾瑞克_艾宾浩斯
                    157501, //艾露ミアナ
                    21645790, //阿涅4N1E
                    892432, //po芽那
                    1282429, //Piquer

                    22262300, //人间蜜药
                    12845193, //鸢尾牙牙Yamia
                    569341, //香草莓巧子Machoke
                    9202763, //默然-mory

                    //一酱 - ?
                    //玄懿 - ?
                    //星·小 - ?
                    //十月 - ?
                    //燃 - ?
                    //趴熊 - ?
                    //南瓜子 - ?
                    //默然 - ?
                    //莫维害行 - ?
                    //梦影 - ?
                    //没腿笼屉 - ?
                    //泷泽寒-official - ?
                    //鳳姫ちゃん - ?
                    //白鸟穹 - ?
                    //白鹿与角鸱Official - ?

                    //奇姬LilyPop - 无直播间 / uid=485407858

                    //尤莉艾露 - 毕业?
                    //悠奈Yuli - 毕业?
                    //若月桂Official - 毕业?
                    5633244 //世寒 - 毕业
                ]
            );

            blocklist = new Set([...blocklist, ...majoList]);
        }

        blocklist = new Set([...blocklist].filter(x => !whitelist.has(x)));

        console.log(blocklist);

        let blockedNumber = 0;
        let subjects = document.getElementsByClassName("list clearfix")[0].getElementsByTagName("li");

        let patrolLoop = setInterval(patrol, patrolInterval);

        function patrol()
        {
            for (let i = 0; i < subjects.length; i ++)
            {
                let roomNumber = subjects[i].getElementsByTagName("a")[0].pathname;
                roomNumber = roomNumber.replace('/', '');

                for(let roomNumberBlocked of blocklist)
                {
                    if(roomNumber == roomNumberBlocked)
                    {
                        subjects[i].remove();

                        if(!majoBan) // Quit script for short list
                        {
                            blockedNumber ++;
                            if(blockedNumber == blocklist.length)
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
