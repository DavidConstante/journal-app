import FormData from 'form-data'

export const fileUpload = async (file) => {
  if (!file) throw new Error('No existe archivo a subir')

  const cloudURL = 'https://api.cloudinary.com/v1_1/omilec/upload?'

  // Generate medadata of promise
  const formData = new FormData()
  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)

  try {
    const rta = await fetch(cloudURL, {
      method: 'POST',
      body: formData
    })

    if (!rta.ok) throw new Error('No se pudo subir la imagen')

    const cloudRta = await rta.json()
    return cloudRta.secure_url
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}
