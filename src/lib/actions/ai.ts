import { Prisma } from "@prisma/client";

export async function generateAIDescription(zutaten: Prisma.ZutatCreateInput[], steps: Prisma.RezeptStepCreateInput[]): Promise<string> {

    const zutaten_string = zutaten.map(zutat => zutat.name + " Typ:" + zutat.type + " Menge: " + zutat.amount).join(", ")
    const steps_string = steps.map(step => step.text).join("\n")
    const prompt = `
    Schreibe eine 50 Wörter Zusammenfassung für ein Resultat mit diesen Stoffen:
    ${zutaten_string}
    Folgende Schritte:
    ${steps_string}
    Beschreibe Konsistenz, Geschmack und Aussehen.
    Erwähne die Schritte und Zutaten NICHT.
    `

    console.log(prompt)
    const ftch = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        body: JSON.stringify({
            model: "artifish/llama3.2-uncensored",
            prompt: prompt,
            stream: false
        })
    })
    if (!ftch.ok) {
        throw new Error("Failed to fetch")
    }
    const data = await ftch.json()
    console.log(data)
    return data.response
}