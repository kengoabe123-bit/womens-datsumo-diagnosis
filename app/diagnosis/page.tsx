'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { questions, calculateResults, DiagnosisResult } from '@/lib/diagnosis';
import { SITE_CONFIG } from '@/lib/config';

type Phase = 'questions' | 'results';

export default function DiagnosisPage() {
    const [phase, setPhase] = useState<Phase>('questions');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [results, setResults] = useState<DiagnosisResult[]>([]);
    const [animationClass, setAnimationClass] = useState('animate-slide-in');
    const [showConfetti, setShowConfetti] = useState(false);
    const [displayRates, setDisplayRates] = useState<number[]>([0, 0, 0]);
    const [copiedToast, setCopiedToast] = useState(false);
    const animatingRef = useRef(false);

    useEffect(() => {
        if (phase !== 'results' || results.length === 0) return;
        const targetRates = results.map((r) => r.matchRate);
        const duration = 1500;
        const startTime = performance.now();
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            setDisplayRates(targetRates.map((target) => Math.round(eased * target)));
            if (progress < 1) requestAnimationFrame(animate);
        };
        const timer = setTimeout(() => requestAnimationFrame(animate), 800);
        return () => clearTimeout(timer);
    }, [phase, results]);

    useEffect(() => {
        if (phase === 'results') {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [phase]);



    const handleAnswer = useCallback(
        (optionIndex: number) => {
            if (animatingRef.current) return;
            animatingRef.current = true;
            const newAnswers = [...answers, optionIndex];
            setAnswers(newAnswers);
            if (currentQuestion < questions.length - 1) {
                setAnimationClass('animate-slide-out');
                setTimeout(() => {
                    setCurrentQuestion((prev) => prev + 1);
                    setAnimationClass('animate-slide-in');
                    animatingRef.current = false;
                }, 300);
            } else {
                const diagnosisResults = calculateResults(newAnswers);
                setResults(diagnosisResults);
                setDisplayRates([0, 0, 0]);
                setPhase('results');
                animatingRef.current = false;
            }
        },
        [answers, currentQuestion]
    );

    const handleBack = useCallback(() => {
        if (currentQuestion > 0 && !animatingRef.current) {
            animatingRef.current = true;
            setAnimationClass('animate-slide-out');
            setTimeout(() => {
                setCurrentQuestion((prev) => prev - 1);
                setAnswers((prev) => prev.slice(0, -1));
                setAnimationClass('animate-slide-in');
                animatingRef.current = false;
            }, 300);
        }
    }, [currentQuestion]);

    const handleRestart = useCallback(() => {
        window.location.href = '/';
    }, []);

    const handleShare = useCallback(
        (platform: 'x' | 'line' | 'copy') => {
            if (results.length === 0) return;
            const topResult = results[0];
            const shareText = `あなたにピッタリの脱毛クリニックは「${topResult.service.name}」（おすすめ度${topResult.matchRate}%）でした！\n\n無料脱毛診断はこちら\n${SITE_CONFIG.url}/diagnosis`;
            if (platform === 'x') {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
            } else if (platform === 'line') {
                window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(SITE_CONFIG.url + '/diagnosis')}&text=${encodeURIComponent(shareText)}`, '_blank');
            } else {
                navigator.clipboard.writeText(shareText).then(() => {
                    setCopiedToast(true);
                    setTimeout(() => setCopiedToast(false), 2000);
                });
            }
        },
        [results]
    );


    if (phase === 'questions') {
        const question = questions[currentQuestion];
        const progressPercent = Math.round(((currentQuestion + 1) / questions.length) * 100);
        return (
            <section className="question-section">
                <div className="progress-container">
                    <span className="progress-label">質問 {currentQuestion + 1} / {questions.length}</span>
                    <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
                    </div>
                    <span className="progress-text">{progressPercent}%</span>
                </div>
                <div className={`question-card ${animationClass}`} key={`q-${currentQuestion}`}>
                    <div className="question-header">
                        <div className="question-number">{currentQuestion + 1}</div>
                        <div className="question-text">{question.text}</div>
                        {question.subtext && <div className="question-subtext">{question.subtext}</div>}
                    </div>
                    <div className="options-list">
                        {question.options.map((option, index) => (
                            <button key={index} className="option-btn" onClick={() => handleAnswer(index)} id={`option-${currentQuestion}-${index}`}>
                                <span>{option.label}</span>
                            </button>
                        ))}
                    </div>
                    {currentQuestion > 0 && (
                        <button className="back-btn" onClick={handleBack}>前の質問に戻る</button>
                    )}
                </div>
            </section>
        );
    }

    return (
        <>
            {showConfetti && (
                <div className="confetti-container">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div key={i} className="confetti-piece" style={{
                            left: `${Math.random() * 100}%`,
                            backgroundColor: ['#d4739d', '#e8a1be', '#f5c6d8', '#f0c27f', '#c9a7d8', '#b8d4e3'][Math.floor(Math.random() * 6)],
                            animationDuration: `${2 + Math.random() * 3}s`,
                            animationDelay: `${Math.random() * 2}s`,
                            width: `${6 + Math.random() * 6}px`,
                            height: `${6 + Math.random() * 6}px`,
                            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                        }} />
                    ))}
                </div>
            )}
            <section className="results-section">
                <div className="results-header">
                    <h2>あなたにおすすめの脱毛クリニック TOP3</h2>
                    <p className="results-subtitle">回答を分析し、あなたに最適な脱毛クリニックを選びました</p>
                </div>
                <div className="results-list">
                    {results.map((result, index) => (
                        <div key={result.service.id} className="result-card">
                            <div className="result-card-header">
                                <div className="match-label">おすすめ度</div>
                                <div className="match-number">{displayRates[index]}<span className="percent">%</span></div>
                            </div>
                            <div className="result-card-body">
                                <h3 className="result-name">{result.service.name}</h3>
                                <p className="result-tagline">{result.service.tagline}</p>
                                <div className="reason-box">
                                    <div className="reason-label">あなたの回答に基づくおすすめ理由</div>
                                    <div className="reason-text">{result.reason}</div>
                                </div>
                                <div className="result-features">
                                    <h4>特徴</h4>
                                    <ul className="feature-list">
                                        {result.service.features.map((f, i) => (<li key={i}>{f}</li>))}
                                    </ul>
                                </div>
                                <div className="result-pros-cons">
                                    <div>
                                        <h4>メリット</h4>
                                        <ul className="pros-list">{result.service.pros.slice(0, 3).map((p, i) => (<li key={i}>{p}</li>))}</ul>
                                    </div>
                                    <div>
                                        <h4>デメリット</h4>
                                        <ul className="cons-list">{result.service.cons.slice(0, 2).map((c, i) => (<li key={i}>{c}</li>))}</ul>
                                    </div>
                                </div>
                                <a href={result.service.affiliateUrl} target="_blank" rel="noopener noreferrer" className="btn-cta" style={{ background: result.service.color }} id={`cta-${result.service.id}`}>
                                    {result.service.ctaText} →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="share-section">
                    <h3>診断結果をシェアする</h3>
                    <div className="share-buttons">
                        <button className="share-btn x" onClick={() => handleShare('x')} id="share-x">X でシェア</button>
                        <button className="share-btn line" onClick={() => handleShare('line')} id="share-line">LINEで送る</button>
                        <button className="share-btn copy" onClick={() => handleShare('copy')} id="share-copy">コピー</button>
                    </div>
                </div>
                <div className="retry-section">
                    <button className="btn-secondary" onClick={handleRestart} id="retry-diagnosis">もう一度診断する</button>
                </div>
            </section>
            <div className={`copied-toast${copiedToast ? ' show' : ''}`}>コピーしました</div>
        </>
    );
}
