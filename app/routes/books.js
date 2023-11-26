const express = require('express');
const router = express.Router();
const getBooks = require('../models/getBooks');

router.get('/findBook', async(req, res)=>
{
    try 
    {
        const query = req.query.search.toString();
        const books = await getBooks(query);
        res.status(200).json({books: books});
    } 
    catch (error) 
    {
        res.status(404).json({error: error.message});
    }
        
})

module.exports = router;