var app = angular.module('reloadApp', []);

// ===== CONFIG =====
app.constant('CONFIG', {
    GEMINI_API_KEY: 'AIzaSyANbBisWLmhHHb_fbH1jhr1g6OGi4sKknI',
    GEMINI_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    API_URL: 'https://mas.phvtech.com/api/Master/sp',
    MAX_RETRIES: 3,
    ELIGIBLE_THRESHOLD: 1000,
    LKR_OFFSET_HOURS: 5.5 // UTC+5:30
});

// ===== LANGUAGE DICTIONARY =====
app.constant('LANG', {
    en: {
        // Step 0
        selectLang: 'Select Your Language',
        // Step 1
        enterDetails: 'Enter Your Details',
        yourName: 'Your Name',
        mobileNumber: 'Mobile Number',
        next: 'Next',
        promoText: 'Purchase Rs 1,000+ worth of Dettol, Harpic, Lysol, Mortein, Veet or Moov & win a reload!',
        dateValid: 'Valid from March 24 to April 12 only.',
        errName: 'Please enter your name',
        errPhone: 'Please enter a valid mobile number (07XXXXXXXX)',
        // Step 2
        captureTitle: 'Capture Your Bill',
        change: 'Change',
        takePhoto: 'Take Photo',
        longBillLink: 'Bill too long? Tap here for multiple photos',
        removeRetake: 'Remove & retake',
        longBillMode: 'Long Bill Mode - Take 2 or 3 photos',
        switchSingle: 'Switch to single photo',
        sessionExpired: 'Session expired! Time between photos exceeded 60 seconds.',
        startOver: 'Start Over',
        submitBill: 'Submit Bill',
        processing: 'Processing...',
        eligibleBrands: 'Eligible brands: Dettol | Harpic | Lysol | Mortein | Veet | Moov',
        billClearNote: 'Make sure the bill is clear and the reference number is visible',
        // Step 3
        analyzing: 'Analyzing your bill...',
        attempt: 'Attempt',
        of: 'of',
        // Step 4
        eligibleTotal: 'Eligible Reckitt brand items total',
        billItems: 'Bill Items',
        finish: 'Finish',
        tryAnother: 'Try with Another Bill',
        submitDifferent: 'Submit a Different Bill',
        tryAgain: 'Try Again',
        // Results
        titleSuccess: 'Congratulations!',
        msgSuccess: 'You will receive the reload to your mobile number ({phone}) shortly!',
        titleFail: 'Not Eligible',
        msgFail: 'Sorry, your eligible Reckitt brand items total is Rs {amount}. You need Rs 1,000+ worth of Dettol, Harpic, Lysol, Mortein, Veet, or Moov products to qualify.',
        titleDuplicate: 'Bill Already Submitted',
        msgDuplicate: 'This bill (#{bill}) has already been submitted. Each bill can only be used once.',
        titleProcessFail: 'Processing Failed',
        msgProcessFail: 'Bill processing failed due to server issues. Please try again later.',
        titleUnclear: 'Image Not Clear',
        msgUnclear: 'The bill image is not clear enough to read. Please take a clearer photo and try again.',
        titleNoBill: 'No Bill Number Found',
        msgNoBill: 'We couldn\'t find a valid bill/reference number on this bill. Please ensure the full bill with reference number is visible and try again.',
        titleNotBill: 'Not a Valid Bill',
        msgNotBill: 'The uploaded image doesn\'t appear to be a bill. Please upload a valid shop bill/receipt.',
        titlePartial: 'Couldn\'t Read Full Bill',
        msgPartial: 'Some details on your bill couldn\'t be read clearly. Please retake the photo ensuring the entire bill is visible.',
        titleNoBillNum: 'No Bill Number',
        msgNoBillNum: 'Could not extract a bill number. Please ensure the bill reference number is visible.'
    },
    si: {
        selectLang: 'භාෂාව තෝරන්න',
        enterDetails: 'ඔබේ විස්තර ඇතුළත් කරන්න',
        yourName: 'ඔබේ නම',
        mobileNumber: 'දුරකථන අංකය',
        next: 'ඊළඟ',
        promoText: 'රු 1,000+ Reckitt නිෂ්පාදන මිලදී ගෙන reload එකක් දිනන්න!',
        dateValid: 'මාර්තු 24 වනදා සිට අප්‍රේල් 12 වනදා දක්වා පමණයි.',
        errName: 'කරුණාකර ඔබේ නම ඇතුළත් කරන්න',
        errPhone: 'කරුණාකර වලංගු දුරකථන අංකයක් ඇතුළත් කරන්න (07XXXXXXXX)',
        captureTitle: 'බිල්පත ගන්න',
        change: 'වෙනස් කරන්න',
        takePhoto: 'ඡායාරූපයක් ගන්න',
        longBillLink: 'බිල්පත දිගද? මෙතන ඔබන්න',
        removeRetake: 'ඉවත් කර නැවත ගන්න',
        longBillMode: 'දිග බිල්පත - ඡායාරූප 2ක් හෝ 3ක් ගන්න',
        switchSingle: 'තනි ඡායාරූපයට මාරු වන්න',
        sessionExpired: 'කාලය ඉක්මවා ඇත! ඡායාරූප අතර කාලය තත්පර 60 ඉක්මවා ඇත.',
        startOver: 'නැවත ආරම්භ කරන්න',
        submitBill: 'බිල්පත ඉදිරිපත් කරන්න',
        processing: 'සැකසීම...',
        eligibleBrands: 'සුදුසුකම් ලත් වෙළඳ නාම: Dettol | Harpic | Lysol | Mortein | Veet | Moov',
        billClearNote: 'බිල්පත පැහැදිලිව සහ යොමු අංකය පෙනෙන බවට සහතික කරන්න',
        analyzing: 'බිල්පත විශ්ලේෂණය කරමින්...',
        attempt: 'උත්සාහය',
        of: '/',
        eligibleTotal: 'සුදුසුකම් ලත් Reckitt වෙළඳ නාම මුළු එකතුව',
        billItems: 'බිල්පත අයිතම',
        finish: 'අවසන්',
        tryAnother: 'වෙනත් බිල්පතක් උත්සාහ කරන්න',
        submitDifferent: 'වෙනත් බිල්පතක් ඉදිරිපත් කරන්න',
        tryAgain: 'නැවත උත්සාහ කරන්න',
        titleSuccess: 'සුභ පැතුම්!',
        msgSuccess: 'ඔබේ දුරකථන අංකයට ({phone}) ඉක්මනින් reload එක ලැබෙනු ඇත!',
        titleFail: 'සුදුසුකම් නොලැබේ',
        msgFail: 'සමාවන්න, ඔබේ සුදුසුකම් ලත් Reckitt වෙළඳ නාම මුළු එකතුව රු {amount}. Reload එක සඳහා රු 1,000+ Dettol, Harpic, Lysol, Mortein, Veet, හෝ Moov නිෂ්පාදන අවශ්‍යයි.',
        titleDuplicate: 'බිල්පත දැනටමත් ඉදිරිපත් කර ඇත',
        msgDuplicate: 'මෙම බිල්පත (#{bill}) දැනටමත් ඉදිරිපත් කර ඇත. එක් බිල්පතක් එක් වරක් පමණක් භාවිතා කළ හැක.',
        titleProcessFail: 'සැකසීම අසාර්ථකයි',
        msgProcessFail: 'සේවාදායක ගැටලු හේතුවෙන් බිල්පත සැකසීම අසාර්ථක විය. කරුණාකර පසුව නැවත උත්සාහ කරන්න.',
        titleUnclear: 'පින්තූරය පැහැදිලි නැත',
        msgUnclear: 'බිල්පතේ පින්තූරය කියවීමට ප්‍රමාණවත් තරම් පැහැදිලි නැත. කරුණාකර පැහැදිලි ඡායාරූපයක් ගෙන නැවත උත්සාහ කරන්න.',
        titleNoBill: 'බිල් අංකයක් හමු නොවීය',
        msgNoBill: 'මෙම බිල්පතේ වලංගු බිල්/යොමු අංකයක් සොයාගත නොහැකි විය. කරුණාකර යොමු අංකය සහිත සම්පූර්ණ බිල්පත පෙනෙන බවට සහතික කර නැවත උත්සාහ කරන්න.',
        titleNotBill: 'වලංගු බිල්පතක් නොවේ',
        msgNotBill: 'ඔබ උඩුගත කළ පින්තූරය බිල්පතක් ලෙස නොපෙනේ. කරුණාකර වලංගු සාප්පු බිල්පතක් උඩුගත කරන්න.',
        titlePartial: 'සම්පූර්ණ බිල්පත කියවිය නොහැක',
        msgPartial: 'ඔබේ බිල්පතේ සමහර විස්තර පැහැදිලිව කියවිය නොහැකි විය. සම්පූර්ණ බිල්පත පෙනෙන පරිදි ඡායාරූපය නැවත ගන්න.',
        titleNoBillNum: 'බිල් අංකයක් නැත',
        msgNoBillNum: 'බිල් අංකයක් ලබා ගත නොහැකි විය. කරුණාකර බිල්පතේ යොමු අංකය පෙනෙන බවට සහතික කරන්න.'
    },
    ta: {
        selectLang: 'மொழியைத் தேர்ந்தெடுக்கவும்',
        enterDetails: 'உங்கள் விவரங்களை உள்ளிடவும்',
        yourName: 'உங்கள் பெயர்',
        mobileNumber: 'தொலைபேசி எண்',
        next: 'அடுத்து',
        promoText: 'ரூ 1,000+ Reckitt பொருட்கள் வாங்கி reload வெல்லுங்கள்!',
        dateValid: 'மார்ச் 24 முதல் ஏப்ரல் 12 வரை மட்டுமே.',
        errName: 'உங்கள் பெயரை உள்ளிடவும்',
        errPhone: 'சரியான தொலைபேசி எண் உள்ளிடவும் (07XXXXXXXX)',
        captureTitle: 'பில்லை எடுங்கள்',
        change: 'மாற்று',
        takePhoto: 'புகைப்படம் எடுங்கள்',
        longBillLink: 'பில் நீளமா? இங்கே தட்டவும்',
        removeRetake: 'நீக்கி மீண்டும் எடுங்கள்',
        longBillMode: 'நீண்ட பில் - 2 அல்லது 3 புகைப்படங்கள் எடுங்கள்',
        switchSingle: 'ஒற்றை புகைப்படத்திற்கு மாறவும்',
        sessionExpired: 'நேரம் முடிந்தது! புகைப்படங்களுக்கு இடையே 60 வினாடிகள் கடந்தது.',
        startOver: 'மீண்டும் தொடங்கு',
        submitBill: 'பில்லை சமர்ப்பிக்கவும்',
        processing: 'செயலாக்கம்...',
        eligibleBrands: 'தகுதியான பிராண்டுகள்: Dettol | Harpic | Lysol | Mortein | Veet | Moov',
        billClearNote: 'பில் தெளிவாகவும் குறிப்பு எண் தெரியும்படியும் இருக்க வேண்டும்',
        analyzing: 'உங்கள் பில்லை ஆய்வு செய்கிறது...',
        attempt: 'முயற்சி',
        of: '/',
        eligibleTotal: 'தகுதியான Reckitt பொருட்களின் மொத்தம்',
        billItems: 'பில் பொருட்கள்',
        finish: 'முடிக்க',
        tryAnother: 'வேறு பில் முயற்சிக்கவும்',
        submitDifferent: 'வேறு பில் சமர்ப்பிக்கவும்',
        tryAgain: 'மீண்டும் முயற்சிக்கவும்',
        titleSuccess: 'வாழ்த்துக்கள்!',
        msgSuccess: 'உங்கள் தொலைபேசி எண்ணுக்கு ({phone}) விரைவில் reload கிடைக்கும்!',
        titleFail: 'தகுதியற்றது',
        msgFail: 'மன்னிக்கவும், உங்கள் தகுதியான Reckitt பொருட்களின் மொத்தம் ரூ {amount}. Reload பெற ரூ 1,000+ Dettol, Harpic, Lysol, Mortein, Veet, அல்லது Moov பொருட்கள் தேவை.',
        titleDuplicate: 'பில் ஏற்கனவே சமர்ப்பிக்கப்பட்டது',
        msgDuplicate: 'இந்த பில் (#{bill}) ஏற்கனவே சமர்ப்பிக்கப்பட்டது. ஒவ்வொரு பில்லும் ஒரு முறை மட்டுமே பயன்படுத்த முடியும்.',
        titleProcessFail: 'செயலாக்கம் தோல்வி',
        msgProcessFail: 'சேவையக சிக்கல்கள் காரணமாக பில் செயலாக்கம் தோல்வியடைந்தது. பின்னர் மீண்டும் முயற்சிக்கவும்.',
        titleUnclear: 'படம் தெளிவாக இல்லை',
        msgUnclear: 'பில் படம் படிக்க போதுமான தெளிவாக இல்லை. தெளிவான புகைப்படம் எடுத்து மீண்டும் முயற்சிக்கவும்.',
        titleNoBill: 'பில் எண் கிடைக்கவில்லை',
        msgNoBill: 'இந்த பில்லில் சரியான பில்/குறிப்பு எண் கிடைக்கவில்லை. குறிப்பு எண் தெரியும்படி முழு பில்லை எடுத்து மீண்டும் முயற்சிக்கவும்.',
        titleNotBill: 'சரியான பில் அல்ல',
        msgNotBill: 'பதிவேற்றிய படம் பில்லாக தெரியவில்லை. சரியான கடை பில்லை பதிவேற்றவும்.',
        titlePartial: 'முழு பில்லை படிக்க முடியவில்லை',
        msgPartial: 'உங்கள் பில்லின் சில விவரங்களை தெளிவாக படிக்க முடியவில்லை. முழு பில்லும் தெரியும்படி மீண்டும் புகைப்படம் எடுங்கள்.',
        titleNoBillNum: 'பில் எண் இல்லை',
        msgNoBillNum: 'பில் எண்ணைப் பெற முடியவில்லை. பில் குறிப்பு எண் தெரியும்படி உறுதி செய்யவும்.'
    }
});

