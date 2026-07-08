import { getMyApplications } from "./applicationService";
import { getCurrentUser } from "./resumeService";

export const getCandidateDashboard = async () => {
  const [applications, user] = await Promise.all([
    getMyApplications(),
    getCurrentUser(),
  ]);

  return {
    applications: applications.data,
    user: user.data,
  };
};