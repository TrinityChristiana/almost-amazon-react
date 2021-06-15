import axiosClient from '../clients/axiosClient';

const ADMIN_ID = process.env.REACT_APP_ADMIN_ID;

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
const getAllUserInfo = (userObj) => new Promise((resolve, reject) => {
  const convertedUser = convertUserObj(userObj);
  axiosClient
    .get(`/user__user_types?select=*,user_type_id(*)&user_id=eq.${convertedUser.uid}`)
    .then((resp) => {
      const userWithType = {
        ...convertedUser,
        isAdmin: resp.data[0].user_type_id.id === ADMIN_ID,
        userType: resp.data[0],
      };

      resolve(userWithType);
    })
    .catch(reject);
});

export {
  // eslint-disable-next-line import/prefer-default-export
  getAllUserInfo, //
};