// ===== API SERVICE =====
app.factory('ApiService', ['$http', 'CONFIG', function($http, CONFIG) {
    return {
        query: function(sql) {
            return $http.post(CONFIG.API_URL, { SysID: sql });
        }
    };
}]);

// ===== GEMINI SERVICE =====
app.factory('GeminiService', ['$http', '$q', '$timeout', 'CONFIG', function($http, $q, $timeout, CONFIG) {

    var PROMPT = 'You are a bill/receipt analyzer for a Sri Lankan promotional campaign called "Avurudu Reload Wasi" by Reckitt brands.\n\n' +
        'Analyze this bill/receipt image and extract ALL information. The bill may be in English, Sinhala (සිංහල), or Tamil (தமிழ்). ' +
        'POS systems across Sri Lanka use many different formats and languages.\n\n' +
        'EXTRACT:\n' +
        '1. Bill/Reference Number - Look for: Bill No, Invoice No, Receipt No, බිල් අංකය, Sale ID, Inv No, POS number, or any unique reference. ' +
        'It could be a number at top/bottom of receipt.\n' +
        '2. Bill Date\n' +
        '3. Shop Name\n' +
        '4. ALL line items: item name, quantity, unit price, total price\n' +
        '5. Bill Total amount\n\n' +
        'BRAND MATCHING - Match each item against these Reckitt brands. Consider ALL misspellings, abbreviations, and language variations:\n' +
        '- Dettol (also: Detol, Dattol, Detto, DETOL, DET, ඩෙටෝල්, டெட்டோல், Dettol Cool, Dettol Original, Dettol Skincare, antiseptic, handwash, sanitizer, plaster, wipes, liquid soap)\n' +
        '- Harpic (also: Harpik, Harpc, HARPC, හාපික්, ஹார்பிக், Harpic Power Plus, Harpic 10X, bathroom cleaner, toilet cleaner)\n' +
        '- Lysol (also: Laysol, Lysole, LYSOL, ලයිසෝල්, லைசோல், Lysol floor cleaner, disinfectant, citrus, floral, pine, lavender, jasmine)\n' +
        '- Mortein (also: Mortin, Mortan, MORTN, මෝටීන්, மார்டீன், Mortein coil, Mortein Fast Kill, vaporizer, cockroach killer, CIK)\n' +
        '- Veet (also: වීට්, வீட், Veet wax strip, hair removal cream)\n' +
        '- Moov (also: මූව්, மூவ், Moov cream, pain relief, ayurvedic)\n\n' +
        'IMPORTANT MATCHING RULES:\n' +
        '- In Sinhala bills: හාපික් = Harpic, ලයිසෝල් = Lysol, මෝටීන් = Mortein, ඩෙටෝල් = Dettol, ඩෙටොල් = Dettol, වීට් = Veet, මූව් = Moov\n' +
        '- POS abbreviations like DETOL, HARPC, MORTN, LYSOL are common\n' +
        '- Product descriptions may include size (70g, 110g, 200ml, 500ml etc.) - still match the brand\n' +
        '- Combo packs containing eligible brands should be matched\n' +
        '- Items written in any of the 3 languages should be matched\n\n' +
        'RESPOND WITH THIS EXACT JSON (no markdown, no code blocks, just raw JSON):\n' +
        '{\n' +
        '  "status": "success | unclear_image | no_bill_number | partial_read | not_a_bill",\n' +
        '  "bill_number": "string or null",\n' +
        '  "bill_date": "string or null",\n' +
        '  "shop_name": "string or null",\n' +
        '  "bill_total": number or null,\n' +
        '  "items": [\n' +
        '    {\n' +
        '      "item_name": "exactly as read from bill",\n' +
        '      "brand_matched": "Dettol|Harpic|Lysol|Mortein|Veet|Moov|null",\n' +
        '      "quantity": number,\n' +
        '      "unit_price": number or null,\n' +
        '      "total_price": number\n' +
        '    }\n' +
        '  ],\n' +
        '  "eligible_total": number,\n' +
        '  "message": "explanation if status is not success"\n' +
        '}\n\n' +
        'RULES:\n' +
        '- If image is too blurry/unclear to read any items → status: "unclear_image"\n' +
        '- If no bill/reference number found anywhere → status: "no_bill_number"\n' +
        '- If image is not a bill/receipt → status: "not_a_bill"\n' +
        '- Only "success" if bill number AND items are clearly readable\n' +
        '- eligible_total = sum of total_price for ALL items where brand_matched is not null\n' +
        '- For each item set brand_matched to the brand name if it matches, or null if not a Reckitt brand\n' +
        '- Return ONLY the JSON object, no other text';

    function getMimeAndData(imageBase64) {
        var mimeType = 'image/jpeg';
        if (imageBase64.indexOf('data:image/png') === 0) mimeType = 'image/png';
        if (imageBase64.indexOf('data:image/webp') === 0) mimeType = 'image/webp';
        var base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
        return { mime_type: mimeType, data: base64Data };
    }

    function callGemini(images, attempt, deferred, statusCallback) {
        attempt = attempt || 1;
        deferred = deferred || $q.defer();

        if (statusCallback) statusCallback(attempt);

        // Build parts: prompt text + one or more images
        var parts = [];

        if (images.length > 1) {
            parts.push({ text: PROMPT + '\n\nIMPORTANT: You are receiving ' + images.length + ' sequential photos of ONE single bill. ' +
                'Photo 1 is the top section, Photo 2 is the middle, Photo 3 is the bottom. ' +
                'They may have overlapping areas. Treat ALL photos as ONE continuous bill. ' +
                'Extract ALL items from ALL photos. Do NOT duplicate items that appear in overlapping areas. ' +
                'The bill number should appear in one of the photos (usually top or bottom).' });
        } else {
            parts.push({ text: PROMPT });
        }

        for (var i = 0; i < images.length; i++) {
            var imgData = getMimeAndData(images[i]);
            parts.push({ inline_data: imgData });
        }

        var requestBody = {
            contents: [{ parts: parts }],
            generationConfig: {
                temperature: 0.1,
                maxOutputTokens: 8192
            }
        };

        $http.post(CONFIG.GEMINI_URL + '?key=' + CONFIG.GEMINI_API_KEY, requestBody, { timeout: 90000 })
            .then(function(response) {
                try {
                    var text = response.data.candidates[0].content.parts[0].text;
                    text = text.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
                    var result = JSON.parse(text);
                    deferred.resolve(result);
                } catch (e) {
                    if (attempt < CONFIG.MAX_RETRIES) {
                        var delay = attempt === 1 ? 2000 : 3000;
                        $timeout(function() {
                            callGemini(images, attempt + 1, deferred, statusCallback);
                        }, delay);
                    } else {
                        deferred.reject({ error: 'parse_error', message: 'Failed to parse bill data. Please try again.' });
                    }
                }
            })
            .catch(function(err) {
                if (attempt < CONFIG.MAX_RETRIES) {
                    var delay = attempt === 1 ? 2000 : 3000;
                    $timeout(function() {
                        callGemini(images, attempt + 1, deferred, statusCallback);
                    }, delay);
                } else {
                    deferred.reject({ error: 'timeout', message: 'Bill processing failed due to server issues. Please try again later.' });
                }
            });

        return deferred.promise;
    }

    return {
        analyzeBill: function(images, statusCallback) {
            // images is now an array of base64 strings
            if (!angular.isArray(images)) images = [images];
            return callGemini(images, 1, null, statusCallback);
        }
    };
}]);

