const router = require('express').Router();
const Shortened = require('../models/Shortened');

router.post('/shorten', async (req, res) => {
  const { id, longUrl, shortUrl } = req.body;
  
  if(!longUrl || !shortUrl) {
    res.status(422).json({ error: 'longUrl e shortUrl são obrigatórios' });
    return
  }

  const shortened = {
    _id: id,
    longUrl,
    shortUrl,
    clicks: 0,
  }

  try {
    await Shortened.create(shortened)
    res.status(201).json({ message: 'Link encurtado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
});

router.get('/shorten', async (req, res) => {
  try {
    const shorteneds = await Shortened.find();
    res.status(200).json({shorteneds})
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/shorten/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const shortened = await Shortened.findOne({ _id: id });

    if(!shortened) {
      res.status(422).json({ message: 'O link não foi encontrado' })
      return
    }
    
    res.status(200).json(shortened)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.patch('/shorten/:id', async (req, res) => {
  const id = req.params.id;
  const { longUrl, shortUrl } = req.body;

  const shortened = {
    id,
    longUrl,
    shortUrl,
  }

  try {
    const updateShortened = await Shortened.updateOne({_id: id}, shortened)

    if(updateShortened.matchedCount === 0) {
      res.status(422).json({ message: 'O link não foi encontrado para atualizar' });
      return
    }

    res.status(200).json(shortened)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.delete('/shorten/:id', async (req, res) => {
  const id = req.params.id;
  const shortened = await Shortened.findOne({ _id: id });

  if (!shortened) {
    res.status(422).json({ message: 'O link informado não foi encontrado para deleção' });
    return
  }

  try {
    await Shortened.deleteOne({ _id: id });
    res.status(200).json({ message: 'O link foi deletado com sucesso' })
    
  } catch (error) {
    res.status(500).json({ error: error })
  }

})

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const shortened = await Shortened.findOne({ _id: id });

    if (!shortened) {
      res.status(422).json({ message: 'Link não encontrado' })
      return
    }
    
    const redirect = shortened.longUrl;
    res.redirect(redirect)
    
    res.status(200)
  } catch (error) {
    res.status(500).json({ error: error });
  }
})

// router.get('/test/:id', async (req, res) => {}) //Rota para testes 

module.exports = router;