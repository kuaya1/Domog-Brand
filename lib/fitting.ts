/**
 * DOMOG VIRTUAL BESPOKE FITTING SYSTEM
 * =====================================
 * 
 * This module handles the "Fit Confidence" calculation for our Virtual Fitting Room.
 * 
 * PHILOSOPHY:
 * Traditional bootmaking has always been about the dialogue between craftsman and customer.
 * This system attempts to digitize that conversation—not to replace the master's eye,
 * but to prepare the canvas before his hands begin their work.
 * 
 * LEATHER STRETCH FACTOR:
 * Our boots use traditionally cured leather from Mongolian cattle, which has unique
 * properties. Unlike chrome-tanned leather, our vegetable-tanned hides "break in"
 * over 60-90 days, conforming to the wearer's foot. The system must account for
 * this living quality of the material.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Foot measurement units
 * We support both metric (preferred) and imperial for international customers
 */
export type MeasurementUnit = 'cm' | 'in';

/**
 * Arch profile classification
 * Determined through our guided measurement flow or professional fitting
 */
export type ArchProfile = 'flat' | 'low' | 'neutral' | 'high' | 'very-high';

/**
 * Foot width classification (European standard)
 */
export type FootWidth = 'narrow' | 'standard' | 'wide' | 'extra-wide';

/**
 * Boot height categories in our collection
 */
export type BootHeight = 'ankle' | 'mid-calf' | 'knee' | 'traditional-full';

/**
 * User's complete measurement profile
 * This is the core data structure for our fitting algorithm
 */
export interface UserMeasurementProfile {
    // === Core Identity ===
    profileId: string;
    createdAt: Date;
    updatedAt: Date;
    
    // === Foot Measurements (both feet - asymmetry is common) ===
    leftFoot: FootMeasurements;
    rightFoot: FootMeasurements;
    
    // === Calf Measurements (for tall boots) ===
    calfMeasurements?: CalfMeasurements;
    
    // === User Preferences & History ===
    preferences: FittingPreferences;
    
    // === Fit History (improves recommendations over time) ===
    previousOrders?: PreviousFitData[];
}

export interface FootMeasurements {
    // Length from heel to longest toe (Brannock measurement)
    length: number;
    
    // Ball width (widest part of forefoot)
    ballWidth: number;
    
    // Ball circumference (girth around ball of foot)
    ballGirth: number;
    
    // Instep height (top of foot at arch)
    instepHeight: number;
    
    // Heel width
    heelWidth: number;
    
    // Arch height classification
    archProfile: ArchProfile;
    
    // Arch length (heel to ball)
    archLength: number;
    
    // Width classification
    widthCategory: FootWidth;
    
    // Unit used for measurements
    unit: MeasurementUnit;
}

export interface CalfMeasurements {
    // Circumference at widest point of calf
    maxCircumference: number;
    
    // Height from floor to max circumference point
    maxCircumferenceHeight: number;
    
    // Circumference at ankle bone
    ankleCircumference: number;
    
    // Total leg length (floor to knee crease, seated)
    legLength: number;
    
    unit: MeasurementUnit;
}

export interface FittingPreferences {
    // How the customer prefers their fit
    fitPreference: 'snug' | 'standard' | 'relaxed';
    
    // Primary use case (affects break-in recommendations)
    primaryUse: 'ceremonial' | 'daily' | 'riding' | 'display';
    
    // Sock thickness preference
    sockThickness: 'thin' | 'medium' | 'thick' | 'traditional-felt';
    
    // Any known foot conditions
    conditions?: FootCondition[];
}

export type FootCondition = 
    | 'bunion' 
    | 'hammertoe' 
    | 'plantar-fasciitis' 
    | 'high-instep' 
    | 'wide-forefoot'
    | 'narrow-heel';

