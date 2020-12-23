# AutomateNotes
A repairQ bot that Automate notes in repairQ in customer accounts.

using the giving commands;

var nr = 'During the diagnostic and trying several part the device seems to have a board issue. ';

var c = 'Called customer and updated them to pick the device up. ';

var vm = 'called and left a voicemail for the customer. ';

var wd = 'After further inspection the device has evidence of water damage and cannot warranty the repair. ';

var wn = 'Called customer but the number provider is not in service. ';

var dn = "number given to call is to the device that was repaired. "

var r =  'Device is ready for pick up. ';

var def = 'The replacement part was defective. Will try another one. ';

var t = 'tested ';

var d = 'customer declined repair. Ready for pick up. ';

var o = "ordering part ";


run(ticket_Number_here , Command);

When combining commands add the strings together.
run(ticket_Number_here , Command+Command);

For Customer Note just add a string
run(7112483, "called but number given is to device repaired");
