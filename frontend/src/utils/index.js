import surpriseMwPrompts from '../constants'
export const getRandomPrompt = (prompt) => {
    const randomIndex = Math.floor(Math.random() * surpriseMwPrompts.length)
    if (randomIndex === prompt) { return getRandomPrompt(prompt)}
    else { return surpriseMwPrompts[randomIndex] }
}
