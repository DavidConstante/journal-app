import { useMemo, useState } from 'react'

/**
 * Lightweight controlled-form hook with optional field validations.
 * Note: this hook initialises once from `initialForm`. To reset it when the
 * source data changes (e.g. switching journal entries), remount via a `key`.
 */
export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm)

  const onInputChange = ({ target }) => {
    const { name, value } = target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const setField = (name, value) => setFormState((prev) => ({ ...prev, [name]: value }))

  const onResetForm = () => setFormState(initialForm)

  const formValidation = useMemo(() => {
    const checks = {}
    for (const field of Object.keys(formValidations)) {
      const [validator, message] = formValidations[field]
      checks[`${field}Valid`] = validator(formState[field]) ? null : message
    }
    return checks
  }, [formState, formValidations])

  const isFormValid = useMemo(
    () => Object.values(formValidation).every((value) => value === null),
    [formValidation]
  )

  return {
    ...formState,
    formState,
    setFormState,
    setField,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid,
  }
}
