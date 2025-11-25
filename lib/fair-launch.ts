/**
 * DOMOG NAADAM FESTIVAL LIMITED DROP - FAIR LAUNCH SYSTEM
 * ========================================================
 * 
 * THE IMPOSSIBLE QUESTION: How do we protect 50 pairs from bots while
 * maintaining a luxury experience for true customers?
 * 
 * ============================================================================
 * PART 3: REASONING & PHILOSOPHY
 * ============================================================================
 * 
 * THE TENSION:
 * Friction ←→ Luxury
 * 
 * Friction says: "Make it hard for bots"
 *   - CAPTCHAs, puzzles, rate limiting, randomized drops
 *   - Risk: Frustrates legitimate customers, feels like buying concert tickets
 * 
 * Luxury says: "Make it effortless for humans"  
 *   - One-click checkout, saved profiles, white-glove service
 *   - Risk: Bots can automate any smooth flow
 * 
 * THE INSIGHT:
 * What if friction itself became the luxury? What if the "gate" to purchase
 * felt like an intimate conversation with the brand—one that rewards true 
 * fans and makes scalpers feel like uninvited guests at a private dinner?
 * 
 * ============================================================================
 * THE SOLUTION: "THE PATRON'S PASSAGE"
 * ============================================================================
 * 
 * Instead of a CAPTCHA, we create a "Cultural Resonance" verification that:
 * 
 * 1. FEELS LIKE A RITUAL, NOT A TEST
 *    - Presented as "confirming you are a patron of the craft"
 *    - Language is reverent, not transactional
 *    - Takes 30-90 seconds (too slow for bots to scale, too meaningful to frustrate humans)
 * 
 * 2. USES CONTEXTUAL KNOWLEDGE BOTS CAN'T EASILY SCRAPE
 *    - Questions about our brand story (requires reading our content)
 *    - Questions about Mongolian culture (requires cultural awareness)
 *    - Questions that have multiple valid answers (defeats pattern matching)
 *    - Visual questions about our craft (image recognition with nuance)
 * 
 * 3. REWARDS CORRECT ANSWERS WITH PRIORITY
 *    - Perfect answers → First access
 *    - Good answers → Second wave access
 *    - Poor answers → Waitlist (with education opportunity)
 * 
 * 4. CREATES COMMUNITY VALUE
 *    - "You understood us" feeling for customers
 *    - Shareable moment ("I passed the Domog Passage!")
 *    - Educational for newcomers who learn about the culture
 * 
 * ============================================================================
 * ANTI-BOT TECHNICAL MEASURES (Invisible Layer)
 * ============================================================================
 * 
 * While the cultural experience is the "face" of the system, we layer in
 * technical protections that bots can't easily defeat:
 * 
 * 1. Behavioral Analysis
 *    - Time between questions (too fast = bot)
 *    - Mouse movement patterns during reading
 *    - Scroll behavior on educational content
 * 
 * 2. Progressive Challenge
 *    - First-time visitors see easier questions
 *    - Suspected bots get harder, more nuanced questions
 *    - Rate limiting tied to device fingerprint
 * 
 * 3. Human Verification Fallback
 *    - If system is uncertain, offer video call with staff
 *    - "Join a 5-minute call with our team to complete your order"
 *    - No bot will accept this; true fans might treasure it
 * 
 * ============================================================================
 * THE FLOW
 * ============================================================================
 * 
 * 1. ANNOUNCE (7 days before)
 *    - Teaser campaign explaining the Patron's Passage
 *    - "Only those who understand us may own this piece"
 *    - Educational content about Naadam Festival and our craft
 * 
 * 2. REGISTRATION (3 days before)
 *    - Customers register interest + complete first passage question
 *    - Creates wait list ranked by cultural resonance score
 *    - Emails personalized based on their answers
 * 
 * 3. DROP DAY
 *    - Access granted in waves based on passage score
 *    - Top scorers get 30-minute exclusive window
 *    - Second wave opens after
 *    - Unsold pairs go to waitlist
 * 
 * 4. PURCHASE
 *    - Final verification question at checkout
 *    - Prevents account selling/sharing
 *    - Completes the ritual
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface CulturalQuestion {
    id: string;
    category: QuestionCategory;
    difficulty: 'accessible' | 'intermediate' | 'deep-knowledge';
    
    // The question itself
    prompt: string;
    
    // For multiple choice
    options?: QuestionOption[];
    
    // For open-ended (judged by similarity)
    expectedThemes?: string[];
    
    // For visual questions
    images?: string[];
    
    // Metadata
    educationalContent?: string;  // Shown after answering
    source?: string;              // "Our About Page" or "Mongolian Tradition"
    
    // Anti-bot: minimum time to "reasonably" answer (seconds)
    minimumResponseTime: number;
}

export type QuestionCategory = 
    | 'brand-story'      // About Domog specifically
    | 'craft-knowledge'  // About bootmaking
    | 'mongolian-culture'// About Mongolia/Naadam
    | 'visual-recognition'// Identify details in images
    | 'values-alignment' // What does the brand stand for

export interface QuestionOption {
    id: string;
    text: string;
    isCorrect: boolean;
    partialCredit?: number;  // 0-1 for "not wrong, not perfect" answers
}

export interface PatronPassageSession {
    sessionId: string;
    visitorId: string;
    startedAt: Date;
    
    // Questions asked
    questions: PassageQuestion[];
    
    // Behavioral metrics
    behavior: BehaviorMetrics;
    
    // Calculated score
    culturalResonanceScore: number;
    
    // Access tier granted
    accessTier: AccessTier;
    
    // Status
    status: 'in-progress' | 'completed' | 'suspicious' | 'human-verified';
}

export interface PassageQuestion {
    questionId: string;
    presentedAt: Date;
    answeredAt: Date | null;
    answer: string | null;
    score: number;  // 0-100
}

export interface BehaviorMetrics {
    averageResponseTime: number;
    mouseMovementDetected: boolean;
    scrollBehaviorNatural: boolean;
    timeOnEducationalContent: number;
    deviceFingerprint: string;
    suspicionScore: number;  // 0-100, higher = more likely bot
}

export type AccessTier = 
    | 'patron'      // 90+ score: First access
    | 'enthusiast'  // 70-89: Second wave
    | 'newcomer'    // 50-69: Third wave
    | 'waitlist'    // <50: Waitlist with education
    | 'blocked';    // Suspected bot

// ============================================================================
// QUESTION BANK
// ============================================================================

export const CULTURAL_QUESTIONS: CulturalQuestion[] = [
    // === BRAND STORY (Accessible) ===
    {
        id: 'brand-1',
        category: 'brand-story',
        difficulty: 'accessible',
        prompt: 'Domog was founded in 1990. What was the founder\'s profession before starting the brand?',
        options: [
            { id: 'a', text: 'A master craftsman who learned from his elders', isCorrect: true },
            { id: 'b', text: 'A fashion designer from Paris', isCorrect: false },
            { id: 'c', text: 'A leather factory owner', isCorrect: false },
            { id: 'd', text: 'A horse breeder on the steppe', isCorrect: false, partialCredit: 0.3 }
        ],
        educationalContent: 'Our founder spent decades apprenticing under masters who remembered the old ways, before factories and shortcuts. His hands still touch every pair we make.',
        source: 'Our About Page',
        minimumResponseTime: 8
    },
    {
        id: 'brand-2',
        category: 'brand-story',
        difficulty: 'accessible',
        prompt: 'What does "The Master\'s Touch" refer to in our brand story?',
        options: [
            { id: 'a', text: 'A patented leather treatment process', isCorrect: false },
            { id: 'b', text: 'The founder\'s personal inspection of every boot', isCorrect: true },
            { id: 'c', text: 'A signature embroidery pattern', isCorrect: false, partialCredit: 0.2 },
            { id: 'd', text: 'The softness of our leather', isCorrect: false }
        ],
        educationalContent: 'Thirty-five years later, the founder\'s hands still touch every pair. He inspects each boot at three stages: after lasting, after stitching, after finishing.',
        minimumResponseTime: 10
    },
    
    // === MONGOLIAN CULTURE (Intermediate) ===
    {
        id: 'culture-1',
        category: 'mongolian-culture',
        difficulty: 'intermediate',
        prompt: 'The Naadam Festival celebrates "The Three Manly Games." Which of these is NOT one of them?',
        options: [
            { id: 'a', text: 'Wrestling', isCorrect: false },
            { id: 'b', text: 'Horse Racing', isCorrect: false },
            { id: 'c', text: 'Archery', isCorrect: false },
            { id: 'd', text: 'Eagle Hunting', isCorrect: true }
        ],
        educationalContent: 'Naadam celebrates wrestling, horse racing, and archery—skills that defined survival on the steppe. Eagle hunting, while a proud Kazakh tradition in western Mongolia, is not part of the Three Games.',
        minimumResponseTime: 12
    },
    {
        id: 'culture-2',
        category: 'mongolian-culture',
        difficulty: 'intermediate',
        prompt: 'Why do traditional Mongolian boots have upturned toes?',
        options: [
            { id: 'a', text: 'To show wealth and status', isCorrect: false, partialCredit: 0.2 },
            { id: 'b', text: 'To respect the earth by minimizing disruption to the soil', isCorrect: true },
            { id: 'c', text: 'To make them easier to manufacture', isCorrect: false },
            { id: 'd', text: 'To fit better in stirrups', isCorrect: false, partialCredit: 0.4 }
        ],
        educationalContent: 'The upturned toe reflects the nomadic belief in respecting the land that sustains us. By lifting away from the earth, the boot minimizes its mark on the sacred soil.',
        minimumResponseTime: 15
    },
    {
        id: 'culture-3',
        category: 'mongolian-culture',
        difficulty: 'deep-knowledge',
        prompt: 'In Mongolian tradition, what is the significance of offering something with both hands?',
        expectedThemes: ['respect', 'honor', 'guest', 'sacred', 'offering', 'reverence'],
        educationalContent: 'Offering with both hands—or at minimum, supporting the right elbow with the left hand—is a gesture of deep respect in Mongolian culture. It shows the recipient that they are honored.',
        minimumResponseTime: 20
    },
    
    // === CRAFT KNOWLEDGE (Intermediate) ===
    {
        id: 'craft-1',
        category: 'craft-knowledge',
        difficulty: 'intermediate',
        prompt: 'Our boots use vegetable-tanned leather. What is a key property of this type of leather compared to chrome-tanned?',
        options: [
            { id: 'a', text: 'It\'s cheaper to produce', isCorrect: false },
            { id: 'b', text: 'It "breaks in" and molds to the wearer over time', isCorrect: true },
            { id: 'c', text: 'It\'s waterproof from day one', isCorrect: false },
            { id: 'd', text: 'It comes in more colors', isCorrect: false }
        ],
        educationalContent: 'Vegetable-tanned leather is a living material. Over 60-90 days, it responds to your body heat and movement, creating a fit that becomes uniquely yours. This is the magic of traditional curing.',
        minimumResponseTime: 12
    },
    {
        id: 'craft-2',
        category: 'craft-knowledge',
        difficulty: 'deep-knowledge',
        prompt: 'What is a "last" in bootmaking?',
        options: [
            { id: 'a', text: 'The final inspection before shipping', isCorrect: false },
            { id: 'b', text: 'A wooden form shaped like a foot, around which boots are built', isCorrect: true },
            { id: 'c', text: 'The strongest thread used in stitching', isCorrect: false },
            { id: 'd', text: 'The layer of leather closest to the foot', isCorrect: false }
        ],
        educationalContent: 'The last is the soul of a boot\'s fit. Our founder keeps every last he\'s ever carved—wooden forms that remember the feet of presidents, champions, and herders alike.',
        minimumResponseTime: 12
    },
    
    // === VALUES ALIGNMENT (Deep) ===
    {
        id: 'values-1',
        category: 'values-alignment',
        difficulty: 'deep-knowledge',
        prompt: 'Our manifesto states we will "never open a factory." In your own words, why might a luxury brand make this commitment?',
        expectedThemes: ['craft', 'quality', 'hand', 'human', 'tradition', 'soul', 'scale', 'mass', 'authentic'],
        educationalContent: 'We believe that true luxury cannot be scaled. The moment we prioritize quantity over the master\'s touch, we cease to be Domog. Some things are worth waiting for.',
        minimumResponseTime: 45
    },
    {
        id: 'values-2',
        category: 'values-alignment',
        difficulty: 'intermediate',
        prompt: 'We describe our aesthetic as "Furlan Marri meets Mongolian Steppe." What do you think this means?',
        expectedThemes: ['swiss', 'italian', 'refinement', 'precision', 'raw', 'authentic', 'soul', 'minimalism', 'heritage', 'tradition', 'modern'],
        educationalContent: 'Furlan Marri represents Swiss/Italian refinement—restraint, precision, quiet confidence. The Mongolian Steppe represents raw, authentic soul—survival, tradition, resilience. We live in the tension between.',
        minimumResponseTime: 40
    },
    
    // === VISUAL RECOGNITION ===
    {
        id: 'visual-1',
        category: 'visual-recognition',
        difficulty: 'intermediate',
        prompt: 'Which image shows a characteristic of our traditional boots?',
        images: [
            '/images/quiz/upturned-toe.jpg',      // Correct
            '/images/quiz/western-boot.jpg',      // Wrong
            '/images/quiz/sneaker-sole.jpg',      // Wrong
            '/images/quiz/hiking-boot.jpg'        // Wrong
        ],
        options: [
            { id: 'a', text: 'Image A - The upturned toe', isCorrect: true },
            { id: 'b', text: 'Image B - The pointed heel', isCorrect: false },
            { id: 'c', text: 'Image C - The rubber sole', isCorrect: false },
            { id: 'd', text: 'Image D - The lace system', isCorrect: false }
        ],
        minimumResponseTime: 10
    }
];

// ============================================================================
// SCORING ALGORITHM
// ============================================================================

export interface ScoringResult {
    totalScore: number;
    categoryScores: Record<QuestionCategory, number>;
    accessTier: AccessTier;
    behaviorPenalty: number;
    feedback: string;
}

/**
 * Calculate Cultural Resonance Score
 * 
 * ALGORITHM:
 * 1. Base score from question answers (0-100 each)
 * 2. Weight by category (craft and culture worth more than brand trivia)
 * 3. Apply behavior multiplier (penalize bot-like behavior)
 * 4. Bonus for thoughtful open-ended responses
 */
