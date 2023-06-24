import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  // Función para realizar la solicitud de logout al backend
  const handleLogout = async () => {
    try {
      // Realizar la solicitud al backend para cerrar la sesión
      const response = await fetch('http://localhost:3001/logout');
      const data = await response.json();
      console.log(data.message); // Mostrar mensaje de salida exitosa en la consola

      // Redirigir al usuario a la página de inicio de sesión u otra página de tu elección
      router.push('/');
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
