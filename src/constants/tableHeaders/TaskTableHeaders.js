export const taskTableHeaderColumns = [
    {
      header: "Title",
      key: "title",
    },
    {
      header: "Description",
      key: "description",
    },
    {
      header: "Status",
      key: "status",
    },
    {
      header: "Priority",
      key: "priority",
    },
    {
      header: "Estimated Hours",
      key: "estimatedHours",
    },
    {
      header: "Required Skills",
      key: "requiredSkills",
      render: (row) => row.requiredSkills.join(", "),
    },
    {
      header: "Assigned User",
      key: "assignedUser",
    },
    {
      header: "Due Date",
      key: "dueDate",
    },
    {
      header: "Created Date",
      key: "createdAt",
    },
  ];
