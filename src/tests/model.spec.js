const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');



var Note = require('../models/note.model');

describe('Note Model Test', () => {
    let sampleNoteValue;
    beforeEach(() => {
        sampleNoteValue = {
          
        };
    });
    
    // missing fields
    it('it should throw an error due to missing fields', (done) => {
        console.log('Starting test case...');
      
        const note = new Note();
        note.validate((err) => {
            console.log('Validation completed...');
            if (err) {
                console.log('Error occurred:', err);
                done(); // Call done() to signal the completion of the test
            } else {
                console.log('No error occurred, unexpected behavior...');
                done(new Error('Expected error did not occur')); // Call done() with an error if validation succeeds unexpectedly
            }
        });
    });
    
    it('should create a new note with correct params',  (done) => {
        console.log('inside 2');
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