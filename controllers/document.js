const documentModel = require("../models/documentModel")
const createDocument = async (req, res) => {
    try {
        const userId = req.body.user._id
        const filename = req.file.originalname
        const data = req.file.buffer
        const contentType = req.file.mimetype
        const document = await documentModel.create({ userId, filename, data, contentType })
        if (!document) {
            return res.status(500).json("Document not Uploaded Succefully")

        }
        res.status(200).json("Document  Uploaded Succefully")
    }
    catch (error) {
        res.status(500).json(error);
    }
}
const getDocumentById = async (req, res) => {
    try {
        // const userId = "6652b3681c1e413b68ce83f0";
        const { id } = req.params
        const document = await documentModel.findById({ _id: id })
        // const { data, __docs } = documents;
        res.status(200).json(document)
    }
    catch (error) {
        res.status(500).json(error);
    }
}
const getAllDocuments = async (req, res) => {
    try {
        const documents = await documentModel.find({})
        // const { data, __docs } = documents;
        res.status(200).json(documents)
    }
    catch (error) {
        res.status(500).json(error);
    }
}
module.exports = { createDocument, getAllDocuments, getDocumentById }