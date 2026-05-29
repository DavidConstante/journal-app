import { afterEach, describe, expect, it, vi } from 'vitest'
import { fileUpload } from '@/helpers/fileUpload'

describe('fileUpload', () => {
  afterEach(() => vi.restoreAllMocks())

  it('returns null when no file is provided', async () => {
    expect(await fileUpload(null)).toBeNull()
  })

  it('uploads a file and returns the secure URL', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ secure_url: 'https://cdn/x.jpg' }) })
    vi.stubGlobal('fetch', fetchMock)

    const file = new File(['data'], 'photo.png', { type: 'image/png' })
    const url = await fileUpload(file)

    expect(url).toBe('https://cdn/x.jpg')
    expect(fetchMock).toHaveBeenCalledOnce()
    const [calledUrl, options] = fetchMock.mock.calls[0]
    expect(calledUrl).toContain('/upload')
    expect(options.method).toBe('POST')
    expect(options.body).toBeInstanceOf(FormData)
  })

  it('throws when the upload fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    const file = new File(['data'], 'photo.png', { type: 'image/png' })
    await expect(fileUpload(file)).rejects.toThrow('No se pudo subir la imagen')
  })
})
