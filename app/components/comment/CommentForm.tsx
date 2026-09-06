import { useMemo } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { CommentFields } from "./CommentFields";
import { LiquidButton } from "./LiquidButton";
import { getCommentFormFields } from "./commentFormConfig";
import type { CommentFormFieldName } from "./commentFormConfig";

type CommentFormProps = {
    formData: Record<CommentFormFieldName, string>;
    onInputChange: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >;
    onSubmit: FormEventHandler<HTMLFormElement>;
    isSubmitting: boolean;
    t: (key: string) => string;
    dir: "ltr" | "rtl";
};

/** Presentational wrapper for the comment form. */
export function CommentForm({
    formData,
    onInputChange,
    onSubmit,
    isSubmitting,
    t,
    dir,
}: CommentFormProps) {
    const fieldGroups = useMemo(() => getCommentFormFields(t), [t]);

    return (
        <form
            dir={dir}
            autoComplete="off"
            onSubmit={onSubmit}
            className="max-w-6xl mx-auto p-4"
        >
            {fieldGroups.map((group) => (
                <CommentFields
                    key={group.groupId}
                    fields={group.fields}
                    gridClass={group.gridClass}
                    delay={group.delay}
                    formData={formData}
                    onInputChange={onInputChange}
                    dir={dir}
                />
            ))}

            <div className="flex justify-center">
                <LiquidButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? t("isSubmitting") : t("submit_button")}
                </LiquidButton>
            </div>
        </form>
    );
}
