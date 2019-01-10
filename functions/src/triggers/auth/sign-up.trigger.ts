import { UserInfo } from './user-info.model';
import { UserInfoRepository } from './user-info.repository';

export const doCreateUserInfo = (user) => {
  // Get user info from user arg
  const { uid, providerData, displayName, photoUrl, 
  phoneNumber, email, disabled, metadata } = user;
  const { creationTime, lastSignInTime } = metadata;
  console.log(`[DEBUG] - creationTime: ${creationTime}; lastSignInTime: ${lastSignInTime}`);

  // Create user info data on firestore
  const userInfoRepo = new UserInfoRepository();
  const newUserInfo: UserInfo = {
    uid, displayName, photoUrl: !photoUrl ? null : photoUrl, 
    phoneNumber, email, creationTime, lastSignInTime, 
    providerData: providerData.map(provider => {
      delete provider.toJSON;
      return provider
    }), 
    disabled,
    isVerified: false,    
  };
  return userInfoRepo.create(newUserInfo);
};
