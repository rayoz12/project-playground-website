// ==UserScript==
// @name     Verse Calendar Notifier
// @version  1
// @grant    none
// @include https://gd.mail.ibm.com/verse#/calendar
// ==/UserScript==

// This is configuration for notification timeouts. This is milliseconds before the event start.
// This is meant to be set by the user prefs in the future.
// Mins Notice: 2, 5, 10, 30, 60

minsNotice = [2, 5, 10, 30, 60];


// We have to wait for the page to load
setTimeout(() => {
  let refNode = document.querySelector(".seq-header > .create-button");

  let setupButton = document.createElement("button");
  setupButton.className = "create-button";
  setupButton.style.marginLeft = "12px";
  setupButton.type = "button";
  setupButton.appendChild(document.createTextNode("Setup Notifications"));
	setupButton.onclick = () => {
    registerNotifications();
    new Notification("Notifications Registered", {body: "Verse Calendar Notifier", silent: true});
  };
  
  refNode.parentNode.insertBefore(setupButton, refNode.nextSibling);
  
  registerNotifications();
  new Notification("Notifications Registered", {body: "Verse Calendar Notifier", silent: true});
  
}, 5000);

// Every 5 minutes update (so we don't miss any changes in the calendar)
setInterval(() => {
  console.log("Refreshing Notifications");
  registerNotifications();
}, 5 * 60000)


// minsNotice = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30, 60]; // Debug
notificationTimerConfig = minsNotice.map(mins => mins * 60000); // convert to ms
timeouts = [];

function getCalendarDataFromElements(appts) {
  const parsedAppts = []
  
  for (let i = 0; i < appts.length; i++) {
    const appt = appts[i];
    const parsedAppt = {};
    // console.log(appt)
    parsedAppt.name = appt.children[1].children[1].innerText;
    parsedAppt.time = new Date(appt.attributes.datetime.value);
    parsedAppt.location = appt.children[1].children[2].innerText;
    parsedAppt.isAccepted = !parsedAppt.name.includes("Invitation")
    
    parsedAppts.push(parsedAppt);
  }
  
  return parsedAppts;
}

function notify(appt, mins) {
  const body = appt.time.toLocaleTimeString() + "\n" + appt.location + "\nIn " + mins + " minutes.";
  const notification = new Notification(appt.name, {body, icon: "/verse/dist/fKvRPTK0Il_ZU9kXL6eSoHcTFmz5hMK_BHd8lnjiZQY/sequoia-source/app/icons/ALARM.png"})
}

// Sets up the notification timeouts
function setupNotifications(parsedAppts) {
	for (let i = 0; i < parsedAppts.length; i++) {
    const appt = parsedAppts[i];
    
    // Get the seconds from now
    const msToAppt = appt.time.getTime() - Date.now();
    // if the past ignore
    if (msToAppt < 0) {
      continue;
    }
    
    // Goes through the times
		for (let j = 0; j < notificationTimerConfig.length; j++) {
      const msDifference = notificationTimerConfig[j];     
      
      
			// Check if the value is negative (in the past) and ignore
      if (msDifference > msToAppt) {
        continue;
      }
      
      
      // Get ms to notification
      const msToNotification = msToAppt - msDifference;
      // console.log(appt.name, msToAppt, msDifference, msDifference / 60000, msToNotification)
      
      // call setTimeout
      const id = setTimeout(() => {
        notify(appt, msDifference / 60000);
      }, msToNotification)
			
      timeouts.push(id);
    }
  }
}

function registerNotifications() {
  timeouts.forEach(i => clearTimeout(i))
  
  
 	elems = document.getElementsByClassName("cal-entry-view")
  apptsArray = Array.from(elems);
  // console.log(apptsArray);
  parsedAppts = getCalendarDataFromElements(apptsArray);
  // console.log(parsedAppts)
  setupNotifications(parsedAppts); 
  
  console.log("Notifications Registered", parsedAppts);
}


