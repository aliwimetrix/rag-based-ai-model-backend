type TRenderPosition = "header" | "body" | "footer";

type TGridPlacement = Record<string, unknown>;

export type TDashboardSchemaItem<TProps = Record<string, unknown>> = {
  lineID: string[];
  displayDuration: number;
  dashboardName?: string;
  columns: number;
  rows: number;
  schema: {
    component: string;
    renderPosition: TRenderPosition;
    props?: TProps;
    gridPlacement?: TGridPlacement;
  }[];
};