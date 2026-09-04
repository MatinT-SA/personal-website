import React, { type ComponentProps } from "react";
import { GitHubCalendar } from "react-github-calendar";
import type { useTranslations } from "next-intl";

type GitHubCalendarProps = ComponentProps<typeof GitHubCalendar>;
type RenderBlock = NonNullable<GitHubCalendarProps["renderBlock"]>;
type Translator = ReturnType<typeof useTranslations<"AboutMe">>;

export const createTooltipBlockRenderer =
    (t: Translator): RenderBlock =>
    (block, activity) => {
        const count = Number(activity.count ?? 0);
        const date = activity.date;

        let contributionText = "";
        if (count === 0) {
            contributionText = t("no_contribution");
        } else {
            contributionText = t("contributions", { count });
        }

        const finalContent =
            "\u200e" +
            contributionText +
            " " +
            t("on_date") +
            " \u200e" +
            date +
            "\u200e";

        return React.cloneElement(block, {
            "data-tooltip-id": "my-github-tooltip",
            "data-tooltip-content": finalContent,
            title: "",
            "aria-label": "",
            children: null,
        });
    };
