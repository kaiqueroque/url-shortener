const router = require('express').Router();
const Shortened = require('../models/shortened');

//Create an shortened URL
router.post('/shorten', async (req, res) => {

    const { longUrl, shortUrl } = req.body;

    if(!longUrl || !shortUrl) {
        res.status(422).json({ error: 'longUrl e shortUrl são obrigatórias' });
        return
    }
    
    const clicks = 0

    await Shortened.create({
        shortUrl,
        longUrl,
        clicks
    }).then(() => {

        console.log("Link encurtado com sucesso");
        res.status(201).json({ message: "Link encurtado com sucesso" });

    }).catch((err) => {

        console.log(err);
        res.status(500).json({error: err});

    })

});

//Get all shorteneds URLs
router.get('/shorten', async (req, res) => {
    try {
        const shorteneds = await Shortened.findAll();
        res.status(200).json(shorteneds)
    }catch (err) { 
        res.status(500).json({ error: err })
    }
});

//Get an shortened URL by id
router.get('/shorten/:shortUrl', async (req, res) => {
    const sh = req.params.shortUrl
    try {
        const shortened = await Shortened.findAll({
            where: {
                shortUrl: sh.toString()
            }
        });
        
        if(!shortened) {
            res.status(422).json({ message: 'O link encurtado não foi encontrado' })
        }

        res.status(200).json(shortened);

    }catch (err) { 
        res.status(500).json({ error: err })
    }
});

//Upadate an shortened URL by id
router.patch('/shorten/:id', async (req, res) => {
    
    const id = req.params.id;
    
    const { longUrl, shortUrl } = req.body;

    const shortened = {
        longUrl,
        shortUrl
    }
    
    try {
        const updateShortened = await Shortened.findByPk(id)
        
        if(!updateShortened) {
            res.status(422).json({ message: 'O shortUrl não foi encontrado para atualizar' });
            return
        }

        updateShortened.update(shortened);

        res.status(200).json(shortened)
    } catch (error) {
        res.status(500).json({ error: error })
    }
});

//Delete an shortened URL by id
router.delete('/shorten/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const toDeleteShortened = await Shortened.findByPk(id)
        
        if(!toDeleteShortened) {
            res.status(422).json({ message: 'O shortUrl não foi encontrado ser excluído' });
            return
        }

        await toDeleteShortened.destroy()
        res.status(200).json({ message: "URL excluída com sucesso" })

    } catch (error) {
        res.status(500).json({ error: error })
    }
});

//Redirecting an shortened URL to a long URL
router.get('/:id', async (req, res) => {
    const shortUrl = req.params.id
    
    try {
        const toRedirect = await Shortened.findOne({
            where: {
                shortUrl
            }
        })
    
        if(!toRedirect) {
            res.status(422).json({ message: 'O shortUrl não foi encontrado' });
            return
        }
        console.log("OK");
        toRedirect.update({clicks: toRedirect.clicks+1})
        
        res.redirect(toRedirect.longUrl)

    }catch (error) {
        res.status(500).json({ error: error })
    }
});

module.exports = router;