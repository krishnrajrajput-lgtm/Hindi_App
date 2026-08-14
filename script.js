// 1. साइडबार खोलने और बंद करने का लॉजिक
document.getElementById('menu-btn').onclick = function() {
    document.getElementById('sidebar').classList.add('open');
};

document.getElementById('close-btn').onclick = function() {
    document.getElementById('sidebar').classList.remove('open');
};

// 2. बटन क्लिक करने पर लिंक खोलने, वाइब्रेशन और लोडिंग का लॉजिक
function openLink(linkName) {
    // वाइब्रेशन चालू करें
    if (navigator.vibrate) navigator.vibrate(50);
    
    // लोडिंग स्क्रीन दिखाएं
    const loader = document.getElementById('loading-overlay');
    loader.style.display = 'flex';

    // आपके सभी गूगल ड्राइव के लिंक्स
    const appLinks = {
        "Class_5": "https://drive.google.com/drive/folders/1DmtcNe_xlpFesbXewq1KD-urxWF0SiHS?usp=sharing",
        "Class_6": "https://drive.google.com/drive/folders/1WkvH95aRlex2elOA0GJDIkso5tg98QiG?usp=sharing",
        "Class_7": "https://drive.google.com/drive/folders/14C33YRHdQrkvGGzWc4012a7iM2uYOtMi?usp=sharing",
        "Class_8": "https://drive.google.com/drive/folders/1tmWej98zlWxp322sAABhUQTqdarzh8WO?usp=sharing",
        "Class_9": "https://drive.google.com/drive/folders/1PoJyv_vQ-jrLuLNWB9hmeCnMTpZS8mop?usp=sharing",
        "Class_10": "https://drive.google.com/drive/folders/1XGTBxka2gpL_AUsDg04E9yj6a4h55VFu?usp=sharing",
        "Competition": "https://drive.google.com/drive/folders/1CqkafKQMITpNJpIED2bLE8ULHrZO32XU?usp=sharing",
        "Timetable": "https://drive.google.com/drive/folders/1-YvVkaDvlD6UXUojgZz1FDfH2Gk3_N3m?usp=sharing"
    };
    
    setTimeout(() => {
        if (appLinks[linkName]) {
            window.open(appLinks[linkName], "_blank");
        }
        setTimeout(() => { loader.style.display = 'none'; }, 2000);
    }, 500);
}

// 3. गूगल शीट से ऑटोमैटिक नोटिस और चमकते बटन का लॉजिक
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
                
                if (classNum.toLowerCase() === 'all') {
                    const generalNotice = document.getElementById('general-notice');
                    if(generalNotice && noticeText !== "") {
                        generalNotice.innerText = "⭐ " + noticeText + " ⭐";
                    }
                } else {
                    const noticeElement = document.getElementById('notice-' + classNum);
                    if(noticeElement && noticeText !== "") {
                        // साइडबार में नोटिस दिखाएँ
                        noticeElement.innerText = noticeText;
                        
                        // अगर कोई नोटिस है, तो उस क्लास का बटन चमकाएँ (Glow)
                        const classBtn = document.getElementById('btn-' + classNum);
                        if(classBtn) {
                            classBtn.classList.add('glow-btn');
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.log("नोटिस लोड नहीं हो पाए:", error);
    }
}

// ऐप खुलते ही नोटिस चेक करें
loadNotices();