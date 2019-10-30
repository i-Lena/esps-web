
'use strict';
$(function () {

    /*======== 轮播图=========== */
    /*
    * 根据屏幕宽度的变化决定轮播图片应该展示什么
    * return {[type]} [description]
    * */
    function resize() {
        var windowWidth = $(window).width();
        var isSmallScreen = windowWidth < 768;
        // console.info(isSmallScreen);
        $('#carousel-example-generic > .carousel-inner > .item').each(function (i,item) {
            var $item = $(item);
            var imgSrc = isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');
            // console.info(imgSrc);
            $item.css('backgroundImage', 'url("' + imgSrc + '")');
            // $item.html('<img src="' + imgSrc + '" alt="" />');
            if(isSmallScreen) {
                $item.html('<img src="' + imgSrc + '" alt="" />');
            }else {
                $item.empty();
            }
        });
    }
    $(window).on('resize',resize).trigger('resize');
    /*======== / 轮播图=========== */

    /* ============== 绘制中国地图 =================*/
    map();
    function map() {
        // 1.初始化echarts实例map
        var map = echarts.init(document.getElementById("map"));
        // 2.map的配置，配置option,新建一个地理坐标系 geo,地图类型为中国地图
        /*var option = {
            geo: {
                map: 'china'
            }
        };
        // 3.调用setOption(option)为图标设置配置项
        map.setOption(option);*/
        //引入data数据
        var data = [
            {name: '海门', value: 9},
            {name: '鄂尔多斯', value: 12},
            {name: '招远', value: 12},
            {name: '舟山', value: 12},
            {name: '齐齐哈尔', value: 14},
            {name: '盐城', value: 15},
            {name: '赤峰', value: 16},
            {name: '青岛', value: 18},
            {name: '乳山', value: 18},
        ];
        /* 引用json格式的地图数据，通过异步加载的方式，加载宛城后需要手动注册地图 */
        $.get("assets/libs/echartsMap/map/json/china.json",function (chinaJson) {
            echarts.registerMap('china',chinaJson);  //注册地图
            // 引入城市坐标
            var geoCoordMap = {
                '海门':[121.15,31.89],
                '鄂尔多斯':[109.781327,39.608266],
                '招远':[120.38,37.35],
                '舟山':[122.207216,29.985295],
                '齐齐哈尔':[123.97,47.33],
                '盐城':[120.13,33.38],
                '赤峰':[118.87,42.28],
                '青岛':[120.33,36.07],
                '乳山':[121.52,36.89],
            };
            // 将数据和城市坐标对应上
            var convertData= function (data) {
                var res = [];
                for(var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if(geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };
            // 2.map的配置，配置option,新建一个地理坐标系geo,地图类型为中国地图
            var option = {
                title: {
                    text: '平台工程师资源分布及技能覆盖',
                    left: 'center',
                    textStyle: {
                        color: '#000'
                    }
                },
                //提示框组件
                tooltip: {
                    trigger: 'item'
                },
                // 图例组件
                legend: {
                    orient: 'vertical',
                    y: 'bottom',
                    x: 'right',
                    data: ['平台工程师资源分布及技能覆盖'],
                    textStyle: {
                        color: '#000'
                    }
                },
                /*visualMap: {
                    min: 0,
                    max: 300,
                    calculable: true,
                    inRange: {
                        color: ['#ABCDEF','#99CC99']
                    },
                    textStyle: {
                        color: '#fff'
                    }
                },*/
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: true,
                            areaColor: '#2a333d'
                        }
                    },
                    // roam: false,
                    roam: true,  //是否允许缩放
                    // zoom: 2.5,   //初始缩放比
                    // 定义样式
                    /*itemStyle: {
                        // 普通状态下的样式
                        normal: {
                            areaColor: '#ABCDEF99',
                            borderColor: '#fff'
                        },
                        // 高亮状态下的样式,默认黄色
                        emphasis: {
                            // areaColor: '#2a333d'
                        }
                    },*/
                    /*left: '0%',
                    right: '0%',
                    center: [117.98561551896913, 31.205000490896193],
                    zoom: 2.5,// 改变这个值的大小就可以了*/

                },
                series: [
                    {
                        name: '全国工程师资源分布',   //series名称
                        type: 'effectScatter', //series图标类型
                        coordinateSystem: 'geo',  //series坐标系类型
                        data: convertData(data.sort(function (a, b) {
                            return b.value - a.value;
                        }).slice(0, 5)),   //series数据内容
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        // 控制显示文本
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        // series样式
                        itemStyle: {
                            normal: {
                                color: '#24a9b6',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        //根据数值大小改变点的大小
                        symbolSize: function (val) {  //根据数值大小控制点的大小
                            return val[2] / 1;
                        },
                        zlevel: 1
                    }
                ],

            };
            map.setOption(option);
        });
    }
    /* ============== /绘制中国地图 =================*/
});