// ===== CONFETTI =====
app.factory('ConfettiService', ['$timeout', function($timeout) {
    return {
        launch: function() {
            var canvas = document.getElementById('confetti-canvas');
            if (!canvas) return;
            var ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.display = 'block';

            var pieces = [];
            var colors = ['#fec90d', '#e74c3c', '#27ae60', '#3498db', '#9b59b6', '#f39c12', '#1abc9c'];

            for (var i = 0; i < 150; i++) {
                pieces.push({
                    x: Math.random() * canvas.width,
                    y: -Math.random() * canvas.height,
                    w: Math.random() * 10 + 5,
                    h: Math.random() * 6 + 3,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    vx: (Math.random() - 0.5) * 4,
                    vy: Math.random() * 3 + 2,
                    rot: Math.random() * 360,
                    rotV: (Math.random() - 0.5) * 10
                });
            }

            var frame;
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                var alive = false;
                for (var i = 0; i < pieces.length; i++) {
                    var p = pieces[i];
                    p.x += p.vx;
                    p.y += p.vy;
                    p.rot += p.rotV;
                    p.vy += 0.05;
                    if (p.y < canvas.height + 20) alive = true;
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot * Math.PI / 180);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                    ctx.restore();
                }
                if (alive) {
                    frame = requestAnimationFrame(animate);
                } else {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    canvas.style.display = 'none';
                }
            }
            animate();

            $timeout(function() {
                if (frame) cancelAnimationFrame(frame);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.style.display = 'none';
            }, 5000);
        }
    };
}]);

