const MESSAGES = {
  'auth/invalid-email': 'El correo no es válido.',
  'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
  'auth/user-not-found': 'No existe una cuenta con ese correo.',
  'auth/wrong-password': 'Correo o contraseña incorrectos.',
  'auth/invalid-credential': 'Correo o contraseña incorrectos.',
  'auth/email-already-in-use': 'Ya existe una cuenta con ese correo.',
  'auth/weak-password': 'La contraseña es demasiado débil (mínimo 6 caracteres).',
  'auth/missing-password': 'Escribe tu contraseña.',
  'auth/popup-closed-by-user': 'Cerraste la ventana antes de terminar.',
  'auth/cancelled-popup-request': 'Se canceló el inicio de sesión.',
  'auth/popup-blocked': 'El navegador bloqueó la ventana emergente.',
  'auth/network-request-failed': 'Problema de conexión. Revisa tu internet.',
  'auth/too-many-requests': 'Demasiados intentos. Inténtalo más tarde.',
}

/** Map a Firebase Auth error to a friendly Spanish message. */
export function friendlyAuthError(error) {
  return MESSAGES[error?.code] || 'Ocurrió un error. Inténtalo de nuevo.'
}
