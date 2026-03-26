import Link from 'next/link';
import { services } from '@/lib/services';

export const metadata = {
    title: '女性脱毛サロン一覧',
    description: '女性に人気の脱毛サロンを厳選。あなたの肌質やライフスタイルに合ったサロンが見つかります。',
};

export default function ServicesPage() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)',
            padding: '2rem 1rem',
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: 'white',
                    textAlign: 'center' as const,
                    marginBottom: '0.5rem',
                }}>
                    女性脱毛サロン一覧
                </h1>
                <p style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.6)',
                    textAlign: 'center' as const,
                    marginBottom: '2rem',
                    lineHeight: 1.6,
                }}>
                    女性に人気の脱毛サロンを厳選。あなたの肌質やライフスタイルに合ったサロンが見つかります。
                </p>

                <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '1.2rem',
                    marginBottom: '2rem',
                    textAlign: 'center' as const,
                }}>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.8rem' }}>
                        どれが合うかわからない方は、まず無料診断をお試しください
                    </p>
                    <Link href="/diagnosis" style={{
                        display: 'inline-block',
                        background: '#5BA4B5',
                        color: 'white',
                        padding: '0.7rem 2rem',
                        borderRadius: '25px',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                    }}>
                        ✨ 無料で診断する
                    </Link>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.2rem' }}>
                    {services.map((service, index) => (
                        <div key={service.id} style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                        }}>
                            <div style={{ marginBottom: '0.5rem' }}>
                                <span style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    color: '#5BA4B5',
                                    marginBottom: '0.3rem',
                                    display: 'block',
                                }}>
                                    {service.category}
                                </span>
                                <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', margin: 0 }}>
                                    {service.name}
                                </h2>
                                {service.nameEn && (
                                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>
                                        {service.nameEn}
                                    </span>
                                )}
                            </div>
                            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
                                {service.tagline}
                            </p>
                            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                                {service.description}
                            </p>
                            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.6rem' }}>
                                \ud83c\udfaf {service.target}
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                                {service.features.slice(0, 3).map((feature: string, i: number) => (
                                    <li key={i} style={{
                                        fontSize: '0.75rem',
                                        color: 'rgba(255,255,255,0.6)',
                                        padding: '0.2rem 0',
                                    }}>
                                        \u2713 {feature}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={service.affiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-block',
                                    background: '#5BA4B5',
                                    color: 'white',
                                    padding: '0.6rem 1.5rem',
                                    borderRadius: '25px',
                                    fontWeight: 800,
                                    fontSize: '0.85rem',
                                    textDecoration: 'none',
                                }}
                            >
                                無料カウンセリングを見る →
                            </a>
                            <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.4rem' }}>
                                ※ 完全無料でご利用いただけます
                            </p>
                        </div>
                    ))}
                </div>

                <div style={{
                    textAlign: 'center' as const,
                    marginTop: '2rem',
                    paddingBottom: '2rem',
                }}>
                    <Link href="/diagnosis" style={{
                        display: 'inline-block',
                        background: '#5BA4B5',
                        color: 'white',
                        padding: '0.8rem 2rem',
                        borderRadius: '25px',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        textDecoration: 'none',
                    }}>
                        ✨ 無料で診断する（60秒）
                    </Link>
                    <p style={{
                        fontSize: '0.65rem',
                        color: 'rgba(255,255,255,0.4)',
                        marginTop: '1rem',
                    }}>
                        ※ 当サイトはアフィリエイトプログラムに参加しています。
                    </p>
                </div>
            </div>
        </div>
    );
}
