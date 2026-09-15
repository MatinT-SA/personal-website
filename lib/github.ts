import "server-only";

const GITHUB_API_URL = "https://api.github.com/graphql";

export interface GithubContributionDay {
    contributionCount: number;
    date: string;
}

export interface GithubContributionWeek {
    contributionDays: GithubContributionDay[];
}

export interface GithubContributionsResponse {
    data: {
        user: {
            contributionsCollection: {
                contributionCalendar: {
                    weeks: GithubContributionWeek[];
                };
            };
        } | null;
    };
}

export async function getGithubContributions(): Promise<GithubContributionsResponse> {
    const token = process.env.GITHUB_TOKEN;

    const response = await fetch(GITHUB_API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
        {
          user(login: "MatinT-SA") {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `,
        }),
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch GitHub data");
    }

    const data = (await response.json()) as GithubContributionsResponse;
    return data;
}
