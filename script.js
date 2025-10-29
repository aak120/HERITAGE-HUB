document.addEventListener("DOMContentLoaded", () => {

  // --- SPA NAVIGATION ---
  const pages = document.querySelectorAll(".page");
  const navBtns = document.querySelectorAll(".nav-btn");
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pages.forEach(p => p.classList.add('hidden'));
      const page = document.getElementById(`page-${btn.dataset.page}`);
      page.classList.remove('hidden');

      // Reload quiz if artifacts page
      if (btn.dataset.page === 'artifacts') {
        loadArtifact(artifactSelect.value);
        loadQuiz(artifactSelect.value);
      }

      // Load stories if stories page
      if (btn.dataset.page === 'stories') {
        populateStories();
      }
    });
  });

  // --- ARTIFACTS DATA ---
  const ARTIFACTS = [
    {id:'artifact1',title:'Puran Poli',img:'https://share.google/images/6S4UEUMl9B2F5LL0M',
      desc:'Puran Poli is a sweet flatbread made with chana dal and jaggery, traditionally prepared during festivals like Holi and Ganeshotsav.'},
    {id:'artifact2',title:'Kolhapuri Chappals',img:'https://share.google/images/ihu48no18EFa226QE',
      desc:'Kolhapuri Chappals are handmade leather sandals from Kolhapur, known for durability and intricate designs.'},
    {id:'artifact3',title:'Pheta',img:'https://share.google/images/2ZXW6YkTBEOKoQ7vv',
      desc:'Pheta is a traditional turban worn in Maharashtra during weddings and cultural celebrations, representing pride and honor.'},
    {id:'artifact4',title:'Warli Painting',img:'https://share.google/images/fdYi3BDuK241l6chw',
      desc:'Warli paintings are tribal artworks from Maharashtra depicting daily life, nature, and rituals in geometric patterns.'}
  ];

  const artifactSelect = document.getElementById('artifact-select');
  ARTIFACTS.forEach(a=>{
    const opt = document.createElement('option'); 
    opt.value=a.id; opt.textContent=a.title;
    artifactSelect.appendChild(opt);
  });

  // --- ARTIFACT LOADER + ANIMATION ---
  function loadArtifact(id){
    const a = ARTIFACTS.find(x=>x.id===id); if(!a) return;
    document.getElementById('artifact-image').src = a.img;
    document.getElementById('artifact-title').textContent = a.title;
    document.getElementById('artifact-text').textContent = a.desc;

    const anim = document.getElementById('artifact-anim');
    anim.textContent = a.title.split(' ')[0].slice(0,2).toUpperCase();
    anim.style.animation = 'spinPulse 2.5s infinite';

    document.getElementById('map-embed-wrap').innerHTML = `<p class="muted">Interactive map showing where you can see or experience this artifact:</p>
    <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1KGw7V1akJOUBFbu_vaSeIUEYLOY0iuo" loading="lazy"></iframe>`;
  }

  artifactSelect.addEventListener('change', ()=>{
    loadArtifact(artifactSelect.value);
    loadQuiz(artifactSelect.value);
  });

  // --- QUIZ FUNCTIONALITY ---
  function loadQuiz(artifactId){
    const quizDiv = document.getElementById('artifact-quiz');
    quizDiv.innerHTML = ""; // clear previous quiz

    const quizzes = {
      'artifact1': [
        {q:'What is Puran Poli traditionally stuffed with?', options:['Chana dal & Jaggery','Rice','Wheat','Coconut'], answer:0},
        {q:'During which festival is Puran Poli commonly eaten?', options:['Holi','Diwali','Eid','Christmas'], answer:0},
        {q:'What is the main ingredient in the dough?', options:['Wheat flour','Rice flour','Chickpeas','Maize'], answer:0},
        {q:'Puran Poli is a type of?', options:['Flatbread','Pastry','Cake','Soup'], answer:0}
      ],
      'artifact2': [
        {q:'Kolhapuri Chappals are made of?', options:['Leather','Plastic','Wood','Cloth'], answer:0},
        {q:'Kolhapuri Chappals originate from which state?', options:['Maharashtra','Gujarat','Kerala','Rajasthan'], answer:0},
        {q:'What is special about Kolhapuri Chappals?', options:['Durability','Color','Smell','Weight'], answer:0},
        {q:'Kolhapuri Chappals are mainly worn on?', options:['Feet','Head','Hands','Arms'], answer:0}
      ],
      'artifact3': [
        {q:'Pheta is a type of?', options:['Turban','Footwear','Food','Painting'], answer:0},
        {q:'Pheta represents?', options:['Honor & pride','Wealth','Luck','Education'], answer:0},
        {q:'When is Pheta typically worn?', options:['Weddings & festivals','Daily life','Sports','Market'], answer:0},
        {q:'Pheta is commonly made from?', options:['Cloth','Leather','Metal','Paper'], answer:0}
      ],
      'artifact4': [
        {q:'Warli paintings depict?', options:['Daily life & rituals','Space','Cars','Animals only'], answer:0},
        {q:'What shapes are common in Warli art?', options:['Triangles, circles, lines','Squares only','Polygons','Random shapes'], answer:0},
        {q:'Warli paintings originate from which state?', options:['Maharashtra','Tamil Nadu','Punjab','Karnataka'], answer:0},
        {q:'Warli art traditionally is painted on?', options:['Walls of huts','Paper','Canvas','Stone'], answer:0}
      ]
    };

    const quiz = quizzes[artifactId];
    if(!quiz) return;

    let currentQ = 0;

    function showQuestion(){
      quizDiv.innerHTML = "";
      const qObj = quiz[currentQ];
      const qEl = document.createElement('p');
      qEl.textContent = `Q${currentQ+1}: ${qObj.q}`;
      quizDiv.appendChild(qEl);

      qObj.options.forEach((opt,i)=>{
        const btn = document.createElement('button');
        btn.className='btn';
        btn.textContent=opt;
        btn.addEventListener('click', ()=>{
          if(i===qObj.answer) alert('✅ Correct!'); 
          else alert('❌ Try again!');
          currentQ++;
          if(currentQ < quiz.length) showQuestion();
          else quizDiv.innerHTML = "<p>🎉 Quiz completed!</p>";
        });
        quizDiv.appendChild(btn);
      });
    }

    showQuestion();
  }
 
 // --- SEARCH FUNCTIONALITY ---
 
