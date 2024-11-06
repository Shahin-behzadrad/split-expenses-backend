import { Request, Response } from "express";
import { formatResponse } from "../util/responseUtil";
import { Group } from "../models/Group";

const getAllGroups = async (req: Request, res: Response) => {
  try {
    const groups = await Group.findAll();
    res.json(
      formatResponse(200, "اطلاعات مورد نظر با موفقیت دریافت شد.", groups)
    );
  } catch (error: any) {
    res
      .status(500)
      .json(
        formatResponse(500, "خطا در دریافت اطلاعات.", null, {}, [error.message])
      );
  }
};

const getGroupById = async (req: Request, res: Response) => {
  try {
    const group = await Group.findByPk(req.params.id);
    if (group) {
      res.json(formatResponse(200, "اطلاعات گروه با موفقیت دریافت شد.", group));
    } else {
      res.status(404).json(formatResponse(404, "گروه پیدا نشد.", null));
    }
  } catch (error: any) {
    res
      .status(500)
      .json(
        formatResponse(500, "خطا در دریافت اطلاعات.", null, {}, [error.message])
      );
  }
};

const createGroup = async (req: Request, res: Response) => {
  try {
    const group = await Group.create(req.body);
    res
      .status(201)
      .json(formatResponse(201, "گروه با موفقیت ایجاد شد.", group));
  } catch (error: any) {
    res
      .status(500)
      .json(
        formatResponse(500, "خطا در ایجاد گروه.", null, {}, [error.message])
      );
  }
};

const updateGroup = async (req: Request, res: Response) => {
  try {
    const [updated] = await Group.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedGroup = await Group.findByPk(req.params.id);
      res.json(formatResponse(200, "گروه با موفقیت ویرایش شد.", updatedGroup));
    } else {
      res.status(404).json(formatResponse(404, "گروه پیدا نشد.", null));
    }
  } catch (error: any) {
    res
      .status(500)
      .json(
        formatResponse(500, "خطا در ویرایش گروه.", null, {}, [error.message])
      );
  }
};

export default { getAllGroups, getGroupById, createGroup, updateGroup };
