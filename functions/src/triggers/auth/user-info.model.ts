import * as admin from 'firebase-admin';

export interface UserInfo extends admin.firestore.DocumentData {
  uid?: string,
  disabled: boolean,
  displayName: string,
  photoUrl?: string|null,
  phoneNumber: number,
  email: string,
  creationTime: number,
  lastSignInTime: number,
  providerData: any,
  isVerified: boolean
  // TODO: Add more field
}
