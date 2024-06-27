// const express = require("express");
// const cors = require("cors");
// const database = require("./db");
// const User = require("./models/user");
// const Card = require("./models/card");
// const jwt = require("jsonwebtoken");
// const Module = require("./models/module");
// const now = new Date();
// const timestamp = now.toUTCString();

// const app = express();

// app.use(cors());
// app.use(express.json());

// database();

// app.post("/signup", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   User.insertMany([{ email: email, password: password }])
//     .then(() => {
//       res.json({ success: true });
//     })
//     .catch((err) => {
//       res.json({ success: false, error: err });
//     });
// });

// app.post("/login", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   User.findOne({ email: email })
//     .exec()
//     .then((user) => {
//       console.log(user);
//       if (user && user.password === password) {
//         res.json({ success: true });
//       } else {
//         res.json({ success: false });
//       }
//     })
//     .catch((err) => {
//       res.json({ success: false, error: err });
//     });
// });

// app.post("/create", (req, res) => {
//   const word = req.body.word;
//   const meaning = req.body.meaning;

//   Card.insertMany([{ word: word, meaning: meaning, time: timestamp }])
//     .then(() => {
//       const token = jwt.sign({ foo: "bar" }, "shhhhh");
//       res.json({ token: token, word: word, meaning: meaning, time: timestamp });
//     })
//     .catch((err) => {
//       res.json({ success: false, error: "not authenticate" });
//     });
// });

// app.get("/card", (req, res) => {
//   Card.find({})
//     .exec()
//     .then((data) => {
//       res.json({ success: true, data: data });
//     })
//     .catch((err) => {
//       res.json({ success: false, error: err });
//     });
// });

// app.get("/card/:id", async (req, res) => {
//   const { id } = req.params;
//   Card.find({ _id: id })
//     .exec()
//     .then((data) => {
//       res.json({ success: true, data: data[0] });
//     })
//     .catch((err) => {
//       res.json({ success: false, error: err });
//     });
// });

// app.put("/card/:id", async (req, res) => {
//   const { id } = req.params;
//   const { meaning } = req.body;
//   Card.findByIdAndUpdate(id, { $set: { meaning: meaning } })
//     .then(() => {
//       res.json({ success: true });
//     })
//     .catch((err) => {
//       res.json({ success: false, error: err });
//     });
// });

// app.delete("/card/:id", async (req, res) => {
//   const { id } = req.params;
//   Card.findByIdAndDelete(id)
//     .then(() => {
//       res.json({ success: true });
//     })
//     .catch((err) => {
//       res.json({ success: false, error: err });
//     });
// });

// app.get("/module", async (req, res) => {
//   Module.find({})
//     .exec()
//     .then((data) => {
//       res.json({ success: true, data: data });
//     })
//     .catch((err) => {
//       res.json({ success: false, error: err });
//     });
// });

// app.post("/module", (req, res) => {
//   const module = req.body.module;
//   Module.insertMany([{ module: module }])
//     .then(() => {
//       res.json({ module: module });
//     })
//     .catch((err) => {
//       res.json({ success: false, error: "not authenticate" });
//     });
// });

// app.listen(5000, () => {
//   console.log("Server running at port 5000");
// });

const express = require("express");
const cors = require("cors");
const database = require("./db");
const User = require("./models/user");
const Card = require("./models/card");
const jwt = require("jsonwebtoken");
const Module = require("./models/module");
const now = new Date();
const timestamp = now.toUTCString();

const app = express();

app.use(cors());
app.use(express.json());

database(); // Assuming this function connects to your MongoDB database

// User routes
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  User.create({ email, password })
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .exec()
    .then((user) => {
      if (user && user.password === password) {
        const token = jwt.sign({ email: user.email }, "secret_key");
        res.json({ success: true, token });
      } else {
        res.json({ success: false });
      }
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

// Card routes
app.post("/create", (req, res) => {
  const { word, meaning, module } = req.body;

  Card.create({ word, meaning, time: timestamp, module })
    .then((card) => {
      res.json({ success: true, card });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

app.get("/card", (req, res) => {
  Card.find({})
    .exec()
    .then((data) => {
      res.json({ success: true, data });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

app.get("/card/:id", async (req, res) => {
  const { id } = req.params;

  Card.findById(id)
    .exec()
    .then((data) => {
      res.json({ success: true, data });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

app.put("/card/:id", async (req, res) => {
  const { id } = req.params;
  const { word, meaning } = req.body;

  Card.findByIdAndUpdate(id, { word, meaning }, { new: true })
    .then((updatedCard) => {
      res.json({ success: true, data: updatedCard });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

app.delete("/card/:id", async (req, res) => {
  const { id } = req.params;

  Card.findByIdAndDelete(id)
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

// Module routes
app.get("/module", async (req, res) => {
  Module.find({})
    .exec()
    .then((data) => {
      res.json({ success: true, data });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

app.post("/module", (req, res) => {
  const { module } = req.body;

  Module.create({ module })
    .then(() => {
      res.json({ success: true, module });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

app.get("/card/module/:module", (req, res) => {
  const { module } = req.params;

  Card.find({ module })
    .exec()
    .then((data) => {
      res.json({ success: true, data });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
