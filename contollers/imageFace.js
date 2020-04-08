const Clarifai = require('clarifai');
//Api Key for machine learning
const app = new Clarifai.App({
    apiKey: 'c7010f81b0a64e698924c1a6a511d44a'
   });

const handleApiCall = (req, res) => {

    if(req.body.call === 'Face'){
        app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with api',err))
    }
    else{
        app.models
        .predict(Clarifai.CELEBRITY_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with api',err))
    }
    
}

const handleImage = (req,res,db) => {
    const {id} = req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to increment'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}