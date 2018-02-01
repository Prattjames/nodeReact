
export const getGiftsService = async () => {
    const data = await fetch('https://back-uiqkeefrfw.now.sh/')
    const json = await data.json()
    console.log('service', json)
    return json
}

export const addGiftService = async (gift) => {
    const data = await fetch('https://back-uiqkeefrfw.now.sh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gift)
    })
    const json = await data.json()
    return json
}

export const removeGiftService = async (id) => {
    const data = await fetch(`https://back-uiqkeefrfw.now.sh/${id}`, {
      method: 'DELETE',
    })
    const json = await data.json()
    return json
}

export const sendGiftsService = async () => {
    const data = await fetch('https://back-uiqkeefrfw.now.sh/notify')
    const json = await data.json()
    return json
}
