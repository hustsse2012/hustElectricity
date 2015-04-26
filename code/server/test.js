var r = require('request');
var jsdom = require("jsdom");
var all_H = 24;
var small_H = 0.1;


var user = {};
var userResult = {};


var configBase = {
    url:'http://202.114.18.218/main.aspx',
};

var config = {
        url:configBase.url,
        form: {
            //programId:'韵苑二期',
            txtyq:'韵苑16栋',
            txtld:'4层',
            Txtroom:'421',
            __VIEWSTATE: '/wEPDwULLTEyNjgyMDA1OTgPZBYCAgMPZBYKAgEPEA8WBh4NRGF0YVRleHRGaWVsZAUM5qW85qCL5Yy65Z+fHg5EYXRhVmFsdWVGaWVsZAUM5qW85qCL5Yy65Z+fHgtfIURhdGFCb3VuZGdkEBUGBuS4nOWMugbopb/ljLoM6Z+16IuR5LqM5pyfDOmfteiLkeS4gOacnwbntKvoj5gLLeivt+mAieaLqS0VBgbkuJzljLoG6KW/5Yy6DOmfteiLkeS6jOacnwzpn7Xoi5HkuIDmnJ8G57Sr6I+YAi0xFCsDBmdnZ2dnZxYBAgJkAgUPEA8WBh8ABQbmpbzlj7cfAQUG5qW85Y+3HwJnZBAVEAvpn7Xoi5ExM+agiwvpn7Xoi5ExNOagiwvpn7Xoi5ExNeagiwvpn7Xoi5ExNuagiwvpn7Xoi5ExN+agiwvpn7Xoi5ExOOagiwvpn7Xoi5ExOeagiwvpn7Xoi5EyMOagiwvpn7Xoi5EyMeagiwvpn7Xoi5EyMuagiwvpn7Xoi5EyM+agiwvpn7Xoi5EyNOagiwvpn7Xoi5EyNeagiwvpn7Xoi5EyNuagiwvpn7Xoi5EyOOagiwst6K+36YCJ5oupLRUQC+mfteiLkTEz5qCLC+mfteiLkTE05qCLC+mfteiLkTE15qCLC+mfteiLkTE25qCLC+mfteiLkTE35qCLC+mfteiLkTE45qCLC+mfteiLkTE55qCLC+mfteiLkTIw5qCLC+mfteiLkTIx5qCLC+mfteiLkTIy5qCLC+mfteiLkTIz5qCLC+mfteiLkTI05qCLC+mfteiLkTI15qCLC+mfteiLkTI25qCLC+mfteiLkTI45qCLAi0xFCsDEGdnZ2dnZ2dnZ2dnZ2dnZ2cWAQIDZAIJDxAPFgYfAAUJ5qW85bGC5Y+3HwEFCealvOWxguWPtx8CZ2QQFQcEMeWxggQy5bGCBDPlsYIENOWxggQ15bGCBDblsYILLeivt+mAieaLqS0VBwQx5bGCBDLlsYIEM+WxggQ05bGCBDXlsYIENuWxggItMRQrAwdnZ2dnZ2dnZGQCFw88KwANAGQCGQ88KwANAGQYAwUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgIFDEltYWdlQnV0dG9uMQUMSW1hZ2VCdXR0b24yBQlHcmlkVmlldzEPZ2QFCUdyaWRWaWV3Mg9nZNsSGavCu1RKIFUlR9Qq/H062vvb',
            __EVENTVALIDATION: '/wEWJQK/pJ6MBgLorceeCQLc1sToBgK50MfoBgKhi6GaBQLdnbOlBgLtuMzrDQLrwqHzBQKX+9a3BALWzu6nAwLWzvKCCgLWzsbtAQLWzqrJCALWzr4UAtbOwswCAtbO1pcKAsvlxIAPAsvlqOwGAsvlvLcOAsvlgJIFAsvllP0MAsvl+NgLAsvlzKMDAsvl5KcFApSUsNoIAoOU+OMOAoKU+OMOAoGU+OMOAoCU+OMOAoeU+OMOAoaU+OMOAo+UvJ4CAvrV2qsGAtLCmdMIAtLC1eQCAuzR9tkMAuzRirUFL9HmMJVXjHfi12hKIa672zL5ICc=',
            'ImageButton1.x': 37,
            'ImageButton1.y': 17,
        }
    };

r.post(config,function (error, res, body) {
    if (!error && res.statusCode == 200) {
        page(body);
    }
});

var jquery = "http://blog-res.qiniudn.com/jquery-1.10.2.min.js";

function page(body){
    jsdom.env(
      body,
      [jquery],
      function (errors, html) {
        var $ = html.$;
        //console.log("电费:", $($("#GridView2 td")[0]).text());
      }
    );
}


function receiveUser(userId,programId,txtyq,txtld,Txtroom){
    user[userId] = {
        "programId": programId,
        "txtyq": txtyq,
        "txtld": txtld,
        "Txtroom": Txtroom,
    }
}


function mainLoop(){
    userResult = {};
    setTimeout(mainLoop,all_H*3600*1000);
}

function smallLoop(){
    for (var key = user.keys(),i = key.length; i >= 0; i--) {
        find_ele(key[i]);
    }
}

function find_ele(userId){
    var config = Object.create(configBase);
    corr_user = user[userId];
    config.form = {
        "programId": corr_user.programId,
        "txtyq": corr_user.txtyq,
        "txtld": corr_user.txtld,
        "Txtroom": corr_user.Txtroom
    };
    r.post(config,function (error, res, body) {
        if (!error && res.statusCode == 200) {
            page(body);
        }
    })
}



mainLoop();