export function calculateCulturalResonanceScore(
    session: PatronPassageSession
): ScoringResult {
    const categoryWeights: Record<QuestionCategory, number> = {
        'brand-story': 0.15,
        'craft-knowledge': 0.25,
        'mongolian-culture': 0.30,
        'visual-recognition': 0.10,
        'values-alignment': 0.20
    };
    
    // Calculate category scores
    const categoryScores: Record<QuestionCategory, number> = {
        'brand-story': 0,
        'craft-knowledge': 0,
        'mongolian-culture': 0,
        'visual-recognition': 0,
        'values-alignment': 0
    };
    
    const categoryCounts: Record<QuestionCategory, number> = { ...categoryScores };
    
    session.questions.forEach(q => {
        const questionDef = CULTURAL_QUESTIONS.find(cq => cq.id === q.questionId);
        if (!questionDef) return;
        
        categoryScores[questionDef.category] += q.score;
        categoryCounts[questionDef.category]++;
    });
    
    // Average each category
    Object.keys(categoryScores).forEach(cat => {
        const category = cat as QuestionCategory;
        if (categoryCounts[category] > 0) {
            categoryScores[category] /= categoryCounts[category];
        }
    });
    
    // Calculate weighted total
    let totalScore = 0;
    Object.entries(categoryWeights).forEach(([cat, weight]) => {
        totalScore += categoryScores[cat as QuestionCategory] * weight;
    });
    
    // Apply behavior penalty
    const behaviorPenalty = calculateBehaviorPenalty(session.behavior);
    totalScore = totalScore * (1 - behaviorPenalty);
    
    // Determine access tier
    let accessTier: AccessTier;
    if (session.behavior.suspicionScore > 70) {
        accessTier = 'blocked';
    } else if (totalScore >= 90) {
        accessTier = 'patron';
    } else if (totalScore >= 70) {
        accessTier = 'enthusiast';
    } else if (totalScore >= 50) {
        accessTier = 'newcomer';
    } else {
        accessTier = 'waitlist';
    }
    
    // Generate feedback
    const feedback = generateFeedback(totalScore, categoryScores, accessTier);
    
    return {
        totalScore: Math.round(totalScore),
        categoryScores,
        accessTier,
        behaviorPenalty,
        feedback
    };
}

