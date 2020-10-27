var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var models = require('./models');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: true,
    passReqToCallback: true,
  }, (req, username, password, done) => {
    models.member.findOne({ where: { username: username } })
    .then(member => {
      if (!member ) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!member.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, member);
    })
    .catch(err => {
      if (err) {
        return done(err);
      }
    });
  }
));

passport.serializeUser((member, done) => {
  done(null, member);
});

passport.deserializeUser((member, done) => {
  models.member.findByPk(member.member_id)
  .then(member => {
    done(null, member);
  })
  .catch(err => {
    done(err, member);
  });
});

module.exports = passport;
