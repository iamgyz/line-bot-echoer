/*
GYZLAB 2014-2017
*/
var LINEBot = require('line-messaging');
var app = require('express')();
var server = require('http').Server(app);
var LINEBot = require('line-messaging');
var port = 8292;

//bot information (channel id, channel secret, channel token)
var bot = LINEBot.create({
    channelID: 'your-channel-id',
    channelSecret: 'your-channel-secret',
    channelToken: 'your-channel-token',
},server);
//handle context: '/webhook'
app.use(bot.webhook('/webhook'));

//Line bot handler
bot.on(LINEBot.Events.MESSAGE, function(replyToken, message) {
    console.log(message.getUserId()+","+message.getMessageType());
    //Text
    if(message.getMessageType() == "text"){
        console.log("==> Text: "+message.getText());
        sendMessage(replyToken, message.getText());
    }
    //Sticker
    else if(message.getMessageType() == "sticker"){
        console.log("==> Package ID: "+message.getPackageId()+", Sticker ID: "+message.getStickerId() );
        //note: bot can only send the limited stickers
        sendSticker(replyToken, message.getPackageId(), message.getStickerId());
    }
    //Location
    else if(message.getMessageType() == "location"){
        console.log("==> Title: "+message.getTitle()+", Addr: "+message.getAddress()+", Lat: "+message.getLatitude()+", Lng: "+message.getLongitude() );
        sendLocation(replyToken, message.getTitle(), message.getAddress(), message.getLatitude(), message.getLongitude());
    }
    //Image
    else if(message.getMessageType() == "image"){
        //note: you can get binary content by getMessageContent API
        //here we send the default message
        console.log("==> image");
        sendImage(replyToken,"https://static.line.naver.jp/line_regulation/files/ver2/LINE_Icon.png","https://static.line.naver.jp/line_regulation/files/ver2/LINE_Icon.png");
    }
    //Video
    else if(message.getMessageType() == "video"){
        //note: you can get binary content by getMessageContent API
        //here we send the default message
        console.log("==> video");
        sendMessage(replyToken, "Get video");
    }
    //Audio
    else if(message.getMessageType() == "audio"){
        console.log("==> audio");
        sendMessage(replyToken, "Get audio");
    }
    //Others
    else{
        console.log("==> not supported");
        sendMessage(replyToken,"Not supported!");
    }
    // add code below.
});

//Start server
server.listen(port,function(){
    console.log("Line bot server running on port "+port);
});

//wrapper for replyText
function sendMessage(replyToken,text){
    bot.replyTextMessage(replyToken,text).then(function(data){
        console.log("suc:",data);
    }).catch(function(err){
        console.log("err:",err);
    });
};
//wrapper for replySticker
function sendSticker(replyToken,packageId,stickerId){
    bot.replyStickerMessage(replyToken,packageId,stickerId).then(function(data){
        console.log("suc:",data);
    }).catch(function(err){
        console.log("err:",err);
    });
}
//wrapper for replyLocation
function sendLocation(replyToken,title, address, latitude, longitude){
    bot.replyLocationMessage(replyToken,title, address, latitude, longitude).then(function(data){
        console.log("suc:",data);
    }).catch(function(err){
        console.log("err:",err);
    });
}
//wrapper for replyImage
function sendImage(replyToken, originalContentUrl, previewImageUrl){
    bot.replyImageMessage(replyToken, originalContentUrl, previewImageUrl).then(function(data){
        console.log("suc:",data);
    }).catch(function(err){
        console.log("err:",err);
    });
}
