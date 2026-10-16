import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function Input({ label, id, className = "", ...props }: InputProps) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label htmlFor={id} className="text-sm font-medium">
                {label}
            </label>
            <input
            id={id}
            {...props}
            className="rounded-xl border-2 border-azul/40 bg-white px-4 py-2 outline-none focus:border-rosa transition"
            />
        </div>
    )
}