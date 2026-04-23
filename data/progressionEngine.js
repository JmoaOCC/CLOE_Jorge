export function generateStrengthWeek(week) {

  const progression = (week > 1);

  return {
    semana: week,

    diaA: [
      { ejercicio: "Sentadilla", series: 3, reps: "6-8", RIR: 2, carga: progression ? "+5kg" : "base" },
      { ejercicio: "Press banca", series: 3, reps: "6-8", RIR: 2, carga: progression ? "+2.5kg" : "base" }
    ],

    diaB: [
      { ejercicio: "Hack squat", series: 3, reps: "8-10", RIR: 2 },
      { ejercicio: "Press inclinado", series: 3, reps: "8-10", RIR: 2 }
    ]
  };
}
