const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = express.Router();
const PORT = process.env.PORT || 4000;

app.use(express.static(__dirname + '/client/build/'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html')
})

let User = require("./models/user.js");
let Category = require("./models/category.js");
let Technology = require("./models/technology.js");

app.use(cors());
app.use(bodyParser.json());

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });
} else {
  mongoose.connect("mongodb://localhost/studybuddy", {
    useNewUrlParser: true
  });
}

const connection = mongoose.connection;

connection.on("error", err => {
  console.error("MongoDB connection error: ", err);
  process.exit(-1);
});

connection.once("open", function() {
  console.log("Yooo MongoDB Connected Dog");
});

// ROUTES

routes.route("/users").get(function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});
routes.route("/users").post(function(req, res) {
  let user = new User(req.body);
  user.name = req.body.name;
  user.technology = req.body.technology;
  user.category = req.body.category;
  user
    .save()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).send("adding new contact failed");
    });
});
routes.route("/users/:id").get(function(req, res) {
  let id = req.params.id;
  User.findById(id, function(err, user) {
    res.json(user);
  });
});
routes.route("/users/:id").post(function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (!user) {
      res.status(404).send("user is not found");
    } else {
      console.log(req.body)
      user.name = req.body.name;
      user.technology = req.body.technology;
      user.category = req.body.category;
      user
        .save()
        .then(user => {
          res.json(user);
        })
        .catch(err => {
          res.status(400).send("Update Not Done yo!!");
        });
    }
  });
});
routes.route("/users/:id").delete(function(req, res) {
  let id = req.params.id;
  User.findByIdAndRemove(id, function(err, user) {
    if (!user) {
      res.status(404).send("data is not found");
    } else {
      res.status(200).json(user);
    }
  });
});
routes.route("/technologies").get(function(req, res) {
  Technology.find(function(err, technologies) {
    if (err) {
      console.log(err);
    } else {
      res.json(technologies);
    }
  });
});
routes.route("/technologies").post(function(req, res) {
  let technology = new Technology(req.body);
  technology.language = req.body.language;
  technology
    .save()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).send("adding new contact failed");
    });
});
routes.route("/technologies/:id").get(function(req, res) {
  let id = req.params.id;
  Technology.findById(id, function(err, technology) {
    res.json(technology);
  });
});
routes.route("/technologies/:id").post(function(req, res) {
  Technology.findById(req.params.id, function(err, technology) {
    if (!technology) {
      res.status(404).send("technology is not found");
    } else {
      technology.language = req.body.language;

      technology
        .save()
        .then(technology => {
          res.json(technology);
        })
        .catch(err => {
          res.status(400).send("Update Not Done yo!!");
        });
    }
  });
});
routes.route("/technologies/:id").delete(function(req, res) {
  let id = req.params.id;
  Technology.findByIdAndRemove(id, function(err, technology) {
    if (!technology) {
      res.status(404).send("data is not found");
    } else {
      res.status(200).json(technology);
    }
  });
});
routes.route("/categories").get(function(req, res) {
  Category.find(function(err, categories) {
    if (err) {
      console.log(err);
    } else {
      res.json(categories);
    }
  });
});
routes.route("/categories").post(function(req, res) {
  let category = new Category(req.body);
  category.language = req.body.language;
  category
    .save()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).send("adding new contact failed");
    });
});
routes.route("/categories/:id").get(function(req, res) {
  let id = req.params.id;
  Category.findById(id, function(err, category) {
    res.json(category);
  });
});
routes.route("/categories/:id").post(function(req, res) {
  Category.findById(req.params.id, function(err, category) {
    if (!category) {
      res.status(404).send("category is not found");
    } else {
      category.title = req.body.title;

      category
        .save()
        .then(category => {
          res.json(category);
        })
        .catch(err => {
          res.status(400).send("Update Not Done yo!!");
        });
    }
  });
});
routes.route("/categories/:id").delete(function(req, res) {
  let id = req.params.id;
  Category.findByIdAndRemove(id, function(err, category) {
    if (!category) {
      res.status(404).send("data is not found");
    } else {
      res.status(200).json(category);
    }
  });
});

app.use("", routes);

app.listen(PORT, function() {
  console.log("yooo Server is running on port:" + PORT);
});