function calculateBehaviorPenalty(behavior: BehaviorMetrics): number {
    let penalty = 0;
    
    // Too fast responses
    if (behavior.averageResponseTime < 5) {
        penalty += 0.3;  // 30% penalty
    } else if (behavior.averageResponseTime < 8) {
        penalty += 0.1;  // 10% penalty
    }
    
    // No mouse movement (likely automated)
    if (!behavior.mouseMovementDetected) {
        penalty += 0.15;
    }
    
    // Unnatural scroll behavior
    if (!behavior.scrollBehaviorNatural) {
        penalty += 0.1;
    }
    
    // High suspicion score
    if (behavior.suspicionScore > 50) {
        penalty += (behavior.suspicionScore - 50) / 200;  // Up to 25% additional
    }
    
    return Math.min(penalty, 0.8);  // Cap at 80% penalty
}

function generateFeedback(
    score: number, 
    categoryScores: Record<QuestionCategory, number>,
    tier: AccessTier
): string {
    if (tier === 'patron') {
        return 'You understand us deeply. Welcome to the inner circle. You will have first access when the drop begins.';
    }
    
    if (tier === 'enthusiast') {
        return 'Your appreciation for our craft shines through. You will have priority access in the second wave.';
    }
    
    if (tier === 'newcomer') {
        // Find their weakest category
        const weakest = Object.entries(categoryScores)
            .sort(([,a], [,b]) => a - b)[0][0];
        
        const suggestions: Record<QuestionCategory, string> = {
            'brand-story': 'We invite you to explore our About page to learn our story.',
            'craft-knowledge': 'Our craft guide reveals the secrets of traditional bootmaking.',
            'mongolian-culture': 'The Naadam Festival has a rich history—we\'d love for you to discover it.',
            'visual-recognition': 'Spend time with our collection to recognize the details that define us.',
            'values-alignment': 'Our manifesto speaks to what we believe. We hope it resonates with you.'
        };
        
        return `You're beginning to know us. ${suggestions[weakest as QuestionCategory]} You will have access in the third wave.`;
    }
    
    return 'Thank you for your interest. While this drop may not be right for you, we invite you to explore our world. Perhaps next time, we\'ll know each other better.';
}

