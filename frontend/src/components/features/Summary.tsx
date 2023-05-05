export const Summary = async (text: string) => {
  const summaryText = await fetch(
    `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/ai/summary`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ text }),
    }
  ).then((data) => data.json());
  return summaryText;
};
