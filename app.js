import express from 'express';
import session from 'express-session';
import lodash from 'lodash';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import ViteExpress from 'vite-express';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

const MOST_LIKED_FOSSILS = {
  aust: {
    img: '/img/australopith.png',
    name: 'Australopithecus',
    num_likes: 584,
  },
  quetz: {
    img: '/img/quetzal_torso.png',
    name: 'Quetzal',
    num_likes: 587,
  },
  steg: {
    img: '/img/stego_skull.png',
    name: 'Stegosaurus',
    num_likes: 598,
  },
  trex: {
    img: '/img/trex_skull.png',
    name: 'Tyrannosaurus Rex',
    num_likes: 601,
  },
};

const OTHER_FOSSILS = [
  {
    img: '/img/ammonite.png',
    name: 'Ammonite',
  },
  {
    img: '/img/mammoth_skull.png',
    name: 'Mammoth',
  },
  {
    img: '/img/ophthalmo_skull.png',
    name: 'Opthalmosaurus',
  },
  {
    img: '/img/tricera_skull.png',
    name: 'Triceratops',
  },
];

// TODO: Replace this comment with your code
app.get('/', (req, res) => {
  const isInSess = req.session.name
  if (isInSess) {
    res.redirect("/top-fossils")
  } else {
    res.render('homepage.html.njk')
  }
})

app.get('/top-fossils', (req, res) => {
  const sessName = req.session.name
  if (sessName) {
    res.render("top-fossils.html.njk", { fossils: Object.values(MOST_LIKED_FOSSILS), sessName });
  } else {
    res.redirect('/')
  }
});


app.get('/get-name', (req, res) => {
  const name = req.query.name
  if (name) {
    req.session.name = name
    res.redirect('/top-fossils')
  }
}
);

// my code above
app.get('/random-fossil.json', (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});

app.post('/like-fossil', (req, res) => {
  // Gets the fossil that was liked from the form.
  const fossilSelect = req.body.fossil;
  // Increases its num_likes count in the MOST_LIKED_FOSSILS object
  if (fossilSelect === MOST_LIKED_FOSSILS[fossilSelect]) {
    MOST_LIKED_FOSSILS[fossilSelect].num_likes++
  }
  // Renders the template thank - you.html.njk.This template should thank the user — so, if it was Indiana Jones, it should say Thank you, Indiana Jones.The template should also have a link back to the / top - fossils page.
  res.render('thank-you.html.njk', { name: req.session.name })
})

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});

