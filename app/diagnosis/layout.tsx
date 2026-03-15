import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '脱毛診断 | ツルスベNavi - あなたに最適なクリニックを見つけよう',
    description:
        '7つの質問に答えるだけで、あなたにピッタリの脱毛クリニック・サロンがわかります。脱毛部位、予算、肌質から総合的に分析。',
    openGraph: {
        title: '脱毛診断 | ツルスベNavi',
        description: '7つの質問であなたにピッタリの脱毛クリニックを診断。30秒で結果がわかります。',
        type: 'website',
        locale: 'ja_JP',
    },
};

export default function DiagnosisLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
