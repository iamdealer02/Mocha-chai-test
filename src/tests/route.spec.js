const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");
const request = require("supertest");
const sandbox = sinon.createSandbox();
let app = rewire("../app");
const healthCheckController = require("../controllers/health.controller");
const noteController = require("../controllers/note.controller");


describe("Testing express app routes", () => {
    afterEach(() => {
        app = rewire("../app");
        sandbox.restore();
    
        
    });
    describe("GET /health", () => {
        beforeEach(() => {
          sandbox.stub(healthCheckController, "healthCheckSync").returns("OK");
          sandbox.stub(healthCheckController, "healthCheckAsync").resolves("OK");
        });
    
        it("/sync should succeed", (done) => {
          request(app)
            .get("/health/sync")
            .expect(200)
            .end((err, response) => {
              expect(response.body).to.have.property("health").to.equal("OK");
              done(err);
            });
        });
    
        it("/async should succeed", (done) => {
          request(app)
            .get("/health/async")
            .expect(200)
            .end((err, response) => {
              expect(response.body).to.have.property("health").to.equal("OK");
              done(err);
            });
        });
      });
    describe("Testing /note routes", () => {
        let sampleNoteValue;

        beforeEach(() => {
            sampleNoteValue = {
                title: "Test Title",
                content: "Test Content"
            };
        
            sandbox.stub(noteController, "create").resolves(sampleNoteValue);
            sandbox.stub(noteController, "findAll").resolves([sampleNoteValue]);
            sandbox.stub(noteController, "findOne").resolves(sampleNoteValue);
            sandbox.stub(noteController, "update").resolves(sampleNoteValue);
            sandbox.stub(noteController, "delete").resolves(sampleNoteValue);

        });

        it("GET all /notes", (done)=>{
            request(app)
            .get('/notes')
            .expect(200)
            .end((err, res)=>{
                expect(res.body)
                .to.be.an('object');
                expect(res.body).
                to.have.property('message')
                .to.equal('Notes fetched successfully');
                expect(res.body)
                .to.have.property('notes')
                .to.be.an('array');
                expect(res.body.notes)
                .to.have.lengthOf(1);
                // equal to noteValue
                expect(res.body)
                .to.have.property('notes')
                // first array element
                .to.have.property('0')
                .to.have.property('title')
                .to.equal(sampleNoteValue.title);
                
                expect(res.body)
                .to.have.property('notes')
                .to.have.property('0')
                .to.have.property('content')
                .to.equal(sampleNoteValue.content);
                done();
            })
        })

        it(" POST /notes", (done)=>{
            request(app)
            .post('/notes')
            .send(sampleNoteValue)
            .expect(200)
            .end((err, res)=>{
                expect(res.body)
                .to.be.an('object');
                expect(res.body)
                .to.have.property('message')
                .to.equal('Note created successfully');
                expect(res.body)
                .to.have.property('note')
                .to.be.an('object');
                expect(res.body)
                .to.have.property('note')
                .to.have.property('title')
                .to.equal(sampleNoteValue.title);
                expect(res.body)
                .to.have.property('note')
                .to.have.property('content')
                .to.equal(sampleNoteValue.content);
                done();
            })

        })
        it("GET /notes/:id", (done)=>{
            request(app)
            .get('/notes/1')
            .expect(200)
            .end((err, res)=>{
                expect(res.body)
                .to.be.an('object');
                expect(res.body)
                .to.have.property('message')
                .to.equal('Note fetched successfully');
                expect(res.body)
                .to.have.property('note')
                .to.be.an('object');
                expect(res.body)
                .to.have.property('note')
                .to.have.property('title')
                .to.equal(sampleNoteValue.title);
                expect(res.body)
                .to.have.property('note')
                .to.have.property('content')
                .to.equal(sampleNoteValue.content);
                done();
            })
        })
        it("PUT /notes/:id", (done)=>{
            request(app)
            .put('/notes/1')
            .send(sampleNoteValue)
            .expect(200)
            .end((err, res)=>{
                expect(res.body)
                .to.be.an('object');
                expect(res.body)
                .to.have.property('message')
                .to.equal('Note updated successfully');
                expect(res.body)
                .to.have.property('note')
                .to.be.an('object');
                expect(res.body)
                .to.have.property('note')
                .to.have.property('title')
                .to.equal(sampleNoteValue.title);
                expect(res.body)
                .to.have.property('note')
                .to.have.property('content')
                .to.equal(sampleNoteValue.content);
                done();
            })
        })
        it("DELETE /notes/:id", (done)=>{
            request(app)
            .delete('/notes/1')
            .expect(200)
            .end((err, res)=>{
                expect(res.body)
                .to.be.an('object');
                expect(res.body)
                .to.have.property('message')
                .to.equal('Note deleted successfully');
                done();
            })
        })

    });
});