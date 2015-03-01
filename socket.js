
// *******************************************
// * _ (暂定名字)
// *******************************************
// *
// * var _ = new _( 你的名字 );
// * _.join( 房间名, 回调函数 );
// * 
// * 回调函数会传回一个msg对象 --> { from: "" , data :"" } msg.from 来源 , msg.data 数据
// *
// * _.send( 数据, 房间名 );
// *
// *
// ******************************************* 
function socket(user, url) {
    this.user = user;
    this.io = (url ? io(url) : io('http://localhost:3000/'));
}

socket.prototype = {
    join: function (house, fn) {//房间 用户
        this.io.on(house, fn);
        this.io.emit("join", { type: "join", house: house, from: this.user });

    },
    send: function (data, house) {
        this.io.emit("send", { type: "send", house: house, from: this.user, data: data });
    },
    exit: function (house) {
        this.io.emit("exit", { type: "exit", house: house, from: this.user });
    },
    list: function (house, fn) {
        this.io.emit("list", { type: "exit", house: house, from: this.user });
        this.io.on(socket.io.id, fn);
    }
}
