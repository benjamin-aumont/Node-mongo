const RestaurantsDAO = require('../utils/restaurantsDAO');
const express = require('express')
var router = express.Router();

  

  

  
// read all
router.get('/resto', async (req,res) => {
  const restaurantsDAO = new RestaurantsDAO()
  try {
    restaurantsDAO.findAll((err, result) => {
      res.render('restaurant.ejs',{todolist: result})
    })
  } catch (err) {
    console.log(err)
    throw err
  }
});

// read one
/*router.get('/resto/borough/:borough', async (req,res) => {
  const id = req.params.borough
  try {
      const docs = await db.collection('restaurants').find({"borough":id}).toArray()
      //res.status(200).json(docs)
      res.render('restaurant.ejs',{todolist: docs})
  } catch (err) {
      console.log(err)
      throw err
  }
})*/
//read by borough
router.get('/resto/borough/:borough', async (req,res) => {
  const restaurantsDAO = new RestaurantsDAO()
  const id = req.params.borough
  const borough = id
  try {
    restaurantsDAO.findByBorough(borough, (err, result) => {
      res.render('restaurant.ejs',{todolist: result})
    })
  } catch (err) {
    console.log(err)
    throw err
  }
});

//read by cuisine
router.get('/resto/cuisine/:cuisine', async (req,res) => {
  const restaurantsDAO = new RestaurantsDAO()
  const id = req.params.cuisine
  const cuisine = id
  try {
    restaurantsDAO.findByCuisine(cuisine, (err, result) => {
      console.log(result)
      res.render('restaurant.ejs',{todolist: result})
    })
  } catch (err) {
    console.log(err)
    throw err
  }
});

//read by cuisine
router.get('/resto', async (req,res) => {
  const restaurantsDAO = new RestaurantsDAO()
  const id = req.params.cuisine
  const cuisine = id
  try {
    restaurantsDAO.findByCuisine(cuisine, (err, result) => {
      console.log(result)
      res.render('restaurant.ejs',{restaurants: result})
    })
  } catch (err) {
    console.log(err)
    throw err
  }
});

router.put('/resto/:restaurant_id', (req,res) => {
  const id = req.params.restaurant_id
  let restaurants = restaurants.find(restaurants => restaurants.restaurant_id === id)
  restaurants.address = req.body.address,
  restaurants.coord = req.body.coord,
  restaurants.street = req.body.street,
  restaurants.zipcode = req.body.zipcode,
  restaurants.borough = req.body.borough,
  restaurants.cuisine = req.body.cuisine,
  restaurants.name = req.body.name,
  restaurants.restaurant_id = req.body.restaurant_id,
  res.status(200).json(restaurants)
});
  
// delete
router.delete('/resto/:restaurant_id', (req,res) => {
  const id = req.params.restaurant_id
  let restaurants = restaurants.find(restaurants => restaurants.restaurant_id === id)
  restaurants.splice(restaurants.indexOf(restaurants),1)
  res.status(200).json(restaurants)
});


//recherche par cuisine
router.get("/resto", (req,res)=>{
  const restaurantsDAO = new RestaurantsDAO()
  const cuisine = req.body.cuisine;
  console.log(cuisine);
  restaurantsDAO.findByCuisine(cuisine, (err,result)=>{
    res.render('restaurant.ejs',{todolist: result})
  });
  res.redirect('/resto/cuisine/'+cuisine);
});


// ajouter restaurant
router.post("/resto",(req,res)=>{
  const name = req.body.name;
  const zipcode = req.body.zipcode;
  const building = req.body.building;
  const coord = req.body.coord;
  const street = req.body.street;
  const borough = req.body.borough;
  const cuisine = req.body.cuisine;
  const newRestaurant = {
    "address": {
      "building": building,
      "coord": coord,
      "street": street,
      "zipcode": zipcode
    },
    "borough": borough,
    "cuisine": cuisine,
    "grades": {
      "date": {"date": 1393804800000, "grade": "A", "score": 2},
      "date": {"date": 1378857600000, "grade": "A", "score": 6},
      "date": {"date": 1358985600000, "grade": "A", "score": 19},
      "date": {"date": 1322006400000, "grade": "A", "score": 9},
      "date": {"date": 1299715200000, "grade": "B", "score": 14}
    },
    "name": name
  };
  const restaurantsDAO = new RestaurantsDAO();
  restaurantsDAO.insert(newRestaurant, (err, result) => {
    res.redirect('/resto/borough/'+borough);
  });
})



module.exports = router;