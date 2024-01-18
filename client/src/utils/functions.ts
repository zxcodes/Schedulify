import { BASE_URL } from "@app/constants";

async function getData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

async function postData<T>(endpoint: string, data: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to post data: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

async function deleteData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete data: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export { getData, postData, deleteData };
