{\rtf1\ansi\ansicpg950\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.addEventListener('DOMContentLoaded', () => \{\
    let allEvents = [];\
    const apiKeyInput = document.getElementById('api-key-input');\
    const appContainer = document.getElementById('app');\
    const modal = document.getElementById('event-modal');\
    const modalBody = document.getElementById('modal-body');\
    const closeModalBtn = document.getElementById('close-modal');\
\
    const loadEvents = async () => \{\
        try \{\
            const response = await fetch('events.json');\
            if (!response.ok) \{\
                throw new Error(`HTTP error! status: $\{response.status\}`);\
            \}\
            allEvents = await response.json();\
            // \uc0\u21021 \u22987 \u21270 \u26178 \u36617 \u20837 \u20736 \u34920 \u26495 \u35222 \u22294 \
            renderDashboard();\
        \} catch (error) \{\
            appContainer.innerHTML = `<p style="color: red;">\uc0\u28961 \u27861 \u36617 \u20837 \u20107 \u20214 \u36039 \u26009 (events.json)\u65292 \u35531 \u27298 \u26597 \u27284 \u26696 \u26159 \u21542 \u23384 \u22312 \u19988 \u36335 \u24465 \u27491 \u30906 \u12290 \u37679 \u35492 \u35338 \u24687 : $\{error.message\}</p>`;\
        \}\
    \};\
\
    const renderDashboard = () => \{\
        appContainer.innerHTML = `\
            <section>\
                <h2><br>\uc0\u26410 \u20358 \u19968 \u20491 \u26376 \u20839 \u23559 \u30332 \u29983 \u30340 \u20107 \u20214 </h2>\
                <div class="event-list" id="upcoming-events"></div>\
            </section>\
        `;\
        // \uc0\u30446 \u21069 \u26178 \u38291 \u26159 2025\u24180 7\u26376 17\u26085 \u65292 \u22240 \u27492 \u39023 \u31034 \u25509 \u19979 \u20358 \u19968 \u20491 \u26376 (\u21040 8\u26376 16\u26085 )\u30340 \u20107 \u20214 \
        const upcomingEvents = [\
            allEvents.find(e => e.id === "20250701"),\
            allEvents.find(e => e.id === "20250801"),\
            allEvents.find(e => e.id === "20250802"),\
            allEvents.find(e => e.id === "20250803")\
        ].filter(Boolean); // filter(Boolean) to remove nulls if event not found\
\
        document.getElementById('upcoming-events').innerHTML = renderEventCards(upcomingEvents);\
        addCardEventListeners();\
    \};\
\
    const renderCalendar = () => \{\
        appContainer.innerHTML = `\
            <section>\
                <h2>\uc0\u23436 \u25972 \u34892 \u20107 \u26310  (2025/6 - 2026/6)</h2>\
                <div class="event-list">$\{renderEventCards(allEvents)\}</div>\
            </section>\
        `;\
        addCardEventListeners();\
    \};\
\
    const renderEventCards = (events) => \{\
        if (!events || events.length === 0) \{\
            return '<p>\uc0\u27492 \u21312 \u38291 \u27794 \u26377 \u20107 \u20214 \u12290 </p>';\
        \}\
        return events.map(event => `\
            <div class="card" data-id="$\{event.id\}">\
                <h4>$\{event.event\}</h4>\
                <p>\uc0\u26085 \u26399 : $\{event.date\}</p>\
                <p class="publish-date">\uc0\u24314 \u35696 \u30332 \u20296 : $\{event.publish_date\}</p>\
            </div>\
        `).join('');\
    \};\
\
    const addCardEventListeners = () => \{\
        document.querySelectorAll('.card').forEach(card => \{\
            card.addEventListener('click', () => showEventDetails(card.dataset.id));\
        \});\
    \};\
\
    const showEventDetails = (eventId) => \{\
        const event = allEvents.find(e => e.id === eventId);\
        if (!event) return;\
\
        modalBody.innerHTML = `\
            <h3>$\{event.event\}</h3>\
            <p><strong>\uc0\u26085 \u26399 :</strong> $\{event.date\}</p>\
            <p><strong>\uc0\u24314 \u35696 \u30332 \u20296 \u26178 \u31243 :</strong> $\{event.publish_date\}</p>\
            <p><strong>\uc0\u24314 \u35696 \u20999 \u40670 :</strong></p>\
            <ul>\
                $\{event.angles.map(angle => `<li>$\{angle\}</li>`).join('')\}\
            </ul>\
            <button id="generate-draft-btn" class="action-button">\uc0\u29983 \u25104 \u22577 \u23566 \u33609 \u31295 </button>\
            <div id="draft-output" class="draft-output-hidden">\
                <h4>\uc0\u22577 \u23566 \u33609 \u31295 :</h4>\
                <textarea id="draft-textarea" rows="15"></textarea>\
            </div>\
        `;\
        modal.classList.remove('modal-hidden');\
\
        document.getElementById('generate-draft-btn').addEventListener('click', () => generateDraft(event));\
    \};\
\
    const generateDraft = async (event) => \{\
        const outputDiv = document.getElementById('draft-output');\
        const textarea = document.getElementById('draft-textarea');\
        outputDiv.classList.remove('draft-output-hidden');\
        textarea.value = "\uc0\u27491 \u22312 \u29983 \u25104 \u20013 \u65292 \u35531 \u31245 \u20505 ...";\
\
        // \uc0\u36889 \u26159 \u19968 \u20491 \u27169 \u25836 \u30340 API\u21628 \u21483 \u65292 \u23526 \u38555 \u20351 \u29992 \u26178 \u24744 \u38656 \u35201 \u25972 \u21512 Gemini\u30340 SDK\
        const prompt = \\`\uc0\u20320 \u26159 \u19968 \u21517 \u21488 \u28771 \u32178 \u36335 \u23186 \u39636 \u30340 \u35352 \u32773 \u65292 \u35531 \u28858 \u25509 \u19979 \u20358 \u30340 \u12300 \\$\{event.event\}\u12301 \u28310 \u20633 \u19968 \u31687 \u22577 \u23566 \u33609 \u31295 \u12290 \u35531 \u22285 \u32350 \u20197 \u19979 \u24190 \u20491 \u25512 \u34214 \u30340 \u20999 \u20837 \u40670 \u36914 \u34892 \u25776 \u23531 \u65292 \u20006 \u36879 \u36942 \u32178 \u36335 \u25628 \u23563 \u30456 \u38364 \u30340 \u26368 \u26032 \u36039 \u35338 \u20358 \u35920 \u23500 \u20839 \u23481 \u65306 \\n- \\$\{event.angles.join('\\n- ')\}\\n\\n\u35531 \u25552 \u20379 \u19968 \u20491 \u21560 \u24341 \u20154 \u30340 \u27161 \u38988 \u65292 \u20006 \u29986 \u35069 \u19968 \u31687 \u32080 \u27083 \u23436 \u25972 \u30340 \u22577 \u23566 \u12290 \\`;\
        \
        console.log("\uc0\u27491 \u22312 \u20351 \u29992 \u20197 \u19979 \u25552 \u31034 \u35486 \u21628 \u21483  Gemini API:", prompt);\
        \
        // \uc0\u27169 \u25836 \u24310 \u36978 \u20006 \u39023 \u31034 \u32080 \u26524 \
        setTimeout(() => \{\
            textarea.value = \\`\uc0\u12304 \u22577 \u23566 \u33609 \u31295 \u31684 \u20363 \u12305 \\n\\n\u27161 \u38988 \u65306 \\$\{event.event\}\u20840 \u25915 \u30053 \u65281 \\n\\n\u21069 \u35328 \u65306 \u38568 \u33879 \\$\{event.date\}\u30340 \u21040 \u20358 \u65292 \u33836 \u30526 \u30682 \u30446 \u30340 \\$\{event.event\}\u21363 \u23559 \u23637 \u38283 \u12290 \u26412 \u25991 \u28858 \u24744 \u25972 \u29702 \u20102 \u26368 \u23436 \u25972 \u30340 \u27963 \u21205 \u36039 \u35338 \u33287 \u25915 \u30053 ...\\n\\n(\u27492 \u34389 \u28858 AI\u29983 \u25104 \u20839 \u23481 ...)\\`;\
        \}, 2000);\
    \};\
\
    closeModalBtn.addEventListener('click', () => modal.classList.add('modal-hidden'));\
    window.addEventListener('click', (e) => \{\
        if (e.target === modal) \{\
            modal.classList.add('modal-hidden');\
        \}\
    \});\
\
    document.getElementById('save-key').addEventListener('click', () => \{\
        const key = apiKeyInput.value;\
        if(key) \{\
            localStorage.setItem('gemini-api-key', key);\
            alert('API Key \uc0\u24050 \u25104 \u21151 \u20786 \u23384 \u26044 \u24744 \u30340 \u28687 \u35261 \u22120 \u20013 \u12290 ');\
        \} else \{\
            alert('API Key \uc0\u28858 \u31354 \u65292 \u35531 \u36664 \u20837 \u12290 ');\
        \}\
    \});\
    \
    apiKeyInput.value = localStorage.getItem('gemini-api-key') || '';\
\
    document.getElementById('show-dashboard').addEventListener('click', renderDashboard);\
    document.getElementById('show-calendar').addEventListener('click', renderCalendar);\
\
    loadEvents();\
\});}