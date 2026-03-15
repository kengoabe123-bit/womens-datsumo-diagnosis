import { services, Service } from './services';

export interface Question {
    id: number;
    text: string;
    subtext?: string;
    options: Option[];
}

export interface Option {
    label: string;
    scores: Record<string, number>;
}

export interface DiagnosisResult {
    service: Service;
    score: number;
    matchRate: number;
    reason: string;
}

interface ConditionalReason {
    condition: (answers: number[]) => boolean;
    text: string;
}

export const questions: Question[] = [
    {
        id: 1,
        text: '一番脱毛したい部位はどこですか？',
        subtext: '最も優先したい部位を選んでください',
        options: [
            {
                label: '全身まるごと（顔・VIO含む）',
                scores: { 'regina': 5, 'eminal': 5, 'aletheia': 4, 'frey-a': 4, 'shonan-w': 3, 'musee': 3 },
            },
            {
                label: 'ワキ・腕・脚など見える部分',
                scores: { 'regina': 4, 'eminal': 4, 'aletheia': 4, 'frey-a': 3, 'shonan-w': 5, 'musee': 5 },
            },
            {
                label: 'VIO（デリケートゾーン）',
                scores: { 'regina': 5, 'eminal': 5, 'aletheia': 4, 'frey-a': 4, 'shonan-w': 3, 'musee': 3 },
            },
            {
                label: '顔（産毛・口周り）',
                scores: { 'regina': 4, 'eminal': 3, 'aletheia': 3, 'frey-a': 5, 'shonan-w': 4, 'musee': 4 },
            },
        ],
    },
    {
        id: 2,
        text: '脱毛にかけられる予算はどのくらいですか？',
        subtext: 'コース全体の総額イメージで選んでください',
        options: [
            {
                label: 'できるだけ安く済ませたい（5万円以下）',
                scores: { 'regina': 4, 'eminal': 5, 'aletheia': 3, 'frey-a': 3, 'shonan-w': 5, 'musee': 4 },
            },
            {
                label: 'コスパ重視（5〜15万円）',
                scores: { 'regina': 5, 'eminal': 5, 'aletheia': 4, 'frey-a': 4, 'shonan-w': 4, 'musee': 3 },
            },
            {
                label: '効果重視なら多少高くてもOK',
                scores: { 'regina': 5, 'eminal': 4, 'aletheia': 4, 'frey-a': 4, 'shonan-w': 3, 'musee': 2 },
            },
            {
                label: '月々の支払いを抑えたい',
                scores: { 'regina': 3, 'eminal': 4, 'aletheia': 5, 'frey-a': 5, 'shonan-w': 3, 'musee': 3 },
            },
        ],
    },
    {
        id: 3,
        text: '痛みに対してどのくらい不安がありますか？',
        options: [
            {
                label: 'かなり心配。痛いのは無理',
                scores: { 'regina': 4, 'eminal': 4, 'aletheia': 3, 'frey-a': 5, 'shonan-w': 2, 'musee': 5 },
            },
            {
                label: '多少なら我慢できる',
                scores: { 'regina': 4, 'eminal': 4, 'aletheia': 4, 'frey-a': 4, 'shonan-w': 4, 'musee': 4 },
            },
            {
                label: '麻酔があれば大丈夫',
                scores: { 'regina': 5, 'eminal': 4, 'aletheia': 4, 'frey-a': 3, 'shonan-w': 3, 'musee': 2 },
            },
            {
                label: '痛みは気にしない。効果重視',
                scores: { 'regina': 5, 'eminal': 4, 'aletheia': 4, 'frey-a': 3, 'shonan-w': 4, 'musee': 2 },
            },
        ],
    },
    {
        id: 4,
        text: '通いやすさで重視するポイントは？',
        options: [
            {
                label: '自宅や職場の近くにあること',
                scores: { 'regina': 3, 'eminal': 4, 'aletheia': 3, 'frey-a': 3, 'shonan-w': 5, 'musee': 4 },
            },
            {
                label: '予約の取りやすさ',
                scores: { 'regina': 3, 'eminal': 3, 'aletheia': 5, 'frey-a': 4, 'shonan-w': 3, 'musee': 3 },
            },
            {
                label: '追加費用がかからないこと',
                scores: { 'regina': 5, 'eminal': 4, 'aletheia': 4, 'frey-a': 4, 'shonan-w': 3, 'musee': 3 },
            },
            {
                label: '急なキャンセルにも対応してくれること',
                scores: { 'regina': 4, 'eminal': 3, 'aletheia': 5, 'frey-a': 4, 'shonan-w': 3, 'musee': 3 },
            },
        ],
    },
    {
        id: 5,
        text: '脱毛の経験はありますか？',
        options: [
            {
                label: '全くの初めて',
                scores: { 'regina': 5, 'eminal': 4, 'aletheia': 4, 'frey-a': 4, 'shonan-w': 4, 'musee': 5 },
            },
            {
                label: 'サロン脱毛の経験あり（医療脱毛に乗り換えたい）',
                scores: { 'regina': 5, 'eminal': 5, 'aletheia': 4, 'frey-a': 4, 'shonan-w': 3, 'musee': 1 },
            },
            {
                label: '医療脱毛の経験あり（追加照射したい）',
                scores: { 'regina': 4, 'eminal': 4, 'aletheia': 4, 'frey-a': 4, 'shonan-w': 5, 'musee': 2 },
            },
            {
                label: '自己処理だけしてきた',
                scores: { 'regina': 4, 'eminal': 5, 'aletheia': 4, 'frey-a': 4, 'shonan-w': 4, 'musee': 4 },
            },
        ],
    },
    {
        id: 6,
        text: 'お肌の状態で気になることは？',
        options: [
            {
                label: '敏感肌で肌荒れしやすい',
                scores: { 'regina': 4, 'eminal': 3, 'aletheia': 3, 'frey-a': 5, 'shonan-w': 2, 'musee': 4 },
            },
            {
                label: '日焼けしやすい・地黒',
                scores: { 'regina': 3, 'eminal': 3, 'aletheia': 3, 'frey-a': 5, 'shonan-w': 3, 'musee': 3 },
            },
            {
                label: '産毛が多い・毛が薄い',
                scores: { 'regina': 4, 'eminal': 3, 'aletheia': 3, 'frey-a': 5, 'shonan-w': 3, 'musee': 3 },
            },
            {
                label: '特に気にならない',
                scores: { 'regina': 4, 'eminal': 5, 'aletheia': 4, 'frey-a': 3, 'shonan-w': 4, 'musee': 4 },
            },
        ],
    },
    {
        id: 7,
        text: '最も重視するポイントを1つ選んでください',
        options: [
            {
                label: '脱毛効果の高さ',
                scores: { 'regina': 5, 'eminal': 4, 'aletheia': 4, 'frey-a': 3, 'shonan-w': 4, 'musee': 2 },
            },
            {
                label: '料金の安さ',
                scores: { 'regina': 4, 'eminal': 5, 'aletheia': 4, 'frey-a': 4, 'shonan-w': 5, 'musee': 4 },
            },
            {
                label: 'スタッフの対応・サービスの質',
                scores: { 'regina': 5, 'eminal': 4, 'aletheia': 4, 'frey-a': 4, 'shonan-w': 3, 'musee': 5 },
            },
            {
                label: '通いやすさ・利便性',
                scores: { 'regina': 3, 'eminal': 4, 'aletheia': 5, 'frey-a': 3, 'shonan-w': 5, 'musee': 4 },
            },
        ],
    },
];

