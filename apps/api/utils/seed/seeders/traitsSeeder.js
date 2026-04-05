import Trait from "../../../models/Trait.js";

const traits = [
  { trait: "Curious", color: "#F59E0B", icebreaker: "What's the last thing you went down a rabbit hole learning about?" },
  { trait: "Creative", color: "#8B5CF6", icebreaker: "What's a project you've made that you're proud of?" },
  { trait: "Ambitious", color: "#EF4444", icebreaker: "Where do you see yourself in 3 years?" },
  { trait: "Collaborative", color: "#3B82F6", icebreaker: "What's the best team you've ever been part of?" },
  { trait: "Analytical", color: "#06B6D4", icebreaker: "How do you approach solving a problem you've never seen before?" },
  { trait: "Empathetic", color: "#EC4899", icebreaker: "Tell me about a time you helped someone figure something out." },
  { trait: "Driven", color: "#F97316", icebreaker: "What motivates you to get out of bed in the morning?" },
  { trait: "Adventurous", color: "#10B981", icebreaker: "What's the boldest thing you've ever done?" },
  { trait: "Detail-oriented", color: "#6366F1", icebreaker: "What's something most people overlook that you always notice?" },
  { trait: "Visionary", color: "#14B8A6", icebreaker: "If you could build anything with unlimited resources, what would it be?" },
  { trait: "Pragmatic", color: "#84CC16", icebreaker: "What's a belief you used to hold that you've since changed?" },
  { trait: "Innovative", color: "#F43F5E", icebreaker: "What's a broken thing in your industry you'd love to fix?" },
  { trait: "Calm", color: "#67E8F9", icebreaker: "How do you handle a stressful deadline?" },
  { trait: "Humorous", color: "#FCD34D", icebreaker: "Tell me a joke or a story that always gets a laugh." },
  { trait: "Strategic", color: "#A78BFA", icebreaker: "How do you decide what to focus on when everything feels urgent?" },
  { trait: "Passionate", color: "#FB7185", icebreaker: "What topic could you talk about for hours?" },
  { trait: "Open-minded", color: "#34D399", icebreaker: "What's an opinion you hold that most people disagree with?" },
  { trait: "Resilient", color: "#60A5FA", icebreaker: "What's the hardest thing you've bounced back from?" },
  { trait: "Focused", color: "#C084FC", icebreaker: "What does your ideal deep work session look like?" },
  { trait: "Social", color: "#FDBA74", icebreaker: "What's the best event or meetup you've ever been to?" },
];

export async function seedTraits() {
  const ops = traits.map((t) => ({
    updateOne: {
      filter: { trait: t.trait },
      update: { $set: t },
      upsert: true,
    },
  }));
  const result = await Trait.bulkWrite(ops);
  console.log(`Traits seeded: ${result.upsertedCount} inserted, ${result.modifiedCount} updated.`);
}
