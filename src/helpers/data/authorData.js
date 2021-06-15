import axiosClient from '../clients/axiosClient';

const getAuthors = () => new Promise((resolve, reject) => {
  axiosClient.get('Authors')
    .then((resp) => resolve(resp.data))
    .catch(reject);
});

export {
  // eslint-disable-next-line import/prefer-default-export
  getAuthors,
};
