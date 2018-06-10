const express = require('express');
const lunch = require('lunch');
const router = express.Router();

const providers = lunch.getAllProviders();

router.get('/', async (req, res, next) => {
  try {
    res.render('index', { 
      title: 'Lunch',
      providers 
    });
  } catch(err) {
    next()
  }
});

router.get('/:restaurant', async (req, res) => {
  try {
    const { restaurant } = req.params;
    const provider = await lunch.getProvider(restaurant);
    const result = await provider();

    res.render('menu', {
      providers,
      currentUrl: '/' + restaurant,
      table: Array.isArray(result),
      title: provider.display,
      menu: result
    });
  } catch(err) {
    res.redirect('/');   
  }
});

module.exports = router;
