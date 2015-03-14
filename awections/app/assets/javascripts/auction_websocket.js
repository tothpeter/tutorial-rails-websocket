var AuctionSocket = function(user_id, auction_id, form) {
  this.user_id = user_id;
  this.auction_id = auction_id;
  this.form = $(form);
  this.socket = new WebSocket(App.websocket_url + "auctions/" + this.auction_id);

  this.initBinds();
};

AuctionSocket.prototype.initBinds = function() {
  var _this = this;

  this.form.submit(function(e) {
    e.preventDefault();
    _this.sendBid($('#bid_value').val());
  });

  this.socket.onmessage = function(e) {    
    // bidok
    // outbid 151
    // underbid
    // won
    // lost
    
    var tokens = e.data.split(" ");

    switch(tokens[0]) {
      case "bidok":
        _this.bid(tokens[1]);
        brake;
      case "underbid":
        _this.underbid(tokens[1]);
        brake;
      case "outbid":
        _this.outbid(tokens[1]);
        brake;
      case "won":
        _this.won();
        brake;
      case "lost":
        _this.lost();
        brake;
    }
    console.log(e);
  }
};

AuctionSocket.prototype.sendBid = function(value) {
  this.value = value;
  var template = "bid {{user_id}} {{auction_id}} {{value}}";
  this.socket.send(Mustache.render(template, {
    user_id: this.user_id,
    auction_id: this.auction_id,
    value: this.value,
  }));
};

AuctionSocket.prototype.bid = function() {
  this.form.find(".message strong").text( "Your bid: " + this.value );
}

AuctionSocket.prototype.underbid = function(value) {
  this.form.find(".message strong").text( "Your bid is under: " + value + "." );
}

AuctionSocket.prototype.outbid = function(value) {
  this.form.find(".message strong").text( "You were outbid. It is now: " + value + "." );
}

AuctionSocket.prototype.won = function() {
  this.form.find(".message strong").text( "You won! " + this.value );
}

AuctionSocket.prototype.lost = function() {
  this.form.find(".message strong").text("You lost the auction!");
}