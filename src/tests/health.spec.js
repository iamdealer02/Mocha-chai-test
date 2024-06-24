const chai = require("chai");
const expect = chai.expect;
const {
    healthCheckSync,
    healthCheckAsync,
} = require("../controllers/health.controller");

describe("Test /health", () => {
    describe("Health check on /sync", () =>{
        it("health should be okay", () => {
            const actualResult = healthCheckSync();
            expect(actualResult).to.equal("OK");
        })
    })
})

