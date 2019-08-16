const Patient = require("./modules/patient.js");
const victim = new Patient(100);

victim.setDisease(17);

console.log(`Pulse: ${victim.getPulseText()}  Status: ${victim.getStatusText()}
Temperature: ${victim.temperature}  Operation site: ${victim.getOperationSiteText()}
Incisions: ${victim.incisions}  Bones: ${victim.getBones()}
${victim.getText()}`);

console.log(" ");
if (victim.surgeryEnded) {
  console.log("Surgery ended.");
  console.log(victim.endText);
}
