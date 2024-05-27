const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const mongoose = require("mongoose");
const rewire = require("rewire");
const sandbox = sinon.createSandbox();

let noteController = rewire("../controllers/note.controller");

describe(" Testing /note endpoint", () => {
    let sampleNoteValue;
    let sampleNoteValue2;
    let FindStub;
    
    beforeEach(()=>{
        sampleNoteValue = {
            title: "Test Title",
            content: "Test Content"
        };
        sampleNoteValue2 = {
            title: "Test Title 2",
            content: "Test Content 2"
        };
        FindStub = sandbox.stub(mongoose.Model, "find")
        .resolves([sampleNoteValue, sampleNoteValue2]);
    });
    afterEach(()=>{
        noteController = rewire("../controllers/note.controller");
        sandbox.restore();
    });

    describe(" GET findALL ", ()=> {
        it("should return all notes", async () => {
            noteController.findAll().then((note)=>{
                expect(note).to.be.an("array");
                expect(note).to.have.lengthOf(2);
                console.log(note);
                // 1st in the araay
                expect(note[0]).to.equal(sampleNoteValue);
                // 2nd in the array
                expect(note[1]).to.equal(sampleNoteValue2);

            })
            .catch((err)=>{
                throw new Error(err);
            });

        });

    })

    describe("Get a single note /:id", () => {
        let FindOneStub;
        beforeEach(()=>{
            FindOneStub = sandbox.stub(mongoose.Model, "findById")
            .resolves(sampleNoteValue);
        });
        
        it("should return error when called without note id ", async()=>{
            noteController.findOne().then(()=>{
                throw new Error("Unexpected success");
            })
            .catch((err)=>{
                expect(err.message).to.equal("Note id is required");
            });
        })
        it("should succeed when called with note id", async()=>{
            noteController.findOne("123").then((note)=>{
                expect(FindOneStub).to.have.been.calledOnce;
                expect(note).to.be.an("object");
                expect(note).to.have.property("title", sampleNoteValue.title);
                expect(note).to.have.property("content", sampleNoteValue.content);
                expect(note).to.equal(sampleNoteValue);
            })
            .catch((err)=>{
                throw new Error(err);
            });

        })
        afterEach(()=>{
            noteController = rewire("../controllers/note.controller");
            sandbox.restore();
        });

    });

    describe("PUT /:id", () => {
        let FindByIdAndUpdateStub;
        beforeEach(()=>{
            FindByIdAndUpdateStub = sandbox.stub(mongoose.Model, "findByIdAndUpdate")
            .resolves(sampleNoteValue);
        });
        it("should return error when called without note id", async()=>{
            noteController.update().then(()=>{
                throw new Error("Unexpected success");
            })
            .catch((err)=>{
                expect(err.message).to.equal("Note id is required");
            });
        });
        it("should succeed when called with note id", async()=>{
            noteController.update("123", sampleNoteValue).then((note)=>{
                expect(FindByIdAndUpdateStub).to.have.been.calledOnce;
                expect(note).to.be.an("object");
                expect(note).to.have.property("title", sampleNoteValue.title);
                expect(note).to.have.property("content", sampleNoteValue.content);
                expect(note).to.equal(sampleNoteValue);
            })
            .catch((err)=>{
                throw new Error(err);
            });
        });
        afterEach(()=>{
            noteController = rewire("../controllers/note.controller");
            sandbox.restore();
        });

    });
    describe("delete /:id", () => {
        let FindByIdAndDeleteStub;
        beforeEach(()=>{
            FindByIdAndDeleteStub = sandbox.stub(mongoose.Model, "findByIdAndDelete")
            .resolves(sampleNoteValue);
        });
        it("should return error when called without note id", async()=>{
            noteController.delete().then(()=>{
                throw new Error("Unexpected success");
            })
            .catch((err)=>{
                expect(err.message).to.equal("Note id is required");
            });
        });
        it("should succeed when called with note id", async()=>{
            noteController.delete("123").then((note)=>{
                expect(FindByIdAndDeleteStub).to.have.been.calledOnce;
                expect(note).to.be.an("object");
                expect(note).to.have.property("title", sampleNoteValue.title);
                expect(note).to.have.property("content", sampleNoteValue.content);
                expect(note).to.equal(sampleNoteValue);
            })
            .catch((err)=>{
                throw new Error(err);
            });
        });
        afterEach(()=>{
            noteController = rewire("../controllers/note.controller");
            sandbox.restore();
        });
    });
});