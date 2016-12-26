
const dashboardSubscriptions = {
  workspaceAdded: (options, args) => ({
    workspaceAdded: workspace => workspace.name === args.name,
  }),
};

export default dashboardSubscriptions;
