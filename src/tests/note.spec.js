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
        it("should return all notes",  (done) => {
            noteController.findAll().then((note)=>{
                expect(note).to.be.an("array");
                expect(note).to.have.lengthOf(2);
           
                // 1st in the araay
                expect(note[0]).to.equal(sampleNoteValue);
                // 2nd in the array
                expect(note[1]).to.equal(sampleNoteValue2);
                done();

            })
            .catch((err)=>{
                const error = new Error("Unexpected error");
                done(error);
            });

        });

    })
    describe("POST /", () => {
        let saveStub;
        let noteModelStub;
        beforeEach(()=>{
            saveStub = sandbox.stub().returns(sampleNoteValue);
            noteModelStub = sandbox.stub().returns({
              save: saveStub
            });
      
            noteController.__set__('Note', noteModelStub);      
        }
        );
        it("should return error when called without note object", (done) => {
            noteController.create().then(()=>{
                const error = new Error("Unexpected success");
                done(error);
            })
            .catch((err)=>{
                expect(err.message).to.equal("Title and content are required");
                done();
            });
        });
        it("should return error when called without title and content", (done) => {
            noteController.create({}).then(()=>{
                const error = new Error("Unexpected success");
                done(error);
            })
            .catch((err)=>{
                expect(err.message).to.equal("Title and content are required");
                done();
            });
        }
        );
        it("should succeed when called with title and content", (done) => {
            noteController.create(sampleNoteValue).then((note)=>{
                
              
                expect(noteModelStub).to.have.been.calledWith(sampleNoteValue);
                expect(noteModelStub).to.have.been.calledWithNew;
                expect(saveStub).to.have.been;
                expect(note).to.be.an("object");
                expect(note).to.have.property("title", sampleNoteValue.title);
                expect(note).to.have.property("content", sampleNoteValue.content);
                done();
            })
            .catch((err)=>{
              
                const error = new Error("Unexpected error");
                done(error);
            });
        });
    });

    describe("Get a single note /:id", () => {
        let FindOneStub;
        beforeEach(()=>{
            FindOneStub = sandbox.stub(mongoose.Model, "findById")
            .resolves(sampleNoteValue);
        });
        
        it("should return error when called without note id ", (done)=>{
            noteController.findOne().then(()=>{
                const error = new Error("Unexpected success");
                done(error);
               
            })
            .catch((err)=>{
                const error = new Error("Note id is required");
                expect(err.message).to.equal(error.message);
                done();
            });
        })
        it("should succeed when called with note id", (done)=>{
            noteController.findOne("123").then((note)=>{
                expect(FindOneStub).to.have.been.calledOnce;
                expect(note).to.be.an("object");
                expect(note).to.have.property("title", sampleNoteValue.title);
                expect(note).to.have.property("content", sampleNoteValue.content);
                expect(note).to.equal(sampleNoteValue);
                done();
            })
            .catch((err)=>{
                const error = new Error("Unexpected error");
                done(error);
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

        it("should return error when called without note id", (done) =>{
            noteController.update(id=undefined,noteObj=sampleNoteValue).then(()=>{
                const error = new Error("Unexpected success");
                done(error);
            })
            .catch((err)=>{
            
                expect(err.message).to.equal('Note id is required');
                done();
            });
        });
        // it should give an error when called without updated note with title and content
        it("should return error when called without updated note with title and content", (done)=>{
            noteController.update("123").then(()=>{
                const error = new Error("Unexpected success");
                done(error);
            }
            )
            .catch((err)=>{
                expect(err.message).to.equal("Title and content are required");
                done();
            });
        });


        it("should succeed when called with note id and updatednote", (done)=>{
            noteController.update("123", sampleNoteValue).then((note)=>{
                expect(FindByIdAndUpdateStub).to.have.been.calledOnce;
                expect(note).to.be.an("object");
                expect(note).to.have.property("title", sampleNoteValue.title);
                expect(note).to.have.property("content", sampleNoteValue.content);
                expect(note).to.equal(sampleNoteValue);
                done();
            })
            .catch((err)=>{
                const error = new Error("Unexpected error");
                done(error);
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
        it("should return error when called without note id", (done)=>{
            noteController.delete().then(()=>{
                const error = new Error("Unexpected success");
                done(error);
            })
            .catch((err)=>{
                const error = new Error("Note id is required");
                expect(err.message).to.equal(error.message);
                done();
            });
        });
        it("should succeed when called with note id", (done)=>{
            noteController.delete("123").then((note)=>{
                expect(FindByIdAndDeleteStub).to.have.been.calledOnce;
                expect(note).to.be.an("object");
                expect(note).to.have.property("title", sampleNoteValue.title);
                expect(note).to.have.property("content", sampleNoteValue.content);
                expect(note).to.equal(sampleNoteValue);
                done();
            })
            .catch((err)=>{
                const error = new Error("Unexpected error");
                done(error);
            });
        });
        afterEach(()=>{
            noteController = rewire("../controllers/note.controller");
            sandbox.restore();
        });
    });
});