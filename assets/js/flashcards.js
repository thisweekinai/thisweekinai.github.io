document.addEventListener('DOMContentLoaded', function() {
    const cards = Array.from(document.querySelectorAll('.tinder-card'));
    let currentCardIndex = cards.length - 1;
  
    cards.forEach((card, index) => {
      const hammer = new Hammer(card);
      let startX = 0;
      let startY = 0;
      let isDragging = false;
  
      hammer.on('panstart', function(e) {
        isDragging = true;
        card.classList.add('moving');
      });
  
      hammer.on('pan', function(e) {
        if (!isDragging) return;
        
        const rotation = e.deltaX * 0.1;
        const opacity = Math.max(Math.min(1 - Math.abs(e.deltaX) / 500, 1), 0);
        
        card.style.transform = `translate(${e.deltaX}px, ${e.deltaY}px) rotate(${rotation}deg)`;
        card.style.opacity = opacity;
      });
  
      hammer.on('panend', function(e) {
        isDragging = false;
        card.classList.remove('moving');
        
        if (Math.abs(e.deltaX) > 100) {
          const direction = e.deltaX > 0 ? 'right' : 'left';
          swipeCard(card, direction);
        } else {
          resetCard(card);
        }
      });
    });
  
    document.querySelector('.like-btn').addEventListener('click', () => {
      if (currentCardIndex >= 0) {
        swipeCard(cards[currentCardIndex], 'right');
      }
    });
  
    document.querySelector('.dislike-btn').addEventListener('click', () => {
      if (currentCardIndex >= 0) {
        swipeCard(cards[currentCardIndex], 'left');
      }
    });
  
    function swipeCard(card, direction) {
      card.classList.add(`swiped-${direction}`);
      currentCardIndex--;
      
      setTimeout(() => {
        card.remove();
        if (currentCardIndex < 0) {
          // All cards swiped
          document.querySelector('.tinder-cards').innerHTML = '<div class="no-more-cards">No more terms to learn!</div>';
        }
      }, 300);
    }
  
    function resetCard(card) {
      card.style.transform = '';
      card.style.opacity = '';
    }
  });