const recommended = ["Puran Poli","Kolhapuri Chappals","Pheta","Warli Painting"];
const mostSearched = ["Puran Poli","Warli Painting","Pheta"];
const recList = document.getElementById('recommended-list');
recommended.forEach(t=>{
  const tag = document.createElement('div'); tag.className='tag'; tag.textContent=t;
  tag.addEventListener('click',()=>doSearch(t)); recList.appendChild(tag);
});
const mostList = document.getElementById('most-list');
mostSearched.forEach(t=>{
  const tag = document.createElement('div'); tag.className='tag'; tag.textContent=t;
  tag.addEventListener('click',()=>doSearch(t)); mostList.appendChild(tag);
});
document.getElementById('search-btn').addEventListener('click',()=>doSearch(document.getElementById('search-input').value));
document.getElementById('header-search-btn').addEventListener('click',()=>doSearch(document.getElementById('header-search').value));
function doSearch(term){
  term = term.trim(); if(!term) return;
  document.getElementById('search-results').innerHTML="";
  pages.forEach(p=>p.classList.add('hidden'));
  document.getElementById('page-search').classList.remove('hidden');
  const results = ARTIFACTS.filter(a=>a.title.toLowerCase().includes(term.toLowerCase()));
  if(results.length===0){document.getElementById('search-results').textContent="No results found.";}
  results.forEach(r=>{
    const div = document.createElement('div'); div.className='story-card card';
    div.innerHTML=`<h4>${r.title}</h4><p>${r.desc}</p>`;
    document.getElementById('search-results').appendChild(div);
  });
}

  // --- STORIES & SPOTLIGHTS ---
  const stories = [
    {
      title:'Fun with Puran Poli',
      desc:'Puran Poli competitions are held during Holi in villages. Kids and elders join in rolling and stuffing the sweet flatbread. It is fun, educational, and delicious! Fun fact: Some villages have Puran Poli-eating contests where the winner gets a garland of marigolds!',
      img:'https://share.google/images/fPSTbxrfNhBwSUD27'
    },
    {
      title:'Kolhapuri Chappal Craft',
      desc:'It can take up to 2 days to make one pair of traditional chappals. Craftsmen follow generations-old techniques, showing patience and dedication. Fun fact: Each chappal is unique, with designs inspired by local temples and nature.',
      img:'https://share.google/images/kr695IdUeCh7WtCUY'
    },
    {
      title:'Pheta Ceremony',
      desc:'The Pheta is often color-coded depending on the festival or event. Each style conveys respect, honor, and pride in Maharashtra culture. Fun fact: There are competitions where participants see who can tie the most intricate Pheta!',
      img:'https://share.google/images/tvPzY4RlVFXZ4e2Op'
    },
    {
      title:'Warli Art Game',
      desc:'Try drawing a Warli stick figure using 3 simple geometric shapes! It represents community life, traditions, and harmony with nature. Fun fact: Warli artists often use rice paste and mud as paint for authentic walls.',
      img:'https://share.google/images/7oOjncbpy5Z73Q9Ho'
    }
  ];

  function populateStories(){
    const storiesList = document.getElementById('stories-list');
    if(storiesList.innerHTML !== "") return; // populate once
    stories.forEach(s=>{
      const card = document.createElement('div'); 
      card.className='story-card card';
      card.innerHTML=`<img src="${s.img}" alt="${s.title}"><h4>${s.title}</h4><p>${s.desc}</p>`;
      storiesList.appendChild(card);
    });
  }

  // --- Initialize artifact preview ---
  document.getElementById('artifact-preview').innerHTML=`<img src="${ARTIFACTS[0].img}" alt="${ARTIFACTS[0].title}" style="width:100%;border-radius:12px">`;
  document.getElementById('view-artifact').addEventListener('click', ()=>{
    pages.forEach(p=>p.classList.add('hidden'));
    document.getElementById('page-artifacts').classList.remove('hidden');
    artifactSelect.value = ARTIFACTS[0].id;
    loadArtifact(ARTIFACTS[0].id);
    loadQuiz(ARTIFACTS[0].id);
  });

  // --- INITIAL LOAD ---
  artifactSelect.value = ARTIFACTS[0].id;
  loadArtifact(ARTIFACTS[0].id);
  loadQuiz(ARTIFACTS[0].id);

});

