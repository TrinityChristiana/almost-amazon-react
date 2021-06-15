import React, { useEffect } from 'react';
import { getAuthors } from '../../helpers/data/authorData';

export const ListView = () => {
  useEffect(() => {
    getAuthors().then((resp) => {
      console.warn(resp);
    });
  }, []);
  return <div>ListView</div>;
};

export default ListView;
