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

    let review = new ReviewProcess(validApp);
    sinon.spy(review, "processApplication");
    sinon.spy(validApp, "isValid");

    before(function(done) {
      review
        .processApplication()
        .then(data => {
          //console.log(data);
          decision = data;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it("returns success", function() {
      assert(decision.success);
    });

    it("application isValid called", function() {
      assert(validApp.isValid.called);
    });

    it("ensures the processApplication is called", function() {
      assert(review.processApplication.called);
    });
  });
});
