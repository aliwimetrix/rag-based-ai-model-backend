import type { TDashboardSchemaItem } from "../types/dashboard.types.js";

export const dashboardSchema: TDashboardSchemaItem[] = [
  {
    lineID: ["2", "5", "7"],
    displayDuration: 30000,
    dashboardName: "Production",
    columns: 4,
    rows: 2,
    schema: [
      {
        component: "CustomHeader",
        renderPosition: "header",
        props: {
          title: "LINE 01",
          right: "Production",
        },
      },
      // 🟦 Center Gauge (centered in grid)
      {
        component: "MTDTargetGauge",
        renderPosition: "body",
        props: {
          current: 16000,
          target: 17000,
          state: "warning",
        },
        gridPlacement: {
          gridColumn: "2 / span 2", // columns 2 & 3
          gridRow: "1 / span 2", // both rows → vertically centered
        },
      },
      // 🟩 Top-Left Corner
      {
        component: "KpiCard",
        renderPosition: "body",
        props: {
          title: "Line Wip",
          value: "6750",
          state: "ok",
          subtitle: "pieces",
        },
        gridPlacement: {
          gridColumn: "1 / 2",
          gridRow: "1 / 2",
        },
      },
      // 🟩 Top-Right Corner
      {
        component: "KpiCard",
        renderPosition: "body",
        props: {
          title: "Rework",
          value: "60",
          state: "warning",
          subtitle: "pieces",
        },
        gridPlacement: {
          gridColumn: "4 / 5",
          gridRow: "1 / 2",
        },
      },
      // 🟩 Bottom-Left Corner
      {
        component: "KpiCard",
        renderPosition: "body",
        props: {
          title: "Downtime",
          value: "96.8",
          state: "ok",
          subtitle: "minutes",
        },
        gridPlacement: {
          gridColumn: "1 / 2",
          gridRow: "2 / 3",
        },
      },
      // 🟩 Bottom-Right Corner
      {
        component: "KpiCard",
        renderPosition: "body",
        props: {
          title: "Today's Target",
          value: "564/600",
          state: "critical",
          subtitle: "achieved/target",
        },
        gridPlacement: {
          gridColumn: "4 / 5",
          gridRow: "2 / 3",
        },
      },
      // 🟨 Footer
      {
        component: "CustomFooter",
        renderPosition: "footer",
        props: {
          left: {
            component: "KpiCard",
            props: {
              title: "Efficiency",
              value: "88.5%",
              subtitle: "operational",
              cardType: "footer-card",
            },
          },
          centerLeft: {
            component: "KpiCard",
            props: {
              title: "Throughput Time",
              value: "45",
              subtitle: "minutes",
              cardType: "footer-card",
            },
          },
          centerRight: {
            component: "KpiCard",
            props: {
              title: "Change Overs",
              value: "2",
              subtitle: "numbers",
              cardType: "footer-card",
            },
          },
          right: {
            component: "KpiCard",
            props: {
              title: "MTBF",
              value: "10",
              subtitle: "minutes",
              cardType: "footer-card",
            },
          },
        },
      },
    ],
  },
  {
    lineID: ["2", "5", "9"],
    displayDuration: 30000,
    dashboardName: "Quality",
    columns: 3,
    rows: 3,
    schema: [
      {
        component: "CustomHeader",
        renderPosition: "header",
        props: {
          title: "LINE 01",
          right: "Quality",
        },
      },
      {
        component: "KpiCard",
        renderPosition: "body",
        props: {
          title: "Pending Decisions",
          value: "78",
          state: "ok",
          subtitle: "pieces",
        },
        gridPlacement: {
          // gridColumn: "span 0",
          gridRow: "1/2",
          // justifySelf: "end",
        },
      },
      {
        component: "KpiCard",
        renderPosition: "body",
        props: {
          title: "DHU Rate",
          value: "3.2%",
          state: "critical",
          subtitle: "defects per 100",
        },
        gridPlacement: {
          // gridColumn: "span 3",
          gridRow: "1/2",
          // justifySelf: "end",
        },
      },
      {
        component: "KpiCard",
        renderPosition: "body",
        props: {
          title: "Rejected",
          value: "85",
          state: "ok",
          subtitle: "pieces",
        },
        gridPlacement: {
          // gridColumn: "span 3",
          gridRow: "1/2",
          // justifySelf: "end",
        },
      },

      {
        component: "OperatorStatsCard",
        renderPosition: "body",
        props: {
          operators: [
            {
              name: "Kent Dodds",
              employeeID: "Operator A",
              operation: "Operation A",
              faults: "Fault A",
              noOfFaults: 5
            },
            {
              name: "Sarah Connor",
              employeeID: "Operator A",
              operation: "Operation B",
              faults: "Fault A",
              noOfFaults: 5
            },
            {
              name: "Tony Stark",
              employeeID: "Operator A",
              operation: "Operation A",
              faults: "Fault A",
              noOfFaults: 5
            },
          ],
          title: "Inline"
        },
        gridPlacement: {
          gridColumn: "span 3",
          gridRow: "2/3",
          // justifySelf: "end",
        },
      },
      {
        component: "OperatorStatsCard",
        renderPosition: "body",
        props: {
          operators: [
            {
              name: "Kent Dodds",
              employeeID: "Operator A",
              operation: "Operation A",
              faults: "Fault A",
              noOfFaults: 5
            },
            {
              name: "Sarah Connor",
              employeeID: "Operator A",
              operation: "Operation A",
              faults: "Fault A",
              noOfFaults: 5
            },
            {
              name: "Tony Stark",
              employeeID: "Operator A",
              operation: "Operation A",
              faults: "Fault A",
              noOfFaults: 5
            },
          ],
          title: "Endline"
        },
        gridPlacement: {
          gridColumn: "span 3",
          gridRow: "3/4",
          // justifySelf: "end",
        },
      },
    ],
  },
];
