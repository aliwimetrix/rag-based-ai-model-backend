import { dashboardSchema } from "../schemas/dashboard.schema.js";
import type { TDashboardSchemaItem } from "../types/dashboard.types.js";
import { getDashboardData } from "./dashboard-data.service.js";

export const getDashboardSchema = (dashboard: string): TDashboardSchemaItem => {
  const schema: TDashboardSchemaItem = dashboardSchema.find(
    (item) => item.dashboardName === dashboard
  )!;

  const data = getDashboardData(dashboard);

  const isComponent = (value: any): boolean => value && typeof value === "object"

  const fillProps = (item: any): any => {
    if (!item?.props) return item;

    switch (item.component) {
      case "KpiCard":
        return {
          ...item,
          props: {
            ...item.props,
            value:
              data[item.props.title as keyof typeof data] ?? item.props.value,
            state:
              data[item.props.state as keyof typeof data] ?? item.props.state,
          },
        };

      case "MTDTargetGauge":
        return {
          ...item,
          props: {
            ...item.props,
            current: data["Current"] ?? item.props.current,
            target: data["Target"] ?? item.props.target,
            state: data["Current"]! > data["Target"]! ? "ok" : "critical",
          },
        };

        case "OperatorStatsCard":
          return {
            ...item,
            props: {
              ...item.props,
              operators: data[item.props.title as keyof typeof data] ?? item.props.operators
            }
          };
        
      default:
        const filledProps = Object.fromEntries(
          Object.entries(item.props).map(([key, value]) => {
            if (isComponent(value)) {
              return [key, fillProps(value)];
            }
            return [key, value];
          })
        );

        return { ...item, props: filledProps };
    }
  };

  const filledSchema = schema.schema.map(fillProps);

  return {
    ...schema,
    schema: filledSchema,
  };
};
