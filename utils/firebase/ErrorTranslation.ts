export const FirebaseErrorMap: Record<string, string> = {
  //login errors
  'auth/invalid-email': 'Email address is badly formatted',
  'auth/user-disabled': 'User account is disabled',
  'auth/user-not-found': 'There is no user corresponding to email',
  'auth/wrong-password': 'Wrong password',
  //register errors
  'auth/email-already-in-use': 'Email is already in use',
  'auth/invalid-email	': 'TEmail address is badly formatted',
  'auth/operation-not-allowed	': 'Operation not allowed',
  'auth/weak-password	': 'Password must have at least 6 characters',

  'auth/too-many-requests': 'Too many requests, try again later',
};
