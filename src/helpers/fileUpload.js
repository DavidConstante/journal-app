const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'omilec'
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'react-journal'

/** Upload a single file to Cloudinary (unsigned). Resolves to the secure URL. */
export const fileUpload = async (file) => {
  if (!file) return null

  const cloudUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`

  const formData = new FormData()
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('file', file)

  const response = await fetch(cloudUrl, { method: 'POST', body: formData })
  if (!response.ok) throw new Error('No se pudo subir la imagen')

  const { secure_url: secureUrl } = await response.json()
  return secureUrl
}
