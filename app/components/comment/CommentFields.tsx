import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ChangeEventHandler } from "react";
import { FormInput } from "./FormInput";
import type { CommentFormField } from "./commentFormConfig";
import type { CommentFormFieldName } from "./commentFormConfig";

type CommentFieldsProps = {
    fields: CommentFormField[];
    gridClass: string;
    delay: number;
    formData: Record<CommentFormFieldName, string>;
    onInputChange: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >;
    dir: "ltr" | "rtl";
};

/** Renders a group of animated fields within the comment form. */
export function CommentFields({
    fields,
    gridClass,
    delay,
    formData,
    onInputChange,
    dir,
}: CommentFieldsProps) {
    const fadeInVariant: Variants = {
        offscreen: { opacity: 0, y: 30 },
        onscreen: {
            opacity: 1,
            y: 0,
            transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.7,
                delay,
            },
        },
    };

    return (
        <motion.div
            variants={fadeInVariant}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            className={`grid ${gridClass}`}
        >
            {fields.map((field) => (
                <FormInput
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    isTextarea={field.isTextarea}
                    value={formData[field.name] || ""}
                    onChange={onInputChange}
                    customValidationMessage={field.customValidationMessage}
                    inputMode={field.inputMode}
                    pattern={field.pattern}
                    title={field.title}
                    required={field.required}
                    dir={dir}
                />
            ))}
        </motion.div>
    );
}
