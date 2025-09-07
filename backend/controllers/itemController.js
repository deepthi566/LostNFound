import Item from "../model/Item.js";

export const createItem = async (req, res) => {
  try {
    const imgPaths = req.files ? req.files.map((file) => file.filename) : [];

    const newItem = new Item({
      ...req.body,
      userId: req.user.id,
      img: imgPaths, // add the uploaded images here
    });

    const savedItem = await newItem.save();

    res.status(200).json({
      success: true,
      message: "Item created successfully",
      data: savedItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find(); //fetch everything
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.id });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    if (item.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    if (item.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }
    await Item.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
