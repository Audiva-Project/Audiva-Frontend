import { useAuthStore } from "@/stores/authStore";

export function getOrCreateAnonymousId() {
  let id = localStorage.getItem("anonymousId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("anonymousId", id);
    document.cookie = `anonymousId=${id}; path=/;`;
    console.log("Created new anonymousId:", id);
  } else {
    console.log("Found existing anonymousId:", id);
  }
  return id;
}


export async function logListening(songId: number, token: String) {
  const body: any = { songId };

  if (!token) {
    body.anonymousId = getOrCreateAnonymousId();
  }

  await fetch("http://localhost:8080/identity/api/history", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export const getListeningHistory = async (token?: string) => {
  if (token) {
    const res = await fetch("http://localhost:8080/identity/api/history", {
    });
    return await res.json();
  } else {
    const anonymousId = localStorage.getItem("anonymousId");
    if (!anonymousId) return [];
    const res = await fetch(`http://localhost:8080/identity/api/history?anonymousId=${anonymousId}`);
    return await res.json();
  }
};