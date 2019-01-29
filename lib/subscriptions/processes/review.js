let Emitter = require("events").EventEmitter;

//make sure the application is valid
const ensureAppValid = (proc, app, next) => {
  if (app.isValid()) {
    //console.log("ensureAppValid: valid");
    proc.emit("validated", proc, app, next);
  } else {
    //console.log("ensureAppValid: invalid");
    proc.emit("invalid", proc, app.validationMessage(), next);
  }
};

//find the next mission
const findNextMission = (proc, app, next) => {
  //stub this out for now
  app.mission = {
    commander: null,
    pilot: null,
    MAVPilot: null,
    passengers: []
  };

  //console.log("findNextMission");
  proc.emit("mission-selected", proc, app, next);
};
//make sure the role selected is available
const rolesAvailable = (proc, app, next) => {
  //we have no concept of role selection just yet
  //TODO: WHAT about a role? Need more info
  //console.log("rolesAvailable");
  proc.emit("role-available", proc, app, next);
};

//make sure height/weight/age is right for the role selected
const ensureRoleCompatible = (proc, app, next) => {
  //console.log("ensureRoleCompatible");
  proc.emit("role-compatible", proc, app, next);
};
//accept the app with a message
const acceptApplication = (proc, app, next) => {
  //console.log("acceptApplication");
  next(null, { success: true, message: "Welcome to the Mars Program!" });
};

//deny the app with a message
const denyApplication = (proc, message, next) => {
  //console.log("denyApplication");
  next(null, { success: false, message });
};

class ReviewProcess extends Emitter {
  constructor() {
    super();
    this.on("application-received", ensureAppValid);
    this.on("validated", findNextMission);
    this.on("mission-selected", rolesAvailable);
    this.on("role-available", ensureRoleCompatible);
    this.on("role-compatible", acceptApplication);

    this.on("invalid", denyApplication);
  }

  processApplication(app, next) {
    //console.log("processApplication");
    //console.log(next);
    this.emit("application-received", this, app, next);
  }
}

module.exports = ReviewProcess;
