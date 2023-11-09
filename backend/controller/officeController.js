import multer from "multer";
import fs from "fs";
import Office from "../models/office.js";
import imageDownloader from "image-downloader";
import path from "path";

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

// ========== IMAGE POST =================
export const uploadsWithLink = async (req, res) => {
  const { link } = req.body;
  // ==MEMBEDAKAN NAMA==
  const newName = "photo" + Date.now() + ".jpg";

  await imageDownloader.image({
    url: link,
    // Tempat file
    dest: __dirname + "/uploads" + newName,
  });
  res.json(newName);
};

export const uploadPhotos = (req, res) => {
  // UPLOAD FILE MEMORY
  const uploadedFiles = [];
  // TO GET PATH NAME
  for (let index = 0; index < req.files.length; index++) {
    const { path, originalname } = req.files[index];
    // GET LAST OBJECT
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
};

// DELETE OFFICE BY NAME
export const deleteFilePhoto = (req, res) => {
  // MENDAPATKAN DATA FILE
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "uploads", filename);
  fs.unlink(filepath, (err) => {
    if (err) {
      console.error("ERROR DELETING FILE", err);
      return res.status(500).json({ message: "FAILED TO DELETE FILE" });
    }
    console.log(`File '${filename}' deleted success`);
    res.status(200).json({ message: "FILE DELETED" });
  });
};
