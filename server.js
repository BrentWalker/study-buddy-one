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

// MODELS

/**
 * user
 {
    id: "number",
    name: "string"
 }
 */

 /**
 * technology
 {
    id: "number",
    language: "string"
 }
 */

 /**
 * category
 {
    id: "number",
    title: "string"
 }
 */

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
      user.name = req.body.name;

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

/*

routes.route("/technologies")
routes.route("/technologies/:id")
routes.route("/technologies/add")
routes.route("/technologies/update/:id")
routes.route("/technologies/delete/:id")

routes.route("/categories")
routes.route("/categories/:id")
routes.route("/categories/add")
routes.route("/categories/update/:id")
routes.route("/categories/delete/:id")

*/

/*
routes.route("/loads").get(function(req, res) {
  Load.find(function(err, loads) {
    if (err) {
      console.log(err);
    } else {
      res.json(loads);
    }
  });
});

routes.route("/loads/:id").get(function(req, res) {
  let id = req.params.id;
  Load.findById(id, function(err, load) {
    res.json(load);
  });
});

routes.route("/loads/add").post(function(req, res) {
  let load = new Load(req.body);
  load
    .save()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).send("adding new Load failed");
    });
});

routes.route("/loads/update/:id").post(function(req, res) {
  Load.findById(req.params.id, function(err, load) {
    if (!load) {
      res.status(404).send("data is not found");
    } else {
      load.load_number = req.body.load_number;
      load.load_driver_name = req.body.load_driver_name;
      load.load_rate = req.body.load_rate;
      load.load_tractor_number = req.body.load_tractor_number;
      load.load_trailer_number = req.body.load_trailer_number;
      load.load_pu_date = req.body.load_pu_date;
      load.load_del_date = req.body.load_del_date;
      load.load_pu_location = req.body.load_pu_location;
      load.load_del_location = req.body.load_del_location;
      load.load_completed = req.body.load_completed;

      load
        .save()
        .then(load => {
          res.json(load);
        })
        .catch(err => {
          res.status(400).send("Update Not Done yo!!");
        });
    }
  });
});

routes.route("/loads/delete/:id").delete(function(req, res) {
  let id = req.params.id;
  Load.findByIdAndRemove(id, function(err, load) {
    if (!load) {
      res.status(404).send("data is not found");
    } else {
      res.status(200).json(load);
    }
  });
});

routes.route("/contacts").get(function(req, res) {
  Contact.find(function(err, contacts) {
    if (err) {
      console.log(err);
    } else {
      res.json(contacts);
    }
  });
});

routes.route("/contacts/:id").get(function(req, res) {
  let id = req.params.id;
  Contact.findById(id, function(err, contact) {
    res.json(contact);
  });
});

routes.route("/contacts/add").post(function(req, res) {
  let contact = new Contact(req.body);
  contact
    .save()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).send("adding new contact failed");
    });
});

routes.route("/contacts/update/:id").post(function(req, res) {
  Contact.findById(req.params.id, function(err, contact) {
    if (!contact) {
      res.status(404).send("data is not found");
    } else {
      contact.contact_name = req.body.contact_name;
      contact.contact_address = req.body.contact_address;
      contact.contact_phone = req.body.contact_phone;

      contact
        .save()
        .then(contact => {
          res.json(contact);
        })
        .catch(err => {
          res.status(400).send("Update Not Done yo!!");
        });
    }
  });
});

routes.route("/contacts/delete/:id").delete(function(req, res) {
  let id = req.params.id;
  Contact.findByIdAndRemove(id, function(err, contact) {
    if (!contact) {
      res.status(404).send("data is not found");
    } else {
      res.status(200).json(contact);
    }
  });
});
*/

app.use("", routes);

app.listen(PORT, function() {
  console.log("yooo Server is running on port:" + PORT);
});
