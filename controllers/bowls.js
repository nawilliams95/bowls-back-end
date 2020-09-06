const express = require('express');
const BowlRouter = express.Router();
const Bowl = require('../models/Bowls');


////////////////////////////
// INDEX
////////////////////////////

BowlRouter.get('/', (req, res) => {
    Bowl.find({}, (error, allBowls) => {
        error ?
        res.status(404).json(error):
        res.status(200).json(allBowls)
    });
});

////////////////////////////
// Delete
////////////////////////////

BowlRouter.delete('/:id', (req, res) => {
    Bowl.findByIdAndRemove(req.params.id, (error, bowl) => {
      error ?
      res.status(404).json(error):
      res.status(200).json(bowl)
    });
});

////////////////////////////
// Update
////////////////////////////

BowlRouter.put('/:id', (req, res) => {
    Bowl.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedBowl) => {
      error ?
      res.status(404).json(error):
      res.status(200).json(updatedBowl)
    });
});

////////////////////////////
// Create
////////////////////////////

BowlRouter.post('/', (req, res) => {
   Bowl.create(req.body, (error, createdBowl) => {
        error ?
        res.status(404).json(error):
        res.status(200).json(createdBowl)
    });
});

////////////////////////////
// Show
////////////////////////////

BowlRouter.get('/:id', (req, res) => {
    Bowl.findById(req.params.id, (error, foundBowl) => {
        error ?
        res.status(404).json(error):
      res.status(200).json(foundBowl)
    });
});





module.exports = BowlRouter
