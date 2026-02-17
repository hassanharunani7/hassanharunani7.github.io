// ============================================
// HASSAN HARUNANI PORTFOLIO - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initFormHandling();
});

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLink = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    navLink.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
    });

    // Smooth scrolling for nav links
    navLink.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// SCROLL EFFECTS
// ============================================

function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all cards and elements
    const elements = document.querySelectorAll(
        '.achievement-card, .interest-card, .edu-timeline-content, .stat-card, .info-card, .swim-content, .training-card'
    );

    elements.forEach(el => {
        observer.observe(el);
    });

    // Add CSS for visibility
    const style = document.createElement('style');
    style.textContent = `
        .achievement-card, .interest-card, .edu-timeline-content, .stat-card, .info-card, .swim-content, .training-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .achievement-card.visible, .interest-card.visible, .edu-timeline-content.visible, 
        .stat-card.visible, .info-card.visible, .swim-content.visible, .training-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// FORM HANDLING
// ============================================

function initFormHandling() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Validate form
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email', 'error');
                return;
            }

            // Show success message
            showNotification('Message sent successfully! I will get back to you soon.', 'success');

            // Reset form
            contactForm.reset();

            // Log the form data
            console.log({
                name,
                email,
                subject,
                message,
                timestamp: new Date().toISOString()
            });
        });
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styling
    const style = document.createElement('style');
    if (!document.getElementById('notification-styles')) {
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 20px 30px;
                border-radius: 10px;
                color: white;
                font-weight: 600;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }

            .notification-success {
                background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
            }

            .notification-error {
                background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}


// ============================================
// SUBJECT SYLLABUS MODAL
// ============================================

const syllabusData = {
    'Chemistry': {
        code: '0620',
        content: `
            <h3>Cambridge IGCSE Chemistry (0620)</h3>
            <p class="code-display">Course Code: 0620</p>
            
            <h4>Course Overview</h4>
            <p>Cambridge IGCSE Chemistry encourages learners to understand the technological world in which they live. The curriculum is designed to cultivate interest in chemistry and develop scientific thinking.</p>
            
            <h4>Main Topics Covered:</h4>
            <ul>
                <li><strong>States of Matter</strong> - Solids, liquids, gases, and changes of state</li>
                <li><strong>Atomic Structure & Bonding</strong> - Elements, atoms, molecules, and chemical bonding</li>
                <li><strong>Stoichiometry & Calculations</strong> - Molar masses, chemical equations, percentage yields</li>
                <li><strong>Energy Changes</strong> - Exothermic and endothermic reactions, combustion</li>
                <li><strong>Rates of Reaction</strong> - Factors affecting reaction rates, catalysts</li>
                <li><strong>Equilibrium</strong> - Dynamic equilibrium, equilibrium constants</li>
                <li><strong>Acids, Bases & Salts</strong> - pH, neutralization, titrations</li>
                <li><strong>Redox Reactions</strong> - Oxidation states, reduction, oxidizing agents</li>
                <li><strong>The Periodic Table</strong> - Groups, periods, trends in properties</li>
                <li><strong>Metals & Non-metals</strong> - Extraction, properties, uses</li>
                <li><strong>Carbon & Organic Chemistry</strong> - Hydrocarbons, isomerism, reactions</li>
                <li><strong>Air & Water</strong> - Composition, pollution, treatment</li>
            </ul>
            
            <h4>Assessment:</h4>
            <ul>
                <li>Paper 2: Multiple Choice (40 marks)</li>
                <li>Paper 4: Structured Questions (80 marks)</li>
                <li>Paper 6: Alternative to Practical (40 marks)</li>
            </ul>
            
            <h4>Key Skills:</h4>
            <ul>
                <li>Laboratory techniques and safety</li>
                <li>Data analysis and interpretation</li>
                <li>Chemical equation balancing</li>
                <li>Problem-solving and calculations</li>
                <li>Understanding of scientific concepts</li>
            </ul>
        `
    },
    'Biology': {
        code: '0610',
        content: `
            <h3>Cambridge IGCSE Biology (0610)</h3>
            <p class="code-display">Course Code: 0610</p>
            
            <h4>Course Overview</h4>
            <p>Cambridge IGCSE Biology develops understanding of the structure and function of cells, genetics, evolution, and ecology. It encourages learners to develop scientific thinking and practical skills.</p>
            
            <h4>Main Topics Covered:</h4>
            <ul>
                <li><strong>Cell Biology</strong> - Cell structure, transport across membranes, cell division</li>
                <li><strong>Molecular Biology</strong> - DNA, RNA, protein synthesis, mutations</li>
                <li><strong>Genetics</strong> - Inheritance patterns, genetic engineering, selection</li>
                <li><strong>Ecology</strong> - Ecosystems, food webs, energy transfer, succession</li>
                <li><strong>Photosynthesis & Respiration</strong> - Aerobic and anaerobic respiration</li>
                <li><strong>Nutrition</strong> - Digestion, absorption, balanced diet</li>
                <li><strong>Excretion & Homeostasis</strong> - Kidney function, temperature regulation</li>
                <li><strong>Nervous System & Hormones</strong> - Reflex arcs, hormonal control</li>
                <li><strong>Reproduction</strong> - Asexual and sexual reproduction</li>
                <li><strong>Growth & Development</strong> - Mitosis, growth, development</li>
                <li><strong>Health & Disease</strong> - Infectious and non-infectious diseases</li>
            </ul>
            
            <h4>Assessment:</h4>
            <ul>
                <li>Paper 2: Multiple Choice (40 marks)</li>
                <li>Paper 4: Structured Questions (80 marks)</li>
                <li>Paper 6: Alternative to Practical (40 marks)</li>
            </ul>
            
            <h4>Key Skills:</h4>
            <ul>
                <li>Microscopy and observation</li>
                <li>Experimental design</li>
                <li>Data analysis and graphing</li>
                <li>Understanding of biological processes</li>
                <li>Safe laboratory practice</li>
            </ul>
        `
    },
    'Physics': {
        code: '0625',
        content: `
            <h3>Cambridge IGCSE Physics (0625)</h3>
            <p class="code-display">Course Code: 0625</p>
            
            <h4>Course Overview</h4>
            <p>Cambridge IGCSE Physics develops understanding of the fundamental principles of physics and their applications in everyday life. It encourages curiosity about the physical world and develops scientific thinking.</p>
            
            <h4>Main Topics Covered:</h4>
            <ul>
                <li><strong>Measurements</strong> - SI units, significant figures, uncertainties</li>
                <li><strong>Motion</strong> - Velocity, acceleration, Newton's laws</li>
                <li><strong>Forces</strong> - Weight, friction, pressure, momentum</li>
                <li><strong>Energy</strong> - Kinetic and potential energy, conservation, power</li>
                <li><strong>Waves</strong> - Properties, light, sound, electromagnetic spectrum</li>
                <li><strong>Electricity</strong> - Current, voltage, resistance, circuits</li>
                <li><strong>Magnetism</strong> - Magnetic fields, electromagnets, motors</li>
                <li><strong>Thermodynamics</strong> - Heat, temperature, specific heat capacity</li>
                <li><strong>Atomic Physics</strong> - Structure of atoms, radioactivity, fission</li>
                <li><strong>Astrophysics</strong> - Stars, galaxies, universe expansion</li>
            </ul>
            
            <h4>Assessment:</h4>
            <ul>
                <li>Paper 2: Multiple Choice (40 marks)</li>
                <li>Paper 4: Structured Questions (80 marks)</li>
                <li>Paper 6: Alternative to Practical (40 marks)</li>
            </ul>
            
            <h4>Key Skills:</h4>
            <ul>
                <li>Experimental design and procedure</li>
                <li>Accurate measurements</li>
                <li>Data analysis and calculations</li>
                <li>Understanding of physical principles</li>
                <li>Problem-solving techniques</li>
            </ul>
        `
    },
    'Mathematics': {
        code: '0580',
        content: `
            <h3>Cambridge IGCSE Mathematics (0580) - Extended</h3>
            <p class="code-display">Course Code: 0580</p>
            
            <h4>Course Overview</h4>
            <p>Cambridge IGCSE Mathematics Extended develops mathematical knowledge and reasoning skills. It encourages understanding of mathematical concepts and their applications to everyday life.</p>
            
            <h4>Main Topics Covered:</h4>
            <ul>
                <li><strong>Number</strong> - Integers, decimals, fractions, ratio, percentages</li>
                <li><strong>Algebra</strong> - Expressions, equations, functions, sequences</li>
                <li><strong>Geometry & Trigonometry</strong> - Angles, triangles, circles, coordinate geometry</li>
                <li><strong>Statistics & Probability</strong> - Data collection, averages, probability</li>
                <li><strong>Logarithms & Exponentials</strong> - Powers, roots, logarithmic functions</li>
                <li><strong>Vectors</strong> - Vector operations</li>
            </ul>
            
            <h4>Assessment:</h4>
            <ul>
                <li>Paper 2: Non-calculator paper (100 marks, 2 hours)</li>
                <li>Paper 4: Calculator paper (100 marks, 2 hours)</li>
            </ul>
            
            <h4>Key Skills:</h4>
            <ul>
                <li>Problem-solving</li>
                <li>Algebraic manipulation</li>
                <li>Graphical representation</li>
                <li>Logical reasoning</li>
                <li>Calculator use and estimation</li>
            </ul>
        `
    },
    'English': {
        code: '0500',
        content: `
            <h3>Cambridge IGCSE English (0500)</h3>
            <p class="code-display">Course Code: 0500</p>
            
            <h4>Course Overview</h4>
            <p>Cambridge IGCSE English develops learners' ability to communicate clearly and effectively in writing and speaking. It encourages appreciation of literature and critical thinking skills.</p>
            
            <h4>Main Topics Covered:</h4>
            <ul>
                <li><strong>Reading</strong> - Comprehension, analysis, interpretation of texts</li>
                <li><strong>Writing</strong> - Creative writing, formal letters, essays, summaries</li>
                <li><strong>Grammar & Vocabulary</strong> - Sentence structure, word usage</li>
                <li><strong>Persuasive Techniques</strong> - Rhetoric, tone, style</li>
            </ul>
            
            <h4>Assessment:</h4>
            <ul>
                <li>Paper 1: Reading (80 marks, 2 hours)</li>
                <li>Paper 2: Writing (80 marks, 2 hours)</li>
            </ul>
            
            <h4>Key Skills:</h4>
            <ul>
                <li>Reading comprehension</li>
                <li>Written expression</li>
                <li>Analytical thinking</li>
                <li>Effective communication</li>
                <li>Literary analysis</li>
            </ul>
        `
    },
    'Kiswahili': {
        code: '0262',
        content: `
            <h3>Cambridge IGCSE Kiswahili (0262)</h3>
            <p class="code-display">Course Code: 0262</p>
            
            <h4>Course Overview</h4>
            <p>Cambridge IGCSE Kiswahili develops learners' ability to communicate effectively in Kiswahili through reading, writing, listening, and speaking. It encourages understanding of the culture and traditions of Kiswahili-speaking regions.</p>
            
            <h4>Main Topics Covered:</h4>
            <ul>
                <li><strong>Listening</strong> - Comprehension of spoken Kiswahili</li>
                <li><strong>Reading</strong> - Comprehension of written texts</li>
                <li><strong>Writing</strong> - Letters, essays, creative writing in Kiswahili</li>
                <li><strong>Grammar</strong> - Nouns, verbs, adjectives, sentence structure</li>
                <li><strong>Vocabulary</strong> - Everyday phrases, formal language</li>
            </ul>
            
            <h4>Assessment:</h4>
            <ul>
                <li>Paper 1: Reading and Writing (60 marks, 2 hours)</li>
                <li>Paper 2: Listening (30 marks, 45 minutes)</li>
            </ul>
            
            <h4>Key Skills:</h4>
            <ul>
                <li>Listening comprehension</li>
                <li>Written expression in Kiswahili</li>
                <li>Pronunciation and accent</li>
            </ul>
        `
    },
    'History': {
        code: '0470',
        content: `
            <h3>Cambridge IGCSE History (0470)</h3>
            <p class="code-display">Course Code: 0470</p>
            
            <h4>Course Overview</h4>
            <p>Cambridge IGCSE History encourages learners to engage with significant events and developments in modern world history. It develops understanding of how and why events happened and their consequences.</p>
            
            <h4>Main Topics Covered:</h4>
            <ul>
                <li><strong>International Relations 1919-1991</strong> - Treaty of Versailles, League of Nations, Hitler's Foreign Policy</li>
                <li><strong>Germany Depth Study 1918-1945</strong> - Weimar, Hitler, WWII</li>
            </ul>
            
            <h4>Assessment:</h4>
            <ul>
                <li>Paper 1: Core Content (60 marks, 2 hours)</li>
                <li>Paper 2: Source Analysis (40 marks, 1 hour 45 minutes)</li>
                <li>Paper 4: Depth Study (40 marks, 1 hour)</li>
            </ul>
            
            <h4>Key Skills:</h4>
            <ul>
                <li>Source analysis and interpretation</li>
                <li>Causal reasoning</li>
                <li>Chronological understanding</li>
                <li>Historical empathy</li>
                <li>Essay writing and argumentation</li>
            </ul>
        `
    },
    'ICT': {
        code: '0417',
        content: `
            <h3>Cambridge IGCSE Information & Communication Technology (0417)</h3>
            <p class="code-display">Course Code: 0417</p>
            
            <h4>Course Overview</h4>
            <p>Cambridge IGCSE ICT develops learners' understanding of information and communication technologies and their applications. It encourages practical skills and critical thinking about technology.</p>
            
            <h4>Main Topics Covered:</h4>
            <ul>
                <li><strong>Computer Systems</strong> - Hardware, software, networks</li>
                <li><strong>Data & Information</strong> - Data representation, databases, spreadsheets</li>
                <li><strong>Networks & Cyber Security</strong> - Network types, security, privacy</li>
                <li><strong>Internet & Web Technologies</strong> - Web design, HTML, CSS</li>
                <li><strong>Digital Media</strong> - Image editing, video, animation, multimedia</li>
                <li><strong>e-Commerce & e-Business</strong> - Online transactions, digital marketing</li>
                <li><strong>Social Media & Online Behavior</strong> - Digital citizenship, ethics</li>
                <li><strong>IT Security & Data Protection</strong> - Encryption, backups, GDPR</li>
            </ul>
            
            <h4>Assessment:</h4>
            <ul>
                <li>Paper 1: Theory (80 marks, 1 hour 30 mins)</li>
                <li>Paper 2: Practical (70 marks, 2 hours 15 minutes)</li>
                <li>Paper 3: Practical (70 marks, 2 hours 15 minutes)</li>
            </ul>
            
            <h4>Key Skills:</h4>
            <ul>
                <li>Practical application of software</li>
                <li>Problem-solving with technology</li>
                <li>Data analysis and presentation</li>
                <li>Understanding of IT systems</li>
                <li>Digital literacy and awareness</li>
            </ul>
        `
    }
};

function openSyllabus(subject, code) {
    const modal = document.getElementById('syllabusModal');
    const syllabusTitle = document.getElementById('syllabusTitle');
    const syllabusContent = document.getElementById('syllabusContent');
    
    if (syllabusData[subject]) {
        syllabusTitle.textContent = subject + ' Syllabus';
        syllabusContent.innerHTML = syllabusData[subject].content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Scroll to top of modal content
        document.querySelector('.modal-content').scrollTop = 0;
    }
}

function closeSyllabus() {
    const modal = document.getElementById('syllabusModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking close button
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSyllabus);
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('syllabusModal');
        if (event.target === modal) {
            closeSyllabus();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeSyllabus();
        }
    });
});


// ============================================
// INTERESTS MODAL
// ============================================

const interestData = {
    'Forensic Science': {
        icon: '<i class="fas fa-microscope"></i>',
        content: `
            <h3>What is Forensic Science?</h3>
            <p>Forensic science is the application of scientific methods and principles to investigate crimes and support the judicial system. It combines chemistry, biology, physics, and investigative techniques to uncover evidence and establish facts about criminal cases.</p>
            
            <h4>Why I'm Passionate About It</h4>
            <p>I am deeply fascinated by the power of science to reveal truth and bring justice. Forensic science represents the perfect intersection of my interests in chemistry and biology, while also serving a meaningful purpose in society. The idea of solving complex puzzles using scientific evidence is incredibly appealing to me.</p>
            
            <h4>Key Areas in Forensic Science</h4>
            <ul>
                <li><strong>Forensic Chemistry</strong> - Analysis of chemical compounds, toxicology, drug analysis</li>
                <li><strong>Forensic Biology/DNA</strong> - Blood analysis, DNA profiling, tissue identification</li>
                <li><strong>Forensic Pathology</strong> - Cause of death determination, injury analysis</li>
                <li><strong>Digital Forensics</strong> - Computer and device evidence analysis</li>
                <li><strong>Forensic Physics</strong> - Ballistics, glass fracture, accident reconstruction</li>
                <li><strong>Crime Scene Investigation</strong> - Evidence collection, documentation, analysis</li>
            </ul>
            
            <h4>My Educational Path</h4>
            <div class="achievement-highlight">
                <strong>Undergraduate (2027-2031):</strong> Biochemistry degree to build strong foundational knowledge in molecular biology and chemistry
            </div>
            <div class="achievement-highlight">
                <strong>Master's Degree (2031+):</strong> Specialized Master's in Forensic Science to develop expertise in investigative techniques
            </div>
            
            <h4>Career Opportunities</h4>
            <ul>
                <li>Forensic Laboratory Analyst</li>
                <li>Crime Scene Investigator</li>
                <li>Police Forensic Officer</li>
                <li>Forensic Consultant</li>
                <li>University Lecturer/Researcher</li>
                <li>Government Crime Lab Director</li>
            </ul>
            
            <h4>Skills Required</h4>
            <div class="interest-highlight">
                <strong>Analytical Thinking:</strong> Breaking down complex problems into manageable components to find solutions
            </div>
            <div class="interest-highlight">
                <strong>Attention to Detail:</strong> Noticing small details that could be crucial to investigations
            </div>
            <div class="interest-highlight">
                <strong>Communication:</strong> Clearly presenting findings in court and to colleagues
            </div>
            <div class="interest-highlight">
                <strong>Problem-Solving:</strong> Using scientific knowledge to solve real-world cases
            </div>
            
            <h4>My Vision</h4>
            <p>I want to work in a professional forensic laboratory or law enforcement agency, contributing to investigations that bring justice to victims and their families. I am committed to using my scientific knowledge and analytical skills to make a meaningful impact in the criminal justice system.</p>
        `
    },
    'Biochemistry': {
        icon: '<i class="fas fa-flask"></i>',
        content: `
            <h3>What is Biochemistry?</h3>
            <p>Biochemistry is the study of chemical processes within living organisms. It explores how molecules like proteins, lipids, carbohydrates, and nucleic acids interact to sustain life. Biochemistry bridges the gap between chemistry and biology, revealing the molecular basis of all life processes.</p>
            
            <h4>Why I'm Passionate About It</h4>
            <p>I am fascinated by understanding the chemistry of life itself. The idea that every biological process - from digestion to thought - can be explained through chemistry is remarkable. Biochemistry represents my gateway into understanding the fundamental mechanisms of life and how to improve human health and wellbeing.</p>
            
            <h4>Key Areas in Biochemistry</h4>
            <ul>
                <li><strong>Protein Chemistry</strong> - Structure, function, and synthesis of proteins</li>
                <li><strong>Enzyme Kinetics</strong> - How enzymes catalyze biological reactions</li>
                <li><strong>Metabolism</strong> - Carbohydrate, lipid, and amino acid metabolism</li>
                <li><strong>Cell Biology</strong> - Molecular processes within cells</li>
                <li><strong>Genetics & Molecular Biology</strong> - DNA, RNA, and protein synthesis</li>
                <li><strong>Pharmacology</strong> - How drugs interact with biological systems</li>
                <li><strong>Clinical Biochemistry</strong> - Biochemical analysis in medical diagnosis</li>
            </ul>
            
            <h4>Real-World Applications</h4>
            <ul>
                <li>Drug Development - Creating new medicines</li>
                <li>Medical Testing - Blood tests, diagnostic assays</li>
                <li>Biotechnology - Genetic engineering, genetic modification</li>
                <li>Food Science - Understanding nutritional processes</li>
                <li>Environmental Science - Studying ecological biochemistry</li>
                <li>Sports Science - Athletic performance enhancement</li>
            </ul>
            
            <h4>My Educational Path</h4>
            <div class="achievement-highlight">
                <strong>Current (2026):</strong> IGCSE in Chemistry, Biology, Physics, Mathematics to establish strong foundation
            </div>
            <div class="achievement-highlight">
                <strong>A-Levels (2026-2027):</strong> Advanced studies in Chemistry, Biology, Mathematics
            </div>
            <div class="achievement-highlight">
                <strong>Undergraduate (2027-2031):</strong> Bachelor's degree in Biochemistry from USA-affiliated university
            </div>
            
            <h4>Why Biochemistry First?</h4>
            <p>While forensic science is my ultimate career goal, studying biochemistry as my undergraduate degree will provide me with the essential knowledge and research skills needed for advanced forensic work. Understanding molecular processes will enable me to perform more sophisticated forensic analyses and contribute to innovations in forensic science.</p>
            
            <h4>Career in Biochemistry</h4>
            <ul>
                <li>Pharmaceutical Research Scientist</li>
                <li>Clinical Laboratory Manager</li>
                <li>Biomedical Researcher</li>
                <li>Quality Control Analyst</li>
                <li>University Lecturer</li>
                <li>Medical Device Developer</li>
            </ul>
            
            <h4>My Vision</h4>
            <p>I aim to become an expert in biochemistry with the ability to bridge theoretical knowledge and practical applications. Whether directly in biochemistry or transitioning to forensics, I want to contribute to scientific advancement that improves human health and justice.</p>
        `
    },
    'Swimming': {
        icon: '<i class="fas fa-swimmer"></i>',
        content: `
            <h3>My Competitive Swimming Passion</h3>
            <p>Swimming is more than just a sport for me - it is my greatest passion and the discipline that has shaped my character. Since age 3, I have dedicated myself to becoming an excellent competitive swimmer, representing my country with pride and striving for continuous improvement.</p>
            
            <h4>Why Swimming Means Everything to Me</h4>
            <p>Swimming taught me the values of discipline, dedication, and perseverance. Every early morning at the pool, every challenging training session, every competition has built my character. The sport demands not just physical strength but mental resilience and tactical thinking. It has given me confidence, friendships, and a sense of achievement.</p>
            
            <h4>My Swimming Events</h4>
            <div class="achievement-highlight">
                <strong>Primary Events (My Strokes):</strong><br>
                50m Butterfly (32.47 sec), 100m Butterfly (1:15.88), 100m Individual Medley (1:14.81), 200m Individual Medley (2:41.78), 50m Backstroke (35.43), 100m Backstroke (1:16.15), 50m Breaststroke (37.47), 100m Breaststroke (1:21.11), 200m Breaststroke (2:57.28)
            </div>
            
            <h4>My Swimming Achievements</h4>
            <ul>
                <li><strong>100+ Medals</strong> - Earned across multiple regional and national competitions</li>
                <li><strong>5 Championship Trophies</strong> - Testament to consistent excellence</li>
                <li><strong>Tanzania National Team</strong> - Selected to represent my country internationally</li>
                <li><strong>Africa Aquatics Zone III (2024)</strong> - First international competition for Tanzania</li>
                <li><strong>12+ Years of Training</strong> - Dedicated commitment since age 3</li>
            </ul>
            
            <h4>Training at BlueFins</h4>
            <p><a href="https://bluefinstz.com" target="_blank" class="text-link">BlueFins Swimming Club</a> in Dar es Salaam is my home. For the past 9 years (since age 7), I have trained with exceptional coaches who have helped me develop my skills and mental toughness. BlueFins has become my family, and my teammates are my brothers and sisters in this sport.</p>
            
            <h4>Balancing Swimming with Academics</h4>
            <div class="interest-highlight">
                <strong>Challenge:</strong> Balancing rigorous IGCSE preparation with intensive swimming training requires exceptional time management and dedication.
            </div>
            <p>Despite this challenge, I am committed to achieving excellence in both areas. My swimming has taught me discipline that helps me in my studies, and my academic success demonstrates that dedication to one area doesn't mean neglecting others.</p>
            
            <h4>My Swimming Goals</h4>
            <ul>
                <li>Continue improving personal best times</li>
                <li>Represent Tanzania at higher international levels</li>
                <li>Win more medals and trophies for BlueFins</li>
                <li>Inspire younger swimmers at my club</li>
                <li>Maintain swimming alongside university studies</li>
            </ul>
            
            <h4>Future in Swimming</h4>
            <p>While pursuing my university education, I plan to continue competitive swimming. Many universities have swimming programs, and I would love to represent my university or continue at elite levels. Even if I don't pursue swimming professionally, it will always be a central part of my life and identity.</p>
            
            <h4>What Swimming Taught Me</h4>
            <ul>
                <li><strong>Discipline:</strong> Waking up early, training consistently, pushing through pain</li>
                <li><strong>Teamwork:</strong> Supporting teammates, learning from others, celebrating together</li>
                <li><strong>Perseverance:</strong> Overcoming failures and setbacks with determination</li>
                <li><strong>Confidence:</strong> Believing in myself and my abilities</li>
                <li><strong>Goal-Setting:</strong> Breaking down large goals into achievable milestones</li>
            </ul>
        `
    },
    'Cricket': {
        icon: '<i class="fas fa-cricket"></i>',
        content: `
            <h3>Cricket - My Recreational Passion</h3>
            <p>While swimming is my competitive focus, cricket holds a special place in my heart as a recreational sport. I love playing cricket casually with friends, enjoying the strategic elements of the game, and staying active in a fun, less intense environment.</p>
            
            <h4>Why I Love Cricket</h4>
            <p>Cricket is different from swimming - it's less about breaking personal records and more about enjoying the moment, teamwork, and having fun. The beauty of cricket lies in its complexity: the strategy, the different roles players take, and the unpredictability that keeps every match exciting.</p>
            
            <h4>Cricket Basics</h4>
            <ul>
                <li><strong>The Bat & Ball:</strong> Hitting a cricket ball requires timing, technique, and power</li>
                <li><strong>Fielding:</strong> Strategic positioning and quick reflexes to catch and stop the ball</li>
                <li><strong>Bowling/Pitching:</strong> Delivering the ball with accuracy and variety</li>
                <li><strong>Game Strategy:</strong> Understanding match situations and making tactical decisions</li>
            </ul>
            
            <h4>Different Formats of Cricket</h4>
            <ul>
                <li><strong>Test Cricket:</strong> The traditional 5-day format emphasizing skill and endurance</li>
                <li><strong>One Day International (ODI):</strong> 50-over format combining strategy with quick play</li>
                <li><strong>Twenty20 (T20):</strong> Fast-paced 20-over format with explosive batting</li>
                <li><strong>Casual/Social Cricket:</strong> Fun, recreational matches with friends</li>
            </ul>
            
            <h4>Why Cricket as a Recreational Sport?</h4>
            <div class="achievement-highlight">
                <strong>Balance:</strong> While swimming is my intense competitive focus, cricket provides relaxation and fun without the pressure of performance metrics.
            </div>
            <ul>
                <li>Social connections - Playing with friends and making new ones</li>
                <li>Physical fitness - Maintaining overall cardiovascular health</li>
                <li>Mental relaxation - Enjoying a sport purely for fun</li>
                <li>Strategic thinking - Engaging different parts of my brain</li>
                <li>Teamwork experience - Understanding different team dynamics</li>
            </ul>
            
            <h4>Key Skills in Cricket</h4>
            <ul>
                <li><strong>Hand-Eye Coordination:</strong> Essential for batting and fielding</li>
                <li><strong>Tactical Awareness:</strong> Understanding game situations and strategies</li>
                <li><strong>Teamwork:</strong> Coordinating with teammates for success</li>
                <li><strong>Physical Fitness:</strong> Strength, agility, and endurance</li>
                <li><strong>Mental Toughness:</strong> Handling pressure and disappointment</li>
            </ul>
            
            <h4>Famous Cricket Players</h4>
            <p>The world of cricket has produced incredible athletes who inspire me through their dedication, skill, and character. Players like Virat Kohli, Steve Smith, and Babar Azam demonstrate excellence, while others show the importance of sportsmanship and integrity in the game.</p>
            
            <h4>Cricket in Tanzania</h4>
            <p>Cricket is growing in popularity in Tanzania, and participating in casual cricket helps promote the sport in our region. Every match is an opportunity to enjoy the game and share it with others who love this beautiful sport.</p>
            
            <h4>My Approach to Cricket</h4>
            <div class="interest-highlight">
                <strong>Philosophy:</strong> I play cricket to enjoy the game, develop friendships, and stay physically active. While I play to win, the primary goal is to have fun and appreciate the sport's unique beauty.
            </div>
            
            <h4>Looking Forward</h4>
            <p>As I move into university and pursue my academic and professional goals, I plan to continue playing cricket recreationally. Whether in university teams, community matches, or informal games with friends, cricket will remain a treasured part of my life - a perfect balance to my intense focus on swimming and academics.</p>
        `
    }
};

function openInterest(interest) {
    const modal = document.getElementById('interestModal');
    const interestTitle = document.getElementById('interestModalTitle');
    const interestIcon = document.getElementById('interestModalIcon');
    const interestContent = document.getElementById('interestModalContent');
    
    if (interestData[interest]) {
        interestTitle.textContent = interest;
        interestIcon.innerHTML = interestData[interest].icon;
        interestContent.innerHTML = interestData[interest].content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Scroll to top of modal content
        document.querySelector('.modal-content').scrollTop = 0;
    }
}

function closeInterest() {
    const modal = document.getElementById('interestModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialize interest modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Close button
    const closeBtn = document.querySelector('#interestModal .close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeInterest);
    }

    // Close when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('interestModal');
        if (event.target === modal) {
            closeInterest();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeInterest();
        }
    });
});