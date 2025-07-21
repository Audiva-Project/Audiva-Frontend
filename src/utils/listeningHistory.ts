import api from "./api";

export function getOrCreateAnonymousId() {
  let id = localStorage.getItem("anonymousId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("anonymousId", id);
    document.cookie = `anonymousId=${id}; path=/;`;
  } else {
  }
  return id;
}

export async function logListening(songId: number, token: String) {
  const body: any = { songId };

  if (!token) {
    body.anonymousId = getOrCreateAnonymousId();
  }

  await api.post("/histories", body, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export const getListeningHistory = async (token?: string) => {
  try {
    if (token) {
      const res = await api.get("/histories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } else {
      const anonymousId = localStorage.getItem("anonymousId");
      if (!anonymousId) return [];
      const res = await api.get(`/histories`, {
        params: { anonymousId },
      });
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching listening history:", error);
    return [];
  }
};
