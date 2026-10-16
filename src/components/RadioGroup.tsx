import type { ChangeEvent } from "react";

type RadioGroupProps = {
    label: string;
    name: string;
    opcoes: string[];
    valor: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function RadioGroup({ label, name, opcoes, valor, onChange }: RadioGroupProps) {
    return (
        <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium mb-1">{label}</legend>
            {opcoes.map((opcao) => (
                <label key={opcao} className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        value={opcao}
                        checked={valor === opcao}
                        onChange={onChange}
                        className="size-4 accent-rosa"
                    />
                    {opcao}
                </label>
            ))}
        </fieldset>
    );
}