// --- CHATBOT ---
const HUMANS = [
  {id:'human1', name:'Anita', intro:'Ask me about festivals, food, and rituals!'},
  {id:'human2', name:'Rohan', intro:'I know about traditional clothing and crafts!'},
  {id:'human3', name:'Meera', intro:'Warli painting and cultural arts are my specialty!'}
];
let currentHuman = HUMANS[0];

function addMessage(text,sender){
  const chatbox = document.getElementById('chat-main');
  const msgDiv = document.createElement('div'); msgDiv.classList.add('message');
  if(sender==='You') msgDiv.classList.add('sender');
  msgDiv.innerHTML = `<small class="muted">${sender}</small><div>${text}</div>`;
  chatbox.appendChild(msgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function sendMessage(){
  const input = document.getElementById("chat-input"); 
  const text = input.value.trim(); if(!text) return;
  addMessage(text,"You");
  const lower = text.toLowerCase();
  let response = "Sorry, I don't know that. Ask me about Puran Poli, Kolhapuri Chappals, Pheta, or Warli painting!";
  if(lower.includes("puran poli")) response="Puran Poli is a sweet flatbread traditionally made with chana dal and jaggery, eaten during festivals.";
  else if(lower.includes("kolhapuri chappals")) response="Kolhapuri Chappals are handcrafted leather sandals, famous for durability and style.";
  else if(lower.includes("pheta")) response="Pheta is a traditional turban, symbolizing honor and pride in Maharashtra culture.";
  else if(lower.includes("warli")) response="Warli paintings are tribal artworks depicting daily life and rituals with geometric patterns.";
  setTimeout(()=>addMessage(response,currentHuman.name),300);
  input.value="";
}

function setupChat(){
  const form = document.getElementById("chat-form");
  form.addEventListener('submit',e=>{e.preventDefault(); sendMessage()});
  const list = document.getElementById('chat-list'); list.innerHTML="";
  HUMANS.forEach(h=>{
    const btn = document.createElement('button'); btn.className="chat-item btn"; btn.textContent=h.name;
    btn.addEventListener('click',()=>{currentHuman=h;document.getElementById('chat-main').innerHTML='';addMessage(h.intro,h.name)});
    list.appendChild(btn);
  });
  addMessage(currentHuman.intro,currentHuman.name);
}
setupChat();

// --- HOME DRAG-DROP GAME ---
const homeGameArea = document.getElementById('home-game');
const homeArtifacts = ["Puran Poli","Kolhapuri Chappals","Pheta","Warli Painting"];
homeArtifacts.forEach(name=>{
  const div = document.createElement('div'); div.className='draggable'; div.draggable=true; div.textContent=name;
  div.addEventListener('dragstart',e=>{e.dataTransfer.setData('text',name)});
  homeGameArea.appendChild(div);
});
homeArtifacts.forEach(t=>{
  const target = document.createElement('div'); target.className='drop-target'; target.textContent=t;
  target.addEventListener('dragover',e=>e.preventDefault());
  target.addEventListener('drop',e=>{
    const data = e.dataTransfer.getData('text');
    if(data===t) alert("Correct!"); else alert("Try again!");
  });
  homeGameArea.appendChild(target);
});
document.getElementById('home-reset').addEventListener('click',()=>location.reload());
