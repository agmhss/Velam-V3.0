/**
 * config.js - Global Configuration for AGMHSS Timetable Engine
 * Features: Auto-Calculation Rules based on Activity and Grade Level.
 */

const SCHOOL_CONFIG = {
    // 1. Regular Timetable Settings (பள்ளியின் தினசரி நேர அமைப்பு)
    regularTimings: [
        { label: '1', start: '09:30 AM', end: '10:10 AM', type: 'class' },
        { label: '2', start: '10:10 AM', end: '10:50 AM', type: 'class' },
        { label: 'Break', start: '10:50 AM', end: '11:00 AM', type: 'break' },
        { label: '3', start: '11:00 AM', end: '11:40 AM', type: 'class' },
        { label: '4', start: '11:40 AM', end: '12:20 PM', type: 'class' },
        { label: 'Lunch', start: '12:20 PM', end: '01:00 PM', type: 'break' },
        { label: '5', start: '01:00 PM', end: '01:40 PM', type: 'class' },
        { label: '6', start: '01:40 PM', end: '02:20 PM', type: 'class' },
        { label: 'Break', start: '02:20 PM', end: '02:30 PM', type: 'break' },
        { label: '7', start: '02:30 PM', end: '03:10 PM', type: 'class' },
        { label: '8', start: '03:10 PM', end: '03:50 PM', type: 'class' }
    ],

    // 2. AUTO-CALCULATION RULES ENGINE
    // இந்த விதிகளின்படியே 'AUTO' என்று குறிப்பிடப்பட்ட பாடங்களுக்கு பீரியட்கள் ஒதுக்கப்படும்.
    getPeriodsForActivity: function(activity, grade) {
        if (!activity || isNaN(grade) || grade < 0) return 0;
        
        grade = parseInt(grade);
        const act = activity.trim().toLowerCase();

        // --- விதிகளின் தொகுதி 1: Primary (LKG முதல் 5 ஆம் வகுப்பு வரை) ---
        if (grade >= 0 && grade <= 5) {
            const primaryRules = { 
                'tamil': 6, 
                'english': 5, // 1 period per day
                'maths': 5,   // 1 period per day
                'general': 5, // 1 period per day
                'club': 4,    // 2 periods * 2 days
                'drawing': 4, // 2 periods * 2 days
                'video': 2,   // 2 periods * 1 day
                'games': 4,   // 2 periods * 2 days
                'library': 4, // 2 periods * 2 days
                'lab': 2      // 2 periods * 1 day
            };
            return primaryRules[act] || 0;
        }
        
        // --- விதிகளின் தொகுதி 2: High School (6 முதல் 10 ஆம் வகுப்பு வரை) ---
        if (grade >= 6 && grade <= 10) {
            const hsRules = { 
                'tamil': 6, 
                'english': 6, 
                'maths': 6, 
                'science': 6, 
                'social': 6, 
                'club': 4,    // 2 periods * 2 days
                'drawing': 2, // 2 periods per week
                'games': 2,   // 2 periods * 1 day
                'library': 2, // 2 periods per week
                'lab': 2      // 2 periods per week
            };
            // Total should ideally equal 40 per your requirement.
            return hsRules[act] || 0;
        }
        
        // --- விதிகளின் தொகுதி 3: Higher Secondary (11 மற்றும் 12 ஆம் வகுப்பு) ---
        if (grade >= 11) {
            // "Core-" என்று தொடங்கும் எந்தப் பாடமாக இருந்தாலும் (எ.கா: Core-Maths, Core-Physics) 7 பீரியட்கள் எடுத்துக்கொள்ளப்படும்
            if (act.startsWith('core-')) return 7; 
            
            const hssRules = { 
                'club': 2, 
                'games': 2, 
                'library': 1 
            };
            return hssRules[act] || 0;
        }
        
        return 0; // விதிமுறை இல்லை என்றால் 0
    },

    // 3. Exam Duty Settings (தேர்வு நேர அமைப்புகள்)
    examSettings: {
        'FN': {
            coolOffStart: '09:45 AM',
            writingStart: '10:00 AM',
            juniorEnd: '12:30 PM', // 1 to 10th Standard (2.5 Hours)
            seniorEnd: '01:00 PM'  // 11 & 12th Standard (3.0 Hours)
        },
        'AN': {
            coolOffStart: '01:15 PM',
            writingStart: '01:30 PM',
            juniorEnd: '04:00 PM', // 1 to 10th Standard (2.5 Hours)
            seniorEnd: '04:30 PM'  // 11 & 12th Standard (3.0 Hours)
        }
    },

    // 4. Exam Patterns (முழுமையாக 1 முதல் 12 வரை சேர்க்கப்பட்டுள்ளது)
    examPatterns: {
        'Full School (1 to 12)': {
            'FN': ['12', '10', '8', '6', '4', '2', 'LKG'],
            'AN': ['11', '9', '7', '5', '3', '1', 'UKG']
        },
        'High & Hr.Sec Only (6 to 12)': {
            'FN': ['12', '10', '8', '6'],
            'AN': ['11', '9', '7']
        },
        'Primary Only (LKG to 5)': {
            'FN': ['5', '3', '1', 'LKG'],
            'AN': ['4', '2', 'UKG']
        }
    },

    // 5. Assignments 
    // குறிப்பு: இது காலியாகவே இருக்க வேண்டும். Google Sheet-லிருந்து தரவுகள் app.js மூலமாக இங்கு நிரப்பப்படும்.
    assignments: [] 
};
