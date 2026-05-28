import { useUsernameSetup } from "../hooks/useUsernameSetup";

export const UsernameSetupForm = () => {
  const {
    username,
    setUsername,
    handleSubmit,
    loading,
  } = useUsernameSetup();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <input
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
        placeholder="Selecciona tu username"
        className="border rounded-lg px-4 py-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-[#1B3D6F] py-3 text-white"
      >
        {loading
          ? "Creando cuenta..."
          : "Continuar"}
      </button>
    </form>
  );
};