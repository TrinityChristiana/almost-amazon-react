import supabase from '../clients/supabaseClient';

const signInUser = () => new Promise((resolve, reject) => {
  supabase.auth
    .signIn({
      // provider can be 'github', 'google', 'gitlab', or 'bitbucket'
      provider: 'google',
    })
    .then(({ user, session, error }) => {
      if (error) {
        reject(error);
      } else {
        resolve(user, session);
      }
    });
});
const signOutUser = () => new Promise((resolve, reject) => {
  supabase.auth.signOut()
    .then(({ error }) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
});

export {
  signInUser,
  signOutUser
};
