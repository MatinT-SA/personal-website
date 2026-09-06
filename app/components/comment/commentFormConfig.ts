import type { HTMLInputTypeAttribute, HTMLAttributes } from "react";

export type CommentFormFieldName =
    | "name"
    | "familyname"
    | "email"
    | "phonenumber"
    | "CommentMessage";

export type CommentFormField = {
    id: string;
    name: CommentFormFieldName;
    label: string;
    type: HTMLInputTypeAttribute;
    isTextarea: boolean;
    required?: boolean;
    customValidationMessage?: string;
    inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
    pattern?: string;
    title?: string;
};

export type CommentFormFieldGroup = {
    groupId: string;
    fields: CommentFormField[];
    gridClass: string;
    delay: number;
};

type CommentFormTranslator = (key: string) => string;

/**
 * Returns the translated field configuration used by the comment form.
 */
export function getCommentFormFields(
    t: CommentFormTranslator,
): CommentFormFieldGroup[] {
    return [
        {
            groupId: "nameGroup",
            fields: [
                {
                    id: "name",
                    name: "name",
                    label: t("name"),
                    type: "text",
                    isTextarea: false,
                },
                {
                    id: "familyname",
                    name: "familyname",
                    label: t("lastname"),
                    type: "text",
                    isTextarea: false,
                },
            ],
            gridClass: "grid-cols-1 md:grid-cols-2 gap-x-6",
            delay: 0.2,
        },
        {
            groupId: "contactGroup",
            fields: [
                {
                    id: "CommentEmail",
                    name: "email",
                    label: t("email"),
                    type: "email",
                    required: true,
                    customValidationMessage: t("valid_email_message"),
                    isTextarea: false,
                },
                {
                    id: "phonenumber",
                    name: "phonenumber",
                    label: t("phonenumber"),
                    type: "tel",
                    inputMode: "numeric",
                    pattern: "^(?:\+?\d{10,15}|0\d{9,14}|\d{10,14})$",
                    title: t("valid_phone_message"),
                    customValidationMessage: t("valid_phone_message"),
                    isTextarea: false,
                },
            ],
            gridClass: "grid-cols-1 md:grid-cols-2 gap-x-8",
            delay: 0.3,
        },
        {
            groupId: "messageGroup",
            fields: [
                {
                    id: "CommentMessage",
                    name: "CommentMessage",
                    label: t("message"),
                    type: "text",
                    required: true,
                    customValidationMessage: t("valid_message_message"),
                    isTextarea: true,
                },
            ],
            gridClass: "grid-cols-1",
            delay: 0.4,
        },
    ];
}
