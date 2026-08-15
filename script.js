// 1. स्पलैश स्क्रीन (Splash Screen) का स्लो फेड-आउट लॉजिक
window.onload = function() {
    setTimeout(function() {
        const splash = document.getElementById('splash-screen');
        splash.style.opacity = '0'; // धीरे से गायब होना शुरू
        
        setTimeout(function() {
            splash.style.display = 'none'; // पूरी तरह से हटा देना
        }, 800); // 0.8 सेकंड फेड-आउट का समय
        
    }, 2000); // 2 सेकंड तक स्क्रीन पर लोगो दिखेगा
};


// 2. साइडबार खोलने और बंद करने का लॉजिक
document.getElementById('menu-btn').onclick = function() {
    document.getElementById('sidebar').classList.add('open');
};

document.getElementById('close-btn').onclick = function() {
    document.getElementById('sidebar').classList.remove('open');
};


// 3. बटन क्लिक करने पर लिंक खोलने का लॉजिक
function openLink(linkName) {
    if (navigator.vibrate) navigator.vibrate(50);
    const loader = document.getElementById('loading-overlay');
    loader.style.display = 'flex';

    const appLinks = {
        "Class_5": "https://drive.google.com/drive/folders/1DmtcNe_xlpFesbXewq1KD-urxWF0SiHS?usp=sharing",
        "Class_6": "https://drive.google.com/drive/folders/1WkvH95aRlex2elOA0GJDIkso5tg98QiG?usp=sharing",
        "Class_7": "https://drive.google.com/drive/folders/14C33YRHdQrkvGGzWc4012a7iM2uYOtMi?usp=sharing",
        "Class_8": "https://drive.google.com/drive/folders/1tmWej98zlWxp322sAABhUQTqdarzh8WO?usp=sharing",
        "Class_9": "https://drive.google.com/drive/folders/1PoJyv_vQ-jrLuLNWB9hmeCnMTpZS8mop?usp=sharing",
        "Class_10": "https://drive.google.com/drive/folders/1XGTBxka2gpL_AUsDg04E9yj6a4h55VFu?usp=sharing",
        "Competition": "https://drive.google.com/drive/folders/1CqkafKQMITpNJpIED2bLE8ULHrZO32XU?usp=sharing",
        "Timetable": "https://drive.google.com/drive/folders/1-YvVkaDvlD6UXUojgZz1FDfH2Gk3_N3m?usp=sharing",
        "UpdateApp": "https://drive.google.com/drive/folders/1PjhCQNqHgsELRouPiTIeIueoZoBARpRm?usp=sharing" 
    };
    
    setTimeout(() => {
        if (appLinks[linkName]) {
            window.open(appLinks[linkName], "_blank");
        }
        setTimeout(() => { loader.style.display = 'none'; }, 2000);
    }, 500);
}


// 4. गूगल शीट से नोटिस और ऐप अपडेट बटन ब्लिंक कराने का लॉजिक
const googleSheetCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmhscV9iFZVPh7d66J08RquCXwhrd3c_wKw2eKX0Dl-BA5J8dOADrXxu4CMwWyUz1ZoO5LyBA33z4U/pub?output=csv"; 

async function loadNotices() {
    try {
        const response = await fetch(googleSheetCSV);
        const data = await response.text();
        const rows = data.split('\n');
        
        rows.forEach(row => {
            const firstComma = row.indexOf(',');
            if(firstComma > -1) {
                const classNum = row.substring(0, firstComma).trim(); 
                const noticeText = row.substring(firstComma + 1).trim(); 
                
                // अगर सामान्य नोटिस (All) है
                if (classNum.toLowerCase() === 'all') {
                    const marqueeWrapper = document.getElementById('marquee-wrapper');
                    if(marqueeWrapper && noticeText !== "") {
                        const msg = "⭐ " + noticeText + " ⭐";
                        // बिना गैप (Seamless) के चलाने के लिए हम मैसेज को 2 बार डाल रहे हैं
                        marqueeWrapper.innerHTML = `<div class="marquee-item">${msg}</div><div class="marquee-item">${msg}</div>`;
                    }
                } 
                // 4. नया: अगर ऐप अपडेट (Update) का मैसेज है
                else if (classNum.toLowerCase() === 'update') {
                    const updateBtn = document.getElementById('btn-update');
                    if(updateBtn && noticeText.toLowerCase() === 'yes') {
                        updateBtn.classList.add('glow-btn'); // बटन को लाल रंग में चमकाएँ
                    }
                }
                // अगर किसी क्लास (Class) का नोटिस है
                else {
                    const noticeElement = document.getElementById('notice-' + classNum);
                    if(noticeElement && noticeText !== "") {
                        noticeElement.innerText = noticeText;
                        
                        const classBtn = document.getElementById('btn-' + classNum);
                        if(classBtn) classBtn.classList.add('glow-btn');

                        const noticeCard = document.getElementById('notice-card-' + classNum);
                        if(noticeCard) noticeCard.classList.add('glow-card');
                    }
                }
            }
        });
    } catch (error) {
        console.log("नोटिस लोड नहीं हो पाए:", error);
    }
}

loadNotices();
