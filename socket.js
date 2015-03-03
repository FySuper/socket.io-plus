
function socket(user, url) {
    this.user = user;
    this.me = this.io = (url ? io(url) : io('http://localhost:3000/'));
}

socket.prototype = {
    listListen :[],
    join: function (house, fn) {//房间 用户
        if(!house || !fn){ return false; }
        this.io.on(house, fn);
        this.io.emit("join", { type: "join", house: house, from: this.user });

    },
    send: function (data, house) {
        if(!data || !house){ return false; }
        this.io.emit("send", { type: "send", house: house, from: this.user, data: data });
    },
    exit: function (house) {
        if(!house){ return false; }
        this.io.emit("exit", { type: "exit", house: house, from: this.user });
    },
    list: function (house, fn) {
        if(!house || !fn){ return false; }
        if (!~this.listListen.indexOf(house)) {
            this.listListen.push(house);
        } else {
            this.io.off(socket.io.id);            
        }
        this.io.on(socket.io.id, fn);
        this.io.emit("list", {house: house, from: this.user });
    }
}
