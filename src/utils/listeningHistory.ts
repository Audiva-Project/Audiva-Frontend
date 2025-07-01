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


export async function logListening(songId: number) {
  const token = localStorage.getItem("jwtToken");
  const body: any = { songId };

  if (!token) {
    body.anonymousId = getOrCreateAnonymousId();
  }

  await fetch("http://localhost:8080/identity/api/history", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  });
}

export const getListeningHistory = async () => {
  const token = localStorage.getItem("jwtToken");
  console.log("JWT Token:", token);

  if (token) {
    const res = await fetch("http://localhost:8080/identity/api/history", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  } else {
    const anonymousId = localStorage.getItem("anonymousId");
    // console.log("FE anonymousId:", anonymousId);
    const res = await fetch(`http://localhost:8080/identity/api/history?anonymousId=${anonymousId}`);
    return res.json();
  }
};