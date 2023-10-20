import Office from "../models/office.js";

export const getOffices = async (req, res) => {
  try {
    const offices = await Office.find();
    res.json(offices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getOfficesById = async (req, res) => {
  try {
    const offices = await Office.findById(req.params.id);
    res.json(offices);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const addOffice = async (req, res) => {
  const office = new Office(req.body);
  try {
    const insertOffices = await office.save();
    res.status(201).json(insertOffices);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const editOffice = async (req, res) => {
  try {
    const editedOffice = await Office.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(editedOffice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteOffice = async (req, res) => {
  try {
    const deletedOffice = await Office.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedOffice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
