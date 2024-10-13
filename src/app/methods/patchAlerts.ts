export const patchAlerts = async (ids: string[]) => {
  const token = localStorage.getItem('authToken');
  const basePath = import.meta.env.VITE_APP_API_URL;
  const path = `${basePath}/alert/read`;
  try {
    const response = await fetch(path, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ ids, read: true }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${path}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
