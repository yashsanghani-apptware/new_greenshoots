import axios from "axios";
import config from "../config";

// Define the shape of the workflowData object
interface WorkflowData {
  workflowId: string;
  name: string;
}

export const initiateWorkflow = async (
  workflowData: WorkflowData
): Promise<void> => {
  try {
    await axios.post(`${config.workflowServiceURL}/initiate`, workflowData);
  } catch (error) {
    // Handle the error, optionally re-throwing or logging
    console.error("Error initiating workflow:", error);
    throw error;
  }
};
