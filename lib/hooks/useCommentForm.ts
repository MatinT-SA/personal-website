import { useState, useCallback } from "react";
import type { ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

interface CommentFormData {
  name: string;
  familyname: string;
  email: string;
  phonenumber: string;
  CommentMessage: string;
}

type CommentTranslationKey =
  | "success_message"
  | "error_message"
  | "error_message2";
type CommentTranslator = (key: CommentTranslationKey) => string;

const createInitialFormData = (): CommentFormData => ({
  name: "",
  familyname: "",
  email: "",
  phonenumber: "",
  CommentMessage: "",
});

interface UseCommentFormOptions {
  t: CommentTranslator;
}

export function useCommentForm({ t }: UseCommentFormOptions) {
  const [formData, setFormData] = useState<CommentFormData>(
    createInitialFormData
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormData(createInitialFormData());
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      const form = e.currentTarget;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      e.preventDefault();
      setIsSubmitting(true);

      try {
        const response = await fetch("/api/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success(t("success_message"), {
            duration: 3000,
            position: "bottom-right",
          });
          resetForm();
        } else {
          const errorData: { message?: string } = await response.json();
          const errorMessage = errorData.message || t("error_message");
          toast.error(errorMessage, {
            duration: 3000,
            position: "bottom-right",
          });
          console.error("API response error:", errorData);
        }
      } catch (error: unknown) {
        toast.error(t("error_message2"), {
          duration: 4000,
          position: "bottom-right",
        });
        console.error("Fetch failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, t, resetForm]
  );

  return {
    formData,
    handleInputChange,
    handleSubmit,
    isSubmitting,
  };
}
