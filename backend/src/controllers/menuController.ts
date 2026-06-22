import { Request, Response } from "express";
import { MenuCategory, MenuItem } from "../models/Menu";

// Categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await MenuCategory.find({});
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await MenuCategory.create(req.body);
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Items
export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const items = await MenuItem.find({}).populate("category", "name");
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category } = req.body;
    let image = "";

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const item = await MenuItem.create({
      name,
      description,
      price,
      category,
      image,
    });

    res.status(201).json(item);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item removed" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
