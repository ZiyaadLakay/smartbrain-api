//Register Function
const handleRegister = (req,res,db,bcrypt) => {
    const {email, name, password} = req.body;
    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission')
    }
    const hash = bcrypt.hashSync(password, 10);
    console.log('break')
        db.transaction(trx => {
            trx.insert({
                hash:hash,
                email:email
            }, 'email')
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email:loginEmail[0],
                        name:name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('unable to register',err))
}
//End of Register Function

module.exports = {
    handleRegister: handleRegister
}