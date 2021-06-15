import axiosClient from '../clients/axiosClient';

const ADMIN_ID = process.env.REACT_APP_ADMIN_ID;
const NON_ADMIN_ID = process.env.REACT_APP_NON_ADMIN_ID;

const convertUserObj = (userObj) => {
  const {
    access_token: accessToken, //
    expires_at: expiresAt,
    expires_in: expiresIn,
    provider_token: providerToken,
    refresh_token: refreshToken,
    token_type: tokenType,
    user: {
      updated_at: updatedAt,
      app_metadata: { provider },
      aud,
      confirmed_at: confirmedAt,
      created_at: createdAt,
      email,
      id: uid,
      last_sign_in_at: lastSignInAt,
      role,
      user_metadata: {
        avatar_url: avatarUrl, //
        full_name: fullName,
      },
    },
  } = userObj;

  const userInfo = {
    uid,
    fullName,
    avatarUrl,
    email,
    metadata: {
      role,
      provider,
      aud,
      lastSignInAt,
      updatedAt,
      confirmedAt,
      createdAt,
    },
    sessionInfo: {
      accessToken,
      expiresAt,
      expiresIn,
      providerToken,
      refreshToken,
      tokenType,
    },
  };
  return userInfo;
};

// prettier-ignore
const getUserInfo = (uid) => new Promise((resolve, reject) => (
  axiosClient.get(`/user__user_types?select=*,user_type_id(*)&user_id=eq.${uid}`))
  .then((resp) => resolve(resp.data))
  .catch(reject));

// prettier-ignore
const getAllUserInfo = async (userObj) => {
  const convertedUser = convertUserObj(userObj);
  let userInfo = await getUserInfo(convertedUser.uid);
  if (!userInfo.length) {
    await axiosClient.post('/user__user_types', {
      user_id: convertedUser.uid,
      user_type_id: NON_ADMIN_ID,
    });
    userInfo = await getUserInfo(convertedUser.uid);
  }

  const userWithType = {
    ...convertedUser,
    isAdmin: userInfo[0].user_type_id.id === ADMIN_ID,
    userType: userInfo[0],
  };
  return (userWithType);
};

export {
  // eslint-disable-next-line
  getAllUserInfo, //
};
