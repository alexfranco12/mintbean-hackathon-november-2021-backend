var express = require('express')
const router = new express.Router()

/* 
* ROOT ROUTES 
*/

// redirect to contestant catalog
router.get("/", (req, res) => {
  res.send({
      status: '200'
    });
});

module.exports = router;