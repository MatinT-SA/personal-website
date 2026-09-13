"use client";

import { forwardRef, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CommentForm } from "@/app/components/comment/CommentForm";
import { CommentHeader } from "@/app/components/comment/CommentHeader";
import { useCommentForm } from "@/lib/hooks/useCommentForm";

const Comment = forwardRef<HTMLElement>(function Comment(_props, ref) {
    const t = useTranslations("comment");
    const locale = useLocale();
    const isRTL = useMemo(() => locale === "fa", [locale]);
    const dir = useMemo(() => (isRTL ? "rtl" : "ltr"), [isRTL]);

    const { formData, handleInputChange, handleSubmit, isSubmitting } =
        useCommentForm({ t });

    return (
        <section
            ref={ref}
            id="comment"
            className="py-15 scroll-mt-20 h-full bg-purple-primary font-inter"
        >
            <div className="container mx-auto px-4 max-w-7xl">
                <CommentHeader title={t("title")} />
                <CommentForm
                    formData={formData}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    t={t}
                    dir={dir}
                />
            </div>
        </section>
    );
});

export default Comment;
