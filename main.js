window.onload = function() {
    load_ably_data();
  };
  
  function load_ably_data(){
  
    var realtime = new Ably.Realtime('MTjZGg.F4pyTg:Cb6yxwC6P3ZxW_kgkxF4DShAh5KbkRMG3WA2QpL2DtY'); 
    /* Get a channel in the "persisted" namespace */
    var speed_channel = realtime.channels.get("Car-Speed");

    var display = document.getElementById("speed-display")
    speed_channel.subscribe(function(msg){
      display.value = msg.data + '\n' + display.value;
        });


    /* Get a channel in the "persisted" namespace */
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