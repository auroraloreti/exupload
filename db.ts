DROP TABLE IF EXISTS planets;

CREATE TABLE planets(
  id SERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL
);




INSERT INTO planets (name) VALUES ('Earth');
INSERT INTO planets (name) VALUES ('Mars');



const pgp = require('pg-promise')();

const cn = {
  host: 'localhost', 
  port: 5432,        
  database: 'planets_db', 
  user: 'postgres',     
  password: '%Tucano01'  
};

const db = pgp(cn);

module.exports = db;


//GET /planets

router.get('/planets', async (req, res) => {
    try {
      const planets = await db.any('SELECT * FROM planets');
      res.json(planets);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  //GET /PLANETS:ID
  router.get('/planets/:id', async (req, res) => {
    try {
      const planet = await db.one('SELECT * FROM planets WHERE id = $1', [req.params.id]);
      res.json(planet);
    } catch (err) {
      console.error(err);
      if (err.message === 'No data returned from the query.') {
        res.status(404).json({ error: 'Planet not found' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });

//   POST /planets

router.post('/planets', async (req, res) => {
    try {
      await db.none('INSERT INTO planets (name) VALUES ($1)', [req.body.name]);
      res.status(201).json({ message: 'Planet created' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

//   PUT /planets/:id

router.put('/planets/:id', async (req, res) => {
    try {
      await db.none('UPDATE planets SET name = $1 WHERE id = $2', [req.body.name, req.params.id]);
      res.json({ message: 'Planet updated' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

//   DELETE /planets/:id

router.delete('/planets/:id', async (req, res) => {
    try {
      await db.none('DELETE FROM planets WHERE id = $1', [req.params.id]);
      res.json({ message: 'Planet deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const createImage = async (req:request, res:response) => {
    console.log(req.file)
    const { id } = req.params
    const fileName = req.file.path

    if (fileName) {
      db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName])
      res.status(201).json({msg: "planet image uploaded succesfully"})
    } else {
      req.status(400).json({error: "planet image failed upload"})
    }
    
  }

  export {createImage} 