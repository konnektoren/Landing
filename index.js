document.addEventListener("DOMContentLoaded", function() {
    var faqs = document.querySelectorAll('.faq-item h3');
    faqs.forEach(function(faq) {
        faq.addEventListener('click', function() {
            var content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
});
