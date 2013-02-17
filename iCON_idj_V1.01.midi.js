function iCON() {}

iCON.init = function(id) {
  engine.softTakeover("[Master]","crossfader",true);
  engine.softTakeover("[Channel1]","volume",true);
  engine.softTakeover("[Channel1]","rate",true);
  engine.softTakeover("[Channel2]","volume",true);
  engine.softTakeover("[Channel2]","rate",true);
}

iCON.shutdown = function(id) {
  // nothing to do here
}

iCON.rubber = function(channel, control, value, status, group) {
  channel = "[Channel" + channel + "]";
  if((control == 0x3A || control == 0x3C)  && value > 0) {
    engine.setValue(group, 'rate_temp_down', 0);
    engine.setValue(group, 'rate_temp_up', 1);
  } else if ((control == 0x3B || control == 0x3D) && value > 0) { 
    engine.setValue(group, 'rate_temp_up', 0);
    engine.setValue(group, 'rate_temp_down', 1);    
  } else {
    engine.setValue(group, 'rate_temp_down', 0);
    engine.setValue(group, 'rate_temp_up', 0);    
  }
}

iCON.previewSeek = function(channel, control, value, status, group) {  
  engine.setValue(group, 'playposition', value/127);      
}


iCON.jogRotate = function(channel, control, value, status, group) { 
  var scrConst = 1;  //Adjust to suit. 
  var scrVal = (value == 0x41)?scrConst:-scrConst;
  engine.setValue(group, "jog", scrVal);
}

iCON.scratchRotate = function(channel, control, value, status, group) { 
  var scrConst = 1;  //Adjust to suit. 
  var scrVal = (value == 0x41)?scrConst:-scrConst;
  engine.scratchTick(control - 0x10 + 1, scrVal);
}


iCON.scratchTouch = function(channel, control, value, status, group) { 
  if (value == 0x7f) {
    var intervalsPerRev = 80;
    var rpm = 15.3; //Adjust to suit.
    var alpha = 0.125; //Adjust to suit. 
    var beta = (alpha/32); //Adjust to suit.
    engine.scratchEnable(control - 0x30 + 1, intervalsPerRev, rpm, alpha, beta, false);  
  } else {
    engine.scratchDisable(control - 0x30 + 1);      
  }
}

iCON.volume     = function (channel, control, value, status, group) {
  engine.setValue(group, "volume", (value/127)); 
};

iCON.rate       = function (channel, control, value, status, group) {
  engine.setValue(group, "rate",  ((value-64)/63));
};

iCON.crossfader = function (channel, control, value, status, group) {
  engine.setValue(group, "crossfader", ((value-64)/63));
};
