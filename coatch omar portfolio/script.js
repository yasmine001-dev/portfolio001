
const T={
ar:{
  logoTxt:'COACH OMAR',waTxt:'ابدأ الآن',
  chipL1:'متحول',chipL2:'تقييم',
  eyeTxt:'مدرب معتمد — القاهرة',
  h1a:'حوّل',h1b:'جسمك',
  heroDesc:'برامج تدريبية مخصصة لكل هدف — خسارة وزن، بناء عضلات، أو تحسين اللياقة. نتائج حقيقية في 30 يوم.',
  btnBook:'ابدأ تحولك 💪',btnMore:'البرامج',
  st1:'عميل متحول',st2:'سنوات خبرة',st3:'تقييم',st4:'يوم لأول نتيجة',
  secTag:'التدريب',secH2:'مهاراتي التدريبية',secP:'تخصصات متعددة لتحقيق أي هدف لياقي تريده',
  skN1:'حرق الدهون وإنقاص الوزن',skD1:'برامج HIIT وكارديو مكثف مع خطة غذائية محسوبة دقيقياً لنتائج مرئية سريعة وآمنة.',skL1:'مستوى الإتقان',
  skN2:'بناء العضلات',skD2:'برامج قوة وتضخيم مبنية على progressive overload لتحقيق أقصى نمو عضلي.',skL2:'الإتقان',
  tr1:'+8 كيلو عضل',tn1:'مصطفى — 3 شهور',tr2:'-15 كيلو دهون',tn2:'خالد — شهرين',tr3:'من مبتدئ → متقدم',tn3:'سارة — 6 أسابيع',
  skN3:'اللياقة العامة',skD3:'تمارين شاملة للمبتدئين — تحسين القدرة القلبية والمرونة والتحمل.',skL3:'الإتقان',
  skN4:'التغذية الرياضية',skD4:'خطط غذائية مخصصة — ماكروز، وجبات، وتوقيت الأكل لتسريع النتائج.',skL4:'الإتقان',
  skN5:'الشهادات والمؤهلات',certDesc:'مدرب معتمد دولياً مع خبرة 7 سنوات في التدريب الفردي والأونلاين.',
  pgTag:'البرامج',pgH2:'اختار برنامجك',pgP:'كل برنامج مصمم لهدف محدد بنتائج مضمونة',
  pn1:'حرق الدهون',pd1:'8 أسابيع · 3 حصص/أسبوع',pds1:'كارديو + تغذية لإنقاص الوزن بأمان',pp1:'800 ج / شهر',
  pn2:'بناء العضلات',pd2:'12 أسبوع · 4 حصص/أسبوع',pds2:'قوة وتضخيم مع خطة بروتين',pp2:'1000 ج / شهر',
  pn3:'لياقة عامة',pd3:'6 أسابيع · 3 حصص/أسبوع',pds3:'مناسب للمبتدئين تماماً',pp3:'600 ج / شهر',
  pn4:'VIP مخصص',pd4:'مرن · يومي',pds4:'برنامج فردي 100% + دعم كامل',pp4:'1500 ج / شهر',
  ctTag:'تواصل',ctH2:'ابدأ تحولك اليوم',ctP:'استشارة مجانية 15 دقيقة — نحدد هدفك وأنسب برنامج',
  cl1:'واتساب',cl2:'اتصال',cl3:'القاهرة، المعادي',
  fName:'COACH OMAR',fRight:'© 2025 جميع الحقوق محفوظة',
},
en:{
  logoTxt:'COACH OMAR',waTxt:'Start Now',
  chipL1:'Transformed',chipL2:'Rating',
  eyeTxt:'Certified Trainer — Cairo',
  h1a:'TRANSFORM',h1b:'YOUR BODY',
  heroDesc:'Customized training programs for every goal — weight loss, muscle building, or general fitness. Real results in 30 days.',
  btnBook:'Start Your Transformation 💪',btnMore:'Programs',
  st1:'Clients Transformed',st2:'Years Experience',st3:'Rating',st4:'Days to First Result',
  secTag:'TRAINING',secH2:'My Training Skills',secP:'Multiple specializations to achieve any fitness goal you have',
  skN1:'Fat Loss & Weight Loss',skD1:'HIIT and intensive cardio programs with a precisely calculated nutrition plan for fast, safe, visible results.',skL1:'Mastery Level',
  skN2:'Muscle Building',skD2:'Strength and hypertrophy programs built on progressive overload to maximize muscle growth.',skL2:'Mastery',
  tr1:'+8kg Muscle',tn1:'Mostafa — 3 Months',tr2:'-15kg Fat',tn2:'Khaled — 2 Months',tr3:'Beginner → Advanced',tn3:'Sara — 6 Weeks',
  skN3:'General Fitness',skD3:'Full-body workouts for beginners — improve cardiovascular capacity, flexibility, and endurance.',skL3:'Mastery',
  skN4:'Sports Nutrition',skD4:'Customized nutrition plans — macros, meals, and meal timing to accelerate results.',skL4:'Mastery',
  skN5:'Certifications & Qualifications',certDesc:'Internationally certified trainer with 7 years of experience in personal and online coaching.',
  pgTag:'PROGRAMS',pgH2:'Choose Your Program',pgP:'Each program is designed for a specific goal with guaranteed results',
  pn1:'Fat Loss',pd1:'8 Weeks · 3 sessions/week',pds1:'Cardio + nutrition for safe weight loss',pp1:'800 EGP / month',
  pn2:'Muscle Building',pd2:'12 Weeks · 4 sessions/week',pds2:'Strength & hypertrophy with protein plan',pp2:'1000 EGP / month',
  pn3:'General Fitness',pd3:'6 Weeks · 3 sessions/week',pds3:'Perfect for complete beginners',pp3:'600 EGP / month',
  pn4:'VIP Custom',pd4:'Flexible · Daily',pds4:'100% personalized + full support',pp4:'1500 EGP / month',
  ctTag:'CONTACT',ctH2:'START YOUR TRANSFORMATION TODAY',ctP:'Free 15-min consultation — we identify your goal and best program',
  cl1:'WhatsApp',cl2:'Call',cl3:'Cairo, Maadi',
  fName:'COACH OMAR',fRight:'© 2025 All rights reserved',
}};
function setL(l){
  document.documentElement.setAttribute('lang',l);
  document.documentElement.setAttribute('dir',l==='ar'?'rtl':'ltr');
  document.getElementById('bAr').classList.toggle('on',l==='ar');
  document.getElementById('bEn').classList.toggle('on',l==='en');
  const t=T[l];Object.keys(t).forEach(k=>{const el=document.getElementById(k);if(el)el.textContent=t[k];});
}
function togT(){const h=document.documentElement;h.setAttribute('data-theme',h.getAttribute('data-theme')==='dark'?'light':'dark');}
setL('ar');