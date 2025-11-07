import type { Request, Response } from "express";
import dayjs from "dayjs";
import { error } from "console";
import { dashboardSchema } from "../schemas/dashboard.schema.js";
import type { TDashboardSchemaItem } from "../types/dashboard.types.js";
import { getDashboardSchema } from "../services/dashboard-schema.service.js";

const getDashboard = async (req: Request, res: Response) => {
  const { LineID } = req.params;

  const matchedDashboards: TDashboardSchemaItem[] = dashboardSchema.filter(
    (item) => item.lineID.includes(LineID!)
  );

  const filledDashboards = matchedDashboards.map((item) =>
    getDashboardSchema(item.dashboardName!)
  );

    return res.send(filledDashboards);
};

export { getDashboard };
