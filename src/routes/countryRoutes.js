import express from "express";
import Country from "../models/CountryModel.js";

const router = express.Router();

router.post("/countries", (req, res) => {
  const country = new Country(req.body);
  country
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/countries", (req, res) => {
  Country.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/country/:id", (req, res) => {
  const { id } = req.params;
  Country.findOne({ code: id })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ error: "el pais no existe " });
      }
    })
    .catch((error) => res.json({ message: error }));
});

router.delete("/country/:id", (req, res) => {
  const { id } = req.params;
  Country.deleteOne({ code: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.put("/country/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  Country.updateOne({ code: id }, { $set: body })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

export default router;
