import Tesseract from "tesseract.js";

const extractText = async (imageSrc) => {
  const worker = await Tesseract.createWorker();
  try {
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(imageSrc);
    return text;
  } catch (e) {
    console.log(e);
  } finally {
    await worker.terminate();
  }
};

const extractPlayerStats = (text) => {
  const lines = text.split("\n");
  const stats = {
    goals: "N/A",
    assists: "N/A",
    passes: "N/A",
    tackles: "N/A",
  };

  lines.forEach((line) => {
    if (line.includes("Goals")) {
      const goalLine = line.split(" ");
      stats.goals = goalLine[goalLine.length - 2];
    } else if (line.includes("Assists")) {
      const assistLine = line.split(" ");
      stats.assists = assistLine[assistLine.length - 2];
    } else if (line.includes("Passes")) {
      const passLine = line.split(" ");
      stats.passes = passLine[passLine.length - 2];
    } else if (line.includes("Tackles")) {
      const tackleLine = line.split(" ");
      stats.tackles = tackleLine[tackleLine.length - 2];
    }
  });
  return stats;
};

// testing
const imageSrc = "Screenshot 2023-01-16 at 14.22.11.jpg";

(async () => {
  const textExtracted = await extractText(imageSrc);
  const playerStats = extractPlayerStats(textExtracted);
  console.log(textExtracted);
  console.log(playerStats);
})();