const conditionalReasons: Record<string, ConditionalReason[]> = {
    'regina': [
        { condition: (a) => a[2] === 2 && a[3] === 2, text: '麻酔があれば大丈夫で追加費用なしを重視されているとのこと。レジーナクリニックは麻酔もシェービング代も無料で、一切の追加費用なく通えます。' },
        { condition: (a) => a[4] === 0, text: '初めての脱毛とのことでしたので、丁寧なカウンセリングと顧客満足度97%のレジーナクリニックが安心です。複数の脱毛機であなたの肌質に合わせた施術を行います。' },
        { condition: (a) => a[6] === 2, text: 'スタッフの対応・サービスの質を重視されているとのこと。レジーナクリニックは顧客満足度97%、丁寧な対応で多くの方に支持されています。' },
        { condition: () => true, text: '最大4種類の脱毛機と追加費用ゼロの安心感。顧客満足度97%の手厚いサポートが魅力のクリニックです。' },
    ],
    'eminal': [
        { condition: (a) => a[0] === 0 && a[1] === 0, text: '全身脱毛をできるだけ安くとのご希望に最適。エミナルクリニックの全身+VIO 6回49,500円は業界トップクラスの安さです。' },
        { condition: (a) => a[1] === 0, text: 'できるだけ安く脱毛したいとのこと。エミナルクリニックは全身+VIO 6回が49,500円と圧倒的な低価格で、コスパ最強です。' },
        { condition: (a) => a[4] === 1, text: 'サロンからの乗り換えをご希望とのこと。エミナルクリニックの医療脱毛なら、サロン脱毛より少ない回数で効果を実感でき、最短5か月で完了を目指せます。' },
        { condition: () => true, text: '全身+VIO 6回49,500円の圧倒的コスパ。最短5か月で脱毛完了を目指せるスピード感も魅力です。' },
    ],
    'aletheia': [
        { condition: (a) => a[3] === 3, text: '急なキャンセルへの対応を重視されているとのこと。アリシアクリニックは当日キャンセル無料で、ペナルティなしで予約変更できます。' },
        { condition: (a) => a[3] === 1, text: '予約の取りやすさを重視されているとのこと。アリシアクリニックは予約の取りやすさに定評があり、ストレスなく通えます。' },
        { condition: (a) => a[1] === 3, text: '月々の支払いを抑えたいとのこと。アリシアクリニックは月々1,400円から始められるプランがあり、無理なく通えます。' },
        { condition: () => true, text: '当日キャンセル無料で予約の自由度が高く、忙しい方でもストレスなく通えるクリニックです。' },
    ],
    'frey-a': [
        { condition: (a) => a[5] === 0, text: '敏感肌とのことでしたので、フレイアクリニックの蓄熱式脱毛が最適です。肌への負担が少なく、敏感肌の方にも安心の施術を提供しています。' },
        { condition: (a) => a[5] === 1, text: '日焼けしやすいとのことでしたので、褐色肌にも対応できるフレイアクリニックがおすすめです。蓄熱式脱毛はメラニンへの影響が少なく安心です。' },
        { condition: (a) => a[2] === 0, text: '痛みが心配とのことでしたので、蓄熱式脱毛で痛みがほとんどないフレイアクリニックが最適です。' },
        { condition: () => true, text: '蓄熱式脱毛で痛みが少なく、敏感肌・褐色肌・産毛にも対応。肌に優しい施術が特徴のクリニックです。' },
    ],
    'shonan-w': [
        { condition: (a) => a[3] === 0, text: '自宅や職場の近くにあることを重視されているとのこと。全国200院以上の湘南美容クリニックなら、通いやすい院が見つかります。' },
        { condition: (a) => a[0] === 1 && a[1] === 0, text: 'ワキや腕など見える部分をお得に脱毛したいとのこと。湘南美容のワキ脱毛6回2,500円は試しやすい価格です。' },
        { condition: (a) => a[4] === 2, text: '追加照射をご希望とのこと。湘南美容クリニックはコースの有効期限がなく、自分のペースで追加照射を続けられます。' },
        { condition: () => true, text: '全国200院以上の圧倒的な通いやすさ。実績数800万件以上の安心感と業界最安水準の料金が魅力です。' },
    ],
    'musee': [
        { condition: (a) => a[2] === 0 && a[4] === 0, text: '痛みが心配で初めての脱毛とのこと。ミュゼのS.S.C.脱毛は痛みが少なく、初めての方でも安心して受けられます。ジェルの美肌効果もうれしいポイントです。' },
        { condition: (a) => a[0] === 1, text: 'ワキや腕など見える部分の脱毛をご希望とのこと。ミュゼの両ワキ+Vライン回数無制限プランなら、気軽に始められます。' },
        { condition: (a) => a[6] === 2, text: 'サービスの質を重視されているとのこと。ミュゼは会員数400万人超の実績があり、接客の丁寧さに定評があります。' },
        { condition: () => true, text: '痛みの少ないS.S.C.脱毛と美肌効果を同時に。会員数400万人超の実績で安心して通えるサロンです。' },
    ],
};

