var data = [
    {
        'name': '诈骗',
        'value': 111,
    },
    {
        'name': '下毒',
        'value': 21,
    },
    {
        'name': '传销',
        'value': 37,
    },
    {
        'name': '校园贷',
        'value': 48,
    },
    {
        'name': '斗殴',
        'value': 10,
    },
    {
        'name': '诈骗',
        'value': 178,
    },
    {
        'name': '下毒',
        'value': 21,
    },
    {
        'name': '传销',
        'value': 37,
    },
    {
        'name': '校园贷',
        'value': 48,
    },
    {
        'name': '斗殴',
        'value': 10,
    },
    {
        'name': '诈骗',
        'value': 51,
    },
    {
        'name': '下毒',
        'value': 21,
    },
    {
        'name': '传销',
        'value': 37,
    },
    {
        'name': '校园贷',
        'value': 48,
    },
    {
        'name': '斗殴',
        'value': 100,
    },
]
var dataMax = null
var dataMin = null
var dataValue = []
var bac = ['./images/tagcloud_2D_a_wrap1.png', './images/tagcloud_2D_a_wrap2.png']

window.onload = function() {
    var oDiv = document.getElementById('tagcloud_2D_wrap');
    
    dataMax = Math.max.apply(null, data)

    for(var i = 0; i < data.length; i++) {
        dataValue.push(data[i].value)
        dataMax = Math.max.apply(null, dataValue)
        dataMin = Math.min.apply(null, dataValue)
        
        // 循环插入DOM元素
        var para = document.createElement("a")
        var node = document.createTextNode(data[i].name)
        para.appendChild(node)

        oDiv.appendChild(para)	

    }
    
    var aA = oDiv.getElementsByTagName('a');

    // 循环aA集合添加class名
    for(var i = 1; i <= aA.length; i++) {
        var className = 'tagcloud_2D_a' + i
        aA[i-1].setAttribute('class', className)
    }

    var slopeK = (300 - 100) / (dataMax - dataMin)
    var slopeB = 100 - dataMin * slopeK
    var textSlopeK = (60 - 20) / (dataMax - dataMin)
    var textSlopeB = 20 - dataMin * textSlopeK

    // 循环添加比例尺
    for(var i = 1; i <= data.length; i++) {
        var aAWidth = data[i-1].value * slopeK + slopeB
        var aAFontSize = data[i-1].value * textSlopeK + textSlopeB

        var className = 'tagcloud_2D_a' + i
        var aI = oDiv.getElementsByClassName(className)[0]
        // 添加长宽样式
        aI.style.width = aAWidth + 'px'
        aI.style.height = aAWidth + 'px'
        aI.style.lineHeight = aAWidth + 'px'
        aI.style.fontSize = aAFontSize  + 'px'

        // 随机添加背景图
        if(i % 2 === 0) {
            aI.style.backgroundImage = 'url(' + bac[0] + ')'
            aI.style.backgroundColor = 'rgba(25, 133, 137, 0.2)'
        }else {
            aI.style.backgroundImage = 'url(' + bac[1] + ')'
            aI.style.backgroundColor = 'rgba(23, 46, 177, 0.2)'
        }
    }
    
    var i = 0;
    for (i = 0; i < aA.length; i++) {
        aA[i].pause = 1;
        aA[i].time = null;
        initialize(aA[i]);
        aA[i].onmouseover = function() {
            this.pause = 0;
        };
        aA[i].onmouseout = function() {
            this.pause = 1;
        };
    }
    setInterval(starmove, 50);

    function starmove() {
        for (i = 0; i < aA.length; i++) {
            if (aA[i].pause) {
                domove(aA[i]);
            }
        }
    }

    function domove(obj) {
        if (obj.offsetTop <= -obj.offsetHeight) {
            obj.style.top = oDiv.offsetHeight + "px";
            initialize(obj);
        } else {
            obj.style.top = obj.offsetTop - obj.ispeed + "px";
        }
    }

    function initialize(obj) {
        var iLeft = parseInt(Math.random() * oDiv.offsetWidth);
        var scale = Math.random() * 1 + 1;
        var iTimer = parseInt(Math.random() * 1500);
        obj.pause = 0;

        // obj.style.fontSize = 12 * scale + 'px';

        if ((iLeft - obj.offsetWidth) > 0) {
            obj.style.left = iLeft - obj.offsetWidth + "px";
        } else {
            obj.style.left = iLeft + "px";
        }
        clearTimeout(obj.time);
        obj.time = setTimeout(function() {
            obj.pause = 1;
        }, iTimer);
        obj.ispeed = Math.ceil(Math.random() * 4) + 1;
    }
}