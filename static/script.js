class SMS extends HTMLElement {
    constructor(sender) {
        super();
        this.attachShadow({mode: 'open'});

        const who = sender || this.getAttribute('who');
        const what = this.innerHTML;
        const classes = this.getAttribute('class') || "";
        const again = this.getAttribute('again') !== null;

        // Create (nested) div elements
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class',classes);
        wrapper.classList.add('wrapper');
        if(again)
            wrapper.classList.add('again');
        wrapper.setAttribute('who', who);
        const avatar = wrapper.appendChild(document.createElement('span'));
        avatar.setAttribute('class','avatar');
        avatar.setAttribute('tabindex', 0);
        // Insert avatar from defined attribute or default avatar
        const img = avatar.appendChild(document.createElement('img'));
        img.src = this.hasAttribute('img') ? this.getAttribute('img') : `static/img/${who}.jpeg`;

        const textMessage = wrapper.appendChild(document.createElement('div'));
        textMessage.setAttribute('class','bubble');
        textMessage.innerHTML = what;

        const images = textMessage.querySelectorAll("img");
        for (const image of images) {
            // Setup image Lightboxes
            image.addEventListener('click', function(event) {
                let img = image.outerHTML;
                basicLightbox.create(`
                    <div class="modal">${img}</div>
                `).show();
            });
        }

        // Apply external styles to the shadow dom
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'static/style.css');

        // Attach the created elements to the shadow dom
        this.shadowRoot.appendChild(linkElem);
        this.shadowRoot.appendChild(wrapper);
    }
}

customElements.define('sms-bubble', SMS);

class SMSValentin extends SMS {
    constructor() {
        super('valentin');
    }
}
customElements.define('sms-valentin', SMSValentin);

class SMSAnkur extends SMS {
    constructor() {
        super('ankur');
    }
}
customElements.define('sms-ankur', SMSAnkur);