function selectReason(serviceId: string, answers: number[], fallbackReason: string): string {
    const reasons = conditionalReasons[serviceId];
    if (reasons) {
        for (const r of reasons) {
            if (r.condition(answers)) return r.text;
        }
    }
    return fallbackReason;
}

export function calculateResults(answers: number[]): DiagnosisResult[] {
    const scoreMap: Record<string, number> = {};
    services.forEach((s) => { scoreMap[s.id] = 0; });
    answers.forEach((optionIndex, questionIndex) => {
        const question = questions[questionIndex];
        if (question && question.options[optionIndex]) {
            Object.entries(question.options[optionIndex].scores).forEach(([serviceId, score]) => {
                if (scoreMap[serviceId] !== undefined) { scoreMap[serviceId] += score; }
            });
        }
    });
    const results: DiagnosisResult[] = services
        .map((service) => ({ service, score: scoreMap[service.id] || 0, matchRate: 0, reason: selectReason(service.id, answers, service.tagline) }))
        .sort((a, b) => b.score - a.score);
    const top3 = results.slice(0, 3);
    const topScore = top3[0]?.score || 1;
    return top3.map((r, i) => {
        const scoreRatio = topScore > 0 ? r.score / topScore : 0.5;
        let displayRate: number;
        if (i === 0) displayRate = 73 + Math.round(scoreRatio * 12);
        else if (i === 1) displayRate = 67 + Math.round(scoreRatio * 11);
        else displayRate = 60 + Math.round(scoreRatio * 12);
        return { ...r, matchRate: displayRate };
    });
}
