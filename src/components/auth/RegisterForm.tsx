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
        <form action={formAction} className="space-y-4">
            <div className="space-y-2">
                <label
                    htmlFor="firstName"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                    required
                />
                <ZodErrors error={formState?.zodErrors?.identifier} />
            </div>
            <div className="space-y-2">
                <label
                    htmlFor="lastName"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                    required
                />
                <ZodErrors error={formState?.zodErrors?.identifier} />
            </div>
            <div className="space-y-2">
                <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                    required
                />
                <ZodErrors error={formState?.zodErrors?.identifier} />
            </div>
            <div className="space-y-2">
                <label
                    htmlFor="username"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                    required
                />
                <ZodErrors error={formState?.zodErrors?.identifier} />
            </div>
            <div className="space-y-2">
                <label htmlFor="password">Contraseña</label>
                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        type={"password"}
                        autoCapitalize="none"
                        autoComplete="current-password"
                        autoCorrect="off"
                        placeholder="********"
                        required
                    />
                    <ZodErrors error={formState?.zodErrors?.identifier} />
                </div>
            </div>
            <div className="flex flex-col mt-8">
                <SubmitButton
                    className="w-full "
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