export interface PreviousFitData {
    orderId: string;
    productId: string;
    sizeOrdered: string;
    customerFeedback: {
        initialFit: 1 | 2 | 3 | 4 | 5;
        fitAfterBreakIn: 1 | 2 | 3 | 4 | 5;
        wouldReorder: boolean;
        notes?: string;
    };
}

// ============================================================================
// FIT CONFIDENCE SCORE SYSTEM
// ============================================================================

/**
 * The Fit Confidence Score breakdown
 * We show customers a holistic score plus individual area scores
 */
export interface FitConfidenceScore {
    // Overall confidence (0-100)
    overall: number;
    
    // Confidence grade (for display)
    grade: FitGrade;
    
    // Individual area scores
    breakdown: {
        length: AreaScore;
        width: AreaScore;
        arch: AreaScore;
        instep: AreaScore;
        calf?: AreaScore; // Only for tall boots
    };
    
    // The "living leather" projection
    leatherEvolution: LeatherEvolutionProjection;
    
    // Personalized guidance
    recommendations: FitRecommendation[];
    
    // Should we suggest bespoke instead?
    bespokeRecommended: boolean;
    bespokeReason?: string;
}

export type FitGrade = 
    | 'EXCEPTIONAL'  // 95-100: Near-bespoke fit from ready-to-wear
    | 'EXCELLENT'    // 85-94: Confident recommendation
    | 'GOOD'         // 75-84: Will fit well after break-in
    | 'FAIR'         // 65-74: Consider sizing adjustment
    | 'CONSULT'      // <65: Recommend speaking with our fitters

export interface AreaScore {
    score: number;           // 0-100
    status: 'optimal' | 'acceptable' | 'tight' | 'loose' | 'concern';
    dayOneNote: string;      // How it will feel initially
    day90Note: string;       // How it will feel after break-in
}

/**
 * The unique aspect of our fitting system:
 * Projecting how the leather will evolve
 */
export interface LeatherEvolutionProjection {
    // Expected stretch percentage by area
    expectedStretch: {
        length: number;      // Typically 2-3%
        width: number;       // Typically 5-8%
        instep: number;      // Typically 3-5%
        calf: number;        // Typically 4-6%
    };
    
    // Timeline
    breakInPeriod: {
        initialAdaptation: string;   // "Days 1-7"
        activeBreakIn: string;       // "Days 7-30"
        fullConformation: string;    // "Days 30-90"
    };
    
    // Personalized guidance
    careInstructions: string[];
}

export interface FitRecommendation {
    priority: 'essential' | 'suggested' | 'optional';
    category: 'sizing' | 'style' | 'care' | 'timing';
    message: string;
}

// ============================================================================
// PRODUCT SIZE SPECIFICATIONS (Internal Reference)
// ============================================================================

export interface ProductSizeSpec {
    productId: string;
    sizeRange: string[];
    
    // Measurements per size (in cm)
    specifications: {
        [size: string]: {
            insoleLength: number;
            ballWidth: number;
            instepHeight: number;
            calfCircumference?: number;
            bootHeight?: number;
        };
    };
    
    // Leather properties for this product
    leatherProfile: LeatherProfile;
}

export interface LeatherProfile {
    // Type of leather used
    type: 'full-grain-vegetable' | 'full-grain-chrome' | 'suede' | 'felt-lined';
    
    // Stretch factors (multipliers, e.g., 1.05 = 5% stretch)
    stretchFactors: {
        lengthMin: number;
        lengthMax: number;
        widthMin: number;
        widthMax: number;
        instepMin: number;
        instepMax: number;
    };
    
    // Days to full break-in
    breakInDays: number;
    
    // Special notes
    notes?: string;
}

// ============================================================================
// FIT CALCULATION ALGORITHM
// ============================================================================

