import { Input } from "@nextui-org/react";
import { SubmitButton } from "@/components/custom/SubmitButton";
import { ZodErrors } from "@/components/custom/ZodErrors";
import { registerAction } from "@/data/actions/auth/registerAction";
import { useFormState } from "react-dom";
import { ApiErrors } from "@/components/custom/ApiErrors";

const INITIAL_STATE = {
  apiErrors: null,
  zodErrors: null,
  data: null,
  message: null,
};

export default function RegisterForm() {
  const [formState, formAction] = useFormState(registerAction, INITIAL_STATE);
  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nombre
        </label>
        <Input
          id="firstName"
          name="firstName"
          placeholder="firstName"
          type={"firstName"}
          autoCapitalize="none"
          autoComplete="firstName"
          autoCorrect="off"
          className="w-full"
        />
        <ZodErrors error={formState?.zodErrors?.firstName} />
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Apellido
        </label>
        <Input
          id="lastName"
          name="lastName"
          placeholder="lastName"
          type={"lastName"}
          autoCapitalize="none"
          autoComplete="lastName"
          autoCorrect="off"
          className="w-full"
        />
        <ZodErrors error={formState?.zodErrors?.lastName} />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Correo Electrónico
        </label>
        <Input
          id="email"
          name="email"
          placeholder="tu@ejemplo.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          className="w-full"
        />
        <ZodErrors error={formState?.zodErrors?.email} />
      </div>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Usuario
        </label>
        <Input
          id="username"
          name="username"
          placeholder="username"
          type={"username"}
          autoCapitalize="none"
          autoComplete="username"
          autoCorrect="off"
          className="w-full"
        />
        <ZodErrors error={formState?.zodErrors?.username} />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Contraseña
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={"password"}
            autoCapitalize="none"
            autoComplete="current-password"
            autoCorrect="off"
            placeholder="********"
            className="w-full"
          />
          <ZodErrors error={formState?.zodErrors?.password} />
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <SubmitButton
          className="w-full"
          text="Registrarse"
          loadingText="Cargando"
          color="blue"
          size="large"
        />
        <ApiErrors error={formState.apiErrors} />
      </div>
    </form>
  );
}
