import { useState } from "react";
import type {
    ChangeEvent,
    ChangeEventHandler,
    FormEvent,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
} from "react";

type FormInputProps = {
    id: string;
    label: string;
    isTextarea?: boolean;
    customValidationMessage?: string;
    dir?: "ltr" | "rtl";
    name: string;
    value: string;
    type?: InputHTMLAttributes<HTMLInputElement>["type"];
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
    pattern?: string;
    title?: string;
    required?: boolean;
};

/**
 * Controlled input or textarea with a floating label and custom HTML5 validation.
 */
export const FormInput = ({
    id,
    label,
    isTextarea = false,
    customValidationMessage,
    dir = "ltr",
    name,
    value,
    type = "text",
    onChange,
    inputMode,
    pattern,
    title,
    required,
}: FormInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const shouldFloat = isFocused || Boolean(value);

    const handleInvalid = (
        event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        if (customValidationMessage) {
            event.currentTarget.setCustomValidity(customValidationMessage);
        }
    };

    const handleInput = (
        event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const target = event.currentTarget;
        target.setCustomValidity("");

        // Sanitize numeric input only for phone number fields.
        if (type === "tel") {
            target.value = target.value.replace(/[^0-9+\s-]/g, "");
        }

        // The existing form uses onInput to forward the event to its controlled state handler.
        onChange?.(event as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
    };

    const fieldClassName = `
        w-full bg-transparent text-purple-primary text-lg px-2 my-2 leading-none
        placeholder-transparent focus:outline-none transition-all duration-300 relative z-10
        ${isTextarea ? "h-full resize-none pt-4" : "h-full"}
        ${dir === "rtl" ? "text-right" : "text-left"}
    `;

    const sharedProps = {
        id,
        name,
        value,
        dir,
        className: fieldClassName,
        placeholder: label,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        onInvalid: handleInvalid,
        onInput: handleInput,
    };

    return (
        <div
            className={`relative pt-6 pb-2 mb-8 transition-all duration-300 ${
                isTextarea ? "min-h-[120px]" : "h-[75px]"
            }`}
            dir={dir}
        >
            {isTextarea ? (
                <textarea
                    {...(sharedProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    rows={4}
                    required={required}
                />
            ) : (
                <input
                    {...(sharedProps as InputHTMLAttributes<HTMLInputElement>)}
                    type={type}
                    inputMode={inputMode}
                    pattern={pattern}
                    title={title}
                    required={required}
                />
            )}

            {/* Underline background */}
            <span
                className="absolute bottom-0 left-0 block w-full bg-white/30 transition-all duration-500 rounded-sm pointer-events-none"
                style={{ height: "2px" }}
            ></span>

            {/* Animated yellow underline */}
            <span
                className="absolute bottom-0 left-0 block w-full bg-yellow-400 transition-all duration-500 rounded-sm pointer-events-none origin-bottom"
                style={{
                    height: shouldFloat ? (isTextarea ? "80%" : "40px") : "2px",
                }}
            ></span>

            {/* Floating label */}
            <label
                htmlFor={id}
                className={`
                    absolute top-0 px-2 z-20 pointer-events-none transition-all duration-500
                    ${dir === "rtl" ? "right-0 text-right" : "left-0 text-left"}
                    ${
                        shouldFloat
                            ? "text-sm text-yellow-400"
                            : "text-xl text-yellow-400 translate-y-[30px]"
                    }
                `}
            >
                {label}
            </label>
        </div>
    );
};
