import useSWR from "swr";

/**
 * Fetcher (for SWR)
 * @param url URL
 * @param payload Payload
 * @returns Response
 */
export const fetcher = async (url: string, payload?: string): Promise<any> => {
  // Fetch
  const response = await fetch(url, {
    method: payload ? "POST" : "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    ...(payload && { body: payload }),
  });

  // Check content type
  const contentType = response.headers.get("Content-Type");

  // Check response status
  if (!response.ok) {
    const error: any = new Error("An error occured while fetching data.");
    error.info =
      contentType?.includes("application/json") && (await response.json());
    error.status = response.status;

    throw error;
  }

  // Return response json
  return response.json();
};

export const useApi = () => {
  const { data, error, mutate } = useSWR(
    "https://dummyjson.com/products",
    fetcher
  );

  return {
    data,
    error,
    mutate,
  };
};
