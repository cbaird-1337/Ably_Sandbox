window.onload = function() {
    load_ably_data();
  };
  
  function load_ably_data(){
  
    var realtime = new Ably.Realtime(/*YOUR-API-KEY-HERE*/); 
    /* Get a channel */
    var speed_channel = realtime.channels.get("Car-Speed");

    var display = document.getElementById("speed-display")
    speed_channel.subscribe(function(msg){
      display.value = msg.data + '\n' + display.value;
        });


    /* Get a channel with rewind enabled */
    var lap_channel = realtime.channels.get("[?rewind=10]Lap-Time");
    
    /* Retrieve messages from history */
    document.getElementById("history").addEventListener("click", function() {
        
        var display = document.getElementById("history-display");
        lap_channel.subscribe(function(msg) {
        console.log(msg);
            console.log(msg.data);
            display.value += msg.data + " @ " + new Date(msg.timestamp) + "\n";
 
    });
  });
  }
