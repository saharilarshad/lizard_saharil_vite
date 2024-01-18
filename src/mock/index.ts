import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });

    this.get('/posts/:id', (schema, request) => {
      const postId = request.params.id;
      const post = data.posts.find(post => post.id === postId);

      if (post) {
        return { post };
      } else {
        return { error: 'Post not found' };
      }
    });
  },
});


// import { useEffect, useState } from 'react';
// import { createServer } from 'miragejs';
// import data from './data.json';

// export const useMirageServer = () => {
//     const [isServerSetupComplete, setServerSetupComplete] = useState(false);

//     useEffect(() => {
//         createServer({
//             routes() {
//                 this.namespace = 'api';

//                 this.get('/posts', () => {
//                     return data;
//                 });
//             },
//         });

//         setServerSetupComplete(true)
//     }, []);

//     return {isServerSetupComplete, data};
// };