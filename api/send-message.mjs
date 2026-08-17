export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response("Только POST-запросы", { status: 405 });
    }

    try {
      const { message } = await request.json();

      if (!message || message.trim().length < 2) {
        return Response.json(
          { error: "Напиши сообщение длиннее одного символа." },
          { status: 400 }
        );
      }

      if (message.length > 1000) {
        return Response.json(
          { error: "Сообщение слишком длинное." },
          { status: 400 }
        );
      }

      const response = await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: `📩 Новое анонимное сообщение:\n\n${message}`
          })
        }
      );

      if (!response.ok) {
        throw new Error("Telegram не принял сообщение");
      }

      return Response.json({ ok: true });
    } catch (error) {
      return Response.json(
        { error: "Не удалось отправить сообщение." },
        { status: 500 }
      );
    }
  }
};
