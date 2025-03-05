import { API_KEY, API_URL } from "../utils/config.ts";

type StatusResponse = {
  dns: string;
  ipv4: string;
};

export const getSiteStatus = async () => {
  try {
    if (API_URL && API_KEY) {
      const response = await fetch(`${API_URL}/status`, {
        method: "GET",
        headers: {
          "x-api-key": API_KEY,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        return data as StatusResponse;
      } else {
        return undefined;
      }
    } else {
      throw new Error("Unable to get env");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const getWebsite = async (url: string) => {
  try {
    if (API_URL && API_KEY) {
      const response = await fetch(`https://${url}`, {
        method: "GET",
      });

      const data = await response.json();
      console.log(data);

      return data;
    } else {
      throw new Error("Unable to get env");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
