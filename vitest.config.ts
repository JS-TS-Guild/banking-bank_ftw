// import { defineConfig } from 'vitest/config'
// import tsconfigPaths from 'vite-tsconfig-paths';

// export default defineConfig({
//   plugins: [tsconfigPaths()],
//   test: {
//     // Vitest configuration options
//   }
// })

// import { defineConfig } from 'vitest/config';
// import tsconfigPaths from 'vite-tsconfig-paths';

// export default defineConfig({
//   plugins: [tsconfigPaths()],
//   test: {
//     globals: true,
//     environment: 'node',
//   },
// });


import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
  },
});


