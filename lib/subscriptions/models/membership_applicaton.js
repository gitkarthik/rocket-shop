let moment = require("moment");

class MembershipApplication {
  constructor(obj) {
    let { first, last, age, height, weight, email, validUntil } = obj || {};

    this.first = first;
    this.last = last;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.email = email;
    this.validUntil = moment().add(10, "days"); //default to 10 days from now
    //console.log(this.validUntil);

    if (validUntil) {
      this.validUntil = moment(validUntil);
    }
  }

  expired() {
    return this.validUntil.isBefore(moment());
  }

  emailIsValid() {
    return this.email && this.email.length > 3 && this.email.indexOf("@") > -1;
  }

  ageIsValid() {
    return this.age && this.age > 15 && this.age < 100;
  }

  heightIsValid() {
    return this.height && this.height > 60 && this.height < 75;
  }

  weightIsValid() {
    return this.weight && this.weight > 100 && this.weight < 300;
  }

  nameIsValid() {
    return this.first && this.last;
  }

  validationMessage() {
    if (this.isValid()) return "Application is valid";
    if (this.expired()) return "Application is expired";
    if (!this.ageIsValid())
      return "Age is outside the limits of 15 and 100 years";
    if (!this.heightIsValid())
      return "Height is outside the limits of 60 and 75 inches";
    if (!this.weightIsValid())
      return "Weight is outside the limits of 100 and 300 pounds";
    if (!this.emailIsValid()) return "Valid email is required";
    if (!this.nameIsValid()) return "First and Last names are required";
  }
  isValid() {
    return (
      this.emailIsValid() &&
      this.ageIsValid() &&
      this.heightIsValid() &&
      this.weightIsValid() &&
      this.nameIsValid() &&
      !this.expired()
    );
  }
}

module.exports = MembershipApplication;
