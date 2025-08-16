const cron = require("node-cron");

const TELEGRAM_BOT_TOKEN = "8081926267:AAGr--3L2kQNxrTghvq5S2C22RgnBFJp22Q";
const TELEGRAM_CHAT_ID = "821974194";

async function sendDailyDebrief() {
  const dailyDebrief = {
    name: "Satish Reddy",
    summary: "3/5 tasks completed",
    streak: 4,
    missedTasks: ["React Hooks Practice → Tomorrow 8AM", "DBMS Flashcards → Tomorrow 1PM"],
    topPriorities: [
      "Components: Creating, Nesting, and Communicating Between Components",
      "Complete new app",
      "Family Time at 12:00 PM"
    ]
  };

  const message = `
📝 Daily Debrief for ${dailyDebrief.name}

✅ Today’s Summary: ${dailyDebrief.summary}
🔥 Consistency Streak: ${dailyDebrief.streak} days

📌 Missed / Rescheduled Tasks:
${dailyDebrief.missedTasks.join("\n")}

🎯 Top 3 Priorities for Tomorrow:
${dailyDebrief.topPriorities.map((t,i)=>`${i+1}. ${t}`).join("\n")}

💡 Tip from SwitchBuddy: Focus on completing your Top 3 priorities first thing tomorrow.
`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
    });
    if (res.ok) console.log("Daily Debrief sent!");
    else console.error("Error sending message:", await res.text());
  } catch (err) {
    console.error(err);
  }
}

// Schedule every day at 15:56 IST
cron.schedule("56 15 * * *", sendDailyDebrief, { timezone: "Asia/Kolkata" });

// Send immediately for testing
sendDailyDebrief();
