let assert = require("assert");
let sinon = require("sinon");

let MembershipApplication = require("../models/membership_applicaton");
let ReviewProcess = require("../processes/review");

describe("The Review Process", () => {
  describe("Receiving a valid application", () => {
    let decision;

    let validApp = new MembershipApplication({
      first: "karthik",
      last: "kanda",
      age: 44,
      height: 72,
      weight: 220,
      email: "kart@kand.com"
    });

    let review = new ReviewProcess();
    let spy = sinon.spy(validApp, "emailIsValid");

    let spy2 = sinon.spy();

    before(done => {
      review.on("validated", spy2);
      review.processApplication(validApp, function(err, result) {
        decision = result;
        done();
      });
    });

    it("returns success", function() {
      assert(decision.success, decision.message);
    });

    it("validates email", function() {
      //assert(spy.called);
      assert(validApp.emailIsValid.called);
    });

    it("ensures the application is valid", function() {
      assert(spy2.called);
    });
  });

  describe("Receiving an invalid application", () => {
    let validApp;
    let decision;

    before(done => {
      validApp = new MembershipApplication({
        first: "karthik",
        last: "kanda",
        age: 44,
        height: 90, //Too tall for the mission
        weight: 220,
        email: "kart@kand.com"
      });

      let review = new ReviewProcess();
      review.processApplication(validApp, function(err, result) {
        decision = result;
        done();
      });
    });

    it("returns false", function() {
      assert(!decision.success, decision.message);
      console.log(decision.message);
    });
  });
});
