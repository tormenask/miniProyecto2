import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/modules/auth/store/AuthContext';
import { router } from '@/app/router';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
