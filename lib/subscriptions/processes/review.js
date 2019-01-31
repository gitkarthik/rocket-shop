//make sure the application is valid
const ensureAppValid = app => {
  console.log("Inside ensureAppValid");
  return new Promise((resolve, reject) => {
    if (app.isValid()) {
      //console.log("ensureAppValid: valid");
      resolve("Application is valid");
    } else {
      reject(app.validationMessage());
    }
  });
};

//find the next mission
const findNextMission = app => {
  console.log("Inside findNextMission");
  return new Promise((resolve, reject) => {
    //stub this out for now
    app.mission = {
      commander: null,
      pilot: null,
      MAVPilot: null,
      passengers: []
    };

    resolve(true);
  });

  //console.log("findNextMission");
};

//make sure the role selected is available
const rolesAvailable = app => {
  console.log("Inside rolesAvailable");
  //we have no concept of role selection just yet
  //TODO: WHAT about a role? Need more info
  //console.log("rolesAvailable");

  return new Promise((resolve, reject) => {
    resolve(true);
  });
};

//make sure height/weight/age is right for the role selected
const ensureRoleCompatible = app => {
  console.log("Inside ensureRoleCompatible");
  //console.log("ensureRoleCompatible");
  return new Promise((resolve, reject) => {
    resolve(true);
  });
};

class ReviewProcess {
  constructor(app) {
    this.app = app || {};
  }

  processApplication() {
    //console.log("processApplication");
    //console.log(callback);

    //console.log(this.app);

    return ensureAppValid(this.app)
      .then(() => {
        console.log("1");
        return findNextMission(this.app);
      })
      .then(() => {
        console.log("2");
        return rolesAvailable(this.app);
      })
      .then(() => {
        console.log("3");
        return ensureRoleCompatible(this.app);
      })
      .then(() => {
        console.log(4);

        return Promise.resolve({
          success: true,
          message: "Welcome to the Mars Program!"
        });
      })
      .catch(err => {
        return Promise.resolve({ success: false, message: err });
      });
  }
}

module.exports = ReviewProcess;