// ===== UTILITY: LKR Time =====
app.filter('lkrTime', ['CONFIG', function(CONFIG) {
    return function(dateStr) {
        if (!dateStr) return '-';
        try {
            // Force parse as UTC by appending Z
            var normalized = dateStr.replace(' ', 'T');
            if (normalized.indexOf('Z') === -1 && normalized.indexOf('+') === -1) normalized += 'Z';
            var d = new Date(normalized);
            // Add LKR offset (UTC+5:30)
            var lkrMs = d.getTime() + CONFIG.LKR_OFFSET_HOURS * 3600000;
            var lkr = new Date(lkrMs);
            // Format using UTC methods to avoid browser timezone interference
            var yyyy = lkr.getUTCFullYear();
            var mm = ('0' + (lkr.getUTCMonth() + 1)).slice(-2);
            var dd = ('0' + lkr.getUTCDate()).slice(-2);
            var hh = ('0' + lkr.getUTCHours()).slice(-2);
            var mi = ('0' + lkr.getUTCMinutes()).slice(-2);
            var ss = ('0' + lkr.getUTCSeconds()).slice(-2);
            return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mi + ':' + ss;
        } catch (e) {
            return dateStr;
        }
    };
}]);

// ===== MAIN CONTROLLER (index.html) =====
app.controller('MainCtrl', ['$scope', '$http', '$timeout', '$interval', 'ApiService', 'GeminiService', 'ConfettiService', 'CONFIG', 'LANG',
    function($scope, $http, $timeout, $interval, ApiService, GeminiService, ConfettiService, CONFIG, LANG) {

    $scope.step = 0;
    $scope.t = LANG.en; // default until user selects

    $scope.selectLanguage = function(lang) {
        $scope.t = LANG[lang] || LANG.en;
        $scope.step = 1;
    };
    $scope.user = { name: '', phone: '' };
    $scope.isSubmitting = false;
    $scope.currentAttempt = 0;
    $scope.result = null;
    $scope.errors = {};

    // Single capture state
    $scope.captureMode = 'single'; // 'single' or 'long'
    $scope.billImage = null;
    $scope.billPreview = null;

    // Multi-capture state (long bill)
    $scope.captures = [null, null, null];
    $scope.captureExpired = false;
    $scope.captureTimeLeft = 0;
    $scope.captureTimeLeft2 = 0;

    var CAPTURE_TIMEOUT_SEC = 60;
    var _captureTimers = [];
    var _lastCaptureTime = null;

    // Step 1 → 2 validation
    $scope.goToUpload = function() {
        $scope.errors = {};
        if (!$scope.user.name || $scope.user.name.trim().length < 2) {
            $scope.errors.name = $scope.t.errName;
            return;
        }
        if (!$scope.user.phone || !/^07[0-9]{8}$/.test($scope.user.phone.trim())) {
            $scope.errors.phone = $scope.t.errPhone;
            return;
        }
        $scope.step = 2;
    };

    $scope.goBack = function() {
        resetAll();
        $scope.step = 1;
    };

    // ===== IMAGE PROCESSING =====
    function processImage(file, callback) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = new Image();
            img.onload = function() {
                var canvas = document.createElement('canvas');
                var maxW = 1200, maxH = 1600;
                var w = img.width, h = img.height;
                if (w > maxW || h > maxH) {
                    var ratio = Math.min(maxW / w, maxH / h);
                    w = Math.round(w * ratio);
                    h = Math.round(h * ratio);
                }
                canvas.width = w;
                canvas.height = h;
                canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                var resized = canvas.toDataURL('image/jpeg', 0.85);
                callback(resized);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // ===== SINGLE CAPTURE (Short Bill) =====
    $scope.onSingleCapture = function(input) {
        var file = input.files[0];
        if (!file) return;
        if (!file.type.match('image.*')) { alert('Please capture an image'); return; }

        processImage(file, function(resized) {
            $scope.$apply(function() {
                $scope.captureMode = 'single';
                $scope.billImage = resized;
                $scope.billPreview = resized;
            });
        });
        input.value = '';
    };

    $scope.removeImage = function() {
        $scope.billImage = null;
        $scope.billPreview = null;
    };

    // ===== MODE SWITCHING =====
    $scope.switchToLongBill = function() {
        $scope.captureMode = 'long';
        $scope.billImage = null;
        $scope.billPreview = null;
    };

    $scope.switchToSingle = function() {
        $scope.captureMode = 'single';
        resetCaptures();
    };

    // ===== MULTI-CAPTURE (Long Bill) =====
    $scope.onCapture = function(input, index) {
        var file = input.files[0];
        if (!file) return;
        if (!file.type.match('image.*')) { alert('Please capture an image'); return; }

        // Time validation for 2nd and 3rd captures
        if (index > 0 && _lastCaptureTime) {
            var elapsed = (Date.now() - _lastCaptureTime) / 1000;
            if (elapsed > CAPTURE_TIMEOUT_SEC) {
                $scope.$apply(function() {
                    $scope.captureExpired = true;
                });
                input.value = '';
                return;
            }
        }

        processImage(file, function(resized) {
            $scope.$apply(function() {
                $scope.captures[index] = { preview: resized, base64: resized };
                _lastCaptureTime = Date.now();
                $scope.captureExpired = false;
                startCountdown(index);
            });
        });
        input.value = '';
    };

    function startCountdown(capturedIndex) {
        clearAllTimers();
        var nextIndex = capturedIndex + 1;
        if (nextIndex >= 3) return;

        var startTime = Date.now();
        var timer = $interval(function() {
            var elapsed = (Date.now() - startTime) / 1000;
            var remaining = Math.max(0, Math.ceil(CAPTURE_TIMEOUT_SEC - elapsed));

            if (nextIndex === 1) $scope.captureTimeLeft = remaining;
            else if (nextIndex === 2) $scope.captureTimeLeft2 = remaining;

            if (remaining <= 0) {
                clearAllTimers();
                if (!$scope.captures[nextIndex]) {
                    $scope.captureTimeLeft = 0;
                    $scope.captureTimeLeft2 = 0;
                }
            }
        }, 1000);
        _captureTimers.push(timer);
    }

    function clearAllTimers() {
        for (var i = 0; i < _captureTimers.length; i++) {
            $interval.cancel(_captureTimers[i]);
        }
        _captureTimers = [];
        $scope.captureTimeLeft = 0;
        $scope.captureTimeLeft2 = 0;
    }

    $scope.removeCapture = function(index) {
        for (var i = index; i < 3; i++) { $scope.captures[i] = null; }
        clearAllTimers();
        $scope.captureExpired = false;
        if (index === 0) {
            _lastCaptureTime = null;
        } else if ($scope.captures[index - 1]) {
            _lastCaptureTime = Date.now();
            startCountdown(index - 1);
        }
    };

    function resetCaptures() {
        $scope.captures = [null, null, null];
        $scope.captureExpired = false;
        _lastCaptureTime = null;
        clearAllTimers();
    }

    $scope.resetCaptures = resetCaptures;

    function resetAll() {
        $scope.captureMode = 'single';
        $scope.billImage = null;
        $scope.billPreview = null;
        resetCaptures();
    }

    $scope.$on('$destroy', function() { clearAllTimers(); });

    // ===== SUBMIT BILL =====
    $scope.submitBill = function() {
        if ($scope.isSubmitting) return;

        var images = [];
        var firstImage = null;

        if ($scope.captureMode === 'single') {
            if (!$scope.billImage) return;
            images = [$scope.billImage];
            firstImage = $scope.billImage;
        } else {
            // Long bill mode — need at least 2 photos
            if (!$scope.captures[0] || !$scope.captures[1]) return;
            for (var i = 0; i < 3; i++) {
                if ($scope.captures[i]) images.push($scope.captures[i].base64);
            }
            firstImage = images[0];
        }

        $scope.isSubmitting = true;
        $scope.step = 3;
        $scope.currentAttempt = 0;

        GeminiService.analyzeBill(images, function(attempt) {
            $scope.currentAttempt = attempt;
        }).then(function(data) {
            handleGeminiResult(data, firstImage);
        }).catch(function(err) {
            $scope.result = {
                type: 'error',
                title: $scope.t.titleProcessFail,
                message: $scope.t.msgProcessFail,
                icon: '⚠️'
            };
            $scope.step = 4;
            $scope.isSubmitting = false;
        });
    };

    function handleGeminiResult(data, billImageBase64) {
        if (data.status === 'unclear_image') {
            $scope.result = {
                type: 'error',
                title: $scope.t.titleUnclear,
                message: $scope.t.msgUnclear,
                icon: '📷'
            };
            $scope.step = 4;
            $scope.isSubmitting = false;
            return;
        }

        if (data.status === 'no_bill_number') {
            $scope.result = {
                type: 'error',
                title: $scope.t.titleNoBill,
                message: $scope.t.msgNoBill,
                icon: '🔍'
            };
            $scope.step = 4;
            $scope.isSubmitting = false;
            return;
        }

        if (data.status === 'not_a_bill') {
            $scope.result = {
                type: 'error',
                title: $scope.t.titleNotBill,
                message: $scope.t.msgNotBill,
                icon: '❌'
            };
            $scope.step = 4;
            $scope.isSubmitting = false;
            return;
        }

        if (data.status === 'partial_read') {
            $scope.result = {
                type: 'error',
                title: $scope.t.titlePartial,
                message: $scope.t.msgPartial,
                icon: '📋'
            };
            $scope.step = 4;
            $scope.isSubmitting = false;
            return;
        }

        // Success - check for duplicate bill
        var billNum = (data.bill_number || '').toString().trim();
        if (!billNum) {
            $scope.result = {
                type: 'error',
                title: $scope.t.titleNoBillNum,
                message: $scope.t.msgNoBillNum,
                icon: '🔍'
            };
            $scope.step = 4;
            $scope.isSubmitting = false;
            return;
        }

        // Check duplicate
        var checkSql = "SELECT COUNT(*) as cnt FROM rek_cc_reg WHERE bill_number = '" + billNum.replace(/'/g, "''") + "'";
        ApiService.query(checkSql).then(function(resp) {
            var count = 0;
            if (resp.data && resp.data.length > 0) {
                count = resp.data[0].cnt || 0;
            }

            if (count > 0) {
                $scope.result = {
                    type: 'duplicate',
                    title: $scope.t.titleDuplicate,
                    message: $scope.t.msgDuplicate.replace('{bill}', billNum),
                    icon: '🔄'
                };
                $scope.step = 4;
                $scope.isSubmitting = false;
                return;
            }

            // Process eligibility
            processEligibility(data, billImageBase64);
        }).catch(function() {
            // If DB check fails, still process
            processEligibility(data, billImageBase64);
        });
    }

    function processEligibility(data, billImageBase64) {
        var eligibleTotal = data.eligible_total || 0;
        var isEligible = eligibleTotal >= CONFIG.ELIGIBLE_THRESHOLD;
        var items = data.items || [];

        var eligibleItems = items.filter(function(i) { return i.brand_matched; });
        var nonEligibleItems = items.filter(function(i) { return !i.brand_matched; });

        // Save to database
        var itemsJson = JSON.stringify(items).replace(/'/g, "''");
        var billNum = (data.bill_number || '').replace(/'/g, "''");
        var shopName = (data.shop_name || '').replace(/'/g, "''");
        var userName = ($scope.user.name || '').replace(/'/g, "''");
        var phone = ($scope.user.phone || '').replace(/'/g, "''");
        var billDate = (data.bill_date || '').replace(/'/g, "''");
        var billTotal = data.bill_total || 0;

        var insertSql = "INSERT INTO rek_cc_reg (name, phone, bill_image, bill_number, bill_date, shop_name, bill_total, eligible_total, is_eligible, items_json, created_at) " +
            "VALUES (N'" + userName + "', '" + phone + "', '" + (billImageBase64 || '').substring(0, 100) + "...stored', '" +
            billNum + "', '" + billDate + "', N'" + shopName + "', " + billTotal + ", " + eligibleTotal + ", " +
            (isEligible ? 1 : 0) + ", N'" + itemsJson + "', GETUTCDATE()); SELECT SCOPE_IDENTITY() as newId";

        ApiService.query(insertSql).then(function(resp) {
            var regId = null;
            if (resp.data && resp.data.length > 0) {
                regId = resp.data[0].newId;
            }

            // Insert individual items
            if (regId && items.length > 0) {
                var itemsSql = '';
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var iName = (item.item_name || '').replace(/'/g, "''");
                    var brand = item.brand_matched ? "'" + item.brand_matched.replace(/'/g, "''") + "'" : 'NULL';
                    itemsSql += "INSERT INTO rek_cc_items (reg_id, item_name, brand_matched, quantity, unit_price, total_price, is_eligible_brand) " +
                        "VALUES (" + regId + ", N'" + iName + "', " + brand + ", " +
                        (item.quantity || 1) + ", " + (item.unit_price || 0) + ", " + (item.total_price || 0) + ", " +
                        (item.brand_matched ? 1 : 0) + "); ";
                }
                ApiService.query(itemsSql);
            }

            // Also update with full bill image
            if (regId && billImageBase64) {
                var imgData = billImageBase64.replace(/'/g, "''");
                var updateSql = "UPDATE rek_cc_reg SET bill_image = '" + imgData + "' WHERE id = " + regId;
                ApiService.query(updateSql);
            }
        });

        // Show result
        if (isEligible) {
            $scope.result = {
                type: 'success',
                title: $scope.t.titleSuccess,
                message: $scope.t.msgSuccess.replace('{phone}', $scope.user.phone),
                icon: '🎉',
                eligibleTotal: eligibleTotal,
                billTotal: data.bill_total,
                items: items,
                eligibleItems: eligibleItems,
                billNumber: data.bill_number
            };
            $scope.step = 4;
            $scope.isSubmitting = false;
            $timeout(function() { ConfettiService.launch(); }, 300);

            // Notify admin via email (fire and forget)
            $http.post('https://mail.phvtech.com/api/send-mail', {
                to: 'prasanthahv@gmail.com',
                subject: 'Avurudu Reload Wasi - New Eligible User',
                body: $scope.user.name + ' - ' + $scope.user.phone,
                isHtml: false
            }).catch(function() { /* silent fail */ });
        } else {
            $scope.result = {
                type: 'fail',
                title: $scope.t.titleFail,
                message: $scope.t.msgFail.replace('{amount}', eligibleTotal.toFixed(2)),
                icon: '😔',
                eligibleTotal: eligibleTotal,
                billTotal: data.bill_total,
                items: items,
                eligibleItems: eligibleItems,
                billNumber: data.bill_number
            };
            $scope.step = 4;
            $scope.isSubmitting = false;
        }
    }

    // Try again
    $scope.tryAgain = function() {
        $scope.step = 2;
        resetAll();
        $scope.result = null;
        $scope.isSubmitting = false;
        $scope.currentAttempt = 0;
    };

    // Start over
    $scope.startOver = function() {
        $scope.step = 0;
        $scope.user = { name: '', phone: '' };
        resetAll();
        $scope.result = null;
        $scope.isSubmitting = false;
        $scope.currentAttempt = 0;
    };
}]);

// ===== RELOAD CONTROLLER (reload.html) =====
app.controller('ReloadCtrl', ['$scope', 'ApiService', function($scope, ApiService) {
    $scope.records = [];
    $scope.displayRecords = [];
    $scope.loading = true;
    $scope.filters = { dateFrom: '', dateTo: '', search: '' };

    $scope.loadData = function() {
        $scope.loading = true;
        var sql = "SELECT * FROM rek_cc_reg WHERE is_eligible = 1 ORDER BY created_at DESC";
        ApiService.query(sql).then(function(resp) {
            var data = resp.data || [];
            for (var i = 0; i < data.length; i++) {
                try { data[i]._items = JSON.parse(data[i].items_json); } catch (e) { data[i]._items = []; }
                data[i]._eligibleItems = data[i]._items.filter(function(item) { return item.brand_matched; });
            }
            $scope.records = data;
            $scope.applyFilters();
            $scope.loading = false;
        }).catch(function() {
            $scope.records = [];
            $scope.displayRecords = [];
            $scope.loading = false;
        });
    };

    $scope.detailRecord = null;

    $scope.showItemsModal = function(record) {
        $scope.detailRecord = record;
    };

    $scope.closeModal = function() { $scope.detailRecord = null; };

    $scope.toggleReloadSent = function(record) {
        var newVal = record.reload_sent ? 0 : 1;
        var sql = "UPDATE rek_cc_reg SET reload_sent = " + newVal + " WHERE id = " + record.id;
        ApiService.query(sql).then(function() {
            record.reload_sent = newVal;
        });
    };

    $scope.applyFilters = function() {
        $scope.displayRecords = $scope.records.filter(function(r) {
            if ($scope.filters.search) {
                var s = $scope.filters.search.toLowerCase();
                if ((r.name || '').toLowerCase().indexOf(s) === -1 &&
                    (r.phone || '').toLowerCase().indexOf(s) === -1 &&
                    (r.bill_number || '').toLowerCase().indexOf(s) === -1) {
                    return false;
                }
            }
            if ($scope.filters.dateFrom) {
                var from = new Date($scope.filters.dateFrom);
                var created = new Date(r.created_at);
                if (created < from) return false;
            }
            if ($scope.filters.dateTo) {
                var to = new Date($scope.filters.dateTo);
                to.setHours(23, 59, 59);
                var createdD = new Date(r.created_at);
                if (createdD > to) return false;
            }
            return true;
        });
    };

    $scope.loadData();
}]);

// ===== ADMIN CONTROLLER (admin.html) =====
app.controller('AdminCtrl', ['$scope', 'ApiService', function($scope, ApiService) {
    $scope.records = [];
    $scope.allRecords = [];
    $scope.pageRecords = [];
    $scope.loading = true;
    $scope.filters = { dateFrom: '', dateTo: '', billNumber: '', eligibility: 'all', search: '' };
    $scope.summary = { total: 0, eligible: 0, notEligible: 0, reloadSent: 0 };

    // Pagination
    $scope.currentPage = 1;
    $scope.pageSize = 25;
    $scope.pageTotalPages = 1;

    function parseRecords(data) {
        for (var i = 0; i < data.length; i++) {
            var r = data[i];
            try { r._items = JSON.parse(r.items_json); } catch (e) { r._items = []; }
            r._eligibleItems = r._items.filter(function(item) { return item.brand_matched; });
        }
        return data;
    }

    $scope.loadData = function() {
        $scope.loading = true;
        var sql = "SELECT * FROM rek_cc_reg ORDER BY created_at DESC";
        ApiService.query(sql).then(function(resp) {
            $scope.allRecords = parseRecords(resp.data || []);
            $scope.calculateSummary();
            $scope.applyFilters();
            $scope.loading = false;
        }).catch(function() {
            $scope.allRecords = [];
            $scope.records = [];
            $scope.pageRecords = [];
            $scope.loading = false;
        });
    };

    $scope.calculateSummary = function() {
        var all = $scope.allRecords;
        $scope.summary.total = all.length;
        $scope.summary.eligible = all.filter(function(r) { return r.is_eligible; }).length;
        $scope.summary.notEligible = all.filter(function(r) { return !r.is_eligible; }).length;
        $scope.summary.reloadSent = all.filter(function(r) { return r.reload_sent; }).length;
    };

    $scope.applyFilters = function() {
        $scope.currentPage = 1;
        $scope.records = $scope.allRecords.filter(function(r) {
            if ($scope.filters.search) {
                var s = $scope.filters.search.toLowerCase();
                if ((r.name || '').toLowerCase().indexOf(s) === -1 &&
                    (r.phone || '').toLowerCase().indexOf(s) === -1) {
                    return false;
                }
            }
            if ($scope.filters.billNumber) {
                if ((r.bill_number || '').toLowerCase().indexOf($scope.filters.billNumber.toLowerCase()) === -1) {
                    return false;
                }
            }
            if ($scope.filters.eligibility === 'eligible' && !r.is_eligible) return false;
            if ($scope.filters.eligibility === 'not_eligible' && r.is_eligible) return false;
            if ($scope.filters.eligibility === 'sent' && !r.reload_sent) return false;
            if ($scope.filters.eligibility === 'not_sent' && (r.reload_sent || !r.is_eligible)) return false;

            if ($scope.filters.dateFrom) {
                var from = new Date($scope.filters.dateFrom);
                var created = new Date(r.created_at);
                if (created < from) return false;
            }
            if ($scope.filters.dateTo) {
                var to = new Date($scope.filters.dateTo);
                to.setHours(23, 59, 59);
                var createdD = new Date(r.created_at);
                if (createdD > to) return false;
            }
            return true;
        });
        $scope.updatePage();
    };

    $scope.clearFilters = function() {
        $scope.filters = { dateFrom: '', dateTo: '', billNumber: '', eligibility: 'all', search: '' };
        $scope.applyFilters();
    };

    $scope.updatePage = function() {
        $scope.pageTotalPages = Math.ceil($scope.records.length / $scope.pageSize) || 1;
        var start = ($scope.currentPage - 1) * $scope.pageSize;
        $scope.pageRecords = $scope.records.slice(start, start + $scope.pageSize);
    };

    $scope.prevPage = function() {
        if ($scope.currentPage > 1) { $scope.currentPage--; $scope.updatePage(); }
    };

    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageTotalPages) { $scope.currentPage++; $scope.updatePage(); }
    };

    $scope.detailRecord = null;

    $scope.showItemsModal = function(record) {
        $scope.detailRecord = record;
    };

    $scope.closeModal = function() { $scope.detailRecord = null; };

    $scope.toggleReloadSent = function(record) {
        var newVal = record.reload_sent ? 0 : 1;
        var sql = "UPDATE rek_cc_reg SET reload_sent = " + newVal + " WHERE id = " + record.id;
        ApiService.query(sql).then(function() {
            record.reload_sent = newVal;
            $scope.calculateSummary();
        });
    };

    $scope.loadData();
}]);