/**
 * CORE ALGORITHM: Calculate Fit Confidence Score
 * 
 * This is the heart of our Virtual Fitting Room. The algorithm balances:
 * 1. Immediate fit (day one comfort)
 * 2. Long-term fit (after leather evolution)
 * 3. User preferences (snug vs relaxed)
 * 4. Boot category requirements (riding boots need different fit than ceremonial)
 * 
 * PSEUDOCODE EXPLANATION:
 * 
 * 1. NORMALIZE MEASUREMENTS
 *    - Convert all measurements to centimeters
 *    - Use the larger foot as primary (asymmetry handling)
 * 
 * 2. CALCULATE RAW FIT SCORES (before leather stretch)
 *    For each measurement area:
 *    - Compare user measurement to product specification
 *    - Calculate difference as percentage
 *    - Score based on deviation from ideal
 * 
 * 3. APPLY LEATHER EVOLUTION MODEL
 *    For each area:
 *    - If boot is tight: project comfort improvement over time
 *    - If boot is loose: flag that leather stretch won't help
 *    - Adjust scores based on final expected fit
 * 
 * 4. WEIGHT SCORES BY IMPORTANCE
 *    - Arch fit: 30% (most critical for comfort)
 *    - Length: 25% (toe room is essential)
 *    - Width: 20% (affects ball comfort)
 *    - Instep: 15% (affects entry and pressure)
 *    - Calf: 10% (for tall boots only)
 * 
 * 5. APPLY PREFERENCE MODIFIERS
 *    - Snug preference: tolerate tighter initial fit
 *    - Relaxed preference: flag anything borderline tight
 *    - Use case: ceremonial boots need perfect fit, daily can be tighter
 * 
 * 6. GENERATE RECOMMENDATIONS
 *    - If any area scores below 70: suggest size change or bespoke
 *    - If arch mismatch: emphasize break-in protocol
 *    - If calf tight: suggest calf-stretching service
 */

