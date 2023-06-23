import FormularyRegister from './components/FormularyRegister';
import LoginForm from './components/LoginForm';

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <FormularyRegister />
        <LoginForm />
      </main>
    </div>
  );
}
