const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const ValidationError = mongoose.Error.ValidationError;


var Note = require('../models/note.model');

describe('Note Model Test', () => {
    let sampleNoteValue;
    beforeEach(() => {
        sampleNoteValue = {
            content: "Test Content"
        };
    });
    
    // missing fields
    it('it should throw an error due to missing fields',  (done) => {
        const note = new Note();
        note.validate((err) => {
            expect(err.errors.title).to.exist;
            expect(err.errors.content).to.exist;
            done();
        });
    });
    it('should create a new note with correct params',  (done) => {
        const note = new Note({
            ...sampleNoteValue,
            title: 'Test Title'
        });
        note.validate((err) => {
            if(err){
                const unexpectedError = new Error('⚠️ Unexpected error!');
                done(unexpectedError);
            }else{
                expect(note).to.be.an('object');
                expect(note).to.have.property('title', 'Test Title');
                expect(note.title).to.equal('Test Title');
                done();
            }
    });
    
    });

});