// ============================================================================
// OPEN-ENDED ANSWER SCORING
// ============================================================================

/**
 * Score open-ended responses using theme matching
 * This is a simplified version; production would use NLP/embeddings
 */
export function scoreOpenEndedAnswer(
    answer: string, 
    expectedThemes: string[]
): number {
    if (!answer || answer.trim().length < 10) {
        return 0;
    }
    
    const normalizedAnswer = answer.toLowerCase();
    let matchedThemes = 0;
    
    expectedThemes.forEach(theme => {
        if (normalizedAnswer.includes(theme.toLowerCase())) {
            matchedThemes++;
        }
    });
    
    // Minimum of 2 themes for a passing score
    if (matchedThemes < 2) {
        return Math.min(matchedThemes * 25, 40);  // Max 40 for 1 theme
    }
    
    // Scale from 50-100 based on theme coverage
    const coverageRatio = matchedThemes / expectedThemes.length;
    return 50 + (coverageRatio * 50);
}

// ============================================================================
// DROP MANAGEMENT
// ============================================================================

export interface LimitedDrop {
    dropId: string;
    productId: string;
    totalUnits: number;
    
    // Access windows
    patronWindow: { start: Date; end: Date };
    enthusiastWindow: { start: Date; end: Date };
    newcomerWindow: { start: Date; end: Date };
    publicWindow: { start: Date; end: Date };
    
