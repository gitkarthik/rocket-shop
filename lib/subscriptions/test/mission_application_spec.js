let assert = require("assert");

let MembershipApplication = require("../models/membership_applicaton");

describe("Membership application requirements", () => {
  let validApp;

  before(() => {
    validApp = new MembershipApplication({
      first: "karthik",
      last: "kanda",
      age: 44,
      height: 72,
      weight: 220,
      email: "kart@kand.com"
    });
  });

  describe("Application valid if...", () => {
    it("all validators successful", () => {
      assert(validApp.isValid(), "application is not valid");
    });
  });

  describe("Application invalid if...", () => {
    it("expired", () => {
      let application = new MembershipApplication({
        validUntil: Date.parse("01/01/2010")
      });
      assert(application.expired(), "application is not expired");
    });

    it("email is omitted ", () => {
      let application = new MembershipApplication();
      assert(!application.emailIsValid(), "email is valid");
    });
    it("email is less than 4 chars ", () => {
      let application = new MembershipApplication({ email: "d@d" });
      assert(!application.emailIsValid(), "email is valid");
    });
    it("email does contains @ ", () => {
      let application = new MembershipApplication({
        email: "thing&thing*.com"
      });
      assert(!application.emailIsValid());
    });

    it("age is omitted", () => {
      let application = new MembershipApplication();
      assert(!application.ageIsValid(), "age is valid");
    });
    it("age is less than 15", () => {
      let application = new MembershipApplication({ age: "14" });
      assert(!application.ageIsValid(), "age is valid");
    });
    it("age is greater than 100", () => {
      let application = new MembershipApplication({ age: "101" });
      assert(!application.ageIsValid(), "age is valid");
    });

    it("height is omitted", () => {
      let application = new MembershipApplication();
      assert(!application.heightIsValid(), "height is valid");
    });
    it("height is less than 60", () => {
      let application = new MembershipApplication({ height: 59 });
      assert(!application.heightIsValid(), "height is valid");
    });
    it("height is above 75", () => {
      let application = new MembershipApplication({ height: 76 });
      assert(!application.heightIsValid(), "height is valid");
    });

    it("weight is omitted", () => {
      let application = new MembershipApplication();
      assert(!application.weightIsValid(), "weight is valid");
    });
    it("weight is less than 100 ", () => {
      let application = new MembershipApplication({ weight: 99 });
      assert(!application.weightIsValid(), "weight is valid");
    });
    it("weight is more than 300 ", () => {
      let application = new MembershipApplication({ weight: 301 });
      assert(!application.weightIsValid(), "weight is valid");
    });

    it("first name is omitted", () => {
      let application = new MembershipApplication({ last: "asdf" });
      assert(!application.nameIsValid(), "name is valid");
    });
    it("last name is not provided", () => {
      let application = new MembershipApplication({ first: "123" });
      assert(!application.nameIsValid(), "name is valid");
    });
    it("first name is blank", () => {
      let application = new MembershipApplication({ first: "", last: "asdf" });
      assert(!application.nameIsValid(), "name is valid");
    });
    it("last name is blank", () => {
      let application = new MembershipApplication({ first: "asdf", last: "" });
      assert(!application.nameIsValid(), "name is valid");
    });
  });
});
