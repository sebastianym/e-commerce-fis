import { Input } from "@nextui-org/react";
import { SubmitButton } from "@/components/custom/SubmitButton";
import { ZodErrors } from "@/components/custom/ZodErrors";
import { loginAction } from "@/data/actions/auth/loginAction";
import { useFormState } from "react-dom";
import { ApiErrors } from "@/components/custom/ApiErrors";

const INITIAL_STATE = {
  apiErrors: null,
  zodErrors: null,
  data: null,
  message: null,
};

export default function LoginForm() {
  const [formState, formAction] = useFormState(loginAction, INITIAL_STATE);
  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="identifier"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Identificador
        </label>
        <Input
          id="identifier"
          name="identifier"
          placeholder="tu@ejemplo.com"
          type="text"
          autoCapitalize="none"
          autoComplete="identifier"
          autoCorrect="off"
        />
        <ZodErrors error={formState?.zodErrors?.identifier} />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
          />
        </div>
        <ZodErrors error={formState?.zodErrors?.password} />
      </div>
      <div className="flex flex-col mt-8">
        <SubmitButton
          className="w-full "
          text="Iniciar sesión"
          loadingText="Cargando"
          color="blue"
          size="large"
        />
        <ApiErrors error={formState.apiErrors} />
      </div>
    </form>
  );
}