    // Inventory allocation
    allocation: {
        patron: number;      // e.g., 20 pairs
        enthusiast: number;  // e.g., 15 pairs
        newcomer: number;    // e.g., 10 pairs
        public: number;      // e.g., 5 pairs
    };
    
    // Current status
    sold: number;
    status: 'upcoming' | 'patron-access' | 'enthusiast-access' | 'newcomer-access' | 'public' | 'sold-out';
}

/**
 * Check if user can purchase based on their tier and current window
 */
export function canPurchase(
    userTier: AccessTier,
    drop: LimitedDrop,
    currentTime: Date
): { allowed: boolean; reason: string; waitTime?: number } {
    
    if (drop.status === 'sold-out') {
        return { allowed: false, reason: 'This release has sold out.' };
    }
    
    if (userTier === 'blocked') {
        return { allowed: false, reason: 'Unable to verify your patron status.' };
    }
    
    const windows: Record<AccessTier, { start: Date; end: Date } | null> = {
        'patron': drop.patronWindow,
        'enthusiast': drop.enthusiastWindow,
        'newcomer': drop.newcomerWindow,
        'waitlist': drop.publicWindow,
        'blocked': null
    };
    
    const userWindow = windows[userTier];
    if (!userWindow) {
        return { allowed: false, reason: 'Unable to determine your access window.' };
    }
    
    if (currentTime < userWindow.start) {
        const waitTime = userWindow.start.getTime() - currentTime.getTime();
        return { 
            allowed: false, 
            reason: 'Your access window has not yet opened.',
            waitTime 
        };
    }
    
    if (currentTime > userWindow.end) {
        // Check if there are still units in public pool
        if (drop.sold < drop.totalUnits) {
            return { allowed: true, reason: 'Welcome. Units are still available.' };
        }
        return { allowed: false, reason: 'This release has sold out.' };
    }
    
    return { allowed: true, reason: 'Welcome, patron. Your window is open.' };
}

