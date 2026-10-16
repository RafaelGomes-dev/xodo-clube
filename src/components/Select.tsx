import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  opcoes: string[];
};

export default function Select({ label, id, opcoes, className = "", ...props }: SelectProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        {...props}
        className="rounded-xl border-2 border-azul/40 bg-white px-4 py-2 outline-none focus:border-rosa transition"
      >
        <option value="" disabled>
          Selecione...
        </option>
        {opcoes.map((opcao) => (
          <option key={opcao} value={opcao}>
            {opcao}
          </option>
        ))}
      </select>
    </div>
  );
}