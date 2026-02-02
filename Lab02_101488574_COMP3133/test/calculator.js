//Name: Gustavo Miranda
//Student ID: 101488574 

const { expect } = require("chai");
const calculator = require("../app/calculator");

describe("Calculator", () => {
  describe("add", () => {
    it("add(5, 2) expected result 7 PASS", () => {
      expect(calculator.add(5, 2)).to.equal(7);
    });

    it("add(5, 2) expected result 8 FAIL", () => {
      expect(calculator.add(5, 2)).to.equal(8);
    });
  });

  describe("sub", () => {
    it("sub(5, 2) expected result 3 PASS", () => {
      expect(calculator.sub(5, 2)).to.equal(3);
    });

    it("sub(5, 2) expected result 5 FAIL", () => {
      expect(calculator.sub(5, 2)).to.equal(5);
    });
  });

  describe("mul", () => {
    it("mul(5, 2) expected result 10 PASS", () => {
      expect(calculator.mul(5, 2)).to.equal(10);
    });

    it("mul(5, 2) expected result 12 FAIL", () => {
      expect(calculator.mul(5, 2)).to.equal(12);
    });
  });

  describe("div", () => {
    it("div(10, 2) expected result 5 PASS", () => {
      expect(calculator.div(10, 2)).to.equal(5);
    });

    it("div(10, 2) expected result 2 FAIL", () => {
      expect(calculator.div(10, 2)).to.equal(2);
    });
  });
});
