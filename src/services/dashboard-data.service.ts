export const getDashboardData = (dashboard: string) => {
  switch (dashboard) {
    case "Production":
      return {
        "Line Wip": 463,
        Rework: 76,
        "DHU Rate": '65%',
        "Cycle Time": 5500,
        "Current": 8766,
        "Target": 7766
      };

    case "Quality":
      return {
        "Line Wip": 457,
        Rework: 96,
        "DHU Rate": '78%',
        "Cycle Time": 49,
        Inline: [
            {
              name: "Kent Dodds",
              employeeID: "Operator A",
              operation: "Operation A",
              fault: "Fault A",
              noOfFaults: 10
            },
            {
              name: "Sarah Connor",
              employeeID: "Operator B",
              operation: "Operation A",
              fault: "Fault A",
              noOfFaults: 27
            },
            {
              name: "Tony Stark",
              employeeID: "Operator C",
              operation: "Operation A",
              fault: "Fault A",
              noOfFaults: 98
            },
          ],
          Endline: [
            {
              name: "Kent Dodds",
              employeeID: "Operator A",
              operation: "Operation A",
              fault: "Fault A",
              noOfFaults: 10
            },
            {
              name: "Sarah Connor",
              employeeID: "Operator B",
              operation: "Operation A",
              fault: "Fault A",
              noOfFaults: 27
            },
            {
              name: "Tony Stark",
              employeeID: "Operator C",
              operation: "Operation A",
              fault: "Fault A",
              noOfFaults: 14
            },
          ],
      };

    default:
      return {
        message: "Unknown dashboard name",
      };
  }
};