// ============================================================================
// CHECKOUT VERIFICATION (Final Gate)
// ============================================================================

/**
 * At checkout, we ask one final question to verify the same person
 * who completed the passage is actually checking out.
 * This prevents account selling/sharing.
 */
export interface CheckoutVerification {
    sessionId: string;
    
    // A question from their passage, rephrased
    verificationQuestion: string;
    
    // What they answered before
    originalAnswer: string;
    
    // We accept similar answers, not exact matches
    acceptedVariations: string[];
}

export function generateCheckoutVerification(
    session: PatronPassageSession
): CheckoutVerification {
    // Find a question they answered correctly
    const correctlyAnswered = session.questions.filter(q => q.score >= 70);
    
    if (correctlyAnswered.length === 0) {
        // Fallback: simple confirmation
        return {
            sessionId: session.sessionId,
            verificationQuestion: 'What year was Domog founded?',
            originalAnswer: '1990',
            acceptedVariations: ['1990', 'nineteen ninety', '90']
        };
    }
    
    // Pick a random correct answer to verify
    const toVerify = correctlyAnswered[Math.floor(Math.random() * correctlyAnswered.length)];
    const question = CULTURAL_QUESTIONS.find(q => q.id === toVerify.questionId);
    
    if (!question || !toVerify.answer) {
        return {
            sessionId: session.sessionId,
            verificationQuestion: 'In our manifesto, whose hands do we honor as "The Master\'s Touch"?',
            originalAnswer: 'the founder',
            acceptedVariations: ['founder', 'father', 'master', 'craftsman', 'artisan']
        };
    }
    
    return {
        sessionId: session.sessionId,
        verificationQuestion: `Earlier, you told us about ${question.prompt.toLowerCase().slice(0, 50)}... Can you confirm your answer?`,
        originalAnswer: toVerify.answer,
        acceptedVariations: generateVariations(toVerify.answer)
    };
}

function generateVariations(answer: string): string[] {
    // In production, this would use NLP for semantic similarity
    const variations = [answer.toLowerCase()];
    
    // Add common variations
    variations.push(answer.toLowerCase().replace(/[^\w\s]/g, ''));
    variations.push(answer.toLowerCase().trim());
    
    return variations;
}