export function calculateFitConfidence(
    profile: UserMeasurementProfile,
    productSpec: ProductSizeSpec,
    selectedSize: string
): FitConfidenceScore {
    
    const sizeSpec = productSpec.specifications[selectedSize];
    const leather = productSpec.leatherProfile;
    
    // Use dominant (larger) foot for primary calculation
    const primaryFoot = getDominantFoot(profile);
    
    // Convert measurements to common unit (cm)
    const userMeasures = normalizeToCm(primaryFoot);
    
    // === STEP 1: Calculate raw deviation scores ===
    
    // Length Score
    // Ideal: 10-15mm of toe room (0.5-1.5cm)
    const lengthDiff = sizeSpec.insoleLength - userMeasures.length;
    const lengthScore = calculateLengthScore(lengthDiff, leather);
    
    // Width Score
    // Compare ball width, accounting for expected stretch
    const widthDiff = sizeSpec.ballWidth - userMeasures.ballWidth;
    const projectedWidthStretch = sizeSpec.ballWidth * (leather.stretchFactors.widthMax - 1);
    const widthScore = calculateWidthScore(widthDiff, projectedWidthStretch, profile.preferences);
    
    // Arch Score (CRITICAL)
    // This is where our expertise matters most
    const archScore = calculateArchScore(
        userMeasures.archProfile,
        userMeasures.archLength,
        sizeSpec,
        leather
    );
    
    // Instep Score
    const instepDiff = sizeSpec.instepHeight - userMeasures.instepHeight;
    const instepScore = calculateInstepScore(instepDiff, leather);
    
    // Calf Score (if applicable)
    let calfScore: AreaScore | undefined;
    if (profile.calfMeasurements && sizeSpec.calfCircumference) {
        const calfMeasures = normalizeToCm(profile.calfMeasurements);
        const calfDiff = sizeSpec.calfCircumference - calfMeasures.maxCircumference;
        calfScore = calculateCalfScore(calfDiff, leather);
    }
    
    // === STEP 2: Weight and combine scores ===
    
    const weights = {
        arch: 0.30,
        length: 0.25,
        width: 0.20,
        instep: 0.15,
        calf: 0.10
    };
    
    let overallScore = (
        archScore.score * weights.arch +
        lengthScore.score * weights.length +
        widthScore.score * weights.width +
        instepScore.score * weights.instep
    );
    
    // Adjust weights if no calf measurement needed
    if (!calfScore) {
        // Redistribute calf weight proportionally
        const redistributionFactor = 1 / (1 - weights.calf);
        overallScore = overallScore * redistributionFactor;
    } else {
        overallScore += calfScore.score * weights.calf;
    }
    
    // === STEP 3: Apply preference modifiers ===
    
    overallScore = applyPreferenceModifiers(overallScore, profile.preferences);
    
    // === STEP 4: Determine grade and recommendations ===
    
    const grade = getGradeFromScore(overallScore);
    const recommendations = generateRecommendations(
        { length: lengthScore, width: widthScore, arch: archScore, instep: instepScore, calf: calfScore },
        profile.preferences,
        leather
    );
    
    const bespokeRecommended = overallScore < 65 || 
        archScore.score < 60 || 
        profile.preferences.conditions?.length > 0;
    
    return {
        overall: Math.round(overallScore),
        grade,
        breakdown: {
            length: lengthScore,
            width: widthScore,
            arch: archScore,
            instep: instepScore,
            calf: calfScore
        },
        leatherEvolution: calculateLeatherEvolution(leather, profile.preferences),
        recommendations,
        bespokeRecommended,
        bespokeReason: bespokeRecommended 
            ? determineBespokeReason(archScore, profile.preferences)
            : undefined
    };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getDominantFoot(profile: UserMeasurementProfile): FootMeasurements {
    const left = profile.leftFoot;
    const right = profile.rightFoot;
    
    // Use the larger foot (more conservative for fit)
    if (left.length >= right.length && left.ballWidth >= right.ballWidth) {
        return left;
    }
    return right;
}

function normalizeToCm(measurements: FootMeasurements | CalfMeasurements): any {
    if (measurements.unit === 'cm') return measurements;
    
    // Convert inches to cm (multiply by 2.54)
    const converted = { ...measurements };
    Object.keys(converted).forEach(key => {
        if (typeof converted[key] === 'number') {
            converted[key] = converted[key] * 2.54;
        }
    });
    converted.unit = 'cm';
    return converted;
}

function calculateLengthScore(diff: number, leather: LeatherProfile): AreaScore {
    // Ideal toe room: 1.0 - 1.5 cm
    // Acceptable: 0.5 - 2.0 cm
    
    const idealMin = 1.0;
    const idealMax = 1.5;
    const acceptableMin = 0.5;
    const acceptableMax = 2.0;
    
    let score: number;
    let status: AreaScore['status'];
    
    if (diff >= idealMin && diff <= idealMax) {
        score = 95 + (5 * (1 - Math.abs(diff - 1.25) / 0.25));
        status = 'optimal';
    } else if (diff >= acceptableMin && diff < idealMin) {
        score = 75 + (20 * (diff - acceptableMin) / (idealMin - acceptableMin));
        status = 'tight';
    } else if (diff > idealMax && diff <= acceptableMax) {
        score = 75 + (20 * (acceptableMax - diff) / (acceptableMax - idealMax));
        status = 'loose';
    } else if (diff < acceptableMin) {
        score = Math.max(40, 75 - (50 * (acceptableMin - diff)));
        status = 'concern';
    } else {
        score = Math.max(50, 75 - (30 * (diff - acceptableMax)));
        status = 'loose';
    }
    
    return {
        score: Math.round(score),
        status,
        dayOneNote: getDayOneNote('length', status, diff),
        day90Note: getDay90Note('length', status, diff, leather)
    };
}

function calculateWidthScore(
    diff: number, 
    projectedStretch: number,
    preferences: FittingPreferences
): AreaScore {
    // Width calculation accounts for leather stretch
    // A slightly tight boot is actually ideal for our leather
    
    const effectiveDiff = diff < 0 ? diff + projectedStretch : diff;
    
    let score: number;
    let status: AreaScore['status'];
    
    if (effectiveDiff >= -0.2 && effectiveDiff <= 0.5) {
        score = 90 + (10 * (1 - Math.abs(effectiveDiff - 0.15) / 0.35));
        status = 'optimal';
    } else if (effectiveDiff < -0.2 && effectiveDiff >= -0.8) {
        // Tight, but leather will stretch
        score = 70 + (20 * (effectiveDiff + 0.8) / 0.6);
        status = 'tight';
    } else if (effectiveDiff > 0.5 && effectiveDiff <= 1.0) {
        score = 75;
        status = 'loose';
    } else {
        score = 50;
        status = 'concern';
    }
    
    // Adjust for preference
    if (preferences.fitPreference === 'snug' && status === 'tight') {
        score += 5;
    } else if (preferences.fitPreference === 'relaxed' && status === 'tight') {
        score -= 10;
    }
    
    return {
        score: Math.round(Math.min(100, Math.max(0, score))),
        status,
        dayOneNote: getDayOneNote('width', status, diff),
        day90Note: getDay90Note('width', status, effectiveDiff, null)
    };
}

function calculateArchScore(
    archProfile: ArchProfile,
    archLength: number,
    sizeSpec: any,
    leather: LeatherProfile
): AreaScore {
    /**
     * ARCH FIT ALGORITHM
     * 
     * The arch is the soul of the fit. Our boots are built on traditional lasts
     * that assume a "neutral" to "low" arch—the profile of steppe riders who
     * developed strong, flattened feet from childhood.
     * 
     * For customers with high arches (common in Western populations), we must:
     * 1. Warn about initial pressure points
     * 2. Emphasize the break-in period
     * 3. Potentially recommend bespoke or insole modifications
     */
    
    const archCompatibility: Record<ArchProfile, number> = {
        'flat': 85,        // Very compatible with our lasts
        'low': 95,         // Ideal match
        'neutral': 90,     // Good match
        'high': 70,        // Will require break-in attention
        'very-high': 55    // Consider bespoke
    };
    
    let score = archCompatibility[archProfile];
    
    // Arch length affects score (ideally matches our last proportion)
    // Our lasts are designed for arch length = 40-42% of total length
    const expectedArchRatio = 0.41;
    const actualArchRatio = archLength / (archLength * 2.44); // Approximate total length
    const archRatioDiff = Math.abs(actualArchRatio - expectedArchRatio);
    
    if (archRatioDiff > 0.03) {
        score -= (archRatioDiff - 0.03) * 100;
    }
    
    let status: AreaScore['status'];
    if (score >= 85) status = 'optimal';
    else if (score >= 75) status = 'acceptable';
    else if (score >= 65) status = 'tight';
    else status = 'concern';
    
    return {
        score: Math.round(Math.max(0, score)),
        status,
        dayOneNote: getArchDayOneNote(archProfile),
        day90Note: getArchDay90Note(archProfile, leather)
    };
}

function calculateInstepScore(diff: number, leather: LeatherProfile): AreaScore {
    // Instep must be snug enough to prevent heel slip
    // But not so tight that entry is difficult
    
    let score: number;
    let status: AreaScore['status'];
    
    if (diff >= -0.3 && diff <= 0.3) {
        score = 95;
        status = 'optimal';
    } else if (diff < -0.3 && diff >= -0.8) {
        score = 80;
        status = 'tight';
    } else if (diff > 0.3 && diff <= 0.8) {
        score = 75;
        status = 'loose';
    } else {
        score = 55;
        status = 'concern';
    }
    
    return {
        score: Math.round(score),
        status,
        dayOneNote: getDayOneNote('instep', status, diff),
        day90Note: getDay90Note('instep', status, diff, leather)
    };
}

function calculateCalfScore(diff: number, leather: LeatherProfile): AreaScore {
    // Calf fit for tall boots
    // Must allow comfortable entry but not be sloppy
    
    const expectedStretch = leather.stretchFactors.widthMax - 1;
    const effectiveDiff = diff < 0 ? diff + (diff * expectedStretch) : diff;
    
    let score: number;
    let status: AreaScore['status'];
    
    if (effectiveDiff >= 0 && effectiveDiff <= 2) {
        score = 90;
        status = 'optimal';
    } else if (effectiveDiff < 0 && effectiveDiff >= -2) {
        score = 75;
        status = 'tight';
    } else if (effectiveDiff > 2 && effectiveDiff <= 4) {
        score = 70;
        status = 'loose';
    } else {
        score = 50;
        status = 'concern';
    }
    
    return {
        score: Math.round(score),
        status,
        dayOneNote: diff < 0 
            ? 'Entry may require effort; use boot pulls' 
            : 'Comfortable entry; calf will feel secure',
        day90Note: diff < 0
            ? 'Leather will conform to your calf shape over time'
            : 'Fit will remain relaxed; consider calf inserts for slim legs'
    };
}

function applyPreferenceModifiers(score: number, preferences: FittingPreferences): number {
    // Modify based on use case
    if (preferences.primaryUse === 'ceremonial') {
        // Ceremonial boots need perfect fit from day one
        // Penalize anything requiring break-in
        score = score * 0.95;
    } else if (preferences.primaryUse === 'daily') {
        // Daily wear benefits from slight tightness
        score = Math.min(100, score * 1.02);
    }
    
    // Sock thickness adjustment
    if (preferences.sockThickness === 'traditional-felt') {
        // Our boots are designed for felt socks
        score = Math.min(100, score + 3);
    } else if (preferences.sockThickness === 'thin') {
        // Thin socks may feel loose
        score = score - 2;
    }
    
    return score;
}

function getGradeFromScore(score: number): FitGrade {
    if (score >= 95) return 'EXCEPTIONAL';
    if (score >= 85) return 'EXCELLENT';
    if (score >= 75) return 'GOOD';
    if (score >= 65) return 'FAIR';
    return 'CONSULT';
}

function calculateLeatherEvolution(
    leather: LeatherProfile,
    preferences: FittingPreferences
): LeatherEvolutionProjection {
    const stretchMultiplier = preferences.primaryUse === 'daily' ? 1.1 : 1.0;
    
    return {
        expectedStretch: {
            length: ((leather.stretchFactors.lengthMax - 1) * 100 * stretchMultiplier),
            width: ((leather.stretchFactors.widthMax - 1) * 100 * stretchMultiplier),
            instep: ((leather.stretchFactors.instepMax - 1) * 100 * stretchMultiplier),
            calf: 5 * stretchMultiplier // Approximate
        },
        breakInPeriod: {
            initialAdaptation: 'Days 1-7: The leather begins to respond to your warmth',
            activeBreakIn: 'Days 7-30: Most stretch occurs; wear 2-3 hours daily',
            fullConformation: `Days 30-${leather.breakInDays}: The boot becomes uniquely yours`
        },
        careInstructions: [
            'Apply our conditioning balm weekly during break-in',
            'Alternate between two pairs if possible',
            'Use cedar shoe trees between wears',
            'Avoid excessive moisture during the first month'
        ]
    };
}

function generateRecommendations(
    scores: { length: AreaScore; width: AreaScore; arch: AreaScore; instep: AreaScore; calf?: AreaScore },
    preferences: FittingPreferences,
    leather: LeatherProfile
): FitRecommendation[] {
    const recommendations: FitRecommendation[] = [];
    
    if (scores.arch.status === 'concern') {
        recommendations.push({
            priority: 'essential',
            category: 'sizing',
            message: 'Your arch profile may benefit from our bespoke service or a custom insole'
        });
    }
    
    if (scores.length.status === 'tight') {
        recommendations.push({
            priority: 'suggested',
            category: 'sizing',
            message: 'Consider sizing up for immediate toe comfort; current size will feel perfect after break-in'
        });
    }
    
    if (scores.width.status === 'tight') {
        recommendations.push({
            priority: 'suggested',
            category: 'care',
            message: 'We recommend our leather stretching service for first-week comfort'
        });
    }
    
    if (preferences.primaryUse === 'ceremonial') {
        recommendations.push({
            priority: 'essential',
            category: 'timing',
            message: 'Order 90+ days before your event to allow full break-in'
        });
    }
    
    return recommendations;
}

function determineBespokeReason(archScore: AreaScore, preferences: FittingPreferences): string {
    if (archScore.score < 60) {
        return 'Your unique arch profile would benefit from a custom last';
    }
    if (preferences.conditions?.length > 0) {
        return 'We recommend bespoke fitting to accommodate your specific needs';
    }
    return 'For optimal fit, consider our bespoke consultation';
}

// === Note Generation Functions ===

function getDayOneNote(area: string, status: AreaScore['status'], diff: number): string {
    const notes: Record<string, Record<string, string>> = {
        length: {
            optimal: 'Perfect toe room from day one',
            tight: 'Toes will touch; normal for our boots—they will give',
            loose: 'Generous toe room; consider a half-size down',
            concern: 'Fit may be uncomfortable; please contact our fitters'
        },
        width: {
            optimal: 'Ball of foot will feel embraced, not squeezed',
            tight: 'Initial snugness is expected; leather will shape to you',
            loose: 'Relaxed fit across the ball',
            concern: 'Width mismatch; sizing adjustment recommended'
        },
        instep: {
            optimal: 'Easy entry with secure hold',
            tight: 'Entry will require effort; use the pull straps',
            loose: 'Comfortable entry; may need tongue adjustment',
            concern: 'Instep mismatch may cause heel slip'
        }
    };
    
    return notes[area]?.[status] || 'Contact our fitting specialists';
}

function getDay90Note(area: string, status: AreaScore['status'], diff: number, leather: LeatherProfile | null): string {
    const notes: Record<string, Record<string, string>> = {
        length: {
            optimal: 'Perfect fit maintained',
            tight: 'Natural leather relaxation will provide ideal toe room',
            loose: 'Fit will remain relaxed',
            concern: 'Consider exchanging for better long-term fit'
        },
        width: {
            optimal: 'The boot will have molded to your exact foot shape',
            tight: 'Full width adaptation; the boot becomes part of you',
            loose: 'Width will remain generous',
            concern: 'Long-term comfort may be compromised'
        },
        instep: {
            optimal: 'Instep will feel custom-fitted',
            tight: 'Leather will conform; entry becomes effortless',
            loose: 'Consider leather insoles for better instep contact',
            concern: 'Heel stability may remain an issue'
        }
    };
    
    return notes[area]?.[status] || 'Our leather evolves with you';
}

function getArchDayOneNote(profile: ArchProfile): string {
    const notes: Record<ArchProfile, string> = {
        'flat': 'Our last was designed for feet like yours—immediate comfort expected',
        'low': 'Excellent compatibility; you\'ll feel supported from the first step',
        'neutral': 'Good compatibility; slight adaptation period may occur',
        'high': 'Expect pressure on the arch initially; this is normal and will resolve',
        'very-high': 'Significant arch pressure likely; we recommend our insole modification'
    };
    return notes[profile];
}

function getArchDay90Note(profile: ArchProfile, leather: LeatherProfile): string {
    const notes: Record<ArchProfile, string> = {
        'flat': 'The boot will maintain its supportive shape',
        'low': 'Perfect symbiosis between foot and boot',
        'neutral': 'Full adaptation achieved; natural feel',
        'high': 'Leather will have created a pocket for your arch',
        'very-high': 'Consider our arch modification service for lasting comfort'
    };
    return notes[profile];
}
